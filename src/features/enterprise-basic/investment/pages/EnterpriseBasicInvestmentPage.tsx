import React, { useState } from "react";
import { Download, Layers } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { useEbInvestmentState } from "../hooks/useEbInvestmentState";
import { EbInvestmentUpgradeBanner } from "../components/EbInvestmentUpgradeBanner";
import { EbInvestmentHeaderCards } from "../components/EbInvestmentHeaderCards";
import { EbBalanceStatusStrip } from "../components/EbBalanceStatusStrip";
import { EbInvestmentTabsNav } from "../components/EbInvestmentTabsNav";
import { EbOverviewTabView } from "../components/OverviewTab/EbOverviewTabView";
import { EbPayDownBalanceTabView } from "../components/PayDownBalanceTab/EbPayDownBalanceTabView";
import { EbInvestmentModalsManager } from "../modals/EbInvestmentModalsManager";
import { CommissionPnLSummaryModal } from "../../modals/CommissionPnLSummaryModal";
import { AssignSimModal } from "../../modals/AssignSimModal";
import type { AccountTier } from "../types";

export const EnterpriseBasicInvestmentPage: React.FC = () => {
  const {
    accountTier,
    setAccountTier,
    activeTab,
    setActiveTab,
    overview,
    walletBalance,
    balanceRemaining,
    balancePaid,
    instalmentSchedule,
    recentPayments,
    simPnLList,
    modalState,
    updateModalState,
    handlePayInstalment,
    handlePayExtra,
    handleOpenSimDetail,
  } = useEbInvestmentState();

  const [isOpenCommissionModal, setIsOpenCommissionModal] = useState(false);
  const [isOpenAssignSimModal, setIsOpenAssignSimModal] = useState(false);

  const tierCycleMap: Record<AccountTier, { next: AccountTier; label: string }> = {
    starter_upfront: { next: "financed", label: "Tier: Starter Upfront (₦250K)" },
    financed: { next: "strategic_upfront", label: "Tier: Financed Debt (₦10M)" },
    strategic_upfront: { next: "starter_upfront", label: "Tier: Strategic Upfront (₦1.05M+)" },
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top PageHeader */}
      <PageHeader
        title="My Investment"
        description="Track your principal investment, P&L and balance repayment schedule"
        actions={[
          {
            key: "export",
            label: "Export Report",
            icon: <Download className="w-4 h-4" />,
            variant: "default",
            onClick: () => updateModalState({ isOpenExport: true }),
          },
          {
            key: "tier_switch",
            label: tierCycleMap[accountTier].label,
            icon: <Layers className="w-4 h-4" />,
            style: { backgroundColor: "#1E3A5F", color: "#FFFFFF" },
            onClick: () => {
              const nextTier = tierCycleMap[accountTier].next;
              setAccountTier(nextTier);
              if (nextTier !== "financed" && activeTab === "pay_down") {
                setActiveTab("overview");
              }
            },
          },
        ]}
      />

      {/* Top Dynamic Upgrade Banner */}
      <EbInvestmentUpgradeBanner accountTier={accountTier} />

      {/* Primary KPI Header Cards */}
      <EbInvestmentHeaderCards overview={overview} accountTier={accountTier} />

      {/* Financed Balance Status Strip */}
      {accountTier === "financed" && (
        <EbBalanceStatusStrip
          balancePaid={balancePaid}
          balanceRemaining={balanceRemaining}
          onPayDownClick={() => setActiveTab("pay_down")}
        />
      )}

      {/* Sub-Tabs Nav */}
      <div className="flex items-center justify-between">
        <EbInvestmentTabsNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          accountTier={accountTier}
          onOpenCommissionTable={() => setIsOpenCommissionModal(true)}
        />
      </div>

      {/* Active Tab View */}
      {activeTab === "overview" && (
        <EbOverviewTabView
          overview={overview}
          accountTier={accountTier}
          simList={simPnLList}
          instalmentSchedule={instalmentSchedule}
          balanceRemaining={balanceRemaining}
          onSelectSim={handleOpenSimDetail}
          onViewPayDownTab={() => setActiveTab("pay_down")}
          onPayNextInstalment={() => updateModalState({ isOpenConfirmInstalment: true })}
          onOrderStock={() => setIsOpenAssignSimModal(true)}
          onDownloadStatement={() => updateModalState({ isOpenExport: true })}
        />
      )}

      {activeTab === "pay_down" && (
        <EbPayDownBalanceTabView
          balanceRemaining={balanceRemaining}
          balancePaid={balancePaid}
          totalPrincipal={overview.principalInvested}
          schedule={instalmentSchedule}
          recentPayments={recentPayments}
          onPayNextInstalment={() => updateModalState({ isOpenConfirmInstalment: true })}
          onPayFullBalance={() => updateModalState({ isOpenConfirmExtra: true })}
          onDownloadStatement={() => updateModalState({ isOpenExport: true })}
        />
      )}

      {/* Investment Modals Coordinator */}
      <EbInvestmentModalsManager
        state={modalState}
        onUpdateState={updateModalState}
        walletBalance={walletBalance}
        balanceRemaining={balanceRemaining}
        onConfirmInstalment={handlePayInstalment}
        onConfirmExtra={handlePayExtra}
        onViewBalanceTab={() => setActiveTab("pay_down")}
        onAssignSim={() => {
          updateModalState({ isOpenSimDetail: false });
          setIsOpenAssignSimModal(true);
        }}
      />

      {/* Shared Modals */}
      <CommissionPnLSummaryModal
        open={isOpenCommissionModal}
        onOpenChange={setIsOpenCommissionModal}
      />

      <AssignSimModal
        open={isOpenAssignSimModal}
        onOpenChange={setIsOpenAssignSimModal}
        onAssignSubmitted={() => setIsOpenAssignSimModal(false)}
      />
    </div>
  );
};

export default EnterpriseBasicInvestmentPage;
