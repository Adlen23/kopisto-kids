'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'أم يوسف',
    role: 'أم لطفل عمره 5 سنوات',
    text: 'كوبيستو غيّر طريقة تعلّم ابني! أصبح يحب الرياضيات ويسألني كل يوم يريد اللعب مع كوبيستو. أنصح كل أم بتجربته!',
    avatar: '👩',
    rating: 5,
  },
  {
    name: 'أبو ليلى',
    role: 'أب لطفلتين',
    text: 'أفضل تطبيق تعليمي للأطفال! ابنتاي تتنافسان على من ستجمع نجوم أكثر. المحتوى ممتاز والتصميم رائع.',
    avatar: '👨',
    rating: 5,
  },
  {
    name: 'مريم',
    role: 'معلمة رياض أطفال',
    text: 'أستخدم كوبيستو في الفصل和大 والأطفال يحبونه! الألعاب التفاعلية تساعدهم على الفهم بشكل أسرع وأفضل.',
    avatar: '👩‍🏫',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50/60 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-50/60 rounded-full blur-3xl" />

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
            💬
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
            ماذا يقول <span className="bg-gradient-to-l from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">الآباء</span>؟
          </h2>
          <p className="text-purple-600/70 text-lg">آراء أولياء الأمور والمعلمين عن تجربتهم مع كوبيستو</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-gradient-to-b from-purple-50/80 to-white rounded-2xl p-6 border border-purple-100 shadow-md relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(139, 92, 246, 0.1)' }}
            >
              {/* Quote mark */}
              <div className="absolute top-3 left-4 text-5xl text-purple-200 font-serif leading-none">&ldquo;</div>

              <div className="relative z-10">
                <p className="text-purple-800/80 leading-relaxed mb-6 text-sm mt-4">
                  {testimonial.text}
                </p>

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-yellow-400 text-sm"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + i * 0.1 }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-purple-900 text-sm">{testimonial.name}</div>
                    <div className="text-xs text-purple-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
