import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function Hero() {
  const backend = import.meta.env.VITE_BACKEND_URL
  const characterImg = import.meta.env.VITE_CHARACTER_IMAGE ||
    'https://images.unsplash.com/photo-1603346134415-4016e864e18b?q=80&w=1200&auto=format&fit=crop'; // Tactical silhouette placeholder

  // Simple parallax tilt for 2D character
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [8, -8])
  const rotateY = useTransform(x, [-50, 50], [-8, 8])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(Math.max(-50, Math.min(50, dx / 6)))
    y.set(Math.max(-50, Math.min(50, dy / 6)))
  }

  const resetTilt = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#06080f]">
      {/* Cinematic vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,100,60,0.12),transparent_30%),radial-gradient(circle_at_80%_90%,rgba(255,160,60,0.10),transparent_35%)]" />

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-sm bg-gradient-to-br from-orange-500 to-rose-600 shadow-[0_0_30px_rgba(255,80,20,0.5)]" />
          <span className="text-sm md:text-base tracking-[0.25em] text-white/80">CROSSFIRE//IIT</span>
        </div>
        <button className="group relative overflow-hidden rounded-full border border-white/10 px-5 py-2 text-xs uppercase tracking-widest text-white/80 transition hover:text-white">
          <span className="relative z-10">Play Trailer</span>
          <span className="absolute inset-0 -z-0 bg-gradient-to-r from-orange-500/0 via-orange-500/20 to-rose-600/0 opacity-0 transition group-hover:opacity-100" />
        </button>
      </div>

      {/* 2D Character with subtle tilt and glow */}
      <div
        className="relative z-10 flex h-[70vh] w-full items-center justify-center md:h-[78vh]"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
      >
        <motion.div
          style={{ rotateX, rotateY }}
          className="relative will-change-transform"
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
        >
          {/* Glow */}
          <div className="absolute -inset-8 -z-10 rounded-[30px] bg-gradient-to-b from-orange-500/10 via-rose-600/10 to-transparent blur-2xl" />
          {/* Character image */}
          <img
            src={characterImg}
            alt="Elite operative"
            className="mx-auto h-[60vh] w-auto max-w-[80vw] select-none rounded-[18px] object-cover object-center shadow-[0_30px_120px_rgba(255,80,20,0.25)] ring-1 ring-white/5"
            draggable={false}
          />
          {/* Subtle foreground HUD */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto h-24 w-[85%] rounded-full bg-gradient-to-t from-black/60 to-transparent blur-xl" />
        </motion.div>
      </div>

      {/* Title and CTA */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-6 pb-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-4 text-4xl font-black uppercase leading-tight tracking-widest text-white drop-shadow-[0_8px_40px_rgba(255,80,20,0.3)] md:text-6xl"
        >
          Crossfire: IIT Protocol
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: 'easeOut' }}
          className="mb-8 max-w-xl text-sm text-white/70 md:text-base"
        >
          A tactical shooter experience forged in labs. Cinematic gunplay, sharp movement, and an elite IIT operative at the center.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <a href="#" className="rounded-full bg-gradient-to-r from-orange-500 to-rose-600 px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-[0_0_40px_rgba(255,80,20,0.35)] transition hover:shadow-[0_0_60px_rgba(255,80,20,0.5)]">
            Play Now
          </a>
          <a href="#" className="rounded-full border border-white/10 px-8 py-3 text-sm font-semibold tracking-wide text-white/80 hover:text-white">
            Learn More
          </a>
        </motion.div>
      </div>

      {/* HUD Bars */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
    </section>
  )
}
