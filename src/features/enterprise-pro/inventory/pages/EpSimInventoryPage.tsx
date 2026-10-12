import { useGetEnterpriseSimInventoryOverview, useGetEnterpriseScOverview, useGetEnterpriseInventoryHistory } from '../api';
import { stockItems, coordinatorItems, activityItems } from '../types/adapters';
import { EpQueryState } from '../../components/EpQueryState';
import React, { useState } from "react";
import { Plus, Send, FileSpreadsheet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { SimStockMetricCards } from "../components/SimStockMetricCards";
import { StockHealthPillsBar } from "../components/StockHealthPillsBar";
import { CriticalStockAlertBanner } from "../components/CriticalStockAlertBanner";
import { CurrentStockLevelsCard } from "../components/CurrentStockLevelsCard";
import { ScDistributionMonthTable } from "../components/ScDistributionMonthTable";
import { RecentInventoryActivityCard } from "../components/RecentInventoryActivityCard";
import { InventoryStockAlertsSidebar } from "../components/InventoryStockAlertsSidebar";
import { QuickOrderSidebarWidget } from "../components/QuickOrderSidebarWidget";
import { ScStockOverviewSidebar } from "../components/ScStockOverviewSidebar";
import { InventoryInvestmentValueCard } from "../components/InventoryInvestmentValueCard";
import { InventoryQuickActionsCard } from "../components/InventoryQuickActionsCard";
import { LowStockAlertModal } from "../modals/LowStockAlertModal";
import { ExportInventoryHistoryModal } from "../modals/ExportInventoryHistoryModal";
export const EpSimInventoryPage: React.FC = () => {
    const navigate = useNavigate();
    const [showLowStockModal, setShowLowStockModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const overview = useGetEnterpriseSimInventoryOverview();
    const scs = useGetEnterpriseScOverview();
    const history = useGetEnterpriseInventoryHistory({ limit: 5 });
    const items = stockItems(overview.data);
    const coordinators = coordinatorItems(scs.data);
    return (<div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader title="Enterprise SIM Inventory" description="Track, allocate, and distribute SIM stock across State Coordinators in real-time." actions={[
            {
                key: "export",
                label: "Export History",
                icon: <FileSpreadsheet className="w-4 h-4"/>,
                variant: "outline",
                onClick: () => setShowExportModal(true),
            },
            {
                key: "distribute",
                label: "Distribute to SCs",
                icon: <Send className="w-4 h-4"/>,
                variant: "outline",
                onClick: () => navigate(appPaths.enterpriseProSimDistribute),
            },
            {
                key: "order",
                label: "Order More SIMs",
                icon: <Plus className="w-4 h-4"/>,
                variant: "default",
                onClick: () => navigate(appPaths.enterpriseProOrderMoreSims),
            },
        ]}/>

      {/* Critical Stock Alert Banner (s2.jpg) */}
      <CriticalStockAlertBanner onOpenModal={() => setShowLowStockModal(true)}/>

      {/* KPI Cards (5 cards) */}
      <SimStockMetricCards onSelectSimType={(type) => navigate(`${appPaths.enterpriseProOrderMoreSims}?type=${type}`)}/>

      {/* Stock Health Buffer Bar */}
      <StockHealthPillsBar onTriggerLowStockModal={() => setShowLowStockModal(true)}/>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {overview.isSuccess ? <CurrentStockLevelsCard items={items}/> : <EpQueryState pending={overview.isPending} error={overview.error} retry={overview.refetch}/>}
          {scs.isSuccess ? <ScDistributionMonthTable coordinators={coordinators}/> : <EpQueryState pending={scs.isPending} error={scs.error} retry={scs.refetch}/>}
          {history.isSuccess ? <RecentInventoryActivityCard activities={activityItems(history.data)}/> : <EpQueryState pending={history.isPending} error={history.error} retry={history.refetch}/>}
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          <InventoryStockAlertsSidebar onOpenLowStockModal={() => setShowLowStockModal(true)}/>
          <QuickOrderSidebarWidget />
          {scs.isSuccess ? <ScStockOverviewSidebar coordinators={coordinators}/> : <EpQueryState pending={scs.isPending} error={scs.error} retry={scs.refetch}/>}
          <InventoryInvestmentValueCard />
          <InventoryQuickActionsCard onOpenExportModal={() => setShowExportModal(true)} onOpenLowStockModal={() => setShowLowStockModal(true)}/>
        </div>
      </div>

      {/* Modals */}
      <LowStockAlertModal open={showLowStockModal} onOpenChange={setShowLowStockModal}/>
      <ExportInventoryHistoryModal open={showExportModal} onOpenChange={setShowExportModal}/>
    </div>);
};
