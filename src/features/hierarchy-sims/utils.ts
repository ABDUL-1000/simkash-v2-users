import type { LeaderboardPeriod, SimRequestStatus, SimRequestUrgency, SimType } from "./types";

export const SIM_TYPES: SimType[] = ["pos", "cctv", "gps", "router", "cctv_device"];
export const SIM_TYPE_LABELS: Record<SimType, string> = {
  pos: "POS SIM", cctv: "CCTV SIM", gps: "GPS SIM", router: "Router SIM", cctv_device: "CCTV Device",
};
// Same values the inventory screens filter by.
export const NETWORKS = ["MTN", "AIRTEL", "GLO", "9MOBILE"];

export const PERIODS: { value: LeaderboardPeriod; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "this_week", label: "This Week" },
  { value: "this_month", label: "This Month" },
  { value: "last_month", label: "Last Month" },
  { value: "all_time", label: "All Time" },
];

export const URGENCIES: { value: SimRequestUrgency; label: string }[] = [
  { value: "low", label: "Low" }, { value: "normal", label: "Normal" }, { value: "high", label: "High" }, { value: "urgent", label: "Urgent" },
];

export const STATUS_STYLES: Record<SimRequestStatus, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-[#FFFBEB] text-[#D9990D]" },
  APPROVED: { label: "Approved", className: "bg-[#EBFFF8] text-[#10B981]" },
  REJECTED: { label: "Declined", className: "bg-[#FFF1F2] text-[#EF4444]" },
  CANCELLED: { label: "Cancelled", className: "bg-[#EFF4F8] text-[#66738C]" },
};

export const URGENCY_STYLES: Record<SimRequestUrgency, string> = {
  low: "bg-[#EFF4F8] text-[#66738C]",
  normal: "bg-[#EFF4F8] text-[#2563EB]",
  high: "bg-[#FFFBEB] text-[#D9990D]",
  urgent: "bg-[#FFF1F2] text-[#EF4444]",
};

export const simTypeLabel = (type: string) => SIM_TYPE_LABELS[type as SimType] ?? type;
/** The word for one item: device serials for CCTV devices, SIMs for the rest. */
export const unitLabel = (type: string | undefined, count: number) => type === "cctv_device" ? (count === 1 ? "device" : "devices") : (count === 1 ? "SIM" : "SIMs");

export const fmtDateTime = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }) : "—";
export const fmtNumber = (value?: number | null) => (value ?? 0).toLocaleString("en-NG");

/** Splits pasted SIM numbers on commas, spaces or new lines, dropping duplicates. */
export const parseNumbers = (text: string) => [...new Set(text.split(/[\s,;]+/).map((s) => s.trim()).filter(Boolean))];
