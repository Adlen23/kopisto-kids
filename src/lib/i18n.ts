export type Locale = 'ar' | 'en'

export const translations = {
  ar: {
    // Navbar
    nav: {
      home: 'الرئيسية',
      games: 'ألعاب تعليمية',
      learn: 'تعلّم والعب',
      about: 'عن كوبيستو',
      parents: 'ركن الآباء',
    },
    // Hero
    hero: {
      badge: 'مرحباً بكم في عالم كوبيستو!',
      title1: 'مرحباً بكم في عالم',
      titleHighlight: 'كوبيستو!',
      subtitle: 'تعلّم ومرح للأطفال',
      description: 'مغامرات تعليمية ممتعة تنمّي مهارات طفلك في الرياضيات واللغة والعلوم بطريقة مرحة ومسلية!',
      cta: 'ابدأ المغامرة!',
    },
    // Cards
    cards: {
      sectionTitle: 'اختر مغامرتك',
      sectionSubtitle: 'اضغط على أي بطاقة لتبدأ رحلتك التعليمية مع كوبيستو',
      math: {
        title: 'مغامرة الرياضيات',
        description: 'اقفز واجمع الإجابات الصحيحة! تعلّم الجمع والطرح مع كوبيستو',
        cta: 'ابدأ الآن',
      },
      words: {
        title: 'ألغاز الكلمات',
        description: 'اكتشف الحروف واكوّن الكلمات! مغامرة لغوية ممتعة مع كوبيستو',
        cta: 'ابدأ الآن',
      },
      science: {
        title: 'استكشاف العلوم',
        description: 'اجرُ التجارب واكتشف العالم! رحلة علمية شيّقة مع كوبيستو',
        cta: 'ابدأ الآن',
      },
      art: {
        title: 'فن وإبداع',
        description: 'لوّن وابتكر وأبدع! أطلق خيالك مع كوبيستو',
        cta: 'ابدأ الآن',
      },
    },
    // Games page
    gamesPage: {
      title: 'ألعاب',
      titleHighlight: 'ممتعة',
      subtitle: 'ومعلومة!',
      description: 'اكتشف مجموعة متنوعة من الألعاب التعليمية المصممة خصيصاً لتنمية مهارات طفلك',
      all: 'الكل',
      math: 'رياضيات',
      language: 'لغة عربية',
      science: 'علوم',
      art: 'فنون',
      geometry: 'هندسة',
      memory: 'ذاكرة',
      music: 'موسيقى',
      playNow: 'العب الآن!',
      easy: 'سهل',
      medium: 'متوسط',
      hard: 'صعب',
      solo: 'فردي',
      duo: 'ثنائي',
      new: 'جديد',
      coming: 'قريباً',
      game1: { title: 'عدّاء كوبيستو', desc: 'اقفز على المنصات واجمع الإجابة الصحيحة للسؤال الرياضي! لعبة بلاتفورمر مثيرة بأسلوب ماريو!' },
      game2: { title: 'مغامرة الحروف', desc: 'اقفز واجمع الحروف العربية بالترتيب الصحيح! لعبة بلاتفورمر ممتعة لتعلّم الأبجدية!' },
      game3: { title: 'عدّ مع كوبيستو', desc: 'تعلّم الأرقام والعد من 1 إلى 20 بطريقة ممتعة! كم ثمرة ترى؟' },
      game4: { title: 'ذاكرة كوبيستو', desc: 'اختبر ذاكرتك! اقلب البطاقات واعثر على الأزواج المتشابهة!' },
      game5: { title: 'عالم الحيوانات', desc: 'تعرّف على الحيوانات وأصواتها وبيئاتها في رحلة سافاري مميزة!' },
      game6: { title: 'ألوان قوس قزح', desc: 'تعلّم الألوان وامزجها لاكتشاف ألوان جديدة في ورشة الرسم السحرية!' },
      game7: { title: 'لغز الأشكال', desc: 'ركّب الأشكال الهندسية لحل الألغاز وبناء عالم كوبيستو الجميل!' },
      game8: { title: 'موسيقى النجوم', desc: 'عزف ألحاناً جميلة وتعلّم الإيقاع مع كوبيستو في حفل النجوم!' },
    },
    // Learn page
    learnPage: {
      title: 'طريق',
      titleHighlight: 'التعلّم',
      description: 'اختر المادة التي تريد تعلّمها وابدأ مغامرتك التعليمية مع كوبيستو!',
      lessons: 'دروس',
      subjects: {
        math: { name: 'الرياضيات', desc: 'الأرقام والجمع والطرح بطريقة ممتعة' },
        arabic: { name: 'اللغة العربية', desc: 'الحروف والكلمات والجمل الجميلة' },
        science: { name: 'العلوم', desc: 'اكتشف أسرار الطبيعة والكون' },
        english: { name: 'اللغة الإنجليزية', desc: 'تعلّم كلمات وعبارات جديدة' },
        art: { name: 'الفنون', desc: 'ارسم ولوّن وأبدع مع كوبيستو' },
      },
    },
    // About page
    aboutPage: {
      title: 'من هو',
      titleHighlight: 'كوبيستو',
      description: 'كوبيستو هو صديقك الصغير المحب للتعلم والمغامرة! يحب اكتشاف أشياء جديدة كل يوم ومساعدة الأطفال على التعلّم بطريقة ممتعة. مع كوبيستو، كل درس هو مغامرة وكل لعبة هي فرصة للتعلّم شيء جديد! 🚀',
      cta: 'تعرّف على كوبيستو أكثر ←',
      learningStar: '⭐ نجم التعلم',
      smart: '🎓 شاطر',
      facts: [
        { icon: '🎂', text: 'عمره 7 سنوات ويحب التعلم!' },
        { icon: '🎨', text: 'يحب الرسم والألوان كثيراً' },
        { icon: '📖', text: 'قصته المفضلة عن المغامرات' },
        { icon: '🌟', text: 'حلمه أن يصبح عالماً كبيراً' },
        { icon: '🍕', text: 'أكله المفضل البيتزا!' },
        { icon: '🎵', text: 'يغني ويرقص وهو يتعلم' },
      ],
    },
    // Rewards page
    rewardsPage: {
      title: 'إنجازات و',
      titleHighlight: 'جوائز',
      description: 'اجمع النجوم وحقق الإنجازات! كل لعبة تكملها تقربك من لقب بطل كوبيستو!',
      weeklyChallenge: 'تحدي الأسبوع',
      weeklyDesc: 'أكمل 3 ألعاب يومياً لمدة أسبوع واحصل على شارة المحارب!',
      days: { sat: 'السبت', sun: 'الأحد', mon: 'الاثنين', tue: 'الثلاثاء', wed: 'الأربعاء', thu: 'الخميس', fri: 'الجمعة' },
      stars: 'نجمة',
      starsToNext: 'نجمة للوصول للمستوى التالي!',
      level: 'المستوى',
      moreStars: 'المزيد من النجوم ✨',
      achievements: [
        { title: 'المستكشف', desc: 'أكمل أول لعبة', icon: '🧭' },
        { title: 'العبقري', desc: 'حل 10 ألغاز', icon: '🧠' },
        { title: 'الفنان', desc: 'ارسم 5 لوحات', icon: '🎨' },
        { title: 'النجم', desc: 'احصل على 50 نجمة', icon: '⭐' },
        { title: 'البطل', desc: 'أكمل جميع المستويات', icon: '🏆' },
        { title: 'المبدع', desc: 'اخترع حلولاً جديدة', icon: '💡' },
      ],
    },
    // Footer
    footer: {
      copyright: '© كوبيستو للتعليم 2026',
      privacy: 'سياسة الخصوصية',
      contact: 'اتصل بنا',
    },
    // Common
    common: {
      startNow: 'ابدأ الآن',
      new: 'جديد',
    },
  },
  en: {
    // Navbar
    nav: {
      home: 'Home',
      games: 'Educational Games',
      learn: 'Learn & Play',
      about: 'About Kopisto',
      parents: "Parent Zone",
    },
    // Hero
    hero: {
      badge: "Welcome to Kopisto's World!",
      title1: 'Welcome to',
      titleHighlight: "Kopisto's World!",
      subtitle: 'Fun & Learning for Kids',
      description: 'Exciting educational adventures that develop your child\'s skills in Math, Language, and Science in a fun and engaging way!',
      cta: 'Start the Adventure!',
    },
    // Cards
    cards: {
      sectionTitle: 'Choose Your Adventure',
      sectionSubtitle: 'Click on any card to start your educational journey with Kopisto',
      math: {
        title: 'Math Adventure',
        description: 'Jump and collect the right answers! Learn addition and subtraction with Kopisto',
        cta: 'Start Now',
      },
      words: {
        title: 'Word Puzzles',
        description: 'Discover letters and form words! A fun language adventure with Kopisto',
        cta: 'Start Now',
      },
      science: {
        title: 'Science Explorer',
        description: 'Conduct experiments and discover the world! An exciting science journey with Kopisto',
        cta: 'Start Now',
      },
      art: {
        title: 'Art & Creativity',
        description: 'Color, create, and innovate! Unleash your imagination with Kopisto',
        cta: 'Start Now',
      },
    },
    // Games page
    gamesPage: {
      title: 'Fun &',
      titleHighlight: 'Educational',
      subtitle: 'Games!',
      description: 'Discover a variety of educational games designed specifically to develop your child\'s skills',
      all: 'All',
      math: 'Math',
      language: 'Language',
      science: 'Science',
      art: 'Art',
      geometry: 'Geometry',
      memory: 'Memory',
      music: 'Music',
      playNow: 'Play Now!',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      solo: 'Solo',
      duo: 'Duo',
      new: 'New',
      coming: 'Coming',
      game1: { title: 'Kopisto Runner', desc: 'Jump on platforms and collect the right math answer! A Mario-style platformer!' },
      game2: { title: 'Letter Adventure', desc: 'Jump and collect Arabic letters in the correct order! A fun alphabet platformer!' },
      game3: { title: 'Count with Kopisto', desc: 'Learn numbers and counting from 1 to 20 in a fun way! How many fruits do you see?' },
      game4: { title: 'Kopisto Memory', desc: 'Test your memory! Flip the cards and find matching pairs!' },
      game5: { title: 'Animal World', desc: 'Discover animals, their sounds and habitats on a unique safari journey!' },
      game6: { title: 'Rainbow Colors', desc: 'Learn colors and mix them to discover new ones in the magical art workshop!' },
      game7: { title: 'Shape Puzzle', desc: "Assemble geometric shapes to solve puzzles and build Kopisto's beautiful world!" },
      game8: { title: 'Star Music', desc: 'Play beautiful melodies and learn rhythm with Kopisto at the star concert!' },
    },
    // Learn page
    learnPage: {
      title: 'Learning',
      titleHighlight: 'Path',
      description: 'Choose the subject you want to learn and start your educational adventure with Kopisto!',
      lessons: 'lessons',
      subjects: {
        math: { name: 'Mathematics', desc: 'Numbers, addition & subtraction the fun way' },
        arabic: { name: 'Arabic Language', desc: 'Letters, words and beautiful sentences' },
        science: { name: 'Science', desc: 'Discover nature and the universe' },
        english: { name: 'English', desc: 'Learn new words and phrases' },
        art: { name: 'Arts', desc: 'Draw, color and create with Kopisto' },
      },
    },
    // About page
    aboutPage: {
      title: 'Who is',
      titleHighlight: 'Kopisto',
      description: 'Kopisto is your little friend who loves learning and adventure! He loves discovering new things every day and helping children learn in a fun way. With Kopisto, every lesson is an adventure and every game is an opportunity to learn something new! 🚀',
      cta: 'Get to know Kopisto more →',
      learningStar: '⭐ Learning Star',
      smart: '🎓 Smart',
      facts: [
        { icon: '🎂', text: '7 years old and loves learning!' },
        { icon: '🎨', text: 'Loves drawing and colors so much' },
        { icon: '📖', text: 'Favorite story is about adventures' },
        { icon: '🌟', text: 'Dreams of becoming a great scientist' },
        { icon: '🍕', text: 'Favorite food is pizza!' },
        { icon: '🎵', text: 'Sings and dances while learning' },
      ],
    },
    // Rewards page
    rewardsPage: {
      title: 'Achievements & ',
      titleHighlight: 'Rewards',
      description: 'Collect stars and earn achievements! Every game you complete brings you closer to becoming a Kopisto champion!',
      weeklyChallenge: 'Weekly Challenge',
      weeklyDesc: 'Complete 3 games daily for a week and earn the Warrior badge!',
      days: { sat: 'Sat', sun: 'Sun', mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri' },
      stars: 'Stars',
      starsToNext: 'more stars to reach the next level!',
      level: 'Level',
      moreStars: 'More Stars ✨',
      achievements: [
        { title: 'Explorer', desc: 'Complete first game', icon: '🧭' },
        { title: 'Genius', desc: 'Solve 10 puzzles', icon: '🧠' },
        { title: 'Artist', desc: 'Draw 5 paintings', icon: '🎨' },
        { title: 'Star', desc: 'Get 50 stars', icon: '⭐' },
        { title: 'Champion', desc: 'Complete all levels', icon: '🏆' },
        { title: 'Creative', desc: 'Invent new solutions', icon: '💡' },
      ],
    },
    // Footer
    footer: {
      copyright: '© Kopisto Learning 2026',
      privacy: 'Privacy Policy',
      contact: 'Contact',
    },
    // Common
    common: {
      startNow: 'Start Now',
      new: 'New',
    },
  },
} as const

export type Translations = typeof translations.ar
