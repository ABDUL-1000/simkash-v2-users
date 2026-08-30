"use client";

import { useState } from "react";
import { Info, Calendar } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type MarkDealClosedModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orgName?: string;
  onConfirmSuccess?: () => void;
};

export function MarkDealClosedModal({
  open,
  onOpenChange,
  orgName = "Lagos Estate Ltd",
  onConfirmSuccess,
}: MarkDealClosedModalProps) {
  const [purchaseAmount, setPurchaseAmount] = useState("450,000");
  const [dateClosed, setDateClosed] = useState("Sep 12, 2024");
  const [dealType, setDealType] = useState("SIM subscription");
  const [notes, setNotes] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Mark Deal as Closed"
      description={`${orgName} - In Review`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: "Mark as Closed",
          variant: "primary",
          onClick: () => {
            onConfirmSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Info Banner */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs text-[#2563EB]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p className="leading-relaxed">
            Marking this deal closed will queue ₦50,000 commission for the referrer pending approval. You can approve or reject separately.
          </p>
        </div>

        {/* Qualifying purchase amount */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            Qualifying purchase amount
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 font-bold text-[#64748B]">₦</span>
            <input
              type="text"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] pl-8 pr-3.5 py-2.5 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* Date deal closed */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            Date deal closed
          </label>
          <div className="relative">
            <input
              type="text"
              value={dateClosed}
              onChange={(e) => setDateClosed(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
            <Calendar className="absolute right-3.5 top-3 size-4 text-[#64748B]" />
          </div>
        </div>

        {/* Deal type */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            Deal type
          </label>
          <select
            value={dealType}
            onChange={(e) => setDealType(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="SIM subscription">SIM subscription</option>
            <option value="Device purchase">Device purchase</option>
            <option value="Corporate contract">Corporate contract</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Internal notes */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            Internal notes (optional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes for internal audit..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>
    </AppModal>
  );
}
