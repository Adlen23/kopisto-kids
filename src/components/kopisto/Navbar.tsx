'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { locale, setLocale, t } = useLanguage()

  const navItems = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.games, href: '/games' },
    { label: t.nav.learn, href: '/learn' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.parents, href: '/rewards' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const brandName = locale === 'ar' ? 'كوبيستو' : 'Kopisto'

  // Close menu on navigation by using key prop trick
  const menuKey = pathname

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`bg-white/95 backdrop-blur-xl rounded-2xl px-4 py-2.5 transition-all duration-300 ${
            scrolled ? 'shadow-lg shadow-sky-200/50 border border-sky-100' : 'shadow-md shadow-sky-100/30 border border-transparent'
          }`}>
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2.5 active:scale-95 transition-transform" onClick={closeMenu}>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-400 shadow-md">
                  <Image
                    src="/kopisto-small.webp"
                    alt="Kopisto"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  {brandName}
                </span>
              </Link>

              {/* Desktop Nav - Pill Buttons matching design */}
              <div className="hidden lg:flex items-center gap-2">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <div className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${
                      isActive(item.href)
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-200/50'
                        : 'bg-sky-500 text-white hover:bg-sky-600 shadow-md shadow-sky-200/50'
                    }`}>
                      {item.label}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Language Switcher + Mobile Menu */}
              <div className="flex items-center gap-2">
                {/* Language Switcher */}
                <button
                  onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 text-xs font-bold hover:from-sky-200 hover:to-blue-200 transition-all active:scale-95 border border-sky-200"
                  aria-label="Switch language"
                >
                  <span className="text-sm">{locale === 'ar' ? '🇬🇧' : '🇸🇦'}</span>
                  <span>{locale === 'ar' ? 'EN' : 'عربي'}</span>
                </button>

                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden flex flex-col gap-1.5 p-2 touch-target"
                  onClick={toggleMenu}
                  aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  <span className={`w-6 h-0.5 bg-sky-600 rounded-full block transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`w-6 h-0.5 bg-sky-600 rounded-full block transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-6 h-0.5 bg-sky-600 rounded-full block transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
              </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <div key={menuKey} className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
              <div className="flex flex-wrap gap-2 pb-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                  >
                    <div className={`px-4 py-2 rounded-full text-sm font-semibold transition-all touch-target ${
                      isActive(item.href)
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-sky-500 text-white shadow-md'
                    }`}>
                      {item.label}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  )
}
