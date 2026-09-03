import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface RenewSimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  simNumber?: string;
  network?: string;
  simType?: string;
}

export function RenewSimModal({
  open,
  onOpenChange,
  simNumber = "07022222222",
  network = "MTN",
  simType = "POS SIM",
}: RenewSimModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"30" | "60" | "90">("30");
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<"form" | "success" | "failure">("form");
  const [isLoading, setIsLoading] = useState(false);

  const plans = {
    "30": { duration: "30 Days", data: "5GB data", price: 2000 },
    "60": { duration: "60 Days", data: "12GB data", price: 3500 },
    "90": { duration: "90 Days", data: "20GB data", price: 5000, bestValue: true },
  };

  const activePlan = plans[selectedPlan];
  const walletBalance = 50000;
  const balanceAfter = walletBalance - activePlan.price;

  const handleRenewPay = () => {
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

  const resetAll = () => {
    setStep("form");
    setPin("");
  };

  const handleClose = () => {
    resetAll();
    onOpenChange(false);
  };

  const successDetails: SuccessDetailItem[] = [
    { label: "SIM Number", value: `${simNumber} (${network})` },
    { label: "Plan Renewed", value: `${activePlan.duration} · ${activePlan.data}` },
    { label: "Amount Paid", value: `₦${activePlan.price.toLocaleString()}` },
    { label: "New Expiry", value: "26 Jul 2026" },
  ];

  return (
    <>
      <AppModal
        open={open && step === "form"}
        onOpenChange={handleClose}
        title="Renew SIM Plan"
        description={`${simNumber} · ${network} · ${simType}`}
        size="md"
      >
        <div className="space-y-5 pt-1">
          {/* Current Plan Status */}
          <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#8C909B]">Current Plan Status</span>
              <span className="text-xs font-bold text-[#EF4444]">Expiring Soon</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-red-100">
              <div className="h-full w-[97%] rounded-full bg-[#EF4444]" />
            </div>
            <p className="text-xs font-semibold text-[#EF4444]">
              97% data used · Expires in 3 days
            </p>
          </div>

          {/* Select Plan Duration */}
          <div className="space-y-2.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              SELECT PLAN DURATION
            </label>

            {/* 30 Days */}
            <div
              onClick={() => setSelectedPlan("30")}
              className={`cursor-pointer flex items-center justify-between rounded-2xl border p-4 transition ${
                selectedPlan === "30"
                  ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                  : "border-[#E2ECF6] bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="plan"
                  checked={selectedPlan === "30"}
                  onChange={() => setSelectedPlan("30")}
                  className="size-4 accent-[#2563EB]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#2563EB]">30 Days</h4>
                  <p className="text-xs text-[#8C909B]">5GB data</p>
                </div>
              </div>
              <span className="text-base font-extrabold text-[#2563EB]">₦2,000</span>
            </div>

            {/* 60 Days */}
            <div
              onClick={() => setSelectedPlan("60")}
              className={`cursor-pointer flex items-center justify-between rounded-2xl border p-4 transition ${
                selectedPlan === "60"
                  ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                  : "border-[#E2ECF6] bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="plan"
                  checked={selectedPlan === "60"}
                  onChange={() => setSelectedPlan("60")}
                  className="size-4 accent-[#2563EB]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#0F152A]">60 Days</h4>
                  <p className="text-xs text-[#8C909B]">12GB data</p>
                </div>
              </div>
              <span className="text-base font-extrabold text-[#0F152A]">₦3,500</span>
            </div>

            {/* 90 Days */}
            <div
              onClick={() => setSelectedPlan("90")}
              className={`cursor-pointer flex items-center justify-between rounded-2xl border p-4 transition ${
                selectedPlan === "90"
                  ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                  : "border-[#E2ECF6] bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="plan"
                  checked={selectedPlan === "90"}
                  onChange={() => setSelectedPlan("90")}
                  className="size-4 accent-[#2563EB]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#0F152A]">90 Days</h4>
                    <span className="rounded-md bg-[#EBFFF8] px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                      Best Value
                    </span>
                  </div>
                  <p className="text-xs text-[#8C909B]">20GB data</p>
                </div>
              </div>
              <span className="text-base font-extrabold text-[#0F152A]">₦5,000</span>
            </div>
          </div>

          {/* Pay Source Banner */}
          <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs">
            <div>
              <span className="font-bold text-[#0F152A]">Pay from · Wallet</span>
              <p className="text-[11px] font-semibold text-[#10B981]">
                Balance: ₦50,000 (Sufficient)
              </p>
            </div>
            <button type="button" className="font-bold text-[#2563EB] hover:underline">
              Change
            </button>
          </div>

          {/* Deduction Summary Card */}
          <div className="flex items-center justify-between rounded-2xl bg-[#EBFFF8] p-3.5 text-xs text-[#065F46]">
            <span className="font-extrabold text-[#10B981]">
              ₦{activePlan.price.toLocaleString()} will be deducted
            </span>
            <span className="font-semibold text-[#10B981]">
              Balance after: ₦{balanceAfter.toLocaleString()}
            </span>
          </div>

          {/* Wallet PIN Input */}
          <div className="space-y-3 text-center">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              ENTER PIN TO CONFIRM
            </label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={4}
                value={pin}
                onChange={setPin}
                containerClassName="gap-3"
              >
                <InputOTPGroup className="gap-3">
                  <InputOTPSlot
                    index={0}
                    className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                  />
                  <InputOTPSlot
                    index={1}
                    className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                  />
                  <InputOTPSlot
                    index={2}
                    className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                  />
                  <InputOTPSlot
                    index={3}
                    className="size-12 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] text-lg font-bold text-[#0F152A] data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/20"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRenewPay}
              disabled={pin.length < 4 || isLoading}
              className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Renewing..." : `Renew Now · ₦${activePlan.price.toLocaleString()}`}
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Modal */}
      <TransactionSuccessModal
        open={open && step === "success"}
        onOpenChange={handleClose}
        title="SIM Plan Renewed!"
        subtitle={`Successfully renewed plan for ${simNumber}`}
        details={successDetails}
        walletBalanceText={`Wallet: ₦${balanceAfter.toLocaleString()}`}
        doneButtonText="Done"
        onDone={handleClose}
      />

      {/* Failure Modal */}
      <TransactionFailureModal
        open={open && step === "failure"}
        onOpenChange={handleClose}
        title="Renewal Failed"
        subtitle="We couldn't renew your SIM plan. Your wallet was not debited."
        reason="Network provider connection timeout. Please try again."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setStep("form")}
        onCancel={handleClose}
      />
    </>
  );
}
