import { ArrowRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { DataTable } from "@/components/common/DataTable";
import type { ColumnsType } from "antd/es/table";
import type { CaApStockDistributionRow } from "../types/ca-inventory.types";
import { inventoryTone } from "../types/adapters";
export function CaStockDistributionTable({ rows, totalText, onDistributeToAp, onViewAllDistribute }: {
 rows: CaApStockDistributionRow[]; totalText: string; onDistributeToAp: (ap: CaApStockDistributionRow) => void; onViewAllDistribute: () => void;
}) {
 const columns: ColumnsType<CaApStockDistributionRow> = [
  { title: "Agency Partner", key: "partner", render: (_, row) => <div className="flex items-center gap-2"><span className="font-bold text-slate-900">{row.avatarInitials}</span><div><div className="font-bold text-slate-900">{row.name}</div><div className="text-[11px] text-slate-500">{row.phone}</div></div></div> },
  ...(["pos", "cctv", "gps", "router", "total"] as const).map(key => ({ title: key === "router" ? "Router" : key === "total" ? "Total" : key.toUpperCase(), dataIndex: key, key, align: "center" as const, render: (value: number) => <span className={key === "total" ? "font-black text-slate-900" : "font-medium text-slate-700"}>{value}</span> })),
  { title: "Status", dataIndex: "status", align: "center", render: (status: string) => <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black inline-block" style={{ color: inventoryTone(status), backgroundColor: APP_COLORS.backgrounds.surface }}>{status}</span> },
 ];
 return <div className="rounded-2xl border bg-white shadow-xs overflow-hidden" style={{ borderColor: APP_COLORS.greys.stroke }}>
  <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: APP_COLORS.greys.stroke }}>
   <div><h3 className="text-sm font-bold text-slate-900">How Stock is Distributed</h3><p className="text-[11px] text-slate-500">{totalText}</p></div>
   <button type="button" onClick={onViewAllDistribute} className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"><span>Distribute</span><ArrowRight className="w-3.5 h-3.5" /></button>
  </div>
  <div className="overflow-x-auto ca-inventory-table"><DataTable columns={columns} dataSource={rows} pagination={false} onRowClick={onDistributeToAp} emptyTitle="No stock distributions" /></div>
 </div>;
}
