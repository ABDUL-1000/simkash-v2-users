import { useState } from "react";
import { Search } from "lucide-react";
import { Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { APP_COLORS } from "@/constants/colors";
import { DataTable } from "@/components/common/DataTable";
import { NetworkBadge } from "@/features/device-sim/components/NetworkBadge";
import { useDebouncedValue } from "@/features/corporate-agent/inventory/api/useDebouncedValue";
import { useGetEnterpriseAvailableSims } from "../api";
import type { EpStockSim } from "../types/simInventory";
import { EP_SIM_LABELS, EP_SIM_TYPES } from "../types/adapters";
import { EpQueryState } from "../../components/EpQueryState";

const NETWORKS = ["MTN", "AIRTEL", "GLO", "9MOBILE"];
const PAGE_SIZE = 20;

/** Unassigned SIMs in your stock — GET /sim-inventory/available. */
export function EpAvailableSimsTable() {
 const [type, setType] = useState("all");
 const [network, setNetwork] = useState("");
 const [search, setSearch] = useState("");
 const [page, setPage] = useState(1);
 const debounced = useDebouncedValue(search);
 const query = useGetEnterpriseAvailableSims({ sim_type: type, network: network || undefined, search: debounced || undefined, page, limit: PAGE_SIZE });
 const columns: ColumnsType<EpStockSim> = [
  { title: "SIM Number", dataIndex: "sim_number", render: (value: string) => <span className="font-mono font-bold text-slate-900">{value}</span> },
  { title: "Type", dataIndex: "type_label", render: (value: string) => <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">{value}</span> },
  { title: "Network", dataIndex: "network", render: (_, row) => <NetworkBadge network={row.network_code || row.network} /> },
  { title: "Status", dataIndex: "status", render: (value: string) => <span className="text-[11px] font-semibold text-emerald-700">{value.replace(/_/g, " ")}</span> },
  { title: "Received", dataIndex: "received_at", render: (value: string) => new Date(value).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) },
 ];
 const resetPage = <T,>(set: (value: T) => void) => (value: T) => { set(value); setPage(1); };
 return <div className="rounded-2xl border bg-white shadow-xs overflow-hidden" style={{ borderColor: APP_COLORS.greys.stroke }}>
  <div className="p-4 border-b space-y-3" style={{ borderColor: APP_COLORS.greys.stroke }}>
   <div className="flex items-center justify-between"><div><h3 className="text-sm font-bold text-slate-900">Available SIMs</h3><p className="text-[11px] text-slate-500">Unassigned SIMs in your inventory</p></div><span className="text-[11px] font-medium text-slate-400">{(query.data?.total ?? 0).toLocaleString()} SIMs</span></div>
   <div className="flex flex-col sm:flex-row gap-2 text-xs">
    <div className="relative flex-1"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" /><input value={search} onChange={e => resetPage(setSearch)(e.target.value)} placeholder="Search SIM number or serial" className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-500" /></div>
    <select value={type} onChange={e => resetPage(setType)(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700"><option value="all">All types</option>{EP_SIM_TYPES.map(value => <option key={value} value={value}>{EP_SIM_LABELS[value]}</option>)}</select>
    <select value={network} onChange={e => resetPage(setNetwork)(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium text-slate-700"><option value="">All networks</option>{NETWORKS.map(value => <option key={value} value={value}>{value}</option>)}</select>
   </div>
  </div>
  {query.isPending || query.isError ? <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch} /> : <div className="overflow-x-auto"><DataTable hideToolbar columns={columns} dataSource={query.data?.sims ?? []} rowKey="id" pagination={false} emptyTitle="No available SIMs" /></div>}
  {(query.data?.total ?? 0) > PAGE_SIZE && <div className="p-3 flex justify-end"><Pagination current={page} pageSize={PAGE_SIZE} total={query.data?.total ?? 0} onChange={setPage} size="small" showSizeChanger={false} /></div>}
 </div>;
}
