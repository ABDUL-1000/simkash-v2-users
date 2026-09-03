import { Calendar, Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface EasyBuyInstalmentsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
  depositAmount?: number;
  monthlyAmount?: number;
  months?: number;
  totalAmount?: number;
}

export function EasyBuyInstalmentsModal({
  open,
  onOpenChange,
  depositAmount = 36999,
  monthlyAmount = 29600,
  months = 5,
  totalAmount = 184999,
}: EasyBuyInstalmentsModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="EasyBuy — Pay in Instalments"
      description="Personal segment · 0% interest"
      size="md"
    >
      <div className="space-y-4 pt-1">
        {/* Top Header Card */}
        <div className="rounded-2xl border border-[#2563EB] bg-[#EFF4F8] p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB]">
            <Calendar className="size-4" />
            <span>EasyBuy Payment Plan</span>
          </div>

          <h3 className="text-xl font-extrabold text-[#0F152A]">
            ₦{depositAmount.toLocaleString()} deposit + ₦{monthlyAmount.toLocaleString()} × {months} months
          </h3>

          <span className="inline-block rounded-md bg-[#2563EB] px-2.5 py-0.5 text-xs font-extrabold text-white">
            0% Interest
          </span>
        </div>

        {/* Breakdown Table */}
        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
          <div className="flex justify-between py-2 first:pt-0">
            <span className="text-[#66738C]">Deposit today</span>
            <span className="font-extrabold text-[#0F152A]">₦{depositAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#66738C]">Monthly</span>
            <span className="font-extrabold text-[#0F152A]">₦{monthlyAmount.toLocaleString()} × {months} months</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[#66738C]">Total</span>
            <span className="font-extrabold text-[#0F152A]">₦{totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 last:pb-0 font-bold">
            <span className="text-[#66738C]">Interest</span>
            <span className="text-[#10B981]">0%</span>
          </div>
        </div>

        <div className="rounded-2xl bg-[#EBFFF8] p-3 text-xs text-[#10B981] font-semibold flex items-center gap-2">
          <Check className="size-4 shrink-0 stroke-[3]" />
          <span>No credit check required. Automated monthly wallet debiting.</span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Got It
          </button>
        </div>
      </div>
    </AppModal>
  );
}
