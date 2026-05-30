'use client'

import { motion } from 'framer-motion'

interface Achievement {
  title: string
  icon: string
  description: string
  earned: boolean
  color: string
}

const achievements: Achievement[] = [
  { title: 'المستكشف', icon: '🧭', description: 'أكمل أول لعبة', earned: true, color: 'from-amber-400 to-orange-500' },
  { title: 'العبقري', icon: '🧠', description: 'حل 10 ألغاز', earned: true, color: 'from-purple-400 to-violet-600' },
  { title: 'الفنان', icon: '🎨', description: 'ارسم 5 لوحات', earned: true, color: 'from-pink-400 to-rose-600' },
  { title: 'النجم', icon: '⭐', description: 'احصل على 50 نجمة', earned: false, color: 'from-yellow-400 to-amber-500' },
  { title: 'البطل', icon: '🏆', description: 'أكمل جميع المستويات', earned: false, color: 'from-emerald-400 to-teal-600' },
  { title: 'المبدع', icon: '💡', description: 'اخترع حلولاً جديدة', earned: false, color: 'from-blue-400 to-indigo-600' },
]

const weeklyProgress = [
  { day: 'السبت', completed: true },
  { day: 'الأحد', completed: true },
  { day: 'الاثنين', completed: true },
  { day: 'الثلاثاء', completed: false },
  { day: 'الأربعاء', completed: false },
  { day: 'الخميس', completed: false },
  { day: 'الجمعة', completed: false },
]

export default function RewardsSection() {
  return (
    <section id="rewards" className="py-20 bg-gradient-to-b from-purple-50/50 to-white relative overflow-hidden">
      {/* Confetti decoration */}
      <div className="absolute top-10 left-[20%] text-3xl opacity-20 animate-float-slow">🎊</div>
      <div className="absolute top-20 right-[15%] text-2xl opacity-20 animate-float-slow" style={{ animationDelay: '1s' }}>🎉</div>
      <div className="absolute bottom-20 left-[10%] text-3xl opacity-20 animate-float-slow" style={{ animationDelay: '2s' }}>✨</div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block text-4xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏆
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            إنجازات و<span className="bg-gradient-to-l from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">جوائز</span>
          </h2>
          <p className="text-purple-600/70 text-lg max-w-2xl mx-auto">
            اجمع النجوم وحقق الإنجازات! كل لعبة تكملها تقربك من لقب بطل كوبيستو!
          </p>
        </motion.div>

        {/* Weekly Challenge */}
        <motion.div
          className="bg-gradient-to-l from-purple-600 to-violet-500 rounded-3xl p-6 md:p-8 mb-10 text-white relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🎯</span>
              <h3 className="text-xl md:text-2xl font-bold">تحدي الأسبوع</h3>
            </div>
            <p className="text-white/80 mb-6">أكمل 3 ألعاب يومياً لمدة أسبوع واحصل على شارة المحارب!</p>

            <div className="flex items-center gap-2 sm:gap-3 justify-center md:justify-start overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
              {weeklyProgress.map((day, i) => (
                <motion.div
                  key={day.day}
                  className="flex flex-col items-center gap-1.5"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    day.completed
                      ? 'bg-yellow-300 text-purple-900 shadow-lg'
                      : 'bg-white/20 text-white/60 border border-white/30'
                  }`}>
                    {day.completed ? '⭐' : (i + 1)}
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-white/60">{day.day}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className={`relative rounded-2xl p-4 text-center cursor-pointer transition-all ${
                achievement.earned
                  ? 'bg-white border-2 border-purple-100 shadow-lg hover:shadow-xl'
                  : 'bg-gray-50 border-2 border-gray-100 opacity-60'
              }`}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: index * 0.1 }}
              whileHover={achievement.earned ? { y: -5, scale: 1.05 } : {}}
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-3 ${
                  achievement.earned
                    ? `bg-gradient-to-br ${achievement.color} shadow-lg`
                    : 'bg-gray-200'
                }`}
                whileHover={achievement.earned ? { rotate: [0, -10, 10, 0] } : {}}
              >
                {achievement.earned ? achievement.icon : '🔒'}
              </motion.div>
              <h4 className="font-bold text-purple-900 text-sm mb-1">{achievement.title}</h4>
              <p className="text-purple-500/60 text-xs">{achievement.description}</p>

              {achievement.earned && (
                <motion.div
                  className="absolute -top-2 -left-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-xs text-white shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: index * 0.1 + 0.5 }}
                >
                  ✓
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Star Counter */}
        <motion.div
          className="mt-10 bg-white rounded-2xl p-6 border-2 border-purple-100 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4">
            <motion.div
              className="w-14 h-14 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ⭐
            </motion.div>
            <div>
              <div className="text-2xl font-bold text-purple-900">37 نجمة</div>
              <div className="text-sm text-purple-500">13 نجمة للوصول للمستوى التالي!</div>
            </div>
          </div>

          <div className="flex-1 max-w-xs w-full">
            <div className="bg-purple-100 rounded-full h-4 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-l from-yellow-400 to-amber-300"
                initial={{ width: 0 }}
                whileInView={{ width: '74%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
            </div>
            <div className="flex justify-between text-xs text-purple-500 mt-1">
              <span>المستوى 3</span>
              <span>المستوى 4</span>
            </div>
          </div>

          <motion.button
            className="bg-gradient-to-l from-purple-600 to-violet-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            المزيد من النجوم ✨
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
