import { BadgeDollarSign, CircleCheckBig, CreditCard, HandCoins, LockKeyhole, Plus, ReceiptText, SatelliteDish, Search, ShieldAlert, Smartphone, UserRoundSearch, Users } from "lucide-react";
import type {
  DashboardKpiItem,
  DashboardAlert,
  DashboardQuickAction,
  DashboardActivity,
  AgentPerformance,
  AgentDistributionItem,
  DashboardStat,
  DashboardTransaction,
  RevenuePoint,
  SimActivationPoint,
  NetworkStock,
  SimStockMetric,
  RevenueBreakdownItem,
  WeeklyReviewItem,
} from "./types/dashboard.types";

export const dashboardKpis: DashboardKpiItem[] = [
  { key: "active-sims", label: "Active SIMs", value: "142,847", indicatorColor: "#10B981", trend: { value: "847", caption: "today" } },
  { key: "activations", label: "Activations today", value: "1,204", indicatorColor: "#38BDF8", trend: { value: "18%" } },
  { key: "revenue", label: "Revenue today", value: "₦2.4M", indicatorColor: "#10B981", trend: { value: "12%" } },
  { key: "payouts", label: "Pending payouts", value: "₦8.7M", indicatorColor: "#F59E0B", supportingMetric: { value: "23", label: "requests" } },
  { key: "agents", label: "Agents online", value: "3,847", indicatorColor: "#38BDF8", trend: { value: "142", caption: "new" } },
  { key: "expiring", label: "Expiring ≤30 days", value: "3,204", indicatorColor: "#F59E0B", note: "Renewal Monitoring" },
];

export const dashboardStats: DashboardStat[] = [
  { key: "sims", title: "Total Active SIMs", value: "142,847", description: "MTN 62K · Airtel 41K · Glo 28K · T2 11K", trend: 18, trendType: "positive", icon: Smartphone, iconBackgroundColor: "#E8EEFC", iconColor: "#2563EB", decorationColor: "#F1F5FD" },
  { key: "users", title: "Registered Users", value: "12,480", description: "Agents, partners, administrators and installers", trend: 8.2, trendType: "positive", icon: Users, iconBackgroundColor: "#E8F8F3", iconColor: "#059669", decorationColor: "#F0FBF7" },
  { key: "transactions", title: "Transactions", value: "8,642", description: "Successful activity recorded across all services", trend: 1.4, trendType: "negative", icon: ReceiptText, iconBackgroundColor: "#FFF4E5", iconColor: "#D97706", decorationColor: "#FFF9F0" },
  { key: "revenue", title: "Total Revenue", value: "₦6.42M", description: "Revenue generated across the SimKash platform", trend: 12.5, trendType: "positive", icon: CreditCard, iconBackgroundColor: "#F2EAFE", iconColor: "#7C3AED", decorationColor: "#F8F4FF" },
];

export const revenueData: RevenuePoint[] = [
  { month: "Jan", revenue: 2_800_000 },
  { month: "Feb", revenue: 3_200_000 },
  { month: "Mar", revenue: 2_900_000 },
  { month: "Apr", revenue: 4_100_000 },
  { month: "May", revenue: 4_850_000 },
  { month: "Jun", revenue: 6_420_000 },
];

export const simActivationData: SimActivationPoint[] = [
  { date: "Jun 11", mtn: 18, glo: 15, airtel: 13, t2: 17 },
  { date: "Jun 12", mtn: 22, glo: 16, airtel: 14, t2: 19 },
  { date: "Jun 13", mtn: 17, glo: 15, airtel: 13, t2: 16 },
  { date: "Jun 14", mtn: 25, glo: 18, airtel: 14, t2: 24 },
  { date: "Jun 15", mtn: 27, glo: 21, airtel: 15, t2: 25 },
  { date: "Jun 16", mtn: 30, glo: 23, airtel: 16, t2: 26 },
  { date: "Jun 17", mtn: 28, glo: 26, airtel: 18, t2: 33 },
  { date: "Jun 18", mtn: 31, glo: 22, airtel: 17, t2: 25 },
  { date: "Jun 19", mtn: 35, glo: 27, airtel: 20, t2: 31 },
  { date: "Jun 20", mtn: 39, glo: 25, airtel: 22, t2: 29 },
  { date: "Jun 21", mtn: 42, glo: 31, airtel: 24, t2: 37 },
  { date: "Jun 22", mtn: 44, glo: 28, airtel: 25, t2: 34 },
  { date: "Jun 23", mtn: 48, glo: 34, airtel: 27, t2: 41 },
  { date: "Today", mtn: 55, glo: 38, airtel: 29, t2: 45 },
];

