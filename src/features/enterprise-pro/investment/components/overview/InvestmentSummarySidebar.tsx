import React from "react";
import { Calendar } from "lucide-react";
import { colors } from "@/constants/colors";
import { investmentSummaryData } from "../../data/mockInvestmentData";

export const InvestmentSummarySidebar: React.FC = () => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900">Portfolio Metrics</h3>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
          Tier-1 Enterprise
        </span>
      </div>

      <div className="space-y-3.5 text-xs">
        <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
          <span className="text-gray-500">Initial Capital</span>
          <span className="font-bold text-gray-900">
            ₦{investmentSummaryData.principalAmount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
          <span className="text-gray-500">Gross Return</span>
          <span className="font-bold text-emerald-600">
            ₦{investmentSummaryData.totalEarnings.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
          <span className="text-gray-500">Net Margin</span>
          <span className="font-bold text-emerald-600">
            +₦{investmentSummaryData.netProfit.toLocaleString()} (+{investmentSummaryData.roiPercentage}%)
          </span>
        </div>

        <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
          <span className="text-gray-500">Avg Monthly Inflow</span>
          <span className="font-bold text-gray-900">₦4,958,333</span>
        </div>

        <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
          <span className="text-gray-500">Projected 3-Yr Total</span>
          <span className="font-bold text-blue-600">₦184,200,000</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-gray-500">Next Auto-Settlement</span>
          <span className="font-semibold text-gray-900 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            01 Oct 2026
          </span>
        </div>
      </div>
    </div>
  );
};
