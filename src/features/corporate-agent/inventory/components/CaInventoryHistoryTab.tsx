import { useState } from "react";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetCaInventoryHistory } from "../api/useCaInventory";
import { useDebouncedValue } from "../api/useDebouncedValue";
import { CaInventoryQueryState } from "./CaInventoryQueryState";
import { CaHistoryFiltersBar } from "./CaHistoryFiltersBar";
import { CaHistoryKpis } from "./CaHistoryKpis";
import { CaHistoryTable } from "./CaHistoryTable";
import { CaStockEventDetailsModal } from "../Modals/CaStockEventDetailsModal";
import { historyRow } from "../types/adapters";
import type { CaHistoryEventItem } from "../types/ca-inventory.types";
export function CaInventoryHistoryTab() {
 const pagination = useTablePagination({ initialPageSize: 15 });
 const [search, setSearch] = useState("");
 const [event, setEvent] = useState("All Events");
 const [type, setType] = useState("All Types");
 const [selected, setSelected] = useState<CaHistoryEventItem | null>(null);
 // Debounce only search input; reset page before applying the new server filter.
 const filter = useDebouncedValue(search);
 const query = useGetCaInventoryHistory({ search: filter, event_type: event === "All Events" ? "all" : event.toLowerCase(), sim_type: type === "All Types" ? "all" : type.split(" ")[0].toLowerCase(), page: filter === search ? pagination.page : 1, limit: pagination.pageSize });
 const data = query.data;
 const rows = data ? Object.values(data.grouped_events ?? {}).flat().map(historyRow) : [];
 return <div className="space-y-6">
  {data && !query.error && <CaHistoryKpis data={data.summary_cards} />}
  <CaHistoryFiltersBar searchQuery={search} onSearchChange={value => { setSearch(value); pagination.resetPage(); }} selectedEvent={event} onSelectEvent={value => { setEvent(value); pagination.resetPage(); }} selectedType={type} onSelectType={value => { setType(value); pagination.resetPage(); }} showingText={data?.showing_text ?? ""} />
  {/* Export, AP filtering and period/sort controls are commented in the filter component: no supporting endpoint parameters were supplied. */}
  <CaInventoryQueryState query={query}>{data && <CaHistoryTable rows={rows} showingText={data.showing_text} totalPages={data.total_pages} pagination={pagination} onSelectEvent={setSelected} />}</CaInventoryQueryState>
  <CaStockEventDetailsModal open={Boolean(selected)} onOpenChange={open => { if (!open) setSelected(null); }} event={selected} />
 </div>;
}
