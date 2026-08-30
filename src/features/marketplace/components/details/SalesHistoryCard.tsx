export function SalesHistoryCard() {
  const months = [
    { label: "J", height: 25 },
    { label: "A", height: 35 },
    { label: "S", height: 45 },
    { label: "O", height: 30 },
    { label: "N", height: 55 },
    { label: "D", height: 90, isPeak: true },
    { label: "J", height: 40 },
    { label: "F", height: 50 },
    { label: "M", height: 60 },
    { label: "A", height: 45 },
    { label: "M", height: 65 },
    { label: "J", height: 75 },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F172A]">Sales History</h3>
        <span className="text-xs text-[#94A3B8]">12 months</span>
      </div>

      {/* Bar Chart Visual */}
      <div className="flex items-end justify-between gap-1.5 pt-6 pb-2 h-32 border-b border-[#F1F5F9]">
        {months.map((m, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 flex-1">
            <div
              className={`w-full max-w-[16px] rounded-t-md transition-all duration-300 ${
                m.isPeak ? "bg-[#2563EB]" : "bg-[#BFDBFE]"
              }`}
              style={{ height: `${m.height}%` }}
            />
            <span className="text-[10px] font-bold text-[#64748B]">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="size-2.5 rounded-full bg-[#2563EB]" />
        <span className="text-[#64748B]">Best month:</span>
        <strong className="font-bold text-[#0F172A]">Dec 2025 — 201 units</strong>
      </div>
    </div>
  );
}
