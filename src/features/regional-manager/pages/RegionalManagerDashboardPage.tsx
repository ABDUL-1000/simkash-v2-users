import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { PageHeader, type PageHeaderAction } from "@/components/common/PageHeader";
import { useGetRmDashboardOverview } from "../api/dashboard";
import type { RmTarget } from "../types/dashboard";
import { RmQueryState } from "../components/dashboard/RmDashboardPrimitives";
import { RmDashboardMetrics } from "../components/dashboard/RmDashboardMetrics";
import { RmDashboardWidgets } from "../components/dashboard/RmDashboardWidgets";
import { RmCoordinatorsTable } from "../components/dashboard/RmCoordinatorsTable";
import { RmRecentActivityFeed } from "../components/dashboard/RmRecentActivityFeed";
import { RmAdminStockModal, RmDistributeModal, RmRedistributeModal } from "../Modals/dashboard/RmStockModals";
import { RmOnboardScForm, RmReminderForm } from "../Modals/dashboard/RmPeopleModals";
// import { RmPayoutForm } from "../Modals/dashboard/RmPeopleModals"; // Legacy amount-only form; dedicated wallet now handles PIN payouts.
import { RmCoordinatorDrawer } from "../Modals/dashboard/RmCoordinatorDrawer";

type DashboardAction = { type: "onboard" | "request" | "redistribute" | "payout" } | { type: "distribute"; target?: RmTarget } | { type: "remind"; target: RmTarget };
export function RegionalManagerDashboardPage() {
  const query = useGetRmDashboardOverview();
  const navigate = useNavigate();
  const data = query.data;
  const [modal, setModal] = useState<DashboardAction | null>(null);
  const [coordinator, setCoordinator] = useState<RmTarget | null>(null);
  const close = () => setModal(null);
  const actions: PageHeaderAction[] = [
    { key: "wallet", label: "RM Wallet", variant: "outline", onClick: () => navigate(appPaths.rmWallet) },
    { key: "territory", label: "My coordinators", variant: "outline", onClick: () => navigate(appPaths.rmStateCoordinators) },
    { key: "inventory", label: "SIM inventory", variant: "outline", onClick: () => navigate(appPaths.rmSimInventory) },
    { key: "onboard", label: "Onboard SC", onClick: () => setModal({ type: "onboard" }) },
    { key: "distribute", label: "Distribute stock", variant: "outline", onClick: () => setModal({ type: "distribute" }) },
    { key: "request", label: "Request from Admin", variant: "outline", onClick: () => setModal({ type: "request" }) },
    { key: "redistribute", label: "Redistribute", variant: "outline", onClick: () => setModal({ type: "redistribute" }) },
  ];
  return <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
    <PageHeader title="Regional Manager Dashboard" description="Territory operations, network performance, and SIM stock allocation" actions={actions} />
    <RmQueryState loading={query.isLoading} error={query.error} empty={!data} retry={() => void query.refetch()}>
      {data && <RmDashboardMetrics data={data} onPayout={() => navigate(appPaths.rmWallet)} />}
    </RmQueryState>
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
      <div className="min-w-0 space-y-5">
        <RmCoordinatorsTable summary={data?.my_state_coordinators} onView={setCoordinator} onDistribute={(target) => setModal({ type: "distribute", target })} onRemind={(target) => setModal({ type: "remind", target })} />
        <RmRecentActivityFeed />
      </div>
      {data && !query.error && <RmDashboardWidgets data={data} onRequest={() => setModal({ type: "request" })} onDistribute={() => setModal({ type: "distribute" })} onPayout={() => navigate(appPaths.rmWallet)} />}
    </div>
    {modal?.type === "onboard" && <RmOnboardScForm onClose={close} />}
    {modal?.type === "request" && <RmAdminStockModal onClose={close} />}
    {modal?.type === "redistribute" && <RmRedistributeModal onClose={close} />}
    {modal?.type === "distribute" && <RmDistributeModal target={modal.target} onClose={close} />}
    {/* Legacy payout UI disabled: dedicated wallet provides the verified bank destination and required PIN contract.
    {modal?.type === "payout" && data && <RmPayoutForm balance={data.primary_cards.my_commission.amount} formatted={data.primary_cards.my_commission.formatted} onClose={close} />}
    */}
    {modal?.type === "remind" && <RmReminderForm target={modal.target} onClose={close} />}
    {coordinator && <RmCoordinatorDrawer key={coordinator.id} target={coordinator} onClose={() => setCoordinator(null)} />}
    {/* Network reports remain disabled: no regional network-report endpoint supplied. Inventory and reminders are available through the dedicated pages above. */}
  </main>;
}

export default RegionalManagerDashboardPage;
