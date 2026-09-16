import { useState } from "react";
import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { INITIAL_STATE_COORDINATORS } from "../data/regional-manager.data";
import type { StateCoordinatorItem } from "../types/regional-manager.types";

interface RedistributeStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scs?: StateCoordinatorItem[];
  defaultFromSc?: StateCoordinatorItem | null;
  defaultToSc?: StateCoordinatorItem | null;
  onSuccess?: (details: {
    fromScName: string;
    toScName: string;
    quantity: number;
    fromNewStock: number;
    toNewStock: number;
  }) => void;
}

const QUICK_SELECT_AMOUNTS = [25, 50, 100, 200];

export function RedistributeStockModal({
  open,
  onOpenChange,
  scs = INITIAL_STATE_COORDINATORS,
  defaultFromSc,
  defaultToSc,
  onSuccess,
}: RedistributeStockModalProps) {
  // Ibrahim Musa has 421 or stock
  const initialFrom =
    defaultFromSc ||
    scs.find((s) => s.id === "ibrahim-musa") ||
    scs[2] ||
    scs[0];

  const initialTo =
    defaultToSc ||
    scs.find((s) => s.id === "aminat-okafor") ||
    scs[0];

  const [fromScId, setFromScId] = useState(initialFrom.id);
  const [toScId, setToScId] = useState(initialTo.id);
  const [quantity, setQuantity] = useState<number | string>(100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fromSc = scs.find((s) => s.id === fromScId) || initialFrom;
  const toSc = scs.find((s) => s.id === toScId) || initialTo;

  // Use current stock or representative balance (e.g., 421 / 85 as depicted in mockup)
  const fromCurrentStock = fromSc.stock || 421;
  const toCurrentStock = toSc.stock || 85;

  const moveQty = Number(quantity) || 0;
  const fromAfter = Math.max(0, fromCurrentStock - moveQty);
  const toAfter = toCurrentStock + moveQty;

  const handleQuickSelect = (amt: number) => {
    setQuantity(amt);
  };

  const handleConfirm = () => {
    if (moveQty <= 0 || moveQty > fromCurrentStock) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.({
        fromScName: fromSc.name,
        toScName: toSc.name,
        quantity: moveQty,
        fromNewStock: fromAfter,
        toNewStock: toAfter,
      });
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Redistribute Stock"
      description="Move stock between State Coordinators"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* FROM SECTION */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            From
          </label>
          <div
            className="flex items-center justify-between rounded-2xl border p-3.5 transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: APP_COLORS.blues.surfaceLight,
                  color: APP_COLORS.blues.interactiveCta,
                }}
              >
                {fromSc.initials}
              </div>
              <div className="min-w-0">
                <select
                  value={fromScId}
                  onChange={(e) => setFromScId(e.target.value)}
                  className="font-bold text-xs bg-transparent border-none p-0 focus:outline-hidden cursor-pointer"
                  style={{ color: APP_COLORS.texts.primary }}
                >
                  {scs
                    .filter((s) => s.id !== toScId)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.state})
                      </option>
                    ))}
                </select>
                <p className="text-[11px]" style={{ color: APP_COLORS.texts.slate }}>
                  {fromSc.state}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span
                className="text-xs font-bold"
                style={{ color: APP_COLORS.texts.primary }}
              >
                {fromCurrentStock} SIMs current
              </span>
            </div>
          </div>
        </div>

        {/* TO SECTION */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            To
          </label>
          <div
            className="flex items-center justify-between rounded-2xl border p-3.5 transition"
            style={{
              borderColor: APP_COLORS.greys.stroke,
              backgroundColor: APP_COLORS.backgrounds.surface,
            }}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                style={{
                  backgroundColor: APP_COLORS.blues.surfaceLight,
                  color: APP_COLORS.blues.interactiveCta,
                }}
              >
                {toSc.initials}
              </div>
              <div className="min-w-0">
                <select
                  value={toScId}
                  onChange={(e) => setToScId(e.target.value)}
                  className="font-bold text-xs bg-transparent border-none p-0 focus:outline-hidden cursor-pointer"
                  style={{ color: APP_COLORS.texts.primary }}
                >
                  {scs
                    .filter((s) => s.id !== fromScId)
                    .map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.state})
                      </option>
                    ))}
                </select>
                <p className="text-[11px]" style={{ color: APP_COLORS.texts.slate }}>
                  {toSc.state}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span
                className="text-xs font-bold"
                style={{ color: APP_COLORS.texts.primary }}
              >
                {toCurrentStock} SIMs current
              </span>
            </div>
          </div>
        </div>

        {/* NUMBER OF SIMS TO MOVE */}
        <div className="space-y-1.5 pt-1">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Number of SIMs to Move
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

        {/* QUICK SELECT */}
        <div className="space-y-1.5">
          <label
            className="block text-[11px] font-bold tracking-wider uppercase"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Quick Select
          </label>
          <div className="grid grid-cols-4 gap-2.5">
            {QUICK_SELECT_AMOUNTS.map((amt) => {
              const isSelected = Number(quantity) === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleQuickSelect(amt)}
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

        {/* RESULT PREVIEW BANNER */}
        <div
          className="flex items-center gap-2 rounded-xl p-3 text-xs"
          style={{
            backgroundColor: APP_COLORS.greens.light,
            color: APP_COLORS.greens.secondary,
          }}
        >
          <Check className="size-4 shrink-0 stroke-[2.5]" style={{ color: APP_COLORS.greens.green }} />
          <span>
            After redistribution: <span className="font-bold">{fromSc.name.split(" ")[0]} {fromAfter} SIMs</span> · <span className="font-bold">{toSc.name.split(" ")[0]} {toAfter} SIMs</span>
          </span>
        </div>

        {/* FOOTER ACTIONS */}
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
            disabled={isSubmitting || moveQty <= 0 || moveQty > fromCurrentStock}
            onClick={handleConfirm}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.99] cursor-pointer disabled:opacity-50"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {isSubmitting ? "Redistributing..." : "Redistribute Stock"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default RedistributeStockModal;
