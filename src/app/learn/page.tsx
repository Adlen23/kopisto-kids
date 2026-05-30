'use client'

import Navbar from '@/components/kopisto/Navbar'
import LearningPath from '@/components/kopisto/LearningPath'
import Footer from '@/components/kopisto/Footer'

export default function LearnPage() {
  return (
    <div className="min-h-screen flex flex-col bg-sky-50 relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pt-20">
        <LearningPath />
      </main>
      <Footer />
    </div>
  )
}
