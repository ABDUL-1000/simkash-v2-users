import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface StockRequestSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestRef?: string;
  totalUnits: number;
  urgency: string;
  scName?: string;
  onDone?: () => void;
}

export function StockRequestSuccessModal({
  open,
  onOpenChange,
  requestRef = "REQ-2026-00848",
  totalUnits,
  urgency,
  scName = "Aminat Okafor (SC)",
  onDone,
}: StockRequestSuccessModalProps) {
  const handleDone = () => {
    onOpenChange(false);
    onDone?.();
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      description=""
      size="md"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center pt-2 space-y-4">
        {/* Soft Green Checkmark Icon Container */}
        <div className="flex size-20 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981] shadow-xs">
          <Check className="size-10 stroke-[3]" />
        </div>

        {/* Header Text */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#0F152A]">Stock Request Submitted!</h2>
          <p className="text-xs font-medium text-[#66738C] max-w-sm mx-auto">
            Your request has been submitted and sent to {scName} for approval and distribution.
          </p>
        </div>

        {/* Receipt Details Card */}
        <div className="w-full divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-left text-xs">
          <div className="flex items-center justify-between py-2.5 first:pt-0">
            <span className="text-[#8C909B] font-medium">Request Ref</span>
            <span className="font-mono font-bold text-[#0F152A]">{requestRef}</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B] font-medium">Total Quantity</span>
            <span className="font-bold text-[#10B981]">{totalUnits} SIMs</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B] font-medium">Urgency Level</span>
            <span className="font-bold text-[#2563EB]">{urgency}</span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="text-[#8C909B] font-medium">Recipient</span>
            <span className="font-bold text-[#0F152A]">{scName}</span>
          </div>

          <div className="flex items-center justify-between py-2.5 last:pb-0">
            <span className="text-[#8C909B] font-medium">Avg. Fulfilment Time</span>
            <span className="font-bold text-[#0F152A]">4–8 hours</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full pt-2">
          <button
            type="button"
            onClick={handleDone}
            className="w-full rounded-xl bg-[#10B981] py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#059669]"
            style={{ backgroundColor: APP_COLORS.greens.green }}
          >
            Back to Available SIMs
          </button>
        </div>
      </div>
    </AppModal>
  );
}
