import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface ConfirmDeliveryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderRef?: string;
  onReportIssueClick?: () => void;
}

export function ConfirmDeliveryModal({
  open,
  onOpenChange,
  orderRef = "ORD-2026-00847",
  onReportIssueClick,
}: ConfirmDeliveryModalProps) {
  const [otp, setOtp] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = () => {
    if (otp === "000000") {
      setHasError(true);
    } else {
      setHasError(false);
      setIsSuccess(true);
    }
  };

  const handleClose = () => {
    setOtp("");
    setHasError(false);
    setIsSuccess(false);
    onOpenChange(false);
  };

  const successDetails: SuccessDetailItem[] = [
    { label: "Order Reference", value: orderRef },
    { label: "Delivery Status", value: "Confirmed & Delivered" },
    { label: "Date & Time", value: "Just now" },
    { label: "Warranty Active", value: "2 Years Simkash Warranty" },
  ];

  return (
    <>
      <AppModal
        open={open && !isSuccess}
        onOpenChange={handleClose}
        title="Confirm Delivery"
        description={orderRef}
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* Info Banner */}
          <div className="rounded-2xl border border-[#D0DFF0] bg-[#EFF4F8] p-3.5 text-xs font-semibold text-[#2563EB]">
            Your order has arrived! Enter the OTP given to you by the delivery person to confirm receipt.
          </div>

          {/* Order Summary Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs space-y-1">
            <h4 className="font-extrabold text-[#0F152A]">{orderRef}</h4>
            <p className="text-[#8C909B]">Hikvision Camera, GPS Tracker × 2 + 1 more · ₦349,999</p>
          </div>

          {/* OTP Input */}
          <div className="space-y-3 text-center pt-1">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              ENTER DELIVERY OTP
            </label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={setOtp}
                containerClassName="gap-2"
              >
                <InputOTPGroup className="gap-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <InputOTPSlot
                      key={idx}
                      index={idx}
                      className="size-11 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-base font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="text-left pt-1">
              <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
                Didn't receive OTP?
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {hasError && (
            <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-xs font-bold text-[#EF4444]">
              ✕ Incorrect OTP. Please try again.
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onReportIssueClick?.();
              }}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Report Issue
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={otp.length < 6}
              className="rounded-xl bg-[#10B981] px-8 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-emerald-600 disabled:opacity-50"
            >
              Confirm Receipt
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Modal */}
      <TransactionSuccessModal
        open={open && isSuccess}
        onOpenChange={handleClose}
        title="Delivery Confirmed!"
        subtitle="Thank you for shopping with Simkash Store"
        details={successDetails}
        walletBalanceText="SimKash Orders System"
        doneButtonText="Done"
        onDone={handleClose}
      />
    </>
  );
}
