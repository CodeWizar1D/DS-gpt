# DiabPredict — AI-Powered Diabetes Risk Prediction Platform

A modern, clinical-grade diabetes risk assessment web application built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Powered by a pre-trained machine learning prediction pipeline benchmarked against the PIMA Indians Diabetes Dataset.

---

## ✨ Features

- **Clinical Assessment Flow**: 2-step intuitive guided evaluation with real-time BMI calculations, instant validation, and clear guidance.
- **Trained ML Engine**: Client-side inference powered by a logistic regression pipeline utilizing the 8 standardized clinical features:
  1. Pregnancies
  2. Glucose (mg/dL)
  3. Blood Pressure (mmHg)
  4. Skin Thickness (mm)
  5. Insulin (µU/mL)
  6. Body Mass Index (BMI, kg/m²)
  7. Diabetes Pedigree Function (DPF)
  8. Age (years)
- **Clinical Imputation**: Automated median imputation for zero-as-missing physiological parameters (`Glucose`, `BloodPressure`, `SkinThickness`, `Insulin`, `BMI`).
- **Interactive Result Dashboard**: Animated SVG gauge meters, risk classification badges (Low, Moderate, High), and personalized evidence-based recommendations.
- **Export Capabilities**: Generate and download printable clinical summary reports (PDF / HTML printouts).
- **Presentation Demo Mode**: Pre-configured instant demo profiles (`Low Risk`, `Moderate Risk`, `High Risk`) for testing and demonstrations.
- **Modern UI / UX**: Deep dark aesthetic with glassmorphism, responsive navigation, subtle glowing gradients, and fluid transitions.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CodeWizar1D/Data-Science-.git
   cd Data-Science-
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🔒 Privacy & Clinical Disclaimer

DiabPredict processes all inputs client-side directly within your browser. No sensitive health measurements are transmitted to external servers. This tool provides an informational risk score based on statistical population models and does **not** constitute a formal medical diagnosis. Always consult a qualified healthcare professional for diagnostic evaluations.
