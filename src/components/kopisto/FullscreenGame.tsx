'use client'

import { useRef, useState, useCallback, useEffect } from 'react'

interface FullscreenGameProps {
  children: React.ReactNode
  colorTheme?: 'purple' | 'amber' | 'blue' | 'sky' | 'teal' | 'orange'
}

export default function FullscreenGame({ children, colorTheme = 'sky' }: FullscreenGameProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const toggleFullscreen = useCallback(async () => {
    const container = containerRef.current
    if (!container) return

    try {
      if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
        if (container.requestFullscreen) {
          await container.requestFullscreen()
        } else if ((container as any).webkitRequestFullscreen) {
          await (container as any).webkitRequestFullscreen()
        }

        try {
          if (screen.orientation && screen.orientation.lock) {
            await screen.orientation.lock('landscape')
          }
        } catch {
          // Orientation lock not supported or denied
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen()
        }

        try {
          if (screen.orientation && screen.orientation.unlock) {
            screen.orientation.unlock()
          }
        } catch {
          // ignore
        }
      }
    } catch (err) {
      console.log('Fullscreen not supported:', err)
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isInFullscreen = !!(document.fullscreenElement || (document as any).webkitFullscreenElement)
      setIsFullscreen(isInFullscreen)

      if (isInFullscreen) {
        setTimeout(() => {
          const container = containerRef.current
          if (!container) return
          const canvas = container.querySelector('canvas')
          if (canvas) {
            const parent = canvas.parentElement
            if (parent) {
              const maxW = window.innerWidth - 20
              const maxH = window.innerHeight * 0.7
              const aspectRatio = canvas.width / canvas.height
              let newWidth = maxW
              let newHeight = newWidth / aspectRatio
              if (newHeight > maxH) {
                newHeight = maxH
                newWidth = newHeight * aspectRatio
              }
              canvas.style.width = `${newWidth}px`
              canvas.style.height = `${newHeight}px`
            }
          }
        }, 100)
      } else {
        setTimeout(() => {
          const container = containerRef.current
          if (!container) return
          const canvas = container.querySelector('canvas')
          if (canvas) {
            canvas.style.width = ''
            canvas.style.height = ''
          }
        }, 100)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    }
  }, [])

  const btnColors = {
    purple: 'bg-purple-500 hover:bg-purple-600 active:bg-purple-700 shadow-purple-400/40',
    amber: 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700 shadow-amber-400/40',
    blue: 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 shadow-blue-400/40',
    sky: 'bg-sky-500 hover:bg-sky-600 active:bg-sky-700 shadow-sky-400/40',
    teal: 'bg-teal-500 hover:bg-teal-600 active:bg-teal-700 shadow-teal-400/40',
    orange: 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700 shadow-orange-400/40',
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${isFullscreen ? 'fullscreen-game-container' : ''}`}
      style={isFullscreen ? {
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(180deg, #0c4a6e 0%, #0369a1 50%, #0c4a6e 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'env(safe-area-inset-top, 0) env(safe-area-inset-right, 0) env(safe-area-inset-bottom, 0) env(safe-area-inset-left, 0)',
        overflow: 'hidden',
      } : undefined}
    >
      {/* Fullscreen Toggle Button */}
      <button
        onClick={toggleFullscreen}
        className={`absolute top-3 left-3 z-50 ${btnColors[colorTheme]} text-white rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg font-bold text-sm transition-all duration-200 active:scale-95 backdrop-blur-sm`}
        style={isFullscreen ? {
          position: 'fixed',
          top: 'max(12px, env(safe-area-inset-top, 12px))',
          left: 'max(12px, env(safe-area-inset-left, 12px))',
          zIndex: 9999,
        } : undefined}
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
      >
        {isFullscreen ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
            </svg>
            <span className="hidden sm:inline">Exit</span>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
            <span className="hidden sm:inline">Fullscreen</span>
          </>
        )}
      </button>

      <div
        className={`w-full ${isFullscreen ? 'fullscreen-game-content' : ''}`}
        style={isFullscreen ? {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px',
        } : undefined}
      >
        {children}
      </div>
    </div>
  )
}
