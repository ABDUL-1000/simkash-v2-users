import { Check, Circle, Phone } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { DeviceSimItem } from "../types/api";

export function TrackRequestModal({ open, sim, onClose, onCancel }: { open: boolean; sim: DeviceSimItem | null; onClose: () => void; onCancel: () => void }) {
  const steps = sim?.pendingDetails?.steps ?? [];
  const reference = sim?.sim_id || sim?.id || "—";
  return <AppModal open={open} onOpenChange={(v) => !v && onClose()} title="Track Request" description={`REF: #${reference}`} size="md"><div className="space-y-4">
    <div className="rounded-xl bg-blue-50 p-3"><p className="text-sm font-bold text-[#0F152A]">{sim?.network} {sim?.typeLabel || sim?.sim_type} · {sim?.sim_number}</p><p className="mt-1 text-xs text-[#8C909B]">Submitted: {sim?.pendingDetails?.submitted_at || "—"}</p></div>
    <p className="text-[10px] font-bold uppercase tracking-wide text-[#8C909B]">Timeline</p><ol className="space-y-4">{(steps.length ? steps : ["Request Submitted", "Agent Assigned", "SIM Activation", "Completed"].map((title, i) => ({ step: i + 1, title, completed: i < 2, current: i === 2 }))).map((step) => <li key={step.step} className="flex gap-3"><span className={`flex size-6 shrink-0 items-center justify-center rounded-full ${step.completed ? "bg-[#10B981] text-white" : step.current ? "bg-[#F59E0B] text-white" : "bg-slate-100 text-[#8C909B]"}`}>{step.completed ? <Check size={13} /> : <Circle size={11} />}</span><div><p className="text-sm font-semibold">{step.title}</p><p className="text-xs text-[#8C909B]">{step.completed ? "Complete" : step.current ? "In Progress" : "Pending"}</p></div></li>)}</ol>
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3"><span className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-[#2563EB]">A</span><div className="flex-1"><p className="text-sm font-semibold">Assigned agent</p><p className="text-xs text-[#8C909B]">Contact details will appear when assigned</p></div><button disabled className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-[#10B981] disabled:opacity-50"><Phone size={12} />Call Agent</button></div>
    <div className="flex justify-between border-t border-[#E2ECF6] pt-3"><button onClick={onCancel} className="rounded-lg border border-red-200 px-4 py-2 text-xs text-[#EF4444]">Cancel Request</button><button onClick={onClose} className="rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white">Close</button></div>
  </div></AppModal>;
}
