import React from "react";
import { DollarSign, CheckCircle2, Wallet } from "lucide-react";
import { colors } from "@/constants/colors";
import { investmentSummaryData } from "../../data/mockInvestmentData";

export const PayDownHeaderCards: React.FC = () => {
  const { remainingBalance, paidOffAmount, repaymentProgressPercent, walletAvailable } =
    investmentSummaryData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Outstanding Balance */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-sm flex items-start justify-between"
        style={{ borderColor: colors.border }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Outstanding Debt Balance
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-gray-900">
              ₦{remainingBalance.toLocaleString()}
            </div>
            <div className="text-xs text-amber-600 font-semibold mt-0.5">
              30% of initial ₦50M principal remaining
            </div>
          </div>
        </div>
      </div>

      {/* Paid Off To Date */}
      <div
        className="rounded-2xl p-5 border bg-white shadow-sm flex items-start justify-between"
        style={{ borderColor: colors.border }}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Principal Repaid to Date
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-emerald-600">
              ₦{paidOffAmount.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              {repaymentProgressPercent}% of total principal fully cleared
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Capital Available */}
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
              Available Liquid Capital
            </span>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-gray-900">
              ₦{walletAvailable.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              Ready for instant principal paydown
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
