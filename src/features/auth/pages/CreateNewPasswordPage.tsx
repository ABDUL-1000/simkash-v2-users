import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { AuthLayout } from "../components/AuthLayout";
import { PasswordInputField } from "../components/PasswordInputField";
import { PasswordStrengthBar } from "../components/PasswordStrengthBar";
import { useResetPassword } from "../api/useResetPassword";
import { openNotification } from "@/utils/notifications";

export default function CreateNewPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as { email?: string; resetToken?: string }) || {};
  const token = state.resetToken;
  const email = state.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { mutate: resetPassword, isPending } = useResetPassword({
    onSuccess: () => {
      openNotification({
        state: "success",
        title: "Password Reset Successful",
        description: "Your password was updated. Please sign in with your new password.",
      });
      navigate(appPaths.login, { replace: true });
    },
    onError: (err) => {
      const msg =
        (err as any)?.response?.data?.message ||
        err?.message ||
        "Unable to reset password. Please try again.";
      setError(msg);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
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

    resetPassword({
      new_password: password,
      confirm_new_password: confirmPassword,
      token,
    });
  };

  return (
    <AuthLayout showBack backTo={appPaths.forgotPassword}>
      {/* Title & Subtext */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
          Create New Password
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          {email ? (
            <>
              Set a new secure password for{" "}
              <strong className="font-semibold text-[#0F172A]">{email}</strong>.
            </>
          ) : (
            "Your new password must be different from any previously used passwords."
          )}
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700 animate-in fade-in">
          {error}
        </div>
      ) : null}

      {/* Password Reset Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* New Password */}
        <div className="space-y-2">
          <PasswordInputField
            id="new-password"
            label="New Password"
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
            id="confirm-new-password"
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
            <span>Reset Password</span>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
