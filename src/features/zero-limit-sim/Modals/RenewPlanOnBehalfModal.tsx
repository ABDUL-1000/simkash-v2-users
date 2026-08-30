"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type RenewPlanOnBehalfModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subscriberName?: string;
  planName?: string;
  network?: string;
  location?: string;
  dataSize?: string;
  price?: string;
  onConfirmRenewal?: () => void;
};

export function RenewPlanOnBehalfModal({
  open,
  onOpenChange,
  subscriberName = "Adaeze Okonkwo",
  planName = "Business Plan",
  network = "MTN",
  location = "Lagos",
  dataSize = "10GB data",
  price = "₦8,500",
  onConfirmRenewal,
}: RenewPlanOnBehalfModalProps) {
  const [renewalPeriod, setRenewalPeriod] = useState("1 Month (30 days)");
  const [effectiveDate, setEffectiveDate] = useState("Immediately (Jul 1, 2025)");
  const [pin, setPin] = useState(["1", "2", "3", "4"]);

  const handlePinChange = (index: number, val: string) => {
    const newPin = [...pin];
    newPin[index] = val;
    setPin(newPin);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Renew Plan on Behalf"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: "Confirm Renewal",
          variant: "success",
          onClick: () => {
            onConfirmRenewal?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Subscriber Info Box */}
        <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] p-3.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB] font-bold text-xs">
            {subscriberName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-bold text-[#0F172A] text-sm">{subscriberName}</p>
            <p className="text-xs text-[#64748B]">
              {planName} · {network} · {location}
            </p>
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex items-center justify-between rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs">
          <div>
            <p className="font-bold text-[#1E40AF] text-sm">
              {planName} · {network}
            </p>
            <p className="mt-0.5 font-medium text-[#1E40AF]">
              {dataSize} · 30 days · {price}
            </p>
          </div>
          <span className="font-bold text-[#1E40AF]">Active</span>
        </div>

        {/* Form Fields */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Renewal Period</label>
          <select
            value={renewalPeriod}
            onChange={(e) => setRenewalPeriod(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="1 Month (30 days)">1 Month (30 days)</option>
            <option value="2 Months (60 days)">2 Months (60 days)</option>
            <option value="3 Months (90 days)">3 Months (90 days)</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Effective Date</label>
          <input
            type="text"
            value={effectiveDate}
            onChange={(e) => setEffectiveDate(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Cost Breakdown Box */}
        <div className="rounded-2xl bg-[#F8FAFC] p-4 text-xs space-y-2">
          <div className="flex justify-between text-[#64748B]">
            <span>Plan Cost</span>
            <span>{price}</span>
          </div>
          <div className="flex justify-between text-[#64748B] border-b border-[#E2E8F0] pb-2">
            <span>Service Fee</span>
            <span>₦0</span>
          </div>
          <div className="flex justify-between font-bold text-[#0F172A] pt-1 text-sm">
            <span>Total</span>
            <span>{price}</span>
          </div>
        </div>

        {/* PIN Authorization */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Enter PIN to Confirm
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
