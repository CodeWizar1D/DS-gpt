/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        dp: {
          bg:     '#0c1128',
          bgmid:  '#0f1535',
          cyan:   '#00f0ff',
          purple: '#b026ff',
          muted:  '#9ca3af',
          faint:  '#4b5563',
        },
      },
      backgroundImage: {
        'gradient-dp': 'linear-gradient(135deg, #00f0ff, #b026ff)',
        'gradient-dp-text': 'linear-gradient(90deg, #60a5fa, #a855f7)',
        'gradient-dp-soft': 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(176,38,255,0.15))',
      },
      boxShadow: {
        'glow-cyan':   '0 0 30px rgba(0,240,255,0.25), 0 0 60px rgba(0,240,255,0.10)',
        'glow-purple': '0 0 30px rgba(176,38,255,0.25), 0 0 60px rgba(176,38,255,0.10)',
        'glow-sm':     '0 0 15px rgba(0,240,255,0.20)',
        'card':        '0 8px 32px rgba(0,0,0,0.4)',
      },
      animation: {
        'float':    'float 4s ease-in-out infinite',
        'float-r':  'float 5s ease-in-out infinite reverse',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%':     { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
