import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface PasswordInputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  requiredMark?: boolean;
}

export const PasswordInputField = forwardRef<
  HTMLInputElement,
  PasswordInputFieldProps
>(function PasswordInputField(
  {
    error,
    label,
    requiredMark = false,
    className = "",
    disabled,
    id,
    placeholder = "At least 8 characters",
    ...props
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || props.name || "password-input";

  return (
    <div className="w-full space-y-1.5">
      {label ? (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-[#0F172A]"
        >
          {label} {requiredMark ? <span className="text-red-500">*</span> : null}
        </label>
      ) : null}

      <div className="relative">
        <input
          {...props}
          ref={ref}
          id={inputId}
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-white px-4 py-3 pr-11 text-sm text-[#0F172A] placeholder-[#8C909B] transition-all outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60 ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-[#E2ECF6] focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
          } ${className}`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
          disabled={disabled}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-3 -translate-y-1/2 p-1 text-slate-400 transition-colors hover:text-slate-600 focus:text-slate-600 focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="size-4.5" />
          ) : (
            <Eye className="size-4.5" />
          )}
        </button>
      </div>

      {error ? (
        <p className="text-xs font-medium text-red-600 animate-in fade-in">
          {error}
        </p>
      ) : null}
    </div>
  );
});
