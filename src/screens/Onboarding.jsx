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
    <div className="min-h-screen bg-gradient-to-b from-mint-50/60 via-lavender-50/50 to-peach-50/60 flex flex-col justify-between p-5 sm:p-8 max-w-lg mx-auto">
      {/* Header safety badge & Language Selector */}
      <div className="pt-2 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 bg-white/90 border border-mint-200/80 rounded-full px-3.5 py-1.5 shadow-sm text-xs font-semibold text-mint-700">
          <ShieldCheck className="w-4 h-4 text-mint-600" />
          <span>
            {isPolish
              ? '100% Anonimowo • Bez rejestracji'
              : isUkrainian
              ? '100% Анонімно • Без реєстрації'
              : isEnglish
              ? '100% Private • No registration'
              : '100% Анонимно • Без регистрации и смс'}
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
      <div className="my-auto py-6 space-y-6">
        {/* HeySis Brand Logo */}
        <div className="flex flex-col items-center gap-2.5">
          <HeySisLogo className="w-20 h-20 shadow-md shadow-lavender-200/50" rounded="rounded-3xl" />
          <span className="text-base font-black tracking-tight bg-gradient-to-r from-lavender-600 via-rose-500 to-mint-600 bg-clip-text text-transparent">
            HeySis
          </span>
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-800 tracking-tight">
            {isPolish
              ? 'Twoja bezpieczna przestrzeń'
              : isUkrainian
              ? 'Твій безпечний простір'
              : isEnglish
              ? 'Your safe haven'
              : 'Твоё безопасное пространство'}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-sm mx-auto">
            {isPolish
              ? 'Cześć! Tutaj możesz spokojnie dowiedzieć się wszystkiego o swoim ciele, emocjach i przyjaźni.'
              : isUkrainian
              ? 'Привіт! Тут ти можеш спокійно дізнатися все про своє тіло, емоції та дружбу.'
              : isEnglish
              ? 'Hello! Here you can comfortably learn all about your body, feelings, and friendships.'
              : 'Привет! Здесь ты можешь спокойно узнать всё о своем теле, эмоциях и дружбе.'}
            <span className="font-semibold text-stone-700 block mt-1">
              {isPolish
                ? 'Żadnych kont, historii przeglądania i śladów.'
                : isUkrainian
                ? 'Жодних акаунтів, історії пошуку та слідів.'
                : isEnglish
                ? 'No accounts, browsing history, or traces.'
                : 'Никаких аккаунтов, истории поиска и следов.'}
            </span>
          </p>

          {/* Voice listen button for young kids who prefer listening */}
          <div className="pt-1 flex justify-center">
            <button
              type="button"
              onClick={toggleWelcomeVoice}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition shadow-xs ${
                isWelcomeSpeaking
                  ? 'bg-lavender-500 text-white animate-pulse'
                  : 'bg-white hover:bg-lavender-50 text-lavender-800 border border-lavender-200'
              }`}
            >
              {isWelcomeSpeaking ? (
                <>
                  <Volume2 className="w-4 h-4 animate-bounce" />
                  <span>
                    {isPolish
                      ? 'Czytam na głos... Naciśnij, aby zatrzymać'
                      : isUkrainian
                      ? 'Читаю вголос... Натисни, щоб зупинити'
                      : isEnglish
                      ? 'Reading aloud... Tap to stop'
                      : 'Читаю вслух... Нажми, чтобы остановить'}
                  </span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-lavender-600" />
                  <span>
                    {isPolish
                      ? 'Posłuchaj powitania na głos 🔊'
                      : isUkrainian
                      ? 'Послухати привітання голосом 🔊'
                      : isEnglish
                      ? 'Listen to welcome voice 🔊'
                      : 'Послушать приветствие голосом 🔊'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Age selection cards */}
        <div className="space-y-2.5 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-stone-200/70 shadow-sm">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wider flex justify-between items-center">
            <span>{t('selectAge')}</span>
            <span className="text-[11px] font-normal text-stone-400">
              {isPolish
                ? 'dla dopasowania tematów'
                : isUkrainian
                ? 'для адаптації історій'
                : isEnglish
                ? 'to adapt topics'
                : 'для адаптации историй'}
            </span>
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
                <span>
                  {isPolish
                    ? 'Zasada bezpieczeństwa: Przycisk SOS'
                    : isUkrainian
                    ? 'Правило безпеки: Кнопка SOS'
                    : isEnglish
                    ? 'Safety Rule: SOS Button'
                    : 'Правило безопасности: Кнопка SOS'}
                </span>
                <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded text-[10px]">
                  {isPolish ? 'Kamuflaż' : isUkrainian ? 'Камуфляж' : isEnglish ? 'Stealth' : 'Камуфляж'}
                </span>
              </div>
              {isPolish
                ? 'Gdy ktoś zagląda przez ramię — naciśnij przycisk «SOS» w rogu lub klawisz Esc. Aplikacja natychmiast zamieni się w zwykły kalkulator.'
                : isUkrainian
                ? 'Якщо хтось заглядає через плече — натисни кнопку «SOS» у кутку екрана або клавішу Esc. Додаток моментально перетвориться на звичайний калькулятор.'
                : isEnglish
                ? 'If someone looks over your shoulder, tap the corner SOS button or press Esc. The screen immediately disguises itself as a normal calculator.'
                : 'Если кто-то заглядывает через плечо — нажми кнопку «SOS» в углу экрана или клавишу Esc. Приложение моментально превратится в обычный рабочий калькулятор.'}
            </div>
          </div>

          <div className="pt-1 flex items-center justify-between">
            <span className="text-[11px] text-stone-500">
              {hasTriedPanic
                ? (isPolish
                    ? '✨ Sprawdziłaś już, jak to działa!'
                    : isUkrainian
                    ? '✨ Ти вже перевірила, як це працює!'
                    : isEnglish
                    ? '✨ You tested how it works!'
                    : '✨ Ты уже проверила, как это работает!')
                : (isPolish
                    ? 'Wypróbuj teraz:'
                    : isUkrainian
                    ? 'Спробуй перевірити просто зараз:'
                    : isEnglish
                    ? 'Try it now:'
                    : 'Попробуй проверить прямо сейчас:')}
            </span>
            <button
              onClick={() => {
                stopSpeaking();
                setHasTriedPanic(true);
                triggerPanic('calculator');
              }}
              className="text-xs bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 font-semibold px-3 py-1.5 rounded-lg shadow-2xs hover:shadow-xs transition flex items-center gap-1"
            >
              <span>{isPolish ? 'Test kamuflażu' : isUkrainian ? 'Тест камуфляжу' : isEnglish ? 'Test camouflage' : 'Тест камуфляжа'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className="pt-4 pb-2">
        <button
          onClick={() => {
            stopSpeaking();
            completeOnboarding(selectedAge);
          }}
          className="w-full bg-gradient-to-r from-mint-600 to-mint-500 hover:from-mint-700 hover:to-mint-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all transform active:scale-98 flex items-center justify-center gap-2 text-base"
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
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-center text-[11px] text-stone-400 mt-2">
          {isPolish
            ? 'Dane są zapisywane wyłącznie w pamięci Twojego urządzenia'
            : isUkrainian
            ? 'Дані зберігаються виключно в пам’яті твого пристрою'
            : isEnglish
            ? 'All data stays exclusively in your device storage'
            : 'Данные хранятся только в памяти твоего устройства'}
        </p>
      </div>
    </div>
  );
};
