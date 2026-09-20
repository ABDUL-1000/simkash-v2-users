import { useState } from "react";
import { History, Info } from "lucide-react";
import { SC_NETWORK_MAP_DATA } from "../data/rm-redistribute.data";
import type {
  RedistributeMode,
  ScNetworkMapItem,
  RedistributeReason,
} from "../types/rm-redistribute.types";

// Page Subcomponents
import { RedistributeModeSelector } from "../inventory/components/redistribute/RedistributeModeSelector";
import { ScToScTransferForm } from "../inventory/components/redistribute/ScToScTransferForm";
import { RecallFromScForm } from "../inventory/components/redistribute/RecallFromScForm";
import { QuickDistributeForm } from "../inventory/components/redistribute/QuickDistributeForm";
import { RedistributeSidebar } from "../inventory/components/redistribute/RedistributeSidebar";

// Modals
import { ConfirmScToScTransferModal } from "../inventory/Modals/ConfirmScToScTransferModal";
import { ConfirmStockRecallModal } from "../inventory/Modals/ConfirmStockRecallModal";
import { AwaitingScConfirmationModal } from "../inventory/Modals/AwaitingScConfirmationModal";
import { ForceRecallStockModal } from "../inventory/Modals/ForceRecallStockModal";
import { NotificationPreviewModal } from "../inventory/Modals/NotificationPreviewModal";
import { RedistributionHistoryModal } from "../inventory/Modals/RedistributionHistoryModal";
import {
  ActionSuccessModal,
  type DetailItem,
} from "@/features/state-coordinator/modals/ActionSuccessModal";

