import { Trophy, Wallet, ArrowRight } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface TargetAchievedModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue?: () => void;
}

export function TargetAchievedModal({
  open,
  onOpenChange,
  onContinue,
}: TargetAchievedModalProps) {
  const handleAction = () => {
    onOpenChange(false);
    onContinue?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      description=""
      size="sm"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center pt-2 space-y-4 text-xs">
        {/* Confetti & Trophy Graphic */}
        <div className="relative w-full flex flex-col items-center">
          {/* Confetti dots */}
          <div className="absolute -top-3 left-6 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="absolute top-1 left-16 w-1.5 h-1.5 rounded-full bg-blue-500" />
          <div className="absolute -top-4 right-10 w-2 h-2 rounded-full bg-purple-500" />
          <div className="absolute -top-1 right-20 w-1.5 h-1.5 rounded-full bg-amber-400" />
          <div className="absolute top-3 right-6 w-2 h-2 rounded-full bg-red-400" />

          {/* Trophy Circle Badge */}
          <div className="w-20 h-20 rounded-full bg-amber-50 border-4 border-amber-100/60 flex items-center justify-center shadow-xs">
            <Trophy className="w-10 h-10 text-amber-500 fill-amber-400" />
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight" style={{ color: APP_COLORS.texts.primary }}>
            🎉 Target Achieved!
          </h2>
          <p className="text-sm font-bold text-slate-700">
            You hit 3,000 combined activations!
          </p>
          <span className="text-xs text-slate-400 font-medium block">
            Own: 312 • APs: 2,688
          </span>
        </div>

        {/* Dark Navy Bonus Card */}
        <div
          className="w-full rounded-2xl p-5 text-white shadow-md text-center space-y-1"
          style={{
            background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
          }}
        >
          <span className="text-[10px] uppercase font-bold text-blue-200 tracking-wider block">
            Bonus Earned
          </span>
          <div className="text-3xl sm:text-4xl font-black tracking-tight text-white py-0.5">
            ₦15,000
          </div>
          <span className="text-xs text-slate-300 font-medium block">
            Credited to your wallet now!
          </span>
        </div>

        {/* Wallet Transition Box */}
        <div
          className="w-full p-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-xs"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
            color: APP_COLORS.texts.primary,
          }}
        >
          <Wallet className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Wallet: ₦269,700 → ₦284,700</span>
        </div>

        {/* Next Target Info Box */}
        <div
          className="w-full p-2.5 rounded-xl border text-center text-[11px] text-slate-500 font-medium"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          Next: Jul 2026 • Target: 3,000 • Reward: ₦15,000
        </div>

        {/* Purple Amazing Continue Button */}
        <div className="w-full pt-1">
          <button
            type="button"
            onClick={handleAction}
            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white shadow-md transition-all hover:opacity-95 active:scale-[0.99] flex items-center justify-center gap-2"
            style={{ backgroundColor: "#8B5CF6" }}
          >
            <span>Amazing! Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AppModal>
  );
}
