"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type ResetPasswordModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  onResetSuccess?: () => void;
};

export function ResetPasswordModal({
  open,
  onOpenChange,
  userName = "Yusuf Adam Baba",
  userEmail = "yusufababah50@gmail.com",
  userPhone = "08065942373",
  onResetSuccess,
}: ResetPasswordModalProps) {
  const [method, setMethod] = useState<"link" | "temp">("link");
  const [notifySms, setNotifySms] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Reset Password"
      description={userName}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "send_reset",
          label: "Send Reset",
          variant: "primary",
          onClick: () => {
            onResetSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        <div className="rounded-2xl border border-[#F3E8FF] bg-[#FAF5FF] p-4 text-xs space-y-1">
          <strong className="font-bold text-[#0F172A] block text-sm">{userName}</strong>
          <p className="text-[11px] text-[#64748B]">{userEmail}</p>
          <span className="text-[11px] text-[#94A3B8]">Last login: 2 hours ago</span>
        </div>

        <div>
          <label className="mb-2 block font-bold text-[#0F172A]">
            Reset method
          </label>
          <div className="space-y-2.5">
            <div
              onClick={() => setMethod("link")}
              className={`cursor-pointer rounded-2xl p-4 transition-all ${
                method === "link"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`size-3.5 rounded-full border-2 ${method === "link" ? "border-[#2563EB] bg-[#2563EB]" : "border-[#CBD5E1]"}`} />
                <strong className="font-bold text-[#0F172A] text-xs">Send Reset Link</strong>
              </div>
              <p className="text-[11px] text-[#64748B] mt-1 pl-5.5">
                Send a password reset link to {userEmail}
              </p>
            </div>

            <div
              onClick={() => setMethod("temp")}
              className={`cursor-pointer rounded-2xl p-4 transition-all ${
                method === "temp"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`size-3.5 rounded-full border-2 ${method === "temp" ? "border-[#2563EB] bg-[#2563EB]" : "border-[#CBD5E1]"}`} />
                <strong className="font-bold text-[#0F172A] text-xs">Generate Temp Password</strong>
              </div>
              <p className="text-[11px] text-[#64748B] mt-1 pl-5.5">
                Generate a temporary password and send via SMS to {userPhone}
              </p>
            </div>
          </div>
        </div>

        <label className="flex items-center gap-2 font-bold text-[#0F172A] cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={notifySms}
            onChange={(e) => setNotifySms(e.target.checked)}
            className="size-4 rounded accent-[#2563EB]"
          />
          <span>Also notify via SMS</span>
        </label>
      </div>
    </AppModal>
  );
}
