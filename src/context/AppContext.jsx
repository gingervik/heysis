import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  STORIES_DATA,
  ICE_BREAKER_PROMPTS_BY_AGE,
  DAILY_MYTHS_BY_AGE,
  SAFE_AI_FALLBACKS
} from '../data/mockData';
import { callAIChat } from '../services/aiChatService';
import { detectLanguage, LANG_VOICE_MAP } from '../services/languageDetector';
import { TRANSLATIONS, getTranslation } from '../i18n/translations';

const AppContext = createContext();

const STORAGE_KEYS = {
  ONBOARDED: 'sisterhood_onboarded_v1',
  AGE_GROUP: 'sisterhood_age_group_v1',
  COMPLETED_STORIES: 'sisterhood_completed_stories_v1',
  CHAT_MESSAGES: 'sisterhood_chat_messages_v1',
  APP_LANG: 'sisterhood_app_lang_v1',
};

const getWelcomeMessage = (age, lang = 'ru') => {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.ru;
  const isKid = age === '5-7' || age === '8-9';
  return {
    id: 'welcome-msg',
    sender: 'ai',
    text: isKid ? dict.welcomeKid : dict.welcomeGeneral,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};

const detectDefaultLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.APP_LANG);
    if (saved) return saved;
  } catch {}
  const navLang = (navigator.language || (navigator.languages && navigator.languages[0]) || 'en').toLowerCase();
  if (navLang.startsWith('uk')) return 'uk';
  if (navLang.startsWith('pl')) return 'pl';
  if (navLang.startsWith('ru')) return 'ru';
  return 'en';
};

