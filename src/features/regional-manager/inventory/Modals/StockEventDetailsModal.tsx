import {
  ArrowDownToLine,
  Send,
  SlidersHorizontal,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { RmHistoryEvent } from "../../types/rm-inventory.types";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";

interface StockEventDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: RmHistoryEvent | null;
  onViewScProfile?: (scName: string) => void;
}

export function StockEventDetailsModal({
  open,
  onOpenChange,
  event,
  onViewScProfile,
}: StockEventDetailsModalProps) {
  const navigate = useNavigate();

  if (!event) return null;

  const isReceived = event.eventType === "Received";
  const isDistributed = event.eventType === "Distributed";
  const isAdjusted = event.eventType === "Adjusted";
  const isReturned = event.eventType === "Returned";

  const getBannerConfig = () => {
    if (isReceived) {
      return {
        icon: <ArrowDownToLine className="size-5 text-[#059669]" />,
        iconBg: "bg-[#10B981]",
        bannerBg: "bg-[#ECFDF5]",
        title: "Stock Received from Super Admin",
        badge: "Received from Admin",
        badgeStyle: "bg-[#ECFDF5] text-[#059669]",
        subtitle: "Received from Super Admin",
      };
    }
    if (isAdjusted) {
      return {
        icon: <SlidersHorizontal className="size-5 text-[#475569]" />,
        iconBg: "bg-[#64748B]",
        bannerBg: "bg-[#F8FAFC]",
        title: "Admin Stock Adjustment",
        badge: "Admin Adjustment",
        badgeStyle: "bg-[#F1F5F9] text-[#475569]",
        subtitle: "Admin Stock Adjustment",
      };
    }
    if (isReturned) {
      return {
        icon: <RotateCcw className="size-5 text-[#D97706]" />,
        iconBg: "bg-[#F59E0B]",
        bannerBg: "bg-[#FEFCE8]",
        title: "Stock Returned from SC",
        badge: "Returned from SC",
        badgeStyle: "bg-[#FEFCE8] text-[#D97706]",
        subtitle: "Returned from SC",
      };
    }
    return {
      icon: <Send className="size-5 text-[#2563EB]" />,
      iconBg: "bg-[#2563EB]",
      bannerBg: "bg-[#EFF6FF]",
      title: "Stock Distributed to SC",
      badge: "Distributed to SC",
      badgeStyle: "bg-[#EFF6FF] text-[#2563EB]",
      subtitle: "Distributed to State Coordinator",
    };
  };

  const banner = getBannerConfig();

  const handleProfileNavigation = () => {
    onOpenChange(false);
    if (onViewScProfile && (event.fromTo || event.from)) {
      onViewScProfile(event.fromTo || event.from || "aminat-okafor");
    } else {
      navigate(appPaths.rmScDetails("aminat-okafor").path);
    }
  };

  const showScProfileButton = isDistributed || isReturned;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Stock Event Details"
      description={banner.subtitle}
      size="sm"
      showCloseButton={true}
      footer={
        <div className="flex gap-2">
          {showScProfileButton && (
            <button
              type="button"
              onClick={handleProfileNavigation}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50"
            >
              <span>View SC Profile</span>
              <ArrowRight className="size-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={`${
              showScProfileButton ? "flex-1" : "w-full"
            } rounded-xl bg-[#1E293B] py-2.5 text-center text-xs font-bold text-white transition hover:bg-[#0F172A]`}
          >
            Close
          </button>
        </div>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Banner */}
        <div
          className={`flex items-center gap-3 rounded-2xl border border-slate-100 p-3.5 ${banner.bannerBg}`}
        >
          <div
            className={`flex size-9 shrink-0 items-center justify-center rounded-full text-white ${banner.iconBg}`}
          >
            {banner.icon}
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F152A]">{banner.title}</h4>
            <p className="text-[11px] font-medium text-[#66738C]">
              {event.displayDate}
            </p>
          </div>
        </div>

        {/* Details Table */}
        <div className="divide-y divide-[#F1F5F9] text-xs">
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Event Ref</span>
            <span className="font-bold text-[#0F152A]">{event.refNo}</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Event Type</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${banner.badgeStyle}`}
            >
              {banner.badge}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">SIM Type</span>
            <span className="font-bold text-[#0F152A]">
              {event.simType} · {event.networkBreakdown ? "Multiple Networks" : event.network}
            </span>
          </div>

          {event.networkBreakdown && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">Networks</span>
              <span className="font-semibold text-[#0F152A]">
                {event.networkBreakdown}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Quantity</span>
            <span
              className={`font-black ${
                event.quantity > 0 ? "text-[#10B981]" : "text-[#EF4444]"
              }`}
            >
              {event.quantity > 0 ? `+${event.quantity}` : event.quantity} units
            </span>
          </div>

          {/* Recipient / Source info */}
          {isDistributed && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">To</span>
              <div className="text-right">
                <span className="font-bold text-[#0F152A] block">
                  Aminat Okafor (SC)
                </span>
                <span className="text-[10px] text-[#8C909B]">
                  Lagos · 08065942373
                </span>
              </div>
            </div>
          )}

          {isReturned && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">From</span>
              <div className="text-right">
                <span className="font-bold text-[#0F152A] block">
                  Ibrahim Musa (SC)
                </span>
                <span className="text-[10px] text-[#8C909B]">
                  Rivers · 07055093537
                </span>
              </div>
            </div>
          )}

          {isReceived && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">From</span>
              <span className="font-bold text-[#0F152A]">Super Admin</span>
            </div>
          )}

          {isAdjusted && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">Adjusted By</span>
              <span className="font-bold text-[#0F152A]">
                {event.adjustedBy || "Super Admin"}
              </span>
            </div>
          )}

          {event.requestRef && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">Request Ref</span>
              <span className="font-semibold text-[#0F152A]">
                {event.requestRef}
              </span>
            </div>
          )}

          {/* Return Reason */}
          {isReturned && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">Return Reason</span>
              <span className="text-xs italic text-[#0F152A]">
                SC closing operations in this region
              </span>
            </div>
          )}

          {/* Reason for adjustment */}
          {isAdjusted && event.reason && (
            <div className="py-2.5">
              <span className="text-[#8C909B] block mb-1">Reason</span>
              <p className="text-xs italic text-[#334155] bg-slate-50 p-2 rounded-lg border border-slate-100">
                "{event.reason}"
              </p>
            </div>
          )}

          {/* Stock Before */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Stock Before</span>
            <span className="font-medium text-[#0F152A]">
              {isDistributed ? "180" : isReturned ? "57" : event.stockBefore ?? "100"}{" "}
              {event.simType}s
            </span>
          </div>

          {/* Operation amount */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">
              {isDistributed
                ? "Distributed"
                : isReturned
                ? "Returned"
                : isAdjusted
                ? "Adjustment"
                : "This Batch"}
            </span>
            <span
              className={`font-bold ${
                event.quantity > 0 ? "text-[#10B981]" : "text-[#EF4444]"
              }`}
            >
              {event.quantity > 0 ? `+${event.quantity}` : event.quantity} {event.simType}s
            </span>
          </div>

          {/* Stock After */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Stock After</span>
            <span className="text-sm font-black text-[#0F152A]">
              {isDistributed ? "130" : isReturned ? "72" : event.stockAfter ?? "300"}{" "}
              {event.simType}s
            </span>
          </div>

          {/* SC Target After (Image 1) */}
          {isDistributed && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">Aminat After</span>
              <span className="font-black text-[#10B981]">42 → 92 SIMs</span>
            </div>
          )}

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Date</span>
            <span className="font-medium text-[#64748B]">
              {event.date} · {event.time}:22 {event.time.includes("M") ? "" : "PM"}
            </span>
          </div>

          {/* Optional Note (Image 1) */}
          {isDistributed && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">Note</span>
              <span className="text-xs italic text-[#64748B]">
                Priority for Lagos Island
              </span>
            </div>
          )}
        </div>
      </div>
    </AppModal>
  );
}
