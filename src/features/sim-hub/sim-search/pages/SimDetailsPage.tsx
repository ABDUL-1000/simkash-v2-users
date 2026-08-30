import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";

import { SimSearchHeroCard } from "../components/SimSearchHeroCard";
import { appPaths } from "@/app/router/paths";
import { DUMMY_SIM_DETAILS } from "../data/dummy-sim-datas";
import type { SimAction } from "@/types/sim-details.types";
import { SimDetailsCard } from "../components/sim-details/SimDetailsCard";
import { DistributionChainSection } from "../components/sim-details/DistributionChainSection";
import { EventHistorySection } from "../components/sim-details/EventHistorySection";
import { AdminActionsSection } from "../components/sim-details/AdminActionSection";
import { RenewalHistorySection } from "../components/sim-details/RenewalHistorySection";
import { NotificationLogSection } from "../components/sim-details/NotificationLogSection";
import { KycVerificationSection } from "../components/sim-details/kyc-card";
import { CriticalAlertSection } from "../components/sim-details/CriticalAlertSection";
import { DataUsageSection } from "../components/sim-details/DataUsageSection";

export default function SimDetailsPage() {
  const sim = DUMMY_SIM_DETAILS; // swap for a real fetch keyed on the route param
  const navigate = useNavigate();

  function goToSimDetails(query: string) {
    if (!query.trim()) return;
   navigate(appPaths.adminSimSearchDetails(query.trim()).path);
  }
  function handleAction(action: SimAction | string) {
    // route to your renew/PND/notify/set-alert/deactivate endpoints
    void action;
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Admin SIM Search"
        description="Search any SIM number or serial to view its complete chain — batch origin → Corporate Agent → Agency Partner → Customer"
      />
      <SimSearchHeroCard onSearch={goToSimDetails} />
      {/* Staggered two-column layout: each column stacks independently */}
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(20rem,1fr)]">
        <div className="space-y-6">
          <SimDetailsCard sim={sim} onAction={handleAction} />
          <DistributionChainSection sim={sim} />
          <EventHistorySection sim={sim} />
          <DataUsageSection sim={sim} />
        </div>

        <div className="space-y-6">
          <AdminActionsSection onAction={handleAction} />
          <CriticalAlertSection sim={sim} onAction={handleAction} />
          <RenewalHistorySection sim={sim} />
          <NotificationLogSection sim={sim} />
          <KycVerificationSection sim={sim} />
        </div>
      </div>
    </div>
  );
}
