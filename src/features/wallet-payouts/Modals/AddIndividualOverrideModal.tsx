"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type AddIndividualOverrideModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveSuccess?: () => void;
};

export function AddIndividualOverrideModal({
  open,
  onOpenChange,
  onSaveSuccess,
}: AddIndividualOverrideModalProps) {
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState("500");
  const [reward, setReward] = useState("15,000");
  const [period, setPeriod] = useState<"monthly" | "custom">("monthly");
  const [countSubPartners, setCountSubPartners] = useState(false);
  const [reason, setReason] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add Individual Override"
      description="Set custom bonus target for one agent"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "save_override",
          label: "Save Override",
          variant: "primary",
          onClick: () => {
            onSaveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* FIND AGENT */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            FIND AGENT
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone or agent ID..."
            className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* Selected Agent Box */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#2563EB] font-bold text-white">
              RS
            </div>
            <div>
              <strong className="font-bold text-[#0F172A] block">Rabiu Sani</strong>
              <span className="text-[11px] text-[#64748B]">Agency Partner · Lagos · 08120600542</span>
            </div>
          </div>

          <div className="rounded-xl bg-white p-3 text-xs space-y-1 border border-[#DBEAFE]">
            <p className="text-[#64748B]">Current defaults for this role:</p>
            <p className="font-bold text-[#0F172A]">Target: 200 activations/month · Reward: ₦5,000</p>
            <p className="text-[11px] font-bold text-[#D97706]">Will be replaced by override below</p>
          </div>
        </div>

        {/* CUSTOM TARGET */}
        <div className="space-y-3">
          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              ACTIVATION TARGET
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2">
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="flex-1 bg-transparent font-bold text-[#0F172A] focus:outline-none text-xs"
              />
              <span className="text-xs text-[#94A3B8]">activations</span>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              BONUS REWARD
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2">
              <span className="font-bold text-[#0F172A]">₦</span>
              <input
                type="text"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                className="flex-1 bg-transparent font-bold text-[#0F172A] focus:outline-none text-xs"
              />
              <span className="text-xs text-[#94A3B8]">per period</span>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              PERIOD
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPeriod("monthly")}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                  period === "monthly"
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-white text-[#64748B] border border-[#CBD5E1]"
                }`}
              >
                ● Monthly
              </button>
              <button
                type="button"
                onClick={() => setPeriod("custom")}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                  period === "custom"
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-white text-[#64748B] border border-[#CBD5E1]"
                }`}
              >
                ○ Custom Range
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="font-bold text-[#0F172A] text-xs">Count sub-partner activations</span>
            <input
              type="checkbox"
              checked={countSubPartners}
              onChange={(e) => setCountSubPartners(e.target.checked)}
              className="size-5 rounded border-[#CBD5E1] accent-[#2563EB] cursor-pointer"
            />
          </div>
        </div>

        {/* OVERRIDE PREVIEW */}
        <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 text-xs space-y-1">
          <span className="font-bold text-[#059669] uppercase tracking-wide text-[10px] block">
            OVERRIDE PREVIEW
          </span>
          <strong className="font-bold text-[#0F172A] block">Agent: Rabiu Sani (AP)</strong>
          <p className="font-bold text-[#0F172A]">Target: {target} activations/month</p>
          <p className="font-bold text-[#0F172A]">Reward: ₦{reward}</p>
          <span className="text-[11px] text-[#64748B]">vs default: 200 acts · ₦5,000</span>
        </div>

        {/* REASON */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            REASON (OPTIONAL)
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Top performer target"
            className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>
      </div>
    </AppModal>
  );
}
