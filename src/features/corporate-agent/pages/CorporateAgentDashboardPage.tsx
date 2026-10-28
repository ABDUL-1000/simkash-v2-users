import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { PageHeader } from "@/components/common/PageHeader";
import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { APP_COLORS } from "@/constants/colors";
import { useGetCaDashboardOverview } from "../api/useGetCaDashboardOverview";
import { CaQueryState } from "../components/CaQueryState";
import { CaHeaderTopKpiRow } from "../components/CaHeaderTopKpiRow";
import { CaSecondaryKpiCards } from "../components/CaSecondaryKpiCards";
import { CaBonusTrackerCard } from "../components/CaBonusTrackerCard";
import { CaQuickActionsRow } from "../components/CaQuickActionsRow";
import { CaRecentActivationsCard } from "../components/CaRecentActivationsCard";
import { CaCommissionThisMonthCard } from "../components/CaCommissionThisMonthCard";
import { CaSimInventoryCard } from "../components/CaSimInventoryCard";
import { caDistributePath, caOnboardPath, caPayoutPath, caRequestStockPath } from "../utils/caLinks";
import "../components/ca-dashboard.css";

/**
 * Dashboard reads only GET /dashboard/overview and GET /dashboard/recent-activations.
 * Distribute / request stock / onboard / payout route to the inventory, agency-partner and wallet pages that own those APIs.
 */
export default function CorporateAgentDashboardPage() {
  const navigate = useNavigate();
  const overview = useGetCaDashboardOverview();
  const [activationsOpen, setActivationsOpen] = useState(false);
  const [feedFilter, setFeedFilter] = useState<"all" | "mine">("all");
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const data = overview.data;
  const canPayout = Boolean(data?.top_cards.my_commission.can_request_payout && data.top_cards.my_commission.amount > 0 && !overview.error);
  const goDistribute = () => navigate(caDistributePath());
  const goRequestStock = () => navigate(caRequestStockPath());
  const goPayout = () => navigate(caPayoutPath());
  const goOnboard = () => navigate(caOnboardPath());
  const goPartners = () => navigate(appPaths.agencyPartner);
  return <div className="min-h-screen pb-16 pt-4 px-4 sm:px-6 lg:px-8 space-y-6" style={{ backgroundColor: APP_COLORS.backgrounds.base }}>
    <PageHeader title="Corporate Agent Dashboard" description="Corporate activations, network oversight, and SIM distribution" actions={[
      { key: "onboard", label: "Onboard AP", onClick: goOnboard },
      { key: "distribute", label: "Distribute Stock", variant: "secondary", onClick: goDistribute },
      { key: "request", label: "Request Stock from Admin", variant: "outline", onClick: goRequestStock },
      { key: "payout", label: "Request Payout", variant: "outline", disabled: !canPayout, onClick: goPayout },
    ]} />
    {/* Mock company/region, notification dot and bonus celebration preview remain commented: the dashboard contract does not provide identity/notifications/bonus-payment history. */}
    <CaQueryState loading={overview.isLoading} error={overview.error} empty={!data} retry={() => void overview.refetch()}>{data && <>
      <CaHeaderTopKpiRow kpis={data.top_cards} onRequestPayout={goPayout} />
      <CaSecondaryKpiCards data={data.secondary_cards} onViewOwnActs={() => { setFeedFilter("mine"); scrollTo("ca-activations"); }} onViewNetworkActs={() => { setFeedFilter("all"); scrollTo("ca-activations"); }} onViewAps={goPartners} onViewBonus={() => scrollTo("ca-bonus")} onViewStock={() => scrollTo("ca-stock")} />
      <div id="ca-bonus"><CaBonusTrackerCard data={data.bonus_tracker} onViewAllAps={goPartners} /></div>
    </>}</CaQueryState>
    <CaQuickActionsRow canPayout={canPayout} onActivateSim={() => navigate(appPaths.caSimActivation)} onViewAps={goPartners} onViewStock={() => navigate(appPaths.caSimInventory)} onDistributeStock={goDistribute} onRequestStock={goRequestStock} onRequestPayout={goPayout} />
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6 min-w-0">
        <div id="ca-activations"><CaRecentActivationsCard key={feedFilter} initialFilter={feedFilter} onViewAll={() => setActivationsOpen(true)} /></div>
        {/* The managed-AP table and "APs needing stock" card are removed: they used /dashboard/agency-partners, which is not part of the
            dashboard contract. The full AP list lives on the Agency Partners page (goPartners). */}
      </div>
      <div className="lg:col-span-5 space-y-6 min-w-0">
        <CaQueryState loading={overview.isLoading} error={overview.error} empty={!data} retry={() => void overview.refetch()}>{data && <><CaCommissionThisMonthCard data={data} onRequestPayout={goPayout} /><div id="ca-stock"><CaSimInventoryCard totalAvailable={data.top_cards.my_stock.total_available} onDistributeStock={goDistribute} onRequestStock={goRequestStock} onViewFullInventory={() => navigate(appPaths.caSimInventory)} /></div></>}</CaQueryState>
        <div className="rounded-2xl border p-4 shadow-xs space-y-3 bg-white" style={{ borderColor: APP_COLORS.greys.stroke }}><PageHeader title="Activity Feed" /><AppEmptyState title="Activity feed unavailable" description="Recent SIM activations are available in the activations panel." />{/* <CaActivityFeedCard /> remains commented: no activity records or activity endpoint in supplied CA dashboard contract. */}</div>
      </div>
    </div>
    {activationsOpen && <AppModal open title="All Activations" size="lg" onOpenChange={open => { if (!open) setActivationsOpen(false); }}><CaRecentActivationsCard /></AppModal>}
  </div>;
}
