import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Download, Plus } from "lucide-react";
import { DashboardStats } from "../components/DashboardStat";
import { DeviceTypeSwitcher, type DeviceType } from "../components/DeviceTypeSwitcher";
import { DeviceInventoryTable, type DeviceRow } from "../components/DeviceInventoryTable";
import { DeviceStatusCard } from "../components/DeviceStatusCard";
import { RecentAlertsCard, type AlertItem } from "../components/RecentAlertsCard";
import { DeviceQuickActionsCard } from "../components/DeviceQuickActionsCard";

import { RegisterDeviceModal } from "../Modals/RegisterDeviceModal";
import { ResolveAlertModal } from "../Modals/ResolveAlertModal";
import { EditDeviceModal } from "../Modals/EditDeviceModal";
import { DeviceDetailsModal } from "../Modals/DeviceDetailsModal";

export default function DeviceHubPage() {
  const [activeDeviceType, setActiveDeviceType] = useState<DeviceType>("cctv");

  const [activeModal, setActiveModal] = useState<
    "register" | "resolveAlert" | "details" | "edit" | null
  >(null);
  const [selectedDevice, setSelectedDevice] = useState<DeviceRow | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  const handleSelectDevice = (row: DeviceRow) => {
    setSelectedDevice(row);
    setActiveModal("details");
  };

  const handleActionClick = (actionId: string) => {
    if (actionId === "register") {
      setActiveModal("register");
    } else if (actionId === "resolve") {
      setActiveModal("resolveAlert");
    }
  };

  const handleAlertClick = (alert: AlertItem) => {
    setSelectedAlert(alert);
    setActiveModal("resolveAlert");
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Device Hub"
        description="Real-time monitoring across CCTV, GPS, Router and Solar devices"
        actions={[
          {
            key: "export-dashboard",
            label: "Export Report",
            icon: <Download className="size-4" />,
            variant: "outline",
          },
          {
            key: "register-device",
            label: "Register Device",
            icon: <Plus className="size-4" />,
            variant: "default",
            onClick: () => setActiveModal("register"),
          },
        ]}
      />

      <DashboardStats />

      {/* Grid: Left (Table + Switcher), Right (3 Sidebar Cards) */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px] 2xl:grid-cols-[1fr_380px]">
        {/* Left Column: Device Type Switcher + Device Table */}
        <div className="space-y-6 min-w-0">
          <DeviceTypeSwitcher
            activeType={activeDeviceType}
            onTypeChange={setActiveDeviceType}
          />
          <DeviceInventoryTable
            deviceType={activeDeviceType}
            onSelectRow={handleSelectDevice}
          />
        </div>

        {/* Right Column: Sidebar Cards Stack */}
        <div className="space-y-6 min-w-0">
          <DeviceStatusCard />
          <RecentAlertsCard onAlertClick={handleAlertClick} />
          <DeviceQuickActionsCard onActionClick={handleActionClick} />
        </div>
      </div>

      {/* Modals */}
      <RegisterDeviceModal
        open={activeModal === "register"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <ResolveAlertModal
        open={activeModal === "resolveAlert"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        alertTitle={selectedAlert ? `${selectedAlert.name} Alert` : "Camera Signal Loss"}
        deviceName={selectedAlert?.name || "CAM-001-LOS"}
        location={selectedAlert?.location || "Eko Bridge, Lagos"}
        time={selectedAlert?.time ? `Today at ${selectedAlert.time}` : "Today at 2:14 PM"}
      />

      <DeviceDetailsModal
        open={activeModal === "details"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        device={{
          deviceName: selectedDevice?.deviceName || "CAM-001-LOS",
          brandModel: "Hikvision DS-2CD2143G2",
          deviceType: selectedDevice?.deviceType?.toUpperCase() + " Camera" || "CCTV Camera",
          serialNumber: selectedDevice?.serialNumber || "HIK-2025-001234",
          macAddress: "A4:2B:8C:1D:3F:7E",
          simNumber: selectedDevice?.simNumber || "08123456789",
          network: selectedDevice?.network || "MTN",
          customer: selectedDevice?.assignedTo || "Lagos State Ministry of Works",
          location: "Eko Bridge, Lagos",
          installDate: "Nov 12, 2024",
          lastActivity: "2 minutes ago",
          firmwareVersion: "v4.2.1 (Latest)",
          status: selectedDevice?.status || "Active",
        }}
        onEditDevice={() => setActiveModal("edit")}
      />

      <EditDeviceModal
        open={activeModal === "edit"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        device={{
          deviceName: selectedDevice?.deviceName || "CAM-001-LOS",
          brandModel: "Hikvision DS-2CD2143G2",
          serialNumber: selectedDevice?.serialNumber || "HIK-2025-001234",
          macAddress: "A4:2B:8C:1D:3F:7E",
          simNumber: selectedDevice?.simNumber || "08123456789",
          customer: selectedDevice?.assignedTo || "Lagos State Ministry of Works",
          location: "Eko Bridge, Lagos",
        }}
      />
    </div>
  );
}
