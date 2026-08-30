"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Info, AlertTriangle } from "lucide-react";

type SetPlatformTargetModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveSuccess?: () => void;
};

export function SetPlatformTargetModal({
  open,
  onOpenChange,
  onSaveSuccess,
}: SetPlatformTargetModalProps) {
  const [agencyTarget, setAgencyTarget] = useState("50");
  const [agencyFreq, setAgencyFreq] = useState("Monthly");

  const [corpTarget, setCorpTarget] = useState("100");
  const [corpFreq, setCorpFreq] = useState("Monthly");

  const [enterpriseTarget, setEnterpriseTarget] = useState("200");
  const [enterpriseFreq, setEnterpriseFreq] = useState("Monthly");

  const [installerTarget, setInstallerTarget] = useState("30");
  const [installerFreq, setInstallerFreq] = useState("Monthly");

  const [agencyToCorpThreshold, setAgencyToCorpThreshold] = useState("120%");
  const [corpToEnterpriseThreshold, setCorpToEnterpriseThreshold] = useState("150%");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Set Platform Target"
      description="Define performance benchmarks for each role"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "save_targets",
          label: "Save Targets",
          variant: "primary",
          onClick: () => {
            onSaveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Blue Info Banner */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5 text-xs text-[#1E40AF]">
          <Info className="size-4 shrink-0 text-[#2563EB] mt-0.5" />
          <p className="leading-relaxed font-medium">
            Targets apply platform-wide and affect upgrade eligibility and performance scoring for all agents.
          </p>
        </div>

        {/* ROLE TARGETS */}
        <div className="space-y-3">
          <label className="block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            ROLE TARGETS
          </label>

          {/* Agency Partners */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 font-bold text-[#2563EB]">
                Agency Partners
              </span>
              <span className="text-[11px] text-[#64748B]">Current: 50 activations/mo</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={agencyTarget}
                onChange={(e) => setAgencyTarget(e.target.value)}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-center font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
              <div className="flex items-center gap-1">
                {["Weekly", "Monthly", "Quarterly"].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setAgencyFreq(freq)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                      agencyFreq === freq
                        ? "bg-[#2563EB] text-white"
                        : "bg-white text-[#64748B] border border-[#CBD5E1]"
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Corporate Agents */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="rounded-md bg-[#F3E8FF] px-2 py-0.5 font-bold text-[#9333EA]">
                Corporate Agents
              </span>
              <span className="text-[11px] text-[#64748B]">Current: 100 activations/mo</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={corpTarget}
                onChange={(e) => setCorpTarget(e.target.value)}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-center font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
              <div className="flex items-center gap-1">
                {["Weekly", "Monthly", "Quarterly"].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setCorpFreq(freq)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                      corpFreq === freq
                        ? "bg-[#2563EB] text-white"
                        : "bg-white text-[#64748B] border border-[#CBD5E1]"
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Enterprise */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 font-bold text-[#059669]">
                Enterprise
              </span>
              <span className="text-[11px] text-[#64748B]">Current: 200 SIMs/mo</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={enterpriseTarget}
                onChange={(e) => setEnterpriseTarget(e.target.value)}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-center font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
              <div className="flex items-center gap-1">
                {["Weekly", "Monthly", "Quarterly"].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setEnterpriseFreq(freq)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                      enterpriseFreq === freq
                        ? "bg-[#2563EB] text-white"
                        : "bg-white text-[#64748B] border border-[#CBD5E1]"
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Installers */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 font-bold text-[#D97706]">
                Installers
              </span>
              <span className="text-[11px] text-[#64748B]">Current: 30 jobs/mo</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={installerTarget}
                onChange={(e) => setInstallerTarget(e.target.value)}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white px-3 py-2 text-center font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
              <div className="flex items-center gap-1">
                {["Weekly", "Monthly", "Quarterly"].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setInstallerFreq(freq)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
                      installerFreq === freq
                        ? "bg-[#2563EB] text-white"
                        : "bg-white text-[#64748B] border border-[#CBD5E1]"
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* UPGRADE THRESHOLDS */}
        <div className="space-y-3">
          <label className="block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            UPGRADE THRESHOLDS
          </label>

          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs">
              <span className="font-medium text-[#0F172A]">Agency Partner → Corporate Agent</span>
              <input
                type="text"
                value={agencyToCorpThreshold}
                onChange={(e) => setAgencyToCorpThreshold(e.target.value)}
                className="w-24 rounded-xl border border-[#CBD5E1] bg-white px-3 py-1.5 text-center font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs">
              <span className="font-medium text-[#0F172A]">Corporate Agent → Enterprise</span>
              <input
                type="text"
                value={corpToEnterpriseThreshold}
                onChange={(e) => setCorpToEnterpriseThreshold(e.target.value)}
                className="w-24 rounded-xl border border-[#CBD5E1] bg-white px-3 py-1.5 text-center font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Amber Warning Banner */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3.5 text-xs text-[#D97706]">
          <AlertTriangle className="size-4 shrink-0 text-[#D97706] mt-0.5" />
          <p className="leading-relaxed font-medium">
            Changes will take effect at the start of the next billing period and may trigger upgrade/downgrade reviews.
          </p>
        </div>
      </div>
    </AppModal>
  );
}
