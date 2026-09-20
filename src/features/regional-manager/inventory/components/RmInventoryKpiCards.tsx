import { Package, Send, ArrowDownToLine, Clock, AlertCircle } from "lucide-react";
import type { RmInventoryKpis } from "../../types/rm-inventory.types";

interface RmInventoryKpiCardsProps {
  kpis: RmInventoryKpis;
}

export function RmInventoryKpiCards({ kpis }: RmInventoryKpiCardsProps) {
  const cards = [
    {
      id: "available",
      label: "Total Available",
      subtext: "In your inventory now",
      value: kpis.totalAvailable,
      icon: Package,
      iconColor: "text-[#0F152A]",
      iconBg: "bg-slate-100",
      valueColor: "text-[#0F152A]",
    },
    {
      id: "distributed",
      label: "Distributed",
      subtext: "Sent to SCs this month",
      value: kpis.distributedThisMonth,
      icon: Send,
      iconColor: "text-[#10B981]",
      iconBg: "bg-[#EBFFF8]",
      valueColor: "text-[#10B981]",
    },
    {
      id: "received",
      label: "Received",
      subtext: "From Super Admin this month",
      value: kpis.receivedThisMonth,
      icon: ArrowDownToLine,
      iconColor: "text-[#2563EB]",
      iconBg: "bg-[#EFF6FF]",
      valueColor: "text-[#2563EB]",
    },
    {
      id: "pending",
      label: "Pending Request",
      subtext: "Awaiting Admin approval",
      value: kpis.pendingRequests,
      icon: Clock,
      iconColor: "text-[#F59E0B]",
      iconBg: "bg-[#FEFCE8]",
      valueColor: "text-[#F59E0B]",
    },
    {
      id: "low-stock",
      label: "SCs Low on Stock",
      subtext: "Need distribution urgently",
      value: kpis.scsLowOnStock,
      icon: AlertCircle,
      iconColor: "text-[#EF4444]",
      iconBg: "bg-[#FFF7F8]",
      valueColor: "text-[#EF4444]",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.id}
            className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-2 transition hover:shadow-sm"
          >
            <div
              className={`flex size-8 items-center justify-center rounded-xl ${c.iconBg} ${c.iconColor}`}
            >
              <Icon className="size-4" />
            </div>

            <div>
              <h3 className={`text-2xl font-black tracking-tight ${c.valueColor}`}>
                {c.value}
              </h3>
              <p className="text-xs font-bold text-[#0F152A]">{c.label}</p>
              <p className="text-[10px] text-[#8C909B] font-medium leading-tight">
                {c.subtext}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
