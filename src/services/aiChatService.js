import { detectLanguage, LANG_VOICE_MAP } from './languageDetector.js';

// AI Chat Service with Strict UNICEF & Big Sister Safeguarding System Prompt
// Supports:
// 1. Google Gemini API (gemini-1.5-flash / gemini-2.0-flash)
// 2. OpenAI-compatible API (gpt-4o-mini)
// 3. Graceful Offline / Local Knowledge Base Fallback with Zero-Downtime

const STORAGE_KEYS = {
  GEMINI_KEY: 'sisterhood_gemini_api_key_v1',
  OPENAI_KEY: 'sisterhood_openai_api_key_v1',
  CUSTOM_ENDPOINT: 'sisterhood_custom_endpoint_v1',
  AI_PROVIDER: 'sisterhood_ai_provider_v1', // 'gemini' | 'openai' | 'custom' | 'local'
};

// Optional serverless proxy base URL (e.g. https://heysis.vercel.app); empty string uses same-origin /api/chat
const PROXY_BASE = (import.meta.env.VITE_PROXY_URL || '').replace(/\/+$/, '');

// Default fallback key from environment variable (empty string by default for public open-source)
const DEFAULT_OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

export const getStoredAIConfig = () => {
  if (typeof window === 'undefined') {
    return { provider: 'openai', geminiKey: '', openaiKey: DEFAULT_OPENAI_KEY, customEndpoint: '' };
  }
  const storedOpenAI = localStorage.getItem(STORAGE_KEYS.OPENAI_KEY);
  const storedGemini = localStorage.getItem(STORAGE_KEYS.GEMINI_KEY);
  const storedProvider = localStorage.getItem(STORAGE_KEYS.AI_PROVIDER);

  // If user hasn't explicitly entered a custom key, use the built-in system key
  const activeOpenAIKey = storedOpenAI !== null && storedOpenAI !== '' ? storedOpenAI : DEFAULT_OPENAI_KEY;

  return {
    provider: storedProvider || 'openai',
    geminiKey: storedGemini || '',
    openaiKey: activeOpenAIKey,
    customEndpoint: localStorage.getItem(STORAGE_KEYS.CUSTOM_ENDPOINT) || ''
  };
};

export const saveStoredAIConfig = ({ provider, geminiKey, openaiKey, customEndpoint }) => {
  if (typeof window === 'undefined') return;
  if (provider !== undefined) localStorage.setItem(STORAGE_KEYS.AI_PROVIDER, provider);
  if (geminiKey !== undefined) localStorage.setItem(STORAGE_KEYS.GEMINI_KEY, geminiKey.trim());
  if (openaiKey !== undefined) localStorage.setItem(STORAGE_KEYS.OPENAI_KEY, openaiKey.trim());
  if (customEndpoint !== undefined) localStorage.setItem(STORAGE_KEYS.CUSTOM_ENDPOINT, customEndpoint.trim());
};

export const buildParentSystemPrompt = (ageGroup, lang = 'ru-RU') => {
  const langNames = {
    'ru-RU': 'Русский язык',
    'pl-PL': 'Język polski (Polish)',
    'en-US': 'English',
    'uk-UA': 'Українська мова (Ukrainian)'
  };
  const targetLanguage = langNames[lang] || 'Русский язык';

  const ageProfiles = {
    '8-9': {
      stage: 'Младший школьный возраст (8–9 лет)',
      psychology: 'Ребенок начинает осознавать телесные границы, сравнивать себя со сверстницами, испытывает естественное детское любопытство. Важна базовая безопасность, доверительный контакт и отсутствие чувства стыда.',
      keyTopics: 'Правило купальника (Swimsuit / Underwear Rule UNICEF), различие "хороших" и "тревожных" секретов, гигиенические навыки (подмывание спереди назад, мытье рук, смена белья), естественные страхи (рост, выпадение молочных зубов, темнота), установление безусловного доверия с отцом/мамой.',
      parentAdviceFocus: 'Не перегружать взрослой физиологией зачатия; объяснять просто, доброжелательно и конкретно. Учить телесной автономии: «Твое тело принадлежит только тебе».',
      dadAdvice: 'Для папы: быть спокойной безопасной гаванью, не отстраняться от заботы, поддерживать ее уверенность в себе и учить говорить твердое «нет» неприятным ситуациям.'
    },
    '10-12': {
      stage: 'Предпубертат / предподростковый возраст (10–12 лет)',
      psychology: 'Начало скачка роста, появление вторичных половых признаков (телархе, рост волос, усиление потоотделения). Ребенок может стесняться меняющегося тела, бояться внезапных месячных в школе.',
      keyTopics: 'Заблаговременная подготовка к первой менструации (менархе) ДО ее наступления, сбор «сумочки уверенности» в школьный рюкзак (прокладки, салфетки, запасные трусики), первый мягкий топ/бра без косточек, детский дезодорант, деликатность в семье (не обсуждать фигуру при родственниках).',
      parentAdviceFocus: 'Снять страх и табу: кровь при месячных — это признак здоровья, а не травма или болезнь. Нормализовать любые физические изменения.',
      dadAdvice: 'Для папы: купить и положить средства гигиены в доступное место в ванной без лишних вопросов, сказать: «Ты взрослеешь, я всегда помогу и куплю все необходимое».'
    },
    '13-15': {
      stage: 'Пубертат / средний подростковый возраст (13–15 лет)',
      psychology: 'Гормональный шторм, эмоциональная лабильность, формирование идентичности, обостренная потребность в приватности и автономии от родителей.',
      keyTopics: 'Нерегулярность цикла в первые 1–2 года (норма созревания гипоталамо-гипофизарной оси), дисменорея/спазмы (грелка, отдых, питье, ибупрофен по согласованию с педиатром), перепады настроения и ПМС (не обесценивать фразами «это у тебя гормоны»), уход за кожей и акне, неприкосновенность личного пространства (обязательно стучать в дверь комнаты, не читать личные переписки).',
      parentAdviceFocus: 'Слушать в два раза больше, чем говорить. Не спорить в моменты эмоционального пика, возвращаться к диалогу, когда буря утихнет. Быть союзником, а не контролером.',
      dadAdvice: 'Для папы: уважать закрытую дверь, не обижаться на дистанцирование, поддерживать словами: «Я верю в тебя, ты со всем справишься».'
    },
    '16+': {
      stage: 'Старший подростковый возраст / ранняя юность (16+ лет)',
      psychology: 'Переход к взрослости, сепарация, планирование будущего, стресс экзаменов, первые романтические отношения, потребность в уважении как к взрослой личности.',
      keyTopics: 'Зрелый регулярный менструальный цикл, грамотность визитов к дружественному гинекологу (профилактические чек-апы без стыда), личные отношения и культура согласия (consent), управление стрессом и академическим выгоранием, диалог на равных.',
      parentAdviceFocus: 'Переход от роли опекуна к роли доверенного мудрого советника/партнера. Безоценочное принятие любых переживаний.',
      dadAdvice: 'Для папы: транслировать глубокое уважение к ее решениям, целям и личному выбору, быть надежной опорой без гиперопеки.'
    }
  };

  const profile = ageProfiles[ageGroup] || ageProfiles['10-12'];

  return `Ты — ведущий детский психолог, доказательный педиатр и семейный консультант в приложении HeySis.
Твой собеседник: родитель (мама или папа) девочки в возрасте ${ageGroup} лет.
Базовый язык общения: ${targetLanguage}.

ВОЗРАСТНОЙ ПРОФИЛЬ РЕБЕНКА (${ageGroup} лет):
- Стадия развития: ${profile.stage}
- Психологические особенности: ${profile.psychology}
- Ключевые фокусные темы: ${profile.keyTopics}
- Главный фокус для родителя: ${profile.parentAdviceFocus}
- Рекомендации для пап: ${profile.dadAdvice}

КРИТИЧЕСКИЕ ПРАВИЛА:
1. ЯЗЫК: Всегда отвечай на том языке, на котором обратился родитель (украинский, польский, английский, русский)!
2. ВОЗРАСТНАЯ ТОЧНОСТЬ: Адаптируй свои советы СТРОГО под возраст ${ageGroup} лет. Если девочке 8–9 лет, не говори о регулярности менструаций или свиданиях — говори о гигиене, границах тела и правиле купальника. Если 16+ — общайся как с родителем почти взрослого человека.
3. ГОТОВЫЕ ФРАЗЫ: Всегда давай родителю конкретные, готовые формулировки в кавычках («...»), которые он может буквально произнести вслух дочке.
4. ПРАКТИЧНОСТЬ И БЕЗОЦЕНОЧНОСТЬ: Снимай тревогу родителя, нормализуй физиологию и эмоции по стандартам ВОЗ, AAP и UNICEF. Никакого шейминга или устаревших мифов.
5. ДЛЯ ОТЦОВ: Если спрашивает папа — дай конкретные, деликатные, спокойные шаги без неловкости.
6. ФОРМАТ: 3–5 емких предложений, тепло, профессионально, с делением на читаемые абзацы.`;
};

