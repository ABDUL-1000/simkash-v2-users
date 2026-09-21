import React from "react";
import { Wallet, Repeat, TrendingUp } from "lucide-react";
import { colors } from "@/constants/colors";
import { investmentSummaryData } from "../../data/mockInvestmentData";

export const ReinvestHeaderCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Wallet Capital */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-sm flex items-start justify-between"
        style={{ borderColor: colors.border }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Available to Reinvest
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-gray-900">
              ₦{investmentSummaryData.walletAvailable.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              Liquid enterprise balance ready for capital stock
            </div>
          </div>
        </div>
      </div>

      {/* Cumulative Stock Reinvested */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-sm flex items-start justify-between"
        style={{ borderColor: colors.border }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Repeat className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Reinvested to Date
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-gray-900">₦8,250,000</div>
            <div className="text-xs text-emerald-600 font-semibold mt-0.5">
              16,000 SIMs deployed across 5 cycles
            </div>
          </div>
        </div>
      </div>

      {/* Projected Annual Yield Bump */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-sm flex items-start justify-between"
        style={{ borderColor: colors.border }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Projected Annual Yield
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-600">
              +₦2,850,000/yr
            </div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              Estimated +5.7% addition to baseline portfolio ROI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
