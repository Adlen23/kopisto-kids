/**
 * Kopisto 2D Animated Sprite - Image-Based System
 * Uses the actual Kopisto character images (idle & running) with realistic animations.
 * Applies squash & stretch, bobbing, and sprite cycling for Mario-style movement.
 */

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

// Sprite image cache - loaded once and reused
let idleImage: HTMLImageElement | null = null
let runImage: HTMLImageElement | null = null
let idleFlipImage: HTMLImageElement | null = null
let runFlipImage: HTMLImageElement | null = null
let imagesLoaded = false
let imagesLoading = false

function loadImages(): Promise<void> {
  if (imagesLoaded) return Promise.resolve()
  if (imagesLoading) return new Promise((resolve) => {
    const check = setInterval(() => {
      if (imagesLoaded) { clearInterval(check); resolve() }
    }, 50)
  })

  imagesLoading = true

  return new Promise((resolve) => {
    let loaded = 0
    const total = 4
    const onLoad = () => {
      loaded++
      if (loaded >= total) {
        imagesLoaded = true
        imagesLoading = false
        resolve()
      }
    }

    const onError = () => {
      // Fallback: if image fails, still resolve so game doesn't hang
      loaded++
      if (loaded >= total) {
        imagesLoaded = true
        imagesLoading = false
        resolve()
      }
    }

    idleImage = new Image()
    idleImage.onload = onLoad
    idleImage.onerror = onError
    idleImage.src = '/kopisto-idle.webp'

    runImage = new Image()
    runImage.onload = onLoad
    runImage.onerror = onError
    runImage.src = '/kopisto-run.webp'

    idleFlipImage = new Image()
    idleFlipImage.onload = onLoad
    idleFlipImage.onerror = onError
    idleFlipImage.src = '/kopisto-idle-flip.webp'

    runFlipImage = new Image()
    runFlipImage.onload = onLoad
    runFlipImage.onerror = onError
    runFlipImage.src = '/kopisto-run-flip.webp'
  })
}

// Start loading images immediately
if (typeof window !== 'undefined') {
  loadImages()
}

export function drawKopistoSprite(options: DrawKopistoOptions) {
  const { ctx, x, y, width, height, direction, state, frame } = options

  // If images not loaded yet, draw a placeholder
  if (!imagesLoaded) {
    drawPlaceholder(ctx, x, y, width, height)
    // Trigger loading
    loadImages()
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
      rotation = 0
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

  // Select the correct sprite image
  const facingRight = direction === 1
  let currentImage: HTMLImageElement | null

  if (state === 'walk') {
    currentImage = facingRight ? runImage : runFlipImage
  } else {
    currentImage = facingRight ? idleImage : idleFlipImage
  }

  if (!currentImage) {
    drawPlaceholder(ctx, x, y, width, height)
    ctx.restore()
    return
  }

  // Calculate draw dimensions - maintain aspect ratio of the sprite image
  const imgAspect = currentImage.naturalWidth / currentImage.naturalHeight
  const targetHeight = height
  const targetWidth = targetHeight * imgAspect

  // For walking animation - cycle between idle and run for frame animation effect
  let drawWidth = targetWidth
  let drawHeight = targetHeight

  // For walk state, add a slight frame cycling effect
  if (state === 'walk') {
    // Alternate between slightly different scales to simulate frame cycling
    const cyclePhase = Math.floor(frame / 6) % 2
    if (cyclePhase === 1) {
      // Slight alternate pose
      bodyBob -= 1
    }
  }

  ctx.globalAlpha = opacity
  ctx.translate(cx, bottom + bodyBob)
  ctx.rotate(rotation)
  ctx.scale(scaleX, scaleY)

  // Draw shadow first
  ctx.fillStyle = 'rgba(0,0,0,0.12)'
  ctx.beginPath()
  ctx.ellipse(0, 0, width * 0.35, 4, 0, 0, Math.PI * 2)
  ctx.fill()

  // Draw the sprite image centered at the bottom center position
  // The sprite bottom should align with the character's feet position
  ctx.drawImage(
    currentImage,
    -drawWidth / 2,
    -drawHeight,
    drawWidth,
    drawHeight
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
