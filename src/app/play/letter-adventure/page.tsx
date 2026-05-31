'use client'

import Navbar from '@/components/kopisto/Navbar'
import LetterAdventureGame from '@/components/kopisto/games/LetterAdventureGame'
import Footer from '@/components/kopisto/Footer'
import FullscreenGame from '@/components/kopisto/FullscreenGame'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

export default function LetterAdventurePage() {
  const { t, isAr } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col bg-amber-50 relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-24 pb-10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/games" className="inline-flex items-center gap-1 text-amber-500 hover:text-amber-700 text-sm mb-4 transition-colors">
              <span>{isAr ? '→' : '←'}</span> {isAr ? 'العودة للألعاب' : 'Back to Games'}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
              📖 {isAr ? 'مغامرة الحروف' : 'Letter Adventure'}
            </h1>
            <p className="text-amber-600/70">{isAr ? 'اجمع الحروف العربية بالترتيب الصحيح!' : 'Collect Arabic letters in the correct order!'}</p>
          </motion.div>

          <FullscreenGame colorTheme="amber">
            <LetterAdventureGame />
          </FullscreenGame>
        </div>
      </main>
      <Footer />
    </div>
  )
}
