'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const footerLinks = {
  games: [
    { name: 'ألعاب الرياضيات', icon: '🔢' },
    { name: 'ألعاب اللغة', icon: '📖' },
    { name: 'ألعاب العلوم', icon: '🔬' },
    { name: 'ألعاب الذاكرة', icon: '🧠' },
    { name: 'ألعاب الفنون', icon: '🎨' },
  ],
  resources: [
    { name: 'للآباء', icon: '👨‍👩‍👧' },
    { name: 'للمعلمين', icon: '👩‍🏫' },
    { name: 'الأسئلة الشائعة', icon: '❓' },
    { name: 'اتصل بنا', icon: '📞' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-purple-900 to-violet-950 text-white relative overflow-hidden">
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40L60 35C120 30 240 20 360 25C480 30 600 50 720 55C840 60 960 50 1080 40C1200 30 1320 20 1380 15L1440 10V80H0V40Z"
            fill="#581c87"
          />
        </svg>
      </div>

      {/* Background decorations */}
      <div className="absolute top-10 right-[10%] text-4xl opacity-5 animate-float-slow">🌟</div>
      <div className="absolute bottom-20 left-[15%] text-3xl opacity-5 animate-float-slow" style={{ animationDelay: '1s' }}>⭐</div>
      <div className="absolute top-1/2 right-[30%] text-2xl opacity-5 animate-float-slow" style={{ animationDelay: '2s' }}>✨</div>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-400">
                <Image
                  src="/kopisto.jpeg"
                  alt="كوبيستو"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-2xl font-bold">كوبيستو</span>
            </div>
            <p className="text-purple-300/80 text-sm leading-relaxed mb-6">
              مغامرات تعليمية ممتعة تنمّي مهارات طفلك! مع كوبيستو، التعلّم ليس مملاً أبداً 🚀
            </p>
            <div className="flex items-center gap-3">
              {['📱', '💻', '🎮'].map((icon, i) => (
                <motion.div
                  key={i}
                  className="w-10 h-10 bg-purple-800/50 rounded-xl flex items-center justify-center text-lg hover:bg-purple-700/50 cursor-pointer transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Games Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>🎮</span> الألعاب
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.games.map((link) => (
                <li key={link.name}>
                  <a href="#" className="text-purple-300/70 hover:text-white text-sm flex items-center gap-2 transition-colors">
                    <span>{link.icon}</span> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>📋</span> موارد
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href="#" className="text-purple-300/70 hover:text-white text-sm flex items-center gap-2 transition-colors">
                    <span>{link.icon}</span> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span>📬</span> النشرة البريدية
            </h4>
            <p className="text-purple-300/70 text-sm mb-4">
              اشترك ليصلك كل جديد من كوبيستو!
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 bg-purple-800/50 border border-purple-600/30 rounded-xl px-3 py-2.5 text-sm placeholder:text-purple-400/50 focus:outline-none focus:border-purple-400 transition-colors"
              />
              <motion.button
                className="bg-gradient-to-l from-purple-500 to-violet-500 px-4 py-2.5 rounded-xl text-sm font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                اشترك
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-800/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-purple-400/60 text-sm">
            © 2026 كوبيستو. جميع الحقوق محفوظة 💜
          </p>
          <div className="flex items-center gap-4 text-sm text-purple-400/60">
            <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
