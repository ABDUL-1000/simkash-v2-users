import { useState } from "react";
import { Package, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import type { StateCoordinatorItem } from "../types/regional-manager.types";

interface DistributeStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sc?: StateCoordinatorItem | null;
  scName?: string;
  preselectedSc?: StateCoordinatorItem | null;
  onSuccess?: (details: { scName: string; quantity: number; state: string; total: number }) => void;
}

const QUICK_AMOUNTS = [50, 100, 250, 500];

export function DistributeStockModal({
  open,
  onOpenChange,
  sc,
  scName: propScName,
  preselectedSc,
  onSuccess,
}: DistributeStockModalProps) {
  const activeCoordinator = sc || preselectedSc;
  const scName = activeCoordinator?.name || propScName || "Aminat Okafor";
  const scState = activeCoordinator?.state || "Lagos";
  const scInitials = activeCoordinator?.initials || "AO";
  const scStatus = activeCoordinator?.status || "Active";
  const firstName = scName.split(" ")[0];

  const [quantity, setQuantity] = useState<number | string>(100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectQuick = (amount: number) => {
    setQuantity(amount);
  };

  const handleConfirm = () => {
    const qty = Number(quantity) || 0;
    if (qty <= 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.({
        scName,
        quantity: qty,
        total: qty,
        state: scState,
      });
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Distribute SIMs"
      description={`Send stock from your inventory to ${scName}`}
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* SC User Card */}
        <div
          className="flex items-center gap-3.5 rounded-2xl border p-4 shadow-xs"
          style={{
            backgroundColor: APP_COLORS.backgrounds.surface,
            borderColor: APP_COLORS.greys.stroke,
          }}
        >
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
            style={{
              backgroundColor: APP_COLORS.blues.surfaceLight,
              color: APP_COLORS.blues.interactiveCta,
            }}
          >
            {scInitials}
          </div>
          <div className="flex-1 min-w-0">
            <h4
              className="text-sm font-bold truncate"
              style={{ color: APP_COLORS.texts.primary }}
            >
              {scName}
            </h4>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs font-semibold">
              <span style={{ color: APP_COLORS.texts.slate }}>{scState}</span>
              <span style={{ color: APP_COLORS.texts.slate }}>•</span>
              <span
                className="inline-flex items-center gap-1"
                style={{
                  color:
                    scStatus === "Active"
                      ? APP_COLORS.greens.green
                      : scStatus === "At Risk"
                      ? APP_COLORS.ambers.amber
                      : APP_COLORS.reds.red,
                }}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{
                    backgroundColor:
                      scStatus === "Active"
                        ? APP_COLORS.greens.green
                        : scStatus === "At Risk"
                        ? APP_COLORS.ambers.amber
                        : APP_COLORS.reds.red,
                  }}
                />
                {scStatus}
              </span>
            </div>
          </div>
        </div>

        {/* YOUR INVENTORY Banner */}
        <div
          className="flex items-center justify-between rounded-xl border p-3.5"
          style={{
            borderColor: APP_COLORS.greens.green,
            backgroundColor: APP_COLORS.greens.light,
          }}
        >
          <div className="flex items-center gap-2">
            <Package
              className="size-4.5"
              style={{ color: APP_COLORS.greens.green }}
            />
            <span
              className="text-xs font-black tracking-wider uppercase"
              style={{ color: APP_COLORS.texts.primary }}
            >
              Your Inventory
            </span>
          </div>
          <span
            className="text-xs font-black"
            style={{ color: APP_COLORS.greens.secondary }}
          >
            1,250 SIMs available
          </span>
        </div>

        {/* Amount Input */}
        <div className="space-y-1.5 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Number of SIMs to Distribute
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value === "" ? "" : Number(e.target.value))}
            placeholder="e.g. 100"
            className="w-full rounded-2xl border p-3 text-sm font-semibold focus:outline-hidden transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
              color: APP_COLORS.texts.primary,
            }}
          />
        </div>

        {/* Quick Select Pills */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Quick Select
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {QUICK_AMOUNTS.map((amt) => {
              const isSelected = Number(quantity) === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleSelectQuick(amt)}
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
                  {amt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notice Info Banner */}
        <div
          className="flex items-start gap-2.5 rounded-xl border p-3.5"
          style={{
            borderColor: APP_COLORS.blues.surfaceMid,
            backgroundColor: APP_COLORS.blues.surfaceLight,
          }}
        >
          <Info
            className="size-4 shrink-0 mt-0.5"
            style={{ color: APP_COLORS.blues.interactiveCta }}
          />
          <p
            className="text-xs leading-relaxed"
            style={{ color: APP_COLORS.blues.primary }}
          >
            SIMs will be deducted from your inventory and added to {firstName}'s stock.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
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
            disabled={isSubmitting || !quantity || Number(quantity) <= 0}
            onClick={handleConfirm}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {isSubmitting ? "Distributing..." : "Distribute SIMs"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default DistributeStockModal;
