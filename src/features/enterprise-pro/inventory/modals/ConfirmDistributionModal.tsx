import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { EP_SIM_LABELS, EP_SIM_TYPES } from "../types/adapters";
import type { EpSimSelection, StockQuantities } from "../types/simInventory";
import type { EpCoordinatorOption } from "../types";

interface ConfirmDistributionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    sc: EpCoordinatorOption | null;
    sims: EpSimSelection;
    notes?: string;
    onConfirm: () => void;
    pending?: boolean;
    availableStock?: StockQuantities;
}
export const ConfirmDistributionModal: React.FC<ConfirmDistributionModalProps> = ({ open, onOpenChange, sc, sims, notes, onConfirm, pending, availableStock }) => {
    const totalSims = EP_SIM_TYPES.reduce((sum, type) => sum + sims[type].length, 0);
    const scName = sc?.name || "—";
    const scState = sc?.state || "—";
    const scAps = sc?.apsCount ?? "—";
    const scInitials = sc?.initials || sc?.name.charAt(0) || "—";
    const types = EP_SIM_TYPES.filter((type) => sims[type].length);
    return (<AppModal open={open} onOpenChange={(value) => { if (!pending) onOpenChange(value); }} size="md" title={<div className="space-y-0.5">
          <h3 className="text-xl font-bold text-slate-900">Confirm Distribution</h3>
          <p className="text-xs text-slate-500 font-normal">
            {scName} · {scState}
          </p>
        </div>} footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Recipient Dark Banner */}
        <div className="p-3.5 bg-[#1B365D] text-white rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/30 text-white font-bold text-sm flex items-center justify-center shrink-0">
            {scInitials}
          </div>
          <div>
            <div className="text-sm font-bold">{scName}</div>
            <div className="text-[11px] text-slate-300">
              {scState} · {scAps} APs · {sc?.stock ?? 0} SIMs now
            </div>
          </div>
        </div>

        {/* Distributing Breakdown Card */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/90 space-y-3">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            Distributing
          </span>

          <div className="space-y-2.5 divide-y divide-slate-100">
            {EP_SIM_TYPES.map((type) => (<div key={type} className="flex items-center justify-between pt-2 first:pt-1">
                <span className="font-semibold text-slate-700">{EP_SIM_LABELS[type]}</span>
                <span className="font-bold text-slate-900 text-sm">{sims[type].length}</span>
              </div>))}
          </div>

          <div className="pt-2 border-t border-slate-200 flex items-center justify-between font-bold text-sm">
            <span className="text-slate-900">Total distributed:</span>
            <span className="text-emerald-600">{totalSims} SIMs</span>
          </div>

          <details className="rounded-lg border border-slate-200 p-2.5">
            <summary className="cursor-pointer text-[11px] font-bold text-blue-600">View SIM numbers</summary>
            <div className="mt-2 space-y-1.5">
              {types.map((type) => <p key={type} className="text-[11px] text-slate-500"><strong className="text-slate-900">{EP_SIM_LABELS[type]}:</strong> <span className="font-mono">{sims[type].join(", ")}</span></p>)}
            </div>
          </details>

          <div className="p-2.5 bg-emerald-50/70 border border-emerald-100 rounded-lg flex items-center gap-2 text-emerald-800 text-[11px]">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"/>
            <span>Distribution uses existing inventory. No payment required.</span>
          </div>
        </div>

        {/* EP Inventory Remaining After */}
        <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            EP Inventory Remaining After
          </span>
          <div className="space-y-1.5 text-slate-600 font-medium">
            {EP_SIM_TYPES.map((type) => (<div key={type} className="flex justify-between">
                <span>{EP_SIM_LABELS[type]}</span>
                <span className="text-slate-700">{availableStock?.[type]?.toLocaleString() ?? "—"} &rarr; {availableStock ? (availableStock[type] - sims[type].length).toLocaleString() : "—"} (-{sims[type].length})</span>
              </div>))}
          </div>
        </div>

        {notes?.trim() && <p className="text-xs italic text-slate-500 px-1">"{notes.trim()}"</p>}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button type="button" disabled={pending} onClick={() => onOpenChange(false)} className="w-full inline-flex items-center justify-center gap-1 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-50">
            <ArrowLeft className="w-3.5 h-3.5"/>
            <span>Edit</span>
          </button>
          <button type="button" onClick={onConfirm} disabled={pending || totalSims === 0} className="w-full inline-flex items-center justify-center gap-1 py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl shadow-sm transition-colors">
            <span>{pending ? "Distributing…" : `Distribute to ${scName.split(" ")[0]}`}</span>
            <ArrowRight className="w-3.5 h-3.5"/>
          </button>
        </div>
      </div>
    </AppModal>);
};
