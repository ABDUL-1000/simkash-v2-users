import { colors } from "@/constants/colors";
import { initialRecentActivities } from "../data/mockData";
import { Users, Package, Landmark, Percent, Trophy } from "lucide-react";

export function EpRecentOrdersCard() {
  const getIcon = (type: string) => {
    switch (type) {
      case "activation":
        return <Users className="size-3.5 text-emerald-600" />;
      case "order":
        return <Package className="size-3.5 text-blue-600" />;
      case "balance":
        return <Landmark className="size-3.5 text-amber-600" />;
      case "price":
        return <Percent className="size-3.5 text-purple-600" />;
      default:
        return <Trophy className="size-3.5 text-emerald-600" />;
    }
  };

  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3"
      style={{ borderColor: colors.border }}
    >
      <p className="font-bold text-slate-900 text-sm">Recent Activity</p>

      <div className="space-y-2.5 text-xs">
        {initialRecentActivities.map((act) => (
          <div key={act.id} className="flex items-start gap-2.5">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 mt-0.5">
              {getIcon(act.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <p className="font-bold text-slate-800 text-xs truncate">{act.title}</p>
                <span className="text-[10px] text-slate-400 shrink-0">{act.timeAgo}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">{act.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
