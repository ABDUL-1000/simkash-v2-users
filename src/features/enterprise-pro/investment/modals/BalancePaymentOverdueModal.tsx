import { AppModal } from "@/components/common/AppModal";
import { AlertTriangle, Phone, MessageSquare, DollarSign } from "lucide-react";

interface BalancePaymentOverdueModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  balanceRemaining?: number;
  daysOverdue?: number;
  onPayWhatICan?: () => void;
  onCallAdvisor?: () => void;
  onSendWhatsApp?: () => void;
}

export function BalancePaymentOverdueModal({
  open,
  onOpenChange,
  balanceRemaining = 7_500_000,
  daysOverdue = 24,
  onPayWhatICan,
  onCallAdvisor,
  onSendWhatsApp,
}: BalancePaymentOverdueModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Balance Payment Overdue"
      description="Suspension warning limits active"
      size="md"
      footer={null}
    >
      <div className="space-y-3 pt-1 text-xs">
        {/* Warning Banner */}
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-red-900 text-xs flex items-start gap-2">
          <AlertTriangle className="size-4 text-red-600 shrink-0 mt-0.5" />
          <p className="font-semibold leading-relaxed">
            Your balance payment is overdue. Please contact your account manager immediately to avoid account suspension.
          </p>
        </div>

        {/* Overdue Details */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-[11px] space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Balance remaining</span>
            <span className="font-bold text-amber-600">₦{balanceRemaining.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Payment due</span>
            <span className="font-semibold text-slate-800">1 Jun 2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Days overdue</span>
            <span className="font-bold text-red-600">{daysOverdue} days</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-200">
            <span className="text-slate-500">Late fee applied</span>
            <span className="font-semibold text-emerald-600">NO (No late fee)</span>
          </div>
        </div>

        {/* Account Manager Box */}
        <div className="rounded-xl bg-slate-900 text-white p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
              KA
            </div>
            <div>
              <span className="font-bold block text-xs">Kemi Ade</span>
              <span className="text-[11px] text-slate-400">08012345678</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onCallAdvisor}
            className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-bold hover:bg-red-700 transition"
          >
            Call Immediately
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={onCallAdvisor}
            className="w-full py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition flex items-center justify-center gap-1.5 shadow-sm"
          >
            <Phone className="size-3.5" />
            <span>Call Kemi Ade Now</span>
          </button>

          <button
            type="button"
            onClick={onSendWhatsApp}
            className="w-full py-2.5 rounded-xl border border-emerald-500 text-emerald-700 text-xs font-bold hover:bg-emerald-50 transition flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="size-3.5 text-emerald-600" />
            <span>Send WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              if (onPayWhatICan) onPayWhatICan();
            }}
            className="w-full py-2.5 rounded-xl border border-amber-400 bg-amber-50/50 text-amber-800 text-xs font-bold hover:bg-amber-100 transition flex items-center justify-center gap-1.5"
          >
            <DollarSign className="size-3.5 text-amber-600" />
            <span>Pay What I Can Now</span>
          </button>
        </div>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-[11px] text-slate-400 hover:text-slate-600 underline"
          >
            Acknowledge (snooze 24 hours)
          </button>
        </div>
      </div>
    </AppModal>
  );
}
export default BalancePaymentOverdueModal;
