import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserPlus, Download } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { useDebouncedValue } from "@/features/corporate-agent/inventory/api/useDebouncedValue";
import { EpNetworkTabsNav, type NetworkTabKey } from "../components/EpNetworkTabsNav";
import { ScOverviewTabView } from "../components/ScOverviewTab/ScOverviewTabView";
import { ScComparisonTab } from "../components/ScComparisonTab";
import {
  NetworkModalsManager,
  type NetworkModalsState,
} from "../components/NetworkModalsManager";
import { useGetEnterpriseScOverview } from '../api/queries';
import { useExportStateCoordinators } from '../api/exportEnterpriseNetworkReport';
import { coordinatorFromApi } from '../types/adapters';
import type { EpScTab } from '../types/api';
import { EpQueryState } from '../../components/EpQueryState';
import { epDistributePath } from '../../utils/epLinks';
import type { StateCoordinatorNetwork } from "../types";

const PAGE_SIZE = 8;

export const MyNetworkPage: React.FC = () => {
  const navigate = useNavigate();
  // Deep link from the dashboard: ?onboard=1
  const [params, setParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<NetworkTabKey>("sc-overview");
  const [scTab, setScTab] = useState<EpScTab>("all");
  const [search, setSearch] = useState("");
  const [state, setState] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebouncedValue(search.trim());
  const debouncedState = useDebouncedValue(state.trim());
  const overview = useGetEnterpriseScOverview({ tab: scTab, search: debouncedSearch || undefined, state: debouncedState || undefined, page, limit: PAGE_SIZE });
  const exporter = useExportStateCoordinators();
  const coordinators = (overview.data?.coordinators ?? []).map(coordinatorFromApi);

  const [modalState, setModalState] = useState<NetworkModalsState>({
    activeSc: null,
    isOpenDetails: false,
    isOpenOnboard: params.get("onboard") === "1",
    isOpenInviteSent: false,
    isOpenSuspend: false,
    isOpenSuspendedSuccess: false,
    isOpenReinstate: false,
    isOpenReinstatedSuccess: false,
    isOpenSendReminder: false,
    onboardResult: null,
  });

  const updateModalState = (patch: Partial<NetworkModalsState>) => {
    if (patch.isOpenOnboard === false && params.get("onboard")) setParams({}, { replace: true });
    setModalState((prev) => ({ ...prev, ...patch }));
  };

  const handleSelectSc = (sc: StateCoordinatorNetwork) => updateModalState({ activeSc: sc, isOpenDetails: true });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="My State Coordinators"
        description="Monitor State Coordinators, stock alerts, and territory performance."
        actions={[
          {
            key: "export",
            label: exporter.isPending ? "Exporting…" : "Export Network Report",
            icon: <Download className="w-4 h-4" />,
            variant: "default",
            disabled: exporter.isPending,
            onClick: () => exporter.mutate(),
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
        scCount={overview.data?.network_summary?.total_scs}
      />

      {/* Tab 1: SC Overview */}
      {activeTab === "sc-overview" && (overview.data ? (
        <ScOverviewTabView
          data={overview.data}
          coordinators={coordinators}
          tab={scTab}
          onTabChange={(value) => { setScTab(value); setPage(1); }}
          search={search}
          onSearchChange={(value) => { setSearch(value); setPage(1); }}
          state={state}
          onStateChange={(value) => { setState(value); setPage(1); }}
          page={page}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
          loading={overview.isFetching}
          onSelectSc={handleSelectSc}
          onOnboardSc={() => updateModalState({ isOpenOnboard: true })}
          onExportReport={() => exporter.mutate()}
          exporting={exporter.isPending}
          onSendReminder={() => updateModalState({ activeSc: null, isOpenSendReminder: true })}
          onDistributeSims={(id) => navigate(epDistributePath(id))}
        />
      ) : <EpQueryState pending={overview.isPending} error={overview.error} retry={overview.refetch}/>)}

      {/* Tab 2: Performance Comparison */}
      {activeTab === "comparison" && <ScComparisonTab onDistribute={(id) => navigate(epDistributePath(id))} />}

      <NetworkModalsManager
        state={modalState}
        coordinators={coordinators}
        onUpdateState={updateModalState}
        onDistributeSim={(sc) => navigate(epDistributePath(sc.id))}
      />
    </div>
  );
};
export default MyNetworkPage;
