import {
  Smartphone,
  Share2,
  Box,
  Clock,
  Calendar,
  ArrowDownToLine,
  Send,
  Package,
} from "lucide-react";
import type {
  RmHistoryKpis,
  RmHistorySummary,
} from "../../types/rm-inventory.types";

interface RmHistoryKpiCardsProps {
  kpis: RmHistoryKpis;
  summary: RmHistorySummary;
}

export function RmHistoryKpiCards({ kpis, summary }: RmHistoryKpiCardsProps) {
  const topCards = [
    {
      label: "Total SIMs",
      value: kpis.totalSims,
      icon: Smartphone,
      color: "text-[#0F152A]",
      bg: "bg-slate-100",
    },
    {
      label: "Distributed",
      value: kpis.distributed,
      icon: Share2,
      color: "text-[#10B981]",
      bg: "bg-[#EBFFF8]",
    },
    {
      label: "Available",
      value: kpis.available,
      icon: Box,
      color: "text-[#0F152A]",
      bg: "bg-slate-100",
    },
    {
      label: "Expiring Soon",
      value: kpis.expiringSoon,
      icon: Clock,
      color: "text-[#F59E0B]",
      bg: "bg-[#FEFCE8]",
    },
    {
      label: "Pending Requests",
      value: kpis.pendingRequests,
      icon: Calendar,
      color: "text-[#EF4444]",
      bg: "bg-[#FFF7F8]",
    },
  ];

  const summaryCards = [
    {
      label: "Total Received",
      value: summary.totalReceived.toLocaleString(),
      subtext: "SIMs received all time",
      icon: ArrowDownToLine,
      color: "text-[#10B981]",
      bg: "bg-[#EBFFF8]",
    },
    {
      label: "Total Distributed",
      value: summary.totalDistributed.toLocaleString(),
      subtext: "Sent to SCs all time",
      icon: Send,
      color: "text-[#2563EB]",
      bg: "bg-[#EFF6FF]",
    },
    {
      label: "Currently in Stock",
      value: summary.currentlyInStock.toLocaleString(),
      subtext: "Available right now",
      icon: Package,
      color: "text-[#0F152A]",
      bg: "bg-slate-100",
    },
    {
      label: "Pending Request",
      value: summary.pendingRequest.toLocaleString(),
      subtext: "In pending request",
      icon: Clock,
      color: "text-[#F59E0B]",
      bg: "bg-[#FEFCE8]",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top 5 Metrics Strip */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {topCards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-2 transition hover:shadow-sm"
            >
              <div
                className={`flex size-8 items-center justify-center rounded-xl ${c.bg} ${c.color}`}
              >
                <Icon className="size-4" />
              </div>
              <div>
                <h3 className={`text-2xl font-black ${c.color}`}>{c.value}</h3>
                <p className="text-xs font-bold text-[#0F152A]">{c.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4 Summary Stats Row */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {summaryCards.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className="flex items-center gap-3.5 rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs"
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-2xl ${s.bg} ${s.color}`}
              >
                <Icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#64748B]">{s.label}</p>
                <h4 className="text-xl font-black text-[#0F152A]">{s.value}</h4>
                <p className="text-[10px] text-[#8C909B] truncate">{s.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
