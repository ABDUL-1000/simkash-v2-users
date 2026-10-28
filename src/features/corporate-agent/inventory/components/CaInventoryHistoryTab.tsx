import { useState } from "react";
import { StockHistoryDetailModal } from "@/components/common/StockHistoryDetail";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetCaInventoryHistory, useGetCaInventoryHistoryDetail } from "../api/useCaInventory";
import { useDebouncedValue } from "../api/useDebouncedValue";
import { CaInventoryQueryState } from "./CaInventoryQueryState";
import { CaHistoryFiltersBar } from "./CaHistoryFiltersBar";
import { CaHistoryKpis } from "./CaHistoryKpis";
import { CaHistoryTable } from "./CaHistoryTable";
import { historyRow } from "../types/adapters";
import type { CaInventoryOverviewData } from "../types/inventory";

/** GET /sim-inventory/history (filters + date range); a row opens GET /history/{id}. */
export function CaInventoryHistoryTab({ summary }: { summary?: CaInventoryOverviewData["summary_cards"] }) {
 const pagination = useTablePagination({ initialPageSize: 15 });
 const [search, setSearch] = useState("");
 const [event, setEvent] = useState("All Events");
 const [type, setType] = useState("All Types");
 const [dates, setDates] = useState({ start: "", end: "" });
 const [selectedId, setSelectedId] = useState<string>();
 // Debounce only search input; reset page before applying the new server filter.
 const filter = useDebouncedValue(search);
 const query = useGetCaInventoryHistory({
  search: filter, event_type: event === "All Events" ? "all" : event.toLowerCase(), sim_type: type === "All Types" ? "all" : type.split(" ")[0].toLowerCase(),
  start_date: dates.start || undefined, end_date: dates.end || undefined, page: filter === search ? pagination.page : 1, limit: pagination.pageSize,
 });
 const data = query.data;
 const rows = (data?.history ?? []).map(historyRow);
 const total = data?.total ?? 0;
 const from = total ? (data!.page - 1) * data!.limit + 1 : 0;
 const showingText = `Showing ${from}-${Math.min(from + rows.length - 1, total)} of ${total} events`;
 return <div className="space-y-6">
  {summary && <CaHistoryKpis data={summary} />}
  <CaHistoryFiltersBar searchQuery={search} onSearchChange={value => { setSearch(value); pagination.resetPage(); }} selectedEvent={event} onSelectEvent={value => { setEvent(value); pagination.resetPage(); }} selectedType={type} onSelectType={value => { setType(value); pagination.resetPage(); }}
   startDate={dates.start} endDate={dates.end} onDatesChange={(start, end) => { setDates({ start, end }); pagination.resetPage(); }} showingText={data ? showingText : ""} />
  {/* Export, AP filtering and sort controls stay commented in the filter component: the history endpoint has no such parameters. */}
  <CaInventoryQueryState query={query}>{data && <CaHistoryTable rows={rows} showingText={showingText} totalPages={data.total_pages} pagination={pagination} onSelectEvent={row => setSelectedId(row.id)} />}</CaInventoryQueryState>
  {selectedId && <CaHistoryDetail id={selectedId} onClose={() => setSelectedId(undefined)} />}
 </div>;
}

function CaHistoryDetail({ id, onClose }: { id: string; onClose: () => void }) {
 const [page, setPage] = useState(1);
 const query = useGetCaInventoryHistoryDetail(id, page);
 const data = query.data;
 return <StockHistoryDetailModal open onOpenChange={open => { if (!open) onClose(); }} loading={query.isLoading} fetching={query.isFetching} error={query.error} onRetry={() => void query.refetch()} onPageChange={setPage}
  detail={data && {
   reference: data.reference, eventLabel: data.event_label, quantityText: data.quantity_formatted, incoming: data.quantity_delta >= 0,
   simTypeLabel: data.sim_type_label || data.sim_type, network: data.network, date: data.created_at || data.date, timeText: data.time,
   sender: data.sender, recipient: data.recipient, breakdown: data.breakdown, totalSims: data.total_sims, page: data.page, totalPages: data.total_pages,
   sims: data.sims.map(sim => ({ ...sim, type_label: sim.sim_type_label })),
  }} />;
}
