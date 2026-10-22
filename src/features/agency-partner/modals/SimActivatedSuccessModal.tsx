import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { ActivateSimResponseData } from "../types/api";

interface SimActivatedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Response from POST /partner/device-sim/activate. */
  data?: ActivateSimResponseData | null;
  onActivateAnother?: () => void;
  onDone?: () => void;
}

export function SimActivatedSuccessModal({
  open,
  onOpenChange,
  data,
  onActivateAnother,
  onDone,
}: SimActivatedSuccessModalProps) {
  const handleDone = () => {
    onOpenChange(false);
    onDone?.();
  };

  const handleAnother = () => {
    onOpenChange(false);
    onActivateAnother?.();
  };

  return (
    <AppModal
      open={open && Boolean(data)}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      showCloseButton={true}
    >
      {data && <div className="flex flex-col items-center text-center pt-2 space-y-4 text-xs">
        {/* Soft Green Circular Checkmark Icon (Matching Image 4) */}
        <div className="flex size-16 items-center justify-center rounded-full bg-[#10B981] text-white shadow-xs">
          <Check className="size-9 stroke-[3]" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-[#0F152A]">SIM Activated!</h2>
          <p className="text-xs font-semibold text-[#66738C] max-w-xs mx-auto">
            {data.customer.fullname}'s {data.type_label} is now active on {data.network}
          </p>
        </div>

        {/* Receipt Summary Card (Matching Image 4) */}
        <div className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-left space-y-2 divide-y divide-[#E2ECF6]">
          <div className="flex justify-between py-1 first:pt-0">
            <span className="text-[#8C909B] font-medium">SIM Number</span>
            <span className="font-bold text-[#0F152A] font-mono">{data.sim_number}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#8C909B] font-medium">Phone</span>
            <span className="font-bold text-[#0F152A] font-mono">{data.customer.phone}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#8C909B] font-medium">Network</span>
            <span className="font-bold text-[#0F152A]">{data.network}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#8C909B] font-medium">Charged</span>
            <span className="font-bold text-[#0F152A]">₦{data.amount_debited.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#8C909B] font-medium">Expires</span>
            <span className="font-bold text-[#0F152A]">{new Date(data.expired_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
          <div className="flex justify-between py-1 last:pb-0">
            <span className="text-[#8C909B] font-medium">Reference</span>
            <span className="font-bold text-[#0F152A] font-mono break-all text-right">{data.transaction_reference}</span>
          </div>
        </div>

        {/* Commission Wallet Credit Box (Matching Image 4) */}
        <div className="w-full rounded-2xl border border-[#10B981]/20 bg-[#EBFFF8] p-3 text-xs text-[#0F152A] font-bold flex items-center justify-center gap-2">
          <span>Commission: ₦{data.partner_commission_earned.toLocaleString()} earned</span>
        </div>

        {/* Action Buttons (Matching Image 4) */}
        <div className="w-full pt-3 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleAnother}
              className="rounded-xl bg-[#F1F5F9] py-3 text-xs font-bold text-[#66738C] hover:bg-[#E2ECF6] transition"
            >
              Activate Another
            </button>
            <button
              type="button"
              onClick={handleDone}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>}
    </AppModal>
  );
}
