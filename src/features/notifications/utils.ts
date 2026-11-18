import { Headphones, ArrowDownLeft, ArrowUpRight, Bell, CalendarClock, Package, RotateCcw, Smartphone, Wifi, Wrench, Zap, type LucideIcon } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import type { AppNotification } from "./api";

/** Types offered in the filter. Types the server sends that aren't listed here are added from the loaded data. */
export const NOTIFICATION_TYPE_LABELS: Record<string, string> = {
  marketplace_order: "Orders",
  marketplace_easybuy: "EasyBuy",
  marketplace_return: "Returns",
  marketplace_installation: "Installation",
  wallet: "Wallet",
  transaction: "Transactions",
  bill_payment: "Bill payments",
  sim: "SIM",
  paylater: "PayLater",
  support: "Support",
};

export const typeLabel = (type: string) =>
  NOTIFICATION_TYPE_LABELS[type] ?? type.replace(/^marketplace_/, "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/** Pick an icon from the type first, then from the wording. */
export function notificationIcon({ type, title }: AppNotification): LucideIcon {
  const text = `${type} ${title}`.toLowerCase();
  if (type === "support" || /ticket|support/.test(text)) return Headphones;
  if (/easybuy|installment|instalment/.test(text)) return CalendarClock;
  if (/return|refund/.test(text)) return RotateCcw;
  if (/install/.test(text)) return Wrench;
  if (/order|dispatch|deliver/.test(text)) return Package;
  if (/electric|power|ekedc|ikedc|bill/.test(text)) return Zap;
  if (/airtime/.test(text)) return Smartphone;
  if (/data|internet/.test(text)) return Wifi;
  if (/top.?up|credited|received|deposit|funded/.test(text)) return ArrowDownLeft;
  if (/withdraw|payout|transfer|debit/.test(text)) return ArrowUpRight;
  return Bell;
}

/** Where tapping a notification goes. The in-app payload has no entity id, so we open the section. */
export function notificationHref({ type, title }: AppNotification): string | null {
  const text = `${type} ${title}`.toLowerCase();
  if (type === "support") return appPaths.supportTickets;
  if (/easybuy/.test(text)) return appPaths.easyBuy;
  if (/^marketplace_/.test(type) || /order/.test(text)) return appPaths.orders;
  if (/paylater/.test(text)) return appPaths.payLater;
  if (/wallet|transaction|airtime|data|bill|electric/.test(text)) return appPaths.transactions;
  return null;
}

/** "2 minutes ago", "3 hours ago", "Yesterday · 4:15 PM", "12 Jun · 4:15 PM". */
export function timeAgo(iso: string, now = Date.now()) {
  const date = new Date(iso);
  const mins = Math.floor((now - date.getTime()) / 60_000);
  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  const today = new Date(now); today.setHours(0, 0, 0, 0);
  if (date >= today) { const hours = Math.floor(mins / 60); return `${hours} hour${hours === 1 ? "" : "s"} ago`; }
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  if (date >= yesterday) return `Yesterday · ${time}`;
  const sameYear = date.getFullYear() === new Date(now).getFullYear();
  return `${date.toLocaleDateString("en-GB", { day: "numeric", month: "short", ...(sameYear ? {} : { year: "numeric" }) })} · ${time}`;
}
