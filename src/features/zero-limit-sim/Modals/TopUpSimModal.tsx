import { useState } from "react";
import { Check, Copy, Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionFailureModal } from "@/components/common/TransactionFailureModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

interface TopUpSimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  linkedNumber?: string;
  initialPackage?: string;
  onViewMySimClick?: () => void;
}

export function TopUpSimModal({
  open,
  onOpenChange,
  linkedNumber = "0812 345 6789",
  initialPackage = "20GB",
  onViewMySimClick,
}: TopUpSimModalProps) {
  // Wizard Steps: 1 (Confirm SIM), 2 (Select Plan), 3 (Payment), 4 (Processing), 5 (Complete)
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | "failure">(1);

  // Form State
  const [msisdn, setMsisdn] = useState<string>(linkedNumber);
  const [isCorrectSim, setIsCorrectSim] = useState<"yes" | "different">("yes");
  const [selectedPkgKey, setSelectedPkgKey] = useState<string>(initialPackage);
  const [pin, setPin] = useState("");
  const [copied, setCopied] = useState(false);
  console.log("Copied:", copied);

  const packages: Record<string, { size: string; price: number; badge?: string }> = {
    "5GB": { size: "5GB", price: 2000 },
    "10GB": { size: "10GB", price: 3500 },
    "20GB": { size: "20GB", price: 6000, badge: "POPULAR" },
    "50GB": { size: "50GB", price: 13000 },
    "100GB": { size: "100GB", price: 24000, badge: "BEST VALUE" },
    "Unlimited": { size: "Unlimited", price: 35000 },
  };

  const activePkg = packages[selectedPkgKey] || packages["20GB"];
  const walletBalance = 50000;
  const balanceAfter = walletBalance - activePkg.price;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(msisdn);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePay = () => {
    setStep(4);
    setTimeout(() => {
      if (pin === "0000") {
        setStep("failure");
      } else {
        setStep(5);
      }
    }, 1000);
  };

  const resetAll = () => {
    setStep(1);
    setPin("");
  };

  const handleClose = () => {
    resetAll();
    onOpenChange(false);
  };

  return (
    <>
      <AppModal
        open={open && step !== "failure"}
        onOpenChange={handleClose}
        title={
          step === 1
            ? "Top Up ZeroLimit SIM"
            : step === 2
            ? "Select Data Plan"
            : step === 3
            ? "Confirm Payment"
            : step === 4
            ? "Processing Top Up..."
            : "Purchase Complete"
        }
        description={
          step === 1
            ? "SimKash Top Up Platform"
            : step === 2
            ? `${msisdn} · MTN Nigeria`
            : step === 3
            ? `${activePkg.size} Top Up · ${msisdn}`
            : step === 4
            ? "Syncing via MTN API"
            : "Your data has been added"
        }
        size="md"
      >
        <div className="space-y-5 pt-1">
          {/* Progress Indicator Dots */}
          <div className="flex flex-col items-center gap-1.5 text-center border-b border-[#E2ECF6] pb-3">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={`size-2 rounded-full transition-all ${
                    typeof step === "number" && step >= i ? "bg-[#2563EB]" : "bg-[#D0DFF0]"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563EB]">
              {step === 1 && "STEP 1 OF 5 · CONFIRM SIM NUMBER"}
              {step === 2 && "STEP 2 OF 5 · SELECT DATA PLAN"}
              {step === 3 && "STEP 3 OF 5 · PAYMENT"}
              {step === 4 && "STEP 4 OF 5 · PROCESSING VIA MTN API"}
              {step === 5 && "STEP 5 OF 5 · DATA ADDED!"}
            </span>
          </div>

          {/* STEP 1: Confirm SIM Number */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#FFCC00] text-sm font-extrabold text-[#0F152A]">
                  MTN
                </div>
                <p className="text-xs font-bold text-[#66738C]">Nigeria</p>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8C909B] pt-2">
                  CONFIRM YOUR SIM NUMBER
                </h4>
              </div>

              {/* Dark Linked Number Card */}
              <div className="rounded-2xl bg-[#0D1B2E] p-5 text-white flex items-center justify-between shadow-md">
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#8C909B]">
                    LINKED SIM NUMBER
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight text-white mt-0.5">
                    {msisdn}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyNumber}
                  className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
                >
                  <Copy className="size-4" />
                </button>
              </div>

              {/* Green Confirmation Note */}
              <div className="flex items-center gap-2 rounded-2xl bg-[#EBFFF8] p-3 text-xs text-[#10B981] font-semibold">
                <Check className="size-4 shrink-0 stroke-[3]" />
                <span>
                  This is your linked MTN SIM number. It has been pre-filled from your ZeroLimit SIM account.
                </span>
              </div>

              {/* Confirmation Radio Option */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold text-[#0F152A] text-center">
                  Is this the correct SIM number?
                </p>

                <div
                  onClick={() => setIsCorrectSim("yes")}
                  className={`cursor-pointer flex items-center gap-3 rounded-2xl border p-3.5 transition ${
                    isCorrectSim === "yes"
                      ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                      : "border-[#E2ECF6] bg-white hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="confirmSim"
                    checked={isCorrectSim === "yes"}
                    onChange={() => setIsCorrectSim("yes")}
                    className="size-4 accent-[#2563EB]"
                  />
                  <span className="text-xs font-bold text-[#2563EB]">Yes, this is correct</span>
                </div>

                <div
                  onClick={() => setIsCorrectSim("different")}
                  className={`cursor-pointer flex items-center gap-3 rounded-2xl border p-3.5 transition ${
                    isCorrectSim === "different"
                      ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                      : "border-[#E2ECF6] bg-white hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="confirmSim"
                    checked={isCorrectSim === "different"}
                    onChange={() => setIsCorrectSim("different")}
                    className="size-4 accent-[#2563EB]"
                  />
                  <span className="text-xs font-bold text-[#0F152A]">Enter a different number</span>
                </div>
              </div>

              {isCorrectSim === "different" && (
                <input
                  type="text"
                  placeholder="Enter MSISDN number"
                  value={msisdn}
                  onChange={(e) => setMsisdn(e.target.value)}
                  className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs font-bold text-[#0F152A] outline-none focus:border-[#2563EB]"
                />
              )}

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
                  onClick={() => setStep(2)}
                  className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
                >
                  Confirm SIM →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Data Plan */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded-2xl bg-[#EBFFF8] p-3 text-xs text-[#10B981] font-semibold">
                <Check className="size-4 shrink-0 stroke-[3]" />
                <span>{msisdn} confirmed</span>
              </div>

              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                SELECT TOP UP PLAN
              </label>

              {/* 6 Grid Packages */}
              <div className="grid grid-cols-3 gap-2.5">
                {Object.entries(packages).map(([key, pkg]) => {
                  const isSelected = selectedPkgKey === key;
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedPkgKey(key)}
                      className={`cursor-pointer relative flex flex-col justify-between rounded-2xl border p-3.5 transition ${
                        isSelected
                          ? "border-[#2563EB] bg-[#EFF4F8] ring-2 ring-[#2563EB]"
                          : "border-[#E2ECF6] bg-white hover:border-slate-300"
                      }`}
                    >
                      {pkg.badge && (
                        <span className="absolute -top-2 left-2 rounded-md bg-[#F59E0B] px-1.5 py-0.5 text-[8px] font-extrabold text-white">
                          {pkg.badge}
                        </span>
                      )}
                      <div>
                        <h4 className="text-base font-extrabold text-[#0F152A]">{pkg.size}</h4>
                        <p className="text-[10px] text-[#8C909B]">Data Plan</p>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs font-extrabold text-[#2563EB]">
                          ₦{pkg.price.toLocaleString()}
                        </span>
                        <p className="text-[9px] text-[#8C909B]">Top Up</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Plan Summary Bar */}
              <div className="rounded-2xl bg-[#EFF4F8] p-3 text-center">
                <span className="text-xs font-extrabold text-[#2563EB]">
                  SELECTED: {activePkg.size} · ₦{activePkg.price.toLocaleString()}
                </span>
              </div>

              {/* Note */}
              <div className="flex items-center gap-2 text-xs text-[#8C909B]">
                <Info className="size-3.5 shrink-0" />
                <span>Currently: 8GB remaining. After top-up: 28GB total</span>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Confirm Payment */}
          {step === 3 && (
            <div className="space-y-4">
              {/* Dark Order Summary Card */}
              <div className="rounded-2xl bg-[#0D1B2E] p-5 text-white shadow-md space-y-3">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#8C909B]">
                  ORDER SUMMARY
                </span>
                <div className="divide-y divide-white/10 text-xs">
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">SIM Number</span>
                    <span className="font-bold text-white">{msisdn}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">Plan Selected</span>
                    <span className="font-bold text-white">{activePkg.size} Data Top Up</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#8C909B]">Network</span>
                    <span className="rounded-md bg-[#FFCC00] px-2 py-0.5 font-bold text-[#0F152A]">
                      MTN Nigeria
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3 flex items-baseline justify-between">
                  <span className="text-xs text-[#8C909B]">Total Amount</span>
                  <span className="text-3xl font-extrabold text-white">
                    ₦{activePkg.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-[#8C909B]">Current: 8GB + New: 20GB = 28GB total</p>
              </div>

              {/* Pay From Card */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
                  PAY FROM
                </label>
                <div className="flex items-center justify-between rounded-2xl border border-[#2563EB] bg-[#EFF4F8] p-3.5">
                  <div className="flex items-center gap-2.5">
                    <input type="radio" checked readOnly className="size-4 accent-[#2563EB]" />
                    <span className="text-xs font-bold text-[#2563EB]">
                      Wallet · ₦50,000 available
                    </span>
                  </div>
                  <span className="text-xs text-[#8C909B]">
                    After: ₦{balanceAfter.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Info Notice */}
              <div className="flex items-start gap-2.5 rounded-2xl bg-[#EFF4F8] p-3 text-xs text-[#2563EB]">
                <Info className="size-4 shrink-0 mt-0.5" />
                <p>
                  Data will be added to your MTN SIM immediately after successful payment. This is processed via SimKash's MTN API integration.
                </p>
              </div>

              {/* Wallet PIN Input */}
              <div className="space-y-3 text-center">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
                  ENTER PIN TO PAY
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
                  onClick={() => setStep(2)}
                  className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={pin.length < 4}
                  className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-50"
                >
                  Pay ₦{activePkg.price.toLocaleString()}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Processing */}
          {step === 4 && (
            <div className="py-12 text-center space-y-4">
              <div className="size-12 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin mx-auto" />
              <h4 className="text-sm font-bold text-[#0F152A]">Communicating with MTN API...</h4>
              <p className="text-xs text-[#8C909B]">Adding {activePkg.size} to {msisdn}</p>
            </div>
          )}

          {/* STEP 5: Purchase Complete */}
          {step === 5 && (
            <div className="space-y-4 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-[#10B981] text-white mx-auto shadow-md">
                <Check className="size-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-[#0F152A]">
                  {activePkg.size} Added to SIM! ✓
                </h3>
                <p className="text-xs text-[#8C909B] mt-0.5">{msisdn} · MTN Nigeria</p>
              </div>

              {/* Dark Updated Data Balance Card */}
              <div className="rounded-2xl bg-[#0D1B2E] p-5 text-white shadow-md space-y-2">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#8C909B]">
                  UPDATED DATA BALANCE
                </span>
                <h2 className="text-4xl font-extrabold text-white">28GB</h2>
                <p className="text-xs text-[#8C909B]">Now available on your SIM</p>
                <div className="border-t border-white/10 pt-2 flex justify-between text-xs">
                  <span>Before: 8GB</span>
                  <span className="font-bold text-[#10B981]">Added: +{activePkg.size}</span>
                  <span>New: 28GB</span>
                </div>
              </div>

              {/* Green API Status Note */}
              <div className="rounded-2xl bg-[#EBFFF8] p-3 text-xs text-[#10B981] font-bold">
                🔄 Data added via MTN API · Balance updating on your SIM now
              </div>

              {/* Receipt Details Table */}
              <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs text-left">
                <div className="flex justify-between py-2 first:pt-0 last:pb-0">
                  <span className="text-[#8C909B]">Plan</span>
                  <span className="font-bold text-[#0F152A]">{activePkg.size} Data Top Up</span>
                </div>
                <div className="flex justify-between py-2 first:pt-0 last:pb-0">
                  <span className="text-[#8C909B]">SIM</span>
                  <span className="font-bold text-[#0F152A]">{msisdn}</span>
                </div>
                <div className="flex justify-between py-2 first:pt-0 last:pb-0">
                  <span className="text-[#8C909B]">Amount</span>
                  <span className="font-bold text-[#0F152A]">₦{activePkg.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 first:pt-0 last:pb-0">
                  <span className="text-[#8C909B]">Ref</span>
                  <span className="font-bold text-[#0F152A]">TU-ZL-2026-00847</span>
                </div>
                <div className="flex justify-between py-2 first:pt-0 last:pb-0">
                  <span className="text-[#8C909B]">Time</span>
                  <span className="font-bold text-[#0F152A]">Just now</span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
                <button
                  type="button"
                  onClick={() => {
                    handleClose();
                    onViewMySimClick?.();
                  }}
                  className="flex-1 rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50 mr-2"
                >
                  View My SIM
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700 ml-2"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </AppModal>

      {/* Failure Modal */}
      <TransactionFailureModal
        open={step === "failure"}
        onOpenChange={handleClose}
        title="Top Up Failed"
        subtitle="We couldn't process the top up. Your wallet was not debited."
        reason="MTN API sync failure or invalid PIN. Please try again."
        tryAgainButtonText="Try Again"
        cancelButtonText="Cancel"
        onTryAgain={() => setStep(3)}
        onCancel={handleClose}
      />
    </>
  );
}
