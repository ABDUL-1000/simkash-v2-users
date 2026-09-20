import { useState } from "react";
import { APP_COLORS } from "@/constants/colors";
import {
  RotateCw,
  X,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Clock,
  Info,
  ExternalLink,
  ArrowLeftRight,
} from "lucide-react";
import type { CaPendingActivationItem } from "../../types/ca-sim-activation.types";

interface CaPendingCardProps {
  item: CaPendingActivationItem;
  onRetry: (item: CaPendingActivationItem) => void;
  onCancel: (item: CaPendingActivationItem) => void;
  onViewDetails: (item: CaPendingActivationItem) => void;
  onSwitchNetwork?: (item: CaPendingActivationItem) => void;
}

export function CaPendingCard({
  item,
  onRetry,
  onCancel,
  onViewDetails,
  onSwitchNetwork,
}: CaPendingCardProps) {
  const [expanded, setExpanded] = useState(item.isStuck);

  const getCarrierBadge = () => {
    switch (item.network) {
      case "MTN":
        return { bg: "#F59E0B", text: "#FFFFFF", label: "MTN" };
      case "Airtel":
        return { bg: "#EF4444", text: "#FFFFFF", label: "Airtel" };
      case "Glo":
        return { bg: "#10B981", text: "#FFFFFF", label: "Glo" };
      case "2 (9mobile)":
      default:
        return { bg: "#1F3A5F", text: "#FFFFFF", label: "9mobile" };
    }
  };

  const carrierBadge = getCarrierBadge();

  return (
    <div
      className="rounded-2xl border bg-white shadow-2xs overflow-hidden transition-all"
      style={{
        borderColor: item.isStuck ? "#FCA5A5" : APP_COLORS.greys.stroke,
      }}
    >
      {/* Top Main Row */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Carrier Icon & Info */}
        <div className="flex items-start sm:items-center gap-3.5">
          {/* Circle Logo */}
          <div
            className="size-11 rounded-full flex items-center justify-center font-black text-xs shrink-0 shadow-2xs"
            style={{
              backgroundColor: carrierBadge.bg,
              color: carrierBadge.text,
            }}
          >
            {carrierBadge.label}
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span
                className="font-mono text-sm sm:text-base font-black"
                style={{ color: APP_COLORS.texts.primary }}
              >
                {item.simNumber}
              </span>
            </div>

            <div
              className="text-xs font-bold"
              style={{ color: APP_COLORS.texts.slate }}
            >
              {item.customerName}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs pt-0.5">
              <span className="font-semibold text-slate-500">
                {item.plan}
              </span>
              <span>·</span>
              {item.isStuck ? (
                <span className="font-bold text-red-600 flex items-center gap-1">
                  <AlertTriangle className="size-3.5" />
                  <span>{item.pendingDuration} ⚠️ May be stuck</span>
                </span>
              ) : (
                <span className="font-bold text-amber-600 flex items-center gap-1">
                  <Clock className="size-3.5" />
                  <span>{item.pendingDuration}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Commission, Status, Actions */}
        <div className="flex flex-wrap items-center sm:flex-col sm:items-end gap-2.5 sm:gap-2 self-start sm:self-center">
          <div className="flex items-center gap-2.5">
            {/* Commission */}
            <span
              className="text-xs font-black px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: item.commission > 0 ? APP_COLORS.greens.light : "#F1F5F9",
                color: item.commission > 0 ? APP_COLORS.greens.green : APP_COLORS.texts.slate,
              }}
            >
              {item.commission > 0 ? `+₦${item.commission}` : "₦0"}
            </span>

            {/* Status Label */}
            <span
              className="text-xs font-bold flex items-center gap-1"
              style={{
                color: item.isStuck
                  ? APP_COLORS.reds.red
                  : APP_COLORS.ambers.secondary,
              }}
            >
              {item.isStuck ? (
                <AlertTriangle className="size-3.5" />
              ) : (
                <RotateCw className="size-3.5 animate-spin" />
              )}
              <span>{item.statusText}</span>
            </span>
          </div>

          {/* Quick Action buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onRetry(item)}
              className="px-3 py-1.5 rounded-xl border text-xs font-bold text-amber-800 bg-amber-50 border-amber-300 hover:bg-amber-100 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCw className="size-3" />
              <span>Retry</span>
            </button>

            <button
              type="button"
              onClick={() => onCancel(item)}
              className="px-3 py-1.5 rounded-xl border text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors flex items-center gap-1 cursor-pointer"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <X className="size-3" />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toggle button for details if not stuck or stuck */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full px-5 py-2 border-t text-xs font-bold flex items-center justify-between transition-colors hover:bg-slate-50 text-slate-600"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <span className="flex items-center gap-1.5">
          <Info className="size-3.5 text-blue-600" />
          <span>Attempt Details</span>
        </span>
        {expanded ? (
          <ChevronUp className="size-3.5 text-slate-400" />
        ) : (
          <ChevronDown className="size-3.5 text-slate-400" />
        )}
      </button>

      {/* Expanded Attempt Details */}
      {expanded && (
        <div
          className="p-5 border-t space-y-4 text-xs bg-slate-50/50"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center justify-between sm:justify-start sm:gap-6">
              <span className="text-slate-500 font-medium">First attempt:</span>
              <span className="font-bold text-slate-800">{item.firstAttemptTime}</span>
            </div>

            <div className="flex items-center justify-between sm:justify-start sm:gap-6">
              <span className="text-slate-500 font-medium">Attempts:</span>
              <span className="font-bold text-slate-800">{item.attemptsCount}</span>
            </div>

            {item.lastError && (
              <div className="flex items-center justify-between sm:justify-start sm:gap-6">
                <span className="text-slate-500 font-medium">Last error:</span>
                <span className="font-bold text-red-600">"{item.lastError}"</span>
              </div>
            )}

            <div className="flex items-center justify-between sm:justify-start sm:gap-6">
              <span className="text-slate-500 font-medium">Request ID:</span>
              <span className="font-mono font-bold text-slate-800">{item.requestId}</span>
            </div>
          </div>

          {/* Action buttons inside accordion */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => onRetry(item)}
              className="px-4 py-2 rounded-xl text-xs font-black text-white shadow-xs transition-opacity hover:opacity-95 flex items-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: APP_COLORS.ambers.secondary }}
            >
              <RotateCw className="size-3.5" />
              <span>Retry Now</span>
            </button>

            <button
              type="button"
              onClick={() => onViewDetails(item)}
              className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <ExternalLink className="size-3.5" />
              <span>View Details</span>
            </button>

            {onSwitchNetwork && (
              <button
                type="button"
                onClick={() => onSwitchNetwork(item)}
                className="px-4 py-2 rounded-xl border text-xs font-bold text-blue-600 bg-blue-50/50 border-blue-200 hover:bg-blue-50 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeftRight className="size-3.5" />
                <span>Switch Network</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onCancel(item)}
              className="px-4 py-2 rounded-xl border text-xs font-bold text-red-600 bg-red-50/50 border-red-200 hover:bg-red-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <X className="size-3.5" />
              <span>Cancel Activation</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
