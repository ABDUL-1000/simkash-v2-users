import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { PageHeader } from "@/components/common/PageHeader";
import { useGetRmDashboardOverview } from "../api/dashboard";
import type { RmTarget } from "../types/dashboard";
import { RmQueryState } from "../components/dashboard/RmDashboardPrimitives";
import { RmDashboardMetrics } from "../components/dashboard/RmDashboardMetrics";
import { RmDashboardWidgets } from "../components/dashboard/RmDashboardWidgets";
import { RmCoordinatorsTable } from "../components/dashboard/RmCoordinatorsTable";
import { RmRecentActivityFeed } from "../components/dashboard/RmRecentActivityFeed";
import { rmDesignTokens } from "../components/dashboard/rmDesignTokens";
import { RmInventoryRedistributeModal } from "../Modals/inventory/RmInventoryForms";
import { RmDesignedRequest } from "../Modals/dashboard/RmDesignedRequest";
import { RmDesignedDistribute } from "../Modals/dashboard/RmDesignedDistribute";
import { RmDesignedOnboard, RmDesignedReminder } from "../Modals/dashboard/RmDesignedPeople";
// The older generic dashboard forms remain in Modals/dashboard; these designed flows use the same documented RM APIs.
export function RegionalManagerDashboardPage() {
  const query = useGetRmDashboardOverview();
  const navigate = useNavigate();
  const [modal, setModal] = useState<"onboard" | "request" | "redistribute" | "distribute" | "remind" | null>(null);
  const [selected, setSelected] = useState<RmTarget>();
  const close = () => { setModal(null); setSelected(undefined); };
  const distribute = (target?: RmTarget) => { setSelected(target); setModal("distribute"); };
  return <main className="rm-design mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6" style={rmDesignTokens}>
    <PageHeader title="Regional Manager Dashboard" description="Your territory at a glance" />
    <RmQueryState loading={query.isLoading} error={query.error} empty={!query.data} retry={() => void query.refetch()}>{query.data && <RmDashboardMetrics data={query.data} onPayout={() => navigate(appPaths.rmWallet)} />}</RmQueryState>
    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
      <div className="min-w-0 space-y-4">
        <RmCoordinatorsTable summary={query.data?.my_state_coordinators} onView={target => navigate(appPaths.rmCoordinatorDetail(target.id).path)} onDistribute={distribute} onOnboard={() => setModal("onboard")} onViewAll={() => navigate(appPaths.rmStateCoordinators)} />
        <RmRecentActivityFeed />
      </div>
      {query.data && !query.error && <RmDashboardWidgets data={query.data} onRequest={() => setModal("request")} onDistribute={() => distribute()} onPayout={() => navigate(appPaths.rmWallet)} onOnboard={() => setModal("onboard")} onRemind={() => setModal("remind")} onRedistribute={() => setModal("redistribute")} />}
    </div>
    {modal === "onboard" && <RmDesignedOnboard onClose={close} />}
    {modal === "request" && <RmDesignedRequest onClose={close} />}
    {modal === "distribute" && <RmDesignedDistribute target={selected} onClose={close} />}
    {modal === "remind" && <RmDesignedReminder onClose={close} />}
    {modal === "redistribute" && <RmInventoryRedistributeModal onClose={close} />}
    {/* Network-report button remains commented out: no report endpoint supplied. Payouts use the dedicated wallet's PIN flow. */}
  </main>;
}
export default RegionalManagerDashboardPage;
