import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useVoice } from '../context/VoiceContext';
import { HeySisLogo } from '../components/HeySisLogo';
import { getLocalizedIceBreakers } from '../data/mockDataLocalized';
import { LANG_META } from '../services/languageDetector';
import {
  ArrowLeft,
  Send,
  Trash2,
  AlertTriangle,
  Heart,
  Mic,
  Volume2,
  VolumeX,
  Radio,
  Square,
  Calculator,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const ChatAssistant = () => {
  const {
    setScreen,
    chatMessages,
    sendChatMessage,
    clearChatHistory,
    initialChatPrompt,
    setInitialChatPrompt,
    ageGroup,
    isAiTyping,
    appLanguage,
    setAppLanguage,
    triggerPanic,
    t
  } = useApp();

  const {
    speak,
    stopSpeaking,
    isSpeaking,
    speakingId,
    voiceEnabled,
    setSelectedLang,
    isListening,
    interimTranscript,
    micError,
    startListening,
    stopListening
  } = useVoice();

  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showSafetyDetail, setShowSafetyDetail] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-read voice toggle (default true for joyful friendly experience, persisted)
  const [autoReadChat, setAutoReadChat] = useState(() => {
    try {
      const stored = localStorage.getItem('sisterhood_auto_read_chat_v1');
      return stored !== null ? stored === 'true' : true;
    } catch {
      return true;
    }
  });

  const toggleAutoRead = () => {
    const nextVal = !autoReadChat;
    setAutoReadChat(nextVal);
    try {
      localStorage.setItem('sisterhood_auto_read_chat_v1', String(nextVal));
    } catch (e) {}
    if (!nextVal) {
      stopSpeaking();
    }
  };

  const lastSpokenMessageIdRef = useRef(
    chatMessages.length > 0 ? chatMessages[chatMessages.length - 1]?.id : null
  );
  const isInitialMountRef = useRef(true);

  // Cleanup on leaving chat
  useEffect(() => {
    isInitialMountRef.current = false;
    return () => {
      stopSpeaking();
      stopListening();
    };
  }, [stopSpeaking, stopListening]);

  const iceBreakers = getLocalizedIceBreakers(ageGroup, appLanguage);

  // Auto-fill prompt if navigated from story card
  useEffect(() => {
    if (initialChatPrompt) {
      setInputText(initialChatPrompt);
      setInitialChatPrompt('');
    }
  }, [initialChatPrompt, setInitialChatPrompt]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isSending, isListening, interimTranscript]);

  // Auto-speak ONLY when a NEW AI response arrives during active chat session AND autoReadChat is enabled
  useEffect(() => {
    if (isInitialMountRef.current) return;
    if (!voiceEnabled || !autoReadChat) return;

    const lastMsg = chatMessages[chatMessages.length - 1];
    if (lastMsg && lastMsg.sender === 'ai' && lastMsg.id !== lastSpokenMessageIdRef.current) {
      lastSpokenMessageIdRef.current = lastMsg.id;
      speak(lastMsg.text, lastMsg.id);
    }
  }, [chatMessages, voiceEnabled, autoReadChat, speak]);

  const isPolish = appLanguage === 'pl';
  const isUkrainian = appLanguage === 'uk';
  const isEnglish = appLanguage === 'en';

  const confirmClearChat = () => {
    stopSpeaking();
    stopListening();
    clearChatHistory();
    lastSpokenMessageIdRef.current = 'welcome-msg';
    setShowClearConfirm(false);
    setToastMessage(
      isPolish
        ? 'Czat został wyczyszczony 🌸'
        : isUkrainian
        ? 'Чат успішно очищено 🌸'
        : isEnglish
        ? 'Chat has been cleared 🌸'
        : 'Чат успешно очищен 🌸'
    );
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleSend = async (textToSend) => {
    const text = (textToSend !== undefined ? textToSend : inputText).trim();
    if (!text || isSending) return;

    // Natural command intercept to clear chat
    const lower = text.toLowerCase().trim();
    if (
      lower === '/clear' ||
      lower === 'очистить' ||
      lower === 'очистить чат' ||
      lower === 'очисти' ||
      lower === 'очисти чат' ||
      lower === 'очистити' ||
      lower === 'очистити чат' ||
      lower === 'зітри' ||
      lower === 'зітри чат' ||
      lower === 'видали' ||
      lower === 'видали чат' ||
      lower === 'wyczyść' ||
      lower === 'wyczysc' ||
      lower === 'wyczyść czat' ||
      lower === 'wyczysc czat' ||
      lower === 'clear' ||
      lower === 'clear chat'
    ) {
      setInputText('');
      setShowClearConfirm(true);
      return;
    }

    setInputText('');
    setIsSending(true);
    try {
      const res = await sendChatMessage(text);
      if (res?.switchedLanguage && LANG_META[res.switchedLanguage]) {
        setToastMessage(LANG_META[res.switchedLanguage].switchNotice);
        setTimeout(() => setToastMessage(''), 3500);
      }
    } finally {
      setIsSending(false);
    }
  };

  const handleVoiceInputClick = () => {
    if (isListening) {
      stopListening();
    } else {
      if (isSpeaking) {
        stopSpeaking();
      }
      startListening(
        (finalTranscript) => {
          if (finalTranscript && finalTranscript.trim()) {
            const transcript = finalTranscript.trim();
            setInputText(transcript);
            handleSend(transcript);
          }
        },
        (err) => {
          console.warn('Voice recognition note:', err);
        }
      );
    }
  };

  const toggleMessageVoice = (msg) => {
    if (isSpeaking && speakingId === msg.id) {
      stopSpeaking();
    } else {
      speak(msg.text, msg.id);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto bg-stone-50 select-none">
      {/* 1. Friendly Mobile Header (Spacious, Uncluttered) */}
      <header className="bg-white px-3 sm:px-4 py-2.5 border-b border-stone-200/70 flex items-center justify-between shadow-2xs shrink-0 z-10">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              stopSpeaking();
              stopListening();
              setScreen('dashboard');
            }}
            className="w-10 h-10 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-700 transition active:scale-95"
            title={isPolish ? 'Wstecz' : isUkrainian ? 'Назад' : isEnglish ? 'Back' : 'Назад'}
            aria-label={isPolish ? 'Wstecz' : isUkrainian ? 'Назад' : isEnglish ? 'Back' : 'Назад'}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* HeySis Avatar & Title */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <HeySisLogo className="w-10 h-10" rounded="rounded-xl" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div>
              <h2 className="font-extrabold text-stone-800 text-sm sm:text-base leading-tight tracking-tight">
                HeySis
              </h2>
              <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <span>{isPolish ? 'zawsze blisko 💚' : isUkrainian ? 'завжди поруч 💚' : isEnglish ? 'always here for you 💚' : 'всегда рядом 💚'}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Child-friendly Header Controls: Sound Toggle, Quick Camouflage & Clear */}
        <div className="flex items-center gap-1.5">
          {/* Sound Toggle (Big, obvious speaker) */}
          <button
            onClick={toggleAutoRead}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition active:scale-95 ${
              autoReadChat
                ? 'bg-lavender-100 text-lavender-800 border border-lavender-200'
                : 'bg-stone-100 text-stone-400 hover:text-stone-600'
            }`}
            title={
              autoReadChat
                ? (isPolish ? 'Głos: Włączony' : isUkrainian ? 'Голос: Увімкнено' : isEnglish ? 'Voice: On' : 'Озвучка: Включена')
                : (isPolish ? 'Głos: Wyłączony' : isUkrainian ? 'Голос: Вимкнено' : isEnglish ? 'Voice: Off' : 'Озвучка: Выключена')
            }
          >
            {autoReadChat ? (
              <Volume2 className="w-4 h-4 text-lavender-700" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
          </button>

          {/* Quick SOS / Camouflage Button */}
          <button
            onClick={() => triggerPanic('calculator')}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition active:scale-95"
            title={isPolish ? 'Szybkie ukrycie (Kalkulator)' : isUkrainian ? 'Швидке сховання (Калькулятор)' : isEnglish ? 'Quick disguise (Calculator)' : 'Быстро спрятать (Калькулятор)'}
          >
            <Calculator className="w-4 h-4 text-stone-600" />
          </button>

          {/* Clear Chat Button (Prominent pill with text label) */}
          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/90 text-xs font-semibold transition active:scale-95 shadow-2xs"
            title={t('clearChat')}
            aria-label={t('clearChat')}
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">
              {isPolish ? 'Wyczyść' : isUkrainian ? 'Очистити' : isEnglish ? 'Clear' : 'Очистить'}
            </span>
          </button>
        </div>
      </header>

      {/* Language Switcher Bar inside Chat */}
      <div className="bg-stone-100/90 border-b border-stone-200/70 px-3.5 py-1 flex items-center justify-between text-xs shrink-0">
        <span className="text-[11px] font-semibold text-stone-600">
          {isPolish ? 'Język:' : isUkrainian ? 'Мова:' : isEnglish ? 'Language:' : 'Язык:'}
        </span>
        <div className="flex items-center bg-white rounded-xl p-0.5 text-xs font-bold shadow-2xs border border-stone-200/60">
          {[
            { code: 'ru', label: 'RU', flag: '🌸' },
            { code: 'uk', label: 'UA', flag: '🌻' },
            { code: 'pl', label: 'PL', flag: '🇵🇱' },
            { code: 'en', label: 'EN', flag: '✨' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                stopSpeaking();
                setAppLanguage(lang.code);
                const voiceMap = { ru: 'ru-RU', uk: 'uk-UA', pl: 'pl-PL', en: 'en-US' };
                if (voiceMap[lang.code] && setSelectedLang) {
                  setSelectedLang(voiceMap[lang.code]);
                }
              }}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                appLanguage === lang.code ? 'bg-lavender-100 text-lavender-900 shadow-2xs' : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Soft, Gentle Safety Reassurance Banner */}
      <div className="bg-amber-50/70 border-b border-amber-200/50 px-3.5 py-1.5 text-amber-900 shrink-0">
        <div
          onClick={() => setShowSafetyDetail(!showSafetyDetail)}
          className="flex items-center justify-between cursor-pointer text-[11px] gap-2"
        >
          <div className="flex items-center gap-1.5 font-medium leading-tight">
            <span className="shrink-0">🛡️</span>
            <span>
              {isPolish
                ? 'Pamiętaj: w razie bólu lub strachu powiedz mamie lub tacie 💜'
                : isUkrainian
                ? 'Пам’ятай: якщо боляче або страшно — скажи мамі чи татові 💜'
                : isEnglish
                ? 'Remember: if you are in pain or scared, tell mom or dad 💜'
                : 'Помни: если тебе больно или страшно — скажи маме или папе 💜'}
            </span>
          </div>
          <span className="text-[10px] text-amber-700 underline shrink-0 whitespace-nowrap">
            {showSafetyDetail ? '▲' : (isPolish ? 'Pomoc' : isUkrainian ? 'Допомога' : isEnglish ? 'Help' : 'Помощь')}
          </span>
        </div>

        {showSafetyDetail && (
          <div className="mt-1.5 pt-1.5 border-t border-amber-200/60 text-[11px] space-y-1 text-amber-800 leading-relaxed">
            <p>
              {isPolish
                ? 'Jestem wirtualną siostrą, a nie lekarzem. W razie silnego bólu, zagrożenia lub złego traktowania — nie bój się porozmawiać z rodzicami lub zadzwonić pod bezpłatny Telefon Zaufania: 116 111.'
                : isUkrainian
                ? 'Я — твоя віртуальна добра сестричка, а не лікар. Якщо щось сильно болить або тебе хтось ображає — обов’язково розкажи батькам або зателефонуй на Національну дитячу гарячу лінію: 116 111 (безкоштовно) чи 0 800 500 225.'
                : isEnglish
                ? 'I am your virtual big sister, not a doctor. If you experience severe pain, harm, or bullying — please tell your parents or contact the Childhelp Helpline: 1-800-422-4453 (or 112/911).'
                : 'Я — твоя виртуальная добрая сестренка, а не доктор. Если что-то сильно болит или тебя кто-то обижает — обязательно расскажи родителям или позвони на детский телефон доверия: 8-800-2000-122 (бесплатно).'}
            </p>
          </div>
        )}
      </div>

      {/* 3. Chat Messages Stream (Large Readable Bubbles) */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-3.5">
        {/* Quick Clear Pill when there are messages */}
        {chatMessages.length > 1 && (
          <div className="flex justify-center pt-0.5 pb-2">
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100/90 hover:bg-rose-50 text-stone-500 hover:text-rose-600 border border-stone-200/60 hover:border-rose-200 text-[11px] font-medium transition active:scale-95"
            >
              <Trash2 className="w-3 h-3 text-stone-400" />
              <span>{isPolish ? 'Wyczyść historię rozmowy' : isUkrainian ? 'Очистити історію чату' : isEnglish ? 'Clear chat history' : 'Очистить историю чата'}</span>
            </button>
          </div>
        )}
        {chatMessages.map((msg) => {
          const isAI = msg.sender === 'ai';
          const isThisSpeaking = isSpeaking && speakingId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-lavender-200 to-rose-200 border border-lavender-200 flex items-center justify-center text-stone-700 shrink-0 mb-1 shadow-2xs">
                  <span className="text-sm">🌸</span>
                </div>
              )}

              <div
                className={`max-w-[86%] sm:max-w-[80%] rounded-3xl px-4 py-3 shadow-2xs ${
                  isAI
                    ? 'bg-white border border-stone-200/80 rounded-bl-sm text-stone-800'
                    : 'bg-gradient-to-r from-lavender-600 to-indigo-600 text-white rounded-br-sm'
                }`}
              >
                <p className="text-[15px] sm:text-base leading-relaxed whitespace-pre-line font-normal">
                  {msg.text}
                </p>

                {/* Bubble Footer: Simple Listen Button & Time */}
                <div className="flex items-center justify-between gap-3 mt-2.5 pt-1.5 border-t border-stone-100/70">
                  {isAI ? (
                    <button
                      onClick={() => toggleMessageVoice(msg)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full transition active:scale-95 ${
                        isThisSpeaking
                          ? 'bg-lavender-500 text-white shadow-xs animate-pulse'
                          : 'bg-lavender-50 text-lavender-700 hover:bg-lavender-100'
                      }`}
                    >
                      {isThisSpeaking ? (
                        <>
                          <Square className="w-3.5 h-3.5 fill-white" />
                          <span>{isPolish ? 'Zatrzymaj' : isUkrainian ? 'Зупинити' : isEnglish ? 'Stop' : 'Стоп'}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-lavender-600" />
                          <span>{isPolish ? 'Posłuchaj' : isUkrainian ? 'Послухати' : isEnglish ? 'Listen' : 'Послушать'}</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div></div>
                  )}

                  <span
                    className={`text-[10px] ${
                      isAI ? 'text-stone-400' : 'text-lavender-200'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {(isSending || isAiTyping) && (
          <div className="flex items-center gap-2 justify-start animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-lavender-100 border border-lavender-200 flex items-center justify-center shrink-0">
              <span className="text-sm">🌸</span>
            </div>
            <div className="bg-white border border-stone-200/80 rounded-3xl rounded-bl-sm px-4 py-2.5 shadow-2xs flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-lavender-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-lavender-500 animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-2 h-2 rounded-full bg-lavender-600 animate-bounce [animation-delay:0.3s]"></span>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                {isPolish ? 'Siostra pisze...' : isUkrainian ? 'Сестричка думає...' : isEnglish ? 'Sister is typing...' : 'Сестренка думает...'}
              </span>
            </div>
          </div>
        )}

        {/* Live Speech Recognition Floating Banner */}
        {isListening && (
          <div className="bg-gradient-to-r from-rose-50 via-lavender-50 to-mint-50 border-2 border-lavender-300 rounded-3xl p-3 shadow-md animate-pulse flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 animate-bounce shadow-xs">
              <Mic className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-stone-800 text-xs sm:text-sm flex items-center gap-1.5">
                <span>{isPolish ? 'Słucham Cię... Mów 🌸' : isUkrainian ? 'Слухаю тебе... Говори 🌸' : isEnglish ? 'Listening to you... Speak 🌸' : 'Слушаю тебя... Говори 🌸'}</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              </div>
              <p className="text-xs text-stone-600 italic mt-0.5 leading-snug">
                {interimTranscript || (isPolish ? 'Powiedz swoje pytanie na głos...' : isUkrainian ? 'Скажи своє запитання вголос...' : isEnglish ? 'Say your question out loud...' : 'Скажи свой вопрос вслух...')}
              </p>
            </div>
            <button
              onClick={stopListening}
              className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-full text-xs font-bold text-stone-700 shadow-2xs active:scale-95"
            >
              {isPolish ? 'Gotowe' : isUkrainian ? 'Готово' : isEnglish ? 'Done' : 'Готово'}
            </button>
          </div>
        )}

        {/* Mic Error Notice */}
        {micError && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-2.5 rounded-2xl flex items-center justify-between">
            <span>{micError}</span>
            <button
              onClick={() => stopListening()}
              className="font-bold underline text-[11px] px-2 py-0.5"
            >
              OK
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Quick Question Chips (Delightful, One-Tap Prompt Pills) */}
      <div className="bg-white/95 px-3 py-2 border-t border-stone-200/60 shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          {iceBreakers.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(prompt.text)}
              className="shrink-0 flex items-center gap-1.5 bg-lavender-50 hover:bg-lavender-100 active:bg-lavender-200 border border-lavender-200/80 rounded-full px-3.5 py-1.5 transition text-left active:scale-95 shadow-2xs"
            >
              <span className="text-stone-800 text-xs font-semibold whitespace-nowrap">
                {prompt.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Mobile-Optimized Input Bar (Thumb-Friendly, 16px Font) */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="bg-white px-3 py-2.5 border-t border-stone-200/70 flex items-center gap-2 shrink-0 pb-safe"
      >
        {/* Big Tactile Microphone Button */}
        <button
          type="button"
          onClick={handleVoiceInputClick}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xs transition-all active:scale-90 shrink-0 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white ring-4 ring-red-200 animate-pulse'
              : 'bg-gradient-to-tr from-lavender-100 to-rose-100 hover:from-lavender-200 hover:to-rose-200 text-lavender-800 border border-lavender-200'
          }`}
          title={isListening ? t('stopListening') : t('tapToSpeak')}
          aria-label={isListening ? t('stopListening') : t('tapToSpeak')}
        >
          {isListening ? (
            <Radio className="w-5 h-5 animate-spin" />
          ) : (
            <Mic className="w-5 h-5 text-lavender-700" />
          )}
        </button>

        {/* Text Input (16px font avoids iOS Safari viewport zoom) */}
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            ageGroup === '8-9'
              ? (isPolish ? 'Zadaj pytanie siostrze...' : isUkrainian ? 'Запитай про що завгодно 🌸...' : isEnglish ? 'Ask big sister anything 🌸...' : 'Спроси о чем угодно 🌸...')
              : (isPolish ? 'Napisz pytanie...' : isUkrainian ? 'Напиши своє запитання...' : isEnglish ? 'Type your question...' : 'Напиши свой вопрос...')
          }
          className="flex-1 bg-stone-100 border border-stone-200 rounded-full px-4 py-3 text-[16px] text-stone-800 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:bg-white transition placeholder:text-stone-400"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!inputText.trim() || isSending}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-lavender-600 to-indigo-600 hover:from-lavender-700 hover:to-indigo-700 disabled:opacity-35 text-white flex items-center justify-center shadow-xs transition active:scale-95 shrink-0"
          title={isPolish ? 'Wyślij' : isUkrainian ? 'Надіслати' : isEnglish ? 'Send' : 'Отправить'}
          aria-label={isPolish ? 'Wyślij' : isUkrainian ? 'Надіслати' : isEnglish ? 'Send' : 'Отправить'}
        >
          <Send className="w-5 h-5 ml-0.5" />
        </button>
      </form>

      {/* Clear Chat Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-scale-up">
            <h3 className="font-extrabold text-lg text-stone-800">
              {t('clearConfirmTitle')}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('clearConfirmText')}
            </p>
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2.5 rounded-full text-stone-600 hover:bg-stone-100 text-sm font-semibold transition active:scale-95"
              >
                {t('cancel')}
              </button>
              <button
                onClick={confirmClearChat}
                className="px-5 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition shadow-xs active:scale-95"
              >
                {t('delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 backdrop-blur-xs text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-fade-in pointer-events-none">
          <span>🌸</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};