import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Download } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { EpNetworkTabsNav, type NetworkTabKey } from "../components/EpNetworkTabsNav";
import { ScOverviewTabView } from "../components/ScOverviewTab/ScOverviewTabView";
import { ApOverviewTabView } from "../components/ApOverviewTab/ApOverviewTabView";
import { NetworkActivityTab } from "../components/NetworkActivityTab/NetworkActivityTab";
import {
  NetworkModalsManager,
  type NetworkModalsState,
} from "../components/NetworkModalsManager";
import { mockCoordinatorsNetwork, mockNetworkKPIs } from "../data/mockNetworkData";
import { mockAgencyPartners } from "../data/mockApData";
import type { StateCoordinatorNetwork } from "../types";

export const MyNetworkPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<NetworkTabKey>("sc-overview");
  const [coordinators, setCoordinators] = useState<StateCoordinatorNetwork[]>(mockCoordinatorsNetwork);

  const [modalState, setModalState] = useState<NetworkModalsState>({
    activeSc: null,
    isOpenActiveSc: false,
    isOpenSuspendedSc: false,
    isOpenOnboard: false,
    isOpenInviteSent: false,
    isOpenInviteFailed: false,
    isOpenSetRate: false,
    isOpenConfirmRate: false,
    isOpenRateSuccess: false,
    isOpenSuspend: false,
    isOpenSuspendedSuccess: false,
    isOpenReinstate: false,
    isOpenReinstatedSuccess: false,
    isOpenSendReminder: false,
    isOpenReminderSuccess: false,
    isOpenExport: false,
    isOpenExportProgress: false,
    onboardData: null,
    pendingNewRate: 0.1,
    reminderChannel: "both",
    exportConfig: null,
  });

  const updateModalState = (patch: Partial<NetworkModalsState>) => {
    setModalState((prev) => ({ ...prev, ...patch }));
  };

  const handleSelectSc = (sc: StateCoordinatorNetwork) => {
    if (sc.status === "suspended") {
      updateModalState({ activeSc: sc, isOpenSuspendedSc: true });
    } else {
      updateModalState({ activeSc: sc, isOpenActiveSc: true });
    }
  };

  const handleDistributeSim = (sc: StateCoordinatorNetwork) => {
    navigate(`${appPaths.enterpriseProSimDistribute}?scId=${sc.id}`);
  };

  const handleRateUpdated = (sc: StateCoordinatorNetwork, rate: number) => {
    setCoordinators((prev) =>
      prev.map((c) => (c.id === sc.id ? { ...c, commissionRate: rate } : c))
    );
  };

  const handleStatusChanged = (scId: string, newStatus: "active" | "suspended") => {
    setCoordinators((prev) =>
      prev.map((c) => (c.id === scId ? { ...c, status: newStatus } : c))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="My Network"
        description="Monitor State Coordinators, Agency Partners, commission rates, and real-time territory performance."
        actions={[
          {
            key: "export",
            label: "Export Network Report",
            icon: <Download className="w-4 h-4" />,
            variant: "default",
            onClick: () => updateModalState({ isOpenExport: true }),
          },
          {
            key: "onboard",
            label: "Onboard New SC",
            icon: <UserPlus className="w-4 h-4" />,
            style: { backgroundColor: "#1F3A5F", color: "#FFFFFF" },
            onClick: () => updateModalState({ isOpenOnboard: true }),
          },
        ]}
      />

      {/* Navigation Sub-Tabs */}
      <EpNetworkTabsNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        scCount={coordinators.length}
        apCount={mockAgencyPartners.length}
      />

      {/* Tab 1: SC Overview */}
      {activeTab === "sc-overview" && (
        <ScOverviewTabView
          kpis={mockNetworkKPIs}
          coordinators={coordinators}
          onSelectSc={handleSelectSc}
          onOnboardSc={() => updateModalState({ isOpenOnboard: true })}
          onExportReport={() => updateModalState({ isOpenExport: true })}
          onSendReminder={() =>
            updateModalState({ activeSc: coordinators[0], isOpenSendReminder: true })
          }
          onDistributeSims={() => navigate(appPaths.enterpriseProSimDistribute)}
        />
      )}

      {/* Tab 2: Agency Partners */}
      {activeTab === "agency-partners" && (
        <ApOverviewTabView
          agencyPartners={mockAgencyPartners}
          coordinators={coordinators}
          onExportReport={() => updateModalState({ isOpenExport: true })}
          onSelectAp={(ap) => {
            const parentSc = coordinators.find((c) => c.id === ap.scId) || coordinators[0];
            handleSelectSc(parentSc);
          }}
        />
      )}

      {/* Tab 3: Network Activity */}
      {activeTab === "activity" && <NetworkActivityTab />}

      {/* All 16 Modals Manager */}
      <NetworkModalsManager
        state={modalState}
        onUpdateState={updateModalState}
        onDistributeSim={handleDistributeSim}
        onRateUpdated={handleRateUpdated}
        onStatusChanged={handleStatusChanged}
      />
    </div>
  );
};
export default MyNetworkPage;
