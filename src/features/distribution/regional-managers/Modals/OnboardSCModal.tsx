"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type OnboardSCModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rmName?: string;
  rmStock?: number;
  onSubmitSuccess?: () => void;
};

export function OnboardSCModal({
  open,
  onOpenChange,
  rmName = "Yusuf Adam Baba",
  rmStock = 66,
  onSubmitSuccess,
}: OnboardSCModalProps) {
  const [tab, setTab] = useState<"existing" | "new">("existing");
  const [search, setSearch] = useState("");
  const [state, setState] = useState("Lagos");
  const [initialStock, setInitialStock] = useState("50");

  const stockToSend = parseInt(initialStock, 10) || 0;
  const remainingStock = Math.max(0, rmStock - stockToSend);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Onboard State Coordinator"
      description={`Add a new SC to ${rmName}'s network`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "submit_approval",
          label: "Submit for Approval",
          variant: "primary",
          onClick: () => {
            onSubmitSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Blue Info Box */}
        <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-3.5 text-xs text-[#2563EB] font-medium leading-relaxed">
          • Onboarding a SC creates their platform account. They receive an SMS with login instructions. Admin approval required before the SC account goes live.
        </div>

        {/* FIND OR CREATE USER */}
        <div className="space-y-2">
          <span className="font-bold uppercase tracking-wide text-[#64748B] text-[10px] block">
            FIND OR CREATE USER
          </span>

          <div className="flex items-center rounded-xl bg-[#F8FAFC] p-1 border border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setTab("existing")}
              className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                tab === "existing"
                  ? "bg-white text-[#0F172A] shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Existing User
            </button>
            <button
              type="button"
              onClick={() => setTab("new")}
              className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                tab === "new"
                  ? "bg-white text-[#0F172A] shadow-xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              New User
            </button>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone or email..."
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />

          <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-3.5 text-xs flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#9333EA] font-bold text-white">
              AO
            </div>
            <div>
              <strong className="font-bold text-[#0F172A] block text-xs">Aminat Okafor</strong>
              <span className="text-[11px] text-[#64748B]">08065942373 · Normal User · Lagos</span>
              <span className="rounded-md bg-[#F1F5F9] border border-[#CBD5E1] px-1.5 py-0.5 text-[9px] font-bold text-[#64748B] inline-block mt-0.5">
                No existing SC role
              </span>
            </div>
          </div>
        </div>

        {/* SC CONFIGURATION */}
        <div className="space-y-3">
          <span className="font-bold uppercase tracking-wide text-[#64748B] text-[10px] block">
            SC CONFIGURATION
          </span>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              SC OPERATING STATE
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            >
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Kano">Kano</option>
              <option value="Rivers">Rivers</option>
            </select>
            <span className="text-[10px] text-[#94A3B8] block mt-1">This SC will manage APs in this state</span>
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              INITIAL SIM STOCK TO SEND
            </label>
            <input
              type="text"
              value={initialStock}
              onChange={(e) => setInitialStock(e.target.value)}
              className="w-full rounded-xl border-2 border-[#2563EB] bg-white p-3 font-bold text-[#0F172A] focus:outline-none text-sm"
            />
            <span className="text-[10px] text-[#94A3B8] block mt-1">Units from your inventory ({rmStock} available)</span>
            <span className="text-[10px] font-bold text-[#D97706] block mt-0.5">Your remaining stock: {remainingStock} SIMs</span>
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              BONUS TARGET
            </label>
            <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs space-y-1">
              <p className="text-[#64748B]">Inheriting platform default: 500 activations → ₦10,000 bonus</p>
              <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline">
                Set custom target instead
              </button>
            </div>
          </div>
        </div>

        {/* Amber Notice Box */}
        <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB] p-3.5 text-xs text-[#D97706] font-medium leading-relaxed">
          • This onboarding request is sent to Super Admin for approval. The SC account activates only after admin confirms.
        </div>
      </div>
    </AppModal>
  );
}
