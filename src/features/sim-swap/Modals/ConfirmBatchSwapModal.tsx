"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type BatchSimItem = {
  simNumber: string;
  fromNetwork: string;
  toNetwork: string;
};

const BATCH_ITEMS: BatchSimItem[] = [
  { simNumber: "07022222222", fromNetwork: "MTN", toNetwork: "Airtel" },
  { simNumber: "08065942373", fromNetwork: "Airtel", toNetwork: "Glo" },
  { simNumber: "09122222222", fromNetwork: "Glo", toNetwork: "MTN" },
];

function NetworkBadge({ network }: { network: string }) {
  const lower = network.toLowerCase();
  let bg = "#FEF3C7";
  let text = "#854D0E";
  if (lower === "airtel") {
    bg = "#FEE2E2";
    text = "#991B1B";
  } else if (lower === "glo") {
    bg = "#D1FAE5";
    text = "#065F46";
  }
  return (
    <span className="rounded-md px-2 py-0.5 text-[11px] font-bold" style={{ backgroundColor: bg, color: text }}>
      {network}
    </span>
  );
}

type ConfirmBatchSwapModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
  onConfirmSuccess?: () => void;
};

export function ConfirmBatchSwapModal({
  open,
  onOpenChange,
  onBack,
  onConfirmSuccess,
}: ConfirmBatchSwapModalProps) {
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
      description="Review all SIMs in this batch before confirming."
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
          label: "Confirm — ₦10,500",
          variant: "primary",
          onClick: () => {
            onConfirmSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Batch Selected Box */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <p className="font-bold text-[#0F172A]">3 SIMs selected for swap</p>
              <p className="text-[11px] uppercase tracking-wide text-[#94A3B8]">Swap Type</p>
            </div>
            <span className="rounded-md bg-[#EFF6FF] px-2.5 py-1 font-bold text-[#2563EB]">
              Network Issue
            </span>
          </div>

          {/* Batch Table Header */}
          <div className="mt-3 grid grid-cols-3 font-bold uppercase tracking-wide text-[#94A3B8] pb-1">
            <span>Original SIM</span>
            <span>Network</span>
            <span>New Network</span>
          </div>

          {/* Items */}
          <div className="space-y-2 pt-1 border-t border-[#E2E8F0]">
            {BATCH_ITEMS.map((item, idx) => (
              <div key={idx} className="grid grid-cols-3 items-center">
                <span className="font-bold text-[#0F172A]">{item.simNumber}</span>
                <div className="flex items-center gap-1.5">
                  <NetworkBadge network={item.fromNetwork} />
                  <span className="text-[#94A3B8]">→</span>
                </div>
                <NetworkBadge network={item.toNetwork} />
              </div>
            ))}
          </div>
        </div>

        {/* Fee & Balance Breakdown Box */}
        <div className="rounded-2xl bg-[#F0F6FF] p-4 text-xs space-y-2">
          <div className="flex justify-between text-[#64748B]">
            <span>SIMs to swap</span>
            <span>3</span>
          </div>
          <div className="flex justify-between text-[#64748B]">
            <span>Fee per swap</span>
            <span>₦3,500</span>
          </div>
          <div className="flex justify-between font-bold text-[#0F172A] border-b border-[#BFDBFE] pb-2">
            <span>Total fee</span>
            <span>₦10,500</span>
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
            <span>₦238,000</span>
          </div>
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-2.5 rounded-xl border border-[#BFDBFE] bg-[#F0F6FF] p-3 text-xs text-[#2563EB]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>
            All 3 SIMs will be processed simultaneously. Each original SIM will be deactivated immediately. New SIMs will be activated within 5 minutes. Customers will be notified by SMS.
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
