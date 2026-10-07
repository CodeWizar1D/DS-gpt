import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export default function AssessmentPreview() {
  return (
    <section className="section-pad relative overflow-hidden bg-dp-bg">
      <div className="max-w-dp relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#00f0ff] text-sm font-semibold tracking-widest uppercase mb-4">
            Interactive Interface
          </p>
          <h2 className="font-black text-4xl sm:text-5xl tracking-tight leading-tight mb-4">
            Your Health.{' '}
            <span className="gradient-text">One Simple Assessment.</span>
          </h2>
          <p className="text-dp-muted text-lg max-w-xl mx-auto">
            Experience an intuitive multi-stage interface that makes biometric evaluation effortless and clear.
          </p>
        </motion.div>

        {/* Big Preview Glass Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-strong p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
            
            {/* Top Bar Mockup */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                <span className="ml-3 text-xs font-mono text-white/40">app.diabpredict.health/assessment</span>
              </div>
              <div className="text-xs text-[#00f0ff] font-semibold bg-[#00f0ff]/10 px-3 py-1 rounded-full border border-[#00f0ff]/20">
                Interactive Preview
              </div>
            </div>

            {/* Stepper Progress bar mockup */}
            <div className="mb-10">
              <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                <span className="text-[#00f0ff] font-semibold">01 Basic Details</span>
                <span className="text-white/40">02 Clinical Metrics</span>
                <span className="text-white/40">03 Informed Consent</span>
                <span className="text-white/40">04 Analytics</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-gradient-to-r from-[#00f0ff] to-[#b026ff] rounded-full" />
              </div>
            </div>

            {/* Form Fields Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Age (Years)</label>
                <div className="input-glass flex items-center justify-between text-white/90">
                  <span>34</span>
                  <span className="text-xs text-white/40">yrs</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Gender</label>
                <div className="input-glass flex items-center justify-between text-white/90">
                  <span>Female</span>
                  <span className="text-xs text-white/40">Selected</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Fasting Blood Glucose</label>
                <div className="input-glass flex items-center justify-between text-white/90">
                  <span>108</span>
                  <span className="text-xs text-white/40">mg/dL</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-wider">Blood Pressure (Diastolic)</label>
                <div className="input-glass flex items-center justify-between text-white/90">
                  <span>78</span>
                  <span className="text-xs text-white/40">mm Hg</span>
                </div>
              </div>
            </div>

            {/* Live BMI Indicator Feature Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                  23.4
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Dynamic BMI Calculation</div>
                  <div className="text-[11px] text-emerald-400">Normal Healthy Weight Category</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Automatically calibrated</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <p className="text-xs text-dp-muted">
                Zero data sent to remote servers. All evaluation occurs locally.
              </p>
              <Link to="/assessment" className="btn-primary w-full sm:w-auto text-sm justify-center py-3.5 px-6">
                Try Live Assessment <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
