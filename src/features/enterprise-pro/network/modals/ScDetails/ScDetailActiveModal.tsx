import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { ShieldCheck, Phone, Send, Bell, AlertTriangle, RotateCcw } from "lucide-react";
import { useGetEnterpriseScSims } from "../../api/queries";
import type { StateCoordinatorNetwork } from "../../types";

interface ScDetailActiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinator: StateCoordinatorNetwork | null;
  onDistributeSim: (sc: StateCoordinatorNetwork) => void;
  onSendReminder: (sc: StateCoordinatorNetwork) => void;
  onSuspend: (sc: StateCoordinatorNetwork) => void;
  onReinstate: (sc: StateCoordinatorNetwork) => void;
}

const SIM_TYPES = ["all", "pos", "cctv", "gps", "router"];

export const ScDetailActiveModal: React.FC<ScDetailActiveModalProps> = ({
  open,
  onOpenChange,
  coordinator,
  onDistributeSim,
  onSendReminder,
  onSuspend,
  onReinstate,
}) => {
  if (!coordinator) return null;
  const suspended = coordinator.status === "suspended";
  const target = coordinator.target;

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
                <span className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${suspended ? "text-red-700 bg-red-50 border-red-200" : "text-emerald-700 bg-emerald-50 border-emerald-200"}`}>
                  <ShieldCheck className="w-3 h-3" /> {coordinator.statusLabel}
                </span>
              </div>
              <p className="text-slate-500 text-xs">
                {coordinator.state} State · Joined {coordinator.joinedDate}
              </p>
              <div className="flex items-center gap-3 text-slate-400 text-[11px] mt-1">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-400" /> {coordinator.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-500 font-medium block">APs Count</span>
            <div className="text-sm font-bold text-slate-900 mt-1">{coordinator.apsCount} APs</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-500 font-medium block">Activations</span>
            <div className="text-sm font-bold text-slate-900 mt-1">
              {coordinator.activationsThisMonth?.toLocaleString() ?? "—"}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-500 font-medium block">SIM Stock</span>
            <div className="text-sm font-bold text-blue-700 mt-1">
              {coordinator.stockLabel}
            </div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-500 font-medium block">Last Active</span>
            <div className="text-sm font-bold text-slate-900 mt-1">{coordinator.lastActive}</div>
          </div>
        </div>

        {/* Target Progress Bar */}
        {target && <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">Monthly Target Progress</span>
            <span className="font-bold text-slate-900">
              {target.current?.toLocaleString() ?? "—"} / {target.target?.toLocaleString() ?? "—"}
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, Math.max(0, target.percentage))}%` }}/>
          </div>
          <p className="text-[11px] text-slate-500">{target.text}</p>
        </div>}

        {open && <CoordinatorStock key={coordinator.id} coordinatorId={coordinator.id} />}

        {/* Action Buttons */}
        {suspended ? (
          <button
            type="button"
            onClick={() => { onOpenChange(false); onReinstate(coordinator); }}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reinstate SC</span>
          </button>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            <button
              type="button"
              disabled={!coordinator.canDistribute}
              onClick={() => { onOpenChange(false); onDistributeSim(coordinator); }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1F3A5F] text-white font-medium hover:bg-slate-800 transition disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Distribute SIMs</span>
            </button>
            <button
              type="button"
              disabled={!coordinator.canRemind}
              onClick={() => { onOpenChange(false); onSendReminder(coordinator); }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition disabled:opacity-50"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Send Reminder</span>
            </button>
            <button
              type="button"
              disabled={!coordinator.canSuspend}
              onClick={() => { onOpenChange(false); onSuspend(coordinator); }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 font-medium hover:bg-rose-100 transition disabled:opacity-50"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Suspend SC</span>
            </button>
          </div>
        )}
      </div>
    </AppModal>
  );
};

/** GET /my-state-coordinator/{id}/undistributed-sims */
function CoordinatorStock({ coordinatorId }: { coordinatorId: string }) {
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const query = useGetEnterpriseScSims(coordinatorId, { type, page, limit: 10 });
  const summary = query.data?.summary;
  const sims = query.data?.sims ?? [];
  const totalPages = query.data?.total_pages ?? 1;
  return (
    <div className="p-3.5 rounded-xl border border-slate-200/80 space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-semibold text-slate-800">Undistributed SIMs Held{summary ? ` (${summary.total_undistributed})` : ""}</span>
        <div className="flex flex-wrap gap-1">
          {SIM_TYPES.map((value) => (
            <button key={value} type="button" onClick={() => { setType(value); setPage(1); }} className={`rounded-lg px-2 py-1 text-[10px] font-bold uppercase ${type === value ? "bg-[#1F3A5F] text-white" : "bg-slate-100 text-slate-600"}`}>
              {value}{value !== "all" && summary ? ` ${summary[value as "pos"]}` : ""}
            </button>
          ))}
        </div>
      </div>
      {query.isPending ? <p className="py-3 text-center text-slate-400">Loading SIMs…</p>
        : query.isError ? <p className="py-3 text-center text-red-600">{query.error.message}</p>
        : sims.length === 0 ? <p className="py-3 text-center text-slate-400">No undistributed SIMs for this filter.</p>
        : <div className="max-h-40 divide-y divide-slate-100 overflow-y-auto">
          {sims.map((sim) => (
            <div key={sim.id} className="flex items-center justify-between py-1.5">
              <span className="font-mono font-bold text-slate-800">{sim.sim_number}</span>
              <span className="text-[11px] text-slate-500">{sim.type_label} · {sim.network}</span>
            </div>
          ))}
        </div>}
      {totalPages > 1 && <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
        <button type="button" disabled={page <= 1} onClick={() => setPage(page - 1)} className="font-semibold disabled:opacity-40">Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button type="button" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="font-semibold disabled:opacity-40">Next</button>
      </div>}
    </div>
  );
}
