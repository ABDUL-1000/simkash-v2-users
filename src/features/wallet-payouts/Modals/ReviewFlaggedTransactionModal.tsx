"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type ReviewFlaggedTransactionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  txnRef?: string;
  amount?: string;
  agentName?: string;
  onSubmitSuccess?: () => void;
};

export function ReviewFlaggedTransactionModal({
  open,
  onOpenChange,
  txnRef = "TXN-2026-008472",
  amount = "+₦1,000",
  agentName = "Rabiu Sani",
  onSubmitSuccess,
}: ReviewFlaggedTransactionModalProps) {
  const [action, setAction] = useState<"dismiss" | "whitelist" | "reverse" | "escalate">("dismiss");
  const [notes, setNotes] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Review Flagged Transaction"
      description={`${txnRef} · Rapid Succession`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "submit_resolution",
          label: "Submit Resolution",
          variant: "primary",
          onClick: () => {
            onSubmitSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Top Flag Info Card */}
        <div className="rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-4 text-xs space-y-2.5 divide-y divide-[#FEE2E2]">
          <div className="flex justify-between pt-0.5 text-[#64748B]">
            <span>Flag reason</span>
            <strong className="font-bold text-[#DC2626]">Rapid Succession</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Flagged by</span>
            <strong className="font-bold text-[#0F172A]">System (Auto-detection)</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Flagged</span>
            <strong className="font-bold text-[#0F172A]">24 Jun 2026 · 03:47 PM</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Severity</span>
            <span className="rounded-md bg-[#DC2626] px-2 py-0.5 text-[10px] font-bold text-white">
              High
            </span>
          </div>
        </div>

        {/* Transaction Details Card */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            TRANSACTION DETAILS
          </label>
          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-2 divide-y divide-[#DBEAFE]">
            <div className="flex justify-between pt-0.5 text-[#64748B]">
              <span>Ref</span>
              <strong className="font-mono font-bold text-[#0F172A]">{txnRef}</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Type</span>
              <strong className="font-bold text-[#0F172A]">Commission Credit</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Agent</span>
              <strong className="font-bold text-[#0F172A]">{agentName}</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Amount</span>
              <strong className="font-extrabold text-[#059669]">{amount}</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Date</span>
              <strong className="font-bold text-[#0F172A]">24 Jun 2026 · 03:47 PM</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Status</span>
              <strong className="font-bold text-[#059669]">Completed</strong>
            </div>
          </div>
        </div>

        {/* Why it was flagged */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            WHY IT WAS FLAGGED
          </label>
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs space-y-3">
            <p className="text-[#0F172A] leading-relaxed font-medium">
              Agent {agentName} activated 12 SIMs within 4 minutes — exceeding the velocity threshold of 5 per 10 minutes.
            </p>

            <div className="space-y-1.5">
              {[
                { time: "03:47 PM", sim: "SIM 07022222222", amt: "+₦1,000" },
                { time: "03:47 PM", sim: "SIM 08065942373", amt: "+₦1,000" },
                { time: "03:48 PM", sim: "SIM 09122222222", amt: "+₦1,000" },
                { time: "03:48 PM", sim: "SIM 08120600542", amt: "+₦1,000" },
                { time: "03:48 PM", sim: "SIM 07055093537", amt: "+₦1,000" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-xl bg-white p-2 text-xs">
                  <span className="text-[11px] font-bold text-[#64748B]">{item.time}</span>
                  <span className="font-bold text-[#0F172A]">{item.sim}</span>
                  <strong className="font-extrabold text-[#059669]">{item.amt}</strong>
                </div>
              ))}
            </div>

            <button type="button" className="font-bold text-[#2563EB] text-[11px] hover:underline block pt-1">
              +7 more activations in this batch →
            </button>
          </div>
        </div>

        {/* Resolution Action */}
        <div>
          <label className="mb-2 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            RESOLUTION ACTION
          </label>
          <div className="space-y-2">
            {/* Option 1: Dismiss */}
            <div
              onClick={() => setAction("dismiss")}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all text-xs ${
                action === "dismiss"
                  ? "border-[#10B981] bg-[#ECFDF5]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <strong className="font-bold text-[#0F172A] block">Dismiss — No Issue</strong>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Transaction is legitimate. Remove flag and resume normal processing.
              </p>
            </div>

            {/* Option 2: Whitelist */}
            <div
              onClick={() => setAction("whitelist")}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all text-xs ${
                action === "whitelist"
                  ? "border-[#BFDBFE] bg-[#EFF6FF]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <strong className="font-bold text-[#0F172A] block">Confirm Legitimate — Add to Whitelist</strong>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Dismiss and whitelist this agent for bulk activations to prevent future false flags.
              </p>
            </div>

            {/* Option 3: Reverse */}
            <div
              onClick={() => setAction("reverse")}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all text-xs ${
                action === "reverse"
                  ? "border-[#FEF3C7] bg-[#FFFBEB]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <strong className="font-bold text-[#0F172A] block">Reverse Transaction</strong>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Debit {amount} from agent wallet. Mark SIM as unactivated.
              </p>
            </div>

            {/* Option 4: Escalate */}
            <div
              onClick={() => setAction("escalate")}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all text-xs ${
                action === "escalate"
                  ? "border-[#FECACA] bg-[#FFF1F2]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <strong className="font-bold text-[#0F172A] block">Escalate to Compliance</strong>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Send to compliance team for formal investigation. Freeze agent wallet pending review.
              </p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Review Notes *
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add review notes for audit trail..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#10B981] focus:outline-none text-xs"
          />
        </div>
      </div>
    </AppModal>
  );
}
