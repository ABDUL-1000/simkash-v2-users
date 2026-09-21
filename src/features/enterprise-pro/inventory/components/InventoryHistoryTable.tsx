import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import type { SimLedgerEntry } from "../types";

interface InventoryHistoryTableProps {
  entries: SimLedgerEntry[];
}

export const InventoryHistoryTable: React.FC<InventoryHistoryTableProps> = ({ entries }) => {
  const [directionFilter, setDirectionFilter] = useState<"all" | "in" | "out">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const filtered = entries
    .filter((e) => {
      if (directionFilter === "in") return e.type === "reorder" || e.type === "adjustment";
      if (directionFilter === "out") return e.type === "distribution";
      return true;
    })
    .filter((e) => {
      if (typeFilter === "pos") return e.pos > 0;
      if (typeFilter === "cctv") return e.cctv > 0;
      if (typeFilter === "gps") return e.gps > 0;
      if (typeFilter === "router") return e.router > 0;
      return true;
    })
    .filter((e) =>
      e.referenceId.toLowerCase().includes(search.toLowerCase()) ||
      e.recipientOrSource.toLowerCase().includes(search.toLowerCase()) ||
      (e.notes && e.notes.toLowerCase().includes(search.toLowerCase()))
    );

  const formatDelta = (val: number, isOrder: boolean) => {
    if (val === 0) return <span className="text-slate-300 font-mono">—</span>;
    if (isOrder) return <span className="text-emerald-600 font-mono font-bold">+{val.toLocaleString()}</span>;
    return <span className="text-rose-600 font-mono font-bold">-{val.toLocaleString()}</span>;
  };

  return (
    <div className="space-y-4">
      {/* Filter strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" onClick={() => setDirectionFilter("all")} className={`px-3 py-1.5 rounded-full font-bold transition-all ${directionFilter === "all" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}>All</button>
          <button type="button" onClick={() => setDirectionFilter("in")} className={`px-3 py-1.5 rounded-full font-medium transition-all ${directionFilter === "in" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}>Orders In</button>
          <button type="button" onClick={() => setDirectionFilter("out")} className={`px-3 py-1.5 rounded-full font-medium transition-all ${directionFilter === "out" ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}>Distributions Out</button>

          <span className="text-slate-300 px-1">·</span>

          <button type="button" onClick={() => setTypeFilter("all")} className={`px-2.5 py-1.5 rounded-lg font-semibold ${typeFilter === "all" ? "text-blue-700 bg-blue-50" : "text-slate-600"}`}>All Types</button>
          {["POS", "CCTV", "GPS", "Router"].map((t) => (
            <button key={t} type="button" onClick={() => setTypeFilter(t.toLowerCase())} className={`px-2.5 py-1.5 rounded-lg font-medium ${typeFilter === t.toLowerCase() ? "text-blue-700 bg-blue-50 font-bold" : "text-slate-500 hover:text-slate-900"}`}>{t}</button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium inline-flex items-center gap-1.5">
            <span>All SCs</span><ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <button type="button" className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium inline-flex items-center gap-1.5">
            <span>Newest</span><ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 w-36 sm:w-44" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] font-bold text-slate-400 border-b border-slate-100 bg-slate-50/50">
              <tr>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-3">TYPE</th>
                <th className="py-3 px-4">DESCRIPTION</th>
                <th className="py-3 px-2 text-center">POS</th>
                <th className="py-3 px-2 text-center">CCTV</th>
                <th className="py-3 px-2 text-center">GPS</th>
                <th className="py-3 px-2 text-center">ROUTER</th>
                <th className="py-3 px-3 text-center">TOTAL</th>
                <th className="py-3 px-3 text-right">BALANCE</th>
                <th className="py-3 px-4 text-right">REF#</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => {
                const isOrder = item.type === "reorder" || item.type === "adjustment";
                const isInit = item.type === "adjustment";
                const dateParts = item.date.split(" ");

                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{dateParts.slice(0, 2).join(" ")}</div>
                      <div className="text-[11px] text-slate-400">{dateParts.slice(2).join(" ")}</div>
                    </td>
                    <td className="py-3 px-3">
                      {isInit ? (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">INIT STOCK</span>
                      ) : isOrder ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">ORDER IN</span>
                      ) : (
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">DISTRIBUTION</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{item.recipientOrSource}</div>
                      <div className="text-[11px] text-slate-400">{item.notes}</div>
                    </td>
                    <td className="py-3 px-2 text-center">{formatDelta(item.pos, isOrder)}</td>
                    <td className="py-3 px-2 text-center">{formatDelta(item.cctv, isOrder)}</td>
                    <td className="py-3 px-2 text-center">{formatDelta(item.gps, isOrder)}</td>
                    <td className="py-3 px-2 text-center">{formatDelta(item.router, isOrder)}</td>
                    <td className="py-3 px-3 text-center">{formatDelta(item.totalSims, isOrder)}</td>
                    <td className="py-3 px-3 text-right font-extrabold text-slate-900 font-mono">{item.balanceAfter.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono text-[11px] text-slate-400">{item.referenceId}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filtered.length} of 12 transactions</span>
          <div className="flex items-center gap-1">
            <button type="button" className="px-2 py-1 text-slate-400 hover:text-slate-700">&lt;</button>
            <span className="w-6 h-6 rounded bg-slate-900 text-white font-bold flex items-center justify-center text-xs">1</span>
            <button type="button" className="px-2 py-1 text-slate-400 hover:text-slate-700">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};
