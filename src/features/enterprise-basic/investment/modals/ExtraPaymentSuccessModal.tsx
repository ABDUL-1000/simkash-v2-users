import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { Check } from "lucide-react";

interface ExtraPaymentSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  balanceRemaining: number;
  receiptRef: string;
  onViewBalance: () => void;
}

export const ExtraPaymentSuccessModal: React.FC<
  ExtraPaymentSuccessModalProps
> = ({
  open,
  onOpenChange,
  amount,
  balanceRemaining,
  receiptRef,
  onViewBalance,
}) => {
  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="sm" footer={null}>
      <div className="py-2 text-center space-y-4 text-xs">
        {/* Emerald Checkmark Circle */}
        <div className="w-12 h-12 mx-auto rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-xs">
          <Check className="w-6 h-6 stroke-[3]" />
        </div>

        <h3 className="text-base font-bold text-slate-900">
          ₦{amount.toLocaleString()} Applied!
        </h3>

        {/* Breakdown List */}
        <div className="space-y-2 text-left font-medium text-xs px-2">
          <div className="flex justify-between text-slate-500">
            <span>Payment #</span>
            <span className="font-semibold text-slate-800">15 of 26</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Amount</span>
            <span className="font-bold text-slate-900">₦{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Balance</span>
            <span className="font-bold text-[#10B981]">
              ₦{balanceRemaining.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>% paid</span>
            <span className="font-bold text-[#10B981]">65%</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Periods left</span>
            <span className="font-semibold text-slate-800">10 remaining</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Next due</span>
            <span className="font-semibold text-slate-800">12 Jul 2026</span>
          </div>
          <div className="flex justify-between text-slate-400 text-[11px] pt-1">
            <span>Ref</span>
            <span className="font-mono text-slate-600">{receiptRef}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 px-2">
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#0F223D] rounded-full w-[65%]" />
          </div>
          <p className="text-[11px] text-center text-slate-400 font-semibold">
            65% cleared!
          </p>
        </div>

        {/* Saved Milestone Callout */}
        <div className="p-3 bg-[#ECFDF5] border border-emerald-200 rounded-xl text-center text-emerald-800 font-bold text-xs">
          You saved 2 payment periods!
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onViewBalance();
            }}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            View Balance
          </button>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold transition shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </AppModal>
  );
};
