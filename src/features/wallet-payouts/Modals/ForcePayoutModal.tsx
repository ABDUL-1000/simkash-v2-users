"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type ForcePayoutModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName?: string;
  availableBalance?: string;
  onForceSuccess?: () => void;
};

export function ForcePayoutModal({
  open,
  onOpenChange,
  agentName = "Rabiu Sani",
  availableBalance = "₦124,500",
  onForceSuccess,
}: ForcePayoutModalProps) {
  const [payoutAmount, setPayoutAmount] = useState("124,500");
  const [reason, setReason] = useState("");
  const [pin, setPin] = useState(["", "", "", "", "", ""]);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Force Payout"
      description="Override standard payout schedule"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "force",
          label: `Force Payout — ₦${payoutAmount}`,
          variant: "primary",
          onClick: () => {
            onForceSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Amber Info Banner */}
        <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#D97706] leading-relaxed font-medium">
          Force payout bypasses the standard weekly schedule. Use only when agent has urgent verified need. All forced payouts are logged and reviewed.
        </div>

        {/* Agent Wallet Summary */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            AGENT WALLET
          </label>
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs space-y-2.5 divide-y divide-[#F1F5F9]">
            <div className="flex justify-between pt-0.5 text-[#64748B]">
              <span>Agent</span>
              <strong className="font-bold text-[#0F172A]">{agentName}</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Available Balance</span>
              <strong className="font-extrabold text-[#059669]">{availableBalance}</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Pending Commission</span>
              <strong className="font-bold text-[#D97706]">₦18,000</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Last Payout</span>
              <strong className="font-bold text-[#0F172A]">12 Jun 2025</strong>
            </div>
          </div>
        </div>

        {/* Payout Amount */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            PAYOUT AMOUNT
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 font-bold text-[#0F172A]">₦</span>
            <input
              type="text"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-8 pr-3.5 py-2.5 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
          <p className="mt-1 text-[10px] text-[#94A3B8]">
            Max: {availableBalance} · Min: ₦1,000
          </p>
        </div>

        {/* Reason */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            REASON FOR FORCE PAYOUT
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for override (required)..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* Admin PIN */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            ADMIN PIN
          </label>
          <div className="flex items-center justify-between gap-2">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
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
                className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] py-3 text-center font-bold text-[#0F172A] text-lg focus:border-[#2563EB] focus:outline-none"
              />
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
