"use client";

import { useState } from "react";
import { Signal, Search, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export type SwapReasonType = "network_issue" | "lost_sim";

type SelectSwapReasonModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue?: (reason: SwapReasonType) => void;
};

export function SelectSwapReasonModal({
  open,
  onOpenChange,
  onContinue,
}: SelectSwapReasonModalProps) {
  const [selectedReason, setSelectedReason] = useState<SwapReasonType>("network_issue");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Select Swap Reason"
      description="Choose the reason for this SIM swap to proceed with the correct flow."
      size="md"
      actions={[
        { key: "back", label: "Back", variant: "secondary", closeOnClick: true },
        {
          key: "continue",
          label: "Continue →",
          variant: "primary",
          onClick: () => {
            onContinue?.(selectedReason);
          },
        },
      ]}
    >
      <div className="space-y-3.5">
        {/* Option 1: Network Issue / Damaged SIM */}
        <div
          onClick={() => setSelectedReason("network_issue")}
          className={`flex cursor-pointer items-start justify-between gap-4 rounded-2xl p-4 transition-all ${
            selectedReason === "network_issue"
              ? "border-2 border-[#2563EB] bg-[#F0F6FF] shadow-xs"
              : "border border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#2563EB]">
              <Signal className="size-5" />
            </div>
            <div>
              <p className="font-bold text-[#0F172A] text-sm sm:text-base">
                Network Issue / Damaged SIM
              </p>
              <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                Customer's SIM is faulty, damaged, or experiencing persistent network problems. Old SIM number is known.
              </p>
            </div>
          </div>

          <div className="mt-1 shrink-0">
            {selectedReason === "network_issue" ? (
              <CheckCircle2 className="size-5 text-[#2563EB] fill-[#2563EB] text-white" />
            ) : (
              <span className="block size-5 rounded-full border-2 border-[#CBD5E1]" />
            )}
          </div>
        </div>

        {/* Option 2: Lost SIM */}
        <div
          onClick={() => setSelectedReason("lost_sim")}
          className={`flex cursor-pointer items-start justify-between gap-4 rounded-2xl p-4 transition-all ${
            selectedReason === "lost_sim"
              ? "border-2 border-[#2563EB] bg-[#F0F6FF] shadow-xs"
              : "border border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
          }`}
        >
          <div className="flex items-start gap-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FEE2E2] text-[#EF4444]">
              <Search className="size-5" />
            </div>
            <div>
              <p className="font-bold text-[#0F172A] text-sm sm:text-base">Lost SIM</p>
              <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
                Customer has physically lost their SIM card. Admin initiates this swap on behalf of the customer. Option to retain or change number.
              </p>
            </div>
          </div>

          <div className="mt-1 shrink-0">
            {selectedReason === "lost_sim" ? (
              <CheckCircle2 className="size-5 text-[#2563EB] fill-[#2563EB] text-white" />
            ) : (
              <span className="block size-5 rounded-full border-2 border-[#CBD5E1]" />
            )}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
