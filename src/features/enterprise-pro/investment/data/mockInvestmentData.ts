import type {
  EarningsTimelinePoint,
  MonthlyEarningsBreakdownPoint,
  SimPerformanceMetric,
  AdditionalSimOrder,
  ReinvestSimProduct,
  BalancePaymentRecord,
} from "../types";

export const investmentSummaryData = {
  principalAmount: 50_000_000,
  totalEarnings: 59_500_000,
  netProfit: 9_500_000,
  roiPercentage: 19.0,
  paidOffAmount: 35_000_000,
  remainingBalance: 15_000_000,
  repaymentProgressPercent: 70,
  breakEvenTargetMonths: 18,
  monthsElapsed: 12,
  walletAvailable: 14_850_000,
};

export const accountManagerData = {
  name: "Kemi Ade",
  title: "Enterprise Wealth Advisor",
  email: "kemi.ade@simkash.ng",
  phone: "+234 802 345 6789",
  availability: "Mon - Fri, 8AM - 5PM WAT",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
};

export const earningsTimeline6M: EarningsTimelinePoint[] = [
  { month: "Apr", principal: 50_000_000, cumulativeEarnings: 38_000_000 },
  { month: "May", principal: 50_000_000, cumulativeEarnings: 42_200_000 },
  { month: "Jun", principal: 50_000_000, cumulativeEarnings: 46_500_000 },
  { month: "Jul", principal: 50_000_000, cumulativeEarnings: 50_800_000 },
  { month: "Aug", principal: 50_000_000, cumulativeEarnings: 55_100_000 },
  { month: "Sep", principal: 50_000_000, cumulativeEarnings: 59_500_000 },
];

export const earningsTimeline1Y: EarningsTimelinePoint[] = [
  { month: "Oct '25", principal: 50_000_000, cumulativeEarnings: 8_200_000 },
  { month: "Dec '25", principal: 50_000_000, cumulativeEarnings: 18_400_000 },
  { month: "Feb '26", principal: 50_000_000, cumulativeEarnings: 29_000_000 },
  { month: "Apr '26", principal: 50_000_000, cumulativeEarnings: 38_000_000 },
  { month: "Jun '26", principal: 50_000_000, cumulativeEarnings: 46_500_000 },
  { month: "Sep '26", principal: 50_000_000, cumulativeEarnings: 59_500_000 },
];

export const earningsTimelineAll: EarningsTimelinePoint[] = [
  { month: "Sep '25", principal: 50_000_000, cumulativeEarnings: 0 },
  { month: "Nov '25", principal: 50_000_000, cumulativeEarnings: 13_100_000 },
  { month: "Jan '26", principal: 50_000_000, cumulativeEarnings: 23_800_000 },
  { month: "Mar '26", principal: 50_000_000, cumulativeEarnings: 33_400_000 },
  { month: "May '26", principal: 50_000_000, cumulativeEarnings: 42_200_000 },
  { month: "Jul '26", principal: 50_000_000, cumulativeEarnings: 50_800_000 },
  { month: "Sep '26", principal: 50_000_000, cumulativeEarnings: 59_500_000 },
];

export const monthlyEarningsBreakdown: MonthlyEarningsBreakdownPoint[] = [
  { month: "Apr", simActivations: 2_100_000, dataRecharges: 1_600_000, bonusOverrides: 500_000 },
  { month: "May", simActivations: 2_350_000, dataRecharges: 1_850_000, bonusOverrides: 600_000 },
  { month: "Jun", simActivations: 2_400_000, dataRecharges: 2_100_000, bonusOverrides: 650_000 },
  { month: "Jul", simActivations: 2_600_000, dataRecharges: 2_300_000, bonusOverrides: 720_000 },
  { month: "Aug", simActivations: 2_750_000, dataRecharges: 2_450_000, bonusOverrides: 780_000 },
  { month: "Sep", simActivations: 2_900_000, dataRecharges: 2_650_000, bonusOverrides: 850_000 },
];

