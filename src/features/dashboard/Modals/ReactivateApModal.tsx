import { useState } from "react";
import { AlertCircle, Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface ReactivateApModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  apState?: string;
  suspendedDate?: string;
  suspendedReason?: string;
  customersCount?: number;
  simCount?: number;
  onSuccessReactivate?: (apName: string) => void;
}

export function ReactivateApModal({
  open,
  onOpenChange,
  apName = "Rabiu Sani",
  apState = "Lagos",
  suspendedDate = "22 Jun 2026",
  suspendedReason = "Fraudulent Activity",
  customersCount = 247,
  simCount = 0,
  onSuccessReactivate,
}: ReactivateApModalProps) {
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [pin, setPin] = useState("");

  const firstName = apName.split(" ")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed || pin.length < 4 || reason.trim().length < 5) return;
    onOpenChange(false);
    onSuccessReactivate?.(apName);
    setReason("");
    setConfirmed(false);
    setPin("");
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Reactivate Agency Partner"
      description={`${apName} · ${apState}`}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5 pt-1 text-xs">
        {/* Suspended Red Banner (Matching Image 5) */}
        <div className="rounded-r-2xl border-l-4 border-[#EF4444] bg-[#FFF1F2] p-3.5 space-y-0.5">
          <h4 className="font-extrabold text-[#EF4444] text-xs">
            Suspended since {suspendedDate}
          </h4>
          <p className="text-[11px] text-[#EF4444] font-medium">
            Reason: {suspendedReason}
          </p>
        </div>

        {/* Benefits Checklist Box (Matching Image 5) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 space-y-2 text-xs font-bold text-[#0F152A]">
          <div className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-[#10B981] stroke-[3]" />
            <span>{firstName}'s account becomes active</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-[#10B981] stroke-[3]" />
            <span>{customersCount} customers can renew SIMs</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-[#10B981] stroke-[3]" />
            <span>Stock distribution unlocked</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-[#10B981] stroke-[3]" />
            <span>{firstName} notified by SMS</span>
          </div>
        </div>

        {/* Yellow Warning Banner (Matching Image 5) */}
        {simCount === 0 && (
          <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#D9990D] font-bold flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0 text-[#D9990D]" />
            <span>
              {firstName} has {simCount} SIMs. Distribute stock after reactivation.
            </span>
          </div>
        )}

        {/* Reason for Reactivation */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">
            Reason for reactivation *
          </label>
          <textarea
            rows={3}
            placeholder="Minimum 20 characters"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2 font-bold text-[#0F152A] cursor-pointer pt-0.5">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="size-4 rounded border-[#E2ECF6] text-[#10B981] focus:ring-0"
          />
          <span>I confirm this reactivation</span>
        </label>

        {/* PIN Authorization */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#66738C] text-center block">
            ENTER PIN TO AUTHORIZE
          </label>
          <div className="flex justify-center">
            <InputOTP maxLength={4} value={pin} onChange={(v) => setPin(v)}>
              <InputOTPGroup className="gap-2">
                <InputOTPSlot index={0} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={1} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={2} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
                <InputOTPSlot index={3} className="size-11 text-base font-bold rounded-xl border border-[#E2ECF6]" />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Footer Actions (Matching Image 5) */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!confirmed || pin.length < 4 || reason.trim().length < 5}
            className="rounded-xl bg-[#10B981] px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 transition disabled:opacity-50"
          >
            Reactivate AP
          </button>
        </div>
      </form>
    </AppModal>
  );
}
