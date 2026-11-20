// Neural AI Voice Service (Pre-generated Offline OpenAI MP3s + OpenAI TTS / Serverless Proxy + ElevenLabs)
// Provides hyper-realistic, human-like voice synthesis with warmth and natural prosody.
// Priority: 1) Offline pre-generated MP3 -> 2) User API Key -> 3) Serverless Proxy (/api/tts) -> 4) Web Speech API
import { hashSpeechText } from '../utils/audioHash.js';

const STORAGE_KEYS = {
  ENGINE: 'sisterhood_voice_engine_v1', // 'neural' | 'browser'
  PROVIDER: 'sisterhood_neural_provider_v1', // 'openai' | 'elevenlabs'
  OPENAI_KEY: 'sisterhood_openai_tts_key_v1',
  OPENAI_VOICE: 'sisterhood_openai_tts_voice_v1', // 'nova' | 'shimmer' | 'alloy' | 'fable'
  ELEVEN_KEY: 'sisterhood_eleven_key_v1',
  ELEVEN_VOICE_ID: 'sisterhood_eleven_voice_id_v1',
};

// Preset voices renowned for gentleness, warmth, and natural big-sister tone
export const NEURAL_VOICE_PRESETS = {
  openai: [
    {
      id: 'nova',
      name: 'Нова (Nova)',
      description: 'Теплый, заботливый, молодой женский голос — идеален для Старшей Сестры 🌸',
      recommended: true
    },
    {
      id: 'shimmer',
      name: 'Шиммер (Shimmer)',
      description: 'Нежный, мягкий и доверительный тон ✨',
      recommended: false
    },
    {
      id: 'alloy',
      name: 'Аллой (Alloy)',
      description: 'Спокойный, нейтральный и четкий 🌿',
      recommended: false
    },
    {
      id: 'fable',
      name: 'Фейбл (Fable)',
      description: 'Выразительный, сказочный тембр 📖',
      recommended: false
    }
  ],
  elevenlabs: [
    {
      id: '21m00Tcm4TlvDq8ikWAM',
      name: 'Rachel (Рэйчел)',
      description: 'Спокойный, бархатный, поддерживающий голос',
      recommended: true
    },
    {
      id: 'EXAVITQu4vr4xnSDxMaL',
      name: 'Bella (Белла)',
      description: 'Молодой, теплый и искренний тембр',
      recommended: false
    },
    {
      id: 'XB0fDUnXU5ikFXMbCpxB',
      name: 'Charlotte (Шарлотта)',
      description: 'Нежная, бережная интонация',
      recommended: false
    }
  ]
};

// In-memory audio blob URL cache to save API credits & provide instant playback for repeated texts
const audioCache = new Map();

// Lazy-loaded manifest of pre-generated offline OpenAI MP3 clips (public/audio/manifest.json)
let staticManifestPromise = null;
const loadStaticAudioManifest = async () => {
  if (typeof window === 'undefined') return {};
  if (!staticManifestPromise) {
    staticManifestPromise = fetch('./audio/manifest.json')
      .then((res) => (res.ok ? res.json() : {}))
      .catch(() => ({}));
  }
  return staticManifestPromise;
};

// Optional serverless proxy base URL (e.g. https://heysis.vercel.app); empty string uses same-origin /api/tts
const PROXY_BASE = (import.meta.env.VITE_PROXY_URL || '').replace(/\/+$/, '');

// Default fallback key from environment variable (empty string by default for public open-source)
const DEFAULT_OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

export const getStoredVoiceConfig = () => {
  if (typeof window === 'undefined') {
    return {
      engine: 'neural',
      provider: 'openai',
      openaiKey: DEFAULT_OPENAI_KEY,
      openaiVoice: 'nova',
      elevenKey: '',
      elevenVoiceId: '21m00Tcm4TlvDq8ikWAM'
    };
  }

  // If user previously set OpenAI API key in chat, reuse it
  const chatOpenAIKey = localStorage.getItem('sisterhood_openai_api_key_v1');

  const savedEngine = localStorage.getItem(STORAGE_KEYS.ENGINE);
  const savedOpenaiKey = localStorage.getItem(STORAGE_KEYS.OPENAI_KEY);
  const savedElevenKey = localStorage.getItem(STORAGE_KEYS.ELEVEN_KEY) || '';

  const activeOpenaiKey = (savedOpenaiKey !== null && savedOpenaiKey !== '')
    ? savedOpenaiKey
    : (chatOpenAIKey || DEFAULT_OPENAI_KEY);

  // Auto-switch to neural with OpenAI Nova by default
  const defaultEngine = savedEngine || 'neural';

  return {
    engine: defaultEngine,
    provider: localStorage.getItem(STORAGE_KEYS.PROVIDER) || 'openai',
    openaiKey: activeOpenaiKey,
    openaiVoice: localStorage.getItem(STORAGE_KEYS.OPENAI_VOICE) || 'nova',
    elevenKey: savedElevenKey,
    elevenVoiceId: localStorage.getItem(STORAGE_KEYS.ELEVEN_VOICE_ID) || '21m00Tcm4TlvDq8ikWAM'
  };
};

