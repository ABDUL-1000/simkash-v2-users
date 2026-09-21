import { AppModal } from "@/components/common/AppModal";
import { Check } from "lucide-react";

interface RateUpdatedSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinatorName?: string;
  newRate?: number;
}

export function RateUpdatedSuccessModal({
  open,
  onOpenChange,
  coordinatorName = "Aminat Okafor",
  newRate = 10,
}: RateUpdatedSuccessModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
      footer={null}
    >
      <div className="py-2 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">Rate Updated!</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            {coordinatorName} now earns <strong>{newRate}%</strong> SC commission from her AP network
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200">
          <span>{coordinatorName} notified via SMS ✓</span>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </AppModal>
  );
}
export default RateUpdatedSuccessModal;
