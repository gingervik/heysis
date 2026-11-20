// Vercel Serverless Function: Secure OpenAI TTS Proxy for HeySis
// Keeps OPENAI_API_KEY strictly on the server with Origin checks and IP rate limiting.

const ALLOWED_VOICES = new Set(['nova', 'shimmer', 'alloy', 'fable']);
const MAX_TEXT_LENGTH = 1200;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 40; // max 40 TTS requests per IP per 10 min

// Lightweight in-memory rate limiter (resets on cold start; pair with OpenAI Monthly Budget Cap)
const ipBuckets = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = ipBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  bucket.count += 1;
  return false;
}

function getCorsOrigin(req) {
  const origin = req.headers.origin || '';
  const allowedEnv = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (
    !origin ||
    origin.startsWith('http://localhost:') ||
    origin.startsWith('http://127.0.0.1:') ||
    origin.endsWith('.vercel.app') ||
    origin.endsWith('.pages.dev') ||
    origin === 'https://gingervik.github.io' ||
    allowedEnv.includes(origin)
  ) {
    return origin || '*';
  }
  return null;
}

export default async function handler(req, res) {
  const corsOrigin = getCorsOrigin(req);
  if (corsOrigin) {
    res.setHeader('Access-Control-Allow-Origin', corsOrigin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!corsOrigin) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'TTS proxy is not configured on this server' });
  }

  const clientIp =
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many voice requests. Please try again in a few minutes.' });
  }

  const { input, voice = 'nova', speed = 1.0 } = req.body || {};

  if (typeof input !== 'string' || !input.trim()) {
    return res.status(400).json({ error: 'Missing text input' });
  }

  const cleanText = input.trim().slice(0, MAX_TEXT_LENGTH);
  const safeVoice = ALLOWED_VOICES.has(voice) ? voice : 'nova';
  const safeSpeed = Math.max(0.75, Math.min(1.25, Number(speed) || 1.0));

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        input: cleanText,
        voice: safeVoice,
        speed: safeSpeed,
        response_format: 'mp3',
      }),
    });

    if (!openaiRes.ok) {
      const errBody = await openaiRes.text().catch(() => '');
      return res.status(openaiRes.status).json({
        error: 'Upstream TTS provider error',
        details: errBody.slice(0, 200),
      });
    }

    const audioBuffer = Buffer.from(await openaiRes.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.status(200).send(audioBuffer);
  } catch (err) {
    console.error('TTS proxy error:', err);
    return res.status(500).json({ error: 'Internal TTS proxy error' });
  }
}
