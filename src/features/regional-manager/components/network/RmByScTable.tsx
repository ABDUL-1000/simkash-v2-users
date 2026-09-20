import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { ScNetworkBreakdownItem } from "../../types/regional-manager-network.types";

interface RmByScTableProps {
  scs: ScNetworkBreakdownItem[];
  onViewAps: (sc: ScNetworkBreakdownItem) => void;
  onSelectScRow?: (sc: ScNetworkBreakdownItem) => void;
}

export function RmByScTable({ scs, onViewAps, onSelectScRow }: RmByScTableProps) {
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
          {/* TABLE HEADER */}
          <thead
            className="border-b text-[11px] font-bold uppercase tracking-wider"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.slate,
            }}
          >
            <tr>
              <th className="py-3.5 pl-4 pr-3">State Coordinator</th>
              <th className="px-4 py-3.5 text-center">Activations</th>
              <th className="px-4 py-3.5 text-right">Commission</th>
              <th className="px-4 py-3.5 text-center">APs Active</th>
              <th className="px-4 py-3.5 text-center">Trend</th>
              <th className="py-3.5 pl-3 pr-4 text-right">Action</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody
            className="divide-y"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            {scs.map((sc) => (
              <tr
                key={sc.id}
                className="transition hover:bg-slate-50/75 cursor-pointer"
                onClick={() => (onSelectScRow ? onSelectScRow(sc) : onViewAps(sc))}
              >
                {/* 1. STATE COORDINATOR */}
                <td className="py-3.5 pl-4 pr-3">
                  <div className="flex items-center gap-3">
                    {/* Rank Circle */}
                    <div
                      className="flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: APP_COLORS.backgrounds.surface,
                        color: APP_COLORS.texts.slate,
                        border: `1px solid ${APP_COLORS.greys.stroke}`,
                      }}
                    >
                      {sc.rank}
                    </div>

                    <div>
                      <span
                        className="font-bold block text-xs"
                        style={{ color: APP_COLORS.texts.primary }}
                      >
                        {sc.name}
                      </span>
                      <span
                        className="text-[11px]"
                        style={{ color: APP_COLORS.texts.slate }}
                      >
                        {sc.state}
                      </span>
                    </div>
                  </div>
                </td>

                {/* 2. ACTIVATIONS */}
                <td className="px-4 py-3.5 text-center">
                  <span
                    className="font-black text-sm"
                    style={{ color: APP_COLORS.texts.primary }}
                  >
                    {sc.activationsToday}
                  </span>
                </td>

                {/* 3. COMMISSION */}
                <td className="px-4 py-3.5 text-right font-bold text-xs" style={{ color: APP_COLORS.texts.primary }}>
                  {sc.commissionToday}
                </td>

                {/* 4. APs ACTIVE */}
                <td className="px-4 py-3.5 text-center font-semibold text-xs" style={{ color: APP_COLORS.texts.slate }}>
                  <strong className="text-slate-900 font-bold">{sc.apsActiveCount}</strong> of {sc.totalApsCount}
                </td>

                {/* 5. TREND */}
                <td className="px-4 py-3.5 text-center">
                  <div className="inline-flex items-center justify-center">
                    {sc.trend === "up" && (
                      <TrendingUp className="size-4 text-emerald-500" />
                    )}
                    {sc.trend === "down" && (
                      <TrendingDown className="size-4 text-red-500" />
                    )}
                    {sc.trend === "neutral" && (
                      <Minus className="size-4 text-slate-400" />
                    )}
                  </div>
                </td>

                {/* 6. ACTION */}
                <td className="py-3.5 pl-3 pr-4 text-right">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewAps(sc);
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold transition hover:underline cursor-pointer"
                    style={{ color: APP_COLORS.blues.interactiveCta }}
                  >
                    <span>View APs</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RmByScTable;
