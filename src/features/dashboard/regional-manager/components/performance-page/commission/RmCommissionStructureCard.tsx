import { Layers, CheckCircle2 } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmCommissionStructureCard() {
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
            Commission Structure
          </h4>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Volume tier multipliers & active formula
          </p>
        </div>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: APP_COLORS.blues.surfaceLight }}
        >
          <Layers className="w-3.5 h-3.5" style={{ color: APP_COLORS.blues.interactiveCta }} />
        </div>
      </div>

      {/* Current Effective Rate */}
      <div
        className="rounded-xl p-3 border flex items-center justify-between"
        style={{
          backgroundColor: APP_COLORS.greens.light,
          borderColor: APP_COLORS.greens.primary,
        }}
      >
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider block">
            Effective RM Rate
          </span>
          <span className="text-xl font-black text-emerald-950">
            ₦19.13 <span className="text-xs font-semibold text-emerald-700">/ activation</span>
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 text-emerald-900">
          Tier 2 Active
        </span>
      </div>

      {/* Tier Steps */}
      <div className="space-y-2 text-xs">
        <div
          className="p-2 rounded-xl border flex items-center justify-between"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-semibold text-slate-700">Base Regional Override</span>
          </div>
          <span className="font-bold text-slate-900">₦15.00</span>
        </div>

        <div
          className="p-2 rounded-xl border flex items-center justify-between"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-semibold text-slate-700">Tier 1 (&gt;10,000 sims)</span>
          </div>
          <span className="font-bold text-emerald-600">+₦2.50</span>
        </div>

        <div
          className="p-2 rounded-xl border flex items-center justify-between"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-semibold text-slate-700">Tier 2 (&gt;14,000 sims)</span>
          </div>
          <span className="font-bold text-emerald-600">+₦1.63</span>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 italic pt-1">
        * Tier rates automatically adjust upward dynamically on the 1st of each month based on regional volume.
      </p>
    </div>
  );
}
