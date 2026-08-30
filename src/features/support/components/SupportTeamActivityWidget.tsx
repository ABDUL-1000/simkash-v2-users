"use client";

export function SupportTeamActivityWidget() {
  const team = [
    { name: "Chidi Eze", avg: "1.8 hrs", resolved: "18 resolved" },
    { name: "Rabiu Sani", avg: "2.1 hrs", resolved: "14 resolved" },
    { name: "Francis Udom", avg: "3.4 hrs", resolved: "10 resolved" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">Team Activity</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {team.map((item, idx) => (
          <div key={item.name} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
            <div>
              <strong className="font-bold text-[#0F172A] block text-xs">{item.name}</strong>
              <span className="text-[11px] text-[#64748B]">Avg response: {item.avg}</span>
            </div>
            <strong className="font-extrabold text-[#059669] text-xs">{item.resolved}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
