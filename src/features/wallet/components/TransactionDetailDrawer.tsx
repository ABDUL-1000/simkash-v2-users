import React, { useState } from "react";
import { Drawer, Tag } from "antd";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Download,
  FileText,
  Hash,
  Loader2,
  Package,
  Smartphone,
  Signal,
  Wallet,
} from "lucide-react";
import { openNotification } from "@/utils/notifications";
import { useGetTransactionDetail } from "../api/useGetTransactionDetail";
import type { WalletTransactionItem } from "../types/api";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { getTransactionFailureReason, getTransactionNetwork, getTransactionPlan, getTransactionProduct, getTransactionRecipient, isBillTransaction, isCreditTransaction } from "../utils/transactionView";

interface TransactionDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  id?: number | string | null;
  transactionId?: number | string | null;
  transaction?: WalletTransactionItem | null;
}

export const TransactionDetailDrawer: React.FC<TransactionDetailDrawerProps> = ({
  open,
  onClose,
  id,
  transactionId,
  transaction: propTransaction,
}) => {
  const [copied, setCopied] = useState<"ref" | "recipient" | null>(null);
  const effectiveId = id ?? transactionId;

  const { transaction: fetchedTransaction, isLoading } = useGetTransactionDetail(
    !propTransaction && effectiveId ? effectiveId : null
  );

  const tx = propTransaction || fetchedTransaction;

  const isCredit = tx ? isCreditTransaction(tx) : false;
  const recipient = tx && isBillTransaction(tx) ? getTransactionRecipient(tx) : undefined;
  const network = tx ? getTransactionNetwork(tx) : undefined;
  const plan = tx ? getTransactionPlan(tx) : undefined;
  const product = tx ? getTransactionProduct(tx) : undefined;
  const failureReason = tx ? getTransactionFailureReason(tx) : undefined;

  const isFailed = tx?.status?.toLowerCase() === "failed";
  const isPending = tx?.status?.toLowerCase() === "pending";

  const copy = (value: string | undefined, key: "ref" | "recipient") => {
    if (!value) return;
    void navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  // No receipt endpoint exists, so the receipt is built from the transaction record itself.
  const handleDownloadReceipt = () => {
    if (!tx) return;
    const rows: Array<[string, string | undefined]> = [
      ["Reference", tx.transaction_reference], ["Description", tx.description], ["Type", tx.transaction_type],
      ["Recipient", recipient], ["Network", network], ["Data plan", plan],
      ["Amount", `${isCredit ? "+" : "-"}₦${Number(tx.amount || 0).toLocaleString()}`], ["Status", tx.status], ["Failure reason", failureReason],
      ["Date", tx.createdAt ? new Date(tx.createdAt).toLocaleString() : undefined],
      ["Balance before", `₦${Number(tx.balanceBefore || 0).toLocaleString()}`], ["Balance after", `₦${Number(tx.balanceAfter || 0).toLocaleString()}`],
    ];
    const text = ["Simkash — Transaction Receipt", "", ...rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`)].join("\n");
    const href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = href; link.download = `receipt-${tx.transaction_reference || tx.id}.txt`;
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1000);
    openNotification({ state: "success", title: "Receipt downloaded" });
  };

  return (
    <Drawer
      title="Transaction Details"
      placement="right"
      onClose={onClose}
      open={open}
      size="large"
      styles={{
        body: { padding: "16px 20px" },
      }}
    >
      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-blue-600" />
        </div>
      ) : !tx ? (
        <AppEmptyState title="No transaction details found" description="This wallet transaction may no longer be available." />
      ) : (
        <div className="space-y-6">
          {/* Header Amount Card */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 text-center space-y-2">
            <div
              className={`mx-auto flex size-12 items-center justify-center rounded-2xl ${
                isFailed
                  ? "bg-rose-100 text-rose-600"
                  : isCredit
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {isCredit ? (
                <ArrowDownLeft className="size-6" />
              ) : (
                <ArrowUpRight className="size-6" />
              )}
            </div>

            <div>
              <div
                className={`text-2xl font-black ${
                  isFailed
                    ? "text-rose-600"
                    : isCredit
                    ? "text-emerald-600"
                    : "text-slate-900"
                }`}
              >
                {isCredit ? "+" : "-"}₦{Number(tx.amount || 0).toLocaleString()}
              </div>
              <p className="text-xs text-slate-500 font-medium pt-0.5">
                {tx.description || tx.transaction_type}
              </p>
            </div>

            <div className="pt-1">
              <Tag
                color={
                  isFailed
                    ? "error"
                    : isPending
                    ? "warning"
                    : "success"
                }
                className="rounded-full px-3 py-0.5 text-xs font-bold uppercase tracking-wider"
              >
                {tx.status}
              </Tag>
            </div>
          </div>

          {failureReason && (
            <div className="rounded-xl border border-rose-100 bg-rose-50 p-3 text-xs text-rose-700">
              <strong>Reason:</strong> {failureReason}.{Number(tx.balanceBefore) === Number(tx.balanceAfter) && " Your wallet was not debited."}
            </div>
          )}

          {/* Details List */}
          <div className="rounded-2xl border border-slate-100 bg-white p-4 space-y-3.5 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Hash className="size-3.5" /> Reference
              </span>
              <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800">
                <span className="truncate max-w-[170px]">
                  {tx.transaction_reference}
                </span>
                <button
                  type="button"
                  onClick={() => copy(tx.transaction_reference, "ref")}
                  className="text-slate-400 hover:text-slate-700"
                >
                  {copied === "ref" ? (
                    <Check className="size-3 text-emerald-600" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 flex items-center gap-1.5">
                <FileText className="size-3.5" /> Type
              </span>
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                {tx.transaction_type}
              </span>
            </div>

            {recipient && (
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Smartphone className="size-3.5" /> {/airtime|data/i.test(tx.transaction_type) ? "Phone Number" : "Recipient"}
                </span>
                <div className="flex items-center gap-1.5 font-mono font-bold text-slate-800">
                  <span>{recipient}</span>
                  <button type="button" aria-label="Copy recipient" onClick={() => copy(recipient, "recipient")} className="text-slate-400 hover:text-slate-700">
                    {copied === "recipient" ? <Check className="size-3 text-emerald-600" /> : <Copy className="size-3" />}
                  </button>
                </div>
              </div>
            )}

            {network && isBillTransaction(tx) && (
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 flex items-center gap-1.5"><Signal className="size-3.5" /> Network</span>
                <span className="font-bold text-slate-800">{network}{product && product.toUpperCase() !== network.toUpperCase() ? ` · ${product}` : ""}</span>
              </div>
            )}

            {plan && (
              <div className="flex items-center justify-between py-1 border-b border-slate-50">
                <span className="text-slate-400 flex items-center gap-1.5"><Package className="size-3.5" /> Data Plan</span>
                <span className="font-mono font-bold text-slate-800">{plan}</span>
              </div>
            )}

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="size-3.5" /> Date & Time
              </span>
              <span className="font-medium text-slate-700">
                {tx.createdAt ? new Date(tx.createdAt).toLocaleString() : "—"}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Wallet className="size-3.5" /> Balance Before
              </span>
              <span className="font-bold text-slate-700">
                ₦{Number(tx.balanceBefore || 0).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Wallet className="size-3.5" /> Balance After
              </span>
              <span className="font-extrabold text-slate-900">
                ₦{Number(tx.balanceAfter || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action: Download Receipt */}
          <button
            type="button"
            onClick={handleDownloadReceipt}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition active:scale-98"
          >
            <Download className="size-4" /> Download Receipt
          </button>
        </div>
      )}
    </Drawer>
  );
};
