const SALES_BREAKDOWN = [
  { package: "5GB", count: 124, total: "₦248,000" },
  { package: "10GB", count: 89, total: "₦311,500" },
  { package: "20GB", count: 64, total: "₦384,000" },
  { package: "50GB", count: 23, total: "₦299,000" },
  { package: "100GB", count: 8, total: "₦192,000" },
];

export function ZeroLimitSalesTodayCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Data Sales Today</h3>

      {/* Top row metrics */}
      <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
        <div>
          <p className="text-[11px] text-[#64748B]">Total data sold today</p>
          <p className="text-xl font-extrabold text-[#0F172A]">847GB</p>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-[#64748B]">Revenue today</p>
          <p className="text-xl font-extrabold text-[#059669]">₦4,235,000</p>
        </div>
      </div>

      {/* Packages sold breakdown list */}
      <div>
        <p className="mb-2 text-[11px] font-semibold text-[#94A3B8]">Packages sold</p>
        <div className="space-y-2 text-xs font-semibold">
          {SALES_BREAKDOWN.map((item) => (
            <div key={item.package} className="flex items-center justify-between">
              <span className="text-[#0F172A]">
                {item.package} <span className="font-normal text-[#94A3B8]">× {item.count}</span>
              </span>
              <span className="font-bold text-[#0F172A]">{item.total}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
