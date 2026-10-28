import { AppModal } from "@/components/common/AppModal";
import { DataTable } from "@/components/common/DataTable";
import type { ColumnsType } from "antd/es/table";
import type { CaStockRequestItem } from "../types/inventory";
import { useGetCaStockRequests } from "../api/useCaInventory";
import { CaInventoryQueryState } from "../components/CaInventoryQueryState";

const STATUS_TONE: Record<string, string> = { pending: "bg-amber-50 text-amber-700", approved: "bg-emerald-50 text-emerald-700", fulfilled: "bg-emerald-50 text-emerald-700", rejected: "bg-rose-50 text-rose-700" };

/** GET /sim-inventory/requests — returns the full list (no pagination params). */
export function CaStockRequestsModal({ onClose }: { onClose: () => void }) {
 const query = useGetCaStockRequests();
 const columns: ColumnsType<CaStockRequestItem> = [
  { title: "ID", dataIndex: "id", render: (id: number) => <span className="font-mono">#{id}</span> },
  { title: "SIM Type", dataIndex: "sim_type", render: (type: string) => type.replace("_SIM", " SIM") },
  { title: "Quantity", dataIndex: "quantity" },
  { title: "Status", dataIndex: "status", render: (status: string) => <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${STATUS_TONE[status.toLowerCase()] ?? "bg-slate-100 text-slate-600"}`}>{status}</span> },
  { title: "Urgency", dataIndex: "urgency", render: (urgency: string) => <span className={urgency === "urgent" ? "font-bold text-rose-600 capitalize" : "capitalize"}>{urgency}</span> },
  { title: "Requested From", dataIndex: "rm_name" },
  { title: "Requested", dataIndex: "requested_at", render: (date: string) => new Date(date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) },
  { title: "Notes", dataIndex: "notes" },
 ];
 return <AppModal open title="Stock Requests" description="Your pending and past stock requests" size="lg" onOpenChange={open => { if (!open) onClose(); }}>
  <CaInventoryQueryState query={query}><div className="overflow-x-auto"><DataTable columns={columns} dataSource={query.data ?? []} pagination={false} emptyTitle="No stock requests" /></div></CaInventoryQueryState>
 </AppModal>;
}
