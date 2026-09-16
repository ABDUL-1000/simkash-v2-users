import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { APP_COLORS } from "@/constants/colors";
import { RmPerformancePageHeader } from "../components/performance-page/RmPerformancePageHeader";
import { RmPerformanceTopKpis } from "../components/performance-page/RmPerformanceTopKpis";
import { RmPerformanceNavTabs } from "../components/performance-page/RmPerformanceNavTabs";

// Tabs
import { RmOverviewTab } from "../components/performance-page/overview/RmOverviewTab";
import { RmCommissionTab } from "../components/performance-page/commission/RmCommissionTab";
import { RmBonusTrackingTab } from "../components/performance-page/bonuses/RmBonusTrackingTab";
import { RmScComparisonTab } from "../components/performance-page/comparison/RmScComparisonTab";

// Modals
import { RmExportPerformanceModal } from "../Modals/RmExportPerformanceModal";
import { RmRequestPayoutModal } from "../Modals/RmRequestPayoutModal";
import { BulkReminderModal } from "../Modals/BulkReminderModal";
import { ContactScModal } from "../Modals/ContactScModal";
import { RmEasyBuyDetailsModal } from "../Modals/RmEasyBuyDetailsModal";
import { RmScPerformanceDetailModal } from "../Modals/RmScPerformanceDetailModal";
import { RmCustomPeriodModal } from "../Modals/RmCustomPeriodModal";
import { DistributeStockModal } from "../Modals/DistributeStockModal";
import { RmSuccessModal, type RmSuccessDetailItem } from "../Modals/RmSuccessModal";
import type { ScBonusTrackerRowItem, ScPerformanceRowItem } from "../types/regional-manager-performance.types";

