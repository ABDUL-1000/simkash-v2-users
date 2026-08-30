"use client";

import { ArrowRight } from "lucide-react";

export function SystemArrangementCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">System Arrangement</h3>

      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-[#0F172A]">
          {/* Node 1: Panels */}
          <div className="flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 shadow-2xs">
            <span>☀️ 3× 400W</span>
          </div>

          <ArrowRight className="size-4 text-[#94A3B8]" />

          {/* Node 2: Controller */}
          <div className="flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 shadow-2xs">
            <span>🔌 40A MPPT</span>
          </div>

          <ArrowRight className="size-4 text-[#94A3B8]" />

          {/* Node 3: Battery */}
          <div className="flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 shadow-2xs">
            <span>🔋 4× 200Ah</span>
          </div>

          <ArrowRight className="size-4 text-[#94A3B8]" />

          {/* Node 4: Inverter */}
          <div className="flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 shadow-2xs">
            <span>⚡ 3.5KVA</span>
          </div>

          <ArrowRight className="size-4 text-[#94A3B8]" />

          {/* Node 5: AC Load */}
          <div className="flex items-center gap-2 rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 shadow-2xs">
            <span>AC Load</span>
          </div>

          {/* Load legend */}
          <div className="flex items-center gap-3 text-[11px] text-[#64748B] font-medium ml-auto">
            <span>💡 Lighting</span>
            <span>❄️ Cooling</span>
            <span className="font-bold text-[#0F172A]">📹 CCTV ×4</span>
            <span>🚪 Other</span>
          </div>
        </div>
      </div>
    </div>
  );
}