export const simPerformanceMetrics: SimPerformanceMetric[] = [
  { type: "Physical 5G SIM", activeCount: 14_250, totalVolume: 18_000, sharePercentage: 52, monthlyRevenue: 3_120_000, color: "#1677ff" },
  { type: "eSIM Pro Instant", activeCount: 6_800, totalVolume: 8_000, sharePercentage: 25, monthlyRevenue: 1_890_000, color: "#10b981" },
  { type: "IoT / M2M Machine", activeCount: 4_100, totalVolume: 5_500, sharePercentage: 15, monthlyRevenue: 980_000, color: "#f59e0b" },
  { type: "Standard 4G LTE", activeCount: 2_200, totalVolume: 3_500, sharePercentage: 8, monthlyRevenue: 410_000, color: "#8b5cf6" },
];

export const mockAdditionalOrders: AdditionalSimOrder[] = [
  { id: "ord-1", orderNumber: "ORD-EP-2026-0901", orderDate: "2026-09-15", simType: "Physical 5G", quantity: 5_000, unitCost: 450, totalAmount: 2_250_000, destinationSc: "Lagos Hub (Babatunde)", status: "Delivered" },
  { id: "ord-2", orderNumber: "ORD-EP-2026-0884", orderDate: "2026-09-08", simType: "eSIM Pro", quantity: 2_500, unitCost: 380, totalAmount: 950_000, destinationSc: "Abuja FCT (Aminat)", status: "Delivered" },
  { id: "ord-3", orderNumber: "ORD-EP-2026-0850", orderDate: "2026-08-28", simType: "Physical 5G", quantity: 3_000, unitCost: 450, totalAmount: 1_350_000, destinationSc: "Kano Central (Ibrahim)", status: "Delivered" },
  { id: "ord-4", orderNumber: "ORD-EP-2026-0822", orderDate: "2026-08-14", simType: "IoT Machine", quantity: 1_500, unitCost: 600, totalAmount: 900_000, destinationSc: "Rivers Port (Emeka)", status: "Delivered" },
  { id: "ord-5", orderNumber: "ORD-EP-2026-0790", orderDate: "2026-07-30", simType: "Physical 5G", quantity: 4_000, unitCost: 450, totalAmount: 1_800_000, destinationSc: "Oyo Ibadan (Folake)", status: "Delivered" },
];

export const reinvestProducts: ReinvestSimProduct[] = [
  { id: "p1", name: "Physical 5G Triple Cut", type: "SIM Card", wholesalePrice: 450, retailPrice: 1000, marginPerSim: 550, estimatedMonthlyRoi: "+4.2%", minOrder: 500, badge: "Most Popular", recommended: true },
  { id: "p2", name: "eSIM Pro Digital QR", type: "eSIM Profile", wholesalePrice: 380, retailPrice: 1200, marginPerSim: 820, estimatedMonthlyRoi: "+6.8%", minOrder: 250, badge: "Highest Margin" },
  { id: "p3", name: "IoT Machine Smart SIM", type: "M2M Rugged", wholesalePrice: 600, retailPrice: 1500, marginPerSim: 900, estimatedMonthlyRoi: "+5.1%", minOrder: 200, badge: "Enterprise Tier" },
  { id: "p4", name: "Standard 4G LTE SIM", type: "SIM Card", wholesalePrice: 350, retailPrice: 800, marginPerSim: 450, estimatedMonthlyRoi: "+3.5%", minOrder: 1000 },
];

export const mockPaymentHistory: BalancePaymentRecord[] = [
  { id: "pay-1", reference: "PAY-BL-2026-0912", date: "12 Sep 2026, 14:30", amount: 5_000_000, paymentMethod: "Enterprise Wallet", appliedTo: "Principal Paydown", remainingBalanceAfter: 15_000_000, status: "Successful" },
  { id: "pay-2", reference: "PAY-BL-2026-0805", date: "05 Aug 2026, 11:15", amount: 10_000_000, paymentMethod: "Direct Bank Wire", appliedTo: "Principal Paydown", remainingBalanceAfter: 20_000_000, status: "Successful" },
  { id: "pay-3", reference: "PAY-BL-2026-0701", date: "01 Jul 2026, 09:45", amount: 10_000_000, paymentMethod: "Enterprise Wallet", appliedTo: "Principal Paydown", remainingBalanceAfter: 30_000_000, status: "Successful" },
  { id: "pay-4", reference: "PAY-BL-2026-0520", date: "20 May 2026, 16:00", amount: 10_000_000, paymentMethod: "Direct Bank Wire", appliedTo: "Principal Paydown", remainingBalanceAfter: 40_000_000, status: "Successful" },
];
