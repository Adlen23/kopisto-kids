'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const fruits = ['🍎', '🍊', '🍋', '🍇', '🍓', '🫐', '🍑', '🍒']

function generateQuestion() {
  const count = Math.floor(Math.random() * 8) + 2
  const fruit = fruits[Math.floor(Math.random() * fruits.length)]
  const wrong1 = count + Math.floor(Math.random() * 2) + 1
  const wrong2 = Math.max(1, count - Math.floor(Math.random() * 2) - 1)
  const options = [count, wrong1, wrong2].sort(() => Math.random() - 0.5)
  return { count, fruit, options, correct: count }
}

export default function CountingGame() {
  const [question, setQuestion] = useState(generateQuestion())
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleAnswer = (answer: number) => {
    if (feedback) return
    setTotalQuestions(t => t + 1)

    if (answer === question.correct) {
      setScore(s => s + 1)
      setFeedback('correct')
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1500)
    } else {
      setFeedback('wrong')
    }

    setTimeout(() => {
      setFeedback(null)
      setQuestion(generateQuestion())
    }, 1500)
  }

  useEffect(() => {
    setQuestion(generateQuestion())
  }, [])

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block text-4xl mb-4"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔢
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            عدّ مع <span className="bg-gradient-to-l from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">كوبيستو</span>!
          </h2>
          <p className="text-purple-600/70 text-lg">كم ثمرة ترى؟ اختر الإجابة الصحيحة!</p>
        </motion.div>

        {/* Score */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="bg-white rounded-xl px-4 py-2 shadow-md border border-purple-100 flex items-center gap-2">
            <span>⭐</span>
            <span className="font-bold text-purple-700">{score}/{totalQuestions}</span>
          </div>
        </div>

        {/* Game Area */}
        <motion.div
          className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100 relative"
          key={`${question.count}-${question.fruit}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
        >
          {/* Confetti */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-lg"
                  initial={{
                    x: '50%',
                    y: '50%',
                    opacity: 1,
                    scale: 0,
                  }}
                  animate={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    opacity: 0,
                    scale: 1,
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                >
                  {['🎉', '⭐', '✨', '🌟', '💫'][i % 5]}
                </motion.div>
              ))}
            </div>
          )}

          {/* Question */}
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-purple-900 mb-6">كم ثمرة ترى؟ 👀</h3>

            {/* Fruits display */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 min-h-[100px] bg-purple-50 rounded-2xl p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {Array.from({ length: question.count }).map((_, i) => (
                <motion.span
                  key={i}
                  className="text-4xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: i * 0.1 }}
                >
                  {question.fruit}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-3 gap-4">
            {question.options.map((option) => (
              <motion.button
                key={option}
                className={`py-5 rounded-2xl font-bold text-2xl shadow-md border-2 transition-all ${
                  feedback === null
                    ? 'bg-white border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-400'
                    : option === question.correct
                    ? 'bg-green-100 border-green-400 text-green-700'
                    : 'bg-red-50 border-red-200 text-red-400'
                }`}
                whileHover={feedback === null ? { scale: 1.05 } : {}}
                whileTap={feedback === null ? { scale: 0.95 } : {}}
                onClick={() => handleAnswer(option)}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {feedback === 'correct' ? (
                  <span className="text-xl font-bold text-green-600">
                    🎉 أحسنت! إجابة صحيحة!
                  </span>
                ) : (
                  <span className="text-xl font-bold text-red-500">
                    😅 حاول مرة أخرى! الإجابة هي {question.correct}
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
