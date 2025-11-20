import { motion } from 'framer-motion'
import { Target, Shield, Crosshair } from 'lucide-react'

const items = [
  {
    icon: Target,
    title: 'Precision Gunplay',
    desc: 'Feel every trigger pull with responsive feedback and tuned recoil.'
  },
  {
    icon: Shield,
    title: 'Elite Operatives',
    desc: 'Suit up as an IIT agent equipped with cutting-edge tech and armor.'
  },
  {
    icon: Crosshair,
    title: 'Tactical Modes',
    desc: 'Objective-driven fights with coordinated team roles and gadgets.'
  }
]

export default function Features() {
  return (
    <section className="relative bg-[#070a12] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-2xl font-bold tracking-wider text-white md:text-3xl"
        >
          Built for Cinematic Combat
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <div className="mb-4 inline-flex rounded-lg bg-gradient-to-br from-orange-500/20 to-rose-600/20 p-3 text-orange-200">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-white/70">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
