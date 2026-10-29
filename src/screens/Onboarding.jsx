import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Heart, Sparkles, Calculator, Check, ArrowRight, EyeOff } from 'lucide-react';

export const Onboarding = () => {
  const { completeOnboarding, ageGroup, triggerPanic } = useApp();
  const [selectedAge, setSelectedAge] = useState(ageGroup || '13-15');
  const [hasTriedPanic, setHasTriedPanic] = useState(false);

  const ageOptions = [
    { value: '8-9', label: '8–9 лет', hint: 'Тело и дружба' },
    { value: '10-12', label: '10–12 лет', hint: 'Самое начало' },
    { value: '13-15', label: '13–15 лет', hint: 'Время перемен' },
    { value: '16+', label: '16+ лет', hint: 'Взросление' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint-50/60 via-lavender-50/50 to-peach-50/60 flex flex-col justify-between p-5 sm:p-8 max-w-lg mx-auto">
      {/* Header safety badge */}
      <div className="pt-2">
        <div className="inline-flex items-center gap-2 bg-white/90 border border-mint-200/80 rounded-full px-3.5 py-1.5 shadow-sm text-xs font-semibold text-mint-700">
          <ShieldCheck className="w-4 h-4 text-mint-600" />
          <span>100% Анонимно • Без регистрации и смс</span>
        </div>
      </div>

      {/* Main Hero & Welcome */}
      <div className="my-auto py-6 space-y-6">
        {/* Soft Mascot / Badge */}
        <div className="w-20 h-20 bg-gradient-to-tr from-mint-200 to-lavender-200 rounded-3xl mx-auto flex items-center justify-center shadow-md shadow-lavender-200/40 relative">
          <Sparkles className="w-10 h-10 text-mint-700 animate-pulse-subtle" />
          <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
            <Heart className="w-4 h-4 text-peach-500 fill-peach-400" />
          </div>
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-800 tracking-tight">
            Твоё безопасное пространство
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-sm mx-auto">
            Привет! Здесь ты можешь спокойно узнать всё о своем теле, месячных и эмоциях.
            <span className="font-semibold text-stone-700 block mt-1">
              Никаких аккаунтов, истории поиска и следов.
            </span>
          </p>
        </div>

        {/* Age selection cards */}
        <div className="space-y-2.5 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-stone-200/70 shadow-sm">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider flex justify-between items-center">
            <span>Сколько тебе лет?</span>
            <span className="text-[11px] font-normal text-stone-400">для адаптации историй</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {ageOptions.map((opt) => {
              const isSelected = selectedAge === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedAge(opt.value)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-mint-500 bg-mint-50/90 text-mint-800 font-bold shadow-sm ring-1 ring-mint-400'
                      : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600'
                  }`}
                >
                  <span className="text-sm">{opt.label}</span>
                  <span className="text-[10px] text-stone-400 mt-0.5">{opt.hint}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Safety Rule & Panic Button Interactive Demonstration */}
        <div className="bg-gradient-to-r from-lavender-100/70 to-peach-100/60 p-4 rounded-2xl border border-lavender-200/70 shadow-sm space-y-2.5">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-xl shadow-xs text-lavender-700 shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div className="text-xs text-stone-700 leading-snug">
              <div className="font-bold text-stone-800 text-sm mb-0.5 flex items-center gap-1.5">
                <span>Правило безопасности: Кнопка SOS</span>
                <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded text-[10px]">
                  Камуфляж
                </span>
              </div>
              Если кто-то заглядывает через плечо — нажми кнопку <span className="font-semibold">«SOS»</span> в углу экрана или клавишу <span className="font-mono bg-white px-1 rounded border text-[11px]">Esc</span>. Приложение моментально превратится в обычный рабочий калькулятор.
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between">
            <span className="text-[11px] text-stone-500">
              {hasTriedPanic ? '✨ Ты уже проверила, как это работает!' : 'Попробуй проверить прямо сейчас:'}
            </span>
            <button
              onClick={() => {
                setHasTriedPanic(true);
                triggerPanic('calculator');
              }}
              className="text-xs bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 font-semibold px-3 py-1.5 rounded-lg shadow-2xs hover:shadow-xs transition flex items-center gap-1"
            >
              <span>Тест камуфляжа</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-4 pb-2">
        <button
          onClick={() => completeOnboarding(selectedAge)}
          className="w-full bg-gradient-to-r from-mint-600 to-mint-500 hover:from-mint-700 hover:to-mint-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 text-base"
        >
          <span>Начать безопасное знакомство</span>
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-center text-[11px] text-stone-400 mt-2">
          Данные хранятся только в памяти твоего устройства
        </p>
      </div>
    </div>
  );
};
