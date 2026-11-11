import { useState } from "react";
import { Star } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useAddReview, useApproveInstallation, useDisputeInstallation, useGetOrderReturns, useRequestReturn, useRescheduleInstallation } from "../api";
import { InstallationSlotPicker, type SlotChoice } from "../components/InstallationSlotPicker";
import type { ReturnReason } from "../types/api";

const btn = "rounded-xl px-5 py-2.5 text-xs font-bold disabled:opacity-50";
const Footer = ({ onCancel, onSubmit, disabled, label }: { onCancel: () => void; onSubmit: () => void; disabled: boolean; label: string }) =>
  <div className="flex justify-end gap-2 border-t border-[#E2ECF6] pt-3"><button type="button" onClick={onCancel} className={`${btn} border border-[#E2ECF6]`}>Cancel</button><button type="button" disabled={disabled} onClick={onSubmit} className={`${btn} bg-[#2563EB] text-white`}>{label}</button></div>;

export function RatingInput({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return <div className="flex justify-center gap-1">{[1, 2, 3, 4, 5].map((n) => <button key={n} type="button" aria-label={`${n} star`} onClick={() => onChange(n)}><Star className={`size-7 ${n <= value ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#CBD5E1]"}`} /></button>)}</div>;
}

/** POST /products/:id/reviews — only for delivered orders; one review per product. */
export function WriteReviewModal({ product, onClose }: { product: { id: number; name: string } | null; onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const review = useAddReview();
  if (!product) return null;
  return <AppModal open onOpenChange={(v) => !v && onClose()} title="Write a review" description={product.name} size="sm" footer={null}>
    <div className="space-y-3 text-xs">
      <RatingInput value={rating} onChange={setRating} />
      <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience (optional)" className="w-full rounded-xl border border-[#E2ECF6] p-3 outline-none focus:border-[#2563EB]" />
      <Footer onCancel={onClose} label={review.isPending ? "Posting…" : "Post review"} disabled={!rating || review.isPending}
        onSubmit={() => review.mutate({ productId: product.id, rating, comment: comment.trim() || undefined }, { onSuccess: onClose })} />
    </div>
  </AppModal>;
}

/** GET + POST /orders/:id/returns */
export function ReturnItemModal({ orderId, open, onClose }: { orderId: number; open: boolean; onClose: () => void }) {
  const info = useGetOrderReturns(orderId, open);
  const request = useRequestReturn();
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [reason, setReason] = useState<ReturnReason | "">("");
  const [details, setDetails] = useState("");
  const data = info.data;
  const items = Object.entries(quantities).filter(([, q]) => q > 0).map(([id, quantity]) => ({ orderItemId: Number(id), quantity }));
  const valid = items.length > 0 && reason && (reason !== "other" || details.trim());
  const close = () => { setQuantities({}); setReason(""); setDetails(""); onClose(); };
  return <AppModal open={open} onOpenChange={(v) => !v && close()} title="Return item" description={data?.windowEndsAt ? `Return window ends ${new Date(data.windowEndsAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}` : undefined} size="md" footer={null}>
    {info.isPending ? <div className="h-32 animate-pulse rounded-xl bg-slate-100" /> : info.isError ? <p className="text-xs text-[#EF4444]">{info.error.message}</p> : !data?.canReturn ? <p className="text-xs text-[#66738C]">This order can't be returned{data?.returns.length ? " — a return is already in progress." : "."}</p> :
      <div className="space-y-3 text-xs">
        <div className="space-y-2">{data.returnableItems.map((item) => <div key={item.orderItemId} className="flex items-center justify-between gap-3 rounded-xl border border-[#E2ECF6] p-3">
          <div className="min-w-0"><p className="truncate font-bold text-[#0F152A]">{item.name}</p><p className="text-[10px] text-[#8C909B]">Bought {item.purchased}{item.alreadyReturned ? ` · ${item.alreadyReturned} returned` : ""} · {item.returnable} returnable</p></div>
          <select disabled={!item.returnable} value={quantities[item.orderItemId] ?? 0} onChange={(e) => setQuantities((prev) => ({ ...prev, [item.orderItemId]: Number(e.target.value) }))} className="rounded-lg border border-[#E2ECF6] px-2 py-1">
            {Array.from({ length: item.returnable + 1 }, (_, n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>)}</div>
        <select value={reason} onChange={(e) => setReason(e.target.value as ReturnReason)} className="w-full rounded-xl border border-[#E2ECF6] px-3 py-2.5">
          <option value="">Select a reason</option>{data.reasons.map((r) => <option key={r.key} value={r.key}>{r.label}</option>)}
        </select>
        <textarea rows={3} value={details} onChange={(e) => setDetails(e.target.value)} placeholder={reason === "other" ? "Tell us what's wrong (required)" : "More details (optional)"} className="w-full rounded-xl border border-[#E2ECF6] p-3 outline-none focus:border-[#2563EB]" />
        <Footer onCancel={close} label={request.isPending ? "Submitting…" : "Request return"} disabled={!valid || request.isPending}
          onSubmit={() => reason && request.mutate({ orderId, items, reason, details: details.trim() || undefined }, { onSuccess: close })} />
      </div>}
  </AppModal>;
}

/** PATCH /orders/:id/installation — allowed until 24h before the slot. */
export function RescheduleInstallationModal({ orderId, open, onClose }: { orderId: number; open: boolean; onClose: () => void }) {
  const [slot, setSlot] = useState<SlotChoice>(null);
  const reschedule = useRescheduleInstallation();
  return <AppModal open={open} onOpenChange={(v) => !v && onClose()} title="Reschedule installation" size="md" footer={null}>
    {open && <div className="space-y-3 text-xs">
      <InstallationSlotPicker value={slot} onChange={setSlot} />
      <Footer onCancel={onClose} label={reschedule.isPending ? "Saving…" : "Reschedule"} disabled={!slot || reschedule.isPending}
        onSubmit={() => slot && reschedule.mutate({ orderId, ...slot }, { onSuccess: onClose })} />
    </div>}
  </AppModal>;
}

/** POST /orders/:id/installation/approve { rating, comment? } */
export function ApproveInstallationModal({ orderId, open, onClose }: { orderId: number; open: boolean; onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const approve = useApproveInstallation();
  return <AppModal open={open} onOpenChange={(v) => !v && onClose()} title="Confirm & rate installation" description="How did the installer do?" size="sm" footer={null}>
    <div className="space-y-3 text-xs">
      <RatingInput value={rating} onChange={setRating} />
      <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Comment (optional)" className="w-full rounded-xl border border-[#E2ECF6] p-3 outline-none focus:border-[#2563EB]" />
      <Footer onCancel={onClose} label={approve.isPending ? "Confirming…" : "Confirm installation"} disabled={!rating || approve.isPending}
        onSubmit={() => approve.mutate({ orderId, rating, comment: comment.trim() || undefined }, { onSuccess: onClose })} />
    </div>
  </AppModal>;
}

/** POST /orders/:id/installation/dispute { reason } (10+ characters) */
export function DisputeInstallationModal({ orderId, open, onClose }: { orderId: number; open: boolean; onClose: () => void }) {
  const [reason, setReason] = useState("");
  const dispute = useDisputeInstallation();
  const ok = reason.trim().length >= 10;
  return <AppModal open={open} onOpenChange={(v) => !v && onClose()} title="Report a problem" description="Tell us what went wrong with the installation" size="sm" footer={null}>
    <div className="space-y-3 text-xs">
      <textarea rows={4} value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Describe the problem (at least 10 characters)" className="w-full rounded-xl border border-[#E2ECF6] p-3 outline-none focus:border-[#2563EB]" />
      <Footer onCancel={onClose} label={dispute.isPending ? "Sending…" : "Report problem"} disabled={!ok || dispute.isPending}
        onSubmit={() => dispute.mutate({ orderId, reason: reason.trim() }, { onSuccess: onClose })} />
    </div>
  </AppModal>;
}
