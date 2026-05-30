'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Game {
  id: number
  title: string
  description: string
  icon: string
  color: string
  gradient: string
  category: string
  difficulty: string
  players: string
}

const games: Game[] = [
  {
    id: 1,
    title: 'عدّ مع كوبيستو',
    description: 'تعلّم الأرقام والعد من 1 إلى 20 بطريقة ممتعة مع كوبيستو الصغير!',
    icon: '🔢',
    color: 'from-purple-500 to-violet-600',
    gradient: 'from-purple-50 to-violet-50',
    category: 'رياضيات',
    difficulty: 'سهل',
    players: 'فردي',
  },
  {
    id: 2,
    title: 'أبجدية المغامرة',
    description: 'اكتشف حروف الهجاء العربية من خلال مغامرات مشوّقة وألغاز ممتعة!',
    icon: '📖',
    color: 'from-fuchsia-500 to-pink-600',
    gradient: 'from-fuchsia-50 to-pink-50',
    category: 'لغة عربية',
    difficulty: 'سهل',
    players: 'فردي',
  },
  {
    id: 3,
    title: 'عالم الحيوانات',
    description: 'تعرّف على الحيوانات وأصواتها وبيئاتها في رحلة سافاري مميزة!',
    icon: '🦁',
    color: 'from-amber-500 to-orange-600',
    gradient: 'from-amber-50 to-orange-50',
    category: 'علوم',
    difficulty: 'متوسط',
    players: 'فردي',
  },
  {
    id: 4,
    title: 'ألوان قوس قزح',
    description: 'تعلّم الألوان وامزجها لاكتشاف ألوان جديدة في ورشة الرسم السحرية!',
    icon: '🎨',
    color: 'from-emerald-500 to-teal-600',
    gradient: 'from-emerald-50 to-teal-50',
    category: 'فنون',
    difficulty: 'سهل',
    players: 'فردي',
  },
  {
    id: 5,
    title: 'لغز الأشكال',
    description: 'ركّب الأشكال الهندسية لحل الألغاز وبناء عالم كوبيستو الجميل!',
    icon: '🧩',
    color: 'from-blue-500 to-indigo-600',
    gradient: 'from-blue-50 to-indigo-50',
    category: 'هندسة',
    difficulty: 'متوسط',
    players: 'فردي',
  },
  {
    id: 6,
    title: 'ذاكرة كوبيستو',
    description: 'اختبر ذاكرتك! اقلب البطاقات واعثر على الأزواج المتشابهة!',
    icon: '🧠',
    color: 'from-rose-500 to-red-600',
    gradient: 'from-rose-50 to-red-50',
    category: 'ذاكرة',
    difficulty: 'متوسط',
    players: 'ثنائي',
  },
  {
    id: 7,
    title: 'موسيقى النجوم',
    description: 'عزف ألحاناً جميلة وتعلّم الإيقاع مع كوبيستو في حفل النجوم!',
    icon: '🎵',
    color: 'from-violet-500 to-purple-600',
    gradient: 'from-violet-50 to-purple-50',
    category: 'موسيقى',
    difficulty: 'سهل',
    players: 'فردي',
  },
  {
    id: 8,
    title: 'سباق الحساب',
    description: 'سارع بحل مسائل الجمع والطرح قبل انتهاء الوقت وفز بالكأس!',
    icon: '🏁',
    color: 'from-cyan-500 to-blue-600',
    gradient: 'from-cyan-50 to-blue-50',
    category: 'رياضيات',
    difficulty: 'صعب',
    players: 'ثنائي',
  },
]

const categories = ['الكل', 'رياضيات', 'لغة عربية', 'علوم', 'فنون', 'هندسة', 'ذاكرة', 'موسيقى']

export default function GamesSection() {
  const [activeCategory, setActiveCategory] = useState('الكل')
  const [hoveredGame, setHoveredGame] = useState<number | null>(null)

  const filteredGames = activeCategory === 'الكل'
    ? games
    : games.filter(g => g.category === activeCategory)

  return (
    <section id="games" className="py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block text-4xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎮
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            ألعاب <span className="bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">ممتعة</span> ومعلومة!
          </h2>
          <p className="text-purple-600/70 text-lg max-w-2xl mx-auto">
            اكتشف مجموعة متنوعة من الألعاب التعليمية المصممة خصيصاً لتنمية مهارات طفلك
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-gradient-to-l from-purple-600 to-violet-500 text-white shadow-lg shadow-purple-300/30'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredGames.map((game, index) => (
            <motion.div
              key={game.id}
              className="game-card group relative bg-white rounded-2xl border-2 border-purple-50 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onHoverStart={() => setHoveredGame(game.id)}
              onHoverEnd={() => setHoveredGame(null)}
              whileHover={{
                borderColor: '#c084fc',
                boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15)',
              }}
            >
              {/* Game Icon Area */}
              <div className={`bg-gradient-to-bl ${game.gradient} p-6 flex items-center justify-center relative overflow-hidden`}>
                <motion.div
                  className="text-5xl"
                  animate={hoveredGame === game.id ? { scale: 1.2, rotate: [0, -10, 10, 0] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {game.icon}
                </motion.div>
                {/* Background decoration */}
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/20 rounded-full" />
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-white/10 rounded-full" />
              </div>

              {/* Game Info */}
              <div className="p-5">
                <h3 className="font-bold text-purple-900 text-lg mb-2">{game.title}</h3>
                <p className="text-purple-600/60 text-sm leading-relaxed mb-3">{game.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                      game.difficulty === 'سهل' ? 'bg-green-100 text-green-700' :
                      game.difficulty === 'متوسط' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {game.difficulty}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-lg bg-purple-100 text-purple-700 font-medium">
                      {game.players}
                    </span>
                  </div>
                  <motion.button
                    className={`w-8 h-8 rounded-full bg-gradient-to-l ${game.color} text-white flex items-center justify-center text-sm shadow-md`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    ▶
                  </motion.button>
                </div>
              </div>

              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent flex items-end justify-center pb-8 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredGame === game.id ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.button
                  className={`bg-gradient-to-l ${game.color} text-white px-6 py-3 rounded-xl font-bold shadow-xl`}
                  initial={{ y: 20 }}
                  animate={hoveredGame === game.id ? { y: 0 } : { y: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  العب الآن! 🎮
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
