import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, RefreshCw, Trash2 } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { EntityDetailsHeader } from "@/components/common/EntityDetailsHeader";
import { CustomerKpiStrip } from "../components/CustomerKpiStrip";
import { CustomerInfoCard } from "../components/CustomerInfoCard";
import { ActiveSimCard } from "../components/ActiveSimCard";
import { AllSimsActivatedCard } from "../components/AllSimsActivatedCard";
import { RenewalHistoryCard } from "../components/RenewalHistoryCard";
import { RemindersSentCard } from "../components/RemindersSentCard";
import { CustomerNotesCard } from "../components/CustomerNotesCard";
import { CustomerActionsSidebar } from "../components/CustomerActionsSidebar";

// Modals
import { EditCustomerModal } from "../Modals/EditCustomerModal";
import { CustomerSimDetailsModal } from "../Modals/CustomerSimDetailsModal";
import { RenewSimModal } from "../Modals/RenewSimModal";
import { SendRenewalReminderModal } from "../Modals/SendRenewalReminderModal";
import { RemoveCustomerModal } from "../Modals/RemoveCustomerModal";
import { AddNoteModal } from "../Modals/AddNoteModal";

import { INITIAL_CUSTOMERS } from "../data/customer.data";
import type { CustomerItem } from "../types/customer.types";

export function CustomerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find customer or fallback to Chidi Eze (cust-1)
  const initialCustomer =
    INITIAL_CUSTOMERS.find((c) => c.id === id) || INITIAL_CUSTOMERS[0];
  const [customer, setCustomer] = useState<CustomerItem>(initialCustomer);

  // Modals state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [simDetailsModalOpen, setSimDetailsModalOpen] = useState(false);
  const [renewModalOpen, setRenewModalOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);

  // Notes state
  const [notes, setNotes] = useState<string[]>([]);

  const handleUpdateCustomer = (updated: Partial<CustomerItem>) => {
    setCustomer((prev) => ({ ...prev, ...updated }));
  };

  const handleAddNote = (newNote: string) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleConfirmRemove = () => {
    setTimeout(() => {
      navigate(appPaths.apCustomers);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      {/* Top Navigation Row: Back Link */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(appPaths.apCustomers)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#66738C] hover:text-[#0F152A] transition"
        >
          <ArrowLeft className="size-4" />
          <span>Back to My Customers</span>
        </button>

        <button
          type="button"
          onClick={() => setRemoveModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#EF4444] hover:text-[#DC2626] transition"
        >
          <Trash2 className="size-3.5" />
          <span>Remove from list</span>
        </button>
      </div>

      {/* Top KPI Strip (5 metrics) */}
      <CustomerKpiStrip
        customerSince={customer.customerSince || "1 Jun 2026"}
        simsActivated={1}
        plan={`${customer.simType} SIM · ${customer.plan}`}
        status={customer.status}
        expiryDate={customer.expiryDate || "26 Jul 2026"}
        daysLeft={customer.daysRemaining || 32}
      />

      {/* Profile Header via Reusable EntityDetailsHeader */}
      <EntityDetailsHeader
        name={customer.name}
        phone={customer.phone}
        location="Lagos"
        avatarInitials={customer.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
        avatarBg="#2563EB"
        badges={[
          {
            label: `● ${customer.status}`,
            variant:
              customer.status === "Active"
                ? "success"
                : customer.status === "Expiring"
                ? "amber"
                : "danger",
          },
          { label: `${customer.simType} SIM`, variant: "info" },
          { label: customer.network, variant: "amber" },
        ]}
        actions={[
          {
            key: "send-reminder",
            label: "Send Reminder",
            icon: <Bell className="size-4" />,
            variant: "amber",
            onClick: () => setReminderModalOpen(true),
          },
          {
            key: "renew-sim",
            label: "Renew SIM",
            icon: <RefreshCw className="size-4" />,
            variant: "primary",
            onClick: () => setRenewModalOpen(true),
          },
        ]}
      />

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (4 cols) */}
        <div className="space-y-6 lg:col-span-4">
          <CustomerInfoCard
            customer={customer}
            onEditClick={() => setEditModalOpen(true)}
          />

          <ActiveSimCard customer={customer} />

          <AllSimsActivatedCard
            customer={customer}
            onViewSimDetails={() => setSimDetailsModalOpen(true)}
          />
        </div>

        {/* Middle Column (4 cols) */}
        <div className="space-y-6 lg:col-span-4">
          <RenewalHistoryCard />

          <RemindersSentCard
            onSendReminderNow={() => setReminderModalOpen(true)}
          />

          <CustomerNotesCard
            notes={notes}
            onAddNoteClick={() => setAddNoteModalOpen(true)}
          />
        </div>

        {/* Right Column (4 cols): Actions & Summary Sidebar */}
        <div className="space-y-6 lg:col-span-4">
          <CustomerActionsSidebar
            onRenewSim={() => setRenewModalOpen(true)}
            onSendReminder={() => setReminderModalOpen(true)}
            onEditCustomer={() => setEditModalOpen(true)}
            onViewSimDetails={() => setSimDetailsModalOpen(true)}
            expiryDate={customer.expiryDate || "26 Jul 2026"}
            daysRemaining={customer.daysRemaining || 32}
            customerSince={customer.customerSince || "1 Jun 2026"}
          />
        </div>
      </div>

      {/* MODALS */}
      <EditCustomerModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        customer={customer}
        onSaveCustomer={handleUpdateCustomer}
      />

      <CustomerSimDetailsModal
        open={simDetailsModalOpen}
        onOpenChange={setSimDetailsModalOpen}
        customer={customer}
        onRenewClick={() => {
          setSimDetailsModalOpen(false);
          setRenewModalOpen(true);
        }}
      />

      <RenewSimModal
        open={renewModalOpen}
        onOpenChange={setRenewModalOpen}
        customerName={customer.name}
        simNumber={customer.simNumber}
        simType={customer.simType}
        expiryDate={customer.expiryDate}
      />

      <SendRenewalReminderModal
        open={reminderModalOpen}
        onOpenChange={setReminderModalOpen}
        customerName={customer.name}
        customerPhone={customer.phone}
        simNumber={customer.simNumber}
        simType={customer.simType}
        network={customer.network}
        expiryDate={customer.expiryDate}
        daysRemaining={customer.daysRemaining || 3}
      />

      <RemoveCustomerModal
        open={removeModalOpen}
        onOpenChange={setRemoveModalOpen}
        customerName={customer.name}
        customerPhone={customer.phone}
        onConfirmRemove={handleConfirmRemove}
      />

      <AddNoteModal
        open={addNoteModalOpen}
        onOpenChange={setAddNoteModalOpen}
        customerName={customer.name}
        onSaveNote={handleAddNote}
      />
    </div>
  );
}

export default CustomerDetailsPage;
