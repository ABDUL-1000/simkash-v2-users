import { AlertTriangle, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ConfirmSuspendApModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  onConfirm?: () => void;
}

export function ConfirmSuspendApModal({
  open,
  onOpenChange,
  apName = "Rabiu Sani",
  onConfirm,
}: ConfirmSuspendApModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
    >
      <div className="space-y-4 text-center pt-2 text-xs">
        {/* Red Icon */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#FFF7F8] text-[#EF4444]">
          <AlertTriangle className="size-8 text-[#EF4444]" />
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#0F152A]">Suspend AP?</h2>
          <p className="text-xs text-[#8C909B] mt-1 px-2">
            Are you sure you want to suspend {apName}? They will not be able to perform transactions.
          </p>
        </div>

        {/* Amber Notice Box */}
        <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3.5 text-[#D9990D] font-bold flex items-center justify-center gap-2">
          <Info className="size-4 shrink-0 text-[#D9990D]" />
          <span>You can reactivate this AP later from the profile.</span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] bg-white py-2.5 text-xs font-bold text-[#0F152A] hover:bg-[#F8FAFC]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm?.();
              onOpenChange(false);
            }}
            className="rounded-xl bg-[#EF4444] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-red-600"
          >
            Suspend AP
          </button>
        </div>
      </div>
    </AppModal>
  );
}
