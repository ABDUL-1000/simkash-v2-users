import { useState } from "react";
import { Clock, Download, Package, Send } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useGetScInventoryHistory } from "../../api/inventory";
import type { ScSimInventoryOverviewData } from "../../types/inventory";
import type { InventoryHistoryItem } from "../../types/inventory";

const PAGE_SIZE = 15;
const EVENT_BADGE: Record<string, string> = { received: "bg-[#EBFFF8] text-[#10B981]", distributed: "bg-[#EFF4F8] text-[#2563EB]" };

function dayGroup(iso: string) {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (date.toDateString() === today.toDateString()) return "TODAY";
  if (date.toDateString() === yesterday.toDateString()) return "YESTERDAY";
  return date.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" }).toUpperCase();
}

/** Inventory History — GET /state-coordinator/sim-inventory/history (event_type, page, limit). */
export function ScHistoryTab({ overview }: { overview?: ScSimInventoryOverviewData }) {
  const [eventFilter, setEventFilter] = useState("all");
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error, refetch } = useGetScInventoryHistory({ eventType: eventFilter, page, limit: PAGE_SIZE });
  const history = data?.history ?? [];
  const totalPages = data?.total_pages ?? 1;
  const groups = history.reduce<{ label: string; items: InventoryHistoryItem[] }[]>((acc, item) => {
    const label = dayGroup(item.date);
    const last = acc[acc.length - 1];
    if (last?.label === label) last.items.push(item);
    else acc.push({ label, items: [item] });
    return acc;
  }, []);
  const cards = overview?.summary_cards;

  return (
    <div className="space-y-6">
      {/* Top KPI Strip (4 cards) — from the inventory overview */}
      {cards && <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { card: cards.received, icon: Download, tone: "bg-[#EBFFF8] text-[#10B981]", valueTone: "text-[#10B981]" },
          { card: cards.distributed, icon: Send, tone: "bg-[#EFF4F8] text-[#2563EB]", valueTone: "text-[#2563EB]" },
          { card: cards.total_available, icon: Package, tone: "bg-[#EFF4F8] text-[#10B981]", valueTone: "text-[#10B981]" },
          { card: cards.pending_requests, icon: Clock, tone: "bg-[#FFFBEB] text-[#F59E0B]", valueTone: "text-[#F59E0B]" },
        ].map(({ card, icon: Icon, tone, valueTone }) => (
          <div key={card.label} className="rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs space-y-1">
            <div className={`flex size-7 items-center justify-center rounded-lg ${tone}`}>
              <Icon className="size-4" />
            </div>
            <h3 className={`text-2xl font-black ${valueTone}`}>{card.count.toLocaleString()}</h3>
            <p className="text-[11px] font-bold text-[#0F152A]">{card.label}</p>
            <p className="text-[10px] text-[#8C909B]">{card.subtext}</p>
          </div>
        ))}
      </div>}

      {/* Filters Bar */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
        {/* Search, SIM type and date chips are omitted: the history endpoint only filters by event_type. */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <select
            value={eventFilter}
            onChange={(e) => { setEventFilter(e.target.value); setPage(1); }}
            className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] px-3 py-1.5 font-extrabold text-[#0F152A] outline-none"
          >
            <option value="all">All Events</option>
            <option value="received">Received</option>
            <option value="distributed">Distributed</option>
          </select>
          {eventFilter !== "all" && <button
            type="button"
            onClick={() => { setEventFilter("all"); setPage(1); }}
            className="text-xs font-bold text-[#8C909B] hover:text-[#0F152A]"
          >
            Clear filter
          </button>}
        </div>

        {/* History Table Grouped */}
        <div className="space-y-4 pt-1">
          {isLoading && <p className="py-6 text-center text-xs text-[#8C909B]">Loading history…</p>}
          {error && <AppEmptyState title="Couldn't load inventory history" description={error.message} actionText="Retry" onAction={() => void refetch()} />}
          {!isLoading && !error && history.length === 0 && <AppEmptyState title="No stock movements yet" description="SIMs received from your RM and sent to your APs will appear here." />}
          {groups.map((grp) => (
            <div key={grp.label} className="space-y-2">
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                {grp.label}
              </div>
              <div className="overflow-x-auto rounded-2xl border border-[#E2ECF6]">
                <table className="w-full text-left text-xs min-w-[640px]">
                  <thead className="bg-[#F8FAFC] text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B] border-b border-[#E2ECF6]">
                    <tr>
                      <th className="py-2.5 px-4">DATE</th>
                      <th className="py-2.5 px-4">EVENT</th>
                      <th className="py-2.5 px-4">SIM TYPE</th>
                      <th className="py-2.5 px-4">QTY</th>
                      <th className="py-2.5 px-4">FROM / TO</th>
                      <th className="py-2.5 px-4">REF</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2ECF6] font-medium text-[#0F152A]">
                    {grp.items.map((item) => {
                      const received = item.event_type === "received";
                      return (
                        <tr key={item.id} className="hover:bg-[#F8FAFC] transition">
                          <td className="py-2.5 px-4 font-bold text-[#0F152A]" title={new Date(item.date).toLocaleString()}>
                            {new Date(item.date).toLocaleTimeString("en-NG", { hour: "2-digit", minute: "2-digit" })}
                            <p className="text-[10px] font-medium text-[#8C909B]">{item.time_ago}</p>
                          </td>
                          <td className="py-2.5 px-4">
                            <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-extrabold capitalize ${EVENT_BADGE[item.event_type] ?? "bg-[#F8FAFC] text-[#8C909B]"}`}>
                              {item.event_type}
                            </span>
                          </td>
                          <td className="py-2.5 px-4">
                            <span className="rounded-md bg-[#EFF4F8] px-2 py-0.5 text-[9px] font-bold text-[#2563EB]">
                              {item.sim_type}
                            </span>
                          </td>
                          <td className={`py-2.5 px-4 font-extrabold ${received ? "text-[#10B981]" : "text-[#EF4444]"}`}>
                            {received ? "+" : "-"}{item.quantity}
                          </td>
                          <td className="py-2.5 px-4 text-[#66738C]">
                            {received ? "From" : "To"}: {item.party_name} ({item.party_role.replaceAll("_", " ")})
                          </td>
                          <td className="py-2.5 px-4 font-mono text-[#8C909B]">
                            {item.reference}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {data && data.total > 0 && <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-[#E2ECF6] text-xs">
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page <= 1 || isFetching}
              onClick={() => setPage(page - 1)}
              className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC] disabled:opacity-40"
            >
              Prev
            </button>
            <span className="rounded-lg bg-[#0F152A] px-3 py-1 text-xs font-bold text-white">{page}</span>
            <span className="px-1 text-[#8C909B]">of {totalPages}</span>
            <button
              type="button"
              disabled={page >= totalPages || isFetching}
              onClick={() => setPage(page + 1)}
              className="rounded-lg border border-[#E2ECF6] px-2.5 py-1 text-xs font-bold text-[#66738C] hover:bg-[#F8FAFC] disabled:opacity-40"
            >
              Next
            </button>
          </div>

          <span className="text-[11px] font-medium text-[#8C909B]">
            Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, data.total)} of {data.total} events
          </span>
        </div>}
      </div>
    </div>
  );
}
