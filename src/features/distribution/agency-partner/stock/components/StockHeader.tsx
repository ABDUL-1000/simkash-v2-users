import { Plus, Eye } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

export type StockTab = "available" | "request" | "history";

interface StockHeaderProps {
  activeTab: StockTab;
  onTabChange: (tab: StockTab) => void;
}

export function StockHeader({ activeTab, onTabChange }: StockHeaderProps) {
  const isRequestTab = activeTab === "request";

  const title = isRequestTab ? "Request SIM Stock" : "My SIM Stock";
  const subtitle = isRequestTab
    ? "Submit a stock request to your State Coordinator"
    : "Manage your SIM inventory received from your State Coordinator";

  return (
    <div className="space-y-5">
      {/* Top row: Title + CTA button */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#0F152A] tracking-tight">{title}</h1>
          <p className="mt-0.5 text-xs text-[#66738C] font-medium">{subtitle}</p>
        </div>

        <div>
          {isRequestTab ? (
            <button
              type="button"
              onClick={() => onTabChange("available")}
              className="inline-flex items-center gap-2 rounded-xl bg-[#10B981] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#059669]"
              style={{ backgroundColor: APP_COLORS.greens.green }}
            >
              <Eye className="size-4" />
              <span>View Stock</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onTabChange("request")}
              className="inline-flex items-center gap-2 rounded-xl bg-[#10B981] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#059669]"
              style={{ backgroundColor: APP_COLORS.greens.green }}
            >
              <Plus className="size-4" />
              <span>Request Stock</span>
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation Pill Bar */}
      <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-1.5 w-fit">
        <button
          type="button"
          onClick={() => onTabChange("available")}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "available"
              ? "bg-white text-[#2563EB] shadow-xs"
              : "text-[#66738C] hover:text-[#0F152A]"
          }`}
        >
          Available SIMs
        </button>

        <button
          type="button"
          onClick={() => onTabChange("request")}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "request"
              ? "bg-white text-[#2563EB] shadow-xs"
              : "text-[#66738C] hover:text-[#0F152A]"
          }`}
        >
          Request Stock
        </button>

        <button
          type="button"
          onClick={() => onTabChange("history")}
          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
            activeTab === "history"
              ? "bg-white text-[#2563EB] shadow-xs"
              : "text-[#66738C] hover:text-[#0F152A]"
          }`}
        >
          Stock History
        </button>
      </div>
    </div>
  );
}
