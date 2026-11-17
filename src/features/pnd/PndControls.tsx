import { useState } from "react";
import { Tooltip } from "antd";
import { AppModal } from "@/components/common/AppModal";
import { usePndAction, type PndState } from "./api";

const when = (iso: string | null) => iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : null;

/** Amber "On PND" badge (tooltip: reason and when). Renders nothing when not on PND. */
export function PndBadge({ pnd }: { pnd?: PndState | null }) {
  if (!pnd?.is_pnd) return null;
  const tip = [pnd.reason, when(pnd.placed_at) && `Placed ${when(pnd.placed_at)}`].filter(Boolean).join(" · ") || "Payouts to bank are blocked";
  return <Tooltip title={tip}><span className="inline-flex shrink-0 items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-[#B45309]">On PND</span></Tooltip>;
}

/** Note shown when someone is on PND but this manager can't lift it. */
export function PndLockedNote({ pnd }: { pnd?: PndState | null }) {
  if (!pnd?.is_pnd || pnd.can_lift) return null;
  return <p className="text-[11px] font-semibold text-[#B45309]">PND placed by SimKash. Contact support to lift.</p>;
}

/** Place-on-PND (reason required) or Lift-PND (optional message) dialog. `url` is from `pndBase`. */
export function PndDialog({ mode, name, url, onClose }: { mode: "place" | "lift"; name: string; url: string; onClose: () => void }) {
  const [reason, setReason] = useState("");
  const action = usePndAction();
  const place = mode === "place";
  const submit = () => action.mutate({ url, lift: !place, reason: reason.trim() || undefined }, { onSuccess: onClose });
  return <AppModal open onOpenChange={(v) => { if (!v && !action.isPending) onClose(); }} size="sm" footer={null}
    title={place ? `Place ${name} on PND?` : `Lift PND for ${name}?`}
    description={place ? "They can still earn and receive funds, but won't be able to withdraw to their bank account until PND is lifted." : "They'll be able to withdraw to their bank account again."}>
    <div className="space-y-3 text-xs">
      <label className="block space-y-1">
        <span className="font-bold text-[#0F152A]">{place ? "Reason *" : "Message to them (optional)"}</span>
        <textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} placeholder={place ? "e.g. Unreconciled SIM stock" : "e.g. Stock reconciled, payouts restored"} className="w-full rounded-xl border border-[#E2ECF6] p-3 outline-none focus:border-[#2563EB]" />
      </label>
      <div className="flex justify-end gap-2 border-t border-[#E2ECF6] pt-3">
        <button type="button" disabled={action.isPending} onClick={onClose} className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 font-bold">Cancel</button>
        <button type="button" disabled={action.isPending || (place && !reason.trim())} onClick={submit} className={`rounded-xl px-5 py-2.5 font-bold text-white disabled:opacity-50 ${place ? "bg-[#D97706]" : "bg-[#10B981]"}`}>
          {action.isPending ? "Saving…" : place ? "Place on PND" : "Lift PND"}
        </button>
      </div>
    </div>
  </AppModal>;
}
