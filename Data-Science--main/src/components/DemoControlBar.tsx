import React from 'react'
import { Sparkles } from 'lucide-react'

interface DemoControlBarProps {
  activeDemoKey?: 'low' | 'moderate' | 'high'
  onSelectDemo: (key: 'low' | 'moderate' | 'high') => void
  isRealActive?: boolean
  onSelectReal?: () => void
  className?: string
}

export default function DemoControlBar({
  activeDemoKey,
  onSelectDemo,
  isRealActive,
  onSelectReal,
  className = '',
}: DemoControlBarProps) {
  return (
    <div
      className={`glass px-4 py-2.5 rounded-full border border-white/10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs ${className}`}
      style={{
        background: 'rgba(12, 17, 40, 0.75)',
        backdropFilter: 'blur(16px)',
      }}
    >
      <div className="flex items-center gap-1.5 text-white/60 font-semibold uppercase tracking-wider text-[11px] mr-1">
        <Sparkles className="w-3.5 h-3.5 text-[#00f0ff]" />
        <span>Demo Mode:</span>
      </div>

      <button
        type="button"
        onClick={() => onSelectDemo('low')}
        className={`px-3.5 py-1.5 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
          activeDemoKey === 'low'
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
            : 'text-white/70 hover:text-white hover:bg-white/5 border border-white/10'
        }`}
      >
        Low Risk (12%)
      </button>

      <button
        type="button"
        onClick={() => onSelectDemo('moderate')}
        className={`px-3.5 py-1.5 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
          activeDemoKey === 'moderate'
            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
            : 'text-white/70 hover:text-white hover:bg-white/5 border border-white/10'
        }`}
      >
        Moderate Risk (44%)
      </button>

      <button
        type="button"
        onClick={() => onSelectDemo('high')}
        className={`px-3.5 py-1.5 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
          activeDemoKey === 'high'
            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
            : 'text-white/70 hover:text-white hover:bg-white/5 border border-white/10'
        }`}
      >
        High Risk (78%)
      </button>

      {onSelectReal && (
        <button
          type="button"
          onClick={onSelectReal}
          className={`px-3 py-1.5 rounded-full font-medium transition-all duration-200 cursor-pointer text-[11px] ${
            isRealActive
              ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-glow-sm'
              : 'text-white/40 hover:text-white/70 border border-transparent'
          }`}
          title="Return to your actual calculation"
        >
          My Assessment
        </button>
      )}
    </div>
  )
}
