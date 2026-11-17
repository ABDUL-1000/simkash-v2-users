import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, CalendarClock, CheckCircle2, Clock, Package, Receipt, Truck, XCircle } from "lucide-react";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { TransactionSuccessModal } from "@/components/common/TransactionSuccessModal";
import { appPaths } from "@/app/router/paths";
import { useGetEasyBuyDetail, useVerifyEasyBuyPayment } from "../api/easybuy";
import { EasyBuyProgress, EasyBuyStatusBadge } from "../components/EasyBuyStatusBadge";
import { EasyBuyPayModal } from "../Modals/EasyBuyPayModal";
import { EasyBuyCancelModal } from "../Modals/EasyBuyCancelModal";
import type { EasyBuyAgreement, EasyBuyPayMethod } from "../types/api";
import { INSTALLMENT_LABEL, INSTALLMENT_TONE, PAYMENT_KIND_LABEL, PAYMENT_METHOD_LABEL, fmtDateTime, fmtDueDate, humanise, naira, timeLeft } from "../utils";

const card = "rounded-2xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-6";
const VERIFY_TEXT: Record<string, { text: string; tone: "amber" | "red" | "green" }> = {
  pending: { text: "Waiting for your card payment to be confirmed…", tone: "amber" },
  failed: { text: "Card payment not completed. You can try again.", tone: "red" },
  amount_mismatch: { text: "The amount paid didn't match. Please contact support.", tone: "red" },
  late_refunded: { text: "Your payment arrived after this application closed, so it was refunded to your wallet.", tone: "amber" },
  paid: { text: "Card payment received.", tone: "green" },
  already_paid: { text: "Card payment received.", tone: "green" },
};
const TONE_BOX = { amber: "border-[#FCEEC1] bg-[#FFFBEB] text-[#D9990D]", red: "border-[#F7D2D7] bg-[#FFF7F8] text-[#EF4444]", green: "border-[#BFF0DD] bg-[#EBFFF8] text-[#10B981]" };

