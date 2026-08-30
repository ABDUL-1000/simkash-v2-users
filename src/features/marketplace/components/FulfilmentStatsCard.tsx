export function FulfilmentStatsCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F172A]">Fulfilment Stats</h3>
        <span className="text-xs text-[#94A3B8]">Last 30 days</span>
      </div>

      <div className="space-y-2.5 divide-y divide-[#F1F5F9] text-xs">
        <div className="flex justify-between pt-1 text-[#64748B]">
          <span>Avg Processing</span>
          <strong className="font-extrabold text-[#0F172A]">1.8 days</strong>
        </div>

        <div className="flex justify-between pt-2 text-[#64748B]">
          <span>Dispatch Rate</span>
          <strong className="font-extrabold text-[#059669]">97.2%</strong>
        </div>

        <div className="flex justify-between pt-2 text-[#64748B]">
          <span>Delivery Rate</span>
          <strong className="font-extrabold text-[#059669]">94.5%</strong>
        </div>

        <div className="flex justify-between pt-2 text-[#64748B]">
          <span>Return Rate</span>
          <strong className="font-extrabold text-[#D97706]">2.3%</strong>
        </div>

        <div className="flex justify-between pt-2 text-[#64748B]">
          <span>Dispute Rate</span>
          <strong className="font-extrabold text-[#DC2626]">1.9%</strong>
        </div>
      </div>
    </div>
  );
}