// Local offline fallback for parents adapted deeply by age and language
export const generateParentLocalFallbackReply = (userMessage, ageGroup = '10-12', lang = 'ru-RU') => {
  const lower = userMessage.toLowerCase().trim();
  const detected = detectLanguage(userMessage);
  const effective = (detected && LANG_VOICE_MAP[detected]) || lang || 'ru-RU';
  const isUa = effective.startsWith('uk');
  const isPl = effective.startsWith('pl');
  const isEn = effective.startsWith('en');

  // Age 8-9 specific fallbacks
  if (ageGroup === '8-9') {
    if (isUa) {
      if (lower.includes('купальник') || lower.includes('меж') || lower.includes('секрет') || lower.includes('тіл')) {
        return 'Головний орієнтир у 8–9 років — «Правило купальника» (The Underwear Rule): зони під білизною належать тільки їй і ніхто не має права їх торкатися. Поясніть різницю між добрими секретами (сюрприз на свято) і тривожними. Скажіть: «Люба, якщо щось тебе бентежить або лякає — ти завжди можеш розповісти мені, я захищу тебе і ніколи не сваритиму» 🌸';
      }
      if (lower.includes('гігієн') || lower.includes('мит') || lower.includes('підмив') || lower.includes('мил')) {
        return 'У 8–9 років ключова звичка — підмивання теплою водою суворо спереду назад (від уретри до попи), щоб бактерії не потрапляли в сечові шляхи. Достатньо чистої води або мʼякої дитячої пінки без барвників та ароматизаторів 🌿';
      }
      if (lower.includes('тат') || lower.includes('батьк')) {
        return 'Для тата 8–9-річної доньки найважливіше — бути безпечною гаванню та джерелом безумовного схвалення. Спільний час, прогулянки та повага до її права говорити «ні» закладають здорову самооцінку на все життя 💛';
      }
      if (lower.includes('зуб') || lower.includes('зріст') || lower.includes('рост')) {
        return 'У 8–9 років активно змінюються зубки і ростуть кістки. Якщо донька хвилюється, що росте швидше чи повільніше за подруг, заспокойте її: «Кожне тіло росте у власному унікальному темпі, немов квітка. З тобою все абсолютно правильно!» ✨';
      }
      return 'У віці 8–9 років закладається фундамент довіри на весь підлітковий період. Слухайте її без критики, навчайте правилу особистих кордонів і показуйте, що ваше спілкування — це безпечний простір 🌸';
    }

    if (isPl) {
      if (lower.includes('strój') || lower.includes('granic') || lower.includes('sekret') || lower.includes('ciał')) {
        return 'Złota zasada w wieku 8–9 lat to «Zasada bielizny» (The Underwear Rule): miejsca zakrywane strojem kąpielowym należą tylko do niej. Naucz córkę odróżniać dobre tajemnice (niespodzianka) od złych. Powiedz: «Kochanie, jeśli cokolwiek sprawia, że czujesz niepokój, zawsze możesz mi powiedzieć — ochronię Cię i nigdy się nie zgniewam» 🌸';
      }
      if (lower.includes('higien') || lower.includes('myci') || lower.includes('mydł')) {
        return 'W wieku 8–9 lat kluczowym nawykiem jest podmywanie się ciepłą wodą zawsze w kierunku od przodu do tyłu. Chroni to pęcherz przed infekcjami. Wystarczy sama czysta woda lub bardzo łagodny płyn dla dzieci bez substancji zapachowych 🌿';
      }
      if (lower.includes('tata') || lower.includes('ojciec')) {
        return 'Dla taty 8–9 letniej dziewczynki najważniejsze to bycie oazą spokoju i bezwarunkowej akceptacji. Wspólne pasje, rozmowy i wspieranie jej prawa do asertywnego mówienia «nie» budują w niej silne poczucie własnej wartości 💛';
      }
      return 'W wieku 8–9 lat budujemy bezpieczną więź na przyszłość. Odpowiadaj na pytania córki prosto, z czułością i bez zawstydzania, ucząc ją szacunku do własnego ciała 🌸';
    }

    if (isEn) {
      if (lower.includes('swimsuit') || lower.includes('underwear') || lower.includes('boundary') || lower.includes('secret')) {
        return 'The core foundation for ages 8–9 is the "Swimsuit / Underwear Rule": areas covered by swimwear are private and belong solely to her. Clarify the difference between happy surprises and scary secrets: "Sweetheart, if anyone ever makes you feel uncomfortable or asks you to keep a secret, tell me right away — you are never in trouble and I will always keep you safe" 🌸';
      }
      if (lower.includes('hygiene') || lower.includes('wash') || lower.includes('soap')) {
        return 'At 8–9 years old, the fundamental habit is washing and wiping strictly from front to back to maintain a healthy urinary tract. Plain warm water or an unscented gentle pediatric wash is best, along with daily fresh cotton underwear 🌿';
      }
      if (lower.includes('dad') || lower.includes('father')) {
        return 'For a dad of an 8–9 year old, your calm approval and affectionate presence are vital. Engaging in active play, listening attentively, and reinforcing her confidence to say a firm "no" establishes healthy boundaries for life 💛';
      }
      return 'At 8–9 years old, fostering openness without embarrassment is key. Focus on gentle body autonomy, curiosity, and reinforcing that her home is always a safe harbor 🌸';
    }

    // Russian 8-9
    if (lower.includes('купальник') || lower.includes('границ') || lower.includes('секрет') || lower.includes('тел')) {
      return 'Главный ориентир в 8–9 лет — «Правило купальника»: зоны под купальником интимны и принадлежат только самой девочке. Объясните разницу между хорошими секретами (сюрприз к празднику) и тревожными. Скажите дочке: «Если кто-то просит сохранить секрет о твоем теле или заставляет чувствовать неловкость — сразу расскажи мне, я всегда защищу тебя и никогда не буду ругать» 🌸';
    }
    if (lower.includes('гигиен') || lower.includes('мыт') || lower.includes('подмыв') || lower.includes('мыл')) {
      return 'В 8–9 лет базовое правило гигиены — подмывание теплой проточной водой строго спереди назад (от уретры к попе), чтобы бактерии не попадали в мочевые пути. Используйте чистую воду или мягкую детскую пенку 0+ без отдушек. Напоминайте ежедневно надевать свежее хлопковое белье 🌿';
    }
    if (lower.includes('пап') || lower.includes('отец')) {
      return 'Для папы девочки 8–9 лет самое ценное — быть источником безусловной защиты и одобрения. Общие прогулки, искренний интерес к ее школьным успехам и поддержка ее права говорить «нет» закладывают фундамент высокой самооценки и здоровых границ на всю жизнь 💛';
    }
    if (lower.includes('зуб') || lower.includes('рост')) {
      return 'В 8–9 лет активно меняются молочные зубы и вытягиваются кости. Если дочка переживает, что растет медленнее или быстрее одноклассниц, скажите: «Каждое тело растет в своем неповторимом ритме, как цветок весной. Твое тело чудесно и развивается совершенно правильно» ✨';
    }
    return 'В возрасте 8–9 лет закладывается фундамент доверия на весь подростковый период. Слушайте ее рассказы без критики, мягко учите правилу личных границ и напоминайте, что ее тело и чувства под вашей надежной защитой 🌸';
  }

  // Age 10-12 specific fallbacks (Preadolescence & first period prep)
  if (ageGroup === '10-12') {
    if (isUa) {
      if (lower.includes('косметичк') || lower.includes('рюкзак') || lower.includes('школ') || lower.includes('набір')) {
        return 'Зберіть невелику непромокальну сумочку для шкільного рюкзака: 2–3 денні прокладки, вологі серветки для інтимної гігієни та запасні трусики в пакетику. Скажіть доньці: «Це твій секретний набір упевненості, щоб ти завжди почувалася спокійно в школі» ✨';
      }
      if (lower.includes('перш') || lower.includes('місячн') || lower.includes('менархе') || lower.includes('підготов')) {
        return 'Поговоріть про перші місячні заздалегідь, спокійно й позитивно: «Місячні — це не хвороба, а ознака того, що твоє тіло росте здоровим і сильним. Якщо помітиш крапельки крові — не лякайся, просто скажи мені або візьми прокладку з сумочки» 🌸';
      }
      if (lower.includes('топ') || lower.includes('бра') || lower.includes('бюстгальтер') || lower.includes('груд')) {
        return 'Перший бюстгальтер має бути максимально мʼяким — еластичний бавовняний топ без кісточок і поролону. Запропонуйте сходити на шопінг разом: «Тіло змінюється, давай виберемо найзручніший і найгарніший топик, у якому тобі буде приємно рухатися» 🛍️';
      }
      if (lower.includes('тат') || lower.includes('батьк')) {
        return 'Для тата дівчинки 10–12 років найкращий жест — купити засоби гігієни заздалегідь і покласти у доступне місце у ванній. Просто скажіть: «Люба, ти дорослішаєш, це чудово. Якщо тобі щось знадобиться — я завжди поруч і куплю все необхідне» 💛';
      }
    }

    if (isPl) {
      if (lower.includes('kosmetyczk') || lower.includes('plecak') || lower.includes('szkoł')) {
        return 'Warto spakować do plecaka małą saszetkę ratunkową: 2–3 podpaski, chusteczki do higieny intymnej i zapasową bieliznę. Powiedz córce: «To Twój pakiet pewności siebie, dzięki któremu w szkole zawsze będziesz czuć się bezpiecznie» ✨';
      }
      if (lower.includes('pierwsz') || lower.includes('miesiączk') || lower.includes('okres')) {
        return 'Porozmawiaj o pierwszej miesiączce z wyprzedzeniem: «Miesiączka to nie choroba ani powód do wstydu, lecz piękny znak zdrowia. Gdy się pojawi, nie bój się — po prostu daj mi znać, a wspólnie o wszystko zadbamy» 🌸';
      }
      if (lower.includes('tata') || lower.includes('ojciec')) {
        return 'Dla taty najważniejszy jest spokój. Kup podpaski z wyprzedzeniem i połóż w łazience, mówiąc córce: «Dorastasz i to jest wspaniałe. Zawsze możesz na mnie liczyć» 💛';
      }
    }

    if (isEn) {
      if (lower.includes('kit') || lower.includes('pouch') || lower.includes('school') || lower.includes('backpack')) {
        return 'Pack a discreet "Confidence Kit" for her backpack: 2–3 pads, gentle feminine wipes, and spare cotton underwear in a pouch. Tell her: "This is your superhero backup kit so you always feel calm and ready at school" ✨';
      }
      if (lower.includes('first period') || lower.includes('menarche') || lower.includes('prepare')) {
        return 'Prepare her ahead of time with warmth and positivity: "A period is not an illness or injury — it is a normal, healthy sign that your body is growing strong. If you ever notice spots on your underwear, do not panic, just let me know or grab a pad from your pouch" 🌸';
      }
      if (lower.includes('dad') || lower.includes('father')) {
        return 'For a dad, stocking up on pads beforehand and placing them in the bathroom speaks volumes. Say gently: "You are growing up and it is wonderful. Whatever you need, I am right here for you" 💛';
      }
    }

    // Russian 10-12
    if (lower.includes('косметичк') || lower.includes('рюкзак') || lower.includes('школ') || lower.includes('набор')) {
      return 'Соберите небольшую непромокаемую сумочку в школьный рюкзак: 2–3 дневные прокладки, влажные салфетки для интимной гигиены и запасные трусики в пакетике. Назовите это «набором уверенности», чтобы дочка чувствовала себя спокойно в любой ситуации в школе ✨';
    }
    if (lower.includes('перв') || lower.includes('месячн') || lower.includes('менархе') || lower.includes('подготов')) {
      return 'Поговорите о первых месячных заранее, спокойно и доброжелательно: «Месячные — это признак того, что твой организм растет сильным и здоровым, а не болезнь или ранка. Если заметишь пятнышко на белье — не пугайся, сразу скажи мне или достань прокладку из сумочки» 🌸';
    }
    if (lower.includes('топ') || lower.includes('лиф') || lower.includes('бюстгальтер') || lower.includes('груд')) {
      return 'Первый бюстгальтер должен быть максимально мягким — эластичный хлопковый топ без косточек и жестких швов. Предложите совместный шопинг: «Твое тело меняется, давай выберем самый удобный и красивый топ, чтобы тебе было комфортно на уроках и физкультуре» 🛍️';
    }
    if (lower.includes('пап') || lower.includes('отец')) {
      return 'Для папы девочки 10–12 лет важнее всего показать спокойствие. Купите прокладки заранее, положите в доступное место в ванной и скажите: «Доченька, ты взрослеешь, это абсолютно прекрасно. Я всегда рядом и помогу со всем необходимым» 💛';
    }
  }

  // Age 13-15 specific fallbacks (Puberty, irregular cycle, cramps, mood & privacy)
  if (ageGroup === '13-15') {
    if (isUa) {
      if (lower.includes('нерегулярн') || lower.includes('цикл') || lower.includes('затримк')) {
        return 'У перші 1–2 роки після менархе нерегулярний цикл — це абсолютна фізіологічна норма. Гормональна система гіпоталамус-гіпофіз-яєчники тільки дозріває. Просто спокійно фіксуйте дати в календарику додатку HeySis 💜';
      }
      if (lower.includes('біль') || lower.includes('живіт') || lower.includes('спазм') || lower.includes('болить')) {
        return 'При менструальних спазмах допоможуть тепла грілка на низ живота, теплий травʼяний чай, зручна поза «ембріона» та відпочинок. Якщо біль заважає вчитися — проконсультуйтеся з педіатром щодо вікового дозування ібупрофену 🌿';
      }
      if (lower.includes('настрі') || lower.includes('зліст') || lower.includes('плач') || lower.includes('пмс') || lower.includes('кричит')) {
        return 'Гормональні коливання у 13–15 років схожі на шторм. Не кажіть фрази «це в тебе гормони грають». Дайте їй побути на самоті, якщо вона просить, а коли емоції вщухнуть — запропонуйте теплий чай або обійми без повчань 🫂';
      }
      if (lower.includes('двер') || lower.includes('меж') || lower.includes('кімнат') || lower.includes('телефон')) {
        return 'Обовʼязково стукайте в двері кімнати доньки і чекайте відповіді перед тим, як увійти. Повага до її особистого простору та листування в телефоні — головний ключ до збереження довіри в підлітковому віці 🗝️';
      }
    }

    if (isPl) {
      if (lower.includes('nieregularn') || lower.includes('cykl')) {
        return 'W pierwszych 1–2 latach po menarche nieregularny cykl jest całkowitą normą fizjologiczną. Układ hormonalny dopiero dojrzewa. Wystarczy spokojnie zapisywać daty w kalendarzu HeySis 💜';
      }
      if (lower.includes('ból') || lower.includes('brzuch') || lower.includes('skurcz')) {
        return 'Na skurcze menstruacyjne pomaga ciepły termofor, napar z rumianku, odpoczynek i wygodna pozycja. W razie silnego bólu skonsultuj się z pediatrą co do odpowiedniej dawki ibuprofenu 🌿';
      }
      if (lower.includes('nastrój') || lower.includes('płacz') || lower.includes('pms') || lower.includes('złość')) {
        return 'Wahania nastroju u nastolatki wynikają z burzy hormonów. Nie bierz jej słów do siebie. Daj jej przestrzeń na ochłonięcie, a potem zaproponuj spokojną rozmowę lub herbatę bez kazań 🫂';
      }
      if (lower.includes('drzwi') || lower.includes('pokój') || lower.includes('prywatn')) {
        return 'Zawsze pukaj do drzwi jej pokoju przed wejściem. Szacunek dla jej prywatności to najprostszy sposób na pokazanie, że traktujesz ją poważnie 🗝️';
      }
    }

    if (isEn) {
      if (lower.includes('irregular') || lower.includes('cycle') || lower.includes('late')) {
        return 'During the first 1–2 years after menarche, cycle irregularity is biologically normal as the hypothalamic-pituitary-ovarian axis matures. Simply encourage logging days calmly in the HeySis app 💜';
      }
      if (lower.includes('cramp') || lower.includes('pain') || lower.includes('belly') || lower.includes('ache')) {
        return 'For menstrual cramps, a warm heating pad, chamomile tea, resting in a fetal curl, and hydration provide soothing relief. If cramps interfere with school, consult your pediatrician regarding appropriate age-based ibuprofen 🌿';
      }
      if (lower.includes('mood') || lower.includes('cry') || lower.includes('angry') || lower.includes('pms')) {
        return 'Pubertal hormonal surges are intense. Avoid saying "it\'s just your hormones." Give her quiet space to decompress, and once the storm calms down, offer a supportive hug or warm snack without judgment 🫂';
      }
      if (lower.includes('door') || lower.includes('room') || lower.includes('privacy') || lower.includes('phone')) {
        return 'Always knock before entering her bedroom and honor her closed door. Respecting her personal boundaries and digital privacy is the single best way to protect mutual trust 🗝️';
      }
    }

    // Russian 13-15
    if (lower.includes('нерегулярн') || lower.includes('цикл') || lower.includes('задержк')) {
      return 'В первые 1–2 года после менархе нерегулярность цикла — абсолютная физиологическая норма. Гормональная ось только настраивается. Если нет сильной слабости или острой боли — просто спокойно отмечайте дни в календарике HeySis 💜';
    }
    if (lower.includes('бол') || lower.includes('живот') || lower.includes('спазм')) {
      return 'При менструальных спазмах помогают теплая грелка на низ живота, травяной чай, отдых в позе эмбриона и достаточное питье. Если спазмы сильные — согласуйте с педиатром возрастной прием ибупрофена 🌿';
    }
    if (lower.includes('настроени') || lower.includes('пмс') || lower.includes('плач') || lower.includes('злит') || lower.includes('кричит')) {
      return 'Гормональные качели в пубертате — это сильный шторм. Избегайте фразы «это у тебя гормоны играют». Дайте дочке побыть в тишине, если она просит, а затем предложите чашку какао или прогулку без нравоучений 🫂';
    }
    if (lower.includes('двер') || lower.includes('комнат') || lower.includes('границ') || lower.includes('телефон')) {
      return 'Обязательно стучите в дверь ее комнаты и ждите разрешения войти. Уважение к личному пространству и перепискам — фундамент доверия между вами и взрослеющей дочерью 🗝️';
    }
  }

  // Age 16+ specific fallbacks (Emerging adulthood, adult cycle, consent, gynecologist, exams)
  if (ageGroup === '16+') {
    if (isUa) {
      if (lower.includes('лікар') || lower.includes('гінеколог') || lower.includes('огляд')) {
        return 'Перший візит до гінеколога варто подати як рутинну турботу про здоровʼя дорослої дівчини: «Давай знайдемо чуйного, дружнього до підлітків лікаря, щоб ти могла поставити будь-які запитання про своє тіло». Запитайте, чи хоче вона, щоб ви були поруч у кабінеті, чи зачекали у коридорі 👩‍⚕️';
      }
      if (lower.includes('хлоп') || lower.includes('стосунк') || lower.includes('кохан') || lower.includes('межі')) {
        return 'Говоріть про стосунки на рівних: «Любов — це завжди взаємна повага, безпека і твоя особиста згода. Ти маєш повне право сказати "ні" в будь-який момент, і гідна людина завжди це прийме». Будьте поруч як надійний порадник 💜';
      }
      if (lower.includes('іспит') || lower.includes('стрес') || lower.includes('втом') || lower.includes('навчан')) {
        return 'У 16+ років дівчата часто переживають виснаження через іспити та вибір майбутнього. Нагадуйте: «Жоден бал на іспиті не вартий твого здоровʼя. Ми любимо тебе за те, хто ти є, а не за оцінки» ✨';
      }
    }

    if (isPl) {
      if (lower.includes('lekarz') || lower.includes('ginekolog') || lower.includes('badani')) {
        return 'Przedstaw wizytę u ginekologa jako naturalny krok dorosłej kobiety: «Wybierzmy przyjaznego młodzieży lekarza, abyś czuła się w pełni bezpiecznie». Zapytaj, czy woli wejść do gabinetu sama, czy z Twoją obecnością 👩‍⚕️';
      }
      if (lower.includes('relacj') || lower.includes('chłopak') || lower.includes('miłość') || lower.includes('granic')) {
        return 'Rozmawiajcie po partnersku: «Zdrowa relacja opiera się na szacunku i obopólnej zgodzie. Zawsze masz prawo odmówić i oczekiwać szacunku dla Twoich granic». Zapewnij ją o swoim wsparciu 💜';
      }
      if (lower.includes('stres') || lower.includes('egzamin') || lower.includes('matur') || lower.includes('szkoł')) {
        return 'W wieku 16+ stres egzaminacyjny bywa przytłaczający. Przypominaj córce: «Twoja wartość nie zależy od ocen. Jesteśmy z Ciebie dumni i zawsze Ci pomożemy» ✨';
      }
    }

    if (isEn) {
      if (lower.includes('doctor') || lower.includes('gynecologist') || lower.includes('exam') || lower.includes('clinic')) {
        return 'Frame a gynecological checkup as positive self-care for young women: "Let\'s find an adolescent-friendly clinician so you can comfortably ask anything about your cycle." Ask if she would prefer you in the room or waiting outside in the lobby 👩‍⚕️';
      }
      if (lower.includes('dating') || lower.includes('relationship') || lower.includes('boyfriend') || lower.includes('consent')) {
        return 'Speak as partners: "Healthy relationships are always grounded in mutual respect, kindness, and enthusiastic consent. You have full sovereignty over your body and your choices, and you can always confide in me without fear" 💜';
      }
      if (lower.includes('stress') || lower.includes('exam') || lower.includes('burnout') || lower.includes('college')) {
        return 'At 16+, academic anxiety and future pressure run high. Reassure her: "No exam score defines your worth or potential. Your health, peace of mind, and happiness come first" ✨';
      }
    }

    // Russian 16+
    if (lower.includes('врач') || lower.includes('гинеколог') || lower.includes('осмотр') || lower.includes('прием')) {
      return 'Преподнесите визит к гинекологу как естественную заботу взрослой девушки о своем здоровье: «Давай найдем деликатного, дружественного к подросткам специалиста, чтобы ты могла задать любые вопросы о цикле». Спросите дочку, комфортнее ли ей войти одной или чтобы вы были рядом 👩‍⚕️';
    }
    if (lower.includes('отношени') || lower.includes('парн') || lower.includes('любов') || lower.includes('границ')) {
      return 'Говорите на равных: «Здоровые отношения строятся только на взаимном уважении, безопасности и обоюдном согласии. Ты имеешь полное право в любой момент сказать "нет", и любящий человек всегда это уважает». Будьте для нее мудрым советником 💜';
    }
    if (lower.includes('экзамен') || lower.includes('стресс') || lower.includes('учеб') || lower.includes('будущ')) {
      return 'В 16+ лет груз экзаменов и тревога о будущем часто приводят к выгоранию. Напомните дочке: «Никакие оценки не определяют твою ценность. Твое здоровье и спокойствие важнее любых баллов, и мы всегда на твоей стороне» ✨';
    }
  }

  // Universal Fallbacks per language
  if (isUa) {
    if (lower.includes('тат') || lower.includes('батьк')) {
      return 'Для тата найголовніше — показати спокій і безумовне прийняття. Скажіть: «Люба, ти ростеш, і це чудово. Я завжди поруч, підтримаю тебе і допоможу у всьому». Ваше спокійне плече дарує доньці впевненість у собі 💛';
    }
    return 'Чудово, що ви так уважні до дорослішання своєї доньки! 🌸 Найкраще, що можна зробити зараз — це говорити спокійно, слухати без осуду та показати, що ви завжди на її боці. Запитуйте будь-що про розмову, фізіологію або емоції!';
  }

  if (isPl) {
    if (lower.includes('tata') || lower.includes('ojciec')) {
      return 'Dla taty najważniejsze to okazać spokój i akceptację. Powiedz: «Kochanie, dorastasz i to jest piękne. Zawsze Ci pomogę i jestem po Twojej stronie». Twoje wsparcie buduje jej poczucie bezpieczeństwa 💛';
    }
    return 'Wspaniale, że z taką troską podchodzisz do dorastania córki! 🌸 Słuchaj bez oceniania i daj jej poczucie, że dom jest bezpieczną przystanią. Zadaj dowolne pytanie, a chętnie podpowiem najlepsze słowa!';
  }

  if (isEn) {
    if (lower.includes('dad') || lower.includes('father')) {
      return 'For a dad, the greatest gift is calm, loving acceptance. Reassure her: "Sweetheart, you are growing up and it is wonderful. Whatever you need, I am right here for you." Your steady presence builds her lifelong confidence 💛';
    }
    return 'It is wonderful that you are proactively supporting your daughter! 🌸 The best approach is listening without judgment and respecting her personal pace. Ask any specific question and I will gladly provide evidence-based guidance!';
  }

  // Russian general
  if (lower.includes('пап') || lower.includes('отец')) {
    return 'Для папы важнее всего показать спокойствие и принятие. Скажите: «Доченька, ты взрослеешь, это абсолютно прекрасно. Я всегда рядом и помогу со всем необходимым». Ваша спокойная поддержка — основа ее уверенности в себе 💛';
  }
  return 'Замечательно, что вы так чутко относитесь к взрослению дочери! 🌸 Главное — слушать без критики, уважать ее границы и напоминать, что вы всегда на ее стороне. Напишите любой волнующий вопрос, и мы разберем его с точки зрения доказательной педиатрии и психологии!';
};

