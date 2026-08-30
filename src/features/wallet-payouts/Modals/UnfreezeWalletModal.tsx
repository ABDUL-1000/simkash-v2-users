"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type UnfreezeWalletModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName?: string;
  onUnfreezeSuccess?: () => void;
};

export function UnfreezeWalletModal({
  open,
  onOpenChange,
  agentName = "Rabiu Sani",
  onUnfreezeSuccess,
}: UnfreezeWalletModalProps) {
  const [note, setNote] = useState("");
  const [conditionSatisfied, setConditionSatisfied] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Unfreeze Wallet"
      description={`${agentName} · Wallet frozen since...`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "unfreeze",
          label: "Unfreeze Wallet",
          variant: "primary",
          onClick: () => {
            onUnfreezeSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Green Info Banner */}
        <div className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs text-[#059669] leading-relaxed font-medium">
          Unfreezing will immediately restore full wallet access. The agent will be notified and can resume withdrawals and receive pending payouts.
        </div>

        {/* Freeze Details Card */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            FREEZE DETAILS
          </label>
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs space-y-2.5 divide-y divide-[#F1F5F9]">
            <div className="flex justify-between pt-0.5 text-[#64748B]">
              <span>Frozen By</span>
              <strong className="font-bold text-[#0F172A]">Admin — James Okafor</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Frozen On</span>
              <strong className="font-bold text-[#0F172A]">28 May 2025</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Reason</span>
              <strong className="font-bold text-[#0F172A]">Suspicious withdrawal pattern</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Lift Condition</span>
              <strong className="font-bold text-[#0F172A]">Submit KYC documents</strong>
            </div>
          </div>
        </div>

        {/* Accumulated During Freeze */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            ACCUMULATED DURING FREEZE
          </label>
          <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-xs space-y-2.5 divide-y divide-[#A7F3D0]">
            <div className="flex justify-between pt-0.5 text-[#64748B]">
              <span>Commissions Pending</span>
              <strong className="font-bold text-[#059669]">₦43,200</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Total Wallet Balance</span>
              <strong className="font-extrabold text-[#059669]">₦124,500</strong>
            </div>
          </div>
        </div>

        {/* Note Input */}
        <div>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note about why the freeze is being lifted (optional)..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#0F172A]">
          <input
            type="checkbox"
            checked={conditionSatisfied}
            onChange={(e) => setConditionSatisfied(e.target.checked)}
            className="size-4 rounded border-[#CBD5E1] accent-[#10B981]"
          />
          <span>I confirm the lift condition has been satisfied</span>
        </label>
      </div>
    </AppModal>
  );
}
