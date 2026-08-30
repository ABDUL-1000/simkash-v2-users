import type { ReactNode } from "react";
import { Info } from "lucide-react";

type InfoBannerProps = {
  children: ReactNode;
  className?: string;
};

export function InfoBanner({ children, className }: InfoBannerProps) {
  return (
    <>
      <div
        className={`flex items-start gap-3 rounded-xl border p-2 text-[10px] ${className ?? ""}`}
        style={{ backgroundColor: "#F0F6FF", borderColor: "#E2ECF8" }}
      >
        <Info
          className="flex items mt-1 justify-center size-3 shrink-0"
          style={{ color: "#2563EB" }}
        />
        <div>
          <p style={{ color: "#0F1F3680" }}>{children}</p>
        </div>
      </div>
    </>
  );
}
