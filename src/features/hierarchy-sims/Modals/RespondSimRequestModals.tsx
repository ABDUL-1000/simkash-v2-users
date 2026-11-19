import { useDeferredValue, useState } from "react";
import { AlertTriangle, Package, RefreshCw, Search } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { openNotification } from "@/utils/notifications";
import { useApproveSimRequest, useAvailableSims, useRejectSimRequest } from "../api";
import type { SimRequest, SimType } from "../types";
import { NETWORKS, fmtNumber, simTypeLabel, unitLabel } from "../utils";
import { ErrorNote, Field, Pager, PrimaryButton, footerClass, inputClass, secondaryBtn } from "../components/ui";

function Summary({ request }: { request: SimRequest }) {
  return <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] px-3.5 py-1 text-xs">
    <div className="flex justify-between gap-3 py-2"><span className="text-[#66738C]">From</span><span className="text-right font-bold capitalize text-[#0F152A]">{request.requester?.name?.toLowerCase()} <span className="font-semibold normal-case text-[#8C909B]">({request.requester?.role_label})</span></span></div>
    <div className="flex justify-between gap-3 py-2"><span className="text-[#66738C]">Asked for</span><span className="font-bold text-[#0F152A]">{fmtNumber(request.quantity)} × {request.sim_type_label}{request.network ? ` · ${request.network}` : ""}</span></div>
    {request.note && <div className="flex justify-between gap-3 py-2"><span className="shrink-0 text-[#66738C]">Note</span><span className="text-right font-semibold text-[#0F152A]">{request.note}</span></div>}
  </div>;
}

/** Approving sends the SIMs in the same step: either your oldest undistributed stock or SIMs you pick from it. */
export function ApproveSimRequestModal({ request, onClose }: { request: SimRequest | null; onClose: () => void }) {
  const approve = useApproveSimRequest();
  const close = () => { if (!approve.isPending) { approve.reset(); onClose(); } };
  return <AppModal open={Boolean(request)} onOpenChange={(v) => { if (!v) close(); }} title="Approve & send SIMs" description="The SIMs move to their stock as soon as you approve" size="md" showCloseButton={!approve.isPending}>
    {request && <ApproveForm key={request.id} request={request} approve={approve} onClose={close} />}
  </AppModal>;
}

const PICK_PAGE_SIZE = 50;

