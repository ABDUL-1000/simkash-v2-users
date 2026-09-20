import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";

// Directory View Components (Image 1)
import { RmCustomersHeader } from "../components/customers/RmCustomersHeader";
import { RmCustomersKpiStrip } from "../components/customers/RmCustomersKpiStrip";
import {
  RmCustomersFilterBar,
  type ScFilterStatus,
} from "../components/customers/RmCustomersFilterBar";
import { RmScCardList } from "../components/customers/RmScCardList";
import { RmCustomersSidebar } from "../components/customers/RmCustomersSidebar";

// Performance Comparison Components (Image 2)
import {
  RmPerformanceHeader,
  type PerformanceTimeframe,
} from "../components/performance/RmPerformanceHeader";
import { RmTopPerformersPodium } from "../components/performance/RmTopPerformersPodium";
import {
  RmPerformanceFilterBar,
  type MetricKey,
} from "../components/performance/RmPerformanceFilterBar";
import { RmPerformanceTable } from "../components/performance/RmPerformanceTable";
import { RmPerformanceInsightsCards } from "../components/performance/RmPerformanceInsightsCards";

// Modals
import { ContactScModal } from "../Modals/ContactScModal";
import { DistributeStockModal } from "../Modals/DistributeStockModal";
import { ExportScReportModal } from "../Modals/ExportScReportModal";
import { OnboardScModal } from "../Modals/OnboardScModal";
import { DistributeAllScModal } from "../Modals/DistributeAllScModal";
import { BulkReminderModal } from "../Modals/BulkReminderModal";
import { ReactivateScModal } from "../Modals/ReactivateScModal";
import { ManageBonusLimitsModal } from "../Modals/ManageBonusLimitsModal";
import { RedistributeStockModal } from "../Modals/RedistributeStockModal";
import { OnboardAgencyPartnerModal } from "../Modals/OnboardAgencyPartnerModal";
import { SuspendScModal } from "../Modals/SuspendScModal";
import {
  RmSuccessModal,
  type RmSuccessDetailItem,
} from "../Modals/RmSuccessModal";

// Data & Types
import { INITIAL_STATE_COORDINATORS } from "../data/regional-manager.data";
import type { StateCoordinatorItem } from "../types/regional-manager.types";

