"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertCircle } from "lucide-react";

type EscalateTicketModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId?: string;
  onEscalateSuccess?: () => void;
};

export function EscalateTicketModal({
  open,
  onOpenChange,
  ticketId = "TKT-2026-00847",
  onEscalateSuccess,
}: EscalateTicketModalProps) {
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Escalate Ticket"
      description={ticketId}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "escalate",
          label: "Escalate",
          variant: "primary",
          onClick: () => {
            onEscalateSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Amber Warning Card */}
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 text-xs text-[#D97706] flex items-start gap-3">
          <AlertCircle className="size-5 shrink-0 text-[#D97706] mt-0.5" />
          <p className="font-medium leading-relaxed">
            Escalating will flag this ticket as urgent and notify senior admin.
          </p>
        </div>

        {/* Escalation Reason * */}
        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Escalation Reason *
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#D97706] focus:outline-none text-xs"
          >
            <option value="">Select reason...</option>
            <option value="sla_breach">SLA breach</option>
            <option value="tech_issue">Technical issue beyond scope</option>
            <option value="fraud">Fraud suspected</option>
            <option value="repeated">Repeated unresolved issue</option>
          </select>
          <span className="text-[10px] text-[#94A3B8] block mt-1">
            Common reasons: SLA breach, Technical issue beyond scope, Fraud suspected, Repeated unresolved issue.
          </span>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Additional Notes
          </label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any context..."
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#D97706] focus:outline-none text-xs"
          />
        </div>
      </div>
    </AppModal>
  );
}
