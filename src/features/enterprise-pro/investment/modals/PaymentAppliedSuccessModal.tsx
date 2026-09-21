import { AppModal } from "@/components/common/AppModal";
import { Check, TrendingUp, UserCheck } from "lucide-react";

interface PaymentAppliedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount?: number;
  balanceBefore?: number;
  reference?: string;
  onViewBalance?: () => void;
  onContinueReinvesting?: () => void;
}

export function PaymentAppliedSuccessModal({
  open,
  onOpenChange,
  amount = 2_847_000,
  balanceBefore = 7_500_000,
  reference = "BAL-EP-2026-00847",
  onViewBalance,
  onContinueReinvesting,
}: PaymentAppliedSuccessModalProps) {
  const balanceAfter = Math.max(0, balanceBefore - amount);
  const totalPaid = 15_000_000 - balanceAfter;
  const percentCleared = ((totalPaid / 15_000_000) * 100).toFixed(1);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="md"
      footer={null}
    >
      <div className="pt-2 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <h3 className="text-xl font-bold text-slate-900">Payment Applied!</h3>

        {/* Receipt Box */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs text-left space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Payment Receipt
          </span>
          <div className="flex justify-between">
            <span className="text-slate-500">Amount paid</span>
            <span className="font-bold text-slate-900">₦{amount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Balance before</span>
            <span className="text-slate-700">₦{balanceBefore.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Balance after</span>
            <span className="font-bold text-emerald-600">₦{balanceAfter.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">% cleared</span>
            <span className="font-bold text-emerald-600">{percentCleared}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Wallet balance</span>
            <span className="font-semibold text-slate-900">₦0</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-200">
            <span className="text-slate-500">Ref</span>
            <span className="font-mono font-semibold text-slate-700">{reference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Time</span>
            <span className="text-slate-700">Just now</span>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden">
            <div className="bg-slate-900 h-full rounded-full" style={{ width: `${percentCleared}%` }} />
          </div>
          <p className="text-xs font-bold text-emerald-600 mt-1">
            {percentCleared}% of total balance cleared!
          </p>
        </div>

        {/* Pace */}
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-2.5 text-emerald-900 border border-emerald-200 text-xs text-left">
          <TrendingUp className="size-4 text-emerald-600 shrink-0" />
          <p>~1.7 months to clear remaining ₦{balanceAfter.toLocaleString()} at current earnings pace</p>
        </div>

        {/* Advisor */}
        <div className="flex items-center gap-2 rounded-xl bg-blue-50 p-2 text-blue-900 text-xs text-left">
          <UserCheck className="size-4 text-blue-600 shrink-0" />
          <p>Kemi Ade notified of your payment ✓</p>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <button
            type="button"
            onClick={onViewBalance || (() => onOpenChange(false))}
            className="text-slate-600 hover:text-slate-900 font-semibold"
          >
            View Balance
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onContinueReinvesting || (() => onOpenChange(false))}
              className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
            >
              Continue Reinvesting
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
export default PaymentAppliedSuccessModal;
