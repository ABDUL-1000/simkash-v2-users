import { lazy } from "react";

export const WalletPayoutsPage = lazy(
  () => import("./pages/WalletPayoutsPage")
);

export const AgencyPartnerCommissionsPage = lazy(
  () => import("./pages/AgencyPartnerCommissionsPage")
);

export const WalletAgentDetailsPage = lazy(
  () => import("./pages/WalletAgentDetailsPage")
);

export const TransactionHistoryPage = lazy(
  () => import("./pages/TransactionHistoryPage")
);

export const TransactionDetailsPage = lazy(
  () => import("./pages/TransactionDetailsPage")
);

export const FlaggedTransactionsPage = lazy(
  () => import("./pages/FlaggedTransactionsPage")
);

export const PerformanceIntelligencePage = lazy(
  () => import("./pages/PerformanceIntelligencePage")
);

export const AgentPerformanceDetailsPage = lazy(
  () => import("./pages/AgentPerformanceDetailsPage")
);

export const BonusTrackingPage = lazy(
  () => import("./pages/BonusTrackingPage")
);
