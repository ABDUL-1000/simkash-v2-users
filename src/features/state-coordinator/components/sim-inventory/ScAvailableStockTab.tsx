import { AlertTriangle, Clock, Download, Package, Send, Smartphone } from "lucide-react";
import { useGetScAgencyPartnersOverview } from "../../api/agents";
import type { ScSimInventoryOverviewData } from "../../types/inventory";
import { ScStockTable } from "./ScStockTable";

const STATUS_BADGE: Record<string, { badge: string; bar: string }> = {
  good: { badge: "bg-[#EBFFF8] text-[#10B981]", bar: "bg-[#10B981]" },
  low: { badge: "bg-[#FFFBEB] text-[#F59E0B]", bar: "bg-[#F59E0B]" },
  moderate: { badge: "bg-[#FFFBEB] text-[#F59E0B]", bar: "bg-[#F59E0B]" },
  critical: { badge: "bg-[#FFF7F8] text-[#EF4444]", bar: "bg-[#EF4444]" },
  suspended: { badge: "bg-[#F8FAFC] border border-[#E2ECF6] text-[#8C909B]", bar: "bg-[#8C909B]" },
};
const statusStyle = (status: string) => STATUS_BADGE[status.toLowerCase()] ?? STATUS_BADGE.good;
const HEALTH_TONE: Record<string, string> = { GOOD: "text-[#10B981]", MODERATE: "text-[#F59E0B]", LOW: "text-[#F59E0B]", CRITICAL: "text-[#EF4444]" };
const TYPE_ICON_BG: Record<string, string> = { pos: "bg-[#EFF4F8] text-[#2563EB]", cctv: "bg-[#EBFFF8] text-[#10B981]", gps: "bg-purple-50 text-purple-600", router: "bg-amber-50 text-amber-600" };

interface ScAvailableStockTabProps {
  overview: ScSimInventoryOverviewData;
  onDistribute: (partnerId?: number) => void;
  onDistributeAllLow: () => void;
  onViewAllPartners: () => void;
}

