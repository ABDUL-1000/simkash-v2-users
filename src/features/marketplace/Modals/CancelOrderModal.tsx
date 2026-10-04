import { AppModal } from "@/components/common/AppModal";
import { useCancelOrder } from "../api/useCancelOrder";

export function CancelOrderModal({ open, onOpenChange, order }: { open: boolean; onOpenChange: (open: boolean) => void; order: { id: number; orderNumber: string; totalAmount: number } | null }) {
  const cancel = useCancelOrder({ onSuccess: () => onOpenChange(false) });
  const submit = () => { if (order) cancel.mutate(order.id); };
  return <AppModal open={open} onOpenChange={onOpenChange} title="Cancel order?" description={order?.orderNumber} size="sm">
    <div className="space-y-4"><p className="text-sm text-[#66738C]">The cancellation request will be sent to the marketplace. Eligible refunds are returned to your wallet.</p><div className="flex justify-between rounded-xl bg-slate-50 p-3 text-xs"><span className="text-[#66738C]">Order total</span><b>₦{Number(order?.totalAmount ?? 0).toLocaleString("en-NG")}</b></div><div className="flex justify-end gap-2 border-t border-[#E2ECF6] pt-3"><button type="button" onClick={() => onOpenChange(false)} disabled={cancel.isPending} className="rounded-lg border border-[#E2ECF6] px-4 py-2 text-xs font-bold">Keep Order</button><button type="button" onClick={submit} disabled={!order || cancel.isPending} className="rounded-lg bg-[#EF4444] px-4 py-2 text-xs font-bold text-white disabled:opacity-50">{cancel.isPending ? "Cancelling…" : "Cancel Order"}</button></div></div>
  </AppModal>;
}
