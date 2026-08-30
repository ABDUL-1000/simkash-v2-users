import { CheckCircle2, Clock } from "lucide-react";

type TimelineStep = {
  stepNum: number;
  label: string;
  date: string;
  subtext?: string;
  description: string;
  isComplete: boolean;
  isCurrent?: boolean;
};

const STEPS: TimelineStep[] = [
  { stepNum: 1, label: "REFERRED", date: "20 Jun 2026", description: "Referred by Bukhari Mohammed via unique referral link", isComplete: true },
  { stepNum: 2, label: "REGISTERED", date: "20 Jun 2026", subtext: "4 hours after referral", description: "Lagos Estate Ltd completed registration using referral code BM-2026-0124", isComplete: true },
  { stepNum: 3, label: "IN REVIEW", date: "21 Jun 2026", description: "Account under admin verification. CAC submitted. KYC in progress.", isComplete: true },
  { stepNum: 4, label: "DEAL CLOSED", date: "24 Jun 2026", description: "Qualifying purchase: ₦450,000. Marked closed by Yusuf Adam Baba", isComplete: true },
  { stepNum: 5, label: "COMMISSION QUEUED", date: "24 Jun 2026", description: "₦50,000 queued for Bukhari Mohammed. Status: Pending Admin Approval", isComplete: false, isCurrent: true },
];

export function ReferralTimelineCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Referral Timeline</h3>

      <div className="relative pl-5 space-y-5 border-l-2 border-[#E2E8F0]">
        {STEPS.map((s) => (
          <div key={s.stepNum} className="relative">
            <span className="absolute -left-[27px] top-0.5 flex size-5 items-center justify-center rounded-full bg-white">
              {s.isComplete ? (
                <CheckCircle2 className="size-4 text-[#10B981] fill-[#ECFDF5]" />
              ) : (
                <Clock className="size-4 text-[#F59E0B]" />
              )}
            </span>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[10px] uppercase tracking-wide text-[#64748B]">
                  STEP {s.stepNum} — {s.label}
                </span>
              </div>
              <p className="font-bold text-[#0F172A]">
                {s.date} {s.subtext && <span className="text-xs font-normal text-[#64748B]">- {s.subtext}</span>}
              </p>
              <p className="text-[#64748B] leading-relaxed">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
