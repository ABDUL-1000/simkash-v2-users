"use client";

import { AppModal } from "@/components/common/AppModal";

type RemoveIndividualOverrideModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName?: string;
  onRemoveSuccess?: () => void;
};

export function RemoveIndividualOverrideModal({
  open,
  onOpenChange,
  agentName = "Rabiu Sani",
  onRemoveSuccess,
}: RemoveIndividualOverrideModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Remove Override"
      description={`${agentName} · Agency Partner`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "remove_override",
          label: "Remove Override",
          variant: "danger",
          onClick: () => {
            onRemoveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Amber Warning Card */}
        <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB] p-4 text-xs text-[#D97706] leading-relaxed font-medium">
          Removing this override will revert {agentName} to the role-level default: 200 activations for ₦5,000 bonus. Takes effect from the next period.
        </div>

        {/* Current Override Card */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-2">
          <span className="font-bold text-[#2563EB] uppercase tracking-wide text-[10px] block">
            CURRENT OVERRIDE
          </span>
          <strong className="font-bold text-[#0F172A] block">Target: 500 activations (custom)</strong>
          <strong className="font-bold text-[#0F172A] block">Reward: ₦15,000 (custom)</strong>
          <span className="text-[11px] text-[#64748B] block pt-2 border-t border-[#DBEAFE]">
            Reverting to: 200 acts · ₦5,000 (role default)
          </span>
        </div>
      </div>
    </AppModal>
  );
}
