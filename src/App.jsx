import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import FireCorners from './components/FireCorners'

function App() {
  return (
    <div className="relative min-h-screen w-full bg-[#05070d] text-white">
      {/* Corner fire cinematic effect */}
      <FireCorners intensity={1.2} />

      {/* Grain overlay for filmic look */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />

      <Hero />
      <Features />
      <Footer />
    </div>
  )
}

export default App
