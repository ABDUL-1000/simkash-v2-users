import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { openNotification } from "@/utils/notifications";
import { useApproveSimRequest, useRejectSimRequest } from "../api";
import type { SimRequest } from "../types";
import { NETWORKS, fmtNumber, parseNumbers, unitLabel } from "../utils";
import { ErrorNote, Field, PrimaryButton, footerClass, inputClass, secondaryBtn } from "../components/ui";

function Summary({ request }: { request: SimRequest }) {
  return <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] px-3.5 py-1 text-xs">
    <div className="flex justify-between gap-3 py-2"><span className="text-[#66738C]">From</span><span className="text-right font-bold capitalize text-[#0F152A]">{request.requester?.name?.toLowerCase()} <span className="font-semibold normal-case text-[#8C909B]">({request.requester?.role_label})</span></span></div>
    <div className="flex justify-between gap-3 py-2"><span className="text-[#66738C]">Asked for</span><span className="font-bold text-[#0F152A]">{fmtNumber(request.quantity)} × {request.sim_type_label}{request.network ? ` · ${request.network}` : ""}</span></div>
    {request.note && <div className="flex justify-between gap-3 py-2"><span className="shrink-0 text-[#66738C]">Note</span><span className="text-right font-semibold text-[#0F152A]">{request.note}</span></div>}
  </div>;
}

/** Approving sends the SIMs in the same step: either your oldest undistributed stock or the numbers you list. */
export function ApproveSimRequestModal({ request, onClose }: { request: SimRequest | null; onClose: () => void }) {
  const approve = useApproveSimRequest();
  const close = () => { if (!approve.isPending) { approve.reset(); onClose(); } };
  return <AppModal open={Boolean(request)} onOpenChange={(v) => { if (!v) close(); }} title="Approve & send SIMs" description="The SIMs move to their stock as soon as you approve" size="md" showCloseButton={!approve.isPending}>
    {request && <ApproveForm key={request.id} request={request} approve={approve} onClose={close} />}
  </AppModal>;
}

function ApproveForm({ request, approve, onClose }: { request: SimRequest; approve: ReturnType<typeof useApproveSimRequest>; onClose: () => void }) {
  const isDevice = request.sim_type === "cctv_device";
  const [mode, setMode] = useState<"auto" | "pick">("auto");
  const [quantity, setQuantity] = useState(String(request.quantity));
  const [network, setNetwork] = useState(request.network ?? "");
  const [numbersText, setNumbersText] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const numbers = parseNumbers(numbersText);
  const qty = Number(quantity);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "auto" && !(Number.isInteger(qty) && qty >= 1 && qty <= 5000)) { setError("Enter a quantity between 1 and 5,000"); return; }
    if (mode === "pick" && !numbers.length) { setError(`Enter at least one ${isDevice ? "serial number" : "SIM number"}`); return; }
    setError(null);
    approve.mutate({
      id: request.id,
      ...(mode === "pick" ? { sim_numbers: numbers } : { quantity: qty, ...(network ? { network } : {}) }),
      ...(note.trim() ? { note: note.trim() } : {}),
    }, {
      onSuccess: (result) => {
        const sent = result?.distributed?.total ?? result?.request?.approved_quantity ?? (mode === "pick" ? numbers.length : qty);
        openNotification({ state: "success", title: "Request approved", description: `${fmtNumber(sent)} ${unitLabel(request.sim_type, sent)} sent to ${request.requester?.name ?? "the requester"}.` });
        approve.reset();
        onClose();
      },
      // Sending failed (e.g. not enough stock): the request stays pending, so show why and let them adjust.
      onError: (err) => setError(err.message),
    });
  };

  return <form onSubmit={submit} className="space-y-4 pt-1">
    <Summary request={request} />
    <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-[#F8FAFC] p-1">
      {([["auto", "Send oldest stock"], ["pick", isDevice ? "Choose serials" : "Choose SIM numbers"]] as const).map(([value, label]) =>
        <button key={value} type="button" onClick={() => { setMode(value); setError(null); }}
          className={`rounded-lg py-2 text-[11px] font-bold transition ${mode === value ? "bg-white text-[#0F152A] shadow-xs" : "text-[#66738C]"}`}>{label}</button>)}
    </div>

    {mode === "auto" ? <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Quantity to send" hint={`They asked for ${fmtNumber(request.quantity)}`}>
        <input className={inputClass} inputMode="numeric" value={quantity} onChange={(e) => setQuantity(e.target.value.replace(/\D/g, "").slice(0, 4))} />
      </Field>
      {!isDevice && <Field label="Network">
        <select className={inputClass} value={network} onChange={(e) => setNetwork(e.target.value)}>
          <option value="">Any network</option>
          {NETWORKS.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </Field>}
    </div>
      : <Field label={isDevice ? "Serial numbers" : "SIM numbers"} hint={numbers.length ? `${fmtNumber(numbers.length)} ${unitLabel(request.sim_type, numbers.length)} entered` : "One per line, or separated by commas"}>
        <textarea className={`${inputClass} min-h-28 resize-y font-mono`} placeholder={isDevice ? "SN-0001\nSN-0002" : "08130000001\n08130000002"} value={numbersText} onChange={(e) => setNumbersText(e.target.value)} />
      </Field>}

    <Field label="Message (optional)">
      <input className={inputClass} maxLength={300} placeholder="e.g. Sent, check your stock" value={note} onChange={(e) => setNote(e.target.value)} />
    </Field>
    <ErrorNote message={error} />

    <div className={footerClass}>
      <button type="button" onClick={onClose} disabled={approve.isPending} className={secondaryBtn}>Cancel</button>
      <PrimaryButton type="submit" loading={approve.isPending}>{approve.isPending ? "Sending…" : "Approve & send"}</PrimaryButton>
    </div>
  </form>;
}

export function RejectSimRequestModal({ request, onClose }: { request: SimRequest | null; onClose: () => void }) {
  const reject = useRejectSimRequest();
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const close = () => { if (reject.isPending) return; setReason(""); setError(null); onClose(); };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;
    reject.mutate({ id: request.id, reason: reason.trim() || undefined }, {
      onSuccess: () => { openNotification({ state: "success", title: "Request declined", description: `${request.requester?.name ?? "The requester"} has been notified.` }); setReason(""); onClose(); },
      onError: (err) => setError(err.message),
    });
  };
  return <AppModal open={Boolean(request)} onOpenChange={(v) => { if (!v) close(); }} title="Decline request" description="Let them know why so they can plan" size="sm" showCloseButton={!reject.isPending}>
    {request && <form onSubmit={submit} className="space-y-4 pt-1">
      <Summary request={request} />
      <Field label="Reason">
        <textarea className={`${inputClass} min-h-20 resize-none`} maxLength={300} placeholder="e.g. Out of stock this week" value={reason} onChange={(e) => setReason(e.target.value)} />
      </Field>
      <ErrorNote message={error} />
      <div className={footerClass}>
        <button type="button" onClick={close} disabled={reject.isPending} className={secondaryBtn}>Cancel</button>
        <PrimaryButton type="submit" tone="red" loading={reject.isPending}>Decline request</PrimaryButton>
      </div>
    </form>}
  </AppModal>;
}
