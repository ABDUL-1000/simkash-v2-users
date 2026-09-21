import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { ArrowUpRight, Repeat, FileText } from "lucide-react";
import { EpWalletBalanceHero } from "../components/EpWalletBalanceHero";
import { EpBalanceWarningBanner } from "../components/EpBalanceWarningBanner";
import { EpWalletMetricCards } from "../components/EpWalletMetricCards";
import { EpTransactionHistoryList } from "../components/EpTransactionHistoryList";
import { EpPayoutAccountCard } from "../components/EpPayoutAccountCard";
import { EpMonthlyEarningsChart } from "../components/EpMonthlyEarningsChart";
import { EpRecentPayoutsCard } from "../components/EpRecentPayoutsCard";
import { EpWalletActivitySummary } from "../components/EpWalletActivitySummary";
import { EpDebtSummarySidebar } from "../components/EpDebtSummarySidebar";
import { WalletModalsHub } from "../components/WalletModalsHub";
import { WalletSecondaryModalsHub } from "../components/WalletSecondaryModalsHub";
import { useWalletModals } from "../hooks/useWalletModals";

export const MyEnterpriseWalletPage: React.FC = () => {
  const modals = useWalletModals();

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <PageHeader
        title="My Enterprise Wallet"
        description="Isolated enterprise wallet balance, automated margin yield, reinvestments, debt amortizations, and corporate bank withdrawals."
        extra={
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => modals.setStatementModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Statement</span>
            </button>
            <button
              type="button"
              onClick={() => modals.setReinvestSelectOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-semibold transition shadow-xs"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Reinvest</span>
            </button>
            <button
              type="button"
              onClick={() => modals.setPayoutModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Request Payout</span>
            </button>
          </div>
        }
      />

      {/* Main Balance Hero with Eye Toggle & Action Pills */}
      <EpWalletBalanceHero
        onRequestPayout={() => modals.setPayoutModalOpen(true)}
        onReinvest={() => modals.setReinvestSelectOpen(true)}
        onPayBalance={() => modals.setPayBalanceOpen(true)}
        onOrderSims={() => modals.handleStartReinvest("sim-stock", 500_000)}
        onStatement={() => modals.setStatementModalOpen(true)}
      />

      {/* Amber Debt Alert Banner */}
      <EpBalanceWarningBanner
        onPayDown={() => modals.setPayBalanceOpen(true)}
      />

      {/* 4-Card Metrics Strip */}
      <EpWalletMetricCards />

      {/* 2-Column Responsive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (Transactions Ledger) */}
        <div className="lg:col-span-2 space-y-6">
          <EpTransactionHistoryList
            onSelectTransaction={modals.handleSelectTransaction}
            onDownloadStatement={() => modals.setStatementModalOpen(true)}
          />
        </div>

        {/* Right Column (Bank Account, Earnings, Activity & Debt) */}
        <div className="space-y-6">
          <EpPayoutAccountCard
            onChangeBankAccount={() => modals.setChangeBankOpen(true)}
          />
          <EpMonthlyEarningsChart />
          <EpRecentPayoutsCard
            onViewAllPayouts={() => modals.setAllPayoutsOpen(true)}
            onSelectPayout={(payout) => modals.handleSelectPayoutFromLedger(payout)}
          />
          <EpWalletActivitySummary />
          <EpDebtSummarySidebar
            onPayBalance={() => modals.setPayBalanceOpen(true)}
          />
        </div>
      </div>

      {/* Modal Dialog Hubs */}
      <WalletModalsHub modals={modals} />
      <WalletSecondaryModalsHub modals={modals} />
    </div>
  );
};

export default MyEnterpriseWalletPage;
