import type { EasyBuyStatus, InstallmentStatus } from "./types/api";

export { naira } from "@/features/marketplace/utils";

/** Due dates are calendar days (midnight UTC) — format in UTC so they never shift a day. */
export const fmtDueDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "—";

export const fmtDateTime = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

export const STATUS_TABS: { key: EasyBuyStatus | ""; label: string }[] = [
  { key: "", label: "All" },
  { key: "pending_approval", label: "Awaiting approval" },
  { key: "approved", label: "Approved" },
  { key: "active", label: "Active" },
  { key: "overdue", label: "Overdue" },
  { key: "completed", label: "Completed" },
  { key: "rejected", label: "Rejected" },
  { key: "expired", label: "Expired" },
  { key: "cancelled", label: "Cancelled" },
];

const TONE = {
  blue: "bg-[#EFF4F8] text-[#2563EB]",
  amber: "bg-[#FFFBEB] text-[#D9990D]",
  green: "bg-[#EBFFF8] text-[#10B981]",
  red: "bg-[#FFF7F8] text-[#EF4444]",
  gray: "bg-slate-100 text-[#66738C]",
} as const;

export const STATUS_TONE: Record<EasyBuyStatus, string> = {
  pending_approval: TONE.amber,
  approved: TONE.blue,
  rejected: TONE.red,
  expired: TONE.gray,
  active: TONE.green,
  overdue: TONE.red,
  completed: TONE.green,
  defaulted: TONE.red,
  cancelled: TONE.gray,
};

export const INSTALLMENT_TONE: Record<InstallmentStatus, string> = {
  pending: TONE.gray,
  partially_paid: TONE.amber,
  paid: TONE.green,
  overdue: TONE.red,
  waived: TONE.blue,
};

export const INSTALLMENT_LABEL: Record<InstallmentStatus, string> = {
  pending: "Pending", partially_paid: "Part paid", paid: "Paid", overdue: "Overdue", waived: "Waived",
};

export const PAYMENT_KIND_LABEL: Record<string, string> = { down_payment: "Down payment", installment: "Installment" };
export const PAYMENT_METHOD_LABEL: Record<string, string> = { wallet: "Wallet", card: "Card", auto_debit: "Auto-debit" };

export const humanise = (value: string) => value.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** "2d 4h 10m left" until the approval window closes; null once it has passed. */
export const timeLeft = (iso: string | null, now: number) => {
  if (!iso) return null;
  const ms = new Date(iso).getTime() - now;
  if (ms <= 0) return null;
  const mins = Math.floor(ms / 60_000);
  const d = Math.floor(mins / 1440), h = Math.floor((mins % 1440) / 60), m = mins % 60;
  return [d ? `${d}d` : "", h || d ? `${h}h` : "", `${m}m`].filter(Boolean).join(" ") + " left";
};
