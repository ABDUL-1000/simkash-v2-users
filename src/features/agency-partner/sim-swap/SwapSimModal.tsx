import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { SimNumberSelect } from "@/components/common/SimNumberSelect";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useSubmitSwap, useSwapCustomerSims, useSwapQuote, useSwapReplacementSims, type CustomerSim, type SwapPayer, type SwapQuote, type SwapReason, type SwapRequest } from "./api";

const REASONS: { key: SwapReason; label: string; hint: string }[] = [
  { key: "NETWORK_CHANGE", label: "Network change", hint: "Free · new SIM must be on a different network" },
  { key: "LOST", label: "Lost SIM", hint: "Fee applies" },
  { key: "DAMAGED", label: "Damaged SIM", hint: "Fee applies" },
];
const naira = (n: number | null | undefined) => `₦${Number(n ?? 0).toLocaleString("en-NG")}`;
const label = "text-[11px] font-bold uppercase tracking-wider text-[#8C909B]";

/** Partner "Swap SIM" flow: customer → SIM → reason → replacement → quote → payment/PIN → submit (PENDING until admin approves). */
export function SwapSimModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AppModal open={open} onOpenChange={(v) => !v && onClose()} title="Swap SIM" description="Replace a customer's SIM with one from your stock" size="md" footer={null}>
    {open && <SwapFlow onClose={onClose} />}
  </AppModal>;
}

