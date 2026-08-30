import { ArrowRight } from "lucide-react";

type ActivityItem = {
  id: string;
  text: string;
  time: string;
  dotColor: string;
};

const ACTIVITIES: ActivityItem[] = [
  { id: "1", text: "SIM distributed to Chidi Eze by Rabiu Sani", time: "2 min ago", dotColor: "#10B981" },
  { id: "2", text: "Data purchased: 20GB by 08034567890", time: "15 min ago", dotColor: "#2563EB" },
  { id: "3", text: "SIM low data alert — 08055544444 at 18%", time: "1 hr ago", dotColor: "#F59E0B" },
  { id: "4", text: "SIM exhausted — 08022222222 reached 0GB", time: "3 hrs ago", dotColor: "#EF4444" },
  { id: "5", text: "Renewal processed: 10GB for 07011112222", time: "5 hrs ago", dotColor: "#10B981" },
];

export function ZeroLimitRecentActivityCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F172A]">Recent Activity</h3>
        <button type="button" className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline">
          <span>See All</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {ACTIVITIES.map((item) => (
          <div key={item.id} className="flex items-start gap-2.5">
            <span
              className="mt-1.5 size-2 rounded-full shrink-0"
              style={{ backgroundColor: item.dotColor }}
            />
            <div>
              <p className="text-xs font-semibold text-[#0F172A] leading-snug">{item.text}</p>
              <span className="text-[11px] text-[#94A3B8]">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
