// Localized micro-learning stories, quizzes, myths and icebreakers for Russian and Polish
import { STORIES_DATA, DAILY_MYTHS_BY_AGE, ICE_BREAKER_PROMPTS_BY_AGE } from './mockData.js';

export const STORIES_DATA_PL = [
  // ---------------- 5-7 YEARS STORIES (PL) ----------------
  {
    id: 'body-boss-5',
    targetAges: ['5-7'],
    categoryId: 'safety',
    categoryTitle: 'Moje ciało — tylko moje',
    categoryIcon: 'Shield',
    categoryColor: 'mint',
    title: 'Zasada bielizny: moje ciało należy do mnie!',
    subtitle: 'Jak chronić granice i odróżniać dobre tajemnice od złych',
    readTime: '2 min',
    slidesCount: 5,
    badge: 'Dla 5–7 lat',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Ty rządzisz swoim ciałem! 🛡️',
        subtitle: 'Prosta i ważna zasada dla odważnych dziewczynek',
        illustration: 'shield-heart',
        text: 'Od czubka głowy aż po palce u stóp Twoje ciało należy wyłącznie do Ciebie. Nikt nie ma prawa dotykać Cię, gdy tego nie chcesz!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Zasada bielizny',
        text: 'Miejsca zakryte majteczkami i koszulką to Twoje prywatne części ciała. Nie pokazujemy ich obcym. Może pomóc przy nich tylko mama, tata (przy kąpieli) lub lekarz w obecności rodzica.',
        highlight: 'Pod bielizną — tylko Twoja strefa',
        illustration: 'swimsuit',
        tip: 'Jeśli ktoś prosi o pokazanie prywatnych miejsc — powiedz głośno «NIE!» i biegnij do mamy lub taty.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Dobre i złe tajemnice',
        text: 'Dobra tajemnica to niespodzianka na urodziny, która cieszy. Zła tajemnica to taka, która budzi strach albo każe milczeć. Złych tajemnic NIE wolno ukrywać!',
        highlight: 'Złą tajemnicę zawsze powiedz rodzicom!',
        illustration: 'open-lock',
        tip: 'Mama i tata nigdy nie będą na Ciebie źli za opowiedzenie niepokojącej tajemnicy.'
      },
      {
        id: 4,
        type: 'quiz',
        title: 'Mini-gra',
        question: 'Prawda czy Mit: Jeśli ktoś nieprzyjemnie Cię łaskocze lub przytula, musisz wytrzymać, żeby być grzeczną?',
        options: [
          { text: 'Prawda, trzeba milczeć', isCorrect: false },
          { text: 'Mit! Możesz powiedzieć «Stop, nie lubię tego!»', isCorrect: true }
        ],
        explanation: 'Mit! Zawsze możesz powiedzieć «Stop!» albo «Nie chcę się teraz przytulać». Twoje «NIE» jest bardzo ważne!'
      },
      {
        id: 5,
        type: 'completion',
        title: 'Jesteś super dzielna! 🌟',
        text: 'Znasz już Zasadę bielizny i potrafisz dbać o swoje bezpieczeństwo!',
        promptContext: 'Opowiedz prosto o dobrych i złych tajemnicach',
        ctaText: 'Zapytaj starszą siostrę'
      }
    ]
  },
  {
    id: 'clean-superhero-5',
    targetAges: ['5-7'],
    categoryId: 'hygiene',
    categoryTitle: 'Czystość i troska',
    categoryIcon: 'Sparkles',
    categoryColor: 'peach',
    title: 'Sekrety czystości superbohaterki',
    subtitle: 'Jak myć rączki, podmywać się i dbać o siebie każdego dnia',
    readTime: '2 min',
    slidesCount: 5,
    badge: 'Dla 5–7 lat',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Dbanie o ciało to supermoc! ✨',
        subtitle: 'Proste nawyki na każdy dzień',
        illustration: 'shield-heart',
        text: 'Każdego dnia Twoje ciało biega, skacze i odkrywa świat. Zobacz, jak pomagać mu być czystym i zdrowym!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Czyste rączki i świeża bielizna',
        text: 'Po spacerze, toalecie i przed jedzeniem zmywamy niewidoczne bakterie wodą z mydłem. A każdego ranka zakładamy świeże, bawełniane majteczki.',
        highlight: 'Świeże majteczki każdego dnia!',
        illustration: 'swimsuit',
        tip: 'Myj rączki przez około 20 sekund — tyle, ile trwa krótka piosenka.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Złoty kierunek: od przodu do tyłu',
        text: 'Gdy myjesz się pod prysznicem lub wycierasz w toalecie, zawsze rób to od brzuszka w stronę pleców (od przodu do tyłu). Tak chronisz swoje zdrowie przed bakteriami.',
        highlight: 'Zawsze od przodu do tyłu 🌿',
        illustration: 'open-lock',
        tip: 'Do podmywania wystarczy ciepła czysta woda — zwykłe mydło może szczypać delikatną skórę.'
      },
      {
        id: 4,
        type: 'quiz',
        title: 'Mini-gra',
        question: 'Prawda czy Mit: Podmywamy się i wycieramy zawsze od przodu do tyłu?',
        options: [
          { text: 'Prawda! To chroni ciało przed bakteriami', isCorrect: true },
          { text: 'Mit, kierunek nie ma znaczenia', isCorrect: false }
        ],
        explanation: 'Prawda! Kierunek od przodu do tyłu to najważniejszy zdrowy nawyk każdej dziewczynki.'
      },
      {
        id: 5,
        type: 'completion',
        title: 'Superbohaterka czystości! 🫧',
        text: 'Twoje ciało dziękuje Ci za tak cudowną opiekę!',
        promptContext: 'Jak dbać o czystość każdego dnia?',
        ctaText: 'Porozmawiaj z siostrą'
      }
    ]
  },
  {
    id: 'big-feelings-5',
    targetAges: ['5-7'],
    categoryId: 'emotions',
    categoryTitle: 'Moje uczucia',
    categoryIcon: 'Heart',
    categoryColor: 'lavender',
    title: 'Wielkie uczucia: złość, strach i odwaga',
    subtitle: 'Dlaczego wszystkie emocje są ważne i jak uspokoić się w 3 oddechy',
    readTime: '2 min',
    slidesCount: 5,
    badge: 'Dla 5–7 lat',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Wszystkie Twoje uczucia są OK! 💜',
        subtitle: 'Możesz się cieszyć, smucić, a nawet złościć',
        illustration: 'shield-heart',
        text: 'Czasem w środku świeci słońce, a czasem przychodzi chmurka. Złość, smutek czy strach nie są niczym złym!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Oddech «Kwiatek i świeczka»',
        text: 'Gdy jest Ci smutno lub strasznie, powoli powąchaj wyimaginowany kwiatek noskiem, a potem delikatnie zdmuchnij świeczkę ustami. Powtórz 3 razy — serduszko się uspokoi.',
        highlight: 'Wdech — kwiatek, wydech — świeczka 🌸',
        illustration: 'loud-voice',
        tip: 'Możesz też przytulić ulubionego misia albo poprosić mamę lub tatę o przytulenie.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Proszenie o pomoc to odwaga',
        text: 'Jeśli ktoś sprawił Ci przykrość w przedszkolu lub szkole, albo przyśnił się zły sen — powiedzenie o tym dorosłemu to prawdziwa odwaga!',
        highlight: 'Nie jesteś sama, zawsze masz wsparcie',
        illustration: 'open-lock',
        tip: 'Wybierz 3 zaufanych dorosłych, którym zawsze możesz wszystko powiedzieć.'
      },
      {
        id: 4,
        type: 'quiz',
        title: 'Mini-gra',
        question: 'Prawda czy Mit: Grzeczne dziewczynki nigdy nie płaczą i nie złoszczą się?',
        options: [
          { text: 'Prawda, nie wolno płakać', isCorrect: false },
          { text: 'Mit! Każdy człowiek czasem płacze i czuje złość', isCorrect: true }
        ],
        explanation: 'Mit! Nawet dorośli czasem płaczą lub się złoszczą. Ważne, by nikogo nie krzywdzić i mówić o swoich uczuciach.'
      },
      {
        id: 5,
        type: 'completion',
        title: 'Jesteś bardzo odważna! 🌈',
        text: 'Potrafisz już rozpoznawać swoje emocje i spokojnie oddychać!',
        promptContext: 'Trochę się boję albo jest mi smutno, pomóż mi się uspokoić',
        ctaText: 'Porozmawiaj z siostrą'
      }
    ]
  },

  // ---------------- 8-9 YEARS STORIES (PL) ----------------
  {
    id: 'swimsuit-rule-8',
    targetAges: ['8-9'],
    categoryId: 'safety',
    categoryTitle: 'Moje ciało — mój dom',
    categoryIcon: 'Shield',
    categoryColor: 'mint',
    title: 'Zasada stroju kąpielowego i granice',
    subtitle: 'Dlaczego strefy intymne należą tylko do Ciebie',
    readTime: '2 min',
    slidesCount: 6,
    badge: 'Dla 8–9 lat',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Twoje ciało — Twój największy skarb',
        subtitle: 'Poznaj najważniejszą zasadę bezpieczeństwa i spokoju',
        illustration: 'shield-heart',
        text: 'Rośniesz, biegasz, bawisz się i odkrywasz świat. Zapamiętaj najważniejsze: Twoje ciało należy wyłącznie do Ciebie i nikt nie ma prawa sprawiać, że czujesz się niekomfortowo.'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Czym jest «Zasada stroju kąpielowego»?',
        text: 'Wyobraź sobie swój ulubiony strój kąpielowy. Miejsca, które zakrywa (klatka piersiowa, strefa między nóżkami i pupa), nazywają się strefami intymnymi. To Twoja prywatna strefa.',
        highlight: 'Miejsca intymne to sekretna strefa',
        illustration: 'swimsuit',
        tip: 'Mogą ich dotykać tylko rodzice (aby pomóc w kąpieli) lub lekarz (w obecności mamy lub taty).'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Dobre i złe tajemnice',
        text: 'Dobra tajemnica to prezent-niespodzianka na urodziny. Jeśli ktoś prosi, aby nikomu nie mówić o nieprzyjemnym dotyku — to jest «zła tajemnica». O złych tajemnicach ZAWSZE powiedz mamie lub tacie!',
        highlight: 'Nie milcz o złych tajemnicach!',
        illustration: 'open-lock',
        tip: 'Rodzice nigdy nie będą na Ciebie zli za taką rozmowę.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Twoje głośne i odważne «NIE!»',
        text: 'Jeśli ktoś mocno Cię przytula, łaskocze lub dotyka, a Ty tego nie chcesz — masz pełne prawo powiedzieć: «To nieprzyjemne, przestań!». Nawet jeśli to znajomy dorosły czy starszy brat.',
        highlight: 'Słowo «NIE» Cię chroni',
        illustration: 'loud-voice',
        tip: 'Nie musisz być grzeczna i znosić czegoś, co sprawia Ci przykrość.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Interaktywny quiz',
        question: 'Prawda czy Mit: Trzeba znosić nieprzyjemne łaskotki lub uściski, żeby nikogo nie urazić?',
        options: [
          { text: 'Prawda, trzeba milczeć i cierpieć', isCorrect: false },
          { text: 'Mit, masz prawo powiedzieć «Przestań, nie podoba mi się to»', isCorrect: true }
        ],
        explanation: 'Mit! Twoje ciało należy tylko do Ciebie. Zawsze możesz odejść lub spokojnie powiedzieć: «Nie chcę, żebyś mnie łaskotał». To całkowicie w porządku!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Jesteś odważna i bezpieczna! 🛡️',
        text: 'Znasz już zasadę stroju kąpielowego. To Ty rządzisz swoim ciałem!',
        promptContext: 'Co to jest zasada stroju kąpielowego i jak powiedzieć, gdy czuję się nieswojo?',
        ctaText: 'Masz pytania o bezpieczeństwo? Zapytaj siostrę'
      }
    ]
  },
  {
    id: 'growing-teeth-8',
    targetAges: ['8-9'],
    categoryId: 'body',
    categoryTitle: 'Jak rośniemy',
    categoryIcon: 'Sparkles',
    categoryColor: 'peach',
    title: 'Dlaczego wypadają zęby i rośnie stopa',
    subtitle: 'Dokąd znikają zęby mleczne i dlaczego rośniemy we śnie',
    readTime: '2 min',
    slidesCount: 6,
    badge: 'Dla 8–9 lat',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Magia Twojego wzrostu',
        subtitle: 'Ząbki, nóżki, sen i nowe rekordy',
        illustration: 'sprout',
        text: 'Zauważyłaś, że buciki dobre wiosną, jesienią już cisną? Twój organizm właśnie teraz buduje nowe centymetry wzrostu!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Dokąd odchodzą zęby mleczne?',
        text: 'Zęby mleczne to tymczasowi pomocnicy. Kiedy szczęka rośnie, pod nimi pojawiają się mocne i stałe zęby. Wypychają mleczaki, by zająć swoje dorosłe miejsce!',
        highlight: 'Zęby stałe będą z Tobą przez całe życie',
        illustration: 'tooth-sparkle',
        tip: 'Szczotkuj nowe ząbki rano i wieczorem przez 2 minuty, nucąc ulubioną piosenkę.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Sekret: rośniemy głównie we śnie!',
        text: 'W ciągu dnia biegasz i uczysz się, a w nocy, gdy zasypiasz, włącza się specjalny «hormon wzrostu». Wydłuża kości i regeneruje siły.',
        highlight: 'Sen = fabryka wzrostu',
        illustration: 'moon-stars',
        tip: 'Kładź się spać przed 21:30–22:00, aby fabryka wzrostu mogła pracować pełną parą!'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Dlaczego każdy rośnie w innym tempie?',
        text: 'W jednej klasie ktoś jest już wysoki, a ktoś jeszcze drobny. To genetyka! Każde ciało ma swój zegar. Twoje ciało osiągnie swój idealny wzrost.',
        highlight: 'Każdy ma własne tempo rozwoju',
        illustration: 'ladder-steps',
        tip: 'Pij czystą wodę i jedz twaróg, ser oraz jabłka dla mocnych kości.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Interaktywny quiz',
        question: 'Prawda czy Mit: Jeśli nie dosypiamy i siedzimy w telefonie do nocy, ciału trudniej rosnąć?',
        options: [
          { text: 'Mit, sen nie ma wpływu na wzrost', isCorrect: false },
          { text: 'Prawda, ciało rośnie i regeneruje się właśnie podczas snu', isCorrect: true }
        ],
        explanation: 'Prawda! Podczas głębokiego snu mózg wytwarza hormon wzrostu, a pamięć porządkuje wszystko, czego nauczyłaś się w ciągu dnia!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Rośniesz wspaniale! 🌱',
        text: 'Twoje ciało jest mądre i dba o Ciebie w każdej sekundzie.',
        promptContext: 'Dlaczego wypadają zęby mleczne i dlaczego rośniemy we śnie?',
        ctaText: 'Masz pytanie o ciało? Zapytaj starszą siostrę'
      }
    ]
  },
  {
    id: 'emotions-friends-8',
    targetAges: ['8-9'],
    categoryId: 'emotions',
    categoryTitle: 'Moje uczucia',
    categoryIcon: 'Heart',
    categoryColor: 'lavender',
    title: 'Łzy, złość i jak przyjaźnić się bez żalu',
    subtitle: 'Co zrobić, gdy ktoś w szkole sprawił przykrość',
    readTime: '2 min',
    slidesCount: 6,
    badge: 'Dla 8–9 lat',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Wewnątrz nas mieszkają różne emocje',
        subtitle: 'Radość, smutek, złość i strach — dlaczego są potrzebne?',
        illustration: 'rainbow-cloud',
        text: 'Czasami śmiejemy się do łez, a czasami chcemy schować się pod kołdrę. Wszystkie uczucia są normalne, nie ma złych emocji!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Płacz to żaden wstyd!',
        text: 'Łzy to prysznic dla serduszka. W łzach znajdują się substancje zmniejszające stres. Kiedy się wypłaczesz, od razu robi się lżej.',
        highlight: 'Łzy zmywają smutek',
        illustration: 'tear-smile',
        tip: 'Nie ukrywaj łez przed mamą — przytul się, a smutek minie szybciej.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Jak ostudzić «smoka złości»?',
        text: 'Gdy wszystko Cię denerwuje, wykonaj ćwiczenie «Ostudź gorące kakao»: powoli wdychaj nosem zapach czekolady (do 3), a potem powoli dmuchaj na kubek przez usta złożone w rurkę (do 5). Powtórz 3 razy!',
        highlight: 'Wdech przez nos — wydech przez rurkę',
        illustration: 'cocoa-cup',
        tip: 'Złościć się można, ale bić i przezywać — nie wolno.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Jak pogodzić się z przyjaciółką?',
        text: 'Nawet najlepsze przyjaciółki czasami się sprzeczają. Powiedz po prostu: «Zrobiło mi się przykro, ale chcę się z Tobą przyjaźnić. Wymyślmy nowe zasady gry?». Dobre słowa czynią cuda.',
        highlight: 'Rozmawiać zamiast dąsać się',
        illustration: 'hand-hug',
        tip: 'Prawdziwa przyjaźń nie wymaga rezygnowania ze swojego zdania.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Interaktywny quiz',
        question: 'Prawda czy Mit: Dziewczynki muszą się zawsze uśmiechać i nigdy nie mogą się złościć?',
        options: [
          { text: 'Prawda, złość jest brzydka', isCorrect: false },
          { text: 'Mit, każdy człowiek ma prawo do złości, ważne jest rozmawianie o tym', isCorrect: true }
        ],
        explanation: 'Mit! Złość jest naturalna. Ważne, by nie niszczyć rzeczy i nie ranić innych, lecz powiedzieć: «Jestem zła, potrzebuję pięciu minut w spokoju».'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Twoje uczucia są ważne! 💜',
        text: 'Uczenie się rozumienia siebie to prawdziwa supermoc dorastania.',
        promptContext: 'Co zrobić, gdy ktoś mi dokucza w szkole?',
        ctaText: 'Chcesz porozmawiać? Zapytaj siostrę'
      }
    ]
  },
  {
    id: 'hygiene-superpower-8',
    targetAges: ['8-9'],
    categoryId: 'hygiene',
    categoryTitle: 'Super-czystość',
    categoryIcon: 'Sparkles',
    categoryColor: 'mint',
    title: 'Higiena: sekrety czystych dłoni i świeżości',
    subtitle: 'Jak pokonywać niewidzialne zarazki każdego dnia',
    readTime: '2 min',
    slidesCount: 6,
    badge: 'Dla 8–9 lat',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Świat niewidzialnych zarazków',
        subtitle: 'Twoje tajne zasady czystości każdego dnia',
        illustration: 'soap-bubble',
        text: 'Na klamkach, kredkach i huśtawkach żyją miliony bakterii. Ale masz niezawodnych superbohaterów: mydło, wodę i czysty ręcznik!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Zasada piosenki przy umywalce',
        text: 'Myj ręce mydłem przez co najmniej 20 sekund. W tym czasie piana zmywa zarazki. Zaśpiewaj w myślach dwa razy «Sto lat» lub refren ulubionej piosenki!',
        highlight: '20 sekund z pachnącym mydłem',
        illustration: 'hands-wash',
        tip: 'Pamiętaj o myciu przestrzeni między palcami i pod paznokciami.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Majteczki lubią świeżość każdego dnia',
        text: 'Bieliznę należy zmieniać codziennie rano lub wieczorem po kąpieli. Ciało poci się w ciągu dnia, a świeża bawełna chroni skórę przed podrażnieniami.',
        highlight: 'Świeża bielizna — każdego dnia',
        illustration: 'clean-clothes',
        tip: 'Wybieraj majteczki z miękkiej bawełny bez drapiących szwów.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Wieczorny ciepły prysznic',
        text: 'Ciepły prysznic zmywa kurz całego dnia i rozluźnia mięśnie. Po kąpieli tak cudownie się śpi! Podmywamy się ciepłą wodą od przodu do tyłu.',
        highlight: 'Od przodu do tyłu — prosta zasada zdrowia',
        illustration: 'shower-duck',
        tip: 'Wycieraj się własnym, osobnym miękkim ręcznikiem.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Interaktywny quiz',
        question: 'Prawda czy Mit: Jeśli ręce wyglądają na czyste, nie trzeba ich myć przed jedzeniem?',
        options: [
          { text: 'Prawda, skoro nie widać brudu, to jest w porządku', isCorrect: false },
          { text: 'Mit, zarazki są niewidoczne gołym okiem', isCorrect: true }
        ],
        explanation: 'Mit! Bakterie są tak mikroskopijne, że widać je tylko pod mikroskopem. Dlatego mycie rąk przed jedzeniem to podstawa!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Jesteś superbohaterką czystości! 🧼',
        text: 'Dbanie o swoje ciało jest przyjemne i proste!',
        promptContext: 'Jak prawidłowo dbać o siebie każdego dnia?',
        ctaText: 'Masz pytania o higienę? Zapytaj siostrę'
      }
    ]
  },

  // ---------------- 10-12 & 13-15 & 16+ STORIES (PL) ----------------
  {
    id: 'periods-101',
    targetAges: ['10-12', '13-15', '16+'],
    categoryId: 'periods',
    categoryTitle: 'Dni miesiączki',
    categoryIcon: 'Droplet',
    categoryColor: 'peach',
    title: 'Pierwsza miesiączka: przewodnik',
    subtitle: 'Czym jest, ile jest krwi i jak się przygotować',
    readTime: '2 min',
    slidesCount: 6,
    badge: 'Najważniejsze',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Pierwsza miesiączka: spokojny przewodnik',
        subtitle: 'Bez strachu, wstydu i trudnych terminów',
        illustration: 'calendar-bloom',
        text: 'Jeśli zauważyłaś plamkę na bieliźnie — weź głęboki oddech. Wszystko z Tobą w jak najlepszym porządku. Twoje ciało po prostu zaczyna nowy, piękny rozdział.'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Ile tak naprawdę jest krwi?',
        text: 'Wydaje się, że wypływa litr! W rzeczywistości przez całe 3–7 dni organizm traci zaledwie 2–3 łyżki płynu (około 30–50 ml).',
        highlight: 'Tylko 2–3 łyżki stołowe!',
        illustration: 'spoon-drop',
        tip: 'Krew wypływa kroplami i niewielkimi partiami, nie ciągłym strumieniem.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Co nosić w plecaku szkolnym?',
        text: 'Przygotuj swój tajny «zestaw SOS»: małą kosmetyczkę z 2 podpaskami, zapasowymi majtkami i chusteczkami nawilżanymi.',
        highlight: 'Mała kosmetyczka = 100% spokoju',
        illustration: 'pouch-kit',
        tip: 'Gdyby zaczęło się w szkole, śmiało podejdź do pielęgniarki lub poproś koleżankę — to spotyka każdą dziewczynę!'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Higiena: prosta zasada',
        text: 'Zmieniaj podpaskę co 3–4 godziny, nawet jeśli wydzieliny jest niewiele. Podmywaj się ciepłą wodą od przodu do tyłu.',
        highlight: 'Co 3–4 godziny',
        illustration: 'water-sparkle',
        tip: 'Używaj delikatnego płynu do higieny intymnej lub po prostu ciepłej wody.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Interaktywny quiz',
        question: 'Prawda czy Mit: Podczas miesiączki nie wolno uprawiać sportu ani ćwiczyć na WF-ie?',
        options: [
          { text: 'Prawda, trzeba tylko leżeć w łóżku', isCorrect: false },
          { text: 'Mit, lekka aktywność fizyczna wręcz pomaga', isCorrect: true }
        ],
        explanation: 'Mit! Lekki spacer, joga czy rozciąganie rozluźniają mięśnie i łagodzą skurcze brzucha. Jeśli czujesz się słabo — po prostu odpocznij.'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Wspaniale! 🌸',
        text: 'Teraz wiesz to, co najważniejsze. Wiedza przegania każdy lęk.',
        promptContext: 'Mam pytanie o pierwszą miesiączkę: jak się przygotować i co powiedzieć mamie?',
        ctaText: 'Masz pytania o miesiączkę? Zapytaj siostrę'
      }
    ]
  },
  {
    id: 'body-changing',
    targetAges: ['10-12', '13-15', '16+'],
    categoryId: 'body',
    categoryTitle: 'Moje ciało się zmienia',
    categoryIcon: 'Sparkles',
    categoryColor: 'mint',
    title: 'Piersi, wzrost i nowe włoski',
    subtitle: 'Dlaczego ciało rośnie nierównomiernie i to całkowita norma',
    readTime: '2 min',
    slidesCount: 6,
    badge: 'Twoje ciało',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Moje ciało się zmienia: cześć, dojrzewanie!',
        subtitle: 'Piersi, wzrost, włoski i nowe zapachy',
        illustration: 'flower-growth',
        text: 'Twoje ciało jest teraz jak plac budowy: hormony przekształcają je w dorosłe. Dzieje się to skokowo, więc wiele rzeczy może wydawać się niezwykłych.'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Jedna pierś większa od drugiej?',
        text: 'Piersi prawie nigdy nie rosną jednocześnie! Najpierw może pojawić się wrażliwe zgrubienie pod jednym sutkiem, a druga dołączy za kilka miesięcy. To całkowicie normalne.',
        highlight: 'Asymetria to norma w naturze',
        illustration: 'mirror-balance',
        tip: 'Nawet u dorosłych kobiet prawa i lewa pierś nieznacznie się różnią.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Włoski na ciele i zapach potu',
        text: 'Delikatne włoski pod pachami i w okolicach intymnych to naturalna tarcza ochronna skóry. A gruczoły potowe pracują aktywniej. Dezodorant i codzienny prysznic to Twoi przyjaciele.',
        highlight: 'Naturalna bariera ochronna',
        illustration: 'shower-fresh',
        tip: 'Wybieraj łagodne dezodoranty bez alkoholu.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Skoki wzrostu i niezgrabność',
        text: 'Czasami ręce i nogi rosną szybciej niż tułów. Możesz chwilowo potykać się lub zahaczać o rogi mebli. Twój mózg wkrótce przyzwyczai się do nowych wymiarów!',
        highlight: 'Mózg po prostu uczy się nowego wzrostu',
        illustration: 'growing-plant',
        tip: 'Pij dużo wody i śpij co najmniej 8–9 godzin — rośniemy właśnie we śnie.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Interaktywny quiz',
        question: 'Prawda czy Mit: Jeśli koleżankom już rosną piersi, a mnie jeszcze nie — czy coś jest ze mną nie tak?',
        options: [
          { text: 'Prawda, trzeba natychmiast się martwić', isCorrect: false },
          { text: 'Mit, każdy ma swój własny zegar genetyczny', isCorrect: true }
        ],
        explanation: 'Mit! Dojrzewanie zaczyna się u każdego w różnym czasie (między 9 a 15 rokiem życia). Twój organizm zacznie swój proces dokładnie wtedy, kiedy będzie gotowy!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Super! Wiesz o sobie więcej 🌱',
        text: 'Twoje ciało jest wyjątkowe. Nie porównuj się z koleżankami ani zdjęciami w internecie.',
        promptContext: 'Czy to normalne, że jedna pierś rośnie szybciej i boli?',
        ctaText: 'Masz pytanie o ciało? Zapytaj siostrę'
      }
    ]
  },
  {
    id: 'emotions-pms',
    targetAges: ['10-12', '13-15', '16+'],
    categoryId: 'emotions',
    categoryTitle: 'Moje emocje',
    categoryIcon: 'Heart',
    categoryColor: 'lavender',
    title: 'PMS, huśtawki i granice osobiste',
    subtitle: 'Dlaczego czasami chce się płakać lub złościć bez powodu',
    readTime: '2 min',
    slidesCount: 6,
    badge: 'Psychologia',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Emocjonalny rollercoaster',
        subtitle: 'PMS, złość, łzy i stawianie granic',
        illustration: 'storm-rainbow',
        text: 'Dopiero co się śmiałaś — a nagle masz ochotę płakać z powodu upuszczonego długopisu? Hormony estrogen i progesteron kołyszą się jak huśtawka. To całkowicie normalne!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Czym jest PMS?',
        text: 'Zespół Napięcia Przedmiesiączkowego (PMS) zdarza się na kilka dni przed okresem. Możesz czuć zmęczenie, rozdrażnienie lub ochotę na coś słodkiego. To tylko hormony, a nie Twój charakter!',
        highlight: 'PMS mija wraz z rozpoczęciem okresu',
        illustration: 'tea-relax',
        tip: 'Ciepła herbata melisowa i przytulny koc zdziałają cuda.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Mów o swoich uczuciach',
        text: 'Gdy czujesz, że tracisz cierpliwość, powiedz bliskim: «Potrzebuję chwilki dla siebie». Masz prawo do własnej przestrzeni i wyciszenia.',
        highlight: 'Komunikacja to klucz do spokoju',
        illustration: 'heart-bubble',
        tip: 'Nie duś w sobie złości — rysuj, słuchaj muzyki lub pisz w pamiętniku.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Twoje granice osobiste',
        text: 'Nikt nie ma prawa dotykać Cię wbrew Twojej woli ani zmuszać do robienia rzeczy, które budzą wstręt lub lęk. Twoje «NIE» ma ogromną moc i musi być szanowane przez każdego.',
        highlight: 'Twoje granice są święte',
        illustration: 'shield-star',
        tip: 'Prawdziwi przyjaciele szanują Twoje granice.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Interaktywny quiz',
        question: 'Prawda czy Mit: Czy wahania nastroju przed okresem oznaczają, że jesteś niemiłą osobą?',
        options: [
          { text: 'Prawda, to wina charakteru', isCorrect: false },
          { text: 'Mit, to przejściowy wpływ hormonów', isCorrect: true }
        ],
        explanation: 'Mit! Wahania nastroju to czysta biologia. Nie miej do siebie pretensji — bądź dla siebie wyrozumiała i ciepła!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Jesteś silna i mądra! 💜',
        text: 'Zrozumienie własnych emocji to klucz do harmonii i pewności siebie.',
        promptContext: 'Jak radzić sobie ze złością i huśtawkami nastroju przed miesiączką?',
        ctaText: 'Chcesz porozmawiać o emocjach? Zapytaj siostrę'
      }
    ]
  }
];

