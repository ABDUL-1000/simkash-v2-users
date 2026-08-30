"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type ResolveTicketModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId?: string;
  onResolveSuccess?: () => void;
};

export function ResolveTicketModal({
  open,
  onOpenChange,
  ticketId = "TKT-2026-00847",
  onResolveSuccess,
}: ResolveTicketModalProps) {
  const [resolutionNote, setResolutionNote] = useState(
    "Issue resolved — SIM 07022222222 has been activated successfully after network sync fix."
  );
  const [sendSummary, setSendSummary] = useState(true);
  const [requestRating, setRequestRating] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Resolve Ticket"
      description={ticketId}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "mark_resolved",
          label: "Mark as Resolved",
          variant: "success",
          onClick: () => {
            onResolveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Ticket Context Box */}
        <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-xs space-y-1">
          <strong className="font-bold text-[#0F172A] block text-sm">
            SIM not activating after distribution
          </strong>
          <p className="text-[11px] text-[#64748B]">Chidi Eze · Agency Partner</p>
          <p className="text-[11px] text-[#94A3B8]">SIM Issues · Open since 24 Jun 2026</p>
        </div>

        {/* Resolution Note * */}
        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Resolution Note *
          </label>
          <textarea
            rows={4}
            value={resolutionNote}
            onChange={(e) => setResolutionNote(e.target.value)}
            placeholder="Type resolution details..."
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#059669] focus:outline-none text-xs"
          />
        </div>

        {/* Checkboxes */}
        <div className="space-y-2 text-xs font-bold text-[#0F172A]">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={sendSummary}
              onChange={(e) => setSendSummary(e.target.checked)}
              className="size-4 rounded accent-[#059669]"
            />
            <span>Send resolution summary to user</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={requestRating}
              onChange={(e) => setRequestRating(e.target.checked)}
              className="size-4 rounded accent-[#059669]"
            />
            <span>Request satisfaction rating from user</span>
          </label>
        </div>
      </div>
    </AppModal>
  );
}
