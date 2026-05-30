'use client'

import Navbar from '@/components/kopisto/Navbar'
import GamesSection from '@/components/kopisto/GamesSection'
import Footer from '@/components/kopisto/Footer'

export default function GamesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-sky-50 relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-20">
        <GamesSection />
      </main>
      <Footer />
    </div>
  )
}
