import { CheckCircle2, History } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { MOCK_BONUS_PAYOUT_HISTORY } from "../../../data/regional-manager-performance.data";

export function RmBonusPayoutHistoryTable() {
  return (
    <div
      className="rounded-2xl border shadow-xs overflow-hidden"
      style={{
        backgroundColor: APP_COLORS.backgrounds.background,
        borderColor: APP_COLORS.greys.stroke,
      }}
    >
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: APP_COLORS.greys.stroke }}>
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-blue-600" />
          <div>
            <h3 className="text-sm sm:text-base font-bold" style={{ color: APP_COLORS.texts.primary }}>
              Past Bonus Payouts (H1 2026)
            </h3>
            <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
              Remitted regional performance incentive settlements
            </p>
          </div>
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
              <th className="py-2.5 px-3 font-bold">Period</th>
              <th className="py-2.5 px-3 font-bold text-center">SCs Hit</th>
              <th className="py-2.5 px-3 font-bold text-right">Bonuses Paid</th>
              <th className="py-2.5 px-3 font-bold text-right">Hit Rate</th>
              <th className="py-2.5 px-3 font-bold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: APP_COLORS.greys.stroke }}>
            {MOCK_BONUS_PAYOUT_HISTORY.map((row) => (
              <tr key={row.month} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-2.5 px-3 font-bold text-slate-900">
                  {row.month}
                </td>
                <td className="py-2.5 px-3 text-center font-medium text-slate-700">
                  {row.scsHit}
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                  {row.bonusesPaidOut}
                </td>
                <td className="py-2.5 px-3 text-right font-bold text-emerald-600">
                  {row.hitRate}
                </td>
                <td className="py-2.5 px-3 text-center">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1"
                    style={{
                      backgroundColor: APP_COLORS.greens.light,
                      color: APP_COLORS.greens.secondary,
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Paid
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
