import { Lightbulb, AlertCircle, TrendingUp, Sparkles, ChevronRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmOverviewKeyInsightsProps {
  onNudgeAtRisk?: () => void;
}

export function RmOverviewKeyInsights({ onNudgeAtRisk }: RmOverviewKeyInsightsProps) {
  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "#FEF3C7" }}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
              Key Insights & Alerts
            </h4>
            <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
              Algorithmic performance suggestions
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {/* Insight 1 */}
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
              Top Hub Momentum
            </span>
            <span className="text-[11px] leading-relaxed text-slate-600">
              Lagos & Oyo combined deliver 5,300 (35.7%) of regional output. Lagos is on track to surpass 3,500 sims by month-end.
            </span>
          </div>
        </div>

        {/* Insight 2 */}
        <div
          className="p-3 rounded-xl border flex items-start gap-2.5"
          style={{
            borderColor: "#FED7AA",
            backgroundColor: "#FFFBEB",
          }}
        >
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs flex-1">
            <span className="font-bold block text-amber-900">
              Attention Required: 3 SCs
            </span>
            <span className="text-[11px] leading-relaxed text-amber-800 block">
              Kwara, Osun, and Ondo are currently below 60% activation run-rate. Nudging them can protect your regional bonus.
            </span>
            {onNudgeAtRisk && (
              <button
                type="button"
                onClick={onNudgeAtRisk}
                className="mt-1 text-[11px] font-bold text-amber-700 hover:text-amber-900 underline flex items-center gap-0.5"
              >
                <span>Send bulk reminder to all 3</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Insight 3 */}
        <div
          className="p-3 rounded-xl border flex items-start gap-2.5"
          style={{
            borderColor: APP_COLORS.greens.primary,
            backgroundColor: APP_COLORS.greens.light,
          }}
        >
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold block text-emerald-900">
              eSIM & EasyBuy Synergies
            </span>
            <span className="text-[11px] leading-relaxed text-emerald-800">
              1,420 financed smartphones generated ₦42.6K passive overrides this month (+31% vs May).
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
