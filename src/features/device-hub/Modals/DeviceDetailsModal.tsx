"use client";

import { AppModal } from "@/components/common/AppModal";

type DeviceDetailsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device?: {
    deviceName?: string;
    brandModel?: string;
    deviceType?: string;
    serialNumber?: string;
    macAddress?: string;
    simNumber?: string;
    network?: string;
    customer?: string;
    location?: string;
    installDate?: string;
    lastActivity?: string;
    firmwareVersion?: string;
    status?: string;
  };
  onEditDevice?: () => void;
  onSendFirmware?: () => void;
  onDeactivateDevice?: () => void;
};

const CONNECTIVITY_BLOCKS = [
  true, true, true, false, true, true, true, true, false, true, true, true, true, true,
];

const ALERTS_HISTORY = [
  { id: "1", title: "Signal quality dropped below threshold", time: "2h ago", status: "Resolved" },
  { id: "2", title: "Device offline for 4 hours", time: "2 days ago", status: "Resolved" },
  { id: "3", title: "Firmware update available", time: "5 days ago", status: "Pending" },
];

export function DeviceDetailsModal({
  open,
  onOpenChange,
  device = {
    deviceName: "CAM-001-LOS",
    brandModel: "Hikvision DS-2CD2143G2",
    deviceType: "CCTV Camera",
    serialNumber: "HIK-2025-001234",
    macAddress: "A4:2B:8C:1D:3F:7E",
    simNumber: "08123456789",
    network: "MTN",
    customer: "Lagos State Ministry of Works",
    location: "Eko Bridge, Lagos",
    installDate: "Nov 12, 2024",
    lastActivity: "2 minutes ago",
    firmwareVersion: "v4.2.1 (Latest)",
    status: "Active",
  },
  onEditDevice,
  onSendFirmware,
  onDeactivateDevice,
}: DeviceDetailsModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={device.deviceName || "CAM-001-LOS"}
      description={`${device.brandModel} · ${device.deviceType}`}
      size="lg"
      actions={[
        {
          key: "edit",
          label: "Edit Device",
          variant: "secondary",
          onClick: () => {
            onEditDevice?.();
          },
        },
        {
          key: "firmware",
          label: "Send Firmware Update",
          variant: "primary",
          onClick: () => {
            onSendFirmware?.();
          },
        },
        {
          key: "deactivate",
          label: "Deactivate Device",
          variant: "primary",
          onClick: () => {
            onDeactivateDevice?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-5 text-xs sm:text-sm">
        {/* Top Status Banner */}
        <div className="flex items-center justify-between rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-3">
          <div className="flex items-center gap-2 font-bold text-[#059669]">
            <span className="size-2 rounded-full bg-[#059669]" />
            <span>Online</span>
          </div>
          <span className="text-xs font-semibold text-[#64748B]">Last heartbeat: Just now</span>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-2 gap-y-3.5 gap-x-6 text-xs sm:text-sm">
          <div>
            <span className="block text-[#64748B]">Device Type</span>
            <strong className="font-bold text-[#0F172A]">{device.deviceType}</strong>
          </div>
          <div>
            <span className="block text-[#64748B]">Brand & Model</span>
            <strong className="font-bold text-[#0F172A]">{device.brandModel}</strong>
          </div>

          <div>
            <span className="block text-[#64748B]">Serial Number</span>
            <strong className="font-bold text-[#0F172A]">{device.serialNumber}</strong>
          </div>
          <div>
            <span className="block text-[#64748B]">MAC Address</span>
            <strong className="font-bold text-[#0F172A]">{device.macAddress}</strong>
          </div>

          <div>
            <span className="block text-[#64748B]">SIM Number</span>
            <strong className="font-bold text-[#0F172A]">{device.simNumber}</strong>
          </div>
          <div>
            <span className="block text-[#64748B]">Network</span>
            <strong className="font-bold text-[#0F172A]">{device.network}</strong>
          </div>

          <div>
            <span className="block text-[#64748B]">Customer</span>
            <strong className="font-bold text-[#0F172A]">{device.customer}</strong>
          </div>
          <div>
            <span className="block text-[#64748B]">Location</span>
            <strong className="font-bold text-[#0F172A]">{device.location}</strong>
          </div>

          <div>
            <span className="block text-[#64748B]">Installation Date</span>
            <strong className="font-bold text-[#0F172A]">{device.installDate}</strong>
          </div>
          <div>
            <span className="block text-[#64748B]">Last Activity</span>
            <strong className="font-bold text-[#0F172A]">{device.lastActivity}</strong>
          </div>

          <div>
            <span className="block text-[#64748B]">Firmware Version</span>
            <strong className="font-bold text-[#0F172A]">{device.firmwareVersion}</strong>
          </div>
          <div>
            <span className="block text-[#64748B]">Status</span>
            <strong className="font-bold text-[#0F172A]">{device.status}</strong>
          </div>
        </div>

        {/* Connectivity History (Last 14 Days) */}
        <div className="border-t border-[#F1F5F9] pt-4">
          <p className="mb-2 text-xs font-bold text-[#0F172A]">Connectivity History (Last 14 Days)</p>
          <div className="flex gap-1.5 overflow-x-auto py-1">
            {CONNECTIVITY_BLOCKS.map((isOnline, i) => (
              <div
                key={i}
                className={`h-9 flex-1 min-w-[20px] rounded-md transition-all ${
                  isOnline ? "bg-[#10B981]" : "bg-[#E2E8F0]"
                }`}
              />
            ))}
          </div>
          <div className="mt-1.5 flex gap-4 text-[11px] font-semibold text-[#64748B]">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-xs bg-[#10B981]" /> Online
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-xs bg-[#E2E8F0]" /> Offline
            </span>
          </div>
        </div>

        {/* Alert History Section */}
        <div className="border-t border-[#F1F5F9] pt-4">
          <p className="mb-2.5 text-xs font-bold text-[#0F172A]">Alert History</p>
          <div className="space-y-2">
            {ALERTS_HISTORY.map((item) => {
              const isResolved = item.status === "Resolved";
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-3.5 py-2.5 text-xs"
                >
                  <span className="font-medium text-[#0F172A]">{item.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#94A3B8]">{item.time}</span>
                    <span
                      className={`rounded-md px-2 py-0.5 font-bold ${
                        isResolved
                          ? "bg-[#D1FAE5] text-[#065F46]"
                          : "bg-[#FEF3C7] text-[#92400E]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
