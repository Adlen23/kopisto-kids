/**
 * Kopisto 2D Animated Sprite - Image-Based System
 * Uses embedded base64 sprite images for reliable loading in all environments.
 * Applies squash & stretch, bobbing, and sprite cycling for Mario-style movement.
 */

import { SPRITE_DATA } from './spriteData'

export type SpriteState = 'idle' | 'walk' | 'jump' | 'fall' | 'hurt'

interface DrawKopistoOptions {
  ctx: CanvasRenderingContext2D
  x: number
  y: number
  width: number
  height: number
  direction: 1 | -1
  state: SpriteState
  frame: number
  isMoving?: boolean
}

// Global sprite image cache - shared across all game instances
const spriteCache: Record<string, HTMLImageElement> = {}
let spritesReady = false
let spritesLoading = false

function loadSprites(): void {
  if (spritesReady || spritesLoading) return
  spritesLoading = true

  const spriteKeys = ['idle', 'run', 'idleFlip', 'runFlip']
  let loaded = 0
  const total = spriteKeys.length

  for (const key of spriteKeys) {
    const img = new Image()

    img.onload = () => {
      spriteCache[key] = img
      loaded++
      if (loaded >= total) {
        spritesReady = true
        spritesLoading = false
      }
    }

    img.onerror = () => {
      console.warn(`Failed to load sprite: ${key}`)
      loaded++
      if (loaded >= total) {
        spritesReady = true
        spritesLoading = false
      }
    }

    // Use embedded base64 data URI - guaranteed to work in all environments
    img.src = SPRITE_DATA[key]
  }
}

// Auto-load sprites on first import in browser
if (typeof window !== 'undefined') {
  loadSprites()
}

export function drawKopistoSprite(options: DrawKopistoOptions) {
  const { ctx, x, y, width, height, direction, state, frame } = options

  // Ensure sprites are loading
  if (typeof window !== 'undefined' && !spritesReady && !spritesLoading) {
    loadSprites()
  }

  // If sprites not ready yet, draw placeholder
  if (!spritesReady) {
    drawPlaceholder(ctx, x, y, width, height)
    return
  }

  // Select the correct sprite image
  const facingRight = direction === 1
  let currentImage: HTMLImageElement | undefined

  if (state === 'walk') {
    currentImage = facingRight ? spriteCache['run'] : spriteCache['runFlip']
  } else {
    currentImage = facingRight ? spriteCache['idle'] : spriteCache['idleFlip']
  }

  if (!currentImage || !currentImage.naturalWidth) {
    drawPlaceholder(ctx, x, y, width, height)
    return
  }

  ctx.save()

  // Center the character drawing position
  const cx = x + width / 2
  const bottom = y + height

  // Animation variables
  let bodyBob = 0
  let scaleX = 1
  let scaleY = 1
  let rotation = 0
  let opacity = 1

  const t = frame * 0.15

  switch (state) {
    case 'idle':
      // Gentle breathing/bobbing animation
      bodyBob = Math.sin(t) * 2
      scaleY = 1 + Math.sin(t * 0.8) * 0.02
      scaleX = 1 - Math.sin(t * 0.8) * 0.02
      break

    case 'walk':
      // Bouncy walk cycle with squash & stretch
      const walkCycle = Math.abs(Math.sin(t * 2.5))
      bodyBob = -walkCycle * 4
      scaleX = 1 + (1 - walkCycle) * 0.06
      scaleY = 1 - (1 - walkCycle) * 0.06
      break

    case 'jump':
      // Stretched upward pose
      bodyBob = -3
      scaleX = 0.88
      scaleY = 1.15
      break

    case 'fall':
      // Wide falling pose with slight wiggle
      bodyBob = 2
      scaleX = 1.08
      scaleY = 0.92
      rotation = Math.sin(t * 3) * 0.05
      break

    case 'hurt':
      // Shake effect
      bodyBob = Math.sin(t * 10) * 3
      rotation = Math.sin(t * 10) * 0.1
      opacity = 0.5 + Math.sin(t * 15) * 0.3
      break
  }

  // Calculate draw dimensions - maintain aspect ratio of the sprite image
  const imgAspect = currentImage.naturalWidth / currentImage.naturalHeight
  const targetHeight = height
  const targetWidth = targetHeight * imgAspect

  ctx.globalAlpha = opacity
  ctx.translate(cx, bottom + bodyBob)
  ctx.rotate(rotation)
  ctx.scale(scaleX, scaleY)

  // Draw shadow first
  ctx.fillStyle = 'rgba(0,0,0,0.12)'
  ctx.beginPath()
  ctx.ellipse(0, 0, width * 0.35, 4, 0, 0, Math.PI * 2)
  ctx.fill()

  // Draw the sprite image - bottom center aligned
  ctx.drawImage(
    currentImage,
    -targetWidth / 2,
    -targetHeight,
    targetWidth,
    targetHeight
  )

  ctx.globalAlpha = 1
  ctx.restore()
}

// Simple placeholder when images are loading
function drawPlaceholder(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.save()
  ctx.fillStyle = '#FFF8E7'
  ctx.beginPath()
  ctx.ellipse(x + w / 2, y + h / 2, w / 2.5, h / 2.5, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#00A0FF'
  ctx.beginPath()
  ctx.arc(x + w / 2 - 5, y + h / 2 - 4, 3, 0, Math.PI * 2)
  ctx.arc(x + w / 2 + 5, y + h / 2 - 4, 3, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#FFB6C1'
  ctx.beginPath()
  ctx.arc(x + w / 2, y + h / 2, 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}
