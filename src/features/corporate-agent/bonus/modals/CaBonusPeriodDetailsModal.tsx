import { AppModal } from "@/components/common/AppModal";
import { AlertCircle, Clock, Download, Trophy, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";

export interface CaBonusPeriodRecord {
  period: string;
  startDate: string;
  endDate: string;
  target: number;
  achieved: number;
  exceededBy: number;
  bonus: string;
  reference: string;
  paidOn: string;
  status: "Achieved" | "In Progress" | "Missed";
  topDays?: { date: string; count: number }[];
  topAps?: { name: string; acts: number; commission: string }[];
  dailyActivations?: number[];
  missedBy?: number;
  missedReasons?: string[];
  bounceBackNote?: string;
  daysRemaining?: number;
  stillNeeded?: number;
  currentPace?: string;
  projected?: string;
}

interface CaBonusPeriodDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  periodData?: CaBonusPeriodRecord | null;
  onDownloadReport?: () => void;
}

export function CaBonusPeriodDetailsModal({
  open,
  onOpenChange,
  periodData,
  onDownloadReport,
}: CaBonusPeriodDetailsModalProps) {
  const navigate = useNavigate();

  if (!periodData) return null;

  const isAchieved = periodData.status === "Achieved";
  const isMissed = periodData.status === "Missed";
  const isInProgress = periodData.status === "In Progress";
  const percentage = Math.round((periodData.achieved / periodData.target) * 100 * 10) / 10;

  const defaultTopAps = [
    { name: "Rabiu Sani", acts: 847, commission: "₦4,500" },
    { name: "Chioma Eze", acts: 634, commission: "₦3,200" },
    { name: "Hassan Ibrahim", acts: 421, commission: "₦2,100" },
  ];

  const dailyBars = periodData.dailyActivations || [
    20, 35, 45, 30, 60, 50, 40, 30, 25, 40, 90, 65, 45, 76, 50, 40, 60, 45, 80, 55, 40, 60, 50, 87, 60, 70, 89, 55, 65, 75, 78,
  ];

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={`${periodData.period} Bonus Period`}
      description={
        isAchieved
          ? `Target Achieved · ${periodData.bonus} Earned`
          : isMissed
            ? `Target Not Reached · No Bonus`
            : `Period In Progress · ${periodData.achieved}/${periodData.target}`
      }
      size="md"
      actions={[
        {
          key: "download-report",
          label: "Download Report",
          icon: <Download className="size-4" />,
          variant: "secondary",
          onClick: () => {
            onDownloadReport?.();
            navigate(appPaths.caBonusHistory);
          },
        },
      ]}
    >
      <div className="space-y-4 pt-1 text-xs max-h-[80vh] overflow-y-auto pr-1">
        {isAchieved && (
          <div className="rounded-2xl border border-[#9DF8DA] bg-[#EBFFF8] p-4 flex items-center justify-between text-[#10B981]">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#10B981]/10">
                <Trophy className="size-5" />
              </div>
              <div>
                <p className="font-extrabold text-sm text-[#0F152A]">
                  Target Achieved — {periodData.bonus} Paid
                </p>
                <p className="text-[11px] font-medium text-[#66738C]">
                  {periodData.achieved.toLocaleString()} of {periodData.target.toLocaleString()} · {percentage}%
                </p>
              </div>
            </div>
          </div>
        )}

        {isMissed && (
          <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 flex items-center gap-3 text-[#EF4444]">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-[#EF4444]/10 shrink-0">
              <XCircle className="size-5 text-[#EF4444]" />
            </div>
            <div>
              <p className="font-extrabold text-sm text-[#EF4444]">
                Target Not Reached — No Bonus
              </p>
              <p className="text-[11px] font-medium text-[#8C909B]">
                {periodData.achieved} of {periodData.target} · {percentage}% · Missed by {periodData.missedBy || (periodData.target - periodData.achieved)} activations
              </p>
            </div>
          </div>
        )}

        {isInProgress && (
          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 flex items-center gap-3 text-[#2563EB]">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-[#2563EB]/10 shrink-0">
              <Clock className="size-5 text-[#2563EB]" />
            </div>
            <div>
              <p className="font-extrabold text-sm text-[#2563EB]">
                Period In Progress
              </p>
              <p className="text-[11px] font-medium text-[#66738C]">
                {periodData.achieved} of {periodData.target} · {percentage}%
              </p>
            </div>
          </div>
        )}

        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC]">
          {isInProgress ? (
            <>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#8C909B] font-medium">Days Remaining</span>
                <span className="font-extrabold text-[#2563EB]">{periodData.daysRemaining || 15} days</span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#8C909B] font-medium">Achieved So Far</span>
                <span className="font-extrabold text-[#2563EB]">{periodData.achieved}</span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#8C909B] font-medium">Still Needed</span>
                <span className="font-extrabold text-[#F59E0B]">{periodData.stillNeeded || (periodData.target - periodData.achieved)}</span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#8C909B] font-medium">Current Pace</span>
                <span className="font-extrabold text-[#0F152A]">{periodData.currentPace || "20.8/day"}</span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#8C909B] font-medium">Projected</span>
                <span className="font-extrabold text-[#10B981]">{periodData.projected || "~624 acts (on track)"}</span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#8C909B] font-medium">Status</span>
                <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-[10px] font-bold text-[#2563EB]">
                  In Progress
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#8C909B] font-medium">Period</span>
                <span className="font-bold text-[#0F152A]">{periodData.period}</span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#8C909B] font-medium">Target</span>
                <span className="font-bold text-[#0F152A]">{periodData.target.toLocaleString()} activations</span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#8C909B] font-medium">Achieved</span>
                <span className={`font-extrabold ${isMissed ? "text-[#EF4444]" : "text-[#10B981]"}`}>
                  {periodData.achieved.toLocaleString()} activations
                </span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#8C909B] font-medium">Bonus</span>
                <span className={`font-extrabold ${isMissed ? "text-[#8C909B]" : "text-[#10B981]"}`}>
                  {isMissed ? "₦0" : periodData.bonus}
                </span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#8C909B] font-medium">Paid On</span>
                <span className="font-bold text-[#0F152A]">{periodData.paidOn}</span>
              </div>
              <div className="flex items-center justify-between p-3">
                <span className="text-[#8C909B] font-medium">Status</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    isMissed ? "bg-[#FFF7F8] text-[#EF4444]" : "bg-[#E0E7FF] text-[#4F46E5]"
                  }`}
                >
                  {periodData.status}
                </span>
              </div>
            </>
          )}
        </div>

        {isMissed && (
          <>
            <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-4 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-extrabold text-[#D9990D]">
                <AlertCircle className="size-4 shrink-0" />
                <span>Why you may have missed:</span>
              </div>
              <ul className="space-y-1 pl-6 text-[#66738C] font-medium list-disc">
                {(periodData.missedReasons || [
                  "Activation pace dropped week 2",
                  "3 APs had low stock that week",
                  "Month had fewer working days",
                ]).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-[#F8FAFC] p-3 text-xs text-[#0F152A] font-semibold text-center">
              {periodData.bounceBackNote || "You bounced back in the next cycle with a strong finish. Keep pushing. 💪"}
            </div>
          </>
        )}

        {isAchieved && (
          <>
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                DAILY ACTIVATIONS — {periodData.period.toUpperCase()}
              </span>
              <div className="flex h-24 items-end gap-1 rounded-2xl border border-[#E2ECF6] bg-white p-3">
                {dailyBars.map((val, idx) => {
                  const max = Math.max(...dailyBars);
                  const heightPct = Math.round((val / max) * 100);
                  return (
                    <div
                      key={idx}
                      className="flex-1 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-t-sm transition-all relative group"
                      style={{ height: `${heightPct}%` }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
                TOP APs THIS PERIOD
              </span>
              <div className="space-y-2 rounded-2xl border border-[#E2ECF6] bg-white p-3">
                {defaultTopAps.map((ap, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b last:border-b-0 border-[#F8FAFC]">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-full bg-[#EFF4F8] text-[10px] font-black text-[#1E3A5F]">
                        {ap.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <p className="font-bold text-[#0F152A]">{ap.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-[#0F152A]">{ap.acts} acts</p>
                      <p className="text-[10px] text-[#8C909B]">{ap.commission}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AppModal>
  );
}
