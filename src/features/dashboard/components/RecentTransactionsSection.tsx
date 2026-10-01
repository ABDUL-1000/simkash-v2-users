import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetWalletSummary } from "@/features/wallet/api/useGetWalletSummary";
import { TransactionDetailDrawer } from "@/features/wallet/components/TransactionDetailDrawer";
import { AppEmptyState } from "@/components/common/AppEmptyState";

export function RecentTransactionsSection() {
  const [selectedTxnId, setSelectedTxnId] = useState<number | null>(null);
  const { summary, isLoading } = useGetWalletSummary();
  const transactions = summary?.recent_transactions ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#0F152A]">Recent Transactions</h3>
        <Link
          to="/transactions"
          className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
        >
          View all <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white p-2 shadow-xs">
        {isLoading ? (
          <div className="p-6 text-center text-xs text-[#8C909B]">
            Loading recent transactions...
          </div>
        ) : transactions.length > 0 ? (
          transactions.map((tx) => {
            const isCredit =
              /credit|inflow|top.?up|deposit|refund|commission/i.test(tx.type);

            return (
              <div
                key={tx.id}
                onClick={() => setSelectedTxnId(tx.id)}
                className="flex cursor-pointer items-center justify-between p-3.5 transition hover:bg-[#F8FAFC]"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-lg ${
                      isCredit ? "bg-[#EBFFF8]" : "bg-[#FFF7F8]"
                    }`}
                  >
                    {isCredit ? "💰" : "💳"}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0F152A]">
                    {tx.type}
                    </h4>
                    <p className="text-xs text-[#8C909B] font-mono">
                      {tx.reference || `#${tx.id}`} · {tx.status}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-sm font-bold font-mono ${
                      isCredit ? "text-[#10B981]" : "text-[#EF4444]"
                    }`}
                  >
                    {isCredit ? "+" : "-"}₦
                    {Number(tx.amount || 0).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  <p className="text-xs text-[#8C909B]">
                    {new Date(tx.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <AppEmptyState title="No wallet transactions yet" description="Your recent wallet activity will appear here." />
        )}
      </div>

      <TransactionDetailDrawer
        id={selectedTxnId}
        open={!!selectedTxnId}
        onClose={() => setSelectedTxnId(null)}
      />
    </div>
  );
}
