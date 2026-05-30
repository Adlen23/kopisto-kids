'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback, useRef } from 'react'

interface Card {
  id: number
  emoji: string
  isFlipped: boolean
  isMatched: boolean
}

const cardEmojis = ['🦊', '🌟', '🎨', '🔢', '📖', '🎵', '🧩', '🚀']

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function createInitialCards(): Card[] {
  const pairs = cardEmojis.flatMap((emoji, idx) => [
    { id: idx * 2, emoji, isFlipped: false, isMatched: false },
    { id: idx * 2 + 1, emoji, isFlipped: false, isMatched: false },
  ])
  return shuffleArray(pairs)
}

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(createInitialCards)
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const flippedRef = useRef<number[]>([])
  const lockedRef = useRef(false)

  const initGame = useCallback(() => {
    setCards(createInitialCards())
    setFlippedIds([])
    setMoves(0)
    setIsWon(false)
    flippedRef.current = []
    lockedRef.current = false
  }, [])

  const handleCardClick = useCallback((id: number) => {
    if (lockedRef.current) return
    if (flippedRef.current.length >= 2) return

    setCards(prev => {
      const card = prev.find(c => c.id === id)
      if (!card || card.isFlipped || card.isMatched) return prev

      const newCards = prev.map(c =>
        c.id === id ? { ...c, isFlipped: true } : c
      )

      const newFlipped = [...flippedRef.current, id]
      flippedRef.current = newFlipped
      setFlippedIds(newFlipped)

      if (newFlipped.length === 2) {
        lockedRef.current = true
        setMoves(m => m + 1)
        const first = newCards.find(c => c.id === newFlipped[0])!
        const second = newCards.find(c => c.id === newFlipped[1])!

        if (first.emoji === second.emoji) {
          setTimeout(() => {
            setCards(p => {
              const updated = p.map(c =>
                c.emoji === first.emoji ? { ...c, isMatched: true } : c
              )
              if (updated.every(c => c.isMatched)) {
                setIsWon(true)
              }
              return updated
            })
            flippedRef.current = []
            lockedRef.current = false
          }, 500)
        } else {
          setTimeout(() => {
            setCards(p => p.map(c =>
              c.id === newFlipped[0] || c.id === newFlipped[1]
                ? { ...c, isFlipped: false }
                : c
            ))
            flippedRef.current = []
            lockedRef.current = false
          }, 800)
        }
      }

      return newCards
    })
  }, [])

  return (
    <section id="memory-game" className="py-20 bg-gradient-to-b from-white to-purple-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 rotate-12">🧠</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-10 -rotate-12">🃏</div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-4xl mb-4">🧠</span>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            لعبة <span className="bg-gradient-to-l from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">الذاكرة</span>
          </h2>
          <p className="text-purple-600/70 text-lg">
            اقلب البطاقات واعثر على الأزواج المتشابهة! كم محاولة تحتاج؟
          </p>
        </motion.div>

        {/* Game Stats */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8">
          <div className="bg-white rounded-xl px-4 py-2 shadow-md border border-purple-100">
            <span className="text-xs sm:text-sm text-purple-500">المحاولات</span>
            <div className="text-base sm:text-xl font-bold text-purple-700">{moves}</div>
          </div>
          <motion.button
            className="bg-gradient-to-l from-purple-600 to-violet-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-purple-300/30 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={initGame}
          >
            لعبة جديدة 🔄
          </motion.button>
          <div className="bg-white rounded-xl px-4 py-2 shadow-md border border-purple-100">
            <span className="text-xs sm:text-sm text-purple-500">الأزواج</span>
            <div className="text-base sm:text-xl font-bold text-purple-700">
              {cards.filter(c => c.isMatched).length / 2}/{cardEmojis.length}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 max-w-xs sm:max-w-md mx-auto">
          <AnimatePresence mode="popLayout">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                className="aspect-square cursor-pointer"
                initial={{ scale: 0, rotateY: 180 }}
                animate={{ scale: 1, rotateY: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                whileHover={!(card.isFlipped || card.isMatched) ? { scale: 1.08 } : {}}
                whileTap={!(card.isFlipped || card.isMatched) ? { scale: 0.9 } : {}}
                onClick={() => handleCardClick(card.id)}
              >
                <div
                  className={`w-full h-full rounded-xl flex items-center justify-center text-2xl sm:text-3xl transition-all duration-500 relative ${
                    card.isFlipped || card.isMatched
                      ? 'bg-gradient-to-br from-purple-100 to-violet-50 border-2 border-purple-200'
                      : 'bg-gradient-to-br from-purple-500 to-violet-600 border-2 border-purple-400 shadow-lg shadow-purple-300/30'
                  } ${card.isMatched ? 'border-green-300 bg-gradient-to-br from-green-50 to-emerald-50' : ''}`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: (card.isFlipped || card.isMatched) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  <span
                    className="absolute inset-0 flex items-center justify-center text-white text-lg sm:text-2xl font-bold"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    ?
                  </span>
                  <span
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    {card.isMatched ? '✅' : ''} {card.emoji}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Win Modal */}
        <AnimatePresence>
          {isWon && (
            <motion.div
              className="fixed inset-0 bg-purple-900/50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🏆
                </motion.div>
                <h3 className="text-2xl font-bold text-purple-900 mb-2">ممتاز! 🎉</h3>
                <p className="text-purple-600 mb-4">
                  أكملت اللعبة في <span className="font-bold text-purple-800">{moves}</span> محاولة!
                </p>
                <div className="flex items-center justify-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map(i => (
                    <motion.span
                      key={i}
                      className="text-2xl"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.15 }}
                    >
                      {i <= Math.max(1, 5 - Math.floor(moves / 4)) ? '⭐' : '☆'}
                    </motion.span>
                  ))}
                </div>
                <motion.button
                  className="bg-gradient-to-l from-purple-600 to-violet-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={initGame}
                >
                  العب مرة أخرى! 🔄
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
