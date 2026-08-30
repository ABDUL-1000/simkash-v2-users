"use client";

import { Check, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type ApproveReferralCommissionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  referrerName?: string;
  commissionAmount?: string;
  orgName?: string;
  onApproveSuccess?: () => void;
};

export function ApproveReferralCommissionModal({
  open,
  onOpenChange,
  referrerName = "Bukhari Mohammed",
  commissionAmount = "₦50,000",
  orgName = "Lagos Estate Ltd",
  onApproveSuccess,
}: ApproveReferralCommissionModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Approve Referral Commission"
      description={`Release ${commissionAmount} to ${referrerName}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "approve",
          label: `Approve Release ${commissionAmount}`,
          variant: "primary",
          onClick: () => {
            onApproveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Verified Checklist Box */}
        <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-xs text-[#059669] space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <Check className="size-4 text-[#059669]" />
            <span>Deal verified: {orgName}</span>
          </div>
          <div className="flex items-center gap-2 font-bold">
            <Check className="size-4 text-[#059669]" />
            <span>Qualifying purchase: ₦450,000</span>
          </div>
          <div className="flex items-center gap-2 font-bold">
            <Check className="size-4 text-[#059669]" />
            <span>Referrer: {referrerName} (Corp Agent)</span>
          </div>
          <div className="flex items-center gap-2 font-bold">
            <Check className="size-4 text-[#059669]" />
            <span>Commission: {commissionAmount}</span>
          </div>
        </div>

        {/* Financial Summary Card */}
        <div className="rounded-2xl bg-[#EFF6FF] p-4 text-xs space-y-2.5">
          <div className="flex justify-between text-[#64748B]">
            <span>Commission amount</span>
            <strong className="font-bold text-[#0F172A]">{commissionAmount}</strong>
          </div>

          <div className="flex justify-between text-[#64748B]">
            <span>Referrer wallet</span>
            <strong className="font-bold text-[#0F172A]">₦124,500</strong>
          </div>

          <div className="border-t border-[#BFDBFE] pt-2 flex justify-between">
            <span className="font-medium text-[#64748B]">Balance after</span>
            <strong className="font-extrabold text-[#059669] text-sm">₦174,500</strong>
          </div>

          <div className="flex justify-between text-[#64748B]">
            <span>Method</span>
            <strong className="font-bold text-[#0F172A]">Wallet credit</strong>
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-2.5 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5 text-xs text-[#2563EB]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p className="leading-relaxed">
            Once approved, {commissionAmount} is credited instantly to {referrerName} wallet. Notified by push and SMS.
          </p>
        </div>
      </div>
    </AppModal>
  );
}
