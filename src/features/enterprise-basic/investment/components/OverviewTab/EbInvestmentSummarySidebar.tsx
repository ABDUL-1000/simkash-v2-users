import React from "react";
import type { AccountTier, EbInvestmentOverview } from "../../types";

interface EbInvestmentSummarySidebarProps {
  overview: EbInvestmentOverview;
  accountTier: AccountTier;
  onPayNext?: () => void;
  onOrderStock?: () => void;
  onDownloadStatement?: () => void;
}

export const EbInvestmentSummarySidebar: React.FC<
  EbInvestmentSummarySidebarProps
> = ({
  overview,
  accountTier,
  onPayNext,
  onOrderStock,
  onDownloadStatement,
}) => {
  const isFinanced = accountTier === "financed";
  const netDebt = overview.totalDeployed - overview.totalMarginEarned;

  return (
    <div className="space-y-4">
      {/* Dark Navy Portfolio Overview Card */}
      <div className="bg-[#0F223D] text-white rounded-2xl p-5 shadow-xs space-y-4 text-xs font-medium">
        <div>
          <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">
            Investment Summary
          </h4>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            Portfolio Overview
          </span>
        </div>

        <div className="space-y-2 divide-y divide-white/10 text-xs">
          <div className="flex justify-between pt-1">
            <span className="text-slate-300">Principal</span>
            <span className="font-bold text-white">
              ₦{overview.principalInvested.toLocaleString()}
              {accountTier === "strategic_upfront" && "+"}
            </span>
          </div>

          <div className="flex justify-between pt-2">
            <span className="text-slate-300">Additional</span>
            <span className="font-bold text-white">
              ₦{overview.additionalOrders.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between pt-2">
            <span className="text-slate-300">Total deployed</span>
            <span className="font-extrabold text-blue-400">
              ₦{overview.totalDeployed.toLocaleString()}
              {accountTier === "strategic_upfront" && "+"}
            </span>
          </div>

          <div className="flex justify-between pt-2">
            <span className="text-slate-300">Total earned</span>
            <span className="font-extrabold text-emerald-400">
              ₦{overview.totalMarginEarned.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between pt-2">
            <span className="text-slate-300">Net position</span>
            {!isFinanced ? (
              <span className="font-bold text-emerald-400 text-[11px]">
                NO OUTSTANDING BALANCE
              </span>
            ) : (
              <span className="font-bold text-amber-400">
                -₦{netDebt.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-white/10 text-center text-blue-400 font-bold text-[11px]">
          ROI: {overview.breakEvenProgress}% of deployment recovered
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-2.5 text-xs">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Quick Actions
        </span>

        {isFinanced && onPayNext && (
          <button
            type="button"
            onClick={onPayNext}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition shadow-xs"
          >
            Pay Next Instalment
          </button>
        )}

        <button
          type="button"
          onClick={onOrderStock}
          className="w-full py-2.5 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold transition"
        >
          {isFinanced ? "Order Stock" : "Order More Units"}
        </button>

        <button
          type="button"
          onClick={onDownloadStatement}
          className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition"
        >
          Download Statement
        </button>
      </div>
    </div>
  );
};
