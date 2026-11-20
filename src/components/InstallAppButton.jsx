import React, { useState, useEffect } from 'react';
import { Smartphone, X, Share2, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const COPY = {
  ru: {
    btn: 'Установить',
    bannerTitle: 'Установить на телефон',
    bannerSub: 'Как обычный блокнот «My Notes» 📘 • работает офлайн',
    iosTitle: 'Установить на iPhone',
    iosSubtitle: 'Установится незаметно под иконкой блокнота «My Notes» 📘 и будет работать офлайн',
    step1Title: 'Нажми «Поделиться» внизу Safari',
    step1Desc: 'Иконка квадрата со стрелочкой вверх в нижней панели браузера',
    step1ChromeTitle: 'Нажми «Поделиться» вверху справа в Chrome',
    step1ChromeDesc: 'Иконка квадрата со стрелочкой вверх в адресной строке справа',
    step2Title: 'Выбери «На экран „Домой“»',
    step2Desc: 'Пролистай меню чуть ниже и нажми «На экран „Домой“» (Add to Home Screen)',
    step3Title: 'Нажми «Добавить»',
    step3Desc: 'Приложение появится на рабочем столе как обычный блокнот',
    done: 'Понятно!',
    safariHint: 'Кнопка «Поделиться» внизу экрана ↓',
    chromeHint: 'Кнопка «Поделиться» вверху справа в адресной строке ↗',
    installed: 'Установлено!'
  },
  uk: {
    btn: 'Встановити',
    bannerTitle: 'Встановити на телефон',
    bannerSub: 'Як звичайний блокнот «My Notes» 📘 • працює офлайн',
    iosTitle: 'Встановити на iPhone',
    iosSubtitle: 'Встановиться непомітно під іконкою блокнота «My Notes» 📘 і працюватиме офлайн',
    step1Title: 'Натисни «Поділитися» внизу Safari',
    step1Desc: 'Іконка квадрата зі стрілочкою вгору в нижній панелі браузера',
    step1ChromeTitle: 'Натисни «Поділитися» вгорі праворуч у Chrome',
    step1ChromeDesc: 'Іконка квадрата зі стрілочкою вгору в адресному рядку праворуч',
    step2Title: 'Обери «На екран „Додому“»',
    step2Desc: 'Прогорни меню трохи нижче та натисни «На екран „Додому“»',
    step3Title: 'Натисни «Додати»',
    step3Desc: 'Застосунок з’явиться на робочому столі як звичайний блокнот',
    done: 'Зрозуміло!',
    safariHint: 'Кнопка «Поділитися» внизу екрана ↓',
    chromeHint: 'Кнопка «Поділитися» вгорі праворуч в адресному рядку ↗',
    installed: 'Встановлено!'
  },
  pl: {
    btn: 'Zainstaluj',
    bannerTitle: 'Zainstaluj na telefonie',
    bannerSub: 'Jako zwykły notatnik «My Notes» 📘 • działa offline',
    iosTitle: 'Zainstaluj na iPhone',
    iosSubtitle: 'Zainstaluje się dyskretnie jako notatnik «My Notes» 📘 i działa offline',
    step1Title: 'Kliknij «Udostępnij» na dole Safari',
    step1Desc: 'Ikona kwadratu ze strzałką w górę na dolnym pasku przeglądarki',
    step1ChromeTitle: 'Kliknij «Udostępnij» u góry po prawej w Chrome',
    step1ChromeDesc: 'Ikona kwadratu ze strzałką w górę w pasku adresu po prawej',
    step2Title: 'Wybierz «Do ekranu początkowego»',
    step2Desc: 'Przewiń menu nieco w dół i kliknij «Do ekranu początkowego»',
    step3Title: 'Kliknij «Dodaj»',
    step3Desc: 'Aplikacja pojawi się na ekranie głównym jak zwykły notatnik',
    done: 'Rozumiem!',
    safariHint: 'Przycisk «Udostępnij» na dole ekranu ↓',
    chromeHint: 'Przycisk «Udostępnij» u góry po prawej w pasku adresu ↗',
    installed: 'Zainstalowano!'
  },
  en: {
    btn: 'Install',
    bannerTitle: 'Install as an App',
    bannerSub: 'Discreet "My Notes" icon 📘 • works offline',
    iosTitle: 'Install on iPhone',
    iosSubtitle: 'Installs discreetly as "My Notes" 📘 on your Home Screen and works offline',
    step1Title: 'Tap "Share" in Safari toolbar',
    step1Desc: 'Look for the square icon with an upward arrow at the bottom of Safari',
    step1ChromeTitle: 'Tap "Share" at top-right of Chrome',
    step1ChromeDesc: 'Look for the square icon with an upward arrow in the address bar',
    step2Title: 'Tap "Add to Home Screen"',
    step2Desc: 'Scroll down the share sheet and select "Add to Home Screen"',
    step3Title: 'Tap "Add"',
    step3Desc: 'It will appear on your Home Screen looking like a normal notebook app',
    done: 'Got it!',
    safariHint: 'Share button is right below ↓',
    chromeHint: 'Share button is at the top-right address bar ↗',
    installed: 'Installed!'
  }
};

export const InstallAppButton = ({ variant = 'pill' }) => {
  const { appLanguage } = useApp();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isIOSChrome, setIsIOSChrome] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [justInstalled, setJustInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('heysis_install_banner_dismissed') === '1';
    } catch {
      return false;
    }
  });

  const text = COPY[appLanguage] || COPY.en;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    setIsStandalone(standalone);

    const ua = window.navigator.userAgent || '';
    const iosDevice = /iPhone|iPad|iPod/i.test(ua) && !window.MSStream;
    setIsIOS(iosDevice);
    setIsIOSChrome(iosDevice && /CriOS/i.test(ua));

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
      setJustInstalled(true);
      setTimeout(() => setJustInstalled(false), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (isStandalone && !justInstalled) return null;
  if (!deferredPrompt && !isIOS && !justInstalled) return null;
  if (variant === 'banner' && dismissed && !justInstalled) return null;

  const handleDismiss = (e) => {
    e.stopPropagation();
    setDismissed(true);
    try {
      sessionStorage.setItem('heysis_install_banner_dismissed', '1');
    } catch {}
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      try {
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
        }
      } catch {}
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  return (
    <>
      {variant === 'banner' ? (
        <div
          onClick={handleInstallClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleInstallClick()}
          className="w-full bg-gradient-to-r from-mint-50 via-white to-lavender-50 border border-mint-300/80 rounded-2xl px-3.5 py-2.5 shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-between gap-2.5 shrink-0 active:scale-99"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-mint-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              {justInstalled ? <CheckCircle2 className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-extrabold text-stone-900 leading-tight truncate">
                {justInstalled ? text.installed : text.bannerTitle}
              </div>
              <div className="text-[11px] text-stone-500 leading-tight truncate mt-0.5">
                {text.bannerSub}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-mint-600 hover:bg-mint-700 text-white font-extrabold text-xs shadow-2xs transition">
              {justInstalled ? '✓' : text.btn}
            </span>
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleInstallClick}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-mint-50 hover:bg-mint-100 border border-mint-300/90 text-mint-800 font-bold text-xs shadow-2xs transition active:scale-95 shrink-0"
          title={text.btn}
          aria-label={text.btn}
        >
          {justInstalled ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-mint-600" />
              <span className="text-[11px]">{text.installed}</span>
            </>
          ) : (
            <>
              <Smartphone className="w-3.5 h-3.5 text-mint-600" />
              <span className="text-[11px]">{text.btn}</span>
            </>
          )}
        </button>
      )}

      {/* iOS Safari Step-by-Step Install Sheet */}
      {showIOSModal && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-3 animate-fade-in"
          onClick={() => setShowIOSModal(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4 relative animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 pr-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold">
                <span>📘</span>
                <span>My Notes • PWA</span>
              </div>
              <h3 className="text-lg font-black text-stone-900">{text.iosTitle}</h3>
              <p className="text-xs text-stone-500 leading-relaxed">{text.iosSubtitle}</p>
            </div>

            <div className="space-y-2.5">
              {/* Step 1 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/70">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-stone-800 flex items-center gap-1.5">
                    <span>{isIOSChrome ? text.step1ChromeTitle : text.step1Title}</span>
                    <Share2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  </div>
                  <p className="text-stone-500 leading-snug">{isIOSChrome ? text.step1ChromeDesc : text.step1Desc}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/70">
                <div className="w-7 h-7 rounded-xl bg-lavender-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-stone-800">{text.step2Title}</div>
                  <p className="text-stone-500 leading-snug">{text.step2Desc}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200/70">
                <div className="w-7 h-7 rounded-xl bg-mint-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  3
                </div>
                <div className="text-xs space-y-0.5">
                  <div className="font-bold text-stone-800">{text.step3Title}</div>
                  <p className="text-stone-500 leading-snug">{text.step3Desc}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm transition active:scale-98"
            >
              {text.done}
            </button>

            {/* Animated pointer toward browser Share toolbar */}
            <div className="text-center text-[11px] font-bold text-blue-600 animate-bounce pt-0.5">
              {isIOSChrome ? text.chromeHint : text.safariHint}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
