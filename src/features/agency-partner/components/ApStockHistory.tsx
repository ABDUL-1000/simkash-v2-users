import { useEffect, useState } from "react";
import { Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataTable } from "@/components/common/DataTable";
import { StockHistoryDetailModal } from "@/components/common/StockHistoryDetail";
import { useTablePagination } from "@/hooks/useTablePagination";
import { colors } from "@/constants/colors";
import { useGetPartnerStockHistory, useGetPartnerStockHistoryDetail } from "../api";
import type { PartnerStockHistoryItem } from "../types/api";

const EVENT_OPTIONS = ["all", "received", "activated", "redistributed"].map((value) => ({ value, label: value === "all" ? "All events" : value[0].toUpperCase() + value.slice(1) }));
const TYPE_OPTIONS = ["all", "pos", "cctv", "gps", "router", "cctv_device"].map((value) => ({ value, label: value === "all" ? "All SIM types" : value === "cctv_device" ? "CCTV Device" : value.toUpperCase() }));

/** Stock movements for this partner — GET /partner/stock/history, detail via /partner/stock/history/{id}. */
export function ApStockHistory() {
  const [eventType, setEventType] = useState("all");
  const [simType, setSimType] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string>();
  const pagination = useTablePagination({ initialPageSize: 10 });
  const { resetPage } = pagination;
  const query = useGetPartnerStockHistory({ search, eventType, simType, page: pagination.page, limit: pagination.pageSize });
  // resetPage is recreated every render, so the debounce keys on the search text only.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { const timer = window.setTimeout(() => { setSearch(searchText); resetPage(); }, 300); return () => window.clearTimeout(timer); }, [searchText]);

  const columns: ColumnsType<PartnerStockHistoryItem> = [
    { title: "Date", dataIndex: "time_ago", key: "date", render: (value: string, row) => <span title={new Date(row.date).toLocaleString()}>{value}</span> },
    { title: "Event", dataIndex: "event_type", key: "event", render: (value: string, row) => { const tone = row.direction === "in" ? colors.success : colors.primary; return <span className="rounded-full px-2 py-1 text-xs font-semibold capitalize" style={{ color: tone, backgroundColor: `${tone}12` }}>{value}</span>; } },
    { title: "SIM Type", dataIndex: "sim_type", key: "sim_type" },
    { title: "Network", dataIndex: "network", key: "network" },
    { title: "Qty", dataIndex: "quantity", key: "qty", render: (value: number, row) => <strong style={{ color: row.direction === "in" ? colors.success : colors.danger }}>{row.direction === "in" ? "+" : "-"}{value}</strong> },
    { title: "From / To", dataIndex: "from_to", key: "party" },
    { title: "Reference", dataIndex: "reference", key: "reference", render: (value: string) => <span className="font-mono text-xs">{value}</span> },
    { title: "Action", key: "action", render: (_, row) => <button type="button" onClick={(event) => { event.stopPropagation(); setSelectedId(row.id || row.reference); }} className="font-semibold" style={{ color: colors.primary }}>View</button> },
  ];

  return <section className="space-y-3">
    <h2 className="text-base font-bold" style={{ color: colors.textPrimary }}>Stock History</h2>
    <DataTable columns={columns} dataSource={query.result?.history ?? []} rowKey="id" loading={query.isLoading || query.isFetching}
      pagination={{ ...pagination.paginationConfig, total: query.result?.total ?? 0 }} onRowClick={(row) => setSelectedId(row.id || row.reference)}
      onSearch={setSearchText} searchPlaceholder="Search party, SIM number, reference"
      extraFilters={<>
        <Select value={eventType} onChange={(value) => { setEventType(value); resetPage(); }} options={EVENT_OPTIONS} className="min-w-36" />
        <Select value={simType} onChange={(value) => { setSimType(value); resetPage(); }} options={TYPE_OPTIONS} className="min-w-36" />
      </>}
      emptyTitle="No stock movements yet" emptyDescription="SIMs you receive, activate or have redistributed will appear here." />
    {selectedId && <ApStockHistoryDetail id={selectedId} onClose={() => setSelectedId(undefined)} />}
  </section>;
}

function ApStockHistoryDetail({ id, onClose }: { id: string; onClose: () => void }) {
  const [page, setPage] = useState(1);
  const { detail, isLoading, isFetching, error, refetch } = useGetPartnerStockHistoryDetail(id, page);
  const incoming = detail?.direction === "in";
  return <StockHistoryDetailModal open onOpenChange={(open) => !open && onClose()} loading={isLoading} fetching={isFetching} error={error} onRetry={() => void refetch()} onPageChange={setPage}
    detail={detail && {
      reference: detail.reference, eventLabel: detail.event_type[0].toUpperCase() + detail.event_type.slice(1), quantityText: `${incoming ? "+" : "-"}${detail.quantity}`, incoming,
      simTypeLabel: detail.sim_type_label, network: detail.network_summary, date: detail.date, timeText: detail.time_ago,
      sender: detail.sender, recipient: detail.recipient, breakdown: detail.breakdown, totalSims: detail.total_sims, page: detail.page, totalPages: detail.total_pages,
      sims: detail.sims.map((sim) => ({ ...sim, type_label: sim.type_label })),
    }} />;
}
