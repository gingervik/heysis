// Neural AI Voice Service (OpenAI TTS & ElevenLabs)
// Provides hyper-realistic, human-like voice synthesis with warmth and natural prosody.
// Automatically falls back to Web Speech API when offline or when no key is configured.

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
 * Synthesizes audio using OpenAI TTS or ElevenLabs
 * Returns: audioUrl (string blob url) or null if failed / offline
 */
export const fetchNeuralSpeechAudio = async ({ text, config, speed = 1.0 }) => {
  if (!text || !text.trim()) return null;
  const trimmed = text.trim();

  const cfg = config || getStoredVoiceConfig();

  // If engine is set to browser or offline, skip
  if (cfg.engine !== 'neural') return null;
  if (typeof navigator !== 'undefined' && !navigator.onLine) return null;

  // 1. OpenAI TTS
  if (cfg.provider === 'openai') {
    if (!cfg.openaiKey) return null;

    const cacheKey = `openai:${cfg.openaiVoice}:${speed}:${trimmed}`;
    if (audioCache.has(cacheKey)) {
      return audioCache.get(cacheKey);
    }

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
          voice: cfg.openaiVoice || 'nova',
          speed: Math.max(0.75, Math.min(1.25, speed))
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
      console.warn('OpenAI TTS failed, falling back to browser synthesis:', e.message);
      return null;
    }
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
