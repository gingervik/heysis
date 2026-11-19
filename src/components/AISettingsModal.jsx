import React, { useState } from 'react';
import {
  getStoredAIConfig,
  saveStoredAIConfig
} from '../services/aiChatService';
import {
  X,
  Sparkles,
  Key,
  ShieldCheck,
  Check,
  Cpu,
  Globe,
  ExternalLink,
  Wifi,
  WifiOff
} from 'lucide-react';

export const AISettingsModal = ({ isOpen, onClose, onConfigSaved }) => {
  const [config, setConfig] = useState(() => getStoredAIConfig());
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [newGeminiKey, setNewGeminiKey] = useState('');
  const [newOpenAIKey, setNewOpenAIKey] = useState('');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    const updated = { ...config };
    if (newGeminiKey.trim()) updated.geminiKey = newGeminiKey.trim();
    if (newOpenAIKey.trim()) updated.openaiKey = newOpenAIKey.trim();
    saveStoredAIConfig(updated);
    setConfig(updated);
    setNewGeminiKey('');
    setNewOpenAIKey('');
    setSavedSuccess(true);
    if (onConfigSaved) onConfigSaved(updated);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const handleClearKey = (keyType) => {
    const updated = { ...config, [keyType]: '' };
    saveStoredAIConfig(updated);
    setConfig(updated);
    if (onConfigSaved) onConfigSaved(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-2xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div
        className="bg-white rounded-t-3xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slide-up border border-stone-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-settings-title"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-100 flex items-center justify-between bg-mint-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-mint-200 text-mint-800 flex items-center justify-center shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 id="ai-settings-title" className="font-bold text-stone-800 text-base">
                Модель ИИ-Сестренки
              </h3>
              <p className="text-xs text-stone-500">
                Живой диалог и офлайн-база
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Explanation of Hybrid Mode */}
          <div className="bg-lavender-50/70 border border-lavender-200/80 rounded-2xl p-3.5 space-y-1.5 text-lavender-900 leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-xs text-lavender-800">
              <ShieldCheck className="w-4 h-4 text-lavender-600" />
              <span>Гибридный режим диалога</span>
            </div>
            <p className="text-[11px] text-lavender-700">
              При наличии ключа сестренка ведет <b>настоящий живой диалог</b> с сохранением контекста и строгим промптом безопасности UNICEF. Если интернета нет — приложение <b>автоматически переходит в офлайн-базу</b> без ошибок!
            </p>
          </div>

          {/* Provider Selection */}
          <div className="space-y-2">
            <label className="font-bold text-stone-700 uppercase tracking-wider text-[11px]">
              Движок чата
            </label>
            <div className="space-y-2">
              <label
                className={`p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                  config.provider === 'gemini'
                    ? 'border-mint-400 bg-mint-50/70 text-mint-900 font-bold'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="provider"
                    value="gemini"
                    checked={config.provider === 'gemini'}
                    onChange={() => setConfig({ ...config, provider: 'gemini' })}
                    className="accent-mint-600"
                  />
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>✨ Google Gemini API</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-md font-semibold">
                        Бесплатно
                      </span>
                    </div>
                    <div className="text-[10px] text-stone-500 font-normal">
                      Быстрая модель gemini-1.5-flash с памятью контекста
                    </div>
                  </div>
                </div>
              </label>

              <label
                className={`p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                  config.provider === 'openai'
                    ? 'border-mint-400 bg-mint-50/70 text-mint-900 font-bold'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="provider"
                    value="openai"
                    checked={config.provider === 'openai'}
                    onChange={() => setConfig({ ...config, provider: 'openai' })}
                    className="accent-mint-600"
                  />
                  <div>
                    <div className="text-xs font-bold">🤖 OpenAI / Свой эндпоинт</div>
                    <div className="text-[10px] text-stone-500 font-normal">
                      gpt-4o-mini или совместимый сервер
                    </div>
                  </div>
                </div>
              </label>

              <label
                className={`p-3 rounded-2xl border transition flex items-center justify-between cursor-pointer ${
                  config.provider === 'local'
                    ? 'border-mint-400 bg-mint-50/70 text-mint-900 font-bold'
                    : 'border-stone-200 hover:border-stone-300 text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="provider"
                    value="local"
                    checked={config.provider === 'local'}
                    onChange={() => setConfig({ ...config, provider: 'local' })}
                    className="accent-mint-600"
                  />
                  <div>
                    <div className="text-xs font-bold">🍃 Только локальная офлайн-база</div>
                    <div className="text-[10px] text-stone-500 font-normal">
                      Работает полностью без API-ключей и без интернета
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Gemini Key Input */}
          {config.provider === 'gemini' && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="font-bold text-stone-700 text-[11px] flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-mint-600" />
                  <span>Google Gemini API Key</span>
                </label>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-mint-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Получить ключ</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {config.geminiKey ? (
                <div className="p-2.5 rounded-xl bg-mint-50/80 border border-mint-200/90 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-mint-600 shrink-0" />
                    <div>
                      <div className="text-[11px] font-bold text-mint-900">Ключ сохранен и скрыт 🔒</div>
                      <div className="text-[10px] text-mint-700 font-mono">••••••••••••••••••••••••</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleClearKey('geminiKey')}
                    className="text-[10px] text-red-600 hover:text-red-800 font-semibold underline px-2 py-1"
                  >
                    Удалить
                  </button>
                </div>
              ) : null}

              <div className="relative">
                <input
                  type="password"
                  value={newGeminiKey}
                  onChange={(e) => setNewGeminiKey(e.target.value)}
                  placeholder={config.geminiKey ? "Вставьте новый ключ для замены..." : "AIzaSy..."}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-mint-400"
                />
              </div>
              <p className="text-[10px] text-stone-400">
                Ключ сохраняется исключительно в вашем личном браузере и никогда не показывается другим пользователям.
              </p>
            </div>
          )}

          {/* OpenAI Key Input */}
          {config.provider === 'openai' && (
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="font-bold text-stone-700 text-[11px] flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-stone-600" />
                  <span>OpenAI API Key</span>
                </label>
                <a
                  href="https://platform.openai.com/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-stone-600 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Получить ключ</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {config.openaiKey ? (
                <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200/90 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-[11px] font-bold text-emerald-900">Ключ сохранен и скрыт 🔒</div>
                      <div className="text-[10px] text-emerald-700 font-mono">sk-••••••••••••••••••••••••</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleClearKey('openaiKey')}
                    className="text-[10px] text-red-600 hover:text-red-800 font-semibold underline px-2 py-1"
                  >
                    Удалить
                  </button>
                </div>
              ) : null}

              <div className="relative">
                <input
                  type="password"
                  value={newOpenAIKey}
                  onChange={(e) => setNewOpenAIKey(e.target.value)}
                  placeholder={config.openaiKey ? "Вставьте новый ключ sk-... для замены" : "sk-..."}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-mint-400"
                />
              </div>
              <p className="text-[10px] text-stone-400">
                Ключ защищен: он хранится только в памяти этого браузера и защищен от просмотра.
              </p>
            </div>
          )}

          {/* Footer Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Сохранено!</span>
                </>
              ) : (
                <span>Применить настройки</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
