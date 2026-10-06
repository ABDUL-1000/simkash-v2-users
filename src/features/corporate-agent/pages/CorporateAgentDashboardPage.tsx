import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Bell, Sparkles } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { APP_COLORS } from "@/constants/colors";

// Components
import { CaHeaderTopKpiRow } from "../components/CaHeaderTopKpiRow";
import { CaSecondaryKpiCards } from "../components/CaSecondaryKpiCards";
import { CaBonusTrackerCard } from "../components/CaBonusTrackerCard";
import { CaQuickActionsRow } from "../components/CaQuickActionsRow";
import { CaRecentActivationsCard } from "../components/CaRecentActivationsCard";
import { CaAgencyPartnersTable } from "../components/CaAgencyPartnersTable";
import { CaCommissionThisMonthCard } from "../components/CaCommissionThisMonthCard";
import { CaSimInventoryCard } from "../components/CaSimInventoryCard";
import { CaApsNeedingStockCard } from "../components/CaApsNeedingStockCard";
import { CaActivityFeedCard } from "../components/CaActivityFeedCard";

// Modals
import { CaSuccessModal, type CaSuccessDetailItem } from "../Modals/CaSuccessModal";
import { AllActivationsModal } from "../Modals/AllActivationsModal";
import { OnboardAgencyPartnerModal } from "../Modals/OnboardAgencyPartnerModal";
import { TargetAchievedModal } from "@/features/state-coordinator/modals/TargetAchievedModal";
import { CaRequestPayoutModal } from "../Modals/CaRequestPayoutModal";
import { CaDistributeStockModal } from "../Modals/CaDistributeStockModal";
import { CaRequestStockModal } from "../Modals/CaRequestStockModal";
import { CaLowStockAlertModal } from "../Modals/CaLowStockAlertModal";
import { CaActivateSimModal } from "../Modals/CaActivateSimModal";

import { CA_TOP_KPIS_DATA } from "../data/corporate-agent.data";
import type { CaAgencyPartnerItem } from "../types/corporate-agent.types";

