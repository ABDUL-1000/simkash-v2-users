import { Sparkles } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmCommissionProjectionCard() {
  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Month-End Projection
          </h4>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
          Day 15 of 30
        </span>
      </div>

      <div
        className="p-3 rounded-xl border space-y-2"
        style={{
          backgroundColor: "#FAF5FF",
          borderColor: "#E9D5FF",
        }}
      >
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-purple-900 font-semibold">Forecasted Payout</span>
          <span className="text-xl font-black text-purple-950">₦329,500</span>
        </div>

        <div className="w-full h-1.5 rounded-full bg-purple-200 overflow-hidden">
          <div className="h-full bg-purple-600 rounded-full" style={{ width: "86%" }} />
        </div>

        <div className="flex items-center justify-between text-[11px] text-purple-800 pt-1">
          <span>Projected Sims: <strong>17,200</strong></span>
          <span className="font-bold text-emerald-700">+₦45.5K to go</span>
        </div>
      </div>

      <div
        className="p-2.5 rounded-xl border text-[11px] leading-relaxed"
        style={{
          borderColor: APP_COLORS.greys.stroke,
          backgroundColor: APP_COLORS.backgrounds.surface,
          color: APP_COLORS.texts.slate,
        }}
      >
        <strong>Tip:</strong> Closing the gap on the 3 at-risk SCs unlocks an additional <strong>₦28,000</strong> in regional bonus tier pool.
      </div>
    </div>
  );
}
