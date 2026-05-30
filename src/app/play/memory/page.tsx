'use client'

import Navbar from '@/components/kopisto/Navbar'
import MemoryGame from '@/components/kopisto/MemoryGame'
import Footer from '@/components/kopisto/Footer'
import FullscreenGame from '@/components/kopisto/FullscreenGame'

export default function MemoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 relative overflow-x-hidden">
      <Navbar />
      <main className="pt-24">
        <FullscreenGame colorTheme="purple">
          <MemoryGame />
        </FullscreenGame>
      </main>
      <Footer />
    </div>
  )
}
