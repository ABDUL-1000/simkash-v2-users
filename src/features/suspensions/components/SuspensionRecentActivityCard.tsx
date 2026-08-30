type ActivityItem = {
  id: string;
  title: string;
  time: string;
  dotColor: string;
};

const ACTIVITIES: ActivityItem[] = [
  { id: "1", title: "Bright Nnamdi Okafor account suspended", time: "2h ago", dotColor: "#DC2626" },
  { id: "2", title: "Assets transferred — Adaeze Okonkwo", time: "1d ago", dotColor: "#2563EB" },
  { id: "3", title: "Yusuf Sani Musa reinstated successfully", time: "3d ago", dotColor: "#059669" },
  { id: "4", title: "Aminu Garba suspension reason updated", time: "5d ago", dotColor: "#64748B" },
  { id: "5", title: "Olawale Balogun wallet released on reinstatement", time: "8d ago", dotColor: "#059669" },
];

export function SuspensionRecentActivityCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Recent Activity</h3>

      <div className="space-y-3.5 text-xs">
        {ACTIVITIES.map((act) => (
          <div key={act.id} className="flex items-start gap-2.5">
            <span
              className="mt-1.5 size-2 shrink-0 rounded-full"
              style={{ backgroundColor: act.dotColor }}
            />
            <div>
              <p className="font-bold text-[#0F172A] leading-snug">{act.title}</p>
              <span className="text-[11px] text-[#94A3B8]">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
