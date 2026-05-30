'use client'

import { useLanguage } from '@/context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-sky-500 text-white relative">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/90 text-sm font-medium">
            {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4 text-sm text-white/80">
            <a href="#" className="hover:text-white transition-colors font-medium">
              {t.footer.privacy}
            </a>
            <span className="text-white/40">|</span>
            <a href="#" className="hover:text-white transition-colors font-medium">
              {t.footer.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