export const AppProvider = ({ children }) => {
  // App Language ('en' | 'ru' | 'uk' | 'pl'), auto-detected from browser with 'en' fallback
  const [appLanguage, setAppLanguageState] = useState(detectDefaultLanguage);

  // Age group state ('8-9' | '10-12' | '13-15' | '16+')
  const [ageGroup, setAgeGroupState] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.AGE_GROUP) || '13-15';
  });

  // Navigation & Screen State
  const [hasOnboarded, setHasOnboarded] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDED) === 'true';
  });

  const [screen, setScreen] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDED) === 'true' ? 'dashboard' : 'onboarding';
  });

  const [activeStoryId, setActiveStoryId] = useState('periods-101');
  const [initialChatPrompt, setInitialChatPrompt] = useState('');

  // Completed stories progress
  const [completedStories, setCompletedStories] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COMPLETED_STORIES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Chat message history
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES);
      const currentAge = localStorage.getItem(STORAGE_KEYS.AGE_GROUP) || '13-15';
      const currentLang = detectDefaultLanguage();
      return stored ? JSON.parse(stored) : [getWelcomeMessage(currentAge, currentLang)];
    } catch {
      return [getWelcomeMessage('13-15', 'en')];
    }
  });

  const setAppLanguage = (newLang) => {
    setAppLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEYS.APP_LANG, newLang);
    } catch (e) {}

    // Also sync voice language if matching
    const voiceLangMap = { ru: 'ru-RU', uk: 'uk-UA', pl: 'pl-PL', en: 'en-US' };
    if (voiceLangMap[newLang]) {
      try {
        const storedVoice = localStorage.getItem('sisterhood_voice_settings_v1');
        const parsed = storedVoice ? JSON.parse(storedVoice) : {};
        parsed.lang = voiceLangMap[newLang];
        localStorage.setItem('sisterhood_voice_settings_v1', JSON.stringify(parsed));
      } catch (e) {}
    }

    // If chat only contains the initial welcome message, translate it!
    setChatMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome-msg') {
        return [getWelcomeMessage(ageGroup, newLang)];
      }
      return prev;
    });
  };

  const t = (key) => getTranslation(appLanguage, key);

  // Panic Button / Stealth Overlay State
  const [isPanicOpen, setIsPanicOpen] = useState(false);
  const [panicType, setPanicType] = useState('calculator'); // 'calculator' or 'notes'

  // AI Chat generation state
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [aiStatus, setAiStatus] = useState({ isOnline: true, mode: 'ready' });

  const setAgeGroup = (newAge) => {
    setAgeGroupState(newAge);
    try {
      localStorage.setItem(STORAGE_KEYS.AGE_GROUP, newAge);
    } catch (e) {}

    // If active story belongs to another age, adjust it
    const available = STORIES_DATA.filter((s) => s.targetAges.includes(newAge));
    if (available.length > 0 && !available.some((s) => s.id === activeStoryId)) {
      setActiveStoryId(available[0].id);
    }
  };

  // Persist completed stories
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPLETED_STORIES, JSON.stringify(completedStories));
    } catch (e) {
      console.warn('Storage failed', e);
    }
  }, [completedStories]);

  // Persist chat messages
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(chatMessages));
    } catch (e) {
      console.warn('Storage failed', e);
    }
  }, [chatMessages]);

  // Keyboard shortcut for Panic Button: Press Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (typeof window !== 'undefined' && window.__emergencySilenceVoice) {
          window.__emergencySilenceVoice();
        }
        setIsPanicOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const completeOnboarding = (chosenAge) => {
    if (chosenAge) {
      setAgeGroup(chosenAge);
    }
    setHasOnboarded(true);
    localStorage.setItem(STORAGE_KEYS.ONBOARDED, 'true');
    setScreen('dashboard');
  };

  const openStory = (storyId) => {
    setActiveStoryId(storyId);
    setScreen('stories');
  };

  const markStoryComplete = (storyId) => {
    setCompletedStories((prev) => {
      if (!prev.includes(storyId)) {
        return [...prev, storyId];
      }
      return prev;
    });
  };

  const triggerPanic = (type = 'calculator') => {
    if (typeof window !== 'undefined' && window.__emergencySilenceVoice) {
      window.__emergencySilenceVoice();
    }
    setPanicType(type);
    setIsPanicOpen(true);
  };

  const closePanic = () => {
    setIsPanicOpen(false);
  };

  const clearChatHistory = () => {
    setChatMessages([getWelcomeMessage(ageGroup, appLanguage)]);
    localStorage.removeItem(STORAGE_KEYS.CHAT_MESSAGES);
  };

  const goToChatWithPrompt = (promptText = '') => {
    setInitialChatPrompt(promptText);
    setScreen('chat');
  };

  // Safe client-side assistant logic adapted by age group:
  // Real multi-turn AI Chat or intelligent local fallback
  const sendChatMessage = async (userText) => {
    if (!userText.trim()) return;

    const trimmedText = userText.trim();
    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: trimmedText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsAiTyping(true);

    // Auto-detect if child communicates in a different language
    const detectedLang = detectLanguage(trimmedText);
    let switchedLanguage = null;
    if (detectedLang && ['uk', 'pl', 'en', 'ru'].includes(detectedLang) && detectedLang !== appLanguage) {
      setAppLanguage(detectedLang);
      switchedLanguage = detectedLang;
    }

    try {
      // Determine active voice/language code
      const effectiveLangCode = switchedLanguage || appLanguage;
      let selectedLang = LANG_VOICE_MAP[effectiveLangCode] || 'ru-RU';
      try {
        const storedVoice = localStorage.getItem('sisterhood_voice_settings_v1');
        if (storedVoice) {
          const parsed = JSON.parse(storedVoice);
          if (parsed.lang && !switchedLanguage) selectedLang = parsed.lang;
        }
      } catch (e) {}

      const aiResult = await callAIChat({
        userMessage: trimmedText,
        chatMessages,
        ageGroup,
        selectedLang,
        onStatusChange: (status) => setAiStatus(status)
      });

      // If AI service itself refined the detected language
      if (!switchedLanguage && aiResult.detectedLang && ['uk', 'pl', 'en', 'ru'].includes(aiResult.detectedLang) && aiResult.detectedLang !== appLanguage) {
        setAppLanguage(aiResult.detectedLang);
        switchedLanguage = aiResult.detectedLang;
      }

      const aiMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: aiResult.text,
        isAIGenerated: aiResult.isAIGenerated,
        modelUsed: aiResult.modelUsed,
        switchedLanguage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages((prev) => [...prev, aiMsg]);
      return aiMsg;
    } catch (err) {
      console.warn('AI chat error handled with gentle fallback:', err);
      const curLang = switchedLanguage || appLanguage;
      const fallbackText = curLang === 'uk'
        ? ((ageGroup === '5-7' || ageGroup === '8-9')
            ? 'Сонечко, я завжди з тобою 🌸 Якщо в тебе є запитання або таємниця — я з радістю відповім!'
            : 'Люба, дякую за запитання! Твоє тіло розвивається у своєму власному ритмі. Напиши мені сміливо, якщо щось тебе турбує 💜')
        : curLang === 'pl'
        ? ((ageGroup === '5-7' || ageGroup === '8-9')
            ? 'Słoneczko, zawsze jestem przy Tobie 🌸 Jeśli masz pytanko lub sekret — z radością odpowiem!'
            : 'Kochana, dziękuję za pytanie! Twoje ciało rozwija się w swoim własnym tempie. Napisz mi śmiało, jeśli coś Cię nurtuje 💜')
        : curLang === 'en'
        ? ((ageGroup === '5-7' || ageGroup === '8-9')
            ? 'Sweetheart, I am always right here for you 🌸 If you have a question or secret, I will gladly answer!'
            : 'Dear, thank you for your question! Your body grows and develops at its own unique pace. Feel free to ask me anything on your mind 💜')
        : ((ageGroup === '5-7' || ageGroup === '8-9')
            ? 'Солнышко, я всегда с тобой 🌸 Если у тебя есть вопросик или секрет — я с радостью отвечу!'
            : 'Милая, спасибо за вопрос! Твое тело развивается в гармонии и в своем собственном ритме. Напиши мне подробнее, если что-то тебя беспокоит 💜');

      const fallbackMsg = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: fallbackText,
        switchedLanguage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
      return fallbackMsg;
    } finally {
      setIsAiTyping(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        appLanguage,
        setAppLanguage,
        t,
        screen,
        setScreen,
        activeStoryId,
        setActiveStoryId,
        openStory,
        ageGroup,
        setAgeGroup,
        hasOnboarded,
        completeOnboarding,
        completedStories,
        markStoryComplete,
        isPanicOpen,
        panicType,
        triggerPanic,
        closePanic,
        chatMessages,
        sendChatMessage,
        clearChatHistory,
        initialChatPrompt,
        setInitialChatPrompt,
        goToChatWithPrompt,
        isAiTyping,
        aiStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
