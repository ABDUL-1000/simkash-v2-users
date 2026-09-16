import { ArrowRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_STOCK_DISTRIBUTIONS_DATA } from "../data/ca-inventory.data";
import type { CaApStockDistributionRow } from "../types/ca-inventory.types";

interface CaStockDistributionTableProps {
  onDistributeToAp?: (ap: CaApStockDistributionRow) => void;
  onViewAllDistribute?: () => void;
}

export function CaStockDistributionTable({
  onDistributeToAp,
  onViewAllDistribute,
}: CaStockDistributionTableProps) {
  const getStatusBadge = (status: CaApStockDistributionRow["status"]) => {
    switch (status) {
      case "Good":
        return {
          bg: "#ECFDF5",
          color: "#059669",
          label: "Good",
        };
      case "Low":
        return {
          bg: "#FEF3C7",
          color: "#D97706",
          label: "Low",
        };
      case "Critical":
        return {
          bg: "#FEE2E2",
          color: "#DC2626",
          label: "Critical ⚠️",
        };
      case "Suspended":
      default:
        return {
          bg: "#F1F5F9",
          color: "#64748B",
          label: "Suspended",
        };
    }
  };

  return (
    <div
      className="rounded-2xl border bg-white shadow-xs overflow-hidden"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      {/* HEADER */}
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <div>
          <h3 className="text-sm font-bold text-slate-900">How Stock is Distributed</h3>
          <p className="text-[11px] text-slate-500">12 Agency Partners</p>
        </div>

        <button
          type="button"
          onClick={onViewAllDistribute}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
        >
          <span>Distribute</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b text-[10px] uppercase font-black tracking-wider text-slate-400" style={{ borderColor: APP_COLORS.greys.stroke }}>
              <th className="py-2.5 px-4">Agency Partner</th>
              <th className="py-2.5 px-3 text-center">POS</th>
              <th className="py-2.5 px-3 text-center">CCTV</th>
              <th className="py-2.5 px-3 text-center">GPS</th>
              <th className="py-2.5 px-3 text-center">Router</th>
              <th className="py-2.5 px-3 text-center font-black text-slate-700">Total</th>
              <th className="py-2.5 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
            {CA_STOCK_DISTRIBUTIONS_DATA.map((row) => {
              const badge = getStatusBadge(row.status);
              return (
                <tr
                  key={row.id}
                  onClick={() => onDistributeToAp?.(row)}
                  className="hover:bg-slate-50/70 cursor-pointer transition-colors"
                >
                  {/* Agency Partner */}
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span>{row.name}</span>
                    </div>
                  </td>

                  {/* POS */}
                  <td className={`py-3 px-3 text-center font-medium ${row.pos === 0 ? "text-slate-300" : row.pos <= 3 ? "text-rose-600 font-bold" : row.pos <= 8 ? "text-amber-600 font-bold" : "text-slate-700"}`}>
                    {row.pos}
                  </td>

                  {/* CCTV */}
                  <td className={`py-3 px-3 text-center font-medium ${row.cctv === 0 ? "text-slate-300" : "text-slate-700"}`}>
                    {row.cctv}
                  </td>

                  {/* GPS */}
                  <td className={`py-3 px-3 text-center font-medium ${row.gps === 0 ? "text-slate-300" : "text-slate-700"}`}>
                    {row.gps}
                  </td>

                  {/* Router */}
                  <td className={`py-3 px-3 text-center font-medium ${row.router === 0 ? "text-slate-300" : "text-slate-700"}`}>
                    {row.router}
                  </td>

                  {/* Total */}
                  <td className="py-3 px-3 text-center font-black text-slate-900">
                    {row.total}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-4 text-center">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-black inline-block"
                      style={{
                        backgroundColor: badge.bg,
                        color: badge.color,
                      }}
                    >
                      {badge.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="p-3 border-t bg-slate-50/50 text-[11px] text-slate-400 font-medium" style={{ borderColor: APP_COLORS.greys.stroke }}>
        Showing all 12 APs
      </div>
    </div>
  );
}
