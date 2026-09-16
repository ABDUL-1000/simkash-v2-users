import { APP_COLORS } from "@/constants/colors";
import { Clock, Hourglass, Plus, Download } from "lucide-react";

interface CaActivationHeaderProps {
  activeTab: "activate" | "pending" | "history";
  onTabChange: (tab: "activate" | "pending" | "history") => void;
  pendingCount?: number;
  onExportHistory?: () => void;
}

export function CaActivationHeader({
  activeTab,
  onTabChange,
  pendingCount = 3,
  onExportHistory,
}: CaActivationHeaderProps) {
  const getHeaderInfo = () => {
    switch (activeTab) {
      case "pending":
        return {
          title: "Pending Activations",
          subtitle: "SIM activations waiting for network confirmation",
        };
      case "history":
        return {
          title: "My Activation History",
          subtitle: "Every SIM I personally activated",
        };
      case "activate":
      default:
        return {
          title: "Activate New SIM",
          subtitle: "Activate SIMs for customers and earn ₦600 per successful activation",
        };
    }
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
      {/* Title and Subtitle */}
      <div>
        <h1
          className="text-2xl sm:text-3xl font-black tracking-tight"
          style={{ color: APP_COLORS.texts.primary }}
        >
          {title}
        </h1>
        <p
          className="text-xs sm:text-sm font-medium mt-1"
          style={{ color: APP_COLORS.texts.slate }}
        >
          {subtitle}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        {activeTab === "activate" && (
          <>
            <button
              type="button"
              onClick={() => onTabChange("history")}
              className="px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-2 hover:bg-slate-50"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.background,
                color: APP_COLORS.texts.slate,
              }}
            >
              <Clock className="size-4" />
              <span>View History</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange("pending")}
              className="px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-2 hover:opacity-95"
              style={{
                borderColor: APP_COLORS.ambers.secondary,
                backgroundColor: APP_COLORS.ambers.light,
                color: APP_COLORS.ambers.secondary,
              }}
            >
              <Hourglass className="size-4" />
              <span>Pending Activations</span>
              <span
                className="size-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                style={{ backgroundColor: APP_COLORS.ambers.secondary }}
              >
                {pendingCount}
              </span>
            </button>
          </>
        )}

        {activeTab === "pending" && (
          <button
            type="button"
            onClick={() => onTabChange("activate")}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 flex items-center gap-2"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            <Plus className="size-4" />
            <span>Activate New SIM</span>
          </button>
        )}

        {activeTab === "history" && (
          <>
            <button
              type="button"
              onClick={onExportHistory}
              className="px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-2 hover:bg-slate-50"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.background,
                color: APP_COLORS.texts.slate,
              }}
            >
              <Download className="size-4" />
              <span>Export History</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange("activate")}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 flex items-center gap-2"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              <Plus className="size-4" />
              <span>Activate New SIM</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
