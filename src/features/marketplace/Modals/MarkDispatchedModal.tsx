"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type MarkDispatchedModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderRef?: string;
  onDispatchSuccess?: () => void;
};

export function MarkDispatchedModal({
  open,
  onOpenChange,
  orderRef = "ORD-2026-00847",
  onDispatchSuccess,
}: MarkDispatchedModalProps) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [deliveryPartner, setDeliveryPartner] = useState("GIG Logistics");
  const [dispatchDate, setDispatchDate] = useState("03 Jul 2026");
  const [notifySms, setNotifySms] = useState(true);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Mark as Dispatched"
      description={orderRef}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "dispatch",
          label: "Mark Dispatched",
          variant: "primary",
          onClick: () => {
            onDispatchSuccess?.();
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

        {/* Tracking Number */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            TRACKING NUMBER
          </label>
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="e.g. GIG-2026-847291"
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-mono text-xs font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
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
              <option value="GIG Logistics">GIG Logistics</option>
              <option value="DHL Express">DHL Express</option>
              <option value="Bolt Logistics">Bolt Logistics</option>
              <option value="Self-pickup">Self-pickup</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              DISPATCH DATE
            </label>
            <input
              type="text"
              value={dispatchDate}
              onChange={(e) => setDispatchDate(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#0F172A]">
          <input
            type="checkbox"
            checked={notifySms}
            onChange={(e) => setNotifySms(e.target.checked)}
            className="size-4 rounded border-[#CBD5E1] accent-[#2563EB]"
          />
          <span>Notify buyer by SMS</span>
        </label>
      </div>
    </AppModal>
  );
}
