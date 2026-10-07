import { motion } from 'framer-motion'
import { Zap, Target, Shield, BarChart3 } from 'lucide-react'

const cards = [
  {
    icon: Zap,
    title: 'Quick Assessment',
    desc: 'Complete your personalised health assessment in just a few guided steps.',
    color: '#00f0ff',
  },
  {
    icon: Target,
    title: 'Personalised Prediction',
    desc: 'Receive a risk estimate based on the specific information you provide.',
    color: '#b026ff',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    desc: 'All calculations happen in your browser. Zero data leaves your device.',
    color: '#00f0ff',
  },
  {
    icon: BarChart3,
    title: 'Clear Results',
    desc: 'Understand your result instantly with plain-language explanations.',
    color: '#b026ff',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function TrustSection() {
  return (
    <section className="section-pad relative overflow-hidden bg-dp-bg">
      {/* Subtle top divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[#00f0ff]/30 to-transparent" />

      <div className="max-w-dp relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#00f0ff] text-sm font-semibold tracking-widest uppercase mb-4">Why DiabPredict</p>
          <h2 className="font-black text-4xl sm:text-5xl tracking-tight leading-tight mb-4">
            Built Around Your<br />
            <span className="gradient-text">Health Information</span>
          </h2>
          <p className="text-dp-muted text-lg max-w-xl mx-auto">
            Everything about DiabPredict is designed to put your health and privacy first.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {cards.map(card => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                variants={item}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass p-7 group cursor-default relative overflow-hidden"
                style={{
                  boxShadow: 'none',
                  transition: 'box-shadow 0.3s ease',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow =
                    `0 0 30px ${card.color}20, 0 8px 30px rgba(0,0,0,0.4)`
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                }}
              >
                {/* Glow corner */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ background: `radial-gradient(circle at top right, ${card.color}, transparent)` }}
                />

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10"
                  style={{ background: `${card.color}18`, border: `1px solid ${card.color}30` }}
                >
                  <Icon className="w-6 h-6" style={{ color: card.color }} />
                </div>

                <h3 className="font-bold text-lg text-white mb-2 relative z-10">{card.title}</h3>
                <p className="text-dp-muted text-sm leading-relaxed relative z-10">{card.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
