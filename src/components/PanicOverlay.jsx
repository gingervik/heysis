import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, FileText, Delete, RotateCcw, X, ShieldAlert } from 'lucide-react';

export const PanicOverlay = () => {
  const { isPanicOpen, closePanic, panicType, appLanguage } = useApp();
  const [activeTab, setActiveTab] = useState(panicType || 'calculator');

  const isPolish = appLanguage === 'pl';
  const isUkrainian = appLanguage === 'uk';

  // Calculator State
  const [display, setDisplay] = useState('0');
  const [prevVal, setPrevVal] = useState(null);
  const [operation, setOperation] = useState(null);
  const [clearTapCount, setClearTapCount] = useState(0);

  // Notes State
  const defaultNotes = isPolish
    ? 'Plan lekcji i zadań na ten tydzień:\n1. Matematyka — zadania ze strony 48\n2. Biologia — komórki roślinne i zwierzęce\n3. Język angielski — 10 nieregularnych czasowników'
    : isUkrainian
    ? 'План домашнього завдання на тиждень:\n1. Алгебра — №142, 145 (стор. 48)\n2. Біологія — прочитати параграф 12 про клітини\n3. Англійська мова — вивчити 10 неправильних дієслів\n4. Література — читати оповідання'
    : 'План домашнего задания на неделю:\n1. Алгебра — №142, 145 (стр. 48)\n2. Биология — прочитать параграф 12 про клетки\n3. Английский язык — выучить 10 неправильных глаголов\n4. Литература — читать рассказ Тургенева';

  const [notesText, setNotesText] = useState(defaultNotes);

  if (!isPanicOpen) return null;

  // Calculator logic
  const handleDigit = (digit) => {
    setDisplay((prev) => (prev === '0' ? String(digit) : prev + digit));
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevVal(null);
    setOperation(null);
    // Secret unlock trigger: tapping Clear 3 times quickly
    const newCount = clearTapCount + 1;
    setClearTapCount(newCount);
    if (newCount >= 3) {
      setClearTapCount(0);
      closePanic();
    }
  };

  const handleOp = (op) => {
    setPrevVal(parseFloat(display));
    setOperation(op);
    setDisplay('0');
  };

  const handleEquals = () => {
    if (prevVal === null || operation === null) return;
    const current = parseFloat(display);
    let result = 0;
    switch (operation) {
      case '+': result = prevVal + current; break;
      case '-': result = prevVal - current; break;
      case '×': result = prevVal * current; break;
      case '÷': result = current !== 0 ? prevVal / current : 'Ошибка'; break;
      default: return;
    }
    setDisplay(String(result));
    setPrevVal(null);
    setOperation(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900 text-white flex flex-col justify-between p-4 sm:p-6 select-none animate-fadeIn">
      {/* Top camouflage bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3 pt-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-60"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-60"></div>
          <span className="text-xs text-neutral-400 font-mono ml-2">
            {activeTab === 'calculator'
              ? (isPolish ? 'Kalkulator • v2.4' : isUkrainian ? 'Калькулятор • v2.4' : 'Калькулятор • v2.4')
              : (isPolish ? 'Moje Notatki Szkolne' : isUkrainian ? 'Мої Навчальні Нотатки' : 'Мои Учебные Заметки')}
          </span>
        </div>

        {/* Camouflage switcher & Discreet exit */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab(activeTab === 'calculator' ? 'notes' : 'calculator')}
            className="text-xs text-neutral-400 hover:text-white px-2 py-1 rounded bg-neutral-800 transition"
            title={isPolish ? 'Przełącz kamuflaż' : isUkrainian ? 'Перемкнути маскування' : 'Переключить режим маскировки'}
          >
            {activeTab === 'calculator'
              ? (isPolish ? 'Notatnik' : isUkrainian ? 'Блокнот' : 'Блокнот')
              : (isPolish ? 'Kalkulator' : isUkrainian ? 'Калькулятор' : 'Калькулятор')}
          </button>
          {/* Safe exit button with tooltip */}
          <button
            onClick={closePanic}
            className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 transition"
            title={isPolish ? 'Powrót do aplikacji (Esc)' : isUkrainian ? 'Повернутися в додаток (Esc)' : 'Вернуться в приложение (Esc)'}
          >
            <span>{isPolish ? 'Wyjdź z trybu SOS' : isUkrainian ? 'Вийти з режиму SOS' : 'Выйти из режима SOS'}</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Camouflage Content */}
      {activeTab === 'calculator' ? (
        <div className="max-w-sm w-full mx-auto my-auto flex flex-col justify-end">
          {/* Screen Display */}
          <div className="text-right py-6 px-4 bg-neutral-950 rounded-2xl mb-4 border border-neutral-800/60 shadow-inner">
            <div className="text-xs text-neutral-500 font-mono h-5">
              {prevVal !== null && `${prevVal} ${operation}`}
            </div>
            <div className="text-4xl sm:text-5xl font-mono tracking-wider truncate text-neutral-100">
              {display}
            </div>
          </div>

          {/* Calculator Keypad */}
          <div className="grid grid-cols-4 gap-2.5 text-lg font-medium">
            <button
              onClick={handleClear}
              className="py-4 bg-neutral-700 hover:bg-neutral-600 rounded-xl text-peach-300 font-bold active:scale-95 transition"
            >
              AC
            </button>
            <button
              onClick={() => setDisplay((prev) => (parseFloat(prev) * -1).toString())}
              className="py-4 bg-neutral-700 hover:bg-neutral-600 rounded-xl text-neutral-200 active:scale-95 transition"
            >
              ±
            </button>
            <button
              onClick={() => setDisplay((prev) => (parseFloat(prev) / 100).toString())}
              className="py-4 bg-neutral-700 hover:bg-neutral-600 rounded-xl text-neutral-200 active:scale-95 transition"
            >
              %
            </button>
            <button
              onClick={() => handleOp('÷')}
              className="py-4 bg-amber-600 hover:bg-amber-500 rounded-xl text-white font-bold active:scale-95 transition"
            >
              ÷
            </button>

            {[7, 8, 9].map((n) => (
              <button
                key={n}
                onClick={() => handleDigit(n)}
                className="py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl active:scale-95 transition"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => handleOp('×')}
              className="py-4 bg-amber-600 hover:bg-amber-500 rounded-xl text-white font-bold active:scale-95 transition"
            >
              ×
            </button>

            {[4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => handleDigit(n)}
                className="py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl active:scale-95 transition"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => handleOp('-')}
              className="py-4 bg-amber-600 hover:bg-amber-500 rounded-xl text-white font-bold active:scale-95 transition"
            >
              −
            </button>

            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => handleDigit(n)}
                className="py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl active:scale-95 transition"
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => handleOp('+')}
              className="py-4 bg-amber-600 hover:bg-amber-500 rounded-xl text-white font-bold active:scale-95 transition"
            >
              +
            </button>

            <button
              onClick={() => handleDigit(0)}
              className="col-span-2 py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-left pl-7 active:scale-95 transition"
            >
              0
            </button>
            <button
              onClick={handleDecimal}
              className="py-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl active:scale-95 transition"
            >
              .
            </button>
            <button
              onClick={handleEquals}
              className="py-4 bg-amber-600 hover:bg-amber-500 rounded-xl text-white font-bold active:scale-95 transition"
            >
              =
            </button>
          </div>
        </div>
      ) : (
        /* Notes Camouflage */
        <div className="max-w-md w-full mx-auto my-auto flex-1 flex flex-col py-4">
          <div className="bg-neutral-800/80 rounded-2xl p-4 flex-1 flex flex-col border border-neutral-700">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-neutral-700">
              <FileText className="w-5 h-5 text-blue-400" />
              <input
                type="text"
                defaultValue={
                  isPolish
                    ? 'Notatki szkolne (Zadania domowe)'
                    : isUkrainian
                    ? 'Шкільні нотатки (Домашнє завдання)'
                    : 'Школьные заметки (Домашнее задание)'
                }
                className="bg-transparent font-bold text-white text-sm focus:outline-none w-full"
              />
            </div>
            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              className="w-full flex-1 bg-transparent text-neutral-300 text-sm focus:outline-none resize-none leading-relaxed font-sans"
              placeholder={
                isPolish
                  ? 'Zacznij pisać notatki szkolne...'
                  : isUkrainian
                  ? 'Почніть писати навчальні нотатки...'
                  : 'Начните писать учебные заметки...'
              }
            />
            <div className="text-[11px] text-neutral-500 pt-2 flex justify-between">
              <span>
                {isPolish
                  ? 'Zapisano lokalnie w pamięci'
                  : isUkrainian
                  ? 'Збережено локально в пам’яті'
                  : 'Сохранено локально в памяти'}
              </span>
              <span>
                {isPolish ? 'Słów: ' : isUkrainian ? 'Слів: ' : 'Слов: '}
                {notesText.split(/\s+/).filter(Boolean).length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Secret Bottom Tip */}
      <div className="text-center text-[11px] text-neutral-600 pt-2 flex items-center justify-center gap-1">
        <span>
          {isPolish
            ? 'Kamuflaż włączony. Naciśnij «Esc» lub krzyżyk u góry, aby wrócić.'
            : isUkrainian
            ? 'Камуфляж увімкнено. Натисніть «Esc» або хрестик вгорі, щоб повернутися.'
            : 'Камуфляж включен. Нажмите «Esc» или крестик вверху, чтобы вернуться.'}
        </span>
      </div>
    </div>
  );
};
