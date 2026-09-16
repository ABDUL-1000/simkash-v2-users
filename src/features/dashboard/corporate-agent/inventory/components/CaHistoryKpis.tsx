import { Download, Send, Package, Clock } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_HISTORY_KPIS_DATA } from "../data/ca-inventory.data";

export function CaHistoryKpis() {
  const { totalReceived, totalDistributed, currentlyInStock, pendingRequest } =
    CA_HISTORY_KPIS_DATA;

  const cards = [
    {
      id: "received",
      label: "Total Received",
      value: totalReceived.toLocaleString(),
      subtext: "SIMs received all time",
      icon: <Download className="w-4 h-4 text-emerald-600" />,
      iconBg: "bg-emerald-50",
      valueColor: "text-slate-900",
    },
    {
      id: "distributed",
      label: "Total Distributed",
      value: totalDistributed.toLocaleString(),
      subtext: "Sent to APs all time",
      icon: <Send className="w-4 h-4 text-blue-600" />,
      iconBg: "bg-blue-50",
      valueColor: "text-slate-900",
    },
    {
      id: "instock",
      label: "Currently in Stock",
      value: currentlyInStock.toLocaleString(),
      subtext: "Available right now",
      icon: <Package className="w-4 h-4 text-slate-800" />,
      iconBg: "bg-slate-100",
      valueColor: "text-slate-900",
    },
    {
      id: "pending",
      label: "Pending Request",
      value: pendingRequest.toLocaleString(),
      subtext: "In pending request",
      icon: <Clock className="w-4 h-4 text-amber-600" />,
      iconBg: "bg-amber-50",
      valueColor: "text-slate-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((c) => (
        <div
          key={c.id}
          className="rounded-2xl border p-4 bg-white shadow-xs space-y-2 flex flex-col justify-between"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${c.iconBg}`}
          >
            {c.icon}
          </div>

          <div className="space-y-0.5">
            <div className={`text-2xl sm:text-3xl font-black ${c.valueColor}`}>
              {c.value}
            </div>
            <div className="text-xs font-bold text-slate-800">{c.label}</div>
            <div className="text-[10px] text-slate-400 font-medium">{c.subtext}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
