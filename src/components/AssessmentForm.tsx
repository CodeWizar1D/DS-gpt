import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ShieldCheck, AlertCircle, Sparkles, Scale, Info } from 'lucide-react'
import type { AssessmentData } from '../lib/types'
import { calcBMI } from '../lib/prediction'

interface AssessmentFormProps {
  onSubmit: (data: AssessmentData) => void
}

export default function AssessmentForm({ onSubmit }: AssessmentFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1)

  // Step 1 Form Data
  const [age, setAge] = useState<string>('')
  const [gender, setGender] = useState<string>('')
  const [height, setHeight] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [pregnancies, setPregnancies] = useState<string>('0')

  // Step 2 Form Data
  const [glucose, setGlucose] = useState<string>('')
  const [bloodPressure, setBloodPressure] = useState<string>('')
  const [skinThickness, setSkinThickness] = useState<string>('')
  const [insulin, setInsulin] = useState<string>('')
  const [dpf, setDpf] = useState<string>('0.47') // standard population baseline

  // Step 3 Consent
  const [consentDisclaimer, setConsentDisclaimer] = useState<boolean>(false)
  const [consentAccuracy, setConsentAccuracy] = useState<boolean>(false)

  // Validation Error States
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Dynamic Live BMI
  const numericHeight = parseFloat(height) || 0
  const numericWeight = parseFloat(weight) || 0
  const currentBMI = calcBMI(numericHeight, numericWeight)

  const getBMICategory = (bmiVal: number) => {
    if (bmiVal === 0) return { label: 'Enter height & weight', color: 'text-white/40' }
    if (bmiVal < 18.5) return { label: 'Underweight', color: 'text-amber-400' }
    if (bmiVal < 25) return { label: 'Normal / Healthy', color: 'text-emerald-400' }
    if (bmiVal < 30) return { label: 'Overweight', color: 'text-amber-400' }
    return { label: 'Obese Range', color: 'text-rose-400' }
  }

  const bmiMeta = getBMICategory(currentBMI)

  // Step Validation Functions
  const validateStep1 = () => {
    const errs: Record<string, string> = {}
    const numAge = parseInt(age, 10)
    if (!age || isNaN(numAge) || numAge < 18 || numAge > 100) {
      errs.age = 'Please enter an adult age between 18 and 100.'
    }
    if (!gender) {
      errs.gender = 'Please select your biological sex / gender.'
    }
    if (!numericHeight || numericHeight < 100 || numericHeight > 250) {
      errs.height = 'Please provide a valid height (100–250 cm).'
    }
    if (!numericWeight || numericWeight < 30 || numericWeight > 280) {
      errs.weight = 'Please provide a valid weight (30–280 kg).'
    }
    const numPreg = parseInt(pregnancies, 10)
    if (gender === 'female' && (isNaN(numPreg) || numPreg < 0 || numPreg > 20)) {
      errs.pregnancies = 'Please enter pregnancy count (0–20).'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs: Record<string, string> = {}
    const numGlucose = parseFloat(glucose)
    if (!glucose || isNaN(numGlucose) || numGlucose < 40 || numGlucose > 400) {
      errs.glucose = 'Provide fasting glucose (40–400 mg/dL).'
    }
    const numBP = parseFloat(bloodPressure)
    if (!bloodPressure || isNaN(numBP) || numBP < 30 || numBP > 200) {
      errs.bloodPressure = 'Provide diastolic blood pressure (30–200 mmHg).'
    }
    const numSkin = parseFloat(skinThickness)
    if (skinThickness && (isNaN(numSkin) || numSkin < 0 || numSkin > 99)) {
      errs.skinThickness = 'Skin fold measurement must be 0–99 mm.'
    }
    const numInsulin = parseFloat(insulin)
    if (insulin && (isNaN(numInsulin) || numInsulin < 0 || numInsulin > 900)) {
      errs.insulin = 'Insulin level must be between 0–900 μU/mL.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep3 = () => {
    const errs: Record<string, string> = {}
    if (!consentDisclaimer || !consentAccuracy) {
      errs.consent = 'Both consent acknowledgements are required to continue.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (step === 2 && validateStep2()) {
      setStep(3)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    if (step === 2) setStep(1)
    if (step === 3) setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep3()) return

    const payload: AssessmentData = {
      age: parseInt(age, 10),
      gender,
      height: numericHeight,
      weight: numericWeight,
      pregnancies: gender === 'female' ? (parseInt(pregnancies, 10) || 0) : 0,
      bmi: currentBMI,
      glucose: parseFloat(glucose),
      bloodPressure: parseFloat(bloodPressure),
      skinThickness: parseFloat(skinThickness) || 20, // clinical default median if unmeasured
      insulin: parseFloat(insulin) || 79,           // clinical default median if unmeasured
      dpf: parseFloat(dpf) || 0.47,
    }

    onSubmit(payload)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      
      {/* Visual Stepper Tracker */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          {[
            { num: 1, title: 'Basic Profile' },
            { num: 2, title: 'Health Metrics' },
            { num: 3, title: 'Review & Consent' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-3">
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step === s.num
                    ? 'bg-gradient-to-r from-[#00f0ff] to-[#b026ff] text-dp-bg shadow-glow-cyan'
                    : step > s.num
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-white/5 text-white/40 border border-white/10'
                }`}
              >
                {step > s.num ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${
                step === s.num ? 'text-white' : 'text-white/40'
              }`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Line */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#00f0ff] to-[#b026ff] rounded-full"
            initial={{ width: '33%' }}
            animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Main Glass Card Form Box */}
      <div className="glass-strong p-6 sm:p-10 rounded-3xl border border-white/15 shadow-2xl relative">
        <form onSubmit={handleFormSubmit}>
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Basic Information */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#00f0ff] font-semibold mb-2">
                    Step 01
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Let's start with the basics.</h2>
                  <p className="text-dp-muted text-sm mt-1">
                    Your baseline physical measurements help calibrate your biometric scale.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  {/* Age */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Age <span className="text-[#00f0ff] font-normal">(Years)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 35"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className={`input-glass ${errors.age ? 'error' : ''}`}
                    />
                    {errors.age && <p className="text-xs text-rose-400 mt-1">{errors.age}</p>}
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Biological Sex / Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className={`input-glass ${errors.gender ? 'error' : ''}`}
                    >
                      <option value="">Select option</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Prefer not to say</option>
                    </select>
                    {errors.gender && <p className="text-xs text-rose-400 mt-1">{errors.gender}</p>}
                  </div>

                  {/* Height */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Height <span className="text-[#00f0ff] font-normal">(cm)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 172"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className={`input-glass ${errors.height ? 'error' : ''}`}
                    />
                    {errors.height && <p className="text-xs text-rose-400 mt-1">{errors.height}</p>}
                  </div>

                  {/* Weight */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Weight <span className="text-[#00f0ff] font-normal">(kg)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 68"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className={`input-glass ${errors.weight ? 'error' : ''}`}
                    />
                    {errors.weight && <p className="text-xs text-rose-400 mt-1">{errors.weight}</p>}
                  </div>
                </div>

                {/* Pregnancies (Conditional for female) */}
                {gender === 'female' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2 pt-2"
                  >
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/70 flex items-center gap-1.5">
                      Pregnancies Count
                      <span className="text-[10px] lowercase text-white/40 font-normal">(for gestational risk modeling)</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={pregnancies}
                      onChange={(e) => setPregnancies(e.target.value)}
                      className={`input-glass ${errors.pregnancies ? 'error' : ''}`}
                    />
                    {errors.pregnancies && <p className="text-xs text-rose-400 mt-1">{errors.pregnancies}</p>}
                  </motion.div>
                )}

                {/* Live Dynamic BMI Card */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f0ff]/15 to-[#b026ff]/15 border border-white/10 flex items-center justify-center">
                      <Scale className="w-6 h-6 text-[#00f0ff]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white/80">Calculated Body Mass Index (BMI)</div>
                      <div className={`text-sm font-bold ${bmiMeta.color}`}>
                        {currentBMI > 0 ? `${currentBMI} — ${bmiMeta.label}` : 'Enter height & weight to compute'}
                      </div>
                    </div>
                  </div>
                  {currentBMI > 0 && (
                    <div className="text-right hidden sm:block">
                      <span className="text-xs font-mono text-white/40">kg/m²</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary py-3.5 px-8 text-sm"
                  >
                    Continue to Health Data <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Health Measurements */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#b026ff] font-semibold mb-2">
                    Step 02
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Tell us about your health.</h2>
                  <p className="text-dp-muted text-sm mt-1">
                    Enter clinical readings from recent checkups or self-monitoring devices.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  
                  {/* Blood Glucose */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/70 flex items-center justify-between">
                      <span>Fasting Blood Glucose</span>
                      <span className="text-[#00f0ff] font-normal lowercase">mg/dL</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 99"
                      value={glucose}
                      onChange={(e) => setGlucose(e.target.value)}
                      className={`input-glass ${errors.glucose ? 'error' : ''}`}
                    />
                    <span className="text-[11px] text-white/40">Standard healthy fasting range is 70–99 mg/dL.</span>
                    {errors.glucose && <p className="text-xs text-rose-400 mt-1">{errors.glucose}</p>}
                  </div>

                  {/* Blood Pressure */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/70 flex items-center justify-between">
                      <span>Diastolic Blood Pressure</span>
                      <span className="text-[#00f0ff] font-normal lowercase">mm Hg</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 76"
                      value={bloodPressure}
                      onChange={(e) => setBloodPressure(e.target.value)}
                      className={`input-glass ${errors.bloodPressure ? 'error' : ''}`}
                    />
                    <span className="text-[11px] text-white/40">Lower pressure reading (normal &lt; 80 mmHg).</span>
                    {errors.bloodPressure && <p className="text-xs text-rose-400 mt-1">{errors.bloodPressure}</p>}
                  </div>

                  {/* Skin Thickness */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/70 flex items-center justify-between">
                      <span>Skin Fold Thickness</span>
                      <span className="text-white/40 font-normal lowercase">mm (optional)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 23 (leave blank if unknown)"
                      value={skinThickness}
                      onChange={(e) => setSkinThickness(e.target.value)}
                      className={`input-glass ${errors.skinThickness ? 'error' : ''}`}
                    />
                    <span className="text-[11px] text-white/40">Triceps skin fold caliper measure (optional).</span>
                    {errors.skinThickness && <p className="text-xs text-rose-400 mt-1">{errors.skinThickness}</p>}
                  </div>

                  {/* Serum Insulin */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-white/70 flex items-center justify-between">
                      <span>Serum Insulin</span>
                      <span className="text-white/40 font-normal lowercase">μU/mL (optional)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 85 (leave blank if unknown)"
                      value={insulin}
                      onChange={(e) => setInsulin(e.target.value)}
                      className={`input-glass ${errors.insulin ? 'error' : ''}`}
                    />
                    <span className="text-[11px] text-white/40">2-hour serum insulin test value (optional).</span>
                    {errors.insulin && <p className="text-xs text-rose-400 mt-1">{errors.insulin}</p>}
                  </div>
                </div>

                {/* Family History / Pedigree select */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/70 flex items-center justify-between">
                    <span>Family History of Diabetes</span>
                    <span className="text-xs text-[#00f0ff] font-normal">Genetic Weight</span>
                  </label>
                  <select
                    value={dpf}
                    onChange={(e) => setDpf(e.target.value)}
                    className="input-glass"
                  >
                    <option value="0.15">No known family history</option>
                    <option value="0.35">One grandparent or extended relative diagnosed</option>
                    <option value="0.47">One parent diagnosed (standard average)</option>
                    <option value="0.75">Sibling or multiple relatives diagnosed</option>
                    <option value="1.20">Both biological parents diagnosed</option>
                    <option value="1.60">Strong multi-generational family occurrence</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="btn-outline py-3 px-6 text-sm flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn-primary py-3.5 px-8 text-sm"
                  >
                    Continue to Consent <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Review & Privacy Consent */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#00f0ff] font-semibold mb-2">
                    Step 03
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Almost there.</h2>
                  <p className="text-dp-muted text-sm mt-1">
                    Review your inputs and verify informational consent before generating the evaluation.
                  </p>
                </div>

                {/* Biometric Summary Pill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <div className="text-[10px] uppercase text-white/40 font-semibold">Age</div>
                    <div className="text-sm font-bold text-white">{age} yrs</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-white/40 font-semibold">BMI</div>
                    <div className="text-sm font-bold text-emerald-400">{currentBMI}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-white/40 font-semibold">Glucose</div>
                    <div className="text-sm font-bold text-[#00f0ff]">{glucose} mg/dL</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-white/40 font-semibold">Blood Pressure</div>
                    <div className="text-sm font-bold text-[#b026ff]">{bloodPressure} mmHg</div>
                  </div>
                </div>

                {/* Consent Checkboxes */}
                <div className="space-y-4 pt-2">
                  <label className="flex items-start gap-3.5 p-4 rounded-xl glass hover:bg-white/10 transition-colors cursor-pointer border border-white/10">
                    <input
                      type="checkbox"
                      checked={consentDisclaimer}
                      onChange={(e) => setConsentDisclaimer(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded bg-white/10 border-white/20 text-[#00f0ff] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <div className="text-xs text-white/80 leading-relaxed">
                      <span className="font-semibold text-white block mb-0.5">Informational Assessment Acknowledgment</span>
                      I understand that this assessment is strictly for informational and health awareness purposes and does not constitute a diagnostic medical consultation.
                    </div>
                  </label>

                  <label className="flex items-start gap-3.5 p-4 rounded-xl glass hover:bg-white/10 transition-colors cursor-pointer border border-white/10">
                    <input
                      type="checkbox"
                      checked={consentAccuracy}
                      onChange={(e) => setConsentAccuracy(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded bg-white/10 border-white/20 text-[#00f0ff] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <div className="text-xs text-white/80 leading-relaxed">
                      <span className="font-semibold text-white block mb-0.5">Privacy &amp; Local Execution Guarantee</span>
                      I understand that all calculations execute privately inside my web browser and no personal health data is uploaded to remote cloud databases.
                    </div>
                  </label>

                  {errors.consent && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.consent}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="btn-outline py-3 px-6 text-sm flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    type="submit"
                    className="btn-primary py-4 px-9 text-base shadow-glow-cyan"
                  >
                    Generate My Assessment <Sparkles className="w-4 h-4 ml-1 text-dp-bg" />
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </form>
      </div>

    </div>
  )
}