export const dashboardQuickActions: DashboardQuickAction[] = [
  { key: "upload-stock", label: "Upload SIM Stock", icon: Plus, iconBackgroundColor: "#EFF6FF", iconColor: "#2563EB" },
  { key: "allocations", label: "Approve Allocations", icon: CircleCheckBig, iconBackgroundColor: "#ECFDF5", iconColor: "#059669" },
  { key: "payouts", label: "Approve Payouts", icon: HandCoins, iconBackgroundColor: "#FFFBEB", iconColor: "#D97706" },
  { key: "applications", label: "Review Applications", icon: UserRoundSearch, iconBackgroundColor: "#F5F3FF", iconColor: "#7C3AED" },
  { key: "suspensions", label: "Suspension Queue", icon: ShieldAlert, iconBackgroundColor: "#FEF2F2", iconColor: "#DC2626" },
  { key: "referrals", label: "Approve Referrals", icon: BadgeDollarSign, iconBackgroundColor: "#ECFDF5", iconColor: "#059669" },
  { key: "sim-search", label: "SIM Search", icon: Search, iconBackgroundColor: "#EFF6FF", iconColor: "#2563EB" },
  { key: "easybuy", label: "EasyBuy Review", icon: CreditCard, iconBackgroundColor: "#FFFBEB", iconColor: "#D97706" },
];

export const dashboardAlerts: DashboardAlert[] = [
  { key: "suspended", title: "3 accounts suspended", detail: "— pending asset transfer", meta: "Requires attention", actionLabel: "Review", backgroundColor: "#FFF1F2", borderColor: "#FECDD3", indicatorColor: "#EF4444" },
  { key: "unactivated", title: "847 SIMs unactivated", detail: "for more than 14 days", meta: "Across 12 Agency Partners", actionLabel: "Reassign", backgroundColor: "#FFFBEB", borderColor: "#FDE68A", indicatorColor: "#F59E0B" },
  { key: "payout-requests", title: "23 payout requests", detail: "awaiting approval — ₦8.7M total", meta: "Oldest: 2 days ago", actionLabel: "Approve", backgroundColor: "#FFFBEB", borderColor: "#FDE68A", indicatorColor: "#F59E0B" },
  { key: "easybuy-applications", title: "7 EasyBuy applications", detail: "pending review", meta: "Submitted today", actionLabel: "Review", backgroundColor: "#EFF6FF", borderColor: "#BFDBFE", indicatorColor: "#2563EB" },
  { key: "referral-deals", title: "12 referral deals", detail: "pending commission approval", meta: "₦600,000 queued", actionLabel: "Approve", backgroundColor: "#ECFDF5", borderColor: "#A7F3D0", indicatorColor: "#10B981" },
];

export const simStockMetrics: SimStockMetric[] = [
  { key: "in-stock", label: "In Stock", value: "28,410", description: "Available to distribute" },
  { key: "assigned", label: "Assigned", value: "96,203", description: "With agents" },
  { key: "activated", label: "Activated", value: "142,847", description: "Live with customers" },
  { key: "expiring", label: "Expiring", value: "3,204", description: "Within 7 days", highlight: true },
];

export const networkStocks: NetworkStock[] = [
  { key: "mtn", label: "MTN", value: "62,847", percentage: 44, color: "#FBBF24", tabBackground: "#FEF9C3", tabBorder: "#FDE68A", tabText: "#A16207" },
  { key: "airtel", label: "Airtel", value: "41,203", percentage: 29, color: "#EF4444", tabBackground: "#FEE2E2", tabBorder: "#FECACA", tabText: "#B91C1C" },
  { key: "glo", label: "Glo", value: "28,400", percentage: 20, color: "#10B981", tabBackground: "#D1FAE5", tabBorder: "#A7F3D0", tabText: "#047857" },
  { key: "t2", label: "T2", value: "10,397", percentage: 7, color: "#2563EB", tabBackground: "#DBEAFE", tabBorder: "#BFDBFE", tabText: "#1D4ED8" },
];

