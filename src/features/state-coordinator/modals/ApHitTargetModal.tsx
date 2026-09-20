import { CheckCircle2, Trophy } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ApHitTargetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  activations?: number;
  target?: number;
  bonusAmount?: string;
  networkLabel?: string;
  totalHitAps?: number;
  totalAps?: number;
  onContinue?: () => void;
}

export function ApHitTargetModal({
  open,
  onOpenChange,
  apName = "Rabiu Sani",
  activations = 847,
  target = 200,
  bonusAmount = "₦5,000",
  networkLabel = "Your SC network",
  totalHitAps = 18,
  totalAps = 23,
  onContinue,
}: ApHitTargetModalProps) {
  const isExceeded = activations > target;
  const hitRatePct = Math.round((totalHitAps / totalAps) * 100 * 10) / 10;
  const firstName = apName.split(" ")[0];

  const handleContinue = () => {
    onContinue?.();
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
    >
      <div className="space-y-5 pt-2 text-xs text-center">
        {/* Confetti Dots Header */}
        <div className="flex items-center justify-between px-6">
          <span className="size-2 rounded-full bg-purple-500" />
          <span className="size-2.5 rounded-full bg-amber-500" />
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="size-2.5 rounded-full bg-blue-500" />
          <span className="size-2 rounded-full bg-red-500" />
        </div>

        {/* Trophy Icon Circle */}
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
          <Trophy className="size-10 text-[#F59E0B]" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#0F152A] flex items-center justify-center gap-2">
            <span>🎉</span>
            <span>AP Hit Target!</span>
          </h2>
          <p className="text-xs font-medium text-[#8C909B]">
            {apName} just hit {target} activations!
          </p>
        </div>

        {/* Details Card */}
        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-1 text-left">
          <div className="flex items-center justify-between p-3">
            <span className="text-[#8C909B] font-medium">AP</span>
            <span className="font-bold text-[#0F152A]">{apName}</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-[#8C909B] font-medium">Activations</span>
            <span className="font-extrabold text-[#10B981]">
              {activations} {isExceeded ? "(exceeded)" : ""}
            </span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-[#8C909B] font-medium">Target</span>
            <span className="font-bold text-[#0F152A]">{target} activations</span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-[#8C909B] font-medium">Bonus</span>
            <span className="font-black text-[#0F152A]">
              {bonusAmount} (paid to AP)
            </span>
          </div>
          <div className="flex items-center justify-between p-3">
            <span className="text-[#8C909B] font-medium">Network</span>
            <span className="font-bold text-[#0F152A]">{networkLabel}</span>
          </div>
        </div>

        {/* Auto-Paid Alert Pill */}
        <div className="rounded-2xl border border-[#9DF8DA] bg-[#EBFFF8] p-3 text-xs font-extrabold text-[#10B981] flex items-center justify-center gap-2">
          <CheckCircle2 className="size-4 shrink-0 text-[#10B981]" />
          <span>{bonusAmount} has been auto-paid to {firstName}'s wallet</span>
        </div>

        {/* Overall Hit Progress Bar */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-2 text-left">
          <p className="text-[11px] font-semibold text-[#8C909B]">
            {totalHitAps} of {totalAps} APs have now hit their bonus target
          </p>
          <div className="flex items-center gap-3">
            <div className="h-2 flex-1 rounded-full bg-[#E2ECF6] overflow-hidden">
              <div
                className="h-2 rounded-full bg-[#10B981]"
                style={{ width: `${hitRatePct}%` }}
              />
            </div>
            <span className="text-xs font-black text-[#10B981]">{hitRatePct}%</span>
          </div>
        </div>

        {/* Primary CTA Button */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full rounded-2xl bg-[#10B981] py-3.5 text-xs font-black text-white shadow-xs hover:bg-[#059669] transition"
        >
          Great news! Continue →
        </button>
      </div>
    </AppModal>
  );
}
