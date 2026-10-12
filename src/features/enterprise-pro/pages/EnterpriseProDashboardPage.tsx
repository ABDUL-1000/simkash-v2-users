import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import { useGetEnterpriseOverview } from "../api/useGetEnterpriseOverview";
import { EpQueryState } from "../components/EpQueryState";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import type { SimOrderDraft } from "../types";
import { EpMetricsHeader } from "../components/EpMetricsHeader";
import { EpCommissionTable } from "../components/EpCommissionTable";
import { EpQuickActionToolbar } from "../components/EpQuickActionToolbar";
import { EpInvestmentChartCard } from "../components/EpInvestmentChartCard";
import { EpNetworkMiniOverview } from "../components/EpNetworkMiniOverview";
import { EpBalancePayoffCard } from "../components/EpBalancePayoffCard";
import { EpReinvestCard } from "../components/EpReinvestCard";
import { EpRoiProjectionCard } from "../components/EpRoiProjectionCard";
import { EpAccountManagerCard } from "../components/EpAccountManagerCard";
import { EpRecentOrdersCard } from "../components/EpRecentOrdersCard";

import { RoiAnalysisModal } from "../modals/RoiAnalysisModal";
import { ContactAccountManagerModal } from "../modals/ContactAccountManagerModal";
import { EpNotificationsModal } from "../modals/EpNotificationsModal";
import { MyNetworkOverviewModal } from "../modals/MyNetworkOverviewModal";
import { SetRetailPricesModal } from "../modals/SetRetailPricesModal";
import { PayDownBalanceModal } from "../modals/PayDownBalanceModal";
import { OrderMoreSimsModal } from "../modals/OrderMoreSimsModal";
import { ConfirmSimOrderModal } from "../modals/ConfirmSimOrderModal";
import { ReinvestEarningsModal } from "../modals/ReinvestEarningsModal";
import { Bell, Phone } from "lucide-react";

export function EnterpriseProDashboardPage() {
  const { user, profile } = useGetAuthUser();
  const displayName = profile?.fullname || user?.username || "Enterprise Partner";

  const overview = useGetEnterpriseOverview();

  // Modal States
  const [showRoi, setShowRoi] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showNetwork, setShowNetwork] = useState(false);
  const [showPrices, setShowPrices] = useState(false);
  const [showPayDown, setShowPayDown] = useState(false);
  const [showOrderSims, setShowOrderSims] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [showReinvest, setShowReinvest] = useState(false);

  const [orderDraft, setOrderDraft] = useState<SimOrderDraft>({
    simType: "POS SIM",
    quantity: 100,
    unitCost: 0,
    retailPrice: 0,
    totalCost: 0,
    paymentSource: "wallet",
  });

  const handlePreviewOrder = (draft: SimOrderDraft) => {
    setOrderDraft(draft);
    setShowOrderSims(false);
    setShowReinvest(false);
    setShowConfirmOrder(true);
  };

  if (overview.isPending || overview.isError) return <EpQueryState pending={overview.isPending} error={overview.error} retry={overview.refetch} />;
  if (!overview.data) return <AppEmptyState title="No Enterprise Data" description="Your enterprise dashboard data is not available yet." />;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title={`Welcome back, ${overview.data.enterprise_profile.name || displayName}`}
        description="Manage your regional investment, SIM inventory, pricing margins, and State Coordinator network"
        actions={[
          {
            key: "notifications",
            variant: "outline",
            render: () => (
              <button
                type="button"
                onClick={() => setShowNotifications(true)}
                className="relative flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition"
              >
                <Bell className="size-4" />
                <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                  0
                </span>
              </button>
            ),
          },
          {
            key: "contact-manager",
            label: "Contact Manager",
            icon: <Phone className="size-4" />,
            onClick: () => setShowContact(true),
          },
        ]}
      />

      {/* KPI Metrics Strip */}
      <EpMetricsHeader
        overview={overview.data}
        onOrderMore={() => setShowOrderSims(true)}
        onReinvest={() => setShowReinvest(true)}
        onPayDown={() => setShowPayDown(true)}
        onViewRoi={() => setShowRoi(true)}
      />

      {/* Commission Table */}
      <EpCommissionTable onViewFullTable={() => setShowNetwork(true)} />

      {/* Quick Action Toolbar */}
      <EpQuickActionToolbar
        onMyInvestment={() => setShowRoi(true)}
        onReinvest={() => setShowReinvest(true)}
        onPayBalance={() => setShowPayDown(true)}
        onOrderSims={() => setShowOrderSims(true)}
        onSetPrices={() => setShowPrices(true)}
        onMyNetwork={() => setShowNetwork(true)}
      />

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          <EpInvestmentChartCard />
          <EpNetworkMiniOverview onViewAll={() => setShowNetwork(true)} />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-6">
          <EpBalancePayoffCard balance={overview.data.balance_card} onPayDown={() => setShowPayDown(true)} />
          <EpReinvestCard
            overview={overview.data}
            onOrderMore={() => setShowReinvest(true)}
            onPayDown={() => setShowPayDown(true)}
          />
          <EpRoiProjectionCard />
          <EpAccountManagerCard onContact={() => setShowContact(true)} />
          <EpRecentOrdersCard />
        </div>
      </div>

      {/* 9 Reusable Modals */}
      <RoiAnalysisModal
        open={showRoi}
        onOpenChange={setShowRoi}
        onContactManager={() => setShowContact(true)}
      />
      <ContactAccountManagerModal open={showContact} onOpenChange={setShowContact} />
      <EpNotificationsModal open={showNotifications} onOpenChange={setShowNotifications} />
      <MyNetworkOverviewModal open={showNetwork} onOpenChange={setShowNetwork} />
      <SetRetailPricesModal open={showPrices} onOpenChange={setShowPrices} />
      <PayDownBalanceModal
        open={showPayDown}
        onOpenChange={setShowPayDown}
      />
      <OrderMoreSimsModal
        open={showOrderSims}
        onOpenChange={setShowOrderSims}
        onPreviewOrder={handlePreviewOrder}
      />
      <ConfirmSimOrderModal
        open={showConfirmOrder}
        onOpenChange={setShowConfirmOrder}
        order={orderDraft}
        onEdit={() => {
          setShowConfirmOrder(false);
          setShowOrderSims(true);
        }}
      />
      <ReinvestEarningsModal
        open={showReinvest}
        onOpenChange={setShowReinvest}
        onPreviewOrder={handlePreviewOrder}
      />
    </div>
  );
}

export default EnterpriseProDashboardPage;
