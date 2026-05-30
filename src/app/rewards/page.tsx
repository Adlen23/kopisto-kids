'use client'

import Navbar from '@/components/kopisto/Navbar'
import RewardsSection from '@/components/kopisto/RewardsSection'
import Footer from '@/components/kopisto/Footer'
import FloatingElements from '@/components/kopisto/FloatingElements'

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 relative overflow-x-hidden">
      <FloatingElements />
      <Navbar />
      <main className="pt-24">
        <RewardsSection />
      </main>
      <Footer />
    </div>
  )
}
