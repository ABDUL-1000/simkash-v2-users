"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type OrderDisputeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderRef?: string;
  onResolveSuccess?: () => void;
};

export function OrderDisputeModal({
  open,
  onOpenChange,
  orderRef = "ORD-2026-00847",
  onResolveSuccess,
}: OrderDisputeModalProps) {
  const [vendorResponse, setVendorResponse] = useState("");
  const [resolutionAction, setResolutionAction] = useState("");
  const [adminNotes, setAdminNotes] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Order Dispute"
      description={`${orderRef} · Buyer vs Vendor`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "resolve",
          label: "Submit Resolution",
          variant: "primary",
          onClick: () => {
            onResolveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Dispute Banner */}
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#D97706] text-sm">Raised by Buyer</span>
            <span className="rounded-md bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">
              DISPUTE
            </span>
          </div>
          <p className="text-[11px] text-[#64748B]">Chidi Eze · 01 Jul 2026, 14:32</p>
          <p className="font-medium text-[#0F172A]">
            Item received damaged — outer packaging torn and unit was non-functional.
          </p>
        </div>

        {/* Evidence Photos */}
        <div>
          <label className="mb-2 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            BUYER EVIDENCE (3 photos)
          </label>
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="flex h-16 w-20 items-center justify-center rounded-xl bg-[#475569] font-bold text-white text-xs shadow-xs"
              >
                Photo {num}
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Response */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            VENDOR RESPONSE
          </label>
          <textarea
            rows={3}
            value={vendorResponse}
            onChange={(e) => setVendorResponse(e.target.value)}
            placeholder="Add vendor response or investigation notes..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* Resolution Action */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            RESOLUTION ACTION
          </label>
          <select
            value={resolutionAction}
            onChange={(e) => setResolutionAction(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          >
            <option value="">Select resolution... ▾</option>
            <option value="Refund Buyer Full Amount">Refund Buyer Full Amount</option>
            <option value="Replace Item">Replace Item</option>
            <option value="Release Payment to Vendor">Release Payment to Vendor</option>
            <option value="Partial Refund">Partial Refund</option>
          </select>
        </div>

        {/* Admin Notes */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            ADMIN NOTES
          </label>
          <textarea
            rows={3}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Internal notes for this dispute..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>
      </div>
    </AppModal>
  );
}
