"use client";

import { useState } from "react";
import { ArrowUpDown, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type ConfirmSingleSwapModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
  onConfirmSuccess?: () => void;
};

export function ConfirmSingleSwapModal({
  open,
  onOpenChange,
  onBack,
  onConfirmSuccess,
}: ConfirmSingleSwapModalProps) {
  const [pin, setPin] = useState(["1", "2", "3", ""]);

  const handlePinChange = (index: number, val: string) => {
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm SIM Swap"
      description="Review the details carefully before confirming."
      size="md"
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
          key: "confirm",
          label: "Confirm — ₦3,500",
          variant: "primary",
          onClick: () => {
            onConfirmSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Top Details Card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <span className="font-bold uppercase tracking-wide text-[#64748B]">Swap Type</span>
            <span className="rounded-md bg-[#EFF6FF] px-2.5 py-1 font-bold text-[#2563EB]">
              Network Issue
            </span>
          </div>

          {/* Original SIM */}
          <div className="pt-3">
            <p className="font-bold uppercase tracking-wide text-[#64748B]">Original SIM</p>
            <div className="mt-2 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#64748B]">SIM Number</span>
                <strong className="font-bold text-[#0F172A]">07022222222</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Network</span>
                <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 font-bold text-[#854D0E]">
                  MTN
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Customer</span>
                <span className="font-semibold text-[#0F172A]">Chidi Eze · 0812***4521</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Status</span>
                <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 font-bold text-[#059669]">
                  Activated
                </span>
              </div>
            </div>
          </div>

          {/* Transfer Divider */}
          <div className="relative my-4 flex items-center justify-center">
            <hr className="w-full border-[#CBD5E1]" />
            <span className="absolute flex size-8 items-center justify-center rounded-full bg-[#0F1F36] text-white shadow-xs">
              <ArrowUpDown className="size-4" />
            </span>
          </div>

          {/* New SIM */}
          <div>
            <p className="font-bold uppercase tracking-wide text-[#64748B]">New SIM</p>
            <div className="mt-2 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#64748B]">SIM Number</span>
                <strong className="font-bold text-[#0F172A]">09012345678</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Network</span>
                <span className="rounded-md bg-[#FEE2E2] px-2 py-0.5 font-bold text-[#991B1B]">
                  Airtel
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Type</span>
                <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 font-bold text-[#2563EB]">
                  Cross-network
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Fee & Balance Breakdown Box */}
        <div className="rounded-2xl bg-[#F0F6FF] p-4 text-xs space-y-2">
          <div className="flex justify-between text-[#64748B]">
            <span>SIMs to swap</span>
            <span>1</span>
          </div>
          <div className="flex justify-between text-[#64748B]">
            <span>Fee per swap</span>
            <span>₦3,500</span>
          </div>
          <div className="flex justify-between font-bold text-[#0F172A] border-b border-[#BFDBFE] pb-2">
            <span>Total fee</span>
            <span>₦3,500</span>
          </div>

          <div className="flex justify-between text-[#64748B] pt-1">
            <span>Charged to</span>
            <span>Yusuf Adam · Wallet</span>
          </div>
          <div className="flex justify-between text-[#64748B]">
            <span>Wallet balance</span>
            <span>₦248,500</span>
          </div>
          <div className="flex justify-between font-bold text-[#0F172A]">
            <span>Balance after swap</span>
            <span>₦245,000</span>
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-2.5 rounded-xl border border-[#BFDBFE] bg-[#F0F6FF] p-3 text-xs text-[#2563EB]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>
            Once confirmed, the original SIM will be deactivated immediately. The new SIM will be activated within 5 minutes. The customer will be notified by SMS.
          </span>
        </div>

        {/* 4-Digit PIN Authorization */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Enter your 4-digit PIN to authorise
          </p>
          <div className="flex gap-3">
            {pin.map((val, idx) => (
              <input
                key={idx}
                type="password"
                maxLength={1}
                value={val ? "●" : ""}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                className={`size-12 rounded-xl text-center text-lg font-bold transition-all ${
                  val
                    ? "bg-[#0F1F36] text-white border-none"
                    : "border-2 border-[#2563EB] bg-white text-[#0F172A]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
