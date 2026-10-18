import { useState } from "react";
import { Check, CheckCircle2, Copy } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { RmGroupedTransactionItem } from "../../types/wallet";
import { RmBadge, RmFlowFooter, RmNote, RmReceipt, type RmReceiptRow } from "../flow/RmFlow";
import { rmFlow } from "../flow/rmFlowTokens";

const typeLabel: Record<string, string> = { commission: "Network Commission", payouts: "Commission Payout", payout: "Commission Payout", bill_payments: "Bill Payment", transfers: "Transfer" };
const subtitleFor = (tx: RmGroupedTransactionItem, failed: boolean) =>
  tx.category === "commission" ? "Network Commission" : tx.category.startsWith("payout") ? failed ? "Payout Failed" : "Payout to Bank" : tx.title;

function CopyRef({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return <span className="inline-flex items-center gap-1.5">{value}<button type="button" aria-label="Copy reference" onClick={() => void navigator.clipboard?.writeText(value).then(() => { setCopied(true); window.setTimeout(() => setCopied(false), 1500); })} style={{ color: rmFlow.muted }}>{copied ? <Check className="size-3.5" style={{ color: rmFlow.green }} /> : <Copy className="size-3.5" />}</button></span>;
}

// Builds the receipt from the transaction record itself; there is no receipt endpoint.
function downloadReceipt(tx: RmGroupedTransactionItem) {
  const lines = [["Simkash — Transaction Receipt"], [], ["Reference", tx.reference], ["Type", typeLabel[tx.category] ?? tx.category], ["Description", tx.title], ["Details", tx.subtitle], ["Amount", tx.amount_formatted], ["Status", tx.status], ["Time", tx.time]]
    .map(line => line.join(": ")).join("\n");
  const href = URL.createObjectURL(new Blob([lines], { type: "text/plain" }));
  const link = document.createElement("a"); link.href = href; link.download = `${tx.reference}.txt`;
  document.body.appendChild(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(href), 1000);
}

export function RmTransactionModal({ transaction: tx, onClose, onRetryPayout, onUpdateBank }: { transaction: RmGroupedTransactionItem; onClose: () => void; onRetryPayout?: () => void; onUpdateBank?: () => void }) {
  const failed = tx.status.toLowerCase() === "failed";
  const credit = tx.flow === "credit";
  const payout = tx.category.startsWith("payout");
  const amountColor = failed ? rmFlow.muted : credit ? rmFlow.green : rmFlow.red;
  const status = <RmBadge tone={failed ? "danger" : /pending|processing/i.test(tx.status) ? "warning" : "success"}>{tx.status[0].toUpperCase() + tx.status.slice(1)}</RmBadge>;
  const rows: RmReceiptRow[] = [["Ref", <CopyRef value={tx.reference} />], ["Type", typeLabel[tx.category] ?? tx.category.replaceAll("_", " ")], ["Status", status], [failed ? "Attempted" : "Date", tx.time], ["Details", tx.subtitle]];
  return <AppModal open size="sm" title={<span style={{ color: rmFlow.navy }}>Transaction Details</span>} description={`${tx.reference} · ${typeLabel[tx.category] ?? tx.title}`} onOpenChange={open => { if (!open) onClose(); }}
    footer={failed && payout && (onRetryPayout || onUpdateBank)
      ? <div className="flex items-center gap-2 border-t pt-4" style={{ borderColor: rmFlow.border }}><button type="button" onClick={onClose} className="px-3 text-sm font-semibold" style={{ color: rmFlow.slate }}>Close</button><div className="flex-1"><RmFlowFooter secondary={onRetryPayout ? { label: "Retry Payout", onClick: onRetryPayout } : undefined} primary={onUpdateBank ? { label: "Update Bank Details", onClick: onUpdateBank } : undefined} /></div></div>
      : <div className="flex items-center justify-end gap-4 border-t pt-4" style={{ borderColor: rmFlow.border }}><button type="button" onClick={() => downloadReceipt(tx)} className="text-sm font-semibold" style={{ color: rmFlow.navy }}>Download Receipt</button><button type="button" onClick={onClose} className="min-h-10 rounded-xl px-6 text-sm font-semibold text-white" style={{ background: rmFlow.navy }}>Close</button></div>}>
    <div className="space-y-4 border-t pt-4" style={{ borderColor: rmFlow.border }}>
      <div className="py-3 text-center"><p className="text-3xl font-bold" style={{ color: amountColor }}>{tx.amount_formatted}</p><p className="my-1.5 text-xs" style={{ color: rmFlow.muted }}>{subtitleFor(tx, failed)}</p>{status}</div>
      <RmReceipt rows={rows} />
      {failed && payout && <RmNote tone="success" icon={CheckCircle2}>Your wallet was not debited</RmNote>}
      {/* Wallet before/after, network breakdown and provider token sections from the design are not shown: the transactions endpoint does not return them. */}
    </div>
  </AppModal>;
}
