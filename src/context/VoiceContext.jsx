import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

const VoiceContext = createContext();

const STORAGE_KEYS = {
  VOICE_ENABLED: 'sisterhood_voice_enabled_v1',
};

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

  const [voiceEnabled, setVoiceEnabledState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VOICE_ENABLED);
      return stored !== null ? stored === 'true' : true; // Default ON for accessibility
    } catch {
      return true;
    }
  });

  const recognitionRef = useRef(null);
  const voicesRef = useRef([]);

  // Check browser capabilities
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        setHasSpeechSynthesis(true);

        const updateVoices = () => {
          voicesRef.current = window.speechSynthesis.getVoices();
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
    }
  }, []);

  const setVoiceEnabled = (val) => {
    setVoiceEnabledState(val);
    try {
      localStorage.setItem(STORAGE_KEYS.VOICE_ENABLED, String(val));
    } catch (e) {}
    if (!val) {
      stopSpeaking();
    }
  };

  // Stop Text-to-Speech immediately
  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeakingId(null);
  }, []);

  // Speak text with friendly Russian voice at child-appropriate tempo
  const speak = useCallback((text, id = null, onEnd = null) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // If currently speaking this exact item, toggle off
    if (isSpeaking && speakingId === id && id !== null) {
      stopSpeaking();
      return;
    }

    // Cancel any previous utterance
    stopSpeaking();

    const cleaned = cleanTextForSpeech(text);
    if (!cleaned) return;

    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = 'ru-RU';

    // Best-effort Russian voice picking (prefer gentle female or natural RU voice)
    const available = voicesRef.current.length > 0 ? voicesRef.current : window.speechSynthesis.getVoices();
    const ruVoice = available.find(v => v.lang.startsWith('ru') && (
      v.name.includes('Milena') ||
      v.name.includes('Tatyana') ||
      v.name.includes('Google') ||
      v.name.includes('Katya') ||
      v.name.includes('Female') ||
      v.name.includes('Женский')
    )) || available.find(v => v.lang.startsWith('ru')) || available.find(v => v.lang.includes('RU'));

    if (ruVoice) {
      utterance.voice = ruVoice;
    }

    // Gentle, accessible speed (0.91) and slightly warmer pitch (1.05) for young kids
    utterance.rate = 0.92;
    utterance.pitch = 1.05;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setSpeakingId(id);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingId(null);
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsSpeaking(false);
      setSpeakingId(null);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, speakingId, stopSpeaking]);

  // Start Speech-to-Text dictation
  const startListening = useCallback((onFinalText, onError) => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const err = 'Голосовой ввод не поддерживается в этом браузере';
      setMicError(err);
      if (onError) onError(err);
      return;
    }

    // Stop TTS if speaking so mic doesn't record our own speaker
    stopSpeaking();

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'ru-RU';
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
        stopListening
      }}
    >
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => useContext(VoiceContext);
