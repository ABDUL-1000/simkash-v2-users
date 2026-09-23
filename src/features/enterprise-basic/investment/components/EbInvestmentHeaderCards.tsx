import React from "react";
import { CheckCircle2 } from "lucide-react";
import type { AccountTier, EbInvestmentOverview } from "../types";

interface EbInvestmentHeaderCardsProps {
  overview: EbInvestmentOverview;
  accountTier: AccountTier;
}

export const EbInvestmentHeaderCards: React.FC<EbInvestmentHeaderCardsProps> = ({
  overview,
  accountTier,
}) => {
  const isUpfront = accountTier !== "financed";

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-4 text-xs">
      <div className="flex items-center justify-between text-slate-400 font-bold text-[10px] uppercase tracking-wider">
        <span>Principal & Returns Overview</span>
        <span>Jan 2026 — Present</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {/* Col 1: Principal Invested */}
        <div className="space-y-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Principal Invested
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
              ₦{overview.principalInvested.toLocaleString()}
              {accountTier === "strategic_upfront" && "+"}
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] font-medium">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">
                {isUpfront ? "Upfront (100%)" : "Initial payment (50%)"}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-800">
                  ₦{overview.upfrontPaid.toLocaleString()}
                  {accountTier === "strategic_upfront" && "+"}
                </span>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  paid
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">
                {isUpfront ? "Balance owed" : "Balance remaining (50%)"}
              </span>
              {isUpfront ? (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  None ✓
                </span>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-800">
                    ₦{overview.balanceOwed.toLocaleString()}
                  </span>
                  <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                    owed
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Additional orders</span>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-800">
                  ₦{overview.additionalOrders.toLocaleString()}
                </span>
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  paid
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 font-bold text-slate-900">
              <span>Total deployed</span>
              <span>
                ₦{overview.totalDeployed.toLocaleString()}
                {accountTier === "strategic_upfront" && "+"}
              </span>
            </div>
          </div>
        </div>

        {/* Col 2: Total Margin Earned */}
        <div className="space-y-3 md:pl-6 pt-4 md:pt-0">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Total Margin Earned
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-0.5">
              ₦{overview.totalMarginEarned.toLocaleString()}
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] font-medium">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">POS SIM margin</span>
              <span className="font-bold text-blue-600">₦{overview.posMargin.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">CCTV SIM margin</span>
              <span className="font-bold text-emerald-600">₦{overview.cctvMargin.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">GPS SIM margin</span>
              <span className="font-bold text-purple-600">₦{overview.gpsMargin.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Router SIM margin</span>
              <span className="font-bold text-slate-400">₦0</span>
            </div>
            <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 font-bold text-slate-900">
              <span>Total</span>
              <span>₦{overview.totalMarginEarned.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Col 3: Return on Investment */}
        <div className="space-y-3 md:pl-6 pt-4 md:pt-0">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Return on Investment
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-600 mt-0.5">
              {overview.roiPct}%
            </div>
          </div>

          <div className="space-y-1.5 text-[11px] font-medium">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">ROI on capital</span>
              <span className="font-bold text-blue-600">{overview.roiOnCapital}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Break-even progress</span>
              <span className="font-bold text-blue-600">{overview.breakEvenProgress}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Projected break-even</span>
              <span className="font-bold text-amber-600">{overview.projectedBreakEven}</span>
            </div>
            <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 font-bold">
              <span className="text-slate-900">Monthly margin avg</span>
              <span className="text-emerald-600">₦{(overview.monthlyMarginAvg / 1000).toFixed(0)}K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upfront Fully Paid Status Strip */}
      {isUpfront && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-800 font-medium text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Your wholesale investment is fully paid. No outstanding balance.</span>
        </div>
      )}
    </div>
  );
};
