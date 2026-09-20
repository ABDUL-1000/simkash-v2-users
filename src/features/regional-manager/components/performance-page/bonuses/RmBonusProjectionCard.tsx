import { TrendingUp } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export function RmBonusProjectionCard() {
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
            Period Bonus Forecast
          </h4>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Run-rate trajectory for June 30 payout
          </p>
        </div>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: APP_COLORS.greens.light }}
        >
          <TrendingUp className="w-3.5 h-3.5" style={{ color: APP_COLORS.greens.secondary }} />
        </div>
      </div>

      <div
        className="rounded-xl p-3 border space-y-2"
        style={{
          backgroundColor: APP_COLORS.backgrounds.surface,
          borderColor: APP_COLORS.greys.stroke,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Projected Bonus</span>
          <span className="text-xl font-black text-slate-900">₦120,000 - ₦150,000</span>
        </div>

        <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: "82%" }} />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
          <span>Current Run-rate: <strong>17,200 sims</strong></span>
          <span className="text-emerald-600 font-bold">95.5% confidence</span>
        </div>
      </div>
    </div>
  );
}
