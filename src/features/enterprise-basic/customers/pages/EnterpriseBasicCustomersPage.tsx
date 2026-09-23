import React, { useState } from "react";
import { UserPlus, Download } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import {
  mockCustomerMetrics,
  mockCustomerList,
} from "../data/mockEbCustomersData";
import { EbCustomersKpiStrip } from "../components/EbCustomersKpiStrip";
import { EbCustomerFilterPills } from "../components/EbCustomerFilterPills";
import { EbCustomerDataTable } from "../components/EbCustomerDataTable";
import { EbCustomerAttentionSidebar } from "../components/EbCustomerAttentionSidebar";
import { EbCustomerAnalyticsSidebar } from "../components/EbCustomerAnalyticsSidebar";
import { AddNewCustomerModal } from "../modals/AddNewCustomerModal";
import { SendRenewalReminderModal } from "../modals/SendRenewalReminderModal";
import { AssignSimModal } from "../../modals/AssignSimModal";
import type { EbCustomerRecord } from "../types";

export const EnterpriseBasicCustomersPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [productFilter, setProductFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenReminderModal, setIsOpenReminderModal] = useState(false);
  const [isOpenAssignModal, setIsOpenAssignModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<EbCustomerRecord | null>(null);

  const filteredCustomers = mockCustomerList.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (productFilter !== "All" && c.productType !== productFilter) return false;
    if (durationFilter !== "All" && c.planDuration !== durationFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top PageHeader */}
      <PageHeader
        title="My Customers"
        description="Manage all external customers you've assigned SIMs to — track their plans, renewals and activity"
        actions={[
          {
            key: "export_customers",
            label: "Export Customer List",
            icon: <Download className="w-4 h-4" />,
            variant: "outline",
            onClick: () => {},
          },
          {
            key: "add_customer",
            label: "Add New Customer",
            icon: <UserPlus className="w-4 h-4" />,
            variant: "default",
            onClick: () => setIsOpenAddModal(true),
          },
        ]}
      />

      {/* KPI Strip */}
      <EbCustomersKpiStrip metrics={mockCustomerMetrics} />

      {/* Filter Pills */}
      <EbCustomerFilterPills
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        productFilter={productFilter}
        onProductChange={setProductFilter}
        durationFilter={durationFilter}
        onDurationChange={setDurationFilter}
      />

      {/* 2-Column Responsive Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <EbCustomerDataTable
            customers={filteredCustomers}
            onAssignSim={(customer) => {
              setSelectedCustomer(customer);
              setIsOpenAssignModal(true);
            }}
            onSendReminder={(customer) => {
              setSelectedCustomer(customer);
              setIsOpenReminderModal(true);
            }}
          />
        </div>

        {/* Right Column (1 col) */}
        <div className="lg:col-span-1 space-y-6">
          <EbCustomerAttentionSidebar
            metrics={mockCustomerMetrics}
            onSendBulkReminders={() => {
              setSelectedCustomer(null);
              setIsOpenReminderModal(true);
            }}
          />
          <EbCustomerAnalyticsSidebar />
        </div>
      </div>

      {/* Modals */}
      <AddNewCustomerModal
        open={isOpenAddModal}
        onOpenChange={setIsOpenAddModal}
        onCustomerAdded={() => setIsOpenAddModal(false)}
      />

      <SendRenewalReminderModal
        open={isOpenReminderModal}
        onOpenChange={setIsOpenReminderModal}
        customerName={selectedCustomer?.name}
        onSent={() => setIsOpenReminderModal(false)}
      />

      <AssignSimModal
        open={isOpenAssignModal}
        onOpenChange={setIsOpenAssignModal}
        onAssignSubmitted={() => setIsOpenAssignModal(false)}
      />
    </div>
  );
};

export default EnterpriseBasicCustomersPage;
