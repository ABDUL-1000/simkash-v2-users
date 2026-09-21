import type {
  WalletBalanceData,
  BankAccountDetails,
  AccountManagerInfo,
  PayoutRecord,
  MonthlyEarningsBar,
} from "../types";

export const mockWalletBalance: WalletBalanceData = {
  totalBalance: 2_847_000,
  marginThisMonth: 1_247_000,
  networkCommissionThisMonth: 1_600_000,
  balanceRemaining: 7_500_000,
  bonusPending: 0,
  bonusTargetPct: 74,
  initialInvestment: 15_000_000,
  earnedThisMonth: 2_847_000,
  totalPaidOut: 760_000,
  simOrdersPaid: 4_250_000,
  balancePaidDown: 2_250_000,
  earningsInTotal: 10_550_000,
  payoutsOutTotal: 760_000,
  simOrdersTotal: 4_250_000,
  balancePayTotal: 2_250_000,
  netWalletPosition: 3_290_000,
};

export const mockBankAccount: BankAccountDetails = {
  bankName: "Access Bank",
  accountNumberMask: "****0476",
  accountNumberFull: "0123450476",
  accountName: "Zenith Corp Ltd",
  status: "Verified",
};

export const mockAccountManager: AccountManagerInfo = {
  name: "Kemi Ade",
  role: "Enterprise Account Manager",
  phone: "08012345678",
  whatsapp: "2348012345678",
};

export const mockMonthlyEarnings: MonthlyEarningsBar[] = [
  { month: "Jan", amount: 1_100_000 },
  { month: "Feb", amount: 1_350_000 },
  { month: "Mar", amount: 1_890_000 },
  { month: "Apr", amount: 1_950_000 },
  { month: "May", amount: 2_340_000 },
  { month: "Jun", amount: 2_847_000 },
];

export const mockRecentPayouts: PayoutRecord[] = [
  { id: "p-1", date: "16 Jun 2026", amount: 500_000, bank: "Access Bank", accountMask: "****0476", status: "Paid", timeAgo: "5 days ago" },
  { id: "p-2", date: "07 Jun 2026", amount: 260_000, bank: "Access Bank", accountMask: "****0476", status: "Paid", timeAgo: "2 weeks ago" },
  { id: "p-3", date: "21 May 2026", amount: 750_000, bank: "Access Bank", accountMask: "****0476", status: "Paid", timeAgo: "1 month ago" },
  { id: "p-4", date: "05 May 2026", amount: 500_000, bank: "Access Bank", accountMask: "****0476", status: "Paid", timeAgo: "1.5 months ago" },
  { id: "p-5", date: "01 Apr 2026", amount: 200_000, bank: "Access Bank", accountMask: "****0476", status: "Failed", timeAgo: "2.5 months ago" },
];