export const dashboardActivities: DashboardActivity[] = [
  { key: "distribution", title: "Corporate Agent", detail: "Usman Bello distributed 50 SIMs to Agency Partner Rabiu Sani", timestamp: "2 minutes ago", icon: SatelliteDish, iconBackgroundColor: "#EFF6FF", iconColor: "#2563EB" },
  { key: "payout", title: "Payout request", detail: "₦45,000 from Aminat Okafor", timestamp: "7 minutes ago", icon: HandCoins, iconBackgroundColor: "#ECFDF5", iconColor: "#059669", badge: "₦45K", badgeColor: "#10B981" },
  { key: "suspension", title: "Account suspended", detail: "Elidan Corp. Asset transfer pending", timestamp: "14 minutes ago", icon: LockKeyhole, iconBackgroundColor: "#FEF2F2", iconColor: "#DC2626", badge: "Action", badgeColor: "#F59E0B" },
  { key: "activation", title: "SIM activated", detail: "MTN POS by Chidi Eze, customer 0812***4521", timestamp: "18 minutes ago", icon: Smartphone, iconBackgroundColor: "#EFF6FF", iconColor: "#2563EB", badge: "+₦300", badgeColor: "#10B981" },
];

export const agentPerformanceData: AgentPerformance[] = [
  { key: "usman-bello", name: "Usman Bello", phone: "08065942373", location: "Kano", role: "Corporate Agent", simsActivated: 847, revenue: "₦508,200", activationRate: 96, rating: "Excellent", action: "View" },
  { key: "rabiu-sani", name: "Rabiu Sani", phone: "08120600542", location: "Lagos", role: "Agency Partner", simsActivated: 623, revenue: "₦186,900", activationRate: 82, rating: "Good", action: "View" },
  { key: "glory-effah", name: "Glory Effah", phone: "07055093537", location: "Lagos", role: "Agency Partner", simsActivated: 210, revenue: "₦63,000", activationRate: 58, rating: "Average", action: "Coach" },
  { key: "francis-udom", name: "Francis Udom", phone: "08164147750", location: "Akwa Ibom", role: "Corporate Agent", simsActivated: 518, revenue: "₦310,800", activationRate: 78, rating: "Good", action: "View" },
  { key: "abdullahi-garba", name: "Abdullahi Garba", phone: "08120428684", location: "Lagos", role: "Corporate Agent", simsActivated: 518, revenue: "₦310,800", activationRate: 31, rating: "Good", action: "View" },
];

export const revenueBreakdownData: RevenueBreakdownItem[] = [
  { key: "activations", label: "SIM Activations", value: "₦48.2M", color: "#2563EB" },
  { key: "renewals", label: "Renewals", value: "₦22.1M", color: "#10B981" },
  { key: "marketplace", label: "Marketplace", value: "₦9.4M", color: "#F59E0B" },
  { key: "swap-fees", label: "SIM Swap Fees", value: "₦4.5M", color: "#FECACA" },
];

export const agentDistributionData: AgentDistributionItem[] = [
  { key: "agency-partners", label: "Agency Partners", value: "11,204", percentage: 75, color: "#2563EB" },
  { key: "corporate-agents", label: "Corporate Agents", value: "2,847", percentage: 19, color: "#8B5CF6" },
  { key: "enterprise", label: "Enterprise", value: "421", percentage: 4, color: "#38BDF8" },
  { key: "installers", label: "Installers", value: "360", percentage: 3, color: "#10B981" },
];

export const weeklyReviewData: WeeklyReviewItem[] = [
  { key: "activations", label: "Activations", value: "7,204", trend: "14% vs last wk", tone: "positive" },
  { key: "revenue", label: "Revenue", value: "₦19.8M", trend: "8%", tone: "positive" },
  { key: "new-agents", label: "New Agents", value: "142", trend: "23 this week", tone: "positive" },
  { key: "issues", label: "Customer Issues", value: "8", trend: "2 unresolved", tone: "negative" },
];

export const recentTransactions: DashboardTransaction[] = [
  { id: "TRX-20481", customer: "Amara Okafor", type: "Data plan", amount: "₦5,000", status: "Successful", date: "Today, 10:32" },
  { id: "TRX-20480", customer: "Tunde Bello", type: "Airtime", amount: "₦2,500", status: "Pending", date: "Today, 09:18" },
  { id: "TRX-20479", customer: "Zainab Musa", type: "SIM activation", amount: "₦1,000", status: "Successful", date: "Yesterday, 16:44" },
  { id: "TRX-20478", customer: "Chidi Eze", type: "Wallet funding", amount: "₦20,000", status: "Failed", date: "Yesterday, 14:06" },
];
