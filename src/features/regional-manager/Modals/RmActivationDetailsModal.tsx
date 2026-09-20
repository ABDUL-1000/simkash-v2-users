import { useState } from "react";
import { Copy, Check, XCircle, Loader2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import type { NetworkActivationItem } from "../types/regional-manager-network.types";

interface RmActivationDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activation: NetworkActivationItem | null;
  onContactAp?: (apName: string, phone: string) => void;
  onViewApProfile?: (apName: string) => void;
  onViewFullDetails?: (activation: NetworkActivationItem) => void;
}

export function RmActivationDetailsModal({
  open,
  onOpenChange,
  activation,
  onContactAp,
  onViewApProfile,
  onViewFullDetails,
}: RmActivationDetailsModalProps) {
  const [copied, setCopied] = useState(false);

  if (!activation) return null;

  const isFailed = activation.status === "Failed";
  const isPending = activation.status === "Pending";
  const isCompleted = activation.status === "Completed";
  const commission = activation.commission;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(activation.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Status color styles
  const getHeroColor = () => {
    if (isPending) return APP_COLORS.ambers.secondary;
    if (isFailed) return APP_COLORS.texts.slate;
    return APP_COLORS.greens.green;
  };

  const getStatusBadgeStyle = () => {
    if (isPending) {
      return {
        bg: "#FEF3C7",
        color: "#D97706",
        label: "Pending",
      };
    }
    if (isFailed) {
      return {
        bg: APP_COLORS.reds.light,
        color: APP_COLORS.reds.red,
        label: "Failed",
      };
    }
    return {
      bg: APP_COLORS.greens.light,
      color: APP_COLORS.greens.secondary,
      label: "Completed",
    };
  };

  const badgeStyle = getStatusBadgeStyle();

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Activation Details"
      description={`${activation.reference} · ${activation.status}`}
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* HERO COMMISSION / STATUS */}
        <div className="text-center py-2 space-y-1.5">
          <div
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: getHeroColor() }}
          >
            {isPending
              ? `₦${(commission.total || 1000).toLocaleString()}`
              : isFailed
              ? "+₦0"
              : `+₦${commission.total.toLocaleString()}`}
          </div>
          <p className="text-xs font-medium" style={{ color: APP_COLORS.texts.slate }}>
            {isPending
              ? "Activation Pending"
              : isFailed
              ? "Activation Failed — No Commission"
              : "Network Activation Commission"}
          </p>
          <div className="pt-0.5">
            <span
              className="inline-flex items-center rounded-full px-3 py-0.5 text-[11px] font-bold"
              style={{
                backgroundColor: badgeStyle.bg,
                color: badgeStyle.color,
              }}
            >
              {badgeStyle.label}
            </span>
          </div>
        </div>

        {/* SIM DETAILS BOX */}
        <div
          className="rounded-2xl border p-3.5 text-center font-bold text-xs shadow-xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
            color: APP_COLORS.texts.primary,
          }}
        >
          <span>{activation.simNumber}</span>
          <span className="mx-2" style={{ color: APP_COLORS.texts.slate }}>
            •
          </span>
          <span>{activation.simType}</span>
          <span className="mx-2" style={{ color: APP_COLORS.texts.slate }}>
            •
          </span>
          <span>{activation.network}</span>
        </div>

        {/* PENDING NOTIFICATION BANNER (Image 1) */}
        {isPending && (
          <div
            className="flex items-center gap-2.5 rounded-2xl p-3 text-xs font-semibold shadow-2xs"
            style={{
              backgroundColor: "#FFFBEB",
              color: "#B45309",
              border: "1px solid #FDE68A",
            }}
          >
            <Loader2 className="size-4 animate-spin shrink-0 text-amber-500" />
            <span>Confirming with {activation.network} network...</span>
          </div>
        )}

        {/* BASIC METADATA ROWS */}
        <div
          className="divide-y rounded-2xl border px-4 py-1 text-xs shadow-xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.background,
          }}
        >
          {/* Reference */}
          <div
            className="flex items-center justify-between py-2.5"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <span style={{ color: APP_COLORS.texts.slate }}>Ref</span>
            <div className="flex items-center gap-1.5 font-bold" style={{ color: APP_COLORS.texts.primary }}>
              <span>{activation.reference}</span>
              <button
                type="button"
                onClick={handleCopyRef}
                className="hover:opacity-75 cursor-pointer p-0.5"
                title="Copy reference"
              >
                {copied ? (
                  <Check className="size-3.5" style={{ color: APP_COLORS.greens.green }} />
                ) : (
                  <Copy className="size-3.5" style={{ color: APP_COLORS.texts.slate }} />
                )}
              </button>
            </div>
          </div>

          {/* Customer */}
          <div
            className="flex items-center justify-between py-2.5"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <span style={{ color: APP_COLORS.texts.slate }}>Customer</span>
            <span className="font-bold text-right" style={{ color: APP_COLORS.texts.primary }}>
              {activation.customerName} · {activation.customerPhone}
            </span>
          </div>

          {/* Date */}
          <div
            className="flex items-center justify-between py-2.5"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <span style={{ color: APP_COLORS.texts.slate }}>Date</span>
            <span className="font-bold text-right" style={{ color: APP_COLORS.texts.primary }}>
              {activation.date} · {activation.time}
            </span>
          </div>
        </div>

        {/* NETWORK CHAIN */}
        <div className="space-y-1.5 pt-1">
          <h4
            className="text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Network Chain
          </h4>
          <div
            className="divide-y rounded-2xl border px-4 py-1 text-xs shadow-xs"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
            }}
          >
            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <span style={{ color: APP_COLORS.texts.slate }}>Agency Partner</span>
              <div className="text-right">
                <span className="font-bold block" style={{ color: APP_COLORS.texts.primary }}>
                  {activation.apName} (AP)
                </span>
                <span className="text-[10px]" style={{ color: APP_COLORS.texts.slate }}>
                  {activation.scName.split(" ")[0]}&apos;s network
                </span>
              </div>
            </div>

            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <span style={{ color: APP_COLORS.texts.slate }}>State Coord</span>
              <span className="font-bold text-right" style={{ color: APP_COLORS.texts.primary }}>
                {activation.scName} (SC)
              </span>
            </div>

            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <span style={{ color: APP_COLORS.texts.slate }}>Regional Mgr</span>
              <span
                className="font-bold text-right"
                style={{ color: APP_COLORS.blues.interactiveCta }}
              >
                You (RM)
              </span>
            </div>
          </div>
        </div>

        {/* COMMISSION BREAKDOWN */}
        <div className="space-y-1.5 pt-1">
          <h4
            className="text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Commission
          </h4>
          <div
            className="divide-y rounded-2xl border px-4 py-1 text-xs shadow-xs"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.background,
            }}
          >
            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <span style={{ color: APP_COLORS.texts.slate }}>AP earned</span>
              {isPending ? (
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800">
                  Pending
                </span>
              ) : (
                <span
                  className="font-bold"
                  style={{
                    color: isFailed ? APP_COLORS.texts.primary : APP_COLORS.greens.green,
                  }}
                >
                  ₦{commission.apEarned.toLocaleString()}
                </span>
              )}
            </div>

            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <span style={{ color: APP_COLORS.texts.slate }}>SC earned</span>
              {isPending ? (
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800">
                  Pending
                </span>
              ) : (
                <span
                  className="font-bold"
                  style={{
                    color: isFailed ? APP_COLORS.texts.primary : APP_COLORS.greens.green,
                  }}
                >
                  ₦{commission.scEarned.toLocaleString()}
                </span>
              )}
            </div>

            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <span style={{ color: APP_COLORS.texts.slate }}>RM earned</span>
              {isPending ? (
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800">
                  Pending
                </span>
              ) : (
                <span
                  className="font-bold"
                  style={{
                    color: isFailed ? APP_COLORS.texts.primary : APP_COLORS.blues.interactiveCta,
                  }}
                >
                  ₦{commission.rmEarned.toLocaleString()}
                </span>
              )}
            </div>

            <div
              className="flex items-center justify-between py-2.5"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <span className="font-bold" style={{ color: APP_COLORS.texts.primary }}>
                Total
              </span>
              {isPending ? (
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800">
                  Pending
                </span>
              ) : (
                <span
                  className="font-black text-sm"
                  style={{
                    color: isFailed ? APP_COLORS.texts.primary : APP_COLORS.greens.green,
                  }}
                >
                  ₦{commission.total.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* FAILURE REASON (Image 5 from batch 1) */}
        {isFailed && (
          <div
            className="rounded-2xl border p-3.5 space-y-1.5"
            style={{
              borderColor: APP_COLORS.reds.primary,
              backgroundColor: APP_COLORS.reds.light,
            }}
          >
            <h5
              className="text-[10px] font-black tracking-wider uppercase"
              style={{ color: APP_COLORS.reds.red }}
            >
              Failure Reason
            </h5>
            <div className="flex items-center gap-2">
              <XCircle className="size-4 shrink-0" style={{ color: APP_COLORS.reds.red }} />
              <span
                className="text-xs font-semibold"
                style={{ color: APP_COLORS.texts.primary }}
              >
                {activation.failureReason || "MTN: SIM number not found on network"}
              </span>
            </div>
          </div>
        )}

        {/* FOOTER ACTIONS */}
        <div
          className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onViewFullDetails?.(activation)}
              className="rounded-xl border px-3.5 py-2 text-xs font-bold transition hover:bg-slate-50 cursor-pointer"
              style={{
                borderColor: APP_COLORS.greys.stroke,
                color: APP_COLORS.texts.primary,
              }}
            >
              View Full Details
            </button>

            {isCompleted && onViewApProfile && (
              <button
                type="button"
                onClick={() => onViewApProfile(activation.apName)}
                className="rounded-xl border px-3.5 py-2 text-xs font-bold transition hover:bg-slate-50 cursor-pointer"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  color: APP_COLORS.texts.primary,
                }}
              >
                View AP Profile
              </button>
            )}

            {isFailed && onContactAp && (
              <button
                type="button"
                onClick={() => onContactAp(activation.apName, activation.apPhone)}
                className="rounded-xl border px-3.5 py-2 text-xs font-bold transition hover:opacity-90 cursor-pointer"
                style={{
                  borderColor: APP_COLORS.ambers.amber,
                  color: APP_COLORS.ambers.secondary,
                  backgroundColor: "#FFFBEB",
                }}
              >
                Contact AP
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl px-6 py-2 text-xs font-bold text-white shadow-xs transition hover:opacity-90 active:scale-[0.99] cursor-pointer"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default RmActivationDetailsModal;
