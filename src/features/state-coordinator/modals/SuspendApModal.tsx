import { useState } from "react";
import { AlertCircle, AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface SuspendApModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  onConfirmSuspend?: (apName: string) => void;
}

export function SuspendApModal({
  open,
  onOpenChange,
  apName = "Rabiu Sani",
  onConfirmSuspend,
}: SuspendApModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSuspend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      onConfirmSuspend?.(apName);
    }, 300);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title=""
      size="sm"
    >
      <div className="space-y-4 pt-1 text-xs text-center">
        {/* Red Circular Icon Container (Matching Image 3) */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#FFF1F2] text-[#EF4444] shadow-xs">
          <AlertTriangle className="size-8 text-[#EF4444]" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-xl font-black text-[#0F152A]">Suspend AP?</h2>
          <p className="text-xs font-semibold text-[#66738C] leading-relaxed max-w-xs mx-auto">
            Are you sure you want to suspend {apName}? They will not be able to
            perform transactions.
          </p>
        </div>

        {/* Amber Info Alert Box (Matching Image 3) */}
        <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#D9990D] font-bold flex items-center justify-center gap-2">
          <AlertCircle className="size-4 shrink-0 text-[#D9990D]" />
          <span>You can reactivate this AP later from the profile.</span>
        </div>

        {/* Action Buttons (Matching Image 3) */}
        <div className="pt-2 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl border border-[#E2ECF6] bg-white py-3 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-[#F8FAFC] transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSuspend}
              disabled={loading}
              className="rounded-xl bg-[#DC2626] py-3 text-xs font-bold text-white shadow-xs hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Suspending..." : "Suspend AP"}
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