export const saveStoredVoiceConfig = (config) => {
  if (typeof window === 'undefined') return;
  if (config.engine !== undefined) localStorage.setItem(STORAGE_KEYS.ENGINE, config.engine);
  if (config.provider !== undefined) localStorage.setItem(STORAGE_KEYS.PROVIDER, config.provider);
  if (config.openaiKey !== undefined) {
    localStorage.setItem(STORAGE_KEYS.OPENAI_KEY, config.openaiKey.trim());
    // Also sync with chat OpenAI key if empty
    if (!localStorage.getItem('sisterhood_openai_api_key_v1')) {
      localStorage.setItem('sisterhood_openai_api_key_v1', config.openaiKey.trim());
    }
  }
  if (config.openaiVoice !== undefined) localStorage.setItem(STORAGE_KEYS.OPENAI_VOICE, config.openaiVoice);
  if (config.elevenKey !== undefined) localStorage.setItem(STORAGE_KEYS.ELEVEN_KEY, config.elevenKey.trim());
  if (config.elevenVoiceId !== undefined) localStorage.setItem(STORAGE_KEYS.ELEVEN_VOICE_ID, config.elevenVoiceId);
};

/**
 * Synthesizes audio using:
 * 1. Pre-generated offline OpenAI MP3s (instant, free, works 100% offline)
 * 2. User's own OpenAI TTS / ElevenLabs key (direct)
 * 3. Secure Serverless Proxy (/api/tts) when hosted on Vercel / Cloudflare
 * Returns: audioUrl (string url or blob url) or null if failed / offline
 */
export const fetchNeuralSpeechAudio = async ({ text, rawText, config, speed = 1.0 }) => {
  if (!text || !text.trim()) return null;
  const trimmed = text.trim();

  const cfg = config || getStoredVoiceConfig();

  // If engine is explicitly set to browser, skip neural audio
  if (cfg.engine !== 'neural') return null;

  // 0. Check pre-generated static offline OpenAI MP3 first (works even offline!)
  // Check both rawText (with emojis) and cleaned text so every pre-generated clip matches 100%
  try {
    const manifest = await loadStaticAudioManifest();
    if (manifest) {
      const candidates = [rawText, trimmed].filter(Boolean);
      for (const candidate of candidates) {
        const hash = hashSpeechText(candidate);
        if (manifest[hash]) {
          return `./audio/${manifest[hash]}`;
        }
      }
    }
  } catch {
    // ignore manifest lookup errors
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) return null;

  // 1. OpenAI TTS (Direct with user key OR via Secure Serverless Proxy)
  if (cfg.provider === 'openai') {
    const safeSpeed = Math.max(0.75, Math.min(1.25, speed));
    const voice = cfg.openaiVoice || 'nova';
    const cacheKey = `openai:${voice}:${safeSpeed}:${trimmed}`;
    if (audioCache.has(cacheKey)) {
      return audioCache.get(cacheKey);
    }

    // 1a. Direct OpenAI call if user configured their own key
    if (cfg.openaiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cfg.openaiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'tts-1',
            input: trimmed,
            voice,
            speed: safeSpeed
          })
        });

        if (!response.ok) {
          const errJson = await response.json().catch(() => ({}));
          throw new Error(errJson?.error?.message || `OpenAI TTS HTTP ${response.status}`);
        }

        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        audioCache.set(cacheKey, audioUrl);
        return audioUrl;
      } catch (e) {
        console.warn('OpenAI TTS failed, falling back:', e.message);
        return null;
      }
    }

    // 1b. Secure Serverless Proxy (/api/tts) — keeps API key on server
    try {
      const proxyUrl = `${PROXY_BASE}/api/tts`;
      const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: trimmed,
          voice,
          speed: safeSpeed
        })
      });

      if (response.ok && (response.headers.get('content-type') || '').includes('audio')) {
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        audioCache.set(cacheKey, audioUrl);
        return audioUrl;
      }
    } catch {
      // Proxy unavailable (e.g. static GitHub Pages without VITE_PROXY_URL) — fall back silently
    }

    return null;
  }

  // 2. ElevenLabs Multilingual
  if (cfg.provider === 'elevenlabs') {
    if (!cfg.elevenKey) return null;

    const voiceId = cfg.elevenVoiceId || '21m00Tcm4TlvDq8ikWAM';
    const cacheKey = `eleven:${voiceId}:${trimmed}`;
    if (audioCache.has(cacheKey)) {
      return audioCache.get(cacheKey);
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'xi-api-key': cfg.elevenKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: trimmed,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs HTTP ${response.status}`);
      }

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      audioCache.set(cacheKey, audioUrl);
      return audioUrl;
    } catch (e) {
      console.warn('ElevenLabs TTS failed, falling back to browser synthesis:', e.message);
      return null;
    }
  }

  return null;
};