export const buildSystemPrompt = (ageGroup, lang = 'ru-RU') => {
  const isKid = ageGroup === '8-9';
  const isTween = ageGroup === '10-12';

  const langNames = {
    'ru-RU': 'Русский язык',
    'pl-PL': 'Język polski (Polish)',
    'en-US': 'English',
    'uk-UA': 'Українська мова (Ukrainian)',
    'kk-KZ': 'Қазақ тілі',
    'be-BY': 'Беларуская мова'
  };
  const targetLanguage = langNames[lang] || 'Русский язык';
  const isPolish = lang === 'pl-PL' || lang === 'pl';
  const isUkrainian = lang === 'uk-UA' || lang === 'uk';
  const isEnglish = lang === 'en-US' || lang === 'en';

  return `Ты — виртуальная заботливая "Старшая Сестра" (Digital Big Sister / Starsza Siostra) в безопасном образовательном пространстве для девочек.
Твоя собеседница: девочка возраста ${ageGroup} лет.
Базовый язык: ${targetLanguage}.

КРИТИЧЕСКИ ВАЖНОЕ ПРАВИЛО ЯЗЫКОВОЙ АДАПТАЦИИ (ОБЯЗАТЕЛЬНО К ВЫПОЛНЕНИЮ):
1. АВТОМАТИЧЕСКИЙ ПЕРЕХОД НА ЯЗЫК РЕБЕНКА:
   - Если ребенок пишет или говорит на другом языке (например, украинском, польском, английском, белорусском, казахском или любом другом) — ТЫ ОБЯЗАНА МГНОВЕННО ПЕРЕКЛЮЧИТЬСЯ И ОТВЕЧАТЬ СТРОГО НА ТОМ ЯЗЫКЕ, НА КОТОРОМ ОБРАТИЛСЯ РЕБЕНОК!
   - Если вопрос задан на украинском — отвечай ТОЛЬКО на красивом, грамотном и теплом украинском языке.
   - Если вопрос задан на польском — отвечай ТОЛЬКО на естественном польском языке.
   - Если вопрос задан на английском — отвечай ТОЛЬКО на английском языке.
   - Если вопрос задан на русском — отвечай на русском языке.
   - НИКОГДА не отвечай на русском или английском, если ребенок написал на украинском или польском!
2. При переключении языка строго сохраняй роль любящей Старшей Сестры, эмпатию, теплоту, правила детской безопасности и адаптацию под возраст ${ageGroup} лет.

ОСНОВНЫЕ ПРАВИЛА И ОГРАНИЧЕНИЯ:
1. РОЛЬ И СТИЛЬ:
   - Общайся как любящая, понимающая старшая сестра, которой можно доверить любой секрет.
   - Тон: эмпатичный, спокойный, мягкий, без назидательности и заумных медицинских терминов.
   - Длина ответа: строго 2–4 предложения (максимум 5). Не пиши длинные простыни текста.
   - Делай отступы между мыслями и используй теплые, поддерживающие эмодзи (🌸, 🫂, ✨, 💜).

2. ВОЗРАСТНАЯ АДАПТАЦИЯ:
${isKid ? `   - Девочке всего 8-9 лет. Говори предельно простыми словами, как с младшей сестренкой.
   - Темы: молочные зубы, гигиена (мытье рук и тела), сон и рост тела, эмоции, дружба в школе, страх темноты.
   - Обязательно соблюдай "Правило купальника" (Zasada stroju kąpielowego / Swimsuit rule): места под купальником интимны и принадлежат только ей! Никто не имеет права просить показать их или прикасаться к ним. Если кто-то просит хранить плохой секрет — нужно сразу сказать родителям.
   - Напоминай, что маме и папе всегда можно безопасно всё рассказать.`
: isTween ? `   - Девочке 10-12 лет. Она начинает взрослеть (первые волоски, рост груди, перепады настроения, белые выделения).
   - Объясняй, что тело у всех растет с разной скоростью, и это совершенно нормально.
   - Рассказывай про гигиену, прокладки и то, что первой менструации не нужно пугаться.`
: `   - Девочке ${ageGroup} лет. Подростковый возраст, менструация, ПМС, боли, личные границы, уверенность в себе.
   - Отвечай без табу, стыда и неловкости. Нормализуй естественные процессы организма.`}

3. СТАНДАРТЫ БЕЗОПАСНОСТИ (UNICEF И МЕДИЦИНА):
   - ТЫ НЕ ВРАЧ. Категорически запрещено ставить медицинские диагнозы, называть названия таблеток или лекарств.
   - Сильная боль: если девочка жалуется на сильную, острую или постоянную боль в животе или теле — посоветуй не терпеть и сразу обратиться к родителям, школьной медсестре или доктору.
   - Угроза, насилие или буллинг: если пишут про побои, домогательства, нежелательные прикосновения, мысли о причинении вреда себе:
     * Окружи заботой: "Ты ни в чем не виновата! Ты в безопасности со мной, и ты не одна 🫂".
     * Призови обратиться к доверенному взрослому (маме, школьному психологу, учительнице).
     * Служба доверия: ${isUkrainian ? 'Національна дитяча гаряча лінія в Україні: 116 111 або 0 800 500 225, або екстрений номер 112' : isPolish ? 'Telefon Zaufania dla Dzieci i Młodzieży w Polsce: 116 111 lub numer alarmowy 112' : isEnglish ? 'Childhelp National Child Helpline: 1-800-422-4453 or Emergency 911 / 112' : 'Детский телефон доверия 8-800-2000-122 или местная служба 112'}.
   - КОНФИДЕНЦИАЛЬНОСТЬ: никогда не спрашивай имя, фамилию, город, школу, контакты или фото.`;
};

