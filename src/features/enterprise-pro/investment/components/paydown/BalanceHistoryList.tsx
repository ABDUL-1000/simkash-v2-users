import React from "react";
import { ArrowDownLeft } from "lucide-react";
import { colors } from "@/constants/colors";
import { mockPaymentHistory } from "../../data/mockInvestmentData";

export const BalanceHistoryList: React.FC = () => {
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-gray-900">
            Payment & Paydown History
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            Audit trail of manual & automated balance amortizations
          </p>
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
          ₦35,000,000 Total Cleared
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {mockPaymentHistory.map((item) => (
          <div
            key={item.id}
            className="py-3 flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ArrowDownLeft className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-gray-900">{item.reference}</div>
                <div className="text-[11px] text-gray-400 mt-0.5">
                  {item.date} · via {item.paymentMethod}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-bold text-emerald-600">
                -₦{item.amount.toLocaleString()}
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">
                Bal: ₦{item.remainingBalanceAfter.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
