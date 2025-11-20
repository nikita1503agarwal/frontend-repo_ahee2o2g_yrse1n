import { useState } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import FireCorners from './components/FireCorners'
import FireSurge from './components/FireSurge'

function App() {
  const [surge, setSurge] = useState(false)

  return (
    <div className="relative min-h-screen w-full bg-[#05070d] text-white">
      {/* Corner fire cinematic effect */}
      <FireCorners intensity={1.2} />

      {/* Fire surge overlay that can fully cover screen */}
      {surge && (
        <FireSurge play={surge} duration={2600} maxIntensity={7} onEnd={() => setSurge(false)} />
      )}

      {/* Grain overlay for filmic look */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />

      {/* Trigger button (temporary) */}
      <button
        onClick={() => setSurge(true)}
        className="fixed right-4 top-4 z-[70] rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:text-white"
      >
        Ignite
      </button>

      <Hero />
      <Features />
      <Footer />
    </div>
  )
}

export default App
