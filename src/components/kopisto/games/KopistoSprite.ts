/**
 * Kopisto 2D Animated Sprite - Canvas Drawing System
 * A cute plump rabbit character with cream fur, big blue eyes, pink nose & cheeks,
 * long ears, and stubby limbs. Mario-style platformer animations.
 */

// Character proportions
const HEAD_W = 32
const HEAD_H = 28
const BODY_W = 28
const BODY_H = 22
const EAR_W = 10
const EAR_H = 22
const ARM_W = 8
const ARM_H = 14
const LEG_W = 10
const LEG_H = 12
const PAW_R = 5

// Colors
const FUR_COLOR = '#FFF8E7'
const FUR_SHADOW = '#F0E6D0'
const FUR_DARK_SHADOW = '#E0D5BF'
const BELLY_COLOR = '#FFFDF5'
const EAR_INNER = '#FFCDD2'
const EYE_COLOR = '#00A0FF'
const EYE_DARK = '#0070CC'
const PUPIL_COLOR = '#1A1A2E'
const NOSE_COLOR = '#FFB6C1'
const BLUSH_COLOR = 'rgba(255,182,193,0.5)'
const TEETH_COLOR = '#FFFFFF'
const MOUTH_COLOR = '#E8707A'
const PAW_PAD = '#FFCDD2'

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

