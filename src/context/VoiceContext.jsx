import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from './AppContext';
import { detectVoiceLangCode, LANG_VOICE_MAP } from '../services/languageDetector';
import {
  getStoredVoiceConfig,
  saveStoredVoiceConfig,
  fetchNeuralSpeechAudio,
  NEURAL_VOICE_PRESETS
} from '../services/aiVoiceService';

const VoiceContext = createContext();

const STORAGE_KEYS = {
  VOICE_ENABLED: 'sisterhood_voice_enabled_v1',
  SELECTED_VOICE_URI: 'sisterhood_voice_uri_v1',
  SELECTED_LANG: 'sisterhood_voice_lang_v1',
  SPEECH_RATE: 'sisterhood_speech_rate_v1',
  SPEECH_PITCH: 'sisterhood_speech_pitch_v1'
};

export const SUPPORTED_VOICE_LANGUAGES = [
  { code: 'ru-RU', label: 'Русский', flag: '🌸', sample: 'Привет! Я твоя добрая старшая сестренка. Здесь ты в безопасности.' },
  { code: 'pl-PL', label: 'Polski', flag: '🇵🇱', sample: 'Cześć! Jestem Twoją wirtualną starszą siostrą. Tutaj jesteś w pełni bezpieczna.' },
  { code: 'en-US', label: 'English', flag: '✨', sample: 'Hello! I am your supportive digital big sister. You are safe here.' },
  { code: 'uk-UA', label: 'Українська', flag: '🌻', sample: 'Привіт! Я твоя віртуальна старша сестричка. Тут ти в повній безпеці.' },
  { code: 'kk-KZ', label: 'Қазақша', flag: '☀️', sample: 'Сәлем! Мен сенің қолдаушы үлкен әпкеңмін. Мұнда бәрі қауіпсіз.' },
  { code: 'be-BY', label: 'Беларуская', flag: '🌾', sample: 'Прывітанне! Я твая старэйшая сястра. Тут твая бяспечная прастора.' },
];

