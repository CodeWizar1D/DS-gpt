import type { PredictionResult } from './types'

export function generateReportHtml(result: PredictionResult): string {
  const { riskPercent, riskLevel, data, isDemo, demoKey } = result

  let classification = 'LOW RISK'
  let riskLabel = 'Lower Predicted Risk'
  let strokeColor = '#10b981'
  let badgeBg = 'rgba(16, 185, 129, 0.15)'
  let badgeBorder = 'rgba(16, 185, 129, 0.4)'
  let badgeColor = '#34d399'

  let meaningText =
    'Based on the information provided, the assessment indicates a lower predicted risk. The result is intended for informational purposes and does not represent a medical diagnosis.'

  let recs = [
    'Maintain regular physical activity (at least 150 minutes of moderate activity weekly).',
    'Continue a balanced diet, whole-food nutrition, and healthy lifestyle habits.',
    'Keep up with routine preventative health screenings and primary care checkups.',
  ]

  if (riskLevel === 'moderate') {
    classification = 'MODERATE RISK'
    riskLabel = 'Moderate Predicted Risk'
    strokeColor = '#f59e0b'
    badgeBg = 'rgba(245, 158, 11, 0.15)'
    badgeBorder = 'rgba(245, 158, 11, 0.4)'
    badgeColor = '#fbbf24'
    meaningText =
      'Based on the information provided, the assessment indicates a moderate predicted risk. Consider discussing relevant risk factors and appropriate screening with a qualified healthcare professional.'
    recs = [
      'Maintain regular physical activity and incorporate strength or aerobic exercises.',
      'Focus on a balanced, nutrient-rich diet with controlled glycemic carbohydrates.',
      'Consider discussing your risk factors and preventive screenings with a healthcare professional.',
    ]
  } else if (riskLevel === 'high') {
    classification = 'HIGH RISK'
    riskLabel = 'Higher Predicted Risk'
    strokeColor = '#f43f5e'
    badgeBg = 'rgba(244, 63, 94, 0.15)'
    badgeBorder = 'rgba(244, 63, 94, 0.4)'
    badgeColor = '#fb7185'
    meaningText =
      'Based on the information provided, the assessment indicates a higher predicted risk. Consider discussing this result and appropriate follow-up testing with a qualified healthcare professional.'
    recs = [
      'Consider discussing the result promptly with a qualified healthcare professional.',
      'Ask your doctor whether clinical diagnostic diabetes screening (HbA1c / OGTT) is appropriate.',
      'Maintain healthy eating patterns, low-glycemic foods, and regular physical activity under medical guidance.',
    ]
  }

  const radius = 64
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (circumference * riskPercent) / 100
  const dateStr = new Date(result.timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>DiabPredict — Risk Assessment Report</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0c1128;
      color: #ffffff;
      padding: 24px;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    .report-wrap {
      max-width: 800px;
      margin: 0 auto;
    }
    /* Header Branding */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.12);
      margin-bottom: 20px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .brand-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: linear-gradient(135deg, #00f0ff, #b026ff);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 900;
      color: #0c1128;
      font-size: 18px;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .brand-title span {
      background: linear-gradient(90deg, #60a5fa, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .meta-date {
      text-align: right;
      font-size: 11px;
      color: #9ca3af;
    }
    .demo-pill {
      display: inline-block;
      padding: 3px 10px;
      background: rgba(0, 240, 255, 0.15);
      border: 1px solid rgba(0, 240, 255, 0.35);
      color: #00f0ff;
      border-radius: 9999px;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-top: 4px;
    }
    /* Main Hero Result Card */
    .result-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      padding: 24px;
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 24px;
      align-items: center;
      margin-bottom: 18px;
    }
    .gauge-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .gauge-svg {
      width: 160px;
      height: 160px;
      transform: rotate(-90deg);
    }
    .gauge-track {
      fill: none;
      stroke: rgba(255, 255, 255, 0.08);
      stroke-width: 14;
    }
    .gauge-fill {
      fill: none;
      stroke: ${strokeColor};
      stroke-width: 14;
      stroke-linecap: round;
      stroke-dasharray: ${circumference};
      stroke-dashoffset: ${strokeDashoffset};
    }
    .gauge-center {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .gauge-score {
      font-size: 38px;
      font-weight: 900;
      line-height: 1;
      color: #ffffff;
    }
    .gauge-sub {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #9ca3af;
      margin-top: 2px;
    }
    .badge-pill {
      display: inline-block;
      margin-top: 6px;
      padding: 3px 10px;
      border-radius: 9999px;
      font-size: 10px;
      font-weight: 800;
      background: ${badgeBg};
      border: 1px solid ${badgeBorder};
      color: ${badgeColor};
      letter-spacing: 0.5px;
    }
    .result-info h2 {
      font-size: 26px;
      font-weight: 800;
      margin-bottom: 4px;
      color: #ffffff;
    }
    .result-subtitle {
      font-size: 12px;
      color: #00f0ff;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .result-desc {
      font-size: 13px;
      color: #d1d5db;
      line-height: 1.5;
      margin-bottom: 12px;
    }
    .scale-bar {
      position: relative;
      height: 8px;
      border-radius: 9999px;
      background: linear-gradient(90deg, #10b981 0%, #f59e0b 50%, #f43f5e 100%);
      opacity: 0.8;
      margin-top: 6px;
    }
    .scale-labels {
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      color: #9ca3af;
      margin-top: 4px;
    }
    /* Grid 2-column for Summary and Guidance */
    .grid-sections {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    .section-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 16px 18px;
    }
    .section-box h3 {
      font-size: 14px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .param-row {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 11px;
    }
    .param-row:last-child {
      border-bottom: none;
    }
    .param-label {
      color: #9ca3af;
    }
    .param-val {
      font-weight: 700;
      color: #ffffff;
    }
    .recs-list {
      list-style: none;
    }
    .recs-list li {
      font-size: 11px;
      color: #e5e7eb;
      padding: 6px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .recs-list li:last-child {
      border-bottom: none;
    }
    .bullet {
      color: #00f0ff;
      font-weight: 800;
    }
    /* Meaning Box */
    .meaning-box {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 14px 18px;
      margin-bottom: 16px;
      font-size: 12px;
      color: #d1d5db;
    }
    .meaning-box strong {
      color: #ffffff;
      display: block;
      margin-bottom: 4px;
      font-size: 13px;
    }
    /* Disclaimer */
    .disclaimer {
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 10px;
      color: #fde68a;
      line-height: 1.5;
    }
    .disclaimer strong {
      color: #f59e0b;
      display: block;
      margin-bottom: 2px;
      font-size: 11px;
    }
    .footer-bar {
      margin-top: 16px;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #6b7280;
    }

    @media print {
      body {
        background: #0c1128 !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="report-wrap">
    <!-- Header -->
    <div class="header">
      <div class="brand">
        <div class="brand-icon">🩺</div>
        <div>
          <div class="brand-title">Diab<span>Predict</span></div>
          <div style="font-size: 10px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">
            AI Biometric Health Assessment
          </div>
        </div>
      </div>
      <div class="meta-date">
        <div><strong>Date:</strong> ${dateStr}</div>
        <div><strong>Format:</strong> Clinical Summary Report</div>
        ${
          isDemo
            ? `<div class="demo-pill">DEMO RESULT · ${classification}</div>`
            : `<div style="font-size: 10px; color: #10b981; font-weight: 600; margin-top: 3px;">● Real Client Computation</div>`
        }
      </div>
    </div>

    <!-- Main Result Card -->
    <div class="result-card">
      <div class="gauge-wrap">
        <svg class="gauge-svg" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="${radius}" class="gauge-track" />
          <circle cx="80" cy="80" r="${radius}" class="gauge-fill" />
        </svg>
        <div class="gauge-center">
          <div class="gauge-sub">Estimated Risk</div>
          <div class="gauge-score">${riskPercent}%</div>
          <div class="badge-pill">${classification}</div>
        </div>
      </div>

      <div class="result-info">
        <div class="result-subtitle">Risk Classification</div>
        <h2>${riskLabel}</h2>
        <p class="result-desc">
          Evaluated across 8 clinical biometric parameters using pre-calibrated logistic weight regression based on population health data.
        </p>

        <div class="scale-bar"></div>
        <div class="scale-labels">
          <span>Low (0-29%)</span>
          <span>Moderate (30-59%)</span>
          <span>High (60%+)</span>
        </div>
      </div>
    </div>

    <!-- Grid: Health Summary & Recommended Actions -->
    <div class="grid-sections">
      <div class="section-box">
        <h3>📊 Health Summary</h3>
        <div class="param-row">
          <span class="param-label">Fasting Blood Glucose:</span>
          <span class="param-val">${data.glucose} mg/dL</span>
        </div>
        <div class="param-row">
          <span class="param-label">Diastolic Blood Pressure:</span>
          <span class="param-val">${data.bloodPressure} mm Hg</span>
        </div>
        <div class="param-row">
          <span class="param-label">Body Mass Index (BMI):</span>
          <span class="param-val">${data.bmi} kg/m²</span>
        </div>
        <div class="param-row">
          <span class="param-label">Age &amp; Gender:</span>
          <span class="param-val">${data.age} yrs (${data.gender})</span>
        </div>
        <div class="param-row">
          <span class="param-label">Serum Insulin:</span>
          <span class="param-val">${data.insulin} μU/mL</span>
        </div>
        <div class="param-row">
          <span class="param-label">Skin Fold Thickness:</span>
          <span class="param-val">${data.skinThickness} mm</span>
        </div>
        <div class="param-row">
          <span class="param-label">Diabetes Pedigree Factor:</span>
          <span class="param-val">${data.dpf}</span>
        </div>
      </div>

      <div class="section-box">
        <h3>💡 Recommended Next Steps</h3>
        <ul class="recs-list">
          ${recs.map((r) => `<li><span class="bullet">●</span><span>${r}</span></li>`).join('')}
        </ul>
      </div>
    </div>

    <!-- What This Means -->
    <div class="meaning-box">
      <strong>🩺 What This Means</strong>
      ${meaningText}
    </div>

    <!-- Disclaimer -->
    <div class="disclaimer">
      <strong>⚠️ Medical Diagnostic Disclaimer</strong>
      This assessment report is generated algorithmically strictly for informational and educational health awareness.
      It does NOT constitute a clinical diagnosis of Diabetes Mellitus or a medical treatment plan.
      Always seek the evaluation of a qualified, licensed healthcare professional for clinical testing and diagnoses.
    </div>

    <!-- Footer -->
    <div class="footer-bar">
      <div>DiabPredict Health Technologies · All calculations processed locally on client</div>
      <div>Confidential Assessment Document</div>
    </div>
  </div>
</body>
</html>`
}

export function downloadReportDocument(result: PredictionResult): void {
  const htmlContent = generateReportHtml(result)
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `DiabPredict_Assessment_${result.riskLevel.toUpperCase()}_${Date.now()}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function printReportDocument(result: PredictionResult): void {
  const htmlContent = generateReportHtml(result)
  const printWindow = window.open('', '_blank', 'width=900,height=1000')
  if (!printWindow) {
    // Fallback if popup blocked
    window.print()
    return
  }

  printWindow.document.open()
  printWindow.document.write(htmlContent)
  printWindow.document.close()

  printWindow.onload = () => {
    printWindow.focus()
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }
}
