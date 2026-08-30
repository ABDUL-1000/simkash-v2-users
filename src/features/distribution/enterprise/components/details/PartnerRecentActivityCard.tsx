import { Check, Users, ArrowUpRight, Banknote } from "lucide-react";

type Activity = {
  id: string;
  title: string;
  badgeText?: string;
  time: string;
  icon: "check" | "users" | "arrow" | "banknote";
  iconBg: string;
  iconColor: string;
};

const ACTIVITIES: Activity[] = [
  { id: "1", title: "SIM activated for customer 0812***4521", time: "2 min ago", icon: "check", iconBg: "#10B981", iconColor: "#FFFFFF" },
  { id: "2", title: "Sub-partner Aminat Okafor onboarded", time: "1 hour ago", icon: "users", iconBg: "#EEF2FF", iconColor: "#6366F1" },
  { id: "3", title: "5 SIMs activated (batch)", badgeText: "+₦8,500", time: "3 hours ago", icon: "check", iconBg: "#10B981", iconColor: "#FFFFFF" },
  { id: "4", title: "Distributed 50 SIMs to Glory Effah", time: "Yesterday", icon: "arrow", iconBg: "#2563EB", iconColor: "#FFFFFF" },
  { id: "5", title: "Commission payout ₦45,000 approved", time: "2 days ago", icon: "banknote", iconBg: "#10B981", iconColor: "#FFFFFF" },
  { id: "6", title: "Upgrade eligibility reached (500+ act)", time: "3 days ago", icon: "arrow", iconBg: "#C084FC", iconColor: "#FFFFFF" },
];

export function PartnerRecentActivityCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-[#0F172A]">Recent Activity</h3>

      <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
        {ACTIVITIES.map((act, idx) => (
          <div key={act.id} className={`flex items-start gap-3 ${idx > 0 ? "pt-3" : ""}`}>
            <div
              className="flex size-8 shrink-0 items-center justify-center rounded-xl font-bold"
              style={{ backgroundColor: act.iconBg, color: act.iconColor }}
            >
              {act.icon === "check" && <Check className="size-4 stroke-[3]" />}
              {act.icon === "users" && <Users className="size-4" />}
              {act.icon === "arrow" && <ArrowUpRight className="size-4 stroke-[3]" />}
              {act.icon === "banknote" && <Banknote className="size-4" />}
            </div>

            <div>
              <p className="font-bold text-[#0F172A] leading-snug">
                {act.title}
                {act.badgeText && (
                  <span className="ml-1.5 font-bold text-[#059669]">{act.badgeText}</span>
                )}
              </p>
              <span className="text-[11px] text-[#94A3B8]">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
