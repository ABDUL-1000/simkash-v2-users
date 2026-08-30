"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type MarkDealLostModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orgName?: string;
  onConfirmSuccess?: () => void;
};

export function MarkDealLostModal({
  open,
  onOpenChange,
  orgName = "Lagos Estate Ltd",
  onConfirmSuccess,
}: MarkDealLostModalProps) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Mark Deal as Lost"
      description={orgName}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: "Mark Deal as Lost",
          variant: "danger",
          onClick: () => {
            onConfirmSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Reason for loss */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            Reason for loss *
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="">Select reason... ▾</option>
            <option value="Deal did not meet qualifying criteria">Deal did not meet qualifying criteria</option>
            <option value="Organisation cancelled">Organisation cancelled</option>
            <option value="Duplicate referral">Duplicate referral</option>
            <option value="No response">No response</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Internal notes */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            Internal notes (optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Brief explanation..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs text-[#64748B]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p className="leading-relaxed">
            No commission is paid for lost deals. The referrer will be notified that this deal did not close.
          </p>
        </div>
      </div>
    </AppModal>
  );
}
