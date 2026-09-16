import { useState } from "react";
import { APP_COLORS } from "@/constants/colors";

// Types
import type {
  CaInventoryTab,
  CaApStockDistributionRow,
  CaHistoryEventItem,
  CaCurrentInventoryCardItem,
  CaUrgentApStockItem,
} from "../types/ca-inventory.types";
import { CA_STOCK_DISTRIBUTIONS_DATA } from "../data/ca-inventory.data";

// Common Header & Nav Components
import { CaInventoryHeader } from "../components/CaInventoryHeader";
import { CaInventoryTabsNav } from "../components/CaInventoryTabsNav";
import { CaInventoryTopKpis } from "../components/CaInventoryTopKpis";

// Tab 1: Available Stock Components
import { CaCurrentInventoryList } from "../components/CaCurrentInventoryList";
import { CaStockDistributionTable } from "../components/CaStockDistributionTable";
import { CaInventoryHealthCard } from "../components/CaInventoryHealthCard";
import { CaDaysRemainingCard } from "../components/CaDaysRemainingCard";
import { CaApsNeedingStockSideCard } from "../components/CaApsNeedingStockSideCard";
import { CaRequestStockSideCard } from "../components/CaRequestStockSideCard";

// Tab 2: Distribute to AP Components
import { CaDistributeTabForm } from "../components/CaDistributeTabForm";
import { CaDistributeTabPreview } from "../components/CaDistributeTabPreview";

// Tab 3: Inventory History Components
import { CaHistoryKpis } from "../components/CaHistoryKpis";
import { CaHistoryFiltersBar } from "../components/CaHistoryFiltersBar";
import { CaHistoryTable } from "../components/CaHistoryTable";

// Modals
import { CaConfirmDistributionModal } from "../Modals/CaConfirmDistributionModal";
import { CaStockEventDetailsModal } from "../Modals/CaStockEventDetailsModal";
import { UrgentApOutOfStockModal } from "../Modals/UrgentApOutOfStockModal";
import { ExportInventoryReportModal } from "../Modals/ExportInventoryReportModal";
import { CaRequestStockModal } from "../../Modals/CaRequestStockModal";
import { CaSuccessModal, type CaSuccessDetailItem } from "../../Modals/CaSuccessModal";

