import { useState } from "react";
import { Copy } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { ScWalletTransactionItem } from "../types/api";

interface ScTransactionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** A row from GET /state-coordinator/wallet/transactions (there is no SC transaction-detail endpoint). */
  transaction: ScWalletTransactionItem | null;
}

export function ScTransactionDetailsModal({
  open,
  onOpenChange,
  transaction: activeTxn,
}: ScTransactionDetailsModalProps) {
  const [copied, setCopied] = useState(false);
  if (!activeTxn) return null;
  const isCredit = activeTxn.flow === "credit";

  const handleCopyRef = () => {
    void navigator.clipboard.writeText(activeTxn.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Transaction Details"
      description={`${activeTxn.reference} · ${activeTxn.title}`}
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Top Header Display */}
        <div className="text-center space-y-1 py-1">
          <h2
            className={`text-3xl font-black ${
              isCredit ? "text-[#10B981]" : "text-[#EF4444]"
            }`}
          >
            {activeTxn.amount_formatted}
          </h2>
          <p className="text-xs font-bold text-[#8C909B]">{activeTxn.title}</p>
        </div>

        {/* Metadata List */}
        <div className="divide-y divide-[#E2ECF6]">
          <div className="flex justify-between py-2 first:pt-0">
            <span className="text-[#8C909B]">Ref</span>
            <div className="flex items-center gap-1.5 font-mono font-bold text-[#0F152A]">
              <span>{activeTxn.reference}</span>
              <button
                type="button"
                onClick={handleCopyRef}
                className="text-[#8C909B] hover:text-[#0F152A]"
              >
                <Copy className="size-3.5" />
              </button>
              {copied && <span className="text-[9px] text-[#10B981]">Copied!</span>}
            </div>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#8C909B]">Type</span>
            <span className="font-bold text-[#0F152A]">{activeTxn.title}</span>
          </div>
          <div className="flex justify-between gap-4 py-2">
            <span className="text-[#8C909B]">Description</span>
            <span className="text-right font-bold text-[#0F152A]">{activeTxn.subtitle}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#8C909B]">Direction</span>
            <span className={`font-bold ${isCredit ? "text-[#10B981]" : "text-[#EF4444]"}`}>{isCredit ? "Credit" : "Debit"}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#8C909B]">Date</span>
            <span className="font-bold text-[#0F152A]">{activeTxn.time}</span>
          </div>
        </div>

        {/* Status, AP network breakdown, wallet impact and receipt download are omitted:
            the transactions list doesn't return them and there is no SC transaction-detail endpoint. */}

        {/* Footer Actions */}
        <div className="flex items-center justify-end pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600"
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
