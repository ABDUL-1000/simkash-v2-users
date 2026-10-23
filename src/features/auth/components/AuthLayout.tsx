import type { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthBrandHeroPanel } from "./AuthBrandHeroPanel";
import { AuthHeaderBar } from "./AuthHeaderBar";

interface AuthLayoutProps {
  children: ReactNode;
  showBack?: boolean;
  backTo?: string;
  onBack?: () => void;
  rightAction?: ReactNode;
  maxWidth?: string;
}

export function AuthLayout({
  children,
  showBack = false,
  backTo,
  onBack,
  rightAction,
  maxWidth = "max-w-[480px]",
}: AuthLayoutProps) {
  const navigate = useNavigate();
  const handleBack = () => {
    if (onBack) onBack();
    else if (backTo) navigate(backTo);
    else navigate(-1);
  };

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left 42% Dark Brand Hero Panel for Desktop */}
      <AuthBrandHeroPanel />

      {/* Right Canvas: Mobile Header + Form Content */}
      <div className="flex min-h-screen flex-1 flex-col bg-white">
        {/* Mobile Header Bar */}
        <AuthHeaderBar
          showBack={showBack}
          backTo={backTo}
          onBack={onBack}
          rightAction={rightAction}
        />

        {/* Centered Form Wrapper */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-8 sm:px-10 md:py-12 lg:px-16">
          <div className={`w-full ${maxWidth} space-y-6`}>
            {/* Desktop Back Button (mobile uses the header bar) */}
            {showBack ? (
              <button
                type="button"
                onClick={handleBack}
                className="hidden items-center gap-1 text-sm font-semibold text-slate-500 transition-colors hover:text-[#2563EB] md:inline-flex"
              >
                <ChevronLeft className="size-4" />
                Back
              </button>
            ) : null}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
