import { useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import type { StateCoordinatorItem } from "../types/regional-manager.types";

interface ReactivateScModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sc?: StateCoordinatorItem | null;
  onSuccess?: (scName: string) => void;
}

export function ReactivateScModal({
  open,
  onOpenChange,
  sc,
  onSuccess,
}: ReactivateScModalProps) {
  const scName = sc?.name || "Ngozi Adeyemi";
  const scState = sc?.state || "Delta";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReactivate = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.(scName);
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Reactivate State Coordinator"
      description={`Restore network active status for ${scName}`}
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Info card */}
        <div
          className="rounded-2xl border p-4 text-center space-y-2"
          style={{
            borderColor: APP_COLORS.greens.green,
            backgroundColor: APP_COLORS.greens.light,
          }}
        >
          <div
            className="mx-auto flex size-12 items-center justify-center rounded-full"
            style={{
              backgroundColor: APP_COLORS.backgrounds.background,
              color: APP_COLORS.greens.green,
            }}
          >
            <ShieldCheck className="size-6 stroke-[2.2]" />
          </div>
          <h4 className="text-sm font-bold" style={{ color: APP_COLORS.texts.primary }}>
            Reactivate {scName} ({scState})
          </h4>
          <p className="text-xs leading-relaxed max-w-sm mx-auto" style={{ color: APP_COLORS.texts.slate }}>
            Reactivating this account will grant full access back to portal tools, inventory requests, and commission payouts for all linked Agency Partners.
          </p>
        </div>

        {/* Action Checkpoints */}
        <div
          className="rounded-xl border p-3.5 space-y-2 text-xs"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4" style={{ color: APP_COLORS.greens.green }} />
            <span style={{ color: APP_COLORS.texts.primary }}>Re-enable SIM inventory transfers</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4" style={{ color: APP_COLORS.greens.green }} />
            <span style={{ color: APP_COLORS.texts.primary }}>Unfreeze commission accruals</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4" style={{ color: APP_COLORS.greens.green }} />
            <span style={{ color: APP_COLORS.texts.primary }}>Send SMS/Email reactivation notice</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="flex items-center justify-end gap-3 pt-3 border-t"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-semibold transition hover:opacity-80 cursor-pointer"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleReactivate}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer"
            style={{ backgroundColor: APP_COLORS.greens.secondary }}
          >
            {isSubmitting ? "Reactivating..." : "Confirm Reactivation"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default ReactivateScModal;
