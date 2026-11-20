import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useVoice } from '../context/VoiceContext';
import { HeySisLogo } from '../components/HeySisLogo';
import { ShieldCheck, Heart, Sparkles, Calculator, Check, ArrowRight, EyeOff, Volume2, VolumeX, Mic, Globe } from 'lucide-react';

export const Onboarding = () => {
  const { completeOnboarding, ageGroup, triggerPanic, appLanguage, setAppLanguage, t } = useApp();
  const { speak, stopSpeaking, isSpeaking, speakingId, voiceEnabled, setVoiceEnabled } = useVoice();
  const [selectedAge, setSelectedAge] = useState(ageGroup || '8-9');
  const [hasTriedPanic, setHasTriedPanic] = useState(false);

  const isPolish = appLanguage === 'pl';
  const isUkrainian = appLanguage === 'uk';
  const isEnglish = appLanguage === 'en';

  const isYoungKid = selectedAge === '5-7' || selectedAge === '8-9';

  const welcomeSpokenText = isPolish
    ? (isYoungKid
        ? 'Cześć, słoneczko! To Twoja bezpieczna przestrzeń. Tutaj możesz dowiedzieć się o sekretach ciała, granicach, przyjaźni i co zrobić, gdy czujesz niepokój. Możesz zadawać pytania głosem przez mikrofon, a siostra odpowie Ci na głos! Nikt nie dowie się o naszych rozmowach.'
        : 'Cześć! To Twoja bezpieczna przestrzeń. Tutaj możesz spokojnie dowiedzieć się wszystkiego o swoim ciele, miesiączce i emocjach bez wstydu i strachu. Żadnych kont, haseł i historii.')
    : isUkrainian
    ? (isYoungKid
        ? 'Привіт, сонечко! Це твій безпечний простір. Тут ти можеш дізнатися про секрети тіла, кордони, дружбу і що робити, якщо тобі тривожно. Ти можеш ставити запитання просто своїм голосом через мікрофон, а сестричка відповість тобі вголос! Ніхто не дізнається про наші розмови.'
        : 'Привіт! Це твій безпечний простір. Тут ти можеш спокійно дізнатися все про своє тіло, місячні та емоції без сорому й страху. Жодних акаунтів, паролів чи слідів. Доступні голосове введення та озвучення відповідей.')
    : isEnglish
    ? (isYoungKid
        ? 'Hello sweetie! This is your safe haven. Here you can learn about your body, personal boundaries, feelings, and bravery. You can speak into the mic, and big sister will read back to you! Everything stays strictly private.'
        : 'Hello! This is your private safe space. Here you can comfortably learn about your body, periods, and emotions without embarrassment or worry. No accounts, passwords, or traces. Voice input and audio responses are ready for you.')
    : (isYoungKid
        ? 'Привет, солнышко! Это твоё безопасное пространство. Здесь ты можешь узнать о секретах тела, границах, дружбе и что делать, если тебе тревожно. Ты можешь задавать вопросы прямо своим голосом через микрофон, а сестренка ответит тебе вслух! Никто не узнает о наших беседах.'
        : 'Привет! Это твоё безопасное пространство. Здесь ты можешь спокойно узнать всё о своем теле, месячных и эмоциях без стеснения и страха. Никаких аккаунтов, паролей или следов. Доступны голосовой ввод и озвучка ответов.');

  const isWelcomeSpeaking = isSpeaking && speakingId === 'onboarding-welcome';

  const toggleWelcomeVoice = () => {
    if (isWelcomeSpeaking) {
      stopSpeaking();
    } else {
      speak(welcomeSpokenText, 'onboarding-welcome');
    }
  };

  const ageOptions = [
    { value: '5-7', label: isPolish ? '5–7 lat' : isUkrainian ? '5–7 років' : isEnglish ? '5–7 yrs' : '5–7 лет', hint: isPolish ? 'Bezpieczeństwo' : isUkrainian ? 'Безпека і тіло' : isEnglish ? 'Safety & body' : 'Безопасность' },
    { value: '8-9', label: isPolish ? '8–9 lat' : isUkrainian ? '8–9 років' : isEnglish ? '8–9 yrs' : '8–9 лет', hint: isPolish ? 'Ciało i przyjaźń' : isUkrainian ? 'Тіло і дружба' : isEnglish ? 'Body & friendship' : 'Тело и дружба' },
    { value: '10-12', label: isPolish ? '10–12 lat' : isUkrainian ? '10–12 років' : isEnglish ? '10–12 yrs' : '10–12 лет', hint: isPolish ? 'Sam początek' : isUkrainian ? 'Самий початок' : isEnglish ? 'Starting out' : 'Самое начало' },
    { value: '13-15', label: isPolish ? '13–15 lat' : isUkrainian ? '13–15 років' : isEnglish ? '13–15 yrs' : '13–15 лет', hint: isPolish ? 'Czas zmian' : isUkrainian ? 'Час змін' : isEnglish ? 'Time of changes' : 'Время перемен' },
    { value: '16+', label: isPolish ? '16+ lat' : isUkrainian ? '16+ років' : isEnglish ? '16+ yrs' : '16+ лет', hint: isPolish ? 'Dorastanie' : isUkrainian ? 'Дорослішання' : isEnglish ? 'Growing up' : 'Взросление' },
  ];

  return (
    <div className="h-[100dvh] overflow-y-auto bg-gradient-to-b from-mint-50/60 via-lavender-50/50 to-peach-50/60 flex flex-col justify-between px-4 py-3 sm:py-5 max-w-lg mx-auto gap-2.5">
      {/* Header safety badge & Language Selector */}
      <div className="flex items-center justify-between shrink-0">
        <div className="inline-flex items-center gap-1.5 bg-white/90 border border-mint-200/80 rounded-full px-3 py-1 shadow-xs text-[11px] font-semibold text-mint-700">
          <ShieldCheck className="w-3.5 h-3.5 text-mint-600" />
          <span>
            {isPolish
              ? '100% Anonimowo • Bez konta'
              : isUkrainian
              ? '100% Анонімно • Без реєстрації'
              : isEnglish
              ? '100% Private • No account'
              : '100% Анонимно • Без регистрации'}
          </span>
        </div>

        {/* Language switch */}
        <div className="flex items-center bg-white/90 border border-stone-200 rounded-full px-2.5 py-1 text-xs text-stone-700 shadow-xs">
          <Globe className="w-3.5 h-3.5 text-stone-500 mr-1" />
          <select
            value={appLanguage}
            onChange={(e) => setAppLanguage(e.target.value)}
            className="bg-transparent font-bold text-stone-700 focus:outline-none cursor-pointer text-xs"
          >
            <option value="ru">🌸 RU</option>
            <option value="uk">🌻 UA</option>
            <option value="pl">🇵🇱 PL</option>
            <option value="en">✨ EN</option>
          </select>
        </div>
      </div>

      {/* Main Hero & Welcome */}
      <div className="my-auto space-y-3">
        {/* HeySis Brand Logo */}
        <div className="flex flex-col items-center gap-1">
          <HeySisLogo className="w-14 h-14 shadow-md shadow-lavender-200/50" rounded="rounded-2xl" />
          <span className="text-sm font-black tracking-tight bg-gradient-to-r from-lavender-600 via-rose-500 to-mint-600 bg-clip-text text-transparent">
            HeySis
          </span>
        </div>

        <div className="text-center space-y-1.5">
          <h1 className="text-xl sm:text-2xl font-extrabold text-stone-800 tracking-tight leading-tight">
            {isPolish
              ? 'Twoja bezpieczna przestrzeń'
              : isUkrainian
              ? 'Твій безпечний простір'
              : isEnglish
              ? 'Your safe haven'
              : 'Твоё безопасное пространство'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-snug max-w-sm mx-auto">
            {isPolish
              ? 'Spokojnie poznaj swoje ciało, emocje i przyjaźń — bez kont i śladów.'
              : isUkrainian
              ? 'Спокійно дізнайся про тіло, емоції та дружбу — без акаунтів і слідів.'
              : isEnglish
              ? 'Calmly learn about your body, feelings & boundaries — no accounts or traces.'
              : 'Спокойно узнай о своём теле, эмоциях и границах — без аккаунтов и следов.'}
          </p>

          {/* Compact Voice listen button */}
          <div className="pt-0.5 flex justify-center">
            <button
              type="button"
              onClick={toggleWelcomeVoice}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold transition shadow-xs ${
                isWelcomeSpeaking
                  ? 'bg-lavender-500 text-white animate-pulse'
                  : 'bg-white hover:bg-lavender-50 text-lavender-800 border border-lavender-200'
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 ${isWelcomeSpeaking ? 'animate-bounce' : 'text-lavender-600'}`} />
              <span>
                {isWelcomeSpeaking
                  ? (isPolish ? 'Zatrzymaj' : isUkrainian ? 'Зупинити' : isEnglish ? 'Tap to stop' : 'Остановить')
                  : (isPolish ? 'Posłuchaj powitania 🔊' : isUkrainian ? 'Послухати голосом 🔊' : isEnglish ? 'Listen to welcome 🔊' : 'Послушать голосом 🔊')}
              </span>
            </button>
          </div>
        </div>

        {/* Compact Age selection pills (single clean row) */}
        <div className="space-y-2 bg-white/85 backdrop-blur-sm p-3 rounded-2xl border border-stone-200/70 shadow-sm">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex justify-between items-center">
            <span>{t('selectAge')}</span>
            <span className="text-[10px] font-normal text-stone-400">
              {isPolish
                ? 'dopasuje historie'
                : isUkrainian
                ? 'адаптує історії'
                : isEnglish
                ? 'adapts stories'
                : 'адаптирует истории'}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {ageOptions.map((opt) => {
              const isSelected = selectedAge === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSelectedAge(opt.value)}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-mint-500 bg-mint-50/90 text-mint-800 font-extrabold shadow-xs ring-1 ring-mint-400'
                      : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600 font-semibold'
                  }`}
                >
                  <span className="text-xs leading-tight">{opt.value}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Safety Rule & Panic Button strip */}
        <div className="bg-gradient-to-r from-lavender-100/70 to-peach-100/60 p-3 rounded-2xl border border-lavender-200/70 shadow-xs flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-2 bg-white rounded-xl shadow-2xs text-lavender-700 shrink-0">
              <Calculator className="w-4 h-4" />
            </div>
            <div className="text-[11px] text-stone-700 leading-snug min-w-0">
              <div className="font-bold text-stone-800 text-xs flex items-center gap-1">
                <span>{isPolish ? 'Przycisk SOS' : isUkrainian ? 'Кнопка SOS' : isEnglish ? 'SOS Stealth' : 'Кнопка SOS'}</span>
                <span className="px-1.5 bg-amber-100 text-amber-800 rounded text-[9px]">Esc</span>
              </div>
              <p className="truncate text-stone-600">
                {isPolish
                  ? 'Natychmiast zamienia ekran w kalkulator'
                  : isUkrainian
                  ? 'Миттєво вмикає робочий калькулятор'
                  : isEnglish
                  ? 'Instantly switches to a working calculator'
                  : 'Мгновенно включает рабочий калькулятор'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              setHasTriedPanic(true);
              triggerPanic('calculator');
            }}
            className="text-[11px] bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 font-bold px-2.5 py-1.5 rounded-lg shadow-2xs transition shrink-0"
          >
            {hasTriedPanic ? '✨ OK' : (isPolish ? 'Test' : isUkrainian ? 'Тест' : isEnglish ? 'Test' : 'Тест')}
          </button>
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-1 pb-1 shrink-0">
        <button
          onClick={() => {
            stopSpeaking();
            completeOnboarding(selectedAge);
          }}
          className="w-full bg-gradient-to-r from-mint-600 to-mint-500 hover:from-mint-700 hover:to-mint-600 text-white font-bold py-3 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <span>
            {isPolish
              ? 'Rozpocznij bezpiecznie'
              : isUkrainian
              ? 'Почати безпечне знайомство'
              : isEnglish
              ? 'Begin safe journey'
              : 'Начать безопасное знакомство'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-center text-[10px] text-stone-400 mt-1.5">
          {isPolish
            ? 'Dane zapisywane wyłącznie na Twoim urządzeniu'
            : isUkrainian
            ? 'Дані зберігаються тільки на твоєму пристрої'
            : isEnglish
            ? 'All data stays strictly on your device'
            : 'Данные хранятся только на твоём устройстве'}
        </p>
      </div>
    </div>
  );
};
