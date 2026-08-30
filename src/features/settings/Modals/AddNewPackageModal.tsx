"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type AddNewPackageModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSuccess?: () => void;
};

export function AddNewPackageModal({
  open,
  onOpenChange,
  onAddSuccess,
}: AddNewPackageModalProps) {
  const [packageName, setPackageName] = useState("");
  const [dataAmount, setDataAmount] = useState("");
  const [customerPrice, setCustomerPrice] = useState("0");
  const [costPrice, setCostPrice] = useState("0");
  const [status, setStatus] = useState(true);

  // Auto-calculated margin
  const cust = parseFloat(customerPrice) || 0;
  const cost = parseFloat(costPrice) || 0;
  const marginAmt = Math.max(0, cust - cost);
  const marginPct = cust > 0 ? Math.round((marginAmt / cust) * 100) : 0;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Package"
      description="Create a ZeroLimit SIM data package"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "add_package",
          label: "Add Package",
          variant: "primary",
          onClick: () => {
            onAddSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Package Name */}
        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Package Name
          </label>
          <input
            type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            placeholder="e.g. Starter, Basic, Pro..."
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* Data Allocation */}
        <div>
          <label className="mb-1.5 block font-bold text-[#0F172A]">
            Data Allocation
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={dataAmount}
              onChange={(e) => setDataAmount(e.target.value)}
              placeholder="Amount"
              className="flex-1 rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
            <div className="w-24 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 font-bold text-center text-[#0F172A] text-xs">
              GB
            </div>
          </div>
          <span className="text-[10px] text-[#94A3B8] block mt-1">
            Enter data amount. Use "fair use" suffix for unlimited plans.
          </span>
        </div>

        {/* Customer Price & Cost Price */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block font-bold text-[#0F172A]">
              Customer Price (₦)
            </label>
            <input
              type="text"
              value={customerPrice}
              onChange={(e) => setCustomerPrice(e.target.value)}
              placeholder="₦ 0"
              className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="mb-1.5 block font-bold text-[#0F172A]">
              Cost Price (₦)
            </label>
            <input
              type="text"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              placeholder="₦ 0"
              className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
          </div>
        </div>

        {/* Margin auto-calculated */}
        <div className="rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-xs text-[#2563EB] font-bold">
          Margin: ₦{marginAmt.toLocaleString()} · {marginPct}% <span className="font-normal text-[11px] text-[#64748B]">(auto-calculated)</span>
        </div>

        {/* Status Toggle */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">
            Status
          </label>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
              className="size-5 rounded border-[#CBD5E1] accent-[#059669] cursor-pointer"
            />
            <span className={`font-bold text-xs ${status ? "text-[#059669]" : "text-[#64748B]"}`}>
              {status ? "Active" : "Inactive"}
            </span>
          </div>
          <span className="text-[10px] text-[#94A3B8] block mt-1">
            Package will be available for purchase immediately.
          </span>
        </div>
      </div>
    </AppModal>
  );
}
