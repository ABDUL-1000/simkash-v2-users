import { Check, ArrowRight, Star, AlertCircle, CircleDot } from "lucide-react";

type ActivityItem = {
  id: string;
  title: string;
  time: string;
  icon: "check" | "dot" | "arrow" | "star" | "alert";
  bg: string;
  color: string;
};

const ACTIVITIES: ActivityItem[] = [
  { id: "1", title: "Emmanuel Eze approved as installer", time: "2m ago", icon: "check", bg: "#ECFDF5", color: "#059669" },
  { id: "2", title: "Chinedu Okafor completed job #J-1042", time: "18m ago", icon: "dot", bg: "#EFF6FF", color: "#2563EB" },
  { id: "3", title: "Solar job assigned to Aisha Bello", time: "1h ago", icon: "arrow", bg: "#EFF6FF", color: "#2563EB" },
  { id: "4", title: "New application from Kolade Adetutu", time: "3h ago", icon: "star", bg: "#FFFBEB", color: "#D97706" },
  { id: "5", title: "Dispute raised on job #J-1038", time: "5h ago", icon: "alert", bg: "#FFF1F2", color: "#DC2626" },
];

export function InstallerRecentActivityCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Recent Activity</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
        {ACTIVITIES.map((act, idx) => (
          <div key={act.id} className={`flex items-start gap-3 ${idx > 0 ? "pt-3" : ""}`}>
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: act.bg, color: act.color }}
            >
              {act.icon === "check" && <Check className="size-4 stroke-[3]" />}
              {act.icon === "dot" && <CircleDot className="size-4" />}
              {act.icon === "arrow" && <ArrowRight className="size-4" />}
              {act.icon === "star" && <Star className="size-4 fill-[#D97706]" />}
              {act.icon === "alert" && <AlertCircle className="size-4" />}
            </div>

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
