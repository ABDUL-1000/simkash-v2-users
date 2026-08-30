"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type InitiateSwapModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitSuccess?: () => void;
};

export function InitiateSwapModal({
  open,
  onOpenChange,
  onSubmitSuccess,
}: InitiateSwapModalProps) {
  const [swapType, setSwapType] = useState("Same-Network Swap");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [fromNetwork, setFromNetwork] = useState("MTN");
  const [toNetwork, setToNetwork] = useState("Airtel");
  const [oldIccid, setOldIccid] = useState("");
  const [newIccid, setNewIccid] = useState("");
  const [reason, setReason] = useState("Network Issue");
  const [notes, setNotes] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Initiate SIM Swap"
      description="Submit a new same-network or cross-network SIM swap request (₦3,500 fee)"
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "submit",
          label: "Submit Swap Request (₦3,500)",
          variant: "primary",
          onClick: () => {
            onSubmitSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Swap Type */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Swap Type</label>
          <select
            value={swapType}
            onChange={(e) => setSwapType(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="Same-Network Swap">Same-Network Swap (e.g. MTN to MTN)</option>
            <option value="Cross-Network Port">Cross-Network Port (e.g. MTN to Airtel)</option>
          </select>
        </div>

        {/* Customer Name & Phone */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Customer Full Name</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Chidi Eze"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Customer Phone Number</label>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="e.g. 08123456789"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* Source & Target Network */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Current Network (Source)</label>
            <select
              value={fromNetwork}
              onChange={(e) => setFromNetwork(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="MTN">MTN</option>
              <option value="Airtel">Airtel</option>
              <option value="Glo">Glo</option>
              <option value="T2">T2</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Target Network (Destination)</label>
            <select
              value={toNetwork}
              onChange={(e) => setToNetwork(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="MTN">MTN</option>
              <option value="Airtel">Airtel</option>
              <option value="Glo">Glo</option>
              <option value="T2">T2</option>
            </select>
          </div>
        </div>

        {/* ICCID Serials */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Old SIM ICCID / Serial</label>
            <input
              type="text"
              value={oldIccid}
              onChange={(e) => setOldIccid(e.target.value)}
              placeholder="e.g. 89234082104900234"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">New SIM ICCID / Serial</label>
            <input
              type="text"
              value={newIccid}
              onChange={(e) => setNewIccid(e.target.value)}
              placeholder="e.g. 89234082104909988"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* Reason & Notes */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Swap Reason</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="Network Issue">Network Issue</option>
            <option value="Damaged SIM">Damaged SIM</option>
            <option value="Lost SIM">Lost SIM</option>
            <option value="Stolen Phone">Stolen Phone</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Notes (Optional)</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional swap details..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>
    </AppModal>
  );
}