function ApproveForm({ request, approve, onClose }: { request: SimRequest; approve: ReturnType<typeof useApproveSimRequest>; onClose: () => void }) {
  const type = request.sim_type as SimType;
  const isDevice = type === "cctv_device";
  const typeName = request.sim_type_label || simTypeLabel(type);
  const [mode, setMode] = useState<"auto" | "pick">("auto");
  const [network, setNetwork] = useState(request.network ?? "");
  const [quantity, setQuantity] = useState(String(request.quantity));
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  // Picker state: selected numbers survive paging, searching and network changes.
  const [searchText, setSearchText] = useState("");
  const search = useDeferredValue(searchText.trim());
  const [page, setPage] = useState(1);
  const [picked, setPicked] = useState<Set<string>>(new Set());

  // Your undistributed stock of this type: the same list the Distribute screens pick from.
  const stock = useAvailableSims({ type, network: network || undefined, page: 1, limit: 1 });
  const list = useAvailableSims({ type, network: network || undefined, search: search || undefined, page, limit: PICK_PAGE_SIZE }, mode === "pick");
  const available = stock.data?.total;
  const short = available != null && available < request.quantity;
  const rows = list.data?.sims ?? [];
  const allOnPage = rows.length > 0 && rows.every((r) => picked.has(r.number));
  const qty = Number(quantity);
  const unit = (n: number) => unitLabel(type, n);

  const toggle = (n: string) => setPicked((prev) => { const next = new Set(prev); if (next.has(n)) next.delete(n); else next.add(n); return next; });
  const togglePage = () => setPicked((prev) => { const next = new Set(prev); rows.forEach((r) => (allOnPage ? next.delete(r.number) : next.add(r.number))); return next; });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "auto") {
      if (!(Number.isInteger(qty) && qty >= 1 && qty <= 5000)) { setError("Enter a quantity between 1 and 5,000"); return; }
      if (available != null && qty > available) { setError(`You only have ${fmtNumber(available)} ${unit(available)} available${network ? ` on ${network}` : ""}`); return; }
    } else if (!picked.size) { setError(`Select at least one ${isDevice ? "device" : "SIM"} to send`); return; }
    setError(null);
    approve.mutate({
      id: request.id,
      ...(mode === "pick" ? { sim_numbers: [...picked] } : { quantity: qty, ...(network ? { network } : {}) }),
      ...(note.trim() ? { note: note.trim() } : {}),
    }, {
      onSuccess: (result) => {
        const sent = result?.distributed?.total ?? result?.request?.approved_quantity ?? (mode === "pick" ? picked.size : qty);
        openNotification({ state: "success", title: "Request approved", description: `${fmtNumber(sent)} ${unit(sent)} sent to ${request.requester?.name ?? "the requester"}.` });
        approve.reset();
        onClose();
      },
      // Sending failed (e.g. not enough stock): the request stays pending, so show why and let them adjust.
      onError: (err) => setError(err.message),
    });
  };

  return <form onSubmit={submit} className="space-y-4 pt-1">
    <Summary request={request} />

    <div className={`flex items-center justify-between gap-3 rounded-xl border p-3 text-xs ${short ? "border-[#FCEEC1] bg-[#FFFBEB]" : "border-[#E2ECF6] bg-white"}`}>
      <span className="flex items-center gap-2 font-semibold text-[#66738C]">
        {short ? <AlertTriangle className="size-4 shrink-0 text-[#D9990D]" /> : <Package className="size-4 shrink-0 text-[#2563EB]" />}
        {stock.isLoading ? "Checking your stock…" : stock.error ? `Couldn't check your stock: ${stock.error.message}`
          : <span>You have <b className="text-[#0F152A]">{fmtNumber(available)}</b> {typeName}{available === 1 ? "" : "s"} available{network ? ` on ${network}` : ""}{short ? ". Send what you have, or decline." : ""}</span>}
      </span>
      {stock.isFetching && !stock.isLoading && <RefreshCw className="size-3.5 shrink-0 animate-spin text-[#2563EB]" />}
    </div>

    <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-[#F8FAFC] p-1">
      {([["auto", "Send oldest stock"], ["pick", isDevice ? "Choose devices" : "Choose SIMs"]] as const).map(([value, label]) =>
        <button key={value} type="button" onClick={() => { setMode(value); setError(null); }}
          className={`rounded-lg py-2 text-[11px] font-bold transition ${mode === value ? "bg-white text-[#0F152A] shadow-xs" : "text-[#66738C]"}`}>{label}</button>)}
    </div>

    <div className={`grid gap-4 ${mode === "auto" && !isDevice ? "sm:grid-cols-2" : ""}`}>
      {mode === "auto" && <Field label="Quantity to send" hint={`They asked for ${fmtNumber(request.quantity)}${available != null ? ` · you have ${fmtNumber(available)}` : ""}`}>
        <input className={inputClass} inputMode="numeric" value={quantity} onChange={(e) => setQuantity(e.target.value.replace(/\D/g, "").slice(0, 4))} />
      </Field>}
      {!isDevice && <Field label="Network">
        <select className={inputClass} value={network} onChange={(e) => { setNetwork(e.target.value); setPage(1); }}>
          <option value="">Any network</option>
          {NETWORKS.map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </Field>}
    </div>

    {mode === "pick" && <div className="space-y-2">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#8C909B]" />
        <input className={`${inputClass} pl-9`} placeholder={isDevice ? "Search serial number" : "Search SIM number"} value={searchText} onChange={(e) => { setSearchText(e.target.value); setPage(1); }} />
      </div>
      <div className="overflow-hidden rounded-xl border border-[#E2ECF6]">
        <div className="flex items-center justify-between gap-2 border-b border-[#E2ECF6] bg-[#F8FAFC] px-3 py-2.5 text-[11px] font-bold">
          <label className="flex cursor-pointer items-center gap-2.5 text-[#66738C]">
            <input type="checkbox" className="size-4 accent-[#2563EB]" checked={allOnPage} disabled={!rows.length} onChange={togglePage} /> Select page
          </label>
          <span className={picked.size >= request.quantity ? "text-[#10B981]" : "text-[#0F152A]"}>{fmtNumber(picked.size)} of {fmtNumber(request.quantity)} selected</span>
        </div>
        {list.isLoading ? <div className="space-y-1.5 p-2">{[0, 1, 2, 3].map((i) => <div key={i} className="h-9 animate-pulse rounded-lg bg-slate-100" />)}</div>
          : list.error ? <div className="p-3"><ErrorNote message={list.error.message} /></div>
          : !rows.length ? <p className="py-6 text-center text-xs text-[#8C909B]">{search ? "No match in your stock." : `No ${typeName}s in your stock${network ? ` on ${network}` : ""}.`}</p>
          : <ul className={`max-h-56 divide-y divide-[#E2ECF6] overflow-y-auto ${list.isFetching ? "opacity-60" : ""}`}>
              {rows.map((r) => <li key={r.id}>
                <label className="flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-slate-50">
                  <input type="checkbox" className="size-4 shrink-0 accent-[#2563EB]" checked={picked.has(r.number)} onChange={() => toggle(r.number)} />
                  <span className="min-w-0 flex-1 truncate font-mono text-xs font-bold text-[#0F152A]">{r.number}</span>
                  {r.network && <span className="shrink-0 text-[10px] font-semibold text-[#8C909B]">{r.network}</span>}
                </label>
              </li>)}
            </ul>}
      </div>
      {list.data && <Pager page={page} totalPages={list.data.totalPages} onChange={setPage} />}
      {picked.size > 0 && <button type="button" onClick={() => setPicked(new Set())} className="text-[11px] font-bold text-[#66738C] hover:underline">Clear selection</button>}
    </div>}

    <Field label="Message (optional)">
      <input className={inputClass} maxLength={300} placeholder="e.g. Sent, check your stock" value={note} onChange={(e) => setNote(e.target.value)} />
    </Field>
    <ErrorNote message={error} />

    <div className={footerClass}>
      <button type="button" onClick={onClose} disabled={approve.isPending} className={secondaryBtn}>Cancel</button>
      <PrimaryButton type="submit" loading={approve.isPending} disabled={available === 0 || (mode === "pick" && !picked.size)}>
        {approve.isPending ? "Sending…" : mode === "pick" && picked.size ? `Approve & send ${fmtNumber(picked.size)}` : "Approve & send"}
      </PrimaryButton>
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
