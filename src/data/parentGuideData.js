// Comprehensive Parent Guide Data for SisterHood
// Localized in 4 languages: Russian ('ru'), Ukrainian ('uk'), Polish ('pl'), English ('en')
// Designed based on UNICEF, AAP (American Academy of Pediatrics) and child psychology standards.

export const PARENT_GUIDE_DATA = {
  ru: {
    title: 'Гид для родителей',
    subtitle: 'Как говорить с дочерью о теле, взрослении и эмоциях без неловкости',
    privacyBadge: '100% Конфиденциальность ребенка',
    privacyNotice: 'Мы не передаем и не показываем личные переписки вашей дочери в чате. Доверие и ощущение безопасного пространства — главный фактор психологического комфорта девочки. Этот раздел создан, чтобы помочь вам стать самым чутким и надежным собеседником для своего ребенка.',
    backToApp: 'Вернуться в приложение',
    
    tabs: {
      scripts: 'Шпаргалки разговоров',
      byAge: 'Гид по возрастам',
      checklist: 'Чек-лист готовности',
      aiConsultant: 'Советник для родителей'
    },

    ageGroups: {
      '8-9': '8–9 лет (Младший возраст)',
      '10-12': '10–12 лет (Предпубертат)',
      '13-15': '13–15 лет (Подростковый возраст)',
      '16+': '16+ лет (Юность)'
    },

    ageRoadmap: {
      '8-9': {
        title: 'Первые шаги: границы тела и естественность',
        summary: 'В этом возрасте закладывается фундамент здорового отношения к телу и безопасности.',
        physical: 'Организм пока готовится: ускоряется рост, меняются молочные зубы на коренные, иногда начинается формирование зачатков молочных желез.',
        emotional: 'Повышенная эмоциональность, интерес к тому, как устроены взрослые, страх темноты или оценки сверстников.',
        goals: [
          'Укрепить «Правило купальника»: зоны под купальником интимны и принадлежат только ей.',
          'Научить правильной ежедневной гигиене без стыда и чувства брезгливости.',
          'Дать понять, что маме и папе можно рассказать абсолютно любой секрет без страха наказания.'
        ],
        adviceForDads: 'Папе важно нормализовать заботу: не дистанцироваться от дочки, подчеркивать ее индивидуальность, поддерживать спортивные увлечения и учить личным границам.'
      },
      '10-12': {
        title: 'Старт взросления: подготовка к первой менструации',
        summary: 'Критический возраст для доверительного разговора. Важно рассказать обо всем ДО первой менструации, а не постфактум.',
        physical: 'Рост груди (часто неравномерный), появление пушка и волос под мышками и в интимной зоне, изменение запаха пота, белесые выделения (бели) за 6–12 месяцев до первых месячных.',
        emotional: 'Сравнение себя с подружками, резкие колебания настроения, стеснение меняющегося тела, потребность в личном пространстве.',
        goals: [
          'Подробно и спокойно объяснить суть менструации: это признак здоровья и силы организма, а не болезнь или повод для стыда.',
          'Собрать вместе первую школьную косметичку (Emergency Kit).',
          'Подобрать первый мягкий топ/бра без косточек и научить пользоваться дезодорантом.'
        ],
        adviceForDads: 'Если вы папа-одиночка: не бойтесь темы прокладок. Купите средства гигиены заранее, покажите, где они лежат. Скажите: «Твое тело взрослеет, это прекрасно. Я всегда рядом и помогу купить все, что нужно».'
      },
      '13-15': {
        title: 'Подростковый шторм: гормоны, границы и поиск себя',
        summary: 'Время бурного взросления, перепадов настроения и первых романтических симпатий.',
        physical: 'Установление менструального цикла (в первые 1–2 года цикл может быть нерегулярным, что является физиологической нормой), возможны спазмы внизу живота, появление акне.',
        emotional: 'Сепарация от родителей, чувствительность к критике внешности, потребность в автономии и уважении личных границ (стук в дверь комнаты обязателен).',
        goals: [
          'Помочь справиться с ПМС и болями при менструации: научить согревать живот, пить теплый чай, вести календарь цикла.',
          'Обсудить цифровую безопасность: личные фотографии, общение в соцсетях, умение говорить уверенное «НЕТ».',
          'Познакомить с бережным визитом к дружелюбному детскому/подростковому гинекологу для профилактики.'
        ],
        adviceForDads: 'Уважайте закрытую дверь в комнату дочки. Не шутите над ее внешностью, аппетитом или перепадами настроения. Ваша спокойная, надежная поддержка формирует ее уверенность в себе.'
      },
      '16+': {
        title: 'Взросление и самостоятельность',
        summary: 'Формирование взрослой личности, выбор жизненного пути и зрелое отношение к здоровью.',
        physical: 'Окончательное формирование репродуктивной системы, стабилизация цикла, индивидуальный ритм организма.',
        emotional: 'Потребность в общении на равных как со взрослым человеком, вопросы отношений, согласия и независимости.',
        goals: [
          'Быть надежным советником, а не строгим цензором.',
          'Обсуждать вопросы репродуктивного здоровья, согласия и безопасности открыто и без табу.',
          'Поддерживать автономию в принятии решений.'
        ],
        adviceForDads: 'Относитесь к ней как к самостоятельной личности. Давайте знать, что родной дом — это место безусловного принятия при любых жизненных ошибках.'
      }
    },

    scripts: [
      {
        id: 'start-period-talk',
        topic: 'Как завести разговор о первых месячных',
        situation: 'Дочке 10–11 лет, изменений пока нет или только начались, но вы хотите мягко подготовить ее заранее.',
        whatToSay: '«Милая, ты сейчас заметно подрастаешь, и скоро твое тело начнет меняться. Через какое-то время у тебя начнется менструация — это когда раз в месяц выходит несколько капель крови. Это признак того, что организм развивается абсолютно здорово! Я хочу показать тебе, какие бывают удобные прокладки, и положить их тебе в сумочку, чтобы ты всегда чувствовала себя спокойно и уверенно.»',
        phrasesToAvoid: [
          '«Ой, скоро начнется твоя женская кара...»',
          '«Теперь ты взрослая женщина, детство кончилось.»',
          '«Не бегай и не прыгай, а то заболеешь.»'
        ],
        betterAlternatives: [
          '«Это естественный и красивый признак взросления твоего организма.»',
          '«Ты остаешься всё той же любимой девочкой, просто тело учится новым суперспособностям.»',
          '«Ты сможешь продолжать жить обычной активной жизнью, плавать и гулять.»'
        ]
      },
      {
        id: 'child-is-shy',
        topic: 'Что делать, если дочь стесняется и закрывается',
        situation: 'При попытке поговорить дочка краснеет, раздражается или говорит «Мам/Пап, отстань, я все знаю».',
        whatToSay: '«Я прекрасно понимаю, что говорить об этом может быть немного неловко. Я не буду устраивать допрос. Просто знай: в ванной на верхней полочке всегда лежат прокладки и салфетки. А если у тебя возникнет любой вопрос — ты можешь спросить меня лично или даже просто написать в мессенджере или запиской на столе. Я никогда не буду смеяться или ругать.»',
        phrasesToAvoid: [
          '«Чего ты стыдишься? Я же твоя мать/отец!»',
          '«В наше время никто не стеснялся, а ты выдумываешь.»'
        ],
        betterAlternatives: [
          '«Смущаться — это нормально. Я даю тебе столько времени, сколько нужно.»',
          '«Ты не обязана рассказывать мне всё до мелочей, но знай, что моя помощь всегда рядом.»'
        ]
      },
      {
        id: 'period-pain',
        topic: 'Если дочка жалуется на боль в животе при менструации',
        situation: 'У дочки спазмы, она вялая, плачет или боится идти в школу.',
        whatToSay: '«Малышка, мне очень жаль, что тебе сейчас некомфортно. Легкие спазмы бывают, потому что матка сокращается. Давай я налью тебе теплый ромашковый чай, принесу уютный плед и теплую грелочку. Если боль не проходит — мы аккуратно подберем безопасный способ облегчить состояние. Ты не должна терпеть сильную боль молча 🫂»',
        phrasesToAvoid: [
          '«Все женщины терпят, и ты терпи.»',
          '«Не притворяйся, просто не хочешь идти в школу.»'
        ],
        betterAlternatives: [
          '«Боль — это сигнал тела, мы обязательно позаботимся о тебе прямо сейчас.»',
          '«Если очень тяжело, сегодня можно отдохнуть дома и восстановить силы.»'
        ]
      },
      {
        id: 'hygiene-deodorant',
        topic: 'Деликатный разговор о запахе пота и гигиене',
        situation: 'У девочки в 10–12 лет меняется запах тела, но она забывает принимать душ или стесняется дезодоранта.',
        whatToSay: '«Солнышко, с взрослением потовые железы начинают работать по-новому — это происходит абсолютно со всеми людьми на свете! Давай мы сходим вместе в магазин и выберем тебе персональный вкусный гель для душа и мягкий дезодорант с ароматом, который понравится лично тебе.»',
        phrasesToAvoid: [
          '«От тебя плохо пахнет, марш мыться!»',
          '«Девочка должна всегда благоухать, как принцесса.»'
        ],
        betterAlternatives: [
          '«Уход за телом — это приятная забота о себе, а не повинность.»',
          '«Выбери то средство, от запаха которого тебе самой будет радостно.»'
        ]
      }
    ],

    checklistItems: [
      {
        id: 'c1',
        category: 'school_kit',
        title: 'Собрать «Косметичку уверенности» в рюкзак',
        desc: 'Небольшая непромокаемая сумочка: 2–3 дневные прокладки в индивидуальной упаковке, пачка влажных салфеток для интимной гигиены, запасные чистые трусики в отдельном пакетике.'
      },
      {
        id: 'c2',
        category: 'home_bath',
        title: 'Организовать открытый доступ в ванной',
        desc: 'Положить средства гигиены (прокладки разного размера, салфетки) в открытом шкафчике в ванной, чтобы дочке не приходилось каждый раз просить или искать.'
      },
      {
        id: 'c3',
        category: 'secret_code',
        title: 'Договориться о кодовом слове / сигнале доверия',
        desc: 'Придумать простое кодовое слово (или эмодзи, например 🌸), по которому дочка может написать из гостей или школы, если ей срочно нужно, чтобы вы ее забрали без лишних вопросов.'
      },
      {
        id: 'c4',
        category: 'clothing',
        title: 'Купить первый удобный топ без косточек',
        desc: 'Мягкий хлопковый или бесшовный топ, который не сдавливает растущую грудь и дарит комфорт на уроках физкультуры.'
      },
      {
        id: 'c5',
        category: 'calendar',
        title: 'Обсудить календарь цикла без контроля',
        desc: 'Показать, как удобно отмечать дни в приложении или блокнотике, объяснив, что это нужно для нее самой, а не для контроля со стороны взрослых.'
      }
    ],

    aiPromptChips: [
      'Как папе деликатно поговорить с дочкой о взрослении?',
      'Нормально ли, если месячные нерегулярны в первые 2 года?',
      'Что положить в школьную экстренную косметичку?',
      'Как реагировать на сильные перепады настроения подростка?',
      'Дочка стесняется сказать о первых месячных, как помочь?'
    ],

    aiPromptChipsByAge: {
      '8-9': [
        'Как доступно объяснить «Правило купальника» и границы тела?',
        'Дочка боится темноты и выпадающих зубов, как успокоить?',
        'Как папе говорить с 8-летней дочкой о теле без неловкости?',
        'Что делать, если ребенок рассказывает о «плохом секрете» в школе?'
      ],
      '10-12': [
        'Как деликатно завести разговор о первых месячных до их начала?',
        'Дочка стесняется изменений тела и закрывается, что сказать?',
        'Что положить в школьную экстренную сумочку (Emergency Kit)?',
        'Совет папе-одиночке: как купить и положить первые прокладки?'
      ],
      '13-15': [
        'Нормально ли, если месячные нерегулярны в первые 1–2 года?',
        'Как помочь при сильных спазмах и болезненных месячных?',
        'Как реагировать на резкие перепады настроения и слезы?',
        'Дочка комплексует из-за внешности и прыщей: нужные слова'
      ],
      '16+': [
        'Как доверительно поговорить об отношениях и согласии?',
        'Первый профилактический визит к гинекологу: как подготовить?',
        'Как сохранить контакт с взрослеющей дочерью без тотального контроля?',
        'Сильный стресс перед экзаменами и перфекционизм: как поддержать?'
      ]
    }
  },

  uk: {
    title: 'Гід для батьків',
    subtitle: 'Як говорити з донькою про тіло, дорослішання та емоції без незручності',
    privacyBadge: '100% Конфіденційність дитини',
    privacyNotice: 'Ми не передаємо і не показуємо особисті листування вашої доньки в чаті. Довіра та відчуття безпечного простору — головний фактор психологічного комфорту дівчинки. Цей розділ створено, щоб допомогти вам стати найчуйнішим і найнадійнішим співрозмовником для своєї дитини.',
    backToApp: 'Повернутися до застосунку',
    
    tabs: {
      scripts: 'Шпаргалки розмов',
      byAge: 'Гід за віком',
      checklist: 'Чек-лист турботи',
      aiConsultant: 'Порадник для батьків'
    },

    ageGroups: {
      '8-9': '8–9 років (Молодший вік)',
      '10-12': '10–12 років (Передпубертат)',
      '13-15': '13–15 років (Підлітковий вік)',
      '16+': '16+ років (Юність)'
    },

    ageRoadmap: {
      '8-9': {
        title: 'Перші кроки: межі тіла та природність',
        summary: 'У цьому віці закладається фундамент здорового ставлення до тіла та безпеки.',
        physical: 'Організм поки готується: змінюються молочні зуби на корінні, прискорюється ріст, формуються зачатки молочних залоз.',
        emotional: 'Підвищена емоційність, інтерес до дорослого світу, страх темряви чи оцінки однолітків.',
        goals: [
          'Закріпити «Правило купальника»: зони під купальником інтимні та належать лише їй.',
          'Навчити правильної щоденної гігієни без сорому.',
          'Дати зрозуміти, що мамі й татові можна розповісти будь-яку таємницю без страху покарання.'
        ],
        adviceForDads: 'Татові важливо не віддалятися від доньки, підтримувати її спортивні захоплення та навчати особистих кордонів.'
      },
      '10-12': {
        title: 'Початок дорослішання: підготовка до перших місячних',
        summary: 'Критичний вік для щирої розмови. Важливо розповісти про все ДО першої менструації.',
        physical: 'Ріст грудей (часто нерівномірний), пушок під пахвами та в інтимній зоні, зміна запаху поту, білі виділення за 6–12 місяців до місячних.',
        emotional: 'Порівняння себе з подругами, перепади настрою, соромʼязливість щодо свого тіла, потреба у приватності.',
        goals: [
          'Спокійно пояснити суть менструації: це ознака здоровʼя та сили організму, а не хвороба.',
          'Зібрати разом першу сумочку впевненості до школи (Emergency Kit).',
          'Підібрати перший мʼякий топ без кісточок і навчити користуватися дезодорантом.'
        ],
        adviceForDads: 'Якщо ви тато-одинак: не бійтеся прокладок. Купіть засоби гігієни заздалегідь і покажіть, де вони лежать. Скажіть: «Я завжди поруч і допоможу купити все необхідне».'
      },
      '13-15': {
        title: 'Підлітковий шторм: гормони, кордони та пошук себе',
        summary: 'Час бурхливого дорослішання, перепадів настрою та перших симпатій.',
        physical: 'Встановлення циклу (в перші 1–2 роки нерегулярність є нормою), спазми внизу живота, поява акне.',
        emotional: 'Сепарація від батьків, чутливість до критики зовнішності, потреба в повазі до приватного простору (стук у двері обовʼязковий).',
        goals: [
          'Допомогти впоратися з ПМС і спазмами: теплий чай, грілка, ведення календарика.',
          'Обговорити цифрову безпеку: особисті фото, спілкування в соцмережах, уміння говорити чітке «НІ».',
          'Познайомити з дружнім підлітковим лікарем-гінекологом для спокійного профогляду.'
        ],
        adviceForDads: 'Поважайте зачинені двері до кімнати доньки. Не жартуйте над її зовнішністю чи апетитом. Ваша спокійна підтримка формує її впевненість у собі.'
      },
      '16+': {
        title: 'Дорослішання та самостійність',
        summary: 'Формування дорослої особистості та зріле ставлення до здоровʼя.',
        physical: 'Остаточне формування репродуктивної системи, стабілізація циклу.',
        emotional: 'Потреба у спілкуванні на рівних, питання стосунків, згоди та автономії.',
        goals: [
          'Бути надійним порадником, а не суворим цензором.',
          'Відкрито говорити про репродуктивне здоровʼя та згоду.',
          'Підтримувати самостійність у прийнятті рішень.'
        ],
        adviceForDads: 'Ставтеся до неї як до самостійної особистості. Показуйте, що дім — це місце безумовної підтримки.'
      }
    },

    scripts: [
      {
        id: 'start-period-talk',
        topic: 'Як розпочати розмову про перші місячні',
        situation: 'Доньці 10–11 років, змін ще немає, але варто підготувати її заздалегідь.',
        whatToSay: '«Люба, ти помітно підростаєш, і скоро твоє тіло почне змінюватися. Через деякий час у тебе почнеться менструація — це коли раз на місяць виділяється трохи крові. Це ознака того, що ти ростеш здоровою! Хочу показати тобі зручні прокладки й покласти їх у рюкзачок, щоб ти почувалася спокійно.»',
        phrasesToAvoid: [
          '«Скоро почнеться твоя жіноча доля...»',
          '«Тепер ти доросла жінка, дитинство закінчилося.»'
        ],
        betterAlternatives: [
          '«Це природна і красива ознака дорослішання твого тіла.»',
          '«Ти залишаєшся нашою улюбленою донечкою, просто організм набуває нових сил.»'
        ]
      },
      {
        id: 'child-is-shy',
        topic: 'Що робити, якщо донька соромиться',
        situation: 'Донька ніяковіє або каже: «Мамо/Тату, я все знаю, не чіпай мене».',
        whatToSay: '«Я чудово розумію, що говорити про це буває ніяково. Я не буду влаштовувати допит. Просто знай: у ванній на поличці завжди лежать засоби гігієни. А якщо буде питання — ти завжди можеш запитати мене або навіть просто написати повідомлення в телефоні. Я ніколи не буду сварити чи насміхатися.»',
        phrasesToAvoid: [
          '«Чого ти соромишся? Я ж твоя мама/тато!»'
        ],
        betterAlternatives: [
          '«Соромитися — це нормально. Я поруч тоді, коли ти будеш готова.»'
        ]
      }
    ],

    checklistItems: [
      {
        id: 'c1',
        category: 'school_kit',
        title: 'Зібрати «Косметичку впевненості» до школи',
        desc: 'Невелика непромокальна сумочка: 2–3 прокладки, вологі серветки для інтимної гігієни, запасна чиста білизна.'
      },
      {
        id: 'c2',
        category: 'home_bath',
        title: 'Організувати відкритий доступ у ванній кімнаті',
        desc: 'Покласти засоби гігієни на відкриту поличку, щоб доньці не доводилося щоразу просити чи шукати.'
      },
      {
        id: 'c3',
        category: 'secret_code',
        title: 'Домовитися про кодове слово / сигнал довіри',
        desc: 'Придумати таємне слово або емодзі (наприклад, 🌸), якщо доньці терміново потрібна допомога або треба забрати її додому.'
      },
      {
        id: 'c4',
        category: 'clothing',
        title: 'Придбати перший зручний топ без кісточок',
        desc: 'Мʼякий бавовняний топ для щоденного комфорту та уроків фізкультури.'
      }
    ],

    aiPromptChips: [
      'Як татові делікатно поговорити з донькою про місячні?',
      'Чи нормально, якщо цикл нерегулярний у перші роки?',
      'Що покласти до шкільної косметички першої допомоги?',
      'Як реагувати на підліткові перепади настрою?',
      'Донька замикається в собі, як відновити довіру?'
    ],

    aiPromptChipsByAge: {
      '8-9': [
        'Як просто пояснити «Правило купальника» та межі тіла?',
        'Донька боїться темряви чи випадання зубчиків, як заспокоїти?',
        'Як татові говорити з 8-річною донькою про тіло без ніяковості?',
        'Що робити, якщо дитина розповідає про «поганий секрет» у школі?'
      ],
      '10-12': [
        'Як делікатно розпочати розмову про перші місячні до їх початку?',
        'Донька соромиться змін тіла й замикається, що сказати?',
        'Що покласти до шкільної сумочки впевненості (Emergency Kit)?',
        'Порада татові-соло: як купити й покласти перші прокладки?'
      ],
      '13-15': [
        'Чи нормально, якщо місячні нерегулярні у перші 1–2 роки?',
        'Як допомогти при спазмах та болю під час менструації?',
        'Як реагувати на раптові сльози та перепади настрою підлітка?',
        'Донька комплексує через зовнішність та прищики: потрібні слова'
      ],
      '16+': [
        'Як довірливо поговорити про стосунки та особисті кордони?',
        'Перший профілактичний візит до гінеколога: як підготувати?',
        'Як зберегти контакт із дорослішаючою донькою без тотального контролю?',
        'Сильний стрес перед іспитами та перфекціонізм: як підтримати?'
      ]
    }
  },

  pl: {
    title: 'Przewodnik dla Rodziców',
    subtitle: 'Jak rozmawiać z córką o ciele, dorastaniu i emocjach bez skrępowania',
    privacyBadge: '100% Prywatności Dziecka',
    privacyNotice: 'Nie przekazujemy ani nie pokazujemy prywatnych wiadomości Twojej córki z czatu. Zaufanie i poczucie bezpiecznej przestrzeni to fundament komfortu psychicznego dziewczynki. Ta sekcja powstała, aby pomóc Ci stać się najbardziej wyrozumiałym i zaufanym rozmówcą dla Twojego dziecka.',
    backToApp: 'Wróć do aplikacji',
    
    tabs: {
      scripts: 'Wskazówki do rozmów',
      byAge: 'Według wieku',
      checklist: 'Lista gotowości',
      aiConsultant: 'Konsultant dla Rodziców'
    },

    ageGroups: {
      '8-9': '8–9 lat (Młodszy wiek)',
      '10-12': '10–12 lat (Wczesne dojrzewanie)',
      '13-15': '13–15 lat (Nastolatki)',
      '16+': '16+ lat (Młodość)'
    },

    ageRoadmap: {
      '8-9': {
        title: 'Pierwsze kroki: granice ciała i naturalność',
        summary: 'W tym wieku buduje się zdrowe podejście do własnego ciała i bezpieczeństwa.',
        physical: 'Ciało przygotowuje się do zmian: wypadają zęby mleczne, rosną stałe, przyspiesza wzrost, zaczynają tworzyć się pączki piersiowe.',
        emotional: 'Większa wrażliwość, ciekawość świata dorosłych, lęk przed ciemnością czy oceną rówieśników.',
        goals: [
          'Utrwalenie «Zasady stroju kąpielowego»: miejsca pod strojem są intymne i należą wyłącznie do niej.',
          'Wprowadzenie zdrowej codziennej higieny bez wstydu.',
          'Budowanie pewności, że rodzicom można powierzyć każdy sekret bez obawy przed karą.'
        ],
        adviceForDads: 'Dla taty kluczowe jest nieoddalanie się od córki, wspieranie jej pasji i nauka stawiania granic.'
      },
      '10-12': {
        title: 'Początek dorastania: przygotowanie do pierwszej miesiączki',
        summary: 'Kluczowy moment na spokojną rozmowę. Bardzo ważne jest wyjaśnienie wszystkiego PRZED pierwszą miesiączką.',
        physical: 'Rozwój piersi (często asymetryczny), owłosienie pod pachami i w okolicach intymnych, zmiana zapachu potu, białawy śluz na 6–12 miesięcy przed okresem.',
        emotional: 'Porównywanie się z koleżankami, wahania nastroju, niepewność wobec zmian w ciele, potrzeba prywatności.',
        goals: [
          'Spokojne wytłumaczenie sensu miesiączki: to znak zdrowia i siły ciała, a nie powód do wstydu.',
          'Wspólne przygotowanie kosmetyczki ratunkowej do szkoły (Emergency Kit).',
          'Dobranie pierwszego miękkiego topu bez fiszbin i delikatnego dezodorantu.'
        ],
        adviceForDads: 'Samotny tata: nie bój się tematu podpasek. Kup artykuły higieniczne z wyprzedzeniem i wskaż, gdzie leżą. Powiedz: «Jestem przy Tobie i zawsze kupię wszystko, czego potrzebujesz».'
      },
      '13-15': {
        title: 'Burza nastoletnia: hormony, granice i tożsamość',
        summary: 'Czas intensywnego rozwoju, skoków nastroju i pierwszych zauroczeń.',
        physical: 'Stabilizacja cyklu (przez pierwsze 1–2 lata nieregularność jest normą), skurcze brzucha, trądzik.',
        emotional: 'Potrzeba autonomii, wrażliwość na krytykę wyglądu, pukanie do drzwi pokoju jest absolutnym obowiązkiem.',
        goals: [
          'Pomoc w radzeniu sobie z PMS i bólem brzucha: ciepły termofor, herbatka, kalendarzyk cyklu.',
          'Rozmowa o bezpieczeństwie cyfrowym i asertywnym mówieniu «NIE».',
          'Odwiedzenie przyjaznego ginekologa dziecięcego w celach profilaktycznych.'
        ],
        adviceForDads: 'Szanuj zamknięte drzwi do pokoju córki. Nie żartuj z jej wyglądu ani apetytu. Spokojne wsparcie taty buduje jej poczucie własnej wartości.'
      },
      '16+': {
        title: 'Dorosłość i samodzielność',
        summary: 'Kształtowanie dorosłej tożsamości i dojrzałe dbanie o zdrowie.',
        physical: 'Doświadczenie stabilnego rytmu organizmu i dojrzałości fizycznej.',
        emotional: 'Potrzeba relacji partnerskiej, rozmów o zgodzie, granicach i przyszłości.',
        goals: [
          'Bycie doradcą i oparciem, a nie kontrolerem.',
          'Otwarta rozmowa o zdrowiu intymnym i wzajemnym szacunku.'
        ],
        adviceForDads: 'Traktuj ją jak dorosłego partnera do rozmowy. Dom ma być przystanią bezpiecznego powrotu.'
      }
    },

    scripts: [
      {
        id: 'start-period-talk',
        topic: 'Jak zacząć rozmowę o pierwszej miesiączce',
        situation: 'Córka ma 10–11 lat, zmian jeszcze nie widać, ale warto ją spokojnie przygotować.',
        whatToSay: '«Kochanie, bardzo urosłaś i Twoje ciało powoli zaczyna się zmieniać. Za jakiś czas pojawi się pierwsza miesiączka — kilka kropel krwi raz w miesiącu. To znak, że Twój organizm rozwija się zdrowo! Chcę pokazać Ci wygodne podpaski i schować kilka do Twojego plecaka, abyś czuła się w pełni bezpiecznie.»',
        phrasesToAvoid: [
          '«No to zaczyna się Twój kobiecy los...»',
          '«Koniec dzieciństwa, teraz jesteś kobietą.»'
        ],
        betterAlternatives: [
          '«To naturalny i piękny znak, że rośniesz silna i zdrowa.»',
          '«Nadal jesteś naszą kochaną córeczką, po prostu Twoje ciało uczy się nowych rzeczy.»'
        ]
      }
    ],

    checklistItems: [
      {
        id: 'c1',
        category: 'school_kit',
        title: 'Przygotować «Kosmetyczkę Pewności» do szkoły',
        desc: 'Nieprzemakalna mała saszetka: 2–3 podpaski, chusteczki do higieny intymnej, zapasowa bielizna w woreczku.'
      },
      {
        id: 'c2',
        category: 'home_bath',
        title: 'Zapewnić swobodny dostęp w łazience',
        desc: 'Umieścić podpaski w otwartej szafce, by córka nie musiała za każdym razem prosić lub szukać.'
      },
      {
        id: 'c3',
        category: 'secret_code',
        title: 'Ustalić tajne słowo / sygnał zaufania',
        desc: 'Ustalcie hasło lub emoji (np. 🌸), jeśli córka będzie potrzebować natychmiastowego powrotu do domu bez zbędnych pytań.'
      }
    ],

    aiPromptChips: [
      'Jak tata może delikatnie porozmawiać z córką o okresie?',
      'Czy nieregularny cykl w pierwszych 2 latach to norma?',
      'Co powinno znaleźć się w szkolnej kosmetyczce ratunkowej?',
      'Jak reagować na wahania nastroju u nastolatki?'
    ],

    aiPromptChipsByAge: {
      '8-9': [
        'Jak prosto wyjaśnić «Zasadę kostiumu kąpielowego» i granice ciała?',
        'Córka boi się ciemności lub wypadających ząbków, jak ją uspokoić?',
        'Jak tata może rozmawiać z 8-latką o ciele bez zakłopotania?',
        'Co zrobić, jeśli dziecko mówi o «złym sekrecie» w szkole?'
      ],
      '10-12': [
        'Jak delikatnie zacząć rozmowę o pierwszej miesiączce z wyprzedzeniem?',
        'Córka wstydzi się zmian ciała i zamyka w pokoju, co powiedzieć?',
        'Co włożyć do awaryjnej kosmetyczki do szkoły (Emergency Kit)?',
        'Porada dla taty: jak bez skrępowania kupić pierwsze podpaski?'
      ],
      '13-15': [
        'Czy nieregularny cykl w pierwszych 1–2 latach to całkowita norma?',
        'Jak ulżyć córce przy silnych bólach brzucha i skurczach menstruacyjnych?',
        'Jak reagować na wahania nastroju i burzę emocjonalną nastolatki?',
        'Córka ma kompleksy z powodu wyglądu i trądziku: wspierające słowa'
      ],
      '16+': [
        'Jak z zaufaniem rozmawiać o relacjach, granicach i świadomej zgodzie?',
        'Pierwsza profilaktyczna wizyta u ginekologa: jak córkę przygotować?',
        'Jak utrzymać bliską więź z dorastającą córką bez nadmiernej kontroli?',
        'Silny stres przed egzaminami i lęk o przyszłość: jak pomóc?'
      ]
    }
  },

  en: {
    title: 'Parent Guide',
    subtitle: 'How to talk with your daughter about body changes, puberty, and emotions with ease',
    privacyBadge: '100% Child Privacy Protected',
    privacyNotice: 'We do not store, track, or share your daughter’s private conversations from the chat. Trust and a sacred safe space are essential for a child’s emotional wellbeing. This section is designed to empower you with the knowledge, scripts, and confidence to become her greatest trusted guide.',
    backToApp: 'Back to App',
    
    tabs: {
      scripts: 'Conversation Scripts',
      byAge: 'Age Roadmap',
      checklist: 'Parent Checklist',
      aiConsultant: 'Parent AI Advisor'
    },

    ageGroups: {
      '8-9': '8–9 yrs (Early Childhood)',
      '10-12': '10–12 yrs (Pre-Puberty)',
      '13-15': '13–15 yrs (Adolescence)',
      '16+': '16+ yrs (Young Adults)'
    },

    ageRoadmap: {
      '8-9': {
        title: 'Early Steps: Body Boundaries & Natural Care',
        summary: 'Laying the foundation of healthy body positivity, safety, and hygiene.',
        physical: 'Body is preparing: losing milk teeth, growing permanent teeth, growth spurts, early breast buds.',
        emotional: 'Higher sensitivity, curiosity about adult life, fears of darkness or social judgment.',
        goals: [
          'Reinforce the "Swimsuit Rule": areas under a swimsuit are private and belong only to her.',
          'Teach gentle daily personal hygiene without shame.',
          'Reassure her that she can tell mom and dad any secret without fear of anger.'
        ],
        adviceForDads: 'Dads should remain warm and engaged: support her sports, listen without lecturing, and teach clear personal boundaries.'
      },
      '10-12': {
        title: 'Puberty Begins: Preparing for Her First Period',
        summary: 'Crucial window for proactive connection. Always talk about menstruation BEFORE it arrives, not after.',
        physical: 'Breast development (often uneven), armpit and pubic hair, changing sweat odor, whitish vaginal discharge 6–12 months prior to menarche.',
        emotional: 'Comparing herself with peers, emotional mood swings, self-consciousness about body changes, desire for privacy.',
        goals: [
          'Explain menstruation calmly: it is a sign of health and strength, never an illness or shame.',
          'Pack an Emergency Period Kit together for her school backpack.',
          'Pick her first soft bralette and gentle deodorant.'
        ],
        adviceForDads: 'Single dads: do not shy away from pads. Stock up ahead of time and show her where they are kept. Reassure her: "Your body is growing wonderfully. I am right here for you and will get you whatever you need."'
      },
      '13-15': {
        title: 'Teenage Currents: Hormones, Boundaries & Identity',
        summary: 'A time of rapid growth, shifting moods, and establishing autonomy.',
        physical: 'Menstrual cycle establishment (irregularity in the first 1–2 years is biologically normal), cramps, acne.',
        emotional: 'Separating from parents, sensitivity to body comments, need for private space (knocking on her door is mandatory).',
        goals: [
          'Help manage cramps and PMS: warm compress, herbal tea, cycle tracking app.',
          'Discuss digital safety: private photos, peer pressure, assertive "NO".',
          'Introduce a friendly adolescent gynecologist for a gentle check-up.'
        ],
        adviceForDads: 'Respect her closed door. Never joke about her appearance, appetite, or mood swings. A father’s calm, unconditional acceptance builds her lifelong self-esteem.'
      },
      '16+': {
        title: 'Autonomy and Maturity',
        summary: 'Solidifying adult identity and self-guided health ownership.',
        physical: 'Stabilized menstrual rhythm, adult physical development.',
        emotional: 'Peer-to-peer discussions, consent, healthy relationships, independence.',
        goals: [
          'Serve as a supportive advisor rather than an authoritarian judge.',
          'Talk openly about reproductive health, boundaries, and mutual consent.'
        ],
        adviceForDads: 'Treat her with adult respect. Let her know home is always a sanctuary of unconditional support.'
      }
    },

    scripts: [
      {
        id: 'start-period-talk',
        topic: 'How to bring up her first period',
        situation: 'Daughter is 10–11 years old. Signs haven’t started yet, but you want to prepare her gently in advance.',
        whatToSay: '«Sweetheart, you are growing up so nicely, and soon your body will start changing. Sometime soon your period will begin — that is when a little blood comes out once a month. It’s a wonderful sign that your body is strong and healthy! Let’s pick out some comfy pads to keep in your backpack so you always feel confident and prepared.»',
        phrasesToAvoid: [
          '«Well, your womanly curse is about to start...»',
          '«Childhood is over, you are a woman now.»'
        ],
        betterAlternatives: [
          '«It’s a natural and beautiful milestone of your body growing up.»',
          '«You are still our sweet girl, your body is just learning new superpowers.»'
        ]
      },
      {
        id: 'child-is-shy',
        topic: 'What to do if she is shy or shuts down',
        situation: 'She blushes, gets annoyed, or says "Mom/Dad, stop, I already know everything".',
        whatToSay: '«I totally understand that talking about this feels a little awkward. I promise not to interrogate you. Just remember: there are always pads and wipes in the bathroom cabinet. And if you ever have any questions, you can ask in person or simply send a text. I will never laugh or judge you.»',
        phrasesToAvoid: [
          '«Why are you embarrassed? I am your mother/father!»'
        ],
        betterAlternatives: [
          '«It is completely normal to feel shy. Take all the time you need.»'
        ]
      }
    ],

    checklistItems: [
      {
        id: 'c1',
        category: 'school_kit',
        title: 'Pack an "Emergency Confidence Kit" for school',
        desc: 'A small pouch: 2–3 pads, gentle feminine wipes, and a clean spare pair of underwear in a zip bag.'
      },
      {
        id: 'c2',
        category: 'home_bath',
        title: 'Create open-access hygiene storage at home',
        desc: 'Keep pads and products visible in the bathroom so she never has to ask or feel uncomfortable.'
      },
      {
        id: 'c3',
        category: 'secret_code',
        title: 'Establish a secret safety word or emoji',
        desc: 'Agree on a secret signal (like 🌸) she can text if she needs you to pick her up from friends or school immediately without questions.'
      }
    ],

    aiPromptChips: [
      'How can a dad talk comfortably to his daughter about periods?',
      'Is an irregular cycle normal during the first 2 years?',
      'What should go into a school emergency period kit?',
      'How to handle teenage mood swings with empathy?'
    ],

    aiPromptChipsByAge: {
      '8-9': [
        'How to explain the Swimsuit Rule and body autonomy simply?',
        'Daughter is scared of darkness or losing teeth, how to soothe?',
        'How can a dad talk comfortably with an 8yo about bodies?',
        'What should I do if my child mentions an uncomfortable secret at school?'
      ],
      '10-12': [
        'How to gently bring up first periods before they happen?',
        'Daughter feels shy about body changes and isolates, what to say?',
        'What should go into a school Emergency Confidence Kit?',
        'Advice for single dads: how to buy and provide first pads?'
      ],
      '13-15': [
        'Is an irregular cycle normal during the first 1–2 years?',
        'How to relieve painful cramps and period discomfort safely?',
        'How to handle sudden teenage tears and emotional storms?',
        'Daughter is insecure about acne and body image: supportive words'
      ],
      '16+': [
        'How to talk with confidence about relationships and consent?',
        'First routine visit to a gynecologist: how to prepare her?',
        'How to maintain deep connection with an older teen without micromanaging?',
        'Severe exam stress and perfectionism: how to provide relief?'
      ]
    }
  }
};

export const getParentGuideData = (lang = 'ru') => {
  return PARENT_GUIDE_DATA[lang] || PARENT_GUIDE_DATA.ru;
};
