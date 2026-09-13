import { useState } from "react";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface RequestStockFromAdminModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function RequestStockFromAdminModal({
  open,
  onOpenChange,
  onSuccess,
}: RequestStockFromAdminModalProps) {
  const [posQty, setPosQty] = useState(100);
  const [cctvQty, setCctvQty] = useState(50);
  const [gpsQty, setGpsQty] = useState(25);
  const [routerQty, setRouterQty] = useState(25);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalRequested = posQty + cctvQty + gpsQty + routerQty;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccess?.();
    }, 700);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={isSuccess ? "Request Submitted" : "Request Stock from Admin"}
      description={
        isSuccess
          ? "Stock request queued for Super Admin fulfillment"
          : "Request additional inventory for your RM regional warehouse"
      }
      size="md"
      showCloseButton={true}
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <CheckCircle2 className="size-8" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#0F152A]">Stock Request Sent!</h3>
            <p className="mt-1 text-xs text-[#66738C]">
              Your request for {totalRequested} SIMs has been logged. Super Admin will review and assign dispatch tracking.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white transition hover:bg-[#1D4ED8]"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            Done
          </button>
        </div>
      ) : (
        <div className="space-y-4 pt-1 text-xs">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-3.5 space-y-2.5 divide-y divide-[#F1F5F9]">
            {/* POS */}
            <div className="flex items-center justify-between py-1 first:pt-0">
              <span className="font-bold text-xs text-[#0F152A]">POS SIMs</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPosQty((q) => Math.max(0, q - 25))}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-10 text-center font-bold text-xs text-[#0F152A]">{posQty}</span>
                <button
                  type="button"
                  onClick={() => setPosQty((q) => q + 25)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>

            {/* CCTV */}
            <div className="flex items-center justify-between py-1">
              <span className="font-bold text-xs text-[#0F152A]">CCTV SIMs</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCctvQty((q) => Math.max(0, q - 10))}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-10 text-center font-bold text-xs text-[#0F152A]">{cctvQty}</span>
                <button
                  type="button"
                  onClick={() => setCctvQty((q) => q + 10)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>

            {/* GPS */}
            <div className="flex items-center justify-between py-1">
              <span className="font-bold text-xs text-[#0F152A]">GPS SIMs</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGpsQty((q) => Math.max(0, q - 5))}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-10 text-center font-bold text-xs text-[#0F152A]">{gpsQty}</span>
                <button
                  type="button"
                  onClick={() => setGpsQty((q) => q + 5)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>

            {/* Router */}
            <div className="flex items-center justify-between py-1">
              <span className="font-bold text-xs text-[#0F152A]">Router SIMs</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRouterQty((q) => Math.max(0, q - 5))}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-10 text-center font-bold text-xs text-[#0F152A]">{routerQty}</span>
                <button
                  type="button"
                  onClick={() => setRouterQty((q) => q + 5)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <span className="font-black text-xs text-[#0F152A]">Total Requested</span>
              <span className="font-black text-xs text-[#2563EB]">{totalRequested} SIMs</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              Notes / Delivery Destination
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Expedited batch for Lagos & Kano state coordinators..."
              className="w-full rounded-xl border border-[#CBD5E1] p-2.5 text-xs text-[#0F152A] focus:border-[#2563EB] focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] hover:bg-[#F1F5F9]"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSubmitting || totalRequested === 0}
              onClick={handleSubmit}
              className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              {isSubmitting ? "Submitting..." : `Submit Request (${totalRequested} SIMs)`}
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}

export default RequestStockFromAdminModal;
