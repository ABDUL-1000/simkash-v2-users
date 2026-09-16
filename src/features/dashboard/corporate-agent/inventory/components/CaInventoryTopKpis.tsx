import { Package, Send, Download, Clock, AlertCircle } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_INVENTORY_KPIS_DATA } from "../data/ca-inventory.data";

export function CaInventoryTopKpis() {
  const {
    totalAvailable,
    distributedThisMonth,
    receivedThisMonth,
    pendingRequests,
    apsLowStockCount,
  } = CA_INVENTORY_KPIS_DATA;

  const cards = [
    {
      id: "available",
      label: "Total Available",
      value: totalAvailable.toLocaleString(),
      subtext: "In your inventory now",
      icon: <Package className="w-4 h-4 text-blue-600" />,
      iconBg: "bg-blue-50",
      valueColor: "text-slate-900",
    },
    {
      id: "distributed",
      label: "Distributed",
      value: distributedThisMonth.toLocaleString(),
      subtext: "Sent to APs this month",
      icon: <Send className="w-4 h-4 text-emerald-600" />,
      iconBg: "bg-emerald-50",
      valueColor: "text-emerald-600",
    },
    {
      id: "received",
      label: "Received",
      value: receivedThisMonth.toLocaleString(),
      subtext: "From Super Admin this month",
      icon: <Download className="w-4 h-4 text-purple-600" />,
      iconBg: "bg-purple-50",
      valueColor: "text-purple-600",
    },
    {
      id: "pending",
      label: "Pending Request",
      value: pendingRequests.toLocaleString(),
      subtext: "Awaiting Admin approval",
      icon: <Clock className="w-4 h-4 text-amber-600" />,
      iconBg: "bg-amber-50",
      valueColor: "text-amber-600",
    },
    {
      id: "low",
      label: "APs Low on Stock",
      value: apsLowStockCount.toLocaleString(),
      subtext: "Need distribution urgently",
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
