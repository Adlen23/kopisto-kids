'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

const cardData = [
  {
    key: 'math' as const,
    href: '/play/math-runner',
    bgColor: 'bg-sky-400',
    bgGradient: 'from-sky-400 to-sky-500',
    iconBg: 'bg-white/30',
    icon: '🔢',
    topIcon: '×+',
  },
  {
    key: 'words' as const,
    href: '/play/letter-adventure',
    bgColor: 'bg-yellow-400',
    bgGradient: 'from-yellow-400 to-amber-400',
    iconBg: 'bg-white/30',
    icon: '📖',
    topIcon: 'A',
  },
  {
    key: 'science' as const,
    href: '/play/counting',
    bgColor: 'bg-teal-400',
    bgGradient: 'from-teal-400 to-teal-500',
    iconBg: 'bg-white/30',
    icon: '🔬',
    topIcon: '🧪',
  },
  {
    key: 'art' as const,
    href: '/play/memory',
    bgColor: 'bg-orange-400',
    bgGradient: 'from-orange-400 to-orange-500',
    iconBg: 'bg-white/30',
    icon: '🎨',
    topIcon: '🖌️',
  },
]

export default function FeaturesSection() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-20 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
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
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
            {t.cards.sectionTitle}
          </h2>
          <p className="text-sky-600/70 text-lg max-w-2xl mx-auto">
            {t.cards.sectionSubtitle}
          </p>
        </motion.div>

        {/* 4 Colorful Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cardData.map((card, index) => {
            const cardText = t.cards[card.key]
            return (
              <Link key={card.key} href={card.href}>
                <motion.div
                  className={`relative rounded-3xl overflow-hidden cursor-pointer h-[320px] md:h-[360px] group shadow-lg hover:shadow-2xl transition-shadow duration-300`}
                  style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                >
                  {/* Card Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient}`} />

                  {/* Decorative shapes */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-8 -translate-y-8" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-6 translate-y-6" />
                  <div className="absolute bottom-[20%] left-[10%] w-16 h-16 bg-white/5 rounded-full" />

                  {/* Top Icon Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{card.topIcon}</span>
                  </div>

                  {/* Kopisto Character in Card */}
                  <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-24 h-24 md:w-28 md:h-28">
                    <Image
                      src="/kopisto-idle.webp"
                      alt="Kopisto"
                      width={112}
                      height={112}
                      className="object-contain w-full h-full drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="font-bold text-xl mb-1.5 drop-shadow-md">{cardText.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-3 drop-shadow-sm">{cardText.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="bg-white/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold hover:bg-white/50 transition-colors">
                        {cardText.cta} →
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
