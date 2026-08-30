"use client";

export function RMQuickStatsWidget() {
  const stats = [
    { label: "Total SIMs received", val: "8,400" },
    { label: "Total SIMs distributed", val: "6,234" },
    { label: "Remaining in inventory", val: "2,166" },
    { label: "Total commission paid", val: "₦6,234,000" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">Quick Stats</h3>

      <div className="space-y-3">
        {stats.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-[#64748B] font-medium">{item.label}</span>
            <strong className="font-extrabold text-[#0F172A] text-sm">{item.val}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
