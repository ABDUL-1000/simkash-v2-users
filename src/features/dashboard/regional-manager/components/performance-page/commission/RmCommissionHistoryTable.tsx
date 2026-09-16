import { Download, CheckCircle2, Clock } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { COMMISSION_HISTORY_DATA } from "../../../data/regional-manager-performance.data";

interface RmCommissionHistoryTableProps {
  onDownloadStatement?: (month: string) => void;
}

export function RmCommissionHistoryTable({ onDownloadStatement }: RmCommissionHistoryTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return {
          bg: APP_COLORS.greens.light,
          text: APP_COLORS.greens.secondary,
          icon: CheckCircle2,
        };
      case "Processing":
        return {
          bg: "#FEF3C7",
          text: "#D97706",
          icon: Clock,
        };
      default:
        return {
          bg: APP_COLORS.blues.surfaceLight,
          text: APP_COLORS.blues.interactiveCta,
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
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <div>
          <h3 className="text-sm sm:text-base font-bold" style={{ color: APP_COLORS.texts.primary }}>
            6-Month Historical Commission & Settlements
          </h3>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            Past remittance history and payment slips
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
              <th className="py-2.5 px-3 font-bold">Month</th>
              <th className="py-2.5 px-3 font-bold text-right">Activations</th>
              <th className="py-2.5 px-3 font-bold text-right">Direct Comm</th>
              <th className="py-2.5 px-3 font-bold text-right">Bonus</th>
              <th className="py-2.5 px-3 font-bold text-right">EasyBuy 1%</th>
              <th className="py-2.5 px-3 font-bold text-right">Total Net</th>
              <th className="py-2.5 px-3 font-bold text-center">Status</th>
              <th className="py-2.5 px-3 font-bold text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
            {COMMISSION_HISTORY_DATA.map((row) => {
              const badge = getStatusBadge(row.status);
              const Icon = badge.icon;

              return (
                <tr key={row.month} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-3 font-bold" style={{ color: APP_COLORS.texts.primary }}>
                    {row.month} 2026
                  </td>
                  <td className="py-2.5 px-3 text-right font-medium text-slate-700">
                    {row.activations.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-medium text-slate-600">
                    ₦{row.directCommission.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-medium text-slate-600">
                    ₦{row.bonusEarned.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-medium text-amber-600">
                    ₦{row.easybuyCommission.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right font-black" style={{ color: APP_COLORS.greens.secondary }}>
                    ₦{row.totalPaid.toLocaleString()}
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
                      {row.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => onDownloadStatement?.(row.month)}
                      className="p-1 rounded-lg border hover:bg-slate-100 text-slate-600 inline-flex items-center"
                      style={{ borderColor: APP_COLORS.greys.stroke }}
                      title={`Download ${row.month} Statement`}
                    >
                      <Download className="w-3.5 h-3.5" />
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
