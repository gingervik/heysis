# 🌸 HeySis («Твоя Тайна» / «My Notes»)

> **Open Source Privacy-First PWA** for adolescent girls' health education, puberty guidance, and safe digital support.

[![License: MIT](https://img.shields.io/badge/Software_License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![License: CC BY 4.0](https://img.shields.io/badge/Content_&_Design-CC--BY--4.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline--First-green.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![UNICEF Safe AI Aligned](https://img.shields.io/badge/Safety-UNICEF_Aligned-purple.svg)](https://www.unicef.org)
[![Live Demo](https://img.shields.io/badge/Demo-Live_PWA-success.svg)](https://hey-sis.vercel.app/)

---

## 📖 О проекте (About)

**HeySis** — это прогрессивное веб-приложение (PWA) с открытым исходным кодом, созданное для безопасного, анонимного и бережного просвещения девочек-подростков (10–15 лет). Проект объединяет доказательную медицину, педагогику взросления и цифровой камуфляж для защиты личных границ ребенка в консервативных или небезопасных условиях.

### Ключевые возможности:
- 📱 **PWA & Stealth Mode (Камуфляж)**: устанавливается под нейтральным именем **«My Notes»** с синей иконкой школьного блокнота.
- 🚨 **Panic Button (Кнопка SOS)**: плавающая кнопка и горячая клавиша `Esc` мгновенно заменяют интерфейс на настоящий рабочий калькулятор или конспект уроков.
- 📶 **100% Offline-First**: сервис-воркер кэширует тексты и векторные иллюстрации; приложение работает без подключения к сети.
- 🔒 **Полная анонимность**: отсутствие регистрации, телефонов, cookies слежения и отправки логов на сервер. Все данные сохраняются только в локальной памяти устройства (`localStorage`).
- 📚 **Micro-learning Stories**: формат Instagram Stories / Duolingo с короткими фактами, интерактивными квизами и понятными метафорами.
- 💬 **Digital Big Sister**: анонимный чат с ИИ-ассистенткой, обученной по строгим этическим правилам: поддержка без постановки диагнозов, мягкий тон, маршрутизация кризисных ситуаций на телефоны доверия.

---

## ⚖️ Open Source Лицензии (Licensing)

Проект использует признанную мировую практику раздельного лицензирования программного кода и образовательного контента:

| Компонент | Лицензия | Ссылка |
| :--- | :--- | :--- |
| **Программное обеспечение (Код)** | **MIT License** (Одобрено Open Source Initiative — OSI) | [LICENSE](LICENSE) |
| **Дизайн, иллюстрации и контент** | **Creative Commons Attribution 4.0 International (CC-BY 4.0)** | [LICENSE-CC-BY.md](LICENSE-CC-BY.md) |

- **Код (MIT)**: разрешено свободное использование, модификация, распространение и интеграция в коммерческие и некоммерческие проекты.
- **Материалы (CC-BY 4.0)**: тексты уроков, квизы и иллюстрации могут свободно переводиться на другие языки и адаптироваться школами и фондами при сохранении указания авторства.

---

## 🚀 Быстрый старт (Quick Start)

### Требования:
- Node.js 18+ (рекомендуется 20+)
- npm 9+

### Установка и запуск:

```bash
# 1. Клонировать репозиторий
git clone https://github.com/gingervik/heysis.git
cd heysis

# 2. Установить зависимости
npm install

# 3. Скопировать шаблон переменных окружения (опционально)
cp .env.example .env.local

# 4. Запустить локальный сервер для разработки
npm run dev

# 5. Сборка для продакшена
npm run build

# 5. Просмотр готовой сборки
npm run preview
```

---

## 📂 Структура проекта

```
├── public/
│   ├── favicon.svg            # Нейтральный синий блокнот
│   ├── icons/                 # Иконки камуфляжа для PWA (192x192, 512x512)
│   ├── manifest.webmanifest   # Манифест PWA ("My Notes")
│   └── sw.js                  # Service Worker (offline-first кэширование)
├── src/
│   ├── components/
│   │   ├── FloatingPanicButton.jsx  # Плавающая кнопка SOS
│   │   ├── PanicOverlay.jsx         # Рабочий экран калькулятора/заметок
│   │   └── StoriesPlayer.jsx        # Stories Player с тапами и квизом
│   ├── context/
│   │   └── AppContext.jsx           # Управление состоянием (localStorage)
│   ├── data/
│   │   └── mockData.js              # Образовательные тексты, мифы и подсказки
│   ├── screens/
│   │   ├── Onboarding.jsx           # Экран безопасного знакомства
│   │   ├── Dashboard.jsx            # Главное меню (карусель + миф дня)
│   │   └── ChatAssistant.jsx        # Чат «Старшая Сестра» (UNICEF rules)
│   ├── App.jsx                      # Корневой маршрутизатор SPA
│   ├── index.css                    # Tailwind CSS директивы
│   └── main.jsx                     # Точка входа React
├── LICENSE                          # MIT + CC-BY 4.0
├── LICENSE-CC-BY.md                 # Полный текст CC-BY 4.0
└── package.json
```

---

## 🤝 Участие в разработке (Contributing)

Мы приветствуем вклад врачей-педиатров, психологов, педагогов, дизайнеров и разработчиков!

1. Сделайте `fork` репозитория.
2. Создайте тематическую ветку: `git checkout -b feature/new-educational-topic`.
3. Закоммитьте изменения: `git commit -m 'feat: add topic about skincare and hygiene'`.
4. Отправьте ветку в свой репозиторий: `git push origin feature/new-educational-topic`.
5. Создайте Pull Request.

---

## 💜 Безопасность и этические принципы (Safety Guidelines)

- Никакой телеметрии и трекеров сторонних сервисов (Google Analytics, Яндекс Метрика, Facebook Pixel категорически запрещены).
- Все обращения к ИИ должны валидироваться на клиенте и сервере с приоритетом физической и эмоциональной безопасности ребенка.
- Проект создан волонтерским сообществом в интересах здоровья детей.
