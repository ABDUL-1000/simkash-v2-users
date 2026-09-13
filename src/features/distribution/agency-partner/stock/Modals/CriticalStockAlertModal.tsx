import { AlertTriangle, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface CriticalStockAlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestStockNow: () => void;
  scName?: string;
  scPhone?: string;
}

export function CriticalStockAlertModal({
  open,
  onOpenChange,
  onRequestStockNow,
  scName = "Aminat Okafor",
  scPhone = "08065942373",
}: CriticalStockAlertModalProps) {
  const handleRequestNow = () => {
    onOpenChange(false);
    onRequestStockNow();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title={
        <div className="flex items-center gap-2 text-[#0F152A]">
          <div className="flex size-7 items-center justify-center rounded-full bg-[#FFF1F2] text-[#EF4444]">
            <AlertTriangle className="size-4" />
          </div>
          <span>Critical Stock Alert</span>
        </div>
      }
      description=""
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Top Critical Banner Card */}
        <div className="rounded-2xl border border-[#FECACA] bg-[#FFF1F2] p-4 text-[#EF4444] space-y-1">
          <h4 className="text-sm font-black">CRITICAL: Router SIM almost out</h4>
          <p className="text-xs font-medium text-[#EF4444]/90">Only 4 Router SIMs remaining</p>
        </div>

        {/* STOCK SNAPSHOT */}
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Stock Snapshot
          </span>

          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0F152A]">POS SIM</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0F152A]">18</span>
                <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">
                  • Good
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0F152A]">CCTV SIM</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0F152A]">12</span>
                <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">
                  • Good
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0F152A]">GPS SIM</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#0F152A]">8</span>
                <span className="rounded-full bg-[#FFFBEB] px-2.5 py-0.5 text-[10px] font-bold text-[#D97706]">
                  • Low
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0F152A]">Router SIM</span>
              <div className="flex items-center gap-2">
                <span className="font-black text-[#EF4444]">4</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF1F2] px-2 py-0.5 text-[10px] font-bold text-[#EF4444]">
                  <AlertTriangle className="size-2.5" /> Critical
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Rate Banner */}
        <div className="flex items-start gap-2.5 rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#854D0E] font-medium leading-relaxed">
          <Info className="size-4 shrink-0 text-[#D97706] mt-0.5" />
          <span>
            At your current rate, Router SIM stock will run out in ~4 days. GPS SIM in ~8 days.
          </span>
        </div>

        {/* SC Contact Row */}
        <div className="flex items-center justify-between rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-3">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#2563EB]" />
            <span className="font-bold text-[#0F152A]">{scName}</span>
            <span className="text-[#8C909B]">· {scPhone}</span>
          </div>

          <a
            href={`tel:${scPhone}`}
            className="font-bold text-[#2563EB] hover:underline text-xs"
          >
            Contact SC
          </a>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl border border-[#CBD5E1] bg-white py-2.5 text-xs font-bold text-[#475569] transition hover:bg-[#F1F5F9]"
          >
            Remind Me Tomorrow
          </button>

          <button
            type="button"
            onClick={handleRequestNow}
            className="flex-1 rounded-xl bg-[#EF4444] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#DC2626]"
            style={{ backgroundColor: APP_COLORS.reds.red }}
          >
            Request Stock Now
          </button>
        </div>
      </div>
    </AppModal>
  );
}
