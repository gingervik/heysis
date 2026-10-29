import React from 'react';
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
  Sparkles
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
    isMobileDevice
  } = useVoice();

  if (!isSettingsOpen) return null;

  // Filter voices that match currently selected language
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

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-2xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up border border-stone-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="voice-settings-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-lavender-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-lavender-200 text-lavender-800 flex items-center justify-center shadow-2xs">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 id="voice-settings-title" className="font-bold text-stone-800 text-base">
                Настройки голоса и языка
              </h3>
              <p className="text-xs text-stone-500">
                Подбери комфортную сестренку
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
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

          {/* 2. Voice Selection (Device Voices) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5 uppercase tracking-wider">
              <Volume2 className="w-3.5 h-3.5 text-mint-600" />
              Голос ({matchingVoices.length > 0 ? `${matchingVoices.length} доступно` : 'системный'})
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

          {/* 3. Speech Rate (Speed) */}
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
                onClick={() => setSpeechRate(0.82)}
                className={`py-2 rounded-xl text-xs font-semibold border transition ${
                  speechRate <= 0.85
                    ? 'bg-mint-100 border-mint-400 text-mint-900 font-bold'
                    : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                }`}
              >
                👶 Спокойнее
              </button>
              <button
                type="button"
                onClick={() => setSpeechRate(0.92)}
                className={`py-2 rounded-xl text-xs font-semibold border transition ${
                  speechRate > 0.85 && speechRate < 1.05
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

          {/* 4. Speech Pitch (Tone) */}
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

          {/* 5. Live Audio Test Preview Button */}
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
                  <span>Послушать пример ({currentLangObj.label})</span>
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
              setIsSettingsOpen(false);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs transition"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};
