"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type ChangeRoleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName?: string;
  onChangeSuccess?: () => void;
};

export function ChangeRoleModal({
  open,
  onOpenChange,
  userName = "Yusuf Adam Baba",
  onChangeSuccess,
}: ChangeRoleModalProps) {
  const [selectedRole, setSelectedRole] = useState("general");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Change Role"
      description={`${userName} · Currently: Operational Manager`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm_change",
          label: "Confirm Change",
          variant: "primary",
          onClick: () => {
            onChangeSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        <div className="space-y-1">
          <span className="rounded-xl bg-[#F3E8FF] px-3 py-1 font-bold text-[#9333EA] text-xs inline-block">
            • Operational Manager
          </span>
          <p className="text-[11px] text-[#64748B]">Assigned 14 Jan 2026</p>
        </div>

        <div className="space-y-2">
          <span className="font-bold uppercase tracking-wide text-[#64748B] text-[10px] block">
            CHANGE TO A DIFFERENT ROLE:
          </span>

          <div className="space-y-2.5">
            <div
              onClick={() => setSelectedRole("investor")}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all ${
                selectedRole === "investor"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 font-bold text-[#059669] text-[11px] inline-block mb-1">
                • Investor
              </span>
              <p className="text-[11px] text-[#64748B]">
                Wallet · Bills · Device SIM · Investment · eSIM · Transactions
              </p>
            </div>

            <div
              onClick={() => setSelectedRole("general")}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all ${
                selectedRole === "general"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 font-bold text-[#2563EB] text-[11px] inline-block mb-1">
                • General Manager
              </span>
              <p className="text-[11px] text-[#64748B]">Same access as Operational Manager</p>
            </div>

            <div className="rounded-2xl p-3.5 border border-[#E2E8F0] bg-[#F8FAFC] opacity-60 cursor-not-allowed">
              <span className="rounded-md bg-[#F3E8FF] px-2 py-0.5 font-bold text-[#9333EA] text-[11px] inline-block mb-1">
                • Operational Manager <span className="font-normal text-[#64748B]">(current)</span>
              </span>
              <p className="text-[11px] text-[#64748B]">Current role</p>
            </div>

            <div
              onClick={() => setSelectedRole("regional")}
              className={`cursor-pointer rounded-2xl p-3.5 border transition-all ${
                selectedRole === "regional"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 font-bold text-[#D97706] text-[11px] inline-block mb-1">
                • Regional Manager
              </span>
              <p className="text-[11px] text-[#64748B]">
                Device SIM with Inventory + State Coordinators
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB] p-3.5 text-xs text-[#D97706] font-medium leading-relaxed">
          Role change takes effect immediately. User will be notified and their dashboard will update on next login.
        </div>
      </div>
    </AppModal>
  );
}
