'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { label: 'الرئيسية', icon: '🏠', href: '#hero' },
    { label: 'الألعاب', icon: '🎮', href: '#games' },
    { label: 'تعلّم', icon: '📚', href: '#learn' },
    { label: 'كوبيستو', icon: '🦊', href: '#about' },
    { label: 'الجوائز', icon: '🏆', href: '#rewards' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-3">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-purple-200/50 border border-purple-100 px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-400 shadow-md">
                <Image
                  src="/kopisto.jpeg"
                  alt="كوبيستو"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">
                كوبيستو
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-purple-800 hover:bg-purple-50 transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              className="hidden md:flex items-center gap-2 bg-gradient-to-l from-purple-600 to-violet-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-purple-300/50"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              ابدأ اللعب! 🎮
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className="w-6 h-0.5 bg-purple-600 rounded-full"
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-purple-600 rounded-full"
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="w-6 h-0.5 bg-purple-600 rounded-full"
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-3 pb-1 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-purple-800 hover:bg-purple-50 transition-colors"
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </a>
              ))}
              <button className="flex items-center justify-center gap-2 bg-gradient-to-l from-purple-600 to-violet-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm mt-2 shadow-lg shadow-purple-300/50">
                ابدأ اللعب! 🎮
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
