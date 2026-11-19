import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, RefreshCw, Lock } from 'lucide-react';

const GATE_TRANSLATIONS = {
  ru: {
    title: 'Зона для родителей',
    subtitle: 'Для входа решите простой пример (защита от случайного нажатия ребенком):',
    error: 'Неверный ответ. Попробуйте еще раз 🌸',
    cancel: 'Отмена',
    refresh: 'Другой пример',
    securityTip: 'Раздел содержит педагогические шпаргалки и чек-листы для мам и пап.'
  },
  uk: {
    title: 'Зона для батьків',
    subtitle: 'Для входу розвʼяжіть простий приклад (захист від випадкового натискання дитиною):',
    error: 'Невірна відповідь. Спробуйте ще раз 🌸',
    cancel: 'Скасувати',
    refresh: 'Інший приклад',
    securityTip: 'Розділ містить педагогічні підказки та чек-листи для мам і татів.'
  },
  pl: {
    title: 'Strefa dla rodziców',
    subtitle: 'Aby wejść, rozwiąż proste zadanie (zabezpieczenie przed dziećmi):',
    error: 'Niepoprawny wynik. Spróbuj ponownie 🌸',
    cancel: 'Anuluj',
    refresh: 'Inne zadanie',
    securityTip: 'Sekcja zawiera wskazówki psychologiczne i listy kontrolne dla rodziców.'
  },
  en: {
    title: 'Parent Zone',
    subtitle: 'Please solve this quick problem to enter (child safety gate):',
    error: 'Incorrect answer. Please try again 🌸',
    cancel: 'Cancel',
    refresh: 'New challenge',
    securityTip: 'This section contains conversation scripts and checklists for parents.'
  }
};

export const ParentGateModal = ({ isOpen, onClose, onSuccess, language = 'ru' }) => {
  const [problem, setProblem] = useState({ a: 7, b: 8, answer: 56, options: [54, 56, 48] });
  const [error, setError] = useState(false);

  const t = GATE_TRANSLATIONS[language] || GATE_TRANSLATIONS.ru;

  const generateProblem = () => {
    // Math challenge: multiplication of two numbers between 6 and 9
    const a = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, 9
    const b = Math.floor(Math.random() * 5) + 5; // 5, 6, 7, 8, 9
    const answer = a * b;

    const d1 = answer + (Math.random() > 0.5 ? 4 : -4);
    const d2 = answer + (Math.random() > 0.5 ? 8 : -6);
    const d3 = answer + (Math.random() > 0.5 ? -2 : 6);

    const distractors = Array.from(new Set([d1, d2, d3]))
      .filter((n) => n > 0 && n !== answer)
      .slice(0, 2);

    while (distractors.length < 2) {
      distractors.push(answer + (distractors.length + 1) * 3);
    }

    const options = [answer, ...distractors].sort(() => Math.random() - 0.5);
    setProblem({ a, b, answer, options });
    setError(false);
  };

  useEffect(() => {
    if (isOpen) {
      generateProblem();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectOption = (choice) => {
    if (choice === problem.answer) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => {
        generateProblem();
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition"
          aria-label={t.cancel}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900 leading-tight">
              {t.title}
            </h3>
            <span className="text-[11px] font-semibold text-amber-700">
              Parental Gate 🛡️
            </span>
          </div>
        </div>

        <p className="text-xs text-stone-600 leading-relaxed">
          {t.subtitle}
        </p>

        {/* Math Challenge Box */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 text-center space-y-3">
          <div className="text-2xl font-black tracking-wide text-stone-800">
            {problem.a} × {problem.b} = ?
          </div>

          <div className="grid grid-cols-3 gap-2">
            {problem.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(option)}
                className="py-3 px-2 rounded-xl bg-white border border-stone-200 hover:border-amber-400 hover:bg-amber-50/70 font-bold text-lg text-stone-800 shadow-xs active:scale-95 transition"
              >
                {option}
              </button>
            ))}
          </div>

          {error && (
            <p className="text-xs font-semibold text-rose-500 animate-pulse">
              {t.error}
            </p>
          )}

          <button
            onClick={generateProblem}
            type="button"
            className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-600 pt-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{t.refresh}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
          <p className="leading-tight">{t.securityTip}</p>
        </div>

        {/* Direct Access Button for Parents */}
        <button
          onClick={onSuccess}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs shadow-md active:scale-98 transition flex items-center justify-center gap-2"
        >
          <span className="text-base">👨‍👩‍👧</span>
          <span>
            {language === 'pl'
              ? 'Wejdź do strefy rodzica'
              : language === 'uk'
              ? 'Увійти до зони батьків'
              : language === 'en'
              ? 'Enter Parent Zone'
              : 'Войти в зону для родителей'}
          </span>
        </button>
      </div>
    </div>
  );
};
