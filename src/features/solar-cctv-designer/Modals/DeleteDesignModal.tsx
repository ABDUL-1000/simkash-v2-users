"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type DeleteDesignModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  designRef?: string;
  userName?: string;
  estimate?: string;
  onDeleteSuccess?: () => void;
};

export function DeleteDesignModal({
  open,
  onOpenChange,
  designRef = "SOL-2026-00847",
  userName = "Chidi Eze",
  estimate = "₦1,209,000",
  onDeleteSuccess,
}: DeleteDesignModalProps) {
  const [reason, setReason] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Design"
      description={designRef}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "delete_design",
          label: "Delete Design",
          variant: "danger",
          onClick: () => {
            onDeleteSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Amber Warning Card */}
        <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB] p-3.5 text-xs text-[#D97706] font-medium leading-relaxed border-l-4 border-l-[#D97706]">
          Deleting this design removes it permanently. If the user has already converted it to a cart or order, the order is unaffected.
        </div>

        {/* Design Info Box */}
        <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-4 text-xs space-y-1">
          <strong className="font-bold text-[#0F172A] block text-sm">
            {designRef} · {userName}
          </strong>
          <p className="text-[11px] text-[#64748B]">Standard · {estimate} estimate</p>
          <span className="text-[11px] text-[#94A3B8]">Created 24 Jun 2026</span>
        </div>

        {/* REASON (OPTIONAL) */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            REASON (OPTIONAL)
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Please state the reason for deleting this design..."
            className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 font-medium text-[#0F172A] focus:border-[#DC2626] focus:outline-none text-xs"
          />
        </div>
      </div>
    </AppModal>
  );
}