export const DAILY_MYTHS_BY_AGE_PL = {
  '5-7': [
    {
      id: 'myth-hugs-5-pl',
      dateLabel: 'Mit dnia (5–7 lat)',
      question: 'Czy trzeba przytulać każdego dorosłego, nawet jeśli nie masz na to ochoty?',
      isFact: false,
      shortAnswer: 'To Mit!',
      fullExplanation: 'Twoje ciało należy tylko do Ciebie! Możesz grzecznie pomachać ręką lub przybić piątkę, jeśli nie chcesz się przytulać.',
      actionText: 'Poznaj prawdę'
    },
    {
      id: 'myth-crying-5-pl',
      dateLabel: 'Mit dnia (5–7 lat)',
      question: 'Czy odważne dziewczynki nigdy nie boją się ciemności i nie płaczą?',
      isFact: false,
      shortAnswer: 'To Mit!',
      fullExplanation: 'Strach i łzy są całkowicie normalne! Odwaga to umiejętność powiedzenia mamie lub tacie, gdy czegoś się boisz.',
      actionText: 'Sprawdź siebie'
    },
    {
      id: 'myth-front-back-5-pl',
      dateLabel: 'Fakt dnia (5–7 lat)',
      question: 'Czy mycie rąk mydłem i podmywanie się od przodu do tyłu chroni przed bakteriami?',
      isFact: true,
      shortAnswer: 'To czysta Prawda!',
      fullExplanation: 'Ciepła woda z mydłem zmywa bakterie z rąk, a kierunek od przodu do tyłu każdego dnia chroni Twoje zdrowie!',
      actionText: 'Sprawdź siebie'
    }
  ],
  '8-9': [
    {
      id: 'myth-gum-stomach-8',
      dateLabel: 'Mit dnia (8–9 lat)',
      question: 'Czy to prawda, że jeśli połkniesz gumę do żucia, przyklei się w brzuchu na 7 lat?',
      isFact: false,
      shortAnswer: 'To zabawny Mit!',
      fullExplanation: 'Gumy nie warto połykać, ale w żołądku nie zostaje na lata. Żołądek powoli przesuwa ją dalej i po 1–2 dniach wychodzi naturalnie!',
      actionText: 'Poznaj prawdę'
    },
    {
      id: 'myth-teeth-fall-8',
      dateLabel: 'Mit dnia (8–9 lat)',
      question: 'Czy to prawda, że stałe zęby mogą wyrosnąć po raz drugi, jeśli ich nie myjemy?',
      isFact: false,
      shortAnswer: 'To groźny Mit!',
      fullExplanation: 'Zęby mleczne wypadają tylko raz, a nowe zęby stałe rosną na całe dorosłe życie! Trzeciego zestawu natura nam nie daje, dlatego myjemy je dwa razy dziennie.',
      actionText: 'Obal mit'
    },
    {
      id: 'myth-cry-weakness-8',
      dateLabel: 'Mit dnia (8–9 lat)',
      question: 'Czy to prawda, że jeśli płaczesz z żalu lub bólu, to znaczy, że jesteś beksą i słabeuszem?',
      isFact: false,
      shortAnswer: 'To szkodliwy Mit!',
      fullExplanation: 'Łzy wytwarzają kojące hormony spokoju. Płaczą dorośli, mistrzowie sportu i superbohaterowie. Płacz to sposób na zadbanie o swoje serduszko!',
      actionText: 'Sprawdź się'
    }
  ],
  default: [
    {
      id: 'myth-sweets-acne',
      dateLabel: 'Mit dnia',
      question: 'Czy to prawda, że od czekolady i słodyczy natychmiast pojawiają się pryszcze?',
      isFact: false,
      shortAnswer: 'To Mit!',
      fullExplanation: 'Główną przyczyną trądziku u nastolatków są zmiany hormonalne w gruczołach łojowych i bakterie, a nie tabliczka czekolady. Zdrowa dieta jest dobra, ale czekolada sama w sobie nie jest winna!',
      actionText: 'Sprawdź się'
    },
    {
      id: 'myth-hair-wash',
      dateLabel: 'Mit dnia',
      question: 'Czy to prawda, że podczas okresu nie wolno myć głowy ani brać prysznica?',
      isFact: false,
      shortAnswer: 'To groźny Mit!',
      fullExplanation: 'Mycie się podczas okresu jest nie tylko dozwolone, ale i bardzo potrzebne! Ciepły prysznic rozluźnia mięśnie, przynosi ulgę w bólu i daje świeżość.',
      actionText: 'Poznaj prawdę'
    },
    {
      id: 'myth-tampons-virginity',
      dateLabel: 'Mit dnia',
      question: 'Czy to prawda, że nastolatki kategorycznie nie mogą używać tamponów?',
      isFact: false,
      shortAnswer: 'To Mit!',
      fullExplanation: 'Błona dziewicza jest elastyczna i ma naturalny otwór. Tampony w rozmiarze Mini lub Normal można stosować w każdym wieku, postępując zgodnie z instrukcją i zmieniając co 4–6 godzin.',
      actionText: 'Obal mit'
    }
  ]
};

