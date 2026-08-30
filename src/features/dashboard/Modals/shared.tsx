import { cn } from "@/lib/utils";

export function InitialsAvatar({ name, size = 44 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <span
      className="grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] text-sm font-bold text-white"
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

export function Tag({
  children,
  bg,
  text,
  className,
}: {
  children: React.ReactNode;
  bg: string;
  text: string;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-block rounded-md px-2.5 py-1 text-xs font-bold", className)}
      style={{ backgroundColor: bg, color: text }}
    >
      {children}
    </span>
  );
}

export function VerificationDot({ label, status }: { label: string; status: "done" | "pending" }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm text-[#334155]">
      <span
        className="size-2 rounded-full"
        style={{ backgroundColor: status === "done" ? "#059669" : "#D97706" }}
      />
      {label}
    </span>
  );
}