import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { Package, CheckCircle2, Download } from "lucide-react";
import type { TransactionItem } from "../../types";

interface TxnDetailSimOrderModalProps {
  open: boolean;
  txn?: TransactionItem | null;
  onClose: () => void;
  onDownloadReceipt?: () => void;
}

export const TxnDetailSimOrderModal: React.FC<TxnDetailSimOrderModalProps> = ({
  open,
  txn,
  onClose,
  onDownloadReceipt,
}) => {
  const amount = txn?.amount ?? 250000;
  const ref = txn?.ref ?? "TXN-SIM-2024-00590";
  const date = txn?.date ?? "14 Jun 2026, 16:45";

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title=""
      size="sm"
      footer={null}
    >
      <div className="py-2 space-y-4">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto border border-purple-200">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">SIM Stock Order</span>
            <div className="text-2xl font-black text-purple-600 mt-0.5">
              -₦{amount.toLocaleString()}.00
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Batch Dispatched
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Order Ref:</span>
            <span className="font-mono font-bold text-slate-900">{ref}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Order Date:</span>
            <span className="text-slate-700">{date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Batch Quantity:</span>
            <span className="font-bold text-slate-800">50 Enterprise SIM Cards</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Wholesale Unit Price:</span>
            <span className="font-semibold text-slate-900">₦5,000.00 / SIM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Batch ID:</span>
            <span className="font-mono text-slate-700">#SIM-B-8491</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-1.5">
            <span className="text-slate-500">Payment Channel:</span>
            <span className="font-semibold text-purple-700">Debited from Earnings Wallet</span>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onDownloadReceipt}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Waybill Invoice
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
