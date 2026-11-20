#!/usr/bin/env node
/**
 * Pre-generates offline OpenAI TTS MP3 files (voice: nova) for HeySis static content:
 * - Micro-learning Stories (all slides & quiz explanations)
 * - Daily Myths (questions & answers)
 * - Story Cards (titles & subtitles)
 *
 * Usage:
 *   OPENAI_API_KEY=sk-... npm run generate:audio
 *   OPENAI_API_KEY=sk-... node scripts/generate-audio.mjs --lang=en,ru --voice=nova
 *
 * Skips already generated files so it is safe to re-run or resume.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getLocalizedStories, getLocalizedMyths } from '../src/data/mockDataLocalized.js';
import { hashSpeechText, normalizeSpeechText } from '../src/utils/audioHash.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT_DIR, 'public', 'audio');
const MANIFEST_PATH = path.join(AUDIO_DIR, 'manifest.json');

// Parse CLI flags
const args = process.argv.slice(2);
const langArg = args.find((a) => a.startsWith('--lang='))?.split('=')[1] || 'en,ru';
const voiceArg = args.find((a) => a.startsWith('--voice='))?.split('=')[1] || 'nova';
const dryRun = args.includes('--dry-run');
const targetLangs = langArg.split(',').map((s) => s.trim()).filter(Boolean);

// Load .env / .env.local if OPENAI_API_KEY not already in process.env
function loadEnvKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  for (const envFile of ['.env.local', '.env']) {
    const full = path.join(ROOT_DIR, envFile);
    if (fs.existsSync(full)) {
      const content = fs.readFileSync(full, 'utf8');
      const match = content.match(/^(?:VITE_)?OPENAI_API_KEY\s*=\s*["']?([^"'\n\r]+)["']?/m);
      if (match && match[1]) return match[1].trim();
    }
  }
  return '';
}

function getSlideText(story, slide, lang) {
  if (!slide) return '';
  const isPolish = lang === 'pl';
  const isUkrainian = lang === 'uk';
  const isEnglish = lang === 'en';

  if (slide.type === 'intro') {
    return `${story.title}. ${story.subtitle || ''}`;
  }
  if (slide.type === 'theory' || slide.type === 'fact') {
    const tipLabel = isPolish ? 'Wskazówka: ' : isUkrainian ? 'Порада: ' : isEnglish ? 'Tip: ' : 'Совет: ';
    return `${slide.headline || slide.title || ''}. ${slide.text || ''}. ${slide.tip ? `${tipLabel}${slide.tip}` : ''}`;
  }
  if (slide.type === 'quiz') {
    return isPolish
      ? `Pytanie. Prawda czy mit: ${slide.question}. Wybierz na ekranie: to prawda, czy to mit!`
      : isUkrainian
      ? `Запитання. Правда чи міф: ${slide.question}. Обери на екрані: це правда чи міф!`
      : isEnglish
      ? `Question. Fact or myth: ${slide.question}. Choose on screen: is it a fact or a myth!`
      : `Вопрос. Правда или миф: ${slide.question}. Нажми на экране: это правда, или это миф!`;
  }
  if (slide.type === 'completion') {
    return `${slide.title}. ${slide.text}. ${slide.ctaText || ''}`;
  }
  return '';
}

function collectAllTexts(langs) {
  const uniqueMap = new Map(); // hash -> text
  const addText = (raw) => {
    const text = normalizeSpeechText(raw);
    if (!text) return;
    const hash = hashSpeechText(text);
    if (!uniqueMap.has(hash)) {
      uniqueMap.set(hash, text);
    }
  };

  const ageGroups = ['5-7', '8-9', '10-12', '13-15', '16+'];

  for (const lang of langs) {
    const isPolish = lang === 'pl';
    const isUkrainian = lang === 'uk';
    const isEnglish = lang === 'en';

    const stories = getLocalizedStories(lang) || [];
    for (const story of stories) {
      // Dashboard card tap-to-read
      addText(`${story.title}. ${story.subtitle}`);

      for (const slide of story.slides || []) {
        addText(getSlideText(story, slide, lang));

        if (slide.type === 'quiz' && slide.explanation) {
          const correctPrefix = isPolish ? 'Prawidłowo! ' : isUkrainian ? 'Правильно! ' : isEnglish ? 'Correct! ' : 'Правильно! ';
          const wrongPrefix = isPolish ? 'To mit! ' : isUkrainian ? 'Це міф! ' : isEnglish ? 'That is a myth! ' : 'Это миф! ';
          addText(correctPrefix + slide.explanation);
          addText(wrongPrefix + slide.explanation);
        }
      }
    }

    for (const age of ageGroups) {
      const myths = getLocalizedMyths(age, lang) || [];
      for (const myth of myths) {
        const qText = isPolish
          ? `Mit czy prawda. ${myth.question}. Czy to prawda czy mit?`
          : isUkrainian
          ? `Міф чи правда. ${myth.question}. Це правда чи міф?`
          : isEnglish
          ? `Fact or myth. ${myth.question}. Is this a fact or a myth?`
          : `Миф дня. ${myth.question}. Это правда или миф?`;
        addText(qText);
        addText(`${myth.shortAnswer}. ${myth.fullExplanation}`);
      }
    }
  }

  return uniqueMap;
}

async function generateAudioFile(apiKey, text, voice, outPath) {
  const res = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1',
      input: text,
      voice,
      response_format: 'mp3',
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => '');
    throw new Error(`OpenAI TTS HTTP ${res.status}: ${err}`);
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
}

async function main() {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });

  let manifest = {};
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    } catch {
      manifest = {};
    }
  }

  const textsMap = collectAllTexts(targetLangs);
  const totalChars = [...textsMap.values()].reduce((acc, t) => acc + t.length, 0);
  const estimatedCost = ((totalChars / 1_000_000) * 15).toFixed(3); // OpenAI tts-1 is $15 / 1M chars

  console.log(`🎙️  HeySis Static Audio Generator`);
  console.log(`   Languages: ${targetLangs.join(', ')} | Voice: ${voiceArg}`);
  console.log(`   Unique clips: ${textsMap.size} | Total chars: ${totalChars.toLocaleString()} (~$${estimatedCost} USD)`);

  if (dryRun) {
    console.log('   --dry-run enabled, exiting without API calls.');
    return;
  }

  const apiKey = loadEnvKey();
  if (!apiKey) {
    console.error('❌ Missing OPENAI_API_KEY. Run with: OPENAI_API_KEY=sk-... npm run generate:audio');
    process.exit(1);
  }

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const [hash, text] of textsMap.entries()) {
    const filename = `${hash}.mp3`;
    const filePath = path.join(AUDIO_DIR, filename);

    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 500) {
      manifest[hash] = filename;
      skipped += 1;
      continue;
    }

    try {
      await generateAudioFile(apiKey, text, voiceArg, filePath);
      manifest[hash] = filename;
      generated += 1;
      process.stdout.write(`\r   Progress: ${generated + skipped}/${textsMap.size} (new: ${generated}, cached: ${skipped})`);
      // Save manifest incrementally so progress is never lost
      if (generated % 5 === 0) {
        fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
      }
      // Small delay to stay well under rate limits
      await new Promise((r) => setTimeout(r, 150));
    } catch (err) {
      failed += 1;
      console.error(`\n⚠️  Failed clip ${hash}: ${err.message}`);
    }
  }

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\n✅ Done! Generated: ${generated}, Already cached: ${skipped}, Failed: ${failed}`);
  console.log(`   Manifest saved to: public/audio/manifest.json (${Object.keys(manifest).length} clips)`);
}

main();