export function drawKopistoSprite(options: DrawKopistoOptions) {
  const { ctx, x, y, width, height, direction, state, frame } = options

  ctx.save()

  // Center the character
  const cx = x + width / 2
  const cy = y + height / 2

  ctx.translate(cx, cy)
  ctx.scale(direction, 1)

  // Animation variables
  let bodyBob = 0
  let headTilt = 0
  let leftArmAngle = 0
  let rightArmAngle = 0
  let leftLegAngle = 0
  let rightLegAngle = 0
  let leftLegOffset = 0
  let rightLegOffset = 0
  let earWiggle = 0
  let eyeScale = 1
  let scaleX = 1
  let scaleY = 1

  const t = frame * 0.15

  switch (state) {
    case 'idle':
      bodyBob = Math.sin(t) * 1.5
      headTilt = Math.sin(t * 0.8) * 0.02
      leftArmAngle = Math.sin(t * 0.7) * 0.05
      rightArmAngle = Math.sin(t * 0.7 + 1) * 0.05
      earWiggle = Math.sin(t * 1.2) * 2
      break

    case 'walk':
      bodyBob = Math.abs(Math.sin(t * 2)) * 3
      headTilt = Math.sin(t * 2) * 0.04
      leftArmAngle = Math.sin(t * 2) * 0.5
      rightArmAngle = Math.sin(t * 2 + Math.PI) * 0.5
      leftLegAngle = Math.sin(t * 2) * 0.6
      rightLegAngle = Math.sin(t * 2 + Math.PI) * 0.6
      leftLegOffset = Math.sin(t * 2) * 4
      rightLegOffset = Math.sin(t * 2 + Math.PI) * 4
      earWiggle = Math.sin(t * 2.5) * 3
      scaleX = 1 + Math.sin(t * 2) * 0.03
      scaleY = 1 - Math.sin(t * 2) * 0.03
      break

    case 'jump':
      bodyBob = -2
      leftArmAngle = -1.2
      rightArmAngle = -1.2
      leftLegAngle = 0.3
      rightLegAngle = -0.3
      earWiggle = -5
      scaleX = 0.9
      scaleY = 1.12
      eyeScale = 1.15
      break

    case 'fall':
      bodyBob = 2
      leftArmAngle = -0.8 + Math.sin(t * 3) * 0.2
      rightArmAngle = 0.8 + Math.sin(t * 3 + 1) * 0.2
      leftLegAngle = 0.2
      rightLegAngle = -0.2
      earWiggle = 4
      scaleX = 0.95
      scaleY = 1.05
      break

    case 'hurt':
      bodyBob = Math.sin(t * 8) * 3
      headTilt = Math.sin(t * 8) * 0.15
      leftArmAngle = Math.sin(t * 8) * 0.3
      rightArmAngle = Math.sin(t * 8 + 1) * 0.3
      earWiggle = Math.sin(t * 8) * 4
      break
  }

  // Apply squash & stretch
  ctx.scale(scaleX, scaleY)

  // === SHADOW ===
  ctx.fillStyle = 'rgba(0,0,0,0.12)'
  ctx.beginPath()
  ctx.ellipse(0, height / 2 - 2, width * 0.35, 4, 0, 0, Math.PI * 2)
  ctx.fill()

  // === LEGS (drawn behind body) ===
  const legBaseY = 8 + bodyBob

  // Left leg
  ctx.save()
  ctx.translate(-7, legBaseY)
  ctx.rotate(leftLegAngle)
  drawLeg(ctx, -leftLegOffset * 0.3)
  ctx.restore()

  // Right leg
  ctx.save()
  ctx.translate(7, legBaseY)
  ctx.rotate(rightLegAngle)
  drawLeg(ctx, -rightLegOffset * 0.3)
  ctx.restore()

  // === BODY ===
  const bodyY = -8 + bodyBob

  // Body shadow
  ctx.fillStyle = FUR_SHADOW
  ctx.beginPath()
  ctx.ellipse(0, bodyY + 2, BODY_W / 2 + 1, BODY_H / 2 + 1, 0, 0, Math.PI * 2)
  ctx.fill()

  // Body main
  ctx.fillStyle = FUR_COLOR
  ctx.beginPath()
  ctx.ellipse(0, bodyY, BODY_W / 2, BODY_H / 2, 0, 0, Math.PI * 2)
  ctx.fill()

  // Belly
  ctx.fillStyle = BELLY_COLOR
  ctx.beginPath()
  ctx.ellipse(0, bodyY + 3, BODY_W / 2 - 4, BODY_H / 2 - 4, 0, 0, Math.PI * 2)
  ctx.fill()

  // === ARMS ===
  const armY = bodyY - 5

  // Left arm (behind)
  ctx.save()
  ctx.translate(-BODY_W / 2 - 2, armY)
  ctx.rotate(leftArmAngle)
  drawArm(ctx)
  ctx.restore()

  // Right arm (in front)
  ctx.save()
  ctx.translate(BODY_W / 2 + 2, armY)
  ctx.rotate(rightArmAngle)
  drawArm(ctx)
  ctx.restore()

  // === HEAD ===
  const headY = bodyY - HEAD_H / 2 - BODY_H / 2 + 6 + bodyBob * 0.5

  ctx.save()
  ctx.translate(0, headY)
  ctx.rotate(headTilt)

  // Head shadow
  ctx.fillStyle = FUR_SHADOW
  ctx.beginPath()
  ctx.ellipse(0, 2, HEAD_W / 2 + 1, HEAD_H / 2 + 1, 0, 0, Math.PI * 2)
  ctx.fill()

  // Head main
  ctx.fillStyle = FUR_COLOR
  ctx.beginPath()
  ctx.ellipse(0, 0, HEAD_W / 2, HEAD_H / 2, 0, 0, Math.PI * 2)
  ctx.fill()

  // === EARS ===
  const earBaseY = -HEAD_H / 2 + 2

  // Left ear
  ctx.save()
  ctx.translate(-8, earBaseY)
  ctx.rotate(-0.2 + earWiggle * 0.02)
  drawEar(ctx)
  ctx.restore()

  // Right ear
  ctx.save()
  ctx.translate(8, earBaseY)
  ctx.rotate(0.2 - earWiggle * 0.015)
  drawEar(ctx)
  ctx.restore()

  // === CHEEKS ===
  // Puffy cheeks
  ctx.fillStyle = FUR_COLOR
  ctx.beginPath()
  ctx.ellipse(-HEAD_W / 2 + 5, 4, 8, 7, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(HEAD_W / 2 - 5, 4, 8, 7, 0, 0, Math.PI * 2)
  ctx.fill()

  // Blush
  ctx.fillStyle = BLUSH_COLOR
  ctx.beginPath()
  ctx.ellipse(-HEAD_W / 2 + 6, 3, 6, 4, -0.1, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.ellipse(HEAD_W / 2 - 6, 3, 6, 4, 0.1, 0, Math.PI * 2)
  ctx.fill()

  // === EYES ===
  const eyeY = -2
  const eyeSpacing = 8

  // Left eye
  drawEye(ctx, -eyeSpacing, eyeY, eyeScale)
  // Right eye
  drawEye(ctx, eyeSpacing, eyeY, eyeScale)

  // === NOSE ===
  ctx.fillStyle = NOSE_COLOR
  ctx.beginPath()
  ctx.moveTo(0, 4)
  ctx.lineTo(-3.5, 1.5)
  ctx.quadraticCurveTo(0, 0.5, 3.5, 1.5)
  ctx.closePath()
  ctx.fill()

  // Nose shine
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.beginPath()
  ctx.ellipse(-1, 2, 1.5, 1, 0, 0, Math.PI * 2)
  ctx.fill()

  // === MOUTH ===
  // U-shaped smile
  ctx.strokeStyle = MOUTH_COLOR
  ctx.lineWidth = 1.5
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.arc(0, 6, 5, 0.1, Math.PI - 0.1)
  ctx.stroke()

  // Teeth
  ctx.fillStyle = TEETH_COLOR
  ctx.beginPath()
  ctx.roundRect(-2.5, 5.5, 2.5, 3, 1)
  ctx.fill()
  ctx.beginPath()
  ctx.roundRect(0, 5.5, 2.5, 3, 1)
  ctx.fill()

  // Tooth line
  ctx.strokeStyle = '#E0D5BF'
  ctx.lineWidth = 0.5
  ctx.beginPath()
  ctx.moveTo(0, 5.5)
  ctx.lineTo(0, 8.5)
  ctx.stroke()

  // Whisker dots
  ctx.fillStyle = FUR_DARK_SHADOW
  ctx.beginPath()
  ctx.arc(-5, 5, 0.8, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(5, 5, 0.8, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore() // head transform

  ctx.restore() // main transform
}

function drawEar(ctx: CanvasRenderingContext2D) {
  // Outer ear
  ctx.fillStyle = FUR_COLOR
  ctx.beginPath()
  ctx.ellipse(0, -EAR_H / 2, EAR_W / 2, EAR_H / 2, 0, 0, Math.PI * 2)
  ctx.fill()

  // Ear shadow
  ctx.fillStyle = FUR_SHADOW
  ctx.beginPath()
  ctx.ellipse(1, -EAR_H / 2 + 2, EAR_W / 2 - 2, EAR_H / 2 - 3, 0, 0, Math.PI * 2)
  ctx.fill()

  // Inner ear (pink)
  ctx.fillStyle = EAR_INNER
  ctx.beginPath()
  ctx.ellipse(0, -EAR_H / 2 + 1, EAR_W / 2 - 3, EAR_H / 2 - 5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Ear highlight
  ctx.fillStyle = 'rgba(255,255,255,0.3)'
  ctx.beginPath()
  ctx.ellipse(-1, -EAR_H / 2 - 3, 2, 4, -0.2, 0, Math.PI * 2)
  ctx.fill()
}

function drawEye(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)

  // Eye white
  ctx.fillStyle = '#FFFFFF'
  ctx.beginPath()
  ctx.ellipse(0, 0, 6, 6.5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Eye outline
  ctx.strokeStyle = '#D4C5A9'
  ctx.lineWidth = 0.5
  ctx.beginPath()
  ctx.ellipse(0, 0, 6, 6.5, 0, 0, Math.PI * 2)
  ctx.stroke()

  // Iris
  ctx.fillStyle = EYE_COLOR
  ctx.beginPath()
  ctx.ellipse(0.5, 0.5, 4.5, 4.5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Iris gradient ring
  ctx.fillStyle = EYE_DARK
  ctx.beginPath()
  ctx.arc(0.5, 0.5, 4.5, Math.PI * 0.7, Math.PI * 1.3)
  ctx.arc(0.5, 0.5, 3, Math.PI * 1.3, Math.PI * 0.7, true)
  ctx.closePath()
  ctx.fill()

  // Pupil
  ctx.fillStyle = PUPIL_COLOR
  ctx.beginPath()
  ctx.ellipse(0.5, 0.5, 2.5, 3, 0, 0, Math.PI * 2)
  ctx.fill()

  // Main highlight (top-left)
  ctx.fillStyle = '#FFFFFF'
  ctx.beginPath()
  ctx.ellipse(-1.5, -2, 2, 2.2, -0.3, 0, Math.PI * 2)
  ctx.fill()

  // Small highlight (bottom-right)
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.beginPath()
  ctx.ellipse(2, 2, 1, 1, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function drawArm(ctx: CanvasRenderingContext2D) {
  // Arm
  ctx.fillStyle = FUR_COLOR
  ctx.beginPath()
  ctx.ellipse(0, ARM_H / 2 - 2, ARM_W / 2, ARM_H / 2, 0, 0, Math.PI * 2)
  ctx.fill()

  // Arm shadow
  ctx.fillStyle = FUR_SHADOW
  ctx.beginPath()
  ctx.ellipse(1, ARM_H / 2, ARM_W / 2 - 1.5, ARM_H / 2 - 2, 0, 0, Math.PI * 2)
  ctx.fill()

  // Paw
  ctx.fillStyle = FUR_COLOR
  ctx.beginPath()
  ctx.arc(0, ARM_H - 3, PAW_R, 0, Math.PI * 2)
  ctx.fill()

  // Paw pad
  ctx.fillStyle = PAW_PAD
  ctx.beginPath()
  ctx.ellipse(0, ARM_H - 2, 3, 2.5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Paw toes
  ctx.fillStyle = PAW_PAD
  ctx.beginPath()
  ctx.arc(-2.5, ARM_H - 5, 1.2, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(0, ARM_H - 5.5, 1.2, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(2.5, ARM_H - 5, 1.2, 0, Math.PI * 2)
  ctx.fill()
}

function drawLeg(ctx: CanvasRenderingContext2D, extraOffset: number) {
  ctx.save()
  ctx.translate(0, extraOffset)

  // Leg
  ctx.fillStyle = FUR_COLOR
  ctx.beginPath()
  ctx.ellipse(0, LEG_H / 2 - 3, LEG_W / 2, LEG_H / 2, 0, 0, Math.PI * 2)
  ctx.fill()

  // Leg shadow
  ctx.fillStyle = FUR_SHADOW
  ctx.beginPath()
  ctx.ellipse(1, LEG_H / 2 - 1, LEG_W / 2 - 2, LEG_H / 2 - 2, 0, 0, Math.PI * 2)
  ctx.fill()

  // Foot
  ctx.fillStyle = FUR_COLOR
  ctx.beginPath()
  ctx.ellipse(0, LEG_H - 3, LEG_W / 2 + 2, 5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Foot pad
  ctx.fillStyle = PAW_PAD
  ctx.beginPath()
  ctx.ellipse(0, LEG_H - 2, LEG_W / 2, 3, 0, 0, Math.PI * 2)
  ctx.fill()

  // Toe beans
  ctx.fillStyle = PAW_PAD
  ctx.beginPath()
  ctx.arc(-3, LEG_H - 5, 1.3, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(0, LEG_H - 5.5, 1.3, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(3, LEG_H - 5, 1.3, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}
