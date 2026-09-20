import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { RmTopKpiCards } from "../components/RmTopKpiCards";
import { RmOverviewCards } from "../components/RmOverviewCards";
import { RmScTable } from "../components/RmScTable";
import { RmRecentActivityCard } from "../components/RmRecentActivityCard";
import { RmSimInventoryCard } from "../components/RmSimInventoryCard";
import { RmCommissionCard } from "../components/RmCommissionCard";
import { RmNetworkHealthCard } from "../components/RmNetworkHealthCard";
import { RmQuickActionsCard } from "../components/RmQuickActionsCard";

// Modals
import { OnboardScModal } from "../Modals/OnboardScModal";
import { DistributeStockModal } from "../Modals/DistributeStockModal";
import { SendBonusReminderModal } from "../Modals/SendBonusReminderModal";
import { RequestStockFromAdminModal } from "../Modals/RequestStockFromAdminModal";

// Data
import {
  INITIAL_STATE_COORDINATORS,
  RM_RECENT_ACTIVITIES,
  RM_INVENTORY_DATA,
  RM_COMMISSION_DATA,
  RM_NETWORK_HEALTH_DATA,
} from "../data/regional-manager.data";
import type { StateCoordinatorItem } from "../types/regional-manager.types";

export function RegionalManagerDashboardPage() {
  const navigate = useNavigate();

  const [scs, setScs] = useState<StateCoordinatorItem[]>(INITIAL_STATE_COORDINATORS);
  const [selectedScForDist, setSelectedScForDist] = useState<StateCoordinatorItem | null>(null);

  // Modals state
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [distributeModalOpen, setDistributeModalOpen] = useState(false);
  const [bonusReminderModalOpen, setBonusReminderModalOpen] = useState(false);
  const [requestAdminStockModalOpen, setRequestAdminStockModalOpen] = useState(false);

  const handleOpenDistribute = (sc?: StateCoordinatorItem) => {
    setSelectedScForDist(sc || null);
    setDistributeModalOpen(true);
  };

  const handleOnboardSuccess = (newSc: any) => {
    const scToAdd: StateCoordinatorItem = {
      id: `sc-${Date.now()}`,
      initials: newSc.name
        .split(" ")
        .map((n: string) => n[0])
        .join(""),
      name: newSc.name,
      phone: "0800 000 0000",
      email: `${newSc.name.toLowerCase().replace(/\s+/g, ".")}@email.com`,
      state: newSc.state || "Lagos",
      stock: newSc.stock || 50,
      stockStatus: "Normal",
      apsCount: 0,
      activationsCount: 0,
      bonusStatus: "On Track",
      lastActive: "Just now",
      avatarBg: "#2563EB",
      simStockBreakdown: { pos: 30, cctv: 20, gps: 0, router: 0 },
    };
    setScs((prev) => [scToAdd, ...prev]);
  };

  const handleDistributeSuccess = (details: { scName: string; total: number }) => {
    setScs((prev) =>
      prev.map((sc) =>
        sc.name === details.scName
          ? { ...sc, stock: sc.stock + details.total, stockStatus: "Normal" }
          : sc
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Top 4 Header KPI Cards */}
      <RmTopKpiCards onRequestPayout={() => {}} />

      {/* 2. Secondary 4 Overview Cards */}
      <RmOverviewCards />

      {/* 3. Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols): SCs Table & Recent Activities */}
        <div className="lg:col-span-8 space-y-6">
          <RmScTable
            scs={scs}
            onOnboardSc={() => setOnboardModalOpen(true)}
            onViewSc={(scId) => navigate(`/dashboard/regional-manager/sc/${scId}`)}
            onDistributeSc={(sc) => handleOpenDistribute(sc)}
          />

          <RmRecentActivityCard
            activities={RM_RECENT_ACTIVITIES}
            onViewAll={() => {}}
          />
        </div>

        {/* Right Column (4 cols): Side Widgets */}
        <div className="lg:col-span-4 space-y-6">
          <RmSimInventoryCard
            inventory={RM_INVENTORY_DATA}
            onDistributeStock={() => handleOpenDistribute()}
            onViewInventory={() => navigate(appPaths.rmSimInventory)}
          />

          <RmCommissionCard
            commission={RM_COMMISSION_DATA}
            onRequestPayout={() => {}}
          />

          <RmNetworkHealthCard health={RM_NETWORK_HEALTH_DATA} />

          <RmQuickActionsCard
            onDistributeStock={() => handleOpenDistribute()}
            onSendBonusReminder={() => setBonusReminderModalOpen(true)}
            onRequestStockAdmin={() => setRequestAdminStockModalOpen(true)}
            onViewNetworkReport={() => navigate(appPaths.rmNetworkPerformance)}
            onRedistributeSims={() => navigate(appPaths.rmSimInventory)}
          />
        </div>
      </div>

      {/* MODALS */}
      <OnboardScModal
        open={onboardModalOpen}
        onOpenChange={setOnboardModalOpen}
        onSuccess={handleOnboardSuccess}
      />

      <DistributeStockModal
        open={distributeModalOpen}
        onOpenChange={setDistributeModalOpen}
        preselectedSc={selectedScForDist}
        onSuccess={handleDistributeSuccess}
      />

      <SendBonusReminderModal
        open={bonusReminderModalOpen}
        onOpenChange={setBonusReminderModalOpen}
        scName="Glory Effah"
        phone="08164147750"
        currentActs={287}
        targetActs={500}
      />

      <RequestStockFromAdminModal
        open={requestAdminStockModalOpen}
        onOpenChange={setRequestAdminStockModalOpen}
      />
    </div>
  );
}

export default RegionalManagerDashboardPage;