export default function RmNetworkPerformancePage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<any>("overview");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("this-month");
  const [customPeriodLabel, setCustomPeriodLabel] = useState<string>("");

  // Modal States
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [bulkReminderOpen, setBulkReminderOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [easyBuyModalOpen, setEasyBuyModalOpen] = useState(false);
  const [scDetailModalOpen, setScDetailModalOpen] = useState(false);
  const [customPeriodModalOpen, setCustomPeriodModalOpen] = useState(false);
  const [distributeModalOpen, setDistributeModalOpen] = useState(false);

  // Selected SCs
  const [selectedScForDetail, setSelectedScForDetail] = useState<ScPerformanceRowItem | any>(null);
  const [selectedScForDistribution, setSelectedScForDistribution] = useState<any>(null);

  // Success Modal State
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState("Operation Completed!");
  const [successSubtitle, setSuccessSubtitle] = useState("");
  const [successDetails, setSuccessDetails] = useState<RmSuccessDetailItem[]>([]);

  // Selected SC for Contact Modal
  const [selectedScForContact, setSelectedScForContact] = useState<{
    name: string;
    phone: string;
    state: string;
  } | null>(null);

  // Contact SC Handlers
  const handleOpenContactSc = (sc: ScPerformanceRowItem) => {
    setSelectedScForContact({
      name: sc.scName ?? sc.name,
      phone: sc.phone || "08031234567",
      state: sc.state,
    });
    setContactModalOpen(true);
  };

  const handleRemindTrackerSc = (sc: ScBonusTrackerRowItem) => {
    setSelectedScForContact({
      name: sc.scName ?? sc.name,
      phone: "08031234567",
      state: sc.state,
    });
    setContactModalOpen(true);
  };

  // Export Success
  const handleExportSuccess = (opts: any) => {
    setSuccessTitle("Performance Report Generated!");
    setSuccessSubtitle("Your performance analytics document has been prepared and downloaded.");
    setSuccessDetails([
      { label: "Report Type", value: opts.reportType || "Executive Summary" },
      { label: "Selected Period", value: opts.period || "This Month (Jun 2026)" },
      { label: "Format", value: opts.format || "PDF Report" },
      { label: "Timestamp", value: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setSuccessModalOpen(true);
  };

  // Payout Success
  const handlePayoutSuccess = (payout: { amount: number; bankName: string; accountNumber: string; ref: string }) => {
    setSuccessTitle("Commission Payout Requested!");
    setSuccessSubtitle("Your withdrawal request has been submitted and is processing via direct interbank transfer.");
    setSuccessDetails([
      { label: "Requested Amount", value: `₦${payout.amount.toLocaleString()}` },
      { label: "Destination Bank", value: `${payout.bankName} (${payout.accountNumber})` },
      { label: "Payment Reference", value: payout.ref },
      { label: "Estimated Settlement", value: "Within 15 minutes" },
    ]);
    setSuccessModalOpen(true);
  };

  // Bulk Reminder Success
  const handleBulkReminderSuccess = (details: { targetGroup: string; message: string; count: number; channel: string }) => {
    setSuccessTitle("Reminders Dispatched Successfully!");
    setSuccessSubtitle(`Notifications have been queued and sent to ${details.count} State Coordinators.`);
    setSuccessDetails([
      { label: "Target Cohort", value: details.targetGroup },
      { label: "Dispatch Channel", value: details.channel },
      { label: "Recipients Reached", value: `${details.count} Coordinators` },
      { label: "Status", value: "Delivered" },
    ]);
    setSuccessModalOpen(true);
  };

  // Single Contact Success
  const handleSingleContactSuccess = (details: { scName: string; phone: string; message: string }) => {
    setSuccessTitle("Nudge Message Sent!");
    setSuccessSubtitle(`Direct notification was dispatched to ${details.scName}.`);
    setSuccessDetails([
      { label: "Coordinator", value: details.scName },
      { label: "Phone Number", value: details.phone },
      { label: "Dispatch Time", value: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setSuccessModalOpen(true);
  };

  // SC Details Modal Handlers
  const handleViewScDetails = (sc: ScPerformanceRowItem) => {
    setSelectedScForDetail(sc);
    setScDetailModalOpen(true);
  };

  const handleOpenDistributeStock = (sc: ScPerformanceRowItem) => {
    setSelectedScForDistribution({
      id: sc.id,
      name: sc.scName ?? sc.name,
      state: sc.state,
      initials: (sc.scName ?? sc.name).split(" ").map((n) => n[0]).join(""),
      status: sc.status === "Behind" ? "Low" : "Active",
      stock: 42,
    });
    setDistributeModalOpen(true);
  };

  const handleDistributeSuccess = (details: { scName: string; quantity: number; state: string; total: number }) => {
    setSuccessTitle("SIM Stock Distributed!");
    setSuccessSubtitle(`Successfully dispatched ${details.quantity.toLocaleString()} SIMs to ${details.scName}.`);
    setSuccessDetails([
      { label: "Recipient SC", value: details.scName },
      { label: "Target State", value: `${details.state} State` },
      { label: "Quantity Dispatched", value: `${details.quantity} SIM cards` },
      { label: "Tracking Number", value: `TRK-SIM-${Math.floor(100000 + Math.random() * 900000)}` },
    ]);
    setSuccessModalOpen(true);
  };

  const handleApplyCustomPeriod = (period: { startDate: string; endDate: string; label: string; daysCount: number }) => {
    setSelectedPeriod("custom");
    setCustomPeriodLabel(period.label);
    setSuccessTitle("Custom Date Range Applied!");
    setSuccessSubtitle(`Performance metrics updated for ${period.label} (${period.daysCount} days).`);
    setSuccessDetails([
      { label: "Start Date", value: period.startDate },
      { label: "End Date", value: period.endDate },
      { label: "Duration", value: `${period.daysCount} days` },
      { label: "Timeframe Filter", value: "Custom" },
    ]);
    setSuccessModalOpen(true);
  };

  // Download statement
  const handleDownloadStatement = (month: string) => {
    setSuccessTitle(`${month} Commission Statement Downloaded`);
    setSuccessSubtitle(`Official monthly earnings breakdown statement for ${month} 2026 has been generated.`);
    setSuccessDetails([
      { label: "Statement Period", value: `${month} 2026` },
      { label: "Document Format", value: "PDF Document" },
      { label: "Security Status", value: "Digitally Signed" },
    ]);
    setSuccessModalOpen(true);
  };

  return (
    <div
      className="min-h-screen p-3 sm:p-5 lg:p-6 space-y-4 max-w-[1400px] mx-auto"
      style={{ backgroundColor: APP_COLORS.backgrounds.base }}
    >
      {/* 1. PAGE HEADER */}
      <RmPerformancePageHeader
        selectedPeriod={selectedPeriod}
        customPeriodLabel={customPeriodLabel}
        onPeriodChange={setSelectedPeriod}
        onOpenExport={() => setExportModalOpen(true)}
        onOpenCustomPeriod={() => setCustomPeriodModalOpen(true)}
      />

      {/* 2. PERSISTENT TOP KPIS (ROW 1 & ROW 2) */}
      <RmPerformanceTopKpis
        onRequestPayout={() => setPayoutModalOpen(true)}
        onViewAtRisk={() => setActiveTab("bonuses")}
        onViewTopPerformer={() => {
          setSelectedScForDetail({
            id: "sc-1",
            rank: 1,
            scName: "Aminat Okafor",
            state: "Lagos",
            activations: 3120,
            target: 2500,
            targetAchieved: 124.8,
            activeAps: 38,
            totalAps: 40,
            commissionEarned: 35395,
            status: "Exceeded",
            growthRate: 24.2,
          });
          setScDetailModalOpen(true);
        }}
      />

      {/* 3. NAVIGATION TABS */}
      <RmPerformanceNavTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* 4. ACTIVE TAB CONTENT */}
      {activeTab === "overview" && (
        <RmOverviewTab
          onContactSc={handleOpenContactSc}
          onViewScDetails={handleViewScDetails}
          onRequestPayout={() => setPayoutModalOpen(true)}
          onNudgeAtRisk={() => setBulkReminderOpen(true)}
          onViewCommissionTab={() => setActiveTab("commission")}
        />
      )}

      {activeTab === "commission" && (
        <RmCommissionTab
          onContactSc={handleOpenContactSc}
          onRequestPayout={() => setPayoutModalOpen(true)}
          onDownloadStatement={handleDownloadStatement}
          onContactTopEarner={() => {
            setSelectedScForDetail({
              id: "sc-1",
              rank: 1,
              scName: "Aminat Okafor",
              state: "Lagos",
              activations: 3120,
              target: 2500,
              targetAchieved: 124.8,
              activeAps: 38,
              totalAps: 40,
              commissionEarned: 35395,
              status: "Exceeded",
              growthRate: 24.2,
            });
            setScDetailModalOpen(true);
          }}
        />
      )}

      {activeTab === "bonuses" && (
        <RmBonusTrackingTab
          onOpenBulkReminder={() => setBulkReminderOpen(true)}
          onRemindSc={handleRemindTrackerSc}
          onRemindAtRisk={() => setBulkReminderOpen(true)}
          onViewEasyBuyDetails={() => setEasyBuyModalOpen(true)}
        />
      )}

      {activeTab === "comparison" && (
        <RmScComparisonTab onContactSc={handleOpenContactSc} />
      )}

      {/* 5. MODALS */}
      <RmExportPerformanceModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        onSuccess={handleExportSuccess}
      />

      <RmRequestPayoutModal
        open={payoutModalOpen}
        onOpenChange={setPayoutModalOpen}
        availableBalance={84000}
        onSuccess={handlePayoutSuccess}
      />

      <BulkReminderModal
        open={bulkReminderOpen}
        onOpenChange={setBulkReminderOpen}
        onSuccess={handleBulkReminderSuccess}
      />

      <ContactScModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        scName={selectedScForContact?.name ?? ""}
        phone={selectedScForContact?.phone ?? ""}
        onSuccess={handleSingleContactSuccess}
      />

      <RmEasyBuyDetailsModal
        open={easyBuyModalOpen}
        onOpenChange={setEasyBuyModalOpen}
        onExport={() => {
          handleExportSuccess({
            reportType: "EasyBuy Passive Override Audit",
            period: "June 2026",
            format: "Excel (.xlsx)",
          });
        }}
      />

      <RmScPerformanceDetailModal
        open={scDetailModalOpen}
        onOpenChange={setScDetailModalOpen}
        sc={selectedScForDetail}
        onViewFullProfile={(scId) => navigate(appPaths.rmScDetails(scId).path)}
        onDistributeStock={handleOpenDistributeStock}
      />

      <DistributeStockModal
        open={distributeModalOpen}
        onOpenChange={setDistributeModalOpen}
        preselectedSc={selectedScForDistribution}
        onSuccess={handleDistributeSuccess}
      />

      <RmCustomPeriodModal
        open={customPeriodModalOpen}
        onOpenChange={setCustomPeriodModalOpen}
        onApply={handleApplyCustomPeriod}
      />

      <RmSuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title={successTitle}
        subtitle={successSubtitle}
        details={successDetails}
      />
    </div>
  );
}
