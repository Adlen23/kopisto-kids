'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Platform {
  x: number
  y: number
  width: number
  height: number
  type: 'normal' | 'moving'
  moveRange?: number
  speed?: number
  originalX?: number
}

interface LetterOrb {
  x: number
  y: number
  letter: string
  collected: boolean
  order: number
  width: number
  height: number
}

const ARABIC_LETTERS = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي']

const GRAVITY = 0.6
const JUMP_FORCE = -12
const MOVE_SPEED = 4
const PLAYER_WIDTH = 40
const PLAYER_HEIGHT = 50
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 500

function generateLetterLevel(level: number) {
  const platforms: Platform[] = []
  const letters: LetterOrb[] = []

  const startIdx = ((level - 1) * 5) % ARABIC_LETTERS.length
  const levelLetters = ARABIC_LETTERS.slice(startIdx, startIdx + 5)
  const distractors = ARABIC_LETTERS.filter(l => !levelLetters.includes(l))
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  // Ground segments with gaps
  const grounds = [
    { x: 0, width: 350 },
    { x: 430, width: 250 },
    { x: 760, width: 300 },
    { x: 1150, width: 250 },
    { x: 1500, width: 300 },
    { x: 1900, width: 200 },
    { x: 2200, width: 300 },
  ]
  for (const g of grounds) {
    platforms.push({ x: g.x, y: CANVAS_HEIGHT - 40, width: g.width, height: 40, type: 'normal' })
  }

  // Floating platforms
  const floats = [
    { x: 180, y: 350, width: 120, type: 'normal' as const },
    { x: 420, y: 280, width: 110, type: 'moving' as const, moveRange: 70, speed: 1.2 },
    { x: 650, y: 320, width: 100, type: 'normal' as const },
    { x: 880, y: 250, width: 120, type: 'moving' as const, moveRange: 60, speed: 1 },
    { x: 1100, y: 300, width: 110, type: 'normal' as const },
    { x: 1320, y: 230, width: 130, type: 'normal' as const },
    { x: 1550, y: 310, width: 100, type: 'moving' as const, moveRange: 80, speed: 1.5 },
    { x: 1780, y: 260, width: 120, type: 'normal' as const },
    { x: 2000, y: 330, width: 110, type: 'moving' as const, moveRange: 50, speed: 1 },
    { x: 2250, y: 270, width: 130, type: 'normal' as const },
  ]
  for (const f of floats) {
    platforms.push({ ...f, height: 20, originalX: f.x })
  }

  // Place letters in order
  const positions = [
    { x: 100, y: CANVAS_HEIGHT - 90 },
    { x: 350, y: 240 },
    { x: 700, y: 280 },
    { x: 1000, y: CANVAS_HEIGHT - 90 },
    { x: 1250, y: 190 },
    { x: 1500, y: 270 },
    { x: 1800, y: 220 },
    { x: 2050, y: CANVAS_HEIGHT - 90 },
    { x: 2300, y: 230 },
  ]

  // Shuffle positions for correct letters
  const shuffledPos = [...positions].sort(() => Math.random() - 0.5)

  levelLetters.forEach((letter, i) => {
    letters.push({
      x: shuffledPos[i].x,
      y: shuffledPos[i].y,
      letter,
      collected: false,
      order: i,
      width: 44,
      height: 44,
    })
  })

  // Add distractors
  distractors.forEach((letter, i) => {
    letters.push({
      x: shuffledPos[levelLetters.length + i]?.x || positions[i + 2].x,
      y: shuffledPos[levelLetters.length + i]?.y || positions[i + 2].y,
      letter,
      collected: false,
      order: -1,
      width: 44,
      height: 44,
    })
  })

  return { platforms, letters, levelLetters, targetLetter: levelLetters[0] }
}

