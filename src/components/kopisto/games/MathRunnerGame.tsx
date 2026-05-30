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

interface Collectible {
  x: number
  y: number
  value: number
  collected: boolean
  isCorrect: boolean
  width: number
  height: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
  size: number
}

interface GameState {
  playerX: number
  playerY: number
  playerVX: number
  playerVY: number
  isJumping: boolean
  isOnGround: boolean
  direction: number
  cameraX: number
  score: number
  lives: number
  targetNumber: number
  level: number
  gameStatus: 'playing' | 'won' | 'lost' | 'menu'
  collectedCount: number
  frameCount: number
}

const GRAVITY = 0.6
const JUMP_FORCE = -12
const MOVE_SPEED = 4
const PLAYER_WIDTH = 40
const PLAYER_HEIGHT = 50
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 500

function generateLevel(level: number) {
  const platforms: Platform[] = []
  const collectibles: Collectible[] = []

  // Ground segments
  const groundSegments = [
    { x: 0, width: 300 },
    { x: 380, width: 200 },
    { x: 660, width: 250 },
    { x: 1000, width: 300 },
    { x: 1400, width: 200 },
    { x: 1700, width: 250 },
    { x: 2050, width: 300 },
    { x: 2450, width: 200 },
  ]

  for (const seg of groundSegments) {
    platforms.push({
      x: seg.x,
      y: CANVAS_HEIGHT - 40,
      width: seg.width,
      height: 40,
      type: 'normal',
    })
  }

  // Floating platforms
  const floatingPlatforms = [
    { x: 150, y: 350, width: 120, type: 'normal' as const },
    { x: 350, y: 280, width: 100, type: 'normal' as const },
    { x: 550, y: 320, width: 130, type: 'moving' as const, moveRange: 80, speed: 1 },
    { x: 750, y: 250, width: 110, type: 'normal' as const },
    { x: 950, y: 300, width: 120, type: 'moving' as const, moveRange: 60, speed: 1.5 },
    { x: 1150, y: 230, width: 100, type: 'normal' as const },
    { x: 1350, y: 340, width: 130, type: 'normal' as const },
    { x: 1550, y: 260, width: 110, type: 'moving' as const, moveRange: 70, speed: 1 },
    { x: 1750, y: 300, width: 120, type: 'normal' as const },
    { x: 1950, y: 220, width: 100, type: 'normal' as const },
    { x: 2200, y: 310, width: 130, type: 'moving' as const, moveRange: 90, speed: 1.2 },
    { x: 2400, y: 250, width: 110, type: 'normal' as const },
  ]

  for (const p of floatingPlatforms) {
    platforms.push({
      ...p,
      height: 20,
      originalX: p.x,
    })
  }

  // Generate math question
  const operations = level <= 2 ? ['+'] : level <= 4 ? ['+', '-'] : ['+', '-', '×']
  const op = operations[Math.floor(Math.random() * operations.length)]
  let a, b, answer
  switch (op) {
    case '+':
      a = Math.floor(Math.random() * (5 + level * 2)) + 1
      b = Math.floor(Math.random() * (5 + level * 2)) + 1
      answer = a + b
      break
    case '-':
      a = Math.floor(Math.random() * (5 + level * 2)) + 3
      b = Math.floor(Math.random() * a) + 1
      answer = a - b
      break
    case '×':
      a = Math.floor(Math.random() * 5) + 2
      b = Math.floor(Math.random() * 5) + 2
      answer = a * b
      break
    default:
      a = 1; b = 1; answer = 2
  }

  const questionText = `${a} ${op === '×' ? '×' : op} ${b} = ?`

  // Place collectibles with numbers
  const correctPositions = [
    { x: 200, y: 310 }, { x: 600, y: 280 }, { x: 1000, y: 260 },
    { x: 1400, y: 300 }, { x: 1800, y: 260 }, { x: 2200, y: 270 },
    { x: 2500, y: 210 },
  ]

  // Place correct answer
  const correctIdx = Math.floor(Math.random() * correctPositions.length)
  collectibles.push({
    x: correctPositions[correctIdx].x,
    y: correctPositions[correctIdx].y,
    value: answer,
    collected: false,
    isCorrect: true,
    width: 44,
    height: 44,
  })

  // Place wrong answers
  const usedValues = new Set([answer])
  for (let i = 0; i < correctPositions.length; i++) {
    if (i === correctIdx) continue
    let wrongAnswer: number
    do {
      wrongAnswer = answer + Math.floor(Math.random() * 7) - 3
      if (wrongAnswer === answer) wrongAnswer = answer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1)
    } while (usedValues.has(wrongAnswer) || wrongAnswer < 0)
    usedValues.add(wrongAnswer)

    collectibles.push({
      x: correctPositions[i].x,
      y: correctPositions[i].y,
      value: wrongAnswer,
      collected: false,
      isCorrect: false,
      width: 44,
      height: 44,
    })
  }

  return { platforms, collectibles, questionText, answer }
}

