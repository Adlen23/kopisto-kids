'use client'

import Navbar from '@/components/kopisto/Navbar'
import MathRunnerGame from '@/components/kopisto/games/MathRunnerGame'
import Footer from '@/components/kopisto/Footer'
import FullscreenGame from '@/components/kopisto/FullscreenGame'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function MathRunnerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-sky-50 relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-24 pb-10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/games" className="inline-flex items-center gap-1 text-sky-500 hover:text-sky-700 text-sm mb-4 transition-colors">
              <span>←</span> Back to Games
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-sky-900 mb-2">
              🏃 Kopisto Runner
            </h1>
            <p className="text-sky-600/70">Jump on platforms and collect the right math answer!</p>
          </motion.div>

          <FullscreenGame colorTheme="sky">
            <MathRunnerGame />
          </FullscreenGame>
        </div>
      </main>
      <Footer />
    </div>
  )
}
