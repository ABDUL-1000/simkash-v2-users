export function CaNetworkMyStatsCard() {
  const stats = [
    { label: "POS SIM", count: 11, percent: 61, color: "bg-[#2563EB]" },
    { label: "CCTV SIM", count: 4, percent: 22, color: "bg-[#10B981]" },
    { label: "GPS SIM", count: 2, percent: 11, color: "bg-[#F59E0B]" },
    { label: "Router SIM", count: 1, percent: 6, color: "bg-[#EF4444]" },
  ];

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-extrabold text-[#0F152A]">My Own Stats</h3>
        <span className="text-[10px] font-bold text-[#8C909B]">By SIM Type</span>
      </div>

      <div className="space-y-3 text-xs pt-1">
        {stats.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between font-bold text-[11px]">
              <span className="text-[#66738C]">{item.label}</span>
              <span className="text-[#0F152A]">
                {item.count} ({item.percent}%)
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#EFF4F8] rounded-full overflow-hidden">
              <div
                className={`h-full ${item.color} rounded-full transition-all duration-300`}
                style={{ width: `${item.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
