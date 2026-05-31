'use client'

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { Locale, translations } from '@/lib/i18n'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof translations.ar
  dir: 'rtl' | 'ltr'
  isAr: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar')
  const [mounted, setMounted] = useState(false)

  // Load saved locale from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('kobisto-locale') as Locale | null
    if (saved === 'ar' || saved === 'en') {
      setLocaleState(saved)
    }
    setMounted(true)
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('kobisto-locale', newLocale)
  }, [])

  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
    document.documentElement.dir = dir
  }, [locale])

  const t = translations[locale]
  const dir = locale === 'ar' ? 'rtl' as const : 'ltr' as const
  const isAr = locale === 'ar'

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, dir, isAr }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
