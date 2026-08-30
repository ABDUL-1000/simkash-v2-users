"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type EditSolarDataModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stateName?: string;
  zone?: string;
  initialSunHours?: string;
  initialIrradiance?: string;
  onSaveSuccess?: () => void;
};

export function EditSolarDataModal({
  open,
  onOpenChange,
  stateName = "Lagos",
  zone = "South",
  initialSunHours = "4.5",
  initialIrradiance = "5.2",
  onSaveSuccess,
}: EditSolarDataModalProps) {
  const [sunHours, setSunHours] = useState(initialSunHours);
  const [irradiance, setIrradiance] = useState(initialIrradiance);
  const [source, setSource] = useState("");

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Solar Data"
      description={`${stateName} State`}
      size="md"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        {
          key: "save",
          label: "Save",
          variant: "primary",
          onClick: () => {
            onSaveSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* STATE */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            STATE
          </label>
          <input
            type="text"
            disabled
            value={stateName}
            className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 font-bold text-[#0F172A] focus:outline-none text-xs cursor-not-allowed"
          />
        </div>

        {/* ZONE */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            ZONE
          </label>
          <span className="rounded-xl bg-[#ECFDF5] px-3.5 py-1.5 font-bold text-[#059669] text-xs inline-block">
            {zone}
          </span>
        </div>

        {/* PEAK SUN HOURS * */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            PEAK SUN HOURS *
          </label>
          <div className="relative">
            <input
              type="text"
              value={sunHours}
              onChange={(e) => setSunHours(e.target.value)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 pr-16 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
            <span className="absolute right-3 top-3 text-xs font-bold text-[#64748B]">hours</span>
          </div>
          <span className="text-[10px] text-[#94A3B8] block mt-1">
            Average daily peak sun hours for this state. Typical range: 4–7.5
          </span>
        </div>

        {/* DAILY IRRADIANCE * */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            DAILY IRRADIANCE *
          </label>
          <div className="relative">
            <input
              type="text"
              value={irradiance}
              onChange={(e) => setIrradiance(e.target.value)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 pr-20 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
            />
            <span className="absolute right-3 top-3 text-xs font-bold text-[#64748B]">kWh/m²</span>
          </div>
        </div>

        {/* SOURCE (OPTIONAL) */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            SOURCE (OPTIONAL)
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g. NASA POWER data 2024"
            className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-xs"
          />
        </div>

        {/* Amber Notice Box */}
        <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB] p-3.5 text-xs text-[#D97706] font-medium leading-relaxed border-l-4 border-l-[#D97706]">
          Changing this value affects all new designs created by users in this state. Existing saved designs are unaffected.
        </div>
      </div>
    </AppModal>
  );
}
