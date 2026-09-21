import type {
  EpNotificationItem,
  EpNetworkActivityItem,
  EpRecentActivityItem,
} from "../types";

export const initialNotifications: EpNotificationItem[] = [
  {
    id: "notif-1",
    category: "investment",
    title: "Earnings Update",
    description: "₦2,847,000 earned this month — up 19% vs last month",
    timeAgo: "Today",
    read: false,
    typeBadge: "+19%",
  },
  {
    id: "notif-2",
    category: "system",
    title: "Stock Order Confirmed",
    description: "400 POS SIMs ordered · ₦1,000,000 · Ref ORD-EP-2026-00847",
    timeAgo: "Yesterday",
    read: false,
  },
  {
    id: "notif-3",
    category: "payments",
    title: "Balance Payment Received",
    description: "₦500,000 applied toward your ₦7,500,000 balance",
    timeAgo: "3 days ago",
    read: true,
  },
  {
    id: "notif-4",
    category: "system",
    title: "Price Change Active",
    description: "POS SIM retail price updated to ₦4,500 across your network",
    timeAgo: "1 week ago",
    read: true,
  },
  {
    id: "notif-5",
    category: "network",
    title: "Network Milestone",
    description: "Your network hit 14,847 activations this month — all time high!",
    timeAgo: "1 week ago",
    read: true,
  },
  {
    id: "notif-6",
    category: "system",
    title: "Account Manager Update",
    description: "Kemi Ade: Your Q2 performance review is ready for review.",
    timeAgo: "2 weeks ago",
    read: true,
  },
  {
    id: "notif-7",
    category: "investment",
    title: "Bonus Progress",
    description: "82% toward regional quarterly tier 1 bonus allocation.",
    timeAgo: "2 weeks ago",
    read: true,
  },
  {
    id: "notif-8",
    category: "network",
    title: "New SC Onboarded",
    description: "Chioma Eze onboarded for Imo state with 14 AP connections.",
    timeAgo: "3 weeks ago",
    read: true,
  },
  {
    id: "notif-9",
    category: "payments",
    title: "Wholesale Price Notice",
    description: "POS SIM wholesale maintained at standard enterprise discount rate.",
    timeAgo: "1 month ago",
    read: true,
  },
  {
    id: "notif-10",
    category: "system",
    title: "Account Verified",
    description: "Zenith Corp Ltd enterprise status verified and approved.",
    timeAgo: "1 month ago",
    read: true,
  },
];

export const initialNetworkActivities: EpNetworkActivityItem[] = [
  { id: "act-1", network: "MTN", phoneNumber: "07022222222", scName: "Chidi Eze", apName: "Aminat Agency", commission: 2000, timeAgo: "7 min ago" },
  { id: "act-2", network: "GLO", phoneNumber: "08033333333", scName: "Fatima Abdullahi", apName: "Kaduna North Apex", commission: 2000, timeAgo: "8 min ago" },
  { id: "act-3", network: "AIRTEL", phoneNumber: "08144444444", scName: "James Okafor", apName: "Lagos Mainland 1", commission: 2000, timeAgo: "15 min ago" },
  { id: "act-4", network: "9MOBILE", phoneNumber: "09055555555", scName: "Blessing Nwaosu", apName: "Abuja City Hub", commission: 2000, timeAgo: "22 min ago" },
  { id: "act-5", network: "MTN", phoneNumber: "07000000000", scName: "Ahmed Musa", apName: "Kano General Hub", commission: 2000, timeAgo: "35 min ago" },
  { id: "act-6", network: "GLO", phoneNumber: "08077777777", scName: "Grace Obi", apName: "Port Harcourt Central", commission: 2000, timeAgo: "1 hr ago" },
  { id: "act-7", network: "MTN", phoneNumber: "08188888888", scName: "David Eze", apName: "Enugu South Point", commission: 2000, timeAgo: "2 hr ago" },
  { id: "act-8", network: "AIRTEL", phoneNumber: "09099999999", scName: "Ngozi Adeyemi", apName: "Ibadan Central Link", commission: 2000, timeAgo: "3 hr ago" },
];

export const initialRecentActivities: EpRecentActivityItem[] = [
  { id: "rec-1", type: "activation", title: "Network activation", detail: "SC: Aminat · AP: Rabiu · +₦2,000", timeAgo: "2 min ago" },
  { id: "rec-2", type: "order", title: "New SIM order", detail: "500 POS SIMs ordered · ₦1.25M", timeAgo: "Yesterday" },
  { id: "rec-3", type: "balance", title: "Balance payment", detail: "₦500,000 paid toward balance", timeAgo: "3 days ago" },
  { id: "rec-4", type: "price", title: "Price updated", detail: "POS SIM retail ₦4,300 → ₦4,500", timeAgo: "1 week ago" },
  { id: "rec-5", type: "bonus", title: "Bonus achieved", detail: "May 2026 · Bonus paid", timeAgo: "1 month ago" },
];
