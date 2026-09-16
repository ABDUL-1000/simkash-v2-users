import { AlertCircle, ArrowRight } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";
import type { FailedActivationItem } from "../../data/regional-manager-network.data";

interface RmFailedActivationsCardProps {
  failedItems: FailedActivationItem[];
  onRetry: (item: FailedActivationItem) => void;
  onViewDetails: (item: FailedActivationItem) => void;
}

export function RmFailedActivationsCard({
  failedItems,
  onRetry,
  onViewDetails,
}: RmFailedActivationsCardProps) {
  return (
    <div
      className="rounded-2xl border p-4 shadow-xs space-y-3"
      style={{
        borderColor: APP_COLORS.reds.primary,
        backgroundColor: APP_COLORS.backgrounds.background,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="size-4" style={{ color: APP_COLORS.reds.red }} />
          <h3
            className="text-xs font-bold tracking-tight"
            style={{ color: APP_COLORS.reds.red }}
          >
            Failed Activations
          </h3>
        </div>

        <span
          className="flex size-5 items-center justify-center rounded-full text-[10px] font-black text-white"
          style={{ backgroundColor: APP_COLORS.reds.red }}
        >
          {failedItems.length}
        </span>
      </div>

      {/* Failed Items List */}
      <div className="space-y-2 text-xs">
        {failedItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border p-2.5 transition hover:shadow-2xs space-y-1"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: "#FFFDFD",
            }}
          >
            <div className="flex items-center justify-between">
              <span
                onClick={() => onViewDetails(item)}
                className="font-bold text-xs hover:underline cursor-pointer"
                style={{ color: APP_COLORS.texts.primary }}
              >
                {item.simNumber}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRetry(item);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 transition cursor-pointer"
              >
                <span>Retry</span>
                <ArrowRight className="size-3" />
              </button>
            </div>

            <p className="text-[11px] truncate" style={{ color: APP_COLORS.texts.slate }}>
              {item.apName} · {item.scName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RmFailedActivationsCard;
