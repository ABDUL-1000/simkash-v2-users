"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type FlagTransactionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  txnRef?: string;
  amount?: string;
  agentName?: string;
  onSubmitSuccess?: () => void;
};

export function FlagTransactionModal({
  open,
  onOpenChange,
  txnRef = "TXN-2026-008472",
  amount = "+₦1,000",
  agentName = "Rabiu Sani",
  onSubmitSuccess,
}: FlagTransactionModalProps) {
  const [reason, setReason] = useState("Unusual amount for this agent");
  const [notes, setNotes] = useState("");
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium");
  const [pauseRelated, setPauseRelated] = useState(true);
  const [notifyAgent, setNotifyAgent] = useState(false);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Flag Transaction for Review"
      description={`${txnRef} · ${amount}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "submit_flag",
          label: "Submit Flag",
          variant: "danger",
          onClick: () => {
            onSubmitSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Summary Card */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-1.5 divide-y divide-[#DBEAFE]">
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
            <strong className="font-bold text-[#0F172A]">24 Jun 2026</strong>
          </div>
        </div>

        {/* Flag Reason */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Flag Reason *
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#F59E0B] focus:outline-none"
          >
            <option value="Unusual amount for this agent">Unusual amount for this agent</option>
            <option value="Rapid succession">Rapid succession</option>
            <option value="Duplicate transaction">Duplicate transaction</option>
            <option value="Velocity alert">Velocity alert</option>
            <option value="Other suspicious activity">Other suspicious activity</option>
          </select>
        </div>

        {/* Supporting Notes */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Supporting Notes *
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Describe why this transaction is being flagged..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#F59E0B] focus:outline-none text-xs"
          />
        </div>

        {/* Severity Level */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Severity Level
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSeverity("low")}
              className={`flex-1 rounded-full py-1.5 text-xs font-bold transition-all ${
                severity === "low"
                  ? "bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1]"
                  : "bg-white text-[#64748B] border border-[#E2E8F0]"
              }`}
            >
              Low
            </button>
            <button
              type="button"
              onClick={() => setSeverity("medium")}
              className={`flex-1 rounded-full py-1.5 text-xs font-bold transition-all ${
                severity === "medium"
                  ? "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]"
                  : "bg-white text-[#64748B] border border-[#E2E8F0]"
              }`}
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => setSeverity("high")}
              className={`flex-1 rounded-full py-1.5 text-xs font-bold transition-all ${
                severity === "high"
                  ? "bg-[#FFF1F2] text-[#DC2626] border border-[#FECACA]"
                  : "bg-white text-[#64748B] border border-[#E2E8F0]"
              }`}
            >
              High
            </button>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-2 pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#0F172A]">
            <input
              type="checkbox"
              checked={pauseRelated}
              onChange={(e) => setPauseRelated(e.target.checked)}
              className="size-4 rounded border-[#CBD5E1] accent-[#F59E0B]"
            />
            <span>Pause related transactions pending review</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#0F172A]">
            <input
              type="checkbox"
              checked={notifyAgent}
              onChange={(e) => setNotifyAgent(e.target.checked)}
              className="size-4 rounded border-[#CBD5E1] accent-[#F59E0B]"
            />
            <span>Notify agent that transaction is under review</span>
          </label>
        </div>
      </div>
    </AppModal>
  );
}
