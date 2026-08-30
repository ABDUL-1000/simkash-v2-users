"use client";

import { useState } from "react";
import { TriangleAlert, CheckCircle2, Search,  } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type SwapLostSimModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
  onProcessSwap?: (numberOption: "keep" | "assign", notes: string) => void;
};

export function SwapLostSimModal({
  open,
  onOpenChange,
  onBack,
  onProcessSwap,
}: SwapLostSimModalProps) {
  const [customerName, setCustomerName] = useState("Chidi Eze");
  const [customerPhone, setCustomerPhone] = useState("08123456789");
  const [isVerified, setIsVerified] = useState(true);
  const [lastKnownSim, setLastKnownSim] = useState("07022222222");
  const [numberOption, setNumberOption] = useState<"keep" | "assign">("keep");
  const [notes, setNotes] = useState(
    "Customer reported SIM lost on 24 Jun 2026. Identity verified via BVN and government ID."
  );

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="SIM Swap — Lost SIM"
      description="Admin-initiated swap on behalf of the customer."
      size="lg"
      actions={[
        {
          key: "back",
          label: "Back",
          variant: "secondary",
          onClick: () => {
            onBack?.();
          },
        },
        {
          key: "process",
          label: "Process Lost SIM Swap →",
          variant: "primary",
          onClick: () => {
            onProcessSwap?.(numberOption, notes);
          },
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Top Warning Banner */}
        <div className="flex items-start gap-2.5 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#92400E]">
          <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[#D97706]" />
          <span>
            Admin-initiated flow. You are processing this swap on behalf of the customer. The customer must have verified their identity before this swap is processed.
          </span>
        </div>

        {/* Section 1: VERIFY CUSTOMER IDENTITY */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Verify Customer Identity
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold text-[#0F172A]">Customer Name</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Full name as registered"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block font-semibold text-[#0F172A]">Customer Phone</label>
              <input
                type="text"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Registered phone number"
                className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsVerified(true)}
            className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline"
          >
            <Search className="size-3.5" />
            <span>Look up customer</span>
          </button>

          {/* Verified Banner */}
          {isVerified && (
            <div className="mt-2.5 flex items-center justify-between rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4.5 text-[#059669]" />
                <div>
                  <p className="font-bold text-[#059669]">Customer Verified</p>
                  <p className="text-[#047857]">Chidi Eze · 0812***4521 · Lagos</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-md bg-[#D1FAE5] px-2 py-0.5 text-[11px] font-bold text-[#065F46]">
                  Account Active
                </span>
                <span className="rounded-md bg-[#D1FAE5] px-2 py-0.5 text-[11px] font-bold text-[#065F46]">
                  KYC Complete
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: LOST SIM DETAILS */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Lost SIM Details
          </p>
          <label className="mb-1 block font-semibold text-[#0F172A]">Last Known SIM Number</label>
          <p className="mb-1.5 text-xs text-[#94A3B8]">Check Admin SIM Search if the SIM number is unknown.</p>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={lastKnownSim}
              onChange={(e) => setLastKnownSim(e.target.value)}
              placeholder="Enter last known SIM number if available"
              className="flex-1 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
            <span className="rounded-md bg-[#ECFDF5] px-3 py-2 text-xs font-bold text-[#059669]">
              Detected: MTN
            </span>
          </div>
        </div>

        {/* Section 3: WHAT HAPPENS TO THE CUSTOMER'S NUMBER? */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            What happens to the customer's number?
          </p>
          <div className="space-y-2.5">
            {/* Option 1: Keep Same Number */}
            <div
              onClick={() => setNumberOption("keep")}
              className={`flex cursor-pointer items-start justify-between gap-3 rounded-2xl p-3.5 transition-all ${
                numberOption === "keep"
                  ? "border-2 border-[#2563EB] bg-[#F0F6FF] shadow-xs"
                  : "border border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  checked={numberOption === "keep"}
                  onChange={() => setNumberOption("keep")}
                  className="mt-0.5 size-4 text-[#2563EB] accent-[#2563EB]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0F172A]">Keep Same Number</span>
                    <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 text-[11px] font-bold text-[#92400E]">
                      Same network only
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-[#64748B]">
                    Customer retains their existing number on the new SIM. Same network only.
                  </p>
                </div>
              </div>
            </div>

            {/* Option 2: Assign New Number */}
            <div
              onClick={() => setNumberOption("assign")}
              className={`flex cursor-pointer items-start justify-between gap-3 rounded-2xl p-3.5 transition-all ${
                numberOption === "assign"
                  ? "border-2 border-[#2563EB] bg-[#F0F6FF] shadow-xs"
                  : "border border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  checked={numberOption === "assign"}
                  onChange={() => setNumberOption("assign")}
                  className="mt-0.5 size-4 text-[#2563EB] accent-[#2563EB]"
                />
                <div>
                  <span className="font-bold text-[#0F172A]">Assign New Number</span>
                  <p className="mt-0.5 text-xs text-[#64748B]">
                    Customer gets a new SIM number. Can switch to any network.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: REASON / NOTES */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">
            REASON / NOTES (required for Lost SIM)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Customer reported SIM lost on 24 Jun 2026. Identity verified via BVN and government ID."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>
    </AppModal>
  );
}
