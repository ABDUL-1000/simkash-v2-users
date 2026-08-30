"use client";

import { useState } from "react";
import { Info, X, Search } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type CreateNewJobModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenManualSelect?: () => void;
  onCreateSuccess?: () => void;
};

export function CreateNewJobModal({
  open,
  onOpenChange,
  onOpenManualSelect,
  onCreateSuccess,
}: CreateNewJobModalProps) {
  const [jobType, setJobType] = useState("Solar Installation");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("High");
  const [selectedCustomer, setSelectedCustomer] = useState<{ name: string; phone: string; address: string } | null>({
    name: "Ade Bello",
    phone: "+234 801 234 5678",
    address: "Lagos, Nigeria",
  });
  const [deviceRef, setDeviceRef] = useState("");
  const [address, setAddress] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (8am–12pm)");
  const [assignmentMode, setAssignmentMode] = useState<"auto" | "manual">("auto");
  const [notes, setNotes] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Create New Job"
      description="Assign a new installation or maintenance job"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "create",
          label: "Create Job",
          variant: "primary",
          onClick: () => {
            onCreateSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Job Type & Priority */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">JOB TYPE</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="Solar Installation">Solar Installation</option>
              <option value="CCTV Installation">CCTV Installation</option>
              <option value="CCTV Maintenance">CCTV Maintenance</option>
              <option value="Solar Maintenance">Solar Maintenance</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">PRIORITY</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPriority("High")}
                className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all ${
                  priority === "High"
                    ? "bg-[#EF4444] text-white shadow-xs"
                    : "border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
                }`}
              >
                High
              </button>
              <button
                type="button"
                onClick={() => setPriority("Medium")}
                className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all ${
                  priority === "Medium"
                    ? "bg-[#0F1F36] text-white shadow-xs"
                    : "border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
                }`}
              >
                Medium
              </button>
              <button
                type="button"
                onClick={() => setPriority("Low")}
                className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition-all ${
                  priority === "Low"
                    ? "bg-[#0F1F36] text-white shadow-xs"
                    : "border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC]"
                }`}
              >
                Low
              </button>
            </div>
          </div>
        </div>

        {/* Customer Search & Selected Box */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">CUSTOMER</label>
          {!selectedCustomer ? (
            <div className="relative">
              <Search className="absolute left-3.5 top-3 size-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search customer by name or phone..."
                className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white">
                  AB
                </div>
                <div>
                  <p className="font-bold text-[#0F172A]">{selectedCustomer.name}</p>
                  <p className="text-xs text-[#64748B]">
                    {selectedCustomer.phone} · {selectedCustomer.address}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                className="text-[#94A3B8] hover:text-[#0F172A]"
              >
                <X className="size-4" />
              </button>
            </div>
          )}
        </div>

        {/* Device / SIM Ref */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            DEVICE / SIM REFERENCE
          </label>
          <div className="relative">
            <Search className="absolute left-3.5 top-3 size-4 text-[#94A3B8]" />
            <input
              type="text"
              value={deviceRef}
              onChange={(e) => setDeviceRef(e.target.value)}
              placeholder="Search device serial or SIM number..."
              className="w-full rounded-xl border border-[#E2E8F0] bg-white pl-10 pr-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* Installation Address */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            INSTALLATION ADDRESS
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter full address..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Scheduled Date & Time Slot */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
              SCHEDULED DATE
            </label>
            <select
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="">Select date ▾</option>
              <option value="Jul 3, 2026">Jul 3, 2026</option>
              <option value="Jul 4, 2026">Jul 4, 2026</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
              TIME SLOT
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="Morning (8am–12pm)">Morning (8am–12pm)</option>
              <option value="Afternoon (12pm–4pm)">Afternoon (12pm–4pm)</option>
              <option value="Evening (4pm–7pm)">Evening (4pm–7pm)</option>
            </select>
          </div>
        </div>

        {/* Installer Assignment Mode */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            INSTALLER ASSIGNMENT
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAssignmentMode("auto")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                assignmentMode === "auto"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "border border-[#E2E8F0] bg-white text-[#64748B]"
              }`}
            >
              Auto-Assign
            </button>
            <button
              type="button"
              onClick={() => {
                setAssignmentMode("manual");
                onOpenManualSelect?.();
              }}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                assignmentMode === "manual"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "border border-[#E2E8F0] bg-white text-[#64748B]"
              }`}
            >
              Manual Select
            </button>
          </div>

          <div className="mt-2.5 flex items-start gap-2 rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 text-xs text-[#2563EB]">
            <Info className="mt-0.5 size-4 shrink-0" />
            <span>
              Auto-assign picks the nearest available installer with matching skills and capacity.
            </span>
          </div>
        </div>

        {/* Job Notes */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B]">
            JOB NOTES (OPTIONAL)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any special instructions or access requirements..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>
      </div>
    </AppModal>
  );
}
