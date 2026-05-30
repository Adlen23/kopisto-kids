'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

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
  href: string
  playable: boolean
  tag?: string
}

const games: Game[] = [
  {
    id: 1,
    title: 'Kopisto Runner',
    description: 'Jump on platforms and collect the right math answer! A Mario-style platformer!',
    icon: '🏃',
    color: 'from-sky-500 to-sky-600',
    gradient: 'from-sky-50 to-sky-50',
    category: 'Math',
    difficulty: 'Medium',
    players: 'Solo',
    href: '/play/math-runner',
    playable: true,
    tag: 'New',
  },
  {
    id: 2,
    title: 'Letter Adventure',
    description: 'Jump and collect Arabic letters in the correct order! A fun alphabet platformer!',
    icon: '📖',
    color: 'from-amber-500 to-orange-600',
    gradient: 'from-amber-50 to-orange-50',
    category: 'Language',
    difficulty: 'Medium',
    players: 'Solo',
    href: '/play/letter-adventure',
    playable: true,
    tag: 'New',
  },
  {
    id: 3,
    title: 'Count with Kopisto',
    description: 'Learn numbers and counting from 1 to 20 in a fun way! How many fruits do you see?',
    icon: '🔢',
    color: 'from-teal-500 to-teal-600',
    gradient: 'from-teal-50 to-teal-50',
    category: 'Math',
    difficulty: 'Easy',
    players: 'Solo',
    href: '/play/counting',
    playable: true,
  },
  {
    id: 4,
    title: 'Kopisto Memory',
    description: 'Test your memory! Flip the cards and find matching pairs!',
    icon: '🧠',
    color: 'from-orange-500 to-orange-600',
    gradient: 'from-orange-50 to-orange-50',
    category: 'Memory',
    difficulty: 'Medium',
    players: 'Duo',
    href: '/play/memory',
    playable: true,
  },
  {
    id: 5,
    title: 'Animal World',
    description: 'Discover animals, their sounds and habitats on a unique safari journey!',
    icon: '🦁',
    color: 'from-emerald-500 to-teal-600',
    gradient: 'from-emerald-50 to-teal-50',
    category: 'Science',
    difficulty: 'Medium',
    players: 'Solo',
    href: '#',
    playable: false,
    tag: 'Coming',
  },
  {
    id: 6,
    title: 'Rainbow Colors',
    description: 'Learn colors and mix them to discover new ones in the magical art workshop!',
    icon: '🎨',
    color: 'from-pink-500 to-rose-600',
    gradient: 'from-pink-50 to-rose-50',
    category: 'Art',
    difficulty: 'Easy',
    players: 'Solo',
    href: '#',
    playable: false,
    tag: 'Coming',
  },
  {
    id: 7,
    title: 'Shape Puzzle',
    description: 'Assemble geometric shapes to solve puzzles and build Kopisto\'s beautiful world!',
    icon: '🧩',
    color: 'from-yellow-500 to-amber-600',
    gradient: 'from-yellow-50 to-amber-50',
    category: 'Geometry',
    difficulty: 'Medium',
    players: 'Solo',
    href: '#',
    playable: false,
    tag: 'Coming',
  },
  {
    id: 8,
    title: 'Star Music',
    description: 'Play beautiful melodies and learn rhythm with Kopisto at the star concert!',
    icon: '🎵',
    color: 'from-violet-500 to-purple-600',
    gradient: 'from-violet-50 to-purple-50',
    category: 'Music',
    difficulty: 'Easy',
    players: 'Solo',
    href: '#',
    playable: false,
    tag: 'Coming',
  },
]

const categories = ['All', 'Math', 'Language', 'Science', 'Art', 'Geometry', 'Memory', 'Music']

export default function GamesSection() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredGames = activeCategory === 'All'
    ? games
    : games.filter(g => g.category === activeCategory)

  return (
    <section id="games" className="py-16 md:py-20 bg-white relative">
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
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
            Fun & <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Educational</span> Games!
          </h2>
          <p className="text-sky-600/70 text-lg max-w-2xl mx-auto">
            Discover a variety of educational games designed specifically to develop your child&apos;s skills
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex gap-2 mb-10 overflow-x-auto no-scrollbar px-2 -mx-2 md:flex-wrap md:justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-300/30'
                  : 'bg-sky-100 text-sky-700 hover:bg-sky-200'
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
              className="game-card group relative bg-white rounded-2xl border-2 border-sky-100 overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{
                borderColor: '#7dd3fc',
                boxShadow: '0 20px 40px rgba(14, 165, 233, 0.15)',
              }}
            >
              <Link href={game.playable ? game.href : '#'} className={`block ${!game.playable ? 'pointer-events-none' : ''}`}>
                {/* Game Icon Area */}
                <div className={`bg-gradient-to-bl ${game.gradient} p-6 flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    className="text-5xl"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {game.icon}
                  </motion.div>
                  {game.tag && (
                    <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-lg text-xs font-bold ${
                      game.tag === 'Coming' ? 'bg-gray-200 text-gray-600' : 'bg-orange-400 text-white'
                    }`}>
                      {game.tag}
                    </div>
                  )}
                  <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/20 rounded-full" />
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-white/10 rounded-full" />
                </div>

                {/* Game Info */}
                <div className="p-5">
                  <h3 className="font-bold text-sky-900 text-lg mb-2">{game.title}</h3>
                  <p className="text-sky-600/60 text-sm leading-relaxed mb-3">{game.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                        game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                        game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {game.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-lg bg-sky-100 text-sky-700 font-medium">
                        {game.players}
                      </span>
                    </div>
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${game.color} text-white flex items-center justify-center text-sm shadow-md ${
                      game.playable ? '' : 'opacity-50'
                    }`}>
                      ▶
                    </div>
                  </div>
                </div>
              </Link>

              {game.playable && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-900/20 to-transparent flex items-end justify-center pb-6 sm:pb-8 pointer-events-none opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-100 [@media(hover:none)]:from-sky-900/50 transition-opacity"
                >
                  <div className={`bg-gradient-to-r ${game.color} text-white px-6 py-3 rounded-xl font-bold shadow-xl`}>
                    Play Now! 🎮
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
