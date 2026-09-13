import { Trophy, Calendar } from "lucide-react";

export interface BonusApItem {
  name: string;
  acts: string;
  pct: number;
  status: string;
  badgeStyle: string;
  barStyle: string;
}

export interface ReusableBonusTrackerProps {
  period?: string;
  status?: "Achieved" | "In Progress" | "Missed" | "At Risk";
  currentActivations?: number;
  targetActivations?: number;
  bonusAmountText?: string;
  creditedNote?: string;
  nextPeriodInfo?: string;
  onViewHistory?: () => void;
  apNetworkList?: BonusApItem[];
  onViewAllAps?: () => void;
  className?: string;
}

export function ReusableBonusTracker({
  period = "Jun 2026 · 15 days left",
  status = "Achieved",
  currentActivations = 247,
  targetActivations = 200,
  bonusAmountText = "₦5,000 BONUS PAID",
  creditedNote = "Credited to wallet on 15 Jun",
  nextPeriodInfo = "Next period starts 1 Jul 2026 · New target: 200 activations · ₦5,000 bonus",
  onViewHistory,
  apNetworkList,
  onViewAllAps,
  className = "",
}: ReusableBonusTrackerProps) {
  const isAchieved = status === "Achieved";
  const isMissed = status === "Missed";

  return (
    <div
      className={`rounded-3xl border border-[#E2ECF6] bg-white p-4 sm:p-6 shadow-xs space-y-4 sm:space-y-5 ${className}`}
    >
      {/* Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Trophy className="size-5 text-[#F59E0B] shrink-0" />
          <h2 className="text-base sm:text-lg font-black text-[#0F152A]">Bonus Tracker</h2>
        </div>

        <button
          type="button"
          onClick={onViewHistory}
          className="text-xs font-semibold text-[#8C909B] hover:text-[#2563EB] flex items-center gap-1 transition self-start sm:self-auto"
        >
          <span>{period}</span>
          {onViewHistory && <span>· View History →</span>}
        </button>
      </div>

      {/* Main Target Banner */}
      <div
        className={`rounded-2xl border p-4 sm:p-6 text-center space-y-3 ${
          isAchieved
            ? "border-[#9DF8DA] bg-[#EBFFF8]"
            : isMissed
            ? "border-[#F7D2D7] bg-[#FFF7F8]"
            : "border-[#E2ECF6] bg-[#F8FAFC]"
        }`}
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#10B981]/10 text-[#F59E0B]">
          <Trophy className="size-6" />
        </div>

        <div className="space-y-0.5">
          <h3
            className={`text-lg sm:text-xl font-black flex items-center justify-center gap-1.5 ${
              isAchieved ? "text-[#10B981]" : isMissed ? "text-[#EF4444]" : "text-[#0F152A]"
            }`}
          >
            <span>{isAchieved ? "🎉" : "🎯"}</span>
            <span>{isAchieved ? "Target Achieved!" : "Bonus Target"}</span>
          </h3>
          <p className="text-xs font-medium text-[#66738C]">
            You hit {currentActivations} of {targetActivations} activations
          </p>
        </div>

        {/* Bonus Paid Highlight Box */}
        {bonusAmountText && (
          <div className="rounded-2xl bg-[#0D1B2E] p-3.5 sm:p-4 text-center text-white space-y-0.5 shadow-md">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide text-[#10B981] break-words">
              {bonusAmountText}
            </h2>
            {creditedNote && (
              <p className="text-xs text-[#8C909B] font-medium">{creditedNote}</p>
            )}
          </div>
        )}
      </div>

      {/* Next Period Info Footer Strip */}
      {nextPeriodInfo && (
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs">
          <div className="flex items-start sm:items-center gap-2 text-[#8C909B]">
            <Calendar className="size-4 shrink-0 text-[#8C909B] mt-0.5 sm:mt-0" />
            <span className="text-xs font-semibold text-[#66738C] leading-snug">
              → {nextPeriodInfo}
            </span>
          </div>
        </div>
      )}

      {/* Optional AP Network Progress Section (For SC Dashboard mode) */}
      {apNetworkList && apNetworkList.length > 0 && (
        <div className="border-t border-[#E2ECF6] pt-4 space-y-3">
          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            YOUR AP NETWORK BONUS STATUS
          </h4>

          <div className="space-y-3">
            {apNetworkList.map((ap, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs gap-4">
                <span className="font-bold text-[#0F152A] w-32 truncate">{ap.name}</span>
                <div className="flex-1 max-w-xs flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-[#EFF4F8] overflow-hidden">
                    <div
                      className={`h-full rounded-full ${ap.barStyle}`}
                      style={{ width: `${ap.pct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-[#8C909B] font-mono">
                    {ap.acts}
                  </span>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${ap.badgeStyle}`}>
                  {ap.status}
                </span>
              </div>
            ))}
          </div>

          {onViewAllAps && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onViewAllAps}
                className="text-xs font-black text-[#2563EB] hover:underline"
              >
                View all APs →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
