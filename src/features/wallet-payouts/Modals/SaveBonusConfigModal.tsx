"use client";

import { AppModal } from "@/components/common/AppModal";

type SaveBonusConfigModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmSuccess?: () => void;
};

export function SaveBonusConfigModal({
  open,
  onOpenChange,
  onConfirmSuccess,
}: SaveBonusConfigModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Save Bonus Configuration"
      description="Changes apply from next period only"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm_save",
          label: "Confirm & Save",
          variant: "primary",
          onClick: () => {
            onConfirmSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* CHANGES BEING SAVED */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs space-y-3">
          <span className="font-bold uppercase tracking-wide text-[#64748B] text-[10px] block">
            CHANGES BEING SAVED
          </span>

          <div className="space-y-1">
            <strong className="font-bold text-[#0F172A] block">State Coordinator</strong>
            <div className="flex justify-between text-[#64748B]">
              <span>Target:</span>
              <span className="font-bold">500 → <span className="text-[#059669]">600 activations</span></span>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>Reward:</span>
              <span className="font-bold">₦10,000 → <span className="text-[#059669]">₦12,000</span></span>
            </div>
          </div>

          <div className="space-y-1 pt-2 border-t border-[#E2E8F0]">
            <strong className="font-bold text-[#0F172A] block">Agency Partner</strong>
            <div className="flex justify-between text-[#64748B]">
              <span>Target:</span>
              <span className="font-bold">200 → <span className="text-[#059669]">300 activations</span></span>
            </div>
            <div className="flex justify-between text-[#64748B]">
              <span>Reward:</span>
              <span className="font-bold">₦5,000 → <span className="text-[#059669]">₦7,500</span></span>
            </div>
          </div>
        </div>

        {/* Amber Warning Box */}
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 text-xs text-[#D97706] leading-relaxed font-medium">
          These changes affect all State Coordinators / Agency Partners who do not have individual overrides. Changes take effect at the start of the next bonus period.
        </div>

        <div className="space-y-1 text-xs">
          <p className="text-[#64748B]">
            Changes apply from: <strong className="font-bold text-[#0F172A]">1 Jul 2026 (next month)</strong>
          </p>
          <p className="text-[11px] text-[#94A3B8]">
            Current period (Jun 2026) is unaffected — agents keep their existing targets for this month.
          </p>
        </div>
      </div>
    </AppModal>
  );
}
