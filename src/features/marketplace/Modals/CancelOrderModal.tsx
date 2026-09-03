import { useState } from "react";
import { AlertTriangle, Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";

interface CancelOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderRef?: string;
  totalAmount?: number;
}

export function CancelOrderModal({
  open,
  onOpenChange,
  orderRef = "ORD-2026-00847",
  totalAmount = 349999,
}: CancelOrderModalProps) {
  const [reason, setReason] = useState("Bought by mistake");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCancelOrder = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onOpenChange(false);
  };

  const successDetails: SuccessDetailItem[] = [
    { label: "Order Reference", value: orderRef },
    { label: "Status", value: "Cancelled" },
    { label: "Refund Amount", value: `₦${totalAmount.toLocaleString()}` },
    { label: "Refund Destination", value: "Simkash Wallet (5 mins)" },
    { label: "Installation Booking", value: "Cancelled" },
  ];

  return (
    <>
      <AppModal
        open={open && !isSuccess}
        onOpenChange={handleClose}
        title="Cancel Order"
        description={orderRef}
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* Order Info Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-1">
            <h4 className="font-extrabold text-[#0F152A]">
              Hikvision Camera, GPS Tracker × 2 + 1 more
            </h4>
            <p className="text-[#8C909B]">
              Total: ₦{totalAmount.toLocaleString()} · Status: Confirmed
            </p>
          </div>

          {/* Reason Select */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F152A]">
              Cancellation reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none"
            >
              <option value="Bought by mistake">Bought by mistake</option>
              <option value="Delivery time too long">Delivery time too long</option>
              <option value="Found better price">Found better price</option>
              <option value="Changed my mind">Changed my mind</option>
            </select>
          </div>

          {/* Notes Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#0F152A]">
              Notes (optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes..."
              className="w-full rounded-2xl border border-[#E2ECF6] p-3 text-xs text-[#0F152A] outline-none"
            />
          </div>

          {/* Refund Guarantee Banner */}
          <div className="rounded-2xl bg-[#EBFFF8] p-3.5 text-xs text-[#10B981] font-semibold flex items-center gap-2">
            <Check className="size-4 shrink-0 stroke-[3]" />
            <span>Full refund of ₦{totalAmount.toLocaleString()} will be returned to your Simkash wallet within 5 minutes.</span>
          </div>

          {/* Installation Booking Warning */}
          <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3.5 text-xs font-bold text-[#D9990D] flex items-center gap-2">
            <AlertTriangle className="size-4 shrink-0" />
            <span>Your installation booking for 25 Jun will also be cancelled.</span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Keep Order
            </button>
            <button
              type="button"
              onClick={handleCancelOrder}
              className="rounded-xl bg-[#EF4444] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-red-600"
            >
              Cancel Order
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Modal */}
      <TransactionSuccessModal
        open={open && isSuccess}
        onOpenChange={handleClose}
        title="Order Cancelled"
        subtitle={`Refund of ₦${totalAmount.toLocaleString()} processed`}
        details={successDetails}
        walletBalanceText="SimKash Orders System"
        doneButtonText="Done"
        onDone={handleClose}
      />
    </>
  );
}
