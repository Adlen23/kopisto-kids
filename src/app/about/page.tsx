'use client'

import Navbar from '@/components/kopisto/Navbar'
import AboutSection from '@/components/kopisto/AboutSection'
import Footer from '@/components/kopisto/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-sky-50 relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-20">
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
