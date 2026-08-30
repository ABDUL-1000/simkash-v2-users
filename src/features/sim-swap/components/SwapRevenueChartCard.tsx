const DAYS = [
  { day: "M", height: "45%" },
  { day: "T", height: "65%" },
  { day: "W", height: "55%" },
  { day: "T", height: "85%" },
  { day: "F", height: "70%" },
  { day: "S", height: "95%" },
  { day: "S", height: "60%" },
];

export function SwapRevenueChartCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">Swap Revenue</h3>
          <span className="text-xs text-[#94A3B8]">This month</span>
        </div>

        {/* Bar Chart Container */}
        <div className="mt-4 flex h-28 items-end justify-between gap-2 px-2 border-b border-[#F1F5F9] pb-2">
          {DAYS.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5 h-full justify-end">
              <div
                className="w-full max-w-[24px] rounded-t-md bg-[#3B82F6] transition-all hover:bg-[#2563EB]"
                style={{ height: d.height }}
              />
              <span className="text-[11px] font-bold text-[#94A3B8]">{d.day}</span>
            </div>
          ))}
        </div>

        {/* Legend Breakdown */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#2563EB]" />
              <span className="text-[#64748B]">Same-Network</span>
            </div>
            <strong className="font-bold text-[#0F172A]">₦2,142,000</strong>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#9333EA]" />
              <span className="text-[#64748B]">Cross-Network</span>
            </div>
            <strong className="font-bold text-[#0F172A]">₦822,500</strong>
          </div>
        </div>
      </div>

      {/* Footer Total */}
      <div className="mt-4 flex items-center justify-between border-t border-[#F1F5F9] pt-3 text-xs">
        <span className="font-bold text-[#0F172A]">Total Revenue</span>
        <span className="text-sm font-extrabold text-[#2563EB]">₦2,964,500</span>
      </div>
    </div>
  );
}
