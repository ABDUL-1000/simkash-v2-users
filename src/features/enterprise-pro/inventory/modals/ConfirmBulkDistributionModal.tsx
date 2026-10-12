import type { StockQuantities } from '../types/simInventory';
import type { BulkDistributionRow } from '../types';
import { AppEmptyState } from '@/components/common/AppEmptyState';
import React, { useState } from "react";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
interface ConfirmBulkDistributionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (pin: string) => void;
    pending?: boolean;
    rows: BulkDistributionRow[];
    availableStock?: StockQuantities;
}
export const ConfirmBulkDistributionModal: React.FC<ConfirmBulkDistributionModalProps> = ({ open, onOpenChange, onConfirm, rows, pending, availableStock, }) => {
    const [pin, setPin] = useState("");
    const scList = rows.map(row => ({ name: row.scName + ' (' + row.state + ')', sims: (row.pos + row.cctv + row.gps + row.router) + ' SIMs', breakdown: 'POS:' + row.pos + ' CCTV:' + row.cctv + ' GPS:' + row.gps + ' RT:' + row.router }));
    const totalSims = rows.reduce((sum, row) => sum + row.pos + row.cctv + row.gps + row.router, 0);
    const totals = { pos: 0, cctv: 0, gps: 0, router: 0 };
    for (const row of rows) {
        totals.pos += row.pos;
        totals.cctv += row.cctv;
        totals.gps += row.gps;
        totals.router += row.router;
    }
    const handleConfirm = () => {
        if (!/^\d{4}$/.test(pin) || pending)
            return;
        onConfirm(pin);
    };
    return (<AppModal open={open} onOpenChange={onOpenChange} size="md" title={<div className="space-y-0.5">
          <h3 className="text-xl font-bold text-slate-900">Confirm Bulk Distribution</h3>
          <p className="text-xs text-slate-500 font-normal">
            {rows.length} State Coordinators · {totalSims.toLocaleString()} SIMs
          </p>
        </div>} footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Card 1: SC Distribution Summary */}
        <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-3">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            SC Distribution Summary
          </span>

          <div className="space-y-2.5">
            {scList.length === 0 && <AppEmptyState title="No allocations"/>}
            {scList.map((sc) => (<div key={sc.name} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">{sc.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-slate-900">{sc.sims}</span>
                  <span className="text-[11px] font-mono text-slate-400 min-w-[120px] text-right">
                    {sc.breakdown}
                  </span>
                </div>
              </div>))}
          </div>

          <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between font-bold text-sm">
            <span className="text-slate-900">Total SIMs distributed:</span>
            <span className="text-emerald-600">{totalSims.toLocaleString()} SIMs</span>
          </div>
        </div>

        {/* Card 2: EP Inventory Remaining */}
        <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-2.5">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            EP Inventory Remaining
          </span>

          <div className="space-y-2 text-xs font-medium">
            <div className="flex justify-between text-slate-700">
              <span>POS SIM</span>
              <span className="font-bold text-amber-600">{availableStock?.pos.toLocaleString() ?? '—'} &rarr; {availableStock ? (availableStock.pos - totals.pos).toLocaleString() : '—'}</span>
            </div>

            <div className="flex justify-between text-slate-700">
              <span>CCTV SIM</span>
              <span className="font-bold text-amber-600 flex items-center gap-1">
                <span>{availableStock?.cctv.toLocaleString() ?? '—'} &rarr; {availableStock ? (availableStock.cctv - totals.cctv).toLocaleString() : '—'}</span>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 fill-amber-500"/>
              </span>
            </div>

            <div className="flex justify-between text-slate-700">
              <span>GPS SIM</span>
              <span className="font-bold text-rose-600 flex items-center gap-1">
                <span>{availableStock?.gps.toLocaleString() ?? '—'} &rarr; {availableStock ? (availableStock.gps - totals.gps).toLocaleString() : '—'}</span>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500 fill-rose-500"/>
                <span className="text-[10px] uppercase font-extrabold tracking-wider">Remaining</span>
              </span>
            </div>

            <div className="flex justify-between text-slate-700">
              <span>Router SIM</span>
              <span className="font-bold text-emerald-600">{availableStock?.router.toLocaleString() ?? '—'} &rarr; {availableStock ? (availableStock.router - totals.router).toLocaleString() : '—'}</span>
            </div>
          </div>
        </div>

        {/* PIN Entry */}
        <div className="space-y-2 text-center pt-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Enter Transaction PIN
          </span>
          <div className="flex justify-center">
            <InputOTP pattern="[0-9]*" maxLength={4} value={pin} onChange={setPin}>
              <InputOTPGroup>
                <InputOTPSlot masked index={0}/>
                <InputOTPSlot masked index={1}/>
                <InputOTPSlot masked index={2}/>
                <InputOTPSlot masked index={3}/>
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button type="button" onClick={() => onOpenChange(false)} className="w-full inline-flex items-center justify-center py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors">
            Cancel
          </button>
          <button type="button" onClick={handleConfirm} disabled={!/^\d{4}$/.test(pin) || pending || totalSims === 0} className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl shadow-sm transition-colors">
            <span>{pending ? "Distributing…" : `Distribute to ${rows.length} SCs`}</span>
            <ArrowRight className="w-3.5 h-3.5"/>
          </button>
        </div>
      </div>
    </AppModal>);
};
