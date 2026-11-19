import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { useVoice } from '../context/VoiceContext';
import { getLocalizedStories } from '../data/mockDataLocalized';
import confetti from 'canvas-confetti';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Droplet,
  Heart,
  Shield,
  Volume2,
  VolumeX,
  Share2,
  BookOpen,
  Sliders
} from 'lucide-react';

export const StoriesPlayer = () => {
  const {
    activeStoryId,
    setScreen,
    markStoryComplete,
    goToChatWithPrompt,
    appLanguage,
    t
  } = useApp();

  const {
    speak,
    stopSpeaking,
    isSpeaking,
    voiceEnabled,
    setVoiceEnabled,
    setIsSettingsOpen
  } = useVoice();

  const isPolish = appLanguage === 'pl';
  const isUkrainian = appLanguage === 'uk';
  const isEnglish = appLanguage === 'en';
  const localizedStories = getLocalizedStories(appLanguage);
  const story = localizedStories.find((s) => s.id === activeStoryId) || localizedStories[0];
  const slides = story.slides;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState(null); // { selectedIndex: number, isCorrect: boolean }
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 7500; // 7.5 seconds per slide
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const progressTimerRef = useRef(null);

  const currentSlide = slides[currentIndex] || slides[0];

  const getSlideText = useCallback((slide) => {
    if (!slide) return '';
    if (slide.type === 'intro') {
      return `${story.title}. ${story.subtitle || ''}`;
    }
    if (slide.type === 'theory' || slide.type === 'fact') {
      const tipLabel = isPolish ? 'Wskazówka: ' : isUkrainian ? 'Порада: ' : isEnglish ? 'Tip: ' : 'Совет: ';
      return `${slide.headline || slide.title || ''}. ${slide.text || ''}. ${slide.tip ? `${tipLabel}${slide.tip}` : ''}`;
    }
    if (slide.type === 'quiz') {
      return isPolish
        ? `Pytanie. Prawda czy mit: ${slide.question}. Wybierz na ekranie: to prawda, czy to mit!`
        : isUkrainian
        ? `Запитання. Правда чи міф: ${slide.question}. Обери на екрані: це правда чи міф!`
        : isEnglish
        ? `Question. Fact or myth: ${slide.question}. Choose on screen: is it a fact or a myth!`
        : `Вопрос. Правда или миф: ${slide.question}. Нажми на экране: это правда, или это миф!`;
    }
    if (slide.type === 'completion') {
      return `${slide.title}. ${slide.text}. ${slide.ctaText || ''}`;
    }
    return '';
  }, [story, isPolish, isUkrainian, isEnglish]);

  // Read slide aloud automatically if voiceEnabled is true
  useEffect(() => {
    if (voiceEnabled) {
      const text = getSlideText(currentSlide);
      const slideId = `slide-${story.id}-${currentIndex}`;
      // Small timeout to allow slide transition to complete smoothly
      const timer = setTimeout(() => {
        speak(text, slideId);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      stopSpeaking();
    }
  }, [currentIndex, voiceEnabled, story.id]);

  // Cleanup on unmount only
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, [stopSpeaking]);

  // Auto-advance progress timer
  useEffect(() => {
    // If current slide is quiz and hasn't been answered, or if it's paused or completion slide, pause auto-advance
    if (currentSlide.type === 'quiz' && !quizAnswer) {
      setProgress(100);
      return;
    }
    if (currentSlide.type === 'completion') {
      setProgress(100);
      return;
    }

    if (isPaused) return;

    setProgress(0);
    const intervalTime = 50;
    const increment = (intervalTime / SLIDE_DURATION) * 100;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimerRef.current);
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(progressTimerRef.current);
  }, [currentIndex, isPaused, quizAnswer, currentSlide.type]);

  // Handle slide completion
  useEffect(() => {
    if (currentIndex === slides.length - 1) {
      markStoryComplete(story.id);
      // Fire celebratory confetti!
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#46C6A3', '#A48AE9', '#FFB89C']
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [currentIndex]);

  const handleNext = () => {
    stopSpeaking();
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setQuizAnswer(null);
      setProgress(0);
    } else {
      // Completed, return to dashboard or stay on last slide
    }
  };

  const handlePrev = () => {
    stopSpeaking();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setQuizAnswer(null);
      setProgress(0);
    }
  };

  // Touch and tap handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe threshold
    if (Math.abs(deltaX) > 40 && Math.abs(deltaY) < 60) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // Tap navigation: Left 30% goes back, Right 70% goes forward
  const handleTapZone = (e) => {
    // Avoid triggering when tapping buttons or interactive controls
    if (e.target.closest('button')) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    if (clickX < width * 0.35) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  const handleQuizChoice = (idx, isCorrect) => {
    setQuizAnswer({ selectedIndex: idx, isCorrect });
    if (voiceEnabled) {
      const prefix = isCorrect
        ? (isPolish ? 'Prawidłowo! ' : isUkrainian ? 'Правильно! ' : 'Правильно! ')
        : (isPolish ? 'To mit! ' : isUkrainian ? 'Це міф! ' : 'Это миф! ');
      const resultText = prefix + (currentSlide.explanation || '');
      speak(resultText, `quiz-result-${currentIndex}`);
    }
    if (isCorrect) {
      try {
        confetti({
          particleCount: 45,
          spread: 50,
          origin: { y: 0.5 },
          colors: ['#2AAB87', '#FFD7C5', '#8965DF']
        });
      } catch (e) {
        // Safe fallback
      }
    }
  };

  // Get theme colors based on story category
  const themeClasses = {
    peach: {
      bg: 'from-amber-50/90 via-peach-50 to-peach-100/70',
      badge: 'bg-peach-100 text-peach-800 border-peach-200',
      progress: 'bg-peach-500',
      accent: 'text-peach-700',
      card: 'bg-white/90 border-peach-200/80',
    },
    mint: {
      bg: 'from-mint-50/90 via-stone-50 to-mint-100/70',
      badge: 'bg-mint-100 text-mint-800 border-mint-200',
      progress: 'bg-mint-500',
      accent: 'text-mint-700',
      card: 'bg-white/90 border-mint-200/80',
    },
    lavender: {
      bg: 'from-lavender-50/90 via-stone-50 to-lavender-100/70',
      badge: 'bg-lavender-100 text-lavender-800 border-lavender-200',
      progress: 'bg-lavender-500',
      accent: 'text-lavender-700',
      card: 'bg-white/90 border-lavender-200/80',
    }
  }[story.categoryColor || 'peach'];

  return (
    <div
      className="fixed inset-0 z-30 bg-stone-900 flex items-center justify-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
    >
      {/* Mobile container with aspect ratio */}
      <div
        onClick={handleTapZone}
        className={`relative w-full h-full max-w-md max-h-[920px] bg-gradient-to-b ${themeClasses.bg} flex flex-col justify-between overflow-hidden shadow-2xl sm:rounded-3xl border border-stone-800/40`}
      >
        {/* Top Header: Progress Bars & Info */}
        <div className="pt-4 px-4 pb-2 z-20 space-y-3 bg-gradient-to-b from-stone-900/40 via-stone-900/15 to-transparent">
          {/* Instagram-style segmented progress bar */}
          <div className="flex items-center gap-1.5 w-full">
            {slides.map((s, idx) => {
              let fillPercentage = 0;
              if (idx < currentIndex) fillPercentage = 100;
              else if (idx === currentIndex) fillPercentage = progress;

              return (
                <div
                  key={idx}
                  className="h-1.5 flex-1 bg-stone-300/40 backdrop-blur-xs rounded-full overflow-hidden"
                >
                  <div
                    className={`h-full ${themeClasses.progress} transition-all duration-75 ease-linear rounded-full`}
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* Story Meta & Controls */}
          <div className="flex items-center justify-between text-stone-800 gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border shadow-2xs shrink-0 ${themeClasses.badge}`}>
                {story.categoryTitle}
              </span>
              <span className="text-xs font-semibold text-stone-700 leading-snug">
                {story.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const next = !voiceEnabled;
                  setVoiceEnabled(next);
                  if (next) {
                    speak(getSlideText(currentSlide), `slide-${story.id}-${currentIndex}`);
                  } else {
                    stopSpeaking();
                  }
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xs transition-all ${
                  isSpeaking
                    ? 'bg-lavender-500 text-white animate-pulse'
                    : voiceEnabled
                    ? 'bg-white/90 text-lavender-700 hover:bg-white'
                    : 'bg-white/60 text-stone-400 hover:bg-white'
                }`}
                title={
                  isSpeaking
                    ? (isPolish ? 'Zatrzymaj czytanie' : isUkrainian ? 'Зупинити читання' : isEnglish ? 'Stop reading' : 'Остановить чтение вслух')
                    : (isPolish ? 'Posłuchaj tego slajdu' : isUkrainian ? 'Послухати цей слайд' : isEnglish ? 'Listen to this slide' : 'Прослушать этот слайд голосом')
                }
              >
                {isSpeaking ? (
                  <Volume2 className="w-4 h-4 animate-bounce" />
                ) : voiceEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>



              <button
                onClick={(e) => {
                  e.stopPropagation();
                  stopSpeaking();
                  setScreen('dashboard');
                }}
                className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-stone-700 flex items-center justify-center shadow-xs transition-all"
                title={isPolish ? 'Zamknij historię' : isUkrainian ? 'Закрити історію' : isEnglish ? 'Close story' : 'Закрыть историю'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Story Body Content */}
        <div className="flex-1 px-5 py-4 flex flex-col justify-center items-center text-center z-10 overflow-y-auto">
          {/* SLIDE TYPE: INTRO */}
          {currentSlide.type === 'intro' && (
            <div className="space-y-6 max-w-sm mx-auto animate-slide-up">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-white shadow-md flex items-center justify-center p-4 border border-stone-100 relative">
                {story.categoryIcon === 'Shield' && <Shield className="w-12 h-12 text-mint-500 fill-mint-200" />}
                {story.categoryIcon !== 'Shield' && story.categoryColor === 'peach' && <Droplet className="w-12 h-12 text-peach-500 fill-peach-200" />}
                {story.categoryIcon !== 'Shield' && story.categoryColor === 'mint' && <Sparkles className="w-12 h-12 text-mint-500 fill-mint-200" />}
                {story.categoryIcon !== 'Shield' && story.categoryColor === 'lavender' && <Heart className="w-12 h-12 text-lavender-500 fill-lavender-200" />}
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-stone-800 leading-tight">
                  {currentSlide.title}
                </h2>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {currentSlide.subtitle}
                </p>
              </div>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-stone-200/60 shadow-xs">
                {currentSlide.text}
              </p>

              <div className="text-xs text-stone-400 font-medium">
                {isPolish ? 'Dotknij po prawej ➔ aby przejść dalej' : isUkrainian ? 'Торкнися праворуч ➔ щоб гортати' : 'Тапни справа ➔ чтобы листать'}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: FACT (MICRO-LEARNING) */}
          {currentSlide.type === 'fact' && (
            <div className="space-y-5 max-w-sm mx-auto animate-slide-up">
              <div className="inline-block px-3 py-1 bg-white/85 rounded-full text-xs font-bold text-stone-600 border border-stone-200/70 shadow-2xs">
                {isPolish
                  ? `Fakt #${currentIndex} z ${slides.length}`
                  : isUkrainian
                  ? `Факт #${currentIndex} із ${slides.length}`
                  : `Факт #${currentIndex} из ${slides.length}`}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-stone-800 tracking-tight leading-snug">
                {currentSlide.title}
              </h2>

              {currentSlide.highlight && (
                <div className="py-2.5 px-4 bg-white rounded-2xl font-black text-lg sm:text-xl text-stone-800 shadow-sm border border-stone-100 flex items-center justify-center gap-2">
                  <span>✨</span>
                  <span>{currentSlide.highlight}</span>
                </div>
              )}

              <div className="bg-white/80 backdrop-blur-xs p-5 rounded-2xl border border-stone-200/60 shadow-xs text-left">
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-medium">
                  {currentSlide.text}
                </p>

                {currentSlide.tip && (
                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-start gap-2 text-xs text-stone-500">
                    <span className="font-bold text-stone-700 shrink-0">
                      {isPolish ? '💡 Wskazówka:' : isUkrainian ? '💡 Порада:' : isEnglish ? '💡 Tip:' : '💡 Совет:'}
                    </span>
                    <span>{currentSlide.tip}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SLIDE TYPE: QUIZ */}
          {currentSlide.type === 'quiz' && (
            <div className="space-y-4 max-w-sm mx-auto w-full animate-slide-up">
              <div className="w-12 h-12 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-xs text-stone-700">
                <HelpCircle className="w-6 h-6 text-mint-600" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  {isPolish ? 'Sprawdź się' : isUkrainian ? 'Перевір себе' : isEnglish ? 'Check yourself' : 'Проверь себя'}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-stone-800 leading-snug">
                  {currentSlide.question}
                </h2>
              </div>

              {/* Quiz Option Buttons */}
              <div className="space-y-2.5 pt-1">
                {currentSlide.options.map((opt, idx) => {
                  const isSelected = quizAnswer?.selectedIndex === idx;
                  let btnColor = 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200';

                  if (quizAnswer) {
                    if (opt.isCorrect) {
                      btnColor = 'bg-mint-100 text-mint-900 border-mint-400 font-bold ring-2 ring-mint-300';
                    } else if (isSelected && !opt.isCorrect) {
                      btnColor = 'bg-peach-100 text-peach-900 border-peach-400 font-bold';
                    } else {
                      btnColor = 'bg-white/50 text-stone-400 border-stone-200 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={!!quizAnswer}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuizChoice(idx, opt.isCorrect);
                      }}
                      className={`w-full p-3.5 rounded-xl border text-sm font-semibold transition-all shadow-xs text-left flex items-center justify-between ${btnColor}`}
                    >
                      <span>{opt.text}</span>
                      {quizAnswer && opt.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-mint-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Answer Explanation */}
              {quizAnswer && (
                <div className="bg-white/95 p-4 rounded-2xl border border-stone-200 shadow-sm text-left animate-slide-up space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-mint-700">
                    <span>
                      {quizAnswer.isCorrect
                        ? (isPolish ? '🎉 Prawidłowo!' : isUkrainian ? '🎉 Правильно!' : isEnglish ? '🎉 Correct!' : '🎉 Правильно!')
                        : (isPolish ? '💡 Blisko! Oto jak jest w rzeczywistości:' : isUkrainian ? '💡 Майже! Ось як насправді:' : isEnglish ? '💡 Close! Here is what really happens:' : '💡 Почти! Вот как на самом деле:')}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {currentSlide.explanation}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="w-full mt-2 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold transition shadow-xs"
                  >
                    {isPolish ? 'Kontynuuj ➔' : isUkrainian ? 'Продовжити ➔' : isEnglish ? 'Continue ➔' : 'Продолжить ➔'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SLIDE TYPE: COMPLETION */}
          {currentSlide.type === 'completion' && (
            <div className="space-y-6 max-w-sm mx-auto animate-slide-up">
              <div className="w-20 h-20 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-md border border-stone-100">
                <CheckCircle2 className="w-10 h-10 text-mint-600" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-stone-800">
                  {currentSlide.title}
                </h2>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {currentSlide.text}
                </p>
              </div>

              <div className="p-4 bg-white/90 rounded-2xl border border-stone-200/70 shadow-sm text-left space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-500 uppercase">
                  <MessageCircle className="w-4 h-4 text-lavender-600" />
                  <span>
                    {isPolish ? 'Prywatna rozmowa ze starszą siostrą' : isUkrainian ? 'Особистий діалог із сестрою' : isEnglish ? 'Private talk with big sister' : 'Личный диалог с сестрой'}
                  </span>
                </div>
                <p className="text-xs text-stone-600">
                  {isPolish
                    ? 'Możesz mieć intymne pytanie, o które krępujesz się zapytać kogoś innego. Nasz czat jest w 100% bezpieczny i poufny.'
                    : isUkrainian
                    ? 'У тебе може бути своє особисте запитання, про яке незручно запитати інших. Наш чат повністю анонімний.'
                    : isEnglish
                    ? 'You might have a personal question that feels hard to ask others. Our chat is 100% private and gentle.'
                    : 'У тебя может быть свой личный вопрос, о котором неловко спросить других. Наш чат полностью анонимен.'}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToChatWithPrompt(currentSlide.promptContext || '');
                  }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-lavender-600 to-lavender-500 hover:from-lavender-700 hover:to-lavender-600 text-white rounded-xl font-bold text-xs sm:text-sm transition shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{currentSlide.ctaText || (isPolish ? 'Zapytaj w czacie' : isUkrainian ? 'Запитати в чаті' : isEnglish ? 'Ask in chat' : 'Спросить сестру')}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setScreen('dashboard');
                }}
                className="text-xs text-stone-500 hover:text-stone-800 font-semibold underline underline-offset-4"
              >
                {isPolish ? 'Wróć do strony głównej' : isUkrainian ? 'Повернутися на головну' : isEnglish ? 'Back to home' : 'Вернуться на главную'}
              </button>
            </div>
          )}
        </div>

        {/* Bottom Bar: Touch/Arrow hint navigation */}
        <div className="px-5 py-3 z-20 flex items-center justify-between text-xs text-stone-500 bg-gradient-to-t from-stone-900/30 to-transparent">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1 font-semibold px-2 py-1 rounded ${
              currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/50 text-stone-700'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isPolish ? 'Wstecz' : isUkrainian ? 'Назад' : isEnglish ? 'Back' : 'Назад'}</span>
          </button>

          <span className="text-[11px] font-bold text-stone-600 bg-white/60 px-2.5 py-0.5 rounded-full">
            {currentIndex + 1} / {slides.length}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (currentIndex < slides.length - 1) handleNext();
              else setScreen('dashboard');
            }}
            className="flex items-center gap-1 font-semibold px-2 py-1 rounded hover:bg-white/50 text-stone-700"
          >
            <span>
              {currentIndex === slides.length - 1
                ? (isPolish ? 'Gotowe' : isUkrainian ? 'Готово' : isEnglish ? 'Done' : 'Готово')
                : (isPolish ? 'Dalej' : isUkrainian ? 'Далі' : isEnglish ? 'Next' : 'Дальше')}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
