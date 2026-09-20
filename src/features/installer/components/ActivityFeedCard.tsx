import { Briefcase, CheckCircle2, Clock, AlertCircle, Star } from "lucide-react";
import type { ActivityFeedItem } from "../types";
import { ACTIVITY_FEED } from "../data/installer.data";

interface ActivityFeedCardProps {
  onSelectItem?: (item: ActivityFeedItem) => void;
}

export function ActivityFeedCard({ onSelectItem }: ActivityFeedCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "assigned":
        return { icon: Briefcase, bg: "#F1EAFE", color: "#7C3AED" };
      case "completed":
        return { icon: CheckCircle2, bg: "#EBFFF8", color: "#10B981" };
      case "verification":
        return { icon: Clock, bg: "#FEF3C7", color: "#D9990D" };
      case "dispute":
        return { icon: AlertCircle, bg: "#FEE2E2", color: "#EF4444" };
      case "review":
        return { icon: Star, bg: "#FEF3C7", color: "#F59E0B" };
      default:
        return { icon: Briefcase, bg: "#EFF4F8", color: "#2563EB" };
    }
  };

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-5 shadow-xs">
      <h3 className="text-sm font-bold text-[#0F152A] sm:text-base">Activity Feed</h3>

      <div className="mt-4 space-y-3.5">
        {ACTIVITY_FEED.map((item) => {
          const config = getIcon(item.type);
          const Icon = config.icon;

          return (
            <div
              key={item.id}
              onClick={() => onSelectItem?.(item)}
              className="flex cursor-pointer items-start gap-3 rounded-2xl p-1.5 transition-colors hover:bg-[#F8FAFC]"
            >
              <div
                className="flex size-7 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: config.bg, color: config.color }}
              >
                <Icon className="size-3.5" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0F152A]">{item.title}</span>
                  <span className="text-[10px] text-[#8C909B]">{item.timeAgo}</span>
                </div>
                <p className="text-[11px] text-[#66738C]">{item.details}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
