"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type EditDeviceModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  device?: {
    deviceName?: string;
    deviceType?: string;
    brandModel?: string;
    serialNumber?: string;
    macAddress?: string;
    simNumber?: string;
    network?: string;
    customer?: string;
    installDate?: string;
    location?: string;
    notes?: string;
  };
  onSave?: () => void;
};

export function EditDeviceModal({
  open,
  onOpenChange,
  device,
  onSave,
}: EditDeviceModalProps) {
  const [deviceType, setDeviceType] = useState(device?.deviceType || "CCTV Camera");
  const [brandModel, setBrandModel] = useState(device?.brandModel || "Hikvision DS-2CD2143G2");
  const [serialNumber] = useState(device?.serialNumber || "HIK-2025-001234");
  const [macAddress, setMacAddress] = useState(device?.macAddress || "A4:2B:8C:1D:3F:7E");
  const [simNumber, setSimNumber] = useState(device?.simNumber || "08123456789 · MTN");
  const [customer, setCustomer] = useState(device?.customer || "Lagos State Ministry of Works");
  const [installDate, setInstallDate] = useState(device?.installDate || "Nov 12, 2024");
  const [location, setLocation] = useState(device?.location || "Eko Bridge, Lagos");
  const [notes, setNotes] = useState(device?.notes || "");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Device"
      description="Update device information"
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "save",
          label: "Save Changes",
          variant: "primary",
          onClick: () => {
            onSave?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Row 1: Device Type & Brand & Model */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Device Type</label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="CCTV Camera">CCTV Camera</option>
              <option value="GPS Tracker">GPS Tracker</option>
              <option value="Router Device">Router Device</option>
              <option value="Solar Controller">Solar Controller</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Brand & Model</label>
            <input
              type="text"
              value={brandModel}
              onChange={(e) => setBrandModel(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* Row 2: Serial Number (Disabled) & MAC Address */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Serial Number</label>
            <input
              type="text"
              disabled
              value={serialNumber}
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F1F5F9] px-3.5 py-2.5 font-medium text-[#64748B] cursor-not-allowed"
            />
            <p className="mt-1 text-[11px] text-[#94A3B8]">Cannot be changed after registration</p>
          </div>

          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">MAC Address</label>
            <input
              type="text"
              value={macAddress}
              onChange={(e) => setMacAddress(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* Row 3: SIM / Phone Number */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">SIM / Phone Number</label>
          <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-medium text-[#0F172A]">
            {simNumber ? (
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#E2E8F0] px-2 py-0.5 text-xs font-semibold">{simNumber}</span>
                <button type="button" onClick={() => setSimNumber("")} className="text-[#64748B] hover:text-[#0F172A]">
                  <X className="size-3.5" />
                </button>
              </div>
            ) : (
              <span className="text-[#94A3B8]">Search to change...</span>
            )}
          </div>
        </div>

        {/* Row 4: Assigned Customer */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Assigned Customer</label>
          <div className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-medium text-[#0F172A]">
            {customer ? (
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#E2E8F0] px-2 py-0.5 text-xs font-semibold">{customer}</span>
                <button type="button" onClick={() => setCustomer("")} className="text-[#64748B] hover:text-[#0F172A]">
                  <X className="size-3.5" />
                </button>
              </div>
            ) : (
              <span className="text-[#94A3B8]">Search to change...</span>
            )}
          </div>
        </div>

        {/* Row 5: Installation Date & Location */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Installation Date</label>
            <input
              type="text"
              value={installDate}
              onChange={(e) => setInstallDate(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* Row 6: Notes (Optional) */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Notes (Optional)</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional notes about this device..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>
    </AppModal>
  );
}
