import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";

// Components
import { RmNetworkHeader } from "../components/network/RmNetworkHeader";
import { RmNetworkKpiStrip } from "../components/network/RmNetworkKpiStrip";
import { RmNetworkFilterBar } from "../components/network/RmNetworkFilterBar";
import { RmActivationFeedList } from "../components/network/RmActivationFeedList";
import { RmNetworkSidebar } from "../components/network/RmNetworkSidebar";
import { RmByScTable } from "../components/network/RmByScTable";
import { RmByApTable } from "../components/network/RmByApTable";
import { RmBySimTypeView } from "../components/network/RmBySimTypeView";

// Modals
import { RmActivationDetailsModal } from "../Modals/RmActivationDetailsModal";
import { RmExportActivityModal } from "../Modals/RmExportActivityModal";
import { RmRetryActivationModal } from "../Modals/RmRetryActivationModal";
import { RmContactApModal } from "../Modals/RmContactApModal";
import { RmApActivityModal } from "../Modals/RmApActivityModal";
import { RmScActivityModal } from "../Modals/RmScActivityModal";
import { DistributeStockModal } from "../Modals/DistributeStockModal";
import { RmSuccessModal, type RmSuccessDetailItem } from "../Modals/RmSuccessModal";

// Data & Types
import {
  MOCK_NETWORK_ACTIVATIONS,
  MOCK_SC_NETWORK_BREAKDOWN,
  MOCK_AP_NETWORK_LIST,
  MOCK_FAILED_ACTIVATIONS,
  type FailedActivationItem,
} from "../data/regional-manager-network.data";
import type {
  NetworkActivationItem,
  NetworkViewTab,
  TimeframeFilter,
  ScNetworkBreakdownItem,
  ApNetworkSummaryItem,
} from "../types/regional-manager-network.types";

