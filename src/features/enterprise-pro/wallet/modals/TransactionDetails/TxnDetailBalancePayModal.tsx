import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { DollarSign, CheckCircle2, Download, ShieldCheck } from "lucide-react";
import type { TransactionItem } from "../../types";

interface TxnDetailBalancePayModalProps {
  open: boolean;
  txn?: TransactionItem | null;
  onClose: () => void;
  onDownloadReceipt?: () => void;
}

export const TxnDetailBalancePayModal: React.FC<TxnDetailBalancePayModalProps> = ({
  open,
  txn,
  onClose,
  onDownloadReceipt,
}) => {
  const amount = txn?.amount ?? 1000000;
  const ref = txn?.ref ?? "TXN-BAL-2024-00071";
  const date = txn?.date ?? "11 Jun 2026, 17:02";

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
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Balance Payment</span>
            <div className="text-2xl font-black text-amber-600 mt-0.5">
              -₦{amount.toLocaleString()}.00
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Amortized to Contract
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Transaction Ref:</span>
            <span className="font-mono font-bold text-slate-900">{ref}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Payment Date:</span>
            <span className="text-slate-700">{date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Contract Number:</span>
            <span className="font-mono font-bold text-slate-800">#EP-2026-004</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Balance Before:</span>
            <span className="font-mono text-slate-700">₦8,500,000.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Balance After:</span>
            <span className="font-mono font-bold text-amber-800">₦7,500,000.00</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-1.5">
            <span className="text-slate-500">Equity Standing:</span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 50% Contract Cleared
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onDownloadReceipt}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Amortization Slip
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
