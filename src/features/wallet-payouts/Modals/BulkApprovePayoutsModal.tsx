"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type BulkApprovePayoutsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalAmount?: string;
  agentsCount?: number;
  requestsCount?: number;
  onApproveSuccess?: () => void;
};

export function BulkApprovePayoutsModal({
  open,
  onOpenChange,
  totalAmount = "₦8,700,000",
  agentsCount = 6,
  requestsCount = 32,
  onApproveSuccess,
}: BulkApprovePayoutsModalProps) {
  const [checks, setChecks] = useState({
    walletFunds: true,
    bankDetails: true,
    disbursement: true,
    adminLogs: true,
  });

  const [pin, setPin] = useState(["", "", "", "", "", ""]);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Bulk Approve Payouts"
      description={`${requestsCount} pending payouts across ${agentsCount} agents`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "approve_all",
          label: `Approve All — ${totalAmount}`,
          variant: "primary",
          onClick: () => {
            onApproveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Top 3 Stat Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-center">
            <strong className="text-base sm:text-lg font-extrabold text-[#059669] block">
              {totalAmount}
            </strong>
            <span className="text-[10px] text-[#64748B]">Total Payout</span>
          </div>

          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-center">
            <strong className="text-base sm:text-lg font-extrabold text-[#0F172A] block">
              {agentsCount}
            </strong>
            <span className="text-[10px] text-[#64748B]">Agents</span>
          </div>

          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-center">
            <strong className="text-base sm:text-lg font-extrabold text-[#0F172A] block">
              {requestsCount}
            </strong>
            <span className="text-[10px] text-[#64748B]">Requests</span>
          </div>
        </div>

        {/* Role Breakdown */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            ROLE BREAKDOWN
          </label>
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs space-y-2 divide-y divide-[#F1F5F9]">
            <div className="flex items-center justify-between pt-0.5">
              <span className="text-[#0F172A]">Agency Partners</span>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                  18 agents
                </span>
                <strong className="font-extrabold text-[#059669]">₦4,320,000</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[#0F172A]">Corporate Agents (SC)</span>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                  8 agents
                </span>
                <strong className="font-extrabold text-[#059669]">₦2,880,000</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[#0F172A]">Corporate Agents (RM)</span>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                  4 agents
                </span>
                <strong className="font-extrabold text-[#059669]">₦1,200,000</strong>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[#0F172A]">Enterprise</span>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                  2 agents
                </span>
                <strong className="font-extrabold text-[#059669]">₦300,000</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Wallet Check */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            PLATFORM WALLET CHECK
          </label>
          <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-xs space-y-2 divide-y divide-[#A7F3D0]">
            <div className="flex justify-between pt-0.5 text-[#64748B]">
              <span>Simkash Platform Balance</span>
              <strong className="font-bold text-[#059669]">₦24,300,000</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Required for Payout</span>
              <strong className="font-bold text-[#0F172A]">{totalAmount}</strong>
            </div>

            <div className="flex justify-between pt-2 text-[#64748B]">
              <span>Surplus After Payout</span>
              <strong className="font-extrabold text-[#059669]">✓ ₦15,600,000</strong>
            </div>
          </div>
        </div>

        {/* Amber Warning Banner */}
        <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#D97706] leading-relaxed font-medium">
          All {requestsCount} payouts will be processed simultaneously. Agents will be notified via push notification and SMS. This action cannot be undone.
        </div>

        {/* Confirm Approval Checkboxes */}
        <div>
          <label className="mb-2 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            CONFIRM APPROVAL
          </label>
          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium text-[#0F172A]">
              <input
                type="checkbox"
                checked={checks.walletFunds}
                onChange={(e) => setChecks({ ...checks, walletFunds: e.target.checked })}
                className="size-4 rounded border-[#CBD5E1] accent-[#10B981]"
              />
              <span>I have verified the platform wallet has sufficient funds</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-[#0F172A]">
              <input
                type="checkbox"
                checked={checks.bankDetails}
                onChange={(e) => setChecks({ ...checks, bankDetails: e.target.checked })}
                className="size-4 rounded border-[#CBD5E1] accent-[#10B981]"
              />
              <span>All agent bank account details are confirmed</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-[#0F172A]">
              <input
                type="checkbox"
                checked={checks.disbursement}
                onChange={(e) => setChecks({ ...checks, disbursement: e.target.checked })}
                className="size-4 rounded border-[#CBD5E1] accent-[#10B981]"
              />
              <span>I authorise this bulk disbursement of {totalAmount}</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-medium text-[#0F172A]">
              <input
                type="checkbox"
                checked={checks.adminLogs}
                onChange={(e) => setChecks({ ...checks, adminLogs: e.target.checked })}
                className="size-4 rounded border-[#CBD5E1] accent-[#10B981]"
              />
              <span>Admin logs will record this approval action</span>
            </label>
          </div>
        </div>

        {/* Authorise Bulk Payout PIN */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            AUTHORISE BULK PAYOUT (ADMIN PIN)
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
                className="flex-1 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] py-3 text-center font-bold text-[#0F172A] text-lg focus:border-[#10B981] focus:outline-none"
              />
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
