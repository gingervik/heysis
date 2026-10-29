import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  STORIES_DATA,
  ICE_BREAKER_PROMPTS_BY_AGE,
  DAILY_MYTHS_BY_AGE,
  SAFE_AI_FALLBACKS
} from '../data/mockData';

const AppContext = createContext();

const STORAGE_KEYS = {
  ONBOARDED: 'sisterhood_onboarded_v1',
  AGE_GROUP: 'sisterhood_age_group_v1',
  COMPLETED_STORIES: 'sisterhood_completed_stories_v1',
  CHAT_MESSAGES: 'sisterhood_chat_messages_v1',
};

const getWelcomeMessage = (age) => {
  if (age === '8-9') {
    return {
      id: 'welcome-msg',
      sender: 'ai',
      text: 'Привет, солнышко! 🌸 Я твоя добрая старшая сестренка. Здесь можно спросить обо всем: о секретах тела, зубках, дружбе в школе или если тебе страшно. Никто не увидит наши сообщения!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
  return {
    id: 'welcome-msg',
    sender: 'ai',
    text: 'Привет, милая! Я твоя виртуальная старшая сестра 🌸 Здесь можно задать любой вопрос о теле, настроении или взрослении без стеснения и страха. Всё останется между нами!',
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
};

export const AppProvider = ({ children }) => {
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
      return stored ? JSON.parse(stored) : [getWelcomeMessage(localStorage.getItem(STORAGE_KEYS.AGE_GROUP) || '13-15')];
    } catch {
      return [getWelcomeMessage('13-15')];
    }
  });

  // Panic Button / Stealth Overlay State
  const [isPanicOpen, setIsPanicOpen] = useState(false);
  const [panicType, setPanicType] = useState('calculator'); // 'calculator' or 'notes'

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
    setChatMessages([getWelcomeMessage(ageGroup)]);
    localStorage.removeItem(STORAGE_KEYS.CHAT_MESSAGES);
  };

  const goToChatWithPrompt = (promptText = '') => {
    setInitialChatPrompt(promptText);
    setScreen('chat');
  };

  // Safe client-side assistant logic adapted by age group:
  // For 8-9 years:
  // - Warm, simple words, short sentences (2-3 sentences), lots of comforting emojis.
  // - Focus on swimsuit rule, boundaries, hygiene, teeth, sleep, friendship, emotions.
  // - Telling parents/teachers as first line of safety.
  // For 10-15+ years:
  // - Empathetic older sister answering puberty questions respectfully without diagnosis.
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
          replyText = ageGroup === '8-9'
            ? 'Солнышко, когда что-то сильно болит — сразу же позови маму, папу или учительницу! Они дадут тебе нужное лекарство или позовут доброго доктора. Не терпи боль в одиночку, взрослые обязательно помогут 🫂'
            : 'Милая, если боль очень сильная и не проходит, пожалуйста, не терпи её в одиночку! Обязательно скажи маме, папе или школьной медсестре прямо сейчас — они дадут нужное лекарство или помогут показаться врачу. Я всегда рядом, но твоё здоровье сейчас на первом месте 🫂';
        }
        // Safety trigger: violence / abuse / severe distress
        else if (lower.includes('бьют') || lower.includes('обижают') || lower.includes('трогает') || lower.includes('насили') || lower.includes('умереть') || lower.includes('страшно жить')) {
          replyText = ageGroup === '8-9'
            ? 'Ты в полной безопасности со мной, и ты ни в чем-ни в чем не виновата! Если кто-то обижает или трогает тебя — немедленно расскажи маме, папе или любимой учительнице. Ты самая смелая девочка, и взрослые тебя защитят!'
            : 'Ты в безопасности со мной, и ты ни в чем не виновата! Пожалуйста, обязательно поделись этим с взрослым, которому доверяешь (учительнице, родственнику или школьному психологу). Также есть бесплатный анонимный телефон доверия для детей 8-800-2000-122. Ты очень смелая и не одна!';
        }
        // Age 8-9 specific handlers
        else if (ageGroup === '8-9') {
          if (lower.includes('купальник') || lower.includes('трогает') || lower.includes('секрет')) {
            replyText = 'Запомни, милая: места под купальником принадлежат только тебе! Никто не может просить показать их. А если кто-то просит хранить «секрет» о прикосновениях — сразу беги к маме или папе. Ты умница!';
          } else if (lower.includes('зуб') || lower.includes('молочн')) {
            replyText = 'Шатающийся зубик — это верный знак, что ты растешь! Молочный зуб уступает место новому, крепкому зубу. Положи выпавший зубик под подушку и не забывай чистить зубки утром и вечером ✨';
          } else if (lower.includes('темнот') || lower.includes('страш') || lower.includes('боюсь')) {
            replyText = 'Бояться — это нормально, даже взрослые иногда боятся! Попроси маму включить ночник и оставить дверь открытой. Обними мягкую игрушку — она будет охранять твои сны 🧸';
          } else if (lower.includes('подруг') || lower.includes('поссорил') || lower.includes('дразн') || lower.includes('школ')) {
            replyText = 'Обижаться очень грустно, солнышко. Если подружка дразнит, скажи твердо: «Мне не нравится, перестань!». А если поссорились — попробуй первой сказать: «Давай играть дружно, я соскучилась». Дружба сильнее ссор 💜';
          } else if (lower.includes('руки') || lower.includes('мыл') || lower.includes('гигиен')) {
            replyText = 'Мыло смывает невидимых микробов-букашек! Мой ручки с теплой водичкой и напевай про себя песенку 20 секунд перед каждым обедом 🧼';
          } else {
            replyText = 'Спасибо, что спросила меня, солнышко! Твое тело растет здоровым и красивым каждый день. Если есть секрет или вопрос, который тебя волнует — напиши мне еще, я всегда помогу 🌸';
          }
        }
        // Age 10-15+ handlers
        else {
          const iceBreakers = ICE_BREAKER_PROMPTS_BY_AGE.default;
          const match = iceBreakers.find((p) => 
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
      }, 600);
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
