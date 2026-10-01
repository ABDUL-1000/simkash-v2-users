import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { openNotification } from "@/utils/notifications";
import type { DeviceSimItem } from "../types/api";

export function CancelRequestModal({ open, sim, onClose }: { open: boolean; sim: DeviceSimItem | null; onClose: () => void }) {
  const [reason, setReason] = useState(""); const [context, setContext] = useState("");
  const close = () => { setReason(""); setContext(""); onClose(); };
  const cancel = () => { openNotification({ state: "info", title: "Cancellation form complete", description: "Cancellation is not connected to a backend endpoint yet." }); close(); };
  return <AppModal open={open} onOpenChange={(v) => !v && close()} title="Cancel SIM Request" description="This action cannot be undone" size="sm"><div className="space-y-4">
    <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-800">Cancellation requests are processed within 24 hours. You may not be able to re-request immediately.</p>
    <dl className="divide-y divide-[#E2ECF6] rounded-lg bg-slate-50 px-3 text-xs">{[["Reference", `#${sim?.sim_id ?? sim?.id ?? "—"}`], ["SIM Type", `${sim?.network ?? "—"} ${sim?.typeLabel ?? sim?.sim_type ?? "SIM"}`], ["Delivery Area", "—"], ["Submitted", sim?.pendingDetails?.submitted_at ?? "—"]].map(([k, v]) => <div key={k} className="flex justify-between py-2"><dt className="text-[#8C909B]">{k}</dt><dd className="font-semibold">{v}</dd></div>)}</dl>
    <label className="block text-xs font-semibold">Reason for cancellation<select value={reason} onChange={(e) => setReason(e.target.value)} className="mt-1 w-full rounded-lg border border-[#E2ECF6] bg-white p-2.5 text-sm"><option value="">Select a reason</option><option>Changed my mind</option><option>Submitted by mistake</option><option>Delivery taking too long</option><option>Other</option></select></label>
    <label className="block text-xs font-semibold">Tell us more (optional)<textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="Additional context…" className="mt-1 min-h-20 w-full rounded-lg border border-[#E2ECF6] p-2.5 text-sm" /></label>
    <div className="flex justify-between border-t border-[#E2ECF6] pt-3"><button onClick={close} className="rounded-lg border border-[#E2ECF6] px-4 py-2 text-xs">Keep Request</button><button disabled={!reason} onClick={cancel} className="rounded-lg bg-[#EF4444] px-4 py-2 text-xs font-semibold text-white disabled:opacity-50">Cancel Request</button></div>
  </div></AppModal>;
}
