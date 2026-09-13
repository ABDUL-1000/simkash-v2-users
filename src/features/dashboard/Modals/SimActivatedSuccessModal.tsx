import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { ActivationFormData } from "./QuickActivateSimModal";

interface SimActivatedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: ActivationFormData | null;
  onActivateAnother?: () => void;
  onDone?: () => void;
}

export function SimActivatedSuccessModal({
  open,
  onOpenChange,
  data = {
    iccid: "8986 0000 1234 5678",
    customerName: "Chidi Eze",
    phone: "08012345678",
    network: "MTN",
    plan: "Standard 30-Day",
    cost: "₦2,000",
  },
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
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center pt-2 space-y-4 text-xs">
        {/* Soft Green Circular Checkmark Icon (Matching Image 4) */}
        <div className="flex size-16 items-center justify-center rounded-full bg-[#10B981] text-white shadow-xs">
          <Check className="size-9 stroke-[3]" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-2xl font-extrabold text-[#0F152A]">SIM Activated!</h2>
          <p className="text-xs font-semibold text-[#66738C] max-w-xs mx-auto">
            {data?.customerName || "Chidi Eze"}'s SIM is now active on {data?.network || "MTN"}
          </p>
        </div>

        {/* Receipt Summary Card (Matching Image 4) */}
        <div className="w-full rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-left space-y-2 divide-y divide-[#E2ECF6]">
          <div className="flex justify-between py-1 first:pt-0">
            <span className="text-[#8C909B] font-medium">SIM Number</span>
            <span className="font-bold text-[#0F152A] font-mono">
              {data?.iccid ? `${data.iccid.slice(0, 4)}...${data.iccid.slice(-4)}` : "8986...1234"}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#8C909B] font-medium">Phone</span>
            <span className="font-bold text-[#0F152A] font-mono">
              {data?.phone || "08012345678"}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#8C909B] font-medium">Network</span>
            <span className="font-bold text-[#0F152A]">{data?.network || "MTN"}</span>
          </div>
          <div className="flex justify-between py-1 last:pb-0">
            <span className="text-[#8C909B] font-medium">Plan</span>
            <span className="font-bold text-[#0F152A]">{data?.plan || "Standard 30-Day"}</span>
          </div>
        </div>

        {/* Commission Wallet Credit Box (Matching Image 4) */}
        <div className="w-full rounded-2xl border border-[#10B981]/20 bg-[#EBFFF8] p-3 text-xs text-[#0F152A] font-bold flex items-center justify-center gap-2">
          <span>Commission: ₦1,000 will be credited to your wallet</span>
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
      </div>
    </AppModal>
  );
}
