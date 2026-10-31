import { useGetEnterpriseWalletOverview, useExportEnterpriseTransactions } from "../api/useEnterpriseWallet";
import { EpQueryState } from "../../components/EpQueryState";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { ArrowUpRight, ArrowDownToLine, FileText } from "lucide-react";
import { EpWalletBalanceHero } from "../components/EpWalletBalanceHero";
import { EpWalletMetricCards } from "../components/EpWalletMetricCards";
import { EpTransactionHistoryList } from "../components/EpTransactionHistoryList";
import { EpPayoutAccountCard } from "../components/EpPayoutAccountCard";
import { EpRecentPayoutsCard } from "../components/EpRecentPayoutsCard";
import { WalletModalsHub } from "../components/WalletModalsHub";
import { useWalletModals } from "../hooks/useWalletModals";

export const MyEnterpriseWalletPage: React.FC = () => {
  // Deep link from the dashboard: ?payout=1
  const [params, setParams] = useSearchParams();
  const modals = useWalletModals(params.get("payout") === "1");
  const overview = useGetEnterpriseWalletOverview();
  const exporter = useExportEnterpriseTransactions();
  if (overview.isPending || overview.isError) return <EpQueryState pending={overview.isPending} error={overview.error} retry={overview.refetch} />;
  if (!overview.data?.balance_card) return <AppEmptyState title="No Enterprise Wallet Data" description="Your wallet data is not available yet." />;
  const { balance_card: balance, stats_cards: stats } = overview.data;
  const downloadStatement = () => exporter.mutate({ category: "all" });
  const noProfit = !balance.profit_balance;

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <PageHeader
        title="My Enterprise Wallet"
        description="Profit balance, spendable wallet balance, transaction history and bank withdrawals."
        extra={
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              disabled={exporter.isPending || balance.actions?.can_download_statement === false}
              onClick={downloadStatement}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition shadow-xs disabled:opacity-50"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Statement</span>
            </button>
            <button
              type="button"
              disabled={balance.actions?.can_withdraw_profit === false || noProfit}
              onClick={() => modals.setWithdrawOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-semibold transition shadow-xs disabled:opacity-50"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
              <span>Withdraw to Wallet</span>
            </button>
            <button
              type="button"
              disabled={balance.actions?.can_request_payout === false || noProfit}
              onClick={() => modals.setPayoutModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm disabled:opacity-50"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Request Payout</span>
            </button>
          </div>
        }
      />

      {/* Main Balance Hero with Eye Toggle & Action Pills */}
      <EpWalletBalanceHero
        balance={balance}
        onRequestPayout={() => modals.setPayoutModalOpen(true)}
        onWithdrawProfit={() => modals.setWithdrawOpen(true)}
        onStatement={downloadStatement}
        statementLoading={exporter.isPending}
      />

      {/* Metrics Strip */}
      {stats && <EpWalletMetricCards cards={stats} />}

      {/* 2-Column Responsive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (Transactions Ledger) */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <EpTransactionHistoryList onSelectTransaction={modals.setSelectedTxn} />
        </div>

        {/* Right Column (Bank Account & Payouts) */}
        <div className="space-y-6 min-w-0">
          <EpPayoutAccountCard
            onChangeBankAccount={() => modals.setChangeBankOpen(true)}
          />
          <EpRecentPayoutsCard
            totalPaidOut={stats?.total_paid_out?.formatted}
            onViewAllPayouts={() => modals.setAllPayoutsOpen(true)}
            onSelectPayout={modals.handleSelectPayoutFromLedger}
          />
        </div>
      </div>

      {/* Modal Dialog Hub */}
      <WalletModalsHub modals={modals} onPayoutClose={() => { if (params.get("payout")) setParams({}, { replace: true }); }} />
    </div>
  );
};

export default MyEnterpriseWalletPage;
