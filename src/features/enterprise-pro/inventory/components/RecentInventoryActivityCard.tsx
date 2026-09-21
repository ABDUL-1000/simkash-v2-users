import React from "react";
import { ArrowDownLeft, ArrowUpRight, RotateCcw, Clock, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { colors } from "@/constants/colors";
import { appPaths } from "@/app/router/paths";
import type { InventoryActivityItem } from "../types";

interface RecentInventoryActivityCardProps {
  activities: InventoryActivityItem[];
}

export const RecentInventoryActivityCard: React.FC<RecentInventoryActivityCardProps> = ({
  activities,
}) => {
  const navigate = useNavigate();

  const getIcon = (type: InventoryActivityItem["type"]) => {
    switch (type) {
      case "reorder":
        return {
          icon: ArrowDownLeft,
          color: "text-emerald-600 bg-emerald-100",
        };
      case "distribution":
        return {
          icon: ArrowUpRight,
          color: "text-blue-600 bg-blue-100",
        };
      case "return":
      default:
        return {
          icon: RotateCcw,
          color: "text-amber-600 bg-amber-100",
        };
    }
  };

  return (
    <div
      className="p-5 bg-white rounded-xl border space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: colors.border }}>
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Recent Inventory Activity
          </h3>
          <p className="text-xs text-slate-500">
            Real-time audit log of stock intakes, coordinator dispatches, and returns
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate(appPaths.enterpriseProInventoryHistory)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {activities.map((act) => {
          const { icon: Icon, color } = getIcon(act.type);

          return (
            <div
              key={act.id}
              className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start gap-3"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-bold text-xs text-slate-900 truncate">
                    {act.title}
                  </span>
                  <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {act.timestamp}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-snug">
                  {act.description}
                </p>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Batch:{" "}
                    <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-700">
                      {act.referenceId}
                    </code>
                  </span>
                  <span className="text-xs font-bold text-slate-900">
                    {act.totalSims.toLocaleString()} units
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
