export const scEndpoints = {
  dashboard: "/state-coordinator/dashboard/overview",
  partners: "/state-coordinator/dashboard/agency-partners",
  activations: "/state-coordinator/dashboard/recent-activations",
  distribute: "/state-coordinator/dashboard/distribute",
  onboardPartner: "/state-coordinator/dashboard/onboard-ap",
  wallet: "/state-coordinator/wallet/overview",
  transactions: "/state-coordinator/wallet/transactions",
  exportStatement: "/state-coordinator/wallet/transactions/export",
  payoutAccount: "/state-coordinator/wallet/payout-account",
  payouts: "/state-coordinator/wallet/payouts",
} as const;
