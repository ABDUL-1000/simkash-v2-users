import { useState, useMemo } from "react";
import { Search, MessageSquare, ExternalLink, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { ScPerformanceRowItem } from "../../../types/regional-manager-performance.types";
import { RM_SC_PERFORMANCE_DATA } from "../../../data/regional-manager-performance.data";


interface RmOverviewScTableProps {
  onContactSc: (sc: ScPerformanceRowItem) => void;
  onViewScDetails?: (sc: ScPerformanceRowItem) => void;
}

export function RmOverviewScTable({
  onContactSc,
  onViewScDetails,
}: RmOverviewScTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredData = useMemo(() => {
    return RM_SC_PERFORMANCE_DATA.filter((sc) => {
      const matchesSearch =
        sc.scName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sc.state.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || sc.status.toLowerCase().replace(" ", "_") === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const getStatusBadge = (status: ScPerformanceRowItem["status"]) => {
    switch (status) {
      case "Exceeded":
        return {
          bg: APP_COLORS.greens.light,
          text: APP_COLORS.greens.secondary,
          border: APP_COLORS.greens.primary,
        };
      case "On Track":
        return {
          bg: APP_COLORS.blues.surfaceLight,
          text: APP_COLORS.blues.interactiveCta,
          border: APP_COLORS.blues.surfaceMid,
        };
      case "At Risk":
        return {
          bg: "#FEF3C7",
          text: "#D97706",
          border: "#FDE68A",
        };
      case "Behind":
        return {
          bg: APP_COLORS.reds.light,
          text: APP_COLORS.reds.secondary,
          border: APP_COLORS.reds.primary,
        };
      default:
        return {
          bg: APP_COLORS.backgrounds.surface,
          text: APP_COLORS.texts.slate,
          border: APP_COLORS.greys.stroke,
        };
    }
  };

  return (
    <div
      className="rounded-2xl border shadow-xs overflow-hidden"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      {/* Header with Search & Filter */}
      <div className="p-4 border-b space-y-3" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold" style={{ color: APP_COLORS.texts.primary }}>
              State Coordinator Performance
            </h3>
            <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
              Ranked by activations achieved toward monthly regional goals
            </p>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-xl self-start sm:self-auto"
            style={{
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.slate,
            }}
          >
            {filteredData.length} of {RM_SC_PERFORMANCE_DATA.length} Coordinators
          </span>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          {/* Search Box */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: APP_COLORS.texts.slate }} />
            <input
              type="text"
              placeholder="Search by coordinator name or state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border text-xs outline-none transition-all focus:border-blue-500"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.surface,
                color: APP_COLORS.texts.primary,
              }}
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            {["all", "exceeded", "on_track", "at_risk", "behind"].map((st) => {
              const label =
                st === "all"
                  ? "All Statuses"
                  : st === "on_track"
                  ? "On Track"
                  : st === "at_risk"
                  ? "At Risk"
                  : st.charAt(0).toUpperCase() + st.slice(1);
              const isSelected = statusFilter === st;

              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                    isSelected ? "shadow-xs" : "hover:bg-slate-100"
                  }`}
                  style={{
                    backgroundColor: isSelected ? APP_COLORS.blues.primary : APP_COLORS.backgrounds.surface,
                    color: isSelected ? "#FFFFFF" : APP_COLORS.texts.slate,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead
            style={{
              backgroundColor: APP_COLORS.backgrounds.surface,
              borderBottom: `1px solid ${APP_COLORS.greys.stroke}`,
              color: APP_COLORS.texts.slate,
            }}
          >
            <tr>
              <th className="py-3 px-3 font-bold w-12 text-center">Rank</th>
              <th className="py-3 px-3 font-bold">State Coordinator</th>
              <th className="py-3 px-3 font-bold text-right">Activations</th>
              <th className="py-3 px-3 font-bold w-40">Target & Completion</th>
              <th className="py-3 px-3 font-bold text-center">Active APs</th>
              <th className="py-3 px-3 font-bold text-right">Commission</th>
              <th className="py-3 px-3 font-bold text-center">Status</th>
              <th className="py-3 px-3 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-xs" style={{ color: APP_COLORS.texts.slate }}>
                  No coordinators match your search criteria.
                </td>
              </tr>
            ) : (
              filteredData.map((sc) => {
                const badge = getStatusBadge(sc.status);
                const isPositiveGrowth = sc.growthRate >= 0;

                return (
                  <tr key={sc.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Rank */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={`w-6 h-6 rounded-full inline-flex items-center justify-center font-bold text-[11px] ${
                          sc.rank === 1
                            ? "bg-amber-100 text-amber-700 ring-1 ring-amber-400"
                            : sc.rank === 2
                            ? "bg-slate-200 text-slate-700 ring-1 ring-slate-300"
                            : sc.rank === 3
                            ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
                            : "text-slate-500 font-semibold"
                        }`}
                      >
                        {sc.rank}
                      </span>
                    </td>

                    {/* Coordinator Info */}
                    <td className="py-3 px-3">
                      <div
                        className="flex items-center gap-2.5 cursor-pointer group"
                        onClick={() => onViewScDetails?.(sc)}
                        title={`View ${sc.scName} Performance Details`}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 group-hover:ring-2 group-hover:ring-blue-500 transition-all"
                          style={{
                            backgroundColor: APP_COLORS.blues.surfaceLight,
                            color: APP_COLORS.blues.primary,
                          }}
                        >
                          {sc.scName.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold block truncate group-hover:text-blue-600 transition-colors" style={{ color: APP_COLORS.texts.primary }}>
                            {sc.scName}
                          </span>
                          <span className="text-[11px] font-medium block" style={{ color: APP_COLORS.texts.slate }}>
                            {sc.state} State
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Activations */}
                    <td className="py-3 px-3 text-right">
                      <div className="font-black text-sm" style={{ color: APP_COLORS.texts.primary }}>
                        {sc.activations.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-end gap-0.5 text-[10px] font-bold">
                        {isPositiveGrowth ? (
                          <span className="text-emerald-600 flex items-center">
                            <ArrowUpRight className="w-2.5 h-2.5" /> +{sc.growthRate}%
                          </span>
                        ) : (
                          <span className="text-red-500 flex items-center">
                            <ArrowDownRight className="w-2.5 h-2.5" /> {sc.growthRate}%
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Target & Progress */}
                    <td className="py-3 px-3">
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span style={{ color: APP_COLORS.texts.slate }}>
                          Target: {sc.target.toLocaleString()}
                        </span>
                        <span className="font-bold" style={{ color: APP_COLORS.texts.primary }}>
                          {sc.targetAchieved}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(sc.targetAchieved, 100)}%`,
                            backgroundColor:
                              sc.targetAchieved >= 100
                                ? APP_COLORS.greens.secondary
                                : sc.targetAchieved >= 75
                                ? APP_COLORS.blues.interactiveCta
                                : sc.targetAchieved >= 55
                                ? APP_COLORS.ambers.secondary
                                : APP_COLORS.reds.secondary,
                          }}
                        />
                      </div>
                    </td>

                    {/* Active APs */}
                    <td className="py-3 px-3 text-center">
                      <span className="font-bold" style={{ color: APP_COLORS.texts.primary }}>
                        {sc.activeAps}
                      </span>
                      <span className="text-slate-400 font-medium"> / {sc.totalAps}</span>
                      <span className="block text-[10px] text-slate-400">
                        {Math.round((sc.activeAps / sc.totalAps) * 100)}% active
                      </span>
                    </td>

                    {/* Commission */}
                    <td className="py-3 px-3 text-right">
                      <div className="font-bold text-xs" style={{ color: APP_COLORS.greens.secondary }}>
                        ₦{sc.commissionEarned.toLocaleString()}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold border inline-block"
                        style={{
                          backgroundColor: badge.bg,
                          color: badge.text,
                          borderColor: badge.border,
                        }}
                      >
                        {sc.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onContactSc(sc)}
                          className="p-1.5 rounded-lg border transition-colors hover:bg-slate-100 text-slate-600"
                          style={{ borderColor: APP_COLORS.greys.stroke }}
                          title={`Contact ${sc.scName}`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        {onViewScDetails && (
                          <button
                            type="button"
                            onClick={() => onViewScDetails(sc)}
                            className="p-1.5 rounded-lg border transition-colors hover:bg-slate-100 text-blue-600"
                            style={{ borderColor: APP_COLORS.greys.stroke }}
                            title="View SC Profile"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
