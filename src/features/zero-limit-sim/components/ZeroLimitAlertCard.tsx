import { ArrowRight } from "lucide-react";

export function ZeroLimitAlertCard({
  onNotifyAll,
  onViewExhausted,
}: {
  onNotifyAll?: () => void;
  onViewExhausted?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-5 shadow-sm space-y-3">
      <div>
        <h4 className="text-sm font-bold text-[#DC2626]">
          124 SIMs have 0GB remaining
        </h4>
        <p className="mt-1 text-xs text-[#64748B] leading-relaxed">
          Users cannot browse until data is renewed on Simkash.
        </p>
      </div>

      <button
        type="button"
        onClick={onNotifyAll}
        className="w-full rounded-xl bg-[#F59E0B] py-2.5 text-xs font-bold text-white shadow-xs transition-colors hover:bg-[#D97706]"
      >
        Notify All Users
      </button>

      <button
        type="button"
        onClick={onViewExhausted}
        className="flex items-center gap-1 text-xs font-bold text-[#DC2626] hover:underline pt-1"
      >
        <span>View Exhausted SIMs</span>
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
}
