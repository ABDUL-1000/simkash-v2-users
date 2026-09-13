import { useState } from "react";
import { ArrowRight, AlertTriangle } from "lucide-react";
import type { RmScDistributionRow } from "../../types/rm-inventory.types";

interface RmStockDistributionTableProps {
  scs: RmScDistributionRow[];
  onDistributeClick: () => void;
  onSelectSc?: (sc: RmScDistributionRow) => void;
}

export function RmStockDistributionTable({
  scs,
  onDistributeClick,
  onSelectSc,
}: RmStockDistributionTableProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedScs = showAll ? scs : scs.slice(0, 8);

  const getStatusBadge = (status: RmScDistributionRow["status"]) => {
    switch (status) {
      case "Good":
        return (
          <span className="rounded-md bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">
            Good
          </span>
        );
      case "Low":
        return (
          <span className="rounded-md bg-[#FEFCE8] px-2.5 py-0.5 text-[10px] font-bold text-[#CA8A04]">
            Low
          </span>
        );
      case "Critical":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-[#FFF7F8] px-2 py-0.5 text-[10px] font-bold text-[#EF4444]">
            <AlertTriangle className="size-3" />
            Critical
          </span>
        );
      case "Out of Stock":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-[#FFF7F8] px-2 py-0.5 text-[10px] font-bold text-[#EF4444]">
            <AlertTriangle className="size-3" />
            Out of Stock
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
        <div>
          <h3 className="text-sm font-black text-[#0F152A]">
            How Stock is Distributed
          </h3>
          <p className="text-[11px] font-medium text-[#8C909B]">
            {scs.length} State Coordinators
          </p>
        </div>
        <button
          type="button"
          onClick={onDistributeClick}
          className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:text-blue-700 transition"
        >
          <span>Distribute</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#F1F5F9] text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              <th className="pb-3 pr-4">SC / State</th>
              <th className="pb-3 px-3 text-center">POS</th>
              <th className="pb-3 px-3 text-center">CCTV</th>
              <th className="pb-3 px-3 text-center">GPS</th>
              <th className="pb-3 px-3 text-center">Router</th>
              <th className="pb-3 px-3 text-center font-extrabold text-[#0F152A]">
                Total
              </th>
              <th className="pb-3 pl-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {displayedScs.map((sc) => (
              <tr
                key={sc.scId}
                onClick={() => onSelectSc?.(sc)}
                className="group cursor-pointer transition hover:bg-[#F8FAFC]"
              >
                <td className="py-3 pr-4">
                  <span className="font-bold text-[#0F152A] group-hover:text-blue-600 block">
                    {sc.name}
                  </span>
                  <span className="text-[11px] text-[#8C909B] font-medium">
                    {sc.state}
                  </span>
                </td>
                <td className="py-3 px-3 text-center font-bold text-[#0F152A]">
                  {sc.pos ?? "—"}
                </td>
                <td className="py-3 px-3 text-center font-bold text-[#0F152A]">
                  {sc.cctv ?? "—"}
                </td>
                <td className="py-3 px-3 text-center font-bold text-[#0F152A]">
                  {sc.gps ?? "—"}
                </td>
                <td className="py-3 px-3 text-center font-bold text-[#0F152A]">
                  {sc.router ?? "—"}
                </td>
                <td className="py-3 px-3 text-center font-black text-sm text-[#0F152A]">
                  {sc.total ?? "—"}
                </td>
                <td className="py-3 pl-3 text-right">
                  {getStatusBadge(sc.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer view all button */}
      <div className="border-t border-[#F1F5F9] pt-3">
        <button
          type="button"
          onClick={() => setShowAll((prev) => !prev)}
          className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:text-blue-700 transition"
        >
          <span>{showAll ? "Show less" : `View all ${scs.length} SCs`}</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
