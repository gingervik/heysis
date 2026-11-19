import React, { useState } from 'react';
import { useVoice, SUPPORTED_VOICE_LANGUAGES } from '../context/VoiceContext';
import {
  X,
  Volume2,
  Globe,
  Sliders,
  Play,
  Square,
  Check,
  Smartphone,
  Sparkles,
  Key,
  Eye,
  EyeOff,
  Zap,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

export const VoiceSettingsModal = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    voices,
    selectedVoiceURI,
    setSelectedVoiceURI,
    selectedLang,
    setSelectedLang,
    speechRate,
    setSpeechRate,
    speechPitch,
    setSpeechPitch,
    speak,
    stopSpeaking,
    isSpeaking,
    isMobileDevice,
    voiceConfig,
    updateVoiceConfig,
    NEURAL_VOICE_PRESETS
  } = useVoice();

  const [localOpenAIKey, setLocalOpenAIKey] = useState('');
  const [localElevenKey, setLocalElevenKey] = useState('');

  if (!isSettingsOpen) return null;

  // Filter voices that match currently selected language (for browser synthesis)
  const currentLangPrefix = (selectedLang || 'ru-RU').split('-')[0].toLowerCase();
  const matchingVoices = voices.filter((v) =>
    v.lang && (
      v.lang.toLowerCase().startsWith(currentLangPrefix) ||
      v.lang.toLowerCase().replace('_', '-').includes(currentLangPrefix)
    )
  );

  const currentLangObj =
    SUPPORTED_VOICE_LANGUAGES.find((l) => l.code === selectedLang) ||
    SUPPORTED_VOICE_LANGUAGES[0];

  const handleTestVoice = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(currentLangObj.sample, 'voice-settings-test');
    }
  };

  const handleEngineChange = (engine) => {
    stopSpeaking();
    updateVoiceConfig({ engine });
  };

  const handleProviderChange = (provider) => {
    stopSpeaking();
    updateVoiceConfig({ provider });
  };

  const handleSaveKeys = () => {
    const updates = {};
    if (localOpenAIKey.trim()) updates.openaiKey = localOpenAIKey.trim();
    if (localElevenKey.trim()) updates.elevenKey = localElevenKey.trim();
    if (Object.keys(updates).length > 0) {
      updateVoiceConfig(updates);
    }
  };

  const isNeuralActive = voiceConfig?.engine === 'neural';
  const currentProvider = voiceConfig?.provider || 'openai';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-2xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-slide-up border border-stone-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="voice-settings-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-gradient-to-r from-lavender-50/70 to-peach-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-lavender-200 text-lavender-800 flex items-center justify-center shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 id="voice-settings-title" className="font-bold text-stone-800 text-base">
                Голос Сестренки и язык
              </h3>
              <p className="text-xs text-stone-500">
                Живая нейросеть или офлайн-синтез
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              handleSaveKeys();
              setIsSettingsOpen(false);
            }}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm">
          {/* Mobile Silent Switch Tip */}
          {isMobileDevice && (
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3 text-xs text-amber-900 flex items-start gap-2.5">
              <Smartphone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <span className="font-semibold">Совет для телефонов:</span> если звука нет, проверь громкость медиа и боковой переключатель звука (на iPhone не должно быть видно оранжевой полоски).
              </div>
            </div>
          )}

          {/* Engine Selector: Neural AI vs Local Browser */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-lavender-600" />
              Качество звучания (Движок)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* Neural AI Option */}
              <button
                type="button"
                onClick={() => handleEngineChange('neural')}
                className={`p-3.5 rounded-2xl text-left border transition relative flex flex-col justify-between ${
                  isNeuralActive
                    ? 'border-lavender-500 bg-lavender-50/70 shadow-xs ring-2 ring-lavender-200'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-800 text-xs sm:text-sm flex items-center gap-1.5">
                      ✨ Живая Нейросеть
                    </span>
                    {isNeuralActive && <Check className="w-4 h-4 text-lavender-600" />}
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    Человеческий голос с естественным дыханием, нежностью и интонацией сестры.
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-bold text-lavender-700 bg-lavender-100/80 px-2 py-0.5 rounded-md inline-block self-start">
                  OpenAI TTS / ElevenLabs
                </div>
              </button>

              {/* Local Browser Fallback Option */}
              <button
                type="button"
                onClick={() => handleEngineChange('browser')}
                className={`p-3.5 rounded-2xl text-left border transition relative flex flex-col justify-between ${
                  !isNeuralActive
                    ? 'border-stone-400 bg-stone-50 shadow-xs ring-2 ring-stone-200'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-800 text-xs sm:text-sm flex items-center gap-1.5">
                      🍃 Браузер (Офлайн)
                    </span>
                    {!isNeuralActive && <Check className="w-4 h-4 text-stone-600" />}
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    Встроенный системный синтезатор. Работает 100% без интернета и без ключей.
                  </p>
                </div>
                <div className="mt-2 text-[10px] font-bold text-stone-600 bg-stone-200/80 px-2 py-0.5 rounded-md inline-block self-start">
                  Без ключа • Офлайн
                </div>
              </button>
            </div>
          </div>

          {/* Neural AI Configuration Block */}
          {isNeuralActive && (
            <div className="bg-stone-50/80 border border-stone-200 rounded-2xl p-4 space-y-3.5 animate-slide-up">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Провайдер нейросети
                </span>
                <span className="text-[11px] text-stone-400">
                  Студийное качество
                </span>
              </div>

              {/* Provider Tabs */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleProviderChange('openai')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    currentProvider === 'openai'
                      ? 'bg-lavender-600 text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span>OpenAI TTS (tts-1)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleProviderChange('elevenlabs')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                    currentProvider === 'elevenlabs'
                      ? 'bg-lavender-600 text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span>ElevenLabs</span>
                </button>
              </div>

              {/* OpenAI API Key Input */}
              {currentProvider === 'openai' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                      <Key className="w-3.5 h-3.5 text-stone-400" />
                      OpenAI API Key:
                    </label>
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-lavender-700 hover:underline flex items-center gap-0.5"
                    >
                      <span>Получить ключ</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {localOpenAIKey ? (
                    <div className="p-2.5 rounded-xl bg-lavender-50/80 border border-lavender-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-lavender-600 shrink-0" />
                        <div>
                          <div className="text-[11px] font-bold text-lavender-900">Ключ сохранен и скрыт 🔒</div>
                          <div className="text-[10px] text-lavender-700 font-mono">sk-••••••••••••••••••••••••</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setLocalOpenAIKey('');
                          updateVoiceConfig({ openaiKey: '' });
                          try {
                            localStorage.removeItem('sisterhood_openai_tts_key_v1');
                            localStorage.removeItem('sisterhood_openai_api_key_v1');
                          } catch (e) {}
                        }}
                        className="text-[10px] text-red-600 hover:text-red-800 font-semibold underline px-2 py-1"
                      >
                        Удалить
                      </button>
                    </div>
                  ) : null}

                  <div className="relative">
                    <input
                      type="password"
                      value={localOpenAIKey}
                      onChange={(e) => {
                        setLocalOpenAIKey(e.target.value);
                        updateVoiceConfig({ openaiKey: e.target.value });
                      }}
                      placeholder={voiceConfig?.openaiKey ? "Ключ уже активен по умолчанию. Вставьте свой для замены..." : "sk-..."}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-lavender-400 font-mono"
                    />
                  </div>
                  <p className="text-[10px] text-stone-400">
                    Ключ используется только для генерации голоса на вашем устройстве.
                  </p>

                  {/* OpenAI Voice Selection */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-semibold text-stone-700">
                      Тембр голоса:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {NEURAL_VOICE_PRESETS.openai.map((v) => {
                        const isChosen = (voiceConfig?.openaiVoice || 'nova') === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => {
                              stopSpeaking();
                              updateVoiceConfig({ openaiVoice: v.id });
                            }}
                            className={`p-2 rounded-xl text-left border text-xs transition ${
                              isChosen
                                ? 'border-lavender-400 bg-lavender-50 font-bold text-lavender-900 shadow-2xs'
                                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{v.name}</span>
                              {isChosen && <Check className="w-3 h-3 text-lavender-600" />}
                            </div>
                            <div className="text-[10px] text-stone-500 font-normal leading-tight mt-0.5">
                              {v.description}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ElevenLabs API Key Input */}
              {currentProvider === 'elevenlabs' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                      <Key className="w-3.5 h-3.5 text-stone-400" />
                      ElevenLabs API Key:
                    </label>
                    <a
                      href="https://elevenlabs.io"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-lavender-700 hover:underline flex items-center gap-0.5"
                    >
                      <span>elevenlabs.io</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {localElevenKey ? (
                    <div className="p-2.5 rounded-xl bg-lavender-50/80 border border-lavender-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-lavender-600 shrink-0" />
                        <div>
                          <div className="text-[11px] font-bold text-lavender-900">Ключ сохранен и скрыт 🔒</div>
                          <div className="text-[10px] text-lavender-700 font-mono">••••••••••••••••••••••••</div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setLocalElevenKey('');
                          updateVoiceConfig({ elevenKey: '' });
                          try {
                            localStorage.removeItem('sisterhood_eleven_key_v1');
                          } catch (e) {}
                        }}
                        className="text-[10px] text-red-600 hover:text-red-800 font-semibold underline px-2 py-1"
                      >
                        Удалить
                      </button>
                    </div>
                  ) : null}

                  <div className="relative">
                    <input
                      type="password"
                      value={localElevenKey}
                      onChange={(e) => {
                        setLocalElevenKey(e.target.value);
                        updateVoiceConfig({ elevenKey: e.target.value });
                      }}
                      placeholder={localElevenKey ? "Вставьте новый ключ для замены..." : "xi-..."}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-lavender-400 font-mono"
                    />
                  </div>

                  {/* ElevenLabs Voice Selection */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-semibold text-stone-700">
                      Голосовая модель:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {NEURAL_VOICE_PRESETS.elevenlabs.map((v) => {
                        const isChosen = (voiceConfig?.elevenVoiceId || '21m00Tcm4TlvDq8ikWAM') === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => {
                              stopSpeaking();
                              updateVoiceConfig({ elevenVoiceId: v.id });
                            }}
                            className={`p-2 rounded-xl text-left border text-xs transition ${
                              isChosen
                                ? 'border-lavender-400 bg-lavender-50 font-bold text-lavender-900 shadow-2xs'
                                : 'border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{v.name}</span>
                              {isChosen && <Check className="w-3 h-3 text-lavender-600" />}
                            </div>
                            <div className="text-[10px] text-stone-500 font-normal leading-tight mt-0.5">
                              {v.description}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200/80 rounded-xl p-2.5 flex items-start gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Конфиденциальность:</strong> Ключ хранится исключительно локально в браузере. Если ключа нет или пропал интернет, приложение моментально переходит на офлайн-озвучку.
                </span>
              </div>
            </div>
          )}

          {/* 1. Language Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-lavender-600" />
              Язык озвучки и ввода
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SUPPORTED_VOICE_LANGUAGES.map((lang) => {
                const isSelected = selectedLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      stopSpeaking();
                      setSelectedLang(lang.code);
                    }}
                    className={`p-2.5 rounded-2xl text-left border transition flex items-center justify-between ${
                      isSelected
                        ? 'border-lavender-400 bg-lavender-50/80 text-lavender-900 font-bold shadow-2xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{lang.flag}</span>
                      <span className="text-xs">{lang.label}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-lavender-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Browser Voices (Only shown when browser engine is selected) */}
          {!isNeuralActive && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5 uppercase tracking-wider">
                <Volume2 className="w-3.5 h-3.5 text-mint-600" />
                Системный голос ({matchingVoices.length > 0 ? `${matchingVoices.length} доступно` : 'системный'})
              </label>
              <select
                value={selectedVoiceURI}
                onChange={(e) => {
                  stopSpeaking();
                  setSelectedVoiceURI(e.target.value);
                }}
                className="w-full px-3 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/50 text-stone-800 text-xs focus:outline-none focus:ring-2 focus:ring-lavender-400 focus:bg-white transition"
              >
                <option value="">✨ Автовыбор (рекомендуемый мягкий голос)</option>
                {matchingVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name} ({v.lang})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Speech Rate (Speed) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Скорость речи
              </label>
              <span className="text-xs font-semibold text-stone-500">
                {speechRate.toFixed(2)}x
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSpeechRate(0.85)}
                className={`py-2 rounded-xl text-xs font-semibold border transition ${
                  speechRate <= 0.88
                    ? 'bg-mint-100 border-mint-400 text-mint-900 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                👶 Спокойнее
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(0.95)}
                className={`py-2 rounded-xl text-xs font-semibold border transition ${
                  speechRate > 0.88 && speechRate < 1.05
                    ? 'bg-mint-100 border-mint-400 text-mint-900 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                🌸 Идеально
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(1.1)}
                className={`py-2 rounded-xl text-xs font-semibold border transition ${
                  speechRate >= 1.05
                    ? 'bg-mint-100 border-mint-400 text-mint-900 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                ⚡ Быстрее
              </button>
            </div>
          </div>

          {/* Speech Pitch (Tone) - Only for browser synthesis */}
          {!isNeuralActive && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Тон голоса
                </label>
                <span className="text-xs font-semibold text-stone-500">
                  {speechPitch > 1.05 ? 'Повыше' : speechPitch < 1.0 ? 'Поглубже' : 'Мягкий'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSpeechPitch(0.95)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition ${
                    speechPitch < 1.0
                      ? 'bg-peach-100 border-peach-400 text-peach-900 font-bold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Поглубже
                </button>
                <button
                  type="button"
                  onClick={() => setSpeechPitch(1.05)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition ${
                    speechPitch >= 1.0 && speechPitch <= 1.1
                      ? 'bg-peach-100 border-peach-400 text-peach-900 font-bold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Мягкий
                </button>
                <button
                  type="button"
                  onClick={() => setSpeechPitch(1.2)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition ${
                    speechPitch > 1.1
                      ? 'bg-peach-100 border-peach-400 text-peach-900 font-bold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  Повыше
                </button>
              </div>
            </div>
          )}

          {/* Live Audio Test Preview Button */}
          <div className="pt-2">
            <button
              onClick={handleTestVoice}
              className={`w-full py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs transition shadow-sm ${
                isSpeaking
                  ? 'bg-stone-800 text-white hover:bg-black'
                  : 'bg-lavender-500 hover:bg-lavender-600 text-white'
              }`}
            >
              {isSpeaking ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>Остановить проверку</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>
                    Послушать пример ({isNeuralActive ? `Нейросеть ${currentProvider === 'openai' ? 'OpenAI' : 'ElevenLabs'}` : 'Браузер'})
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/70 flex justify-end">
          <button
            onClick={() => {
              stopSpeaking();
              handleSaveKeys();
              setIsSettingsOpen(false);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs transition"
          >
            Сохранить и закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
