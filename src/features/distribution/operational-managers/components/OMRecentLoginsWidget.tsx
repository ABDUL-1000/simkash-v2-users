"use client";

export function OMRecentLoginsWidget() {
  const logins = [
    { name: "Yusuf Adam Baba", time: "1 hour ago", device: "Chrome · Lagos" },
    { name: "Chidi Nnamdi", time: "3 hours ago", device: "Safari · Enugu" },
    { name: "Fatima Aliyu", time: "6 hours ago", device: "Chrome · Kano" },
    { name: "Bolaji Adekunle", time: "Yesterday", device: "Mobile · Ibadan" },
    { name: "Grace Eze", time: "2 days ago", device: "Firefox · PH" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">Recent Logins</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9]">
        {logins.map((item, idx) => (
          <div key={idx} className={`${idx > 0 ? "pt-2.5" : ""}`}>
            <strong className="font-bold text-[#0F172A] block text-xs">{item.name}</strong>
            <span className="text-[11px] text-[#64748B]">
              {item.time} · {item.device}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
