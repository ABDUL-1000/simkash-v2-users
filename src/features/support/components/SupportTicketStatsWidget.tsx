"use client";

export function SupportTicketStatsWidget() {
  const stats = [
    { label: "SIM Issues", count: 42, percentage: 34, color: "bg-[#2563EB]" },
    { label: "Payments", count: 28, percentage: 23, color: "bg-[#2563EB]" },
    { label: "Account", count: 21, percentage: 17, color: "bg-[#2563EB]" },
    { label: "Device", count: 18, percentage: 15, color: "bg-[#2563EB]" },
    { label: "Marketplace", count: 10, percentage: 8, color: "bg-[#2563EB]" },
    { label: "General", count: 5, percentage: 4, color: "bg-[#2563EB]" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">Ticket Stats</h3>

      <div className="space-y-3">
        {stats.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-[#0F172A]">{item.label}</span>
              <span className="text-[#64748B]">
                {item.count} ({item.percentage}%)
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-[#F1F5F9]">
              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
