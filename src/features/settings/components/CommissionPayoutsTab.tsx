"use client";

import { useState } from "react";

export function CommissionPayoutsTab() {
  const [simCommission, setSimCommission] = useState("1,000");
  const [refCommission, setRefCommission] = useState("50,000");
  const [installerFee, setInstallerFee] = useState("40,000");
  const [simSwapFee, setSimSwapFee] = useState("3,500");
  const [apiFee, setApiFee] = useState("50");

  const [minPayout, setMinPayout] = useState("8,500");
  const [maxPayout, setMaxPayout] = useState("500,000");
  const [payoutTime, setPayoutTime] = useState("4");
  const [manualApprovalAbove, setManualApprovalAbove] = useState("50,000");

  return (
    <div className="space-y-6 text-xs sm:text-sm">
      {/* Commission & Payout Rates */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Commission & Payout Rates</h3>
        <p className="text-xs text-[#64748B]">Platform-wide rates applied to all roles — changes affect future transactions only</p>

        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5 text-xs text-[#2563EB] font-medium">
          💡 Commission rates are fixed for all agents. Changes apply to future activations only.
        </div>

        <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
          <div className="flex items-center justify-between pt-1">
            <div>
              <strong className="font-bold text-[#0F172A] block">SIM Activation Commission</strong>
              <span className="text-[11px] text-[#64748B]">Per activation, all roles</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#0F172A]">₦</span>
              <input
                type="text"
                value={simCommission}
                onChange={(e) => setSimCommission(e.target.value)}
                className="w-28 rounded-xl border border-[#E2E8F0] bg-white p-2 font-bold text-[#0F172A] text-right focus:border-[#2563EB] focus:outline-none"
              />
              <span className="text-[11px] text-[#94A3B8]">per activation</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <strong className="font-bold text-[#0F172A] block">Referral Commission</strong>
              <span className="text-[11px] text-[#64748B]">Per closed B2B deal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#0F172A]">₦</span>
              <input
                type="text"
                value={refCommission}
                onChange={(e) => setRefCommission(e.target.value)}
                className="w-28 rounded-xl border border-[#E2E8F0] bg-white p-2 font-bold text-[#0F172A] text-right focus:border-[#2563EB] focus:outline-none"
              />
              <span className="text-[11px] text-[#94A3B8]">per deal</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <strong className="font-bold text-[#0F172A] block">Installer Job Fee</strong>
              <span className="text-[11px] text-[#64748B]">Per completed installation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#0F172A]">₦</span>
              <input
                type="text"
                value={installerFee}
                onChange={(e) => setInstallerFee(e.target.value)}
                className="w-28 rounded-xl border border-[#E2E8F0] bg-white p-2 font-bold text-[#0F172A] text-right focus:border-[#2563EB] focus:outline-none"
              />
              <span className="text-[11px] text-[#94A3B8]">per job</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <strong className="font-bold text-[#0F172A] block">SIM Swap Fee</strong>
              <span className="text-[11px] text-[#64748B]">All swap types including lost SIM and network issue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#0F172A]">₦</span>
              <input
                type="text"
                value={simSwapFee}
                onChange={(e) => setSimSwapFee(e.target.value)}
                className="w-28 rounded-xl border border-[#E2E8F0] bg-white p-2 font-bold text-[#0F172A] text-right focus:border-[#2563EB] focus:outline-none"
              />
              <span className="text-[11px] text-[#94A3B8]">per swap</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <strong className="font-bold text-[#0F172A] block">API Transaction Fee</strong>
              <span className="text-[11px] text-[#64748B]">Default rate for new API users (overridable per account)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#0F172A]">₦</span>
              <input
                type="text"
                value={apiFee}
                onChange={(e) => setApiFee(e.target.value)}
                className="w-28 rounded-xl border border-[#E2E8F0] bg-white p-2 font-bold text-[#0F172A] text-right focus:border-[#2563EB] focus:outline-none"
              />
              <span className="text-[11px] text-[#94A3B8]">per transaction</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
        >
          Update Rates
        </button>
      </div>

      {/* Payout Configuration */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Payout Configuration</h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0F172A]">Min Payout Amount</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#0F172A]">₦</span>
              <input
                type="text"
                value={minPayout}
                onChange={(e) => setMinPayout(e.target.value)}
                className="w-32 rounded-xl border border-[#E2E8F0] bg-white p-2 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0F172A]">Max Single Payout</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-[#0F172A]">₦</span>
              <input
                type="text"
                value={maxPayout}
                onChange={(e) => setMaxPayout(e.target.value)}
                className="w-32 rounded-xl border border-[#E2E8F0] bg-white p-2 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0F172A]">Payout Processing Time</span>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={payoutTime}
                onChange={(e) => setPayoutTime(e.target.value)}
                className="w-16 rounded-xl border border-[#E2E8F0] bg-white p-2 text-center font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
              <span className="text-[11px] text-[#94A3B8]">hours</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F172A]">Manual Approval Required Above</span>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#0F172A]">₦</span>
                <input
                  type="text"
                  value={manualApprovalAbove}
                  onChange={(e) => setManualApprovalAbove(e.target.value)}
                  className="w-32 rounded-xl border border-[#E2E8F0] bg-white p-2 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                />
              </div>
            </div>
            <span className="text-[10px] text-[#94A3B8] block mt-1">
              Payouts of ₦50,000 and above are held for manual Admin approval. Below ₦50,000 are auto-approved.
            </span>
          </div>

          <div>
            <span className="font-bold text-[#0F172A] block mb-1.5">Payout Days</span>
            <div className="flex items-center gap-1.5">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <button
                  key={day}
                  type="button"
                  className={`rounded-xl px-3 py-1.5 font-bold text-xs ${
                    day !== "Sat" ? "bg-[#2563EB] text-white" : "bg-[#F8FAFC] text-[#64748B] border border-[#CBD5E1]"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
        >
          Save Config
        </button>
      </div>
    </div>
  );
}
