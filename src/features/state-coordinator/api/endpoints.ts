export const scEndpoints = {
  dashboard: "/state-coordinator/dashboard/overview",
  partners: "/state-coordinator/dashboard/agency-partners",
  activations: "/state-coordinator/dashboard/recent-activations",
  distribute: "/state-coordinator/dashboard/distribute",
  dashboardPayout: "/state-coordinator/dashboard/request-payout",
  onboardPartner: "/state-coordinator/dashboard/onboard-ap",
  wallet: "/state-coordinator/wallet/overview",
  transactions: "/state-coordinator/wallet/transactions",
  exportStatement: "/state-coordinator/wallet/transactions/export",
  payoutAccount: "/state-coordinator/wallet/payout-account",
  walletPayout: "/state-coordinator/wallet/request-payout",
} as const;
