'use client'

import Navbar from '@/components/kopisto/Navbar'
import CountingGame from '@/components/kopisto/CountingGame'
import Footer from '@/components/kopisto/Footer'
import FloatingElements from '@/components/kopisto/FloatingElements'

export default function CountingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 relative overflow-x-hidden">
      <FloatingElements />
      <Navbar />
      <main className="pt-24">
        <CountingGame />
      </main>
      <Footer />
    </div>
  )
}
