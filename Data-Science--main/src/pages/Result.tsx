import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowRight } from 'lucide-react'
import ResultDashboard from '../components/ResultDashboard'
import DemoControlBar from '../components/DemoControlBar'
import Footer from '../components/Footer'
import type { PredictionResult } from '../lib/types'
import { loadResult } from '../lib/prediction'
import { DEMO_PROFILES } from '../lib/demoData'

export default function Result() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [realResult, setRealResult] = useState<PredictionResult | null>(null)
  const [activeResult, setActiveResult] = useState<PredictionResult | null>(null)
  const [activeDemoKey, setActiveDemoKey] = useState<'low' | 'moderate' | 'high' | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = loadResult()
    setRealResult(cached)

    const demoParam = searchParams.get('demo') as 'low' | 'moderate' | 'high' | null
    if (demoParam && DEMO_PROFILES[demoParam]) {
      setActiveDemoKey(demoParam)
      setActiveResult(DEMO_PROFILES[demoParam])
    } else if (cached) {
      setActiveResult(cached)
      setActiveDemoKey(undefined)
    } else {
      // Default to low demo if no session exists so reviewers can preview immediately
      setActiveDemoKey('low')
      setActiveResult(DEMO_PROFILES.low)
    }

    setLoading(false)
  }, [searchParams])

  const handleSelectDemo = (key: 'low' | 'moderate' | 'high') => {
    setActiveDemoKey(key)
    setActiveResult(DEMO_PROFILES[key])
    setSearchParams({ demo: key })
  }

  const handleSelectReal = () => {
    if (realResult) {
      setActiveDemoKey(undefined)
      setActiveResult(realResult)
      setSearchParams({})
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-dp-bg text-white" />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-dp-bg text-white relative flex flex-col justify-between"
    >
      {/* Background orbs */}
      <div className="orb orb-cyan w-[500px] h-[500px] -top-32 -left-32 opacity-20 pointer-events-none" />
      <div className="orb orb-purple w-[600px] h-[600px] top-1/2 -right-36 opacity-15 pointer-events-none" />

      <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {activeResult ? (
          <ResultDashboard
            result={activeResult}
            activeDemoKey={activeDemoKey}
            onSelectDemo={handleSelectDemo}
            onSelectReal={handleSelectReal}
            hasRealResult={!!realResult}
          />
        ) : (
          /* Empty / Session Expired Fallback */
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Active Assessment Found</h2>
            <p className="text-dp-muted text-sm mb-6 leading-relaxed">
              We couldn't locate any completed assessment in your browser session. Complete a quick evaluation or explore a demo profile below.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link to="/assessment" className="btn-primary py-3.5 px-8 text-sm inline-flex">
                Start Assessment <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <DemoControlBar
                activeDemoKey={activeDemoKey}
                onSelectDemo={handleSelectDemo}
              />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </motion.div>
  )
}
