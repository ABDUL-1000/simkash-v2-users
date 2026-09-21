import { colors } from "@/constants/colors";

interface EpBalancePayoffCardProps {
  onPayDown: () => void;
}

export function EpBalancePayoffCard({ onPayDown }: EpBalancePayoffCardProps) {
  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3"
      style={{ borderColor: colors.border }}
    >
      <p className="font-bold text-slate-900 text-sm">50% Balance Remaining</p>

      {/* Gold Card */}
      <div className="rounded-2xl bg-amber-50/80 border border-amber-200 p-3.5 space-y-2">
        <div>
          <p className="text-2xl font-black text-amber-700">₦7,500,000</p>
          <p className="text-[11px] text-amber-800/80 font-medium">of ₦15,000,000 initial investment</p>
        </div>

        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden flex">
          <div className="h-full bg-emerald-500" style={{ width: "50%" }} />
          <div className="h-full bg-amber-500" style={{ width: "50%" }} />
        </div>

        <div className="flex justify-between text-[10px] font-semibold">
          <span className="text-emerald-700">Paid: ₦7,500,000</span>
          <span className="text-amber-800">Remaining: ₦7,500,000</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-semibold px-1">
        <button
          type="button"
          onClick={onPayDown}
          className="text-blue-600 hover:text-blue-700"
        >
          Pay with wallet earnings
        </button>
        <button
          type="button"
          onClick={onPayDown}
          className="text-slate-400 hover:text-slate-600"
        >
          Set up auto-pay
        </button>
      </div>

      <button
        type="button"
        onClick={onPayDown}
        className="w-full rounded-xl py-2.5 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 transition shadow-xs"
      >
        Pay Down Balance
      </button>
    </div>
  );
}
