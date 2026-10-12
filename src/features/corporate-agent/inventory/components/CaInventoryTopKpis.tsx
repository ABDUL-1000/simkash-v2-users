import { Package, Send, Download, Clock, AlertCircle } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { CaInventoryOverviewData } from "../types/inventory";

export function CaInventoryTopKpis({ data }: { data: CaInventoryOverviewData["summary_cards"] }) {


  const cards = [
    {
      id: "available",
      label: data.total_available.label,
      value: data.total_available.count.toLocaleString(),
      subtext: data.total_available.subtext,
      icon: <Package className="w-4 h-4 text-blue-600" />,
      iconBg: "bg-blue-50",
      valueColor: "text-slate-900",
    },
    {
      id: "distributed",
      label: data.distributed.label,
      value: data.distributed.count.toLocaleString(),
      subtext: data.distributed.subtext,
      icon: <Send className="w-4 h-4 text-emerald-600" />,
      iconBg: "bg-emerald-50",
      valueColor: "text-emerald-600",
    },
    {
      id: "received",
      label: data.received.label,
      value: data.received.count.toLocaleString(),
      subtext: data.received.subtext,
      icon: <Download className="w-4 h-4 text-purple-600" />,
      iconBg: "bg-purple-50",
      valueColor: "text-purple-600",
    },
    {
      id: "pending",
      label: data.pending_requests.label,
      value: data.pending_requests.count.toLocaleString(),
      subtext: data.pending_requests.subtext,
      icon: <Clock className="w-4 h-4 text-amber-600" />,
      iconBg: "bg-amber-50",
      valueColor: "text-amber-600",
    },
    {
      id: "low",
      label: data.aps_low_on_stock.label,
      value: data.aps_low_on_stock.count.toLocaleString(),
      subtext: data.aps_low_on_stock.subtext,
      icon: <AlertCircle className="w-4 h-4 text-rose-600" />,
      iconBg: "bg-rose-50",
      valueColor: "text-rose-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className="rounded-2xl border p-4 bg-white shadow-xs space-y-2 flex flex-col justify-between"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${card.iconBg}`}
          >
            {card.icon}
          </div>

          <div className="space-y-0.5">
            <div className={`text-2xl sm:text-3xl font-black ${card.valueColor}`}>
              {card.value}
            </div>
            <div className="text-xs font-bold text-slate-800">{card.label}</div>
            <div className="text-[10px] text-slate-400 font-medium">
              {card.subtext}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
