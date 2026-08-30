"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type ConfirmDeliveryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderRef?: string;
  onDeliverySuccess?: () => void;
};

export function ConfirmDeliveryModal({
  open,
  onOpenChange,
  orderRef = "ORD-2026-00847",
  onDeliverySuccess,
}: ConfirmDeliveryModalProps) {
  const [deliveryDate, setDeliveryDate] = useState("03 Jul 2026");
  const [receivedBy, setReceivedBy] = useState("");
  const [notifyBuyer, setNotifyBuyer] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Confirm Delivery"
      description={orderRef}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "confirm",
          label: "Confirm Delivery",
          variant: "primary",
          onClick: () => {
            onDeliverySuccess?.();
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
            <strong className="font-bold text-[#0F172A]">Chidi Eze</strong>
          </div>

          <div className="flex justify-between pt-2 text-[#64748B]">
            <span>Product:</span>
            <strong className="font-bold text-[#0F172A]">Hikvision DS-2CD2143G2</strong>
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
              DELIVERY DATE
            </label>
            <input
              type="text"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              RECEIVED BY (Optional)
            </label>
            <input
              type="text"
              value={receivedBy}
              onChange={(e) => setReceivedBy(e.target.value)}
              placeholder="Name of recipient"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#0F172A]">
          <input
            type="checkbox"
            checked={notifyBuyer}
            onChange={(e) => setNotifyBuyer(e.target.checked)}
            className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
          />
          <span>Notify buyer of confirmed delivery</span>
        </label>

        {/* Green Info Banner */}
        <div className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs text-[#059669] font-medium">
          Confirming delivery will release commission to the vendor wallet.
        </div>
      </div>
    </AppModal>
  );
}
