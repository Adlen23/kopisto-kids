'use client'

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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setIsMenuOpen(false)
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 animate-slide-down">
        <div className="mx-3 sm:mx-4 mt-2 sm:mt-3">
          <div className="bg-white/95 sm:bg-white/85 sm:backdrop-blur-xl rounded-2xl shadow-lg shadow-purple-200/50 border border-purple-100 px-3 sm:px-4 py-2.5 sm:py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 sm:gap-3 active:scale-95 transition-transform">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-purple-400 shadow-md">
                  <Image
                    src="/kopisto-small.webp"
                    alt="كوبيستو"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">
                  كوبيستو
                </span>
              </Link>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                      isActive(item.href)
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-purple-800 hover:bg-purple-50'
                    }`}>
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                      {isActive(item.href) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Desktop CTA Button */}
              <Link href="/games" className="hidden md:block">
                <button className="flex items-center gap-2 bg-gradient-to-l from-purple-600 to-violet-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-purple-300/50 hover:scale-105 hover:shadow-xl transition-all duration-200 active:scale-95">
                  ابدأ اللعب! 🎮
                </button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden flex flex-col gap-1.5 p-3 -mr-1 touch-target"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              >
                <span className={`w-6 h-0.5 bg-purple-600 rounded-full block transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-6 h-0.5 bg-purple-600 rounded-full block transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-0.5 bg-purple-600 rounded-full block transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pt-3 pb-2 flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
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
                ))}
                <Link href="/games" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-l from-purple-600 to-violet-500 text-white px-5 py-3 rounded-xl font-semibold text-base mt-2 shadow-lg shadow-purple-300/50 touch-target active:scale-95 transition-transform">
                    ابدأ اللعب! 🎮
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  )
}
