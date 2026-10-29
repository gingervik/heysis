import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STORIES_DATA, DAILY_MYTHS_BY_AGE } from '../data/mockData';
import {
  Sparkles,
  Droplet,
  Heart,
  MessageCircle,
  HelpCircle,
  CheckCircle,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Shield,
  Calculator,
  RefreshCw,
  Flame,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Dashboard = () => {
  const {
    openStory,
    setScreen,
    completedStories,
    ageGroup,
    setAgeGroup,
    goToChatWithPrompt,
    triggerPanic
  } = useApp();

  // Filter stories by current age group
  const visibleStories = STORIES_DATA.filter((story) =>
    story.targetAges ? story.targetAges.includes(ageGroup) : true
  );

  const completedInAge = visibleStories.filter((s) => completedStories.includes(s.id)).length;

  // Daily Myth State by Age
  const [currentMythIndex, setCurrentMythIndex] = useState(0);
  const [mythAnswerState, setMythAnswerState] = useState(null); // 'revealed' | null

  const mythsList = DAILY_MYTHS_BY_AGE[ageGroup] || DAILY_MYTHS_BY_AGE.default;
  const currentMyth = mythsList[currentMythIndex % mythsList.length];

  const handleMythAnswer = (userChoice) => {
    setMythAnswerState(userChoice);
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
          border: 'border-peach-200/80',
          ring: 'ring-peach-300'
        };
      case 'mint':
        return {
          badge: 'bg-mint-100 text-mint-800 border-mint-200',
          gradient: 'from-mint-50 to-mint-100/60 hover:to-mint-200/50',
          border: 'border-mint-200/80',
          ring: 'ring-mint-300'
        };
      case 'lavender':
        return {
          badge: 'bg-lavender-100 text-lavender-800 border-lavender-200',
          gradient: 'from-lavender-50 to-lavender-100/60 hover:to-lavender-200/50',
          border: 'border-lavender-200/80',
          ring: 'ring-lavender-300'
        };
      default:
        return {
          badge: 'bg-stone-100 text-stone-800 border-stone-200',
          gradient: 'from-stone-50 to-stone-100',
          border: 'border-stone-200',
          ring: 'ring-stone-300'
        };
    }
  };

  return (
    <div className="min-h-screen bg-stone-50/70 pb-20 pt-4 px-4 sm:px-6 max-w-xl mx-auto space-y-6">
      {/* Top Bar: Subtle Safe Status & Age Pill */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-mint-300 to-lavender-300 flex items-center justify-center shadow-xs">
            <span className="text-sm">🌸</span>
          </div>
          <div>
            <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
              <span>Привет! Твое пространство</span>
            </div>
            <div className="text-[11px] text-stone-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Офлайн режим • Приватно</span>
            </div>
          </div>
        </div>

        {/* Age Filter Toggle */}
        <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-full px-2 py-0.5 text-xs text-stone-600 shadow-2xs">
          <span className="text-[11px] font-medium text-stone-400">Возраст:</span>
          <select
            value={ageGroup}
            onChange={(e) => {
              setAgeGroup(e.target.value);
              setMythAnswerState(null);
              setCurrentMythIndex(0);
            }}
            className="bg-transparent font-bold text-stone-700 focus:outline-none cursor-pointer text-xs"
          >
            <option value="8-9">8–9 лет</option>
            <option value="10-12">10–12 лет</option>
            <option value="13-15">13–15 лет</option>
            <option value="16+">16+ лет</option>
          </select>
        </div>
      </div>

      {/* BLOCK 1: Micro-learning Stories Carousel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-base sm:text-lg font-black text-stone-800 flex items-center gap-1.5">
              <span>{ageGroup === '8-9' ? 'Секреты тела и дружбы' : 'Истории и факты'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-mint-100 text-mint-800 font-bold">
                {completedInAge}/{visibleStories.length} пройдено
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              {ageGroup === '8-9'
                ? 'Добрые и понятные карточки о теле, эмоциях и гигиене'
                : 'Короткие карточки без сложных терминов за 1-2 минуты'}
            </p>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex gap-3.5 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth snap-x snap-mandatory">
          {visibleStories.map((story) => {
            const isCompleted = completedStories.includes(story.id);
            const theme = getCategoryTheme(story.categoryColor);

            return (
              <div
                key={story.id}
                onClick={() => openStory(story.id)}
                className={`snap-center shrink-0 w-[240px] sm:w-[260px] p-4 rounded-3xl border bg-gradient-to-b ${theme.gradient} ${theme.border} shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 relative group active:scale-98`}
              >
                {/* Completed badge top right */}
                {isCompleted && (
                  <div className="absolute top-3.5 right-3.5 bg-white text-mint-700 p-1 rounded-full shadow-xs flex items-center gap-1 text-[10px] font-bold px-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-mint-600" />
                    <span>Пройдено</span>
                  </div>
                )}

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white rounded-2xl shadow-2xs">
                      {getCategoryIcon(story.categoryIcon)}
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${theme.badge}`}>
                      {story.categoryTitle}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-stone-800 text-base leading-snug group-hover:text-stone-900">
                      {story.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                      {story.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200/50 text-xs text-stone-500 font-medium">
                  <div className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{story.readTime}</span>
                  </div>

                  <span className="font-bold text-stone-700 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform text-xs">
                    <span>Открыть</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BLOCK 2: Quick Access to AI Sister Assistant */}
      <div className="space-y-2">
        <div
          onClick={() => setScreen('chat')}
          className="relative overflow-hidden bg-gradient-to-r from-lavender-500 via-lavender-600 to-indigo-600 rounded-3xl p-5 text-white shadow-md hover:shadow-xl transition-all cursor-pointer group active:scale-99"
        >
          {/* Subtle background glow */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

          <div className="flex items-start justify-between relative z-10">
            <div className="space-y-2 max-w-[280px] sm:max-w-xs">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-bold text-lavender-100">
                <Sparkles className="w-3 h-3 text-peach-300" />
                <span>{ageGroup === '8-9' ? 'Добрая Старшая Сестра' : 'Digital Big Sister • 100% Приватно'}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-black leading-tight text-white">
                {ageGroup === '8-9' ? 'Спроси Сестренку (Безопасно)' : 'Задай вопрос Ассистенту (Анонимно)'}
              </h3>

              <p className="text-xs sm:text-sm text-lavender-100 leading-relaxed font-normal">
                {ageGroup === '8-9'
                  ? 'Спроси о зубках, страхах, дружбе или правиле купальника. Отвечаем ласково и просто!'
                  : 'Спроси о том, что неловко обсудить вслух. Отвечаем по-доброму, как старшая сестра.'}
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold relative z-10">
            <span className="text-lavender-200">
              {ageGroup === '8-9' ? 'Только добрые и полезные ответы' : 'Без регистрации • Без осуждения'}
            </span>
            <span className="flex items-center gap-1 bg-white text-lavender-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-xs">
              <span>Открыть чат</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* BLOCK 3: Myth of the Day Quiz Card */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-peach-600" />
            <h2 className="text-base font-extrabold text-stone-800">
              Миф дня
            </h2>
          </div>

          <button
            onClick={nextMyth}
            className="text-xs text-stone-500 hover:text-stone-800 flex items-center gap-1 font-semibold px-2 py-1 rounded hover:bg-stone-100 transition"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Другой факт</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs space-y-4">
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-peach-600 uppercase tracking-wider">
              {currentMyth.dateLabel}
            </span>
            <h4 className="text-base font-bold text-stone-800 leading-snug">
              {currentMyth.question}
            </h4>
          </div>

          {/* Interactive choices if not revealed */}
          {!mythAnswerState ? (
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => handleMythAnswer(true)}
                className="py-2.5 px-4 rounded-xl border border-stone-200 hover:border-mint-400 hover:bg-mint-50/70 text-stone-700 font-bold text-sm transition shadow-2xs active:scale-95"
              >
                👍 Это правда
              </button>
              <button
                onClick={() => handleMythAnswer(false)}
                className="py-2.5 px-4 rounded-xl border border-stone-200 hover:border-peach-400 hover:bg-peach-50/70 text-stone-700 font-bold text-sm transition shadow-2xs active:scale-95"
              >
                🙅‍♀️ Это миф
              </button>
            </div>
          ) : (
            /* Revealed Explanation */
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
                  Следующий миф ➔
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Safe Information Footnote */}
      <div className="pt-2 text-center text-xs text-stone-400 space-y-1">
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-mint-600" />
          <span>Все данные сохраняются исключительно на твоем телефоне</span>
        </div>
        <div className="text-[11px] text-stone-400">
          Open Source проект • ПО: <span className="font-semibold text-stone-500">MIT</span> • Контент: <span className="font-semibold text-stone-500">CC-BY 4.0</span>
        </div>
      </div>
    </div>
  );
};
