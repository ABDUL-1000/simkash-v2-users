import { useMemo } from "react";
import type { PasswordStrengthResult } from "../types";

interface PasswordStrengthBarProps {
  password?: string;
  className?: string;
}

export function calculatePasswordStrength(password: string): PasswordStrengthResult {
  if (!password) {
    return {
      score: 0,
      level: "weak",
      label: "",
      colorClass: "bg-[#E2ECF6]",
    };
  }

  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) score += 1;

  if (score <= 1) {
    return {
      score: 1,
      level: "weak",
      label: "Weak Password",
      colorClass: "bg-amber-500",
    };
  }
  if (score === 2) {
    return {
      score: 2,
      level: "fair",
      label: "Fair Password",
      colorClass: "bg-amber-500",
    };
  }
  if (score === 3) {
    return {
      score: 3,
      level: "good",
      label: "Strong Password",
      colorClass: "bg-[#2563EB]",
    };
  }
  return {
    score: 4,
    level: "strong",
    label: "Very Strong Password",
    colorClass: "bg-[#2563EB]",
  };
}

export function PasswordStrengthBar({
  password = "",
  className = "",
}: PasswordStrengthBarProps) {
  const { score, label } = useMemo(
    () => calculatePasswordStrength(password),
    [password]
  );

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {/* 4 horizontal progress segments */}
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((index) => {
          const isActive = score >= index;
          return (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive ? "bg-[#2563EB]" : "bg-[#E2ECF6]"
              }`}
            />
          );
        })}
      </div>

      {/* Strength Label */}
      {label ? (
        <p className="text-xs font-semibold text-[#2563EB] transition-opacity">
          {label}
        </p>
      ) : null}
    </div>
  );
}
