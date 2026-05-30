'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="hero" className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Sky Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100" />

      {/* Clouds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[8%] left-[5%] w-32 h-16 bg-white/70 rounded-full blur-sm animate-float-slow" />
        <div className="absolute top-[12%] left-[8%] w-20 h-12 bg-white/60 rounded-full blur-sm animate-float-slow" />
        <div className="absolute top-[15%] right-[10%] w-40 h-20 bg-white/60 rounded-full blur-sm animate-float-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[18%] right-[14%] w-24 h-14 bg-white/50 rounded-full blur-sm animate-float-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[25%] left-[40%] w-28 h-14 bg-white/40 rounded-full blur-sm animate-float-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[10%] right-[40%] w-36 h-18 bg-white/50 rounded-full blur-sm animate-float-slow" style={{ animationDelay: '0.5s' }} />

        {/* Sun */}
        <div className="absolute top-[5%] right-[8%] w-16 h-16 md:w-20 md:h-20 bg-yellow-300 rounded-full shadow-lg shadow-yellow-200/50 animate-pulse-glow-sun">
          <div className="absolute inset-1 bg-yellow-200 rounded-full" />
        </div>
      </div>

      {/* Grass at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          {/* Back hill */}
          <path d="M0 80C200 40 400 60 600 80C800 100 1000 50 1200 70C1350 80 1400 60 1440 80V200H0V80Z" fill="#4ade80" />
          {/* Front hill */}
          <path d="M0 120C150 90 350 110 550 100C750 90 950 130 1150 110C1300 95 1400 115 1440 100V200H0V120Z" fill="#22c55e" />
          {/* Grass detail */}
          <path d="M0 150C200 130 400 160 600 145C800 130 1000 165 1200 150C1350 140 1400 155 1440 145V200H0V150Z" fill="#16a34a" />
        </svg>
      </div>

      {/* Small decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Flowers */}
        <div className="absolute bottom-[25%] left-[8%] text-2xl animate-bounce-soft" style={{ animationDelay: '0.5s' }}>🌸</div>
        <div className="absolute bottom-[28%] left-[15%] text-xl animate-bounce-soft" style={{ animationDelay: '1s' }}>🌻</div>
        <div className="absolute bottom-[22%] right-[10%] text-2xl animate-bounce-soft" style={{ animationDelay: '1.5s' }}>🌺</div>
        <div className="absolute bottom-[30%] right-[18%] text-xl animate-bounce-soft" style={{ animationDelay: '0.8s' }}>🌷</div>
        {/* Stars/sparkles */}
        <div className="absolute top-[30%] left-[20%] text-lg animate-sparkle" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute top-[20%] right-[25%] text-lg animate-sparkle" style={{ animationDelay: '1.5s' }}>✨</div>
        <div className="absolute top-[40%] left-[50%] text-lg animate-sparkle" style={{ animationDelay: '2s' }}>⭐</div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-right animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-white/90 text-sky-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg border border-sky-100 animate-pop-in">
            <span className="animate-bounce-soft inline-block">🎉</span>
            {t.hero.badge}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-sky-800">
              {t.hero.title1}
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </h1>

          <p className="text-xl md:text-2xl font-semibold text-sky-700/80 mb-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {t.hero.subtitle}
          </p>

          <p className="text-base md:text-lg text-sky-800/60 mb-8 max-w-lg mx-auto lg:mx-0 lg:mr-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <a href="/games" className="group relative bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-orange-300/40 overflow-hidden active:scale-95 transition-transform hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                {t.hero.cta} 🚀
              </span>
            </a>
          </div>
        </div>

        {/* Character Image */}
        <div className="flex-1 relative flex justify-center animate-pop-in" style={{ animationDelay: '0.3s' }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-white/10 rounded-full scale-125" />

            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[380px] lg:h-[380px] rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-sky-300/50 animate-float">
              <Image
                src="/kopisto.webp"
                alt="Kopisto - Educational Games Character"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 380px"
              />
            </div>

            {/* Speech bubble */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl rounded-tr-sm px-4 py-2 shadow-lg border border-sky-100 animate-pop-in" style={{ animationDelay: '1.5s' }}>
              <span className="text-sm font-bold text-sky-700">
                {t.hero.badge} 👋
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
