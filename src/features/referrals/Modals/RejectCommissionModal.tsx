"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type RejectCommissionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  referrerName?: string;
  orgName?: string;
  onConfirmSuccess?: () => void;
};

export function RejectCommissionModal({
  open,
  onOpenChange,
  referrerName = "Bukhari Mohammed",
  orgName = "Lagos Estate Ltd",
  onConfirmSuccess,
}: RejectCommissionModalProps) {
  const [reason, setReason] = useState("Deal did not meet qualifying criteria");
  const [notes, setNotes] = useState("");
  const [notifyReferrer, setNotifyReferrer] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Reject Commission"
      description={`${referrerName}, ${orgName}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: "Confirm Rejection",
          variant: "danger",
          onClick: () => {
            onConfirmSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Warning Banner */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 text-xs text-[#92400E]">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[#D97706]" />
          <p className="leading-relaxed">
            Rejecting this commission means {referrerName} will not receive ₦50,000 for this referral. They will be notified with the reason provided.
          </p>
        </div>

        {/* Rejection reason */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            Rejection reason *
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="Deal did not meet qualifying criteria">Deal did not meet qualifying criteria</option>
            <option value="Duplicate referral">Duplicate referral</option>
            <option value="Invalid purchase">Invalid purchase</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Additional notes */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            Additional notes (optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add more context for the referrer..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#0F172A]">
          <input
            type="checkbox"
            checked={notifyReferrer}
            onChange={(e) => setNotifyReferrer(e.target.checked)}
            className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
          />
          <span>Notify referrer with reason</span>
        </label>
      </div>
    </AppModal>
  );
}
