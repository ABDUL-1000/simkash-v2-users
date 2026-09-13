import { AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface LowSimStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  remainingStock?: number;
  stockBreakdown?: { network: string; count: number; badgeColor: string }[];
  onRequestRestock?: () => void;
  onRemindLater?: () => void;
}

export function LowSimStockModal({
  open,
  onOpenChange,
  remainingStock = 3,
  stockBreakdown = [
    { network: "MTN", count: 1, badgeColor: "bg-[#FFF7F8] text-[#EF4444]" },
    { network: "Airtel", count: 2, badgeColor: "bg-[#FFFBEB] text-[#D9990D]" },
    { network: "Glo", count: 0, badgeColor: "bg-[#FFF7F8] text-[#EF4444]" },
  ],
  onRequestRestock,
  onRemindLater,
}: LowSimStockModalProps) {
  const handleRestock = () => {
    onOpenChange(false);
    onRequestRestock?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center pt-2 space-y-4 text-xs">
        {/* Amber Circular Warning Triangle Container (Matching Image 4) */}
        <div className="flex size-16 items-center justify-center rounded-full bg-[#F59E0B] text-white shadow-xs">
          <AlertTriangle className="size-8 stroke-[2.5]" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-[#0F152A]">Low SIM Stock</h2>
          <p className="text-xs font-semibold text-[#66738C] max-w-xs mx-auto leading-relaxed">
            You have only {remainingStock} SIMs remaining. Restock now to continue activating customers.
          </p>
        </div>

        {/* Stock Breakdown Box (Matching Image 4) */}
        <div className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-left space-y-2.5 divide-y divide-[#E2ECF6]">
          {stockBreakdown.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-1.5 first:pt-0 last:pb-0 text-xs font-bold text-[#0F152A]"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`size-2 rounded-full ${
                    item.count === 0
                      ? "bg-[#EF4444]"
                      : item.count < 3
                      ? "bg-[#F59E0B]"
                      : "bg-[#10B981]"
                  }`}
                />
                <span>{item.network}</span>
              </div>
              <span
                className={`rounded-md px-2.5 py-0.5 text-[11px] font-black ${item.badgeColor}`}
              >
                {item.count} {item.count === 1 ? "SIM" : "SIMs"}
              </span>
            </div>
          ))}
        </div>

        {/* Warning Callout Box (Matching Image 4) */}
        <div className="w-full rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-xs text-[#EF4444] font-bold flex items-center justify-center gap-2">
          <AlertTriangle className="size-4 shrink-0 text-[#F59E0B]" />
          <span>
            Low stock affects your ability to activate new customers and earn commission
          </span>
        </div>

        {/* Action Buttons (Matching Image 4) */}
        <div className="w-full pt-3 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onRemindLater?.();
              }}
              className="rounded-xl bg-[#F1F5F9] py-3 text-xs font-bold text-[#66738C] hover:bg-[#E2ECF6] transition"
            >
              Remind Me Later
            </button>
            <button
              type="button"
              onClick={handleRestock}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              Request Restock
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
