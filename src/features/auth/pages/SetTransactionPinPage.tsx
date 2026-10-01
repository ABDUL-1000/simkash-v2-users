import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, AlertCircle } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { notify } from "@/lib/notify";
import { AuthLayout } from "../components/AuthLayout";
import { useAuthStore } from "@/store/authStore";
import { getDashboardRouteByRole } from "@/utils/auth/roleRouting";

export default function SetTransactionPinPage() {
  const navigate = useNavigate();

  // State Switcher: Step 1 (Set PIN) -> Step 2 (Confirm PIN)
  const [step, setStep] = useState<1 | 2>(1);
  const [initialPin, setInitialPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentPin = step === 1 ? initialPin : confirmPin;

  const handlePinChange = (val: string) => {
    setError(null);
    if (step === 1) {
      setInitialPin(val);
    } else {
      setConfirmPin(val);
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (initialPin.length < 4) {
        setError("Please enter a 4-digit PIN.");
        return;
      }
      setStep(2);
      setConfirmPin("");
      return;
    }

    // Step 2 validation
    if (confirmPin.length < 4) {
      setError("Please confirm your 4-digit PIN.");
      return;
    }

    if (initialPin !== confirmPin) {
      setError("PINs do not match. Please verify and try again.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const user = useAuthStore.getState().user;
      const userProfile = useAuthStore.getState().userProfile;
      useAuthStore.getState().updateUser({ isProfileComplete: true });

      notify.success("Transaction PIN set successfully! Welcome to Simkash.");
      const role = userProfile?.role || user?.role || "USER";
      navigate(getDashboardRouteByRole(role), { replace: true });
    }, 700);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setError(null);
    } else {
      navigate(-1);
    }
  };

  return (
    <AuthLayout showBack onBack={handleBack}>
      {/* Title & Subtext */}
      <div className="text-center md:text-left">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2563EB]">
          Step {step} of 2: {step === 1 ? "Setup" : "Confirmation"}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
          {step === 1
            ? "Set Your Transaction PIN"
            : "Confirm Your Transaction PIN"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          This 4-digit PIN will be required to authorize all wallet withdrawals,
          SIM distributions, and balance payments.
        </p>
      </div>

      {/* Red Alert on mismatch or validation error */}
      {error ? (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700 animate-in fade-in">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      {/* 4-digit InputOTP Form */}
      <form onSubmit={handleContinue} className="space-y-6">
        <div className="flex justify-center py-4">
          <InputOTP
            maxLength={4}
            value={currentPin}
            onChange={handlePinChange}
            autoFocus
          >
            <InputOTPGroup className="gap-3 sm:gap-4">
              {[0, 1, 2, 3].map((index) => (
                <InputOTPSlot
                  key={index}
                  index={index}
                  className="size-14 rounded-2xl border border-[#E2ECF6] bg-white text-2xl font-black text-[#0F172A] shadow-xs transition-all data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/25"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Security Advice Banner */}
        <div className="flex items-start gap-3 rounded-xl border border-amber-200/80 bg-amber-50/80 p-3.5 text-xs text-amber-900">
          <ShieldCheck className="mt-0.5 size-4.5 shrink-0 text-amber-600" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Security Advice:</strong> Never share
            your PIN with anyone, including Simkash agents. Simkash staff will
            never ask for your PIN.
          </p>
        </div>

        {/* CTA Button */}
        <button
          type="submit"
          disabled={isSubmitting || currentPin.length < 4}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : step === 1 ? (
            <>
              <span>Continue</span>
              <span aria-hidden="true">→</span>
            </>
          ) : (
            <>
              <span>Save PIN &amp; Complete Setup</span>
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
