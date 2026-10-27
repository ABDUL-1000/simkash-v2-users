import { History } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import { BonusHistoryTable } from "@/features/bonus-tracker";

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
              Past Bonus Payouts
            </h3>
            <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
              Weekly performance bonuses credited to your wallet
            </p>
          </div>
        </div>
      </div>

      {/* GET /regional-manager/bonus/history */}
      <div className="pt-2">
        <BonusHistoryTable role="regional-manager" />
      </div>
    </div>
  );
}
