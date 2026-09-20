import { APP_COLORS } from "@/constants/colors";
import { RM_SC_PERFORMANCE_DATA } from "../../../data/regional-manager-performance.data";

interface RmComparisonMatrixTableProps {
  selectedScIds: string[];
}

export function RmComparisonMatrixTable({ selectedScIds }: RmComparisonMatrixTableProps) {
  const selectedScs = RM_SC_PERFORMANCE_DATA.filter((sc) => selectedScIds.includes(sc.id));

  // Helper to determine winner index for a numeric extractor
  const getWinnerIndex = (extractor: (sc: typeof selectedScs[0]) => number) => {
    let max = -Infinity;
    let winner = -1;
    selectedScs.forEach((sc, i) => {
      const val = extractor(sc);
      if (val > max) {
        max = val;
        winner = i;
      }
    });
    return winner;
  };

  const rows = [
    {
      metric: "Total Activations",
      extractor: (sc: typeof selectedScs[0]) => sc.activations,
      format: (val: number) => val.toLocaleString() + " sims",
      winnerIndex: getWinnerIndex((sc) => sc.activations),
    },
    {
      metric: "Target Achieved %",
      extractor: (sc: typeof selectedScs[0]) => sc.targetAchieved,
      format: (val: number) => val + "%",
      winnerIndex: getWinnerIndex((sc) => sc.targetAchieved),
    },
    {
      metric: "Active AP Network",
      extractor: (sc: typeof selectedScs[0]) => sc.activeAps,
      format: (val: number) => `${val} of ${selectedScs.find((s) => s.activeAps === val)?.totalAps || val} APs`,
      winnerIndex: getWinnerIndex((sc) => sc.activeAps),
    },
    {
      metric: "AP Productivity (Avg/AP)",
      extractor: (sc: typeof selectedScs[0]) => Number((sc.activations / sc.activeAps).toFixed(1)),
      format: (val: number) => `${val} sims/AP`,
      winnerIndex: getWinnerIndex((sc) => Number((sc.activations / sc.activeAps).toFixed(1))),
    },
    {
      metric: "Commission Override",
      extractor: (sc: typeof selectedScs[0]) => sc.commissionEarned,
      format: (val: number) => "₦" + val.toLocaleString(),
      winnerIndex: getWinnerIndex((sc) => sc.commissionEarned),
    },
    {
      metric: "MoM Growth vs May",
      extractor: (sc: typeof selectedScs[0]) => sc.growthRate,
      format: (val: number) => `${val >= 0 ? "+" : ""}${val}%`,
      winnerIndex: getWinnerIndex((sc) => sc.growthRate),
    },
  ];

  return (
    <div
      className="rounded-2xl border shadow-xs overflow-hidden"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <div>
          <h4 className="text-sm sm:text-base font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Overall Performance Score Matrix
          </h4>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Side-by-side benchmark with leading category indicators
          </p>
        </div>
      </div>

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
              <th className="py-3 px-3.5 font-bold w-48">Evaluation Metric</th>
              {selectedScs.map((sc) => (
                <th key={sc.id} className="py-3 px-3.5 font-bold text-center">
                  <span className="block text-slate-900">{sc.scName}</span>
                  <span className="text-[10px] font-normal text-slate-400">{sc.state} State</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
            {rows.map((r, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-3.5 font-bold text-slate-700">
                  {r.metric}
                </td>
                {selectedScs.map((sc, scIdx) => {
                  const rawVal = r.extractor(sc);
                  const isWinner = scIdx === r.winnerIndex;

                  return (
                    <td key={sc.id} className="py-3 px-3.5 text-center">
                      <div className="inline-flex items-center justify-center gap-1.5">
                        <span className={`font-bold ${isWinner ? "text-emerald-700 font-black" : "text-slate-700"}`}>
                          {r.format(rawVal)}
                        </span>
                        {isWinner && (
                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300">
                            ★ Leader
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