export const ICE_BREAKER_PROMPTS_BY_AGE_PL = {
  '5-7': [
    {
      text: 'Co to jest zasada bielizny?',
      tag: 'Bezpieczeństwo',
      answer: 'Skarbie, to bardzo proste: miejsca zakryte majteczkami i koszulką należą tylko do Ciebie! Nikt nie ma prawa ich dotykać ani prosić o pokazanie. Jeśli coś Cię niepokoi — od razu powiedz mamie lub tacie 🛡️'
    },
    {
      text: 'Boję się ciemności, pomóż!',
      tag: 'Odwaga',
      answer: 'Strach przed ciemnością jest całkiem normalny! Zróbmy razem 3 spokojne oddechy «kwiatek — świeczka», przytul ulubionego misia i poproś rodziców o przytulną lampkę nocną 🌟'
    },
    {
      text: 'Dlaczego czasem się złoszczę?',
      tag: 'Uczucia',
      answer: 'Złość jest normalna — pokazuje, że coś Ci się nie podobało albo było niesprawiedliwe. Możesz głęboko odetchnąć i powiedzieć słowami: «Jestem teraz zła!» 💜'
    }
  ],
  '8-9': [
    {
      text: 'Co to jest zasada stroju kąpielowego?',
      tag: 'Bezpieczeństwo',
      answer: 'Skarbie, zasada stroju kąpielowego jest bardzo prosta: miejsca, które zakrywa strój kąpielowy to Twoja strefa prywatna! Nikt nie ma prawa prosić Cię o ich pokazanie ani ich dotykać. Jeśli czujesz się nieswojo — powiedz mamie lub tacie 🌸'
    },
    {
      text: 'Dlaczego ruszają mi się i wypadają ząbki?',
      tag: 'Ciało',
      answer: 'Rośniesz, słoneczko! Ząbki mleczne ustępują miejsca stałym zębom, które będą z Tobą przez całe życie. Nie bój się, na miejscu wypadniętego ząbka wkrótce pojawi się nowy, piękny ząb!'
    },
    {
      text: 'Czasami boję się zasypiać w ciemności, co robić?',
      tag: 'Emocje',
      answer: 'Lęk przed ciemnością jest zupełnie normalny nawet u dorosłych! Poproś rodziców o włączenie małej lampki nocnej lub uchylenie drzwi. Przytul ulubionego pluszaka — będzie Twoim dzielnym obrońcą snu 🧸'
    },
    {
      text: 'Jak pogodzić się z przyjaciółką po kłótni?',
      tag: 'Przyjaźń',
      answer: 'Kłótnie zdarzają się nawet najlepszym przyjaciółkom! Podejdź i powiedz: «Zrobiło mi się smutno, ale bardzo Cię lubię. Pobawmy się znowu?». Ciepłe słowa natychmiast topią lody 🫂'
    }
  ],
  '10-12': [
    {
      text: 'Kiedy zaczyna się pierwsza miesiączka?',
      tag: 'Miesiączka',
      answer: 'Pierwsza miesiączka pojawia się najczęściej między 11 a 14 rokiem życia. Sygnałami są: skok wzrostu, powiększanie się piersi i białawy śluz na bieliźnie na około rok przedtem. Ciało samo wybierze idealny moment!'
    },
    {
      text: 'Dlaczego jedna pierś rośnie szybciej niż druga?',
      tag: 'Ciało',
      answer: 'Piersi niemal nigdy nie rosną jednocześnie! Różnica wielkości i delikatna tkliwość pod sutkiem to naturalna cecha dojrzewania. Z czasem ich wielkość się wyrówna.'
    },
    {
      text: 'Co zrobić, jeśli okres zacznie się w szkole?',
      tag: 'Wskazówka SOS',
      answer: 'Bez paniki! Zawsze miej w plecaku małą kosmetyczkę z dwiema podpaskami. Jeśli ich nie masz — idź do pielęgniarki szkolnej lub poproś koleżankę czy nauczycielkę. To całkowicie normalna sytuacja!'
    }
  ],
  '13-15': [
    {
      text: 'Jak zmniejszyć ból brzucha w czasie okresu?',
      tag: 'Zdrowie',
      answer: 'Pomaga ciepły termofor na podbrzusze, herbata z melisy lub rumianku, lekki spacer i odpoczynek. Jeśli ból jest silny — porozmawiaj z mamą, aby dobrać bezpieczny lek przeciwbólowy.'
    },
    {
      text: 'Dlaczego przed okresem wszystko mnie denerwuje?',
      tag: 'PMS',
      answer: 'To PMS — wahania estrogenów i progesteronu. Nie wiń siebie za złość czy łzy. Podaruj sobie więcej snu, ulubiony serial, ciepły koc i ogranicz stres.'
    },
    {
      text: 'Jak powiedzieć «nie», gdy znajomi namawiają do czegoś?',
      tag: 'Granice',
      answer: 'Twoje granice to Twoje prawo. Wystarczy powiedzieć spokojnie i pewnie: «Nie mam na to ochoty» lub «To nie dla mnie». Prawdziwi przyjaciele uszanują Twoje zdanie bez nacisku.'
    }
  ],
  default: [
    {
      text: 'Jak śledzić swój cykl menstruacyjny?',
      tag: 'Cykl',
      answer: 'Zapisuj pierwszy dzień każdego okresu w kalendarzu lub aplikacji. Prawidłowy cykl trwa zazwyczaj od 21 do 35 dni. W pierwszych dwóch latach nieregularność jest normą!'
    },
    {
      text: 'Czy tampony są bezpieczne dla nastolatek?',
      tag: 'Higiena',
      answer: 'Tak, tampony rozmiaru Mini lub Normal są w pełni bezpieczne. Pamiętaj o dokładnym myciu rąk i wymianie co 4–6 godzin.'
    }
  ]
};

