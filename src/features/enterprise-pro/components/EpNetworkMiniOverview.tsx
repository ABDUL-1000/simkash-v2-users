import { colors } from "@/constants/colors";
import { initialNetworkActivities } from "../data/mockData";
import { formatNaira } from "../utils/formatters";
import { ArrowRight } from "lucide-react";

interface EpNetworkMiniOverviewProps {
  onViewAll: () => void;
}

export function EpNetworkMiniOverview({ onViewAll }: EpNetworkMiniOverviewProps) {
  const getBadgeClass = (network: string) => {
    switch (network) {
      case "MTN":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "GLO":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      case "AIRTEL":
        return "bg-red-100 text-red-900 border-red-300";
      default:
        return "bg-slate-800 text-white border-slate-700";
    }
  };

  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <p className="font-bold text-slate-900 text-sm">Network Activity Today</p>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View All <ArrowRight className="size-3" />
        </button>
      </div>

      <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
        {initialNetworkActivities.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl border p-2.5 transition hover:bg-slate-50/80"
            style={{ borderColor: colors.border }}
          >
            <div className="flex items-center gap-2.5">
              <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold border ${getBadgeClass(item.network)}`}>
                {item.network}
              </span>
              <div>
                <p className="font-bold text-slate-900 text-xs">{item.phoneNumber}</p>
                <p className="text-[10px] text-slate-400">
                  SC: {item.scName} · AP: {item.apName}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-emerald-600 text-xs">+{formatNaira(item.commission)}</span>
              <span className="text-[10px] text-slate-400 block">{item.timeAgo}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
