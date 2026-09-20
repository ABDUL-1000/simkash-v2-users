import { useState } from "react";
import { AlertCircle, Trash2 } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface RemoveFromNetworkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  onConfirmRemove?: (apName: string) => void;
}

export function RemoveFromNetworkModal({
  open,
  onOpenChange,
  apName = "Rabiu Sani",
  onConfirmRemove,
}: RemoveFromNetworkModalProps) {
  const [loading, setLoading] = useState(false);

  const handleRemove = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      onConfirmRemove?.(apName);
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
        {/* Red Circular Trash Icon Container (Matching Image 4) */}
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#FFF1F2] text-[#EF4444] shadow-xs">
          <Trash2 className="size-8 text-[#EF4444]" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h2 className="text-xl font-black text-[#0F152A]">Remove from Network?</h2>
          <p className="text-xs font-semibold text-[#66738C] leading-relaxed max-w-xs mx-auto">
            Are you sure you want to remove {apName} from the network? This is an
            extreme action and cannot be undone.
          </p>
        </div>

        {/* Red Irreversible Warning Box (Matching Image 4) */}
        <div className="rounded-2xl border border-[#FECDD3] bg-[#FFF1F2] p-3 text-xs text-[#EF4444] font-extrabold flex items-center justify-center gap-2">
          <AlertCircle className="size-4 shrink-0 text-[#EF4444]" />
          <span>This action is irreversible. All data will be lost.</span>
        </div>

        {/* Action Buttons (Matching Image 4) */}
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
              onClick={handleRemove}
              disabled={loading}
              className="rounded-xl bg-[#DC2626] py-3 text-xs font-bold text-white shadow-xs hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
