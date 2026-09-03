import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface CancelRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestCancelled?: () => void;
}

export function CancelRequestModal({
  open,
  onOpenChange,
  onRequestCancelled,
}: CancelRequestModalProps) {
  const [reason, setReason] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmCancel = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onOpenChange(false);
      onRequestCancelled?.();
    }, 1000);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Cancel SIM Request"
      description="This action cannot be undone"
      size="md"
    >
      <div className="space-y-4 pt-1">
        {/* Warning Banner */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3.5 text-xs text-[#D9990D]">
          <AlertTriangle className="size-4 shrink-0 mt-0.5" />
          <p>
            Cancellation requests are processed within 24 hours. You may not be able to re-request immediately.
          </p>
        </div>

        {/* Request Summary Receipt Card */}
        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
          <div className="flex justify-between py-2 first:pt-0 last:pb-0">
            <span className="text-[#8C909B]">Reference</span>
            <span className="font-bold text-[#0F152A]">#SKR-2024-001</span>
          </div>
          <div className="flex justify-between py-2 first:pt-0 last:pb-0">
            <span className="text-[#8C909B]">SIM Type</span>
            <span className="font-bold text-[#0F152A]">MTN POS SIM</span>
          </div>
          <div className="flex justify-between py-2 first:pt-0 last:pb-0">
            <span className="text-[#8C909B]">Delivery Area</span>
            <span className="font-bold text-[#0F152A]">Lagos · Eti-Osa</span>
          </div>
          <div className="flex justify-between py-2 first:pt-0 last:pb-0">
            <span className="text-[#8C909B]">Submitted</span>
            <span className="font-bold text-[#0F152A]">12 Jul 2026</span>
          </div>
        </div>

        {/* Reason Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F152A]">
            Reason for cancellation
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
          >
            <option value="">Select a reason</option>
            <option value="mistake">Ordered by mistake</option>
            <option value="delay">Took too long to process</option>
            <option value="no-longer-needed">No longer needed</option>
            <option value="wrong-address">Entered wrong delivery address</option>
          </select>
        </div>

        {/* Additional Context Textarea */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F152A]">
            Tell us more (optional)
          </label>
          <textarea
            rows={3}
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            placeholder="Additional context..."
            className="w-full rounded-2xl border border-[#E2ECF6] p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50"
          >
            Keep Request
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleConfirmCancel}
            className="rounded-xl bg-[#EF4444] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-red-600 disabled:opacity-50"
          >
            {isLoading ? "Cancelling..." : "Cancel Request"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
