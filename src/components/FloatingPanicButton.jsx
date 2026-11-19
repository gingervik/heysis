import React from 'react';
import { useApp } from '../context/AppContext';
import { Calculator } from 'lucide-react';

export const FloatingPanicButton = () => {
  const { triggerPanic, isPanicOpen, screen, appLanguage } = useApp();

  // If panic is already open or we are in chat (which has its own header button), don't render
  if (isPanicOpen || screen === 'chat') return null;

  const isPolish = appLanguage === 'pl';
  const isUkrainian = appLanguage === 'uk';

  return (
    <div className="fixed bottom-4 right-4 sm:top-3.5 sm:right-4 sm:bottom-auto z-30 flex items-center gap-1.5">
      <button
        onClick={() => triggerPanic('calculator')}
        className="group flex items-center gap-1.5 bg-white/95 backdrop-blur-md hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-200/90 shadow-md hover:shadow-lg px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95"
        title={
          isPolish
            ? 'Szybkie ukrycie: kalkulator'
            : isUkrainian
            ? 'Швидкий камуфляж: калькулятор'
            : 'Быстрый камуфляж: калькулятор'
        }
        aria-label={
          isPolish
            ? 'Szybkie ukrycie'
            : isUkrainian
            ? 'Швидкий камуфляж'
            : 'Быстрый камуфляж'
        }
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <Calculator className="w-4 h-4 text-stone-600 group-hover:text-blue-600 transition-colors" />
        <span className="text-[11px] font-bold text-stone-700">
          {isPolish ? 'Kalkulator' : isUkrainian ? 'SOS Сховати' : 'SOS Скрыть'}
        </span>
      </button>
    </div>
  );
};