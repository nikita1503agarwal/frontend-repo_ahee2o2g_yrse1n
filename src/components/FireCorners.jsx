import { useEffect, useRef } from 'react'

// Canvas-based corner flames with cinematic additive blending
export default function FireCorners({ intensity = 1 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * DPR
    canvas.height = height * DPR
    ctx.scale(DPR, DPR)

    const corners = [
      { x: 0, y: height, vx: 0.6, vy: -1.2 }, // bottom-left
      { x: width, y: height, vx: -0.6, vy: -1.2 }, // bottom-right
      { x: 0, y: 0, vx: 0.6, vy: 1.0 }, // top-left
      { x: width, y: 0, vx: -0.6, vy: 1.0 }, // top-right
    ]

    const spawn = () => {
      const corner = corners[Math.floor(Math.random() * corners.length)]
      const speed = (Math.random() * 0.8 + 0.6) * intensity
      const angleJitter = (Math.random() - 0.5) * 0.7
      particlesRef.current.push({
        x: corner.x + (Math.random() - 0.5) * 10,
        y: corner.y + (Math.random() - 0.5) * 10,
        vx: (corner.vx + angleJitter) * speed,
        vy: (corner.vy + angleJitter) * speed,
        life: Math.random() * 60 + 40,
        size: Math.random() * 6 + 4,
      })
    }

    const gradient = (y) => {
      // returns rgba string from hot core to smoke
      const t = Math.max(0, Math.min(1, y / height))
      // Shift palette slightly for top/bottom
      const r = 255
      const g = Math.floor(180 + 60 * (1 - t))
      const b = Math.floor(40 * (1 - t))
      const a = 0.12 + 0.08 * (1 - t)
      return `rgba(${r},${g},${b},${a})`
    }

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop)
      // subtle fade to create trails
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = 'rgba(5, 8, 15, 0.18)'
      ctx.fillRect(0, 0, width, height)

      // draw particles with additive blending for glow
      ctx.globalCompositeOperation = 'lighter'

      // spawn rate scales with intensity and size
      const toSpawn = Math.floor(8 * intensity)
      for (let i = 0; i < toSpawn; i++) spawn()

      const next = []
      for (const p of particlesRef.current) {
        p.x += p.vx + (Math.random() - 0.5) * 0.2
        p.y += p.vy + (Math.random() - 0.5) * 0.2
        p.life -= 1
        p.size *= 0.98

        if (p.life > 0 && p.size > 0.5) {
          // flame core
          const rad = p.size
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad)
          grad.addColorStop(0, 'rgba(255,230,120,0.65)')
          grad.addColorStop(0.4, gradient(p.y))
          grad.addColorStop(1, 'rgba(20,20,30,0.02)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2)
          ctx.fill()

          // occasional sparks
          if (Math.random() < 0.05 * intensity) {
            ctx.fillStyle = 'rgba(255,240,200,0.8)'
            ctx.fillRect(p.x, p.y, 1.5, 1.5)
          }

          next.push(p)
        }
      }
      particlesRef.current = next
    }

    loop()

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
  }, [intensity])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 -z-0"
      style={{ mixBlendMode: 'screen', opacity: 0.8 }}
    />
  )
}
