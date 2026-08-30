"use client";

import { useState } from "react";

export function BonusRewardsTab() {
  const [scTarget, setScTarget] = useState("500");
  const [scReward, setScReward] = useState("₦10,000");

  const [apTarget, setApTarget] = useState("200");
  const [apReward, setApReward] = useState("₦5,000");

  return (
    <div className="space-y-6 text-xs sm:text-sm">
      <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3.5 text-xs text-[#2563EB] font-medium">
        💡 Bonus targets are binary — agents who hit their target get the full reward automatically. Agents who miss get nothing. Changes apply from the next period only.
      </div>

      {/* Bonus Status */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">This Month's Bonus Status</h3>
          <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-xs font-bold text-[#2563EB]">Jun 2026</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">TOTAL BONUSES PAID</span>
            <strong className="text-lg font-extrabold text-[#059669] block">₦847,000</strong>
            <span className="text-[10px] text-[#94A3B8]">This period · 47 agents</span>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">TARGET HIT RATE</span>
            <strong className="text-lg font-extrabold text-[#2563EB] block">68%</strong>
            <span className="text-[10px] text-[#94A3B8]">of all agents on target</span>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">AT RISK</span>
            <strong className="text-lg font-extrabold text-[#D97706] block">124</strong>
            <span className="text-[10px] text-[#94A3B8]">&lt;50% in last 7 days</span>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wide text-[#64748B]">PROJECTED PAYOUT</span>
            <strong className="text-lg font-extrabold text-[#0F172A] block">₦2,400,000</strong>
            <span className="text-[10px] text-[#94A3B8]">if all remaining hit</span>
          </div>
        </div>
      </div>

      {/* SC & AP Bonus Config Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* SC Bonus Config */}
        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0F172A]">State Coordinator Bonus Config</h3>
            <span className="rounded-md bg-[#F3E8FF] px-2 py-0.5 text-xs font-bold text-[#9333EA]">SC</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="mb-1 block font-bold text-[#64748B]">Activation Target</label>
              <input
                type="text"
                value={scTarget}
                onChange={(e) => setScTarget(e.target.value)}
                className="w-full rounded-xl border border-[#E2E8F0] bg-white p-2.5 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block font-bold text-[#64748B]">Bonus Reward</label>
              <input
                type="text"
                value={scReward}
                onChange={(e) => setScReward(e.target.value)}
                className="w-full rounded-xl border border-[#E2E8F0] bg-white p-2.5 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>

          <button type="button" className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8] w-full">
            Save SC Configuration
          </button>
        </div>

        {/* AP Bonus Config */}
        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0F172A]">Agency Partner Bonus Config</h3>
            <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-xs font-bold text-[#2563EB]">AP</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="mb-1 block font-bold text-[#64748B]">Activation Target</label>
              <input
                type="text"
                value={apTarget}
                onChange={(e) => setApTarget(e.target.value)}
                className="w-full rounded-xl border border-[#E2E8F0] bg-white p-2.5 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block font-bold text-[#64748B]">Bonus Reward</label>
              <input
                type="text"
                value={apReward}
                onChange={(e) => setApReward(e.target.value)}
                className="w-full rounded-xl border border-[#E2E8F0] bg-white p-2.5 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          </div>

          <button type="button" className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8] w-full">
            Save AP Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
