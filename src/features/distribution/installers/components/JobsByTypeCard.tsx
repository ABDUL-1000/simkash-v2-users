type BreakdownItem = {
  label: string;
  pct: string;
  color: string;
};

const BREAKDOWN: BreakdownItem[] = [
  { label: "CCTV Installation", pct: "45%", color: "#2563EB" },
  { label: "Solar Installation", pct: "30%", color: "#F59E0B" },
  { label: "CCTV Maintenance", pct: "15%", color: "#9333EA" },
  { label: "Solar Maintenance", pct: "10%", color: "#10B981" },
];

export function JobsByTypeCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Jobs by Type</h3>

      {/* Donut Ring Visual */}
      <div className="relative mx-auto flex size-36 items-center justify-center rounded-full border-[14px] border-[#2563EB] border-t-[#F59E0B] border-r-[#9333EA] border-b-[#10B981]">
        <div className="text-center">
          <p className="text-2xl font-extrabold text-[#0F172A]">847</p>
        </div>
      </div>

      {/* Legend Breakdown */}
      <div className="space-y-2 text-xs">
        {BREAKDOWN.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[#64748B]">{item.label}</span>
            </div>
            <strong className="font-bold text-[#0F172A]">{item.pct}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
