import { useState } from "react";
import { Link } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { AuthLayout } from "../components/AuthLayout";
import { PasswordInputField } from "../components/PasswordInputField";
import { useLoginUser } from "../api/useLoginUser";

export default function LoginPage() {

  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate: loginUser, isPending } = useLoginUser({
    onError: (err) => {
      const msg =
        (err as any)?.response?.data?.message ||
        err?.message ||
        "Invalid credentials. Please try again.";
      setError(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!phoneOrEmail.trim() || !password) {
      setError("Please fill in both your email/phone and password.");
      return;
    }

    loginUser({
      phoneOrEmail: phoneOrEmail.trim(),
      password,
    });
  };

  return (
    <AuthLayout>
      {/* Title & Subtext */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign in to your account to manage your SIMs, devices, and wallet.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 animate-in fade-in">
          {error}
        </div>
      ) : null}

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Identifier Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="phoneOrEmail"
            className="block text-sm font-semibold text-[#0F172A]"
          >
            Email or Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phoneOrEmail"
            name="phoneOrEmail"
            type="text"
            required
            autoComplete="username"
            value={phoneOrEmail}
            onChange={(e) => setPhoneOrEmail(e.target.value)}
            placeholder="Enter your email or phone number"
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-4 py-3 text-sm text-[#0F172A] placeholder-[#8C909B] transition-all outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <PasswordInputField
            id="password"
            name="password"
            label="Password"
            requiredMark
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-start">
          <Link
            to={appPaths.forgotPassword}
            className="text-sm font-semibold text-[#2563EB] transition-colors hover:text-blue-700 hover:underline"
          >
            Forgot Password?
          </Link>
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
              <span>Sign In</span>
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </form>

      {/* Footer Link */}
      <p className="pt-2 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link
          to={appPaths.register}
          className="font-semibold text-[#2563EB] transition-colors hover:text-blue-700 hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
}
