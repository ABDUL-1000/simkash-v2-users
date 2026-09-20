import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_ACTIVATION_HISTORY_DATA } from "../data/corporate-agent.data";

interface CaRecentActivationsCardProps {
  onViewAll?: () => void;
}

export function CaRecentActivationsCard({ onViewAll }: CaRecentActivationsCardProps) {
  const [filter, setFilter] = useState<"all" | "mine">("all");

  const filteredItems = CA_ACTIVATION_HISTORY_DATA.filter((item) => {
    if (filter === "mine") return item.isDirect;
    return true;
  }).slice(0, 10);

  const getCarrierBadge = (carrier: string) => {
    switch (carrier) {
      case "MTN":
        return { bg: "#FEF08A", color: "#854D0E", label: "MTN" };
      case "Airtel":
        return { bg: "#FEE2E2", color: "#991B1B", label: "Airtel" };
      case "Glo":
        return { bg: "#DCFCE7", color: "#166534", label: "Glo" };
      case "9mobile":
      default:
        return { bg: "#0F172A", color: "#FFFFFF", label: "9mobile" };
    }
  };

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3 bg-white"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-slate-900">Recent Activations</h3>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-colors ${
                filter === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter("mine")}
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-colors ${
                filter === "mine"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              Mine Only
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ITEMS LIST */}
      <div className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
        {filteredItems.map((item) => {
          const carrierBadge = getCarrierBadge(item.carrier);

          return (
            <div
              key={item.id}
              className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Telco Badge */}
                <span
                  className="px-1.5 py-0.5 rounded text-[9px] font-black shrink-0"
                  style={{
                    backgroundColor: carrierBadge.bg,
                    color: carrierBadge.color,
                  }}
                >
                  {carrierBadge.label}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900 truncate">{item.phone}</span>
                    {item.isDirect ? (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-100 text-blue-700">
                        You
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 truncate">
                        {item.actor}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate">
                    {item.customerName} • {item.timeLabel}
                  </span>
                </div>
              </div>

              {/* Amount & Status */}
              <div className="text-right shrink-0">
                <span className="font-black text-xs text-emerald-600 block">
                  +₦{item.commission}
                </span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                  Completed
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
