import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

interface PinPadDisplayProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  error?: string;
  className?: string;
}

export function PinPadDisplay({
  value,
  onChange,
  length = 4,
  disabled = false,
  autoFocus = true,
  error,
  className = "",
}: PinPadDisplayProps) {
  const slotIndices = Array.from({ length }, (_, i) => i);

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <InputOTP
        maxLength={length}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoFocus={autoFocus}
      >
        <InputOTPGroup className="gap-3 sm:gap-4">
          {slotIndices.map((idx) => (
            <InputOTPSlot
              key={idx}
              index={idx}
              className={`size-14 rounded-2xl border border-[#E2ECF6] bg-white text-2xl font-black text-[#0F172A] shadow-xs transition-all data-[active=true]:border-[#2563EB] data-[active=true]:ring-2 data-[active=true]:ring-[#2563EB]/25 ${
                error
                  ? "border-red-400 text-red-600 data-[active=true]:border-red-500 data-[active=true]:ring-red-500/20"
                  : ""
              }`}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {error ? (
        <p className="text-center text-xs font-semibold text-red-600 animate-in fade-in">
          {error}
        </p>
      ) : null}
    </div>
  );
}
