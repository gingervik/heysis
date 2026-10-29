import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useVoice } from '../context/VoiceContext';
import { ICE_BREAKER_PROMPTS_BY_AGE } from '../data/mockData';
import {
  ArrowLeft,
  Send,
  Trash2,
  AlertTriangle,
  Sparkles,
  Heart,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio,
  Square
} from 'lucide-react';

export const ChatAssistant = () => {
  const {
    setScreen,
    chatMessages,
    sendChatMessage,
    clearChatHistory,
    initialChatPrompt,
    setInitialChatPrompt,
    ageGroup
  } = useApp();

  const {
    speak,
    stopSpeaking,
    isSpeaking,
    speakingId,
    voiceEnabled,
    setVoiceEnabled,
    isListening,
    interimTranscript,
    micError,
    startListening,
    stopListening,
    hasSpeechRecognition
  } = useVoice();

  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const messagesEndRef = useRef(null);
  // Default to 'welcome-msg' so mobile browsers don't try to autoplay before user gesture
  const lastSpokenMessageIdRef = useRef('welcome-msg');

  const iceBreakers = ICE_BREAKER_PROMPTS_BY_AGE[ageGroup] || ICE_BREAKER_PROMPTS_BY_AGE.default;

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

  // For 8-9 age group or when voice is enabled, auto-speak the latest AI response
  useEffect(() => {
    if (!voiceEnabled) return;
    const lastMsg = chatMessages[chatMessages.length - 1];
    if (lastMsg && lastMsg.sender === 'ai' && lastMsg.id !== lastSpokenMessageIdRef.current) {
      lastSpokenMessageIdRef.current = lastMsg.id;
      // Auto-read response for 8-9 years old or if voiceEnabled
      speak(lastMsg.text, lastMsg.id);
    }
  }, [chatMessages, voiceEnabled, speak]);

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isSending) return;

    setInputText('');
    setIsSending(true);
    await sendChatMessage(text);
    setIsSending(false);
  };

  const handleVoiceInputClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(
        (finalTranscript) => {
          if (finalTranscript) {
            setInputText(finalTranscript);
            // In 8-9 age mode or general mode, send right away so child doesn't need to press send
            handleSend(finalTranscript);
          }
        },
        (err) => {
          console.warn('Voice recognition notice:', err);
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

  const speakPrompt = (promptText, promptId, e) => {
    e.stopPropagation();
    speak(promptText, promptId);
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto bg-stone-100 select-none">
      {/* Top Header */}
      <div className="bg-white px-4 py-3 border-b border-stone-200/80 flex items-center justify-between shadow-2xs shrink-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              stopSpeaking();
              stopListening();
              setScreen('dashboard');
            }}
            className="w-9 h-9 rounded-full hover:bg-stone-100 flex items-center justify-center text-stone-700 transition"
            title="Назад на главную"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Avatar and Sister Info */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-lavender-400 to-mint-400 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-extrabold text-stone-800 text-sm">
                  {ageGroup === '8-9' ? 'Старшая Сестренка' : 'Старшая Сестра'}
                </h2>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-lavender-100 text-lavender-700 rounded-full">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                {ageGroup === '8-9' ? 'Голосовые ответы • 100% приватно' : '100% анонимно • Без осуждения'}
              </p>
            </div>
          </div>
        </div>

        {/* Top Controls: Voice Toggle & Clear Chat */}
        <div className="flex items-center gap-1.5">
          {/* Voice toggle button */}
          <button
            onClick={() => {
              const next = !voiceEnabled;
              setVoiceEnabled(next);
              if (!next) stopSpeaking();
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition ${
              voiceEnabled
                ? 'bg-lavender-100 text-lavender-800 hover:bg-lavender-200'
                : 'bg-stone-100 text-stone-400 hover:text-stone-600'
            }`}
            title={voiceEnabled ? 'Озвучка включена' : 'Озвучка выключена'}
          >
            {voiceEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-lavender-600" />
                <span className="text-[11px] hidden sm:inline">Голос вкл</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Голос выкл</span>
              </>
            )}
          </button>

          {/* Clear chat button */}
          <button
            onClick={() => setShowClearConfirm(true)}
            className="text-stone-400 hover:text-red-500 p-2 rounded-full hover:bg-stone-50 transition"
            title="Стереть историю чата"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* UNICEF & Safety Sticky Disclaimer */}
      <div className="bg-amber-50/90 border-b border-amber-200/80 px-4 py-2.5 text-xs text-amber-900 flex items-start gap-2.5 shrink-0">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        {ageGroup === '8-9' ? (
          <div className="leading-snug text-[11px] sm:text-xs">
            <span className="font-bold">Безопасность: </span>
            Я — виртуальная добрая сестренка, а не врач. Если у тебя что-то болит, тебе страшно или тебя кто-то обижает — обязательно расскажи маме, папе или учительнице!
          </div>
        ) : (
          <div className="leading-snug text-[11px] sm:text-xs">
            <span className="font-bold">Безопасность (UNICEF): </span>
            Я — ИИ-помощница, а не настоящий врач. Если тебе очень больно или страшно, обратись к школьной медсестре, родителям или врачу.
          </div>
        )}
      </div>

      {/* Clear confirmation modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full shadow-xl space-y-3 animate-slide-up">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-bold text-stone-800 text-base">Очистить историю?</h4>
              <p className="text-xs text-stone-500">
                Все сообщения этого чата удалятся безвозвратно.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="py-2 px-3 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  stopSpeaking();
                  stopListening();
                  clearChatHistory();
                  setShowClearConfirm(false);
                }}
                className="py-2 px-3 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold shadow-xs"
              >
                Да, стереть всё
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {chatMessages.map((msg) => {
          const isAI = msg.sender === 'ai';
          const isMsgSpeaking = isSpeaking && speakingId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isAI ? 'justify-start' : 'justify-end'}`}
            >
              {isAI && (
                <div className="w-7 h-7 rounded-full bg-lavender-200 text-lavender-700 flex items-center justify-center shrink-0 mb-1">
                  <Heart className="w-3.5 h-3.5 fill-lavender-400" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-xs space-y-1.5 relative group ${
                  isAI
                    ? isMsgSpeaking
                      ? 'bg-lavender-50/90 text-stone-800 rounded-bl-xs border-2 border-lavender-400 shadow-sm'
                      : 'bg-white text-stone-800 rounded-bl-xs border border-stone-200/60'
                    : 'bg-lavender-600 text-white rounded-br-xs'
                }`}
              >
                <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-medium">
                  {msg.text}
                </div>

                <div className="flex items-center justify-between gap-2 pt-0.5">
                  {isAI ? (
                    <button
                      onClick={() => toggleMessageVoice(msg)}
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold transition ${
                        isMsgSpeaking
                          ? 'bg-lavender-500 text-white animate-pulse'
                          : 'bg-stone-100 hover:bg-lavender-100 text-stone-600 hover:text-lavender-800'
                      }`}
                      title={isMsgSpeaking ? 'Остановить чтение' : 'Прослушать сообщение голосом'}
                    >
                      {isMsgSpeaking ? (
                        <>
                          <Square className="w-2.5 h-2.5 fill-white" />
                          <span>Читаю...</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3 text-lavender-600" />
                          <span>Послушать</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div></div>
                  )}

                  <div
                    className={`text-[10px] ${
                      isAI ? 'text-stone-400' : 'text-lavender-200'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* AI Typing indicator */}
        {isSending && (
          <div className="flex items-center gap-2 justify-start animate-slide-up">
            <div className="w-7 h-7 rounded-full bg-lavender-200 text-lavender-700 flex items-center justify-center shrink-0">
              <Heart className="w-3.5 h-3.5 fill-lavender-400" />
            </div>
            <div className="bg-white border border-stone-200/60 rounded-2xl rounded-bl-xs px-4 py-3 shadow-xs flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-lavender-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-lavender-500 animate-bounce [animation-delay:0.15s]"></span>
              <span className="w-2 h-2 rounded-full bg-lavender-600 animate-bounce [animation-delay:0.3s]"></span>
            </div>
          </div>
        )}

        {/* Active Speech Recognition Visual Banner */}
        {isListening && (
          <div className="bg-gradient-to-r from-peach-100 via-lavender-100 to-mint-100 border-2 border-lavender-400 rounded-2xl p-3.5 shadow-md animate-pulse flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-lavender-600 text-white flex items-center justify-center shrink-0 animate-bounce">
              <Mic className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-extrabold text-stone-800 text-xs sm:text-sm flex items-center gap-1.5">
                <span>Я слушаю тебя, говори...</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              </div>
              <p className="text-xs text-stone-600 truncate italic mt-0.5">
                {interimTranscript || 'Скажи свой вопрос вслух...'}
              </p>
            </div>
            <button
              onClick={stopListening}
              className="px-2.5 py-1 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold text-stone-700"
            >
              Стоп
            </button>
          </div>
        )}

        {/* Mic error banner if any */}
        {micError && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-2.5 rounded-xl flex items-center justify-between">
            <span>{micError}</span>
            <button
              onClick={() => stopListening()}
              className="font-bold underline text-[11px]"
            >
              Понятно
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Ice-breakers pills with voice readout */}
      <div className="bg-white/95 px-3 pt-2.5 pb-1 border-t border-stone-200/60 shrink-0">
        <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 px-1 flex items-center justify-between">
          <span>Подсказки для вопроса:</span>
          {ageGroup === '8-9' && (
            <span className="text-[10px] text-lavender-600 font-semibold">Нажми на 🔊 чтобы послушать</span>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
          {iceBreakers.map((prompt, i) => {
            const promptId = `prompt-${i}`;
            const isPromptSpeaking = isSpeaking && speakingId === promptId;
            return (
              <div
                key={i}
                className="shrink-0 flex items-center bg-stone-100 hover:bg-lavender-50 border border-stone-200/80 hover:border-lavender-300 rounded-full pl-3 pr-1 py-1 transition shadow-2xs group"
              >
                <button
                  type="button"
                  onClick={() => handleSend(prompt.text)}
                  className="text-stone-700 hover:text-lavender-900 text-xs font-semibold mr-1.5 text-left"
                >
                  💬 {prompt.text}
                </button>
                <button
                  type="button"
                  onClick={(e) => speakPrompt(prompt.text, promptId, e)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition ${
                    isPromptSpeaking
                      ? 'bg-lavender-500 text-white animate-pulse'
                      : 'hover:bg-white text-stone-400 hover:text-lavender-600'
                  }`}
                  title="Прослушать подсказку"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Message Input Box with Voice Mic Button */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="bg-white px-3 py-2.5 border-t border-stone-200/70 flex items-center gap-2 shrink-0"
      >
        {/* Voice Dictation (Microphone) Button */}
        <button
          type="button"
          onClick={handleVoiceInputClick}
          className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-xs transition-all active:scale-95 shrink-0 ${
            isListening
              ? 'bg-red-500 hover:bg-red-600 text-white ring-4 ring-red-200 animate-pulse'
              : 'bg-lavender-100 hover:bg-lavender-200 text-lavender-800'
          }`}
          title={isListening ? 'Остановить запись голоса' : 'Сказать вопрос голосом 🎤'}
        >
          {isListening ? (
            <Radio className="w-5 h-5 animate-spin" />
          ) : (
            <Mic className="w-5 h-5" />
          )}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            ageGroup === '8-9'
              ? 'Нажми микрофон или напиши вопрос...'
              : 'Спроси о теле или самочувствии...'
          }
          className="flex-1 bg-stone-100 border border-stone-200 rounded-2xl px-4 py-2.5 text-sm sm:text-base text-stone-800 focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:bg-white transition"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isSending}
          className="w-11 h-11 rounded-2xl bg-lavender-600 hover:bg-lavender-700 disabled:opacity-40 text-white flex items-center justify-center shadow-xs transition active:scale-95 shrink-0"
          title="Отправить вопрос"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </form>
    </div>
  );
};
