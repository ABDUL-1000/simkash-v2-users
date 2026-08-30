import { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Bell, Download } from "lucide-react";
import { DashboardStats } from "../components/DashboardStat";

import type { RenewalFilters, RenewalRow } from "@/types/renewal.types";
import { DUMMY_RENEWAL_ROWS } from "../components/data/DummyDatas";
import { RenewalFilterBar } from "../components/RenewalFilterBar";
import { RenewalTable } from "../components/RenewalTable";
import { AutomatedNotificationSchedule } from "../components/AutomatedNotificationSchedule";

import { RenewSimModal } from "@/features/sim-hub/sim-search/components/sim-details/Modals/RenewSimModal";
import { NotifyCustomerModal } from "@/features/sim-hub/sim-search/components/sim-details/Modals/NotifyCustomerModal";
import { SetUsageAlertModal } from "@/features/sim-hub/sim-search/components/sim-details/Modals/SetUsageAlertModal";
import { BulkReminderModal } from "../components/Modals/BulkReminderModal";

export default function RenewalMonitoringPage() {
  const [filters, setFilters] = useState<RenewalFilters>({ tab: "all", search: "" });

  const [activeModal, setActiveModal] = useState<
    "renew" | "notify" | "setAlert" | "bulkReminder" | null
  >(null);
  const [selectedRow, setSelectedRow] = useState<RenewalRow | null>(null);

  const counts = useMemo(
    () => ({
      all: DUMMY_RENEWAL_ROWS.length,
      critical: DUMMY_RENEWAL_ROWS.filter((r) => r.urgency === "critical").length,
      warning: DUMMY_RENEWAL_ROWS.filter((r) => r.urgency === "warning").length,
      watch: DUMMY_RENEWAL_ROWS.filter((r) => r.urgency === "watch").length,
    }),
    [],
  );

  const filteredRows = useMemo(() => {
    return DUMMY_RENEWAL_ROWS.filter((row) => {
      if (filters.tab !== "all" && row.urgency !== filters.tab) return false;
      if (filters.simType && filters.simType !== "all" && !row.simType.toLowerCase().includes(filters.simType)) return false;
      if (filters.network && filters.network !== "all" && row.network !== filters.network) return false;
      if (filters.role && filters.role !== "all") {
        const roleMatch = filters.role === "agency" ? "agency partner" : "corporate agent";
        if (!row.activatedByRole.toLowerCase().includes(roleMatch)) return false;
      }
      if (filters.usageAlert && filters.usageAlert !== "all") {
        const threshold = Number(filters.usageAlert);
        const pct = (row.dataUsedGb / row.dataTotalGb) * 100;
        if (pct < threshold) return false;
      }
      if (filters.search.trim()) {
        const q = filters.search.trim().toLowerCase();
        const haystack = `${row.customerName} ${row.simNumber} ${row.activatedByName}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [filters]);

  const handleRenew = (row: RenewalRow) => {
    setSelectedRow(row);
    setActiveModal("renew");
  };

  const handleNotify = (row: RenewalRow) => {
    setSelectedRow(row);
    setActiveModal("notify");
  };

  const handleSetAlert = (row: RenewalRow) => {
    setSelectedRow(row);
    setActiveModal("setAlert");
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Renewal Monitoring"
        description="Active SIMs expiring within 30 days — all networks, all types, all roles"
        actions={[
          {
            key: "send-bulk-reminder",
            label: "Send Bulk Reminder",
            icon: <Bell className="size-4" />,
            variant: "outline",
            onClick: () => setActiveModal("bulkReminder"),
          },
          {
            key: "export-list",
            label: "Export List",
            icon: <Download className="size-4" />,
            variant: "outline",
            onClick: () => {
              // Export list action
            },
          },
        ]}
      />

      <DashboardStats />

      <RenewalFilterBar filters={filters} onFiltersChange={setFilters} counts={counts} />

      <RenewalTable
        rows={filteredRows}
        total={filteredRows.length}
        onRenew={handleRenew}
        onNotify={handleNotify}
        onSetAlert={handleSetAlert}
        onExport={() => {}}
      />

      <AutomatedNotificationSchedule />

      {/* Modals */}
      <RenewSimModal
        open={activeModal === "renew"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        customerName={selectedRow?.customerName}
        maskedPhone={selectedRow?.customerPhoneMasked}
        phoneNumber={selectedRow?.simNumber}
        network={selectedRow?.network?.toUpperCase()}
        simType={selectedRow?.simType}
      />

      <NotifyCustomerModal
        open={activeModal === "notify"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        customerName={selectedRow?.customerName}
        maskedPhone={selectedRow?.customerPhoneMasked}
      />

      <SetUsageAlertModal
        open={activeModal === "setAlert"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        simNumber={selectedRow?.simNumber}
        network={selectedRow?.network?.toUpperCase()}
        simType={selectedRow?.simType}
        usedGb={selectedRow?.dataUsedGb}
        totalGb={selectedRow?.dataTotalGb}
        customerPhone={selectedRow?.customerPhoneMasked}
        agentName={selectedRow?.activatedByName}
      />

      <BulkReminderModal
        open={activeModal === "bulkReminder"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        criticalCount={counts.critical || 847}
        warningCount={counts.warning || 1102}
        watchCount={counts.watch || 1255}
      />
    </div>
  );
}