// Intelligent Multilingual Language Detector for SisterHood ("Big Sister")
// Detects child's language dynamically from text or speech transcript:
// Ukrainian (uk), Polish (pl), English (en), Russian (ru), Belarusian (be), Kazakh (kk)

export const SUPPORTED_LANG_CODES = ['uk', 'pl', 'en', 'ru'];

export const LANG_VOICE_MAP = {
  uk: 'uk-UA',
  pl: 'pl-PL',
  en: 'en-US',
  ru: 'ru-RU',
  be: 'be-BY',
  kk: 'kk-KZ'
};

export const LANG_META = {
  uk: { label: 'Українська', flag: '🇺🇦', voice: 'uk-UA', switchNotice: '🌸 Переключено на українську мову' },
  pl: { label: 'Polski', flag: '🇵🇱', voice: 'pl-PL', switchNotice: '🌸 Przełączono na język polski' },
  en: { label: 'English', flag: '✨', voice: 'en-US', switchNotice: '🌸 Switched to English' },
  ru: { label: 'Русский', flag: '🌸', voice: 'ru-RU', switchNotice: '🌸 Переключено на русский язык' },
  be: { label: 'Беларуская', flag: '🌾', voice: 'be-BY', switchNotice: '🌸 Пераключана на беларускую мову' },
  kk: { label: 'Қазақша', flag: '☀️', voice: 'kk-KZ', switchNotice: '🌸 Қазақ тіліне ауыстырылды' }
};

// Word dictionaries for high-precision recognition
const UKRAINIAN_WORDS = new Set([
  'привіт', 'вітаю', 'дякую', 'будь', 'ласка', 'чому', 'мені', 'болить',
  'живіт', 'місячні', 'менструація', 'тіло', 'дівчатка', 'дівчинка', 'груди',
  'що', 'як', 'це', 'ти', 'можна', 'підкажи', 'робити', 'буде', 'немає',
  'добре', 'дуже', 'допоможи', 'страшно', 'мама', 'тато', 'хлопець', 'подруга',
  'подружка', 'треба', 'коли', 'перші', 'настрій', 'нормально', 'болі',
  'звідки', 'також', 'скажи', 'хто', 'хочу', 'знати', 'була', 'був', 'такий',
  'така', 'соромно', 'боюсь', 'підкажіть', 'сестричка', 'сестра', 'допомога',
  'видалити', 'очистити', 'зітри', 'підкажи', 'виділення', 'біль', 'зрозуміти',
  'купальник', 'зубки', 'школа', 'вдома'
]);

const POLISH_WORDS = new Set([
  'cześć', 'czesc', 'hej', 'witaj', 'dzień', 'dobry', 'dziękuję', 'dziekuje',
  'proszę', 'prosze', 'dlaczego', 'mnie', 'boli', 'brzuch', 'okres',
  'miesiączka', 'miesiaczka', 'ciało', 'cialo', 'dziewczyna', 'dziewczynka',
  'piersi', 'co', 'jak', 'to', 'czy', 'można', 'mozna', 'pomóż', 'pomoz',
  'zrobić', 'zrobic', 'będzie', 'bedzie', 'bardzo', 'strach', 'pomoc',
  'mama', 'tata', 'chłopak', 'chlopak', 'przyjaciółka', 'przyjaciolka',
  'kiedy', 'pierwszy', 'pierwsza', 'nastrój', 'nastroj', 'wstyd', 'boję', 'boje',
  'powiedzieć', 'powiedziec', 'siostra', 'siostro', 'wyczyść', 'wyczysc', 'pomocy',
  'strój', 'stroj', 'ząb', 'zab', 'szkoła', 'szkola'
]);

const ENGLISH_WORDS = new Set([
  'hello', 'hi', 'hey', 'please', 'thanks', 'thank', 'you', 'why', 'what',
  'how', 'when', 'period', 'periods', 'menstruation', 'stomach', 'belly',
  'hurts', 'hurt', 'pain', 'cramps', 'body', 'girl', 'girls', 'breast',
  'breasts', 'help', 'scared', 'afraid', 'fear', 'friend', 'friends', 'mom',
  'dad', 'growing', 'puberty', 'feel', 'mood', 'normal', 'is', 'can', 'should',
  'sister', 'tell', 'know', 'secret', 'blood', 'bra', 'changes', 'shy',
  'embarrassed', 'clear', 'delete', 'advice', 'teeth', 'tooth', 'quarrel'
]);

