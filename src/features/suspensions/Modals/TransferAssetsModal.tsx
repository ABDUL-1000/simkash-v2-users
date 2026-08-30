"use client";

import { useState } from "react";
import { AlertTriangle, Search } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type TransferAssetsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  accountName?: string;
  subAgentsCount?: number;
  simsCount?: number;
  onTransferSuccess?: () => void;
};

type TransferType = "agents_only" | "sims_only" | "both" | "all";

export function TransferAssetsModal({
  open,
  onOpenChange,
  accountName = "Elidan Corp",
  subAgentsCount = 47,
  simsCount = 832,
  onTransferSuccess,
}: TransferAssetsModalProps) {
  const [transferType, setTransferType] = useState<TransferType>("both");
  const [agentSearch, setAgentSearch] = useState("");
  const [pin, setPin] = useState(["1", "2", "3", "4"]);
    console.log(setPin)


  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Transfer Assets"
      description={`${accountName} · ${subAgentsCount} sub-agents · ${simsCount} SIMs`}
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "transfer",
          label: "Confirm Transfer",
          variant: "secondary",
          onClick: () => {
            onTransferSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Warning Banner */}
        <div className="flex items-start gap-3 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 text-xs text-[#92400E]">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-[#D97706]" />
          <p className="leading-relaxed">
            Only unactivated SIMs can be transferred. Activated SIMs stay with customers — only future renewal commissions are reassigned. Wallet balance is held by Simkash and not transferred.
          </p>
        </div>

        {/* Transfer Type Grid */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B]">
            TRANSFER TYPE
          </label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div
              onClick={() => setTransferType("agents_only")}
              className={`cursor-pointer rounded-2xl border p-3 transition-all ${
                transferType === "agents_only"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <input
                type="radio"
                name="type"
                checked={transferType === "agents_only"}
                onChange={() => setTransferType("agents_only")}
                className="accent-[#2563EB]"
              />
              <p className="mt-1 font-bold text-[#0F172A] text-xs">Transfer Sub-Agents Only</p>
              <p className="text-[10px] text-[#64748B]">Move agent hierarchy</p>
            </div>

            <div
              onClick={() => setTransferType("sims_only")}
              className={`cursor-pointer rounded-2xl border p-3 transition-all ${
                transferType === "sims_only"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <input
                type="radio"
                name="type"
                checked={transferType === "sims_only"}
                onChange={() => setTransferType("sims_only")}
                className="accent-[#2563EB]"
              />
              <p className="mt-1 font-bold text-[#0F172A] text-xs">Transfer SIMs Only</p>
              <p className="text-[10px] text-[#64748B]">Move unactivated inventory</p>
            </div>

            <div
              onClick={() => setTransferType("both")}
              className={`cursor-pointer rounded-2xl border p-3 transition-all ${
                transferType === "both"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <input
                type="radio"
                name="type"
                checked={transferType === "both"}
                onChange={() => setTransferType("both")}
                className="accent-[#2563EB]"
              />
              <p className="mt-1 font-bold text-[#0F172A] text-xs">Transfer Both</p>
              <p className="text-[10px] text-[#64748B]">Agents and inventory</p>
            </div>

            <div
              onClick={() => setTransferType("all")}
              className={`cursor-pointer rounded-2xl border p-3 transition-all ${
                transferType === "all"
                  ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                  : "border-[#E2E8F0] bg-white hover:bg-[#F8FAFC]"
              }`}
            >
              <input
                type="radio"
                name="type"
                checked={transferType === "all"}
                onChange={() => setTransferType("all")}
                className="accent-[#2563EB]"
              />
              <p className="mt-1 font-bold text-[#0F172A] text-xs">Transfer All Assets</p>
              <p className="text-[10px] text-[#64748B]">Full asset migration</p>
            </div>
          </div>
        </div>

        {/* Metrics Summary Box */}
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#EFF6FF] p-3.5 text-center divide-x divide-[#BFDBFE]">
          <div>
            <p className="text-base font-extrabold text-[#9333EA]">47</p>
            <p className="text-[10px] font-medium text-[#64748B]">Sub-Agents</p>
          </div>
          <div>
            <p className="text-base font-extrabold text-[#2563EB]">832</p>
            <p className="text-[10px] font-medium text-[#64748B]">SIMs</p>
          </div>
          <div>
            <p className="text-base font-extrabold text-[#64748B]">₦2.4M</p>
            <p className="text-[10px] font-medium text-[#64748B]">(not transferred)</p>
          </div>
        </div>

        {/* Transfer To */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            TRANSFER TO
          </label>
          <div className="relative mb-2">
            <Search className="absolute left-3.5 top-3 size-4 text-[#94A3B8]" />
            <input
              type="text"
              value={agentSearch}
              onChange={(e) => setAgentSearch(e.target.value)}
              placeholder="Search by agent name or phone..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          {/* Selected Agent Card */}
          <div className="rounded-2xl border-2 border-[#2563EB] bg-[#EFF6FF] p-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F172A] text-sm">Usman Bello</span>
              <span className="rounded-full bg-[#ECFDF5] border border-[#A7F3D0] px-2.5 py-0.5 text-xs font-bold text-[#059669]">
                Active
              </span>
            </div>
            <p className="text-xs text-[#64748B]">
              Corporate Agent · Kano · Currently: 23 sub-agents · 1,204 SIMs
            </p>
          </div>

          <div className="mt-2 rounded-xl bg-[#F8FAFC] p-3 text-xs text-[#64748B]">
            After transfer, Usman Bello will manage:{" "}
            <strong className="text-[#0F172A]">70 sub-agents</strong> (23 + 47 transferred){" "}
            <strong className="text-[#0F172A]">2,036 SIMs</strong> (1,204 + 832 transferred)
          </div>
        </div>

        {/* PIN Authorization */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            ENTER YOUR PIN TO AUTHORISE
          </label>
          <div className="flex justify-center gap-3">
            {pin.map((v, i) => (
              <input
                key={i}
                type="password"
                maxLength={1}
                value={v ? "●" : ""}
                readOnly
                className="size-11 rounded-xl border border-[#E2E8F0] bg-white text-center font-bold text-[#0F172A]"
              />
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
