import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { AuthLayout } from "../components/AuthLayout";
import { useForgotPassword } from "../api/useForgotPassword";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate: forgotPassword, isPending } = useForgotPassword({
    onSuccess: () => {
      navigate(appPaths.verifyEmailOtp, {
        state: { email: email.trim(), mode: "forgot-password" },
      });
    },
    onError: (err) => {
      const msg =
        (err as any)?.response?.data?.message ||
        err?.message ||
        "Unable to send reset code. Please check your email.";
      setError(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    forgotPassword({ email: email.trim() });
  };

  return (
    <AuthLayout showBack backTo={appPaths.login}>
      {/* Title & Subtext */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
          Reset Your Password
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Enter the email address associated with your Simkash account and we&apos;ll
          send you a secure link to reset your password.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 animate-in fade-in">
          {error}
        </div>
      ) : null}

      {/* Forgot Password Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address */}
        <div className="space-y-1.5">
          <label
            htmlFor="forgot-email"
            className="block text-sm font-semibold text-[#0F172A]"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="forgot-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. user@simkash.ng"
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-4 py-3 text-sm text-[#0F172A] placeholder-[#8C909B] transition-all outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          />
        </div>

        {/* Primary CTA */}
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] py-3.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <>
              <span>Send Reset Code</span>
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </form>

      {/* Footer Link */}
      <p className="pt-2 text-center text-sm text-slate-500">
        Remembered your password?{" "}
        <Link
          to={appPaths.login}
          className="font-semibold text-[#2563EB] transition-colors hover:text-blue-700 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
