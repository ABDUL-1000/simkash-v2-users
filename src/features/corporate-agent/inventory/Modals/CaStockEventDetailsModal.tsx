import { Undo2, Send, ArrowDownToLine } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import type { CaHistoryEventItem } from "../types/ca-inventory.types";

interface CaStockEventDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CaHistoryEventItem | null;
  onViewApProfile?: (apName: string) => void;
}

export function CaStockEventDetailsModal({
  open,
  onOpenChange,
  event,
  onViewApProfile,
}: CaStockEventDetailsModalProps) {
  if (!event) return null;

  const isReturn = event.eventType === "Returned";
  const isDistributed = event.eventType === "Distributed";

  const subtitle = isReturn
    ? "Returned from Agency Partner"
    : isDistributed
    ? "Distributed to Agency Partner"
    : "Received from Super Admin";

  const apName =
    event.apName ||
    event.fromTo.replace(/^(To|From|Returned by):\s*/, "") ||
    "Francis Udom (AP)";

  const apFirstName = apName.split(" ")[0] || "AP";

  const locationAndPhone =
    event.apLocation && event.apPhone
      ? `${event.apLocation} · ${event.apPhone}`
      : isDistributed
      ? "Lagos · 08120428684"
      : "Lagos · 08155667788";

  const returnReason =
    event.returnReason || "AP reducing operations in Surulere area";

  const stockBefore =
    event.stockBefore ||
    (isDistributed ? "500 POS SIMs" : event.qty > 0 ? "490 POS SIMs" : "515 POS SIMs");

  const quantityChangedText =
    event.stockReturnedOrChanged ||
    (event.qty > 0
      ? `+${event.qty} ${event.simType}s`
      : `${event.qty} ${event.simType}s`);

  const stockAfter =
    event.stockAfter ||
    (isDistributed ? "485 POS SIMs" : event.runningTotal || "500 POS SIMs");

  const recipientTransition =
    event.recipientStockTransition || "3 → 18 SIMs";

  const displayDate = event.detailedDate || event.timeLabel;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Stock Event Details"
      description={subtitle}
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* HERO BANNER - MATCHES MOCKUPS FOR BOTH RETURN & DISTRIBUTED */}
        {isReturn ? (
          <div className="p-4 rounded-2xl bg-[#FEF3C7]/60 border border-[#FDE68A] flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
              <Undo2 className="w-5 h-5 text-[#D97706]" />
            </div>
            <div>
              <div className="font-bold text-sm text-[#92400E]">
                Stock Returned from AP
              </div>
              <div className="text-xs text-[#B45309] font-medium mt-0.5">
                {event.timeLabel}
              </div>
            </div>
          </div>
        ) : isDistributed ? (
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
              <Send className="w-5 h-5 text-blue-600 -rotate-12" />
            </div>
            <div>
              <div className="font-bold text-sm text-blue-600">
                Stock Distributed to AP
              </div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">
                {event.timeLabel}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
              <ArrowDownToLine className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-emerald-950">
                Stock Received from Admin
              </div>
              <div className="text-xs text-emerald-700 font-medium mt-0.5">
                {event.timeLabel}
              </div>
            </div>
          </div>
        )}

        {/* KEY-VALUE ROWS */}
        <div className="divide-y divide-slate-100 pt-1">
          {/* Event Type */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-500 font-medium">Event Type</span>
            <span
              className={`px-2.5 py-0.5 rounded-md font-semibold text-xs ${
                isReturn
                  ? "bg-[#FEF3C7] text-[#B45309]"
                  : isDistributed
                  ? "bg-blue-50 text-blue-600"
                  : "bg-emerald-50 text-emerald-700"
              }`}
            >
              {isReturn
                ? "Returned from AP"
                : isDistributed
                ? "Distributed to AP"
                : "Received from Super Admin"}
            </span>
          </div>

          {/* SIM Type */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-500 font-medium">SIM Type</span>
            <span className="font-bold text-slate-900">
              {event.simType} · {event.network}
            </span>
          </div>

          {/* Quantity */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-500 font-medium">Quantity</span>
            <span
              className={`font-bold text-xs ${
                event.qty > 0 ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {event.qty > 0 ? `+${event.qty}` : event.qty} units
            </span>
          </div>

          {/* From / To */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-500 font-medium">
              {isDistributed ? "To" : "From"}
            </span>
            <div className="text-right">
              <div className="font-bold text-slate-900">{apName}</div>
              <div className="text-[11px] text-slate-500 font-medium">
                {locationAndPhone}
              </div>
            </div>
          </div>

          {/* Return Reason (shown for return events) */}
          {isReturn && (
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">Return Reason</span>
              <span className="italic text-slate-700 text-right">
                {returnReason}
              </span>
            </div>
          )}

          {/* Stock Before */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-500 font-medium">Stock Before</span>
            <span className="font-medium text-slate-900">{stockBefore}</span>
          </div>

          {/* Returned / Distributed */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-500 font-medium">
              {isReturn ? "Returned" : isDistributed ? "Distributed" : "Received"}
            </span>
            <span
              className={`font-bold ${
                event.qty > 0 ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {quantityChangedText}
            </span>
          </div>

          {/* Stock After */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-500 font-medium">Stock After</span>
            <span className="font-black text-slate-900">{stockAfter}</span>
          </div>

          {/* Francis After (or {apFirstName} After) - shown for distributed events */}
          {isDistributed && (
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-slate-500 font-medium">
                {apFirstName} After
              </span>
              <span className="font-bold text-emerald-600">
                {recipientTransition}
              </span>
            </div>
          )}

          {/* Date */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-500 font-medium">Date</span>
            <span className="font-medium text-slate-900">{displayDate}</span>
          </div>
        </div>

        {/* FOOTER ACTIONS - MATCHES MOCKUPS */}
        <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
          {isReturn || isDistributed ? (
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onViewApProfile?.(apName);
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>View AP Profile</span>
              <span className="text-sm leading-none">→</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-8 py-2.5 rounded-xl text-xs font-bold text-white transition-all active:scale-[0.98] hover:opacity-95 shadow-xs"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}


