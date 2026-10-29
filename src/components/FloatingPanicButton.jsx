import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, EyeOff, Calculator } from 'lucide-react';

export const FloatingPanicButton = () => {
  const { triggerPanic, isPanicOpen, screen } = useApp();

  // If panic is already open or during onboarding demo step if customized, show or hide
  if (isPanicOpen) return null;

  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 flex items-center gap-1.5">
      <button
        onClick={() => triggerPanic('calculator')}
        className="group flex items-center gap-1.5 bg-white/85 backdrop-blur-md hover:bg-white text-stone-600 hover:text-stone-900 border border-stone-200/80 shadow-sm hover:shadow-md px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95"
        title="SOS Быстрый выход: мгновенный калькулятор"
        aria-label="Быстрый камуфляж (SOS)"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <Calculator className="w-3.5 h-3.5 text-stone-500 group-hover:text-blue-600 transition-colors" />
        <span className="hidden xs:inline text-[11px] font-medium tracking-tight text-stone-600">
          SOS Скрыть
        </span>
      </button>
    </div>
  );
};
