import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AssessmentForm from '../components/AssessmentForm'
import AssessmentLoading from '../components/AssessmentLoading'
import DemoControlBar from '../components/DemoControlBar'
import Footer from '../components/Footer'
import type { AssessmentData } from '../lib/types'
import { predict, saveResult } from '../lib/prediction'

export default function Assessment() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleAssessmentSubmit = (data: AssessmentData) => {
    setLoading(true)

    // Temporary frontend logging to verify end-to-end prediction flow
    console.group('[DiabPredict Assessment Page] Form Submission Flow')
    console.log('Submitted Assessment Data:', data)

    // Execute prediction algorithm using trained model
    const result = predict(data)

    console.log('Engine Output -> Raw Probability (float):', result.probability)
    console.log('Engine Output -> Display Risk Percentage:', `${result.riskPercent}%`)
    console.log('Engine Output -> Risk Classification Level:', result.riskLevel.toUpperCase())
    console.groupEnd()

    saveResult(result)

    // Cinematic loading experience duration before viewing result dashboard
    setTimeout(() => {
      setLoading(false)
      navigate('/result')
    }, 2400)
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
      <div className="orb orb-purple w-[600px] h-[600px] top-1/3 -right-36 opacity-15 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Subtle Presentation Demo Mode shortcut */}
        <div className="flex justify-center mb-6">
          <DemoControlBar
            onSelectDemo={(key) => navigate(`/result?demo=${key}`)}
          />
        </div>
        <AssessmentForm onSubmit={handleAssessmentSubmit} />
      </div>

      {/* Loading Overlay */}
      {loading && <AssessmentLoading />}

      <Footer />
    </motion.div>
  )
}
