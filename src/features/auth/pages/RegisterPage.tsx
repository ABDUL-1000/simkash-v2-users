import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { AuthLayout } from "../components/AuthLayout";
import { PasswordInputField } from "../components/PasswordInputField";
import { PasswordStrengthBar } from "../components/PasswordStrengthBar";
import { useRegisterUser } from "../api/useRegisterUser";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate: registerUser, isPending } = useRegisterUser({
    onSuccess: () => {
      navigate(appPaths.verifyEmailOtp, {
        state: { email: email.trim(), mode: "register" },
      });
    },
    onError: (err) => {
      const msg =
        (err as any)?.response?.data?.message ||
        err?.message ||
        "Unable to register your account. Please try again.";
      setError(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    registerUser({
      email: email.trim(),
      password,
      confirm_password: confirmPassword,
    });
  };

  return (
    <AuthLayout showBack backTo={appPaths.login}>
      {/* Title & Subtext */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
          Create Your Account
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Join thousands of agents, partners, and businesses across Nigeria.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 animate-in fade-in">
          {error}
        </div>
      ) : null}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address */}
        <div className="space-y-1.5">
          <label
            htmlFor="register-email"
            className="block text-sm font-semibold text-[#0F172A]"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="register-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. name@example.com"
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-4 py-3 text-sm text-[#0F172A] placeholder-[#8C909B] transition-all outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          />
        </div>

        {/* Choose Password */}
        <div className="space-y-2">
          <PasswordInputField
            id="choose-password"
            label="Choose Password"
            requiredMark
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
          <PasswordStrengthBar password={password} />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <PasswordInputField
            id="confirm-password"
            label="Confirm Password"
            requiredMark
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat your password"
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
              <span>Create Account</span>
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </form>

      {/* Footer Link */}
      <p className="pt-2 text-center text-sm text-slate-500">
        Already have an account?{" "}
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
