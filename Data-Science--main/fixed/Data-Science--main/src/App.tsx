import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Assessment from './pages/Assessment'
import Result from './pages/Result'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"           element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/result"     element={<Result />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