export default function CorporateAgentDashboardPage() {
  const navigate = useNavigate();

  // Modal Visibility States
  const [allActivationsModalOpen, setAllActivationsModalOpen] = useState(false);
  const [onboardApModalOpen, setOnboardApModalOpen] = useState(false);
  const [targetAchievedModalOpen, setTargetAchievedModalOpen] = useState(false);
  const [requestPayoutModalOpen, setRequestPayoutModalOpen] = useState(false);
  const [distributeStockModalOpen, setDistributeStockModalOpen] = useState(false);
  const [requestStockModalOpen, setRequestStockModalOpen] = useState(false);
  const [lowStockAlertModalOpen, setLowStockAlertModalOpen] = useState(false);
  const [activateSimModalOpen, setActivateSimModalOpen] = useState(false);

  // Pre-selected AP for distribution modal
  const [selectedApForDistribution, setSelectedApForDistribution] =
    useState<CaAgencyPartnerItem | null>(null);

  // Success Modal State
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState("Operation Successful!");
  const [successSubtitle, setSuccessSubtitle] = useState("");
  const [successDetails, setSuccessDetails] = useState<CaSuccessDetailItem[]>([]);

  const triggerSuccess = (
    title: string,
    subtitle: string,
    details: CaSuccessDetailItem[]
  ) => {
    setSuccessTitle(title);
    setSuccessSubtitle(subtitle);
    setSuccessDetails(details);
    setSuccessModalOpen(true);
  };

  const handleOpenDistributeForAp = (ap?: CaAgencyPartnerItem) => {
    setSelectedApForDistribution(ap || null);
    setDistributeStockModalOpen(true);
  };

  return (
    <div
      className="min-h-screen pb-16 pt-4 px-4 sm:px-6 lg:px-8 space-y-6"
      style={{ backgroundColor: APP_COLORS.backgrounds.base }}
    >
      {/* TOP GREETING & STATUS BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800">
              Corporate Agent
            </span>
            <span className="text-xs text-slate-500 font-medium">Lagos Region</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Femi Enterprises Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your agency partner network, track activations, and request payouts.
          </p>
        </div>

        {/* TOP CONTROLS */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Low Stock Notification Trigger */}
          <button
            type="button"
            onClick={() => setLowStockAlertModalOpen(true)}
            className="px-3 py-2 rounded-xl text-xs font-bold border border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 flex items-center gap-1.5 transition-colors shadow-xs"
            title="Check SIM stock alert"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Low Stock Alert</span>
          </button>

          {/* Target Bonus celebration preview */}
          <button
            type="button"
            onClick={() => setTargetAchievedModalOpen(true)}
            className="px-3 py-2 rounded-xl text-xs font-bold border border-purple-200 bg-purple-50 text-purple-900 hover:bg-purple-100 flex items-center gap-1.5 transition-colors shadow-xs"
            title="Preview Bonus Target Screen"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">Bonus Celebration</span>
          </button>

          <div className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 shadow-xs relative">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white" />
          </div>
        </div>
      </div>

      {/* 1. TOP 5 MINI KPIS ROW */}
      <CaHeaderTopKpiRow
        kpis={CA_TOP_KPIS_DATA}
        onRequestPayout={() => setRequestPayoutModalOpen(true)}
      />

      {/* 2. SECONDARY 5 MEDIUM KPI CARDS */}
      <CaSecondaryKpiCards />

      {/* 3. BONUS TRACKER CARD */}
      <CaBonusTrackerCard
        onViewHistory={() => setTargetAchievedModalOpen(true)}
      />

      {/* 4. QUICK ACTIONS ROW */}
      <CaQuickActionsRow
        onActivateSim={() => navigate(appPaths.caSimActivation)}
        onViewStock={() => navigate(appPaths.caSimInventory)}
        onDistributeStock={() => handleOpenDistributeForAp()}
        onRequestStock={() => setRequestStockModalOpen(true)}
        onRequestPayout={() => setRequestPayoutModalOpen(true)}
      />

      {/* 5. MAIN 2-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN (7 COLS ON LARGE SCREEN) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Recent Activations Card */}
          <CaRecentActivationsCard
            onViewAll={() => navigate(`${appPaths.caSimActivation}?tab=history`)}
          />

          {/* Agency Partners Table */}
          <CaAgencyPartnersTable
            onOnboardNewAp={() => setOnboardApModalOpen(true)}
            onDistributeToAp={handleOpenDistributeForAp}
          />
        </div>

        {/* RIGHT COLUMN (5 COLS ON LARGE SCREEN) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Commission This Month */}
          <CaCommissionThisMonthCard
            onRequestPayout={() => setRequestPayoutModalOpen(true)}
          />

          {/* SIM Inventory Card */}
          <CaSimInventoryCard
            onDistributeStock={() => handleOpenDistributeForAp()}
            onRequestStock={() => setRequestStockModalOpen(true)}
            onViewFullInventory={() => navigate(appPaths.caSimInventory)}
          />

          {/* APs Needing Stock Alert Card */}
          <CaApsNeedingStockCard
            onDistributeToAll={() => handleOpenDistributeForAp()}
            onDistributeToAp={handleOpenDistributeForAp}
          />

          {/* Real-time Activity Feed Card */}
          <CaActivityFeedCard
            onViewAll={() => setAllActivationsModalOpen(true)}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ALL MODAL DIALOGS */}
      {/* ========================================================================= */}

      {/* 1. All Activations Modal */}
      <AllActivationsModal
        open={allActivationsModalOpen}
        onOpenChange={setAllActivationsModalOpen}
        onExportHistory={() => {
          triggerSuccess("Export Completed", "CSV export file has been generated.", [
            { label: "File Format", value: "CSV (.csv)" },
            { label: "Total Rows", value: "2,847 records" },
            { label: "Date Range", value: "July 2026" },
          ]);
        }}
      />

      {/* 2. Onboard Agency Partner Modal */}
      <OnboardAgencyPartnerModal
        open={onboardApModalOpen}
        onOpenChange={setOnboardApModalOpen}
        onSuccess={(data) => {
          triggerSuccess(
            "Agency Partner Onboarded!",
            `${data.name} has been enrolled in your network.`,
            [
              { label: "Partner Name", value: data.name },
              { label: "Phone", value: data.phone },
              { label: "State", value: data.state },
              { label: "Initial Stock", value: `${data.allocatedStock} SIMs` },
            ]
          );
        }}
      />

      {/* 3. Target Achieved Modal (Celebration Screen) */}
      <TargetAchievedModal
        open={targetAchievedModalOpen}
        onOpenChange={setTargetAchievedModalOpen}
        onContinue={() => {
          setRequestPayoutModalOpen(true);
        }}
      />

      {/* 4. Request Payout Modal */}
      <CaRequestPayoutModal
        open={requestPayoutModalOpen}
        onOpenChange={setRequestPayoutModalOpen}
        availableBalance={284700}
        onSuccess={(details) => {
          triggerSuccess(
            "Payout Requested!",
            "Your withdrawal is queued for bank transfer.",
            [
              { label: "Amount", value: `₦${details.amount.toLocaleString()}` },
              { label: "Bank", value: details.bankName },
              { label: "Account", value: details.accountNumber },
              { label: "Transaction Ref", value: details.ref },
            ]
          );
        }}
      />

      {/* 5. Distribute Stock Modal */}
      <CaDistributeStockModal
        open={distributeStockModalOpen}
        onOpenChange={(v) => {
          setDistributeStockModalOpen(v);
          if (!v) setSelectedApForDistribution(null);
        }}
        preselectedAp={selectedApForDistribution}
        onSuccess={(details) => {
          triggerSuccess(
            "Stock Distributed!",
            `Successfully assigned SIMs to ${details.recipientName}.`,
            [
              { label: "Recipient", value: details.recipientName },
              { label: "Total SIMs", value: `${details.totalSims} SIMs` },
              { label: "Transfer Ref", value: details.distributionRef },
            ]
          );
        }}
      />

      {/* 6. Request Stock from Super Admin Modal */}
      <CaRequestStockModal
        open={requestStockModalOpen}
        onOpenChange={setRequestStockModalOpen}
        onSuccess={(details) => {
          triggerSuccess(
            "Stock Requisition Submitted!",
            "Super Admin has received your SIM replenishment request.",
            [
              { label: "Total SIMs", value: `${details.totalRequested} SIMs` },
              { label: "Priority", value: details.urgency },
              { label: "New Expected Stock", value: `${details.stockAfter} SIMs` },
              { label: "Requisition Ref", value: details.requestRef },
            ]
          );
        }}
      />

      {/* 7. Low Stock Alert Modal */}
      <CaLowStockAlertModal
        open={lowStockAlertModalOpen}
        onOpenChange={setLowStockAlertModalOpen}
        onRequestStockNow={() => {
          setRequestStockModalOpen(true);
        }}
        onRemindTomorrow={() => {
          triggerSuccess(
            "Reminder Set",
            "We will alert you again tomorrow morning about your SIM stock levels.",
            [{ label: "Reminder Time", value: "Tomorrow 9:00 AM" }]
          );
        }}
      />

      {/* 8. Activate SIM Modal (Step 1 & Step 2) */}
      <CaActivateSimModal
        open={activateSimModalOpen}
        onOpenChange={setActivateSimModalOpen}
        onSuccess={(details) => {
          triggerSuccess(
            "SIM Activated Successfully!",
            `Activation completed for ${details.customerName}.`,
            [
              { label: "SIM Number", value: details.simNumber },
              { label: "Customer", value: details.customerName },
              { label: "Plan", value: details.plan },
              { label: "Earned Commission", value: `+₦${details.commission}` },
              { label: "Activation Ref", value: details.ref },
            ]
          );
        }}
      />

      {/* 9. Global Reusable CaSuccessModal */}
      <CaSuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title={successTitle}
        subtitle={successSubtitle}
        details={successDetails}
      />
    </div>
  );
}
