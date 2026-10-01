import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuthHeaderBarProps {
  showBack?: boolean;
  backTo?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  className?: string;
}

export function AuthHeaderBar({
  showBack = false,
  backTo,
  onBack,
  rightAction,
  className = "",
}: AuthHeaderBarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header
      className={`flex w-full items-center justify-between px-6 py-4 md:hidden ${className}`}
      aria-label="Auth header"
    >
      {/* Left Back Arrow or Spacer */}
      <div className="flex w-10 items-center justify-start">
        {showBack ? (
          <button
            type="button"
            onClick={handleBack}
            className="flex size-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 active:scale-95"
            aria-label="Go back"
          >
            <ChevronLeft className="size-5" />
          </button>
        ) : null}
      </div>

      {/* Center Brand Logo */}
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-[#2563EB] shadow-xs">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="7.5" height="7.5" rx="2" fill="white" />
            <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" fill="white" />
            <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" fill="white" />
            <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" fill="white" />
          </svg>
        </div>
        <span className="text-xl font-bold tracking-tight text-[#0F172A]">Simkash</span>
      </div>

      {/* Right Action or Spacer */}
      <div className="flex w-10 items-center justify-end">
        {rightAction || null}
      </div>
    </header>
  );
}