export function RmRedistributeSimsPage() {
  // Mode selection
  const [mode, setMode] = useState<RedistributeMode>("sc-to-sc");

  // Selected State Coordinators
  const [fromSc, setFromSc] = useState<ScNetworkMapItem>(SC_NETWORK_MAP_DATA[0]); // Ibrahim Musa (7 SIMs)
  const [toSc, setToSc] = useState<ScNetworkMapItem>(SC_NETWORK_MAP_DATA[1]); // Ngozi Adeyemi (0 SIMs)

  // RM Stock
  const [rmStock, setRmStock] = useState(300);

  // SIM Type Quantities
  const [posQty, setPosQty] = useState(7);
  const [cctvQty, setCctvQty] = useState(0);
  const [gpsQty, setGpsQty] = useState(0);
  const [routerQty, setRouterQty] = useState(0);

  // Reason & Notes
  const [reason, setReason] = useState<RedistributeReason>("balance-stock");
  const [notes, setNotes] = useState("");
  const [notifyScs, setNotifyScs] = useState(true);

  // Modals state
  const [confirmScToScOpen, setConfirmScToScOpen] = useState(false);
  const [confirmRecallOpen, setConfirmRecallOpen] = useState(false);
  const [awaitingScOpen, setAwaitingScOpen] = useState(false);
  const [forceRecallOpen, setForceRecallOpen] = useState(false);
  const [notificationPreviewOpen, setNotificationPreviewOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  // Success modal details configuration
  const [successConfig, setSuccessConfig] = useState<{
    title: string;
    subtitle?: string;
    badgeText?: string;
    iconType?: "check" | "shield" | "trophy" | "sparkles";
    details?: DetailItem[];
  }>({
    title: "Action Completed Successfully",
  });

  const totalTransferQty = posQty + cctvQty + gpsQty + routerQty;

  const handleClearForm = () => {
    setPosQty(0);
    setCctvQty(0);
    setGpsQty(0);
    setRouterQty(0);
    setNotes("");
  };

  // 1. Success on Confirm SC-to-SC
  const handleConfirmScToSc = () => {
    setFromSc((prev) => ({
      ...prev,
      stock: Math.max(0, prev.stock - totalTransferQty),
      posStock: Math.max(0, prev.posStock - posQty),
    }));
    setToSc((prev) => ({
      ...prev,
      stock: prev.stock + totalTransferQty,
      posStock: prev.posStock + posQty,
    }));

    setSuccessConfig({
      title: "Stock Transfer Completed!",
      subtitle: `${totalTransferQty} SIMs successfully moved from ${fromSc.fullName} to ${toSc.fullName}.`,
      badgeText: "TRANSFER CONFIRMED",
      iconType: "check",
      details: [
        { label: "From Coordinator", value: `${fromSc.fullName} (${fromSc.state})` },
        { label: "To Coordinator", value: `${toSc.fullName} (${toSc.state})` },
        { label: "Quantity", value: `${totalTransferQty} units` },
        { label: "Reference", value: "REDIST-2026-00848" },
      ],
    });
    setSuccessOpen(true);
    handleClearForm();
  };

  // 2. Open Awaiting SC confirmation after voluntary recall
  const handleProceedRecall = () => {
    setAwaitingScOpen(true);
  };

  // 3. Force Recall action
  const handleForceRecall = (recallReason?: string, recallNote?: string) => {
    setFromSc((prev) => ({
      ...prev,
      stock: Math.max(0, prev.stock - totalTransferQty),
      posStock: Math.max(0, prev.posStock - posQty),
    }));
    setRmStock((prev) => prev + totalTransferQty);

    setSuccessConfig({
      title: "Stock Recalled Instantly!",
      subtitle: `Force recall executed. ${totalTransferQty} POS SIMs returned to Regional Inventory.`,
      badgeText: "FORCE RECALL EXECUTED",
      iconType: "shield",
      details: [
        { label: "Recalled From", value: `${fromSc.fullName} (${fromSc.state})` },
        { label: "Total Returned", value: `${totalTransferQty} SIMs` },
        { label: "New RM Balance", value: `${rmStock + totalTransferQty} SIMs` },
        { label: "Reason", value: recallReason ?? "SC Not Responding" },
        ...(recallNote ? [{ label: "Notes", value: recallNote }] : []),
        { label: "Audit Review", value: "Logged with Super Admin" },
      ],
    });
    setSuccessOpen(true);
    handleClearForm();
  };

  // 4. Awaiting confirmation done
  const handleAwaitingDone = () => {
    setSuccessConfig({
      title: "Recall Request Sent!",
      subtitle: `A confirmation SMS has been dispatched to ${fromSc.fullName}.`,
      badgeText: "REQUEST PENDING SC APPROVAL",
      iconType: "check",
      details: [
        { label: "Coordinator", value: fromSc.fullName },
        { label: "Phone", value: fromSc.phone },
        { label: "Requested SIMs", value: `${totalTransferQty} POS units` },
        { label: "Expiration", value: "In 24 hours" },
      ],
    });
    setSuccessOpen(true);
    handleClearForm();
  };

  // 5. Quick Distribute
  const handleConfirmQuickDistribute = () => {
    setToSc((prev) => ({
      ...prev,
      stock: prev.stock + totalTransferQty,
      posStock: prev.posStock + posQty,
    }));
    setRmStock((prev) => Math.max(0, prev - totalTransferQty));

    setSuccessConfig({
      title: "Quick Dispatch Successful!",
      subtitle: `${totalTransferQty} SIMs immediately allocated to ${toSc.fullName}.`,
      badgeText: "ALLOCATION COMPLETED",
      iconType: "check",
      details: [
        { label: "Recipient", value: `${toSc.fullName} (${toSc.state})` },
        { label: "Quantity Dispatched", value: `${totalTransferQty} SIMs` },
        { label: "Remaining RM Stock", value: `${rmStock - totalTransferQty} SIMs` },
        { label: "Status", value: "In Transit via SC Express" },
      ],
    });
    setSuccessOpen(true);
    handleClearForm();
  };

  // 6. Export History
  const handleExportHistory = () => {
    setHistoryOpen(false);
    setSuccessConfig({
      title: "Redistribution History Exported!",
      subtitle: "Your complete network movement audit log is ready.",
      badgeText: "CSV REPORT READY",
      iconType: "trophy",
      details: [
        { label: "Format", value: "CSV Document (.csv)" },
        { label: "Total Records", value: "8 History Records" },
        { label: "Exported At", value: "Just now" },
      ],
    });
    setSuccessOpen(true);
  };

  return (
    <div className="space-y-6 ">
      {/* 1. Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#0F152A]">
            Redistribute SIMs
          </h1>
          <p className="text-xs font-medium text-[#64748B]">
            Move stock between your State Coordinators or recall stock back to your
            inventory
          </p>
        </div>

        {/* Redistribution History Button */}
        <button
          type="button"
          onClick={() => setHistoryOpen(true)}
          className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50 shadow-2xs self-start sm:self-auto"
        >
          <History className="size-4 text-[#64748B]" />
          <span>Redistribution History</span>
        </button>
      </div>

      {/* 2. Top Info Banner */}
      <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-[#EFF6FF] p-4 text-xs text-[#1E40AF]">
        <Info className="size-4 shrink-0 text-[#2563EB] mt-0.5" />
        <p className="leading-relaxed">
          <strong>Redistribution moves SIMs within your network only.</strong>{" "}
          You can transfer between your SCs or recall stock back to your own
          inventory. All movements are logged and visible to Super Admin.
        </p>
      </div>

      {/* 3. Top Mode Selector */}
      <RedistributeModeSelector mode={mode} onSelectMode={setMode} />

      {/* 4. Main Two-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Active Form (8 Cols) */}
        <div className="lg:col-span-8">
          {mode === "sc-to-sc" && (
            <ScToScTransferForm
              fromSc={fromSc}
              toSc={toSc}
              onSelectFromSc={setFromSc}
              onSelectToSc={setToSc}
              posQty={posQty}
              setPosQty={setPosQty}
              cctvQty={cctvQty}
              setCctvQty={setCctvQty}
              gpsQty={gpsQty}
              setGpsQty={setGpsQty}
              routerQty={routerQty}
              setRouterQty={setRouterQty}
              reason={reason}
              setReason={setReason}
              notes={notes}
              setNotes={setNotes}
              notifyScs={notifyScs}
              setNotifyScs={setNotifyScs}
              onClear={handleClearForm}
              onPreview={() => setConfirmScToScOpen(true)}
              onPreviewNotifications={() => setNotificationPreviewOpen(true)}
            />
          )}

          {mode === "recall" && (
            <RecallFromScForm
              sc={fromSc}
              onSelectSc={setFromSc}
              posQty={posQty}
              setPosQty={setPosQty}
              cctvQty={cctvQty}
              setCctvQty={setCctvQty}
              gpsQty={gpsQty}
              setGpsQty={setGpsQty}
              routerQty={routerQty}
              setRouterQty={setRouterQty}
              reason={reason}
              setReason={setReason}
              notes={notes}
              setNotes={setNotes}
              notifySc={notifyScs}
              setNotifySc={setNotifyScs}
              rmStock={rmStock}
              onClear={handleClearForm}
              onPreview={() => setConfirmRecallOpen(true)}
            />
          )}

          {mode === "quick-dist" && (
            <QuickDistributeForm
              toSc={toSc}
              onSelectToSc={setToSc}
              posQty={posQty}
              setPosQty={setPosQty}
              cctvQty={cctvQty}
              setCctvQty={setCctvQty}
              gpsQty={gpsQty}
              setGpsQty={setGpsQty}
              routerQty={routerQty}
              setRouterQty={setRouterQty}
              reason={reason}
              setReason={setReason}
              notes={notes}
              setNotes={setNotes}
              notifySc={notifyScs}
              setNotifySc={setNotifyScs}
              rmStock={rmStock}
              onClear={handleClearForm}
              onPreview={handleConfirmQuickDistribute}
            />
          )}
        </div>

        {/* Right Column: Live Sidebar Preview & SC Map (4 Cols) */}
        <div className="lg:col-span-4">
          <RedistributeSidebar
            fromName={fromSc.fullName}
            fromBefore={fromSc.stock}
            fromAfter={Math.max(0, fromSc.stock - totalTransferQty)}
            toName={toSc.fullName}
            toBefore={toSc.stock}
            toAfter={toSc.stock + totalTransferQty}
            quantity={totalTransferQty}
            simType="POS SIM"
            selectedScId={fromSc.id}
            onSelectSc={(sc) => {
              if (sc.id !== toSc.id) setFromSc(sc);
            }}
            onViewAllHistory={() => setHistoryOpen(true)}
          />
        </div>
      </div>

      {/* MODALS */}
      {/* 1. Confirm SC to SC Modal */}
      <ConfirmScToScTransferModal
        open={confirmScToScOpen}
        onOpenChange={setConfirmScToScOpen}
        fromScName={fromSc.fullName}
        fromState={fromSc.state}
        fromCurrentStock={fromSc.stock}
        toScName={toSc.fullName}
        toState={toSc.state}
        toCurrentStock={toSc.stock}
        simType="POS SIM"
        quantity={totalTransferQty}
        reason={
          reason === "balance-stock"
            ? "Urgent — SC Out of Stock"
            : "Balance Network Stock"
        }
        onConfirm={handleConfirmScToSc}
        onEdit={() => setConfirmScToScOpen(false)}
        onPreviewNotifications={() => setNotificationPreviewOpen(true)}
      />

      {/* 2. Confirm Stock Recall Modal */}
      <ConfirmStockRecallModal
        open={confirmRecallOpen}
        onOpenChange={setConfirmRecallOpen}
        scName={fromSc.fullName}
        scState={fromSc.state}
        scCurrentStock={fromSc.stock}
        rmCurrentStock={rmStock}
        simType="POS SIM"
        quantity={totalTransferQty}
        onConfirm={handleProceedRecall}
        onEdit={() => setConfirmRecallOpen(false)}
      />

      {/* 3. Awaiting SC Confirmation Modal */}
      <AwaitingScConfirmationModal
        open={awaitingScOpen}
        onOpenChange={setAwaitingScOpen}
        scName={fromSc.fullName}
        phone={fromSc.phone}
        recallQty={totalTransferQty}
        simType="POS SIM"
        expiresIn="In 24 hours"
        refNo="RECALL-REQ-2026-00847"
        onForceRecall={() => {
          setAwaitingScOpen(false);
          setForceRecallOpen(true);
        }}
        onDone={handleAwaitingDone}
      />

      {/* 4. Force Recall Stock Modal */}
      <ForceRecallStockModal
        open={forceRecallOpen}
        onOpenChange={setForceRecallOpen}
        scName={fromSc.fullName}
        state={fromSc.state}
        quantity={totalTransferQty}
        simType="POS SIM"
        onConfirm={({ reason: r, note }) => {
          handleForceRecall(r, note);
        }}
      />

      {/* 5. Notification Preview Modal */}
      <NotificationPreviewModal
        open={notificationPreviewOpen}
        onOpenChange={setNotificationPreviewOpen}
        fromScName={fromSc.fullName}
        fromPhone={fromSc.phone}
        fromState={fromSc.state}
        fromStockBefore={fromSc.stock}
        fromStockAfter={Math.max(0, fromSc.stock - totalTransferQty)}
        toScName={toSc.fullName}
        toPhone={toSc.phone}
        toState={toSc.state}
        toStockBefore={toSc.stock}
        toStockAfter={toSc.stock + totalTransferQty}
        quantity={totalTransferQty}
        simType="POS SIM"
        rmName="Yusuf"
        rmPhone="08065942373"
        refNo="REDIST-2026-00847"
      />

      {/* 6. Redistribution History Modal */}
      <RedistributionHistoryModal
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        onExport={handleExportHistory}
      />

      {/* 7. Success Action Modal */}
      <ActionSuccessModal
        open={successOpen}
        onOpenChange={setSuccessOpen}
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

export default RmRedistributeSimsPage;
