import { Hourglass, RotateCw } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface CaPendingAlertBannerProps {
  stuckCount?: number;
  onRetryAll: () => void;
}

export function CaPendingAlertBanner({
  stuckCount = 2,
  onRetryAll,
}: CaPendingAlertBannerProps) {
  if (stuckCount <= 0) return null;

  return (
    <div
      className="p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
      style={{
        backgroundColor: "#FEF3C7",
        borderColor: "#FCD34D",
      }}
    >
      <div className="flex items-center gap-3">
        <Hourglass className="size-5 shrink-0 text-amber-600" />
        <p className="text-xs sm:text-sm font-bold text-amber-900 leading-tight">
          {stuckCount} activations have been pending for over 1 hour. They may need to be retried.
        </p>
      </div>

      <button
        type="button"
        onClick={onRetryAll}
        className="px-4 py-2 rounded-xl text-xs font-black shadow-xs shrink-0 transition-opacity hover:opacity-95 text-white active:scale-98 flex items-center gap-1.5 cursor-pointer"
        style={{ backgroundColor: APP_COLORS.ambers.secondary }}
      >
        <RotateCw className="size-3.5" />
        <span>Retry All</span>
      </button>
    </div>
  );
}
