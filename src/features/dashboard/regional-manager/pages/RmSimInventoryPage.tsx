import { useState } from "react";
import { Package, Send, Download, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";

// Types & Mock Data
import {
  RM_INVENTORY_KPIS,
  RM_CURRENT_INVENTORY,
  RM_SC_DISTRIBUTIONS,
  RM_INVENTORY_HEALTH,
  RM_ESTIMATED_DAYS,
  RM_URGENT_SCS,
  RM_HISTORY_KPIS,
  RM_HISTORY_SUMMARY,
  RM_HISTORY_EVENTS,
} from "../data/rm-inventory.data";
import type {
  RmScDistributionRow,
  RmHistoryEvent,
  RmUrgentScItem,
  RmCurrentInventoryItem,
} from "../types/rm-inventory.types";

// Components
import {
  RmInventoryTabsNav,
  type RmInventoryTab,
} from "../inventory/components/RmInventoryTabsNav";
import { RmInventoryKpiCards } from "../inventory/components/RmInventoryKpiCards";
import { RmCurrentInventoryList } from "../inventory/components/RmCurrentInventoryList";
import { RmStockDistributionTable } from "../inventory/components/RmStockDistributionTable";
import { RmInventoryHealthCard } from "../inventory/components/RmInventoryHealthCard";
import { RmEstimatedDaysCard } from "../inventory/components/RmEstimatedDaysCard";
import { RmScsNeedDistributionCard } from "../inventory/components/RmScsNeedDistributionCard";
import { RmNeedMoreStockCard } from "../inventory/components/RmNeedMoreStockCard";

// Tab 2 Components
import { RmDistributeForm } from "../inventory/components/RmDistributeForm";
import { RmDistributeSidebarPreview } from "../inventory/components/RmDistributeSidebarPreview";

// Tab 3 Components
import { RmHistoryKpiCards } from "../inventory/components/RmHistoryKpiCards";
import { RmHistoryTable } from "../inventory/components/RmHistoryTable";

// Modals
import { StockEventDetailsModal } from "../inventory/Modals/StockEventDetailsModal";
import { RequestStockFromAdminModal } from "../inventory/Modals/RequestStockFromAdminModal";
import { ConfirmDistributionModal } from "../inventory/Modals/ConfirmDistributionModal";
import { ChangeScModal } from "../inventory/Modals/ChangeScModal";
import { RedistributeSimsModal } from "../inventory/Modals/RedistributeSimsModal";
import { ExportInventoryHistoryModal } from "../inventory/Modals/ExportInventoryHistoryModal";
import { UrgentScOutOfStockModal } from "../inventory/Modals/UrgentScOutOfStockModal";
import {
  ActionSuccessModal,
  type DetailItem,
} from "@/features/dashboard/Modals/ActionSuccessModal";

export function RmSimInventoryPage() {
  const navigate = useNavigate();

  // Tab State
  const [activeTab, setActiveTab] = useState<RmInventoryTab>("available");

  // Inventory & Allocation State
  const [availableStock, setAvailableStock] = useState({
    pos: 180,
    cctv: 72,
    gps: 36,
    router: 12,
  });

  const [selectedSc, setSelectedSc] = useState<RmScDistributionRow>(
    RM_SC_DISTRIBUTIONS[0] // Aminat Okafor
  );

  const [allocations, setAllocations] = useState({
    pos: 50,
    cctv: 25,
    gps: 0,
    router: 0,
  });

  const [distributeNote, setDistributeNote] = useState("");

  // Modals
  const [requestAdminModalOpen, setRequestAdminModalOpen] = useState(false);
  const [confirmDistModalOpen, setConfirmDistModalOpen] = useState(false);
  const [changeScModalOpen, setChangeScModalOpen] = useState(false);
  const [redistributeModalOpen, setRedistributeModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [urgentModalOpen, setUrgentModalOpen] = useState(false);
  const [selectedUrgentSc, setSelectedUrgentSc] = useState<RmUrgentScItem | null>(null);
  const [selectedHistoryEvent, setSelectedHistoryEvent] =
    useState<RmHistoryEvent | null>(null);

  // Success Modal
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successConfig, setSuccessConfig] = useState<{
    title: string;
    subtitle?: string;
    badgeText?: string;
    iconType?: "check" | "shield" | "trophy" | "sparkles";
    details?: DetailItem[];
  }>({
    title: "Action Completed Successfully",
  });

  const handleAllocationChange = (
    type: "pos" | "cctv" | "gps" | "router",
    value: number
  ) => {
    setAllocations((prev) => ({ ...prev, [type]: value }));
  };

  const handleClearAllocations = () => {
    setAllocations({ pos: 0, cctv: 0, gps: 0, router: 0 });
    setDistributeNote("");
  };

  // Handlers for cross-tab actions
  const handleDistributeItem = (item: RmCurrentInventoryItem) => {
    setActiveTab("distribute");
    if (item.typeKey === "pos") setAllocations({ pos: 50, cctv: 0, gps: 0, router: 0 });
    if (item.typeKey === "cctv") setAllocations({ pos: 0, cctv: 25, gps: 0, router: 0 });
    if (item.typeKey === "gps") setAllocations({ pos: 0, cctv: 0, gps: 20, router: 0 });
    if (item.typeKey === "router") setAllocations({ pos: 0, cctv: 0, gps: 0, router: 10 });
  };

  const handleDistributeToUrgentSc = (urgentSc: RmUrgentScItem) => {
    setSelectedUrgentSc(urgentSc);
    setUrgentModalOpen(true);
  };

  const handleEmergencyDistributeSuccess = (data: {
    scName: string;
    state: string;
    total: number;
    allocations: { pos: number; cctv: number; gps: number; router: number };
  }) => {
    setAvailableStock((prev) => ({
      pos: prev.pos - data.allocations.pos,
      cctv: prev.cctv - data.allocations.cctv,
      gps: prev.gps - data.allocations.gps,
      router: prev.router - data.allocations.router,
    }));

    setSuccessConfig({
      title: "Emergency Stock Dispatched!",
      subtitle: `${data.total} SIMs dispatched to ${data.scName} (${data.state} State).`,
      badgeText: "EMERGENCY DISPATCH CONFIRMED",
      iconType: "shield",
      details: [
        { label: "Coordinator", value: data.scName },
        { label: "Region", value: `${data.state} State` },
        { label: "Total Dispatched", value: `${data.total} SIMs` },
        { label: "Super Admin Review", value: "Logged & Flagged" },
      ],
    });
    setSuccessModalOpen(true);
  };

  // On Confirm Distribution Success
  const handleDistributionSuccess = () => {
    const totalQty =
      allocations.pos + allocations.cctv + allocations.gps + allocations.router;

    // Deduct from available stock
    setAvailableStock((prev) => ({
      pos: prev.pos - allocations.pos,
      cctv: prev.cctv - allocations.cctv,
      gps: prev.gps - allocations.gps,
      router: prev.router - allocations.router,
    }));

    setSuccessConfig({
      title: "Stock Distributed Successfully!",
      subtitle: `${totalQty} SIMs dispatched to ${selectedSc.name}.`,
      badgeText: "DISPATCH CONFIRMED",
      iconType: "check",
      details: [
        { label: "Coordinator", value: selectedSc.name },
        { label: "Region", value: `${selectedSc.state} State` },
        { label: "Total Dispatched", value: `${totalQty} SIMs` },
        {
          label: "New SC Balance",
          value: `${(selectedSc.total ?? 0) + totalQty} SIMs`,
        },
      ],
    });
    setSuccessModalOpen(true);
    handleClearAllocations();
  };

  // On Request Stock Success
  const handleRequestStockSuccess = (totalQty: number) => {
    setSuccessConfig({
      title: "Stock Request Submitted!",
      subtitle: `Your replenishment request for ${totalQty} SIMs has been sent to Super Admin.`,
      badgeText: "AWAITING APPROVAL",
      iconType: "shield",
      details: [
        { label: "Request Type", value: "Warehouse Stock Replenishment" },
        { label: "Total Requested", value: `${totalQty} SIMs` },
        { label: "Expected Response", value: "2–4 hours" },
      ],
    });
    setSuccessModalOpen(true);
  };

  // On Redistribute Success
  const handleRedistributeSuccess = (summary: {
    fromSc: string;
    toSc: string;
    simType: string;
    qty: number;
  }) => {
    setSuccessConfig({
      title: "Stock Reallocated Successfully!",
      subtitle: `Transferred ${summary.qty} ${summary.simType}s from ${summary.fromSc} to ${summary.toSc}.`,
      badgeText: "REALLOCATION COMPLETE",
      iconType: "check",
      details: [
        { label: "From", value: summary.fromSc },
        { label: "To", value: summary.toSc },
        { label: "SIM Type", value: summary.simType },
        { label: "Quantity", value: `${summary.qty} units` },
      ],
    });
    setSuccessModalOpen(true);
  };

  // On Export Success
  const handleExportSuccess = (format: string) => {
    setSuccessConfig({
      title: "Report Exported Successfully!",
      subtitle: `Your inventory records have been generated in ${format} format.`,
      badgeText: "DOWNLOAD READY",
      iconType: "trophy",
      details: [
        { label: "File Format", value: format },
        { label: "Events Exported", value: "89 records" },
        { label: "Status", value: "Saved to downloads" },
      ],
    });
    setSuccessModalOpen(true);
  };

  const totalAllocated =
    allocations.pos + allocations.cctv + allocations.gps + allocations.router;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F152A]">
            SIM Inventory
          </h1>
          <p className="text-xs font-medium text-[#64748B]">
            Manage stock received from Super Admin and distribute to your State
            Coordinators
          </p>
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          {activeTab === "history" && (
            <button
              type="button"
              onClick={() => setExportModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50 shadow-2xs"
            >
              <Download className="size-3.5 text-[#64748B]" />
              <span>Export</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setRequestAdminModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-[#0F152A] px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800 shadow-xs"
          >
            {activeTab === "history" ? (
              <Plus className="size-3.5" />
            ) : (
              <Package className="size-3.5" />
            )}
            <span>Request Stock</span>
          </button>

          {activeTab !== "distribute" && (
            <button
              type="button"
              onClick={() => setActiveTab("distribute")}
              className="flex items-center gap-1.5 rounded-xl bg-[#10B981] px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-600 shadow-xs"
            >
              <Send className="size-3.5" />
              <span>Distribute to SC</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Metrics Cards */}
      {activeTab === "history" ? (
        <RmHistoryKpiCards
          kpis={RM_HISTORY_KPIS}
          summary={RM_HISTORY_SUMMARY}
        />
      ) : (
        <RmInventoryKpiCards kpis={RM_INVENTORY_KPIS} />
      )}

      {/* Tab Navigation Bar */}
      <RmInventoryTabsNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t)}
      />

      {/* TAB 1: Available Stock */}
      {activeTab === "available" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column (8 cols) */}
          <div className="space-y-6 lg:col-span-8">
            <RmCurrentInventoryList
              items={RM_CURRENT_INVENTORY}
              onDistributeItem={handleDistributeItem}
            />

            <RmStockDistributionTable
              scs={RM_SC_DISTRIBUTIONS}
              onDistributeClick={() => setActiveTab("distribute")}
              onSelectSc={(sc) => {
                setSelectedSc(sc);
                setActiveTab("distribute");
              }}
            />
          </div>

          {/* Right Column (4 cols) */}
          <div className="space-y-6 lg:col-span-4">
            <RmInventoryHealthCard
              total={RM_INVENTORY_KPIS.totalAvailable}
              items={RM_INVENTORY_HEALTH}
            />

            <RmEstimatedDaysCard
              items={RM_ESTIMATED_DAYS}
              onRequestStock={() => setRequestAdminModalOpen(true)}
            />

            <RmScsNeedDistributionCard
              urgentScs={RM_URGENT_SCS}
              onDistributeToSc={handleDistributeToUrgentSc}
            />

            <RmNeedMoreStockCard
              onRequestStockAdmin={() => setRequestAdminModalOpen(true)}
              onRedistributeSims={() => navigate(appPaths.rmRedistributeSims)}
            />
          </div>
        </div>
      )}

      {/* TAB 2: Distribute to SC */}
      {activeTab === "distribute" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Form (8 cols) */}
          <div className="lg:col-span-8">
            <RmDistributeForm
              selectedSc={selectedSc}
              availableStock={availableStock}
              allocations={allocations}
              onAllocationChange={handleAllocationChange}
              note={distributeNote}
              onNoteChange={setDistributeNote}
              onChangeSc={() => setChangeScModalOpen(true)}
              onClear={handleClearAllocations}
              onPreview={() => setConfirmDistModalOpen(true)}
            />
          </div>

          {/* Right Column: Preview Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <RmDistributeSidebarPreview
              selectedSc={selectedSc}
              allocations={allocations}
            />
          </div>
        </div>
      )}

      {/* TAB 3: Inventory History */}
      {activeTab === "history" && (
        <RmHistoryTable
          events={RM_HISTORY_EVENTS}
          onViewEvent={(evt) => setSelectedHistoryEvent(evt)}
        />
      )}

      {/* MODALS */}
      {/* 1. Event Details Modal */}
      <StockEventDetailsModal
        open={Boolean(selectedHistoryEvent)}
        onOpenChange={(open) => !open && setSelectedHistoryEvent(null)}
        event={selectedHistoryEvent}
        onViewScProfile={() => {
          setSelectedHistoryEvent(null);
          navigate(appPaths.rmScDetails("aminat-okafor").path);
        }}
      />

      {/* 2. Request Stock from Super Admin Modal */}
      <RequestStockFromAdminModal
        open={requestAdminModalOpen}
        onOpenChange={setRequestAdminModalOpen}
        onSuccess={handleRequestStockSuccess}
      />

      {/* 3. Confirm Distribution Modal */}
      <ConfirmDistributionModal
        open={confirmDistModalOpen}
        onOpenChange={setConfirmDistModalOpen}
        scName={selectedSc.name}
        state={selectedSc.state}
        allocations={allocations}
        totalQty={totalAllocated}
        onEditQuantities={() => setConfirmDistModalOpen(false)}
        onConfirm={handleDistributionSuccess}
      />

      {/* 4. Change SC Picker Modal */}
      <ChangeScModal
        open={changeScModalOpen}
        onOpenChange={setChangeScModalOpen}
        selectedScId={selectedSc.scId}
        onSelectSc={(sc) => setSelectedSc(sc)}
      />

      {/* 5. Redistribute Between SCs Modal */}
      <RedistributeSimsModal
        open={redistributeModalOpen}
        onOpenChange={setRedistributeModalOpen}
        onSuccess={handleRedistributeSuccess}
      />

      {/* 6. Export History Modal */}
      <ExportInventoryHistoryModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        onExportSuccess={handleExportSuccess}
      />

      {/* 7. Urgent SC Out of Stock Modal */}
      <UrgentScOutOfStockModal
        open={urgentModalOpen}
        onOpenChange={setUrgentModalOpen}
        sc={selectedUrgentSc}
        availableStock={availableStock}
        onConfirmDistribute={handleEmergencyDistributeSuccess}
      />

      {/* 8. Action Success Modal */}
      <ActionSuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        title={successConfig.title}
        subtitle={successConfig.subtitle}
        badgeText={successConfig.badgeText}
        iconType={successConfig.iconType}
        details={successConfig.details}
        primaryButtonText="Done"
      />
    </div>
  );
}

export default RmSimInventoryPage;
