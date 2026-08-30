import type { TRouteData } from "@/app/router/route-types";
import { appPaths } from "@/app/router/paths";
import {
  WalletPayoutsPage,
  AgencyPartnerCommissionsPage,
  WalletAgentDetailsPage,
  TransactionHistoryPage,
  TransactionDetailsPage,
  FlaggedTransactionsPage,
  PerformanceIntelligencePage,
  AgentPerformanceDetailsPage,
  BonusTrackingPage,
} from "./wallet-payouts.lazy";

export const WalletPayoutsRoutes: TRouteData[] = [
  {
    path: appPaths.walletPayouts,
    element: <WalletPayoutsPage />,
    title: "Wallet & Payouts",
    isSearchable: true,
  },
  {
    path: appPaths.agencyPartnerCommissions,
    element: <AgencyPartnerCommissionsPage />,
    title: "Agency Partner Commissions",
    isSearchable: true,
  },
  {
    path: appPaths.walletAgentDetails().format,
    element: <WalletAgentDetailsPage />,
    title: "Wallet Agent Details",
    isSearchable: false,
  },
  {
    path: appPaths.transactionHistory,
    element: <TransactionHistoryPage />,
    title: "Transaction History",
    isSearchable: true,
  },
  {
    path: appPaths.transactionDetails().format,
    element: <TransactionDetailsPage />,
    title: "Transaction Details",
    isSearchable: false,
  },
  {
    path: appPaths.flaggedTransactions,
    element: <FlaggedTransactionsPage />,
    title: "Flagged Transactions",
    isSearchable: true,
  },
  {
    path: appPaths.performance,
    element: <PerformanceIntelligencePage />,
    title: "Performance & Intelligence",
    isSearchable: true,
  },
  {
    path: appPaths.performanceAgentDetails().format,
    element: <AgentPerformanceDetailsPage />,
    title: "Agent Performance Details",
    isSearchable: false,
  },
  {
    path: appPaths.bonusTracking,
    element: <BonusTrackingPage />,
    title: "Bonus & Reward Tracking",
    isSearchable: true,
  },
];
