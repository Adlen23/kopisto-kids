'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gradient blob */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-purple-300/30 to-violet-200/20 animate-blob"
        />
        <div
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-purple-200/30 to-pink-200/20 animate-blob"
          style={{ animationDelay: '2s' }}
        />
        {/* Decorative circles */}
        <div className="absolute top-1/4 right-[10%] w-3 h-3 bg-purple-400 rounded-full animate-bounce-soft" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 left-[15%] w-2 h-2 bg-violet-300 rounded-full animate-bounce-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-[20%] w-4 h-4 bg-purple-300 rounded-full animate-bounce-soft" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-[5%] w-2 h-2 bg-fuchsia-300 rounded-full animate-bounce-soft" style={{ animationDelay: '2s' }} />
        {/* Stars */}
        <div className="absolute top-[15%] left-[25%] text-2xl animate-sparkle" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute top-[20%] right-[30%] text-xl animate-sparkle" style={{ animationDelay: '1.5s' }}>✨</div>
        <div className="absolute bottom-[30%] left-[10%] text-lg animate-sparkle" style={{ animationDelay: '2.5s' }}>🌟</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
            >
              <span className="animate-bounce-soft inline-block">🎉</span>
              مرحباً بك في عالم كوبيستو!
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-l from-purple-700 via-violet-600 to-purple-500 bg-clip-text text-transparent">
              تعلّم والعب
            </span>
            <br />
            <span className="text-purple-900">
              مع{' '}
            </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-l from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                كوبيستو
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-3 bg-purple-200/50 rounded-full -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              />
            </span>
            ! 🦊
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-purple-800/70 mb-8 max-w-lg mx-auto lg:mx-0 lg:mr-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            مغامرات تعليمية ممتعة تنمّي مهارات طفلك في الرياضيات واللغة والعلوم
            بطريقة مرحة ومسلية! 🚀
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="group relative bg-gradient-to-l from-purple-600 to-violet-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-300/40 overflow-hidden"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                ابدأ المغامرة!
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🚀
                </motion.span>
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-l from-violet-500 to-purple-600"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            <motion.button
              className="flex items-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-colors"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              شاهد الفيديو
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm">▶</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex items-center gap-8 mt-10 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[
              { value: '+50', label: 'لعبة تعليمية', icon: '🎮' },
              { value: '+10K', label: 'طفل سعيد', icon: '😊' },
              { value: '+5', label: 'مواد تعليمية', icon: '📖' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 1.2 + i * 0.15 }}
              >
                <div className="text-2xl font-bold text-purple-700">
                  {stat.icon} {stat.value}
                </div>
                <div className="text-xs text-purple-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Character Image */}
        <motion.div
          className="flex-1 relative flex justify-center"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
        >
          <div className="relative">
            {/* Glow effect behind character */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-violet-300/20 rounded-full blur-3xl scale-110" />

            {/* Character circle */}
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-purple-300/50"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/kopisto.jpeg"
                alt="كوبيستو - شخصية الألعاب التعليمية"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {/* Orbiting elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center text-xl shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '200px 200px' }}
            >
              ⭐
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-4 w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-lg shadow-lg"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '220px 180px' }}
            >
              🎨
            </motion.div>
            <motion.div
              className="absolute top-1/2 -right-8 w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-lg shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '180px 0px' }}
            >
              🔢
            </motion.div>

            {/* Speech bubble */}
            <motion.div
              className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl rounded-tr-sm px-4 py-2 shadow-lg border border-purple-100"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.5, type: 'spring' }}
            >
              <span className="text-sm font-semibold text-purple-700">
                هيا نلعب معاً! 🎉
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 60L48 55C96 50 192 40 288 42C384 44 480 58 576 62C672 66 768 60 864 52C960 44 1056 34 1152 36C1248 38 1344 52 1392 58L1440 65V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
