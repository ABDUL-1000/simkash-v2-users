import { useLocation, useNavigate, Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { AuthLayout } from "../components/AuthLayout";
import { useForgotPassword } from "../api/useForgotPassword";

export default function CheckEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail =
    (location.state as { email?: string })?.email || "user@simkash.ng";

  const { mutate: resendLink, isPending: isResending } = useForgotPassword();

  const handleOpenEmail = () => {
    window.location.href = "mailto:";
  };

  const handleResend = () => {
    resendLink({ email: userEmail });
  };

  return (
    <AuthLayout showBack backTo={appPaths.forgotPassword}>
      <div className="flex flex-col items-center text-center">
        {/* Soft Blue Circular Badge with Envelope */}
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-blue-50 text-[#2563EB] ring-8 ring-blue-50/50">
          <Mail className="size-9" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-[#0F172A]">
          Check Your Email
        </h1>

        {/* Subtext */}
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
          We&apos;ve sent a password reset link to{" "}
          <strong className="font-semibold text-[#0F172A]">{userEmail}</strong>.
          Click the link in that email to create a new password.
        </p>

        {/* Actions */}
        <div className="mt-8 w-full space-y-3">
          <button
            type="button"
            onClick={() =>
              navigate(appPaths.verifyEmailOtp, {
                state: { email: userEmail, mode: "forgot-password" },
              })
            }
            className="flex w-full items-center justify-center rounded-xl bg-[#2563EB] py-3.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.99]"
          >
            Enter 6-Digit Code →
          </button>

          <button
            type="button"
            onClick={handleOpenEmail}
            className="flex w-full items-center justify-center rounded-xl border border-[#E2ECF6] bg-white py-3 px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 active:scale-[0.99]"
          >
            Open Email App
          </button>
        </div>

        {/* Resend Link */}
        <div className="mt-6 text-sm text-slate-500">
          Didn&apos;t receive the email?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="font-semibold text-[#2563EB] transition-colors hover:text-blue-700 hover:underline disabled:opacity-50"
          >
            {isResending ? "Resending..." : "Resend Link"}
          </button>
        </div>

        {/* Return to Sign In */}
        <p className="mt-4 text-xs text-slate-400">
          <Link
            to={appPaths.login}
            className="text-slate-500 hover:text-slate-700 hover:underline"
          >
            Back to Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