// ========================================================
// UKRAINIAN LOCALIZATION (УКРАЇНСЬКА МОВА)
// ========================================================
export const STORIES_DATA_UK = [
  // ---------------- 5-7 YEARS STORIES (UK) ----------------
  {
    id: 'body-boss-5',
    targetAges: ['5-7'],
    categoryId: 'safety',
    categoryTitle: 'Я — господарка тіла',
    categoryIcon: 'Shield',
    categoryColor: 'mint',
    title: 'Правило трусиків: моє тіло — тільки моє!',
    subtitle: 'Як берегти особисті кордони та відрізняти добрі секрети від поганих',
    readTime: '2 хв',
    slidesCount: 5,
    badge: 'Для 5–7 років',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Ти — головна господарка свого тіла! 🛡️',
        subtitle: 'Просте й важливе правило для сміливих дівчаток',
        illustration: 'shield-heart',
        text: 'Від верхівки до п’яточок твоє тіло належить тільки тобі. Ніхто не має права торкатися тебе, якщо тобі це неприємно!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Правило трусиків',
        text: 'Те, що сховано під трусиками й маєчкою, — це твої особисті частини тіла. Їх не показують стороннім і не дозволяють торкатися нікому, крім мами чи тата (коли допомагають помитися) та лікаря в присутності батьків.',
        highlight: 'Під білизною — тільки твоя зона',
        illustration: 'swimsuit',
        tip: 'Якщо хтось просить показати особисті місця — одразу кажи «Ні!» і біжи до мами чи тата.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Добрі та погані секрети',
        text: 'Добрий секрет — це сюрприз на день народження, від якого радісно. А поганий секрет — коли тебе лякають або просять нікому не казати. Погані секрети зберігати НЕ МОЖНА!',
        highlight: 'Поганий секрет — розкажи мамі!',
        illustration: 'open-lock',
        tip: 'Мама і тато ніколи не сваритимуть тебе за тривожний секрет.'
      },
      {
        id: 4,
        type: 'quiz',
        title: 'Міні-гра',
        question: 'Правда чи Міф: Якщо тебе неприємно лоскочуть чи міцно обіймають, треба терпіти, щоб бути чемною?',
        options: [
          { text: 'Правда, треба мовчати', isCorrect: false },
          { text: 'Міф! Можна сказати «Стоп, мені неприємно!»', isCorrect: true }
        ],
        explanation: 'Міф! Ти завжди можеш сказати «Стоп!» або «Я зараз не хочу обійматися». Твоє «Ні» — дуже важливе!'
      },
      {
        id: 5,
        type: 'completion',
        title: 'Ти справжня розумниця! 🌟',
        text: 'Тепер ти знаєш Правило трусиків і вмієш берегти себе!',
        promptContext: 'Розкажи простими словами про добрі та погані секрети',
        ctaText: 'Запитати у сестрички'
      }
    ]
  },
  {
    id: 'clean-superhero-5',
    targetAges: ['5-7'],
    categoryId: 'hygiene',
    categoryTitle: 'Чистота і турбота',
    categoryIcon: 'Sparkles',
    categoryColor: 'peach',
    title: 'Секрети чистоти для супергероїні',
    subtitle: 'Як правильно митися, чистити зубки та піклуватися про себе',
    readTime: '2 хв',
    slidesCount: 5,
    badge: 'Для 5–7 років',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Турбота про тіло — це суперсила! ✨',
        subtitle: 'Прості звички на кожен день',
        illustration: 'shield-heart',
        text: 'Щодня твоє тіло бігає, стрибає і грається. Дізнаймося, як допомагати йому залишатися чистим і здоровим!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Чисті ручки і свіжа білизна',
        text: 'Після прогулянки, туалету та перед їжею ми змиваємо невидимих мікробів водою з милом. А щоранку вдягаємо чисті бавовняні трусики.',
        highlight: 'Свіжі трусики щодня!',
        illustration: 'swimsuit',
        tip: 'Мий ручки близько 20 секунд — поки співається коротка пісенька.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Чарівний напрямок: спереду назад',
        text: 'Коли ти підмиваєшся в душі або витираєшся в туалеті, завжди рухайся від животика до спинки (спереду назад). Так мікроби не потраплять туди, де їм не місце.',
        highlight: 'Завжди спереду назад 🌿',
        illustration: 'open-lock',
        tip: 'Для підмивання достатньо теплої чистої водички — звичайне мило може щипати ніжну шкіру.'
      },
      {
        id: 4,
        type: 'quiz',
        title: 'Міні-гра',
        question: 'Правда чи Міф: Підмиватися та витиратися потрібно завжди спереду назад?',
        options: [
          { text: 'Правда! Так тіло захищене від мікробів', isCorrect: true },
          { text: 'Міф, напрямок не важливий', isCorrect: false }
        ],
        explanation: 'Правда! Рух спереду назад — головна звичка здоров’я для кожної дівчинки.'
      },
      {
        id: 5,
        type: 'completion',
        title: 'Супергероїня чистоти! 🫧',
        text: 'Твоє тіло дякує тобі за таку дбайливу турботу!',
        promptContext: 'Як правильно дбати про чистоту щодня?',
        ctaText: 'Поговорити із сестричкою'
      }
    ]
  },
  {
    id: 'big-feelings-5',
    targetAges: ['5-7'],
    categoryId: 'emotions',
    categoryTitle: 'Мої почуття',
    categoryIcon: 'Heart',
    categoryColor: 'lavender',
    title: 'Великі почуття: злість, страх і сміливість',
    subtitle: 'Чому всі емоції важливі і як заспокоїтися за 3 вдихи',
    readTime: '2 хв',
    slidesCount: 5,
    badge: 'Для 5–7 років',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Усі твої почуття — нормальні! 💜',
        subtitle: 'Радіти, сумувати й навіть злитися — можна',
        illustration: 'shield-heart',
        text: 'Іноді всередині світить сонечко, а іноді приходить хмаринка. Відчувати образу, страх чи злість — зовсім не соромно!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Дихання «Квіточка і свічка»',
        text: 'Коли ти засмутилася чи злякалася, уяви ароматну квіточку: повільно понюхай її носиком, а потім м’яко задуй свічку ротиком. Повтори 3 рази — сердечко заспокоїться.',
        highlight: 'Вдих — квіточка, видих — свічка 🌸',
        illustration: 'loud-voice',
        tip: 'Можна обійняти улюблену іграшку або попросити обіймів у мами й тата.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Просити про допомогу — це сміливість',
        text: 'Якщо тебе хтось образив у садочку чи школі, або наснився страшний сон — розповісти про це дорослому — справжня сміливість!',
        highlight: 'Ти не сама, поруч є захист',
        illustration: 'open-lock',
        tip: 'Обери 3 дорослих, яким ти довіряєш найбільше.'
      },
      {
        id: 4,
        type: 'quiz',
        title: 'Міні-гра',
        question: 'Правда чи Міф: Чемні дівчатка ніколи не зляться і не плачуть?',
        options: [
          { text: 'Правда, плакати не можна', isCorrect: false },
          { text: 'Міф! Усі люди іноді сумують і зляться', isCorrect: true }
        ],
        explanation: 'Міф! І діти, і дорослі іноді зляться та плачуть. Головне — не ображати інших і говорити про свої почуття словами.'
      },
      {
        id: 5,
        type: 'completion',
        title: 'Ти дуже смілива! 🌈',
        text: 'Тепер ти знаєш, як дружити зі своїми почуттями й заспокоюватися!',
        promptContext: 'Мені трохи сумно або страшно, допоможи заспокоїтися',
        ctaText: 'Поговорити із сестричкою'
      }
    ]
  },

  // ---------------- 8-9 YEARS STORIES (UK) ----------------
  {
    id: 'swimsuit-rule-8',
    targetAges: ['8-9'],
    categoryId: 'safety',
    categoryTitle: 'Моє тіло — мій дім',
    categoryIcon: 'Shield',
    categoryColor: 'mint',
    title: 'Правило купальника та особисті кордони',
    subtitle: 'Чому інтимні зони належать лише тобі',
    readTime: '2 хв',
    slidesCount: 6,
    badge: 'Для 8–9 років',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Твоє тіло — твій найбільший скарб',
        subtitle: 'Дізнайся найважливіше правило безпеки та спокою',
        illustration: 'shield-heart',
        text: 'Ти ростеш, бігаєш, граєшся і пізнаєш світ. Запамʼятай найважливіше: твоє тіло належить тільки тобі, і ніхто не має права змушувати тебе почуватися ніяково.'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Що таке «Правило купальника»?',
        text: 'Уяви свій улюблений купальник. Ті місця, які він закриває (груди, зона між ніжками та сіднички), називаються інтимними. Це твоя особиста зона.',
        highlight: 'Інтимні місця — секретна зона',
        illustration: 'swimsuit',
        tip: 'Торкатися їх можуть лише батьки (щоб допомогти помитися) або лікар (у присутності мами чи тата).'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Гарні та погані таємниці',
        text: 'Гарний секрет — це подарунок-сюрприз на день народження. А якщо хтось просить нікому не розповідати про неприємні дотики — це «поганий секрет». Про погані таємниці ЗАВЖДИ потрібно розповісти мамі чи татові!',
        highlight: 'Не мовчи про погані секрети!',
        illustration: 'open-lock',
        tip: 'Батьки ніколи не сваритимуть тебе за таку розмову.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Твоє гучне й сміливе «НІ!»',
        text: 'Якщо тебе хтось міцно обіймає, лоскоче або гладить, а тобі це не подобається — ти маєш повне право сказати: «Мені неприємно, перестань!». Навіть якщо це знайомий дорослий чи старший брат.',
        highlight: 'Слово «НІ» захищає тебе',
        illustration: 'loud-voice',
        tip: 'Ти не повинна бути зручною і терпіти, коли тобі неприємно.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Інтерактивний квіз',
        question: 'Правда чи Міф: Потрібно терпіти неприємне лоскотання чи обійми інших людей, щоб нікого не образити?',
        options: [
          { text: 'Правда, треба мовчати й терпіти', isCorrect: false },
          { text: 'Міф, ти маєш право сказати «Мені неприємно, припини»', isCorrect: true }
        ],
        explanation: 'Міф! Твоє тіло — тільки твоє. Ти завжди можеш відійти або спокійно сказати: «Не треба мене лоскотати, мені так не подобається». І це абсолютно правильно!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Ти смілива й під захистом! 🛡️',
        text: 'Ти знаєш головне правило купальника. Ти господиня свого тіла!',
        promptContext: 'Що таке правило купальника і як сказати, якщо мені неприємно?',
        ctaText: 'Залишилися питання про безпеку? Запитай сестричку'
      }
    ]
  },
  {
    id: 'growing-teeth-8',
    targetAges: ['8-9'],
    categoryId: 'body',
    categoryTitle: 'Як ми ростемо',
    categoryIcon: 'Sparkles',
    categoryColor: 'peach',
    title: 'Чому випадають зубки та росте ніжка',
    subtitle: 'Куди зникають молочні зуби і чому ми ростемо уві сні',
    readTime: '2 хв',
    slidesCount: 6,
    badge: 'Для 8–9 років',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Магія твого зросту',
        subtitle: 'Зубки, ніжки, сон і нові рекорди',
        illustration: 'sprout',
        text: 'Помічала, як черевички, які були впору навесні, восени вже тиснуть? Твій організм просто зараз будує нові сантиметри зросту!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Куди йдуть молочні зубки?',
        text: 'Молочні зубки — тимчасові помічники. Коли щелепа підростає, під ними зʼявляються міцні та постійні зуби. Вони виштовхують молочні, щоб зайняти своє доросле місце!',
        highlight: 'Постійні зуби будуть із тобою все життя',
        illustration: 'tooth-sparkle',
        tip: 'Чисть нові зубки вранці та ввечері по 2 хвилини, наспівуючи улюблену пісеньку.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Секрет: ми ростемо переважно уві сні!',
        text: 'Удень ти бігаєш і вчишся, а вночі, коли засинаєш, у тілі вмикається спеціальний «гормон росту». Він подовжує кісточки та відновлює сили.',
        highlight: 'Сон = фабрика росту',
        illustration: 'moon-stars',
        tip: 'Лягай спати до 21:30–22:00, щоб фабрика росту встигла попрацювати на повну!'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Чому всі ростуть з різною швидкістю?',
        text: 'В одному класі хтось уже високий, а хтось іще маленький. Це генетика! Кожне тіло має свій власний годинник. Твоє тіло досягне свого ідеального зросту.',
        highlight: 'У кожного свій темп розвитку',
        illustration: 'ladder-steps',
        tip: 'Пий чисту воду та їж сир, яблучка й овочі для міцних кісток.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Інтерактивний квіз',
        question: 'Правда чи Міф: Якщо ми недосипаємо і сидимо в телефоні до ночі, організму важче рости?',
        options: [
          { text: 'Міф, сон не впливає на зріст', isCorrect: false },
          { text: 'Правда, тіло росте та відновлюється саме під час сну', isCorrect: true }
        ],
        explanation: 'Правда! Під час глибокого сну виділяється гормон росту, а памʼять упорядковує все, про що ти дізналася за день!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Ти ростеш чудово! 🌱',
        text: 'Твоє тіло розумне і піклується про тебе кожної секунди.',
        promptContext: 'Чому випадають молочні зубки і чому ми ростемо уві сні?',
        ctaText: 'Маєш питання про тіло? Запитай сестричку'
      }
    ]
  },
  {
    id: 'emotions-friends-8',
    targetAges: ['8-9'],
    categoryId: 'emotions',
    categoryTitle: 'Мої почуття',
    categoryIcon: 'Heart',
    categoryColor: 'lavender',
    title: 'Сльози, злість та як дружити без образ',
    subtitle: 'Що робити, якщо образили в школі чи зламалася іграшка',
    readTime: '2 хв',
    slidesCount: 6,
    badge: 'Для 8–9 років',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Всередині нас живуть різні емоції',
        subtitle: 'Радість, сум, злість і страх — чому вони потрібні?',
        illustration: 'rainbow-cloud',
        text: 'Іноді ми сміємося до сліз, а іноді хочеться сховатися під ковдру. Усі почуття природні, немає поганих емоцій!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Плакати — це не соромно!',
        text: 'Сльози — це душ для серденька. У сльозах є речовини, які зменшують стрес. Коли виплачешся, одразу стає легше.',
        highlight: 'Сльози змивають сум',
        illustration: 'tear-smile',
        tip: 'Не ховай сльози від мами — обіймися, і смуток мине швидше.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Як остудити «дракона злості»?',
        text: 'Коли все дратує, зроби вправу «Остуди гаряче какао»: повільно вдихай носиком аромат шоколаду (до 3), а потім повільно дмухай на чашку через губи трубочкою (до 5). Повтори 3 рази!',
        highlight: 'Вдих через носик — видих трубочкою',
        illustration: 'cocoa-cup',
        tip: 'Злитися можна, але битися і обзиватися — ні.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Як помиритися з подружкою?',
        text: 'Навіть найкращі подружки іноді сваряться. Скажи просто: «Мені стало прикро, але я хочу дружити. Придумаймо нові правила гри?». Добрі слова творять дива.',
        highlight: 'Говорити замість ображатися',
        illustration: 'hand-hug',
        tip: 'Справжня дружба не вимагає відмовлятися від своєї думки.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Інтерактивний квіз',
        question: 'Правда чи Міф: Дівчатка повинні завжди посміхатися і ніколи не злитися?',
        options: [
          { text: 'Правда, злість — це негарно', isCorrect: false },
          { text: 'Міф, кожна людина має право відчувати злість, важливо про неї говорити', isCorrect: true }
        ],
        explanation: 'Міф! Злість — це природна реакція. Головне — не ображати інших, а сказати: «Я зараз серджуся, мені потрібна хвилинка спокою».'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Твої почуття важливі! 💜',
        text: 'Вчитися розуміти себе — це справжня суперсила дорослішання.',
        promptContext: 'Що робити, якщо мене ображають у школі або я сильно серджуся?',
        ctaText: 'Хочеш поговорити про почуття? Запитай сестричку'
      }
    ]
  },
  {
    id: 'hygiene-superpower-8',
    targetAges: ['8-9'],
    categoryId: 'hygiene',
    categoryTitle: 'Супер-чистота',
    categoryIcon: 'Sparkles',
    categoryColor: 'mint',
    title: 'Гігієна: секрети чистих долоньок та свіжості',
    subtitle: 'Як перемагати невидимі мікроби щодня',
    readTime: '2 хв',
    slidesCount: 6,
    badge: 'Для 8–9 років',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Світ невидимих мікробів',
        subtitle: 'Твої таємні правила чистоти щодня',
        illustration: 'soap-bubble',
        text: 'На дверних ручках, олівцях і гойдалках живуть мільйони бактерій. Але в тебе є надійні супергерої: мило, вода і чистий рушник!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Правило пісеньки біля умивальника',
        text: 'Мий руки з милом щонайменше 20 секунд. За цей час пінка змиває мікроби. Заспівай подумки два рази пісеньку про день народження або приспів улюбленого треку!',
        highlight: '20 секунд із запашним милом',
        illustration: 'hands-wash',
        tip: 'Не забувай мити між пальчиками та під нігтиками.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Трусики люблять свіжість щодня',
        text: 'Білизну потрібно міняти щодня вранці або ввечері після душу. Тіло пітніє протягом дня, а свіжа бавовна захищає шкіру від подразнень.',
        highlight: 'Свіжа білизна — щодня',
        illustration: 'clean-clothes',
        tip: 'Обирай трусики з мʼякої бавовни без колючих швів.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Вечірній теплий душ',
        text: 'Теплий душ змиває пил усього дня і розслабляє мʼязи. Після нього так солодко спиться! Підмиваємося теплою водою спереду назад.',
        highlight: 'Спереду назад — просте правило здоровʼя',
        illustration: 'shower-duck',
        tip: 'Витирайся власним, окремим мʼяким рушничком.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Інтерактивний квіз',
        question: 'Правда чи Міф: Якщо ручки виглядають чистими, їх не обовʼязково мити перед їжею?',
        options: [
          { text: 'Правда, якщо бруду не видно, то все гаразд', isCorrect: false },
          { text: 'Міф, мікроби невидимі неозброєним оком', isCorrect: true }
        ],
        explanation: 'Міф! Бактерії такі крихітні, що їх видно лише під мікроскопом. Тому мити руки перед їжею — головне правило здоровʼя!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Ти супергеройка чистоти! 🧼',
        text: 'Піклуватися про своє тіло приємно і просто!',
        promptContext: 'Як правильно доглядати за собою щодня?',
        ctaText: 'Маєш питання про гігієну? Запитай сестричку'
      }
    ]
  },

  // ---------------- 10-12 & 13-15 & 16+ STORIES (UK) ----------------
  {
    id: 'periods-101',
    targetAges: ['10-12', '13-15', '16+'],
    categoryId: 'periods',
    categoryTitle: 'Дні місячних',
    categoryIcon: 'Droplet',
    categoryColor: 'peach',
    title: 'Перші місячні: інструкція для сестрички',
    subtitle: 'Що це таке, скільки крові та як підготуватися',
    readTime: '2 хв',
    slidesCount: 6,
    badge: 'Найважливіше',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Перші місячні: спокійна інструкція',
        subtitle: 'Без страху, сорому і складних термінів',
        illustration: 'calendar-bloom',
        text: 'Якщо помітила плямку на білизні — зроби глибокий вдих. Усе з тобою чудово! Твоє тіло просто розпочинає новий красивий розділ.'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Скільки насправді виділяється крові?',
        text: 'Здається, ніби витікає літр! Насправді за всі 3–7 днів організм втрачає лише 2–3 столові ложки рідини (близько 30–50 мл).',
        highlight: 'Лише 2–3 столові ложки!',
        illustration: 'spoon-drop',
        tip: 'Кров виділяється крапельками та невеликими порціями, а не суцільним струменем.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Що носити в рюкзаку до школи?',
        text: 'Підготуй свій таємний «набір SOS»: маленьку косметичку з 2 прокладками, запасними трусиками та вологими серветками.',
        highlight: 'Маленька косметичка = 100% спокою',
        illustration: 'pouch-kit',
        tip: 'Якщо почнеться в школі — сміливо звернися до медсестри або попроси подружку чи вчительку: це буває з кожною!'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Гігієна: просте правило',
        text: 'Змінюй прокладку кожні 3–4 години, навіть якщо виділень небагато. Підмивайся теплою водою спереду назад.',
        highlight: 'Кожні 3–4 години',
        illustration: 'water-sparkle',
        tip: 'Використовуй мʼякий гель для інтимної гігієни або просто теплу воду.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Інтерактивний квіз',
        question: 'Правда чи Міф: Під час місячних заборонено займатися спортом або ходити на фізкультуру?',
        options: [
          { text: 'Правда, треба тільки лежати в ліжку', isCorrect: false },
          { text: 'Міф, легка активність навпаки допомагає', isCorrect: true }
        ],
        explanation: 'Міф! Легка прогулянка, йога чи розтяжка знімають спазми та полегшують біль. Якщо почуваєшся знесиленою — просто відпочинь.'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Чудово! 🌸',
        text: 'Тепер ти знаєш усе найважливіше. Знання проганяють будь-який страх.',
        promptContext: 'Маю запитання про перші місячні: як підготуватися і що сказати мамі?',
        ctaText: 'Маєш питання про місячні? Запитай сестричку'
      }
    ]
  },
  {
    id: 'body-changing',
    targetAges: ['10-12', '13-15', '16+'],
    categoryId: 'body',
    categoryTitle: 'Моє тіло змінюється',
    categoryIcon: 'Sparkles',
    categoryColor: 'mint',
    title: 'Груди, зріст та нове волосся',
    subtitle: 'Чому тіло росте нерівномірно і це повна норма',
    readTime: '2 хв',
    slidesCount: 6,
    badge: 'Твоє тіло',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Моє тіло змінюється: привіт, дорослішання!',
        subtitle: 'Груди, зріст, волоссячко і нові запахи',
        illustration: 'flower-growth',
        text: 'Твоє тіло зараз як будівельний майданчик: гормони перебудовують його в доросле. Це відбувається стрибками, тому багато що може здаватися незвичним.'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Одна грудь більша за іншу?',
        text: 'Груди майже ніколи не ростуть одночасно! Спочатку може зʼявитися чутлива кулька під одним соском, а друга приєднається за кілька місяців. Це цілком нормально.',
        highlight: 'Асиметрія — норма природи',
        illustration: 'mirror-balance',
        tip: 'Навіть у дорослих жінок права та ліва грудь дещо відрізняються.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Волоссячко на тілі та запах поту',
        text: 'Ніжні волосинки під пахвами та в інтимній зоні — це природний захисний барʼєр шкіри. А потові залози працюють активніше. Дезодорант і щоденний душ — твої друзі.',
        highlight: 'Природний захисний барʼєр',
        illustration: 'shower-fresh',
        tip: 'Обирай мʼякі дезодоранти без спирту.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Стрибки зросту та незграбність',
        text: 'Іноді ручки й ніжки ростуть швидше за тулуб. Можна тимчасово чіплятися за кути меблів або спотикатися. Твій мозок незабаром звикне до нових розмірів!',
        highlight: 'Мозок просто звикає до нового зросту',
        illustration: 'growing-plant',
        tip: 'Пий багато води та спи щонайменше 8–9 годин — ростемо ми саме уві сні.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Інтерактивний квіз',
        question: 'Правда чи Міф: Якщо в однокласниць уже ростуть груди, а в мене ще ні — зі мною щось не так?',
        options: [
          { text: 'Правда, треба терміново хвилюватися', isCorrect: false },
          { text: 'Міф, у кожної свій індивідуальний генетичний годинник', isCorrect: true }
        ],
        explanation: 'Міф! Дорослішання починається у всіх у різний час (між 9 і 15 роками). Твій організм увімкне свій процес саме тоді, коли буде готовий!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Супер! Ти знаєш про себе більше 🌱',
        text: 'Твоє тіло унікальне. Не порівнюй себе з однокласницями чи фото в інтернеті.',
        promptContext: 'Чи нормально, що одна грудь росте швидше і болить?',
        ctaText: 'Маєш питання про тіло? Запитай сестричку'
      }
    ]
  },
  {
    id: 'emotions-pms',
    targetAges: ['10-12', '13-15', '16+'],
    categoryId: 'emotions',
    categoryTitle: 'Мої емоції',
    categoryIcon: 'Heart',
    categoryColor: 'lavender',
    title: 'ПМС, перепади настрою та особисті кордони',
    subtitle: 'Чому іноді хочеться плакати або злитися без причини',
    readTime: '2 хв',
    slidesCount: 6,
    badge: 'Психологія',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Емоційний ролеркостер',
        subtitle: 'ПМС, злість, сльози та особисті кордони',
        illustration: 'storm-rainbow',
        text: 'Щойно сміялася — а раптом хочеться плакати через ручку, яка впала? Гормони естроген і прогестерон гойдаються, як гойдалка. Це абсолютно нормально!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Що таке ПМС?',
        text: 'Синдром Передменструального Напруження (ПМС) буває за кілька днів до місячних. Можна відчувати втому, роздратування чи тягу до солодкого. Це лише гормони, а не твій характер!',
        highlight: 'ПМС минає разом із початком місячних',
        illustration: 'tea-relax',
        tip: 'Теплий чай із меліси та мʼякий плед творять дива.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Говори про свої почуття',
        text: 'Коли відчуваєш, що терпіння уривається, скажи рідним: «Мені потрібна хвилинка наодинці». Ти маєш право на власний простір і тишу.',
        highlight: 'Спілкування — ключ до спокою',
        illustration: 'heart-bubble',
        tip: 'Не тримай злість у собі — малюй, слухай музику або записуй у щоденник.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Твої особисті кордони',
        text: 'Ніхто не має права торкатися тебе всупереч твоєму бажанню чи змушувати робити те, що викликає відразу або страх. Твоє «НІ» має велику силу і повинно поважатися кожним.',
        highlight: 'Твої кордони недоторканні',
        illustration: 'shield-star',
        tip: 'Справжні друзі поважають твої кордони.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Інтерактивний квіз',
        question: 'Правда чи Міф: Перепади настрою перед місячними означають, що ти зла або невихована людина?',
        options: [
          { text: 'Правда, це провина характеру', isCorrect: false },
          { text: 'Міф, це тимчасовий вплив гормонів', isCorrect: true }
        ],
        explanation: 'Міф! Перепади настрою — це чиста біологія. Не свари себе — будь до себе турботливою і лагідною!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'Ти сильна та мудра! 💜',
        text: 'Розуміння власних емоцій — запорука гармонії та впевненості в собі.',
        promptContext: 'Як впоратися зі злістю та перепадами настрою перед місячними?',
        ctaText: 'Хочеш поговорити про емоції? Запитай сестричку'
      }
    ]
  }
];

