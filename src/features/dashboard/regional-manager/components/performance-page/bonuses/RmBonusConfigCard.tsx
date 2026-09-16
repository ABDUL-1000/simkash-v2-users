import { Layers, ShieldCheck, Check } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmBonusConfigCard() {
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
            Bonus Pool Structure
          </h4>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Monthly regional achievement incentives
          </p>
        </div>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: APP_COLORS.blues.surfaceLight }}
        >
          <Layers className="w-3.5 h-3.5" style={{ color: APP_COLORS.blues.interactiveCta }} />
        </div>
      </div>

      <div className="space-y-2 text-xs">
        {/* Tier 1 */}
        <div
          className="p-2.5 rounded-xl border flex items-center justify-between"
          style={{
            borderColor: APP_COLORS.greens.primary,
            backgroundColor: APP_COLORS.greens.light,
          }}
        >
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <div>
              <span className="font-bold text-emerald-950 block">Tier 1: 85% Target</span>
              <span className="text-[10px] text-emerald-700">15,300 network sims</span>
            </div>
          </div>
          <span className="font-black text-emerald-900">₦60,000</span>
        </div>

        {/* Tier 2 (Current) */}
        <div
          className="p-2.5 rounded-xl border flex items-center justify-between ring-2 ring-blue-500/20"
          style={{
            borderColor: APP_COLORS.blues.surfaceMid,
            backgroundColor: APP_COLORS.blues.surfaceLight,
          }}
        >
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <div>
              <span className="font-bold text-blue-950 block">Tier 2: 100% Target (Active)</span>
              <span className="text-[10px] text-blue-700">18,000 network sims</span>
            </div>
          </div>
          <span className="font-black text-blue-900">₦120,000</span>
        </div>

        {/* Tier 3 */}
        <div
          className="p-2.5 rounded-xl border flex items-center justify-between opacity-85"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block" />
            <div>
              <span className="font-bold text-slate-800 block">Tier 3: 120% Stretch</span>
              <span className="text-[10px] text-slate-500">21,600 network sims</span>
            </div>
          </div>
          <span className="font-black text-slate-700">₦150,000</span>
        </div>
      </div>

      <div
        className="p-2 rounded-xl flex items-start gap-2 text-[11px] text-slate-600"
        style={{ backgroundColor: APP_COLORS.backgrounds.surface }}
      >
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <span>
          <strong>Rule:</strong> At least 8 of your 12 SCs must achieve &ge;80% individual target. Currently <strong>8 of 12 qualifying</strong>.
        </span>
      </div>
    </div>
  );
}