export default function LetterAdventureGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef({
    playerX: 60,
    playerY: CANVAS_HEIGHT - 40 - PLAYER_HEIGHT,
    playerVX: 0,
    playerVY: 0,
    isOnGround: false,
    direction: 1,
    cameraX: 0,
    score: 0,
    lives: 3,
    nextLetterIdx: 0,
    level: 1,
    gameStatus: 'menu' as 'playing' | 'won' | 'lost' | 'menu',
    frameCount: 0,
  })
  const keysRef = useRef<Set<string>>(new Set())
  const levelDataRef = useRef(generateLetterLevel(1))
  const animFrameRef = useRef<number>(0)
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost' | 'menu'>('menu')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const [nextLetter, setNextLetter] = useState('')
  const [collectedLetters, setCollectedLetters] = useState<string[]>([])

  const startGame = useCallback(() => {
    const ld = generateLetterLevel(1)
    levelDataRef.current = ld
    gameRef.current = {
      playerX: 60,
      playerY: CANVAS_HEIGHT - 40 - PLAYER_HEIGHT,
      playerVX: 0,
      playerVY: 0,
      isOnGround: false,
      direction: 1,
      cameraX: 0,
      score: 0,
      lives: 3,
      nextLetterIdx: 0,
      level: 1,
      gameStatus: 'playing',
      frameCount: 0,
    }
    setGameStatus('playing')
    setScore(0)
    setLives(3)
    setLevel(1)
    setNextLetter(ld.levelLetters[0])
    setCollectedLetters([])
  }, [])

  const nextLevel = useCallback(() => {
    const g = gameRef.current
    const newLevel = g.level + 1
    const ld = generateLetterLevel(newLevel)
    levelDataRef.current = ld
    g.playerX = 60
    g.playerY = CANVAS_HEIGHT - 40 - PLAYER_HEIGHT
    g.playerVX = 0
    g.playerVY = 0
    g.cameraX = 0
    g.nextLetterIdx = 0
    g.level = newLevel
    g.gameStatus = 'playing'
    setLevel(newLevel)
    setGameStatus('playing')
    setNextLetter(ld.levelLetters[0])
    setCollectedLetters([])
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key)
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault()
    }
    const handleKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Load Kopisto character image
    const kopistoImg = new Image()
    kopistoImg.crossOrigin = 'anonymous'
    kopistoImg.src = '/kopisto.jpeg'

    const drawKopisto = (ctx: CanvasRenderingContext2D, x: number, y: number, dir: number, frame: number, isMoving: boolean, isJumping: boolean) => {
      ctx.save()
      ctx.translate(x + PLAYER_WIDTH / 2, y + PLAYER_HEIGHT / 2)
      ctx.scale(dir, 1)

      // Squish/stretch animation
      let scaleX = 1
      let scaleY = 1
      if (isJumping) {
        scaleX = 0.85
        scaleY = 1.15
      } else if (isMoving) {
        const bounce = Math.sin(frame * 0.3) * 0.05
        scaleX = 1 + bounce
        scaleY = 1 - bounce
      }

      // Shadow under character
      ctx.fillStyle = 'rgba(0,0,0,0.15)'
      ctx.beginPath()
      ctx.ellipse(0, PLAYER_HEIGHT / 2 + 2, PLAYER_WIDTH * 0.4, 4, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.scale(scaleX, scaleY)

      // Draw the actual Kopisto image
      const imgW = PLAYER_WIDTH + 10
      const imgH = PLAYER_HEIGHT + 10
      if (kopistoImg.complete && kopistoImg.naturalWidth > 0) {
        ctx.beginPath()
        ctx.arc(0, 0, imgW / 2, 0, Math.PI * 2)
        ctx.clip()
        ctx.drawImage(kopistoImg, -imgW / 2, -imgH / 2, imgW, imgH)
      } else {
        // Fallback while loading
        ctx.fillStyle = '#8B5CF6'
        ctx.beginPath()
        ctx.arc(0, 0, PLAYER_WIDTH / 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#FFFFFF'
        ctx.font = 'bold 16px Fredoka, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('ك', 0, 0)
      }

      ctx.restore()
    }

    const drawPlatform = (ctx: CanvasRenderingContext2D, p: Platform, camX: number) => {
      const sx = p.x - camX
      if (sx + p.width < -50 || sx > CANVAS_WIDTH + 50) return

      const grad = ctx.createLinearGradient(sx, p.y, sx, p.y + p.height)
      grad.addColorStop(0, p.type === 'moving' ? '#F9A8D4' : '#86EFAC')
      grad.addColorStop(1, p.type === 'moving' ? '#EC4899' : '#22C55E')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.roundRect(sx, p.y, p.width, p.height, 6)
      ctx.fill()

      ctx.fillStyle = p.type === 'moving' ? '#FBCFE8' : '#BBF7D0'
      ctx.beginPath()
      ctx.roundRect(sx + 2, p.y, p.width - 4, 6, [4, 4, 0, 0])
      ctx.fill()

      if (p.type === 'normal' && p.height > 30) {
        ctx.fillStyle = '#16A34A'
        for (let gx = sx + 10; gx < sx + p.width - 10; gx += 25) {
          ctx.beginPath(); ctx.moveTo(gx, p.y); ctx.lineTo(gx + 4, p.y - 8); ctx.lineTo(gx + 8, p.y); ctx.fill()
        }
      }
    }

    const drawLetterOrb = (ctx: CanvasRenderingContext2D, orb: LetterOrb, camX: number, frame: number, isNext: boolean) => {
      if (orb.collected) return
      const sx = orb.x - camX
      if (sx < -60 || sx > CANVAS_WIDTH + 60) return

      const bobY = Math.sin(frame * 0.05 + orb.x * 0.01) * 6

      if (isNext) {
        ctx.shadowColor = '#8B5CF6'
        ctx.shadowBlur = 20
      }

      const grad = ctx.createRadialGradient(sx + 22, orb.y + bobY + 10, 5, sx + 22, orb.y + bobY + 22, 24)
      grad.addColorStop(0, isNext ? '#FDE68A' : '#E0E7FF')
      grad.addColorStop(1, isNext ? '#F59E0B' : '#818CF8')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(sx + 22, orb.y + bobY + 22, 22, 0, Math.PI * 2)
      ctx.fill()

      // Shine
      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      ctx.beginPath()
      ctx.arc(sx + 16, orb.y + bobY + 16, 6, 0, Math.PI * 2)
      ctx.fill()

      ctx.shadowBlur = 0

      // Letter
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 20px Fredoka, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(orb.letter, sx + 22, orb.y + bobY + 23)

      // Arrow indicator for next letter
      if (isNext) {
        const arrowBob = Math.sin(frame * 0.08) * 5
        ctx.fillStyle = '#8B5CF6'
        ctx.beginPath()
        ctx.moveTo(sx + 22, orb.y + bobY - 10 + arrowBob)
        ctx.lineTo(sx + 16, orb.y + bobY - 18 + arrowBob)
        ctx.lineTo(sx + 28, orb.y + bobY - 18 + arrowBob)
        ctx.fill()
      }
    }

    const drawBackground = (ctx: CanvasRenderingContext2D, camX: number) => {
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT)
      skyGrad.addColorStop(0, '#FEF3C7')
      skyGrad.addColorStop(0.5, '#FDE68A')
      skyGrad.addColorStop(1, '#FEF9C3')
      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Sun
      ctx.fillStyle = '#FCD34D'
      ctx.shadowColor = '#F59E0B'
      ctx.shadowBlur = 40
      ctx.beginPath()
      ctx.arc(700, 60, 35, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // Clouds
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      const clouds = [150, 400, 700, 1100, 1500, 1900]
      for (const cx of clouds) {
        const sx = ((cx - camX * 0.3) % (CANVAS_WIDTH + 200) + CANVAS_WIDTH + 200) % (CANVAS_WIDTH + 200) - 100
        ctx.beginPath()
        ctx.arc(sx, 50, 25, 0, Math.PI * 2)
        ctx.arc(sx + 30, 40, 20, 0, Math.PI * 2)
        ctx.arc(sx + 50, 50, 22, 0, Math.PI * 2)
        ctx.fill()
      }

      // Hills
      ctx.fillStyle = '#D9F99D'
      for (const hx of [0, 300, 600, 900, 1200, 1500, 1800, 2100]) {
        const sx = hx - camX * 0.5
        ctx.beginPath()
        ctx.arc(sx, CANVAS_HEIGHT - 30, 130, Math.PI, 2 * Math.PI)
        ctx.fill()
      }
    }

    const drawHUD = (ctx: CanvasRenderingContext2D) => {
      const g = gameRef.current
      const ld = levelDataRef.current

      // Next letter prompt
      ctx.fillStyle = 'rgba(139, 92, 246, 0.9)'
      ctx.beginPath()
      ctx.roundRect(CANVAS_WIDTH / 2 - 110, 8, 220, 40, 12)
      ctx.fill()

      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 18px Fredoka, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`اجمع الحرف: ${ld.levelLetters[g.nextLetterIdx] || '✓'}`, CANVAS_WIDTH / 2, 28)

      // Collected letters
      ctx.fillStyle = 'rgba(245, 158, 11, 0.9)'
      ctx.beginPath()
      ctx.roundRect(10, 8, 120, 36, 10)
      ctx.fill()
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 14px Fredoka, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`${ld.levelLetters.slice(0, g.nextLetterIdx).join(' → ') || '?'}`, 70, 26)

      // Score & Lives
      ctx.fillStyle = 'rgba(139, 92, 246, 0.9)'
      ctx.beginPath()
      ctx.roundRect(CANVAS_WIDTH - 190, 8, 80, 36, 10)
      ctx.fill()
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 14px Fredoka, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`⭐ ${g.score}`, CANVAS_WIDTH - 150, 26)

      ctx.fillStyle = 'rgba(239, 68, 68, 0.9)'
      ctx.beginPath()
      ctx.roundRect(CANVAS_WIDTH - 100, 8, 90, 36, 10)
      ctx.fill()
      ctx.fillStyle = '#FFFFFF'
      ctx.fillText(`❤️ ${g.lives}`, CANVAS_WIDTH - 55, 26)

      // Level
      ctx.fillStyle = 'rgba(139, 92, 246, 0.7)'
      ctx.beginPath()
      ctx.roundRect(CANVAS_WIDTH / 2 - 40, CANVAS_HEIGHT - 35, 80, 28, 8)
      ctx.fill()
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 14px Fredoka, sans-serif'
      ctx.fillText(`المستوى ${g.level}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 21)
    }

    const gameLoop = () => {
      const g = gameRef.current
      const ld = levelDataRef.current
      const keys = keysRef.current

      if (g.gameStatus !== 'playing') {
        drawBackground(ctx, g.cameraX)
        for (const p of ld.platforms) drawPlatform(ctx, p, g.cameraX)
        for (const orb of ld.letters) drawLetterOrb(ctx, orb, g.cameraX, g.frameCount, orb.order === g.nextLetterIdx)
        drawKopisto(ctx, g.playerX - g.cameraX, g.playerY, g.direction, g.frameCount, false, false)
        drawHUD(ctx)
        animFrameRef.current = requestAnimationFrame(gameLoop)
        return
      }

      g.frameCount++
      const isMoving = keys.has('ArrowLeft') || keys.has('ArrowRight') || keys.has('a') || keys.has('d')

      g.playerVX = 0
      if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) { g.playerVX = MOVE_SPEED; g.direction = 1 }
      if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) { g.playerVX = -MOVE_SPEED; g.direction = -1 }
      if ((keys.has('ArrowUp') || keys.has('w') || keys.has('W') || keys.has(' ')) && g.isOnGround) {
        g.playerVY = JUMP_FORCE
        g.isOnGround = false
      }

      g.playerVY += GRAVITY
      g.playerX += g.playerVX
      g.playerY += g.playerVY

      // Update moving platforms
      for (const p of ld.platforms) {
        if (p.type === 'moving' && p.originalX !== undefined && p.moveRange && p.speed) {
          p.x = p.originalX + Math.sin(g.frameCount * 0.02 * p.speed) * p.moveRange
        }
      }

      // Collision
      g.isOnGround = false
      for (const p of ld.platforms) {
        if (g.playerX + PLAYER_WIDTH > p.x && g.playerX < p.x + p.width) {
          if (g.playerY + PLAYER_HEIGHT > p.y && g.playerY + PLAYER_HEIGHT < p.y + p.height + g.playerVY + 2 && g.playerVY >= 0) {
            g.playerY = p.y - PLAYER_HEIGHT
            g.playerVY = 0
            g.isOnGround = true
          } else if (g.playerY < p.y + p.height && g.playerY > p.y && g.playerVY < 0) {
            g.playerVY = 1
          }
        }
      }

      // Letter collection
      for (const orb of ld.letters) {
        if (orb.collected) continue
        const dx = (g.playerX + PLAYER_WIDTH / 2) - (orb.x + orb.width / 2)
        const dy = (g.playerY + PLAYER_HEIGHT / 2) - (orb.y + orb.height / 2)
        if (Math.sqrt(dx * dx + dy * dy) < 38) {
          if (orb.order === g.nextLetterIdx) {
            orb.collected = true
            g.score += 80 * g.level
            g.nextLetterIdx++
            setScore(g.score)
            setCollectedLetters(prev => [...prev, orb.letter])

            if (g.nextLetterIdx >= ld.levelLetters.length) {
              g.score += 200 * g.level
              setScore(g.score)
              setTimeout(() => {
                g.gameStatus = 'won'
                setGameStatus('won')
              }, 500)
            } else {
              setNextLetter(ld.levelLetters[g.nextLetterIdx])
            }
          } else if (orb.order === -1) {
            // Distractor - penalty
            g.lives--
            g.playerVY = -8
            setLives(g.lives)
            orb.collected = true
            if (g.lives <= 0) {
              g.gameStatus = 'lost'
              setGameStatus('lost')
            }
          }
        }
      }

      // Fall off screen
      if (g.playerY > CANVAS_HEIGHT + 50) {
        g.lives--
        setLives(g.lives)
        if (g.lives <= 0) {
          g.gameStatus = 'lost'
          setGameStatus('lost')
        } else {
          g.playerX = 60
          g.playerY = CANVAS_HEIGHT - 40 - PLAYER_HEIGHT
          g.playerVX = 0
          g.playerVY = 0
          g.cameraX = 0
        }
      }

      // Camera
      const targetCam = g.playerX - CANVAS_WIDTH / 3
      g.cameraX += (targetCam - g.cameraX) * 0.1
      if (g.cameraX < 0) g.cameraX = 0

      // Draw
      drawBackground(ctx, g.cameraX)
      for (const p of ld.platforms) drawPlatform(ctx, p, g.cameraX)
      for (const orb of ld.letters) drawLetterOrb(ctx, orb, g.cameraX, g.frameCount, orb.order === g.nextLetterIdx)
      drawKopisto(ctx, g.playerX - g.cameraX, g.playerY, g.direction, g.frameCount, isMoving, !g.isOnGround)
      drawHUD(ctx)

      animFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animFrameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <div className="relative">
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="rounded-2xl border-4 border-amber-200 shadow-xl max-w-full"
        />
      </div>

      {/* Mobile Controls */}
      <div className="flex justify-center gap-3 mt-4 md:hidden">
        <button className="w-14 h-14 bg-amber-100 rounded-xl text-2xl active:bg-amber-300 select-none"
          onTouchStart={() => keysRef.current.add('ArrowLeft')}
          onTouchEnd={() => keysRef.current.delete('ArrowLeft')}>←</button>
        <button className="w-14 h-14 bg-amber-100 rounded-xl text-2xl active:bg-amber-300 select-none"
          onTouchStart={() => keysRef.current.add('ArrowUp')}
          onTouchEnd={() => keysRef.current.delete('ArrowUp')}>↑</button>
        <button className="w-14 h-14 bg-amber-100 rounded-xl text-2xl active:bg-amber-300 select-none"
          onTouchStart={() => keysRef.current.add('ArrowRight')}
          onTouchEnd={() => keysRef.current.delete('ArrowRight')}>→</button>
      </div>

      <div className="hidden md:flex justify-center gap-4 mt-4 text-sm text-amber-500">
        <span>← → للتحرك</span><span>|</span><span>↑ أو مسافة للقفز</span>
      </div>

      {/* Menu */}
      <AnimatePresence>
        {gameStatus === 'menu' && (
          <motion.div className="absolute inset-0 flex items-center justify-center bg-amber-900/60 backdrop-blur-sm rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <div className="text-5xl mb-4">📖</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">مغامرة الحروف</h3>
              <p className="text-purple-600 text-sm mb-1">اجمع الحروف العربية بالترتيب الصحيح!</p>
              <p className="text-purple-400 text-xs mb-1">تجنب الحروف الخاطئة!</p>
              <p className="text-amber-500 text-xs mb-6">تحرك: ← → | اقفز: ↑ أو مسافة</p>
              <motion.button className="bg-gradient-to-l from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg text-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startGame}>
                ابدأ المغامرة! 🚀
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Win */}
      <AnimatePresence>
        {gameStatus === 'won' && (
          <motion.div className="absolute inset-0 flex items-center justify-center bg-amber-900/60 backdrop-blur-sm rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <motion.div className="text-5xl mb-4" animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 1, repeat: Infinity }}>🎉</motion.div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">ممتاز! أكملت الحروف!</h3>
              <p className="text-purple-500 text-lg mb-2">الحروف: <span className="font-bold text-purple-800">{collectedLetters.join(' → ')}</span></p>
              <p className="text-purple-600 mb-4">نقاطك: <span className="font-bold text-purple-800">{score}</span></p>
              <div className="flex gap-3 justify-center">
                <motion.button className="bg-gradient-to-l from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={nextLevel}>المستوى التالي 🚀</motion.button>
                <motion.button className="bg-amber-100 text-amber-700 px-6 py-3 rounded-xl font-bold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startGame}>من جديد 🔄</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lose */}
      <AnimatePresence>
        {gameStatus === 'lost' && (
          <motion.div className="absolute inset-0 flex items-center justify-center bg-amber-900/60 backdrop-blur-sm rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <div className="text-5xl mb-4">😢</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">انتهت المحاولة!</h3>
              <p className="text-purple-600 mb-4">نقاطك: <span className="font-bold text-purple-800">{score}</span></p>
              <motion.button className="bg-gradient-to-l from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startGame}>حاول مرة أخرى! 💪</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
