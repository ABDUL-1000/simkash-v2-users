"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type ConfirmOrderModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderRef?: string;
  buyerName?: string;
  onConfirmSuccess?: () => void;
};

export function ConfirmOrderModal({
  open,
  onOpenChange,
  orderRef = "ORD-2026-00847",
  buyerName = "Chidi Eze",
  onConfirmSuccess,
}: ConfirmOrderModalProps) {
  const [deliveryPartner, setDeliveryPartner] = useState("");
  const [estDate, setEstDate] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Order"
      description={`${orderRef} · ${buyerName}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: "Confirm Order",
          variant: "primary",
          onClick: () => {
            onConfirmSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Order Details Card */}
        <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-xs space-y-2.5 divide-y divide-[#F1F5F9]">
          <div className="flex justify-between pt-1 text-[#64748B]">
            <span>Order ID:</span>
            <strong className="font-extrabold text-[#0F172A]">{orderRef}</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Buyer:</span>
            <strong className="font-bold text-[#0F172A]">{buyerName} — +234 812 345 6789</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Product:</span>
            <strong className="font-bold text-[#0F172A]">Hikvision DS-2CD2143G2 (CCTV)</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Qty:</span>
            <strong className="font-bold text-[#0F172A]">2 units</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Total:</span>
            <strong className="font-extrabold text-[#0F172A]">₦369,998</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Address:</span>
            <strong className="font-bold text-[#0F172A]">12 Oke-Afa, Isolo, Lagos</strong>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              DELIVERY PARTNER
            </label>
            <select
              value={deliveryPartner}
              onChange={(e) => setDeliveryPartner(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            >
              <option value="">Select carrier... ▾</option>
              <option value="GIG Logistics">GIG Logistics</option>
              <option value="DHL Express">DHL Express</option>
              <option value="Bolt Logistics">Bolt Logistics</option>
              <option value="Self-pickup">Self-pickup</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              EST. DELIVERY DATE
            </label>
            <input
              type="text"
              value={estDate}
              onChange={(e) => setEstDate(e.target.value)}
              placeholder="dd/mm/yyyy"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            ORDER NOTES (Optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any fulfilment notes..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>
      </div>
    </AppModal>
  );
}
