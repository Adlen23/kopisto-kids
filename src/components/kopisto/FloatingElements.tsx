'use client'

import { useMemo } from 'react'

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
  type: 'star' | 'bubble' | 'heart' | 'sparkle'
}

function generateElements(): FloatingElement[] {
  const types: FloatingElement['type'][] = ['star', 'bubble', 'heart', 'sparkle']
  const generated: FloatingElement[] = []
  for (let i = 0; i < 25; i++) {
    generated.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4,
      type: types[Math.floor(Math.random() * types.length)],
    })
  }
  return generated
}

export default function FloatingElements() {
  const elements = useMemo(() => generateElements(), [])

  const getEmoji = (type: FloatingElement['type']) => {
    switch (type) {
      case 'star': return '⭐'
      case 'bubble': return '🫧'
      case 'heart': return '💜'
      case 'sparkle': return '✨'
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-float-slow opacity-20"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            fontSize: `${el.size}px`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
          }}
        >
          {getEmoji(el.type)}
        </div>
      ))}
    </div>
  )
}
