import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useVoice } from '../context/VoiceContext';
import { HeySisLogo } from '../components/HeySisLogo';
import { getLocalizedStories, getLocalizedMyths } from '../data/mockDataLocalized';
import { ParentGateModal } from '../components/ParentGateModal';
import {
  Sparkles,
  Droplet,
  Heart,
  MessageCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Shield,
  RefreshCw,
  Flame,
  Volume2,
  VolumeX,
  Mic,
  Globe
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Dashboard = () => {
  const {
    openStory,
    setScreen,
    completedStories,
    ageGroup,
    setAgeGroup,
    appLanguage,
    setAppLanguage,
    t
  } = useApp();

  const {
    speak,
    stopSpeaking,
    isSpeaking,
    speakingId,
    voiceEnabled,
    setVoiceEnabled
  } = useVoice();

  // Filter stories by current age group and active language
  const localizedStories = getLocalizedStories(appLanguage);
  const visibleStories = localizedStories.filter((story) =>
    story.targetAges ? story.targetAges.includes(ageGroup) : true
  );

  const completedInAge = visibleStories.filter((s) => completedStories.includes(s.id)).length;

  // Parental Gate Modal State
  const [showParentGate, setShowParentGate] = useState(false);

  // Daily Myth State by Age and Language
  const [currentMythIndex, setCurrentMythIndex] = useState(0);
  const [mythAnswerState, setMythAnswerState] = useState(null);

  const mythsList = getLocalizedMyths(ageGroup, appLanguage);
  const currentMyth = mythsList[currentMythIndex % mythsList.length];

  const handleMythAnswer = (userChoice) => {
    setMythAnswerState(userChoice);
    if (voiceEnabled) {
      speak(`${currentMyth.shortAnswer}. ${currentMyth.fullExplanation}`, `myth-${currentMythIndex}`);
    }
    if (userChoice === currentMyth.isFact) {
      try {
        confetti({
          particleCount: 35,
          spread: 40,
          origin: { y: 0.8 }
        });
      } catch (e) {}
    }
  };

  const nextMyth = () => {
    stopSpeaking();
    setMythAnswerState(null);
    setCurrentMythIndex((prev) => (prev + 1) % mythsList.length);
  };

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Droplet': return <Droplet className="w-5 h-5 text-peach-600 fill-peach-200" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-mint-600 fill-mint-200" />;
      case 'Heart': return <Heart className="w-5 h-5 text-lavender-600 fill-lavender-200" />;
      case 'Shield': return <Shield className="w-5 h-5 text-mint-600 fill-mint-200" />;
      default: return <Sparkles className="w-5 h-5 text-mint-600" />;
    }
  };

  const getCategoryTheme = (color) => {
    switch (color) {
      case 'peach':
        return {
          badge: 'bg-peach-100 text-peach-800 border-peach-200',
          gradient: 'from-peach-50 to-peach-100/60 hover:to-peach-200/50',
          border: 'border-peach-200/80'
        };
      case 'mint':
        return {
          badge: 'bg-mint-100 text-mint-800 border-mint-200',
          gradient: 'from-mint-50 to-mint-100/60 hover:to-mint-200/50',
          border: 'border-mint-200/80'
        };
      case 'lavender':
        return {
          badge: 'bg-lavender-100 text-lavender-800 border-lavender-200',
          gradient: 'from-lavender-50 to-lavender-100/60 hover:to-lavender-200/50',
          border: 'border-lavender-200/80'
        };
      default:
        return {
          badge: 'bg-stone-100 text-stone-800 border-stone-200',
          gradient: 'from-stone-50 to-stone-100',
          border: 'border-stone-200'
        };
    }
  };

  const isPolish = appLanguage === 'pl';
  const isUkrainian = appLanguage === 'uk';
  const isEnglish = appLanguage === 'en';

  return (
    <div className="min-h-screen bg-stone-50/70 pb-20 pt-3 px-3.5 sm:px-6 max-w-xl mx-auto space-y-4">
      {/* 1. Mobile-First Clean Top Header */}
      <header className="space-y-2.5 pt-1">
        {/* Row 1: Brand & Highly Visible Parent Mode Button */}
        <div className="flex items-center justify-between gap-2">
          {/* Brand / Title */}
          <div className="flex items-center gap-2">
            <HeySisLogo className="w-9 h-9" rounded="rounded-xl" />
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-stone-800 leading-tight tracking-tight">
                HeySis
              </h1>
              <div className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{isPolish ? '100% poufnie' : isUkrainian ? '100% приватно' : isEnglish ? '100% private' : '100% приватно'}</span>
              </div>
            </div>
          </div>

          {/* Parent Mode Quick Button - Always 100% visible on any screen */}
          <button
            onClick={() => setShowParentGate(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 border border-amber-300 text-amber-950 font-bold text-xs shadow-xs transition active:scale-95 shrink-0"
            title={t('parentModeBtn')}
            aria-label={t('parentModeBtn')}
          >
            <span className="text-sm">👨‍👩‍👧</span>
            <span className="text-xs">{t('parentModeBtn')}</span>
          </button>
        </div>

        {/* Row 2: One-Click Segmented Language Switcher + Age & Sound */}
        <div className="flex items-center justify-between gap-1.5 bg-white p-1 rounded-2xl border border-stone-200 shadow-2xs">
          {/* 4-Language Segmented Switcher (RU / UA / PL / EN) */}
          <div className="flex items-center bg-stone-100 rounded-xl p-0.5 text-xs font-bold">
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
                      : 'text-stone-500 hover:text-stone-800'
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

          {/* Right Controls: Age Group & Sound Toggle */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Age Group Selector */}
            <div className="flex items-center bg-stone-100 rounded-xl px-2 py-1 text-xs text-stone-700">
              <span className="text-xs mr-0.5">👧</span>
              <select
                value={ageGroup}
                onChange={(e) => {
                  setAgeGroup(e.target.value);
                  setMythAnswerState(null);
                  setCurrentMythIndex(0);
                  stopSpeaking();
                }}
                className="bg-transparent font-bold text-stone-800 focus:outline-none cursor-pointer text-xs"
                aria-label={t('ageSelect')}
              >
                <option value="8-9">{isPolish ? '8–9 lat' : isUkrainian ? '8–9 р.' : isEnglish ? '8–9 yrs' : '8–9 лет'}</option>
                <option value="10-12">{isPolish ? '10–12 lat' : isUkrainian ? '10–12 р.' : isEnglish ? '10–12 yrs' : '10–12 лет'}</option>
                <option value="13-15">{isPolish ? '13–15 lat' : isUkrainian ? '13–15 р.' : isEnglish ? '13–15 yrs' : '13–15 лет'}</option>
                <option value="16+">{isPolish ? '16+ lat' : isUkrainian ? '16+ р.' : isEnglish ? '16+ yrs' : '16+ лет'}</option>
              </select>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                const next = !voiceEnabled;
                setVoiceEnabled(next);
                if (!next) stopSpeaking();
              }}
              className={`w-7 h-7 rounded-xl flex items-center justify-center transition active:scale-95 ${
                voiceEnabled
                  ? 'bg-lavender-100 text-lavender-800 border border-lavender-200'
                  : 'bg-stone-100 text-stone-400'
              }`}
              title={voiceEnabled ? t('voiceEnabled') : t('voiceDisabled')}
              aria-label={voiceEnabled ? t('voiceEnabled') : t('voiceDisabled')}
            >
              {voiceEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-lavender-700" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO CARD (Placed Prominently at Top): Sister Chat with Voice */}
      <div
        onClick={() => setScreen('chat')}
        className="relative overflow-hidden bg-gradient-to-br from-lavender-500 via-rose-400 to-indigo-600 rounded-3xl p-5 text-white shadow-md hover:shadow-xl transition-all cursor-pointer group active:scale-99"
      >
        <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-2 max-w-[270px] sm:max-w-xs">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-bold text-white shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>
                {isPolish
                  ? (ageGroup === '8-9' ? 'Dobra Starsza Siostra 🌸' : 'Czat z Siostrą • 100% Poufnie')
                  : isUkrainian
                  ? (ageGroup === '8-9' ? 'Добра Старша Сестра 🌸' : 'Чат із Сестричкою • 100% Приватно')
                  : isEnglish
                  ? (ageGroup === '8-9' ? 'Gentle Big Sister 🌸' : 'Chat with Sister • 100% Private')
                  : (ageGroup === '8-9' ? 'Добрая Старшая Сестра 🌸' : 'Чат с Сестренкой • 100% Приватно')}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black leading-snug text-white">
              {isPolish
                ? (ageGroup === '8-9' ? 'Porozmawiajmy! ✨' : 'Zapytaj o cokolwiek')
                : isUkrainian
                ? (ageGroup === '8-9' ? 'Поговори зі мною! ✨' : 'Запитай про що завгодно')
                : isEnglish
                ? (ageGroup === '8-9' ? "Let's talk! ✨" : 'Ask about anything')
                : (ageGroup === '8-9' ? 'Поговори со мной! ✨' : 'Спроси о чем угодно')}
            </h2>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
              {isPolish
                ? (ageGroup === '8-9'
                    ? 'O ząbkach, emocjach, ciele lub sekretach. Odpowiadam ciepło i prosto!'
                    : 'O ciele, nastroju, przyjaźni czy sekretach. Bez oceniania i w 100% anonimowo.')
                : isUkrainian
                ? (ageGroup === '8-9'
                    ? 'Про зубки, тіло, настрій чи секрети. Відповідаю лагідно і зрозуміло!'
                    : 'Про тіло, настрій, дружбу чи секрети. Без засудження і на 100% анонімно.')
                : isEnglish
                ? (ageGroup === '8-9'
                    ? 'About teeth, feelings, body changes or secrets. Warm and simple answers!'
                    : 'About your body, mood, friendships or secrets. Judgment-free and 100% private.')
                : (ageGroup === '8-9'
                    ? 'О зубках, теле, настроении или секретах. Отвечаю ласково и понятно!'
                    : 'О теле, настроении, дружбе или секретах. Без осуждения и на 100% анонимно.')}
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
            <span className="text-2xl">🌸</span>
          </div>
        </div>

        {/* Tactile Action Button */}
        <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-semibold relative z-10">
          <span className="flex items-center gap-1 text-white/90 text-[11px]">
            <Mic className="w-3.5 h-3.5 text-rose-200" />
            <span>
              {isPolish
                ? 'Można mówić głosem'
                : isUkrainian
                ? 'Можна говорити голосом'
                : isEnglish
                ? 'Voice input available'
                : 'Можно говорить голосом'}
            </span>
          </span>
          <span className="flex items-center gap-1 bg-white text-stone-900 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-sm group-hover:bg-rose-50 transition">
            <span>
              {isPolish
                ? 'Otwórz czat'
                : isUkrainian
                ? 'Поговорити'
                : isEnglish
                ? 'Chat now'
                : 'Поговорить'}
            </span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </span>
        </div>
      </div>

      {/* 3. STORIES SECTION (Micro-Learning Carousel) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-base sm:text-lg font-black text-stone-800 flex items-center gap-2">
              <span>
                {isPolish
                  ? 'Ciekawe historie 📖'
                  : isUkrainian
                  ? 'Цікаві історії 📖'
                  : isEnglish
                  ? 'Helpful Stories 📖'
                  : 'Полезные истории 📖'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-mint-100 text-mint-800 font-bold">
                {completedInAge}/{visibleStories.length} {t('completedStories')}
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              {isPolish
                ? (ageGroup === '8-9' ? 'Krótkie i proste karty o ciele' : 'Krótkie karty bez trudnych słów')
                : isUkrainian
                ? (ageGroup === '8-9' ? 'Короткі та добрі картки про тіло' : 'Короткі картки без складних термінів')
                : isEnglish
                ? (ageGroup === '8-9' ? 'Gentle & simple cards about your body' : 'Bite-sized cards without complex terms')
                : (ageGroup === '8-9' ? 'Короткие и добрые карточки о теле' : 'Короткие карточки без сложных терминов')}
            </p>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {visibleStories.map((story) => {
            const isCompleted = completedStories.includes(story.id);
            const theme = getCategoryTheme(story.categoryColor);

            return (
              <div
                key={story.id}
                onClick={() => openStory(story.id)}
                className={`snap-center shrink-0 w-[240px] sm:w-[260px] p-4 rounded-3xl border bg-gradient-to-b ${theme.gradient} ${theme.border} shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 relative group active:scale-98`}
              >
                {/* Completed badge */}
                {isCompleted && (
                  <div className="absolute top-3.5 right-3.5 bg-white text-mint-700 p-1 rounded-full shadow-2xs flex items-center gap-1 text-[10px] font-bold px-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mint-600" />
                    <span>{isPolish ? 'Ukończono' : isUkrainian ? 'Пройдено' : isEnglish ? 'Done' : 'Пройдено'}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-2xl shadow-2xs">
                      {getCategoryIcon(story.categoryIcon)}
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${theme.badge}`}>
                      {story.categoryTitle}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-stone-800 text-base leading-snug">
                      {story.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {story.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200/50 text-xs text-stone-500 font-medium">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{story.readTime}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const cardId = `card-${story.id}`;
                        if (isSpeaking && speakingId === cardId) {
                          stopSpeaking();
                        } else {
                          speak(`${story.title}. ${story.subtitle}`, cardId);
                        }
                      }}
                      className={`p-1.5 rounded-full transition shadow-2xs ${
                        isSpeaking && speakingId === `card-${story.id}`
                          ? 'bg-lavender-500 text-white animate-pulse'
                          : 'bg-white/90 hover:bg-white text-stone-600 hover:text-lavender-700'
                      }`}
                      title={isPolish ? 'Posłuchaj' : isUkrainian ? 'Послухати' : isEnglish ? 'Listen' : 'Послушать'}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <span className="font-bold text-stone-700 flex items-center gap-0.5 text-xs">
                      <span>{isPolish ? 'Otwórz' : isUkrainian ? 'Відкрити' : isEnglish ? 'Open' : 'Открыть'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. MYTH OF THE DAY (Interactive Game) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-peach-600" />
            <h2 className="text-base font-extrabold text-stone-800">
              {t('mythsTitle')}
            </h2>
          </div>

          <button
            onClick={nextMyth}
            className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 font-semibold px-2.5 py-1 rounded-full hover:bg-stone-100 transition active:scale-95"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{t('nextMyth')}</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-xs space-y-3.5">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-peach-600 uppercase tracking-wider">
                {currentMyth.dateLabel}
              </span>
              <button
                type="button"
                onClick={() => {
                  const mythId = `myth-${currentMythIndex}`;
                  if (isSpeaking && speakingId === mythId) {
                    stopSpeaking();
                  } else {
                    if (!mythAnswerState) {
                      speak(
                        isPolish
                          ? `Mit czy prawda. ${currentMyth.question}. Czy to prawda czy mit?`
                          : isUkrainian
                          ? `Міф чи правда. ${currentMyth.question}. Це правда чи міф?`
                          : isEnglish
                          ? `Fact or myth. ${currentMyth.question}. Is this a fact or a myth?`
                          : `Миф дня. ${currentMyth.question}. Это правда или миф?`,
                        mythId
                      );
                    } else {
                      speak(`${currentMyth.shortAnswer}. ${currentMyth.fullExplanation}`, mythId);
                    }
                  }
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
                  isSpeaking && speakingId === `myth-${currentMythIndex}`
                    ? 'bg-lavender-500 text-white animate-pulse'
                    : 'bg-stone-100 hover:bg-lavender-100 text-stone-600'
                }`}
                title={isPolish ? 'Posłuchaj mitu' : isUkrainian ? 'Послухати міф' : isEnglish ? 'Listen to myth' : 'Прослушать миф'}
              >
                <Volume2 className="w-3.5 h-3.5 text-lavender-600" />
                <span className="text-[11px]">
                  {isSpeaking && speakingId === `myth-${currentMythIndex}`
                    ? (isPolish ? 'Czytam...' : isUkrainian ? 'Читаю...' : isEnglish ? 'Reading...' : 'Читаю...')
                    : (isPolish ? 'Posłuchaj' : isUkrainian ? 'Послухати' : isEnglish ? 'Listen' : 'Послушать')}
                </span>
              </button>
            </div>
            <h3 className="text-base font-bold text-stone-800 leading-snug">
              {currentMyth.question}
            </h3>
          </div>

          {/* Interactive Choices */}
          {!mythAnswerState ? (
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => handleMythAnswer(true)}
                className="py-3 px-4 rounded-2xl border border-stone-200 hover:border-mint-400 hover:bg-mint-50/70 text-stone-800 font-extrabold text-sm transition shadow-2xs active:scale-95"
              >
                👍 {t('truthBtn')}
              </button>
              <button
                onClick={() => handleMythAnswer(false)}
                className="py-3 px-4 rounded-2xl border border-stone-200 hover:border-peach-400 hover:bg-peach-50/70 text-stone-800 font-extrabold text-sm transition shadow-2xs active:scale-95"
              >
                🙅‍♀️ {t('mythBtn')}
              </button>
            </div>
          ) : (
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-2 animate-slide-up">
              <div className="flex items-center gap-1.5 font-bold text-sm text-stone-800">
                <span className="text-base">{mythAnswerState === currentMyth.isFact ? '🎯' : '💡'}</span>
                <span>{currentMyth.shortAnswer}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {currentMyth.fullExplanation}
              </p>
              <div className="pt-1 flex justify-end">
                <button
                  onClick={nextMyth}
                  className="text-xs text-mint-700 hover:text-mint-800 font-bold"
                >
                  {isPolish ? 'Następny mit ➔' : isUkrainian ? 'Наступний факт ➔' : isEnglish ? 'Next fact ➔' : 'Следующий факт ➔'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Parental Gate Modal */}
      <ParentGateModal
        isOpen={showParentGate}
        onClose={() => setShowParentGate(false)}
        onSuccess={() => {
          setShowParentGate(false);
          setScreen('parent');
        }}
        language={appLanguage}
      />

      {/* 6. Minimal, Reassuring Footer with Open Source & Evidence Sources */}
      <footer className="pt-3 pb-2 text-center text-xs text-stone-400 space-y-2 border-t border-stone-200/60">
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-mint-600 shrink-0" />
          <span>
            {isPolish
              ? 'Wszystkie dane pozostają wyłącznie w pamięci Twojego telefonu'
              : isUkrainian
              ? 'Усі дані зберігаються виключно в пам’яті твого телефону'
              : isEnglish
              ? 'All data remains strictly stored on your personal device'
              : 'Все данные сохраняются исключительно на твоем телефоне'}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-stone-500">
          <a
            href="https://github.com/gingervik/heysis"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-lavender-700 hover:underline"
          >
            GitHub (Open Source)
          </a>
          <span aria-hidden="true">•</span>
          <a
            href="https://github.com/gingervik/heysis/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            MIT &amp; CC-BY 4.0
          </a>
          <span aria-hidden="true">•</span>
          <span>
            {isPolish
              ? 'Źródła: '
              : isUkrainian
              ? 'Джерела: '
              : isEnglish
              ? 'Sources: '
              : 'Источники: '}
            <a
              href="https://www.who.int/health-topics/adolescent-health"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-stone-700"
            >
              WHO
            </a>
            {' & '}
            <a
              href="https://www.unicef.org/documents/guidance-menstrual-health-and-hygiene"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-stone-700"
            >
              UNICEF
            </a>
          </span>
        </div>

        <p className="text-[10px] text-stone-400 max-w-md mx-auto leading-relaxed">
          {isPolish
            ? 'Niezależny projekt open-source oparty na otwartych materiałach WHO i UNICEF (bez oficjalnej afiliacji).'
            : isUkrainian
            ? 'Незалежний open-source проєкт на основі відкритих матеріалів ВООЗ та UNICEF (без офіційної афіліації).'
            : isEnglish
            ? 'Independent open-source project informed by public WHO & UNICEF materials (not affiliated with or endorsed by WHO/UNICEF).'
            : 'Независимый open-source проект на основе открытых материалов ВОЗ и UNICEF (без официальной аффилиации).'}
        </p>
      </footer>
    </div>
  );
};