export const DAILY_MYTHS_BY_AGE_UK = {
  '5-7': [
    {
      id: 'myth-hugs-5-uk',
      dateLabel: 'Міф дня (5–7 років)',
      question: 'Чи правда, що треба обов’язково обіймати кожного дорослого, навіть якщо не хочеться?',
      isFact: false,
      shortAnswer: 'Це Міф!',
      fullExplanation: 'Твоє тіло належить тільки тобі! Ти можеш чемно помахати ручкою або дати «п’ять», якщо зараз не хочеться обійматися.',
      actionText: 'Дізнатися правду'
    },
    {
      id: 'myth-crying-5-uk',
      dateLabel: 'Міф дня (5–7 років)',
      question: 'Чи правда, що сміливі дівчатка ніколи не бояться темряви і не плачуть?',
      isFact: false,
      shortAnswer: 'Це Міф!',
      fullExplanation: 'Боятися і плакати — абсолютно нормально! Сміливість — це вміння розповісти про свій страх мамі чи татові.',
      actionText: 'Перевірити себе'
    },
    {
      id: 'myth-front-back-5-uk',
      dateLabel: 'Факт дня (5–7 років)',
      question: 'Чи правда, що мити руки з милом і підмиватися спереду назад захищає від мікробів?',
      isFact: true,
      shortAnswer: 'Це чиста Правда!',
      fullExplanation: 'Тепла вода з милом змиває мікробів із ручок, а рух спереду назад щодня береже твоє здоров’я!',
      actionText: 'Перевірити себе'
    }
  ],
  '8-9': [
    {
      id: 'myth-gum-stomach-8',
      dateLabel: 'Міф дня (8–9 років)',
      question: 'Чи правда, що якщо проковтнути жуйку, вона прилипне в животику на 7 років?',
      isFact: false,
      shortAnswer: 'Це кумедний Міф!',
      fullExplanation: 'Жуйку не варто ковтати, але в шлунку вона не залишається на роки. Шлунок повільно пересуває її далі, і за 1–2 дні вона виходить природно!',
      actionText: 'Дізнатися правду'
    },
    {
      id: 'myth-teeth-fall-8',
      dateLabel: 'Міф дня (8–9 років)',
      question: 'Чи правда, що постійні зуби можуть вирости вдруге, якщо їх не чистити?',
      isFact: false,
      shortAnswer: 'Це небезпечний Міф!',
      fullExplanation: 'Молочні зубки випадають лише один раз, а нові постійні зуби виростають на все доросле життя! Третього набору природа не дає, тому чистимо їх двічі на день.',
      actionText: 'Спростувати міф'
    },
    {
      id: 'myth-cry-weakness-8',
      dateLabel: 'Міф дня (8–9 років)',
      question: 'Чи правда, що якщо плачеш від образи або болю, то ти плакса і слабка?',
      isFact: false,
      shortAnswer: 'Це шкідливий Міф!',
      fullExplanation: 'Сльози виділяють заспокійливі гормони. Плачуть і дорослі, і чемпіони спорту, і супергерої. Плакати — це природний спосіб потурбуватися про своє серденько!',
      actionText: 'Перевір себе'
    }
  ],
  default: [
    {
      id: 'myth-sweets-acne',
      dateLabel: 'Міф дня',
      question: 'Чи правда, що від шоколаду та солодощів одразу зʼявляються прищі?',
      isFact: false,
      shortAnswer: 'Це Міф!',
      fullExplanation: 'Головна причина акне у підлітків — гормональні зміни в сальних залозах та бактерії, а не плитка шоколаду. Здорове харчування важливе, але сам шоколад не є винуватцем!',
      actionText: 'Перевір себе'
    },
    {
      id: 'myth-hair-wash',
      dateLabel: 'Міф дня',
      question: 'Чи правда, що під час місячних не можна мити голову та приймати душ?',
      isFact: false,
      shortAnswer: 'Це небезпечний Міф!',
      fullExplanation: 'Митися під час місячних не тільки можна, але й дуже потрібно! Теплий душ розслабляє мʼязи, полегшує біль і дарує свіжість.',
      actionText: 'Дізнатися правду'
    },
    {
      id: 'myth-tampons-virginity',
      dateLabel: 'Міф дня',
      question: 'Чи правда, що підліткам категорично не можна користуватися тампонами?',
      isFact: false,
      shortAnswer: 'Це Міф!',
      fullExplanation: 'Дівоча пліва еластична і має природний отвір. Тампони розміру Mini або Normal можна використовувати в будь-якому віці, дотримуючись інструкції та змінюючи кожні 4–6 годин.',
      actionText: 'Спростувати міф'
    }
  ]
};

