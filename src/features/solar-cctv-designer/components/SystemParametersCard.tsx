"use client";

import { Check } from "lucide-react";

export function SystemParametersCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">System Parameters</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
        <div className="flex items-center justify-between pb-1">
          <span className="text-[#64748B]">Backup Hours</span>
          <strong className="font-bold text-[#0F172A]">8 hours</strong>
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <span className="text-[#64748B]">State</span>
          <strong className="font-bold text-[#0F172A]">Lagos (4.5 hrs sun)</strong>
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <span className="text-[#64748B]">Budget</span>
          <span className="italic text-[#94A3B8]">₦500K - ₦1M (optional)</span>
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <span className="text-[#64748B]">Inverter Type</span>
          <strong className="font-bold text-[#0F172A]">Pure Sine Wave</strong>
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <span className="text-[#64748B]">CCTV Included</span>
          <span className="flex items-center gap-1 font-bold text-[#059669]">
            Yes <Check className="size-4 text-[#059669]" />
          </span>
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <span className="text-[#64748B]">System Voltage</span>
          <strong className="font-bold text-[#0F172A]">24V</strong>
        </div>
      </div>
    </div>
  );
}
