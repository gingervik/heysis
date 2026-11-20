// Fast, deterministic, zero-dependency 64-bit hash (dual FNV-1a)
// Shared between browser (aiVoiceService.js) and Node CLI (scripts/generate-audio.mjs)
// so pre-generated OpenAI TTS MP3 files match spoken text 100% offline.

export function normalizeSpeechText(text) {
  return String(text || '')
    .trim()
    .replace(/\s+/g, ' ');
}

export function hashSpeechText(text) {
  const str = normalizeSpeechText(text);
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;

  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 ^= ch;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= ch + i;
    h2 = Math.imul(h2, 0x85ebca6b);
  }

  return (h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0');
}
