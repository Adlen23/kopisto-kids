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
    name: 'الرياضيات',
    icon: '🔢',
    color: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-50',
    description: 'الأرقام والجمع والطرح بطريقة ممتعة',
    lessons: 12,
    progress: 75,
  },
  {
    name: 'اللغة العربية',
    icon: '📖',
    color: 'from-fuchsia-500 to-pink-600',
    bg: 'bg-fuchsia-50',
    description: 'الحروف والكلمات والجمل الجميلة',
    lessons: 15,
    progress: 60,
  },
  {
    name: 'العلوم',
    icon: '🔬',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    description: 'اكتشف أسرار الطبيعة والكون',
    lessons: 10,
    progress: 40,
  },
  {
    name: 'اللغة الإنجليزية',
    icon: '🌍',
    color: 'from-blue-500 to-cyan-600',
    bg: 'bg-blue-50',
    description: 'تعلّم كلمات وعبارات جديدة',
    lessons: 14,
    progress: 55,
  },
  {
    name: 'الفنون',
    icon: '🎨',
    color: 'from-rose-500 to-orange-600',
    bg: 'bg-rose-50',
    description: 'ارسم ولوّن وأبدع مع كوبيستو',
    lessons: 8,
    progress: 85,
  },
]

export default function LearningPath() {
  return (
    <section id="learn" className="py-20 bg-purple-50/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-violet-200/30 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
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
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            طريق <span className="bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">التعلّم</span>
          </h2>
          <p className="text-purple-600/70 text-lg max-w-2xl mx-auto">
            اختر المادة التي تريد تعلّمها وابدأ مغامرتك التعليمية مع كوبيستو!
          </p>
        </motion.div>

        {/* Learning Path - Connected Cards */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-l from-purple-200 via-violet-300 to-purple-200 -translate-y-1/2 rounded-full" />
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-l from-purple-400 via-violet-500 to-purple-400 -translate-y-1/2 rounded-full animate-dash"
            style={{
              backgroundSize: '20px 20px',
              backgroundImage: 'repeating-linear-gradient(90deg, #8b5cf6, #8b5cf6 10px, transparent 10px, transparent 20px)',
            }}
          />

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
                  {/* Subject Icon */}
                  <div className="relative mb-4">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-md mx-auto"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {subject.icon}
                    </motion.div>
                    {/* Step number */}
                    <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-l ${subject.color} text-white text-xs font-bold flex items-center justify-center shadow-md`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Subject Info */}
                  <h3 className="font-bold text-purple-900 text-center mb-1">{subject.name}</h3>
                  <p className="text-purple-600/60 text-xs text-center mb-3">{subject.description}</p>

                  {/* Progress Bar */}
                  <div className="bg-white rounded-full h-2.5 overflow-hidden mb-2">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-l ${subject.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${subject.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.15 + 0.5 }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-purple-500">
                    <span>{subject.lessons} درس</span>
                    <span className="font-semibold">{subject.progress}%</span>
                  </div>

                  {/* Hover decoration */}
                  <div className={`absolute -bottom-8 -right-8 w-24 h-24 bg-gradient-to-l ${subject.color} rounded-full opacity-0 group-hover:opacity-10 transition-opacity`} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