export function RmNetworkActivityPage() {
  const navigate = useNavigate();

  // Active view tab: "activation" (Image 1) | "sc" (Image 2) | "ap" (Image 3) | "sim_type"
  const [activeTab, setActiveTab] = useState<NetworkViewTab>("activation");

  // Selected SC when drilled into "By AP" view
  const [selectedScForApView, setSelectedScForApView] = useState<ScNetworkBreakdownItem | null>(
    MOCK_SC_NETWORK_BREAKDOWN[0] // Aminat Okafor by default
  );

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [timeframe, setTimeframe] = useState<TimeframeFilter>("Today");
  const [scFilter, setScFilter] = useState("All");
  const [apFilter, setApFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [networkFilter, setNetworkFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Activations state (allows dynamic updating on retry)
  const [activations, setActivations] = useState<NetworkActivationItem[]>(MOCK_NETWORK_ACTIVATIONS);
  const [failedItems, setFailedItems] = useState<FailedActivationItem[]>(MOCK_FAILED_ACTIVATIONS);

  // Modals state
  const [selectedActivation, setSelectedActivation] = useState<NetworkActivationItem | null>(null);
  const [activationModalOpen, setActivationModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [retryModalOpen, setRetryModalOpen] = useState(false);
  const [selectedFailedItem, setSelectedFailedItem] = useState<FailedActivationItem | null>(null);
  const [contactApModalOpen, setContactApModalOpen] = useState(false);
  const [selectedApForContact, setSelectedApForContact] = useState<{ name: string; phone: string }>({
    name: "Rabiu Sani",
    phone: "08120600542",
  });
  const [apActivityModalOpen, setApActivityModalOpen] = useState(false);
  const [selectedApForActivity, setSelectedApForActivity] = useState<{ name: string; sc: string }>({
    name: "Rabiu Sani",
    sc: "Aminat",
  });
  const [scActivityModalOpen, setScActivityModalOpen] = useState(false);
  const [selectedScForActivity, setSelectedScForActivity] = useState<{ name: string; state: string }>({
    name: "Aminat Okafor",
    state: "Lagos",
  });
  const [distributeModalOpen, setDistributeModalOpen] = useState(false);
  const [targetScForDistribute, setTargetScForDistribute] = useState<string>("Aminat Okafor");

  // Reusable Success Modal state
  const [successModalState, setSuccessModalState] = useState<{
    open: boolean;
    title: string;
    subtitle: string;
    details: RmSuccessDetailItem[];
  }>({
    open: false,
    title: "",
    subtitle: "",
    details: [],
  });

  const showSuccess = (title: string, subtitle: string, details: RmSuccessDetailItem[]) => {
    setSuccessModalState({
      open: true,
      title,
      subtitle,
      details,
    });
  };

  // Filtered Activations Feed
  const filteredActivations = useMemo(() => {
    return activations.filter((item) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.simNumber.toLowerCase().includes(q) ||
          item.customerName.toLowerCase().includes(q) ||
          item.apName.toLowerCase().includes(q) ||
          item.scName.toLowerCase().includes(q) ||
          item.reference.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Dropdowns
      if (scFilter !== "All" && item.scName !== scFilter) return false;
      if (apFilter !== "All" && item.apName !== apFilter) return false;
      if (typeFilter !== "All" && item.simType !== typeFilter) return false;
      if (networkFilter !== "All" && item.network !== networkFilter) return false;
      if (statusFilter !== "All" && item.status !== statusFilter) return false;

      return true;
    });
  }, [activations, searchQuery, scFilter, apFilter, typeFilter, networkFilter, statusFilter]);

  // Handlers
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleSelectActivation = (item: NetworkActivationItem) => {
    setSelectedActivation(item);
    setActivationModalOpen(true);
  };

  const handleRetryFailed = (item: FailedActivationItem) => {
    setSelectedFailedItem(item);
    setRetryModalOpen(true);
  };

  const handleViewFailedDetails = (item: FailedActivationItem) => {
    // Find matching activation item or build preview
    const found = activations.find((a) => a.simNumber === item.simNumber);
    if (found) {
      setSelectedActivation(found);
    } else {
      setSelectedActivation({
        id: item.id,
        reference: `ACT-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        simNumber: item.simNumber,
        simType: "GPS SIM",
        network: "MTN",
        status: "Failed",
        customerName: "Fatima Ali",
        customerPhone: "08099000112",
        apName: item.apName,
        apPhone: "08120600542",
        scName: item.scName,
        scState: "Lagos",
        date: "24 Jun 2026",
        time: "2:15 PM",
        timeAgo: "45 min ago",
        isToday: true,
        failureReason: item.reason,
        commission: { apEarned: 0, scEarned: 0, rmEarned: 0, total: 0 },
      });
    }
    setActivationModalOpen(true);
  };

  const handleViewApsFromSc = (sc: ScNetworkBreakdownItem) => {
    setSelectedScForApView(sc);
    setActiveTab("ap");
  };

  const handleOpenContactAp = (apName: string, phone: string) => {
    setSelectedApForContact({ name: apName, phone });
    setContactApModalOpen(true);
  };

  const handleExportSuccess = (details: { format: string; period: string; scope: string; recordCount: number }) => {
    showSuccess(
      "Network Report Generated!",
      `Your ${details.format} report for ${details.scope} is ready for download.`,
      [
        { label: "Report Format", value: details.format },
        { label: "Reporting Period", value: details.period },
        { label: "Record Scope", value: details.scope },
        { label: "Total Activations", value: `${details.recordCount} Records` },
      ]
    );
  };

  const handleRetrySuccess = (details: { simNumber: string; apName: string; scName: string; priority: string }) => {
    // Update local state
    setFailedItems((prev) => prev.filter((f) => f.simNumber !== details.simNumber));
    setActivations((prev) =>
      prev.map((a) =>
        a.simNumber === details.simNumber
          ? { ...a, status: "Pending", timeAgo: "Retrying now..." }
          : a
      )
    );

    showSuccess(
      "Provisioning Re-queued!",
      `SIM ${details.simNumber} has been submitted to the network gateway.`,
      [
        { label: "SIM Number", value: details.simNumber },
        { label: "Agency Partner", value: details.apName },
        { label: "State Coordinator", value: details.scName },
        { label: "Priority Level", value: details.priority },
      ]
    );
  };

  const handleContactSuccess = (details: { apName: string; phone: string; message: string; channel: string }) => {
    showSuccess(
      "Message Dispatched!",
      `${details.channel} notification sent to ${details.apName}.`,
      [
        { label: "Recipient", value: details.apName },
        { label: "Phone Number", value: details.phone },
        { label: "Channel", value: details.channel },
        { label: "Message Preview", value: details.message.slice(0, 45) + "..." },
      ]
    );
  };

  const handleOpenApActivity = (apName: string, scName?: string) => {
    setSelectedApForActivity({ name: apName, sc: scName || "Aminat" });
    setApActivityModalOpen(true);
  };

  const handleOpenScActivity = (scName: string, state?: string) => {
    setSelectedScForActivity({ name: scName, state: state || "Lagos" });
    setScActivityModalOpen(true);
  };

  const handleOpenDistributeToSc = (scName: string) => {
    setTargetScForDistribute(scName);
    setDistributeModalOpen(true);
  };

  const handleDistributeSuccess = (details: any) => {
    const qty = details?.quantity || details?.total || 50;
    const sc = details?.scName || details?.sc || targetScForDistribute;
    showSuccess(
      "SIMs Distributed Successfully!",
      `${qty} SIMs allocated to ${sc}.`,
      [
        { label: "Recipient SC", value: sc },
        { label: "State", value: details?.state || "Lagos" },
        { label: "SIMs Dispatched", value: `${qty} SIMs` },
        { label: "Source Inventory", value: "Regional Manager Pool" },
      ]
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Page Header with Refresh and Export buttons */}
      <RmNetworkHeader
        onExport={() => setExportModalOpen(true)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* 2. Top 5 KPI Summary Strip */}
      <RmNetworkKpiStrip
        selectedSc={activeTab === "ap" ? selectedScForApView : null}
        onClearSelectedSc={() => setSelectedScForApView(null)}
      />

      {/* 3. Filter Bar & View Switcher */}
      <RmNetworkFilterBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        timeframe={timeframe}
        onTimeframeChange={setTimeframe}
        selectedScFilter={scFilter}
        onScFilterChange={setScFilter}
        selectedApFilter={apFilter}
        onApFilterChange={setApFilter}
        selectedTypeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        selectedNetworkFilter={networkFilter}
        onNetworkFilterChange={setNetworkFilter}
        selectedStatusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        selectedScForApView={selectedScForApView}
        onSelectScForApView={setSelectedScForApView}
        allScs={MOCK_SC_NETWORK_BREAKDOWN}
      />

      {/* 4. MAIN CONTENT AREA (Tab Conditional) */}
      {/* VIEW 1: By Activation / Real-time Feed (Image 1) */}
      {activeTab === "activation" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column (8 cols): Feed List */}
          <div className="lg:col-span-8">
            <RmActivationFeedList
              activations={filteredActivations}
              onSelectActivation={handleSelectActivation}
            />
          </div>

          {/* Right Column (4 cols): Sidebar with Pulse, SC Breakdown, SIM Breakdown, Failed Activations */}
          <div className="lg:col-span-4">
            <RmNetworkSidebar
              scs={MOCK_SC_NETWORK_BREAKDOWN}
              failedItems={failedItems}
              onSelectSc={(sc) => handleOpenScActivity(sc.name, sc.state)}
              onRetryFailed={handleRetryFailed}
              onViewFailedDetails={handleViewFailedDetails}
            />
          </div>
        </div>
      )}

      {/* VIEW 2: By State Coordinator Table (Image 2) */}
      {activeTab === "sc" && (
        <RmByScTable
          scs={MOCK_SC_NETWORK_BREAKDOWN}
          onViewAps={handleViewApsFromSc}
          onSelectScRow={(sc) => handleOpenScActivity(sc.name, sc.state)}
        />
      )}

      {/* VIEW 3: By Agency Partner Table (Image 3) */}
      {activeTab === "ap" && (
        <RmByApTable
          aps={MOCK_AP_NETWORK_LIST}
          selectedSc={selectedScForApView}
          onClearScFilter={() => setSelectedScForApView(null)}
          onSelectAp={(ap: ApNetworkSummaryItem) => {
            handleOpenApActivity(ap.name, selectedScForApView?.name);
          }}
          onViewAllAps={() => navigate(appPaths.rmCustomers)}
        />
      )}

      {/* VIEW 4: By SIM Type View */}
      {activeTab === "sim_type" && <RmBySimTypeView />}

      {/* 5. ALL MODALS */}
      {/* Modal 1: Activation Details (Completed & Failed & Pending states - Images 1, 4 & 5) */}
      <RmActivationDetailsModal
        open={activationModalOpen}
        onOpenChange={setActivationModalOpen}
        activation={selectedActivation}
        onContactAp={(apName, phone) => {
          setActivationModalOpen(false);
          handleOpenContactAp(apName, phone);
        }}
        onViewApProfile={(apName) => {
          setActivationModalOpen(false);
          handleOpenApActivity(apName);
        }}
        onViewFullDetails={() => {
          setActivationModalOpen(false);
        }}
      />

      {/* Modal 2: Export Network Activity (Image 3) */}
      <RmExportActivityModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        onSuccess={handleExportSuccess}
      />

      {/* Modal 3: Retry Failed Activation (Image 2) */}
      <RmRetryActivationModal
        open={retryModalOpen}
        onOpenChange={setRetryModalOpen}
        failedItem={selectedFailedItem}
        onSuccess={handleRetrySuccess}
      />

      {/* Modal 4: Contact Agency Partner */}
      <RmContactApModal
        open={contactApModalOpen}
        onOpenChange={setContactApModalOpen}
        apName={selectedApForContact.name}
        phone={selectedApForContact.phone}
        onSuccess={handleContactSuccess}
      />

      {/* Modal 5: Agency Partner Activity Modal (Image 4) */}
      <RmApActivityModal
        open={apActivityModalOpen}
        onOpenChange={setApActivityModalOpen}
        apName={selectedApForActivity.name}
        scName={selectedApForActivity.sc}
        onViewProfile={() => {
          setApActivityModalOpen(false);
          navigate(appPaths.rmCustomers);
        }}
        onContactAp={(ap) => {
          setApActivityModalOpen(false);
          handleOpenContactAp(ap, "08120600542");
        }}
      />

      {/* Modal 6: State Coordinator Activity Modal (Image 5) */}
      <RmScActivityModal
        open={scActivityModalOpen}
        onOpenChange={setScActivityModalOpen}
        scName={selectedScForActivity.name}
        scState={selectedScForActivity.state}
        onViewProfile={() => {
          setScActivityModalOpen(false);
          navigate(appPaths.rmCustomers);
        }}
        onDistributeToSc={(sc) => {
          setScActivityModalOpen(false);
          handleOpenDistributeToSc(sc);
        }}
        onSelectAp={(ap) => {
          setScActivityModalOpen(false);
          handleOpenApActivity(ap, selectedScForActivity.name);
        }}
      />

      {/* Modal 7: Distribute Stock Modal */}
      <DistributeStockModal
        open={distributeModalOpen}
        onOpenChange={setDistributeModalOpen}
        scName={targetScForDistribute}
        onSuccess={handleDistributeSuccess}
      />

      {/* Modal 8: Reusable Success Modal */}
      <RmSuccessModal
        open={successModalState.open}
        onOpenChange={(open) => setSuccessModalState((prev) => ({ ...prev, open }))}
        title={successModalState.title}
        subtitle={successModalState.subtitle}
        details={successModalState.details}
      />
    </div>
  );
}

export default RmNetworkActivityPage;
