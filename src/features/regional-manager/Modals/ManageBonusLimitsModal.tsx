import { useState } from "react";
import { Trophy, PackageCheck } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface ManageBonusLimitsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ManageBonusLimitsModal({
  open,
  onOpenChange,
  onSuccess,
}: ManageBonusLimitsModalProps) {
  const [minStockThreshold, setMinStockThreshold] = useState<number>(10);
  const [criticalStockThreshold, setCriticalStockThreshold] = useState<number>(5);
  const [tier1Target, setTier1Target] = useState<number>(500);
  const [tier2Target, setTier2Target] = useState<number>(1000);
  const [tier1Bonus, setTier1Bonus] = useState<number>(15000);
  const [tier2Bonus, setTier2Bonus] = useState<number>(35000);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      onOpenChange(false);
      onSuccess?.();
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Manage Bonus & SIM Limits"
      description="Configure regional performance incentives and automated low-stock triggers"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Section 1: Stock Thresholds */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 font-bold" style={{ color: APP_COLORS.texts.primary }}>
            <PackageCheck className="size-4 text-blue-600" />
            <span>Inventory Alert Thresholds</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase" style={{ color: APP_COLORS.texts.slate }}>
                Low Stock Alert (SIMs)
              </label>
              <input
                type="number"
                value={minStockThreshold}
                onChange={(e) => setMinStockThreshold(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border p-2.5 text-xs font-semibold focus:outline-hidden"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  backgroundColor: APP_COLORS.backgrounds.surface,
                }}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase" style={{ color: APP_COLORS.texts.slate }}>
                Critical Alert (SIMs)
              </label>
              <input
                type="number"
                value={criticalStockThreshold}
                onChange={(e) => setCriticalStockThreshold(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border p-2.5 text-xs font-semibold focus:outline-hidden"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  backgroundColor: APP_COLORS.backgrounds.surface,
                }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Bonus Tiers */}
        <div className="space-y-2 pt-2 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <div className="flex items-center gap-1.5 font-bold" style={{ color: APP_COLORS.texts.primary }}>
            <Trophy className="size-4 text-amber-500" />
            <span>Monthly Bonus Target Tiers</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase" style={{ color: APP_COLORS.texts.slate }}>
                Tier 1 Target (Acts)
              </label>
              <input
                type="number"
                value={tier1Target}
                onChange={(e) => setTier1Target(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border p-2.5 text-xs font-semibold focus:outline-hidden"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  backgroundColor: APP_COLORS.backgrounds.surface,
                }}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase" style={{ color: APP_COLORS.texts.slate }}>
                Tier 1 Payout (₦)
              </label>
              <input
                type="number"
                value={tier1Bonus}
                onChange={(e) => setTier1Bonus(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border p-2.5 text-xs font-semibold focus:outline-hidden"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  backgroundColor: APP_COLORS.backgrounds.surface,
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[10px] font-bold uppercase" style={{ color: APP_COLORS.texts.slate }}>
                Tier 2 Target (Acts)
              </label>
              <input
                type="number"
                value={tier2Target}
                onChange={(e) => setTier2Target(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border p-2.5 text-xs font-semibold focus:outline-hidden"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  backgroundColor: APP_COLORS.backgrounds.surface,
                }}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase" style={{ color: APP_COLORS.texts.slate }}>
                Tier 2 Payout (₦)
              </label>
              <input
                type="number"
                value={tier2Bonus}
                onChange={(e) => setTier2Bonus(Number(e.target.value))}
                className="mt-1 w-full rounded-xl border p-2.5 text-xs font-semibold focus:outline-hidden"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  backgroundColor: APP_COLORS.backgrounds.surface,
                }}
              />
            </div>
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
            disabled={isSaving}
            onClick={handleSave}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {isSaving ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default ManageBonusLimitsModal;
