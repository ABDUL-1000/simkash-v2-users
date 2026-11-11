import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Circle, MapPin, Wrench } from "lucide-react";
import { Popconfirm } from "antd";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { appPaths } from "@/app/router/paths";
import { useCancelOrder, useConfirmDelivery, useGetOrderDetail, useRetryPayment, useVerifyPayment } from "../api";
import { naira } from "../utils";
import { ApproveInstallationModal, DisputeInstallationModal, RescheduleInstallationModal, ReturnItemModal, WriteReviewModal } from "../Modals/OrderActionModals";
import type { PaymentOutcome } from "../types/api";

const fmt = (iso: string | null) => iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : null;
const OUTCOME_TEXT: Partial<Record<PaymentOutcome, string>> = {
  pending: "Waiting for payment confirmation…",
  failed: "Payment not completed.",
  amount_mismatch: "The amount paid didn't match this order. Please contact support.",
  late_refunded: "Your payment arrived after the order expired; it was refunded to your wallet.",
};

export default function OrderDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [params, setParams] = useSearchParams();
  const { order, isLoading, error, refetch } = useGetOrderDetail(id);
  const cancel = useCancelOrder();
  const confirmDelivery = useConfirmDelivery();
  const retry = useRetryPayment();
  const verify = useVerifyPayment();
  const [modal, setModal] = useState<"return" | "reschedule" | "approve" | "dispute" | null>(params.get("return") === "1" ? "return" : null);
  const [reviewProduct, setReviewProduct] = useState<{ id: number; name: string } | null>(null);
  const [outcome, setOutcome] = useState<PaymentOutcome | null>(null);
  const polls = useRef(0);

  // Card payment return: verify while the order still awaits payment, polling ~1 min while pending.
  const awaitingCard = Boolean(order?.actions.canPay && /card|opay/i.test(order.priceSummary?.paymentLine ?? ""));
  useEffect(() => {
    if (!awaitingCard || !id) return;
    let timer: number | undefined;
    const run = () => verify.mutate(id, {
      onSuccess: (result) => {
        setOutcome(result.outcome);
        if (result.outcome === "pending" && polls.current++ < 15) timer = window.setTimeout(run, 4000);
      },
    });
    run();
    return () => window.clearTimeout(timer);
    // Only re-run when the order starts/stops awaiting payment.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awaitingCard, id]);

  if (isLoading) return <div className="space-y-4 animate-pulse"><div className="h-10 w-64 rounded bg-slate-100" /><div className="h-72 rounded-2xl bg-slate-100" /></div>;
  if (!order) return <AppEmptyState title="Order not found" description={error?.message ?? "We couldn't load this order."} actionText="Back to My Orders" onAction={() => navigate(appPaths.orders)} />;

  const actions = order.actions;
  const inst = order.installation;
  const verification = inst?.verification;
  const closeModal = () => { setModal(null); if (params.get("return")) setParams({}, { replace: true }); };

  return (
    <div className="space-y-6">
      {/* Top Back & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => navigate(appPaths.orders)} className="rounded-xl border border-[#E2ECF6] bg-white p-2 text-[#0F152A] hover:bg-slate-50"><ArrowLeft className="size-4" /></button>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-bold text-[#0F152A]">Order {order.header?.orderRef ?? order.orderNumber}</h1>
              <span className="rounded-full bg-[#EFF4F8] px-3 py-0.5 text-xs font-bold text-[#2563EB]">{order.statusLabel}</span>
            </div>
            <p className="mt-0.5 text-xs text-[#8C909B]">Placed {fmt(order.placedAt)}</p>
          </div>
        </div>
        <button type="button" onClick={() => navigate(appPaths.support)} className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-slate-50">Need Help?</button>
      </div>

      {outcome && OUTCOME_TEXT[outcome] && <div className={`flex flex-wrap items-center justify-between gap-2 rounded-2xl border p-3 text-xs font-semibold ${outcome === "pending" ? "border-[#FCEEC1] bg-[#FFFBEB] text-[#D9990D]" : "border-[#F7D2D7] bg-[#FFF7F8] text-[#EF4444]"}`}>
        <span>{OUTCOME_TEXT[outcome]}</span>
        {outcome === "failed" && actions.canPay && <button type="button" disabled={retry.isPending} onClick={() => retry.mutate(order.id)} className="rounded-lg bg-[#2563EB] px-3 py-1.5 font-bold text-white">Try again</button>}
      </div>}

      {/* Top Metric Summary Banner */}
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs sm:grid-cols-5">
        <div><span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">ORDER REF</span><span className="font-extrabold text-[#0F152A]">{order.orderNumber}</span></div>
        <div><span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">STATUS</span><span className="font-bold text-[#2563EB]">{order.statusLabel}</span></div>
        <div><span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">TOTAL</span><span className="font-extrabold text-[#0F152A]">{naira(order.priceSummary?.total ?? order.totalAmount)}</span></div>
        <div><span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">ITEMS</span><span className="font-bold text-[#0F152A]">{order.itemsCount} item{order.itemsCount === 1 ? "" : "s"}</span></div>
        <div><span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">{order.deliveredAt ? "DELIVERED" : "EST. DELIVERY"}</span><span className="font-bold text-[#10B981]">{order.deliveredAt ? fmt(order.deliveredAt) : order.estimatedDelivery?.label ?? "—"}</span></div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left — Items, price summary & address */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F152A]">Items Ordered</h3>
            <div className="divide-y divide-[#E2ECF6] text-xs">
              {order.itemsOrdered.map((item) => <div key={item.id} className="py-3 first:pt-0 space-y-1">
                <div className="flex justify-between gap-3 font-bold text-[#0F152A]"><span>{item.name} × {item.quantity}</span><span>{naira(item.lineTotal)}</span></div>
                {item.installationLabel && <span className="rounded bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#2563EB]">{item.installationLabel}</span>}
                {actions.canReview && <button type="button" onClick={() => setReviewProduct({ id: item.productId, name: item.name })} className="block text-[11px] font-bold text-[#2563EB] hover:underline">Write a review</button>}
              </div>)}
            </div>
            <div className="divide-y divide-[#E2ECF6] border-t border-[#E2ECF6] pt-3 text-xs">
              {order.priceSummary.lines.map((line) => <div key={line.label} className="flex justify-between py-1 text-[#8C909B]"><span>{line.label}</span><span className={`font-bold ${line.amount < 0 || line.display ? "text-[#10B981]" : "text-[#0F152A]"}`}>{line.display ?? (line.amount < 0 ? `-${naira(-line.amount)}` : naira(line.amount))}</span></div>)}
              <div className="flex justify-between py-2 pt-2 font-extrabold text-sm text-[#10B981]"><span>Total</span><span>{naira(order.priceSummary.total)}</span></div>
              <p className="pt-2 text-[11px] text-[#8C909B]">{order.priceSummary.paymentLine}</p>
              {order.refundNote && <p className="pt-1 text-[11px] font-semibold text-[#10B981]">{order.refundNote}</p>}
            </div>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-2">
            <h4 className="font-extrabold text-xs text-[#0F152A] flex items-center gap-1.5"><MapPin className="size-4 text-[#2563EB]" /> {order.deliveryAddress.fullName}</h4>
            <p className="text-xs text-[#66738C]">{[order.deliveryAddress.addressLine, order.deliveryAddress.city].filter(Boolean).join(", ")}</p>
            <p className="text-xs text-[#66738C]">{order.deliveryAddress.state} State · {order.deliveryAddress.phone}</p>
          </div>
        </div>

        {/* Middle — timeline & installation */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F152A]">Order Status</h3>
            <div className="space-y-4 text-xs">
              {order.timeline.map((entry) => <div key={entry.key + (entry.at ?? "")} className={`flex items-start gap-3 ${entry.done ? "" : "opacity-60"}`}>
                {entry.done ? <CheckCircle2 className="size-4 text-[#10B981] shrink-0 mt-0.5" /> : <Circle className="size-4 text-[#8C909B] shrink-0 mt-0.5" />}
                <div><h5 className={`font-bold ${entry.done ? "text-[#0F152A]" : "text-[#8C909B]"}`}>{entry.title}</h5>
                  {entry.at && <p className="text-[11px] text-[#8C909B]">{fmt(entry.at)}</p>}
                  {entry.note && <p className="text-[10px] text-[#8C909B]">{entry.note}</p>}</div>
              </div>)}
            </div>
          </div>

          {inst && <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#0F152A] flex items-center gap-1.5"><Wrench className="size-4 text-[#2563EB]" /> Installation</h3>
              <span className="rounded-full bg-[#FFFBEB] px-2.5 py-0.5 text-[10px] font-bold text-[#D9990D] capitalize">{inst.label || inst.status}</span>
            </div>
            <div className="divide-y divide-[#E2ECF6] text-xs">
              {([["Date", inst.dateLabel], ["Time", inst.timeLabel], ["Installer", inst.installer ? `${inst.installer.name} · ${inst.installer.phone}` : inst.installerLabel], ["Location", inst.location]] as const).filter(([, v]) => v).map(([label, value]) =>
                <div key={label} className="flex justify-between gap-3 py-1.5 first:pt-0 last:pb-0"><span className="text-[#8C909B]">{label}</span><span className="text-right font-bold text-[#0F152A]">{value}</span></div>)}
            </div>
            {inst.note && <div className="rounded-xl border border-[#FCEEC1] bg-[#FFFBEB] p-2.5 text-[11px] text-[#D9990D] font-semibold">{inst.note}</div>}
            {verification?.stage === "awaiting_you" && <div className="space-y-2 rounded-xl border border-[#2563EB]/30 bg-[#EFF4F8] p-3 text-[11px]">
              <p className="font-bold text-[#0F152A]">The installer has finished. Please confirm the job.</p>
              {verification.respondBy && <p className="text-[#66738C]">Respond by {fmt(verification.respondBy)}, or Simkash may confirm it for you.</p>}
              <div className="flex gap-2">
                {actions.canApproveInstallation && <button type="button" onClick={() => setModal("approve")} className="rounded-lg bg-[#10B981] px-3 py-1.5 font-bold text-white">Confirm & rate</button>}
                {actions.canDisputeInstallation && <button type="button" onClick={() => setModal("dispute")} className="rounded-lg border border-[#EF4444] px-3 py-1.5 font-bold text-[#EF4444]">Report a problem</button>}
              </div>
            </div>}
            {verification?.stage === "disputed" && <p className="text-[11px] font-semibold text-[#D9990D]">Problem reported. Simkash's team will follow up.</p>}
            {verification?.rating && <p className="text-[11px] text-[#66738C]">You rated this installation {verification.rating.rating}/5.</p>}
            {actions.canRescheduleInstallation && <button type="button" onClick={() => setModal("reschedule")} className="text-xs font-bold text-[#2563EB] hover:underline">Reschedule Installation</button>}
          </div>}
        </div>

        {/* Right — actions & seller */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3">
            {order.tracking && <div className="rounded-xl bg-[#F8FAFC] p-3 text-xs"><p className="font-bold text-[#0F152A]">Track Package</p><p className="font-mono text-[#2563EB]">{order.tracking.trackingNumber}</p><p className="text-[#8C909B]">{order.tracking.carrier}{order.tracking.shippedAt ? ` · shipped ${fmt(order.tracking.shippedAt)}` : ""}</p></div>}
            {actions.canPay && <button type="button" disabled={retry.isPending} onClick={() => retry.mutate(order.id)} className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50">Pay now</button>}
            {actions.canConfirmDelivery && <Popconfirm title="Confirm you received this order?" okText="Yes, received" onConfirm={() => confirmDelivery.mutateAsync({ orderId: order.id }).catch(() => undefined)}>
              <button type="button" disabled={confirmDelivery.isPending} className="w-full rounded-xl border border-[#10B981] text-[#10B981] py-2.5 text-xs font-bold hover:bg-emerald-50">Confirm Delivery</button>
            </Popconfirm>}
            {actions.canReturn && <button type="button" onClick={() => setModal("return")} className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">Return Item</button>}
            <button type="button" onClick={() => navigate(appPaths.support)} className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">Contact Support</button>
            {actions.canCancel && <Popconfirm title="Cancel this order?" description="Wallet payments are refunded automatically." okText="Cancel order" okButtonProps={{ danger: true }} onConfirm={() => cancel.mutateAsync({ orderId: order.id }).catch(() => undefined)}>
              <button type="button" disabled={cancel.isPending} className="w-full rounded-xl border border-[#EF4444] text-[#EF4444] py-2.5 text-xs font-bold hover:bg-red-50">Cancel Order</button>
            </Popconfirm>}
            {order.returnWindowEndsAt && actions.canReturn && <p className="text-center text-[10px] text-[#8C909B]">Returns accepted until {fmt(order.returnWindowEndsAt)}</p>}
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-2">
            <h4 className="font-extrabold text-sm text-[#0F152A]">{order.seller?.name ?? "Simkash"} {order.seller?.verified && "✓"}</h4>
            {order.seller?.verified && <p className="text-xs text-[#10B981] font-semibold">Verified seller</p>}
            <button type="button" onClick={() => navigate(appPaths.support)} className="text-xs font-bold text-[#2563EB] hover:underline pt-1 block">Contact Seller</button>
          </div>
        </div>
      </div>

      <ReturnItemModal orderId={order.id} open={modal === "return"} onClose={() => { closeModal(); void refetch(); }} />
      <RescheduleInstallationModal orderId={order.id} open={modal === "reschedule"} onClose={closeModal} />
      <ApproveInstallationModal orderId={order.id} open={modal === "approve"} onClose={closeModal} />
      <DisputeInstallationModal orderId={order.id} open={modal === "dispute"} onClose={closeModal} />
      <WriteReviewModal product={reviewProduct} onClose={() => setReviewProduct(null)} />
    </div>
  );
}
