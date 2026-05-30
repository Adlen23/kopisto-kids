'use client'

import Navbar from '@/components/kopisto/Navbar'
import CountingGame from '@/components/kopisto/CountingGame'
import Footer from '@/components/kopisto/Footer'
import FullscreenGame from '@/components/kopisto/FullscreenGame'

export default function CountingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-teal-50 relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-24">
        <FullscreenGame colorTheme="teal">
          <CountingGame />
        </FullscreenGame>
      </main>
      <Footer />
    </div>
  )
}
