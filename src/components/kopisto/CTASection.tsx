'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function CTASection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          className="bg-gradient-to-l from-purple-600 via-violet-600 to-purple-700 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="absolute top-10 left-[20%] text-4xl opacity-10 animate-float-slow">🌟</div>
          <div className="absolute bottom-10 right-[20%] text-3xl opacity-10 animate-float-slow" style={{ animationDelay: '1s' }}>⭐</div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Character */}
            <motion.div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 shadow-xl flex-shrink-0"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/kopisto.jpeg"
                alt="كوبيستو"
                width={160}
                height={160}
                className="object-cover w-full h-full"
              />
            </motion.div>

            {/* Content */}
            <div className="text-center md:text-right flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                هيا نبدأ المغامرة مع كوبيستو! 🚀
              </h2>
              <p className="text-white/80 text-lg mb-6 max-w-lg">
                انضم لأكثر من 10,000 طفل يستمتعون بالتعلم مع كوبيستو كل يوم. سجّل الآن واحصل على أول أسبوع مجاناً!
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <motion.button
                  className="bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ابدأ مجاناً الآن! 🎉
                </motion.button>
                <motion.button
                  className="bg-white/10 text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-bold text-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  مشاهدة عرض 🎬
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