// Clean emojis and markdown formatting for clean, pleasant speech synthesis
export const cleanTextForSpeech = (text) => {
  if (!text) return '';
  return text
    // Remove emojis & pictographs
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{2388}-\u{23E8}]/gu, '')
    // Remove markdown markers (*, _, #, `, ~, >, -)
    .replace(/[*_#`~>]/g, '')
    // Replace double dashes or arrows with spoken equivalents
    .replace(/➔|->/g, ' затем ')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
};

export const VoiceProvider = ({ children }) => {
  const [hasSpeechSynthesis, setHasSpeechSynthesis] = useState(false);
  const [hasSpeechRecognition, setHasSpeechRecognition] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingId, setSpeakingId] = useState(null);

  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [micError, setMicError] = useState(null);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [voices, setVoices] = useState([]);

  // Voice preferences with localStorage persistence
  const [voiceEnabled, setVoiceEnabledState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VOICE_ENABLED);
      return stored !== null ? stored === 'true' : true;
    } catch {
      return true;
    }
  });

  const [selectedVoiceURI, setSelectedVoiceURIState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.SELECTED_VOICE_URI) || '';
    } catch {
      return '';
    }
  });

  const [selectedLang, setSelectedLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_LANG);
      if (saved) return saved;
      const nav = (typeof navigator !== 'undefined' ? (navigator.language || 'en-US') : 'en-US').toLowerCase();
      if (nav.startsWith('uk')) return 'uk-UA';
      if (nav.startsWith('pl')) return 'pl-PL';
      if (nav.startsWith('ru')) return 'ru-RU';
      return 'en-US';
    } catch {
      return 'en-US';
    }
  });

  const [speechRate, setSpeechRateState] = useState(() => {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.SPEECH_RATE);
      return val ? parseFloat(val) : 0.92;
    } catch {
      return 0.92;
    }
  });

  const [speechPitch, setSpeechPitchState] = useState(() => {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.SPEECH_PITCH);
      return val ? parseFloat(val) : 1.05;
    } catch {
      return 1.05;
    }
  });

  // Synchronize voice language when appLanguage changes in AppContext
  const appContext = typeof useApp === 'function' ? useApp() : null;
  const appLanguage = appContext?.appLanguage;

  useEffect(() => {
    if (!appLanguage) return;
    const targetCode = LANG_VOICE_MAP[appLanguage];
    if (targetCode && targetCode !== selectedLang) {
      setSelectedLangState(targetCode);
      selectedLangRef.current = targetCode;
      try {
        localStorage.setItem(STORAGE_KEYS.SELECTED_LANG, targetCode);
      } catch (e) {}
    }
  }, [appLanguage, selectedLang]);

  // Neural Voice Configuration
  const [voiceConfig, setVoiceConfigState] = useState(() => getStoredVoiceConfig());
  const voiceConfigRef = useRef(voiceConfig);

  const updateVoiceConfig = useCallback((newConfig) => {
    setVoiceConfigState((prev) => {
      const updated = { ...prev, ...newConfig };
      saveStoredVoiceConfig(updated);
      voiceConfigRef.current = updated;
      return updated;
    });
  }, []);

  const recognitionRef = useRef(null);
  const voicesRef = useRef([]);
  const isSpeakingRef = useRef(false);
  const speakingIdRef = useRef(null);
  const activeUtteranceRef = useRef(null);
  const activeAudioRef = useRef(null);

  const selectedVoiceURIRef = useRef(selectedVoiceURI);
  const selectedLangRef = useRef(selectedLang);
  const speechRateRef = useRef(speechRate);
  const speechPitchRef = useRef(speechPitch);

  // Sync refs with state
  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  useEffect(() => {
    speakingIdRef.current = speakingId;
  }, [speakingId]);

  useEffect(() => {
    selectedVoiceURIRef.current = selectedVoiceURI;
  }, [selectedVoiceURI]);

  useEffect(() => {
    selectedLangRef.current = selectedLang;
  }, [selectedLang]);

  useEffect(() => {
    speechRateRef.current = speechRate;
  }, [speechRate]);

  useEffect(() => {
    speechPitchRef.current = speechPitch;
  }, [speechPitch]);

  // Setters with localStorage
  const setSelectedVoiceURI = useCallback((uri) => {
    setSelectedVoiceURIState(uri);
    try {
      localStorage.setItem(STORAGE_KEYS.SELECTED_VOICE_URI, uri);
    } catch (e) {}
  }, []);

  const setSelectedLang = useCallback((langCode) => {
    setSelectedLangState(langCode);
    try {
      localStorage.setItem(STORAGE_KEYS.SELECTED_LANG, langCode);
    } catch (e) {}
    // Reset selected voice URI so a matching voice in the new language will be picked
    setSelectedVoiceURI('');
  }, [setSelectedVoiceURI]);

  const setSpeechRate = useCallback((rate) => {
    setSpeechRateState(rate);
    try {
      localStorage.setItem(STORAGE_KEYS.SPEECH_RATE, String(rate));
    } catch (e) {}
  }, []);

  const setSpeechPitch = useCallback((pitch) => {
    setSpeechPitchState(pitch);
    try {
      localStorage.setItem(STORAGE_KEYS.SPEECH_PITCH, String(pitch));
    } catch (e) {}
  }, []);

  // Check browser capabilities and setup voice loading
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ua = navigator.userAgent || '';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    setIsMobileDevice(isMobile);

    if ('speechSynthesis' in window) {
      setHasSpeechSynthesis(true);

      const updateVoices = () => {
        try {
          const list = window.speechSynthesis.getVoices() || [];
          if (list.length > 0) {
            voicesRef.current = list;
            setVoices(list);
          }
        } catch (e) {
          console.warn('Could not load voices:', e);
        }
      };

      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setHasSpeechRecognition(true);
    }
  }, []);

  // Unlock mobile WebKit / Safari audio pipeline on first user tap/click
  const unlockAudio = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        if (!window.__appAudioCtx) {
          window.__appAudioCtx = new AudioCtx();
        }
        if (window.__appAudioCtx.state === 'suspended') {
          window.__appAudioCtx.resume();
        }
      }

      if ('speechSynthesis' in window) {
        const unlockUtterance = new SpeechSynthesisUtterance(' ');
        unlockUtterance.volume = 0.01;
        unlockUtterance.rate = 2.0;
        window.speechSynthesis.speak(unlockUtterance);
        window.speechSynthesis.resume();
      }

      setIsAudioUnlocked(true);
    } catch (e) {
      console.warn('Audio unlock warning:', e);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleFirstTouch = () => {
      unlockAudio();
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('touchend', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };

    window.addEventListener('touchstart', handleFirstTouch, { passive: true });
    window.addEventListener('touchend', handleFirstTouch, { passive: true });
    window.addEventListener('click', handleFirstTouch, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('touchend', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
    };
  }, [unlockAudio]);

  const setVoiceEnabled = useCallback((val) => {
    setVoiceEnabledState(val);
    try {
      localStorage.setItem(STORAGE_KEYS.VOICE_ENABLED, String(val));
    } catch (e) {}
    if (!val) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      setSpeakingId(null);
      isSpeakingRef.current = false;
      speakingIdRef.current = null;
    }
  }, []);

  // Stop Text-to-Speech immediately - STABLE REFERENCE
  const stopSpeaking = useCallback(() => {
    if (activeAudioRef.current) {
      try {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
      } catch (e) {}
      activeAudioRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    }
    activeUtteranceRef.current = null;
    if (typeof window !== 'undefined') {
      window.__currentUtterance = null;
    }
    setIsSpeaking(false);
    setSpeakingId(null);
    isSpeakingRef.current = false;
    speakingIdRef.current = null;
  }, []);

  // Internal helper for native browser speech synthesis fallback
  const fallbackBrowserSpeak = useCallback((cleaned, id, onEnd) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(false);
      setSpeakingId(null);
      isSpeakingRef.current = false;
      speakingIdRef.current = null;
      return;
    }

    // Dynamic language detection for this specific utterance so text is pronounced with native phonetics
    const detectedVoiceLang = detectVoiceLangCode(cleaned, selectedLangRef.current || 'ru-RU');
    const currentLang = detectedVoiceLang;
    const langPrefix = currentLang.split('-')[0].toLowerCase();

    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = currentLang;

    const available = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();

    // 1. Try to find user explicitly selected voice by URI
    let chosenVoice = null;
    if (selectedVoiceURIRef.current) {
      chosenVoice = available.find(v => v.voiceURI === selectedVoiceURIRef.current);
    }

    // 2. Fallback: match language and pick friendly natural/female voice
    if (!chosenVoice) {
      const langMatches = available.filter(v => v.lang && (
        v.lang.toLowerCase().startsWith(langPrefix) ||
        v.lang.toLowerCase().replace('_', '-').includes(langPrefix)
      ));

      if (langMatches.length > 0) {
        chosenVoice = langMatches.find(v => (
          v.name.includes('Milena') ||
          v.name.includes('Tatyana') ||
          v.name.includes('Katya') ||
          v.name.includes('Lesya') ||
          v.name.includes('Polina') ||
          v.name.includes('Oksana') ||
          v.name.includes('Zofia') ||
          v.name.includes('Maja') ||
          v.name.includes('Ewa') ||
          v.name.includes('Samantha') ||
          v.name.includes('Victoria') ||
          v.name.includes('Karen') ||
          v.name.includes('Lada') ||
          v.name.includes('Google') ||
          v.name.includes('Natural') ||
          v.name.includes('Siri') ||
          v.name.includes('Female') ||
          v.name.includes('Женский') ||
          v.name.includes('Жіночий')
        )) || langMatches[0];
      }
    }

    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.rate = speechRateRef.current || 0.92;
    utterance.pitch = speechPitchRef.current || 1.05;

    activeUtteranceRef.current = utterance;
    window.__currentUtterance = utterance;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingId(id);
      isSpeakingRef.current = true;
      speakingIdRef.current = id;
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingId(null);
      isSpeakingRef.current = false;
      speakingIdRef.current = null;
      activeUtteranceRef.current = null;
      window.__currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn('SpeechSynthesis error:', e.error || e);
      }
      setIsSpeaking(false);
      setSpeakingId(null);
      isSpeakingRef.current = false;
      speakingIdRef.current = null;
      activeUtteranceRef.current = null;
      window.__currentUtterance = null;
    };

    try {
      window.speechSynthesis.speak(utterance);
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (err) {
      console.warn('Failed to call speak:', err);
    }
  }, []);

  // Speak text with either Neural AI Voice (OpenAI / ElevenLabs) or fallback browser speech
  const speak = useCallback(async (text, id = null, onEnd = null) => {
    if (typeof window === 'undefined') return;

    if (isSpeakingRef.current && speakingIdRef.current === id && id !== null) {
      stopSpeaking();
      return;
    }

    stopSpeaking();

    const cleaned = cleanTextForSpeech(text);
    if (!cleaned) return;

    // Check if Neural AI Voice should be used
    // Works with: 1) Pre-generated offline OpenAI MP3s, 2) User API key, 3) Secure /api/tts proxy
    const cfg = voiceConfigRef.current || getStoredVoiceConfig();

    if (cfg.engine === 'neural') {
      setIsSpeaking(true);
      setSpeakingId(id);
      isSpeakingRef.current = true;
      speakingIdRef.current = id;

      try {
        const audioUrl = await fetchNeuralSpeechAudio({
          text: cleaned,
          rawText: text,
          config: cfg,
          speed: speechRateRef.current || 1.0
        });

        // Abort if speaking was stopped during fetch
        if (!isSpeakingRef.current || speakingIdRef.current !== id) {
          return;
        }

        if (audioUrl) {
          const audio = new Audio(audioUrl);
          activeAudioRef.current = audio;
          // Keep native 1.0x playbackRate for OpenAI neural MP3s to avoid browser time-stretch distortion
          audio.playbackRate = 1.0;

          audio.onended = () => {
            activeAudioRef.current = null;
            setIsSpeaking(false);
            setSpeakingId(null);
            isSpeakingRef.current = false;
            speakingIdRef.current = null;
            if (onEnd) onEnd();
          };

          audio.onerror = (e) => {
            console.warn('Neural audio playback error, falling back to browser synthesis:', e);
            activeAudioRef.current = null;
            fallbackBrowserSpeak(cleaned, id, onEnd);
          };

          await audio.play();
          return;
        }
      } catch (err) {
        console.warn('Neural speech error, falling back to browser:', err);
      }
    }

    // Default / Fallback: Browser Web Speech API
    fallbackBrowserSpeak(cleaned, id, onEnd);
  }, [stopSpeaking, fallbackBrowserSpeak]);

  // Safe teardown of any active speech recognition session
  const cleanupRecognition = useCallback(() => {
    if (recognitionRef.current) {
      try {
        const rec = recognitionRef.current;
        recognitionRef.current = null;
        rec.onresult = null;
        rec.onerror = null;
        rec.onend = null;
        rec.onstart = null;
        rec.abort();
      } catch (e) {
        // Ignore abort errors
      }
    }
  }, []);

  // Start Speech-to-Text dictation with selected language
  const startListening = useCallback((onFinalText, onError) => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const err = 'Голосовой ввод не поддерживается этим браузером';
      setMicError(err);
      if (onError) onError(err);
      return;
    }

    // Stop TTS so mic doesn't hear sister's voice
    stopSpeaking();

    // Clean up previous recognition session cleanly
    cleanupRecognition();

    try {
      const currentLang = selectedLangRef.current || 'ru-RU';
      const recognition = new SpeechRecognition();
      recognition.lang = currentLang;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      setMicError(null);
      setInterimTranscript('');

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            final += item[0].transcript;
          } else {
            interim += item[0].transcript;
          }
        }

        if (interim) {
          setInterimTranscript(interim);
        }

        if (final && final.trim()) {
          const trimmedFinal = final.trim();
          setInterimTranscript('');
          setIsListening(false);

          // Gracefully stop recognition so the browser releases the audio capture stream immediately
          try {
            recognition.stop();
          } catch (e) {}

          if (recognitionRef.current === recognition) {
            recognitionRef.current = null;
          }

          if (onFinalText) {
            onFinalText(trimmedFinal);
          }
        }
      };

      recognition.onerror = (event) => {
        // Discard aborted or canceled events triggered intentionally on stop/cleanup
        if (event.error === 'aborted' || event.error === 'canceled') {
          return;
        }

        console.warn('SpeechRecognition error:', event.error);
        setIsListening(false);
        setInterimTranscript('');

        let message = 'Не удалось распознать речь';
        if (event.error === 'not-allowed') {
          message = 'Разреши доступ к микрофону в настройках браузера 🎤';
        } else if (event.error === 'no-speech') {
          message = 'Я ничего не услышала, попробуй сказать еще раз!';
        } else if (event.error === 'network') {
          message = 'Для распознавания речи требуется подключение к интернету';
        } else if (event.error === 'audio-capture') {
          message = 'Микрофон не обнаружен или занят другим приложением';
        }

        setMicError(message);
        if (onError) onError(message);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
        if (recognitionRef.current === recognition) {
          recognitionRef.current = null;
        }
      };

      recognitionRef.current = recognition;

      try {
        recognition.start();
      } catch (startErr) {
        console.warn('Initial recognition.start failed, retrying after release...', startErr);
        // If browser audio thread was briefly releasing previous session, retry after short delay
        setTimeout(() => {
          try {
            recognition.start();
          } catch (retryErr) {
            console.error('Recognition retry failed:', retryErr);
            setIsListening(false);
            setMicError('Ошибка запуска микрофона');
            if (onError) onError('Ошибка запуска микрофона');
          }
        }, 150);
      }
    } catch (err) {
      console.error('Failed to create speech recognition', err);
      setIsListening(false);
      setMicError('Ошибка запуска микрофона');
      if (onError) onError('Ошибка запуска микрофона');
    }
  }, [stopSpeaking, cleanupRecognition]);

  const stopListening = useCallback(() => {
    cleanupRecognition();
    setIsListening(false);
    setInterimTranscript('');
  }, [cleanupRecognition]);

  // Panic safety listener: abort all voice and listening instantly
  useEffect(() => {
    window.__emergencySilenceVoice = () => {
      stopSpeaking();
      stopListening();
    };
    return () => {
      delete window.__emergencySilenceVoice;
    };
  }, [stopSpeaking, stopListening]);

  return (
    <VoiceContext.Provider
      value={{
        hasSpeechSynthesis,
        hasSpeechRecognition,
        voices,
        selectedVoiceURI,
        setSelectedVoiceURI,
        selectedLang,
        setSelectedLang,
        speechRate,
        setSpeechRate,
        speechPitch,
        setSpeechPitch,
        voiceEnabled,
        setVoiceEnabled,
        isSpeaking,
        speakingId,
        speak,
        stopSpeaking,
        isListening,
        interimTranscript,
        micError,
        startListening,
        stopListening,
        unlockAudio,
        isMobileDevice,
        isAudioUnlocked,
        isSettingsOpen,
        setIsSettingsOpen,
        voiceConfig,
        updateVoiceConfig,
        NEURAL_VOICE_PRESETS
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => useContext(VoiceContext);
