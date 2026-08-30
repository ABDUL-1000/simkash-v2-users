"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type FreezeWalletModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName?: string;
  balance?: string;
  onFreezeSuccess?: () => void;
};

export function FreezeWalletModal({
  open,
  onOpenChange,
  agentName = "Rabiu Sani",
  balance = "₦124,500",
  onFreezeSuccess,
}: FreezeWalletModalProps) {
  const [reason, setReason] = useState("");
  const [liftCondition, setLiftCondition] = useState("");
  const [confirmAuth, setConfirmAuth] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Freeze Wallet"
      description={`${agentName} · ${balance} balance`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "freeze",
          label: "Freeze Wallet",
          variant: "danger",
          onClick: () => {
            onFreezeSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Red Warning Banner */}
        <div className="rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-4 text-xs text-[#DC2626] leading-relaxed">
          Freezing this wallet will prevent the agent from making withdrawals and receiving commission payouts. The agent can still log in and view their balance.
        </div>

        {/* Reason for Freeze */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            REASON FOR FREEZE
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe the reason for freezing this wallet..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* Lift Condition */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            LIFT CONDITION (Optional)
          </label>
          <input
            type="text"
            value={liftCondition}
            onChange={(e) => setLiftCondition(e.target.value)}
            placeholder="e.g. Submit ID verification, resolve dispute..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#0F172A]">
          <input
            type="checkbox"
            checked={confirmAuth}
            onChange={(e) => setConfirmAuth(e.target.checked)}
            className="size-4 rounded border-[#CBD5E1] accent-[#DC2626]"
          />
          <span>I confirm this freeze is authorised and the agent will be notified</span>
        </label>
      </div>
    </AppModal>
  );
}
