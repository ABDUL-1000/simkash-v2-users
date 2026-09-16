import { Smartphone, Package, Award, AlertCircle, Clock } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_ACTIVITY_FEED_DATA } from "../data/corporate-agent.data";
import type { CaActivityItem } from "../types/corporate-agent.types";

interface CaActivityFeedCardProps {
  onViewAll?: () => void;
}

export function CaActivityFeedCard({ onViewAll }: CaActivityFeedCardProps) {
  const getIcon = (item: CaActivityItem) => {
    switch (item.iconType) {
      case "sim":
        return {
          icon: <Smartphone className="w-3.5 h-3.5 text-blue-600" />,
          bg: "bg-blue-50",
        };
      case "stock":
        return {
          icon: <Package className="w-3.5 h-3.5 text-indigo-600" />,
          bg: "bg-indigo-50",
        };
      case "trophy":
        return {
          icon: <Award className="w-3.5 h-3.5 text-amber-600" />,
          bg: "bg-amber-50",
        };
      case "warning":
      default:
        return {
          icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600" />,
          bg: "bg-rose-50",
        };
    }
  };

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3 bg-white"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <h3 className="text-sm font-bold text-slate-900">Activity Feed</h3>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Real-time</span>
        </button>
      </div>

      {/* TIMELINE LIST */}
      <div className="relative pl-3 space-y-4 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
        {CA_ACTIVITY_FEED_DATA.map((item) => {
          const { icon, bg } = getIcon(item);

          return (
            <div key={item.id} className="relative flex items-start gap-3 text-xs">
              {/* Timeline marker icon */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 -ml-[19px] border-2 border-white shadow-xs ${bg}`}
              >
                {icon}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-slate-900 truncate">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                    {item.timeAgo}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