export default function CaSimInventoryPage() {
  const [activeTab, setActiveTab] = useState<CaInventoryTab>("available");

  // Tab 2 Distribution Form State
  const [selectedAp, setSelectedAp] = useState<CaApStockDistributionRow>(
    CA_STOCK_DISTRIBUTIONS_DATA.find((ap) => ap.name.includes("Francis")) ||
      CA_STOCK_DISTRIBUTIONS_DATA[0]
  );
  const [posQty, setPosQty] = useState(15);
  const [cctvQty, setCctvQty] = useState(5);
  const [gpsQty, setGpsQty] = useState(0);
  const [routerQty, setRouterQty] = useState(0);
  const [distributionNote, setDistributionNote] = useState(
    "Priority for renewal campaign"
  );

  // Tab 3 History Filter State
  const [historySearchQuery, setHistorySearchQuery] = useState("");
  const [historySelectedEvent, setHistorySelectedEvent] = useState("All Events");
  const [historySelectedType, setHistorySelectedType] = useState("All Types");
  const [historySelectedAp, setHistorySelectedAp] = useState("All APs");

  // Modal Visibility States
  const [confirmDistModalOpen, setConfirmDistModalOpen] = useState(false);
  const [requestStockModalOpen, setRequestStockModalOpen] = useState(false);
  const [eventDetailModalOpen, setEventDetailModalOpen] = useState(false);
  const [selectedEventForDetail, setSelectedEventForDetail] =
    useState<CaHistoryEventItem | null>(null);
  const [urgentStockModalOpen, setUrgentStockModalOpen] = useState(false);
  const [selectedUrgentAp, setSelectedUrgentAp] =
    useState<CaApStockDistributionRow | null>(
      CA_STOCK_DISTRIBUTIONS_DATA.find((ap) => ap.name.includes("Francis")) ||
        CA_STOCK_DISTRIBUTIONS_DATA[0]
    );
  const [exportReportModalOpen, setExportReportModalOpen] = useState(false);

  // Success Modal State
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState("Success!");
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

  // Handlers to jump to Tab 2 or open urgent modal
  const handleDistributeToAp = (ap: CaApStockDistributionRow) => {
    if (ap.status === "Critical" || ap.name.includes("Francis")) {
      setSelectedUrgentAp(ap);
      setUrgentStockModalOpen(true);
    } else {
      setSelectedAp(ap);
      setActiveTab("distribute");
    }
  };

  const handleDistributeItem = (item: CaCurrentInventoryCardItem) => {
    if (item.type === "POS SIM") {
      setPosQty(25);
      setCctvQty(0);
    } else if (item.type === "CCTV SIM") {
      setCctvQty(20);
      setPosQty(0);
    }
    setActiveTab("distribute");
  };

  const handleSelectUrgentAp = (item: CaUrgentApStockItem) => {
    const matched =
      CA_STOCK_DISTRIBUTIONS_DATA.find((ap) =>
        ap.name.toLowerCase().includes(item.name.toLowerCase())
      ) ||
      CA_STOCK_DISTRIBUTIONS_DATA.find((ap) => ap.name.includes("Francis")) ||
      CA_STOCK_DISTRIBUTIONS_DATA[0];

    setSelectedUrgentAp(matched);
    setUrgentStockModalOpen(true);
  };

  const handleClearDistributionForm = () => {
    setPosQty(0);
    setCctvQty(0);
    setGpsQty(0);
    setRouterQty(0);
    setDistributionNote("");
  };

  return (
    <div
      className="min-h-screen pb-16 pt-4 px-4 sm:px-6 lg:px-8 space-y-6"
      style={{ backgroundColor: APP_COLORS.backgrounds.base }}
    >
      {/* 1. PAGE HEADER */}
      <CaInventoryHeader
        onRequestStock={() => setRequestStockModalOpen(true)}
        onDistributeStock={() => setActiveTab("distribute")}
        onExportReport={() => setExportReportModalOpen(true)}
      />

      {/* 2. TAB SWITCHER NAVIGATION */}
      <CaInventoryTabsNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ========================================================================= */}
      {/* TAB 1: AVAILABLE STOCK */}
      {/* ========================================================================= */}
      {activeTab === "available" && (
        <div className="space-y-6">
          {/* Top 5 KPI Cards */}
          <CaInventoryTopKpis />

          {/* Main 2-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Current Inventory Cards */}
              <CaCurrentInventoryList onDistributeItem={handleDistributeItem} />

              {/* How Stock is Distributed Table */}
              <CaStockDistributionTable
                onDistributeToAp={handleDistributeToAp}
                onViewAllDistribute={() => setActiveTab("distribute")}
              />
            </div>

            {/* Right Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Inventory Health */}
              <CaInventoryHealthCard />

              {/* Days Remaining */}
              <CaDaysRemainingCard />

              {/* APs Needing Stock */}
              <CaApsNeedingStockSideCard onSelectAp={handleSelectUrgentAp} />

              {/* Request SIM Stock CTA Card */}
              <CaRequestStockSideCard
                onRequestStock={() => setRequestStockModalOpen(true)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: DISTRIBUTE TO AP */}
      {/* ========================================================================= */}
      {activeTab === "distribute" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 Cols): Form */}
          <div className="lg:col-span-7">
            <CaDistributeTabForm
              selectedAp={selectedAp}
              onSelectAp={setSelectedAp}
              posQty={posQty}
              setPosQty={setPosQty}
              cctvQty={cctvQty}
              setCctvQty={setCctvQty}
              gpsQty={gpsQty}
              setGpsQty={setGpsQty}
              routerQty={routerQty}
              setRouterQty={setRouterQty}
              note={distributionNote}
              setNote={setDistributionNote}
              onClear={handleClearDistributionForm}
              onPreview={() => setConfirmDistModalOpen(true)}
            />
          </div>

          {/* Right Column (5 Cols): Live Preview Cards */}
          <div className="lg:col-span-5">
            <CaDistributeTabPreview
              selectedAp={selectedAp}
              posQty={posQty}
              cctvQty={cctvQty}
              gpsQty={gpsQty}
              routerQty={routerQty}
              onRequestStock={() => setRequestStockModalOpen(true)}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: INVENTORY HISTORY */}
      {/* ========================================================================= */}
      {activeTab === "history" && (
        <div className="space-y-6">
          {/* 4 Historical KPI Cards */}
          <CaHistoryKpis />

          {/* Search & Multi-Filters Bar */}
          <CaHistoryFiltersBar
            searchQuery={historySearchQuery}
            onSearchChange={setHistorySearchQuery}
            selectedEvent={historySelectedEvent}
            onSelectEvent={setHistorySelectedEvent}
            selectedType={historySelectedType}
            onSelectType={setHistorySelectedType}
            selectedAp={historySelectedAp}
            onSelectAp={setHistorySelectedAp}
            onExportReport={() => setExportReportModalOpen(true)}
          />

          {/* Grouped History Table */}
          <CaHistoryTable
            filterQuery={historySearchQuery}
            filterEventType={historySelectedEvent}
            filterSimType={historySelectedType}
            onSelectEvent={(ev) => {
              setSelectedEventForDetail(ev);
              setEventDetailModalOpen(true);
            }}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. Confirm Distribution Modal */}
      <CaConfirmDistributionModal
        open={confirmDistModalOpen}
        onOpenChange={setConfirmDistModalOpen}
        selectedAp={selectedAp}
        posQty={posQty}
        cctvQty={cctvQty}
        gpsQty={gpsQty}
        routerQty={routerQty}
        note={distributionNote}
        onEditQuantities={() => setConfirmDistModalOpen(false)}
        onSuccess={(details) => {
          triggerSuccess(
            "Distribution Completed!",
            `Successfully dispatched SIM stock to ${details.recipientName}.`,
            [
              { label: "Recipient", value: details.recipientName },
              { label: "Dispatched", value: `${details.totalUnits} SIMs` },
              { label: "Reference", value: details.distributionRef },
            ]
          );
        }}
      />

      {/* 2. Request Stock Requisition Modal (Matches Image 2) */}
      <CaRequestStockModal
        open={requestStockModalOpen}
        onOpenChange={setRequestStockModalOpen}
        onSuccess={(details) => {
          triggerSuccess(
            "Requisition Submitted!",
            "Super Admin has received your SIM replenishment request.",
            [
              { label: "Requested", value: `${details.totalRequested} SIMs` },
              { label: "Urgency", value: details.urgency },
              { label: "Requisition Ref", value: details.requestRef },
            ]
          );
        }}
      />

      {/* 3. Urgent: AP Out of Stock Modal (Matches Image 1) */}
      <UrgentApOutOfStockModal
        open={urgentStockModalOpen}
        onOpenChange={setUrgentStockModalOpen}
        ap={selectedUrgentAp}
        onSuccess={(details) => {
          triggerSuccess(
            "Emergency Stock Dispatched!",
            `Immediate replenishment sent to ${details.apName}.`,
            [
              { label: "Agency Partner", value: details.apName },
              { label: "Dispatched Units", value: `${details.totalUnits} SIMs` },
              { label: "Priority Reference", value: details.distributionRef },
            ]
          );
        }}
      />

      {/* 4. Export Inventory Report Modal (Matches Images 3 & 4) */}
      <ExportInventoryReportModal
        open={exportReportModalOpen}
        onOpenChange={setExportReportModalOpen}
        onDownloaded={(fileName) => {
          triggerSuccess(
            "Report Downloaded!",
            `File ${fileName} has been exported and saved to your device.`,
            [
              { label: "File Name", value: fileName },
              { label: "Format", value: "CSV Record" },
              { label: "Status", value: "Export Ready" },
            ]
          );
        }}
      />

      {/* 5. History Event Details Modal (Matches Image 5) */}
      <CaStockEventDetailsModal
        open={eventDetailModalOpen}
        onOpenChange={setEventDetailModalOpen}
        event={selectedEventForDetail}
        onViewApProfile={(apName) => {
          const matched = CA_STOCK_DISTRIBUTIONS_DATA.find((ap) =>
            ap.name.toLowerCase().includes(apName.toLowerCase())
          );
          if (matched) {
            setSelectedAp(matched);
            setActiveTab("distribute");
          }
        }}
      />

      {/* 6. Global Reusable CaSuccessModal */}
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
