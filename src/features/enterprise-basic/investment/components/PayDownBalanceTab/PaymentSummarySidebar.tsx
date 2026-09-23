import React from "react";

interface PaymentSummarySidebarProps {
  totalPrincipal: number;
  balancePaid: number;
  balanceRemaining: number;
  nextDueAmount: number;
  nextDueDate: string;
  onPayNext: () => void;
  onPayFull: () => void;
  onDownloadStatement?: () => void;
}

export const PaymentSummarySidebar: React.FC<PaymentSummarySidebarProps> = ({
  totalPrincipal,
  balancePaid,
  balanceRemaining,
  nextDueAmount,
  nextDueDate,
  onPayNext,
  onPayFull,
  onDownloadStatement,
}) => {
  return (
    <div className="space-y-4 text-xs font-medium">
      {/* Payment Summary Box */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3.5">
        <h4 className="font-bold text-slate-900 text-sm">Payment Summary</h4>

        <div className="space-y-2 divide-y divide-slate-100 text-xs">
          <div className="flex justify-between pt-1">
            <span className="text-slate-500">Total principal</span>
            <span className="font-bold text-slate-900">
              ₦{totalPrincipal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-slate-500">Total paid</span>
            <span className="font-bold text-emerald-600">
              ₦{balancePaid.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-slate-500">Remaining</span>
            <span className="font-bold text-amber-600">
              ₦{balanceRemaining.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-slate-500">Next due</span>
            <span className="font-extrabold text-slate-900">
              ₦{nextDueAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between pt-2">
            <span className="text-slate-500">Due date</span>
            <span className="font-semibold text-slate-800">{nextDueDate}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-2.5">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
          Quick Actions
        </span>

        <button
          type="button"
          onClick={onPayNext}
          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-xs"
        >
          Pay Next Instalment
        </button>

        <button
          type="button"
          onClick={onPayFull}
          className="w-full py-2.5 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold transition"
        >
          Pay Full Balance
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
