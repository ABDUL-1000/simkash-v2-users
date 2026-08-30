export type UrgencyLevel = "critical" | "warning" | "watch";

export type RenewalRow = {
  id: string;
  urgency: UrgencyLevel;
  countdownLabel: string;
  customerName: string;
  customerPhoneMasked: string;
  simNumber: string;
  simType: string;
  network: string;
  activatedByName: string;
  activatedByRole: string;
  expiryDate: string;
  dataUsedGb: number;
  dataTotalGb: number;
  lastReminderLabel?: string;
  lastReminderNotSent?: boolean;
};

export type RenewalFilters = {
  tab: "all" | UrgencyLevel;
  simType?: string;
  network?: string;
  role?: string;
  usageAlert?: string;
  search: string;
};

export type RenewalTabCounts = {
  all: number;
  critical: number;
  warning: number;
  watch: number;
};