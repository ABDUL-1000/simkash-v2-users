import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { APP_COLORS } from "@/constants/colors";

// Data & Types
import {
  CA_ACTIVATION_TOP_KPIS,
  CA_SIM_STOCKS,
  CA_SIM_STOCKS_LOW,
  CA_PLAN_OPTIONS,
  CA_SAMPLE_BULK_SIMS,
  CA_PENDING_ACTIVATIONS,
  CA_HISTORY_RECORDS,
  CA_HISTORY_ANALYTICS,
} from "../data/ca-sim-activation.data";
import type {
  CaActivationHistoryRecord,
  CaActivationStep,
  CaBulkSimItem,
  CaNetworkProvider,
  CaPendingActivationItem,
  CaSimType,
} from "../types/ca-sim-activation.types";

// Components
import { CaActivationHeader } from "../components/CaActivationHeader";
import { CaActivationTopKpis } from "../components/CaActivationTopKpis";
import { CaLowStockWarningBanner } from "../components/CaLowStockWarningBanner";
import { CaActivationStepper } from "../components/CaActivationStepper";
import { CaSimTypeSelector } from "../components/CaSimTypeSelector";
import { CaNetworkSelector } from "../components/CaNetworkSelector";
import { CaSingleSimForm } from "../components/CaSingleSimForm";
import { CaBulkActivationForm } from "../components/CaBulkActivationForm";
import { CaCustomerInfoStep } from "../components/CaCustomerInfoStep";
import { CaConfirmStep } from "../components/CaConfirmStep";

// Pending Components
import { CaPendingStatsStrip } from "../components/pending/CaPendingStatsStrip";
import { CaPendingAlertBanner } from "../components/pending/CaPendingAlertBanner";
import { CaPendingFilterBar } from "../components/pending/CaPendingFilterBar";
import { CaPendingCard } from "../components/pending/CaPendingCard";

// History Components
import { CaHistoryTopKpis } from "../components/history/CaHistoryTopKpis";
import { CaHistoryFilters } from "../components/history/CaHistoryFilters";
import { CaHistoryTable } from "../components/history/CaHistoryTable";
import { CaHistoryAnalyticsSidebar } from "../components/history/CaHistoryAnalyticsSidebar";

// Modals
import { CaConfirmActivationModal } from "../Modals/CaConfirmActivationModal";
import { CaPendingRetryAllModal } from "../Modals/CaPendingRetryAllModal";
import { CaCancelPendingModal } from "../Modals/CaCancelPendingModal";
import { CaActivationRecordDetailsModal } from "../Modals/CaActivationRecordDetailsModal";
import { CaExportHistoryModal } from "../Modals/CaExportHistoryModal";
import { CaScanQrModal } from "../Modals/CaScanQrModal";
import { CaBonusTargetHitModal } from "../Modals/CaBonusTargetHitModal";
import { CaBulkActivationConfirmModal } from "../Modals/CaBulkActivationConfirmModal";
import { CaRetryPendingModal } from "../Modals/CaRetryPendingModal";
import { CaSwitchNetworkModal } from "../Modals/CaSwitchNetworkModal";
import { CaSuccessModal, type CaSuccessDetailItem } from "../../Modals/CaSuccessModal";
import { CaRequestStockModal } from "../../Modals/CaRequestStockModal";

