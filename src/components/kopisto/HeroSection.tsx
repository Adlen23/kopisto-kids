'use client'

import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-purple-300/30 to-violet-200/20 animate-blob" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-tr from-purple-200/30 to-pink-200/20 animate-blob" style={{ animationDelay: '2s' }} />
        <div className="hidden md:block absolute top-1/4 right-[10%] w-3 h-3 bg-purple-400 rounded-full animate-bounce-soft" style={{ animationDelay: '0.5s' }} />
        <div className="hidden md:block absolute top-1/3 left-[15%] w-2 h-2 bg-violet-300 rounded-full animate-bounce-soft" style={{ animationDelay: '1s' }} />
        <div className="hidden md:block absolute bottom-1/3 right-[20%] w-4 h-4 bg-purple-300 rounded-full animate-bounce-soft" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[15%] left-[25%] text-2xl animate-sparkle" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute top-[20%] right-[30%] text-xl animate-sparkle" style={{ animationDelay: '1.5s' }}>✨</div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-right animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-pop-in">
            <span className="animate-bounce-soft inline-block">🎉</span>
            مرحباً بك في عالم كوبيستو!
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="bg-gradient-to-l from-purple-700 via-violet-600 to-purple-500 bg-clip-text text-transparent">
              تعلّم والعب
            </span>
            <br />
            <span className="text-purple-900">مع </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-l from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                كوبيستو
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-3 bg-purple-200/50 rounded-full -z-10 animate-scale-x" />
            </span>
            ! 🦊
          </h1>

          <p className="text-lg md:text-xl text-purple-800/70 mb-8 max-w-lg mx-auto lg:mx-0 lg:mr-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            مغامرات تعليمية ممتعة تنمّي مهارات طفلك في الرياضيات واللغة والعلوم
            بطريقة مرحة ومسلية! 🚀
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <a href="/games" className="group relative bg-gradient-to-l from-purple-600 to-violet-500 text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-purple-300/40 overflow-hidden active:scale-95 transition-transform">
              <span className="relative z-10 flex items-center gap-2">
                ابدأ المغامرة! 🚀
              </span>
            </a>

            <button className="flex items-center gap-2 bg-white text-purple-700 px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-lg border-2 border-purple-100 active:scale-95 transition-transform">
              شاهد الفيديو
              <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm">▶</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 sm:gap-8 mt-10 justify-center lg:justify-start animate-fade-in" style={{ animationDelay: '1s' }}>
            {[
              { value: '+50', label: 'لعبة تعليمية', icon: '🎮' },
              { value: '+10K', label: 'طفل سعيد', icon: '😊' },
              { value: '+5', label: 'مواد تعليمية', icon: '📖' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-purple-700">
                  {stat.icon} {stat.value}
                </div>
                <div className="text-xs text-purple-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Character Image */}
        <div className="flex-1 relative flex justify-center animate-pop-in" style={{ animationDelay: '0.3s' }}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-violet-300/10 rounded-full scale-110" />

            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-purple-300/50 animate-float">
              <Image
                src="/kopisto.webp"
                alt="كوبيستو - شخصية الألعاب التعليمية"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, (max-width: 1024px) 320px, 384px"
              />
            </div>

            {/* Static orbiting elements - CSS only */}
            <div className="absolute -top-4 -right-4 w-10 h-10 md:w-12 md:h-12 bg-yellow-300 rounded-full flex items-center justify-center text-base md:text-xl shadow-lg animate-rotate-slow" style={{ transformOrigin: '150% 150%' }}>
              ⭐
            </div>
            <div className="absolute -bottom-2 -left-4 w-8 h-8 md:w-10 md:h-10 bg-purple-200 rounded-full flex items-center justify-center text-sm md:text-lg shadow-lg animate-rotate-slow" style={{ transformOrigin: '170% 130%', animationDirection: 'reverse', animationDuration: '25s' }}>
              🎨
            </div>

            {/* Speech bubble */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl rounded-tr-sm px-3 py-1.5 shadow-lg border border-purple-100 animate-pop-in" style={{ animationDelay: '1.5s' }}>
              <span className="text-xs sm:text-sm font-semibold text-purple-700">
                هيا نلعب معاً! 🎉
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L48 55C96 50 192 40 288 42C384 44 480 58 576 62C672 66 768 60 864 52C960 44 1056 34 1152 36C1248 38 1344 52 1392 58L1440 65V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
