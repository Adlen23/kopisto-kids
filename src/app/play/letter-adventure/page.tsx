'use client'

import Navbar from '@/components/kopisto/Navbar'
import LetterAdventureGame from '@/components/kopisto/games/LetterAdventureGame'
import Footer from '@/components/kopisto/Footer'
import FloatingElements from '@/components/kopisto/FloatingElements'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LetterAdventurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-50 relative overflow-x-hidden">
      <FloatingElements />
      <Navbar />
      <main className="pt-24 pb-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* Page Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/games" className="inline-flex items-center gap-1 text-amber-500 hover:text-amber-700 text-sm mb-4 transition-colors">
              <span>→</span> العودة للألعاب
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
              📖 مغامرة الحروف
            </h1>
            <p className="text-purple-600/70">اجمع الحروف العربية بالترتيب الصحيح وتجنب الخاطئة!</p>
          </motion.div>

          {/* Game */}
          <LetterAdventureGame />
        </div>
      </main>
      <Footer />
    </div>
  )
}
