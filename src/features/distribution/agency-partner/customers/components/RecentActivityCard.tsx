import { Activity, UserPlus, RefreshCw, Bell, AlertCircle } from "lucide-react";

export function RecentActivityCard() {
  const activities = [
    {
      id: "1",
      icon: UserPlus,
      iconColor: "text-[#2563EB]",
      bgColor: "bg-[#EFF6FF]",
      title: "New customer: Chioma Eze",
      time: "10 min ago",
    },
    {
      id: "2",
      icon: RefreshCw,
      iconColor: "text-[#10B981]",
      bgColor: "bg-[#EBFFF8]",
      title: "SIM renewed: Chidi Eze",
      time: "1 hr ago",
    },
    {
      id: "3",
      icon: Bell,
      iconColor: "text-[#F59E0B]",
      bgColor: "bg-[#FFFBEB]",
      title: "Reminder sent: Fatima Ali",
      time: "2 hrs ago",
    },
    {
      id: "4",
      icon: AlertCircle,
      iconColor: "text-[#EF4444]",
      bgColor: "bg-[#FFF1F2]",
      title: "SIM expired: Hassan Ibrahim",
      time: "Yesterday",
    },
    {
      id: "5",
      icon: UserPlus,
      iconColor: "text-[#2563EB]",
      bgColor: "bg-[#EFF6FF]",
      title: "New customer: Ngozi Adeyemi",
      time: "Yesterday",
    },
  ];

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center gap-2 text-[#0F152A]">
        <Activity className="size-4 text-[#2563EB]" />
        <h3 className="text-sm font-bold">Recent Activity</h3>
      </div>

      <div className="space-y-3.5 text-xs">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="flex items-center gap-3">
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-full ${act.bgColor} ${act.iconColor}`}
              >
                <Icon className="size-4" />
              </div>
              <div>
                <p className="font-bold text-[#0F152A]">{act.title}</p>
                <p className="text-[10px] text-[#8C909B]">{act.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
