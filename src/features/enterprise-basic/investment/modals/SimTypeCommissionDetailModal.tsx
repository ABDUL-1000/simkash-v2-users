import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { AlertTriangle, TrendingUp, ArrowRight } from "lucide-react";
import type { SimPnLDetail } from "../types";

interface SimTypeCommissionDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sim: SimPnLDetail | null;
  onAssignSim?: () => void;
  onSetPrice?: () => void;
}

export const SimTypeCommissionDetailModal: React.FC<
  SimTypeCommissionDetailModalProps
> = ({ open, onOpenChange, sim, onAssignSim, onSetPrice }) => {
  if (!sim) return null;

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <div className="space-y-3.5 pt-1 text-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">{sim.simType} — Commission Detail</h3>
          <p className="text-xs text-slate-400 mt-0.5">All time · Jan–Jun 2026</p>
        </div>

        {/* Dark Navy Profit Banner */}
        <div className="p-3.5 bg-[#0F223D] text-white rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-lg font-extrabold text-white">+₦686,000 profit</div>
            <p className="text-[11px] text-slate-300 mt-0.5">Revenue exceeds cost by ₦686,000</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 font-medium divide-y divide-slate-200/70">
          <div className="grid grid-cols-2 gap-2 pb-1.5">
            <div className="flex justify-between text-slate-600">
              <span>SIMs purchased</span>
              <span className="font-bold text-slate-900">{sim.totalPurchased}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Wholesale/SIM</span>
              <span className="font-bold text-slate-900">₦{sim.wholesalePrice.toLocaleString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 py-1.5">
            <div className="flex justify-between text-slate-600">
              <span>SIMs sold</span>
              <span className="font-bold text-slate-900">{sim.totalSold}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Your retail</span>
              <span className="font-bold text-slate-900">₦{sim.retailPrice.toLocaleString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 py-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Total revenue</span>
              <span className="font-bold text-emerald-600">₦{sim.totalRevenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Margin/SIM</span>
              <span className="font-bold text-blue-600">₦{sim.marginPerSim.toLocaleString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Unsold SIMs</span>
              <span className="font-bold text-amber-600">{sim.unsoldStock}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Cost locked</span>
              <span className="font-bold text-slate-900">₦{sim.unsoldCostLocked.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Monthly Sales Trend Bars */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-400 uppercase tracking-wider">Monthly Sales</span>
            <span className="font-semibold text-emerald-600">Sales growing 8% MoM</span>
          </div>
          <div className="flex items-end gap-2 h-14 bg-slate-50 p-2 rounded-xl border border-slate-100">
            {sim.monthlySales.map((m) => (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-blue-600 rounded-xs transition-all"
                  style={{ height: `${(m.units / 150) * 100}%` }}
                />
                <span className="text-[9px] text-slate-400 font-bold">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Yellow Potential Margin Alert */}
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-amber-900 text-xs">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="leading-snug">
              <strong>{sim.unsoldStock} unsold {sim.simType}s</strong> = ₦{(sim.unsoldStock * sim.marginPerSim).toLocaleString()} potential margin still to unlock.
            </p>
            {onAssignSim && (
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  onAssignSim();
                }}
                className="font-bold text-amber-700 hover:underline inline-flex items-center gap-1 text-[11px]"
              >
                <span>Assign {sim.simType}s</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          {onSetPrice && (
            <button
              type="button"
              onClick={onSetPrice}
              className="py-2 px-3 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Set Retail Price
            </button>
          )}
          {onAssignSim && (
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onAssignSim();
              }}
              className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-xs"
            >
              Assign {sim.simType}
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="py-2 px-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
};
