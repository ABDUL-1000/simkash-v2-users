"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type RejectVendorApplicationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendorName?: string;
  location?: string;
  onConfirmSuccess?: () => void;
};

export function RejectVendorApplicationModal({
  open,
  onOpenChange,
  vendorName = "Femi Enterprises Ltd",
  location = "Lagos",
  onConfirmSuccess,
}: RejectVendorApplicationModalProps) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [notifyEmail, setNotifyEmail] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Reject Vendor Application"
      description={`${vendorName} · ${location}`}
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
        <div className="rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-4 text-xs text-[#DC2626] leading-relaxed">
          This action will permanently reject this vendor application. They will be notified and can reapply after 90 days.
        </div>

        {/* Rejection Reason */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            REJECTION REASON
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="">Select a reason... ▾</option>
            <option value="Invalid business documents">Invalid business documents</option>
            <option value="Failed address verification">Failed address verification</option>
            <option value="Unsupported product catalog">Unsupported product catalog</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            ADDITIONAL NOTES (Optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Provide any additional context for this rejection..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#0F172A]">
          <input
            type="checkbox"
            checked={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.checked)}
            className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
          />
          <span>Notify vendor by email with rejection reason</span>
        </label>
      </div>
    </AppModal>
  );
}
