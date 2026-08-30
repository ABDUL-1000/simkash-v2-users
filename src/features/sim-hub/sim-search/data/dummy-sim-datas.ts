import { CHAIN_NODE_COLORS, EVENT_HISTORY_COLORS } from "@/constants/colors";
import type { SimDetails } from "@/types/sim-details.types";

export const DUMMY_SIM_DETAILS: SimDetails = {
  simNumber: "07022222222",
  network: "mtn",
  simType: "POS SIM",
  iccid: "89234082104900234",
  activatedDate: "17 Jun 2026",
  expiryDate: "26 Jun 2026",
  daysRemaining: 2,
  chain: [
    { id: "batch", kind: "batch", label: "BATCH UPLOAD", dateLabel: "14 Jun 2026", title: "Batch #SKM-2026-0847", subtitle: "500 MTN POS SIMs uploaded by Super Admin", avatarBg: "#94A3B8" },
    { id: "admin", kind: "person", label: "SUPER ADMIN", dateLabel: "14–15 Jun 2026", title: "Yusuf Adam Baba", subtitle: "SIM held in Admin stock · 14–15 Jun 2026", roleTag: { label: "Admin", bg: "#EFF6FF", text: "#1E40AF" }, avatarInitials: "SA", avatarBg: "#0F1F36" },
    { id: "corp-agent", kind: "person", label: "CORPORATE AGENT", dateLabel: "Received 15 Jun", title: "Usman Bello", extra: "08065942373 · Kano", roleTag: { label: "Corp. Agent", bg: CHAIN_NODE_COLORS.purpleBg, text: CHAIN_NODE_COLORS.purpleText }, linkLabel: "View Profile", avatarInitials: "UB", avatarBg: CHAIN_NODE_COLORS.purpleText },
    { id: "agency-partner", kind: "person", label: "AGENCY PARTNER", dateLabel: "Received 16 Jun", title: "Rabiu Sani", extra: "08120600542 · Lagos", commission: "₦300", roleTag: { label: "Agency Partner", bg: "#EFF6FF", text: "#1E40AF" }, linkLabel: "View Profile", avatarInitials: "RS", avatarBg: "#3B82F6" },
    { id: "end-customer", kind: "person", label: "END CUSTOMER", dateLabel: "Activated 17 Jun", title: "Chidi Eze", extra: "0812***4521 · Activated 17 Jun · Expires 26 Jun 2026", badge: { label: "ACTIVATED", bg: "#DCFCE7", text: "#15803D" }, linkLabel: "Renew Now", avatarInitials: "✓", avatarBg: "#059669" },
  ],
  events: [
    { id: "1", icon: "upload", title: "SIM uploaded in Batch #SKM-2026-0847", timestamp: "14 Jun · 09:14 AM · by Yusuf Adam Baba" },
    { id: "2", icon: "arrow", title: "Distributed to Corporate Agent Usman Bello", timestamp: "15 Jun · 02:30 PM" },
    { id: "3", icon: "arrow", title: "Assigned to Agency Partner Rabiu Sani", timestamp: "16 Jun · 11:22 AM" },
    { id: "4", icon: "check", title: "Activated for Chidi Eze. Commission ₦300 credited to Rabiu Sani", timestamp: "17 Jun · 03:47 PM", tag: { label: "₦300", bg: "#DCFCE7", text: "#15803D" } },
    { id: "5", icon: "mail", title: "Renewal reminder sent — 7 days remaining", timestamp: "19 Jun · 08:00 AM · Automated", tag: { label: "System", bg: EVENT_HISTORY_COLORS.yellowBg, text: EVENT_HISTORY_COLORS.goldenText } },
  ],
  renewalHistory: [{ plan: "30-day plan", price: "₦5,000", note: "Customer-paid · 17 Jun 2026" }],
  notifications: [
    { id: "1", dotColor: "#22C55E", title: "30-day renewal reminder sent", timestamp: "14 Jun · Auto", tag: "Auto" },
    { id: "2", dotColor: "#22C55E", title: "14-day renewal reminder sent", timestamp: "3 Jun · Auto", tag: "Auto" },
    { id: "3", dotColor: "#F59E0B", title: "7-day renewal reminder sent", timestamp: "19 Jun · Auto", tag: "Auto" },
    { id: "4", dotColor: "#2563EB", title: "Agent manually notified", timestamp: "20 Jun · Manual", tag: "Manual" },
    { id: "5", dotColor: "#EF4444", title: "1-day expiry critical alert", timestamp: "25 Jun · Auto", tag: "Auto" },
  ],
  kyc: [
    { id: "1", label: "NIN (National Identification Number)", status: "pending" },
    { id: "2", label: "BVN (Bank Verification Number)", status: "pending" },
    { id: "3", label: "Face Verification", status: "pending" },
    { id: "4", label: "Address Document Verification", status: "pending" },
    { id: "5", label: "Physical Address Verification", status: "pending" },
    { id: "6", label: "Documents Uploaded", status: "pending" },
  ],
  dataUsage: {
    usedPct: 78,
    usedLabel: "14GB used of 18GB",
    remainingLabel: "4GB remaining",
    breakdown: [
      { label: "Today", value: "1.2GB" },
      { label: "This Week", value: "4.8GB" },
      { label: "This Month", value: "14GB" },
    ],
    plan: [
      { label: "Current Plan", value: "30-day POS SIM" },
      { label: "Plan Started", value: "17 Jun 2026" },
      { label: "Plan Expires", value: "26 Jun 2026", danger: true },
      { label: "Data Reset", value: "Every 30 days" },
    ],
    week: [
      { day: "Mon", pct: 55 },
      { day: "Tue", pct: 35 },
      { day: "Wed", pct: 60 },
      { day: "Thu", pct: 30 },
      { day: "Fri", pct: 100, active: true },
      { day: "Sat", pct: 25 },
      { day: "Sun", pct: 40 },
    ],
    alertEnabled: true,
    alertNote: "Alert sent to agent on 22 Jun 2026 at 80% threshold",
  },
};