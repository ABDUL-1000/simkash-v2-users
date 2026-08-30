"use client";

import { useState } from "react";
import { Search, Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type SimItem = {
  id: string;
  simNumber: string;
  customerName: string;
  network: string;
  status: string;
  lastActive: string;
};

const SIM_ITEMS: SimItem[] = [
  { id: "1", simNumber: "07022222222", customerName: "Chidi Eze", network: "MTN", status: "Activated", lastActive: "2 min ago" },
  { id: "2", simNumber: "08065942373", customerName: "Amina Yusuf", network: "Airtel", status: "Activated", lastActive: "5 min ago" },
  { id: "3", simNumber: "09122222222", customerName: "Ibrahim Musa", network: "Glo", status: "Activated", lastActive: "1 hour ago" },
  { id: "4", simNumber: "08120600542", customerName: "Fatima Abdullahi", network: "MTN", status: "Activated", lastActive: "3 hours ago" },
  { id: "5", simNumber: "07055093537", customerName: "Emeka Obi", network: "T2", status: "Activated", lastActive: "Yesterday" },
];

const NETWORKS = ["MTN", "Airtel", "Glo", "T2"];

type SwapNetworkIssueModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBack?: () => void;
  onConfirmSwap?: (selectedSims: SimItem[], targetNetwork: string) => void;
};

export function SwapNetworkIssueModal({
  open,
  onOpenChange,
  onBack,
  onConfirmSwap,
}: SwapNetworkIssueModalProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(["1"]);
  const [targetNetwork, setTargetNetwork] = useState("MTN");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState("");

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedSims = SIM_ITEMS.filter((s) => selectedIds.includes(s.id));
  const totalFee = selectedIds.length * 3500;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="SIM Swap — Network Issue"
      description="Select SIM(s) to swap and choose the target network."
      size="lg"
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
          label: `Confirm Swap (₦${totalFee.toLocaleString()})`,
          variant: "primary",
          disabled: selectedIds.length === 0,
          onClick: () => {
            onConfirmSwap?.(selectedSims, targetNetwork);
          },
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Section 1: SELECT SIM(S) TO SWAP */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Select SIM(s) to swap
          </p>

          <div className="relative mb-2">
            <Search className="absolute left-3.5 top-3 size-4 text-[#94A3B8]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by SIM number, customer name, or phone..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-3.5 py-2.5 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          {/* List of SIMs */}
          <div className="max-h-56 overflow-y-auto rounded-xl border border-[#E2E8F0] divide-y divide-[#F1F5F9] bg-white">
            {SIM_ITEMS.map((sim) => {
              const isSelected = selectedIds.includes(sim.id);
              return (
                <div
                  key={sim.id}
                  onClick={() => toggleSelect(sim.id)}
                  className={`flex cursor-pointer items-center justify-between p-3 transition-colors ${
                    isSelected ? "bg-[#F0F6FF]" : "hover:bg-[#F8FAFC]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="size-4 rounded border-[#CBD5E1] text-[#2563EB] accent-[#2563EB]"
                    />
                    <div>
                      <span className="font-bold text-[#0F172A]">{sim.simNumber}</span>
                      <span className="text-[#64748B]"> · {sim.customerName}</span>
                    </div>
                    <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 text-[11px] font-bold text-[#854D0E]">
                      {sim.network}
                    </span>
                    <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[11px] font-bold text-[#059669]">
                      {sim.status}
                    </span>
                  </div>

                  <span className="text-xs text-[#94A3B8]">Last active: {sim.lastActive}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="rounded-md bg-[#EFF6FF] px-2.5 py-1 text-xs font-bold text-[#2563EB]">
              {selectedIds.length} SIM{selectedIds.length !== 1 ? "s" : ""} selected
            </span>
          </div>
        </div>

        {/* Section 2: NETWORK TO SWAP TO */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            Network to swap to
          </p>
          <div className="grid grid-cols-4 gap-3">
            {NETWORKS.map((net) => {
              const isSelected = targetNetwork === net;
              return (
                <button
                  key={net}
                  type="button"
                  onClick={() => setTargetNetwork(net)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl border py-3 text-sm font-bold transition-all ${
                    isSelected
                      ? "border-[#FDE68A] bg-[#FFFBEB] text-[#92400E] shadow-xs"
                      : "border-[#E2E8F0] bg-[#F8FAFC] text-[#0F172A] hover:bg-white"
                  }`}
                >
                  {isSelected && <Check className="size-4 text-[#D97706]" />}
                  <span>{net}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 text-xs text-[#64748B]">
            You can swap to the same network or a different one. Both cost ₦3,500.
          </p>
        </div>

        {/* Section 3: ADDITIONAL NOTES */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">ADDITIONAL NOTES (optional)</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. SIM physically damaged, unable to receive calls since 20 Jun"
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>
    </AppModal>
  );
}
