import { useState } from "react";
import { StockHeader, type StockTab } from "../components/StockHeader";
import { AvailableSimsTab } from "../components/AvailableSimsTab";
import { RequestStockTab } from "../components/RequestStockTab";
import { StockHistoryTab } from "../components/StockHistoryTab";
import { StockEventDetailsModal } from "../Modals/StockEventDetailsModal";
import { StockRequestStatusModal } from "../Modals/StockRequestStatusModal";
import { StockRequestSuccessModal } from "../Modals/StockRequestSuccessModal";
import { ConfirmStockRequestModal } from "../Modals/ConfirmStockRequestModal";
import { ExportStockReportModal } from "../Modals/ExportStockReportModal";
import { CriticalStockAlertModal } from "../Modals/CriticalStockAlertModal";
import { CancelStockRequestModal } from "../Modals/CancelStockRequestModal";
import {
  INITIAL_INVENTORY_ITEMS,
  INITIAL_PENDING_REQUEST,
  INITIAL_STOCK_EVENTS,
} from "../data/stock.data";
import type {
  StockEventItem,
  SimCategory,
  StockRequestQuantities,
  UrgencyLevel,
  PendingStockRequestInfo,
} from "../types/stock.types";

export function AgencyPartnerStockPage() {
  const [activeTab, setActiveTab] = useState<StockTab>("available");

  // State
  const [inventoryItems] = useState(INITIAL_INVENTORY_ITEMS);
  const [pendingRequest, setPendingRequest] = useState<PendingStockRequestInfo | null>(
    INITIAL_PENDING_REQUEST
  );
  const [stockEvents] = useState<StockEventItem[]>(INITIAL_STOCK_EVENTS);

  // Request Form State
  const [requestQuantities, setRequestQuantities] = useState<StockRequestQuantities>({
    pos: 50,
    cctv: 25,
    gps: 30,
    router: 20,
  });
  const [urgency, setUrgency] = useState<UrgencyLevel>("Normal");
  const [reason, setReason] = useState("");

  // Modals state
  const [selectedEvent, setSelectedEvent] = useState<StockEventItem | null>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [criticalModalOpen, setCriticalModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [submittedRef, setSubmittedRef] = useState("REQ-2026-00848");

  // Quantity stepper handler
  const handleQuantityChange = (type: keyof StockRequestQuantities, val: number) => {
    setRequestQuantities((prev) => ({
      ...prev,
      [type]: val,
    }));
  };

  // Switch to request tab, optionally focusing a specific category
  const handleRequestMore = (simType?: SimCategory) => {
    setActiveTab("request");
    if (simType === "GPS SIM") {
      setRequestQuantities((prev) => ({ ...prev, gps: Math.max(prev.gps, 30) }));
    } else if (simType === "Router SIM") {
      setRequestQuantities((prev) => ({ ...prev, router: Math.max(prev.router, 20) }));
    }
  };

  // Trigger Confirmation modal before actual submission
  const handleInitiateSubmit = () => {
    const total =
      requestQuantities.pos +
      requestQuantities.cctv +
      requestQuantities.gps +
      requestQuantities.router;

    if (total === 0) return;
    setConfirmModalOpen(true);
  };

  // Submit stock request form (after confirmation)
  const handleFinalSubmit = () => {
    const totalRequested =
      requestQuantities.pos +
      requestQuantities.cctv +
      requestQuantities.gps +
      requestQuantities.router;

    const newRef = `REQ-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedRef(newRef);

    // Update pending request card
    setPendingRequest({
      requestRef: newRef,
      totalRequested,
      posQty: requestQuantities.pos,
      cctvQty: requestQuantities.cctv,
      gpsQty: requestQuantities.gps,
      routerQty: requestQuantities.router,
      submittedTime: "Submitted just now",
      status: "Awaiting SC Approval",
      urgency,
      scName: "Aminat Okafor",
      scPhone: "08065942373",
    });

    setSuccessModalOpen(true);
  };

  const handleClearForm = () => {
    setRequestQuantities({
      pos: 0,
      cctv: 0,
      gps: 0,
      router: 0,
    });
    setReason("");
    setUrgency("Normal");
  };

  // Open event details modal
  const handleViewEvent = (event: StockEventItem) => {
    setSelectedEvent(event);
    setEventModalOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Top Header & Tab Navigation */}
      <StockHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab 1: Available SIMs */}
      {activeTab === "available" && (
        <AvailableSimsTab
          inventoryItems={inventoryItems}
          pendingRequest={pendingRequest}
          onRequestMore={handleRequestMore}
          onViewPendingRequest={() => setStatusModalOpen(true)}
          onCriticalClick={() => setCriticalModalOpen(true)}
        />
      )}

      {/* Tab 2: Request Stock */}
      {activeTab === "request" && (
        <RequestStockTab
          quantities={requestQuantities}
          onQuantityChange={handleQuantityChange}
          urgency={urgency}
          onUrgencyChange={setUrgency}
          reason={reason}
          onReasonChange={setReason}
          onClearForm={handleClearForm}
          onSubmit={handleInitiateSubmit}
        />
      )}

      {/* Tab 3: Stock History */}
      {activeTab === "history" && (
        <StockHistoryTab
          events={stockEvents}
          onViewEvent={handleViewEvent}
          onExportClick={() => setExportModalOpen(true)}
        />
      )}

      {/* MODALS */}
      {/* 1. Stock Event Details Modal (Matching Image 4 & 5 of Batch 1) */}
      <StockEventDetailsModal
        open={eventModalOpen}
        onOpenChange={setEventModalOpen}
        event={selectedEvent}
      />

      {/* 2. Confirm Stock Request Modal (Image 2 of Batch 2) */}
      <ConfirmStockRequestModal
        open={confirmModalOpen}
        onOpenChange={setConfirmModalOpen}
        quantities={requestQuantities}
        urgency={urgency}
        onConfirm={handleFinalSubmit}
      />

      {/* 3. Stock Request Status Modal (Image 4 of Batch 2) */}
      {pendingRequest && (
        <StockRequestStatusModal
          open={statusModalOpen}
          onOpenChange={setStatusModalOpen}
          request={pendingRequest}
          onOpenCancelModal={() => setCancelModalOpen(true)}
        />
      )}

      {/* 4. Cancel Stock Request Modal (Image 5 of Batch 2) */}
      {pendingRequest && (
        <CancelStockRequestModal
          open={cancelModalOpen}
          onOpenChange={setCancelModalOpen}
          requestRef={pendingRequest.requestRef}
          totalRequested={pendingRequest.totalRequested}
          onConfirmCancel={() => setPendingRequest(null)}
        />
      )}

      {/* 5. Export Stock Report Modal (Image 1 of Batch 2) */}
      <ExportStockReportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
      />

      {/* 6. Critical Stock Alert Modal (Image 3 of Batch 2) */}
      <CriticalStockAlertModal
        open={criticalModalOpen}
        onOpenChange={setCriticalModalOpen}
        onRequestStockNow={() => handleRequestMore("Router SIM")}
      />

      {/* 7. Stock Request Success Modal */}
      <StockRequestSuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        requestRef={submittedRef}
        totalUnits={
          requestQuantities.pos +
          requestQuantities.cctv +
          requestQuantities.gps +
          requestQuantities.router
        }
        urgency={urgency}
        onDone={() => setActiveTab("available")}
      />
    </div>
  );
}

export default AgencyPartnerStockPage;
