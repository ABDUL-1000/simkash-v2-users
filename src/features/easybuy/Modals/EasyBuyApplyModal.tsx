import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarClock, CheckCircle2, Clock, MapPin, Minus, Plus } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { appPaths } from "@/app/router/paths";
import { useGetAddresses } from "@/features/marketplace/api";
import { AddressBookModal } from "@/features/marketplace/Modals/AddressBookModal";
import type { Address, ProductDetail } from "@/features/marketplace/types/api";
import { useApplyEasyBuy } from "../api/easybuy";
import type { EasyBuyAgreement, EasyBuyPlan } from "../types/api";
import { humanise, naira } from "../utils";

const MAX_QTY = 10;

/** Apply for an EasyBuy plan. Nothing is charged; an admin reviews the application first. */
export function EasyBuyApplyModal({ product, open, onClose, initialQuantity = 1, initialPlanId }: {
  product: ProductDetail; open: boolean; onClose: () => void; initialQuantity?: number; initialPlanId?: number;
}) {
  const navigate = useNavigate();
  const option = product.paymentOptions.easyBuy;
  const plans = useMemo(() => option.plans ?? [], [option.plans]);
  const segments = option.segments?.length ? option.segments : ["personal"];
  const maxQty = Math.max(1, Math.min(MAX_QTY, product.stock || MAX_QTY, product.maxPurchaseQuantity || MAX_QTY));
  const deliveryOptions = product.delivery?.options ?? [];

  const [planId, setPlanId] = useState<number | undefined>(initialPlanId ?? plans[0]?.id);
  const [quantity, setQuantity] = useState(Math.min(initialQuantity, maxQty));
  const [segment, setSegment] = useState(segments[0]);
  const [deliveryMethod, setDeliveryMethod] = useState<"standard" | "express">("standard");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [addressOpen, setAddressOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<EasyBuyAgreement | null>(null);
  const book = useGetAddresses();
  const apply = useApplyEasyBuy();

  const plan: EasyBuyPlan | undefined = plans.find((p) => p.id === planId) ?? plans[0];
  const chosenAddress = address ?? book.addresses.find((a) => a.isDefault) ?? book.addresses[0] ?? null;
  const deliveryFee = deliveryOptions.find((d) => d.method === deliveryMethod)?.fee ?? 0;

  const close = () => { if (apply.isPending) return; setSubmitted(null); setError(null); onClose(); };
  const submit = () => {
    if (!plan) return;
    setError(null);
    apply.mutate({
      productId: product.id, planId: plan.id, quantity, segment, deliveryMethod,
      ...(chosenAddress ? { addressId: chosenAddress.id } : {}),
      ...(note.trim() ? { note: note.trim() } : {}),
    }, { onSuccess: setSubmitted, onError: (err) => setError(err.message) });
  };

  if (submitted) {
    return <AppModal open={open} onOpenChange={(v) => { if (!v) close(); }} size="sm">
      <div className="space-y-4 py-2 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#EBFFF8]"><CheckCircle2 className="size-8 text-[#10B981]" /></div>
        <div>
          <h3 className="text-lg font-extrabold text-[#0F152A]">Application submitted</h3>
          <p className="mt-1 text-xs text-[#66738C]">We'll notify you once it's reviewed. Nothing has been charged yet. After approval you'll have 72 hours to pay the down payment.</p>
        </div>
        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-left text-xs">
          <div className="flex justify-between gap-3 py-1.5 first:pt-0"><span className="text-[#66738C]">Reference</span><span className="font-mono font-bold text-[#2563EB]">{submitted.reference}</span></div>
          <div className="flex justify-between gap-3 py-1.5"><span className="text-[#66738C]">Plan</span><span className="text-right font-bold text-[#0F152A]">{submitted.plan?.name || plan?.name}</span></div>
          <div className="flex justify-between gap-3 py-1.5 last:pb-0"><span className="text-[#66738C]">Total</span><span className="font-bold text-[#0F152A]">{naira(submitted.amounts?.total)}</span></div>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <button type="button" onClick={close} className="flex-1 rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">Keep shopping</button>
          <button type="button" onClick={() => { close(); navigate(submitted.id ? appPaths.easyBuyDetails(String(submitted.id)).path : appPaths.easyBuy); }} className="flex-1 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700">View application</button>
        </div>
      </div>
    </AppModal>;
  }

  return <>
    <AppModal open={open && !addressOpen} onOpenChange={(v) => { if (!v) close(); }} title="Apply for EasyBuy" description={product.name} size="md">
      <div className="space-y-5 pt-1">
        {plans.length === 0 ? <p className="rounded-xl bg-[#F8FAFC] p-4 text-xs text-[#66738C]">No EasyBuy plans are available for this product right now.</p> : <>
          {/* Plans */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Choose a plan</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {plans.map((p) => <button key={p.id} type="button" onClick={() => setPlanId(p.id)} className={`rounded-2xl border p-3.5 text-left text-xs transition ${plan?.id === p.id ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]" : "border-[#E2ECF6] bg-[#F8FAFC] hover:border-[#C7DAFC]"}`}>
                <div className="flex items-center justify-between gap-2"><span className="font-extrabold text-[#0F152A]">{p.name}</span><span className="rounded-md bg-white px-1.5 py-0.5 text-[9px] font-bold text-[#2563EB]">{p.frequencyLabel}</span></div>
                <p className="mt-1.5 text-[11px] text-[#66738C]">{naira(p.downPaymentAmount * quantity)} today, then {p.installmentCount} × {naira(p.installmentAmount * quantity)}</p>
                <p className="mt-0.5 text-[10px] text-[#8C909B]">Total {naira(p.totalPrice * quantity)}{p.extraCost > 0 ? ` · +${naira(p.extraCost * quantity)} vs. paying now` : ""}</p>
              </button>)}
            </div>
          </div>

          {/* Quantity & segment */}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Quantity</p>
              <div className="flex w-fit items-center rounded-xl border border-[#E2ECF6] bg-white">
                <button type="button" aria-label="Decrease" disabled={quantity <= 1} onClick={() => setQuantity((q) => q - 1)} className="p-2.5 disabled:opacity-40"><Minus className="size-3.5" /></button>
                <span className="w-9 text-center text-sm font-bold">{quantity}</span>
                <button type="button" aria-label="Increase" disabled={quantity >= maxQty} onClick={() => setQuantity((q) => q + 1)} className="p-2.5 disabled:opacity-40"><Plus className="size-3.5" /></button>
              </div>
            </div>
            {segments.length > 1 && <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Buying as</p>
              <div className="flex gap-2">{segments.map((s) => <button key={s} type="button" onClick={() => setSegment(s)} className={`flex-1 rounded-xl px-3 py-2.5 text-xs font-bold ${segment === s ? "bg-[#0F152A] text-white" : "border border-[#E2ECF6] bg-white text-[#66738C]"}`}>{humanise(s)}</button>)}</div>
            </div>}
          </div>

          {/* Delivery */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Delivery address</p>
              <button type="button" onClick={() => setAddressOpen(true)} className="text-xs font-bold text-[#2563EB] hover:underline">{chosenAddress ? "Change" : "Add address"}</button>
            </div>
            {chosenAddress ? <div className="flex items-start gap-2 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#2563EB]" />
              <div className="min-w-0"><p className="font-bold text-[#0F152A]">{chosenAddress.fullName}</p><p className="break-words text-[#66738C]">{chosenAddress.formatted}</p></div>
            </div> : <p className="rounded-2xl border border-dashed border-[#FCEEC1] bg-[#FFFBEB] p-3 text-xs font-semibold text-[#D9990D]">{book.isLoading ? "Loading addresses…" : "Add a delivery address to apply."}</p>}
            {deliveryOptions.length > 1 && <div className="grid gap-2 sm:grid-cols-2">{deliveryOptions.map((d) =>
              <button key={d.method} type="button" onClick={() => setDeliveryMethod(d.method)} className={`rounded-xl border p-2.5 text-left text-xs ${deliveryMethod === d.method ? "border-[#2563EB] bg-[#EFF4F8]" : "border-[#E2ECF6] bg-white"}`}>
                <span className="flex justify-between gap-2 font-bold text-[#0F152A]"><span>{d.label}</span><span className={d.fee ? "" : "text-[#10B981]"}>{d.fee ? naira(d.fee) : "Free"}</span></span>
                {d.description && <span className="block text-[10px] text-[#8C909B]">{d.description}</span>}
              </button>)}</div>}
          </div>

          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Note (optional)</p>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={500} rows={2} placeholder="e.g. For my shop" className="w-full resize-none rounded-xl border border-[#E2ECF6] px-3 py-2 text-xs outline-none focus:border-[#2563EB]" />
          </div>

          {/* Summary */}
          {plan && <div className="rounded-2xl border border-[#2563EB] bg-[#EFF4F8] p-4 text-xs">
            <p className="flex items-center gap-1.5 font-bold text-[#2563EB]"><CalendarClock className="size-4" /> Your plan</p>
            <div className="mt-2 divide-y divide-[#C7DAFC]">
              <div className="flex justify-between gap-3 py-1.5"><span className="text-[#66738C]">Down payment ({plan.downPaymentPercent}%)</span><span className="font-bold text-[#0F152A]">{naira(plan.downPaymentAmount * quantity)}</span></div>
              <div className="flex justify-between gap-3 py-1.5"><span className="text-[#66738C]">Delivery (paid with down payment)</span><span className="font-bold text-[#0F152A]">{deliveryFee ? naira(deliveryFee) : "Free"}</span></div>
              <div className="flex justify-between gap-3 py-1.5"><span className="text-[#66738C]">{plan.frequencyLabel} installments</span><span className="text-right font-bold text-[#0F152A]">{plan.installmentCount} × {naira(plan.installmentAmount * quantity)}</span></div>
              <div className="flex justify-between gap-3 pt-2 text-sm font-extrabold text-[#0F152A]"><span>Total</span><span>{naira(plan.totalPrice * quantity)}</span></div>
            </div>
            <p className="mt-2 text-[10px] text-[#66738C]">Estimate. Exact figures are confirmed on your application.</p>
          </div>}

          <ul className="space-y-1 text-[11px] text-[#66738C]">
            <li className="flex items-start gap-1.5"><Clock className="mt-0.5 size-3.5 shrink-0 text-[#2563EB]" /> Nothing is charged until an admin approves. You then have 72 hours to pay.</li>
            <li className="flex items-start gap-1.5"><CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-[#10B981]" /> Installments are auto-debited from your wallet at 08:00 on due days. No late fees.</li>
          </ul>
        </>}

        {error && <p className="rounded-xl border border-[#F7D2D7] bg-[#FFF7F8] p-2.5 text-[11px] font-semibold text-[#EF4444]">{error}</p>}

        <div className="flex flex-col-reverse gap-2 border-t border-[#E2ECF6] pt-4 sm:flex-row sm:justify-end">
          <button type="button" disabled={apply.isPending} onClick={close} className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">Cancel</button>
          <button type="button" disabled={!plan || !chosenAddress || apply.isPending} onClick={submit} className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50">
            {apply.isPending ? "Submitting…" : "Submit application"}
          </button>
        </div>
      </div>
    </AppModal>
    <AddressBookModal open={open && addressOpen} onClose={() => setAddressOpen(false)} selectedId={chosenAddress?.id} onSelect={(a) => { setAddress(a); setAddressOpen(false); }} />
  </>;
}
