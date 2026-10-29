import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

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
      return localStorage.getItem(STORAGE_KEYS.SELECTED_LANG) || 'ru-RU';
    } catch {
      return 'ru-RU';
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

  const recognitionRef = useRef(null);
  const voicesRef = useRef([]);
  const isSpeakingRef = useRef(false);
  const speakingIdRef = useRef(null);
  const activeUtteranceRef = useRef(null);

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

  // Speak text with user's chosen voice & language
  const speak = useCallback((text, id = null, onEnd = null) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeakingRef.current && speakingIdRef.current === id && id !== null) {
      stopSpeaking();
      return;
    }

    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }

    const cleaned = cleanTextForSpeech(text);
    if (!cleaned) return;

    const currentLang = selectedLangRef.current || 'ru-RU';
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
          v.name.includes('Google') ||
          v.name.includes('Natural') ||
          v.name.includes('Siri') ||
          v.name.includes('Female') ||
          v.name.includes('Женский')
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
  }, [stopSpeaking]);

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

    stopSpeaking();

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

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

        if (final) {
          setInterimTranscript('');
          setIsListening(false);
          if (onFinalText) {
            onFinalText(final.trim());
          }
        }
      };

      recognition.onerror = (event) => {
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
        }
        setMicError(message);
        if (onError) onError(message);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition', err);
      setIsListening(false);
      setMicError('Ошибка запуска микрофона');
      if (onError) onError('Ошибка запуска микрофона');
    }
  }, [stopSpeaking]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
    setInterimTranscript('');
  }, []);

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
        setIsSettingsOpen
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => useContext(VoiceContext);
