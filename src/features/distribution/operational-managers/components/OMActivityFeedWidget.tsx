"use client";

export function OMActivityFeedWidget() {
  const activities = [
    { text: "Chidi Nnamdi assigned as Operational Manager", date: "12 Mar 2026", color: "bg-[#9333EA]" },
    { text: "Grace Eze account suspended", date: "1 Mar 2026", color: "bg-[#DC2626]" },
    { text: "Fatima Aliyu password reset completed", date: "18 Feb 2026", color: "bg-[#D97706]" },
    { text: "Yusuf Adam Baba role changed to Operational Manager", date: "10 Jan 2026", color: "bg-[#9333EA]" },
    { text: "Bolaji Adekunle last login recorded", date: "Today", color: "bg-[#059669]" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">Activity Feed</h3>

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
