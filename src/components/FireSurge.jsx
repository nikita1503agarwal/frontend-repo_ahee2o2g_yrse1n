import { useEffect, useRef, useState } from 'react'

// Full-screen cinematic fire surge that can cover the screen
// Props:
// - play: start the surge animation
// - duration: ms for the main surge (default 2500)
// - maxIntensity: spawn multiplier at peak (default 6)
// - onEnd: callback when surge finishes
export default function FireSurge({ play = true, duration = 2500, maxIntensity = 6, onEnd }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const tRef = useRef(0)
  const particlesRef = useRef([])
  const [done, setDone] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * DPR
    canvas.height = height * DPR
    ctx.scale(DPR, DPR)

    const start = performance.now()

    const noise = (x, y, t) => {
      // cheap pseudo noise using layered sines
      return (
        Math.sin(x * 0.015 + t * 0.0016) +
        Math.sin(y * 0.02 - t * 0.0013) +
        Math.sin((x + y) * 0.01 + t * 0.0011)
      ) / 3
    }

    const spawn = (count, baseY) => {
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width
        const size = Math.random() * 10 + 6
        particlesRef.current.push({
          x,
          y: baseY + Math.random() * 30,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -(Math.random() * 1.6 + 0.9),
          life: Math.random() * 60 + 50,
          size,
          hue: 25 + Math.random() * 10,
        })
      }
    }

    const loop = (now) => {
      rafRef.current = requestAnimationFrame(loop)
      const elapsed = now - start
      tRef.current = elapsed

      // progress 0..1..0 for in-out surge
      const p = Math.min(elapsed / duration, 1)
      const ease = p < 1 ? (1 - Math.cos(Math.PI * p)) / 2 : 1

      // background fade
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(5, 8, 15, 0.22)'
      ctx.fillRect(0, 0, width, height)

      // spawn more when at peak
      const spawnBase = 18
      const intensity = 1 + ease * (maxIntensity - 1)
      spawn(Math.floor(spawnBase * intensity), height - 10)

      // draw particles
      ctx.globalCompositeOperation = 'lighter'
      const next = []
      for (const p of particlesRef.current) {
        // turbulence force field
        const n = noise(p.x, p.y, elapsed)
        p.vx += n * 0.04
        p.vy += Math.abs(n) * -0.02 - 0.01 // lift upward
        p.x += p.vx
        p.y += p.vy
        p.size *= 0.992
        p.life -= 1

        if (p.life > 0 && p.size > 0.6 && p.y > -60) {
          const r = Math.max(1.5, p.size)
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
          grad.addColorStop(0, `hsla(${p.hue},100%,60%,0.8)`)
          grad.addColorStop(0.35, `hsla(${p.hue + 10},100%,50%,0.45)`)
          grad.addColorStop(0.8, 'rgba(20,20,30,0.04)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
          ctx.fill()

          if (Math.random() < 0.03 * intensity) {
            ctx.fillStyle = 'rgba(255,240,200,0.9)'
            ctx.fillRect(p.x + (Math.random() - 0.5) * 2, p.y, 1.2, 1.2)
          }

          next.push(p)
        }
      }
      particlesRef.current = next

      // finish after tail clears
      if (elapsed > duration + 1200 && next.length < 50 && !done) {
        setDone(true)
        cancelAnimationFrame(rafRef.current)
        onEnd && onEnd()
      }
    }

    if (play) {
      rafRef.current = requestAnimationFrame(loop)
    }

    const onResize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      const DPR2 = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * DPR2
      canvas.height = height * DPR2
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(DPR2, DPR2)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [play, duration, maxIntensity, onEnd, done])

  if (done) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
