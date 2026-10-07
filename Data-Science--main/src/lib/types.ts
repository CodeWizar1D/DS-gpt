// ─────────────────────────────────────────────────────
//  DiabPredict — TypeScript Types
// ─────────────────────────────────────────────────────

export interface AssessmentData {
  // Step 1
  age:        number
  gender:     string
  height:     number   // cm
  weight:     number   // kg
  pregnancies: number
  bmi:        number   // auto-calculated

  // Step 2
  glucose:       number   // mg/dL
  bloodPressure: number   // mm Hg
  skinThickness: number   // mm
  insulin:       number   // μU/mL
  dpf:           number   // diabetes pedigree function
}

export type RiskLevel = 'low' | 'moderate' | 'high'

export interface PredictionResult {
  probability:  number      // 0 – 1
  riskPercent:  number      // 0 – 100
  riskLevel:    RiskLevel
  data:         AssessmentData
  timestamp:    number
  isDemo?:      boolean
  demoKey?:     'low' | 'moderate' | 'high'
}