const RUSSIAN_WORDS = new Set([
  'привет', 'здравствуй', 'здравствуйте', 'спасибо', 'пожалуйста', 'почему',
  'мне', 'болит', 'живот', 'месячные', 'менструация', 'тело', 'девочка',
  'девочки', 'грудь', 'что', 'как', 'это', 'ты', 'можно', 'подскажи',
  'делать', 'будет', 'нет', 'хорошо', 'очень', 'помоги', 'страшно', 'мама',
  'папа', 'подруга', 'подружка', 'настроение', 'нормально', 'боли', 'скажи',
  'боюсь', 'стыдно', 'первые', 'когда', 'сестра', 'сестренка', 'очистить',
  'помощь', 'удалить', 'купальник', 'зубки', 'школа'
]);

/**
 * Detect language of user text
 * Returns 'uk' | 'pl' | 'en' | 'ru' | 'be' | 'kk' or null if unsure
 */
export const detectLanguage = (text) => {
  if (!text || typeof text !== 'string') return null;
  const trimmed = text.trim();
  if (trimmed.length < 2) return null;

  const lower = trimmed.toLowerCase();

  // 1. Strict Alphabet/Diacritic Markers
  // Ukrainian: і, ї, є, ґ, or apostrophe inside word (м'язи, п'ять, зв'язок)
  const hasUkrainianChars = /[іїєґ]/i.test(lower) || /[\u0400-\u04FF]['’ʼ][\u0400-\u04FF]/i.test(lower);
  // Polish: ą, ć, ę, ł, ń, ó, ś, ź, ż
  const hasPolishChars = /[ąćęłńóśźż]/i.test(lower);
  // Russian: ы, э, ъ, ё
  const hasRussianChars = /[ыэъё]/i.test(lower);
  // Belarusian: ў
  const hasBelarusianChars = /[ў]/i.test(lower);
  // Kazakh: ә, ғ, қ, ң, ө, ұ, ү, һ
  const hasKazakhChars = /[әғқңөұүһ]/i.test(lower);

  if (hasUkrainianChars && !hasRussianChars) return 'uk';
  if (hasPolishChars) return 'pl';
  if (hasBelarusianChars) return 'be';
  if (hasKazakhChars) return 'kk';
  if (hasRussianChars && !hasUkrainianChars) return 'ru';

  // 2. Tokenized Word Matching
  const cleanTokens = lower
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'«»—–]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  let ukScore = 0;
  let plScore = 0;
  let enScore = 0;
  let ruScore = 0;

  for (const token of cleanTokens) {
    if (UKRAINIAN_WORDS.has(token)) ukScore += 3;
    if (POLISH_WORDS.has(token)) plScore += 3;
    if (ENGLISH_WORDS.has(token)) enScore += 3;
    if (RUSSIAN_WORDS.has(token)) ruScore += 3;

    // Substring stem heuristics
    if (token.startsWith('місяч') || token.startsWith('болит') || token.startsWith('привіт') || token.startsWith('дівчат')) ukScore += 2;
    if (token.startsWith('miesią') || token.startsWith('czesc') || token.startsWith('cześć') || token.startsWith('dziewczyn')) plScore += 2;
    if (token.startsWith('period') || token.startsWith('stomach') || token.startsWith('cramp') || token.startsWith('grow')) enScore += 2;
    if (token.startsWith('месяч') || token.startsWith('болит') || token.startsWith('привет') || token.startsWith('девочк')) ruScore += 2;
  }

  // 3. Script analysis
  const isCyrillic = /[\u0400-\u04FF]/.test(lower);
  const isLatin = /[a-zA-Z]/.test(lower);

  if (isLatin && !isCyrillic) {
    // If has Polish digraphs (sz, cz, rz, ch, dz, dż, dź)
    if (/(sz|cz|rz|dz|ch)/i.test(lower) && plScore >= enScore) return 'pl';
    if (plScore > enScore) return 'pl';
    if (enScore > 0 || cleanTokens.length > 0) return 'en';
  }

  if (isCyrillic) {
    if (ukScore > ruScore) return 'uk';
    if (ruScore > ukScore) return 'ru';
    if (hasUkrainianChars) return 'uk';
    if (hasRussianChars) return 'ru';
  }

  return null;
};

/**
 * Detect language code formatted for Voice Synthesis (e.g. 'uk-UA', 'pl-PL', 'en-US', 'ru-RU')
 */
export const detectVoiceLangCode = (text, fallback = 'ru-RU') => {
  const detected = detectLanguage(text);
  if (detected && LANG_VOICE_MAP[detected]) {
    return LANG_VOICE_MAP[detected];
  }
  return fallback;
};
