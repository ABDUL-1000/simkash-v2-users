"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type RejectPayoutRequestModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName?: string;
  amount?: string;
  onConfirmSuccess?: () => void;
};

export function RejectPayoutRequestModal({
  open,
  onOpenChange,
  agentName = "Rabiu Sani",
  amount = "₦45,000",
  onConfirmSuccess,
}: RejectPayoutRequestModalProps) {
  const [reason, setReason] = useState("Account verification issue");
  const [notes, setNotes] = useState("");
  const [notifyAgent, setNotifyAgent] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Reject Payout Request"
      description={`${agentName} · ${amount}`}
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
        {/* Agent Summary Card */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-1">
          <div className="flex items-center justify-between">
            <strong className="text-sm font-extrabold text-[#0F172A]">{agentName}</strong>
            <strong className="text-base font-extrabold text-[#0F172A]">{amount}</strong>
          </div>
          <p className="text-[11px] text-[#64748B]">Agency Partner · Lagos</p>
          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Bank account</span>
            <strong className="font-bold text-[#0F172A]">Access Bank ****0476</strong>
          </div>
        </div>

        {/* Rejection Reason */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Rejection reason *
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="Account verification issue">Account verification issue</option>
            <option value="Insufficient activity">Insufficient activity</option>
            <option value="Duplicate request">Duplicate request</option>
            <option value="Fraudulent activity">Fraudulent activity</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Additional notes (optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes for agent or internal record..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#0F172A]">
          <input
            type="checkbox"
            checked={notifyAgent}
            onChange={(e) => setNotifyAgent(e.target.checked)}
            className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
          />
          <span>Notify agent of rejection with reason</span>
        </label>

        {/* Amber Info Banner */}
        <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#D97706] leading-relaxed font-medium">
          Rejected amount returns to agent wallet as pending balance. Agent can re-request after resolving the issue.
        </div>
      </div>
    </AppModal>
  );
}
