import { Award } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface TargetAchievedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetCount?: number;
  bonusAmount?: string;
  previousWallet?: string;
  newWallet?: string;
  nextPeriod?: string;
  onContinue?: () => void;
}

export function TargetAchievedModal({
  open,
  onOpenChange,
  targetCount = 200,
  bonusAmount = "₦5,000",
  previousWallet = "₦44,000",
  newWallet = "₦49,000",
  nextPeriod = "Jul 2026",
  onContinue,
}: TargetAchievedModalProps) {
  const handleContinue = () => {
    onContinue?.();
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      showCloseButton={false}
    >
      <div className="space-y-5 pt-2 pb-1 text-center text-xs">
        {/* Top Confetti Dots Strip */}
        <div className="flex justify-center items-center gap-3">
          <span className="size-2 rounded-full bg-[#2563EB]" />
          <span className="size-2.5 rounded-full bg-[#7C3AED]" />
          <span className="size-2 rounded-full bg-[#10B981]" />
          <span className="size-2.5 rounded-full bg-[#F59E0B]" />
          <span className="size-2 rounded-full bg-[#EC4899]" />
          <span className="size-2.5 rounded-full bg-[#3B82F6]" />
          <span className="size-2 rounded-full bg-[#EAB308]" />
        </div>

        {/* Medal Circle Icon */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#FFF4ED] text-[#D9990D] shadow-xs">
          <Award className="size-8" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#0F152A] flex items-center justify-center gap-1.5">
            <span>🎉</span>
            <span>Target Achieved!</span>
          </h2>
          <p className="text-xs font-semibold text-[#66738C]">
            You hit {targetCount} activations this month!
          </p>
        </div>

        {/* Purple Hero Bonus Card (Matching Image 3) */}
        <div className="rounded-3xl bg-[#7C3AED] p-6 text-center text-white space-y-1 shadow-md">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#DDD6FE]">
            BONUS EARNED
          </span>
          <h1 className="text-4xl font-black tracking-tight text-white py-0.5">
            {bonusAmount}
          </h1>
          <p className="text-xs text-[#EDE9FE] font-medium">
            Credited to your wallet now!
          </p>
        </div>

        {/* Wallet Credit Box */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs font-bold text-[#0F152A]">
          <span>Your wallet: </span>
          <span className="text-[#66738C]">{previousWallet}</span>
          <span> → </span>
          <span className="text-[#10B981] font-black">{newWallet}</span>
        </div>

        {/* Next Period Info */}
        <div className="space-y-0.5 text-xs text-[#66738C] font-semibold">
          <p>Next period: {nextPeriod}</p>
          <p>New target: {targetCount} activations</p>
          <p>New reward: {bonusAmount}</p>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleContinue}
            className="w-full rounded-2xl bg-[#7C3AED] py-3 text-xs font-bold text-white shadow-md hover:bg-purple-700 transition cursor-pointer"
          >
            Amazing! Continue
          </button>
        </div>
      </div>
    </AppModal>
  );
}
