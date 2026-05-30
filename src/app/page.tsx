'use client'

import Navbar from '@/components/kopisto/Navbar'
import HeroSection from '@/components/kopisto/HeroSection'
import FeaturesSection from '@/components/kopisto/FeaturesSection'
import GamesSection from '@/components/kopisto/GamesSection'
import CountingGame from '@/components/kopisto/CountingGame'
import MemoryGame from '@/components/kopisto/MemoryGame'
import LearningPath from '@/components/kopisto/LearningPath'
import AboutSection from '@/components/kopisto/AboutSection'
import RewardsSection from '@/components/kopisto/RewardsSection'
import TestimonialsSection from '@/components/kopisto/TestimonialsSection'
import CTASection from '@/components/kopisto/CTASection'
import Footer from '@/components/kopisto/Footer'
import FloatingElements from '@/components/kopisto/FloatingElements'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 relative overflow-x-hidden">
      <FloatingElements />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <GamesSection />
      <CountingGame />
      <MemoryGame />
      <LearningPath />
      <AboutSection />
      <RewardsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  )
}
