'use client'

import Image from 'next/image'

const funFacts = [
  { icon: '🎂', text: '7 years old and loves learning!' },
  { icon: '🎨', text: 'Loves drawing and colors so much' },
  { icon: '📖', text: 'Favorite story is about adventures' },
  { icon: '🌟', text: 'Dreams of becoming a great scientist' },
  { icon: '🍕', text: 'Favorite food is pizza!' },
  { icon: '🎵', text: 'Sings and dances while learning' },
]

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-sky-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Character Image Side */}
          <div className="flex-1 relative animate-slide-up">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-sky-100 rounded-3xl rotate-6 scale-105" />
              <div className="relative bg-gradient-to-br from-sky-50 to-sky-50 rounded-3xl p-6 sm:p-8 overflow-hidden">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 mx-auto">
                  <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-white shadow-xl animate-float">
                    <Image
                      src="/kopisto.webp"
                      alt="Kopisto"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 320px"
                    />
                  </div>
                </div>

                <div className="absolute top-4 right-0 sm:-right-2 bg-yellow-300 rounded-full px-3 py-1.5 shadow-lg text-sm font-bold animate-bounce-soft">
                  ⭐ Learning Star
                </div>
                <div className="absolute bottom-8 left-0 sm:-left-2 bg-sky-400 text-white rounded-full px-3 py-1.5 shadow-lg text-sm font-bold animate-bounce-soft" style={{ animationDelay: '0.5s' }}>
                  🎓 Smart
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex-1 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <span className="inline-block text-4xl mb-4 animate-bounce-soft">🦊</span>
            <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
              Who is <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Kopisto</span>?
            </h2>
            <p className="text-sky-700/70 text-lg leading-relaxed mb-6">
              Kopisto is your little friend who loves learning and adventure! He loves discovering new things every day and helping children learn in a fun way. With Kopisto, every lesson is an adventure and every game is an opportunity to learn something new! 🚀
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {funFacts.map((fact) => (
                <div key={fact.text} className="flex items-center gap-3 bg-sky-50 rounded-xl px-4 py-3 border border-sky-100">
                  <span className="text-2xl">{fact.icon}</span>
                  <span className="text-sm font-medium text-sky-800">{fact.text}</span>
                </div>
              ))}
            </div>

            <a href="/games" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-orange-300/30 active:scale-95 transition-transform hover:scale-105">
              Get to know Kopisto more →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
