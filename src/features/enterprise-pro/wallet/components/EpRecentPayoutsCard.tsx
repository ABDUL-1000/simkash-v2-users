import React from "react";
import { ArrowUpRight, CheckCircle2, XCircle, Clock, ChevronRight } from "lucide-react";
import { colors } from "@/constants/colors";
import { useGetEnterprisePayouts } from "../api/useEnterpriseWallet";
import { walletPayout } from "../types/adapters";
import { EpQueryState } from "../../components/EpQueryState";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { PayoutRecord } from "../types";

interface EpRecentPayoutsCardProps {
  onViewAllPayouts: () => void;
  onSelectPayout?: (payout: PayoutRecord) => void;
  totalPaidOut?: string;
}

/** Latest rows of GET /enterprise/wallet/payouts. */
export const EpRecentPayoutsCard: React.FC<EpRecentPayoutsCardProps> = ({
  onViewAllPayouts,
  onSelectPayout,
  totalPaidOut,
}) => {
  const query = useGetEnterprisePayouts();
  const payouts = (query.data ?? []).map(walletPayout);
  return (
    <div
      className="rounded-2xl p-5 border bg-white shadow-sm space-y-4"
      style={{ borderColor: colors.border }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900">Recent Payouts</h3>
            <p className="text-[11px] text-slate-500">Withdrawals to bank account</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onViewAllPayouts}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5 hover:underline"
        >
          View All <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <EpQueryState pending={query.isPending} error={query.error} retry={query.refetch} />
      {query.isSuccess && !payouts.length && <AppEmptyState title="No Recent Payouts" description="Your payout requests will appear here." />}
      <div className="divide-y divide-slate-100">
        {payouts.slice(0, 4).map((payout) => {
          const isPaid = /success|paid|complete/i.test(payout.status);
          const isPending = /pending|process/i.test(payout.status);

          return (
            <div
              key={payout.id}
              onClick={() => onSelectPayout?.(payout)}
              className="py-2.5 flex items-center justify-between hover:bg-slate-50/70 rounded-lg px-1.5 transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs ${
                    isPaid
                      ? "bg-emerald-50 text-emerald-600"
                      : isPending
                      ? "bg-amber-50 text-amber-600"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {isPaid ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isPending ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-800">
                    {payout.amountFormatted}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {payout.date} · {payout.account}
                  </div>
                </div>
              </div>

              <span
                className={`shrink-0 inline-block px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                  isPaid
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : isPending
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
              >
                {payout.status}
              </span>
            </div>
          );
        })}
      </div>

      {totalPaidOut && <p className="text-xs font-semibold" style={{ color: colors.textSecondary }}>Total paid out: {totalPaidOut}</p>}
      <button
        type="button"
        onClick={onViewAllPayouts}
        className="w-full py-2 rounded-xl text-center text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 transition"
      >
        View Complete Payout Ledger
      </button>
    </div>
  );
};
