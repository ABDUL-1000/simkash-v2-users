"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type ReinstateGMModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
  onReinstateSuccess?: () => void;
};

export function ReinstateGMModal({
  open,
  onOpenChange,
  userName = "Yusuf Adam Baba",
  onReinstateSuccess,
}: ReinstateGMModalProps) {
  const [reason, setReason] = useState("");
  const [notifyUser, setNotifyUser] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Reinstate Account"
      description={`${userName} · General Manager`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "reinstate_account",
          label: "Reinstate Account",
          variant: "success",
          onClick: () => {
            onReinstateSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Green Restoration Notice Card */}
        <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-xs text-[#059669] font-medium leading-relaxed">
          Reinstating will immediately restore this user's General Manager dashboard access.
        </div>

        {/* User Info Box */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-1">
          <div className="flex items-center gap-2">
            <strong className="font-bold text-[#0F172A] text-sm">{userName}</strong>
            <span className="flex items-center gap-1 font-bold text-[#2563EB]">
              <span className="size-2 rounded-full bg-[#2563EB]" />
              General Manager
            </span>
          </div>
          <p className="text-[11px] text-[#64748B]">Suspended since: 5 Jul 2026</p>
          <span className="text-[11px] text-[#94A3B8]">Reason: Role review pending</span>
        </div>

        {/* Reason for reinstatement * */}
        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Reason for reinstatement *
          </label>
          <textarea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for reinstating this account"
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#059669] focus:outline-none text-xs"
          />
        </div>

        {/* Notify user checkbox */}
        <label className="flex items-center gap-2 font-bold text-[#0F172A] cursor-pointer">
          <input
            type="checkbox"
            checked={notifyUser}
            onChange={(e) => setNotifyUser(e.target.checked)}
            className="size-4 rounded accent-[#059669]"
          />
          <span>Notify user by email and SMS</span>
        </label>
      </div>
    </AppModal>
  );
}
