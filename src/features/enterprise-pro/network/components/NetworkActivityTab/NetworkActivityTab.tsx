import React from "react";
import { UserPlus, Send, PauseCircle, Percent, CheckCircle2, RotateCcw } from "lucide-react";
import { colors } from "@/constants/colors";

export const NetworkActivityTab: React.FC = () => {
  const activities = [
    {
      id: "act-1",
      title: "Rate Updated for Aminat Okafor",
      description: "Commission rate adjusted to 10.0% by Enterprise Admin.",
      time: "10 mins ago",
      icon: Percent,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "act-2",
      title: "Activation Reminder Dispatched",
      description: "SMS & WhatsApp reminder sent to Fatima A. (Kaduna State).",
      time: "1 hour ago",
      icon: Send,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      id: "act-3",
      title: "New Coordinator Onboarded",
      description: "Ngozi Adeyemi invited to coordinate Delta State territory with 95 initial SIMs.",
      time: "Yesterday, 3:45 PM",
      icon: UserPlus,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "act-4",
      title: "Glory Effah Suspended",
      description: "Coordinator account temporarily suspended due to inactivity > 30 days.",
      time: "14 Jun 2026",
      icon: PauseCircle,
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      id: "act-5",
      title: "Bulk SIM Distribution Completed",
      description: "1,200 POS and Router SIMs dispatched to South West coordinators.",
      time: "12 Jun 2026",
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "act-6",
      title: "Coordinator Reinstated",
      description: "Chidi Eze reinstated after KYC documentation review.",
      time: "02 Jun 2026",
      icon: RotateCcw,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div>
        <h3 className="font-bold text-gray-900 text-sm sm:text-base">Network Audit & Activity Log</h3>
        <p className="text-xs text-gray-500">Timeline of state coordinator updates, onboarding, and alerts</p>
      </div>

      <div className="space-y-3 pt-2">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:bg-slate-50 transition"
            >
              <div
                className={`w-9 h-9 rounded-xl ${act.bgColor} flex items-center justify-center shrink-0 mt-0.5`}
              >
                <Icon className={`w-4 h-4 ${act.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-gray-900 truncate">{act.title}</h4>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">{act.time}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{act.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