export default function MathRunnerGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<GameState>({
    playerX: 60,
    playerY: CANVAS_HEIGHT - 40 - PLAYER_HEIGHT,
    playerVX: 0,
    playerVY: 0,
    isJumping: false,
    isOnGround: false,
    direction: 1,
    cameraX: 0,
    score: 0,
    lives: 3,
    targetNumber: 0,
    level: 1,
    gameStatus: 'menu',
    collectedCount: 0,
    frameCount: 0,
  })
  const keysRef = useRef<Set<string>>(new Set())
  const levelDataRef = useRef(generateLevel(1))
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost' | 'menu'>('menu')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)
  const [questionText, setQuestionText] = useState('')

  const startGame = useCallback(() => {
    const newLevelData = generateLevel(1)
    levelDataRef.current = newLevelData
    setQuestionText(newLevelData.questionText)
    gameRef.current = {
      playerX: 60,
      playerY: CANVAS_HEIGHT - 40 - PLAYER_HEIGHT,
      playerVX: 0,
      playerVY: 0,
      isJumping: false,
      isOnGround: false,
      direction: 1,
      cameraX: 0,
      score: 0,
      lives: 3,
      targetNumber: newLevelData.answer,
      level: 1,
      gameStatus: 'playing',
      collectedCount: 0,
      frameCount: 0,
    }
    particlesRef.current = []
    setGameStatus('playing')
    setScore(0)
    setLives(3)
    setLevel(1)
  }, [])

  const nextLevel = useCallback(() => {
    const g = gameRef.current
    const newLevel = g.level + 1
    const newLevelData = generateLevel(newLevel)
    levelDataRef.current = newLevelData
    setQuestionText(newLevelData.questionText)
    g.playerX = 60
    g.playerY = CANVAS_HEIGHT - 40 - PLAYER_HEIGHT
    g.playerVX = 0
    g.playerVY = 0
    g.cameraX = 0
    g.targetNumber = newLevelData.answer
    g.level = newLevel
    g.gameStatus = 'playing'
    g.collectedCount = 0
    particlesRef.current = []
    setLevel(newLevel)
    setGameStatus('playing')
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key)
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    const drawKopisto = (ctx: CanvasRenderingContext2D, x: number, y: number, direction: number, frame: number) => {
      ctx.save()
      ctx.translate(x + PLAYER_WIDTH / 2, y)
      ctx.scale(direction, 1)

      // Body
      ctx.fillStyle = '#8B5CF6'
      ctx.beginPath()
      ctx.roundRect(4, 18, 32, 28, 6)
      ctx.fill()

      // Head
      ctx.fillStyle = '#A78BFA'
      ctx.beginPath()
      ctx.arc(20, 14, 14, 0, Math.PI * 2)
      ctx.fill()

      // Ears
      ctx.fillStyle = '#8B5CF6'
      ctx.beginPath()
      ctx.moveTo(8, 4)
      ctx.lineTo(2, -8)
      ctx.lineTo(14, 0)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(26, 2)
      ctx.lineTo(34, -8)
      ctx.lineTo(30, 6)
      ctx.fill()

      // Inner ears
      ctx.fillStyle = '#DDD6FE'
      ctx.beginPath()
      ctx.moveTo(9, 2)
      ctx.lineTo(5, -4)
      ctx.lineTo(13, 1)
      ctx.fill()

      // Eyes
      ctx.fillStyle = '#1E1B4B'
      ctx.beginPath()
      ctx.arc(14, 12, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(24, 12, 3, 0, Math.PI * 2)
      ctx.fill()

      // Eye shine
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(15, 11, 1.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(25, 11, 1.2, 0, Math.PI * 2)
      ctx.fill()

      // Nose
      ctx.fillStyle = '#5B21B6'
      ctx.beginPath()
      ctx.arc(20, 16, 2, 0, Math.PI * 2)
      ctx.fill()

      // Mouth - smile
      ctx.strokeStyle = '#5B21B6'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(20, 17, 4, 0.1 * Math.PI, 0.9 * Math.PI)
      ctx.stroke()

      // Belly
      ctx.fillStyle = '#DDD6FE'
      ctx.beginPath()
      ctx.roundRect(10, 24, 20, 16, 4)
      ctx.fill()

      // Legs - animated
      const legOffset = Math.sin(frame * 0.3) * 5
      ctx.fillStyle = '#7C3AED'
      // Left leg
      ctx.beginPath()
      ctx.roundRect(8, 44, 8, 8 + legOffset, 3)
      ctx.fill()
      // Right leg
      ctx.beginPath()
      ctx.roundRect(24, 44, 8, 8 - legOffset, 3)
      ctx.fill()

      // Shoes
      ctx.fillStyle = '#5B21B6'
      ctx.beginPath()
      ctx.roundRect(6, 50 + legOffset, 12, 5, 2)
      ctx.fill()
      ctx.beginPath()
      ctx.roundRect(22, 50 - legOffset, 12, 5, 2)
      ctx.fill()

      ctx.restore()
    }

    const drawPlatform = (ctx: CanvasRenderingContext2D, p: Platform, cameraX: number) => {
      const sx = p.x - cameraX
      if (sx + p.width < -50 || sx > CANVAS_WIDTH + 50) return

      // Platform top
      const gradient = ctx.createLinearGradient(sx, p.y, sx, p.y + p.height)
      gradient.addColorStop(0, p.type === 'moving' ? '#A78BFA' : '#86EFAC')
      gradient.addColorStop(1, p.type === 'moving' ? '#7C3AED' : '#22C55E')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.roundRect(sx, p.y, p.width, p.height, 6)
      ctx.fill()

      // Top highlight
      ctx.fillStyle = p.type === 'moving' ? '#C4B5FD' : '#BBF7D0'
      ctx.beginPath()
      ctx.roundRect(sx + 2, p.y, p.width - 4, 6, [4, 4, 0, 0])
      ctx.fill()

      // Grass tufts for normal platforms
      if (p.type === 'normal' && p.height > 30) {
        ctx.fillStyle = '#16A34A'
        for (let gx = sx + 10; gx < sx + p.width - 10; gx += 25) {
          ctx.beginPath()
          ctx.moveTo(gx, p.y)
          ctx.lineTo(gx + 4, p.y - 8)
          ctx.lineTo(gx + 8, p.y)
          ctx.fill()
        }
      }
    }

    const drawCollectible = (ctx: CanvasRenderingContext2D, c: Collectible, cameraX: number, frame: number) => {
      if (c.collected) return
      const sx = c.x - cameraX
      if (sx < -60 || sx > CANVAS_WIDTH + 60) return

      const bobY = Math.sin(frame * 0.05 + c.x * 0.01) * 6

      // Glow
      ctx.shadowColor = c.isCorrect ? '#8B5CF6' : '#F59E0B'
      ctx.shadowBlur = 15

      // Bubble
      const gradient = ctx.createRadialGradient(sx + 22, c.y + bobY + 10, 5, sx + 22, c.y + bobY + 22, 24)
      gradient.addColorStop(0, c.isCorrect ? '#EDE9FE' : '#FEF3C7')
      gradient.addColorStop(1, c.isCorrect ? '#8B5CF6' : '#F59E0B')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(sx + 22, c.y + bobY + 22, 22, 0, Math.PI * 2)
      ctx.fill()

      // Shine
      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      ctx.beginPath()
      ctx.arc(sx + 16, c.y + bobY + 16, 6, 0, Math.PI * 2)
      ctx.fill()

      ctx.shadowBlur = 0

      // Number
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 18px Fredoka, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(c.value.toString(), sx + 22, c.y + bobY + 23)
    }

    const drawBackground = (ctx: CanvasRenderingContext2D, cameraX: number, frame: number) => {
      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT)
      skyGrad.addColorStop(0, '#EDE9FE')
      skyGrad.addColorStop(0.5, '#F3E8FF')
      skyGrad.addColorStop(1, '#FAF5FF')
      ctx.fillStyle = skyGrad
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

      // Clouds (parallax)
      ctx.fillStyle = 'rgba(255,255,255,0.7)'
      const clouds = [
        { x: 100, y: 60, w: 80 },
        { x: 400, y: 40, w: 100 },
        { x: 700, y: 70, w: 70 },
        { x: 1100, y: 50, w: 90 },
        { x: 1500, y: 45, w: 85 },
        { x: 2000, y: 65, w: 75 },
      ]
      for (const cloud of clouds) {
        const cx = cloud.x - cameraX * 0.3
        const wrapped = ((cx % (CANVAS_WIDTH + 200)) + CANVAS_WIDTH + 200) % (CANVAS_WIDTH + 200) - 100
        ctx.beginPath()
        ctx.arc(wrapped, cloud.y, cloud.w / 3, 0, Math.PI * 2)
        ctx.arc(wrapped + cloud.w / 4, cloud.y - 10, cloud.w / 4, 0, Math.PI * 2)
        ctx.arc(wrapped + cloud.w / 2, cloud.y, cloud.w / 3, 0, Math.PI * 2)
        ctx.fill()
      }

      // Hills (parallax)
      ctx.fillStyle = '#DDD6FE'
      const hills = [0, 300, 600, 900, 1200, 1500, 1800, 2100]
      for (const hx of hills) {
        const sx = hx - cameraX * 0.5
        ctx.beginPath()
        ctx.arc(sx, CANVAS_HEIGHT - 30, 120, Math.PI, 2 * Math.PI)
        ctx.fill()
      }

      // Decorative elements
      ctx.fillStyle = '#C4B5FD'
      const flowers = [80, 250, 500, 750, 1050, 1300, 1600, 1900, 2200]
      for (const fx of flowers) {
        const sx = fx - cameraX * 0.8
        if (sx > -20 && sx < CANVAS_WIDTH + 20) {
          ctx.beginPath()
          ctx.arc(sx, CANVAS_HEIGHT - 42, 4, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#22C55E'
          ctx.fillRect(sx - 1, CANVAS_HEIGHT - 38, 2, 8)
          ctx.fillStyle = '#C4B5FD'
        }
      }
    }

    const drawParticles = (ctx: CanvasRenderingContext2D) => {
      for (const p of particlesRef.current) {
        ctx.globalAlpha = p.life / p.maxLife
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    const drawHUD = (ctx: CanvasRenderingContext2D, state: GameState) => {
      // Question box
      ctx.fillStyle = 'rgba(139, 92, 246, 0.9)'
      ctx.beginPath()
      ctx.roundRect(CANVAS_WIDTH / 2 - 100, 8, 200, 40, 12)
      ctx.fill()

      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 20px Fredoka, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(levelDataRef.current.questionText, CANVAS_WIDTH / 2, 28)

      // Score
      ctx.fillStyle = 'rgba(139, 92, 246, 0.9)'
      ctx.beginPath()
      ctx.roundRect(10, 8, 90, 36, 10)
      ctx.fill()
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 16px Fredoka, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`⭐ ${state.score}`, 55, 26)

      // Lives
      ctx.fillStyle = 'rgba(139, 92, 246, 0.9)'
      ctx.beginPath()
      ctx.roundRect(CANVAS_WIDTH - 100, 8, 90, 36, 10)
      ctx.fill()
      ctx.fillStyle = '#FFFFFF'
      ctx.textAlign = 'center'
      ctx.fillText(`❤️ ${state.lives}`, CANVAS_WIDTH - 55, 26)

      // Level
      ctx.fillStyle = 'rgba(139, 92, 246, 0.7)'
      ctx.beginPath()
      ctx.roundRect(CANVAS_WIDTH / 2 - 40, CANVAS_HEIGHT - 35, 80, 28, 8)
      ctx.fill()
      ctx.fillStyle = '#FFFFFF'
      ctx.font = 'bold 14px Fredoka, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`المستوى ${state.level}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 21)
    }

    const spawnParticles = (x: number, y: number, color: string, count: number) => {
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 1) * 6,
          life: 1,
          maxLife: 1,
          color,
          size: Math.random() * 4 + 2,
        })
      }
    }

    const gameLoop = () => {
      const g = gameRef.current
      const ld = levelDataRef.current
      const keys = keysRef.current

      if (g.gameStatus !== 'playing') {
        // Draw menu/frozen state
        drawBackground(ctx, g.cameraX, g.frameCount)
        for (const p of ld.platforms) drawPlatform(ctx, p, g.cameraX)
        for (const c of ld.collectibles) drawCollectible(ctx, c, g.cameraX, g.frameCount)
        drawKopisto(ctx, g.playerX - g.cameraX, g.playerY, g.direction, g.frameCount)
        drawParticles(ctx)
        drawHUD(ctx, g)
        animFrameRef.current = requestAnimationFrame(gameLoop)
        return
      }

      g.frameCount++

      // Input
      g.playerVX = 0
      if (keys.has('ArrowRight') || keys.has('d') || keys.has('D') || keys.has('م')) {
        g.playerVX = MOVE_SPEED
        g.direction = 1
      }
      if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A') || keys.has('ب')) {
        g.playerVX = -MOVE_SPEED
        g.direction = -1
      }
      if ((keys.has('ArrowUp') || keys.has('w') || keys.has('W') || keys.has(' ') || keys.has('ؤ')) && g.isOnGround) {
        g.playerVY = JUMP_FORCE
        g.isOnGround = false
        g.isJumping = true
      }

      // Physics
      g.playerVY += GRAVITY
      g.playerX += g.playerVX
      g.playerY += g.playerVY

      // Update moving platforms
      for (const p of ld.platforms) {
        if (p.type === 'moving' && p.originalX !== undefined && p.moveRange && p.speed) {
          p.x = p.originalX + Math.sin(g.frameCount * 0.02 * p.speed) * p.moveRange
        }
      }

      // Platform collision
      g.isOnGround = false
      for (const p of ld.platforms) {
        const px = g.playerX
        const py = g.playerY
        const pw = PLAYER_WIDTH
        const ph = PLAYER_HEIGHT

        if (px + pw > p.x && px < p.x + p.width) {
          // Landing on top
          if (py + ph > p.y && py + ph < p.y + p.height + g.playerVY + 2 && g.playerVY >= 0) {
            g.playerY = p.y - ph
            g.playerVY = 0
            g.isOnGround = true
            g.isJumping = false
          }
          // Hitting from below
          else if (py < p.y + p.height && py > p.y && g.playerVY < 0) {
            g.playerVY = 1
          }
        }
      }

      // Collectible collision
      for (const c of ld.collectibles) {
        if (c.collected) continue
        const dx = (g.playerX + PLAYER_WIDTH / 2) - (c.x + c.width / 2)
        const dy = (g.playerY + PLAYER_HEIGHT / 2) - (c.y + c.height / 2)
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 35) {
          c.collected = true
          if (c.isCorrect) {
            g.score += 100 * g.level
            g.collectedCount++
            spawnParticles(g.playerX + PLAYER_WIDTH / 2, g.playerY, '#8B5CF6', 20)
            spawnParticles(g.playerX + PLAYER_WIDTH / 2, g.playerY, '#FCD34D', 10)
            setScore(g.score)

            setTimeout(() => {
              g.gameStatus = 'won'
              setGameStatus('won')
            }, 500)
          } else {
            g.lives--
            g.playerVY = -8
            spawnParticles(g.playerX + PLAYER_WIDTH / 2, g.playerY, '#EF4444', 15)
            setLives(g.lives)
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

      // Camera follow
      const targetCameraX = g.playerX - CANVAS_WIDTH / 3
      g.cameraX += (targetCameraX - g.cameraX) * 0.1
      if (g.cameraX < 0) g.cameraX = 0

      // Update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1
        p.life -= 0.02
        if (p.life <= 0) particlesRef.current.splice(i, 1)
      }

      // Draw everything
      drawBackground(ctx, g.cameraX, g.frameCount)
      for (const p of ld.platforms) drawPlatform(ctx, p, g.cameraX)
      for (const c of ld.collectibles) drawCollectible(ctx, c, g.cameraX, g.frameCount)
      drawKopisto(ctx, g.playerX - g.cameraX, g.playerY, g.direction, g.frameCount)
      drawParticles(ctx)
      drawHUD(ctx, g)

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
      {/* Canvas */}
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="rounded-2xl border-4 border-purple-200 shadow-xl max-w-full"
          style={{ imageRendering: 'auto' }}
        />
      </div>

      {/* Mobile Controls */}
      <div className="flex justify-center gap-3 mt-4 md:hidden">
        <button
          className="w-14 h-14 bg-purple-100 rounded-xl text-2xl active:bg-purple-300 select-none"
          onTouchStart={() => keysRef.current.add('ArrowLeft')}
          onTouchEnd={() => keysRef.current.delete('ArrowLeft')}
        >
          ←
        </button>
        <button
          className="w-14 h-14 bg-purple-100 rounded-xl text-2xl active:bg-purple-300 select-none"
          onTouchStart={() => keysRef.current.add('ArrowUp')}
          onTouchEnd={() => keysRef.current.delete('ArrowUp')}
        >
          ↑
        </button>
        <button
          className="w-14 h-14 bg-purple-100 rounded-xl text-2xl active:bg-purple-300 select-none"
          onTouchStart={() => keysRef.current.add('ArrowRight')}
          onTouchEnd={() => keysRef.current.delete('ArrowRight')}
        >
          →
        </button>
      </div>

      {/* Desktop Controls Hint */}
      <div className="hidden md:flex justify-center gap-4 mt-4 text-sm text-purple-400">
        <span>← → للتحرك</span>
        <span>|</span>
        <span>↑ أو مسافة للقفز</span>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {gameStatus === 'menu' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-purple-900/60 backdrop-blur-sm rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <div className="text-5xl mb-4">🦊</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">عدّاء كوبيستو</h3>
              <p className="text-purple-600 text-sm mb-1">اقفز على المنصات واجمع الإجابة الصحيحة!</p>
              <p className="text-purple-400 text-xs mb-6">تحرك: ← → | اقفز: ↑ أو مسافة</p>
              <motion.button
                className="bg-gradient-to-l from-purple-600 to-violet-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
              >
                ابدأ اللعب! 🚀
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Win Overlay */}
      <AnimatePresence>
        {gameStatus === 'won' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-purple-900/60 backdrop-blur-sm rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">أحسنت! إجابة صحيحة!</h3>
              <p className="text-purple-600 mb-4">نقاطك: <span className="font-bold text-purple-800">{score}</span></p>
              <div className="flex gap-3 justify-center">
                <motion.button
                  className="bg-gradient-to-l from-purple-600 to-violet-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextLevel}
                >
                  المستوى التالي 🚀
                </motion.button>
                <motion.button
                  className="bg-purple-100 text-purple-700 px-6 py-3 rounded-xl font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                >
                  من جديد 🔄
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lose Overlay */}
      <AnimatePresence>
        {gameStatus === 'lost' && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-purple-900/60 backdrop-blur-sm rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4 shadow-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <div className="text-5xl mb-4">😢</div>
              <h3 className="text-2xl font-bold text-purple-900 mb-2">انتهت المحاولة!</h3>
              <p className="text-purple-600 mb-4">نقاطك: <span className="font-bold text-purple-800">{score}</span></p>
              <motion.button
                className="bg-gradient-to-l from-purple-600 to-violet-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startGame}
              >
                حاول مرة أخرى! 💪
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
