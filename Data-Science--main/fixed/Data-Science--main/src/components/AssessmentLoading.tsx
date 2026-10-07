import { motion } from 'framer-motion'
import { Activity, Sparkles } from 'lucide-react'

export default function AssessmentLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dp-bg/95 backdrop-blur-2xl">
      {/* Background radial orbs */}
      <div className="orb orb-cyan w-96 h-96 top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 opacity-30 animate-pulse-glow" />
      <div className="orb orb-purple w-96 h-96 bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2 opacity-30 animate-pulse-glow" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex flex-col items-center text-center p-8 max-w-md">
        
        {/* Animated concentric rings */}
        <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
          
          {/* Ring 1 - Outermost spinning glow */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00f0ff] border-r-[#b026ff]/40 shadow-glow-sm"
          />

          {/* Ring 2 - Reverse counter rotation */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-3 rounded-full border-2 border-transparent border-b-[#b026ff] border-l-[#00f0ff]/40"
          />

          {/* Ring 3 - Pulse ring */}
          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-6 rounded-full bg-gradient-to-tr from-[#00f0ff]/20 to-[#b026ff]/20 backdrop-blur-md"
          />

          {/* Center glowing badge */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00f0ff] to-[#b026ff] flex items-center justify-center shadow-glow-cyan z-10">
            <Activity className="w-7 h-7 text-dp-bg" strokeWidth={2.5} />
          </div>
        </div>

        {/* Text descriptions */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span className="text-xs uppercase tracking-wider text-white/80 font-medium">Computing Risk Profile</span>
        </div>

        <h2 className="font-extrabold text-2xl sm:text-3xl text-white mb-3">
          Analyzing Your Assessment
        </h2>

        <p className="text-dp-muted text-sm leading-relaxed max-w-sm mb-6">
          Calibrating your health measurements against standardized clinical metabolic indicators...
        </p>

        {/* Pulsing Loading Bar */}
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="w-1/2 h-full bg-gradient-to-r from-[#00f0ff] via-[#b026ff] to-[#00f0ff] rounded-full"
          />
        </div>

        <div className="flex gap-2 mt-6">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          <span className="text-[11px] font-mono text-white/40">Client-Side Computation</span>
        </div>

      </div>
    </div>
  )
}
