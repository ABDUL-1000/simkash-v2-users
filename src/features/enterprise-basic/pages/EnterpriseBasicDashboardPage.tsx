import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Layers } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { useEnterpriseBasicState } from "../hooks/useEnterpriseBasicState";
import { InstalmentAlertBanner } from "../components/InstalmentAlertBanner";
import { EbPrimaryMetricCards } from "../components/EbPrimaryMetricCards";
import { EbSecondaryMetricCards } from "../components/EbSecondaryMetricCards";
import { CommissionPnLOverviewCard } from "../components/CommissionPnLOverviewCard";
import { EbQuickActionShortcuts } from "../components/EbQuickActionShortcuts";
import { EbRecentSalesList } from "../components/EbRecentSalesList";
import { EbBalanceStatusCard } from "../components/EbBalanceStatusCard";
import { EbWalletSidebarCard } from "../components/EbWalletSidebarCard";
import { RelationshipManagerCard } from "../components/RelationshipManagerCard";
import { StrategicBenefitsCard } from "../components/StrategicBenefitsCard";
import { EbAllTimePnLCard } from "../components/EbAllTimePnLCard";
import { PrivateLabelBrandingCard } from "../components/PrivateLabelBrandingCard";
import { EbSalesByTypeCard } from "../components/EbSalesByTypeCard";
import { EbActivityFeedCard } from "../components/EbActivityFeedCard";
import { EbModalsManager } from "../components/EbModalsManager";

export const EnterpriseBasicDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    paymentModel,
    setPaymentModel,
    metrics,
    sales,
    instalmentSchedule,
    modalState,
    updateModalState,
    handleAssignSim,
    handlePayInstalment,
    handleRequestPayout,
  } = useEnterpriseBasicState();

  const isUpfront = paymentModel === "upfront";

  return (
    <div className="space-y-6 pb-12">
      {/* Top PageHeader */}
      <PageHeader
        title="Dashboard"
        description="Welcome back! Monitor your stock, sales margin, and inventory orders."
        actions={[
          {
            key: "notifications",
            label: "Notifications",
            icon: (
              <div className="relative">
                <Bell className="w-4 h-4" />
                <div className="w-2 h-2 rounded-full bg-red-500 absolute -top-1 -right-1 ring-2 ring-white" />
              </div>
            ),
            variant: "default",
            onClick: () => updateModalState({ isOpenNotifications: true }),
          },
          {
            key: "toggle_model",
            label: isUpfront ? "Model: Upfront (100%)" : "Model: Financed (Instalments)",
            icon: <Layers className="w-4 h-4" />,
            style: { backgroundColor: isUpfront ? "#1E3A5F" : "#F59E0B", color: "#FFFFFF" },
            onClick: () => setPaymentModel(isUpfront ? "financed" : "upfront"),
          },
        ]}
      />

      {/* Financed Top Instalment Alert Banner */}
      {!isUpfront && (
        <InstalmentAlertBanner
          amount={metrics.nextInstalmentAmount}
          dueDate={metrics.nextInstalmentDate}
          onPayNow={() => updateModalState({ isOpenInstalment: true })}
        />
      )}

      {/* Primary 4 Metric Cards */}
      <EbPrimaryMetricCards
        metrics={metrics}
        paymentModel={paymentModel}
        onPayInstalment={() => updateModalState({ isOpenInstalment: true })}
      />

      {/* Secondary 4 Metric Cards */}
      <EbSecondaryMetricCards metrics={metrics} paymentModel={paymentModel} />

      {/* Commission Table — P&L Overview Card */}
      <CommissionPnLOverviewCard
        onViewFullTable={() => updateModalState({ isOpenPnLSummary: true })}
      />

      {/* 6 Quick Action Shortcuts */}
      <EbQuickActionShortcuts
        onAssignSim={() => updateModalState({ isOpenAssignSim: true })}
        onMyCustomers={() => navigate(appPaths.rmCustomers)}
        onOrderStock={() => navigate(appPaths.enterpriseProOrderMoreSims)}
        onSellCctv={() => updateModalState({ isOpenAssignSim: true })}
        onSellSolar={() => updateModalState({ isOpenAssignSim: true })}
        onPayout={() => updateModalState({ isOpenPayout: true })}
      />

      {/* 2-Column Responsive Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Main (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <EbRecentSalesList
            sales={sales}
            onViewAll={() => updateModalState({ isOpenPnLSummary: true })}
          />

          <EbBalanceStatusCard
            paymentModel={paymentModel}
            balanceRemaining={metrics.balanceRemaining}
            balancePaid={metrics.balancePaid}
            schedule={instalmentSchedule}
            onPayInstalment={() => updateModalState({ isOpenInstalment: true })}
          />
        </div>

        {/* Right Sidebar (1 col) */}
        <div className="lg:col-span-1 space-y-6">
          <EbWalletSidebarCard
            balance={metrics.walletBalance}
            onRequestPayout={() => updateModalState({ isOpenPayout: true })}
          />

          {isUpfront ? (
            <>
              <RelationshipManagerCard />
              <StrategicBenefitsCard />
              <EbAllTimePnLCard />
              <PrivateLabelBrandingCard />
            </>
          ) : (
            <>
              <EbAllTimePnLCard />
              <EbSalesByTypeCard />
              <EbActivityFeedCard />
            </>
          )}
        </div>
      </div>

      {/* Central Modals Manager */}
      <EbModalsManager
        state={modalState}
        onUpdateState={updateModalState}
        walletBalance={metrics.walletBalance}
        balanceRemaining={metrics.balanceRemaining}
        balancePaid={metrics.balancePaid}
        onConfirmPayment={handlePayInstalment}
        onRequestPayout={handleRequestPayout}
        onAssignSim={handleAssignSim}
      />
    </div>
  );
};

export default EnterpriseBasicDashboardPage;
