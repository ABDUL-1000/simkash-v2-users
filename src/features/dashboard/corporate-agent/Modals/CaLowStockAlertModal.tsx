import { AlertTriangle, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface CaLowStockAlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestStockNow?: () => void;
  onRemindTomorrow?: () => void;
}

export function CaLowStockAlertModal({
  open,
  onOpenChange,
  onRequestStockNow,
  onRemindTomorrow,
}: CaLowStockAlertModalProps) {
  const stockBreakdown = [
    { label: "POS SIM", count: 40, color: "#D97706" },
    { label: "CCTV SIM", count: 25, color: "#10B981" },
    { label: "GPS SIM", count: 15, color: "#D97706" },
    { label: "Router SIM", count: 7, isCritical: true },
  ];

  const supplyRunout = [
    { label: "POS SIM", estimate: "~4 days", color: "#DC2626" },
    { label: "CCTV SIM", estimate: "~12 days", color: "#D97706" },
    { label: "GPS SIM", estimate: "~8 days", color: "#D97706" },
    { label: "Router SIM", estimate: "~3 days", color: "#DC2626" },
  ];

  const handleRequestNow = () => {
    onOpenChange(false);
    onRequestStockNow?.();
  };

  const handleRemind = () => {
    onOpenChange(false);
    onRemindTomorrow?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1">
        {/* MODAL HEADER */}
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-bold text-amber-600">Low Stock Alert</h2>
        </div>

        {/* WARNING BANNER */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60 space-y-1">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Your stock is running low</span>
          </div>
          <p className="text-xs text-slate-600 pl-6 leading-relaxed">
            You have 87 SIMs remaining. Your minimum order is 100 SIMs — request now to
            maintain supply.
          </p>
        </div>

        {/* STOCK BREAKDOWN */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Stock Breakdown
          </span>
          <div
            className="rounded-xl border divide-y overflow-hidden bg-white text-xs"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            {stockBreakdown.map((item) => (
              <div
                key={item.label}
                className="px-3.5 py-2.5 flex items-center justify-between"
              >
                <span className="font-semibold text-slate-700">{item.label}</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className="font-black"
                    style={{ color: item.isCritical ? "#DC2626" : item.color }}
                  >
                    {item.count}
                  </span>
                  {item.isCritical && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-0.5">
                      Critical <AlertTriangle className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ESTIMATED SUPPLY RUN-OUT */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
            Estimated Supply Run-out
          </span>
          <div
            className="rounded-xl border divide-y overflow-hidden bg-white text-xs"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            {supplyRunout.map((item) => (
              <div
                key={item.label}
                className="px-3.5 py-2.5 flex items-center justify-between"
              >
                <span className="font-semibold text-slate-700">{item.label}</span>
                <span className="font-black" style={{ color: item.color }}>
                  {item.estimate}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RATE CONCLUSION */}
        <div className="text-center">
          <p className="text-xs font-bold text-amber-600">
            At this rate you&apos;ll need to reorder in 3 days.
          </p>
        </div>

        {/* MINIMUM ORDER NOTICE */}
        <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center gap-2 text-xs text-blue-900 font-semibold">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Minimum order: 100 SIMs total</span>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleRemind}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Remind me tomorrow
          </button>

          <button
            type="button"
            onClick={handleRequestNow}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95"
            style={{ backgroundColor: "#EA580C" }}
          >
            Request Stock Now
          </button>
        </div>
      </div>
    </AppModal>
  );
}
