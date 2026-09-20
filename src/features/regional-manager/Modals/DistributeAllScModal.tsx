import { useState } from "react";
import { Users } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface DistributeAllScModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (details: { perSc: number; totalDistributed: number }) => void;
}

const PRESET_AMOUNTS = [25, 50, 100, 150];

export function DistributeAllScModal({
  open,
  onOpenChange,
  onSuccess,
}: DistributeAllScModalProps) {
  const [simsPerSc, setSimsPerSc] = useState<number | string>(50);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeScCount = 11; // 11 active/eligible SCs excluding suspended
  const totalNeeded = (Number(simsPerSc) || 0) * activeScCount;
  const availableInventory = 1250;

  const handleConfirm = () => {
    if (totalNeeded <= 0 || totalNeeded > availableInventory) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.({
        perSc: Number(simsPerSc),
        totalDistributed: totalNeeded,
      });
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Distribute SIMs to All SCs"
      description="Evenly allocate stock across your active State Coordinator network"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Inventory vs Allocation Banner */}
        <div
          className="grid grid-cols-2 gap-3 rounded-2xl border p-3.5"
          style={{
            borderColor: APP_COLORS.greys.stroke,
            backgroundColor: APP_COLORS.backgrounds.surface,
          }}
        >
          <div>
            <span
              className="text-[10px] font-bold uppercase tracking-wider block"
              style={{ color: APP_COLORS.texts.slate }}
            >
              Available Stock
            </span>
            <span
              className="text-base font-black"
              style={{ color: APP_COLORS.greens.green }}
            >
              1,250 SIMs
            </span>
          </div>
          <div>
            <span
              className="text-[10px] font-bold uppercase tracking-wider block"
              style={{ color: APP_COLORS.texts.slate }}
            >
              Active Recipients
            </span>
            <span
              className="text-base font-black flex items-center gap-1.5"
              style={{ color: APP_COLORS.texts.primary }}
            >
              <Users className="size-4 text-blue-600" />
              {activeScCount} SCs
            </span>
          </div>
        </div>

        {/* Input SIMs per SC */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            SIMs to Allocate Per SC
          </label>
          <input
            type="number"
            value={simsPerSc}
            onChange={(e) => setSimsPerSc(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="e.g. 50"
            className="w-full rounded-2xl border p-3 text-sm font-semibold focus:outline-hidden transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.primary,
            }}
          />
        </div>

        {/* Quick Presets */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Quick Select
          </label>
          <div className="grid grid-cols-4 gap-2">
            {PRESET_AMOUNTS.map((amt) => {
              const isSelected = Number(simsPerSc) === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSimsPerSc(amt)}
                  className="rounded-full py-2 text-xs font-bold transition cursor-pointer text-center"
                  style={{
                    backgroundColor: isSelected
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.backgrounds.surface,
                    color: isSelected
                      ? APP_COLORS.texts.whiteFixed
                      : APP_COLORS.texts.primary,
                    border: `1px solid ${
                      isSelected
                        ? APP_COLORS.blues.interactiveCta
                        : APP_COLORS.greys.stroke
                    }`,
                  }}
                >
                  {amt} / SC
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculation Summary Box */}
        <div
          className="rounded-xl border p-3.5 space-y-1.5"
          style={{
            borderColor: APP_COLORS.blues.surfaceMid,
            backgroundColor: APP_COLORS.blues.surfaceLight,
          }}
        >
          <div className="flex justify-between items-center text-xs">
            <span style={{ color: APP_COLORS.blues.primary }}>Total SIMs to Dispatch:</span>
            <span className="font-black text-sm" style={{ color: APP_COLORS.blues.interactiveCta }}>
              {totalNeeded} SIMs
            </span>
          </div>
          <div className="flex justify-between items-center text-[11px]">
            <span style={{ color: APP_COLORS.texts.slate }}>Remaining Inventory after distribution:</span>
            <span className="font-bold" style={{ color: APP_COLORS.texts.primary }}>
              {Math.max(0, availableInventory - totalNeeded)} SIMs
            </span>
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
            disabled={isSubmitting || totalNeeded <= 0 || totalNeeded > availableInventory}
            onClick={handleConfirm}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {isSubmitting ? "Allocating..." : "Confirm Network Distribution"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default DistributeAllScModal;
