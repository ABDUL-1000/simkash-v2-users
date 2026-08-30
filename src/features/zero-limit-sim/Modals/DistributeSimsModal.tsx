"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type DistributeSimsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDistributeSuccess?: () => void;
};

export function DistributeSimsModal({
  open,
  onOpenChange,
  onDistributeSuccess,
}: DistributeSimsModalProps) {
  const [agentName, setAgentName] = useState("Rabiu Sani");
  const [quantity, setQuantity] = useState("10");
  const [network, setNetwork] = useState("MTN");
  const [initialPackage, setInitialPackage] = useState("10GB Standard");
  const [notes, setNotes] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Distribute ZeroLimit SIMs"
      description="Distribute batch ZeroLimit data SIMs to agent network"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "distribute",
          label: "Distribute SIM Batch",
          variant: "primary",
          onClick: () => {
            onDistributeSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Target Agent</label>
          <select
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="Rabiu Sani">Rabiu Sani (Agency Partner)</option>
            <option value="Fatima Yusuf">Fatima Yusuf (Corporate Agent)</option>
            <option value="Ibrahim Musa">Ibrahim Musa (Agency Partner)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Quantity (SIMs)</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Network</label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="MTN">MTN</option>
              <option value="Airtel">Airtel</option>
              <option value="Glo">Glo</option>
              <option value="9mobile">9mobile</option>
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Initial Data Package</label>
          <select
            value={initialPackage}
            onChange={(e) => setInitialPackage(e.target.value)}
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          >
            <option value="5GB Basic">5GB Basic (₦2,000)</option>
            <option value="10GB Standard">10GB Standard (₦3,500)</option>
            <option value="20GB Premium">20GB Premium (₦6,000)</option>
            <option value="50GB Power">50GB Power (₦13,000)</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Notes (Optional)</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional distribution instructions..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>
    </AppModal>
  );
}
