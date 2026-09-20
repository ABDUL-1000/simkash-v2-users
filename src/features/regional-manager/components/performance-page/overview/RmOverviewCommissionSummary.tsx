import { Wallet, ArrowRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmOverviewCommissionSummaryProps {
  onRequestPayout: () => void;
  onViewCommissionTab?: () => void;
}

export function RmOverviewCommissionSummary({
  onRequestPayout,
  onViewCommissionTab,
}: RmOverviewCommissionSummaryProps) {
  const totalEarned = 284000;
  const paidOut = 200000;
  const available = 84000;
  const paidPercent = Math.round((paidOut / totalEarned) * 100);

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
            Commission Summary
          </h4>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            June 2026 earnings & settlement
          </p>
        </div>
        <div
          className="w-7 h-7 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: APP_COLORS.blues.surfaceLight }}
        >
          <Wallet className="w-3.5 h-3.5" style={{ color: APP_COLORS.blues.interactiveCta }} />
        </div>
      </div>

      {/* Main stats */}
      <div
        className="rounded-xl p-3 border space-y-2"
        style={{
          backgroundColor: APP_COLORS.backgrounds.surface,
          borderColor: APP_COLORS.greys.stroke,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
            Total Earned This Month
          </span>
          <span className="text-base font-black" style={{ color: APP_COLORS.texts.primary }}>
            ₦{totalEarned.toLocaleString()}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden flex">
          <div
            className="h-full bg-emerald-500 rounded-l-full transition-all"
            style={{ width: `${paidPercent}%` }}
            title={`Paid: ${paidPercent}%`}
          />
          <div
            className="h-full bg-blue-500 rounded-r-full transition-all"
            style={{ width: `${100 - paidPercent}%` }}
            title={`Available: ${100 - paidPercent}%`}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
          <div>
            <span className="text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Paid Out
            </span>
            <span className="font-bold text-slate-800">₦{paidOut.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500 flex items-center justify-end gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Available Now
            </span>
            <span className="font-bold text-blue-600">₦{available.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onRequestPayout}
          className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 active:scale-98 text-center"
          style={{ backgroundColor: APP_COLORS.greens.secondary }}
        >
          Request ₦84,000 Payout
        </button>
        {onViewCommissionTab && (
          <button
            type="button"
            onClick={onViewCommissionTab}
            className="px-3 py-2 rounded-xl text-xs font-bold border transition-colors hover:bg-slate-50 flex items-center gap-1"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              color: APP_COLORS.texts.slate,
            }}
          >
            <span>Details</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
