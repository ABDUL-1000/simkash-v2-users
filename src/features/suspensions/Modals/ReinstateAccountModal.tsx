"use client";

import { useState } from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type ReinstateAccountModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountName?: string;
  suspendedDate?: string;
  onReinstateSuccess?: () => void;
};

export function ReinstateAccountModal({
  open,
  onOpenChange,
  accountName = "Elidan Corp",
  suspendedDate = "14 Jun 2026",
  onReinstateSuccess,
}: ReinstateAccountModalProps) {
  const [reason, setReason] = useState("");
  const [notifySms, setNotifySms] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Reinstate Account"
      description={`${accountName} · Suspended ${suspendedDate}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "reinstate",
          label: "Reinstate Account",
          variant: "primary",
          onClick: () => {
            onReinstateSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Green Info Banner */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-xs text-[#059669]">
          <CheckCircle className="mt-0.5 size-5 shrink-0" />
          <p className="leading-relaxed font-medium">
            Reinstating this account will immediately restore login access and unfreeze the wallet. Assets that were transferred are NOT automatically returned.
          </p>
        </div>

        {/* Summary Card */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-2">
          <div className="flex justify-between text-[#64748B]">
            <span>Suspended:</span>
            <strong className="font-bold text-[#0F172A]">14 Jun 2026 (10 days)</strong>
          </div>

          <div className="flex justify-between text-[#64748B]">
            <span>Reason:</span>
            <strong className="font-bold text-[#0F172A]">Activation target not met for 3 consecutive months</strong>
          </div>

          <div className="flex justify-between items-center text-[#64748B]">
            <span>Transfer status:</span>
            <span className="rounded-full bg-[#FEF3C7] border border-[#FDE68A] px-2.5 py-0.5 text-[11px] font-bold text-[#D97706]">
              Pending
            </span>
          </div>
        </div>

        {/* Amber Warning Banner */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 text-xs text-[#92400E]">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-[#D97706]" />
          <p className="leading-relaxed">
            Asset transfer has not been completed. You can still reinstate but transferred assets will not be automatically returned.
          </p>
        </div>

        {/* Reinstatement Reason */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            REINSTATEMENT REASON*
          </label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Issue resolved — activation targets met for current month"
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* SMS Checkbox */}
        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#0F172A]">
          <input
            type="checkbox"
            checked={notifySms}
            onChange={(e) => setNotifySms(e.target.checked)}
            className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
          />
          <span>Notify account holder by SMS that their account has been reinstated</span>
        </label>
      </div>
    </AppModal>
  );
}
