import type { ColumnsType } from 'antd/es/table';
import { DataTable } from '@/components/common/DataTable';
import { useTablePagination } from '@/hooks/useTablePagination';
import type { StateCoordinatorStock } from '../types';
import type { StockQuantities } from '../types/simInventory';
import React, { useState } from "react";
import { AlertTriangle, Lock, ArrowRight } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import type { BulkDistributionRow } from "../types";
interface MultipleScDistributionTableProps {
    onDistribute: (rows: BulkDistributionRow[]) => void;
    coordinators: StateCoordinatorStock[];
    availableStock: StockQuantities;
    onCancel?: () => void;
}
export const MultipleScDistributionTable: React.FC<MultipleScDistributionTableProps> = ({ onDistribute, coordinators, availableStock, onCancel, }) => {
    const [pin, setPin] = useState("");
    const [rows, setRows] = useState<BulkDistributionRow[]>(() => coordinators.map(sc => ({ scId: sc.id, scName: sc.name, state: sc.state, zone: sc.zone, status: sc.status === 'suspended' ? 'suspended' : 'active', initials: sc.initials ?? sc.name.split(' ').map(n => n[0]).slice(0, 2).join(''), apCount: sc.apCount, currStockLabel: sc.breakdownAvailable ? 'POS:' + sc.onHandStock.pos + ' CCTV:' + sc.onHandStock.cctv : sc.onHandStock.total + ' total', currentStock: sc.onHandStock.total, pos: 0, cctv: 0, gps: 0, router: 0 })));
    const handleUpdate = (scId: string, field: "pos" | "cctv" | "gps" | "router", val: number) => {
        setRows((prev) => prev.map((r) => (r.scId === scId ? { ...r, [field]: Math.max(0, val) } : r)));
    };
    const totalPos = rows.reduce((acc, r) => acc + (r.status === "suspended" ? 0 : r.pos), 0);
    const totalCctv = rows.reduce((acc, r) => acc + (r.status === "suspended" ? 0 : r.cctv), 0);
    const totalGps = rows.reduce((acc, r) => acc + (r.status === "suspended" ? 0 : r.gps), 0);
    const totalRouter = rows.reduce((acc, r) => acc + (r.status === "suspended" ? 0 : r.router), 0);
    const grandTotal = totalPos + totalCctv + totalGps + totalRouter;
    const activeReceivingScs = rows.filter((r) => r.status === "active" && (r.pos > 0 || r.cctv > 0 || r.gps > 0 || r.router > 0)).length;
    const valid = rows.every(row => [row.pos, row.cctv, row.gps, row.router].every(v => Number.isSafeInteger(v) && v >= 0)) && totalPos <= availableStock.pos && totalCctv <= availableStock.cctv && totalGps <= availableStock.gps && totalRouter <= availableStock.router;
    const { paginationConfig } = useTablePagination({ initialPageSize: 12, total: rows.length });
    const columns: ColumnsType<BulkDistributionRow> = [{ title: 'STATE COORDINATOR', key: '0', align: 'left', render: (_value: unknown, row: BulkDistributionRow) => {
                const isSuspended = row.status === 'suspended';
                return <div className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${isSuspended ? "bg-red-100 text-red-700" : "bg-blue-50 text-blue-700 border border-blue-100"}`}>
                          {row.initials}
                        </div>
                        <div>
                          <div className={`font-bold ${isSuspended ? "text-red-600" : "text-slate-900"}`}>{row.scName}</div>
                          <div className="text-[11px] text-slate-400">{row.state}</div>
                        </div>
                      </div>
                    </div>;
            } },
        { title: 'APs', key: '1', align: 'center', render: (_value: unknown, row: BulkDistributionRow) => { return <div className="py-3 px-3 text-center font-medium text-slate-500">{row.apCount ?? '—'}</div>; } },
        { title: 'CURR STOCK', key: '2', align: 'center', render: (_value: unknown, row: BulkDistributionRow) => {
                const isSuspended = row.status === 'suspended';
                return <div className="py-3 px-3 text-center text-[11px]">
                      {isSuspended ? <span className="font-bold text-red-600">SUSPENDED</span> : <span className="text-slate-500 font-mono">{row.currStockLabel}</span>}
                    </div>;
            } },
        { title: 'POS', key: '3', align: 'center', render: (_value: unknown, row: BulkDistributionRow) => {
                const isSuspended = row.status === 'suspended';
                return <div className="py-2 px-1.5 text-center">
                      {isSuspended ? <span className="text-slate-400">—</span> : <input type="number" min={0} value={row.pos || ""} placeholder="0" onChange={(e) => handleUpdate(row.scId, "pos", Number(e.target.value))} className="w-16 h-8 text-center font-bold rounded-lg border border-slate-300 focus:border-blue-600 focus:outline-none"/>}
                    </div>;
            } },
        { title: 'CCTV', key: '4', align: 'center', render: (_value: unknown, row: BulkDistributionRow) => {
                const isSuspended = row.status === 'suspended';
                return <div className="py-2 px-1.5 text-center">
                      {isSuspended ? <span className="text-slate-400">—</span> : <input type="number" min={0} value={row.cctv || ""} placeholder="0" onChange={(e) => handleUpdate(row.scId, "cctv", Number(e.target.value))} className="w-16 h-8 text-center font-bold rounded-lg border border-slate-300 focus:border-blue-600 focus:outline-none"/>}
                    </div>;
            } },
        { title: 'GPS', key: '5', align: 'center', render: (_value: unknown, row: BulkDistributionRow) => {
                const isSuspended = row.status === 'suspended';
                return <div className="py-2 px-1.5 text-center">
                      {isSuspended ? <span className="text-slate-400">—</span> : <input type="number" min={0} value={row.gps || ""} placeholder="0" onChange={(e) => handleUpdate(row.scId, "gps", Number(e.target.value))} className="w-16 h-8 text-center font-bold rounded-lg border border-slate-300 focus:border-blue-600 focus:outline-none"/>}
                    </div>;
            } },
        { title: 'RT', key: '6', align: 'center', render: (_value: unknown, row: BulkDistributionRow) => {
                const isSuspended = row.status === 'suspended';
                return <div className="py-2 px-1.5 text-center">
                      {isSuspended ? <span className="text-slate-400">—</span> : <input type="number" min={0} value={row.router || ""} placeholder="0" onChange={(e) => handleUpdate(row.scId, "router", Number(e.target.value))} className="w-16 h-8 text-center font-bold rounded-lg border border-slate-300 focus:border-blue-600 focus:outline-none"/>}
                    </div>;
            } },
        { title: 'TOTAL', key: '7', align: 'right', render: (_value: unknown, row: BulkDistributionRow) => { const isSuspended = row.status === 'suspended'; const total = row.pos + row.cctv + row.gps + row.router; return <div className="py-3 px-4 text-right font-bold text-slate-900">{isSuspended ? "—" : total}</div>; } }];
    return (<div className="space-y-4">
      {/* SC Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <DataTable<BulkDistributionRow> hideToolbar columns={columns} dataSource={rows} rowKey="scId" pagination={paginationConfig} scroll={{ x: 'max-content' }} emptyTitle="No State Coordinators"/>

        {/* Totals Row */}
        <div className="p-3.5 bg-slate-50/70 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-900">
          <span className="uppercase text-[11px] text-slate-600">Total to Distribute</span>
          <div className="flex items-center gap-4 text-center">
            <span className="text-slate-500 font-semibold text-[11px]">{coordinators.every(sc=>sc.apCount!==undefined)?coordinators.reduce((sum,sc)=>sum+(sc.apCount??0),0):'—'} APs</span>
            <span className="text-slate-500 font-semibold text-[11px]">Total: {availableStock.pos + availableStock.cctv + availableStock.gps + availableStock.router}</span>
            <span className="bg-slate-900 text-white px-3 py-1 rounded-md">{totalPos.toLocaleString()}</span>
            <span className="bg-slate-900 text-white px-3 py-1 rounded-md">{totalCctv.toLocaleString()}</span>
            <span className="bg-slate-900 text-white px-3 py-1 rounded-md">{totalGps.toLocaleString()}</span>
            <span className="bg-slate-900 text-white px-3 py-1 rounded-md">{totalRouter.toLocaleString()}</span>
            <span className="font-extrabold text-slate-900 text-sm ml-2">{grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* GPS Stock Critical Alert Banner */}
      <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5"/>
        <div>
          <span className="font-bold block">GPS Stock Availability</span>
          <span className="text-amber-800 text-[11px]">
            {availableStock.gps} GPS SIMs remaining · {totalGps} allocated · {availableStock.gps - totalGps} remain after distribution.
          </span>
        </div>
      </div>

      {!valid && <p role="alert" className="text-xs text-red-600">Enter whole quantities within available stock across all recipients.</p>}
      {/* Bottom Auth Card */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-start gap-2.5">
          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
            <Lock className="w-3 h-3 text-slate-700"/>
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Enter your pin to confirm</h4>
            <p className="text-xs text-slate-500">Distributing {grandTotal.toLocaleString()} SIMs to {activeReceivingScs} State Coordinators</p>
          </div>
        </div>

        <div className="flex justify-start">
          <InputOTP pattern="[0-9]*" maxLength={4} value={pin} onChange={setPin}>
            <InputOTPGroup>
              <InputOTPSlot masked index={0}/>
              <InputOTPSlot masked index={1}/>
              <InputOTPSlot masked index={2}/>
              <InputOTPSlot masked index={3}/>
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button type="button" onClick={onCancel} className="px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors">
            Cancel
          </button>
          <button type="button" onClick={() => onDistribute(rows.filter(row => row.status === 'active' && row.pos + row.cctv + row.gps + row.router > 0))} disabled={!valid || grandTotal <= 0 || !/^\d{4}$/.test(pin)} className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl shadow-sm transition-colors">
            <span>Distribute to {activeReceivingScs} SCs</span>
            <ArrowRight className="w-3.5 h-3.5"/>
          </button>
        </div>
      </div>
    </div>);
};
