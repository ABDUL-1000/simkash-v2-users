import type { ReactNode } from "react";

export function Tag({ children, bg, text }: { children: ReactNode; bg: string; text: string }) {
  return (
    <span className="inline-block rounded-md px-2.5 py-1 text-xs font-bold" style={{ backgroundColor: bg, color: text }}>
      {children}
    </span>
  );
}