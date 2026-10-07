// ─────────────────────────────────────────────────────
//  DiabPredict — Logistic Regression Prediction Engine
//  Pre-trained on PIMA Indians Diabetes Dataset
// ─────────────────────────────────────────────────────

import type { AssessmentData, PredictionResult, RiskLevel } from './types'

/**
 * 8 Input Features in exact canonical order:
 * 1. Pregnancies
 * 2. Glucose
 * 3. Blood Pressure
 * 4. Skin Thickness
 * 5. Insulin
 * 6. BMI
 * 7. Diabetes Pedigree Function
 * 8. Age
 */
export const FEATURE_ORDER = [
  'Pregnancies',
  'Glucose',
  'BloodPressure',
  'SkinThickness',
  'Insulin',
  'BMI',
  'DiabetesPedigreeFunction',
  'Age',
] as const

export type FeatureName = typeof FEATURE_ORDER[number]

/**
 * Model Parameters:
 * Pre-trained Logistic Regression on PIMA Indians Diabetes Dataset
 * Intercept: -8.405
 * Feature coefficients (unscaled / raw scale matching training data):
 */
const INTERCEPT = -8.405

const WEIGHTS: Record<FeatureName, number> = {
  Pregnancies:              0.1232,
  Glucose:                  0.0352,
  BloodPressure:           -0.0133,
  SkinThickness:            0.0006,
  Insulin:                 -0.0012,
  BMI:                      0.0897,
  DiabetesPedigreeFunction: 0.9452,
  Age:                      0.0149,
}

/**
 * Preprocessing / Imputation Medians:
 * In the PIMA dataset, zero values in [Glucose, BloodPressure, SkinThickness, Insulin, BMI]
 * are biologically impossible and represent missing clinical observations.
 * Training baseline medians applied during model training:
 */
const TRAINING_MEDIANS: Record<string, number> = {
  Glucose:       117.0,
  BloodPressure:  72.0,
  SkinThickness:  29.0,
  Insulin:       125.0,
  BMI:            32.3,
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x))
}

export function calcBMI(height: number, weight: number): number {
  if (!height || !weight) return 0
  return Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10
}

/**
 * Builds the exact 8-feature vector in canonical order with training imputation.
 */
export function buildFeatureVector(data: AssessmentData): {
  vector: number[]
  featureMap: Record<FeatureName, number>
} {
  // Preprocessing / Imputation matching training pipeline
  const pregnancies = Number(data.pregnancies) || 0 // 0 pregnancies is valid
  const glucose = (!data.glucose || data.glucose <= 0) ? TRAINING_MEDIANS.Glucose : Number(data.glucose)
  const bloodPressure = (!data.bloodPressure || data.bloodPressure <= 0) ? TRAINING_MEDIANS.BloodPressure : Number(data.bloodPressure)
  const skinThickness = (!data.skinThickness || data.skinThickness <= 0) ? TRAINING_MEDIANS.SkinThickness : Number(data.skinThickness)
  const insulin = (!data.insulin || data.insulin <= 0) ? TRAINING_MEDIANS.Insulin : Number(data.insulin)
  const bmi = (!data.bmi || data.bmi <= 0) ? TRAINING_MEDIANS.BMI : Number(data.bmi)
  const dpf = (!data.dpf || data.dpf <= 0) ? 0.4719 : Number(data.dpf)
  const age = Number(data.age) || 33

  const featureMap: Record<FeatureName, number> = {
    Pregnancies: pregnancies,
    Glucose: glucose,
    BloodPressure: bloodPressure,
    SkinThickness: skinThickness,
    Insulin: insulin,
    BMI: bmi,
    DiabetesPedigreeFunction: dpf,
    Age: age,
  }

  // Exact 8-feature array order: Pregnancies, Glucose, Blood Pressure, Skin Thickness, Insulin, BMI, Diabetes Pedigree Function, Age
  const vector: number[] = [
    featureMap.Pregnancies,
    featureMap.Glucose,
    featureMap.BloodPressure,
    featureMap.SkinThickness,
    featureMap.Insulin,
    featureMap.BMI,
    featureMap.DiabetesPedigreeFunction,
    featureMap.Age,
  ]

  return { vector, featureMap }
}

export function predict(data: AssessmentData): PredictionResult {
  // 1. Preprocess & extract feature vector in exact 8-feature order
  const { vector, featureMap } = buildFeatureVector(data)

  // 2. Compute linear logit using trained model coefficients:
  //    z = INTERCEPT + sum(w_i * x_i)
  let logit = INTERCEPT
  for (let i = 0; i < FEATURE_ORDER.length; i++) {
    const featureName = FEATURE_ORDER[i]
    logit += WEIGHTS[featureName] * vector[i]
  }

  // 3. Raw model probability from sigmoid function (unrounded float 0 to 1)
  const probability = sigmoid(logit)

  // 4. Percentage calculation: preserve small probabilities without rounding to 0%
  const rawPercent = probability * 100
  let riskPercent: number
  if (rawPercent > 0 && rawPercent < 1.0) {
    // Preserve fractional percentage for small values (e.g. 0.4%)
    riskPercent = Math.max(0.1, Number(rawPercent.toFixed(1)))
  } else {
    riskPercent = Math.round(rawPercent)
  }

  const riskLevel: RiskLevel =
    riskPercent < 30 ? 'low' :
    riskPercent < 60 ? 'moderate' : 'high'

  // 5. Temporary logging for pipeline verification
  console.group('[DiabPredict ML Pipeline] Prediction Execution')
  console.log('1. Feature Order:', FEATURE_ORDER)
  console.log('2. Submitted Feature Vector (exact 8 order):', vector)
  console.log('3. Preprocessed Feature Map:', featureMap)
  console.log('4. Model Logit (z):', logit)
  console.log('5. Raw Prediction Probability:', probability)
  console.log('6. Formatted Risk Percentage:', `${riskPercent}%`)
  console.log('7. Classification Level:', riskLevel.toUpperCase())
  console.groupEnd()

  return { probability, riskPercent, riskLevel, data, timestamp: Date.now() }
}

export function saveResult(result: PredictionResult): void {
  try { sessionStorage.setItem('dp_result', JSON.stringify(result)) } catch { /* noop */ }
}

export function loadResult(): PredictionResult | null {
  try {
    const raw = sessionStorage.getItem('dp_result')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function clearResult(): void {
  try { sessionStorage.removeItem('dp_result') } catch { /* noop */ }
}
