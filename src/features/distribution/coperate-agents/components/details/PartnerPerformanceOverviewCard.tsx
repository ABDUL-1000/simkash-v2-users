export function PartnerPerformanceOverviewCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-5">
      <h3 className="text-sm font-bold text-[#0F172A]">Performance Overview</h3>

      {/* Activation Target Progress */}
      <div className="space-y-2 border-b border-[#F1F5F9] pb-4">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#94A3B8]">
          Activation Target
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-[#9333EA]">847</span>
          <span className="text-xs font-semibold text-[#64748B]">of 500 target</span>
        </div>

        <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
          <div className="h-full rounded-full bg-[#9333EA]" style={{ width: "100%" }} />
        </div>

        <p className="text-xs font-bold text-[#9333EA]">
          169% of target achieved this month
        </p>
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-2 gap-4 border-b border-[#F1F5F9] pb-4 text-xs">
        <div>
          <span className="text-[#94A3B8]">This Month</span>
          <p className="font-extrabold text-[#0F172A] text-sm">124 activations</p>
        </div>
        <div>
          <span className="text-[#94A3B8]">Last Month</span>
          <p className="font-extrabold text-[#0F172A] text-sm">98 activations</p>
        </div>
        <div>
          <span className="text-[#94A3B8]">Best Month</span>
          <p className="font-extrabold text-[#0F172A] text-sm">201 activations</p>
        </div>
        <div>
          <span className="text-[#94A3B8]">Avg / Month</span>
          <p className="font-extrabold text-[#0F172A] text-sm">70 activations</p>
        </div>
      </div>

      {/* Commission Breakdown */}
      <div className="space-y-2.5 text-xs">
        <p className="text-[11px] font-bold uppercase tracking-wide text-[#94A3B8]">
          Commission Breakdown
        </p>

        <div className="flex items-center justify-between text-[#64748B]">
          <span>Per activation</span>
          <strong className="font-bold text-[#0F172A]">₦1,000</strong>
        </div>

        <div className="flex items-center justify-between text-[#64748B]">
          <span>Total earned</span>
          <strong className="font-bold text-[#0F172A]">₦847,000</strong>
        </div>

        <div className="flex items-center justify-between text-[#64748B]">
          <span>This month</span>
          <strong className="font-bold text-[#0F172A]">₦124,000</strong>
        </div>

        <div className="flex items-center justify-between text-[#64748B]">
          <span>Pending payout</span>
          <span className="rounded-md bg-[#FEF3C7] px-2 py-0.5 font-bold text-[#92400E]">
            ₦45,000
          </span>
        </div>
      </div>
    </div>
  );
}
