import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, ExternalLink } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Risk Assessment', to: '/assessment' },
    { label: 'How It Works',    to: '/#how-it-works' },
  ],
  Information: [
    { label: 'About',              to: '/#about' },
    { label: 'Privacy Policy',     to: '/#privacy' },
    { label: 'Medical Disclaimer', to: '/#disclaimer' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-dp-bg border-t border-white/5">
      {/* Background orbs */}
      <div className="orb orb-cyan  w-[400px] h-[400px] -bottom-40 -left-20 opacity-20" />
      <div className="orb orb-purple w-[300px] h-[300px] -bottom-20 right-10 opacity-15" />

      {/* Big CTA */}
      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 text-center border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-black text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight mb-6">
            Know Your Risk.<br />
            <span className="gradient-text">Take the Next Step.</span>
          </h2>
          <p className="text-dp-muted text-lg mb-10 max-w-md mx-auto">
            Your free, private, instant diabetes risk assessment is ready when you are.
          </p>
          <Link to="/assessment" className="btn-primary text-base px-10 py-4 inline-flex">
            Start Assessment <ExternalLink className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Footer grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#b026ff] flex items-center justify-center">
                <Activity className="w-5 h-5 text-dp-bg" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-xl">
                Diab<span className="gradient-text">Predict</span>
              </span>
            </Link>
            <p className="text-dp-muted text-sm leading-relaxed max-w-xs">
              An informational diabetes risk assessment platform powered by machine learning. Built for health awareness, not medical diagnosis.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, items]) => (
            <div key={section}>
              <h5 className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-4">{section}</h5>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item.label}>
                    <Link to={item.to}
                      className="text-dp-muted text-sm hover:text-[#00f0ff] transition-colors duration-200">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer + copyright */}
        <div className="pt-8 border-t border-white/5 space-y-4">
          <p className="text-dp-faint text-xs leading-relaxed max-w-2xl">
            ⚠️ <strong className="text-white/40">Medical Disclaimer:</strong> This assessment is for informational purposes only and is not a medical diagnosis or a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-dp-faint text-xs">
            <p>© 2026 DiabPredict. All rights reserved. For informational purposes only.</p>
            <p>Built with privacy in mind — no data leaves your device.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
