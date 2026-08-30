"use client";

import { useState } from "react";
import { Info, Search, X } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type RegisterDeviceModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegisterSuccess?: () => void;
};

export function RegisterDeviceModal({
  open,
  onOpenChange,
  onRegisterSuccess,
}: RegisterDeviceModalProps) {
  const [deviceType, setDeviceType] = useState("CCTV Camera");
  const [brandModel, setBrandModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [linkedSim, setLinkedSim] = useState("07022222222 · MTN · POS SIM · Active");
  const [assignedCustomer, setAssignedCustomer] = useState("Chidi Eze · 0812***4521 · Lagos");
  const [installDate, setInstallDate] = useState("17 Jun 2026");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Register Device"
      description="Register a new device to fleet"
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "register",
          label: "Register Device",
          variant: "primary",
          onClick: () => {
            onRegisterSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Row 1: Device Type & Brand/Model */}
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
            <label className="mb-1 block font-bold text-[#0F172A]">Device Brand / Model</label>
            <input
              type="text"
              value={brandModel}
              onChange={(e) => setBrandModel(e.target.value)}
              placeholder="e.g. Hikvision DS-2CD2143G2"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* Row 2: Serial Number & MAC Address */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">Serial Number</label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              placeholder="e.g. HK2143G200234"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold text-[#0F172A]">MAC Address (optional)</label>
            <input
              type="text"
              value={macAddress}
              onChange={(e) => setMacAddress(e.target.value)}
              placeholder="e.g. 00:1A:2B:3C:4D:5E"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* Row 3: Link SIM Card */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Link SIM Card</label>
          <div className="relative mb-2">
            <Search className="absolute left-3.5 top-3 size-4 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search SIM number or serial..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-3.5 py-2.5 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
          {linkedSim && (
            <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2 text-xs font-semibold text-[#0F172A]">
              <span>{linkedSim}</span>
              <button type="button" onClick={() => setLinkedSim("")} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="size-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Row 4: Assign to Customer */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Assign to Customer</label>
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Search customer by name or phone..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
          {assignedCustomer && (
            <div className="flex items-center justify-between rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] px-3.5 py-2 text-xs font-semibold text-[#0F172A]">
              <span>{assignedCustomer}</span>
              <button type="button" onClick={() => setAssignedCustomer("")} className="text-[#64748B] hover:text-[#0F172A]">
                <X className="size-3.5" />
              </button>
            </div>
          )}
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
            <label className="mb-1 block font-bold text-[#0F172A]">Location / Address</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. 23 Allen Avenue, Lagos"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* Row 6: Notes */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Notes (optional)</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional installation notes..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Info Banner */}
        <div className="flex items-start gap-2.5 rounded-xl border border-[#BFDBFE] bg-[#F0F6FF] p-3 text-xs leading-relaxed text-[#2563EB]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <span>
            Device will be registered as OFFLINE until its SIM is activated and the device sends its first heartbeat signal.
          </span>
        </div>
      </div>
    </AppModal>
  );
}
