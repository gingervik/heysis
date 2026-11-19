import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { getParentGuideData } from '../data/parentGuideData';
import { callAIChat } from '../services/aiChatService';
import {
  ArrowLeft,
  ShieldCheck,
  BookOpen,
  Calendar,
  CheckSquare,
  Sparkles,
  MessageSquare,
  Send,
  Trash2,
  ChevronDown,
  ChevronUp,
  UserCheck,
  Heart,
  Globe,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

const CHECKLIST_STORAGE_KEY = 'sisterhood_parent_checklist_v1';
const PARENT_CHAT_STORAGE_KEY = 'sisterhood_parent_chat_history_v1';

const UI_LABELS = {
  ru: {
    scriptsCount: 'шпаргалки',
    whatToSay: 'Готовая формулировка (Что сказать):',
    phrasesToAvoid: 'Каких фраз избегать (блокируют доверие):',
    betterAlternatives: 'Поддерживающие альтернативы:',
    ageCategory: 'Возрастная категория:',
    physiology: 'Физиология и изменения тела',
    emotional: 'Эмоции, настроение и психология',
    goals: 'Главные задачи родителя',
    dadsAdvice: 'Совет для пап и соло-отцов',
    familyReadiness: 'Готовность семьи:',
    of: 'из',
    aiConsultantBadge: 'Советник по детской психологии',
    childAgePrompt: 'Возраст ребенка для консультанта:',
    ageFocusSummaries: {
      '8-9': '👶 8–9 лет • Границы тела, правило купальника, гигиена, доверие без стыда',
      '10-12': '👧 10–12 лет • Подготовка к первой менструации, сумочка в школу, деликатность',
      '13-15': '👱‍♀️ 13–15 лет • Нерегулярный цикл, спазмы, эмоции, личное пространство',
      '16+': '👩 16+ лет • Взросление, зрелый цикл, доверие, культура согласия, врач'
    },
    clearChat: 'Очистить диалог',
    chatEmptyTitle: 'Задайте любой вопрос о взрослении вашей дочери',
    chatEmptyDesc: 'Консультант обучен доказательной педиатрии и детской психологии. Поможет подобрать нужные слова для диалога.',
    chatPlaceholder: 'Спросите о разговоре, физиологии или эмоциях...',
    aiTyping: 'Консультант формулирует бережный ответ...'
  },
  uk: {
    scriptsCount: 'шпаргалки',
    whatToSay: 'Готове формулювання (Що сказати):',
    phrasesToAvoid: 'Яких фраз уникати (блокують довіру):',
    betterAlternatives: 'Підтримувальні альтернативи:',
    ageCategory: 'Вікова категорія:',
    physiology: 'Фізіологія та зміни тіла',
    emotional: 'Емоції, настрій та психологія',
    goals: 'Головні завдання батьків',
    dadsAdvice: 'Порада для татів та соло-батьків',
    familyReadiness: 'Готовність родини:',
    of: 'із',
    aiConsultantBadge: 'Порадник з дитячої психології',
    childAgePrompt: 'Вік дитини для консультанта:',
    ageFocusSummaries: {
      '8-9': '👶 8–9 років • Кордони тіла, правило купальника, гігієна, довіра без сорому',
      '10-12': '👧 10–12 років • Підготовка до перших місячних, сумочка до школи, делікатність',
      '13-15': '👱‍♀️ 13–15 років • Нерегулярний цикл, спазми, емоції, приватний простір',
      '16+': '👩 16+ років • Дорослішання, зрілий цикл, довіра, культура згоди, лікар'
    },
    clearChat: 'Очистити розмову',
    chatEmptyTitle: 'Поставте будь-яке запитання про дорослішання доньки',
    chatEmptyDesc: 'Консультант навчений доказовій педіатрії та дитячій психології. Допоможе підібрати потрібні слова для діалогу.',
    chatPlaceholder: 'Запитайте про розмову, фізіологію або емоції...',
    aiTyping: 'Консультант формулює дбайливу відповідь...'
  },
  pl: {
    scriptsCount: 'wskazówki',
    whatToSay: 'Gotowe sformułowanie (Co powiedzieć):',
    phrasesToAvoid: 'Jakich zwrotów unikać (blokują zaufanie):',
    betterAlternatives: 'Wspierające alternatywy:',
    ageCategory: 'Kategoria wiekowa:',
    physiology: 'Fizjologia i zmiany ciała',
    emotional: 'Emocje, nastrój i psychologia',
    goals: 'Główne zadania rodzica',
    dadsAdvice: 'Wskazówka dla ojców',
    familyReadiness: 'Gotowość rodziny:',
    of: 'z',
    aiConsultantBadge: 'Konsultant psychologii dziecięcej',
    childAgePrompt: 'Wiek dziecka dla konsultanta:',
    ageFocusSummaries: {
      '8-9': '👶 8–9 lat • Granice ciała, zasada bielizny, higiena, zaufanie bez wstydu',
      '10-12': '👧 10–12 lat • Przygotowanie do pierwszej miesiączki, saszetka do szkoły',
      '13-15': '👱‍♀️ 13–15 lat • Nieregularny cykl, skurcze, emocje, prywatność',
      '16+': '👩 16+ lat • Młoda dorosłość, dojrzały cykl, ginekolog, zaufanie, partnerstwo'
    },
    clearChat: 'Wyczyść historię',
    chatEmptyTitle: 'Zadaj dowolne pytanie o dorastaniu córki',
    chatEmptyDesc: 'Konsultant opiera się na wiedzy pediatrycznej i psychologicznej. Pomoże dobrać właściwe słowa do rozmowy.',
    chatPlaceholder: 'Zapytaj o rozmowę, fizjologię lub emocje...',
    aiTyping: 'Konsultant formułuje odpowiedź...'
  },
  en: {
    scriptsCount: 'guides',
    whatToSay: 'Ready phrase (What to say):',
    phrasesToAvoid: 'Phrases to avoid (break trust):',
    betterAlternatives: 'Supportive alternatives:',
    ageCategory: 'Age category:',
    physiology: 'Physiology & Body Changes',
    emotional: 'Emotions, Mood & Psychology',
    goals: 'Key Parent Goals',
    dadsAdvice: 'Advice for Dads & Solo Fathers',
    familyReadiness: 'Family Readiness:',
    of: 'of',
    aiConsultantBadge: 'Child Psychology Advisor',
    childAgePrompt: "Child's age for advisor:",
    ageFocusSummaries: {
      '8-9': '👶 8–9 yrs • Body boundaries, swimsuit rule, hygiene, trust without shame',
      '10-12': '👧 10–12 yrs • Prep for first period, school emergency kit, privacy',
      '13-15': '👱‍♀️ 13–15 yrs • Irregular cycle, cramps, mood shifts, personal space',
      '16+': '👩 16+ yrs • Emerging adulthood, mature cycle, consent, doctor visits'
    },
    clearChat: 'Clear conversation',
    chatEmptyTitle: 'Ask any question about your daughter growing up',
    chatEmptyDesc: 'Advisor trained in evidence-based pediatrics and child psychology. Helps you find the right words.',
    chatPlaceholder: 'Ask about conversations, biology or feelings...',
    aiTyping: 'Advisor is crafting a caring response...'
  }
};

export const ParentMode = () => {
  const {
    setScreen,
    ageGroup,
    setAgeGroup,
    appLanguage,
    setAppLanguage
  } = useApp();

  const data = getParentGuideData(appLanguage);
  const labels = UI_LABELS[appLanguage] || UI_LABELS.ru;

  // Active Tab
  const [activeTab, setActiveTab] = useState('scripts'); // 'scripts' | 'byAge' | 'checklist' | 'aiConsultant'

  // Scripts accordion state
  const [expandedScriptId, setExpandedScriptId] = useState(data.scripts?.[0]?.id || null);

  // Checklist state
  const [checkedItems, setCheckedItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const toggleChecklistItem = (id) => {
    setCheckedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // AI Parent Chat state
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(PARENT_CHAT_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(PARENT_CHAT_STORAGE_KEY, JSON.stringify(chatMessages));
    } catch (e) {}
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: 'pmsg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const langVoiceMap = {
        ru: 'ru-RU',
        uk: 'uk-UA',
        pl: 'pl-PL',
        en: 'en-US'
      };
      const response = await callAIChat({
        userMessage: query,
        chatMessages: [...chatMessages, userMsg],
        ageGroup,
        selectedLang: langVoiceMap[appLanguage] || 'ru-RU',
        isParentMode: true
      });

      const aiMsg = {
        id: 'pmsg-ai-' + Date.now(),
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      const fallbackMsg = {
        id: 'pmsg-err-' + Date.now(),
        sender: 'ai',
        text: appLanguage === 'pl'
          ? 'Przepraszam, wystąpił problem z połączeniem. Zadaj pytanie ponownie 🌸'
          : appLanguage === 'uk'
          ? 'Вибачте, виникла затримка звʼязку. Будь ласка, повторіть запитання 🌸'
          : appLanguage === 'en'
          ? 'Sorry, there was a connection issue. Please ask your question again 🌸'
          : 'Извините, произошла заминка связи. Пожалуйста, повторите вопрос 🌸',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearParentChat = () => {
    setChatMessages([]);
    localStorage.removeItem(PARENT_CHAT_STORAGE_KEY);
  };

  // Age Roadmap for current selected age
  const currentAgeInfo = data.ageRoadmap?.[ageGroup] || data.ageRoadmap?.['10-12'];

  // Checklist completed count
  const totalChecklist = data.checklistItems?.length || 0;
  const completedChecklist = data.checklistItems?.filter((item) => checkedItems[item.id]).length || 0;
  const checklistPercent = totalChecklist > 0 ? Math.round((completedChecklist / totalChecklist) * 100) : 0;

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-3 px-3.5 sm:px-6 max-w-2xl mx-auto space-y-4">
      {/* 1. Header with Return and Settings */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          onClick={() => setScreen('dashboard')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-stone-800 hover:bg-stone-100 font-bold text-xs shadow-2xs transition active:scale-95 shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-stone-600" />
          <span>
            {appLanguage === 'pl'
              ? 'Wróć do trybu dziecka'
              : appLanguage === 'uk'
              ? 'До дитячого режиму'
              : appLanguage === 'en'
              ? 'Back to child mode'
              : 'В детский режим'}
          </span>
        </button>

        <div className="flex items-center gap-1.5">
          {/* 4-Language Segmented Switcher */}
          <div className="flex items-center bg-stone-200/80 rounded-xl p-0.5 text-xs font-bold">
            {[
              { code: 'ru', label: 'RU', flag: '🌸' },
              { code: 'uk', label: 'UA', flag: '🌻' },
              { code: 'pl', label: 'PL', flag: '🇵🇱' },
              { code: 'en', label: 'EN', flag: '✨' }
            ].map((lang) => {
              const isActive = appLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => setAppLanguage(lang.code)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  aria-pressed={isActive}
                  title={lang.code.toUpperCase()}
                >
                  <span className="text-[11px]">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              );
            })}
          </div>

          {/* Age Group Selector */}
          <div className="flex items-center bg-white border border-stone-200 rounded-full px-2 py-1 text-xs text-stone-700 shadow-2xs">
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="bg-transparent font-bold text-stone-800 focus:outline-none cursor-pointer text-xs"
            >
              <option value="8-9">8–9</option>
              <option value="10-12">10–12</option>
              <option value="13-15">13–15</option>
              <option value="16+">16+</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Title & Privacy Notice Banner */}
      <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-bold text-white shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>{data.privacyBadge}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
            {data.title}
          </h1>
          <p className="text-xs sm:text-sm text-amber-50 leading-relaxed max-w-xl">
            {data.subtitle}
          </p>
        </div>
      </div>

      {/* Privacy Pledge Banner */}
      <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-amber-900 text-xs leading-relaxed">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p>{data.privacyNotice}</p>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-white rounded-2xl border border-stone-200 shadow-xs">
        <button
          onClick={() => setActiveTab('scripts')}
          className={`py-2.5 px-2 text-center rounded-xl font-bold text-xs transition flex flex-col items-center justify-center gap-1.5 min-h-[52px] ${
            activeTab === 'scripts'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          <BookOpen className="w-4 h-4 shrink-0" />
          <span className="text-[11px] leading-tight text-center">{data.tabs.scripts}</span>
        </button>

        <button
          onClick={() => setActiveTab('byAge')}
          className={`py-2.5 px-2 text-center rounded-xl font-bold text-xs transition flex flex-col items-center justify-center gap-1.5 min-h-[52px] ${
            activeTab === 'byAge'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span className="text-[11px] leading-tight text-center">{data.tabs.byAge}</span>
        </button>

        <button
          onClick={() => setActiveTab('checklist')}
          className={`py-2.5 px-2 text-center rounded-xl font-bold text-xs transition flex flex-col items-center justify-center gap-1.5 min-h-[52px] ${
            activeTab === 'checklist'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          <CheckSquare className="w-4 h-4 shrink-0" />
          <span className="text-[11px] leading-tight text-center">{data.tabs.checklist}</span>
        </button>

        <button
          onClick={() => setActiveTab('aiConsultant')}
          className={`py-2.5 px-2 text-center rounded-xl font-bold text-xs transition flex flex-col items-center justify-center gap-1.5 min-h-[52px] ${
            activeTab === 'aiConsultant'
              ? 'bg-amber-500 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
          }`}
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span className="text-[11px] leading-tight text-center">{data.tabs.aiConsultant}</span>
        </button>
      </div>

      {/* 4. Tab 1: Dialogue Scripts */}
      {activeTab === 'scripts' && (
        <div className="space-y-3 animate-fade-in">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-extrabold text-stone-800">
              {data.tabs.scripts}
            </h2>
            <span className="text-[11px] text-stone-500">
              {data.scripts.length} {labels.scriptsCount}
            </span>
          </div>

          <div className="space-y-3">
            {data.scripts.map((item) => {
              const isExpanded = expandedScriptId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden transition"
                >
                  <button
                    onClick={() => setExpandedScriptId(isExpanded ? null : item.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-stone-50/60 transition"
                  >
                    <div className="space-y-1">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        {item.situation}
                      </span>
                      <h3 className="text-sm font-bold text-stone-900">
                        {item.topic}
                      </h3>
                    </div>
                    <div className="p-1 rounded-full bg-stone-100 text-stone-500 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 space-y-3.5 border-t border-stone-100 text-xs">
                      {/* What to Say */}
                      <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 space-y-1">
                        <div className="font-bold text-amber-900 flex items-center gap-1.5">
                          <span>💬</span>
                          <span>{labels.whatToSay}</span>
                        </div>
                        <p className="text-stone-700 italic leading-relaxed text-[13px]">
                          {item.whatToSay}
                        </p>
                      </div>

                      {/* Phrases to Avoid */}
                      {item.phrasesToAvoid && item.phrasesToAvoid.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="font-bold text-rose-700 flex items-center gap-1.5">
                            <span>❌</span>
                            <span>{labels.phrasesToAvoid}</span>
                          </div>
                          <ul className="space-y-1 text-stone-600 pl-1">
                            {item.phrasesToAvoid.map((phrase, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-rose-400 font-bold">•</span>
                                <span className="line-through decoration-rose-400">{phrase}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Better Alternatives */}
                      {item.betterAlternatives && item.betterAlternatives.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="font-bold text-emerald-700 flex items-center gap-1.5">
                            <span>✅</span>
                            <span>{labels.betterAlternatives}</span>
                          </div>
                          <ul className="space-y-1 text-stone-700 pl-1">
                            {item.betterAlternatives.map((alt, idx) => (
                              <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-emerald-500 font-bold">✓</span>
                                <span>{alt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Tab 2: Age Roadmap */}
      {activeTab === 'byAge' && currentAgeInfo && (
        <div className="space-y-3.5 animate-fade-in">
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wide">
                {labels.ageCategory} {data.ageGroups[ageGroup] || ageGroup}
              </span>
            </div>
            <h2 className="text-base font-extrabold text-stone-900 leading-snug">
              {currentAgeInfo.title}
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              {currentAgeInfo.summary}
            </p>
          </div>

          {/* Physical Changes */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <span>🧬</span>
              <span>{labels.physiology}</span>
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              {currentAgeInfo.physical}
            </p>
          </div>

          {/* Emotional Dynamics */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <span>🧠</span>
              <span>{labels.emotional}</span>
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              {currentAgeInfo.emotional}
            </p>
          </div>

          {/* Key Goals */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <span>🎯</span>
              <span>{labels.goals}</span>
            </h3>
            <ul className="space-y-2 text-xs text-stone-700">
              {currentAgeInfo.goals.map((goal, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="leading-snug">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Special Advice for Dads */}
          {currentAgeInfo.adviceForDads && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-2xl p-4 border border-blue-200 shadow-2xs space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <span>👨‍👧</span>
                <span>{labels.dadsAdvice}</span>
              </h3>
              <p className="text-xs text-blue-950 leading-relaxed">
                {currentAgeInfo.adviceForDads}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 6. Tab 3: Interactive Checklist */}
      {activeTab === 'checklist' && (
        <div className="space-y-3.5 animate-fade-in">
          {/* Progress Card */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-stone-800">{labels.familyReadiness}</span>
              <span className="font-bold text-amber-700">
                {completedChecklist} {labels.of} {totalChecklist} ({checklistPercent}%)
              </span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${checklistPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2.5">
            {data.checklistItems.map((item) => {
              const isChecked = !!checkedItems[item.id];
              return (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-amber-50/60 border-amber-300/80 shadow-2xs'
                      : 'bg-white border-stone-200/90 hover:border-stone-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition ${
                      isChecked
                        ? 'bg-amber-500 text-white'
                        : 'border-2 border-stone-300 bg-white'
                    }`}
                  >
                    {isChecked && '✓'}
                  </div>
                  <div className="space-y-1">
                    <h3
                      className={`text-xs font-bold leading-snug ${
                        isChecked ? 'text-amber-900 line-through' : 'text-stone-900'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. Tab 4: Dedicated Parent AI Consultant */}
      {activeTab === 'aiConsultant' && (
        <div className="space-y-3 animate-fade-in">
          {/* Header & Clear */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{labels.aiConsultantBadge}</span>
            </div>
            {chatMessages.length > 0 && (
              <button
                onClick={handleClearParentChat}
                className="text-[11px] text-stone-400 hover:text-rose-500 flex items-center gap-1 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{labels.clearChat}</span>
              </button>
            )}
          </div>

          {/* Child Age Selector for Advisor */}
          <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
              <span className="flex items-center gap-1.5">
                <span>🎯</span>
                <span>{labels.childAgePrompt}</span>
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wide bg-amber-200/70 text-amber-950 px-2.5 py-0.5 rounded-full shadow-2xs">
                {ageGroup} {appLanguage === 'en' ? 'yrs' : appLanguage === 'pl' ? 'lat' : appLanguage === 'uk' ? 'років' : 'лет'}
              </span>
            </div>

            {/* 4 Age Pills */}
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: '8-9', label: '8–9', icon: '👶' },
                { id: '10-12', label: '10–12', icon: '👧' },
                { id: '13-15', label: '13–15', icon: '👱‍♀️' },
                { id: '16+', label: '16+', icon: '👩' }
              ].map((item) => {
                const isSelected = ageGroup === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setAgeGroup(item.id)}
                    className={`py-1.5 px-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 active:scale-95 ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-white border border-stone-200 text-stone-700 hover:bg-amber-100/50 hover:border-amber-300'
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Age Focus Description */}
            <p className="text-[11px] text-amber-900/90 font-medium leading-snug pt-0.5">
              {labels.ageFocusSummaries?.[ageGroup] || ''}
            </p>
          </div>

          {/* Quick Suggestion Chips dynamically tailored to selected age */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {(data.aiPromptChipsByAge?.[ageGroup] || data.aiPromptChips || []).map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="shrink-0 text-[11px] font-medium bg-white border border-stone-200 hover:border-amber-400 hover:bg-amber-50/60 rounded-full px-3 py-1.5 text-stone-700 transition active:scale-95 shadow-2xs"
              >
                💡 {chip}
              </button>
            ))}
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs p-3.5 min-h-[320px] max-h-[460px] overflow-y-auto space-y-3">
            {chatMessages.length === 0 ? (
              <div className="py-10 text-center space-y-2 text-stone-400">
                <HelpCircle className="w-8 h-8 mx-auto text-amber-400" />
                <p className="text-xs font-bold text-stone-600">
                  {labels.chatEmptyTitle}
                </p>
                <p className="text-[11px] text-stone-400 max-w-sm mx-auto">
                  {labels.chatEmptyDesc}
                </p>
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-amber-500 text-white rounded-br-xs'
                        : 'bg-stone-100 text-stone-800 rounded-bl-xs border border-stone-200/60'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span
                      className={`block text-[9px] mt-1 text-right ${
                        msg.sender === 'user' ? 'text-amber-100' : 'text-stone-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))
            )}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-stone-100 text-stone-500 rounded-2xl p-3 text-xs rounded-bl-xs animate-pulse">
                  {labels.aiTyping}
                </div>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-white rounded-2xl border border-stone-200 p-1.5 shadow-2xs"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={labels.chatPlaceholder}
              className="flex-1 bg-transparent px-3 text-xs text-stone-800 focus:outline-none placeholder:text-stone-400"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="p-2.5 rounded-xl bg-amber-500 text-white disabled:opacity-40 hover:bg-amber-600 transition shadow-2xs"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
