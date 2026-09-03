import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Wrench } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function CheckoutPage() {
  const navigate = useNavigate();

  // Modal State
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<"form" | "success" | "failure">("form");
  const [isLoading, setIsLoading] = useState(false);

  const totalAmount = 349999;
  const walletBalance = 50000;
  const shortfall = totalAmount - walletBalance;

  const handlePlaceOrderClick = () => {
    setStep("form");
    setPinModalOpen(true);
  };

  const handleConfirmPin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (pin === "0000") {
        setStep("failure");
      } else {
        setStep("success");
      }
    }, 1000);
  };

  const handleCloseAll = () => {
    setPinModalOpen(false);
    setStep("form");
    setPin("");
  };

  const successDetails: SuccessDetailItem[] = [
    { label: "Order Ref", value: "ORD-2026-00847" },
    { label: "Items", value: "Hikvision Camera, GPS Tracker x 2, Router" },
    { label: "Add-ons", value: "CCTV SIM (MTN) + Installation" },
    { label: "Total Charged", value: `₦${totalAmount.toLocaleString()}` },
    { label: "Estimated Delivery", value: "28 – 30 Jun 2026" },
  ];

  return (
    <div className="space-y-6">
      {/* 3-Step Wizard Header Stepper */}
      <div className="flex items-center justify-center gap-4 border-b border-[#E2ECF6] pb-4">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-[#2563EB] text-xs font-extrabold text-white">
            1
          </span>
          <span className="text-xs font-bold text-[#2563EB]">Review</span>
        </div>
        <span className="h-0.5 w-12 bg-[#E2ECF6]" />
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-[#EFF4F8] text-xs font-bold text-[#8C909B]">
            2
          </span>
          <span className="text-xs font-bold text-[#8C909B]">Payment</span>
        </div>
        <span className="h-0.5 w-12 bg-[#E2ECF6]" />
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-[#EFF4F8] text-xs font-bold text-[#8C909B]">
            3
          </span>
          <span className="text-xs font-bold text-[#8C909B]">Confirm</span>
        </div>
      </div>

      {/* Main Grid: Left Review Items & Address, Right Summary */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Delivery Address Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0F152A]">Delivery Address</h3>
              <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
                Change
              </button>
            </div>

            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-1">
              <h4 className="font-extrabold text-[#0F152A]">Yusuf Adam Baba</h4>
              <p className="text-[#66738C]">23 Allen Avenue, Ikeja, Lagos</p>
              <p className="text-[#66738C]">Lagos State · Nigeria</p>
              <p className="text-[#8C909B] pt-0.5 font-mono">08065942373</p>
            </div>
          </div>

          {/* Items in Order Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F152A]">Items in Order</h3>

            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="flex items-center justify-between py-3 first:pt-0">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-xl">📹</div>
                  <div>
                    <h4 className="font-bold text-[#0F152A]">Hikvision Camera × 1</h4>
                  </div>
                </div>
                <span className="font-extrabold text-[#0F152A]">₦184,999</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-xl">🛰️</div>
                  <div>
                    <h4 className="font-bold text-[#0F152A]">GPS Tracker × 2</h4>
                  </div>
                </div>
                <span className="font-extrabold text-[#0F152A]">₦90,000</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-xl">📶</div>
                  <div>
                    <h4 className="font-bold text-[#0F152A]">GL-iNet Router × 1</h4>
                  </div>
                </div>
                <span className="font-extrabold text-[#0F152A]">₦35,000</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-xl">💳</div>
                  <div>
                    <h4 className="font-bold text-[#0F152A]">CCTV SIM (Monthly)</h4>
                  </div>
                </div>
                <span className="font-extrabold text-[#0F152A]">₦5,000</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-xl">🔧</div>
                  <div>
                    <h4 className="font-bold text-[#0F152A]">Installation</h4>
                  </div>
                </div>
                <span className="font-extrabold text-[#0F152A]">₦40,000</span>
              </div>
            </div>

            {/* Scheduled Installation Banner */}
            <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-4 text-xs space-y-1">
              <h5 className="font-bold text-[#D9990D] flex items-center gap-1.5">
                <Wrench className="size-4" /> Installation: Tue 25 Jun · Morning slot · 23 Allen Avenue
              </h5>
              <p className="text-[11px] text-[#D9990D]">
                An installer will contact you 24 hours before to confirm.
              </p>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-[#0F152A]">Payment Method</h3>

            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#0F152A]">💳 Simkash Wallet</span>
                <span className="size-2.5 rounded-full bg-[#10B981]" />
              </div>
              <p className="text-[#8C909B]">₦50,000 available</p>

              {shortfall > 0 && (
                <div className="rounded-xl border border-[#FCEEC1] bg-[#FFFBEB] p-2.5 text-[11px] font-bold text-[#D9990D]">
                  Shortfall: ₦{shortfall.toLocaleString()} — top up wallet or split with card
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) — Order Total & Place Order */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-[#0F152A]">Order Total</h3>

            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="flex justify-between py-2 first:pt-0">
                <span className="text-[#8C909B]">Subtotal (3 items)</span>
                <span className="font-bold text-[#0F152A]">₦309,999</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Add-ons</span>
                <span className="font-bold text-[#0F152A]">₦45,000</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">CCTV SIM</span>
                <span className="font-bold text-[#0F152A]">₦5,000</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Delivery</span>
                <span className="font-bold text-[#10B981]">Free</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[#8C909B]">Promo (SIMKASH10)</span>
                <span className="font-bold text-[#10B981]">-₦10,000</span>
              </div>
              <div className="flex justify-between py-3 font-extrabold text-lg pt-3 border-t border-[#E2ECF6]">
                <span className="text-[#0F152A]">TOTAL</span>
                <span className="text-[#0F152A]">₦{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-[11px] text-[#8C909B] space-y-0.5">
              <p>Charging to: <span className="font-bold text-[#0F152A]">Simkash Wallet</span></p>
              <p className="text-[#EF4444] font-semibold">After purchase: ₦0 remaining</p>
            </div>

            {/* Place Order Button */}
            <button
              type="button"
              onClick={handlePlaceOrderClick}
              className="w-full rounded-xl bg-[#10B981] py-3.5 text-sm font-extrabold text-white shadow-md transition hover:bg-emerald-600"
            >
              Place Order
            </button>

            <p className="text-[10px] text-[#8C909B] text-center">
              By placing this order you agree to our Terms & Conditions
            </p>
          </div>

          {/* Secured by Flutterwave */}
          <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs font-bold text-[#66738C]">
            <ShieldCheck className="size-4 text-[#10B981]" />
            <span>Secured by Flutterwave · All payments encrypted and safe</span>
          </div>
        </div>
      </div>

      {/* PIN Verification Modal */}
      <AppModal
        open={pinModalOpen && step === "form"}
        onOpenChange={handleCloseAll}
        title="Confirm Purchase"
        description={`Authorise payment of ₦${totalAmount.toLocaleString()}`}
        size="sm"
      >
        <div className="space-y-4 pt-1 text-center">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
            ENTER WALLET PIN
          </label>
          <div className="flex justify-center">
            <InputOTP
              maxLength={4}
              value={pin}
              onChange={setPin}
              containerClassName="gap-3"
            >
              <InputOTPGroup className="gap-3">
                <InputOTPSlot index={0} className="size-12 text-lg font-bold" />
                <InputOTPSlot index={1} className="size-12 text-lg font-bold" />
                <InputOTPSlot index={2} className="size-12 text-lg font-bold" />
                <InputOTPSlot index={3} className="size-12 text-lg font-bold" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={handleCloseAll}
              className="rounded-xl border border-[#E2ECF6] px-5 py-2 text-xs font-bold text-[#0F152A]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmPin}
              disabled={pin.length < 4 || isLoading}
              className="rounded-xl bg-[#10B981] px-6 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-600 disabled:opacity-50"
            >
              {isLoading ? "Processing..." : "Confirm & Pay"}
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Modal */}
      <TransactionSuccessModal
        open={pinModalOpen && step === "success"}
        onOpenChange={() => {
          handleCloseAll();
          navigate("/marketplace/orders");
        }}
        title="Order Placed Successfully!"
        subtitle="Your order ORD-2026-00847 has been created"
        details={successDetails}
        walletBalanceText="SimKash Marketplace"
        doneButtonText="View My Orders"
        onDone={() => {
          handleCloseAll();
          navigate("/marketplace/orders");
        }}
      />

      {/* Failure Modal */}
      <TransactionFailureModal
        open={pinModalOpen && step === "failure"}
        onOpenChange={handleCloseAll}
        title="Payment Failed"
        subtitle="We couldn't process your order. Your wallet was not debited."
        reason="Invalid PIN or insufficient wallet funds. Please try again."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setStep("form")}
        onCancel={handleCloseAll}
      />
    </div>
  );
}
