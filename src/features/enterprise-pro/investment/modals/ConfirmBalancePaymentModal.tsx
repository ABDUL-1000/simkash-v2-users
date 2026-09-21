import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { AlertTriangle, Calendar, UserCheck } from "lucide-react";

interface ConfirmBalancePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payingAmount?: number;
  balanceBefore?: number;
  walletBefore?: number;
  onConfirm: () => void;
  onEditAmount?: () => void;
}

export function ConfirmBalancePaymentModal({
  open,
  onOpenChange,
  payingAmount = 2_847_000,
  balanceBefore = 7_500_000,
  walletBefore = 2_847_000,
  onConfirm,
  onEditAmount,
}: ConfirmBalancePaymentModalProps) {
  const [pin, setPin] = useState("");

  const balanceAfter = Math.max(0, balanceBefore - payingAmount);
  const walletAfter = Math.max(0, walletBefore - payingAmount);
  const totalPaid = 15_000_000 - balanceAfter;
  const percentCleared = ((totalPaid / 15_000_000) * 100).toFixed(1);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Balance Payment"
      description={`Reduce your remaining ₦${balanceBefore.toLocaleString()}`}
      size="md"
      footer={null}
    >
      <div className="space-y-3 pt-1 text-xs">
        {/* Payment Summary Box */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Payment Summary
          </span>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500">Paying</span>
            <span className="font-bold text-slate-900">₦{payingAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500">From</span>
            <span className="font-semibold text-emerald-600">Wallet earnings</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500">Toward</span>
            <span className="text-slate-700">50% balance</span>
          </div>
          <div className="flex justify-between py-0.5">
            <span className="text-slate-500">Balance before</span>
            <span className="text-slate-700">₦{balanceBefore.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-200 font-bold">
            <span className="text-slate-700">Balance after</span>
            <span className="text-emerald-600">₦{balanceAfter.toLocaleString()}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="w-full bg-amber-100 rounded-full h-2.5 overflow-hidden">
            <div className="bg-slate-900 h-full rounded-full" style={{ width: `${percentCleared}%` }} />
          </div>
          <div className="flex justify-between text-[10px] font-semibold mt-1">
            <span className="text-emerald-600">Paid: ₦{totalPaid.toLocaleString()} ({percentCleared}%)</span>
            <span className="text-amber-600">Remaining: ₦{balanceAfter.toLocaleString()}</span>
          </div>
        </div>

        {/* Wallet Impact */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Wallet Impact
          </span>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">Wallet before</span>
            <span className="text-slate-800 font-medium">₦{walletBefore.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-500">This payment</span>
            <span className="text-red-500 font-semibold">-₦{payingAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[11px] font-bold pt-1 border-t border-slate-200">
            <span className="text-slate-700">Wallet after</span>
            <span className="text-slate-900">₦{walletAfter.toLocaleString()}</span>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="flex items-start gap-2 rounded-xl bg-amber-50 p-2.5 text-amber-900 border border-amber-200 text-[11px]">
          <AlertTriangle className="size-4 text-amber-600 shrink-0 mt-0.5" />
          <p>Your wallet will be empty after this payment. No SIM orders can be placed until new earnings arrive.</p>
        </div>

        {/* Timeline Estimation */}
        <div className="flex items-start gap-2 rounded-xl bg-emerald-50 p-2.5 text-emerald-900 border border-emerald-200 text-[11px]">
          <Calendar className="size-4 text-emerald-600 shrink-0 mt-0.5" />
          <p>At current pace (~₦2.8M/month) the remaining ₦{balanceAfter.toLocaleString()} clears in approximately 1.7 months.</p>
        </div>

        {/* Advisor Notice */}
        <div className="flex items-center gap-2 rounded-xl bg-blue-50 p-2.5 text-blue-900 text-[11px]">
          <UserCheck className="size-4 text-blue-600 shrink-0" />
          <p>Kemi Ade will be notified of this balance payment automatically.</p>
        </div>

        {/* PIN Input */}
        <div className="text-center pt-1 space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
            ENTER PIN TO CONFIRM
          </label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={setPin}
              containerClassName="gap-2.5"
            >
              <InputOTPGroup className="gap-2.5">
                <InputOTPSlot
                  index={0}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
                <InputOTPSlot
                  index={1}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
                <InputOTPSlot
                  index={2}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
                <InputOTPSlot
                  index={3}
                  className="size-11 rounded-xl border border-slate-200 bg-slate-50 text-base font-bold text-slate-900 data-[active=true]:border-amber-600 data-[active=true]:ring-2 data-[active=true]:ring-amber-600/20"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onEditAmount || (() => onOpenChange(false))}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            ← Edit Amount
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl px-5 py-2.5 text-xs font-bold text-white shadow-sm transition bg-amber-500 hover:bg-amber-600 active:scale-[0.98]"
          >
            Pay ₦{payingAmount.toLocaleString()}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
export default ConfirmBalancePaymentModal;
