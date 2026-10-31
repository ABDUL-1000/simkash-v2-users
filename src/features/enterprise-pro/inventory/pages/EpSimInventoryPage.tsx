import { useGetEnterpriseSimInventoryOverview, useGetEnterpriseInventoryHistory } from '../api';
import { coordinatorItems, activityItems } from '../types/adapters';
import { EpQueryState } from '../../components/EpQueryState';
import React, { useState } from "react";
import { Plus, Send, Repeat, Clock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { epDistributePath, epRedistributePath } from "../../utils/epLinks";
import { SimStockMetricCards } from "../components/SimStockMetricCards";
import { StockHealthPillsBar } from "../components/StockHealthPillsBar";
import { CriticalStockAlertBanner } from "../components/CriticalStockAlertBanner";
import { CurrentStockLevelsCard } from "../components/CurrentStockLevelsCard";
import { ScDistributionMonthTable } from "../components/ScDistributionMonthTable";
import { EpAvailableSimsTable } from "../components/EpAvailableSimsTable";
import { RecentInventoryActivityCard } from "../components/RecentInventoryActivityCard";
import { EstimatedDaysCard, InventoryHealthCard, ScsNeedingStockCard } from "../components/InventorySideCards";
import { ScStockOverviewSidebar } from "../components/ScStockOverviewSidebar";
import { InventoryQuickActionsCard } from "../components/InventoryQuickActionsCard";
import { RequestStockModal } from "../modals/RequestStockModal";
import { StockRequestsModal } from "../modals/StockRequestsModal";
export const EpSimInventoryPage: React.FC = () => {
    const navigate = useNavigate();
    // Deep link from the dashboard: ?request=1&type=pos
    const [params, setParams] = useSearchParams();
    const [requestOpen, setRequestOpen] = useState(params.get("request") === "1");
    const [requestType, setRequestType] = useState(params.get("type") ?? undefined);
    const [requestsOpen, setRequestsOpen] = useState(false);
    const overview = useGetEnterpriseSimInventoryOverview();
    const history = useGetEnterpriseInventoryHistory({ limit: 5 });
    const data = overview.data;
    const coordinators = coordinatorItems(data);
    const openRequest = () => { setRequestType(undefined); setRequestOpen(true); };
    const closeRequest = () => { setRequestOpen(false); if (params.size) setParams({}, { replace: true }); };
    return (<div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader title="Enterprise SIM Inventory" description="Track, allocate, and distribute SIM stock across State Coordinators in real-time." actions={[
            {
                key: "requests",
                label: "Stock Requests",
                icon: <Clock className="w-4 h-4"/>,
                variant: "outline",
                onClick: () => setRequestsOpen(true),
            },
            {
                key: "redistribute",
                label: "Redistribute",
                icon: <Repeat className="w-4 h-4"/>,
                variant: "outline",
                onClick: () => navigate(epRedistributePath()),
            },
            {
                key: "distribute",
                label: "Distribute to SCs",
                icon: <Send className="w-4 h-4"/>,
                variant: "outline",
                onClick: () => navigate(epDistributePath()),
            },
            {
                key: "order",
                label: "Request Stock",
                icon: <Plus className="w-4 h-4"/>,
                variant: "default",
                onClick: openRequest,
            },
        ]}/>

      {/* Stock Alert Banner */}
      <CriticalStockAlertBanner message={data?.estimated_days_remaining?.alert_callout?.message} onRequestStock={openRequest}/>

      {/* KPI Cards (5 cards) */}
      <SimStockMetricCards onViewStock={() => document.getElementById("ep-available-sims")?.scrollIntoView({ behavior: "smooth", block: "start" })} onViewDistribute={() => navigate(epDistributePath())} onViewHistory={() => navigate(appPaths.enterpriseProInventoryHistory)} onViewRequests={() => setRequestsOpen(true)}/>

      {/* Stock Health Buffer Bar */}
      <StockHealthPillsBar />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6 min-w-0">
          {data ? <CurrentStockLevelsCard items={data.stock_types ?? []}/> : <EpQueryState pending={overview.isPending} error={overview.error} retry={overview.refetch}/>}
          {data && <ScDistributionMonthTable coordinators={coordinators}/>}
          <div id="ep-available-sims"><EpAvailableSimsTable /></div>
          {history.isSuccess ? <RecentInventoryActivityCard activities={activityItems(history.data)}/> : <EpQueryState pending={history.isPending} error={history.error} retry={history.refetch}/>}
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6 min-w-0">
          {data?.scs_need_distribution && <ScsNeedingStockCard data={data.scs_need_distribution} onDistribute={(id) => navigate(epDistributePath(id))}/>}
          {data?.estimated_days_remaining && <EstimatedDaysCard data={data.estimated_days_remaining}/>}
          {data && <ScStockOverviewSidebar coordinators={coordinators}/>}
          {data?.inventory_health && <InventoryHealthCard data={data.inventory_health}/>}
          <InventoryQuickActionsCard onRequestStock={openRequest} onViewRequests={() => setRequestsOpen(true)} pendingRequests={data?.summary_cards?.pending_requests?.count} adminName={data?.admin_info?.name}/>
        </div>
      </div>

      {/* Modals */}
      {requestOpen && <RequestStockModal initialType={requestType} overview={data} onClose={closeRequest}/>}
      {requestsOpen && <StockRequestsModal onClose={() => setRequestsOpen(false)}/>}
    </div>);
};