export const ICE_BREAKER_PROMPTS_BY_AGE_UK = {
  '5-7': [
    {
      text: 'Що таке правило трусиків?',
      tag: 'Безпека',
      answer: 'Сонечко, це дуже просто: місця під трусиками та маєчкою належать тільки тобі! Ніхто не має права торкатися їх або просити показати. Якщо тобі ніяково — одразу біжи до мами чи тата 🛡️'
    },
    {
      text: 'Мені страшно в темряві, допоможи!',
      tag: 'Сміливість',
      answer: 'Боятися темряви — зовсім нормально! Давай разом зробимо 3 повільні вдихи «квіточка — свічка», обіймемо улюблену іграшку й попросимо батьків увімкнути затишний нічник 🌟'
    },
    {
      text: 'Чому я іноді злюся?',
      tag: 'Почуття',
      answer: 'Злитися — нормально, злість підказує, що тобі щось не сподобалося. Можна глибоко подихати і сказати словами: «Я зараз злюся!» 💜'
    }
  ],
  '8-9': [
    {
      text: 'Що таке правило купальника?',
      tag: 'Безпека',
      answer: 'Сонечко, правило купальника дуже просте: місця, які закриває купальник — це твоя приватна зона! Ніхто не має права просити їх показати чи торкатися їх. Якщо відчуваєш тривогу — одразу розкажи мамі чи татові 🌸'
    },
    {
      text: 'Чому хитаються та випадають зубки?',
      tag: 'Тіло',
      answer: 'Ти ростеш, красуне! Молочні зубки звільняють місце міцним постійним зубам, які будуть із тобою все життя. Не бійся, на місці зубика, що випав, скоро виросте новий гарний зуб!'
    },
    {
      text: 'Іноді боюсь засинати в темряві, що робити?',
      tag: 'Емоції',
      answer: 'Боятися темряви — цілком нормально навіть для дорослих! Попроси батьків увімкнути маленький нічничок або залишити двері відчиненими. Обійми улюблену мʼяку іграшку — вона берегтиме твій сон 🧸'
    },
    {
      text: 'Як помиритися з подружкою після сварки?',
      tag: 'Дружба',
      answer: 'Сварки трапляються навіть у найкращих подруг! Підійди і скажи: «Мені було сумно, але я хочу дружити. Пограємося знову?». Теплі щирі слова миттєво розтоплюють лід 🫂'
    }
  ],
  '10-12': [
    {
      text: 'Коли починаються перші місячні?',
      tag: 'Місячні',
      answer: 'Перші місячні найчастіше приходять між 11 та 14 роками. Ознаки: стрибок зросту, збільшення грудей і білуваті виділення на білизні приблизно за рік до цього. Тіло саме обере ідеальний момент!'
    },
    {
      text: 'Чому одна грудь росте швидше за іншу?',
      tag: 'Тіло',
      answer: 'Груди майже ніколи не ростуть одночасно! Різниця в розмірі та легка чутливість під соском — природна ознака дорослішання. З часом їхній розмір вирівняється.'
    },
    {
      text: 'Що робити, якщо місячні почалися в школі?',
      tag: 'Порада SOS',
      answer: 'Без паніки! Завжди тримай у рюкзаку маленьку косметичку з двома прокладками. Якщо їх немає — звернися до шкільної медсестри або попроси вчительку чи подружку. Це абсолютно звичайна ситуація!'
    }
  ],
  '13-15': [
    {
      text: 'Як зменшити біль у животі під час місячних?',
      tag: 'Здоровʼя',
      answer: 'Допомагає тепла грілка на низ живота, чай із ромашки або меліси, легка прогулянка та відпочинок. Якщо біль сильний — обовʼязково поговори з мамою, щоб підібрати безпечне знеболювальне.'
    },
    {
      text: 'Чому перед місячними все дратує?',
      tag: 'ПМС',
      answer: 'Це ПМС — коливання естрогену та прогестерону. Не звинувачуй себе за злість чи сльози. Подаруй собі більше сну, улюблений серіал, теплий плед і обмеж стрес.'
    },
    {
      text: 'Як сказати «ні», коли друзі підмовляють до чогось?',
      tag: 'Кордони',
      answer: 'Твої кордони — твоє право. Достатньо сказати спокійно і впевнено: «Я не хочу цього робити» або «Мені це не підходить». Справжні друзі поважатимуть твоє рішення без тиску.'
    }
  ],
  default: [
    {
      text: 'Як вести календарик циклу?',
      tag: 'Цикл',
      answer: 'Позначай перший день кожних місячних у календарі або застосунку. Звичайний цикл триває від 21 до 35 днів. У перші два роки нерегулярність — це норма!'
    },
    {
      text: 'Чи безпечні тампони для підлітків?',
      tag: 'Гігієна',
      answer: 'Так, тампони розміру Mini або Normal цілком безпечні. Головне — чисто вимити руки та змінювати кожні 4–6 годин.'
    }
  ]
};

export const DAILY_MYTHS_BY_AGE_EN = {
  '5-7': [
    {
      id: 'myth-hugs-5-en',
      dateLabel: 'Fact or Myth (5–7 yrs)',
      question: 'Do you have to hug every grown-up even when you do not feel like it?',
      isFact: false,
      shortAnswer: 'That is a Myth!',
      fullExplanation: 'You are the boss of your own body! You can politely wave hello or give a high-five whenever you do not want a hug.',
      actionText: 'Learn the truth'
    },
    {
      id: 'myth-crying-5-en',
      dateLabel: 'Fact or Myth (5–7 yrs)',
      question: 'Is it true that brave girls never cry or feel scared of the dark?',
      isFact: false,
      shortAnswer: 'That is a Myth!',
      fullExplanation: 'Crying and feeling scared are completely normal! Being brave means telling mom or dad when you need a hug or a nightlight.',
      actionText: 'Check yourself'
    },
    {
      id: 'myth-front-back-5-en',
      dateLabel: 'Fact or Myth (5–7 yrs)',
      question: 'Does washing hands with soap and wiping front-to-back help keep germs away?',
      isFact: true,
      shortAnswer: 'That is 100% True!',
      fullExplanation: 'Warm water and soap wash away invisible germs, and wiping front-to-back keeps your body healthy every single day!',
      actionText: 'Check yourself'
    }
  ],
  '8-9': [
    {
      id: 'en-myth-8-1',
      question: 'Is it true that baby teeth fall out because you ate too many candies?',
      isMyth: true,
      badgeText: 'MYTH OF THE DAY',
      truthTitle: '🙅‍♀️ It is a myth!',
      explanation: 'Baby teeth fall out because strong adult permanent teeth are growing underneath and gently pushing them out! Candies can cause cavities, but they are not the reason baby teeth get loose.',
      tag: 'Body & Growth'
    },
    {
      id: 'en-myth-8-2',
      question: 'Is it true that grown-ups are never scared of anything?',
      isMyth: true,
      badgeText: 'MYTH OF THE DAY',
      truthTitle: '🙅‍♀️ It is a myth!',
      explanation: 'Every person, even adults, feels afraid sometimes — of thunderstorms, dentists, or darkness. Being afraid is normal; talking about your fears helps them disappear.',
      tag: 'Emotions'
    }
  ],
  '10-12': [
    {
      id: 'en-myth-10-1',
      question: 'Is it true that you must not take a shower or bath during your period?',
      isMyth: true,
      badgeText: 'MYTH OF THE DAY',
      truthTitle: '🙅‍♀️ It is a myth!',
      explanation: 'A warm shower during your period is not only safe, it is wonderful! Warm water relaxes abdominal muscles, soothes cramps, and keeps you feeling fresh and clean.',
      tag: 'Hygiene'
    },
    {
      id: 'en-myth-10-2',
      question: 'Is it true that breast growth should be completely even on both sides?',
      isMyth: true,
      badgeText: 'MYTH OF THE DAY',
      truthTitle: '🙅‍♀️ It is a myth!',
      explanation: 'Almost all girls experience one breast growing a little faster than the other during puberty. Slight asymmetry is 100% natural and normal.',
      tag: 'Body Changes'
    }
  ],
  '13-15': [
    {
      id: 'en-myth-13-1',
      question: 'Is it true that chocolate and sweets immediately cause acne and pimples?',
      isMyth: true,
      badgeText: 'MYTH OF THE DAY',
      truthTitle: '🙅‍♀️ It is a myth!',
      explanation: 'Pimples in puberty are primarily caused by hormones making sebaceous glands more active, not chocolate. Gentle washing and drinking water are what your skin loves.',
      tag: 'Skin'
    },
    {
      id: 'en-myth-13-2',
      question: 'Is it true that irregular periods during the first 2 years are an illness?',
      isMyth: true,
      badgeText: 'MYTH OF THE DAY',
      truthTitle: '🙅‍♀️ It is a myth!',
      explanation: 'During the first 1-2 years after menarche, hormones are still establishing their rhythm. Cycles can vary from 21 to 45 days, and that is completely normal.',
      tag: 'Cycle'
    }
  ],
  default: [
    {
      id: 'en-myth-def-1',
      question: 'Is it true that intense exercise is forbidden during your period?',
      isMyth: true,
      badgeText: 'MYTH OF THE DAY',
      truthTitle: '🙅‍♀️ It is a myth!',
      explanation: 'Light exercises, walking, yoga, and stretching improve blood flow and actually reduce cramps by releasing natural endorphins.',
      tag: 'Wellness'
    }
  ]
};

