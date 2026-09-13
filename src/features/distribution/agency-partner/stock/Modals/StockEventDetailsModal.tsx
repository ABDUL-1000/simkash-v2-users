import { ArrowRight, Package, Smartphone, SlidersHorizontal } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { StockEventItem } from "../types/stock.types";
import { APP_COLORS } from "@/constants/colors";
import { useNavigate } from "react-router-dom";

interface StockEventDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: StockEventItem | null;
}

export function StockEventDetailsModal({
  open,
  onOpenChange,
  event,
}: StockEventDetailsModalProps) {
  const navigate = useNavigate();

  if (!event) return null;

  const isReceived = event.eventType === "Received";
  const isUsed = event.eventType === "Used";
  const isAdjusted = event.eventType === "Adjusted";

  const handleViewActivation = () => {
    onOpenChange(false);
    navigate(`/sim-activation`);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Stock Event Details"
      description={
        isReceived
          ? `Stock Received · ${event.fullDate?.split("·")[0] || event.date}`
          : isUsed
          ? "SIM Used · Activation"
          : "Stock Adjustment"
      }
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Top Banner Card */}
        {isReceived && (
          <div className="flex items-center gap-3 rounded-2xl border border-[#10B981]/20 bg-[#EBFFF8] p-3.5 text-[#10B981]">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-xs">
              <Package className="size-5 text-[#10B981]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F152A]">Stock Received from SC</h4>
              <p className="text-[11px] font-medium text-[#66738C]">{event.fullDate || event.date}</p>
            </div>
          </div>
        )}

        {isUsed && (
          <div className="flex items-center gap-3 rounded-2xl border border-[#2563EB]/20 bg-[#EFF6FF] p-3.5 text-[#2563EB]">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-xs">
              <Smartphone className="size-5 text-[#2563EB]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F152A]">SIM Activated</h4>
              <p className="text-[11px] font-medium text-[#66738C]">{event.fullDate || event.date}</p>
            </div>
          </div>
        )}

        {isAdjusted && (
          <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-[#0F152A]">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white shadow-xs">
              <SlidersHorizontal className="size-5 text-[#66738C]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F152A]">Stock Adjustment</h4>
              <p className="text-[11px] font-medium text-[#66738C]">{event.fullDate || event.date}</p>
            </div>
          </div>
        )}

        {/* Key-Value Details */}
        <div className="divide-y divide-[#E2ECF6] text-xs">
          <div className="flex items-center justify-between py-2.5 first:pt-0">
            <span className="text-[#8C909B]">Event Ref</span>
            <span className="font-mono font-bold text-[#0F152A]">{event.eventRef}</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Event Type</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                isReceived
                  ? "bg-[#EBFFF8] text-[#10B981]"
                  : isUsed
                  ? "bg-[#EFF6FF] text-[#2563EB]"
                  : "bg-[#F1F5F9] text-[#64748B]"
              }`}
            >
              {isReceived ? "Stock Received" : isUsed ? "SIM Used" : "Stock Adjustment"}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">SIM Type</span>
            <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[11px] font-bold text-[#2563EB]">
              {event.simType}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Network</span>
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-black ${
                event.network === "MTN"
                  ? "bg-[#FFFBEB] text-[#854D0E]"
                  : event.network === "Airtel"
                  ? "bg-[#FFF1F2] text-[#991B1B]"
                  : event.network === "Glo"
                  ? "bg-[#F0FDF4] text-[#065F46]"
                  : "bg-[#EFF6FF] text-[#1E40AF]"
              }`}
            >
              {event.network}
            </span>
          </div>

          {/* Used Specific Details */}
          {isUsed && (
            <>
              {event.simNumber && (
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-[#8C909B]">SIM Number</span>
                  <span className="font-mono font-bold text-[#0F152A]">{event.simNumber}</span>
                </div>
              )}
              {event.customer && (
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-[#8C909B]">Customer</span>
                  <span className="font-bold text-[#0F152A]">{event.customer}</span>
                </div>
              )}
            </>
          )}

          {/* Received Specific Details */}
          {isReceived && (
            <>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[#8C909B]">Quantity</span>
                <span className="font-black text-[#10B981]">+{event.quantity} units</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[#8C909B]">From</span>
                <span className="font-bold text-[#0F152A]">{event.fromTo.replace("From: ", "")}</span>
              </div>
              {event.requestRef && (
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-[#8C909B]">Request Ref</span>
                  <span className="font-mono font-bold text-[#0F152A]">{event.requestRef}</span>
                </div>
              )}
            </>
          )}

          {/* Adjusted Specific Details */}
          {isAdjusted && (
            <>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-[#8C909B]">Quantity</span>
                <span className="font-black text-[#10B981]">+{event.quantity} units</span>
              </div>
              {event.notes && (
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-[#8C909B]">Reason</span>
                  <span className="font-medium italic text-[#66738C]">{event.notes}</span>
                </div>
              )}
            </>
          )}

          {/* Stock Balances */}
          {event.stockBefore && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">Stock Before</span>
              <span className="font-bold text-[#0F152A]">{event.stockBefore}</span>
            </div>
          )}

          {isReceived && event.deltaQty && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">This Batch</span>
              <span className="font-black text-[#10B981]">{event.deltaQty}</span>
            </div>
          )}

          {isUsed && event.deltaQty && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">This Use</span>
              <span className="font-black text-[#EF4444]">{event.deltaQty}</span>
            </div>
          )}

          {isAdjusted && event.deltaQty && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">Adjustment</span>
              <span className="font-black text-[#10B981]">{event.deltaQty}</span>
            </div>
          )}

          {event.stockAfter && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">Stock After</span>
              <span className="font-black text-[#0F152A]">{event.stockAfter}</span>
            </div>
          )}

          {isUsed && event.commission && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">Commission</span>
              <span className="font-black text-[#10B981]">{event.commission}</span>
            </div>
          )}

          {isUsed && event.activationRef && (
            <div className="flex items-center justify-between py-2.5">
              <span className="text-[#8C909B]">Activation Ref</span>
              <span className="font-mono font-bold text-[#0F152A]">{event.activationRef}</span>
            </div>
          )}

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B]">Date</span>
            <span className="font-bold text-[#0F152A]">{event.fullDate || event.date}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-[#E2ECF6]">
          {isUsed && (
            <button
              type="button"
              onClick={handleViewActivation}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-[#2563EB] bg-white py-3 text-xs font-bold text-[#2563EB] transition hover:bg-[#EFF6FF]"
            >
              View Activation <ArrowRight className="size-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl bg-[#10B981] py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#059669]"
            style={{ backgroundColor: APP_COLORS.greens.green }}
          >
            Close
          </button>
        </div>
      </div>
    </AppModal>
  );
}
