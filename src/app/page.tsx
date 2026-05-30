'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/kopisto/Navbar'
import HeroSection from '@/components/kopisto/HeroSection'
import FeaturesSection from '@/components/kopisto/FeaturesSection'
import CTASection from '@/components/kopisto/CTASection'
import Footer from '@/components/kopisto/Footer'
import FloatingElements from '@/components/kopisto/FloatingElements'
import Link from 'next/link'
import Image from 'next/image'

const pageCards = [
  {
    title: 'ألعاب تعليمية',
    description: 'اكتشف أكثر من 8 ألعاب تعليمية ممتعة في الرياضيات واللغة والعلوم!',
    icon: '🎮',
    href: '/games',
    gradient: 'from-purple-500 to-violet-600',
    bg: 'from-purple-50 to-violet-50',
    emoji: '🚀',
  },
  {
    title: 'لعبة العد',
    description: 'عد الثمار واختر الإجابة الصحيحة! لعبة تفاعلية ممتعة لتعلّم الأرقام.',
    icon: '🔢',
    href: '/play/counting',
    gradient: 'from-fuchsia-500 to-pink-600',
    bg: 'from-fuchsia-50 to-pink-50',
    emoji: '🍎',
  },
  {
    title: 'لعبة الذاكرة',
    description: 'اقلب البطاقات واعثر على الأزواج المتشابهة! درّب ذاكرتك مع كوبيستو.',
    icon: '🧠',
    href: '/play/memory',
    gradient: 'from-rose-500 to-red-600',
    bg: 'from-rose-50 to-red-50',
    emoji: '🃏',
  },
  {
    title: 'طريق التعلّم',
    description: 'اختر المادة التعليمية وابدأ مغامرتك! رياضيات، لغة، علوم والمزيد.',
    icon: '📚',
    href: '/learn',
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'from-blue-50 to-indigo-50',
    emoji: '📖',
  },
  {
    title: 'من هو كوبيستو؟',
    description: 'تعرّف على صديقك المفضل! حقائق ممتعة ومعلومات عن كوبيستو.',
    icon: '🦊',
    href: '/about',
    gradient: 'from-amber-500 to-orange-600',
    bg: 'from-amber-50 to-orange-50',
    emoji: '🌟',
  },
  {
    title: 'الإنجازات والجوائز',
    description: 'اجمع النجوم وحقق الإنجازات! كل لعبة تقربك من لقب البطل.',
    icon: '🏆',
    href: '/rewards',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'from-emerald-50 to-teal-50',
    emoji: '⭐',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 relative overflow-x-hidden">
      <FloatingElements />
      <Navbar />
      <HeroSection />

      {/* Navigation Cards Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span
              className="inline-block text-4xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🗺️
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4">
              اختر <span className="bg-gradient-to-l from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">مغامرتك</span>!
            </h2>
            <p className="text-purple-600/70 text-lg max-w-2xl mx-auto">
              اضغط على أي بطاقة لتبدأ رحلتك التعليمية مع كوبيستو
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageCards.map((card, index) => (
              <Link key={card.href} href={card.href}>
                <motion.div
                  className={`game-card group relative bg-gradient-to-br ${card.bg} rounded-2xl p-6 border-2 border-purple-50 overflow-hidden cursor-pointer h-full`}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                    borderColor: '#c084fc',
                    boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15)',
                  }}
                >
                  {/* Icon */}
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-3xl shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                    >
                      {card.icon}
                    </motion.div>
                    <motion.span
                      className="text-3xl opacity-30 group-hover:opacity-60 transition-opacity"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {card.emoji}
                    </motion.span>
                  </div>

                  {/* Content */}
                  <h3 className="font-bold text-purple-900 text-xl mb-2">{card.title}</h3>
                  <p className="text-purple-600/60 text-sm leading-relaxed mb-4">{card.description}</p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 group-hover:text-purple-800 transition-colors">
                    <span>ابدأ الآن</span>
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      ←
                    </motion.span>
                  </div>

                  {/* Hover glow */}
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${card.gradient} rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 30L60 28C120 26 240 22 360 24C480 26 600 34 720 36C840 38 960 34 1080 30C1200 26 1320 22 1380 20L1440 18V60H0V30Z" fill="#f3e8ff" />
          </svg>
        </div>
      </section>

      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  )
}
