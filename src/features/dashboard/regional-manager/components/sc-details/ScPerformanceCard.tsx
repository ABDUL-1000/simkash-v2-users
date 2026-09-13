export function ScPerformanceCard() {
  const dailyBars = [
    35, 42, 28, 55, 60, 48, 38, 72, 65, 80, 52, 68, 74, 50, 62, 85, 90, 78, 95, 100, 88, 92,
  ];

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-[#0F152A]">Performance</h3>
        <span className="text-xs text-[#8C909B] font-semibold">Jun 2026</span>
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <div className="rounded-2xl bg-[#F8FAFC] p-3 text-center border border-[#E2ECF6]">
          <span className="text-[10px] text-[#8C909B]">Activations</span>
          <p className="text-base font-black text-[#0F152A]">1,847</p>
        </div>
        <div className="rounded-2xl bg-[#F8FAFC] p-3 text-center border border-[#E2ECF6]">
          <span className="text-[10px] text-[#8C909B]">Network APs</span>
          <p className="text-base font-black text-[#0F152A]">23</p>
        </div>
        <div className="rounded-2xl bg-[#F8FAFC] p-3 text-center border border-[#E2ECF6]">
          <span className="text-[10px] text-[#8C909B]">Avg/AP</span>
          <p className="text-base font-black text-[#0F152A]">80.3/mo</p>
        </div>
        <div className="rounded-2xl bg-[#F8FAFC] p-3 text-center border border-[#E2ECF6]">
          <span className="text-[10px] text-[#8C909B]">Commission</span>
          <p className="text-base font-black text-[#10B981]">₦1,847,000</p>
        </div>
      </div>

      {/* Daily Activations Bar Chart */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          Daily Activations — Jun 2026
        </span>
        <div className="flex h-16 items-end gap-1 rounded-2xl bg-[#F8FAFC] p-2 border border-[#E2ECF6]">
          {dailyBars.map((height, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-[#2563EB] transition-all hover:bg-[#1D4ED8]"
              style={{ height: `${height}%` }}
              title={`Day ${i + 1}: ${height} activations`}
            />
          ))}
        </div>
      </div>

      {/* Month Comparison Table */}
      <div className="space-y-1 pt-1 border-t border-[#E2ECF6]">
        <div className="flex justify-between py-1 text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          <span>Metric</span>
          <span>This Month</span>
          <span>Last Month</span>
        </div>
        <div className="divide-y divide-[#F1F5F9] text-xs">
          <div className="flex justify-between py-1.5">
            <span className="text-[#64748B]">Activations</span>
            <span className="font-bold text-[#10B981]">1,847</span>
            <span className="font-medium text-[#64748B]">1,204</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-[#64748B]">APs</span>
            <span className="font-bold text-[#0F152A]">23</span>
            <span className="font-medium text-[#64748B]">19</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-[#64748B]">Commission</span>
            <span className="font-bold text-[#10B981]">₦1,847K</span>
            <span className="font-medium text-[#64748B]">₦1,204K</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScPerformanceCard;
