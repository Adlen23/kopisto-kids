'use client'

import { motion } from 'framer-motion'

interface Subject {
  name: string
  icon: string
  color: string
  bg: string
  description: string
  lessons: number
  progress: number
}

const subjects: Subject[] = [
  {
    name: 'Mathematics',
    icon: '🔢',
    color: 'from-sky-500 to-sky-600',
    bg: 'bg-sky-50',
    description: 'Numbers, addition & subtraction the fun way',
    lessons: 12,
    progress: 75,
  },
  {
    name: 'Arabic Language',
    icon: '📖',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    description: 'Letters, words and beautiful sentences',
    lessons: 15,
    progress: 60,
  },
  {
    name: 'Science',
    icon: '🔬',
    color: 'from-teal-500 to-teal-600',
    bg: 'bg-teal-50',
    description: 'Discover nature and the universe',
    lessons: 10,
    progress: 40,
  },
  {
    name: 'English',
    icon: '🌍',
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
    description: 'Learn new words and phrases',
    lessons: 14,
    progress: 55,
  },
  {
    name: 'Arts',
    icon: '🎨',
    color: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-50',
    description: 'Draw, color and create with Kopisto',
    lessons: 8,
    progress: 85,
  },
]

export default function LearningPath() {
  return (
    <section id="learn" className="py-16 md:py-20 bg-sky-50/50 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-32 h-32 bg-sky-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-sky-200/30 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block text-4xl mb-4"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📚
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
            Learning <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Path</span>
          </h2>
          <p className="text-sky-600/70 text-lg max-w-2xl mx-auto">
            Choose the subject you want to learn and start your educational adventure with Kopisto!
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-sky-200 via-sky-300 to-sky-200 -translate-y-1/2 rounded-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                className="relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className={`${subject.bg} rounded-2xl p-6 border-2 border-white shadow-lg hover:shadow-xl transition-all cursor-pointer relative overflow-hidden group`}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="relative mb-4">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-md mx-auto"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {subject.icon}
                    </motion.div>
                    <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-r ${subject.color} text-white text-xs font-bold flex items-center justify-center shadow-md`}>
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="font-bold text-sky-900 text-center mb-1">{subject.name}</h3>
                  <p className="text-sky-600/60 text-xs text-center mb-3">{subject.description}</p>

                  <div className="bg-white rounded-full h-2.5 overflow-hidden mb-2">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${subject.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${subject.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-sky-500">
                    <span>{subject.lessons} lessons</span>
                    <span className="font-semibold">{subject.progress}%</span>
                  </div>

                  <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-r ${subject.color} rounded-full opacity-0 group-hover:opacity-10 transition-opacity`} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
