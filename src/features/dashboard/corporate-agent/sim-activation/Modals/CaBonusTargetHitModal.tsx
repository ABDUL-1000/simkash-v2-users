import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { Trophy, PlusCircle, Target } from "lucide-react";

interface CaBonusTargetHitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bonusAmount?: number;
  activationCommission?: number;
  previousWallet?: number;
  newWallet?: number;
  simNumber?: string;
  simType?: string;
  network?: string;
  customerName?: string;
  customerPhone?: string;
  planName?: string;
  onActivateAnother?: () => void;
  onDone?: () => void;
}

export function CaBonusTargetHitModal({
  open,
  onOpenChange,
  bonusAmount = 15000,
  activationCommission = 600,
  previousWallet = 269700,
  newWallet = 285300,
  simNumber = "07022222222",
  simType = "POS SIM",
  network = "MTN",
  customerName = "Chidi Eze",
  customerPhone = "08120600542",
  planName = "30-day",
  onActivateAnother,
  onDone,
}: CaBonusTargetHitModalProps) {
  const [sendSms, setSendSms] = useState(true);

  const dotsColors = [
    "#F97316", // orange
    "#10B981", // green
    "#3B82F6", // blue
    "#1E3A8A", // dark blue
    "#8B5CF6", // purple
    "#86EFAC", // light green
    "#FEF08A", // pale yellow
    "#BFDBFE", // soft blue
    "#A5F3FC", // pale cyan
    "#E9D5FF", // lavender
  ];

  const handleDone = () => {
    onOpenChange(false);
    onDone?.();
  };

  const handleActivateAnother = () => {
    onOpenChange(false);
    onActivateAnother?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center space-y-4 pt-1">
        {/* Colorful Dot Sequence at Top */}
        <div className="flex items-center gap-1.5 pt-1">
          {dotsColors.map((color, index) => (
            <span
              key={index}
              className="size-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Big Circular Trophy Icon */}
        <div
          className="size-20 rounded-full flex items-center justify-center shadow-xs"
          style={{
            backgroundColor: APP_COLORS.ambers.light,
            color: APP_COLORS.ambers.secondary,
          }}
        >
          <Trophy className="size-10 fill-amber-500 text-amber-600" />
        </div>

        {/* Title and Subtitle */}
        <div className="space-y-1">
          <h2
            className="text-2xl sm:text-3xl font-black tracking-tight"
            style={{ color: APP_COLORS.texts.primary }}
          >
            Bonus Target Hit!
          </h2>
          <p
            className="text-xs sm:text-sm font-medium"
            style={{ color: APP_COLORS.texts.slate }}
          >
            This activation completed your 3,000 combined target!
          </p>
        </div>

        {/* Black Hero Card: BONUS EARNED */}
        <div className="w-full rounded-3xl bg-[#1A1A1A] p-6 text-center text-white shadow-md space-y-1">
          <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            BONUS EARNED
          </div>
          <div className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            ₦{bonusAmount.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 font-medium">
            Credited to your wallet now!
          </div>
        </div>

        {/* Commission Green Strip */}
        <div
          className="w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold"
          style={{
            backgroundColor: APP_COLORS.greens.light,
            color: APP_COLORS.greens.green,
          }}
        >
          <PlusCircle className="size-4 text-emerald-600" />
          <span>This activation: +₦{activationCommission} commission</span>
        </div>

        {/* Wallet Balance Progression Strip */}
        <div
          className="w-full p-3 rounded-xl border flex items-center justify-between text-xs font-bold"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <span style={{ color: APP_COLORS.texts.primary }}>
            Wallet: ₦{previousWallet.toLocaleString()} → ₦{newWallet.toLocaleString()}
          </span>
          <span style={{ color: APP_COLORS.greens.green }}>
            +₦{(bonusAmount + activationCommission).toLocaleString()}
          </span>
        </div>

        {/* ACTIVATION RECEIPT CARD */}
        <div
          className="w-full rounded-2xl border p-4 text-left space-y-2.5 text-xs bg-white"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 pb-1 border-b" style={{ borderColor: APP_COLORS.backgrounds.surface }}>
            ACTIVATION RECEIPT
          </div>

          <div className="space-y-2 divide-y" style={{ borderColor: APP_COLORS.backgrounds.surface }}>
            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-500 font-medium">SIM</span>
              <span className="font-mono font-black text-slate-900">{simNumber}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 font-medium">Type</span>
              <span className="font-bold text-slate-900">
                {simType} · {network}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 font-medium">Customer</span>
              <span className="font-bold text-slate-900">{customerName}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 font-medium">Plan</span>
              <span className="font-bold text-slate-900">{planName}</span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 font-medium">Commission</span>
              <span className="font-black text-emerald-600">
                +₦{activationCommission}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-slate-500 font-medium">Time</span>
              <span className="font-bold text-slate-900">Just now</span>
            </div>
          </div>
        </div>

        {/* Combined Target Update Strip */}
        <div
          className="w-full p-3 rounded-xl border flex items-center gap-2.5 text-left text-xs"
          style={{
            backgroundColor: "#F1F5F9",
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <Target className="size-4 text-slate-600 shrink-0" />
          <div className="space-y-0.5">
            <div className="font-bold text-slate-900">
              Combined target: 2,999 → 3,000
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              74.0% · 0 — target complete! more to ₦15,000
            </div>
          </div>
        </div>

        {/* Send SMS Toggle */}
        <div className="w-full flex items-center justify-between text-left pt-1">
          <div>
            <div className="text-xs font-bold text-slate-800">
              Send confirmation SMS to {customerName}?
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              {customerPhone}
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={sendSms}
              onChange={(e) => setSendSms(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Bottom 2 Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-3 pt-3 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <button
            type="button"
            onClick={handleActivateAnother}
            className="w-full py-3 rounded-xl border text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            Activate Another
          </button>

          <button
            type="button"
            onClick={handleDone}
            className="w-full py-3 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 cursor-pointer"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            Done
          </button>
        </div>
      </div>
    </AppModal>
  );
}
