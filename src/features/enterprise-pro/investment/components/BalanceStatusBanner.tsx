import React from "react";
import { ArrowRight, AlertCircle } from "lucide-react";
import { colors } from "@/constants/colors";
import { investmentSummaryData } from "../data/mockInvestmentData";

interface BalanceStatusBannerProps {
  onPayDownClick: () => void;
}

export const BalanceStatusBanner: React.FC<BalanceStatusBannerProps> = ({
  onPayDownClick,
}) => {
  const {
    paidOffAmount,
    principalAmount,
    repaymentProgressPercent,
    remainingBalance,
  } = investmentSummaryData;

  return (
    <div
      className="rounded-2xl p-4 sm:p-5 border bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900">
              Principal Repayment Progress
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              {repaymentProgressPercent}% Paid Off
            </span>
          </div>
          <span className="text-xs font-semibold text-gray-500">
            ₦{paidOffAmount.toLocaleString()} / ₦{principalAmount.toLocaleString()}
          </span>
        </div>

        {/* Progress Track */}
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${repaymentProgressPercent}%` }}
          />
        </div>

        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>
            Outstanding principal balance:{" "}
            <strong className="text-gray-900 font-semibold">
              ₦{remainingBalance.toLocaleString()}
            </strong>
            . Next scheduled auto-amortization in 9 days.
          </span>
        </div>
      </div>

      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={onPayDownClick}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundColor: colors.primary }}
        >
          <span>Pay Down Balance</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
