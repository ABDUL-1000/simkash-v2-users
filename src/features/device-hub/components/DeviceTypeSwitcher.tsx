import { Video, Navigation, Router, Sun } from "lucide-react";

export type DeviceType = "cctv" | "gps" | "router" | "solar";

type DeviceTypeOption = {
  id: DeviceType;
  label: string;
  count: number;
  icon: React.ReactNode;
};

const DEVICE_TYPES: DeviceTypeOption[] = [
  { id: "cctv", label: "CCTV", count: 5842, icon: <Video className="size-4" /> },
  { id: "gps", label: "GPS", count: 2450, icon: <Navigation className="size-4" /> },
  { id: "router", label: "Router", count: 1890, icon: <Router className="size-4" /> },
  { id: "solar", label: "Solar", count: 960, icon: <Sun className="size-4" /> },
];

type DeviceTypeSwitcherProps = {
  activeType: DeviceType;
  onTypeChange: (type: DeviceType) => void;
};

export function DeviceTypeSwitcher({ activeType, onTypeChange }: DeviceTypeSwitcherProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-[#E2ECF8] bg-white p-1.5 shadow-sm max-w-fit overflow-x-auto">
      {DEVICE_TYPES.map((type) => {
        const isActive = activeType === type.id;
        return (
          <button
            key={type.id}
            type="button"
            onClick={() => onTypeChange(type.id)}
            className={`flex items-center gap-2.5 rounded-xl px-4 py-2 text-sm font-bold transition-all whitespace-nowrap ${
              isActive
                ? "bg-[#0F1F36] text-white shadow-xs"
                : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]"
            }`}
          >
            <span>{type.icon}</span>
            <span>{type.label}</span>
            {isActive && (
              <span className="rounded-md bg-[#38BDF826] px-2 py-0.5 text-xs font-bold text-[#38BDF8]">
                {type.count.toLocaleString()}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
