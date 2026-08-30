"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type SuspendAccountModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountName?: string;
  phone?: string;
  role?: string;
  onConfirmSuccess?: () => void;
};

export function SuspendAccountModal({
  open,
  onOpenChange,
  accountName = "Elidan Corp",
  phone = "+234 803 456 7890",
  role = "Corporate Agent",
  onConfirmSuccess,
}: SuspendAccountModalProps) {
  const [reason, setReason] = useState("");
  const [liftCondition, setLiftCondition] = useState("");
  const [assetHandling, setAssetHandling] = useState<"now" | "later">("now");
  const [confirmed, setConfirmed] = useState(false);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Suspend Account"
      description="This will immediately lock all access"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: "Confirm Suspension",
          variant: "danger",
          onClick: () => {
            onConfirmSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Red Warning Banner */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-4 text-xs text-[#DC2626]">
          <AlertCircle className="mt-0.5 size-5 shrink-0" />
          <p className="leading-relaxed">
            Suspending this account will immediately log out the user, invalidate all sessions, block all activations, and freeze the wallet. This is different from PND.
          </p>
        </div>

        {/* Target Account Box */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0F172A] text-sm">{accountName}</span>
            <span className="rounded-full bg-[#DBEAFE] border border-[#BFDBFE] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
              {role}
            </span>
          </div>
          <p className="text-xs text-[#64748B]">{phone}</p>
          <p className="text-xs text-[#64748B]">
            Active since 15 Jan 2024 · 12 sub-agents · 847 SIMs · Wallet: ₦1,204,000
          </p>
        </div>

        {/* Reason for Suspension */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            REASON FOR SUSPENSION*
          </label>
          <textarea
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Activation target not met for 3 consecutive months"
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Lift Condition */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            LIFT CONDITION
          </label>
          <input
            type="text"
            value={liftCondition}
            onChange={(e) => setLiftCondition(e.target.value)}
            placeholder="e.g. Achieve 500 activations within 30 days of reinstatement"
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Asset Handling Cards */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B]">
            ASSET HANDLING
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setAssetHandling("now")}
              className={`cursor-pointer rounded-2xl border p-3.5 transition-all ${
                assetHandling === "now"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                <input
                  type="radio"
                  name="handling"
                  checked={assetHandling === "now"}
                  onChange={() => setAssetHandling("now")}
                  className="accent-[#2563EB]"
                />
                <span>Transfer Now</span>
              </div>
              <p className="mt-1 text-[11px] text-[#64748B] leading-snug">
                Proceed to asset transfer immediately after suspension is confirmed
              </p>
            </div>

            <div
              onClick={() => setAssetHandling("later")}
              className={`cursor-pointer rounded-2xl border p-3.5 transition-all ${
                assetHandling === "later"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-[#0F172A]">
                <input
                  type="radio"
                  name="handling"
                  checked={assetHandling === "later"}
                  onChange={() => setAssetHandling("later")}
                  className="accent-[#2563EB]"
                />
                <span>Transfer Later</span>
              </div>
              <p className="mt-1 text-[11px] text-[#64748B] leading-snug">
                Assets remain frozen until manually transferred. Account still suspended.
              </p>
            </div>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <label className="flex items-start gap-2.5 cursor-pointer text-xs font-medium text-[#0F172A]">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-0.5 size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
          />
          <span>I confirm the account holder will be notified and all sessions will be invalidated immediately</span>
        </label>
      </div>
    </AppModal>
  );
}
