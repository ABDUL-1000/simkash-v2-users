import { Lightbulb, TrendingUp, Sparkles } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmComparisonInsightsCard() {
  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "#FEF3C7" }}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
        </div>
        <div>
          <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Comparative Insights & Recommendations
          </h4>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Tactical takeaways derived from cross-coordinator metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        <div
          className="p-3 rounded-xl border flex items-start gap-2.5"
          style={{
            borderColor: APP_COLORS.blues.surfaceMid,
            backgroundColor: APP_COLORS.blues.surfaceLight,
          }}
        >
          <TrendingUp className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold block" style={{ color: APP_COLORS.blues.primary }}>
              Volume vs Productivity Trade-Off
            </span>
            <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
              While Lagos dominates total gross volume (3,120 sims), Oyo demonstrates the highest AP efficiency (64.1 activations/AP). Lagos can improve agent output by replicating Oyo’s local cluster incentive structure.
            </p>
          </div>
        </div>

        <div
          className="p-3 rounded-xl border flex items-start gap-2.5"
          style={{
            borderColor: APP_COLORS.greens.primary,
            backgroundColor: APP_COLORS.greens.light,
          }}
        >
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold block text-emerald-950">
              Rivers Acceleration Momentum
            </span>
            <p className="text-[11px] text-emerald-800 leading-relaxed mt-0.5">
              Rivers exhibits the fastest MoM acceleration (+24.4%). Chioma is pacing to reach 105% target within 5 days. Consider releasing 500 extra SIM stock to sustain this surge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
