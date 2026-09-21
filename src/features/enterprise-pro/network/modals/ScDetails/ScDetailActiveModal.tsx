import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { ShieldCheck, Phone, Mail, Send, Percent, Bell, AlertTriangle } from "lucide-react";
import type { StateCoordinatorNetwork } from "../../types";

interface ScDetailActiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator: StateCoordinatorNetwork | null;
  onDistributeSim: (sc: StateCoordinatorNetwork) => void;
  onSetCommission: (sc: StateCoordinatorNetwork) => void;
  onSendReminder: (sc: StateCoordinatorNetwork) => void;
  onSuspend: (sc: StateCoordinatorNetwork) => void;
}

export const ScDetailActiveModal: React.FC<ScDetailActiveModalProps> = ({
  open,
  onOpenChange,
  coordinator,
  onDistributeSim,
  onSetCommission,
  onSendReminder,
  onSuspend,
}) => {
  if (!coordinator) return null;

  const target = coordinator.targetActivations || 2000;
  const progressPct = Math.min(Math.round((coordinator.activationsThisMonth / target) * 100), 100);

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="lg" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Header Profile */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-base text-blue-900">
              {coordinator.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{coordinator.name}</h3>
                <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" /> Active
                </span>
              </div>
              <p className="text-slate-500 text-xs">
                {coordinator.state} State · {coordinator.zone}
              </p>
              <div className="flex items-center gap-3 text-slate-400 text-[11px] mt-1">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" /> {coordinator.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" /> {coordinator.email}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-500 font-medium block">APs Count</span>
            <div className="text-sm font-bold text-slate-900 mt-1">{coordinator.apsCount} APs</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-500 font-medium block">Activations</span>
            <div className="text-sm font-bold text-slate-900 mt-1">
              {coordinator.activationsThisMonth.toLocaleString()}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-500 font-medium block">Total Margin</span>
            <div className="text-sm font-bold text-slate-900 mt-1">
              ₦{(coordinator.totalMargin / 1e6).toFixed(2)}M
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-500 font-medium block">Commission</span>
            <div className="text-sm font-bold text-emerald-600 mt-1">
              ₦{coordinator.commissionEarned.toLocaleString()}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-500 font-medium block">SIM Stock</span>
            <div className="text-sm font-bold text-blue-700 mt-1">
              {coordinator.simStock.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Target Progress Bar */}
        <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">Monthly Target Progress</span>
            <span className="font-bold text-slate-900">
              {coordinator.activationsThisMonth.toLocaleString()} / {target.toLocaleString()} ({progressPct}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onDistributeSim(coordinator);
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1F3A5F] text-white font-medium hover:bg-slate-800 transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Distribute SIMs</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onSetCommission(coordinator);
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 font-medium hover:bg-blue-100 transition"
          >
            <Percent className="w-3.5 h-3.5" />
            <span>Set Rate</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onSendReminder(coordinator);
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Send Reminder</span>
          </button>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onSuspend(coordinator);
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-medium hover:bg-rose-100 transition"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Suspend SC</span>
          </button>
        </div>
      </div>
    </AppModal>
  );
};
