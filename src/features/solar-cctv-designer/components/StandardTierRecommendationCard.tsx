"use client";

export function StandardTierRecommendationCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F172A]">Standard Tier Recommendation</h3>
        <span className="rounded-md bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-bold text-[#2563EB]">
          Standard
        </span>
      </div>

      <div className="space-y-3">
        {/* Solar Panels */}
        <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-3.5 space-y-1">
          <strong className="font-bold text-[#0F172A] block text-xs">☀️ Solar Panels</strong>
          <p className="text-[#0F172A] font-bold text-xs">3 × 400W Mono PERC panels</p>
          <span className="text-[10px] text-[#94A3B8] block">Total: 1,200W array</span>
          <strong className="font-extrabold text-[#0F172A] text-xs block pt-1">
            ₦85,000 × 3 = ₦255,000
          </strong>
        </div>

        {/* Battery Bank */}
        <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-3.5 space-y-1">
          <strong className="font-bold text-[#0F172A] block text-xs">🔋 Battery Bank</strong>
          <p className="text-[#0F172A] font-bold text-xs">4 × 12V 200Ah AGM</p>
          <span className="text-[10px] text-[#94A3B8] block">Total: 800Ah capacity</span>
          <strong className="font-extrabold text-[#0F172A] text-xs block pt-1">
            ₦160,000 × 4 = ₦640,000
          </strong>
        </div>

        {/* Inverter */}
        <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-3.5 space-y-1">
          <strong className="font-bold text-[#0F172A] block text-xs">⚡ Inverter</strong>
          <p className="text-[#0F172A] font-bold text-xs">1 × 3.5KVA Pure Sine Wave</p>
          <strong className="font-extrabold text-[#0F172A] text-xs block pt-1">
            ₦185,000
          </strong>
        </div>

        {/* Charge Controller */}
        <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-3.5 space-y-1">
          <strong className="font-bold text-[#0F172A] block text-xs">🔌 Charge Controller</strong>
          <p className="text-[#0F172A] font-bold text-xs">1 × 40A MPPT</p>
          <strong className="font-extrabold text-[#0F172A] text-xs block pt-1">
            ₦32,000
          </strong>
        </div>

        {/* OTHER COSTS */}
        <div className="space-y-2 pt-2 border-t border-[#F1F5F9] text-xs">
          <span className="font-bold uppercase tracking-wide text-[#64748B] text-[10px] block">
            OTHER COSTS
          </span>
          <div className="flex items-center justify-between text-[#64748B]">
            <span>Installation (3.2KVA)</span>
            <strong className="font-bold text-[#0F172A]">₦48,000</strong>
          </div>
          <div className="flex items-center justify-between text-[#64748B]">
            <span>Wiring & Cables</span>
            <strong className="font-bold text-[#0F172A]">₦25,000</strong>
          </div>
          <div className="flex items-center justify-between text-[#64748B]">
            <span>Mounting (3 panels)</span>
            <strong className="font-bold text-[#0F172A]">₦24,000</strong>
          </div>
        </div>

        {/* Total Estimate Sub-total Box */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[#64748B]">
            <span>Components</span>
            <span className="font-mono">₦1,112,000</span>
          </div>
          <div className="flex items-center justify-between text-[#64748B]">
            <span>Installation</span>
            <span className="font-mono">₦97,000</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-[#DBEAFE]">
            <strong className="font-extrabold text-[#0F172A] text-sm">Total Estimate</strong>
            <strong className="font-extrabold text-[#0F172A] text-base font-mono">
              ₦1,209,000
            </strong>
          </div>
          <span className="text-[11px] font-bold text-[#D97706] block pt-0.5">
            Over budget by ₦209,000
          </span>
        </div>
      </div>
    </div>
  );
}
