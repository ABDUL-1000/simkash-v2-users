import { useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface SuspendScModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scName?: string;
  onConfirmSuspend?: () => void;
}

export function SuspendScModal({
  open,
  onOpenChange,
  scName = "Aminat Okafor",
  onConfirmSuspend,
}: SuspendScModalProps) {
  const [reason, setReason] = useState("");
  const [understood, setUnderstood] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuspend = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onConfirmSuspend?.();
    }, 600);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setReason("");
    setUnderstood(false);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={isSuccess ? "SC Suspended" : "Suspend State Coordinator"}
      description={
        isSuccess
          ? "Account access suspended"
          : `Temporarily restrict platform access for ${scName}`
      }
      size="md"
      showCloseButton={true}
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#FFF1F2] text-[#EF4444]">
            <CheckCircle2 className="size-8" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#0F152A]">State Coordinator Suspended</h3>
            <p className="mt-1 text-xs text-[#66738C]">
              {scName}&apos;s account has been placed on hold. They will not be able to distribute SIMs or manage APs until reactivated.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white transition hover:bg-[#1D4ED8]"
          >
            Done
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-1 text-xs">
          <div className="flex items-start gap-2.5 rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-3.5 text-[#991B1B]">
            <AlertTriangle className="size-5 shrink-0 text-[#EF4444] mt-0.5" />
            <p className="text-xs leading-relaxed text-[#7F1D1D]">
              Suspending <span className="font-bold">{scName}</span> will disable their ability to allocate stock to Agency Partners and pause bonus accrual.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              Reason for Suspension
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-white p-2.5 text-xs text-[#0F152A] focus:border-[#2563EB] focus:outline-hidden"
            >
              <option value="">Select a reason...</option>
              <option value="inactive">Prolonged inactivity</option>
              <option value="stock_discrepancy">Stock audit discrepancy</option>
              <option value="kyc">KYC verification issues</option>
              <option value="violation">Policy violation</option>
              <option value="other">Other reason</option>
            </select>
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={understood}
              onChange={(e) => setUnderstood(e.target.checked)}
              className="size-4 rounded-md border-[#CBD5E1] text-[#EF4444] focus:ring-[#EF4444]"
            />
            <span className="text-xs font-medium text-[#0F152A]">
              I understand this action will restrict their SC operations
            </span>
          </label>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] hover:bg-[#F1F5F9]"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!understood || !reason || isSubmitting}
              onClick={handleSuspend}
              className="rounded-xl bg-[#EF4444] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#DC2626] disabled:opacity-40"
              style={{ backgroundColor: understood && reason ? APP_COLORS.reds.red : "#F87171" }}
            >
              {isSubmitting ? "Suspending..." : "Suspend SC"}
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}

export default SuspendScModal;
