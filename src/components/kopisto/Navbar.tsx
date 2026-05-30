'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { label: 'الرئيسية', icon: '🏠', href: '/' },
    { label: 'الألعاب', icon: '🎮', href: '/games' },
    { label: 'تعلّم', icon: '📚', href: '/learn' },
    { label: 'كوبيستو', icon: '🦊', href: '/about' },
    { label: 'الجوائز', icon: '🏆', href: '/rewards' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-3 sm:mx-4 mt-2 sm:mt-3">
          <div className="bg-white/85 backdrop-blur-xl rounded-2xl shadow-lg shadow-purple-200/50 border border-purple-100 px-3 sm:px-4 py-2.5 sm:py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/">
                <motion.div
                  className="flex items-center gap-2 sm:gap-3"
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-purple-400 shadow-md">
                    <Image
                      src="/kopisto.jpeg"
                      alt="كوبيستو"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">
                    كوبيستو
                  </span>
                </motion.div>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item, i) => (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-purple-100 text-purple-700'
                          : 'text-purple-800 hover:bg-purple-50'
                      }`}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                      {isActive(item.href) && (
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-purple-600"
                          layoutId="activeNav"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Desktop CTA Button */}
              <Link href="/games" className="hidden md:block">
                <motion.button
                  className="flex items-center gap-2 bg-gradient-to-l from-purple-600 to-violet-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-purple-300/50"
                  whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(139, 92, 246, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  ابدأ اللعب! 🎮
                </motion.button>
              </Link>

              {/* Mobile Menu Button - larger touch target */}
              <motion.button
                className="md:hidden flex flex-col gap-1.5 p-3 -mr-1 touch-target"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              >
                <motion.span
                  className="w-6 h-0.5 bg-purple-600 rounded-full block"
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-purple-600 rounded-full block"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-purple-600 rounded-full block"
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                />
              </motion.button>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="pt-3 pb-2 flex flex-col gap-1">
                    {navItems.map((item, i) => (
                      <motion.div
                        key={item.href}
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors touch-target ${
                            isActive(item.href)
                              ? 'bg-purple-100 text-purple-700'
                              : 'text-purple-800 active:bg-purple-50'
                          }`}>
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ x: 30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: navItems.length * 0.05 }}
                    >
                      <Link href="/games" onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-l from-purple-600 to-violet-500 text-white px-5 py-3 rounded-xl font-semibold text-base mt-2 shadow-lg shadow-purple-300/50 touch-target">
                          ابدأ اللعب! 🎮
                        </button>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