export const ICE_BREAKER_PROMPTS_BY_AGE_EN = {
  '5-7': [
    {
      text: 'What is the Underwear Rule?',
      tag: 'Safety',
      answer: 'Sweetie, it is super simple: the parts of your body covered by your underwear belong only to you! No one is allowed to touch them or ask to see them. If anyone makes you feel weird, tell mom or dad right away 🛡️'
    },
    {
      text: 'I feel scared in the dark, help!',
      tag: 'Bravery',
      answer: 'Feeling scared in the dark is totally normal! Let us take 3 slow "smell the flower, blow out the candle" breaths together, hug your favorite plushie, and ask mom or dad for a cozy nightlight 🌟'
    },
    {
      text: 'Why do I feel angry sometimes?',
      tag: 'Feelings',
      answer: 'Feeling angry is totally okay — it just means something felt unfair or upsetting. Take a deep breath and use your words: "I feel angry right now!" 💜'
    }
  ],
  '8-9': [
    {
      text: 'What is the swimsuit rule?',
      tag: 'Safety',
      answer: 'Sweetie, the swimsuit rule is simple: parts under your swimsuit belong only to you! No one has the right to touch them or ask to see them. If you feel uncomfortable, tell mom or dad right away 🌸'
    },
    {
      text: 'Why do my baby teeth wobble and fall out?',
      tag: 'Body',
      answer: 'You are growing! Baby teeth make room for strong permanent teeth that will stay with you your whole life. Keep brushing them morning and night ✨'
    },
    {
      text: 'I am sometimes scared to sleep in the dark, what should I do?',
      tag: 'Emotions',
      answer: 'Being afraid of the dark is completely normal. Ask parents for a gentle nightlight or to keep the bedroom door open. Hug your favorite plushie — it will guard your sweet dreams 🧸'
    },
    {
      text: 'How can I make up with a friend after an argument?',
      tag: 'Friendship',
      answer: 'Quarreling happens to everyone. You can say: «I miss you, let\'s not be angry and play together». True friends forgive each other 💜'
    }
  ],
  '10-12': [
    {
      text: 'How to prepare for my first period?',
      tag: 'Period',
      answer: 'Keep a small pouch in your school backpack with two pads and spare underwear. When you see clear or white discharge on your underwear, your body is getting ready!'
    },
    {
      text: 'Is it normal that one breast is bigger than the other?',
      tag: 'Body Changes',
      answer: 'Yes! Breasts almost never grow at the exact same speed. One might start growing several months earlier. They balance out over time.'
    },
    {
      text: 'What if my period starts at school?',
      tag: 'SOS Tip',
      answer: 'Do not panic! Go to the restroom and use a pad from your pouch. If you do not have one, ask the school nurse, a teacher, or a friend. It happens to every woman!'
    }
  ],
  '13-15': [
    {
      text: 'How to relieve period cramps in my lower belly?',
      tag: 'Health',
      answer: 'Try a warm heating pad on your lower tummy, warm chamomile tea, gentle stretching, and resting curled up. If cramps are severe, tell mom so she can help 🫂'
    },
    {
      text: 'Why does everything irritate me before my period?',
      tag: 'PMS',
      answer: 'That is PMS — shifting estrogen and progesterone levels. Do not blame yourself for being emotional. Give yourself extra sleep, cozy blankets, and favorite music.'
    },
    {
      text: 'How to say «no» when friends pressure me?',
      tag: 'Boundaries',
      answer: 'Your boundaries are your superpower. You can say calmly and firmly: «I don\'t feel comfortable doing this». True friends will respect your choice without pressure.'
    }
  ],
  default: [
    {
      text: 'How to track my cycle?',
      tag: 'Cycle',
      answer: 'Mark the first day of bleeding on a calendar. Normal cycles range from 21 to 35 days. Irregularity during the first two years is completely expected!'
    },
    {
      text: 'Are tampons safe for teenagers?',
      tag: 'Hygiene',
      answer: 'Yes, Mini or Light size tampons are safe when inserted gently. Always wash hands before and after, and change every 4–6 hours.'
    }
  ]
};

// Accessor functions that return data based on active language

