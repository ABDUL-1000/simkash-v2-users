import type { ReactNode } from "react";

export type ChainNode = {
  id: string;
  kind: "batch" | "person";
  label: string;
  dateLabel: string;
  title: string;
  subtitle?: string;
  roleTag?: { label: string; bg: string; text: string };
  extra?: string;
  commission?: string;
  linkLabel?: string;
  badge?: { label: string; bg: string; text: string };
  avatarInitials?: string;
  avatarBg?: string;
};

export type EventLogItem = {
  id: string;
  icon: "upload" | "arrow" | "check" | "mail";
  title: string;
  timestamp: string;
  tag?: { label: string; bg: string; text: string };
};

export type NotificationLogItem = { id: string; dotColor: string; title: string; timestamp: string; tag: "Auto" | "Manual" };
export type KycItem = { id: string; label: string; status: "pending" | "verified" | "failed" };

export type UsageBreakdownRow = { label: string; value: string };
export type PlanDetailRow = { label: string; value: string; danger?: boolean };
export type DayUsage = { day: string; pct: number; active?: boolean };

export type SimDataUsage = {
  usedPct: number;
  usedLabel: string;
  remainingLabel: string;
  breakdown: UsageBreakdownRow[];
  plan: PlanDetailRow[];
  week: DayUsage[];
  alertEnabled: boolean;
  alertNote: string;
};

export type SimDetails = {
  simNumber: string;
  network: string;
  simType: string;
  iccid: string;
  activatedDate: string;
  expiryDate: string;
  daysRemaining: number;
  chain: ChainNode[];
  events: EventLogItem[];
  renewalHistory?: { plan: string; price: string; note: string }[];
  notifications: NotificationLogItem[];
  kyc: KycItem[];
  dataUsage: SimDataUsage;
};

export type SimAction = "renew" | "pnd" | "notify-agent" | "notify-customer" | "set-usage-alert" | "deactivate";
export type OnSimAction = (action: SimAction | string) => void;

export type { ReactNode };