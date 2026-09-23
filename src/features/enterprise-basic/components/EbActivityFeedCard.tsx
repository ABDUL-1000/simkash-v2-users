import React from "react";
import { Smartphone, Users, Landmark, Percent, Package } from "lucide-react";
import { colors } from "@/constants/colors";

export const EbActivityFeedCard: React.FC = () => {
  const activities = [
    {
      id: "act-1",
      icon: Smartphone,
      title: "SIM Assigned",
      subtext: "Chidi Eze (MTN)",
      time: "3:47 PM",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "act-2",
      icon: Users,
      title: "Customer Added",
      subtext: "Grace Okonkwo",
      time: "2 days ago",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "act-3",
      icon: Landmark,
      title: "Instalment Paid",
      subtext: "₦350,000 confirmed",
      time: "14 Jun",
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "act-4",
      icon: Percent,
      title: "Margin Updated",
      subtext: "Wholesale sync",
      time: "10 Jun",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "act-5",
      icon: Package,
      title: "Order Delivered",
      subtext: "+200 CCTV SIMs",
      time: "5 Jun",
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-xs space-y-4"
      style={{ borderColor: colors.border }}
    >
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
        Activity Feed
      </span>

      <div className="space-y-3">
        {activities.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.id} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl ${a.bgColor} ${a.iconColor} flex items-center justify-center shrink-0`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-800">{a.title}</div>
                  <div className="text-[11px] text-slate-400">{a.subtext}</div>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{a.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
