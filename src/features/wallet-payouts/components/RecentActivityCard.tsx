type ActivityItem = {
  id: string;
  dotColor: string;
  text: string;
  time: string;
};

const ACTIVITIES: ActivityItem[] = [
  { id: "1", dotColor: "#10B981", text: "Payout approved — ₦180,000 to Emeka Okonkwo", time: "2 min ago" },
  { id: "2", dotColor: "#2563EB", text: "Payout processed — ₦75,000 to Seun Williams", time: "14 min ago" },
  { id: "3", dotColor: "#EF4444", text: "Payout rejected — ₦50,000 (Nkechi Eze, docs)", time: "38 min ago" },
  { id: "4", dotColor: "#2563EB", text: "Bulk approval — 5 payouts by Admin", time: "1h ago" },
  { id: "5", dotColor: "#D97706", text: "Wallet frozen — 3 accounts suspended", time: "2h ago" },
  { id: "6", dotColor: "#10B981", text: "Wallet unfrozen — Rabiu Sani reinstated", time: "3h ago" },
];

export function RecentActivityCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Recent Activity</h3>

      <div className="space-y-3.5">
        {ACTIVITIES.map((act) => (
          <div key={act.id} className="flex items-start gap-2.5">
            <span
              className="size-2 rounded-full mt-1 shrink-0"
              style={{ backgroundColor: act.dotColor }}
            />
            <div>
              <p className="font-medium text-[#0F172A] leading-tight">{act.text}</p>
              <span className="text-[10px] text-[#94A3B8] mt-0.5 block">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