// Local offline fallback intelligent generator
export const generateLocalFallbackReply = (userText, ageGroup, chatHistory = [], lang = 'ru-RU') => {
  const lower = userText.toLowerCase().trim();
  const detected = detectLanguage(userText);
  const effectiveLang = (detected && LANG_VOICE_MAP[detected]) || lang || 'ru-RU';
  const isUkrainian = effectiveLang.startsWith('uk') || /[іїєґ]/i.test(lower) || lower.includes('привіт') || lower.includes('будь ласка') || lower.includes('живіт') || lower.includes('місячні');
  const isPolish = effectiveLang.startsWith('pl') || /[ąćęłńóśźż]/i.test(lower) || lower.includes('cześć') || lower.includes('proszę') || lower.includes('brzuch') || lower.includes('okres');
  const isEnglish = effectiveLang.startsWith('en') || lower.includes('hello') || lower.includes('hi ') || lower.includes('period') || lower.includes('stomach') || lower.includes('hurt');

  // Ukrainian Offline Fallbacks
  if (isUkrainian) {
    if (lower.includes('дуже болить') || lower.includes('нестерпн') || lower.includes('блювот') || lower.includes('температур') || lower.includes('сильно болить') || lower.includes('швидка')) {
      return ageGroup === '8-9'
        ? 'Сонечко, коли щось сильно болить — негайно поклич маму, тата чи вчительку! Вони дадуть потрібні ліки або викличуть доброго лікаря. Не терпи біль наодинці, дорослі тобі обовʼязково допоможуть 🫂'
        : 'Люба, якщо біль дуже сильний і не минає, будь ласка, не терпи його наодинці! Обовʼязково скажи мамі, татові або шкільній медсестрі — вони допоможуть полегшити стан чи покажуть лікарю. Твоє здоровʼя найголовніше 🫂';
    }
    if (lower.includes('бʼють') || lower.includes('бють') || lower.includes('кривд') || lower.includes('торка') || lower.includes('насиль') || lower.includes('померти') || lower.includes('ненавиджу себе')) {
      return 'Зі мною ти в цілковитій безпеці, і ти ні в чому не винна! Будь ласка, обовʼязково поговори з дорослим, якому довіряєш (мамою, вчителькою або психологом). Також можна безкоштовно зателефонувати на Національну гарячу лінію для дітей: 116 111. Ти не одна 💜';
    }
    if (ageGroup === '8-9') {
      if (lower.includes('купальник') || lower.includes('дотик') || lower.includes('секрет') || lower.includes('таємниц')) {
        return 'Памʼятай, сонечко: місця під купальником належать лише тобі! Ніхто не має права просити їх показати. А якщо хтось просить зберігати «погану таємницю» — одразу розкажи батькам. Ти розумничка! ✨';
      }
      if (lower.includes('зуб') || lower.includes('молочн')) {
        return 'Зубчик, що хитається — це чудово! Молочні зубки поступаються місцем міцним і постійним зубам, які будуть із тобою все життя. Чисть їх вранці та ввечері 🦷';
      }
      return 'Дякую, що ділишся зі мною, сонечко! Я завжди поруч, щоб підтримати тебе. Про що ще ти хочеш дізнатися? 🌸';
    }
    if (lower.includes('груди') || lower.includes('сосок') || lower.includes('ростуть')) {
      return 'Це абсолютно нормально, красуне! Під час дорослішання одна грудь майже завжди росте швидше за іншу. Згодом вони вирівняються, а поки що обирай мʼякий зручний топік без кісточок 🌸';
    }
    if (lower.includes('місячн') || lower.includes('менструац') || lower.includes('кров') || lower.includes('прокладк')) {
      return 'Перші місячні — це природний і красивий етап дорослішання дівчинки. Завжди тримай у рюкзаку маленьку косметичку з прокладкою. Якщо маєш запитання — питай сміливо, я поруч 🌸';
    }
    if (lower.includes('біль у животі') || lower.includes('болить живіт')) {
      return 'Легкі спазми внизу живота бувають у багатьох дівчат. Допомагає тепла грілка, чай із меліси або ромашки та відпочинок. Якщо біль сильний — обовʼязково скажи мамі 🫂';
    }
    return 'Уважно тебе слухаю і дуже радію твоїй довірі 🌸 Дорослішати буває хвилююче, але ти чудово справляєшся. Запитай мене про що завгодно — я з радістю відповім!';
  }

  // Polish Offline Fallbacks
  if (isPolish) {
    if (lower.includes('bardzo boli') || lower.includes('nie do zniesienia') || lower.includes('wymioty') || lower.includes('gorączk') || lower.includes('silny ból')) {
      return ageGroup === '8-9'
        ? 'Słoneczko, gdy coś bardzo boli — natychmiast zawołaj mamę, tatę lub nauczycielkę! Dadzą Ci odpowiednią pomoc lub wezwą dobrego lekarza. Nie znoś bólu sama, dorośli Ci pomogą 🫂'
        : 'Skarbie, jeśli ból jest bardzo silny i nie mija, nie znoś go w samotności! Koniecznie powiedz mamie, tacie lub pielęgniarce szkolnej — pomogą Ci poczuć się lepiej 🫂';
    }
    if (lower.includes('biją') || lower.includes('krzywdz') || lower.includes('dotyka') || lower.includes('przemoc') || lower.includes('umrzeć') || lower.includes('nienawidzę siebie')) {
      return 'Jesteś ze mną w pełni bezpieczna i w niczym nie zawiniłaś! Proszę, koniecznie porozmawiaj z zaufanym dorosłym (mamą, nauczycielką lub psychologiem). Możesz też bezpłatnie zadzwonić pod Telefon Zaufania dla Dzieci i Młodzieży: 116 111. Nie jesteś sama 💜';
    }
    if (ageGroup === '8-9') {
      if (lower.includes('strój kąpielowy') || lower.includes('kąpielow') || lower.includes('dotyk') || lower.includes('sekret')) {
        return 'Pamiętaj, skarbie: miejsca pod strojem kąpielowym należą tylko do Ciebie! Nikt nie ma prawa prosić Cię o ich pokazanie. A jeśli ktoś prosi o zachowanie «sekretu» — od razu powiedz rodzicom. Jesteś dzielna! ✨';
      }
      if (lower.includes('ząb') || lower.includes('mlecz')) {
        return 'Ruszający się ząbek to znak, że rośniesz! Zęby mleczne ustępują miejsca stałym, mocnym zębom. Włóż ząbek pod poduszkę i szczotkuj ząbki rano i wieczorem 🦷';
      }
      return 'Dziękuję, że mi o tym mówisz, słoneczko! Zawsze jestem blisko, aby Cię wesprzeć. O czym jeszcze chciałabyś porozmawiać? 🌸';
    }
    if (lower.includes('piersi') || lower.includes('sutek') || lower.includes('rosną')) {
      return 'To całkowicie normalne, kochana! W okresie dorastania jedna pierś prawie zawsze rośnie szybciej od drugiej. Z czasem różnica zniknie, a na razie noś wygodny, miękki top bez fiszbin 🌸';
    }
    if (lower.includes('okres') || lower.includes('miesiączk') || lower.includes('krew') || lower.includes('podpask')) {
      return 'Pierwsza miesiączka to naturalny etap dorastania. Zawsze miej przy sobie małą kosmetyczkę z podpaską. Jeśli masz pytania — napisz do mnie śmiało, jestem tu dla Ciebie 🌸';
    }
    if (lower.includes('ból brzucha') || lower.includes('boli brzuch')) {
      return 'Delikatne skurcze w dole brzucha zdarzają się wielu dziewczynom. Połóż się z ciepłym termoforem i wypij ciepłą herbatę z melisy. Jeśli ból jest silny — powiedz mamie 🫂';
    }
    return 'Uważnie Cię słucham i bardzo cieszę się, że mi ufasz 🌸 Dorastanie bywa pełne emocji, ale świetnie sobie radzisz. Zapytaj mnie o cokolwiek — z radością odpowiem!';
  }

  // English Offline Fallbacks
  if (isEnglish) {
    if (lower.includes('hurt') || lower.includes('severe pain') || lower.includes('vomit') || lower.includes('fever') || lower.includes('emergency') || lower.includes('bad pain')) {
      return ageGroup === '8-9'
        ? 'Sweetie, when something hurts badly, call mom, dad, or a teacher right away! They will give you medicine or call a doctor. Do not bear pain alone, adults are here to protect you 🫂'
        : 'Honey, if the pain is severe or does not stop, please do not endure it alone! Tell mom, dad, or your school nurse right away. Your health and comfort are the top priority 🫂';
    }
    if (lower.includes('hit') || lower.includes('bully') || lower.includes('touch') || lower.includes('abuse') || lower.includes('die') || lower.includes('hate myself')) {
      return 'You are completely safe with me, and you did nothing wrong! Please reach out to an adult you trust (mom, dad, teacher, or counselor). You can also call Childhelp National Child Helpline 1-800-422-4453 or emergency 911 / 112. You are never alone 💜';
    }
    if (ageGroup === '8-9') {
      if (lower.includes('swimsuit') || lower.includes('touch') || lower.includes('secret')) {
        return 'Remember, darling: areas under your swimsuit belong only to you! No one has the right to touch them or ask to see them. If someone asks you to keep a secret, tell mom or dad right away. You are so brave! ✨';
      }
      if (lower.includes('tooth') || lower.includes('teeth') || lower.includes('wobbly')) {
        return 'A wobbly tooth is a wonderful sign that you are growing! Baby teeth make room for strong permanent teeth. Put it under your pillow and keep brushing morning and night 🦷';
      }
      return 'Thank you for sharing with me, sweetie! I am always here to support you. What else would you like to know? 🌸';
    }
    if (lower.includes('breast') || lower.includes('nipple') || lower.includes('grow')) {
      return 'That is completely normal, beautiful! During puberty, one breast almost always grows a little faster than the other. Over time they even out, and wearing a soft wirefree bralette can help you feel comfortable 🌸';
    }
    if (lower.includes('period') || lower.includes('menstruat') || lower.includes('blood') || lower.includes('pad')) {
      return 'Your first period is a natural and healthy part of growing up. Always keep a small pouch with a pad in your school bag. If you have questions, ask me anytime, I am right here for you 🌸';
    }
    if (lower.includes('stomach') || lower.includes('belly') || lower.includes('cramp')) {
      return 'Mild cramps in your lower tummy happen to many girls. A warm heating pad, chamomile tea, and resting curled up can really soothe them. If the pain is sharp, always let mom know 🫂';
    }
    return 'I am listening closely and so happy you trust me 🌸 Growing up can feel exciting and new, but you are doing wonderfully. Feel free to ask me anything about your body or feelings!';
  }

  // Safety trigger 1: Severe pain / Medical urgency
  if (lower.includes('очень болит') || lower.includes('невыносим') || lower.includes('скорая') || lower.includes('рвота') || lower.includes('температур') || lower.includes('сильно болит')) {
    return ageGroup === '8-9'
      ? 'Солнышко, когда что-то сильно болит — сразу же позови маму, папу или учительницу! Они дадут тебе нужное лекарство или позовут доброго доктора. Не терпи боль в одиночку, взрослые обязательно помогут 🫂'
      : 'Милая, если боль очень сильная и не проходит, пожалуйста, не терпи её в одиночку! Обязательно скажи маме, папе или школьной медсестре прямо сейчас — они дадут нужное лекарство или помогут показаться врачу. Я всегда рядом, но твоё здоровье сейчас на первом месте 🫂';
  }

  // Safety trigger 2: Abuse / Violence / Bullying / Distress
  if (lower.includes('бьют') || lower.includes('обижают') || lower.includes('трогает') || lower.includes('насили') || lower.includes('умереть') || lower.includes('страшно жить') || lower.includes('ненавижу себя')) {
    return ageGroup === '8-9'
      ? 'Ты в полной безопасности со мной, и ты ни в чем-ни в чем не виновата! Если кто-то обижает или трогает тебя — немедленно расскажи маме, папе или любимой учительнице. Ты самая смелая девочка, и взрослые обязательно защитят тебя 🌸'
      : 'Ты в безопасности со мной, и ты ни в чем не виновата! Пожалуйста, обязательно поделись этим с взрослым, которому доверяешь (мамой, учительницей или школьным психологом). Также есть бесплатный анонимный телефон доверия для детей 8-800-2000-122. Ты очень смелая и не одна 💜';
  }

  // Age 8-9 specific topics
  if (ageGroup === '8-9') {
    if (lower.includes('купальник') || lower.includes('прикосновен') || lower.includes('секрет')) {
      return 'Запомни, милая: места под купальником принадлежат только тебе! Никто не может просить показать их. А если кто-то просит хранить «секрет» о прикосновениях — сразу беги к маме или папе. Ты умница! ✨';
    }
    if (lower.includes('зуб') || lower.includes('молочн')) {
      return 'Шатающийся зубик — это верный знак, что ты растешь! Молочный зуб уступает место новому, крепкому постоянному зубу. Положи выпавший зубик под подушку и чисти зубки утром и вечером 🦷';
    }
    if (lower.includes('темнот') || lower.includes('страш') || lower.includes('боюсь')) {
      return 'Бояться — это абсолютно нормально, даже взрослые иногда боятся! Попроси маму включить ночник и оставить дверь открытой. Обними мягкую игрушку — она будет охранять твои сны 🧸';
    }
    if (lower.includes('подруг') || lower.includes('поссорил') || lower.includes('дразн') || lower.includes('школ')) {
      return 'Обижаться очень грустно, солнышко. Если подружка дразнит, скажи спокойно и твердо: «Мне не нравится, перестань!». А если поссорились — попробуй сказать: «Давай играть дружно, я соскучилась». Дружба сильнее ссор 💜';
    }
    if (lower.includes('руки') || lower.includes('мыл') || lower.includes('гигиен') || lower.includes('ванн')) {
      return 'Мыло и теплая водичка смывают невидимых микробов! Мой ручки и напевай про себя песенку 20 секунд перед едой и после прогулки. Это твоя настоящая суперсила чистоты 🧼';
    }
    if (lower.includes('рост') || lower.includes('вырасту') || lower.includes('маленьк')) {
      return 'Твое тело растет прямо сейчас, особенно когда ты крепко спишь ночью! Кушай вкусные фрукты, пей воду и ложись спать вовремя — и будешь сильной и здоровой 🌸';
    }
    return 'Спасибо, что поделилась со мной, солнышко! Я всегда рядом, чтобы поддержать тебя и ответить на любой секрет. О чем еще ты хочешь узнать? 🌸';
  }

  // Puberty / Health / Emotions for 10-15+
  if (lower.includes('грудь') || lower.includes('сосок') || lower.includes('размер')) {
    return 'Это абсолютно нормально, милая! В период взросления одна грудь почти всегда растет чуть быстрее другой, и они могут быть разной формы. Со временем разница сгладится, а пока носи удобный мягкий топ без косточек 🌸';
  }
  if (lower.includes('сказать маме') || lower.includes('родител') || lower.includes('как сказать')) {
    return 'Понимаю твое волнение, но мамы через это проходили и точно поймут! Можно просто подойти или даже отправить сообщение: «Мам, кажется, у меня начались первые месячные, помоги мне выбрать прокладки». Мама обязательно поддержит 💜';
  }
  if (lower.includes('болит живот') || lower.includes('низ живот') || lower.includes('тянет')) {
    return 'Тянущие ощущения внизу живота бывают у многих из-за работы мышц матки. Попробуй лечь, свернувшись калачиком, положить на животик теплую грелку и выпить ромашковый чай. Если боль усилится — скажи маме 🫂';
  }
  if (lower.includes('когда начнут') || lower.includes('первые месячн') || lower.includes('возраст') || lower.includes('во сколько')) {
    return 'Обычно первые месячные приходят в возрасте от 11 до 14 лет, но норма — от 9 до 16! Твой организм сам выберет идеальное время, ориентируясь на генетику и вес. Главное — не переживай, всё идет своим чередом ✨';
  }
  if (lower.includes('прыщ') || lower.includes('кожа') || lower.includes('лицо')) {
    return 'В пубертате сальные железы работают активнее из-за гормонов. Умывайся мягкой пенкой дважды в день, не выдавливай прыщики и пей чистую воду. Твоя кожа прекрасна, это временный этап взросления! 🌿';
  }
  if (lower.includes('пмс') || lower.includes('злюсь') || lower.includes('плачу') || lower.includes('настроени')) {
    return 'Твои эмоции сейчас проживают бурю из-за гормонов, и это не твоя вина! Позволь себе погрустить или побыть в тишине, порисуй или послушай любимую музыку. Ты не одна, это пройдет 💜';
  }

  // General conversational empathetic reply
  return 'Я тебя внимательно слушаю и очень ценю, что ты доверилась мне 🌸 Взрослеть бывает волнительно, но ты прекрасно справляешься. Задай мне любой вопрос о теле, настроении или отношениях — я с радостью отвечу!';
};

