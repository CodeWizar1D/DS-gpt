import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import TrustSection from '../components/TrustSection'
import AssessmentPreview from '../components/AssessmentPreview'
import HowItWorks from '../components/HowItWorks'
import PrivacyCard from '../components/PrivacyCard'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-dp-bg text-white"
    >
      <Hero />
      <TrustSection />
      <AssessmentPreview />
      <HowItWorks />
      <PrivacyCard />
      <Footer />
    </motion.div>
  )
}
