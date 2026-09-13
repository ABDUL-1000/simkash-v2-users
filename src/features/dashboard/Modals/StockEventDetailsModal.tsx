import { Download, Send, ArrowLeft, Settings } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { useNavigate } from "react-router-dom";

export interface StockEventDetails {
  eventRef?: string;
  eventType: "Received from RM" | "Distributed to AP" | "Recalled by RM" | "Adjustment";
  simType: string;
  network?: string;
  quantity: string; // e.g. "+50 units" or "-15 units"
  from?: string;
  to?: string;
  toDetails?: string;
  recalledBy?: string;
  adjustedBy?: string;
  requestRef?: string;
  reason?: string;
  stockBefore: string;
  deltaQty: string;
  stockAfter: string;
  recipientAfter?: string;
  date: string;
}

interface StockEventDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventData?: StockEventDetails | null;
}

export function StockEventDetailsModal({
  open,
  onOpenChange,
  eventData,
}: StockEventDetailsModalProps) {
  const navigate = useNavigate();

  // Default sample fallback if none provided
  const defaultEvent: StockEventDetails = {
    eventRef: "STOCK-2026-001247",
    eventType: "Received from RM",
    simType: "POS SIM • Multiple Networks",
    network: "MTN 30 • Airtel 15 • Glo 5",
    quantity: "+50 units",
    from: "Yusuf Adam Baba (RM)",
    requestRef: "REQ-2026-00847",
    stockBefore: "17 POS SIMs",
    deltaQty: "+50 POS SIMs",
    stockAfter: "67 POS SIMs",
    date: "Today • 10:30:00 AM",
  };

  const active = eventData || defaultEvent;
  const isPositive = active.quantity.startsWith("+");

  // Determine top card styling & icon based on eventType
  const getHeaderConfig = () => {
    switch (active.eventType) {
      case "Received from RM":
        return {
          title: "Stock Received from RM",
          bg: "bg-[#EBFFF8] border-[#10B981]/20 text-[#10B981]",
          icon: Download,
          badgeBg: "bg-[#EBFFF8] text-[#10B981]",
          buttonBg: "bg-[#10B981] hover:bg-emerald-600 text-white",
        };
      case "Distributed to AP":
        return {
          title: "Stock Distributed to AP",
          bg: "bg-[#EFF4F8] border-[#2563EB]/20 text-[#2563EB]",
          icon: Send,
          badgeBg: "bg-[#EFF4F8] text-[#2563EB]",
          buttonBg: "bg-[#2563EB] hover:bg-blue-700 text-white",
        };
      case "Recalled by RM":
        return {
          title: "Stock Recalled by RM",
          bg: "bg-[#FFF7F8] border-[#EF4444]/20 text-[#EF4444]",
          icon: ArrowLeft,
          badgeBg: "bg-[#FFF7F8] text-[#EF4444]",
          buttonBg: "bg-[#10B981] hover:bg-emerald-600 text-white",
        };
      case "Adjustment":
      default:
        return {
          title: "Stock Adjustment",
          bg: "bg-[#F8FAFC] border-[#E2ECF6] text-[#0F152A]",
          icon: Settings,
          badgeBg: "bg-[#F8FAFC] border border-[#E2ECF6] text-[#8C909B]",
          buttonBg: "bg-[#10B981] hover:bg-emerald-600 text-white",
        };
    }
  };

  const header = getHeaderConfig();
  const HeaderIcon = header.icon;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Stock Event Details"
      description={active.eventType}
      size="md"
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Top Header Card */}
        <div className={`rounded-2xl border p-4 flex items-center gap-3 ${header.bg}`}>
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/80 shadow-xs">
            <HeaderIcon className="size-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm text-[#0F152A]">
              {header.title}
            </h4>
            <p className="text-[11px] font-medium text-[#66738C]">
              {active.date}
            </p>
          </div>
        </div>

        {/* Details Table List */}
        <div className="divide-y divide-[#E2ECF6]">
          {active.eventRef && (
            <div className="flex justify-between py-2.5 first:pt-0">
              <span className="text-[#8C909B]">Event Ref</span>
              <span className="font-mono font-bold text-[#0F152A]">
                {active.eventRef}
              </span>
            </div>
          )}

          <div className="flex justify-between py-2.5">
            <span className="text-[#8C909B]">Event Type</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${header.badgeBg}`}
            >
              {active.eventType}
            </span>
          </div>

          <div className="flex justify-between py-2.5">
            <span className="text-[#8C909B]">SIM Type</span>
            <span className="font-extrabold text-[#0F152A]">{active.simType}</span>
          </div>

          {active.network && (
            <div className="flex justify-between py-2.5">
              <span className="text-[#8C909B]">Networks</span>
              <span className="font-bold text-[#0F152A]">{active.network}</span>
            </div>
          )}

          <div className="flex justify-between py-2.5">
            <span className="text-[#8C909B]">Quantity</span>
            <span
              className={`font-black ${
                isPositive ? "text-[#10B981]" : "text-[#EF4444]"
              }`}
            >
              {active.quantity}
            </span>
          </div>

          {active.from && (
            <div className="flex justify-between py-2.5">
              <span className="text-[#8C909B]">From</span>
              <span className="font-bold text-[#0F152A]">{active.from}</span>
            </div>
          )}

          {active.to && (
            <div className="flex justify-between py-2.5">
              <span className="text-[#8C909B]">To</span>
              <div className="text-right">
                <span className="font-bold text-[#0F152A]">{active.to}</span>
                {active.toDetails && (
                  <p className="text-[10px] text-[#8C909B]">{active.toDetails}</p>
                )}
              </div>
            </div>
          )}

          {active.recalledBy && (
            <div className="flex justify-between py-2.5">
              <span className="text-[#8C909B]">Recalled By</span>
              <span className="font-bold text-[#0F152A]">{active.recalledBy}</span>
            </div>
          )}

          {active.adjustedBy && (
            <div className="flex justify-between py-2.5">
              <span className="text-[#8C909B]">Adjusted By</span>
              <span className="font-bold text-[#0F152A]">{active.adjustedBy}</span>
            </div>
          )}

          {active.requestRef && (
            <div className="flex justify-between py-2.5">
              <span className="text-[#8C909B]">Request Ref</span>
              <span className="font-mono font-bold text-[#0F152A]">
                {active.requestRef}
              </span>
            </div>
          )}

          {active.reason && (
            <div className="flex justify-between py-2.5">
              <span className="text-[#8C909B]">Reason</span>
              <span className="italic font-medium text-[#66738C]">
                {active.reason}
              </span>
            </div>
          )}

          <div className="flex justify-between py-2.5">
            <span className="text-[#8C909B]">Stock Before</span>
            <span className="font-bold text-[#0F152A]">{active.stockBefore}</span>
          </div>

          <div className="flex justify-between py-2.5">
            <span className="text-[#8C909B]">
              {active.eventType === "Distributed to AP"
                ? "Distributed"
                : active.eventType === "Recalled by RM"
                ? "Recalled"
                : active.eventType === "Adjustment"
                ? "Adjustment"
                : "This Batch"}
            </span>
            <span
              className={`font-black ${
                isPositive ? "text-[#10B981]" : "text-[#EF4444]"
              }`}
            >
              {active.deltaQty}
            </span>
          </div>

          <div className="flex justify-between py-2.5">
            <span className="text-[#8C909B]">Stock After</span>
            <span className="font-black text-[#0F152A]">{active.stockAfter}</span>
          </div>

          {active.recipientAfter && (
            <div className="flex justify-between py-2.5">
              <span className="text-[#8C909B]">Francis After</span>
              <span className="font-bold text-[#10B981]">
                {active.recipientAfter}
              </span>
            </div>
          )}

          <div className="flex justify-between py-2.5">
            <span className="text-[#8C909B]">Date</span>
            <span className="font-bold text-[#0F152A]">{active.date}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          {active.eventType === "Distributed to AP" ? (
            <>
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  navigate("/distribution/agency-partner");
                }}
                className="text-xs font-extrabold text-[#2563EB] hover:underline"
              >
                View AP Profile
              </button>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={`rounded-xl px-6 py-2.5 text-xs font-bold ${header.buttonBg}`}
              >
                Close
              </button>
            </>
          ) : (
            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className={`w-full rounded-xl py-2.5 text-xs font-bold ${header.buttonBg}`}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </AppModal>
  );
}