export function RmCustomersPage() {
  const navigate = useNavigate();

  // Primary list state
  const [scs, setScs] = useState<StateCoordinatorItem[]>(INITIAL_STATE_COORDINATORS);

  // Tab state: Directory (Image 1) or Performance (Image 2)
  const [activeTab, setActiveTab] = useState<"directory" | "performance">("directory");

  // Directory View filters
  const [filterStatus, setFilterStatus] = useState<ScFilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("activations");

  // Performance View controls
  const [performanceTimeframe, setPerformanceTimeframe] = useState<PerformanceTimeframe>("month");
  const [perfSortBy, setPerfSortBy] = useState("activations");
  const [activeMetrics, setActiveMetrics] = useState<Record<MetricKey, boolean>>({
    activations: true,
    commission: true,
    stock: true,
    aps: true,
    bonus: true,
    avgAp: true,
  });

  // Modal states
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [distributeModalOpen, setDistributeModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [distributeAllModalOpen, setDistributeAllModalOpen] = useState(false);
  const [bulkReminderModalOpen, setBulkReminderModalOpen] = useState(false);
  const [reactivateModalOpen, setReactivateModalOpen] = useState(false);
  const [manageLimitsModalOpen, setManageLimitsModalOpen] = useState(false);
  const [redistributeModalOpen, setRedistributeModalOpen] = useState(false);
  const [onboardApModalOpen, setOnboardApModalOpen] = useState(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);

  // Target item for single-item modals
  const [selectedSc, setSelectedSc] = useState<StateCoordinatorItem | null>(null);

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

  const showSuccess = (title: string, subtitle: string, details: RmSuccessDetailItem[] = []) => {
    setSuccessModalState({
      open: true,
      title,
      subtitle,
      details,
    });
  };

  // Helper trigger methods
  const handleOpenContact = (sc: StateCoordinatorItem) => {
    setSelectedSc(sc);
    setContactModalOpen(true);
  };

  const handleOpenDistribute = (sc: StateCoordinatorItem) => {
    setSelectedSc(sc);
    setDistributeModalOpen(true);
  };

  const handleOpenReactivate = (sc: StateCoordinatorItem) => {
    setSelectedSc(sc);
    setReactivateModalOpen(true);
  };

  const handleOpenRedistribute = (sc?: StateCoordinatorItem) => {
    setSelectedSc(sc || null);
    setRedistributeModalOpen(true);
  };

  const handleOpenOnboardAp = (sc: StateCoordinatorItem) => {
    setSelectedSc(sc);
    setOnboardApModalOpen(true);
  };

  const handleOpenSuspend = (sc: StateCoordinatorItem) => {
    setSelectedSc(sc);
    setSuspendModalOpen(true);
  };

  // Triggers from alerts
  const handleResolveAlertSc = (scName: string) => {
    const found = scs.find((s) => s.name === scName) || scs[0];
    setSelectedSc(found);
    setReactivateModalOpen(true);
  };

  const handleDistributeAlertSc = (scName: string) => {
    const found = scs.find((s) => s.name === scName) || scs[0];
    setSelectedSc(found);
    setDistributeModalOpen(true);
  };

  const handleContactAlertSc = (scName: string) => {
    const found = scs.find((s) => s.name === scName) || scs[0];
    setSelectedSc(found);
    setContactModalOpen(true);
  };

  // Success handlers
  const handleOnboardSuccess = (newScData: any) => {
    const newSc: StateCoordinatorItem = {
      id: `sc-${Date.now()}`,
      code: `SC-SW-0${scs.length + 1}`,
      rank: scs.length + 1,
      initials: newScData.name
        ? newScData.name
            .split(" ")
            .map((n: string) => n[0])
            .join("")
        : "SC",
      name: newScData.name || "New State Coordinator",
      phone: newScData.phone || "0800 000 0000",
      email: `${(newScData.name || "sc").toLowerCase().replace(/\s+/g, ".")}@email.com`,
      state: newScData.state || "Lagos",
      status: "Active",
      stock: newScData.stock || 50,
      stockStatus: "Normal",
      apsCount: 0,
      activationsCount: 0,
      bonusStatus: "On Track",
      totalSales: "₦0",
      commission: "₦0",
      bonusEarned: "₦0",
      distributedSims: 0,
      totalAllocatedSims: 50,
      lastActive: "Just now",
      avatarBg: "#2563EB",
      simStockBreakdown: { pos: 30, cctv: 20, gps: 0, router: 0 },
    };

    setScs((prev) => [newSc, ...prev]);

    showSuccess("State Coordinator Onboarded!", "New SC has been successfully registered to your region.", [
      { label: "Coordinator Name", value: newSc.name },
      { label: "Operating State", value: newSc.state },
      { label: "Initial SIM Allocation", value: `${newSc.stock} SIMs` },
      { label: "Account Status", value: "Active" },
    ]);
  };

  const handleContactSuccess = (details: { scName: string; phone: string; message: string }) => {
    showSuccess("Message Dispatched!", `SMS notification sent to ${details.scName}.`, [
      { label: "Recipient", value: details.scName },
      { label: "Phone Number", value: details.phone },
      { label: "Message Preview", value: details.message.slice(0, 45) + "..." },
      { label: "Status", value: "Delivered via SMS Gateway" },
    ]);
  };

  const handleDistributeSuccess = (details: { scName: string; quantity: number; state: string }) => {
    setScs((prev) =>
      prev.map((s) =>
        s.name === details.scName
          ? {
              ...s,
              stock: s.stock + details.quantity,
              stockStatus: "Normal",
              distributedSims: (s.distributedSims || 0) + details.quantity,
            }
          : s
      )
    );

    showSuccess("SIMs Distributed Successfully!", `${details.quantity} SIMs allocated to ${details.scName}.`, [
      { label: "Recipient SC", value: details.scName },
      { label: "State", value: details.state },
      { label: "SIMs Dispatched", value: `${details.quantity} SIMs` },
      { label: "Source Inventory", value: "Regional Manager Pool" },
    ]);
  };

  const handleExportSuccess = (details: { reportType: string; format: string; period: string }) => {
    showSuccess("Report Generated!", "Your export has been processed and is ready for download.", [
      { label: "Report Type", value: details.reportType },
      { label: "File Format", value: details.format },
      { label: "Reporting Period", value: details.period },
      { label: "Included SCs", value: `${scs.length} State Coordinators` },
    ]);
  };

  const handleDistributeAllSuccess = (details: { perSc: number; totalDistributed: number }) => {
    setScs((prev) =>
      prev.map((s) =>
        s.status === "Active" || s.status === "At Risk"
          ? {
              ...s,
              stock: s.stock + details.perSc,
              stockStatus: "Normal",
              distributedSims: (s.distributedSims || 0) + details.perSc,
            }
          : s
      )
    );

    showSuccess("Network Stock Distributed!", `${details.totalDistributed} SIMs dispatched across all active SCs.`, [
      { label: "Allocation Per SC", value: `${details.perSc} SIMs` },
      { label: "Total Dispatched", value: `${details.totalDistributed} SIMs` },
      { label: "Status", value: "Direct Transfer Confirmed" },
    ]);
  };

  const handleBulkReminderSuccess = (details: { targetGroup: string; count: number }) => {
    showSuccess("Bulk Reminder Sent!", `Broadcast sent to ${details.count} coordinators in ${details.targetGroup}.`, [
      { label: "Target Audience", value: details.targetGroup },
      { label: "Total Recipients", value: `${details.count} SCs` },
      { label: "Delivery Channels", value: "SMS + In-App Push" },
    ]);
  };

  const handleReactivateSuccess = (scName: string) => {
    setScs((prev) =>
      prev.map((s) =>
        s.name === scName
          ? {
              ...s,
              status: "Active",
              stockStatus: s.stock > 0 ? "Normal" : "Low",
            }
          : s
      )
    );

    showSuccess("Account Reactivated!", `${scName} has been restored to active status.`, [
      { label: "Coordinator", value: scName },
      { label: "Platform Access", value: "Full Access Restored" },
      { label: "Linked Agency Partners", value: "Resumed Operations" },
    ]);
  };

  const handleManageLimitsSuccess = () => {
    showSuccess("Bonus & Inventory Thresholds Updated!", "New configuration applied to your regional metrics.", [
      { label: "Stock Alert Threshold", value: "Configured" },
      { label: "Bonus Targets", value: "Updated" },
      { label: "Effective Date", value: "Immediate" },
    ]);
  };

  const handleRedistributeSuccess = (details: {
    fromScName: string;
    toScName: string;
    quantity: number;
    fromNewStock: number;
    toNewStock: number;
  }) => {
    setScs((prev) =>
      prev.map((s) => {
        if (s.name === details.fromScName) {
          return { ...s, stock: details.fromNewStock };
        }
        if (s.name === details.toScName) {
          return { ...s, stock: details.toNewStock };
        }
        return s;
      })
    );

    showSuccess(
      "Stock Redistributed Successfully!",
      `${details.quantity} SIMs moved from ${details.fromScName} to ${details.toScName}.`,
      [
        { label: "Source Coordinator", value: `${details.fromScName} (${details.fromNewStock} SIMs remaining)` },
        { label: "Recipient Coordinator", value: `${details.toScName} (${details.toNewStock} SIMs total)` },
        { label: "Quantity Transferred", value: `${details.quantity} SIMs` },
        { label: "Status", value: "Instant Regional Transfer" },
      ]
    );
  };

  const handleOnboardApSuccess = (details: {
    apName: string;
    phone: string;
    scName: string;
    location: string;
  }) => {
    setScs((prev) =>
      prev.map((s) =>
        s.name === details.scName ? { ...s, apsCount: s.apsCount + 1 } : s
      )
    );

    showSuccess(
      "Agency Partner Onboarded!",
      `${details.apName} has been assigned under ${details.scName}.`,
      [
        { label: "Agency Partner", value: details.apName },
        { label: "Assigned SC", value: details.scName },
        { label: "Phone", value: details.phone },
        { label: "Operating Area", value: details.location },
      ]
    );
  };

  const handleSuspendSuccess = (details: { scName: string; reason: string; state: string }) => {
    setScs((prev) =>
      prev.map((s) =>
        s.name === details.scName
          ? { ...s, status: "Suspended", stockStatus: "Out of Stock" }
          : s
      )
    );

    showSuccess(
      "State Coordinator Suspended!",
      `${details.scName}'s account has been placed on hold.`,
      [
        { label: "Coordinator", value: details.scName },
        { label: "State", value: details.state },
        { label: "Suspension Reason", value: details.reason },
        { label: "Stock & Operations", value: "Frozen" },
      ]
    );
  };

  // Toggle metric visibility in comparison table
  const handleToggleMetric = (key: MetricKey) => {
    setActiveMetrics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Counts for status tabs
  const counts = useMemo(() => {
    const total = scs.length;
    const active = scs.filter((s) => s.status === "Active" || !s.status).length;
    const at_risk = scs.filter((s) => s.status === "At Risk").length;
    const suspended = scs.filter((s) => s.status === "Suspended").length;
    return {
      all: total,
      active,
      at_risk,
      suspended,
      pending: 0,
    };
  }, [scs]);

  // Filtered & Sorted SC list for Directory view
  const filteredScs = useMemo(() => {
    return scs
      .filter((sc) => {
        // Status filter
        if (filterStatus === "active" && sc.status !== "Active" && sc.status !== undefined) return false;
        if (filterStatus === "at_risk" && sc.status !== "At Risk") return false;
        if (filterStatus === "suspended" && sc.status !== "Suspended") return false;
        if (filterStatus === "pending") return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesName = sc.name.toLowerCase().includes(q);
          const matchesState = sc.state.toLowerCase().includes(q);
          const matchesPhone = sc.phone.includes(q);
          const matchesCode = (sc.code || "").toLowerCase().includes(q);
          if (!matchesName && !matchesState && !matchesPhone && !matchesCode) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "activations") return b.activationsCount - a.activationsCount;
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "state") return a.state.localeCompare(b.state);
        if (sortBy === "stock") return b.stock - a.stock;
        return 0;
      });
  }, [scs, filterStatus, searchQuery, sortBy]);

  // Sorted list for Performance table
  const performanceScs = useMemo(() => {
    return [...scs].sort((a, b) => {
      if (perfSortBy === "activations") return b.activationsCount - a.activationsCount;
      if (perfSortBy === "commission") {
        const cA = Number((a.commission || "0").replace(/[^0-9]/g, ""));
        const cB = Number((b.commission || "0").replace(/[^0-9]/g, ""));
        return cB - cA;
      }
      if (perfSortBy === "aps") return b.apsCount - a.apsCount;
      if (perfSortBy === "avgAp") {
        const avgA = a.avgPerAp || a.activationsCount / (a.apsCount || 1);
        const avgB = b.avgPerAp || b.activationsCount / (b.apsCount || 1);
        return avgB - avgA;
      }
      return b.activationsCount - a.activationsCount;
    });
  }, [scs, perfSortBy]);

  return (
    <div className="space-y-6">
      {/* 1. Header with View Toggle & Onboard Action */}
      <RmCustomersHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOnboardSc={() => setOnboardModalOpen(true)}
      />

      {/* VIEW 1: Directory View (Image 1) */}
      {activeTab === "directory" && (
        <>
          {/* 2. Top 5 KPI Metric Cards */}
          <RmCustomersKpiStrip
            totalScs={counts.all}
            activeScs={counts.active}
            atRiskScs={counts.at_risk}
            suspendedScs={counts.suspended}
            agencyPartners={247}
          />

          {/* 3. Filter, Sort & Search Row */}
          <RmCustomersFilterBar
            currentFilter={filterStatus}
            onFilterChange={setFilterStatus}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            counts={counts}
          />

          {/* 4. Main 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Column (8 cols): SC Cards List */}
            <div className="lg:col-span-8">
              <RmScCardList
                scs={filteredScs}
                onDistribute={handleOpenDistribute}
                onContact={handleOpenContact}
                onReactivate={handleOpenReactivate}
                onOnboardAp={handleOpenOnboardAp}
                onSuspend={handleOpenSuspend}
                onRedistribute={handleOpenRedistribute}
              />
            </div>

            {/* Right Column (4 cols): Side Widgets */}
            <div className="lg:col-span-4">
              <RmCustomersSidebar
                onOnboardSc={() => setOnboardModalOpen(true)}
                onDistributeAll={() => setDistributeAllModalOpen(true)}
                onRedistributeStock={() => handleOpenRedistribute()}
                onSendBulkReminder={() => setBulkReminderModalOpen(true)}
                onExportNetwork={() => setExportModalOpen(true)}
                onViewNetworkActivity={() => navigate(appPaths.rmNetworkActivity)}
                onDistributeSc={handleDistributeAlertSc}
                onContactSc={handleContactAlertSc}
                onResolveSc={handleResolveAlertSc}
                onManageLimits={() => setManageLimitsModalOpen(true)}
                onViewAllDetails={() => setActiveTab("performance")}
              />
            </div>
          </div>
        </>
      )}

      {/* VIEW 2: Performance Comparison View (Image 2) */}
      {activeTab === "performance" && (
        <div className="space-y-6">
          {/* Subheader with Timeframe selector & Export Report */}
          <RmPerformanceHeader
            timeframe={performanceTimeframe}
            onTimeframeChange={setPerformanceTimeframe}
            onExportReport={() => setExportModalOpen(true)}
          />

          {/* Top 3 Performers Podium Cards */}
          <RmTopPerformersPodium />

          {/* Table Controls (Sort dropdown + Column Toggles) */}
          <RmPerformanceFilterBar
            sortBy={perfSortBy}
            onSortChange={setPerfSortBy}
            activeMetrics={activeMetrics}
            onToggleMetric={handleToggleMetric}
          />

          {/* Comparison Table */}
          <RmPerformanceTable
            scs={performanceScs}
            activeMetrics={activeMetrics}
            onDistribute={handleOpenDistribute}
            onReactivate={handleOpenReactivate}
          />

          {/* Bottom 3 Insight Alert Cards */}
          <RmPerformanceInsightsCards />
        </div>
      )}

      {/* ALL MODALS LINKED */}
      {/* 1. Onboard SC Modal */}
      <OnboardScModal
        open={onboardModalOpen}
        onOpenChange={setOnboardModalOpen}
        onSuccess={handleOnboardSuccess}
      />

      {/* 2. Contact SC Modal (Image 3) */}
      <ContactScModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        sc={selectedSc}
        onSuccess={handleContactSuccess}
      />

      {/* 3. Distribute SIMs Modal (Image 5) */}
      <DistributeStockModal
        open={distributeModalOpen}
        onOpenChange={setDistributeModalOpen}
        sc={selectedSc}
        onSuccess={handleDistributeSuccess}
      />

      {/* 4. Export SC Report Modal (Image 4) */}
      <ExportScReportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        onSuccess={handleExportSuccess}
      />

      {/* 5. Distribute to All SCs Modal */}
      <DistributeAllScModal
        open={distributeAllModalOpen}
        onOpenChange={setDistributeAllModalOpen}
        onSuccess={handleDistributeAllSuccess}
      />

      {/* 6. Send Bulk Reminder Modal */}
      <BulkReminderModal
        open={bulkReminderModalOpen}
        onOpenChange={setBulkReminderModalOpen}
        onSuccess={handleBulkReminderSuccess}
      />

      {/* 7. Reactivate SC Modal */}
      <ReactivateScModal
        open={reactivateModalOpen}
        onOpenChange={setReactivateModalOpen}
        sc={selectedSc}
        onSuccess={handleReactivateSuccess}
      />

      {/* 8. Manage Bonus & SIM Limits Modal */}
      <ManageBonusLimitsModal
        open={manageLimitsModalOpen}
        onOpenChange={setManageLimitsModalOpen}
        onSuccess={handleManageLimitsSuccess}
      />

      {/* 9. Redistribute Stock Modal (Batch 2 Image 1) */}
      <RedistributeStockModal
        open={redistributeModalOpen}
        onOpenChange={setRedistributeModalOpen}
        scs={scs}
        defaultFromSc={selectedSc}
        onSuccess={handleRedistributeSuccess}
      />

      {/* 10. Onboard Agency Partner Modal (Batch 2 Image 2) */}
      <OnboardAgencyPartnerModal
        open={onboardApModalOpen}
        onOpenChange={setOnboardApModalOpen}
        sc={selectedSc}
        onSuccess={handleOnboardApSuccess}
      />

      {/* 11. Suspend SC Account Modal (Batch 2 Image 3) */}
      <SuspendScModal
        open={suspendModalOpen}
        onOpenChange={setSuspendModalOpen}
        sc={selectedSc}
        onSuccess={handleSuspendSuccess}
      />

      {/* 12. Reusable Success Confirmation Modal */}
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

export default RmCustomersPage;
