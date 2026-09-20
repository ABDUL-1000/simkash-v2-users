import { useState, useMemo } from "react";
import { Send, Bell, CheckCircle2, Clock, AlertTriangle, XCircle, Search } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { MOCK_BONUS_TRACKER_SCS } from "../../../data/regional-manager-performance.data";
import type { ScBonusTrackerRowItem } from "../../../types/regional-manager-performance.types";


interface RmBonusTrackerTableProps {
  onOpenBulkReminder: () => void;
  onRemindSc: (sc: ScBonusTrackerRowItem) => void;
}

export function RmBonusTrackerTable({
  onOpenBulkReminder,
  onRemindSc,
}: RmBonusTrackerTableProps) {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return MOCK_BONUS_TRACKER_SCS.filter(
      (sc) =>
        (sc.scName ?? sc.name).toLowerCase().includes(search.toLowerCase()) ||
        sc.state.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const getStatusBadge = (status: ScBonusTrackerRowItem["status"]) => {
    switch (status) {
      case "Achieved":
        return {
          bg: APP_COLORS.greens.light,
          text: APP_COLORS.greens.secondary,
          icon: CheckCircle2,
        };
      case "On Track":
        return {
          bg: APP_COLORS.blues.surfaceLight,
          text: APP_COLORS.blues.interactiveCta,
          icon: Clock,
        };
      case "At Risk":
        return {
          bg: "#FEF3C7",
          text: "#D97706",
          icon: AlertTriangle,
        };
      case "Suspended":
        return {
          bg: APP_COLORS.reds.light,
          text: APP_COLORS.reds.secondary,
          icon: XCircle,
        };
      default:
        return {
          bg: APP_COLORS.backgrounds.surface,
          text: APP_COLORS.texts.slate,
          icon: Clock,
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
      {/* Header & Bulk Reminder Action */}
      <div className="p-4 border-b space-y-3" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-bold" style={{ color: APP_COLORS.texts.primary }}>
              State Coordinator Bonus Tracker
            </h3>
            <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
              Real-time progress toward June regional qualification bonus
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenBulkReminder}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 self-start sm:self-auto"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Bulk Reminder</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: APP_COLORS.texts.slate }} />
          <input
            type="text"
            placeholder="Search coordinator or state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border text-xs outline-none focus:border-blue-500"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.primary,
            }}
          />
        </div>
      </div>

      {/* Table */}
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
              <th className="py-2.5 px-3 font-bold">Coordinator</th>
              <th className="py-2.5 px-3 font-bold text-right">Progress</th>
              <th className="py-2.5 px-3 font-bold w-44">Completion Bar</th>
              <th className="py-2.5 px-3 font-bold text-center">Days Left</th>
              <th className="py-2.5 px-3 font-bold text-center">Status</th>
              <th className="py-2.5 px-3 font-bold text-right">Potential Bonus</th>
              <th className="py-2.5 px-3 font-bold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
            {filteredData.map((sc) => {
              const badge = getStatusBadge(sc.status);
              const Icon = badge.icon;

              return (
                <tr key={sc.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3">
                    <span className="font-bold block" style={{ color: APP_COLORS.texts.primary }}>
                      {sc.scName ?? sc.name}
                    </span>
                    <span className="text-[11px] text-slate-400 block">{sc.state} State</span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="font-bold text-slate-900">
                      {sc.achieved.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Target: {sc.target.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold" style={{ color: APP_COLORS.texts.primary }}>
                        {sc.progressPercent}%
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {sc.progressPercent >= 100 ? "Goal Met" : `${(100 - sc.progressPercent).toFixed(0)}% to go`}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(sc.progressPercent, 100)}%`,
                          backgroundColor:
                            sc.progressPercent >= 100
                              ? APP_COLORS.greens.secondary
                              : sc.progressPercent >= 75
                              ? APP_COLORS.blues.interactiveCta
                              : sc.progressPercent >= 55
                              ? APP_COLORS.ambers.secondary
                              : APP_COLORS.reds.secondary,
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center font-medium text-slate-600">
                    {sc.daysLeft} days
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1"
                      style={{
                        backgroundColor: badge.bg,
                        color: badge.text,
                      }}
                    >
                      <Icon className="w-3 h-3" />
                      {sc.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-black" style={{ color: APP_COLORS.greens.secondary }}>
                    {sc.bonusText}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => onRemindSc(sc)}
                      className="px-2 py-1 rounded-lg border text-[11px] font-bold transition-colors hover:bg-slate-100 inline-flex items-center gap-1 text-slate-700"
                      style={{ borderColor: APP_COLORS.greys.stroke }}
                    >
                      <Bell className="w-3 h-3 text-amber-500" />
                      <span>Nudge</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