export function ScAvailableStockTab({ overview, onDistribute, onDistributeAllLow, onViewAllPartners }: ScAvailableStockTabProps) {
  // Partner-level low-stock alerts come from the agency-partners overview (the inventory overview only has the count).
  const apOverview = useGetScAgencyPartnersOverview({ page: 1, limit: 8 });
  const needStock = apOverview.data?.aps_needing_stock.items ?? [];
  const cards = overview.summary_cards;
  const kpis = [
    { card: cards.total_available, icon: Package, tone: "bg-[#EFF4F8] text-[#2563EB]", valueTone: "text-[#0F152A]" },
    { card: cards.distributed, icon: Send, tone: "bg-[#EBFFF8] text-[#10B981]", valueTone: "text-[#10B981]" },
    { card: cards.received, icon: Download, tone: "bg-[#EFF4F8] text-purple-600", valueTone: "text-purple-600" },
    { card: cards.pending_requests, icon: Clock, tone: "bg-[#FFFBEB] text-[#F59E0B]", valueTone: "text-[#F59E0B]" },
    { card: cards.aps_low_on_stock, icon: AlertTriangle, tone: "bg-[#FFF7F8] text-[#EF4444]", valueTone: "text-[#EF4444]" },
  ];
  const partners = overview.how_stock_is_distributed;

  return (
    <div className="space-y-6">
      {/* Top KPI Strip (5 cards) */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {kpis.map(({ card, icon: Icon, tone, valueTone }) => (
          <div key={card.label} className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
            <div className={`flex size-7 items-center justify-center rounded-lg ${tone}`}>
              <Icon className="size-4" />
            </div>
            <h3 className={`text-2xl font-black ${valueTone}`}>{card.count.toLocaleString()}</h3>
            <p className="text-[11px] font-bold text-[#0F152A]">{card.label}</p>
            <p className="text-[10px] text-[#8C909B]">{card.subtext}</p>
          </div>
        ))}
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Main (2 cols wide) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Category Cards */}
          <div className="space-y-3">
            {overview.stock_types.length === 0 && <p className="rounded-2xl border border-dashed border-[#E2ECF6] p-4 text-center text-xs text-[#8C909B]">No SIM stock yet.</p>}
            {overview.stock_types.map((stock) => {
              const style = statusStyle(stock.status);
              const needsAction = !["good"].includes(stock.status.toLowerCase());
              const Icon = stock.type === "pos" ? Smartphone : Package;
              return (
                <div key={stock.type} className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`flex size-8 shrink-0 items-center justify-center rounded-xl ${TYPE_ICON_BG[stock.type] ?? TYPE_ICON_BG.pos}`}>
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-xs font-black text-[#0F152A]">
                            {stock.label}
                          </h4>
                          {stock.network_breakdown.length > 0 && <span className="rounded-md bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#66738C]">
                            {stock.network_breakdown.map((item) => `${item.network} ${item.count}`).join(" · ")}
                          </span>}
                        </div>
                        <p className="text-[10px] text-[#8C909B] font-medium pt-0.5">
                          {stock.allocated_text}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-[#0F152A]">
                          {stock.available}
                        </span>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${style.badge}`}>
                          {stock.status}
                        </span>
                      </div>
                      {needsAction && stock.available > 0 && <button
                        type="button"
                        onClick={() => onDistribute()}
                        className="text-xs font-extrabold text-[#2563EB] hover:underline"
                      >
                        Distribute →
                      </button>}
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-[#EFF4F8] overflow-hidden">
                    <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${Math.min(100, stock.allocated_percentage)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* How Stock is Distributed Table */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-[#0F152A]">
                How Stock is Distributed
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#66738C] font-medium">
                  {partners.total_partners_text}
                </span>
                <button
                  type="button"
                  onClick={() => onDistribute()}
                  className="text-xs font-extrabold text-[#2563EB] hover:underline"
                >
                  Distribute →
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#E2ECF6]">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="bg-[#F8FAFC] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B] border-b border-[#E2ECF6]">
                  <tr>
                    <th className="py-2.5 px-4">AP</th>
                    <th className="py-2.5 px-4">STOCK</th>
                    <th className="py-2.5 px-4">CUSTOMERS</th>
                    <th className="py-2.5 px-4">ACTIVATIONS</th>
                    <th className="py-2.5 px-4">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
                  {partners.partners.length === 0 && <tr><td colSpan={5} className="py-4 text-center text-[#8C909B]">No agency partners yet.</td></tr>}
                  {partners.partners.map((row) => (
                    <tr key={row.id} onClick={() => onDistribute(row.id)} className="cursor-pointer hover:bg-[#F8FAFC] transition">
                      <td className="py-2.5 px-4">
                        <h4 className="font-extrabold text-[#0F152A]">
                          {row.name}
                        </h4>
                        <p className="text-[10px] text-[#8C909B]">
                          {row.phone}
                        </p>
                      </td>
                      <td className="py-2.5 px-4 font-bold">
                        {row.stock}{row.stock === 0 ? " OUT" : statusStyle(row.status) !== STATUS_BADGE.good ? " ⚠️" : ""}
                      </td>
                      <td className="py-2.5 px-4 text-[#66738C]">
                        {row.customers}
                      </td>
                      <td className="py-2.5 px-4 text-[#66738C]">
                        {row.activations_text}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold ${statusStyle(row.status).badge}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={onViewAllPartners}
                className="text-xs font-extrabold text-[#2563EB] hover:underline"
              >
                View all {partners.total_partners} APs →
              </button>
            </div>
          </div>

          {/* Available SIMs list — GET /state-coordinator/sim-inventory/available */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">Available SIMs</h3>
            <ScStockTable mode="available" />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Inventory Health Box */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Inventory Health
            </h3>
            <div className="text-center space-y-0.5">
              <h2 className={`text-xl font-black ${HEALTH_TONE[overview.inventory_health.overall_health.toUpperCase()] ?? "text-[#0F152A]"}`}>{overview.inventory_health.overall_health}</h2>
              <p className="text-[11px] text-[#8C909B] font-medium">
                {overview.inventory_health.total_sims_text}
              </p>
            </div>

            <div className="space-y-2 text-xs pt-1 border-t border-[#E2ECF6]">
              {overview.stock_types.map((stock) => (
                <div key={stock.type} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold text-[#66738C]">
                    <span className={`size-2 rounded-full ${statusStyle(stock.status).bar}`} />
                    {stock.label}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-extrabold text-[#0F152A]">{stock.available}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-extrabold ${statusStyle(stock.status).badge}`}>
                      {stock.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Days Remaining — the API returns only the subtitle and alert, not per-type day counts. */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Estimated Days Remaining
            </h3>
            <p className="text-[10px] text-[#8C909B] font-medium">
              {overview.estimated_days_remaining.subtitle}
            </p>

            {overview.estimated_days_remaining.alert_callout?.message && <div className="rounded-2xl border border-[#FFF7F8] bg-[#FFF7F8] p-3 text-[11px] text-[#EF4444] font-medium flex items-center gap-2">
              <AlertTriangle className="size-4 shrink-0 text-[#EF4444]" />
              <span>{overview.estimated_days_remaining.alert_callout.message}</span>
            </div>}
          </div>

          {/* APs Need Distribution */}
          <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#F59E0B]">
              {overview.aps_need_distribution.title}
            </h3>

            <div className="space-y-3 text-xs">
              {apOverview.isLoading && <p className="text-[#8C909B]">Loading…</p>}
              {!apOverview.isLoading && needStock.length === 0 && <p className="text-[#8C909B]">All your APs have enough stock.</p>}
              {needStock.map((ap) => {
                const critical = ap.severity === "critical";
                return (
                  <div key={ap.id} className={`p-2.5 rounded-xl border flex items-center justify-between ${critical ? "border-[#FFF7F8] bg-[#FFF7F8]" : "border-[#E2ECF6] bg-white"}`}>
                    <div>
                      <h4 className={`font-extrabold ${critical ? "text-[#EF4444]" : "text-[#0F152A]"}`}>
                        {ap.name}
                      </h4>
                      <p className={`text-[10px] ${critical ? "text-[#EF4444]" : "text-[#8C909B]"}`}>
                        {ap.subtitle}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDistribute(ap.id)}
                      className={critical
                        ? "rounded-lg bg-[#EF4444] px-2.5 py-1 text-[10px] font-bold text-white shadow-xs"
                        : "rounded-lg border border-[#F59E0B] px-2.5 py-1 text-[10px] font-bold text-[#F59E0B]"}
                    >
                      {critical ? "Distribute Now" : "Distribute"}
                    </button>
                  </div>
                );
              })}

              {overview.aps_need_distribution.can_distribute_all && needStock.length > 0 && <button
                type="button"
                onClick={onDistributeAllLow}
                className="w-full rounded-xl border border-[#F59E0B] py-2 text-xs font-bold text-[#F59E0B] hover:bg-[#FFFBEB]"
              >
                Distribute to All Low APs
              </button>}
            </div>
          </div>

          {/* Your RM — "Request Stock" removed for State Coordinators */}
          {overview.rm_info && <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#0F152A]">
              Need More Stock?
            </h3>
            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] font-black text-[#2563EB]">
                {overview.rm_info.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#0F152A]">
                  {overview.rm_info.name} · {overview.rm_info.role}
                </h4>
                <p className="text-[10px] text-[#8C909B]">
                  <a href={`tel:${overview.rm_info.phone}`} className="hover:text-[#2563EB]">{overview.rm_info.phone}</a> · {overview.rm_info.region}
                </p>
              </div>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}
