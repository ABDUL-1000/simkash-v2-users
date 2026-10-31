import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { AppModal } from "@/components/common/AppModal";
import { DataTable } from "@/components/common/DataTable";
import { EpQueryState } from "../../components/EpQueryState";
import { useGetEnterpriseStockRequests } from "../api";
import type { EpStockRequestItem } from "../types/simInventory";

const PAGE_SIZE = 10;
const STATUS_TONE: Record<string, string> = { pending: "bg-amber-50 text-amber-700", approved: "bg-emerald-50 text-emerald-700", fulfilled: "bg-emerald-50 text-emerald-700", rejected: "bg-rose-50 text-rose-700" };

/** GET /sim-inventory/requests — returns an array without a total, so Next stays available only on a full page. */
export function StockRequestsModal({ onClose }: { onClose: () => void }) {
  const [page, setPage] = useState(1);
  const query = useGetEnterpriseStockRequests({ page, limit: PAGE_SIZE });
  const rows = query.data ?? [];
  const columns: ColumnsType<EpStockRequestItem> = [
    { title: "Reference", dataIndex: "reference", render: (value: string) => <span className="font-mono text-[11px]">{value}</span> },
    { title: "SIM Type", dataIndex: "sim_type" },
    { title: "Quantity", dataIndex: "quantity" },
    { title: "Status", dataIndex: "status", render: (status: string) => <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${STATUS_TONE[status.toLowerCase()] ?? "bg-slate-100 text-slate-600"}`}>{status}</span> },
    { title: "Urgency", dataIndex: "urgency", render: (urgency: string) => <span className={urgency === "urgent" ? "font-bold text-rose-600 capitalize" : "capitalize"}>{urgency}</span> },
    { title: "Requested", dataIndex: "time_ago" },
    { title: "Notes", dataIndex: "notes" },
  ];
  return (
    <AppModal open onOpenChange={(open) => { if (!open) onClose(); }} title="Stock Requests" description="Your pending and past stock requests" size="lg">
      {query.isPending || query.isError ? <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch} />
        : <div className="overflow-x-auto"><DataTable hideToolbar columns={columns} dataSource={rows} rowKey="id" pagination={false} emptyTitle="No stock requests" /></div>}
      <div className="flex items-center justify-between gap-3 pt-4 text-xs">
        <button type="button" disabled={page <= 1 || query.isFetching} onClick={() => setPage(page - 1)} className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold disabled:opacity-40">Previous</button>
        <span className="text-slate-500">Page {page}</span>
        <button type="button" disabled={query.isFetching || rows.length < PAGE_SIZE} onClick={() => setPage(page + 1)} className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold disabled:opacity-40">Next</button>
      </div>
    </AppModal>
  );
}
