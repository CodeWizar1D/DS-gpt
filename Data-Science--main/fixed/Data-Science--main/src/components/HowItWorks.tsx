import { motion } from 'framer-motion'
import { ClipboardList, Cpu, LineChart } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: ClipboardList,
    title: 'Tell Us About You',
    desc: 'Provide your health information — age, weight, blood glucose, and more — through our guided, step-by-step assessment form.',
    color: '#00f0ff',
  },
  {
    num: '02',
    icon: Cpu,
    title: 'Get Your Assessment',
    desc: 'Our prediction system evaluates the information you provide to generate a personalised estimated risk score.',
    color: '#b026ff',
  },
  {
    num: '03',
    icon: LineChart,
    title: 'Understand Your Result',
    desc: 'Receive a clear, visual risk assessment in plain language — along with helpful next steps and health guidance.',
    color: '#00f0ff',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-pad relative overflow-hidden bg-dp-bgmid" id="how-it-works">
      {/* Subtle bg grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Orbs */}
      <div className="orb orb-purple w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div className="max-w-dp relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <p className="text-[#b026ff] text-sm font-semibold tracking-widest uppercase mb-4">Simple Process</p>
          <h2 className="font-black text-4xl sm:text-5xl tracking-tight leading-tight mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-dp-muted text-lg max-w-xl mx-auto">
            Three simple steps from start to your personalised risk result.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-14 left-1/6 right-1/6 h-px bg-gradient-to-r from-[#00f0ff]/30 via-[#b026ff]/30 to-[#00f0ff]/30" />

          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className="relative"
              >
                <div className="glass p-8 h-full group hover:-translate-y-2 transition-transform duration-300">
                  {/* Step number */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10"
                      style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: step.color }} />
                    </div>
                    <span
                      className="font-black text-5xl leading-none"
                      style={{ color: `${step.color}20` }}
                    >
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-white mb-3">{step.title}</h3>
                  <p className="text-dp-muted text-sm leading-relaxed">{step.desc}</p>

                  {/* Bottom glow accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${step.color}60, transparent)` }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
