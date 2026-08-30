"use client";

export function RMRecentActivityWidget() {
  const activities = [
    { text: "Yusuf Adam Baba onboarded new SC", date: "18 Jul 2026", color: "bg-[#2563EB]" },
    { text: "450 SIMs distributed to SC Usman", date: "17 Jul 2026", color: "bg-[#059669]" },
    { text: "Network activations hit 142K milestone", date: "15 Jul 2026", color: "bg-[#059669]" },
    { text: "Ibrahim Musa account suspended", date: "10 Jul 2026", color: "bg-[#DC2626]" },
    { text: "Grace Eze account reinstated", date: "8 Jul 2026", color: "bg-[#059669]" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">Recent Activity</h3>

      <div className="space-y-3">
        {activities.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2.5">
            <span className={`size-2 rounded-full mt-1.5 shrink-0 ${item.color}`} />
            <div>
              <p className="font-bold text-[#0F172A] text-xs leading-snug">{item.text}</p>
              <span className="text-[10px] text-[#94A3B8]">{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
