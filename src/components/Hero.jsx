import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  const backend = import.meta.env.VITE_BACKEND_URL
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

      {/* 3D Character from Spline (placeholder scene URL; replace with real if provided) */}
      <div className="relative z-10 h-[70vh] w-full md:h-[78vh]">
        <Spline scene="https://prod.spline.design/jdMPmS0-Placeholder/scene.splinecode" />
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
