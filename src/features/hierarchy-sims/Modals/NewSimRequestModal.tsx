import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { openNotification } from "@/utils/notifications";
import { useCreateSimRequest, useSimSuppliers } from "../api";
import { useHierarchyConfig } from "../roles";
import type { SimRequest, SimRequestUrgency, SimType } from "../types";
import { NETWORKS, SIM_TYPES, URGENCIES, simTypeLabel, unitLabel } from "../utils";
import { ErrorNote, Field, PrimaryButton, footerClass, inputClass, secondaryBtn } from "../components/ui";

/** Ask your supplier (SC, RM or admin) for SIMs. */
export function NewSimRequestModal({ open, onClose, onSent }: { open: boolean; onClose: () => void; onSent?: () => void }) {
  return <AppModal open={open} onOpenChange={(v) => { if (!v) onClose(); }} title="Request SIMs" description="Ask your supplier for more stock" size="md">
    {/* Mounted only while open so each request starts from a clean form. */}
    {open && <NewSimRequestForm onClose={onClose} onSent={onSent} />}
  </AppModal>;
}

function NewSimRequestForm({ onClose, onSent }: { onClose: () => void; onSent?: () => void }) {
  const config = useHierarchyConfig();
  const suppliers = useSimSuppliers();
  const create = useCreateSimRequest();
  const list = suppliers.data?.suppliers ?? [];
  const types = suppliers.data?.sim_types?.length ? suppliers.data.sim_types : SIM_TYPES;
  const isAdminSupplier = config?.role === "REGIONAL_MANAGER";

  const [supplierId, setSupplierId] = useState<number | undefined>();
  const [simType, setSimType] = useState<SimType>("pos");
  const [quantity, setQuantity] = useState("");
  const [network, setNetwork] = useState("");
  const [urgency, setUrgency] = useState<SimRequestUrgency>("normal");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<SimRequest | null>(null);

  // One supplier is picked for you; with several the user chooses.
  const chosenSupplier = list.length === 1 ? list[0].user_id ?? undefined : supplierId;
  const qty = Number(quantity);
  const qtyValid = Number.isInteger(qty) && qty >= 1 && qty <= 5000;
  const needsSupplier = !isAdminSupplier && list.length > 1 && !chosenSupplier;
  const noSuppliers = !suppliers.isLoading && !suppliers.error && list.length === 0;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qtyValid) { setError("Enter a quantity between 1 and 5,000"); return; }
    if (needsSupplier) { setError(`Choose a ${config?.supplierLabel ?? "supplier"}`); return; }
    setError(null);
    create.mutate({
      sim_type: simType, quantity: qty, urgency,
      ...(!isAdminSupplier && chosenSupplier ? { supplier_id: chosenSupplier } : {}),
      ...(network ? { network } : {}),
      ...(note.trim() ? { note: note.trim() } : {}),
    }, {
      onSuccess: (request) => { setDone(request); onSent?.(); openNotification({ state: "success", title: "SIM request sent" }); },
      onError: (err) => setError(err.message),
    });
  };

  if (done) return <div className="space-y-4 py-2 text-center">
    <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#EBFFF8]"><CheckCircle2 className="size-8 text-[#10B981]" /></span>
    <div>
      <h3 className="text-base font-extrabold text-[#0F152A]">Request sent</h3>
      <p className="mt-1 text-xs text-[#66738C]">{done.supplier?.name || config?.supplierLabel} has been notified. You'll get a notification when they respond.</p>
    </div>
    <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] p-3 text-left text-xs">
      <div className="flex justify-between py-1.5 first:pt-0"><span className="text-[#66738C]">Reference</span><span className="font-mono font-bold text-[#2563EB]">{done.reference}</span></div>
      <div className="flex justify-between py-1.5 last:pb-0"><span className="text-[#66738C]">Requested</span><span className="font-bold text-[#0F152A]">{done.quantity} × {done.sim_type_label || simTypeLabel(done.sim_type)}</span></div>
    </div>
    <PrimaryButton type="button" onClick={onClose} className="w-full">Done</PrimaryButton>
  </div>;

  return <form onSubmit={submit} className="space-y-4 pt-1">
    {suppliers.isLoading ? <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
      : suppliers.error ? <ErrorNote message={suppliers.error.message} />
      : noSuppliers ? <p className="rounded-xl border border-[#FCEEC1] bg-[#FFFBEB] p-3 text-[11px] font-bold text-[#D9990D]">
          No {config?.supplierLabel ?? "supplier"} has added you yet, so there's nobody to request SIMs from. Ask your {config?.supplierLabel ?? "supplier"} to add you to their network.
        </p>
      : list.length === 1 || isAdminSupplier ? <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">Requesting from</span>
          <p className="mt-0.5 font-extrabold capitalize text-[#0F152A]">{list[0]?.name?.toLowerCase() || config?.supplierLabel}</p>
          <p className="text-[#66738C]">{config?.supplierLabel}{list[0]?.state ? ` · ${list[0].state}` : ""}</p>
        </div>
      : <Field label={config?.supplierLabel ?? "Supplier"}>
          <select className={inputClass} value={supplierId ?? ""} onChange={(e) => setSupplierId(e.target.value ? Number(e.target.value) : undefined)}>
            <option value="">Select {config?.supplierLabel}</option>
            {list.map((s) => <option key={s.user_id ?? s.name} value={s.user_id ?? ""}>{s.name}{s.state ? ` · ${s.state}` : ""}</option>)}
          </select>
        </Field>}

    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="SIM type">
        <select className={inputClass} value={simType} onChange={(e) => setSimType(e.target.value as SimType)}>
          {types.map((t) => <option key={t} value={t}>{simTypeLabel(t)}</option>)}
        </select>
      </Field>
      <Field label="Quantity" hint="Between 1 and 5,000">
        <input className={inputClass} inputMode="numeric" placeholder={`Number of ${unitLabel(simType, 2)}`} value={quantity} onChange={(e) => setQuantity(e.target.value.replace(/\D/g, "").slice(0, 4))} />
      </Field>
    </div>

    {simType !== "cctv_device" && <Field label="Network (optional)">
      <select className={inputClass} value={network} onChange={(e) => setNetwork(e.target.value)}>
        <option value="">Any network</option>
        {NETWORKS.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
    </Field>}

    <div className="space-y-1.5">
      <span className="block text-xs font-bold text-[#0F152A]">Urgency</span>
      <div className="grid grid-cols-4 gap-1.5">
        {URGENCIES.map((u) => <button key={u.value} type="button" onClick={() => setUrgency(u.value)}
          className={`rounded-xl py-2 text-[11px] font-bold transition ${urgency === u.value ? "bg-[#2563EB] text-white" : "bg-[#F8FAFC] text-[#66738C] ring-1 ring-[#E2ECF6] hover:text-[#0F152A]"}`}>{u.label}</button>)}
      </div>
    </div>

    <Field label="Note (optional)">
      <textarea className={`${inputClass} min-h-20 resize-none`} maxLength={500} placeholder="e.g. Running low ahead of the weekend" value={note} onChange={(e) => setNote(e.target.value)} />
    </Field>

    <p className="text-[11px] text-[#8C909B]">You can have one pending request per SIM type with each supplier.</p>
    <ErrorNote message={error} />

    <div className={footerClass}>
      <button type="button" onClick={onClose} disabled={create.isPending} className={secondaryBtn}>Cancel</button>
      <PrimaryButton type="submit" loading={create.isPending} disabled={noSuppliers || suppliers.isLoading || !quantity}>
        {!create.isPending && <Send className="size-3.5" />} Send request
      </PrimaryButton>
    </div>
  </form>;
}
