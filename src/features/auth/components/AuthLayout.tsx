import type { ReactNode } from "react";
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
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
