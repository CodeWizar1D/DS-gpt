import type { PredictionResult } from './types'

export interface DemoProfile extends PredictionResult {
  isDemo: true
  demoKey: 'low' | 'moderate' | 'high'
  classificationLabel: string
  riskLabel: string
}

export const DEMO_PROFILES: Record<'low' | 'moderate' | 'high', DemoProfile> = {
  low: {
    isDemo: true,
    demoKey: 'low',
    probability: 0.12,
    riskPercent: 12,
    riskLevel: 'low',
    classificationLabel: 'LOW RISK',
    riskLabel: 'Lower Predicted Risk',
    timestamp: Date.now(),
    data: {
      age: 24,
      gender: 'female',
      height: 165,
      weight: 58,
      bmi: 21.3,
      glucose: 88,
      bloodPressure: 72,
      skinThickness: 20,
      insulin: 65,
      dpf: 0.32,
      pregnancies: 0,
    },
  },
  moderate: {
    isDemo: true,
    demoKey: 'moderate',
    probability: 0.44,
    riskPercent: 44,
    riskLevel: 'moderate',
    classificationLabel: 'MODERATE RISK',
    riskLabel: 'Moderate Predicted Risk',
    timestamp: Date.now(),
    data: {
      age: 42,
      gender: 'male',
      height: 174,
      weight: 82,
      bmi: 27.1,
      glucose: 126,
      bloodPressure: 82,
      skinThickness: 28,
      insulin: 105,
      dpf: 0.58,
      pregnancies: 0,
    },
  },
  high: {
    isDemo: true,
    demoKey: 'high',
    probability: 0.78,
    riskPercent: 78,
    riskLevel: 'high',
    classificationLabel: 'HIGH RISK',
    riskLabel: 'Higher Predicted Risk',
    timestamp: Date.now(),
    data: {
      age: 56,
      gender: 'male',
      height: 170,
      weight: 98,
      bmi: 33.9,
      glucose: 178,
      bloodPressure: 94,
      skinThickness: 34,
      insulin: 165,
      dpf: 0.86,
      pregnancies: 0,
    },
  },
}
