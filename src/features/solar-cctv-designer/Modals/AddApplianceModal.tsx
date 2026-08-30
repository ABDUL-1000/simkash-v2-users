"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type AddApplianceModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSuccess?: () => void;
};

export function AddApplianceModal({
  open,
  onOpenChange,
  onAddSuccess,
}: AddApplianceModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [wattage, setWattage] = useState("");
  const [isCctvRelated, setIsCctvRelated] = useState(false);
  const [hours, setHours] = useState("8");
  const [status, setStatus] = useState<"active" | "hidden">("active");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add Appliance"
      description="Add to the quick-select library"
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "add_appliance",
          label: "Add Appliance",
          variant: "primary",
          onClick: () => {
            onAddSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* APPLIANCE NAME * */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            APPLIANCE NAME *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Standing AC (2HP)"
            className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* CATEGORY * */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            CATEGORY *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          >
            <option value="">Select category...</option>
            <option value="Lighting">Lighting</option>
            <option value="Cooling">Cooling</option>
            <option value="Security">Security</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Office">Office</option>
          </select>
        </div>

        {/* DEFAULT WATTAGE * */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            DEFAULT WATTAGE *
          </label>
          <div className="relative">
            <input
              type="text"
              value={wattage}
              onChange={(e) => setWattage(e.target.value)}
              placeholder="e.g. 1500"
              className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 pr-10 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
            <span className="absolute right-3.5 top-3 font-bold text-[#64748B] text-xs">W</span>
          </div>
          <span className="text-[10px] text-[#94A3B8] block mt-1">
            This is the pre-filled value. Users can edit per appliance.
          </span>
        </div>

        {/* Mark as CCTV-related Toggle */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <strong className="font-bold text-[#0F172A] block text-xs">Mark as CCTV-related</strong>
            <span className="text-[10px] text-[#94A3B8] block max-w-xs">
              When ON, this appliance triggers the SIM connectivity add-on offer at the end of the design tool.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCctvRelated(!isCctvRelated)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isCctvRelated ? "bg-[#059669]" : "bg-[#E2E8F0]"
            }`}
          >
            <span
              className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                isCctvRelated ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* TYPICAL HOURS/DAY */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            TYPICAL HOURS/DAY
          </label>
          <div className="relative">
            <input
              type="text"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 pr-16 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
            <span className="absolute right-3.5 top-3 font-bold text-[#64748B] text-xs">hrs/day</span>
          </div>
          <span className="text-[10px] text-[#94A3B8] block mt-1">Default hours pre-filled for user</span>
        </div>

        {/* STATUS */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            STATUS
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStatus("active")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                status === "active"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#CBD5E1]"
              }`}
            >
              • Active
            </button>
            <button
              type="button"
              onClick={() => setStatus("hidden")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                status === "hidden"
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-white text-[#64748B] border border-[#CBD5E1]"
              }`}
            >
              ○ Hidden
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
