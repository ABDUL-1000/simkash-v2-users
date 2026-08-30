"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Check } from "lucide-react";

type AssignRMModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssignSuccess?: () => void;
};

export function AssignRMModal({
  open,
  onOpenChange,
  onAssignSuccess,
}: AssignRMModalProps) {
  const [search, setSearch] = useState("");

  const permissions = [
    "Dashboard",
    "My Wallet",
    "Bills Payments",
    "Device SIM (Overview · Inventory · State Coordinators)",
    "eSIM",
    "Virtual Number",
    "Transactions",
    "Distribute SIMs capability",
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Assign Regional Manager Role"
      description="Grant a user Regional Manager access"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "assign_role",
          label: "Assign Role",
          variant: "primary",
          onClick: () => {
            onAssignSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* FIND USER */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            FIND USER
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email or phone number..."
            className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* Selected User Result Card */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#2563EB] font-bold text-white">
              YA
            </div>
            <div>
              <strong className="font-bold text-[#0F172A] block text-xs">Yusuf Adam Baba</strong>
              <span className="text-[11px] text-[#64748B]">yusufababah50@gmail.com · 08065942373</span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="size-2 rounded-full bg-[#94A3B8]" />
                <span className="text-[11px] text-[#64748B]">No role assigned</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROLE ACCESS */}
        <div className="space-y-2">
          <span className="font-bold uppercase tracking-wide text-[#64748B] text-[10px] block">
            ROLE ACCESS
          </span>
          <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 text-xs space-y-2">
            <strong className="font-bold text-[#D97706] block text-sm">Regional Manager</strong>
            <p className="text-[#64748B] font-medium">This role gives access to:</p>
            <div className="space-y-1.5 text-xs font-bold text-[#0F172A] pt-1">
              {permissions.map((p) => (
                <div key={p} className="flex items-center gap-1.5">
                  <Check className="size-4 text-[#059669] shrink-0" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Amber Warning Box */}
        <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB] p-3.5 text-xs text-[#D97706] font-medium leading-relaxed">
          User will be notified by SMS and email with their dashboard access details immediately after assignment.
        </div>
      </div>
    </AppModal>
  );
}
