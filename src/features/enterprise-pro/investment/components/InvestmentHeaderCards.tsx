import React from "react";
import { TrendingUp, ShieldCheck, Wallet, ArrowUpRight } from "lucide-react";
import { colors } from "@/constants/colors";
import { investmentSummaryData } from "../data/mockInvestmentData";

interface InvestmentHeaderCardsProps {
  onReinvestClick?: () => void;
}

export const InvestmentHeaderCards: React.FC<InvestmentHeaderCardsProps> = ({
  onReinvestClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Principal Card */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-sm flex flex-col justify-between"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Principal Investment
          </span>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            ₦{investmentSummaryData.principalAmount.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <span>Initial capital deployed</span>
            <span className="text-gray-300">•</span>
            <span className="text-blue-600 font-semibold">12 Mos active</span>
          </div>
        </div>
      </div>

      {/* Cumulative Earnings Card */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-sm flex flex-col justify-between"
        style={{ borderColor: colors.border }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Cumulative Earnings
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{investmentSummaryData.roiPercentage}% ROI</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            ₦{investmentSummaryData.totalEarnings.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <span>Net Profit: +₦{investmentSummaryData.netProfit.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Reinvestment Capital / Wallet */}
      <div
        className="rounded-2xl p-5 border bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1"
        style={{ borderColor: "#1e293b" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Reinvestable Capital
          </span>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/10 text-white">
            <Wallet className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            ₦{investmentSummaryData.walletAvailable.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400">Available in wallet</span>
            {onReinvestClick && (
              <button
                type="button"
                onClick={onReinvestClick}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Reinvest Stock</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
