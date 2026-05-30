'use client'

import Navbar from '@/components/kopisto/Navbar'
import MemoryGame from '@/components/kopisto/MemoryGame'
import Footer from '@/components/kopisto/Footer'
import FullscreenGame from '@/components/kopisto/FullscreenGame'

export default function MemoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50 relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-24">
        <FullscreenGame colorTheme="orange">
          <MemoryGame />
        </FullscreenGame>
      </main>
      <Footer />
    </div>
  )
}
