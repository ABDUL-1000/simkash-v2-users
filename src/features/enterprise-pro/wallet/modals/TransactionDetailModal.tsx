import { AppModal } from "@/components/common/AppModal";
import type { TransactionItem } from "../types";

/** Details of one wallet transaction or payout row (all fields come from the list response). */
export function TransactionDetailModal({ txn, onClose }: { txn: TransactionItem | null; onClose: () => void }) {
  if (!txn) return null;
  const failed = /fail/i.test(txn.status);
  const rows: Array<[string, string]> = [
    ["Reference", txn.ref], ["Category", txn.categoryLabel], ["Details", txn.subtitle], ["Status", txn.status],
    ["Date", txn.createdAt ? new Date(txn.createdAt).toLocaleString("en-NG", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : txn.time],
  ];
  return (
    <AppModal open onOpenChange={(open) => { if (!open) onClose(); }} title={txn.title} size="sm" footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        <div className={`rounded-xl p-4 text-center ${failed ? "bg-red-50" : txn.isOutflow ? "bg-slate-50" : "bg-emerald-50"}`}>
          <p className={`text-2xl font-black ${failed ? "text-red-600" : txn.isOutflow ? "text-slate-900" : "text-emerald-600"}`}>{txn.amountFormatted}</p>
        </div>
        <div className="divide-y divide-slate-100">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-start justify-between gap-3 py-2">
              <span className="text-slate-500">{label}</span>
              <span className="text-right font-semibold text-slate-900">{value || "—"}</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={onClose} className="w-full rounded-xl bg-slate-900 py-2.5 font-bold text-white hover:bg-slate-800">Close</button>
      </div>
    </AppModal>
  );
}
