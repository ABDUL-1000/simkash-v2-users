import { useNavigate } from "react-router-dom";
import { APP_COLORS } from "@/constants/colors";
import { appPaths } from "@/app/router/paths";
import type { StateCoordinatorItem } from "../../types/regional-manager.types";
import type { MetricKey } from "./RmPerformanceFilterBar";

interface RmPerformanceTableProps {
  scs: StateCoordinatorItem[];
  activeMetrics: Record<MetricKey, boolean>;
  onDistribute: (sc: StateCoordinatorItem) => void;
  onReactivate: (sc: StateCoordinatorItem) => void;
}

export function RmPerformanceTable({
  scs,
  activeMetrics,
  onDistribute,
  onReactivate,
}: RmPerformanceTableProps) {
  const navigate = useNavigate();

  // Summary Totals
  const totalAps = scs.reduce((acc, curr) => acc + curr.apsCount, 0);
  const totalActs = scs.reduce((acc, curr) => acc + curr.activationsCount, 0);
  const avgActsPerAp = (totalActs / (totalAps || 1)).toFixed(1);

  // Parse total commissions
  const totalCommission = scs.reduce((acc, curr) => {
    const raw = curr.commission ? Number(curr.commission.replace(/[^0-9]/g, "")) : 0;
    return acc + raw;
  }, 0);

  const getStockStatusPill = (stock: number, _stockStatus: string, isSuspended: boolean) => {
    if (isSuspended || stock === 0) {
      return (
        <span className="text-xs font-bold" style={{ color: APP_COLORS.reds.red }}>
          0 <span className="font-normal text-[11px]">Out</span>
        </span>
      );
    }
    if (stock <= 5) {
      return (
        <span className="text-xs font-bold" style={{ color: APP_COLORS.reds.red }}>
          {stock} <span className="font-normal text-[11px]">Critical</span>
        </span>
      );
    }
    if (stock <= 15) {
      return (
        <span className="text-xs font-bold" style={{ color: APP_COLORS.ambers.secondary }}>
          {stock} <span className="font-normal text-[11px]">Low</span>
        </span>
      );
    }
    return (
      <span className="text-xs font-bold" style={{ color: APP_COLORS.greens.green }}>
        {stock} <span className="font-normal text-[11px]">Good</span>
      </span>
    );
  };

  const getBonusPill = (bonusStatus: string, isSuspended: boolean) => {
    if (isSuspended) {
      return (
        <span className="text-xs font-semibold" style={{ color: APP_COLORS.texts.slate }}>
          N/A
        </span>
      );
    }
    if (bonusStatus === "Achieved") {
      return (
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold"
          style={{
            backgroundColor: APP_COLORS.blues.surfaceLight,
            color: APP_COLORS.blues.interactiveCta,
          }}
        >
          Achieved
        </span>
      );
    }
    if (bonusStatus === "On Track") {
      return (
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold"
          style={{
            backgroundColor: APP_COLORS.greens.light,
            color: APP_COLORS.greens.green,
          }}
        >
          On Track
        </span>
      );
    }
    return (
      <span
        className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold"
        style={{
          backgroundColor: APP_COLORS.ambers.light,
          color: APP_COLORS.ambers.secondary,
        }}
      >
        At Risk
      </span>
    );
  };

  const maxActs = Math.max(...scs.map((s) => s.activationsCount), 2000);

  return (
    <div
      className="overflow-hidden rounded-2xl border shadow-xs"
      style={{
        borderColor: APP_COLORS.greys.stroke,
        backgroundColor: APP_COLORS.backgrounds.background,
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          {/* Header */}
          <thead>
            <tr
              className="border-b text-[11px] font-bold uppercase tracking-wider"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.surface,
                color: APP_COLORS.texts.slate,
              }}
            >
              <th className="py-3.5 pl-4 pr-2">Rank</th>
              <th className="py-3.5 px-3">SC</th>
              <th className="py-3.5 px-3">State</th>
              {activeMetrics.aps && <th className="py-3.5 px-3">APs</th>}
              {activeMetrics.activations && <th className="py-3.5 px-3">Activations</th>}
              {activeMetrics.avgAp && <th className="py-3.5 px-3">Avg/AP</th>}
              {activeMetrics.commission && <th className="py-3.5 px-3">Commission</th>}
              {activeMetrics.stock && <th className="py-3.5 px-3">Stock</th>}
              {activeMetrics.bonus && <th className="py-3.5 px-3">Bonus</th>}
              <th className="py-3.5 pl-3 pr-4 text-right">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
            {scs.map((sc, index) => {
              const rank = sc.rank || index + 1;
              const isSuspended = sc.status === "Suspended";
              const actPercent = Math.round((sc.activationsCount / maxActs) * 100);

              const rankColor =
                rank === 1
                  ? "#D97706"
                  : rank === 2
                  ? "#0284C7"
                  : rank === 3
                  ? "#B45309"
                  : APP_COLORS.texts.slate;

              return (
                <tr
                  key={sc.id}
                  className="transition hover:bg-slate-50/70"
                  style={isSuspended ? { backgroundColor: "#FFFBFB" } : {}}
                >
                  {/* Rank */}
                  <td className="py-3.5 pl-4 pr-2 font-black text-sm">
                    <span style={{ color: rankColor }}>{rank}</span>
                  </td>

                  {/* SC Info */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{
                          backgroundColor: APP_COLORS.blues.surfaceLight,
                          color: APP_COLORS.blues.interactiveCta,
                        }}
                      >
                        {sc.initials}
                      </div>
                      <div>
                        <div
                          className="font-bold truncate max-w-[130px] cursor-pointer hover:underline"
                          style={{ color: APP_COLORS.texts.primary }}
                          onClick={() => navigate(appPaths.rmScDetails(sc.id).path)}
                        >
                          {sc.name}
                        </div>
                        {isSuspended && (
                          <span className="text-[10px] font-semibold text-red-500 block">
                            Suspended
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* State */}
                  <td className="py-3.5 px-3 font-medium" style={{ color: APP_COLORS.texts.slate }}>
                    {sc.state}
                  </td>

                  {/* APs */}
                  {activeMetrics.aps && (
                    <td className="py-3.5 px-3 font-semibold" style={{ color: APP_COLORS.texts.primary }}>
                      {sc.apsCount} <span className="text-[11px] font-normal text-slate-400">partners</span>
                    </td>
                  )}

                  {/* Activations */}
                  {activeMetrics.activations && (
                    <td className="py-3.5 px-3 min-w-[140px]">
                      <span className="font-black text-xs block" style={{ color: APP_COLORS.texts.primary }}>
                        {sc.activationsCount.toLocaleString()}
                      </span>
                      <div
                        className="h-1.5 w-24 overflow-hidden rounded-full mt-1"
                        style={{ backgroundColor: APP_COLORS.greys.stroke }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${actPercent}%`,
                            backgroundColor:
                              rank === 1
                                ? APP_COLORS.greens.green
                                : isSuspended
                                ? APP_COLORS.reds.red
                                : APP_COLORS.blues.primary,
                          }}
                        />
                      </div>
                    </td>
                  )}

                  {/* Avg/AP */}
                  {activeMetrics.avgAp && (
                    <td className="py-3.5 px-3 font-medium" style={{ color: APP_COLORS.texts.slate }}>
                      {sc.avgPerAp ? `${sc.avgPerAp}` : `${(sc.activationsCount / (sc.apsCount || 1)).toFixed(1)}`}
                      <span className="text-[10px] block text-slate-400">acts/AP/mo</span>
                    </td>
                  )}

                  {/* Commission */}
                  {activeMetrics.commission && (
                    <td className="py-3.5 px-3 font-bold" style={{ color: APP_COLORS.greens.green }}>
                      {sc.commission || "₦0"}
                    </td>
                  )}

                  {/* Stock */}
                  {activeMetrics.stock && (
                    <td className="py-3.5 px-3">
                      {getStockStatusPill(sc.stock, sc.stockStatus, isSuspended)}
                    </td>
                  )}

                  {/* Bonus */}
                  {activeMetrics.bonus && (
                    <td className="py-3.5 px-3">
                      {getBonusPill(sc.bonusStatus, isSuspended)}
                    </td>
                  )}

                  {/* Actions */}
                  <td className="py-3.5 pl-3 pr-4 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => navigate(appPaths.rmScDetails(sc.id).path)}
                        className="text-xs font-bold hover:underline cursor-pointer"
                        style={{ color: APP_COLORS.texts.slate }}
                      >
                        View
                      </button>
                      {isSuspended ? (
                        <button
                          type="button"
                          onClick={() => onReactivate(sc)}
                          className="text-xs font-bold hover:underline cursor-pointer"
                          style={{ color: APP_COLORS.reds.red }}
                        >
                          Reactivate
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onDistribute(sc)}
                          className="text-xs font-bold hover:underline cursor-pointer"
                          style={{ color: APP_COLORS.greens.green }}
                        >
                          Distribute
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {/* Bottom Summary Row matching Image 2 */}
            <tr
              className="font-bold border-t-2"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                backgroundColor: APP_COLORS.backgrounds.surface,
              }}
            >
              <td className="py-3.5 pl-4 pr-2 font-black">—</td>
              <td className="py-3.5 px-3 font-black text-xs" style={{ color: APP_COLORS.texts.primary }}>
                All SCs
              </td>
              <td className="py-3.5 px-3 text-slate-400 font-normal">—</td>
              {activeMetrics.aps && (
                <td className="py-3.5 px-3 font-black text-xs" style={{ color: APP_COLORS.texts.primary }}>
                  {totalAps}
                </td>
              )}
              {activeMetrics.activations && (
                <td className="py-3.5 px-3 font-black text-xs" style={{ color: APP_COLORS.texts.primary }}>
                  {totalActs.toLocaleString()}
                </td>
              )}
              {activeMetrics.avgAp && (
                <td className="py-3.5 px-3 font-black text-xs" style={{ color: APP_COLORS.texts.primary }}>
                  {avgActsPerAp}
                </td>
              )}
              {activeMetrics.commission && (
                <td className="py-3.5 px-3 font-black text-xs" style={{ color: APP_COLORS.greens.green }}>
                  ₦{totalCommission.toLocaleString()}
                </td>
              )}
              {activeMetrics.stock && <td className="py-3.5 px-3 text-slate-400 font-normal">—</td>}
              {activeMetrics.bonus && <td className="py-3.5 px-3 text-slate-400 font-normal">—</td>}
              <td className="py-3.5 pl-3 pr-4 text-right text-slate-400 font-normal">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RmPerformanceTable;
