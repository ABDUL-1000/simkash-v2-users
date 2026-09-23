import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import {
  mockEbWalletSummary,
  mockEbTransactions,
} from "../data/mockEbWalletData";
import { EbWalletHeroCard } from "../components/EbWalletHeroCard";
import { EbWalletMetricCards } from "../components/EbWalletMetricCards";
import { EbWalletTransactionTable } from "../components/EbWalletTransactionTable";
import { EbWalletSidebarWidgets } from "../components/EbWalletSidebarWidgets";
import { EbWalletPayoutModal } from "../modals/EbWalletPayoutModal";
import { AssignSimModal } from "../../modals/AssignSimModal";

export const EnterpriseBasicWalletPage: React.FC = () => {
  const navigate = useNavigate();
  const [walletSummary, setWalletSummary] = useState(mockEbWalletSummary);
  const [transactions, setTransactions] = useState(mockEbTransactions);

  const [isOpenPayoutModal, setIsOpenPayoutModal] = useState(false);
  const [isOpenAssignModal, setIsOpenAssignModal] = useState(false);

  const handlePayoutSubmitted = (amount: number) => {
    setWalletSummary((prev) => ({
      ...prev,
      availableBalance: Math.max(0, prev.availableBalance - amount),
      totalPaidOut: prev.totalPaidOut + amount,
    }));
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        type: "payout",
        title: "Distributor Wallet Withdrawal",
        subtitle: "First Bank · ****4521",
        amount: -amount,
        date: "Just now",
        status: "completed",
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top PageHeader */}
      <PageHeader
        title="My Wallet"
        description="Monitor your direct distributor retail margin earnings, stock reorders, and bank withdrawals."
        actions={[
          {
            key: "request_payout",
            label: "Request Payout",
            icon: <ArrowUpRight className="w-4 h-4" />,
            variant: "default",
            onClick: () => setIsOpenPayoutModal(true),
          },
        ]}
      />

      {/* Top Upgrade Banner */}
      <div className="w-full bg-[#FEF9C3] border border-[#FDE047] rounded-2xl px-4 py-2.5 flex items-center justify-between text-xs text-amber-900 shadow-xs">
        <div className="flex items-center gap-2 font-medium">
          <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Upgrade to Premium Distributor</strong> for instalment payments & better pricing
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigate(appPaths.enterpriseBasicInvestment)}
          className="font-bold text-amber-700 hover:text-amber-800 text-xs"
        >
          Learn More →
        </button>
      </div>

      {/* Wallet Balance Hero Card */}
      <EbWalletHeroCard
        summary={walletSummary}
        onRequestPayout={() => setIsOpenPayoutModal(true)}
        onAssignUnit={() => setIsOpenAssignModal(true)}
        onOrderUnits={() => navigate(appPaths.enterpriseBasicInventory)}
        onSetPrices={() => navigate(appPaths.enterpriseBasicPricing)}
        onStatement={() => {}}
      />

      {/* 4 Metric Cards */}
      <EbWalletMetricCards summary={walletSummary} />

      {/* 2-Column Responsive Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <EbWalletTransactionTable transactions={transactions} />
        </div>

        {/* Right Column (1 col) */}
        <div className="lg:col-span-1 space-y-6">
          <EbWalletSidebarWidgets
            onUpgradeClick={() => navigate(appPaths.enterpriseBasicInvestment)}
          />
        </div>
      </div>

      {/* Modals */}
      <EbWalletPayoutModal
        open={isOpenPayoutModal}
        onOpenChange={setIsOpenPayoutModal}
        availableBalance={walletSummary.availableBalance}
        onPayoutSubmitted={handlePayoutSubmitted}
      />

      <AssignSimModal
        open={isOpenAssignModal}
        onOpenChange={setIsOpenAssignModal}
        onAssignSubmitted={() => setIsOpenAssignModal(false)}
      />
    </div>
  );
};

export default EnterpriseBasicWalletPage;
