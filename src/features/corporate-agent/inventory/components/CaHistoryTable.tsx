import { ChevronLeft, ChevronRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { DataTable } from "@/components/common/DataTable";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { ColumnsType } from "antd/es/table";
import type { CaHistoryEventItem } from "../types/ca-inventory.types";
import type { useTablePagination } from "@/hooks/useTablePagination";
import { inventoryTone } from "../types/adapters";
export function CaHistoryTable({ rows, showingText, totalPages, pagination, onSelectEvent }: {
 rows: CaHistoryEventItem[]; showingText: string; totalPages: number; pagination: ReturnType<typeof useTablePagination>; onSelectEvent: (event: CaHistoryEventItem) => void;
}) {
 const columns: ColumnsType<CaHistoryEventItem> = [
  { title: "Date", dataIndex: "timeLabel" },
  { title: "Event", dataIndex: "eventType", render: (value: string) => <span className="px-2 py-0.5 rounded text-[10px] font-black" style={{ color: inventoryTone(value === "Received" ? "green" : "blue"), backgroundColor: APP_COLORS.backgrounds.surface }}>{value}</span> },
  { title: "SIM Type", dataIndex: "simType" },
  { title: "Qty", dataIndex: "qty", render: (qty: number) => <span className={qty > 0 ? "font-black text-emerald-600" : "font-black text-rose-600"}>{qty > 0 ? "+" : ""}{qty}</span> },
  { title: "From/To", dataIndex: "fromTo" }, { title: "Ref", dataIndex: "ref" },
  { title: "", key: "view", align: "right", render: () => <span className="text-xs font-bold text-blue-600">View →</span> },
 ];
 const groups = [...new Set(rows.map(row => row.periodGroup))];
 return <div className="rounded-2xl border bg-white shadow-xs overflow-hidden" style={{ borderColor: APP_COLORS.greys.stroke }}>
  {!rows.length && <AppEmptyState title="No Inventory History Found" description="Try adjusting your filter or search terms." />}
  {groups.map(group => <div key={group}>
   <div className="py-1.5 px-4 font-black text-[10px] tracking-wider text-slate-500 uppercase bg-slate-100/50">{group}</div>
   <div className="overflow-x-auto ca-inventory-table"><DataTable columns={columns} dataSource={rows.filter(row => row.periodGroup === group)} pagination={false} onRowClick={onSelectEvent} /></div>
  </div>)}
  <div className="p-3.5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-slate-50/50" style={{ borderColor: APP_COLORS.greys.stroke }}>
   <span className="text-[11px] text-slate-400 font-medium">{showingText}</span>
   <div className="flex items-center gap-1.5 self-center sm:self-auto">
    <button disabled={pagination.page <= 1} onClick={() => pagination.setPage(pagination.page - 1)} className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1"><ChevronLeft className="w-3.5 h-3.5" />Prev</button>
    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">{pagination.page}</span>
    <span>of {Math.max(1, totalPages)}</span>
    <button disabled={pagination.page >= totalPages} onClick={() => pagination.setPage(pagination.page + 1)} className="px-2.5 py-1 rounded-lg border border-slate-200 bg-white font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1">Next<ChevronRight className="w-3.5 h-3.5" /></button>
   </div>
  </div>
 </div>;
}
