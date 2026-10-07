import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Download, RotateCcw, Trash2, Printer, 
  Activity, ShieldAlert, CheckCircle2, Heart, Apple, Dumbbell, Calendar, Stethoscope, Sparkles 
} from 'lucide-react'
import type { PredictionResult } from '../lib/types'
import { clearResult } from '../lib/prediction'
import { downloadReportDocument, printReportDocument } from '../lib/reportGenerator'
import DemoControlBar from './DemoControlBar'

interface ResultDashboardProps {
  result: PredictionResult
  activeDemoKey?: 'low' | 'moderate' | 'high'
  onSelectDemo?: (key: 'low' | 'moderate' | 'high') => void
  onSelectReal?: () => void
  hasRealResult?: boolean
}

export default function ResultDashboard({
  result,
  activeDemoKey,
  onSelectDemo,
  onSelectReal,
  hasRealResult,
}: ResultDashboardProps) {
  const navigate = useNavigate()
  const { riskPercent, riskLevel, data, isDemo } = result

  // Calculate circular SVG parameters
  // Circle radius 70 -> Circumference = 2 * PI * 70 ≈ 439.8
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (circumference * riskPercent) / 100

  // Risk meta formatting
  const getRiskMeta = () => {
    switch (riskLevel) {
      case 'low':
        return {
          title: 'Lower Predicted Risk',
          badgeText: 'LOW RISK',
          badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
          gradient: 'from-emerald-400 to-[#00f0ff]',
          summary: 'Based on the biometric profile and clinical parameters provided, your estimated statistical risk for diabetes is in the low range.',
          explanation: 'Based on the information provided, the assessment indicates a lower predicted risk. The result is intended for informational purposes and does not represent a medical diagnosis.',
          recommendations: [
            { icon: Dumbbell, text: 'Maintain regular physical activity (at least 150 min weekly).' },
            { icon: Apple, text: 'Continue a balanced diet and healthy lifestyle.' },
            { icon: Calendar, text: 'Keep up with routine preventative health screenings.' },
          ],
        }
      case 'moderate':
        return {
          title: 'Moderate Predicted Risk',
          badgeText: 'MODERATE RISK',
          badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          gradient: 'from-amber-400 to-orange-500',
          summary: 'Based on the metrics entered, your assessment indicates borderline indicators that warrant active lifestyle attention.',
          explanation: 'Based on the information provided, the assessment indicates a moderate predicted risk. Consider discussing relevant risk factors and appropriate screening with a qualified healthcare professional.',
          recommendations: [
            { icon: Dumbbell, text: 'Maintain regular physical activity and cardiovascular exercise.' },
            { icon: Apple, text: 'Focus on a balanced, nutrient-rich diet.' },
            { icon: Calendar, text: 'Consider discussing your risk factors with a healthcare professional.' },
          ],
        }
      case 'high':
      default:
        return {
          title: 'Higher Predicted Risk',
          badgeText: 'HIGH RISK',
          badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          gradient: 'from-rose-500 to-[#b026ff]',
          summary: 'Based on the information provided, your evaluation indicates elevated risk factors across key clinical metrics.',
          explanation: 'Based on the information provided, the assessment indicates a higher predicted risk. Consider discussing this result and appropriate follow-up testing with a qualified healthcare professional.',
          recommendations: [
            { icon: Calendar, text: 'Consider discussing the result with a qualified healthcare professional.' },
            { icon: Stethoscope, text: 'Ask whether additional diabetes screening may be appropriate.' },
            { icon: Apple, text: 'Maintain healthy eating and regular physical activity.' },
          ],
        }
    }
  }

  const meta = getRiskMeta()

  // Actions
  const handleDownload = () => {
    downloadReportDocument(result)
  }

  const handlePrint = () => {
    printReportDocument(result)
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to delete your assessment data from this browser?')) {
      clearResult()
      navigate('/assessment')
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      
      {/* Demo Mode Selector on Result Dashboard */}
      {onSelectDemo && (
        <div className="flex justify-center -mb-2">
          <DemoControlBar
            activeDemoKey={activeDemoKey}
            onSelectDemo={onSelectDemo}
            isRealActive={!isDemo && hasRealResult}
            onSelectReal={onSelectReal}
          />
        </div>
      )}

      {/* Page Header */}
      <div className="text-center">
        {isDemo ? (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-xs text-[#00f0ff] font-bold tracking-wide uppercase mb-3 shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
            <span>DEMO RESULT · {meta.badgeText}</span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#00f0ff] font-semibold mb-3">
            Evaluation Complete
          </div>
        )}
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Your Assessment Is Ready.
        </h1>
        <p className="text-dp-muted text-base max-w-lg mx-auto mt-2">
          Review your estimated risk evaluation, biometric summary, and recommended preventative steps.
        </p>
      </div>

      {/* Hero Visual Result Glass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-strong p-8 sm:p-12 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="orb orb-cyan w-96 h-96 -top-24 -left-24 opacity-20" />
        <div className="orb orb-purple w-96 h-96 -bottom-24 -right-24 opacity-20" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Animated Gauge Meter */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-56 h-56 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
                {/* Track */}
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="transparent"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="14"
                />
                {/* Animated Fill Stroke */}
                <motion.circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="transparent"
                  stroke={`url(#result-gradient-${riskLevel})`}
                  strokeWidth="14"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id={`result-gradient-${riskLevel}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    {riskLevel === 'low' && (
                      <>
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#00f0ff" />
                      </>
                    )}
                    {riskLevel === 'moderate' && (
                      <>
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#f97316" />
                      </>
                    )}
                    {riskLevel === 'high' && (
                      <>
                        <stop offset="0%" stopColor="#f43f5e" />
                        <stop offset="100%" stopColor="#b026ff" />
                      </>
                    )}
                  </linearGradient>
                </defs>
              </svg>

              {/* Gauge Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-1">
                  Estimated Risk
                </span>
                <span className="text-5xl font-black text-white">
                  {riskPercent}%
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border mt-2 ${meta.badgeClass}`}>
                  {meta.badgeText}
                </span>
              </div>
            </div>
            
            <span className="text-xs text-white/40 mt-4 text-center">
              Evaluated across 8 clinical biometric parameters
            </span>
          </div>

          {/* Right Column: Interpretation */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#00f0ff] font-semibold">
                Risk Classification
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                {meta.title}
              </h2>
            </div>

            <p className="text-white/80 text-base leading-relaxed">
              {meta.summary}
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/70 leading-relaxed">
              {meta.explanation}
            </div>

            {/* Horizontal Visual Scale Indicator */}
            <div className="pt-2">
              <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wider mb-2">
                <span className={riskPercent < 30 ? 'text-emerald-400 font-bold' : 'text-white/40'}>Low (0-29%)</span>
                <span className={riskPercent >= 30 && riskPercent < 60 ? 'text-amber-400 font-bold' : 'text-white/40'}>Moderate (30-59%)</span>
                <span className={riskPercent >= 60 ? 'text-rose-400 font-bold' : 'text-white/40'}>High (60%+)</span>
              </div>
              <div className="relative w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 rounded-full opacity-60" />
                <motion.div
                  className="absolute top-0 bottom-0 w-3 bg-white rounded-full shadow-lg border border-dp-bg -translate-x-1/2"
                  initial={{ left: '0%' }}
                  animate={{ left: `${Math.min(Math.max(riskPercent, 4), 96)}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </div>

          </div>

        </div>
      </motion.div>

      {/* 3 Breakdown Cards: Biometric Summary, Meaning, Next Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Health Summary */}
        <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/15 border border-[#00f0ff]/30 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#00f0ff]" />
            </div>
            <h3 className="font-bold text-lg text-white">Health Summary</h3>
          </div>
          
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/50">Fasting Glucose:</span>
              <span className="font-bold text-white">{data.glucose} mg/dL</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/50">Blood Pressure:</span>
              <span className="font-bold text-white">{data.bloodPressure} mm Hg</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/50">Body Mass Index:</span>
              <span className="font-bold text-white">{data.bmi} kg/m²</span>
            </div>
            <div className="flex justify-between py-1 border-b border-white/5">
              <span className="text-white/50">Age &amp; Gender:</span>
              <span className="font-bold text-white">{data.age} yrs ({data.gender})</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-white/50">Serum Insulin:</span>
              <span className="font-bold text-white">{data.insulin} μU/mL</span>
            </div>
          </div>
        </div>

        {/* Card 2: What This Means */}
        <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#b026ff]/15 border border-[#b026ff]/30 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-[#b026ff]" />
            </div>
            <h3 className="font-bold text-lg text-white">What This Means</h3>
          </div>
          
          <p className="text-xs text-white/70 leading-relaxed">
            Statistical prediction models assess correlations between multiple metabolic indicators.
            A higher probability is not a diagnosis of Diabetes Mellitus, but rather an indicator that your current profile shares similarities with clinical risk populations.
          </p>

          <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-white/60">
            Fasting glucose and BMI are typically the highest-weighted predictive biomarkers in metabolic health models.
          </div>
        </div>

        {/* Card 3: preventative steps */}
        <div className="glass p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-bold text-lg text-white">Recommended Actions</h3>
          </div>

          <div className="space-y-3 text-xs text-white/80">
            {meta.recommendations.map((rec, idx) => {
              const IconComp = rec.icon
              return (
                <div key={idx} className="flex items-start gap-2.5">
                  <IconComp className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                  <span>{rec.text}</span>
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* Action Bar */}
      <div className="glass-strong p-6 rounded-2xl border border-white/15 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/assessment')}
            className="btn-primary text-sm py-3 px-6 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Retake Assessment
          </button>
          <button
            onClick={handleDownload}
            className="btn-outline text-sm py-3 px-6 flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Report
          </button>
          <button
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold border border-white/10 hover:border-white/20 text-white/80 transition-colors"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>

        <button
          onClick={handleClear}
          className="inline-flex items-center gap-2 text-xs font-medium text-rose-400/80 hover:text-rose-400 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear My Data
        </button>
      </div>

      {/* Prominent Medical Disclaimer Box */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-200/80 leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-semibold block mb-0.5">Medical Diagnostic Disclaimer</strong>
          This risk evaluation is generated algorithmically for health awareness purposes. It does not replace lab blood work or medical evaluations conducted by licensed physicians. Always consult a healthcare professional for clinical advice.
        </div>
      </div>

    </div>
  )
}
