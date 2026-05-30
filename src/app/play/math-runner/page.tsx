'use client'

import Navbar from '@/components/kopisto/Navbar'
import MathRunnerGame from '@/components/kopisto/games/MathRunnerGame'
import Footer from '@/components/kopisto/Footer'
import FloatingElements from '@/components/kopisto/FloatingElements'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function MathRunnerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 relative overflow-x-hidden">
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
            <Link href="/games" className="inline-flex items-center gap-1 text-purple-500 hover:text-purple-700 text-sm mb-4 transition-colors">
              <span>→</span> العودة للألعاب
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
              🏃 عدّاء كوبيستو
            </h1>
            <p className="text-purple-600/70">اقفز على المنصات واجمع الإجابة الصحيحة للسؤال الرياضي!</p>
          </motion.div>

          {/* Game */}
          <MathRunnerGame />
        </div>
      </main>
      <Footer />
    </div>
  )
}
