import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { TrendingUp, CheckCircle2, Download } from "lucide-react";
import type { TransactionItem } from "../../types";

interface TxnDetailMarginModalProps {
  open: boolean;
  txn?: TransactionItem | null;
  onClose: () => void;
  onDownloadReceipt?: () => void;
}

export const TxnDetailMarginModal: React.FC<TxnDetailMarginModalProps> = ({
  open,
  txn,
  onClose,
  onDownloadReceipt,
}) => {
  const amount = txn?.amount ?? 45000;
  const ref = txn?.ref ?? "TXN-MRG-2024-00847";
  const date = txn?.date ?? "18 Jun 2026, 14:32";

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title=""
      size="sm"
      footer={null}
    >
      <div className="py-2 space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Enterprise Margin</span>
            <div className="text-2xl font-black text-emerald-600 mt-0.5">
              +₦{amount.toLocaleString()}.00
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Completed & Credited
          </span>
        </div>

        {/* Ledger Details */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Transaction Ref:</span>
            <span className="font-mono font-bold text-slate-900">{ref}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Date & Time:</span>
            <span className="text-slate-700">{date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Source:</span>
            <span className="font-semibold text-slate-800">Direct SIM Sales Margin</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">SIMs Sold:</span>
            <span className="font-bold text-slate-800">3 SIMs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Profit Rate:</span>
            <span className="font-bold text-emerald-700">₦15,000 / SIM Spread</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-1.5">
            <span className="text-slate-500">Settlement Wallet:</span>
            <span className="font-semibold text-slate-900">Isolated Enterprise Wallet</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onDownloadReceipt}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Receipt (PDF)
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
};
