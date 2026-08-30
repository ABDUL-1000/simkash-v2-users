export function ReferralFunnelCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Referral Funnel</h3>

      <div className="space-y-4 text-xs">
        {/* Item 1: Registered */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-medium text-[#64748B]">Registered</span>
            <strong className="font-bold text-[#0F172A] text-sm">847</strong>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#F1F5F9]">
            <div className="h-2.5 w-[100%] rounded-full bg-[#0F1F36]" />
          </div>
          <span className="text-[11px] text-[#94A3B8]">100% of total</span>
        </div>

        {/* Item 2: In Review */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-medium text-[#64748B]">In Review</span>
            <strong className="font-bold text-[#0F172A] text-sm">523</strong>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#F1F5F9]">
            <div className="h-2.5 w-[61.7%] rounded-full bg-[#0F1F36]" />
          </div>
          <span className="text-[11px] text-[#94A3B8]">61.7% of total</span>
        </div>

        {/* Item 3: Deal Closed */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-medium text-[#64748B]">Deal Closed</span>
            <strong className="font-bold text-[#0F172A] text-sm">312</strong>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#F1F5F9]">
            <div className="h-2.5 w-[36.8%] rounded-full bg-[#0F1F36]" />
          </div>
          <span className="text-[11px] text-[#94A3B8]">36.8% of total</span>
        </div>

        {/* Item 4: Paid */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="font-medium text-[#64748B]">Paid</span>
            <strong className="font-bold text-[#0F172A] text-sm">250</strong>
          </div>
          <div className="h-2.5 w-full rounded-full bg-[#F1F5F9]">
            <div className="h-2.5 w-[29.5%] rounded-full bg-[#0F1F36]" />
          </div>
          <span className="text-[11px] text-[#94A3B8]">29.5% of total</span>
        </div>
      </div>
    </div>
  );
}
