import React from "react";
import { AppModal } from "@/components/common/AppModal";
import { XCircle, RefreshCw, PhoneCall, Undo2 } from "lucide-react";
import { mockAccountManager } from "../../data/mockWalletData";
import type { TransactionItem } from "../../types";

interface TxnDetailFailedPayoutModalProps {
  open: boolean;
  txn?: TransactionItem | null;
  onClose: () => void;
  onRetry?: () => void;
  onContactManager?: () => void;
}

export const TxnDetailFailedPayoutModal: React.FC<TxnDetailFailedPayoutModalProps> = ({
  open,
  txn,
  onClose,
  onRetry,
  onContactManager,
}) => {
  const amount = txn?.amount ?? 500000;
  const ref = txn?.ref ?? "TXN-OUT-2024-00001";
  const date = txn?.date ?? "01 Apr 2026, 12:10";
  const reason = txn?.meta?.failureReason ?? "NIP Network Settlement Timeout";

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
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Failed Payout</span>
            <div className="text-2xl font-black text-rose-600 mt-0.5">
              ₦{amount.toLocaleString()}.00
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Undo2 className="w-3 h-3 text-emerald-600" /> Fully Refunded to Wallet
          </span>
        </div>

        <div className="p-3.5 bg-rose-50/50 rounded-xl border border-rose-100 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500">Transaction Ref:</span>
            <span className="font-mono font-bold text-slate-900">{ref}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Attempted Date:</span>
            <span className="text-slate-700">{date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Failure Reason:</span>
            <span className="font-semibold text-rose-700">{reason}</span>
          </div>
          <div className="flex justify-between border-t border-rose-100 pt-1.5">
            <span className="text-slate-500">Ledger Reversal:</span>
            <span className="font-bold text-emerald-700">+₦{amount.toLocaleString()}.00 (Restored)</span>
          </div>
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={onContactManager}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            Contact {mockAccountManager.name}
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Payout
          </button>
        </div>
      </div>
    </AppModal>
  );
};
