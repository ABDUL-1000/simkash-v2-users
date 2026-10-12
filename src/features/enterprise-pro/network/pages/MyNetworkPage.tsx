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
import { useGetEnterpriseScOverview } from '../api/queries';
import { coordinatorFromApi } from '../types/adapters';
import { EpQueryState } from '../../components/EpQueryState';
import { openNotification } from '@/utils/notifications';
import type { StateCoordinatorNetwork } from "../types";

export const MyNetworkPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<NetworkTabKey>("sc-overview");
  const overview = useGetEnterpriseScOverview();
  const coordinators = (overview.data?.coordinators ?? []).map(coordinatorFromApi);
  const [selectedApScId, setSelectedApScId] = useState('all');

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
    onboardResult: null,
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

  const handleViewAps = (sc: StateCoordinatorNetwork) => {
    setSelectedApScId(sc.id);
    setActiveTab('agency-partners');
    updateModalState({ isOpenActiveSc: false, isOpenSuspendedSc: false });
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
        scCount={overview.data?.totals.sc_count ?? 0}
        apCount={overview.data?.totals.aps_count ?? 0}
      />

      {/* Tab 1: SC Overview */}
      {activeTab === "sc-overview" && (overview.isSuccess ? (
        <ScOverviewTabView
          kpis={overview.data.summary_cards}
          totals={overview.data.totals}
          coordinators={coordinators}
          onSelectSc={handleSelectSc}
          onOnboardSc={() => updateModalState({ isOpenOnboard: true })}
          onExportReport={() => updateModalState({ isOpenExport: true })}
          onSendReminder={() => openNotification({ state: 'info', title: 'Activation Reminder', description: 'Reminder delivery is not available from the supplied network API yet.' })}
          onDistributeSims={() => navigate(appPaths.enterpriseProSimDistribute)}
        />
      ) : <EpQueryState pending={overview.isPending} error={overview.error} retry={overview.refetch}/>)}

      {/* Tab 2: Agency Partners */}
      {activeTab === "agency-partners" && (
        <ApOverviewTabView
          selectedScId={selectedApScId}
          onScChange={setSelectedApScId}
          onExportReport={() => updateModalState({ isOpenExport: true })}
        />
      )}

      {/* Tab 3: Network Activity */}
      {activeTab === "activity" && <NetworkActivityTab />}

      {/* All 16 Modals Manager */}
      <NetworkModalsManager
        state={modalState}
        onUpdateState={updateModalState}
        onDistributeSim={handleDistributeSim}
        onViewAps={handleViewAps}
      />
    </div>
  );
};
export default MyNetworkPage;
