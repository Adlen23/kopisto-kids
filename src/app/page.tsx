'use client'

import Navbar from '@/components/kopisto/Navbar'
import HeroSection from '@/components/kopisto/HeroSection'
import FeaturesSection from '@/components/kopisto/FeaturesSection'
import Footer from '@/components/kopisto/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-sky-50">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
