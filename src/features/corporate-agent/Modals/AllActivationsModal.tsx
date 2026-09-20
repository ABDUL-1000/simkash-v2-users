import { useState, useMemo } from "react";
import { Search, Download, } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { CA_ACTIVATION_HISTORY_DATA } from "../data/corporate-agent.data";
import type { SimType } from "../types/corporate-agent.types";

interface AllActivationsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExportHistory?: () => void;
}

export function AllActivationsModal({
  open,
  onOpenChange,
  onExportHistory,
}: AllActivationsModalProps) {
  const [activeTab, setActiveTab] = useState<"all" | "mine">("all");
  const [selectedSimType, setSelectedSimType] = useState<"All" | SimType>("All");
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>("This Month");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);

  const filteredItems = useMemo(() => {
    return CA_ACTIVATION_HISTORY_DATA.filter((item) => {
      // Tab filter
      if (activeTab === "mine" && !item.isDirect) return false;

      // Sim type filter
      if (selectedSimType !== "All" && item.simType !== selectedSimType) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesPhone = item.phone.toLowerCase().includes(query);
        const matchesCustomer = item.customerName.toLowerCase().includes(query);
        const matchesActor = item.actor.toLowerCase().includes(query);
        if (!matchesPhone && !matchesCustomer && !matchesActor) return false;
      }

      return true;
    });
  }, [activeTab, selectedSimType, searchQuery]);

  const displayedItems = filteredItems.slice(0, visibleCount);

  const getCarrierBadge = (carrier: string) => {
    switch (carrier) {
      case "MTN":
        return { bg: "#FEF08A", color: "#854D0E", label: "MTN" };
      case "Airtel":
        return { bg: "#FEE2E2", color: "#991B1B", label: "Airtel" };
      case "Glo":
        return { bg: "#DCFCE7", color: "#166534", label: "Glo" };
      case "9mobile":
      default:
        return { bg: "#0F172A", color: "#FFFFFF", label: "T2" };
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="All Activations"
      description="Your combined activation history"
      descriptionColor={APP_COLORS.texts.slate}
      size="lg"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* TAB TOGGLE: ALL vs MINE ONLY */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              activeTab === "all"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("mine")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
              activeTab === "mine"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Mine Only
          </button>
        </div>

        {/* 4 SUMMARY METRIC CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div
            className="p-3 rounded-2xl border"
            style={{
              backgroundColor: APP_COLORS.backgrounds.surface,
              borderColor: APP_COLORS.greys.stroke,
            }}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Today (All)
            </span>
            <span className="text-xl font-black mt-1 block" style={{ color: APP_COLORS.texts.primary }}>
              47
            </span>
          </div>

          <div
            className="p-3 rounded-2xl border"
            style={{
              backgroundColor: APP_COLORS.backgrounds.surface,
              borderColor: APP_COLORS.greys.stroke,
            }}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Today (Mine)
            </span>
            <span className="text-xl font-black mt-1 block" style={{ color: APP_COLORS.texts.primary }}>
              8
            </span>
          </div>

          <div
            className="p-3 rounded-2xl border"
            style={{
              backgroundColor: APP_COLORS.backgrounds.surface,
              borderColor: APP_COLORS.greys.stroke,
            }}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              This Month
            </span>
            <span className="text-xl font-black mt-1 block" style={{ color: APP_COLORS.texts.primary }}>
              2,847
            </span>
          </div>

          <div
            className="p-3 rounded-2xl border"
            style={{
              backgroundColor: APP_COLORS.backgrounds.surface,
              borderColor: APP_COLORS.greys.stroke,
            }}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Commission
            </span>
            <span className="text-xl font-black mt-1 block" style={{ color: APP_COLORS.greens.secondary }}>
              ₦284,700
            </span>
          </div>
        </div>

        {/* FILTER PILLS ROW: SIM TYPE */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
          {(["All", "POS", "CCTV", "GPS", "Router"] as const).map((type) => {
            const isSelected = selectedSimType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedSimType(type)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  isSelected
                    ? "border border-blue-600 bg-blue-50 text-blue-700 font-bold"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* FILTER PILLS ROW: TIME RANGE */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
          {["Today", "This Week", "This Month", "All Time"].map((range) => {
            const isSelected = selectedTimeRange === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => setSelectedTimeRange(range)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  isSelected
                    ? "bg-blue-600 text-white font-bold shadow-xs"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {range}
              </button>
            );
          })}
        </div>

        {/* SEARCH INPUT */}
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by SIM, customer, AP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs outline-none focus:border-blue-500 transition-colors"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
              color: APP_COLORS.texts.primary,
            }}
          />
        </div>

        {/* ACTIVATIONS LIST */}
        <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {displayedItems.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              No activations found matching your filters.
            </div>
          ) : (
            displayedItems.map((item) => {
              const carrierBadge = getCarrierBadge(item.carrier);
              const isMine = item.isDirect;

              return (
                <div
                  key={item.id}
                  className="p-2.5 rounded-2xl border flex items-center justify-between transition-colors hover:bg-slate-50/70"
                  style={{
                    borderColor: APP_COLORS.greys.stroke,
                    backgroundColor: APP_COLORS.backgrounds.background,
                  }}
                >
                  <div className="flex items-center gap-3">
                    {/* Carrier Badge Circle */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0"
                      style={{
                        backgroundColor: carrierBadge.bg,
                        color: carrierBadge.color,
                      }}
                    >
                      {carrierBadge.label}
                    </div>

                    {/* Details */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs" style={{ color: APP_COLORS.texts.primary }}>
                          {item.phone}
                        </span>
                        {isMine ? (
                          <span className="px-1.5 py-0.2 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700">
                            You
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {item.actor}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                        {item.customerName} • {item.timeLabel}
                      </span>
                    </div>
                  </div>

                  {/* Right Side: Commission & Status */}
                  <div className="text-right">
                    <span className="font-extrabold text-xs block" style={{ color: APP_COLORS.greens.secondary }}>
                      +₦{item.commission}
                    </span>
                    <span
                      className={`text-[10px] font-bold mt-0.5 inline-block ${
                        item.status === "Completed"
                          ? "text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded"
                          : "text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}

          {visibleCount < filteredItems.length && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 10)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 py-1"
              >
                Load more
              </button>
            </div>
          )}
        </div>

        {/* FOOTER ACTIONS */}
        <div
          className="flex items-center justify-between pt-3 border-t"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <button
            type="button"
            onClick={onExportHistory}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 py-2 px-3 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export History</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