function SwapFlow({ onClose }: { onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [oldSim, setOldSim] = useState<CustomerSim | null>(null);
  const [reason, setReason] = useState<SwapReason | null>(null);
  const [newSim, setNewSim] = useState("");
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [payer, setPayer] = useState<SwapPayer | null>(null);
  const [pin, setPin] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState<SwapRequest | null>(null);
  const [error, setError] = useState<string | null>(null);

  const customer = useSwapCustomerSims(phone);
  const replacements = useSwapReplacementSims({ sim_type: oldSim?.sim_type });
  const quoteMutation = useSwapQuote();
  const submit = useSubmitSwap();

  // NETWORK_CHANGE needs a different network, so hide same-network SIMs.
  const options = (replacements.data?.items ?? []).filter((sim) => reason !== "NETWORK_CHANGE" || sim.network.toUpperCase() !== oldSim?.network.toUpperCase());
  const resetFrom = (step: "sim" | "reason" | "new") => {
    if (step === "sim") setOldSim(null);
    if (step === "sim" || step === "reason") setReason(null);
    setNewSim(""); setQuote(null); setPayer(null); setPin(""); setError(null); quoteMutation.reset();
  };
  const getQuote = () => {
    if (!oldSim || !reason || !newSim) return;
    setError(null);
    quoteMutation.mutate({ old_sim_number: oldSim.sim_number, new_sim_number: newSim, reason }, {
      onSuccess: (q) => { setQuote(q); setPayer(q.is_free ? null : q.agent_can_pay ? "AGENT" : q.customer_can_pay ? "CUSTOMER" : null); },
      onError: (e) => setError(e.message),
    });
  };
  const canSubmit = quote && (quote.is_free || (payer && pin.length === 4)) && !submit.isPending;
  const send = () => {
    if (!quote || !oldSim || !reason) return;
    setError(null);
    submit.mutate({ old_sim_number: oldSim.sim_number, new_sim_number: newSim, reason, ...(quote.is_free ? {} : { payer: payer!, pin }), ...(note.trim() ? { note: note.trim() } : {}) }, {
      onSuccess: setDone, onError: (e) => { setError(e.message); setPin(""); },
    });
  };

  if (done) return <div className="space-y-3 py-2 text-center text-xs">
    <CheckCircle2 className="mx-auto size-12 text-[#10B981]" />
    <p className="text-base font-bold text-[#0F152A]">Swap request {done.reference} submitted</p>
    <p className="text-[#66738C]">Awaiting admin approval. {done.old_sim.sim_number} ({done.old_sim.network}) → {done.new_sim.sim_number} ({done.new_sim.network}){done.fee ? ` · ${done.fee_formatted} paid` : " · Free"}</p>
    <button type="button" onClick={onClose} className="w-full rounded-xl bg-[#0F152A] py-2.5 font-bold text-white">Done</button>
  </div>;

  return <div className="space-y-4 text-xs">
    {/* 1. Customer */}
    <div className="space-y-1.5">
      <p className={label}>1. Customer phone</p>
      <input inputMode="numeric" maxLength={11} value={phone} onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "")); resetFrom("sim"); }} placeholder="e.g. 08031234567" className="w-full rounded-xl border border-[#E2ECF6] px-3 py-2.5 text-sm outline-none focus:border-[#2563EB]" />
      {customer.isFetching && <p className="text-[#8C909B]">Looking up customer…</p>}
      {customer.isError && <p className="font-semibold text-[#EF4444]">{customer.error.message}</p>}
    </div>

    {/* 2. SIM to replace */}
    {customer.data && <div className="space-y-1.5">
      <p className={label}>2. SIM to replace · {customer.data.customer.name}</p>
      {customer.data.sims.length === 0 ? <p className="text-[#8C909B]">This customer has no active SIMs you activated.</p> :
        <div className="space-y-1.5">{customer.data.sims.map((sim) => {
          const active = oldSim?.sim_number === sim.sim_number;
          return <button key={sim.sim_number} type="button" disabled={!sim.can_swap} onClick={() => { resetFrom("sim"); setOldSim(sim); }}
            className={`flex w-full items-center justify-between rounded-xl border p-3 text-left disabled:cursor-not-allowed disabled:opacity-60 ${active ? "border-[#2563EB] bg-[#EFF4F8]" : "border-[#E2ECF6]"}`}>
            <span><b className="font-mono text-[#0F152A]">{sim.sim_number}</b><span className="block text-[#66738C]">{sim.network} · {sim.sim_type_label}{sim.expires_at ? ` · expires ${new Date(sim.expires_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}` : ""}</span></span>
            {!sim.can_swap && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-[#D9990D]">Swap pending{sim.pending_swap_reference ? ` (${sim.pending_swap_reference})` : ""}</span>}
          </button>;
        })}</div>}
    </div>}

    {/* 3. Reason */}
    {oldSim && <div className="space-y-1.5">
      <p className={label}>3. Reason</p>
      <div className="grid gap-2 sm:grid-cols-3">{REASONS.map((r) => <button key={r.key} type="button" onClick={() => { resetFrom("reason"); setReason(r.key); }}
        className={`rounded-xl border p-2.5 text-left ${reason === r.key ? "border-[#2563EB] bg-[#EFF4F8]" : "border-[#E2ECF6]"}`}><b className="block text-[#0F152A]">{r.label}</b><span className="text-[10px] text-[#8C909B]">{r.hint}</span></button>)}</div>
    </div>}

    {/* 4. Replacement */}
    {oldSim && reason && <div className="space-y-1.5">
      <p className={label}>4. Replacement {oldSim.sim_type_label} from your stock</p>
      <SimNumberSelect value={newSim} onChange={(v) => { setNewSim(v); setQuote(null); setPayer(null); setPin(""); setError(null); }} sims={options} loading={replacements.isLoading}
        emptyText={reason === "NETWORK_CHANGE" ? `No ${oldSim.sim_type_label} on another network in your stock` : `No ${oldSim.sim_type_label} in your stock`} />
      {!quote && <button type="button" disabled={!newSim || quoteMutation.isPending} onClick={getQuote} className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#2563EB] py-2.5 font-bold text-white disabled:opacity-50">{quoteMutation.isPending ? "Checking…" : <>Review swap <ArrowRight className="size-3.5" /></>}</button>}
    </div>}

    {/* 5. Review & payment */}
    {quote && <div className="space-y-3 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono font-bold text-[#0F152A]">{quote.old_sim.sim_number} <span className="font-sans text-[#8C909B]">({quote.old_sim.network})</span></span>
        <ArrowRight className="size-4 text-[#8C909B]" />
        <span className="font-mono font-bold text-[#0F152A]">{quote.new_sim.sim_number} <span className="font-sans text-[#8C909B]">({quote.new_sim.network})</span></span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${quote.swap_type === "CROSS_NETWORK" ? "bg-purple-50 text-[#7C3AED]" : "bg-blue-50 text-[#2563EB]"}`}>{quote.swap_type === "CROSS_NETWORK" ? "Cross-Net" : "Same-Net"}</span>
        <span className="text-[#66738C]">{quote.reason_label} · {quote.customer.name}</span>
        <span className="ml-auto text-sm font-black text-[#0F152A]">{quote.is_free ? "Free" : quote.fee_formatted}</span>
      </div>
      {!quote.is_free && <div className="space-y-2">
        <p className={label}>Who pays?</p>
        <div className="grid grid-cols-2 gap-2">
          {([["AGENT", "My wallet", quote.agent_wallet_balance, quote.agent_can_pay], ["CUSTOMER", "Customer wallet", quote.customer.wallet_balance, quote.customer_can_pay]] as const)
            .filter(([key]) => quote.payer_options.includes(key)).map(([key, text, balance, ok]) =>
              <button key={key} type="button" disabled={!ok} onClick={() => { setPayer(key); setPin(""); }}
                className={`rounded-xl border p-2.5 text-left disabled:cursor-not-allowed disabled:opacity-50 ${payer === key ? "border-[#2563EB] bg-white ring-1 ring-[#2563EB]" : "border-[#E2ECF6] bg-white"}`}>
                <b className="block text-[#0F152A]">{text}</b><span className="text-[10px] text-[#8C909B]">{naira(balance)}{!ok ? (key === "CUSTOMER" ? " · can't pay" : " · too low") : ""}</span>
              </button>)}
        </div>
        {payer && <div className="space-y-1.5 text-center">
          <p className={label}>{payer === "CUSTOMER" ? "Customer enters their transaction PIN" : "Enter your transaction PIN"}</p>
          <div className="flex justify-center"><InputOTP maxLength={4} value={pin} onChange={setPin} inputMode="numeric"><InputOTPGroup className="gap-2">{[0, 1, 2, 3].map((i) => <InputOTPSlot key={i} index={i} className="size-11 bg-white" />)}</InputOTPGroup></InputOTP></div>
        </div>}
      </div>}
      <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note for admin (optional)" className="w-full rounded-xl border border-[#E2ECF6] bg-white p-2.5 outline-none focus:border-[#2563EB]" />
    </div>}

    {error && <p className="rounded-xl bg-[#FFF7F8] p-2.5 font-semibold text-[#EF4444]">{error}</p>}

    <div className="flex justify-end gap-2 border-t border-[#E2ECF6] pt-3">
      <button type="button" onClick={onClose} className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 font-bold">Cancel</button>
      {quote && <button type="button" disabled={!canSubmit} onClick={send} className="rounded-xl bg-[#10B981] px-5 py-2.5 font-bold text-white disabled:opacity-50">{submit.isPending ? "Submitting…" : "Submit swap request"}</button>}
    </div>
  </div>;
}