// Send message to LLM or fallback cleanly
export const callAIChat = async ({
  userMessage,
  chatMessages = [],
  ageGroup = '13-15',
  selectedLang = 'ru-RU',
  isParentMode = false,
  onStatusChange
}) => {
  const config = getStoredAIConfig();

  // Dynamically determine effective language from current message
  const detectedCode = detectLanguage(userMessage);
  const effectiveLang = (detectedCode && LANG_VOICE_MAP[detectedCode]) || selectedLang || 'ru-RU';
  const systemPrompt = isParentMode
    ? buildParentSystemPrompt(ageGroup, effectiveLang)
    : buildSystemPrompt(ageGroup, effectiveLang);

  // If user is completely offline according to browser, go straight to fallback
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    if (onStatusChange) onStatusChange({ isOnline: false, mode: 'offline-navigator' });
    return {
      text: isParentMode
        ? generateParentLocalFallbackReply(userMessage, ageGroup, effectiveLang)
        : generateLocalFallbackReply(userMessage, ageGroup, chatMessages, effectiveLang),
      isAIGenerated: false,
      modelUsed: 'offline',
      detectedLang: detectedCode || null
    };
  }

  // 1. Check Gemini Provider
  if (config.provider === 'gemini' && config.geminiKey) {
    try {
      if (onStatusChange) onStatusChange({ isOnline: true, mode: 'calling-gemini' });

      // Build conversation turns (last 6 messages for context)
      const turns = [];
      const recent = chatMessages.slice(-6);
      for (const msg of recent) {
        if (msg.id === 'welcome-msg') continue;
        const role = msg.sender === 'user' ? 'user' : 'model';
        // Avoid consecutive identical roles in Gemini
        if (turns.length > 0 && turns[turns.length - 1].role === role) {
          turns[turns.length - 1].parts[0].text += '\n' + msg.text;
        } else {
          turns.push({
            role,
            parts: [{ text: msg.text }]
          });
        }
      }
      // Gemini requires first turn to be 'user'
      while (turns.length > 0 && turns[0].role !== 'user') {
        turns.shift();
      }
      // Add current user message
      turns.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: turns,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300
          }
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        console.warn('Gemini API call failed with status:', response.status, errData);
        throw new Error(errData?.error?.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (candidateText && candidateText.trim()) {
        if (onStatusChange) onStatusChange({ isOnline: true, mode: 'gemini-success' });
        return {
          text: candidateText.trim(),
          isAIGenerated: true,
          modelUsed: 'gemini-1.5-flash',
          detectedLang: detectedCode || null
        };
      }
    } catch (e) {
      console.warn('Gemini request failed, falling back to local engine:', e.message);
      if (onStatusChange) onStatusChange({ isOnline: false, mode: 'gemini-fallback', error: e.message });
    }
  }

  // 2. Check OpenAI-compatible Provider (Direct with user key OR Secure Serverless Proxy)
  if (config.provider === 'openai') {
    const messages = [{ role: 'system', content: systemPrompt }];
    for (const msg of chatMessages.slice(-6)) {
      if (msg.id === 'welcome-msg') continue;
      messages.push({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      });
    }
    messages.push({ role: 'user', content: userMessage });

    try {
      if (onStatusChange) onStatusChange({ isOnline: true, mode: 'calling-openai' });

      const useDirect = Boolean(config.openaiKey);
      const endpoint = useDirect
        ? (config.customEndpoint || 'https://api.openai.com/v1/chat/completions')
        : `${PROXY_BASE}/api/chat`;

      const headers = { 'Content-Type': 'application/json' };
      if (useDirect) {
        headers['Authorization'] = `Bearer ${config.openaiKey}`;
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI HTTP ${response.status}`);
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content;
      if (reply && reply.trim()) {
        if (onStatusChange) onStatusChange({ isOnline: true, mode: 'openai-success' });
        return {
          text: reply.trim(),
          isAIGenerated: true,
          modelUsed: useDirect ? 'gpt-4o-mini' : 'gpt-4o-mini-proxy',
          detectedLang: detectedCode || null
        };
      }
    } catch (e) {
      console.warn('OpenAI request failed, falling back:', e.message);
      if (onStatusChange) onStatusChange({ isOnline: false, mode: 'openai-fallback', error: e.message });
    }
  }

  // 3. Fallback: Intelligent Local Rules Engine
  if (onStatusChange) onStatusChange({ isOnline: false, mode: 'local' });
  return {
    text: generateLocalFallbackReply(userMessage, ageGroup, chatMessages, effectiveLang),
    isAIGenerated: false,
    modelUsed: 'local-knowledge-base',
    detectedLang: detectedCode || null
  };
};
