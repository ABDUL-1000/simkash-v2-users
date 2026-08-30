"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type DistributeSIMsToSCModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rmName?: string;
  rmStock?: number;
  onDistributeSuccess?: () => void;
};

export function DistributeSIMsToSCModal({
  open,
  onOpenChange,
  rmName = "Yusuf Adam Baba",
  rmStock = 66,
  onDistributeSuccess,
}: DistributeSIMsToSCModalProps) {
  const [selectedSC, setSelectedSC] = useState("aminat");
  const [quantity, setQuantity] = useState("10");
  const [note, setNote] = useState("");

  const qty = parseInt(quantity, 10) || 0;
  const rmRemaining = Math.max(0, rmStock - qty);
  const scCurrent = 42;
  const scNewTotal = scCurrent + qty;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Distribute SIMs to State Coordinator"
      description={`From: ${rmName} (RM) · ${rmStock} in stock`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "distribute_sc",
          label: "Distribute to SC →",
          variant: "primary",
          onClick: () => {
            onDistributeSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* RM Stock Card */}
        <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-4 text-xs space-y-1">
          <strong className="font-bold text-[#0F172A] block text-sm">
            {rmName} · Regional Manager
          </strong>
          <span className="text-[11px] text-[#64748B]">Lagos · {rmStock} SIMs available to distribute</span>
        </div>

        {/* SELECT STATE COORDINATOR */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            SELECT STATE COORDINATOR
          </label>
          <select
            value={selectedSC}
            onChange={(e) => setSelectedSC(e.target.value)}
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          >
            <option value="aminat">Aminat Okafor · 08065942373 · Currently has 42 SIMs</option>
            <option value="chidi">Chidi Eze · 08163083409 · Currently has 18 SIMs</option>
            <option value="ibrahim">Ibrahim Musa · 07055093537 · Currently has 7 SIMs</option>
          </select>
        </div>

        {/* Selected SC Card */}
        <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-3.5 text-xs flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#9333EA] font-bold text-white">
            AO
          </div>
          <div>
            <strong className="font-bold text-[#0F172A] block text-xs">Aminat Okafor</strong>
            <span className="text-[11px] text-[#64748B]">Lagos · 23 Agency Partners</span>
            <span className="text-[11px] font-bold text-[#059669] block mt-0.5">
              Current stock: 42 SIMs
            </span>
          </div>
        </div>

        {/* Amber Info Card */}
        <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB] p-3.5 text-xs text-[#D97706] font-medium leading-relaxed">
          • SIMs distributed to State Coordinators only. SCs then distribute to their Agency Partners. RM cannot distribute directly to Agency Partners.
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Quantity</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full rounded-xl border-2 border-[#2563EB] bg-white p-3 font-bold text-[#0F172A] focus:outline-none text-sm"
          />
          <span className="text-[10px] text-[#94A3B8] block mt-1">Units to distribute</span>
        </div>

        {/* Stock Calc Subtext */}
        <div className="space-y-1 text-xs">
          <p className="text-[#64748B]">RM available: {rmStock} SIMs</p>
          <p className="font-bold text-[#059669]">After distribution: {rmRemaining} SIMs</p>
          <p className="font-bold text-[#059669]">
            Aminat Okafor will have: {scCurrent} + {qty} = {scNewTotal} SIMs
          </p>
        </div>

        {/* Note (optional) */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Note (optional)</label>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Monthly allocation — Lagos region"
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>
      </div>
    </AppModal>
  );
}
