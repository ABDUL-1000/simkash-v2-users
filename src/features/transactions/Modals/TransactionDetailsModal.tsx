import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Copy } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionReceiptModal } from "./TransactionReceiptModal";

export interface TransactionItemData {
  reference: string;
  type: string;
  category: string;
  status: "Completed" | "Failed" | "Pending";
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  walletBefore: number;
  walletAfter: number;
  orderRef?: string;
  failureReason?: string;
}

interface TransactionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction?: TransactionItemData | null;
  onReportIssueClick?: () => void;
}

export function TransactionDetailsModal({
  open,
  onOpenChange,
  transaction,
  onReportIssueClick,
}: TransactionDetailsModalProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);

  if (!transaction) return null;

  const isCredit = transaction.amount > 0;
  const formattedAmount = `${isCredit ? "+" : "-"}₦${Math.abs(
    transaction.amount
  ).toLocaleString()}`;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(transaction.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleViewFullDetails = () => {
    onOpenChange(false);
    navigate(`/transactions/${transaction.reference}`);
  };

  return (
    <>
      <AppModal
        open={open && !receiptModalOpen}
        onOpenChange={onOpenChange}
        title="Transaction Details"
        description={`${transaction.reference} · ${transaction.category}`}
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* Large Amount Display */}
          <div className="text-center space-y-1 py-2">
            <h2
              className={`text-3xl font-extrabold ${
                transaction.status === "Failed"
                  ? "text-[#66738C]"
                  : isCredit
                  ? "text-[#10B981]"
                  : "text-[#0F152A]"
              }`}
            >
              {formattedAmount}
            </h2>
            <div className="flex justify-center pt-1">
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                  transaction.status === "Completed"
                    ? "bg-[#EBFFF8] text-[#10B981]"
                    : transaction.status === "Failed"
                    ? "bg-[#FFF7F8] text-[#EF4444]"
                    : "bg-[#FFFBEB] text-[#F59E0B]"
                }`}
              >
                {transaction.status}
              </span>
            </div>
          </div>

          {/* Detailed Breakdown Table */}
          <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
            <div className="flex items-center justify-between py-2 first:pt-0">
              <span className="text-[#8C909B]">Reference</span>
              <div className="flex items-center gap-1.5 font-bold text-[#0F152A]">
                <span>{transaction.reference}</span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="text-[#2563EB] hover:opacity-80"
                  title="Copy reference"
                >
                  {copied ? <Check className="size-3.5 text-[#10B981]" /> : <Copy className="size-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-[#8C909B]">Type</span>
              <span className="font-bold text-[#0F152A]">{transaction.type}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-[#8C909B]">Status</span>
              <span
                className={`font-bold ${
                  transaction.status === "Completed"
                    ? "text-[#10B981]"
                    : transaction.status === "Failed"
                    ? "text-[#EF4444]"
                    : "text-[#F59E0B]"
                }`}
              >
                {transaction.status}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-[#8C909B]">Date</span>
              <span className="font-bold text-[#0F152A]">{transaction.date}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-[#8C909B]">Description</span>
              <span className="font-bold text-[#0F152A]">{transaction.description}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-[#8C909B]">Payment</span>
              <span className="font-bold text-[#0F152A]">{transaction.paymentMethod}</span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-[#8C909B]">Wallet Before</span>
              <span className="font-bold text-[#0F152A]">
                ₦{transaction.walletBefore.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-[#8C909B]">Charged / Added</span>
              <span
                className={`font-extrabold ${
                  isCredit ? "text-[#10B981]" : "text-[#EF4444]"
                }`}
              >
                {formattedAmount}
              </span>
            </div>

            <div className="flex justify-between py-2">
              <span className="text-[#8C909B]">Wallet After</span>
              <span className="font-bold text-[#0F152A]">
                ₦{transaction.walletAfter.toLocaleString()}
              </span>
            </div>

            {transaction.orderRef && (
              <div className="flex justify-between py-2 last:pb-0">
                <span className="text-[#8C909B]">Order Ref</span>
                <button
                  type="button"
                  onClick={() => {
                    onOpenChange(false);
                    navigate(`/marketplace/orders/${transaction.orderRef}`);
                  }}
                  className="font-bold text-[#2563EB] hover:underline"
                >
                  {transaction.orderRef} View Order →
                </button>
              </div>
            )}
          </div>

          {/* Failure Reason Banner if Failed */}
          {transaction.status === "Failed" && transaction.failureReason && (
            <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3.5 text-xs text-[#EF4444] space-y-1">
              <span className="font-bold uppercase tracking-wider text-[10px]">
                FAILURE REASON
              </span>
              <p className="font-bold">{transaction.failureReason}</p>
            </div>
          )}

          {/* Footer Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2 sm:flex sm:items-center sm:justify-between border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleViewFullDetails}
              className="rounded-xl border border-[#E2ECF6] px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              View Full Details
            </button>
            <button
              type="button"
              onClick={() => setReceiptModalOpen(true)}
              className="rounded-xl border border-[#E2ECF6] px-4 py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Download Receipt
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onReportIssueClick?.();
              }}
              className="rounded-xl border border-[#EF4444] px-4 py-2 text-xs font-bold text-[#EF4444] hover:bg-red-50"
            >
              Report Issue
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl bg-[#2563EB] px-6 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </AppModal>

      {/* Transaction Receipt Modal */}
      <TransactionReceiptModal
        open={receiptModalOpen}
        onOpenChange={setReceiptModalOpen}
        reference={transaction.reference}
        amount={transaction.amount}
        type={transaction.type}
        date={transaction.date}
        service={transaction.category}
        description={transaction.description}
        paymentMethod={transaction.paymentMethod}
        status={transaction.status.toUpperCase()}
      />
    </>
  );
}
