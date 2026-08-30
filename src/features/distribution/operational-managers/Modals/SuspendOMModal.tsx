"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type SuspendOMModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
  onSuspendSuccess?: () => void;
};

export function SuspendOMModal({
  open,
  onOpenChange,
  userName = "Yusuf Adam Baba",
  onSuspendSuccess,
}: SuspendOMModalProps) {
  const [reason, setReason] = useState("");
  const [notifyUser, setNotifyUser] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Suspend Account"
      description={`${userName} · Operational Manager`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "suspend_account",
          label: "Suspend Account",
          variant: "danger",
          onClick: () => {
            onSuspendSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        <div className="rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-4 text-xs text-[#DC2626] font-medium leading-relaxed">
          Suspending this account immediately revokes dashboard access and logs the user out. They cannot log back in until reinstated.
        </div>

        <div className="rounded-2xl border border-[#F3E8FF] bg-[#FAF5FF] p-4 text-xs space-y-1">
          <div className="flex items-center gap-2">
            <strong className="font-bold text-[#0F172A] text-sm">{userName}</strong>
            <span className="flex items-center gap-1 font-bold text-[#9333EA]">
              <span className="size-2 rounded-full bg-[#9333EA]" />
              Operational Manager
            </span>
          </div>
          <p className="text-[11px] text-[#64748B]">yusufababah50@gmail.com</p>
          <span className="text-[11px] text-[#94A3B8]">Last login: 2 hours ago</span>
        </div>

        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Reason for suspension *
          </label>
          <textarea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Role no longer required"
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#DC2626] focus:outline-none text-xs"
          />
        </div>

        <label className="flex items-center gap-2 font-bold text-[#0F172A] cursor-pointer">
          <input
            type="checkbox"
            checked={notifyUser}
            onChange={(e) => setNotifyUser(e.target.checked)}
            className="size-4 rounded accent-[#2563EB]"
          />
          <span>Notify user by email and SMS</span>
        </label>
      </div>
    </AppModal>
  );
}
