"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type ReverseTransactionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  txnRef?: string;
  amount?: string;
  agentName?: string;
  onReverseSuccess?: () => void;
};

export function ReverseTransactionModal({
  open,
  onOpenChange,
  txnRef = "TXN-2026-008472",
  amount = "₦1,000",
  agentName = "Rabiu Sani",
  onReverseSuccess,
}: ReverseTransactionModalProps) {
  const [reason, setReason] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Reverse Transaction"
      description={`${txnRef} · This cannot be undone`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm_reversal",
          label: "Confirm Reversal",
          variant: "danger",
          onClick: () => {
            onReverseSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Red Warning Banner */}
        <div className="rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-4 text-xs text-[#DC2626] leading-relaxed">
          Reversing this transaction will debit {amount} from {agentName}'s wallet, mark SIM 07022222222 as unactivated, and log a reversal record. The agent will be notified.
        </div>

        {/* Summary Card */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-2 divide-y divide-[#DBEAFE]">
          <div className="flex justify-between pt-0.5 text-[#64748B]">
            <span>Ref</span>
            <strong className="font-mono font-bold text-[#0F172A]">{txnRef}</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Original Amount</span>
            <strong className="font-extrabold text-[#059669]">+{amount}</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Agent</span>
            <strong className="font-bold text-[#0F172A]">{agentName}</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Date</span>
            <strong className="font-bold text-[#0F172A]">24 Jun 2026 · 03:47 PM</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Original Status</span>
            <strong className="font-bold text-[#059669]">Completed</strong>
          </div>
        </div>

        {/* Impact After Reversal Card */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            IMPACT AFTER REVERSAL
          </label>
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs space-y-2 divide-y divide-[#F1F5F9]">
            <div className="flex justify-between pt-0.5 text-[#64748B]">
              <span>Agent wallet</span>
              <strong className="font-bold text-[#0F172A]">₦124,500 → ₦123,500</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>SIM status</span>
              <strong className="font-bold text-[#0F172A]">Activated → Unactivated</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Commission</span>
              <strong className="font-bold text-[#DC2626]">Reversed</strong>
            </div>
          </div>
        </div>

        {/* Amber Info Banner */}
        <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#D97706] leading-relaxed font-medium">
          Reversals are only available within 24 hours of transaction. 6 hours 12 minutes remaining.
        </div>

        {/* Reason for Reversal */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Reason for Reversal *
          </label>
          <textarea
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="State the reason for reversing this transaction..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#DC2626] focus:outline-none text-xs"
          />
        </div>

        {/* Authorise Reversal PIN */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px] text-center">
            AUTHORISE REVERSAL
          </label>
          <div className="flex items-center justify-center gap-3">
            {[0, 1, 2, 3].map((idx) => (
              <input
                key={idx}
                type="password"
                maxLength={1}
                value={pin[idx]}
                onChange={(e) => {
                  const newPin = [...pin];
                  newPin[idx] = e.target.value;
                  setPin(newPin);
                }}
                className="size-12 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] py-3 text-center font-bold text-[#0F172A] text-lg focus:border-[#DC2626] focus:outline-none"
              />
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