export default function EasyBuyDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [params, setParams] = useSearchParams();
  const { agreement, isLoading, error, refetch } = useGetEasyBuyDetail(id);
  const verify = useVerifyEasyBuyPayment();
  const [payOpen, setPayOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [paid, setPaid] = useState<{ amount: number; method: EasyBuyPayMethod; payoff: boolean; mode: "down_payment" | "installment" } | null>(null);
  const [payMode, setPayMode] = useState<"down_payment" | "installment">("installment");
  const [outcome, setOutcome] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const polls = useRef(0);

  useEffect(() => { const t = window.setInterval(() => setNow(Date.now()), 30_000); return () => window.clearInterval(t); }, []);

  // Back from OPay (?payment=card): verify, polling ~1 min while pending. The webhook usually confirms first anyway.
  const cardReturn = params.get("payment") === "card";
  useEffect(() => {
    if (!cardReturn || !id) return;
    let timer: number | undefined;
    // Drop the query param only once verification settles; removing it earlier would run this cleanup and stop polling.
    const done = () => { void refetch(); setParams((prev) => { prev.delete("payment"); return prev; }, { replace: true }); };
    const run = () => verify.mutate(id, {
      onSuccess: (result) => {
        const value = result?.outcome ?? "paid";
        setOutcome(value);
        if (value === "pending" && polls.current++ < 15) timer = window.setTimeout(run, 4000);
        else done();
      },
      onError: done,
    });
    run();
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardReturn, id]);


  if (isLoading) return <div className="mx-auto max-w-[1400px] animate-pulse space-y-4 p-4 sm:p-6"><div className="h-10 w-64 rounded bg-slate-100" /><div className="h-40 rounded-2xl bg-slate-100" /><div className="h-72 rounded-2xl bg-slate-100" /></div>;
  if (!agreement) return <div className="p-4 sm:p-6"><AppEmptyState title="EasyBuy not found" description={error?.message ?? "We couldn't load this EasyBuy."} actionText="Back to EasyBuy" onAction={() => navigate(appPaths.easyBuy)} /></div>;

  const { amounts, actions, status, repayment } = agreement;
  const schedule = agreement.schedule ?? [];
  const payments = agreement.payments ?? [];
  const canPay = actions.canPayDownPayment || actions.canPayInstallment;
  const openPay = () => { setPayMode(actions.canPayDownPayment ? "down_payment" : "installment"); setPayOpen(true); };
  // "?pay=1" comes from a list card's Pay button and opens the sheet straight away.
  const payFromUrl = params.get("pay") === "1" && canPay && !payOpen;
  const sheetMode = payFromUrl ? (actions.canPayDownPayment ? "down_payment" : "installment") : payMode;
  const closePay = () => { setPayOpen(false); if (params.has("pay")) setParams((prev) => { prev.delete("pay"); return prev; }, { replace: true }); };
  const repaying = ["active", "overdue", "defaulted", "completed"].includes(status);
  const verifyInfo = outcome ? VERIFY_TEXT[outcome] : undefined;

  return <div className="mx-auto w-full max-w-[1400px] min-w-0 space-y-5 p-4 sm:p-6">
    <button type="button" onClick={() => navigate(appPaths.easyBuy)} className="flex items-center gap-2 text-sm font-semibold text-[#66738C] transition hover:text-[#2563EB]"><ArrowLeft className="size-4" /> My EasyBuy</button>

    {/* Header */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        {agreement.product.image ? <img src={agreement.product.image} alt="" className="size-14 shrink-0 rounded-xl bg-[#F8FAFC] object-cover sm:size-16" />
          : <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#F8FAFC] sm:size-16"><Package className="size-6 text-[#8C909B]" /></div>}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2"><h1 className="text-lg font-bold text-[#0F152A] sm:text-2xl">{agreement.product.name}</h1><EasyBuyStatusBadge status={status} label={agreement.statusLabel} /></div>
          <p className="mt-0.5 text-xs text-[#8C909B]"><span className="font-mono">{agreement.reference}</span> · {agreement.plan.name} · {agreement.plan.installmentCount} {humanise(String(agreement.plan.frequency)).toLowerCase()} installments</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:flex">
        {actions.canCancel && <button type="button" onClick={() => setCancelOpen(true)} className="rounded-xl border border-[#EF4444] px-4 py-2.5 text-xs font-bold text-[#EF4444] hover:bg-red-50">Cancel</button>}
        {canPay && <button type="button" onClick={openPay} className={`rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 ${actions.canCancel ? "" : "col-span-2"}`}>{actions.canPayDownPayment ? `Pay ${naira(amounts.dueNow)}` : "Make a payment"}</button>}
      </div>
    </div>

    {verifyInfo && <div className={`flex items-center gap-2 rounded-2xl border p-3 text-xs font-semibold ${TONE_BOX[verifyInfo.tone]}`}>
      {verifyInfo.tone === "green" ? <CheckCircle2 className="size-4 shrink-0" /> : verifyInfo.tone === "red" ? <XCircle className="size-4 shrink-0" /> : <Clock className="size-4 shrink-0" />}<span>{verifyInfo.text}</span>
    </div>}

    <StatusBanner agreement={agreement} now={now} onPay={openPay} onApplyAgain={() => navigate(appPaths.marketplaceDetails(String(agreement.product.id)).path)} />

    <div className="grid gap-5 lg:grid-cols-12">
      {/* Left: schedule & payments */}
      <div className="min-w-0 space-y-5 lg:col-span-8">
        <div className={card}>
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-[#0F152A]">Payment schedule</h3>
            {repayment && repayment.remainingInstallments > 0 && <span className="text-[11px] font-semibold text-[#8C909B]">{repayment.remainingInstallments} left</span>}
          </div>
          {schedule.length === 0 ? <p className="rounded-xl bg-[#F8FAFC] p-4 text-xs text-[#66738C]">Your schedule starts the day you pay the down payment. You'll pay {agreement.plan.installmentCount} installments of about {naira(amounts.installmentAmount)}.</p> : <>
            {/* Mobile: stacked */}
            <div className="divide-y divide-[#E2ECF6] sm:hidden">
              {schedule.map((row) => <div key={row.id} className="flex items-center justify-between gap-3 py-3 text-xs first:pt-0 last:pb-0">
                <div className="min-w-0"><p className="font-bold text-[#0F152A]">#{row.sequence} · {fmtDueDate(row.dueDate)}</p><p className="text-[11px] text-[#8C909B]">{row.amountPaid > 0 && row.status !== "paid" ? `${naira(row.amountPaid)} paid · ${naira(row.remaining)} left` : row.paidAt ? `Paid ${fmtDueDate(row.paidAt)}` : ""}</p></div>
                <div className="shrink-0 text-right"><p className="font-extrabold text-[#0F152A]">{naira(row.amount)}</p><span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold ${INSTALLMENT_TONE[row.status]}`}>{INSTALLMENT_LABEL[row.status] ?? humanise(row.status)}</span></div>
              </div>)}
            </div>
            {/* Tablet+: table */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full text-left text-xs">
                <thead><tr className="border-b border-[#E2ECF6] text-[10px] font-bold uppercase tracking-wider text-[#8C909B]"><th className="pb-2 pr-3">#</th><th className="pb-2 pr-3">Due date</th><th className="pb-2 pr-3 text-right">Amount</th><th className="pb-2 pr-3 text-right">Paid</th><th className="pb-2 pr-3 text-right">Remaining</th><th className="pb-2">Status</th></tr></thead>
                <tbody className="divide-y divide-[#E2ECF6]">
                  {schedule.map((row) => <tr key={row.id} className={row.status === "overdue" ? "bg-[#FFF7F8]" : ""}>
                    <td className="py-2.5 pr-3 font-bold text-[#66738C]">{row.sequence}</td>
                    <td className="py-2.5 pr-3 font-semibold text-[#0F152A]">{fmtDueDate(row.dueDate)}</td>
                    <td className="py-2.5 pr-3 text-right font-bold text-[#0F152A]">{naira(row.amount)}</td>
                    <td className="py-2.5 pr-3 text-right text-[#66738C]">{naira(row.amountPaid)}</td>
                    <td className="py-2.5 pr-3 text-right font-semibold text-[#0F152A]">{naira(row.remaining)}</td>
                    <td className="py-2.5"><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${INSTALLMENT_TONE[row.status]}`}>{INSTALLMENT_LABEL[row.status] ?? humanise(row.status)}</span></td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </>}
        </div>

        <div className={card}>
          <h3 className="mb-4 text-sm font-bold text-[#0F152A]">Payment history</h3>
          {payments.length === 0 ? <p className="text-xs text-[#8C909B]">No payments yet.</p> : <div className="divide-y divide-[#E2ECF6]">
            {payments.map((p, i) => <div key={p.id ?? `${p.kind}-${p.paidAt}-${i}`} className="flex items-center justify-between gap-3 py-3 text-xs first:pt-0 last:pb-0">
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#EBFFF8] text-[#10B981]"><Receipt className="size-4" /></span>
                <div className="min-w-0"><p className="font-bold text-[#0F152A]">{PAYMENT_KIND_LABEL[p.kind] ?? humanise(p.kind)}</p><p className="truncate text-[11px] text-[#8C909B]">{PAYMENT_METHOD_LABEL[p.method] ?? humanise(p.method)} · {fmtDateTime(p.paidAt)}</p></div>
              </div>
              <span className="shrink-0 font-extrabold text-[#10B981]">{naira(p.amount)}</span>
            </div>)}
          </div>}
        </div>
      </div>

      {/* Right: summary */}
      <div className="min-w-0 space-y-5 lg:col-span-4">
        <div className={card}>
          <h3 className="mb-3 text-sm font-bold text-[#0F152A]">Summary</h3>
          {repaying && <div className="mb-4 space-y-1.5">
            <div className="flex justify-between text-[11px]"><span className="font-bold text-[#0F152A]">{Math.round(amounts.progressPercent)}% paid</span><span className="text-[#8C909B]">{naira(amounts.outstanding)} left</span></div>
            <EasyBuyProgress percent={amounts.progressPercent} tone={status === "overdue" ? "red" : "green"} />
          </div>}
          <div className="divide-y divide-[#E2ECF6] text-xs">
            {([
              ["Total price", naira(amounts.total)],
              ...(agreement.quantity && agreement.quantity > 1 ? [["Quantity", String(agreement.quantity)]] : []),
              ["Down payment", naira(amounts.downPayment)],
              ["Delivery", amounts.deliveryFee ? naira(amounts.deliveryFee) : "Free"],
              ["Installment", `${naira(amounts.installmentAmount)} × ${agreement.plan.installmentCount}`],
              ["Frequency", humanise(String(agreement.plan.frequency))],
              ["Duration", agreement.plan.duration],
              ["Paid so far", naira(amounts.paid)],
              ["Outstanding", naira(amounts.outstanding)],
            ] as [string, string][]).map(([label, value]) => <div key={label} className="flex justify-between gap-3 py-2 first:pt-0 last:pb-0"><span className="text-[#8C909B]">{label}</span><span className="text-right font-bold text-[#0F152A]">{value}</span></div>)}
          </div>
        </div>

        {agreement.order && <div className={card}>
          <h3 className="mb-2 flex items-center gap-1.5 text-sm font-bold text-[#0F152A]"><Truck className="size-4 text-[#2563EB]" /> Delivery order</h3>
          <p className="text-xs text-[#66738C]"><span className="font-mono font-bold text-[#0F152A]">{agreement.order.orderNumber}</span> · {humanise(agreement.order.status)}</p>
          <button type="button" onClick={() => navigate(`/marketplace/orders/${agreement.order!.id}`)} className="mt-3 w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#2563EB] hover:bg-slate-50">Track order</button>
        </div>}

        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-[11px] leading-relaxed text-[#66738C]">
          <p className="mb-1 font-bold text-[#0F152A]">Good to know</p>
          <ul className="list-disc space-y-1 pl-4">
            <li>Installments are auto-debited from your wallet at 08:00 on each due date. Your wallet is never taken below ₦0.</li>
            <li>Payments go to your oldest unpaid installment first.</li>
            <li>There are no late fees, but late installments are marked overdue.</li>
          </ul>
          <button type="button" onClick={() => navigate(appPaths.support)} className="mt-2 font-bold text-[#2563EB] hover:underline">Need help?</button>
        </div>
      </div>
    </div>

    {/* Kept mounted: after a payoff `canPay` turns false, and unmounting would drop the success callback. */}
    <EasyBuyPayModal agreement={agreement} mode={sheetMode} open={payOpen || payFromUrl} onClose={closePay} onPaid={(summary) => setPaid({ ...summary, mode: sheetMode })} />
    <EasyBuyCancelModal id={agreement.id} reference={agreement.reference} open={cancelOpen} onClose={() => setCancelOpen(false)} />
    <TransactionSuccessModal open={Boolean(paid)} onOpenChange={() => setPaid(null)}
      title={paid?.payoff ? "EasyBuy fully paid!" : paid?.mode === "down_payment" ? "Down payment received" : "Payment received"}
      subtitle={paid?.mode === "down_payment" ? "Your order is on its way and your installment schedule has started." : "Thanks! Your balance has been updated."}
      details={paid ? [
        { label: "Amount", value: naira(paid.amount) },
        { label: "Paid with", value: PAYMENT_METHOD_LABEL[paid.method] ?? paid.method },
        { label: "Reference", value: agreement.reference },
      ] : []}
      walletBalanceText="SimKash EasyBuy" doneButtonText="Done" onDone={() => setPaid(null)} />
  </div>;
}

/** What to show for each status. Buttons still come from `actions`. */
function StatusBanner({ agreement, now, onPay, onApplyAgain }: { agreement: EasyBuyAgreement; now: number; onPay: () => void; onApplyAgain: () => void }) {
  const { status, amounts, repayment, actions } = agreement;
  const box = "flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between";

  if (status === "pending_approval") return <div className={`${box} border-[#FCEEC1] bg-[#FFFBEB]`}>
    <div className="flex items-start gap-3"><Clock className="mt-0.5 size-5 shrink-0 text-[#D9990D]" /><div><p className="text-sm font-bold text-[#0F152A]">Awaiting approval</p><p className="text-xs text-[#66738C]">We're reviewing your application. Nothing has been charged. We'll notify you once it's reviewed.</p></div></div>
  </div>;

  if (status === "approved") {
    const left = timeLeft(agreement.approvalExpiresAt, now);
    return <div className={`${box} border-[#C7DAFC] bg-[#EFF4F8]`}>
      <div className="flex items-start gap-3"><CalendarClock className="mt-0.5 size-5 shrink-0 text-[#2563EB]" /><div>
        <p className="text-sm font-bold text-[#0F152A]">Approved! Pay {naira(amounts.dueNow)} by {fmtDateTime(agreement.approvalExpiresAt)}</p>
        <p className="text-xs text-[#66738C]">Your item is reserved. {left ? <b className="text-[#2563EB]">{left}</b> : "The payment window is closing."} After that the approval expires and the stock is released.</p>
      </div></div>
      {actions.canPayDownPayment && <button type="button" onClick={onPay} className="shrink-0 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700">Pay down payment</button>}
    </div>;
  }

  if (status === "rejected" || status === "expired") return <div className={`${box} ${status === "rejected" ? "border-[#F7D2D7] bg-[#FFF7F8]" : "border-[#E2ECF6] bg-[#F8FAFC]"}`}>
    <div className="flex items-start gap-3"><XCircle className={`mt-0.5 size-5 shrink-0 ${status === "rejected" ? "text-[#EF4444]" : "text-[#8C909B]"}`} /><div>
      <p className="text-sm font-bold text-[#0F152A]">{status === "rejected" ? "Application not approved" : "Approval expired"}</p>
      <p className="text-xs text-[#66738C]">{status === "rejected" ? agreement.rejectionReason || "Your application wasn't approved this time." : "The down payment wasn't made within 72 hours, so the reserved stock was released."}</p>
    </div></div>
    <button type="button" onClick={onApplyAgain} className="shrink-0 rounded-xl border border-[#2563EB] bg-white px-5 py-2.5 text-xs font-bold text-[#2563EB] hover:bg-[#EFF4F8]">Apply again</button>
  </div>;

  if (status === "cancelled") return <div className={`${box} border-[#E2ECF6] bg-[#F8FAFC]`}>
    <div className="flex items-start gap-3"><XCircle className="mt-0.5 size-5 shrink-0 text-[#8C909B]" /><div><p className="text-sm font-bold text-[#0F152A]">Cancelled</p><p className="text-xs text-[#66738C]">This EasyBuy has been closed.</p></div></div>
  </div>;

  if (status === "completed") return <div className={`${box} border-[#BFF0DD] bg-[#EBFFF8]`}>
    <div className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#10B981]" /><div><p className="text-sm font-bold text-[#0F152A]">Fully paid 🎉</p><p className="text-xs text-[#66738C]">You've paid {naira(amounts.total)} in full. Thank you!</p></div></div>
  </div>;

  // active / overdue / defaulted
  const overdue = repayment?.overdueAmount ?? 0;
  const next = repayment?.nextInstallment;
  return <div className={`grid gap-3 rounded-2xl border p-4 sm:grid-cols-2 lg:grid-cols-4 ${overdue > 0 ? "border-[#F7D2D7] bg-[#FFF7F8]" : "border-[#E2ECF6] bg-white shadow-xs"}`}>
    {overdue > 0 ? <div className="sm:col-span-2 lg:col-span-1">
      <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#EF4444]"><AlertTriangle className="size-3.5" /> Overdue</p>
      <p className="text-lg font-extrabold text-[#EF4444]">{naira(overdue)}</p>
      <p className="text-[11px] text-[#66738C]">{repayment?.overdueCount} installment{repayment?.overdueCount === 1 ? "" : "s"} late</p>
    </div> : <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Due now</p>
      <p className="text-lg font-extrabold text-[#0F152A]">{naira(repayment?.dueNow ?? 0)}</p>
    </div>}
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Next installment</p>
      <p className="text-lg font-extrabold text-[#0F152A]">{next ? naira(next.remaining) : "—"}</p>
      <p className="text-[11px] text-[#66738C]">{next ? `#${next.sequence} · due ${fmtDueDate(next.dueDate)}` : `Next due ${fmtDueDate(agreement.nextDueDate)}`}</p>
    </div>
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Pay off today</p>
      <p className="text-lg font-extrabold text-[#0F152A]">{naira(repayment?.payoffAmount ?? amounts.outstanding)}</p>
      <p className="text-[11px] text-[#66738C]">{status === "defaulted" ? "Account flagged. Payments still work." : "No early-payment fees"}</p>
    </div>
    {actions.canPayInstallment && <div className="flex items-center sm:col-span-2 lg:col-span-1 lg:justify-end">
      <button type="button" onClick={onPay} className={`w-full rounded-xl px-5 py-3 text-xs font-bold text-white shadow-md lg:w-auto ${overdue > 0 ? "bg-[#EF4444] hover:bg-red-600" : "bg-[#2563EB] hover:bg-blue-700"}`}>Pay {naira(repayment?.suggestedAmount || 0)}</button>
    </div>}
  </div>;
}
