import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORIES_DATA, ICE_BREAKER_PROMPTS, SAFE_AI_FALLBACKS } from '../data/mockData';

const AppContext = createContext();

const STORAGE_KEYS = {
  ONBOARDED: 'sisterhood_onboarded_v1',
  AGE_GROUP: 'sisterhood_age_group_v1',
  COMPLETED_STORIES: 'sisterhood_completed_stories_v1',
  CHAT_MESSAGES: 'sisterhood_chat_messages_v1',
};

const DEFAULT_WELCOME_MESSAGE = {
  id: 'welcome-msg',
  sender: 'ai',
  text: 'Привет, милая! Я твоя виртуальная старшая сестра 🌸 Здесь можно задать любой вопрос о теле, настроении или взрослении без стеснения и страха. Всё останется между нами!',
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export const AppProvider = ({ children }) => {
  // Navigation & Screen State
  const [hasOnboarded, setHasOnboarded] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDED) === 'true';
  });

  const [screen, setScreen] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ONBOARDED) === 'true' ? 'dashboard' : 'onboarding';
  });

  const [activeStoryId, setActiveStoryId] = useState('periods-101');
  const [initialChatPrompt, setInitialChatPrompt] = useState('');

  // Age group state (10-12, 13-15, 16+)
  const [ageGroup, setAgeGroup] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.AGE_GROUP) || '13-15';
  });

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
      return stored ? JSON.parse(stored) : [DEFAULT_WELCOME_MESSAGE];
    } catch {
      return [DEFAULT_WELCOME_MESSAGE];
    }
  });

  // Panic Button / Stealth Overlay State
  const [isPanicOpen, setIsPanicOpen] = useState(false);
  const [panicType, setPanicType] = useState('calculator'); // 'calculator' or 'notes'

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
        setIsPanicOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const completeOnboarding = (chosenAge) => {
    if (chosenAge) {
      setAgeGroup(chosenAge);
      localStorage.setItem(STORAGE_KEYS.AGE_GROUP, chosenAge);
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
    setPanicType(type);
    setIsPanicOpen(true);
  };

  const closePanic = () => {
    setIsPanicOpen(false);
  };

  const clearChatHistory = () => {
    setChatMessages([DEFAULT_WELCOME_MESSAGE]);
    localStorage.removeItem(STORAGE_KEYS.CHAT_MESSAGES);
  };

  const goToChatWithPrompt = (promptText = '') => {
    setInitialChatPrompt(promptText);
    setScreen('chat');
  };

  // Safe client-side assistant logic implementing system prompt rules:
  // "Ты — эмпатичная старшая сестра. Отвечай девочке-подростку (10-15 лет).
  // Язык: простой, поддерживающий, без сложных мед. терминов. Максимум 3-4 предложения.
  // Не ставь диагнозы. Если вопрос про насилие, депрессию или сильную боль — дай базовую поддержку и скажи, как попросить помощи у взрослых."
  const sendChatMessage = async (userText) => {
    if (!userText.trim()) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: userText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Simulate short thinking delay for natural conversational feel
    return new Promise((resolve) => {
      setTimeout(() => {
        const lower = userText.toLowerCase();
        let replyText = '';

        // Safety trigger: pain / medical urgency
        if (lower.includes('очень болит') || lower.includes('невыносим') || lower.includes('скорая') || lower.includes('рвота') || lower.includes('температур')) {
          replyText = 'Милая, если боль очень сильная и не проходит, пожалуйста, не терпи её в одиночку! Обязательно скажи маме, папе или школьной медсестре прямо сейчас — они дадут нужное лекарство или помогут показаться врачу. Я всегда рядом, но твоё здоровье сейчас на первом месте 🫂';
        }
        // Safety trigger: violence / abuse / severe distress
        else if (lower.includes('бьют') || lower.includes('обижают') || lower.includes('трогает') || lower.includes('насили') || lower.includes('умереть') || lower.includes('страшно жить')) {
          replyText = 'Ты в безопасности со мной, и ты ни в чем не виновата! Пожалуйста, обязательно поделись этим с взрослым, которому доверяешь (учительнице, родственнику или школьному психологу). Также есть бесплатный анонимный телефон доверия для детей 8-800-2000-122. Ты очень смелая и не одна!';
        }
        // Ice-breaker matches
        else {
          const match = ICE_BREAKER_PROMPTS.find((p) => 
            lower.includes(p.text.toLowerCase().slice(0, 15)) ||
            (p.tag === 'Тело' && (lower.includes('грудь') || lower.includes('сосок') || lower.includes('размер'))) ||
            (p.tag === 'Общение' && (lower.includes('как сказать маме') || lower.includes('сказать родителям'))) ||
            (p.tag === 'Здоровье' && (lower.includes('болит живот') || lower.includes('тянет низ'))) ||
            (p.tag === 'Возраст' && (lower.includes('когда начнутся') || lower.includes('первые месячные') || lower.includes('во сколько лет')))
          );

          if (match) {
            replyText = match.answer;
          } else if (lower.includes('тампон') || lower.includes('прокладк')) {
            replyText = 'Начинать лучше всего с мягких тонких прокладок (размер Normal или 2-3 капельки) — с ними проще всего обращаться! Тампоны тоже можно пробовать (размера Mini), но только когда ты будешь чувствовать себя уверенно. Главное — менять средство каждые 3–4 часа 🌿';
          } else if (lower.includes('пмс') || lower.includes('плач') || lower.includes('злюсь') || lower.includes('настроени')) {
            replyText = 'Перепады настроения — это проделки гормонов, которые сейчас перестраивают твое тело. Ты совершенно нормальная, и злиться или грустить — тоже часть взросления! Налей теплый чай, укутайся в плед и дай себе отдохнуть 💜';
          } else if (lower.includes('выделени') || lower.includes('белье') || lower.includes('пятно')) {
            replyText = 'Белые или прозрачные выделения без резкого запаха — это признак того, что организм правильно развивается и очищает сам себя. Часто они появляются за несколько месяцев до первой менструации. Ежедневные прокладки помогут чувствовать свежесть!';
          } else {
            replyText = 'Спасибо, что доверяешь мне этот вопрос! Твое тело развивается в своем собственном, абсолютно правильном ритме. Помни: любые изменения — это естественно и не повод для страха. Если есть что-то конкретное, что беспокоит сильнее всего, напиши мне подробнее 🌸';
          }
        }

        const aiMsg = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages((prev) => [...prev, aiMsg]);
        resolve(aiMsg);
      }, 700);
    });
  };

  return (
    <AppContext.Provider
      value={{
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
        goToChatWithPrompt
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