// ========================================================
// ENGLISH LOCALIZATION (ENGLISH)
// ========================================================
export const STORIES_DATA_EN = [
  // ---------------- 5-7 YEARS STORIES (EN) ----------------
  {
    id: 'body-boss-5',
    targetAges: ['5-7'],
    categoryId: 'safety',
    categoryTitle: 'My Body Is Mine',
    categoryIcon: 'Shield',
    categoryColor: 'mint',
    title: 'The Underwear Rule: You Are the Boss of Your Body!',
    subtitle: 'How to protect your personal space and spot tricky secrets',
    readTime: '2 min',
    slidesCount: 5,
    badge: 'Ages 5–7',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'You Are the Boss of Your Body! 🛡️',
        subtitle: 'A simple, superpower safety rule for brave girls',
        illustration: 'shield-heart',
        text: 'From the top of your head to the tips of your toes, your body belongs only to you. Nobody is allowed to touch you in a way that feels uncomfortable!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'The Underwear Rule',
        text: 'The parts of your body covered by your underwear and swimsuit are private. Only mom or dad (when helping you bathe) or a doctor with mom or dad right next to you may check them.',
        highlight: 'Under your underwear is your private zone',
        illustration: 'swimsuit',
        tip: 'If anyone ever asks you to show your private parts, say a loud "NO!" and run straight to mom or dad.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Happy Surprises vs. Tricky Secrets',
        text: 'A happy surprise is a birthday gift that makes people smile. A tricky secret makes your tummy feel scared or asks you to hide something from mom and dad. NEVER keep tricky secrets!',
        highlight: 'Always tell mom or dad tricky secrets!',
        illustration: 'open-lock',
        tip: 'Mom and dad will never be mad at you for telling them a scary secret.'
      },
      {
        id: 4,
        type: 'quiz',
        title: 'Mini Quiz',
        question: 'Fact or Myth: If someone tickles or hugs you too hard, do you have to stay quiet to be polite?',
        options: [
          { text: 'Fact, you have to stay quiet', isCorrect: false },
          { text: 'Myth! You can say "Stop, I do not like that!"', isCorrect: true }
        ],
        explanation: 'Myth! You always have the right to say "Stop!" or "I do not want a hug right now." Your voice matters!'
      },
      {
        id: 5,
        type: 'completion',
        title: 'You Are a Safety Star! 🌟',
        text: 'Now you know the Underwear Rule and how to keep yourself safe!',
        promptContext: 'Tell me simply about happy surprises vs tricky secrets',
        ctaText: 'Ask Big Sister'
      }
    ]
  },
  {
    id: 'clean-superhero-5',
    targetAges: ['5-7'],
    categoryId: 'hygiene',
    categoryTitle: 'Clean & Healthy',
    categoryIcon: 'Sparkles',
    categoryColor: 'peach',
    title: 'Daily Cleanliness Superpowers',
    subtitle: 'How to wash hands, stay fresh, and care for your body',
    readTime: '2 min',
    slidesCount: 5,
    badge: 'Ages 5–7',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Caring for Your Body Is a Superpower! ✨',
        subtitle: 'Easy, happy habits for every single day',
        illustration: 'shield-heart',
        text: 'Every day your body runs, jumps, and plays. Let us learn simple ways to keep it clean, comfy, and healthy!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Soapy Hands & Fresh Underwear',
        text: 'After playing outside, using the bathroom, and before eating, soap and water wash away tiny invisible germs. And every morning we put on fresh, clean cotton underwear.',
        highlight: 'Fresh cotton underwear every day!',
        illustration: 'swimsuit',
        tip: 'Wash your hands for 20 seconds — about the time it takes to sing Happy Birthday twice.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'The Magic Direction: Front to Back',
        text: 'When you wash in the bath or wipe in the bathroom, always go from your tummy toward your back (front to back). That keeps germs away from places they do not belong.',
        highlight: 'Always wipe front to back 🌿',
        illustration: 'open-lock',
        tip: 'Plain warm water is best for gentle washing — strong scented soaps can sting delicate skin.'
      },
      {
        id: 4,
        type: 'quiz',
        title: 'Mini Quiz',
        question: 'Fact or Myth: Should you always wipe and wash from front to back?',
        options: [
          { text: 'Fact! It keeps germs away', isCorrect: true },
          { text: 'Myth, direction does not matter', isCorrect: false }
        ],
        explanation: 'Fact! Going front to back is one of the best healthy habits for every girl.'
      },
      {
        id: 5,
        type: 'completion',
        title: 'Cleanliness Superhero! 🫧',
        text: 'Your body says a big thank you for taking such gentle care of it!',
        promptContext: 'How can I take good care of my body every day?',
        ctaText: 'Chat with Big Sister'
      }
    ]
  },
  {
    id: 'big-feelings-5',
    targetAges: ['5-7'],
    categoryId: 'emotions',
    categoryTitle: 'Big Feelings',
    categoryIcon: 'Heart',
    categoryColor: 'lavender',
    title: 'Big Feelings: Anger, Fear & Bravery',
    subtitle: 'Why every feeling is okay and how to calm down in 3 breaths',
    readTime: '2 min',
    slidesCount: 5,
    badge: 'Ages 5–7',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'All of Your Feelings Are Okay! 💜',
        subtitle: 'Happy, sad, scared, or mad — every feeling belongs',
        illustration: 'shield-heart',
        text: 'Sometimes it feels sunny inside, and sometimes a storm cloud rolls in. Feeling upset, scared, or angry is never something to be ashamed of!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Flower & Candle Breathing',
        text: 'When you feel upset or scared, pretend you are holding a flower: breathe in slowly through your nose, then gently blow out a birthday candle through your mouth. Do it 3 times!',
        highlight: 'Smell the flower, blow out the candle 🌸',
        illustration: 'loud-voice',
        tip: 'Hugging a favorite stuffed animal or asking mom or dad for a cuddle helps too.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Asking for Help Is Brave',
        text: 'If someone was mean at kindergarten or school, or you had a bad dream, telling a trusted grown-up is not tattling — it is super brave!',
        highlight: 'You are never alone',
        illustration: 'open-lock',
        tip: 'Pick 3 trusted grown-ups you can always talk to about anything.'
      },
      {
        id: 4,
        type: 'quiz',
        title: 'Mini Quiz',
        question: 'Fact or Myth: Good girls never get angry or cry?',
        options: [
          { text: 'Fact, you should never cry', isCorrect: false },
          { text: 'Myth! Everyone feels sad or mad sometimes', isCorrect: true }
        ],
        explanation: 'Myth! Even grown-ups cry and feel angry sometimes. What matters is being kind and talking about your feelings.'
      },
      {
        id: 5,
        type: 'completion',
        title: 'You Are So Brave! 🌈',
        text: 'Now you know how to be friends with your big feelings!',
        promptContext: 'I feel a little sad or scared, help me calm down',
        ctaText: 'Chat with Big Sister'
      }
    ]
  },

  // ---------------- 8-9 YEARS STORIES (EN) ----------------
  {
    id: 'swimsuit-rule-8',
    targetAges: ['8-9'],
    categoryId: 'safety',
    categoryTitle: 'My Body — My Haven',
    categoryIcon: 'Shield',
    categoryColor: 'mint',
    title: 'The Swimsuit Rule & Personal Boundaries',
    subtitle: 'Why private areas belong only to you',
    readTime: '2 min',
    slidesCount: 6,
    badge: 'For ages 8–9',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Your Body is Your Greatest Treasure',
        subtitle: 'Learn the most important safety rule',
        illustration: 'shield-heart',
        text: 'You are growing, running, playing and exploring the world. Remember the most important thing: your body belongs only to you, and nobody has the right to make you feel uncomfortable.'
      },
      {
        id: 2,
        type: 'fact',
        title: 'What is the «Swimsuit Rule»?',
        text: 'Imagine your favorite swimsuit. The places it covers (chest, area between legs, and bottom) are called private zones. This is your personal space.',
        highlight: 'Private zones are your personal space',
        illustration: 'swimsuit',
        tip: 'Only parents (to help wash) or a doctor (with mom or dad present) may touch them.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Good and Bad Secrets',
        text: 'A good secret is a surprise birthday present. If someone asks you to keep an uncomfortable touch secret — that is a «bad secret». Always tell mom or dad about bad secrets!',
        highlight: 'Never keep bad secrets!',
        illustration: 'open-lock',
        tip: 'Parents will never be upset with you for talking about this.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Your Loud and Brave «NO!»',
        text: 'If someone hugs, tickles or touches you when you do not want it, you have every right to say: «I don’t like this, please stop!». Even if it is a familiar adult or an older brother.',
        highlight: 'The word «NO» protects you',
        illustration: 'loud-voice',
        tip: 'You never have to stay quiet just to be polite.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Quick Quiz',
        question: 'Fact or Myth: Should you endure uncomfortable tickling just not to offend anyone?',
        options: [
          { text: 'Fact, you must stay silent and endure', isCorrect: false },
          { text: 'Myth, you have the right to say «Stop, I don’t like this»', isCorrect: true }
        ],
        explanation: 'Myth! Your body belongs only to you. You can always walk away or say: «I don’t want to be tickled». That is completely okay!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'You are Brave and Protected! 🛡️',
        text: 'Now you know the swimsuit rule. You are the boss of your own body!',
        promptContext: 'What is the swimsuit rule and how can I say no if I feel uncomfortable?',
        ctaText: 'Have questions about safety? Ask sister'
      }
    ]
  },
  {
    id: 'growing-teeth-8',
    targetAges: ['8-9'],
    categoryId: 'body',
    categoryTitle: 'How We Grow',
    categoryIcon: 'Sparkles',
    categoryColor: 'peach',
    title: 'Why Baby Teeth Fall Out and Feet Grow',
    subtitle: 'Where milk teeth go and why we grow during sleep',
    readTime: '2 min',
    slidesCount: 6,
    badge: 'For ages 8–9',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'The Magic of Your Growth',
        subtitle: 'Teeth, feet, sleep and new milestones',
        illustration: 'sprout',
        text: 'Notice how shoes that fit in spring feel tight in autumn? Your body is busy building new centimeters right now!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Where do Baby Teeth Go?',
        text: 'Baby teeth are temporary helpers. As your jaw grows, strong permanent teeth grow underneath. They gently push baby teeth out to take their adult place!',
        highlight: 'Loose teeth mean strong new ones are coming',
        illustration: 'tooth',
        tip: 'Do not pull violently — wiggle gently with clean hands.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Growing in Your Sleep',
        text: 'Growth hormone works most when you are sound asleep. That is why getting 9-10 hours of sleep helps you wake up taller, stronger, and more energetic.',
        highlight: 'Sleep is the best growth booster',
        illustration: 'moon-stars',
        tip: 'A cozy bedroom and quiet time before bed help sweet dreams.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Growing Pains are Normal',
        text: 'Sometimes your calves or knees feel a dull ache in the evening. Bones grow quickly and stretch muscles. A warm bath and a gentle foot massage help instantly.',
        highlight: 'Growing pains are temporary',
        illustration: 'warm-heart',
        tip: 'Tell mom or dad if your legs feel tired after running.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Quick Quiz',
        question: 'When does the body produce the most growth hormone?',
        options: [
          { text: 'During deep night sleep', isCorrect: true },
          { text: 'While eating sweets', isCorrect: false }
        ],
        explanation: 'Deep sleep is the magic workshop where growth hormone works wonders!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'You are Growing Wonderfully! 🌟',
        text: 'Every tooth and every centimeter is part of your unique growing journey.',
        promptContext: 'Why do legs ache when growing and why do baby teeth fall out?',
        ctaText: 'Want to ask more about growing? Ask sister'
      }
    ]
  },
  {
    id: 'emotions-friends-8',
    targetAges: ['8-9'],
    categoryId: 'emotions',
    categoryTitle: 'Friendship & Feelings',
    categoryIcon: 'Heart',
    categoryColor: 'lavender',
    title: 'School, Friends, and Hurt Feelings',
    subtitle: 'How to make up after quarrels and express feelings',
    readTime: '2 min',
    slidesCount: 6,
    badge: 'For ages 8–9',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Emotions are Your Superpower',
        subtitle: 'Joy, sadness, anger and friendship',
        illustration: 'sun-cloud',
        text: 'Sometimes we laugh until our tummies hurt, and sometimes we want to hide under the blanket and cry. All feelings are natural and important!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'All Feelings are Allowed',
        text: 'It is okay to feel angry, sad, or jealous. There are no «bad» feelings. What matters is how we show them: without hitting or calling names.',
        highlight: 'Feelings are always valid',
        illustration: 'heart-spark',
        tip: 'If angry: stomp feet, squeeze a pillow or take three deep breaths.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Why Friends Quarrel',
        text: 'Even best friends have different ideas sometimes. Quarrels happen not because friendship is over, but because you both want different games right now.',
        highlight: 'Quarrels can be resolved',
        illustration: 'puzzle-hands',
        tip: 'Wait until anger cools down, then talk peacefully.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'The Magic Words of Peacemaking',
        text: 'Instead of «You ruined everything!», try «I felt sad when you took the toy without asking. Let’s play together». Expressing your feelings resolves conflicts.',
        highlight: 'Talk about your feelings, not blame',
        illustration: 'handshake',
        tip: 'A hug or a drawing can speak louder than words.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Quick Quiz',
        question: 'What is the best thing to do when you feel very angry?',
        options: [
          { text: 'Take deep breaths and say what upset you', isCorrect: true },
          { text: 'Yell and break your toys', isCorrect: false }
        ],
        explanation: 'Deep breaths calm your heartbeat and help your brain find the right words!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'You are a Kind Friend! 🌸',
        text: 'Understanding feelings makes you a great friend and a happy girl.',
        promptContext: 'How to make peace with a friend and manage anger?',
        ctaText: 'Have a question about friends? Ask sister'
      }
    ]
  },
  {
    id: 'hygiene-superpower-8',
    targetAges: ['8-9'],
    categoryId: 'body',
    categoryTitle: 'Daily Habits',
    categoryIcon: 'Sparkles',
    categoryColor: 'mint',
    title: 'Hygiene Superpower: Cleanliness & Care',
    subtitle: 'Why we wash hands, brush teeth, and love warm showers',
    readTime: '2 min',
    slidesCount: 6,
    badge: 'For ages 8–9',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Your Cleanliness Superpower',
        subtitle: 'Water, foam, pleasant scents and health',
        illustration: 'soap-bubble',
        text: 'Taking care of your body is like giving it a gentle high-five every day. Washing, brushing and brushing hair makes you fresh and confident!'
      },
      {
        id: 2,
        type: 'fact',
        title: 'The 20-Second Handwash Secret',
        text: 'Wash hands before meals, after walks, and after using the restroom. Soap traps microscopic dirt and washes it away. Sing «Happy Birthday» twice while lathering!',
        highlight: 'Wash hands with warm water and soap',
        illustration: 'clean-hands',
        tip: 'Dry hands with a clean personal towel.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Brushing Teeth Twice a Day',
        text: 'Morning and evening toothbrushing keeps teeth shiny and breath fresh. Two minutes with a soft brush and tasty paste protects permanent teeth from cavities.',
        highlight: 'Two minutes morning and night',
        illustration: 'happy-tooth',
        tip: 'Replace toothbrush every 3 months or after a cold.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Gentle Intimate Hygiene',
        text: 'Private areas only need warm water, washing from front to back. Wear clean cotton underwear every morning. That is all you need to stay fresh and comfortable!',
        highlight: 'Wash from front to back with warm water',
        illustration: 'gentle-drop',
        tip: 'Avoid harsh soaps or bubble baths on intimate areas.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Quick Quiz',
        question: 'How should intimate areas be washed?',
        options: [
          { text: 'From front to back, using warm water', isCorrect: true },
          { text: 'With strong perfumes and scrubs', isCorrect: false }
        ],
        explanation: 'From front to back keeps bacteria away from private areas!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'You are Fresh and Healthy! 🧼',
        text: 'Simple daily care habits make you feel awesome every day.',
        promptContext: 'How to wash properly and keep teeth healthy?',
        ctaText: 'Curious about body care? Ask sister'
      }
    ]
  },
  // ---------------- 10-15+ YEARS STORIES (EN) ----------------
  {
    id: 'periods-101',
    targetAges: ['10-12', '13-15', '16+'],
    categoryId: 'body',
    categoryTitle: 'Body & Health',
    categoryIcon: 'Droplet',
    categoryColor: 'peach',
    title: 'First Menstruation (Period)',
    subtitle: 'What happens, how to prepare, and why it is not scary',
    readTime: '3 min',
    slidesCount: 6,
    badge: 'Popular',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Your Body is Growing Up',
        subtitle: 'Everything about first periods without awkwardness',
        illustration: 'lotus',
        text: 'If you noticed spots on your underwear or hear friends talking about periods, relax: this is a completely natural sign that your body is healthy and blossoming.'
      },
      {
        id: 2,
        type: 'fact',
        title: 'What Actually is a Period?',
        text: 'Every month, the uterus prepares a soft cozy lining. If no baby is growing, the body gently sheds this lining. It comes out as a small amount of blood (around 2-3 tablespoons).',
        highlight: 'Only 2-3 tablespoons over several days',
        illustration: 'uterus-flower',
        tip: 'It is not an injury — it is the body cleaning itself.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Pads and Hygiene Products',
        text: 'Start with comfortable disposable pads (Normal or Light). Stick the pad firmly to cotton underwear and wrap the wings around. Change it every 3-4 hours.',
        highlight: 'Change pads every 3-4 hours',
        illustration: 'pad-box',
        tip: 'Keep 2 spare pads in your backpack in a small pouch.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'How to Tell Mom',
        text: 'Mom has experienced this herself and will be happy to support you. You can whisper: «Mom, I think my period started», or text her: «Can you help me choose pads?».',
        highlight: 'Mom has been there too',
        illustration: 'two-hearts',
        tip: 'If dad is around, he can buy supplies at the store too — it is normal!'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Quick Quiz',
        question: 'How much blood does the body actually lose during an entire period?',
        options: [
          { text: 'About 2-3 tablespoons (30-50 ml)', isCorrect: true },
          { text: 'Several liters of blood', isCorrect: false }
        ],
        explanation: 'It looks like more because it mixes with natural fluids, but it is only 2-3 tablespoons!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'You are Prepared and Confident! 🌸',
        text: 'Periods are a sign of health and vitality. You have got this!',
        promptContext: 'How to prepare for my first period and what supplies to have?',
        ctaText: 'Have more questions? Ask sister'
      }
    ]
  },
  {
    id: 'body-changing',
    targetAges: ['10-12', '13-15', '16+'],
    categoryId: 'body',
    categoryTitle: 'Body Changes',
    categoryIcon: 'Sparkles',
    categoryColor: 'mint',
    title: 'Breasts, Hips, and Body Shapes',
    subtitle: 'Why growth happens in bursts and why asymmetry is normal',
    readTime: '3 min',
    slidesCount: 6,
    badge: 'Guide',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Your Unique Transformation',
        subtitle: 'How hormones shape your new body',
        illustration: 'butterfly',
        text: 'During puberty, your body changes rapidly: hips widen, breasts develop, hair appears underarms and on the pubic area. Every girl blossoms at her own pace.'
      },
      {
        id: 2,
        type: 'fact',
        title: 'Breast Buds and Tenderness',
        text: 'Breasts usually start with small firm buds under the nipples. They may feel sensitive. One side almost always starts growing earlier than the other — this is completely normal!',
        highlight: 'Asymmetry is 100% normal and common',
        illustration: 'bra-soft',
        tip: 'Choose a soft wireless cotton crop top for daily comfort.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Clear or White Discharges',
        text: 'A few months to a year before your first period, you might notice clear or whitish discharge on your underwear without any odor or itch. This is self-cleaning and means your body is healthy.',
        highlight: 'Clear discharge is a sign of healthy vaginal balance',
        illustration: 'drop-pure',
        tip: 'Daily cotton underwear and warm water washes are all you need.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'Sweat and Natural Odor',
        text: 'New sweat glands wake up during puberty. Sweat itself has no smell, but bacteria on skin create it. A daily shower and a gentle deodorant will keep you feeling fresh all day.',
        highlight: 'Shower daily and use mild deodorant',
        illustration: 'flower-fresh',
        tip: 'Apply deodorant on clean dry underarms.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Quick Quiz',
        question: 'Is it normal if one breast is slightly larger than the other while growing?',
        options: [
          { text: 'Yes, asymmetry during puberty is completely normal', isCorrect: true },
          { text: 'No, they must grow identical at the same millimeter', isCorrect: false }
        ],
        explanation: 'Human bodies are beautifully asymmetrical! Over time, differences usually even out.'
      },
      {
        id: 6,
        type: 'completion',
        title: 'You are Beautiful and Unique! ✨',
        text: 'Your body is doing incredible work right now. Treat it with kindness.',
        promptContext: 'Why does one breast grow faster and when do hips widen?',
        ctaText: 'Ask sister any body question'
      }
    ]
  },
  {
    id: 'emotions-pms',
    targetAges: ['10-12', '13-15', '16+'],
    categoryId: 'emotions',
    categoryTitle: 'Emotions & PMS',
    categoryIcon: 'Heart',
    categoryColor: 'lavender',
    title: 'Mood Swings, Tears, and PMS',
    subtitle: 'Why tears come out of nowhere and how to be kind to yourself',
    readTime: '3 min',
    slidesCount: 6,
    badge: 'Support',
    slides: [
      {
        id: 1,
        type: 'intro',
        title: 'Riding the Emotional Waves',
        subtitle: 'Understanding mood changes before your period',
        illustration: 'storm-rainbow',
        text: 'One moment you are laughing, and ten minutes later you want to cry over a lost pencil. No, you are not losing your mind — this is hormonal chemistry at play.'
      },
      {
        id: 2,
        type: 'fact',
        title: 'What is PMS?',
        text: 'Premenstrual syndrome happens 3-7 days before bleeding. Estrogen and progesterone shift, which affects serotonin (the mood hormone). You are not being dramatic — it is real biology.',
        highlight: 'PMS is a temporary shift in hormone levels',
        illustration: 'brain-heart',
        tip: 'Give yourself permission to rest and avoid stressful tasks.'
      },
      {
        id: 3,
        type: 'fact',
        title: 'Comfort Checklist for Tough Days',
        text: 'When emotions feel overwhelming: wrap yourself in a warm blanket, drink herbal tea, listen to chill music, and take a 20-minute nap. Avoid excess salty foods or caffeine.',
        highlight: 'Rest, warmth, and self-compassion',
        illustration: 'cozy-mug',
        tip: 'A warm water bottle on your belly helps relax muscles.'
      },
      {
        id: 4,
        type: 'fact',
        title: 'How to Talk to Friends and Family',
        text: 'Tell loved ones gently: «I’m feeling a little overwhelmed and sensitive today. I just need some quiet time». They will understand and give you space.',
        highlight: 'Communicate your need for quiet space',
        illustration: 'gentle-bubble',
        tip: 'You don’t have to attend noisy parties when you feel exhausted.'
      },
      {
        id: 5,
        type: 'quiz',
        title: 'Quick Quiz',
        question: 'Why do mood swings often occur a few days before a period?',
        options: [
          { text: 'Due to natural hormonal shifts affecting mood', isCorrect: true },
          { text: 'Because you have a bad personality', isCorrect: false }
        ],
        explanation: 'It is pure biology! Hormones temporarily affect neurotransmitters. You are wonderful!'
      },
      {
        id: 6,
        type: 'completion',
        title: 'You are Strong and Sensitive! 💜',
        text: 'Honoring your emotions and giving yourself gentle care is real self-love.',
        promptContext: 'How to manage PMS mood swings and calm cramps?',
        ctaText: 'Need emotional support? Ask sister'
      }
    ]
  }
];


// Accessor functions that return data based on active language
export const getLocalizedStories = (lang = 'ru') => {
  if (lang === 'uk') return STORIES_DATA_UK;
  if (lang === 'pl') return STORIES_DATA_PL;
  if (lang === 'en') return STORIES_DATA_EN;
  return STORIES_DATA;
};

export const getLocalizedMyths = (ageGroup, lang = 'ru') => {
  const dataset = lang === 'uk' ? DAILY_MYTHS_BY_AGE_UK : lang === 'pl' ? DAILY_MYTHS_BY_AGE_PL : lang === 'en' ? DAILY_MYTHS_BY_AGE_EN : DAILY_MYTHS_BY_AGE;
  return dataset[ageGroup] || dataset.default;
};

export const getLocalizedIceBreakers = (ageGroup, lang = 'ru') => {
  const dataset = lang === 'uk' ? ICE_BREAKER_PROMPTS_BY_AGE_UK : lang === 'pl' ? ICE_BREAKER_PROMPTS_BY_AGE_PL : lang === 'en' ? ICE_BREAKER_PROMPTS_BY_AGE_EN : ICE_BREAKER_PROMPTS_BY_AGE;
  return dataset[ageGroup] || dataset.default;
};
