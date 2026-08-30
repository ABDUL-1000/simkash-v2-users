"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type EditComponentPricingModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  componentName?: string;
  category?: string;
  initialSelling?: string;
  initialCost?: string;
  onSaveSuccess?: () => void;
};

export function EditComponentPricingModal({
  open,
  onOpenChange,
  componentName = "400W Mono PERC Solar Panel",
  category = "Solar Panels",
  initialSelling = "85,000",
  initialCost = "52,000",
  onSaveSuccess,
}: EditComponentPricingModalProps) {
  const [sellingPrice, setSellingPrice] = useState(initialSelling);
  const [costPrice, setCostPrice] = useState(initialCost);
  const [linkedProduct, setLinkedProduct] = useState("SP-400W-001");

  const selling = parseInt(sellingPrice.replace(/[^0-9]/g, ""), 10) || 0;
  const cost = parseInt(costPrice.replace(/[^0-9]/g, ""), 10) || 0;
  const marginAmt = selling - cost;
  const marginPct = selling > 0 ? ((marginAmt / selling) * 100).toFixed(1) : "0";

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Component Pricing"
      description={componentName}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "save_price",
          label: "Save Price",
          variant: "primary",
          onClick: () => {
            onSaveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Info Card */}
        <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-4 text-xs space-y-2">
          <strong className="font-bold text-[#0F172A] block text-sm">{componentName}</strong>
          <div className="flex items-center justify-between text-[#64748B]">
            <span>Category</span>
            <strong className="font-bold text-[#0F172A]">{category}</strong>
          </div>
          <div className="flex items-center justify-between text-[#64748B]">
            <span>Currently</span>
            <strong className="font-bold text-[#0F172A]">
              ₦{initialSelling} selling · ₦{initialCost} cost
            </strong>
          </div>
        </div>

        {/* SELLING PRICE (SHOWN TO USERS) * */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            SELLING PRICE (SHOWN TO USERS) *
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 font-bold text-[#64748B] text-xs">₦</span>
            <input
              type="text"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 pl-8 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
          </div>
        </div>

        {/* COST PRICE (FOR P&L) * */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            COST PRICE (FOR P&L) *
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 font-bold text-[#64748B] text-xs">₦</span>
            <input
              type="text"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 pl-8 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
          </div>
        </div>

        {/* MARGIN PREVIEW */}
        <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-3.5 text-xs space-y-0.5">
          <span className="font-bold uppercase tracking-wide text-[#059669] text-[9px] block">
            MARGIN PREVIEW
          </span>
          <strong className="font-extrabold text-[#059669] text-sm block">
            Margin: ₦{marginAmt.toLocaleString()} · {marginPct}%
          </strong>
        </div>

        {/* LINKED MARKETPLACE PRODUCT */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            LINKED MARKETPLACE PRODUCT
          </label>
          <select
            value={linkedProduct}
            onChange={(e) => setLinkedProduct(e.target.value)}
            className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          >
            <option value="SP-400W-001">Mono PERC 400W Panel · SKU: SP-400W-001</option>
            <option value="SP-450W-002">Mono PERC 450W Panel · SKU: SP-450W-002</option>
          </select>
          <span className="text-[10px] text-[#94A3B8] block mt-1">
            When user adds this component to cart, this product is added.
          </span>
        </div>
      </div>
    </AppModal>
  );
}
