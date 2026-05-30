'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const features = [
  {
    icon: '🎯',
    title: 'تعلّم مستهدف',
    description: 'منهج تعليمي مصمم بعناية يتوافق مع المناهج الدراسية لكل مرحلة عمرية',
    color: 'from-purple-400 to-violet-500',
  },
  {
    icon: '🛡️',
    title: 'بيئة آمنة',
    description: 'مساحة تعليمية آمنة تماماً بدون إعلانات أو محتوى غير مناسب للأطفال',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: '📊',
    title: 'تقارير للآباء',
    description: 'تتبع تقدم طفلك واحصل على تقارير مفصلة عن نقاط القوة والتطوير',
    color: 'from-blue-400 to-indigo-500',
  },
  {
    icon: '🌍',
    title: 'محتوى عربي',
    description: 'محتوى تعليمي أصيل باللغة العربية يعزز الهوية والانتماء الثقافي',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: '⏰',
    title: 'تحكم بالوقت',
    description: 'أدوات ذكية للأهل للتحكم بمدة الاستخدام ووضع حدود زمنية مناسبة',
    color: 'from-rose-400 to-pink-500',
  },
  {
    icon: '🎮',
    title: 'تعلّم باللعب',
    description: 'نهج تعليمي مبتكر يجمع بين المتعة والفائدة لتحقيق أفضل النتائج',
    color: 'from-fuchsia-400 to-purple-500',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200/20 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-violet-200/20 rounded-full blur-xl" />

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
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            ✨
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            لماذا <span className="bg-gradient-to-l from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">كوبيستو</span>؟
          </h2>
          <p className="text-purple-600/70 text-lg max-w-2xl mx-auto">
            نصنع تجربة تعليمية فريدة تجمع بين المتعة والفائدة في بيئة آمنة ومحفزة
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group bg-white rounded-2xl p-6 border border-purple-50 shadow-md hover:shadow-xl transition-all relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <motion.div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl shadow-lg mb-4`}
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
              >
                {feature.icon}
              </motion.div>

              <h3 className="font-bold text-purple-900 text-lg mb-2">{feature.title}</h3>
              <p className="text-purple-600/60 text-sm leading-relaxed">{feature.description}</p>

              {/* Hover glow */}
              <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${feature.color} rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

              {/* Corner decoration */}
              <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                <div className={`absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full opacity-5`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
