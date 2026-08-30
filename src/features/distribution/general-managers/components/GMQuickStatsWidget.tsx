"use client";

export function GMQuickStatsWidget() {
  const stats = [
    { label: "Active", count: 16, color: "bg-[#059669]" },
    { label: "Suspended", count: 2, color: "bg-[#DC2626]" },
    { label: "Inactive", count: 0, color: "bg-[#94A3B8]" },
    { label: "Assigned this month", count: 3, color: "bg-[#2563EB]" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">Quick Stats</h3>

      <div className="space-y-3">
        {stats.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${item.color}`} />
              <span className="font-bold text-[#0F172A]">{item.label}</span>
            </div>
            <strong className="font-extrabold text-[#0F172A] text-sm">{item.count}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
