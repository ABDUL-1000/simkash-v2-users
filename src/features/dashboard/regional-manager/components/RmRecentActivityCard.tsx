import { Zap, Package, Award, AlertTriangle, UserCheck, Clock } from "lucide-react";
import type { NetworkActivityItem } from "../types/regional-manager.types";

interface RmRecentActivityCardProps {
  activities: NetworkActivityItem[];
  onViewAll?: () => void;
}

export function RmRecentActivityCard({ activities, onViewAll }: RmRecentActivityCardProps) {
  const getIcon = (type: NetworkActivityItem["type"]) => {
    switch (type) {
      case "sim_activated":
      case "batch_activations":
        return <Zap className="size-3.5 text-[#10B981]" />;
      case "stock_distributed":
        return <Package className="size-3.5 text-[#2563EB]" />;
      case "bonus_achieved":
        return <Award className="size-3.5 text-[#F59E0B]" />;
      case "low_stock":
      case "sc_at_risk":
        return <AlertTriangle className="size-3.5 text-[#EF4444]" />;
      case "sc_onboarded":
        return <UserCheck className="size-3.5 text-[#2563EB]" />;
      default:
        return <Clock className="size-3.5 text-[#64748B]" />;
    }
  };

  const getBadgeStyle = (tone: NetworkActivityItem["badgeTone"]) => {
    switch (tone) {
      case "success":
        return "text-[#10B981] font-black";
      case "warning":
        return "text-[#D97706] font-bold";
      case "danger":
        return "text-[#EF4444] font-bold";
      case "info":
        return "text-[#2563EB] font-bold";
      default:
        return "text-[#0F152A] font-bold";
    }
  };

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-black text-[#0F152A]">Recent Network Activity</h3>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-[#2563EB] hover:underline"
        >
          View all →
        </button>
      </div>

      <div className="space-y-3 text-xs divide-y divide-[#F1F5F9]">
        {activities.map((act) => (
          <div key={act.id} className="flex items-center justify-between pt-2.5 first:pt-0">
            <div className="flex items-center gap-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2ECF6]">
                {getIcon(act.type)}
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#0F152A]">{act.title}</h4>
                <p className="text-[11px] text-[#66738C]">{act.subtitle}</p>
              </div>
            </div>

            <div className="text-right">
              <span className={`text-xs ${getBadgeStyle(act.badgeTone)}`}>
                {act.badgeText}
              </span>
              <p className="text-[10px] text-[#94A3B8]">{act.timeAgo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RmRecentActivityCard;
