"use client";

import { AppModal } from "@/components/common/AppModal";

type ApprovePayoutRequestModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentName?: string;
  role?: string;
  amount?: string;
  onApproveSuccess?: () => void;
  onRejectClick?: () => void;
};

export function ApprovePayoutRequestModal({
  open,
  onOpenChange,
  agentName = "Rabiu Sani",
  role = "Agency Partner",
  amount = "₦45,000",
  onApproveSuccess,
  onRejectClick,
}: ApprovePayoutRequestModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Approve Payout Request"
      description={`${agentName} · ${role}`}
      size="md"
      actions={[
        {
          key: "reject",
          label: "Reject",
          variant: "danger",
          onClick: () => {
            onRejectClick?.();
          },
        },
        {
          key: "approve",
          label: `Approve — ${amount}`,
          variant: "primary",
          onClick: () => {
            onApproveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Agent Details Card */}
        <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-xs space-y-2">
          <div className="flex justify-between text-[#64748B]">
            <span>Agent</span>
            <strong className="font-bold text-[#0F172A]">{agentName}</strong>
          </div>

          <div className="flex justify-between text-[#64748B]">
            <span>Role</span>
            <strong className="font-bold text-[#0F172A]">{role} · Lagos</strong>
          </div>

          <div className="flex justify-between text-[#64748B]">
            <span>Payout type</span>
            <strong className="font-bold text-[#0F172A]">Commission</strong>
          </div>

          <div className="flex items-baseline justify-between pt-1 border-t border-[#A7F3D0]">
            <span className="text-2xl font-extrabold text-[#059669]">{amount}</span>
            <div className="text-right">
              <span className="text-[10px] text-[#64748B]">Requested</span>
              <p className="font-bold text-[#0F172A] text-xs">22 Jun 2026</p>
            </div>
          </div>
        </div>

        {/* Platform Wallet Impact */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Platform Wallet Impact
          </label>
          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-2.5 divide-y divide-[#DBEAFE]">
            <div className="flex justify-between pt-0.5 text-[#64748B]">
              <span>Platform balance</span>
              <strong className="font-bold text-[#0F172A]">₦847,200,000</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>This payout</span>
              <strong className="font-bold text-[#DC2626]">-₦45,000</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Balance after</span>
              <strong className="font-extrabold text-[#059669]">₦847,155,000</strong>
            </div>
          </div>
        </div>

        {/* Agent Wallet After Payout */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            Agent Wallet After Payout
          </label>
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs space-y-2.5 divide-y divide-[#F1F5F9]">
            <div className="flex justify-between pt-0.5 text-[#64748B]">
              <span>Current balance</span>
              <strong className="font-bold text-[#0F172A]">₦124,500</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Payout deducted</span>
              <strong className="font-bold text-[#DC2626]">-₦45,000</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Remaining balance</span>
              <strong className="font-extrabold text-[#059669]">₦79,500</strong>
            </div>
          </div>
        </div>

        {/* Bank Account Card */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-white p-3.5 text-xs">
          <div>
            <p className="font-bold text-[#0F172A]">Access Bank ****0476</p>
            <p className="text-[11px] text-[#64748B]">Account name: {agentName}</p>
          </div>
          <span className="rounded-md bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
            ✓ Verified
          </span>
        </div>

        {/* Info Notice Banner */}
        <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-xs text-[#2563EB] font-medium leading-relaxed">
          Payout will be processed within 4 hours of approval. Agent will be notified by SMS and push notification.
        </div>
      </div>
    </AppModal>
  );
}
