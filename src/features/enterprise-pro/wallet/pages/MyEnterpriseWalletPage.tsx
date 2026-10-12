import { useGetEnterpriseWalletOverview } from "../api/useGetEnterpriseWalletOverview";
import { EpQueryState } from "../../components/EpQueryState";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { useState } from "react";
import type { SimOrderDraft } from "../../types";
import { OrderMoreSimsModal } from "../../modals/OrderMoreSimsModal";
import { ConfirmSimOrderModal } from "../../modals/ConfirmSimOrderModal";
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
  const overview = useGetEnterpriseWalletOverview();
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderDraft, setOrderDraft] = useState<SimOrderDraft | null>(null);
  if (overview.isPending || overview.isError) return <EpQueryState pending={overview.isPending} error={overview.error} retry={overview.refetch} />;
  if (!overview.data) return <AppEmptyState title="No Enterprise Wallet Data" description="Your wallet data is not available yet." />;

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
        hero={overview.data.hero_balance_card}
        onRequestPayout={() => modals.setPayoutModalOpen(true)}
        onReinvest={() => modals.setReinvestSelectOpen(true)}
        onPayBalance={() => modals.setPayBalanceOpen(true)}
        onOrderSims={() => setOrderOpen(true)}
        onStatement={() => modals.setStatementModalOpen(true)}
      />

      {/* Amber Debt Alert Banner */}
      <EpBalanceWarningBanner
        banner={overview.data.balance_warning_banner}
        onPayDown={() => modals.setPayBalanceOpen(true)}
      />

      {/* 4-Card Metrics Strip */}
      <EpWalletMetricCards cards={overview.data.middle_kpi_cards} />

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
            banner={overview.data.balance_warning_banner}
            onPayBalance={() => modals.setPayBalanceOpen(true)}
          />
        </div>
      </div>

      <OrderMoreSimsModal open={orderOpen} onOpenChange={setOrderOpen} onPreviewOrder={draft => { setOrderDraft(draft); setOrderOpen(false); }} />
      {orderDraft && <ConfirmSimOrderModal open onOpenChange={open => { if (!open) setOrderDraft(null); }} order={orderDraft} onEdit={() => { setOrderDraft(null); setOrderOpen(true); }} />}
      {/* Modal Dialog Hubs */}
      <WalletModalsHub modals={modals} />
      <WalletSecondaryModalsHub modals={modals} />
    </div>
  );
};

export default MyEnterpriseWalletPage;
