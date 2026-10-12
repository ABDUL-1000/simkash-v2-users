import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { PageHeader } from "@/components/common/PageHeader";
import { AppModal } from "@/components/common/AppModal";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { APP_COLORS } from "@/constants/colors";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetCaDashboardOverview } from "../api/useGetCaDashboardOverview";
import { useGetCaManagedPartners } from "../api/useGetCaManagedPartners";
import type { CaManagedPartnerItem } from "../types/api";
import { CaQueryState } from "../components/CaQueryState";
import { CaHeaderTopKpiRow } from "../components/CaHeaderTopKpiRow";
import { CaSecondaryKpiCards } from "../components/CaSecondaryKpiCards";
import { CaBonusTrackerCard } from "../components/CaBonusTrackerCard";
import { CaQuickActionsRow } from "../components/CaQuickActionsRow";
import { CaRecentActivationsCard } from "../components/CaRecentActivationsCard";
import { CaAgencyPartnersTable } from "../components/CaAgencyPartnersTable";
import { CaCommissionThisMonthCard } from "../components/CaCommissionThisMonthCard";
import { CaSimInventoryCard } from "../components/CaSimInventoryCard";
import { CaApsNeedingStockCard } from "../components/CaApsNeedingStockCard";
import { CaDistributeStockModal } from "../Modals/CaDistributeStockModal";
import { OnboardAgencyPartnerModal } from "../Modals/OnboardAgencyPartnerModal";
import { CaDashboardRequestStockModal } from "../Modals/CaDashboardRequestStockModal";
import { CaRequestPayoutModal } from "../Modals/CaRequestPayoutModal";
import "../components/ca-dashboard.css";
type Modal = "distribute" | "onboard" | "request" | "payout" | "activations" | null;
export default function CorporateAgentDashboardPage() {
  const navigate = useNavigate();
  const overview = useGetCaDashboardOverview();
  const pagination = useTablePagination({ initialPageSize: 10 });
  const [search, setSearch] = useState("");
  const partners = useGetCaManagedPartners({ page: pagination.page, limit: pagination.pageSize, search });
  const [modal, setModal] = useState<Modal>(null);
  const [selected, setSelected] = useState<CaManagedPartnerItem>();
  const [allLow, setAllLow] = useState(false);
  const [feedFilter, setFeedFilter] = useState<"all" | "mine">("all");
  const close = () => { setModal(null); setSelected(undefined); setAllLow(false); };
  const distribute = (ap?: CaManagedPartnerItem, all = false) => { setSelected(ap); setAllLow(all); setModal("distribute"); };
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const data = overview.data;
  const canPayout = Boolean(data?.top_cards.my_commission.can_request_payout && data.top_cards.my_commission.amount > 0 && !overview.error);
  return <div className="min-h-screen pb-16 pt-4 px-4 sm:px-6 lg:px-8 space-y-6" style={{ backgroundColor: APP_COLORS.backgrounds.base }}>
    <PageHeader title="Corporate Agent Dashboard" description="Corporate activations, network oversight, and SIM distribution" actions={[
      { key: "onboard", label: "Onboard AP", onClick: () => setModal("onboard") },
      { key: "distribute", label: "Distribute Stock", variant: "secondary", onClick: () => distribute() },
      { key: "request", label: "Request Stock from Admin", variant: "outline", onClick: () => setModal("request") },
      { key: "payout", label: "Request Payout", variant: "outline", disabled: !canPayout, onClick: () => setModal("payout") },
    ]} />
    {/* Mock company/region, notification dot and bonus celebration preview remain commented: the dashboard contract does not provide identity/notifications/bonus-payment history. */}
    <CaQueryState loading={overview.isLoading} error={overview.error} empty={!data} retry={() => void overview.refetch()}>{data && <>
      <CaHeaderTopKpiRow kpis={data.top_cards} onRequestPayout={() => setModal("payout")} />
      <CaSecondaryKpiCards data={data.secondary_cards} onViewOwnActs={() => { setFeedFilter("mine"); scrollTo("ca-activations"); }} onViewNetworkActs={() => { setFeedFilter("all"); scrollTo("ca-activations"); }} onViewAps={() => scrollTo("ca-partners")} onViewBonus={() => scrollTo("ca-bonus")} onViewStock={() => scrollTo("ca-stock")} />
      <div id="ca-bonus"><CaBonusTrackerCard data={data.bonus_tracker} onViewAllAps={() => scrollTo("ca-partners")} /></div>
    </>}</CaQueryState>
    <CaQuickActionsRow canPayout={canPayout} onActivateSim={() => navigate(appPaths.caSimActivation)} onViewAps={() => scrollTo("ca-partners")} onViewStock={() => scrollTo("ca-stock")} onDistributeStock={() => distribute()} onRequestStock={() => setModal("request")} onRequestPayout={() => setModal("payout")} />
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-6 min-w-0">
        <div id="ca-activations"><CaRecentActivationsCard key={feedFilter} initialFilter={feedFilter} onViewAll={() => setModal("activations")} /></div>
        <CaAgencyPartnersTable query={partners} pagination={pagination} onSearch={value => { setSearch(value); pagination.resetPage(); }} onOnboardNewAp={() => setModal("onboard")} onDistributeToAp={ap => distribute(ap)} />
      </div>
      <div className="lg:col-span-5 space-y-6 min-w-0">
        <CaQueryState loading={overview.isLoading} error={overview.error} empty={!data} retry={() => void overview.refetch()}>{data && <><CaCommissionThisMonthCard data={data} onRequestPayout={() => setModal("payout")} /><div id="ca-stock"><CaSimInventoryCard totalAvailable={data.top_cards.my_stock.total_available} onDistributeStock={() => distribute()} onRequestStock={() => setModal("request")} onViewFullInventory={() => navigate(appPaths.caSimInventory)} /></div></>}</CaQueryState>
        <CaQueryState loading={partners.isLoading} error={partners.error} retry={() => void partners.refetch()}><CaApsNeedingStockCard partners={partners.data?.partners ?? []} onDistributeToAll={() => distribute(undefined, true)} onDistributeToAp={ap => distribute(ap)} /></CaQueryState>
        <div className="rounded-2xl border p-4 shadow-xs space-y-3 bg-white" style={{ borderColor: APP_COLORS.greys.stroke }}><PageHeader title="Activity Feed" /><AppEmptyState title="Activity feed unavailable" description="Recent SIM activations are available in the activations panel." />{/* <CaActivityFeedCard /> remains commented: no activity records or activity endpoint in supplied CA dashboard contract. */}</div>
      </div>
    </div>
    {modal === "distribute" && <CaDistributeStockModal target={selected} allLow={allLow} available={data?.top_cards.my_stock.total_available} onClose={close} />}
    {modal === "onboard" && <OnboardAgencyPartnerModal available={data?.top_cards.my_stock.total_available} onClose={close} />}
    {modal === "request" && <CaDashboardRequestStockModal onClose={close} />}
    {modal === "payout" && data && <CaRequestPayoutModal balance={data.top_cards.my_commission.amount} allowed={canPayout} onClose={close} />}
    {modal === "activations" && <AppModal open title="All Activations" size="lg" onOpenChange={open => { if (!open) close(); }}><CaRecentActivationsCard /></AppModal>}
  </div>;
}
