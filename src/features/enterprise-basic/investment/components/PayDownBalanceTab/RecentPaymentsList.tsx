import React from "react";
import type { RecentPayment } from "../../types";

interface RecentPaymentsListProps {
  payments: RecentPayment[];
}

export const RecentPaymentsList: React.FC<RecentPaymentsListProps> = ({
  payments,
}) => {
  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3.5 text-xs">
      <h4 className="font-bold text-slate-900 text-sm">Recent Payments</h4>

      <div className="divide-y divide-slate-100 font-medium">
        {payments.map((p) => (
          <div key={p.id} className="py-2.5 flex items-center justify-between">
            <span className="font-extrabold text-emerald-600 text-xs">
              ₦{p.amount.toLocaleString()}
            </span>
            <span className="text-slate-500 text-[11px]">{p.date}</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              Completed ✓
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
