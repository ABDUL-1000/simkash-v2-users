import { Plus, LayoutGrid, BarChart2 } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface RmCustomersHeaderProps {
  activeTab: "directory" | "performance";
  onTabChange: (tab: "directory" | "performance") => void;
  onOnboardSc: () => void;
}

export function RmCustomersHeader({
  activeTab,
  onTabChange,
  onOnboardSc,
}: RmCustomersHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Title & Subtitle */}
      <div>
        <h1
          className="text-xl font-bold tracking-tight sm:text-2xl"
          style={{ color: APP_COLORS.texts.primary }}
        >
          My State Coordinators
        </h1>
        <p
          className="mt-0.5 text-xs sm:text-sm"
          style={{ color: APP_COLORS.texts.slate }}
        >
          All State Coordinators representing your brand in your region
        </p>
      </div>

      {/* Right Controls: View Switcher & Onboard Button */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* View Switcher Tabs */}
        <div
          className="inline-flex rounded-xl p-1 border"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <button
            type="button"
            onClick={() => onTabChange("directory")}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer"
            style={{
              backgroundColor:
                activeTab === "directory"
                  ? APP_COLORS.backgrounds.background
                  : "transparent",
              color:
                activeTab === "directory"
                  ? APP_COLORS.blues.interactiveCta
                  : APP_COLORS.texts.slate,
              boxShadow:
                activeTab === "directory"
                  ? "0 1px 3px rgba(0,0,0,0.08)"
                  : "none",
            }}
          >
            <LayoutGrid className="size-3.5" />
            <span>Directory</span>
          </button>
          <button
            type="button"
            onClick={() => onTabChange("performance")}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer"
            style={{
              backgroundColor:
                activeTab === "performance"
                  ? APP_COLORS.backgrounds.background
                  : "transparent",
              color:
                activeTab === "performance"
                  ? APP_COLORS.blues.interactiveCta
                  : APP_COLORS.texts.slate,
              boxShadow:
                activeTab === "performance"
                  ? "0 1px 3px rgba(0,0,0,0.08)"
                  : "none",
            }}
          >
            <BarChart2 className="size-3.5" />
            <span>Comparison</span>
          </button>
        </div>

        {/* Onboard Button */}
        <button
          type="button"
          onClick={onOnboardSc}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:opacity-90 active:scale-[0.99] cursor-pointer"
          style={{ backgroundColor: APP_COLORS.blues.primary }}
        >
          <Plus className="size-4 stroke-[2.5]" />
          <span>Onboard New SC</span>
        </button>
      </div>
    </div>
  );
}

export default RmCustomersHeader;
