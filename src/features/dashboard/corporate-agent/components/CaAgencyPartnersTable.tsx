import { Plus, ChevronRight, AlertTriangle, Package } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { CA_AGENCY_PARTNERS_DATA } from "../data/corporate-agent.data";
import type { CaAgencyPartnerItem } from "../types/corporate-agent.types";

interface CaAgencyPartnersTableProps {
  onOnboardNewAp: () => void;
  onDistributeToAp: (ap: CaAgencyPartnerItem) => void;
  onViewAllAps?: () => void;
}

export function CaAgencyPartnersTable({
  onOnboardNewAp,
  onDistributeToAp,
  onViewAllAps,
}: CaAgencyPartnersTableProps) {
  const displayedAps = CA_AGENCY_PARTNERS_DATA.slice(0, 8);

  const getStockBadge = (stock: number, status: string) => {
    if (status === "Out") {
      return (
        <span className="inline-flex items-center gap-1 font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
          {stock} Out <AlertTriangle className="w-2.5 h-2.5" />
        </span>
      );
    }
    if (status === "Low") {
      return (
        <span className="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
          {stock} Low <AlertTriangle className="w-2.5 h-2.5" />
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
        {stock} Good
      </span>
    );
  };

  const getBonusBadge = (status: CaAgencyPartnerItem["bonusStatus"]) => {
    switch (status) {
      case "Achieved":
        return { bg: "#F3E8FF", color: "#7E22CE" };
      case "On Track":
        return { bg: "#EFF6FF", color: "#2563EB" };
      case "At Risk":
        return { bg: "#FEF3C7", color: "#D97706" };
      case "Not Started":
      default:
        return { bg: "#FEE2E2", color: "#DC2626" };
    }
  };

  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3 bg-white"
      style={{ borderColor: APP_COLORS.greys.stroke }}
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            My Agency Partners ({CA_AGENCY_PARTNERS_DATA.length})
          </h3>
          <p className="text-[11px] text-slate-400 font-medium">
            10 active partners • 2 needing stock replenishment
          </p>
        </div>

        <button
          type="button"
          onClick={onOnboardNewAp}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 self-start sm:self-auto"
          style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Onboard New AP</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead
            style={{
              borderBottom: `1px solid ${APP_COLORS.greys.stroke}`,
              color: APP_COLORS.texts.slate,
            }}
          >
            <tr>
              <th className="py-2 px-2 font-bold text-[11px]">Agency Partner</th>
              <th className="py-2 px-2 font-bold text-[11px] text-center">Stock</th>
              <th className="py-2 px-2 font-bold text-[11px] text-right">Acts/mo</th>
              <th className="py-2 px-2 font-bold text-[11px] text-center">Bonus</th>
              <th className="py-2 px-2 font-bold text-[11px] text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
            {displayedAps.map((ap) => {
              const bonusBadge = getBonusBadge(ap.bonusStatus);
              return (
                <tr key={ap.id} className="hover:bg-slate-50/70 transition-colors">
                  {/* Name */}
                  <td className="py-2.5 px-2">
                    <span className="font-bold text-slate-900 block">{ap.name}</span>
                    <span className="text-[10px] text-slate-400 block">{ap.state} State</span>
                  </td>

                  {/* Stock */}
                  <td className="py-2.5 px-2 text-center">
                    {getStockBadge(ap.stock, ap.stockStatus)}
                  </td>

                  {/* Acts/mo */}
                  <td className="py-2.5 px-2 text-right font-black text-slate-900">
                    {ap.actsThisMonth}/mo
                  </td>

                  {/* Bonus Tag */}
                  <td className="py-2.5 px-2 text-center">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold inline-block"
                      style={{
                        backgroundColor: bonusBadge.bg,
                        color: bonusBadge.color,
                      }}
                    >
                      {ap.bonusStatus}
                    </span>
                  </td>

                  {/* Action: Distribute */}
                  <td className="py-2.5 px-2 text-right">
                    <button
                      type="button"
                      onClick={() => onDistributeToAp(ap)}
                      className="p-1 rounded-lg border hover:bg-slate-100 text-slate-600 transition-colors"
                      title={`Send stock to ${ap.name}`}
                      style={{ borderColor: APP_COLORS.greys.stroke }}
                    >
                      <Package className="w-3 h-3 text-slate-700" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="pt-2 border-t text-left" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <button
          type="button"
          onClick={onViewAllAps}
          className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
        >
          <span>View all 12 APs</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