export function CaSimActivationPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Tab: "activate" | "pending" | "history"
  const tabParam = searchParams.get("tab");
  const activeTab: "activate" | "pending" | "history" =
    tabParam === "pending" || tabParam === "history" || tabParam === "activate"
      ? tabParam
      : "activate";

  const handleTabChange = (tab: "activate" | "pending" | "history") => {
    setSearchParams({ tab });
  };

  // --- ACTIVATE TAB STATE ---
  const [currentStep, setCurrentStep] = useState<CaActivationStep>(1);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [isLowStockSimulation, setIsLowStockSimulation] = useState(false);

  // Single SIM Form fields
  const [selectedSimType, setSelectedSimType] = useState<CaSimType>("POS SIM");
  const [selectedNetwork, setSelectedNetwork] = useState<CaNetworkProvider>("MTN");
  const [simNumber, setSimNumber] = useState("07022222222");
  const [selectedPlanId, setSelectedPlanId] = useState("30-days");

  // Step 2 Customer fields
  const [customerName, setCustomerName] = useState("Chidi Eze");
  const [customerPhone, setCustomerPhone] = useState("08120600542");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  // Bulk SIM fields
  const [bulkSims, setBulkSims] = useState<CaBulkSimItem[]>(CA_SAMPLE_BULK_SIMS);
  const [sameCustomerForAll, setSameCustomerForAll] = useState(true);

  // --- PENDING TAB STATE ---
  const [pendingList, setPendingList] = useState<CaPendingActivationItem[]>(
    CA_PENDING_ACTIVATIONS
  );
  const [pendingFilter, setPendingFilter] = useState<
    "all" | "verifying" | "processing" | "stuck"
  >("all");
  const [pendingSortOrder, setPendingSortOrder] = useState<"oldest" | "newest">(
    "oldest"
  );

  // --- HISTORY TAB STATE ---
  const [historyRecords, setHistoryRecords] = useState<CaActivationHistoryRecord[]>(
    CA_HISTORY_RECORDS
  );
  const [historyStatusFilter, setHistoryStatusFilter] = useState("All");
  const [historyTypeFilter, setHistoryTypeFilter] = useState("All");
  const [historyNetworkFilter, setHistoryNetworkFilter] = useState("All");
  const [historyDateRange, setHistoryDateRange] = useState("This Month");
  const [historySearchQuery, setHistorySearchQuery] = useState("");
  const [historySortOrder, setHistorySortOrder] = useState("newest");
  const [historyPage, setHistoryPage] = useState(1);

  // --- MODALS STATE ---
  const [confirmActivationModalOpen, setConfirmActivationModalOpen] = useState(false);
  const [pendingRetryModalOpen, setPendingRetryModalOpen] = useState(false);
  const [selectedPendingItem, setSelectedPendingItem] =
    useState<CaPendingActivationItem | null>(null);
  const [pendingRetryAllModalOpen, setPendingRetryAllModalOpen] = useState(false);
  const [cancelPendingModalOpen, setCancelPendingModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] =
    useState<CaActivationHistoryRecord | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [scanQrModalOpen, setScanQrModalOpen] = useState(false);
  const [requestStockModalOpen, setRequestStockModalOpen] = useState(false);

  // New Requested Modals
  const [bonusTargetHitModalOpen, setBonusTargetHitModalOpen] = useState(false);
  const [bulkConfirmModalOpen, setBulkConfirmModalOpen] = useState(false);
  const [switchNetworkModalOpen, setSwitchNetworkModalOpen] = useState(false);

  // Unified Success Feedback Modal State
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState("Action Successful!");
  const [successSubtitle, setSuccessSubtitle] = useState<string | undefined>();
  const [successDetails, setSuccessDetails] = useState<CaSuccessDetailItem[]>([]);

  const triggerSuccessModal = (
    title: string,
    subtitle?: string,
    details: CaSuccessDetailItem[] = []
  ) => {
    setSuccessTitle(title);
    setSuccessSubtitle(subtitle);
    setSuccessDetails(details);
    setSuccessModalOpen(true);
  };

  // --- HANDLERS ---
  const handleClearForm = () => {
    setSimNumber("");
    setCustomerName("");
    setCustomerPhone("");
    setAddress("");
    setEmail("");
    setNotes("");
  };

  const handleUpdateBulkText = (text: string) => {
    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

    const updated: CaBulkSimItem[] = lines.map((num, i) => {
      let status: "valid" | "invalid" | "already_active" | "checking" | "pending" = "valid";
      if (num.length !== 11) status = "invalid";
      else if (i === 2) status = "already_active";
      else if (i === 3) status = "checking";
      else if (i >= 4) status = "pending";

      return {
        id: `bulk-${i}-${num}`,
        simNumber: num,
        status,
        errorMessage: status === "already_active" ? "Already active" : undefined,
      };
    });

    setBulkSims(updated);
  };

  const handleConfirmSingleActivation = () => {
    const selectedPlan =
      CA_PLAN_OPTIONS.find((p) => p.id === selectedPlanId) || CA_PLAN_OPTIONS[0];

    // Add to history records
    const newRecord: CaActivationHistoryRecord = {
      id: `hist-new-${Date.now()}`,
      date: "Today",
      time: "Just now",
      dateGroup: "TODAY",
      simNumber,
      simType: selectedSimType,
      network: selectedNetwork,
      planName: selectedPlan.label,
      planPrice: selectedPlan.price,
      commission: "+₦600",
      status: "Completed",
      customerName,
      customerPhone,
      address,
      email,
      reference: `ACT-2026-00${Math.floor(1000 + Math.random() * 9000)}`,
      activatedAt: "Just now",
      expiryDate: selectedPlan.expiryDate,
      stockUsed: `1 ${selectedSimType} (499 remaining)`,
      walletBalanceAfter: "₦285,300",
    };

    setHistoryRecords([newRecord, ...historyRecords]);
    setCurrentStep(1);

    // Trigger Bonus Target Hit celebration modal matching Modal 1 reference
    setBonusTargetHitModalOpen(true);
  };

  const handleConfirmBulkActivation = () => {
    const validCount = bulkSims.filter((s) => s.status === "valid").length;
    const totalCommission = validCount * 600;

    triggerSuccessModal(
      "Bulk Activations Queued!",
      `${validCount} SIM activations have been dispatched to ${selectedNetwork}. Commission of +₦${totalCommission.toLocaleString()} will be credited upon network confirmation.`,
      [
        { label: "Total Submitted", value: `${bulkSims.length} SIM cards` },
        { label: "Valid SIMs Queued", value: `${validCount} activations` },
        { label: "Network Provider", value: selectedNetwork },
        { label: "SIM Type", value: selectedSimType },
        { label: "Total Estimated Commission", value: `+₦${totalCommission.toLocaleString()}` },
      ]
    );

    setIsBulkMode(false);
  };

  // Pending Actions
  const handleOpenRetryModal = (item: CaPendingActivationItem) => {
    setSelectedPendingItem(item);
    setPendingRetryModalOpen(true);
  };

  const handleConfirmRetrySingle = (item: CaPendingActivationItem) => {
    setPendingList((prev) =>
      prev.map((p) =>
        p.id === item.id
          ? {
              ...p,
              statusText: "Processing...",
              statusType: "processing",
              isStuck: false,
              attemptsCount: p.attemptsCount + 1,
            }
          : p
      )
    );

    triggerSuccessModal(
      "Activation Re-dispatched!",
      `Request for SIM ${item.simNumber} (${item.customerName}) has been re-submitted to ${item.network}.`,
      [
        { label: "SIM Number", value: item.simNumber },
        { label: "Customer", value: item.customerName },
        { label: "Carrier", value: item.network },
        { label: "Attempts", value: String(item.attemptsCount + 1) },
      ]
    );
  };

  const handleConfirmRetryAll = () => {
    setPendingList((prev) =>
      prev.map((p) => ({
        ...p,
        statusText: "Processing...",
        statusType: "processing",
        isStuck: false,
        attemptsCount: p.attemptsCount + 1,
      }))
    );

    triggerSuccessModal(
      "All Pending Activations Retried!",
      `All pending activations have been re-queued for network carrier verification.`,
      [
        { label: "Total Retried", value: "3 SIM activations" },
        { label: "Status", value: "Re-dispatched to network gateways" },
      ]
    );
  };

  const handleOpenCancelModal = (item: CaPendingActivationItem) => {
    setSelectedPendingItem(item);
    setCancelPendingModalOpen(true);
  };

  const handleConfirmCancelSingle = (item: CaPendingActivationItem) => {
    setPendingList((prev) => prev.filter((p) => p.id !== item.id));

    triggerSuccessModal(
      "Activation Cancelled",
      `Activation for ${item.simNumber} has been terminated. 1 ${item.simType} has been restored to your stock.`,
      [
        { label: "SIM Number", value: item.simNumber },
        { label: "Customer", value: item.customerName },
        { label: "Restored to Stock", value: `1 ${item.simType}` },
      ]
    );
  };

  const handleConfirmSwitchNetwork = (newNetwork: string) => {
    if (!selectedPendingItem) return;
    setPendingList((prev) =>
      prev.map((p) =>
        p.id === selectedPendingItem.id
          ? {
              ...p,
              network: newNetwork as CaNetworkProvider,
              statusText: "Processing...",
              statusType: "processing",
              isStuck: false,
            }
          : p
      )
    );

    triggerSuccessModal(
      "Network Switched Successfully!",
      `Operator for SIM ${selectedPendingItem.simNumber} changed to ${newNetwork}. Request has been re-dispatched.`,
      [
        { label: "SIM Number", value: selectedPendingItem.simNumber },
        { label: "Subscriber", value: selectedPendingItem.customerName },
        { label: "New Carrier", value: newNetwork },
        { label: "Status", value: "Re-provisioning" },
      ]
    );
  };

  const handleViewPendingDetails = (item: CaPendingActivationItem) => {
    const simulatedRecord: CaActivationHistoryRecord = {
      id: item.id,
      date: "Today",
      time: item.firstAttemptTime,
      dateGroup: "TODAY",
      simNumber: item.simNumber,
      simType: item.simType,
      network: item.network,
      planName: "30-day",
      planPrice: "₦5,000",
      commission: `₦${item.commission}`,
      status: "Pending",
      customerName: item.customerName,
      customerPhone: item.customerPhone,
      reference: item.requestId,
      activatedAt: item.firstAttemptTime,
      expiryDate: "Pending network",
      stockUsed: `1 ${item.simType}`,
      walletBalanceAfter: "Pending completion",
      failureReason: item.lastError,
    };
    setSelectedRecord(simulatedRecord);
    setDetailsModalOpen(true);
  };

  const handleViewHistoryRecord = (record: CaActivationHistoryRecord) => {
    setSelectedRecord(record);
    setDetailsModalOpen(true);
  };

  // Stock Request from super admin
  const handleConfirmStockRequest = (details: {
    totalRequested: number;
    requestRef: string;
    urgency: string;
    stockAfter: number;
  }) => {
    triggerSuccessModal(
      "Stock Request Submitted!",
      `Your request for ${details.totalRequested} SIM cards has been transmitted to Super Admin. Reference: ${details.requestRef}.`,
      [
        { label: "Quantity Requested", value: `${details.totalRequested} SIM cards` },
        { label: "Urgency Level", value: details.urgency.toUpperCase() },
        { label: "Expected Stock After", value: `${details.stockAfter} SIMs` },
        { label: "Request Reference", value: details.requestRef },
        { label: "Approval Status", value: "Pending Super Admin Approval" },
      ]
    );
  };

  // Export
  const handleExportSuccess = (format: string, dateRange: string) => {
    triggerSuccessModal(
      "Report Exported!",
      `Your ${format} export for ${dateRange} has been generated and downloaded.`,
      [
        { label: "Export File", value: `simkash_ca_activations_${Date.now()}.${format.toLowerCase()}` },
        { label: "Date Range", value: dateRange },
        { label: "Records Included", value: "312 activations" },
      ]
    );
  };

  // Filtered pending items
  const filteredPending = pendingList.filter((item) => {
    if (pendingFilter === "all") return true;
    if (pendingFilter === "verifying") return item.statusType === "verifying";
    if (pendingFilter === "processing") return item.statusType === "processing";
    if (pendingFilter === "stuck") return item.statusType === "stuck";
    return true;
  });

  // Filtered history items
  const filteredHistory = historyRecords.filter((rec) => {
    if (historyStatusFilter !== "All" && rec.status !== historyStatusFilter) return false;
    if (historyTypeFilter !== "All" && rec.simType !== historyTypeFilter) return false;
    if (historyNetworkFilter !== "All" && rec.network !== historyNetworkFilter) return false;
    if (historySearchQuery) {
      const q = historySearchQuery.toLowerCase();
      const matchNumber = rec.simNumber.includes(q);
      const matchCustomer = rec.customerName.toLowerCase().includes(q);
      const matchRef = rec.reference.toLowerCase().includes(q);
      if (!matchNumber && !matchCustomer && !matchRef) return false;
    }
    return true;
  });

  const selectedPlanObj =
    CA_PLAN_OPTIONS.find((p) => p.id === selectedPlanId) || CA_PLAN_OPTIONS[0];

  const currentStocks = isLowStockSimulation ? CA_SIM_STOCKS_LOW : CA_SIM_STOCKS;

  return (
    <div
      className="min-h-screen pb-16 pt-4 px-4 sm:px-6 lg:px-8 space-y-6"
      style={{ backgroundColor: APP_COLORS.backgrounds.base }}
    >
      {/* 1. TOP HEADER WITH VIEW SWITCHERS */}
      <CaActivationHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        pendingCount={pendingList.length}
        onExportHistory={() => setExportModalOpen(true)}
      />

      {/* Dev simulation toggle for Low Stock preview */}
      <div className="flex items-center justify-end gap-2 text-[11px] font-bold text-slate-400">
        <span>Test State:</span>
        <button
          type="button"
          onClick={() => setIsLowStockSimulation(!isLowStockSimulation)}
          className="underline hover:text-slate-600 cursor-pointer"
        >
          {isLowStockSimulation ? "Switch to Normal Stock" : "Simulate Low Stock Alert"}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: ACTIVATE NEW SIM */}
      {/* ========================================================================= */}
      {activeTab === "activate" && (
        <div className="space-y-6">
          {/* Top 4 KPI Stat Cards */}
          <CaActivationTopKpis
            data={CA_ACTIVATION_TOP_KPIS}
            isLowStockState={isLowStockSimulation}
          />

          {/* Low Stock Alert Banner (shown when low stock is simulated or true) */}
          {isLowStockSimulation && (
            <CaLowStockWarningBanner
              remainingCount={40}
              simType="POS SIM"
              onRequestStock={() => setRequestStockModalOpen(true)}
            />
          )}

          {/* Stepper Indicator */}
          <div
            className="p-6 rounded-3xl border bg-white shadow-2xs space-y-6"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <CaActivationStepper
              currentStep={currentStep}
              isBulkMode={isBulkMode}
            />

            {/* STEP 1: SIM DETAILS */}
            {currentStep === 1 && (
              <div className="space-y-6 pt-2">
                {/* Sim Type Selector */}
                <CaSimTypeSelector
                  selectedType={selectedSimType}
                  onSelectType={setSelectedSimType}
                  stocks={currentStocks}
                />

                {/* Network Provider Selector */}
                <CaNetworkSelector
                  selectedNetwork={selectedNetwork}
                  onSelectNetwork={setSelectedNetwork}
                />

                {/* Either Single SIM Form or Bulk Activation Form */}
                {!isBulkMode ? (
                  <CaSingleSimForm
                    simNumber={simNumber}
                    onSimNumberChange={setSimNumber}
                    onScanQr={() => setScanQrModalOpen(true)}
                    isMultipleSims={isBulkMode}
                    onToggleMultipleSims={(val) => setIsBulkMode(val)}
                    plans={CA_PLAN_OPTIONS}
                    selectedPlanId={selectedPlanId}
                    onSelectPlan={setSelectedPlanId}
                    commissionAmount={600}
                    combinedTargetCurrent={2218}
                    combinedTargetTotal={3000}
                    onClearForm={handleClearForm}
                    onNext={() => setCurrentStep(2)}
                  />
                ) : (
                  <CaBulkActivationForm
                    bulkSims={bulkSims}
                    onUpdateBulkText={handleUpdateBulkText}
                    onClearBulk={() => setBulkSims([])}
                    onPasteClipboard={() => handleUpdateBulkText("07022222222\n07033333333\n07044444444\n07055555555\n07066666666")}
                    sameCustomerForAll={sameCustomerForAll}
                    onToggleSameCustomer={setSameCustomerForAll}
                    onCancel={() => setIsBulkMode(false)}
                    onReviewAndConfirm={() => setBulkConfirmModalOpen(true)}
                    combinedTargetCurrent={2218}
                  />
                )}
              </div>
            )}

            {/* STEP 2: CUSTOMER INFO */}
            {currentStep === 2 && (
              <div className="pt-2">
                <CaCustomerInfoStep
                  customerName={customerName}
                  onCustomerNameChange={setCustomerName}
                  customerPhone={customerPhone}
                  onCustomerPhoneChange={setCustomerPhone}
                  address={address}
                  onAddressChange={setAddress}
                  email={email}
                  onEmailChange={setEmail}
                  notes={notes}
                  onNotesChange={setNotes}
                  onBack={() => setCurrentStep(1)}
                  onNext={() => setCurrentStep(3)}
                />
              </div>
            )}

            {/* STEP 3: CONFIRMATION STEP */}
            {currentStep === 3 && (
              <div className="pt-2">
                <CaConfirmStep
                  simNumber={isBulkMode ? `${bulkSims.filter(s => s.status === "valid").length} SIMs in Batch` : simNumber}
                  simType={selectedSimType}
                  network={selectedNetwork}
                  plan={selectedPlanObj}
                  customerName={customerName}
                  customerPhone={customerPhone}
                  address={address}
                  email={email}
                  commissionAmount={isBulkMode ? bulkSims.filter(s => s.status === "valid").length * 600 : 600}
                  stockRemaining={isLowStockSimulation ? 39 : 499}
                  onBack={() => setCurrentStep(2)}
                  onConfirm={() => {
                    if (isBulkMode) {
                      setBulkConfirmModalOpen(true);
                    } else {
                      setConfirmActivationModalOpen(true);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: PENDING ACTIVATIONS */}
      {/* ========================================================================= */}
      {activeTab === "pending" && (
        <div className="space-y-6">
          {/* Warning Banner for Stuck Activations */}
          <CaPendingAlertBanner
            stuckCount={pendingList.filter((p) => p.isStuck).length}
            onRetryAll={() => setPendingRetryAllModalOpen(true)}
          />

          {/* 4 Stat Metrics */}
          <CaPendingStatsStrip
            pendingCount={pendingList.length}
            successToday={8}
            failedToday={2}
            avgWait="4m"
          />

          {/* Filter Bar & Controls */}
          <CaPendingFilterBar
            activeFilter={pendingFilter}
            onFilterChange={setPendingFilter}
            counts={{
              all: pendingList.length,
              verifying: pendingList.filter((p) => p.statusType === "verifying").length,
              processing: pendingList.filter((p) => p.statusType === "processing").length,
              stuck: pendingList.filter((p) => p.statusType === "stuck").length,
            }}
            sortOrder={pendingSortOrder}
            onSortOrderChange={setPendingSortOrder}
          />

          {/* List of Pending Activations */}
          <div className="space-y-3">
            <div className="text-xs font-black uppercase tracking-wider text-slate-400">
              PENDING ACTIVATIONS ({filteredPending.length})
            </div>

            {filteredPending.length === 0 ? (
              <div
                className="p-12 text-center rounded-2xl border bg-white space-y-2"
                style={{ borderColor: APP_COLORS.greys.stroke }}
              >
                <p className="text-sm font-bold text-slate-700">
                  No pending activations in this filter.
                </p>
                <p className="text-xs text-slate-400">
                  All submitted SIM cards have completed carrier provisioning.
                </p>
              </div>
            ) : (
              filteredPending.map((item) => (
                <CaPendingCard
                  key={item.id}
                  item={item}
                  onRetry={handleOpenRetryModal}
                  onCancel={handleOpenCancelModal}
                  onViewDetails={handleViewPendingDetails}
                  onSwitchNetwork={(it) => {
                    setSelectedPendingItem(it);
                    setSwitchNetworkModalOpen(true);
                  }}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: ACTIVATION HISTORY */}
      {/* ========================================================================= */}
      {activeTab === "history" && (
        <div className="space-y-6">
          {/* 5 Top Stat Cards */}
          <CaHistoryTopKpis />

          {/* Filter Controls & Search */}
          <CaHistoryFilters
            statusFilter={historyStatusFilter}
            onStatusFilterChange={setHistoryStatusFilter}
            typeFilter={historyTypeFilter}
            onTypeFilterChange={setHistoryTypeFilter}
            networkFilter={historyNetworkFilter}
            onNetworkFilterChange={setHistoryNetworkFilter}
            dateRange={historyDateRange}
            onDateRangeChange={setHistoryDateRange}
            searchQuery={historySearchQuery}
            onSearchQueryChange={setHistorySearchQuery}
            sortOrder={historySortOrder}
            onSortOrderChange={setHistorySortOrder}
            totalCount={312}
            filteredCount={filteredHistory.length}
            onClearFilters={() => {
              setHistoryStatusFilter("All");
              setHistoryTypeFilter("All");
              setHistoryNetworkFilter("All");
              setHistoryDateRange("All Time");
              setHistorySearchQuery("");
            }}
          />

          {/* 2-Column Layout: Left Table, Right Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: History Records Table (8 cols on lg) */}
            <div className="lg:col-span-8 space-y-4">
              <CaHistoryTable
                records={filteredHistory}
                onViewRecord={handleViewHistoryRecord}
                currentPage={historyPage}
                onPageChange={setHistoryPage}
                totalPages={21}
                totalCount={312}
              />
            </div>

            {/* Right: Analytics & Contribution (4 cols on lg) */}
            <div className="lg:col-span-4 space-y-4">
              <CaHistoryAnalyticsSidebar analytics={CA_HISTORY_ANALYTICS} />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. Confirm Single Activation Modal */}
      <CaConfirmActivationModal
        open={confirmActivationModalOpen}
        onOpenChange={setConfirmActivationModalOpen}
        simNumber={simNumber}
        simType={selectedSimType}
        network={selectedNetwork}
        plan={selectedPlanObj}
        customerName={customerName}
        customerPhone={customerPhone}
        commission={600}
        onConfirmSuccess={handleConfirmSingleActivation}
      />

      {/* 2. Retry Single Pending Modal matching Modal 3 screenshot */}
      <CaRetryPendingModal
        open={pendingRetryModalOpen}
        onOpenChange={setPendingRetryModalOpen}
        item={selectedPendingItem}
        onConfirmRetry={() => {
          if (selectedPendingItem) {
            handleConfirmRetrySingle(selectedPendingItem);
          }
        }}
      />

      {/* 3. Retry All Pending Modal */}
      <CaPendingRetryAllModal
        open={pendingRetryAllModalOpen}
        onOpenChange={setPendingRetryAllModalOpen}
        count={pendingList.length}
        onConfirmSuccess={handleConfirmRetryAll}
      />

      {/* 4. Cancel Pending Modal */}
      <CaCancelPendingModal
        open={cancelPendingModalOpen}
        onOpenChange={setCancelPendingModalOpen}
        item={selectedPendingItem}
        onConfirmCancel={handleConfirmCancelSingle}
      />

      {/* 5. View Full Record Details Modal */}
      <CaActivationRecordDetailsModal
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        record={selectedRecord}
      />

      {/* 6. Export History Modal */}
      <CaExportHistoryModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        onExportSuccess={handleExportSuccess}
      />

      {/* 7. Barcode / QR Scan Modal */}
      <CaScanQrModal
        open={scanQrModalOpen}
        onOpenChange={setScanQrModalOpen}
        onScanSuccess={(scanned) => setSimNumber(scanned)}
      />

      {/* 8. Bonus Target Hit Celebration Modal matching Modal 1 screenshot */}
      <CaBonusTargetHitModal
        open={bonusTargetHitModalOpen}
        onOpenChange={setBonusTargetHitModalOpen}
        bonusAmount={15000}
        activationCommission={600}
        previousWallet={269700}
        newWallet={285300}
        simNumber={simNumber}
        simType={selectedSimType}
        network={selectedNetwork}
        customerName={customerName}
        customerPhone={customerPhone}
        planName={selectedPlanObj.label}
        onActivateAnother={() => {
          handleClearForm();
          setCurrentStep(1);
        }}
        onDone={() => {
          setCurrentStep(1);
        }}
      />

      {/* 9. Confirm Bulk Activation Modal with PIN matching Modal 2 screenshot */}
      <CaBulkActivationConfirmModal
        open={bulkConfirmModalOpen}
        onOpenChange={setBulkConfirmModalOpen}
        totalCount={bulkSims.filter((s) => s.status === "valid").length || 12}
        totalCommission={
          (bulkSims.filter((s) => s.status === "valid").length || 10) * 600
        }
        onConfirmSuccess={handleConfirmBulkActivation}
      />

      {/* 10. Switch Network Modal matching Modal 4 screenshot */}
      <CaSwitchNetworkModal
        open={switchNetworkModalOpen}
        onOpenChange={setSwitchNetworkModalOpen}
        simNumber={selectedPendingItem?.simNumber}
        currentNetwork={selectedPendingItem?.network}
        customerName={selectedPendingItem?.customerName}
        onConfirmSwitch={handleConfirmSwitchNetwork}
      />

      {/* 11. Request Stock Modal */}
      <CaRequestStockModal
        open={requestStockModalOpen}
        onOpenChange={setRequestStockModalOpen}
        onSuccess={handleConfirmStockRequest}
      />

      {/* 12. Success Modal Feedback */}
      <CaSuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title={successTitle}
        subtitle={successSubtitle}
        details={successDetails}
        doneButtonText="Done"
      />
    </div>
  );
}

export default CaSimActivationPage;
