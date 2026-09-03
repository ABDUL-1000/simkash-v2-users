import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

interface AddCustomApplianceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAppliance: (item: { name: string; watts: number; hours: number }) => void;
}

export function AddCustomApplianceModal({
  open,
  onOpenChange,
  onAddAppliance,
}: AddCustomApplianceModalProps) {
  const [name, setName] = useState("Water Pump");
  const [wattsStr, setWattsStr] = useState("150");
  const [hoursStr, setHoursStr] = useState("8");

  const watts = parseInt(wattsStr || "0", 10);
  const hours = parseInt(hoursStr || "0", 10);
  const dailyWh = watts * hours;

  const handleAdd = () => {
    if (name && watts > 0 && hours > 0) {
      onAddAppliance({ name, watts, hours });
      onOpenChange(false);
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add Custom Appliance"
      description="Enter your own appliance details"
      size="md"
    >
      <div className="space-y-4 pt-1">
        {/* Appliance Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F152A]">
            Appliance Name <span className="text-[#EF4444]">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Water Pump"
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Wattage */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F152A]">
            Wattage
          </label>
          <div className="relative">
            <input
              type="number"
              value={wattsStr}
              onChange={(e) => setWattsStr(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-4 pr-12 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
            <span className="absolute right-4 top-3 text-xs font-bold text-[#8C909B]">
              W
            </span>
          </div>
          <p className="text-[10px] text-[#8C909B]">Check the label on your device</p>
        </div>

        {/* Hours Per Day */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F152A]">
            Hours Per Day
          </label>
          <div className="relative">
            <input
              type="number"
              value={hoursStr}
              onChange={(e) => setHoursStr(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-4 pr-20 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
            <span className="absolute right-4 top-3 text-xs font-bold text-[#8C909B]">
              hrs/day
            </span>
          </div>
        </div>

        {/* Calculation Box */}
        <div className="flex items-center justify-between rounded-2xl bg-[#EBFFF8] p-3 px-4 text-xs">
          <span className="text-[#8C909B]">Daily load calculation:</span>
          <span className="font-extrabold text-[#10B981]">
            Daily load: {dailyWh.toLocaleString()}Wh
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleAdd}
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Add to My List
          </button>
        </div>
      </div>
    </AppModal>
  );
}
