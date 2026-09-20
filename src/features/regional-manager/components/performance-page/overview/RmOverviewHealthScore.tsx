import { ShieldCheck } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmOverviewHealthScore() {
  const score = 82;
  const factors = [
    { label: "Activation Velocity", score: 88, color: APP_COLORS.greens.secondary },
    { label: "Target Attainment", score: 78, color: APP_COLORS.blues.interactiveCta },
    { label: "AP Network Retention", score: 85, color: APP_COLORS.greens.secondary },
    { label: "System Agent Uptime", score: 92, color: APP_COLORS.greens.secondary },
  ];

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Network Health Score
          </h4>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Composite efficiency & operational quality
          </p>
        </div>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: APP_COLORS.greens.light }}
        >
          <ShieldCheck className="w-3.5 h-3.5" style={{ color: APP_COLORS.greens.secondary }} />
        </div>
      </div>

      {/* Score Hero */}
      <div
        className="rounded-xl p-3.5 border flex items-center justify-between"
        style={{
          backgroundColor: APP_COLORS.blues.surfaceLight,
          borderColor: APP_COLORS.blues.surfaceMid,
        }}
      >
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: APP_COLORS.texts.slate }}>
            Health Status
          </span>
          <span className="text-base font-black" style={{ color: APP_COLORS.blues.primary }}>
            Excellent Rating
          </span>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Top 15% across all regional zones nationwide
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          {/* Radial ring SVG */}
          <svg className="w-16 h-16 transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="#E2ECF6"
              strokeWidth="5"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="#10B981"
              strokeWidth="5"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 26}
              strokeDashoffset={2 * Math.PI * 26 * (1 - score / 100)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute text-center">
            <span className="text-base font-black text-slate-900">{score}</span>
            <span className="text-[9px] text-slate-400 block -mt-1">/100</span>
          </div>
        </div>
      </div>

      {/* Factor list */}
      <div className="space-y-2 pt-1">
        {factors.map((f) => (
          <div key={f.label} className="space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-600">{f.label}</span>
              <span className="font-bold text-slate-900">{f.score}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${f.score}%`,
                  backgroundColor: f.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
