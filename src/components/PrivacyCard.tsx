import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, ExternalLink, Trash2 } from 'lucide-react'
import { clearResult } from '../lib/prediction'

export default function PrivacyCard() {
  return (
    <section className="section-pad relative overflow-hidden bg-dp-bg" id="privacy">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 p-8 sm:p-10"
            style={{
              background: 'linear-gradient(135deg, rgba(0,240,255,0.05), rgba(176,38,255,0.05))',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* BG glow */}
            <div className="orb orb-cyan w-48 h-48 -top-10 -right-10 opacity-20" />
            <div className="orb orb-purple w-32 h-32 -bottom-5 -left-5 opacity-20" />

            <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-[#00f0ff]" />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-2xl text-white mb-2">Your Information Matters</h3>
                <p className="text-dp-muted text-sm leading-relaxed">
                  All calculations happen locally in your browser. Your health data is never sent to any server, stored in a database, or shared with any third party. Data is automatically cleared when you close your browser session.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-6 border-t border-white/8 flex flex-wrap gap-3">
              <Link to="/#privacy" className="btn-outline text-sm px-5 py-2.5">
                Privacy Policy <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => {
                  clearResult()
                  alert('Your assessment data has been cleared.')
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                           text-dp-muted border border-white/10 hover:border-red-500/40 hover:text-red-400
                           transition-all duration-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear My Data
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
