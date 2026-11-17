import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { openNotification } from "@/utils/notifications";
import { useCancelEasyBuy } from "../api/easybuy";

/** Cancel an application before the down payment (only when `actions.canCancel`). */
export function EasyBuyCancelModal({ id, reference, open, onClose }: { id: number; reference: string; open: boolean; onClose: () => void }) {
  const cancel = useCancelEasyBuy();
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const close = () => { if (cancel.isPending) return; setReason(""); setError(null); onClose(); };
  const submit = () => {
    setError(null);
    cancel.mutate({ id, reason: reason.trim() || undefined }, {
      onSuccess: () => { openNotification({ state: "success", title: "Application cancelled" }); setReason(""); onClose(); },
      onError: (err) => setError(err.message),
    });
  };

  return <AppModal open={open} onOpenChange={(v) => { if (!v) close(); }} title="Cancel application?" description={reference} size="sm">
    <div className="space-y-4 pt-1">
      <p className="text-xs text-[#66738C]">Nothing has been charged. Any stock held for you will be released. You can apply again later.</p>
      <div className="space-y-1.5">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">Reason (optional)</p>
        <textarea value={reason} onChange={(e) => setReason(e.target.value)} maxLength={300} rows={3} placeholder="Tell us why you're cancelling" className="w-full resize-none rounded-xl border border-[#E2ECF6] px-3 py-2 text-xs outline-none focus:border-[#2563EB]" />
      </div>
      {error && <p className="rounded-xl border border-[#F7D2D7] bg-[#FFF7F8] p-2.5 text-[11px] font-semibold text-[#EF4444]">{error}</p>}
      <div className="flex flex-col-reverse gap-2 border-t border-[#E2ECF6] pt-4 sm:flex-row sm:justify-end">
        <button type="button" disabled={cancel.isPending} onClick={close} className="rounded-xl border border-[#E2ECF6] px-5 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50">Keep application</button>
        <button type="button" disabled={cancel.isPending} onClick={submit} className="rounded-xl bg-[#EF4444] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-600 disabled:opacity-50">{cancel.isPending ? "Cancelling…" : "Cancel application"}</button>
      </div>
    </div>
  </AppModal>;
}
