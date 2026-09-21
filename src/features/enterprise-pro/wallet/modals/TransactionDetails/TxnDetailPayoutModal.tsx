import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { ArrowUpRight, CheckCircle2, Download, Building2 } from "lucide-react";
import type { TransactionItem } from "../../types";

interface TxnDetailPayoutModalProps {
  open: boolean;
  txn?: TransactionItem | null;
  onClose: () => void;
  onDownloadReceipt?: () => void;
}

export const TxnDetailPayoutModal: React.FC<TxnDetailPayoutModalProps> = ({
  open,
  txn,
  onClose,
  onDownloadReceipt,
}) => {
  const amount = txn?.amount ?? 500000;
  const ref = txn?.ref ?? "TXN-OUT-2024-00124";
  const date = txn?.date ?? "16 Jun 2026, 11:20";

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
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto border border-slate-200">
            <ArrowUpRight className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bank Payout</span>
            <div className="text-2xl font-black text-slate-900 mt-0.5">
              -₦{amount.toLocaleString()}.00
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Successfully Dispatched
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Transaction Ref:</span>
            <span className="font-mono font-bold text-slate-900">{ref}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Dispatched Date:</span>
            <span className="text-slate-700">{date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">Beneficiary Bank:</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              Access Bank (****0476)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Account Name:</span>
            <span className="font-medium text-slate-800">Zenith Corp Ltd</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">NIP Session ID:</span>
            <span className="font-mono text-slate-600">NIP-99201948201</span>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onDownloadReceipt}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Settlement Slip
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
