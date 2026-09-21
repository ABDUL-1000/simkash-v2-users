import React, { useState } from "react";
import { AlertTriangle, Lock, ArrowRight } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import type { BulkDistributionRow } from "../types";

interface MultipleScDistributionTableProps {
  onDistribute: (totalSims: number, scCount: number) => void;
  onCancel?: () => void;
}

export const MultipleScDistributionTable: React.FC<MultipleScDistributionTableProps> = ({
  onDistribute,
  onCancel,
}) => {
  const [pin, setPin] = useState("");
  const [rows, setRows] = useState<BulkDistributionRow[]>([
    { scId: "1", scName: "Aminat Okafor", state: "Lagos", zone: "SW", status: "active", initials: "AO", apCount: 23, currStockLabel: "POS:847 CCTV:247", currentStock: 1094, pos: 200, cctv: 100, gps: 0, router: 50 },
    { scId: "2", scName: "Chidi Okonkwo", state: "Abuja", zone: "NC", status: "active", initials: "CO", apCount: 15, currStockLabel: "POS:634 CCTV:0", currentStock: 634, pos: 300, cctv: 0, gps: 0, router: 0 },
    { scId: "3", scName: "Fatima Abubakar", state: "Kaduna", zone: "NW", status: "active", initials: "FA", apCount: 18, currStockLabel: "POS:412 CCTV:180", currentStock: 592, pos: 200, cctv: 100, gps: 0, router: 0 },
    { scId: "4", scName: "Kola Adeyemi", state: "Oyo", zone: "SW", status: "active", initials: "KA", apCount: 21, currStockLabel: "POS:520 CCTV:120", currentStock: 640, pos: 150, cctv: 50, gps: 50, router: 0 },
    { scId: "5", scName: "Ibrahim Musa", state: "Rivers", zone: "SS", status: "active", initials: "IB", apCount: 9, currStockLabel: "POS:280 CCTV:60", currentStock: 340, pos: 100, cctv: 50, gps: 0, router: 0 },
    { scId: "6", scName: "Emeka Okafor", state: "Edo", zone: "SS", status: "active", initials: "EO", apCount: 7, currStockLabel: "POS:190 CCTV:40", currentStock: 230, pos: 100, cctv: 0, gps: 0, router: 0 },
    { scId: "7", scName: "Abubakar Sule", state: "Kebbi", zone: "NW", status: "active", initials: "AB", apCount: 11, currStockLabel: "POS:310 CCTV:0", currentStock: 310, pos: 100, cctv: 0, gps: 0, router: 0 },
    { scId: "8", scName: "Glory Effah (SUSPENDED)", state: "Delta", zone: "SS", status: "suspended", initials: "GE", apCount: 4, currStockLabel: "SUSPENDED", currentStock: 0, pos: 0, cctv: 0, gps: 0, router: 0 },
    { scId: "9", scName: "Ngozi Kalu", state: "Imo", zone: "SE", status: "active", initials: "NK", apCount: 6, currStockLabel: "POS:240 CCTV:80", currentStock: 320, pos: 0, cctv: 0, gps: 0, router: 0 },
    { scId: "10", scName: "Taiwo Martins", state: "Ekiti", zone: "SW", status: "active", initials: "TM", apCount: 5, currStockLabel: "POS:180 CCTV:30", currentStock: 210, pos: 0, cctv: 0, gps: 0, router: 0 },
    { scId: "11", scName: "Babatunde Olowo", state: "Osun", zone: "SW", status: "active", initials: "BO", apCount: 8, currStockLabel: "POS:320 CCTV:90", currentStock: 410, pos: 0, cctv: 0, gps: 0, router: 0 },
    { scId: "12", scName: "Rashida Aminu", state: "Sokoto", zone: "NW", status: "active", initials: "RA", apCount: 3, currStockLabel: "POS:90 CCTV:0", currentStock: 90, pos: 0, cctv: 0, gps: 0, router: 0 },
  ]);

  const handleUpdate = (scId: string, field: "pos" | "cctv" | "gps" | "router", val: number) => {
    setRows((prev) => prev.map((r) => (r.scId === scId ? { ...r, [field]: Math.max(0, val) } : r)));
  };

  const totalPos = rows.reduce((acc, r) => acc + (r.status === "suspended" ? 0 : r.pos), 0);
  const totalCctv = rows.reduce((acc, r) => acc + (r.status === "suspended" ? 0 : r.cctv), 0);
  const totalGps = rows.reduce((acc, r) => acc + (r.status === "suspended" ? 0 : r.gps), 0);
  const totalRouter = rows.reduce((acc, r) => acc + (r.status === "suspended" ? 0 : r.router), 0);
  const grandTotal = totalPos + totalCctv + totalGps + totalRouter;
  const activeReceivingScs = rows.filter((r) => r.status === "active" && (r.pos > 0 || r.cctv > 0 || r.gps > 0 || r.router > 0)).length;

  return (
    <div className="space-y-4">
      {/* SC Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] font-bold text-slate-400 border-b border-slate-100 bg-white">
              <tr>
                <th className="py-3 px-4">STATE COORDINATOR</th>
                <th className="py-3 px-3 text-center">APs</th>
                <th className="py-3 px-3 text-center">CURR STOCK</th>
                <th className="py-3 px-2 text-center min-w-[70px]">POS</th>
                <th className="py-3 px-2 text-center min-w-[70px]">CCTV</th>
                <th className="py-3 px-2 text-center min-w-[70px]">GPS</th>
                <th className="py-3 px-2 text-center min-w-[70px]">RT</th>
                <th className="py-3 px-4 text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => {
                const isSuspended = row.status === "suspended";
                const total = row.pos + row.cctv + row.gps + row.router;

                return (
                  <tr key={row.scId} className={isSuspended ? "bg-red-50/40" : "hover:bg-slate-50/50"}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${isSuspended ? "bg-red-100 text-red-700" : "bg-blue-50 text-blue-700 border border-blue-100"}`}>
                          {row.initials}
                        </div>
                        <div>
                          <div className={`font-bold ${isSuspended ? "text-red-600" : "text-slate-900"}`}>{row.scName}</div>
                          <div className="text-[11px] text-slate-400">{row.state}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-center font-medium text-slate-500">{row.apCount}</td>
                    <td className="py-3 px-3 text-center text-[11px]">
                      {isSuspended ? <span className="font-bold text-red-600">SUSPENDED</span> : <span className="text-slate-500 font-mono">{row.currStockLabel}</span>}
                    </td>
                    <td className="py-2 px-1.5 text-center">
                      {isSuspended ? <span className="text-slate-400">—</span> : <input type="number" min={0} value={row.pos || ""} placeholder="0" onChange={(e) => handleUpdate(row.scId, "pos", Number(e.target.value))} className="w-16 h-8 text-center font-bold rounded-lg border border-slate-300 focus:border-blue-600 focus:outline-none" />}
                    </td>
                    <td className="py-2 px-1.5 text-center">
                      {isSuspended ? <span className="text-slate-400">—</span> : <input type="number" min={0} value={row.cctv || ""} placeholder="0" onChange={(e) => handleUpdate(row.scId, "cctv", Number(e.target.value))} className="w-16 h-8 text-center font-bold rounded-lg border border-slate-300 focus:border-blue-600 focus:outline-none" />}
                    </td>
                    <td className="py-2 px-1.5 text-center">
                      {isSuspended ? <span className="text-slate-400">—</span> : <input type="number" min={0} value={row.gps || ""} placeholder="0" onChange={(e) => handleUpdate(row.scId, "gps", Number(e.target.value))} className="w-16 h-8 text-center font-bold rounded-lg border border-slate-300 focus:border-blue-600 focus:outline-none" />}
                    </td>
                    <td className="py-2 px-1.5 text-center">
                      {isSuspended ? <span className="text-slate-400">—</span> : <input type="number" min={0} value={row.router || ""} placeholder="0" onChange={(e) => handleUpdate(row.scId, "router", Number(e.target.value))} className="w-16 h-8 text-center font-bold rounded-lg border border-slate-300 focus:border-blue-600 focus:outline-none" />}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">{isSuspended ? "—" : total}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Totals Row */}
        <div className="p-3.5 bg-slate-50/70 border-t border-slate-200 flex items-center justify-between text-xs font-bold text-slate-900">
          <span className="uppercase text-[11px] text-slate-600">Total to Distribute</span>
          <div className="flex items-center gap-4 text-center">
            <span className="text-slate-500 font-semibold text-[11px]">79 APs</span>
            <span className="text-slate-500 font-semibold text-[11px]">Total: 9,862</span>
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
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">GPS stock at critical levels</span>
          <span className="text-amber-800 text-[11px]">
            450 GPS SIMs remaining · {totalGps} allocated · {450 - totalGps} remain after distribution. Consider restocking soon.
          </span>
        </div>
      </div>

      {/* Bottom Auth Card */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-start gap-2.5">
          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
            <Lock className="w-3 h-3 text-slate-700" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Enter your pin to confirm</h4>
            <p className="text-xs text-slate-500">Distributing {grandTotal.toLocaleString()} SIMs to {activeReceivingScs} State Coordinators</p>
          </div>
        </div>

        <div className="flex justify-start">
          <InputOTP maxLength={4} value={pin} onChange={setPin}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button type="button" onClick={onCancel} className="px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onDistribute(grandTotal, activeReceivingScs)}
            disabled={grandTotal <= 0 || pin.length < 4}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl shadow-sm transition-colors"
          >
            <span>Distribute to {activeReceivingScs} SCs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
