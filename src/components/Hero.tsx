import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Activity, ShieldCheck, HeartPulse, ChevronRight } from 'lucide-react'

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 80])
  const y2 = useTransform(scrollY, [0, 500], [0, -40])
  const opacity = useTransform(scrollY, [0, 350], [1, 0.4])

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="orb orb-cyan w-[500px] h-[500px] -top-32 -left-32 opacity-25 animate-pulse-glow" />
      <div className="orb orb-purple w-[600px] h-[600px] top-1/4 -right-36 opacity-20 animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Call To Action */}
          <motion.div 
            style={{ opacity }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-[#00f0ff] animate-ping" />
              <Sparkles className="w-4 h-4 text-[#00f0ff]" />
              <span className="text-xs uppercase tracking-wider text-white/90 font-medium">
                Next-Gen Healthcare Prediction
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] mb-6">
              Understand Your Risk.{' '}
              <span className="gradient-text block mt-1">Take Control of Your Health.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-dp-muted text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Get an instant, personalized diabetes risk assessment based on your health indicators. 
              Private, browser-computed, and engineered with clinical parameters.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/assessment" className="btn-primary w-full sm:w-auto text-base justify-center py-4 px-8">
                Start Assessment <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
              <a href="#how-it-works" className="btn-outline w-full sm:w-auto text-base justify-center py-4 px-8">
                Learn More
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-white/60">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#00f0ff]" />
                <span>100% Client-Side Privacy</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#b026ff]" />
                <span>Real-Time Biometric Analysis</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Futuristic Floating Glass Biometric Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Ambient Backing Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00f0ff]/15 via-transparent to-[#b026ff]/15 rounded-3xl filter blur-2xl -z-10" />

            {/* Main Central Glass Device Display */}
            <motion.div 
              style={{ y: y1 }}
              className="w-full max-w-md glass-strong p-6 sm:p-8 rounded-3xl border border-white/15 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#b026ff] flex items-center justify-center">
                    <HeartPulse className="w-4 h-4 text-dp-bg" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Biometric Overview</h3>
                    <p className="text-[11px] text-white/40">Real-time parameters</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  LIVE DEMO
                </span>
              </div>

              {/* Gauge Graphic Mockup */}
              <div className="flex flex-col items-center justify-center py-4 mb-6 relative">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <circle 
                      cx="50" cy="50" r="40" fill="transparent" 
                      stroke="url(#hero-gradient)" 
                      strokeWidth="8" 
                      strokeDasharray="251.2" 
                      strokeDashoffset="180" 
                      strokeLinecap="round" 
                    />
                    <defs>
                      <linearGradient id="hero-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00f0ff" />
                        <stop offset="100%" stopColor="#b026ff" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-white">22%</span>
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold mt-0.5">Low Risk</span>
                  </div>
                </div>
                <p className="text-xs text-white/50 text-center mt-2">Example Risk Evaluation Metric</p>
              </div>

              {/* Parameter Metric Tiles */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                  <div className="text-[11px] text-white/50 mb-1">Blood Glucose</div>
                  <div className="text-lg font-bold text-white">98 <span className="text-xs text-[#00f0ff] font-normal">mg/dL</span></div>
                  <div className="text-[10px] text-emerald-400 mt-1">Normal Range</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3">
                  <div className="text-[11px] text-white/50 mb-1">Blood Pressure</div>
                  <div className="text-lg font-bold text-white">74 <span className="text-xs text-[#b026ff] font-normal">mmHg</span></div>
                  <div className="text-[10px] text-emerald-400 mt-1">Optimal</div>
                </div>
              </div>

              {/* Progress CTA teaser */}
              <Link to="/assessment" className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group">
                <span className="text-xs font-medium text-white/80">Configure your personal profile</span>
                <ChevronRight className="w-4 h-4 text-[#00f0ff] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Floating Auxiliary Glass Tag 1 */}
            <motion.div 
              style={{ y: y2 }}
              className="absolute -top-6 -right-6 sm:-right-8 glass p-3.5 rounded-2xl shadow-xl border border-white/15 animate-float hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/15 flex items-center justify-center border border-[#00f0ff]/30">
                <Activity className="w-5 h-5 text-[#00f0ff]" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-white/40 tracking-wider">BMI Index</div>
                <div className="text-sm font-bold text-white">22.4 <span className="text-xs text-emerald-400 font-medium">Optimal</span></div>
              </div>
            </motion.div>

            {/* Floating Auxiliary Glass Tag 2 */}
            <motion.div 
              style={{ y: y1 }}
              className="absolute -bottom-6 -left-6 sm:-left-8 glass p-3.5 rounded-2xl shadow-xl border border-white/15 animate-float-r hidden sm:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#b026ff]/15 flex items-center justify-center border border-[#b026ff]/30">
                <Sparkles className="w-5 h-5 text-[#b026ff]" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-white/40 tracking-wider">Health Model</div>
                <div className="text-sm font-bold text-white">Clinical Weights <span className="text-xs text-[#00f0ff] font-medium">Active</span></div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
