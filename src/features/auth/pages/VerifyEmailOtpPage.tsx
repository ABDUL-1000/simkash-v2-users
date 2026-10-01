import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { appPaths } from "@/app/router/paths";
import { AuthLayout } from "../components/AuthLayout";
import { useVerifyOtp } from "../api/useVerifyOtp";
import { useVerifyForgotPasswordOtp } from "../api/useVerifyForgotPasswordOtp";
import { useResendOtp } from "../api/useResendOtp";
import { useForgotPassword } from "../api/useForgotPassword";

export default function VerifyEmailOtpPage() {
  const location = useLocation();
  const state = (location.state as { email?: string; from?: string; mode?: "register" | "forgot-password" }) || {};
  const userEmail = state.email || "user@simkash.ng";
  const isForgotPasswordMode = state.mode === "forgot-password" || state.from === "forgot-password";

  const [otp, setOtp] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(54);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const formatCountdown = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const { mutate: resendRegisterOtp, isPending: isResendingRegister } = useResendOtp({
    onSuccess: () => {
      setSecondsLeft(59);
      setOtp("");
      setError(null);
    },
  });

  const { mutate: resendForgotOtp, isPending: isResendingForgot } = useForgotPassword({
    onSuccess: () => {
      setSecondsLeft(59);
      setOtp("");
      setError(null);
    },
  });

  const { mutate: verifyRegistrationOtp, isPending: isVerifyingRegister } = useVerifyOtp({
    onError: (err) => {
      setError((err as any)?.response?.data?.message || err?.message || "Invalid or expired OTP code.");
    },
  });

  const { mutate: verifyForgotOtp, isPending: isVerifyingForgot } = useVerifyForgotPasswordOtp({
    onError: (err) => {
      setError((err as any)?.response?.data?.message || err?.message || "Invalid or expired reset code.");
    },
  });

  const isPending = isVerifyingRegister || isVerifyingForgot || isResendingRegister || isResendingForgot;

  const handleResend = () => {
    if (secondsLeft > 0 || isPending) return;
    if (isForgotPasswordMode) {
      resendForgotOtp({ email: userEmail });
    } else {
      resendRegisterOtp({ email: userEmail });
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (otp.length < 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }
    if (isForgotPasswordMode) {
      verifyForgotOtp({ email: userEmail, otp });
    } else {
      verifyRegistrationOtp({ email: userEmail, otp });
    }
  };

  return (
    <AuthLayout showBack backTo={isForgotPasswordMode ? appPaths.forgotPassword : appPaths.register}>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
          {isForgotPasswordMode ? "Verify Reset Code" : "Verify Your Email"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Enter the 6-digit verification code sent to{" "}
          <strong className="font-semibold text-[#0F172A]">{userEmail}</strong>
          {isForgotPasswordMode ? " to reset your password." : "."}
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 animate-in fade-in">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-center py-2">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(val) => {
              setOtp(val);
              if (error) setError(null);
            }}
            autoFocus
          >
            <InputOTPGroup className="gap-2 sm:gap-3">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <InputOTPSlot
                  key={idx}
                  index={idx}
                  className="size-12 rounded-xl border border-[#E2ECF6] bg-white text-lg font-bold text-[#0F172A] shadow-2xs transition-all data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/25"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="text-center text-sm">
          {secondsLeft > 0 ? (
            <span className="text-slate-500">
              Resend code in <strong className="font-semibold text-[#2563EB]">{formatCountdown(secondsLeft)}</strong>
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isPending}
              className="font-semibold text-[#2563EB] transition-colors hover:text-blue-700 hover:underline disabled:opacity-50"
            >
              Didn&apos;t receive code? Resend Code
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending || otp.length < 6}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <>
              <span>Verify &amp; Continue</span>
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
