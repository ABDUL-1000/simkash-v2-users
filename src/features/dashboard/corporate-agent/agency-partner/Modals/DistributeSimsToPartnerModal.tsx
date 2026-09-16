"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type DistributeSimsToPartnerModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partnerName?: string;
  phone?: string;
  onDistributeSuccess?: () => void;
};

export function DistributeSimsToPartnerModal({
  open,
  onOpenChange,
  partnerName = "Rabiu Sani",
  phone = "08120600542",
  onDistributeSuccess,
}: DistributeSimsToPartnerModalProps) {
  const [simType, setSimType] = useState("POS SIM");
  const [network, setNetwork] = useState("MTN");
  const [quantity, setQuantity] = useState(100);
  const [note, setNote] = useState("");

  const currentHolding = 234;
  const availableToDistribute = 12847;
  const afterDistribution = availableToDistribute - quantity;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Distribute SIMs to Partner"
      description={`${partnerName} · ${phone}`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "distribute",
          label: "Distribute SIMs →",
          variant: "primary",
          onClick: () => {
            onDistributeSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* SIM Type & Network Dropdowns */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">SIM Type</label>
            <select
              value={simType}
              onChange={(e) => setSimType(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="POS SIM">POS SIM</option>
              <option value="CCTV SIM">CCTV SIM</option>
              <option value="GPS SIM">GPS SIM</option>
              <option value="Router SIM">Router SIM</option>
            </select>
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

        {/* Quantity Stepper Card */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">Quantity</label>
          <div className="flex items-center justify-between rounded-2xl border-2 border-[#2563EB] bg-[#F0F6FF] p-4 text-center">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 10))}
              className="flex size-10 items-center justify-center rounded-xl border border-[#CBD5E1] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
            >
              <Minus className="size-4" />
            </button>

            <div>
              <p className="text-4xl font-extrabold text-[#0F172A]">{quantity}</p>
              <p className="mt-0.5 text-xs text-[#64748B]">SIMs to distribute</p>
            </div>

            <button
              type="button"
              onClick={() => setQuantity(quantity + 10)}
              className="flex size-10 items-center justify-center rounded-xl border border-[#CBD5E1] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>

        {/* Holdings Breakdown Table Box */}
        <div className="rounded-2xl bg-[#F8FAFC] p-4 text-xs divide-y divide-[#E2E8F0] space-y-2">
          <div className="flex justify-between text-[#64748B]">
            <span>{partnerName} current holding</span>
            <strong className="font-bold text-[#0F172A]">{currentHolding} SIMs</strong>
          </div>

          <div className="flex justify-between text-[#64748B] pt-2">
            <span>Available to distribute</span>
            <strong className="font-bold text-[#0F172A]">{availableToDistribute.toLocaleString()} SIMs</strong>
          </div>

          <div className="flex justify-between text-[#64748B] pt-2">
            <span>After this distribution</span>
            <strong className="font-bold text-[#059669]">{afterDistribution.toLocaleString()} SIMs</strong>
          </div>
        </div>

        {/* Note Textarea */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            NOTE (OPTIONAL)
          </label>
          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note for this distribution (e.g. batch purpose, campaign)..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>
    </AppModal>
  );
}
