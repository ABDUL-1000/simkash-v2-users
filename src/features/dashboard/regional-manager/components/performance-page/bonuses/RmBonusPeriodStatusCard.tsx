import { Award, Clock } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmBonusPeriodStatusCard() {
  const currentActivations = 14847;
  const targetActivations = 18000;
  const percentAchieved = ((currentActivations / targetActivations) * 100).toFixed(1);

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-4"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: APP_COLORS.greens.light }}
          >
            <Award className="w-5 h-5" style={{ color: APP_COLORS.greens.secondary }} />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold" style={{ color: APP_COLORS.texts.primary }}>
              June 2026 Bonus Period Status
            </h3>
            <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
              Regional Target: 18,000 activations • Remittance cycle closes in 15 days
            </p>
          </div>
        </div>

        <span
          className="px-2.5 py-1 rounded-full text-xs font-bold self-start sm:self-auto flex items-center gap-1.5"
          style={{
            backgroundColor: APP_COLORS.greens.light,
            color: APP_COLORS.greens.secondary,
          }}
        >
          <Clock className="w-3.5 h-3.5" />
          Day 15 of 30 (50% Elapsed)
        </span>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Metric 1 */}
        <div
          className="p-3 rounded-xl border space-y-1"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <span className="text-[11px] font-semibold text-slate-500 block">Regional Attainment</span>
          <div className="text-xl font-black text-slate-900">
            {percentAchieved}%
          </div>
          <span className="text-[10px] font-medium text-emerald-600 block">
            {currentActivations.toLocaleString()} / {targetActivations.toLocaleString()}
          </span>
          <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percentAchieved}%` }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div
          className="p-3 rounded-xl border space-y-1"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <span className="text-[11px] font-semibold text-slate-500 block">Qualified SCs</span>
          <div className="text-xl font-black text-slate-900">
            8 <span className="text-xs font-normal text-slate-500">of 12 SCs</span>
          </div>
          <span className="text-[10px] font-medium text-blue-600 block">
            66.7% qualification rate (Min: 8)
          </span>
          <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: "66.7%" }} />
          </div>
        </div>

        {/* Metric 3 */}
        <div
          className="p-3 rounded-xl border space-y-1"
          style={{
            backgroundColor: APP_COLORS.blues.surfaceLight,
            borderColor: APP_COLORS.blues.surfaceMid,
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider block text-blue-900">
            Current Bonus Accrued
          </span>
          <div className="text-xl font-black" style={{ color: APP_COLORS.blues.primary }}>
            ₦120,000
          </div>
          <span className="text-[10px] font-semibold text-blue-700 block">
            Tier 2 Unlocked • +₦30K for Tier 3
          </span>
          <div className="w-full h-1.5 rounded-full bg-blue-200 mt-2 overflow-hidden">
            <div className="h-full bg-blue-700 rounded-full" style={{ width: "80%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
