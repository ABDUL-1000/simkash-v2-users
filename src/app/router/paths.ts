export const appPaths = {
  root: "/",
  dashboard: "/dashboard",
  userDashboard: "/dashboard",
  stateCoordinatorDashboard: "/dashboard/state-coordinator",
  agencyPartnerDashboard: "/dashboard/agency-partner",
  corporateAgentDashboard: "/dashboard/corporate-agent",
  caSimInventory: "/sim-inventory/corporate-agent",
  caSimActivation: "/dashboard/corporate-agent/sim-activation",
  regionalManagerDashboard: "/dashboard/regional-manager",
  rmCustomers: "/dashboard/regional-manager/customers",
  rmStateCoordinators: "/dashboard/regional-manager/state-coordinators",
  rmSimInventory: "/sim-inventory/rm",
  rmRedistributeSims: "/sim-inventory/rm/redistribute",
  rmNetworkActivity: "/dashboard/regional-manager/network-activity",
  rmNetworkPerformance: "/dashboard/regional-manager/performance",
  rmNetwork: "/network/rm",
  rmScDetails: (id?: string) => ({
    format: "/dashboard/regional-manager/sc/:id",
    path: `/dashboard/regional-manager/sc/${id ? encodeURIComponent(id) : "aminat-okafor"}`,
  }),
  simActivation: "/sim-activation",
  wallet: "/wallet",
  scWallet: "/wallet/sc",
  scSimInventory: "/sim-inventory/sc",
  scNetwork: "/network/sc",
  scActivationDetails: (id?: string) => ({
    format: "/network/sc/activation/:id",
    path: `/network/sc/activation/${id ? encodeURIComponent(id) : "ACT-2026-008472"}`,
  }),
  billPayments: "/bill-payments",
  deviceSim: "/device-sim",
  deviceSimDetails: (simId?: string) => ({
    format: `/device-sim/:simId`,
    path: `/device-sim/${simId ? encodeURIComponent(simId) : "07022222222"}`,
  }),
  esim: "/esim",
  virtualNumber: "/virtual-number",
  zeroLimitSim: "/zero-limit-sim",
  payLater: "/paylater",
  marketplace: "/marketplace",
  transactions: "/transactions",
  referrals: "/referrals",
  settings: "/settings",
  support: "/support",
  supportTicketDetails: (id?: string) => ({
    format: "/support/tickets/:id",
    path: `/support/tickets/${id ? encodeURIComponent(id) : ""}`,
  }),
  faqArticle: (slug?: string) => ({
    format: "/support/faq/:slug",
    path: `/support/faq/${slug ? encodeURIComponent(slug) : ""}`,
  }),

  // SIM Hub & Device paths
  posSim: "/device-sim/pos",
  routerDevice: "/device-sim/router-device",
  cctvSim: "/device-sim/cctv",
  gpsSim: "/device-sim/gps",
  routerSim: "/device-sim/router-sim",
  simRecords: "/device-sim/sim-records",
  adminSimSearch: "/device-sim/admin-sim-search",
  adminSimSearchDetails: (simId?: string) => ({
    format: `/device-sim/admin-sim-search/:simId`,
    path: `/device-sim/admin-sim-search/${simId ? encodeURIComponent(simId) : ""}`,
  }),
  renewalMonitoring: "/device-sim/renewal-monitoring",
  deviceHub: "/device-sim/device-hub",
  simSwaps: "/device-sim/sim-swap",
  zeroLimitSims: "/zero-limit-sim",

  // Solar CCTV Designer
  solarCctvDesigner: "/solar-cctv-designer",
  solarComponentPricing: "/solar-cctv-designer/pricing",
  solarCctvDesignDetails: (id?: string) => ({
    format: "/solar-cctv-designer/:id",
    path: `/solar-cctv-designer/${id ? encodeURIComponent(id) : ""}`,
  }),
  solarIrradianceData: "/solar-cctv-designer/irradiance",
  solarDesignerPreview: "/solar-cctv-designer/preview",

  // Distribution
  agencyPartner: "/distribution/agency-partner",
  agencyPartnerDetails: (id?: string) => ({
    format: "/corporate-agent/agency-partner/:id",
    path: `/corporate-agent/agency-partner/${id ? encodeURIComponent(id) : ""}`,
  }),
  agencyPartnerCA: "/distribution/agency-partner",
  agencyPartnerCADetails: (id?: string) => ({
    format: "/distribution/agency-partner/:id",
    path: `/distribution/agency-partner/${id ? encodeURIComponent(id) : ""}`,
  }),
  agencyPartnerReferralsDetails: (id?: string) => ({
    format: "/distribution/agency-partner/:id/referrals",
    path: `/distribution/agency-partner/${id ? encodeURIComponent(id) : ""}/referrals`,
  }),
  agencyPartnerSimInventory: (id?: string) => ({
    format: "/distribution/agency-partner/:id/sim-inventory",
    path: `/distribution/agency-partner/${id ? encodeURIComponent(id) : ""}/sim-inventory`,
  }),
  agencyPartnerStock: "/distribution/agency-partner/stock",
  apSimStock: "/sim-stock",
  apCustomers: "/agency-partner/customers",
  apCustomerDetails: (id?: string) => ({
    format: "/agency-partner/customers/:id",
    path: `/agency-partner/customers/${id ? encodeURIComponent(id) : "cust-1"}`,
  }),
  agenciesManagement: "/distribution/agencies-management",

  distribution: {
    posManagement: "/distribution/pos-management",
    agencyPartner: "/distribution/agency-partner",
    agencyPartnerDetails: (id?: string) => ({
      format: "/distribution/agency-partner/:id",
      path: `/distribution/agency-partner/${id ? encodeURIComponent(id) : ""}`,
    }),
    agencyPartnerReferralsDetails: (id?: string) => ({
      format: "/distribution/agency-partner/:id/referrals",
      path: `/distribution/agency-partner/${id ? encodeURIComponent(id) : ""}/referrals`,
    }),
    agencyPartnerSimInventory: (id?: string) => ({
      format: "/distribution/agency-partner/:id/sim-inventory",
      path: `/distribution/agency-partner/${id ? encodeURIComponent(id) : ""}/sim-inventory`,
    }),
    agenciesManagement: "/distribution/agencies-management",
  },
  generalManagers: "/distribution/general-managers",
  generalManagerDetails: (id?: string) => ({
    format: "/distribution/general-managers/:id",
    path: `/distribution/general-managers/${id ? encodeURIComponent(id) : ""}`,
  }),
  operationalManagers: "/distribution/operational-managers",
  operationalManagerDetails: (id?: string) => ({
    format: "/distribution/operational-managers/:id",
    path: `/distribution/operational-managers/${id ? encodeURIComponent(id) : ""}`,
  }),
  regionalManagers: "/distribution/regional-managers",
  regionalManagerDetails: (id?: string) => ({
    format: "/distribution/regional-managers/:id",
    path: `/distribution/regional-managers/${id ? encodeURIComponent(id) : ""}`,
  }),
  corporateAgent: "/distribution/corporate-agents",
  corporateAgentDetails: (id?: string) => ({
    format: "/distribution/corporate-agents/:id",
    path: `/distribution/corporate-agents/${id ? encodeURIComponent(id) : ""}`,
  }),
  enterprise: "/distribution/enterprise",
  enterpriseDetails: (id?: string) => ({
    format: "/distribution/enterprise/:id",
    path: `/distribution/enterprise/${id ? encodeURIComponent(id) : ""}`,
  }),
  installers: "/distribution/installers",
  installerDetails: (id?: string) => ({
    format: "/distribution/installers/:id",
    path: `/distribution/installers/${id ? encodeURIComponent(id) : ""}`,
  }),
  jobPool: "/distribution/job-pool",
  subPartners: (partnerId?: string) => ({
    format: "/distribution/sub-partners/:partnerId",
    path: `/distribution/sub-partners/${partnerId ? encodeURIComponent(partnerId) : ""}`,
  }),
  subPartnerDetails: (id?: string) => ({
    format: "/distribution/sub-partners/details/:id",
    path: `/distribution/sub-partners/details/${id ? encodeURIComponent(id) : ""}`,
  }),
  suspensions: "/distribution/suspensions",
  suspensionDetails: (id?: string) => ({
    format: "/distribution/suspensions/:id",
    path: `/distribution/suspensions/${id ? encodeURIComponent(id) : ""}`,
  }),
  referralDetails: (id?: string) => ({
    format: "/referrals/:id",
    path: `/referrals/${id ? encodeURIComponent(id) : ""}`,
  }),
  referralsDetails: (id?: string) => ({
    format: "/referrals/:id",
    path: `/referrals/${id ? encodeURIComponent(id) : ""}`,
  }),
  vendorManagement: "/marketplace/vendors",
  orders: "/marketplace/orders",
  marketplaceDetails: (id?: string) => ({
    format: "/marketplace/:id",
    path: `/marketplace/${id ? encodeURIComponent(id) : ""}`,
  }),
  walletPayouts: "/finance/wallet-payouts",
  agencyPartnerCommissions: "/finance/agency-partner-commissions",
  walletAgentDetails: (id?: string) => ({
    format: "/finance/wallet-agent/:id",
    path: `/finance/wallet-agent/${id ? encodeURIComponent(id) : ""}`,
  }),
  transactionHistory: "/transactions",
  transactionDetails: (id?: string) => ({
    format: "/transactions/:id",
    path: `/transactions/${id ? encodeURIComponent(id) : ""}`,
  }),
  flaggedTransactions: "/finance/flagged-transactions",

  performance: "/finance/performance",
  performanceAgentDetails: (id?: string) => ({
    format: "/finance/performance/agent/:id",
    path: `/finance/performance/agent/${id ? encodeURIComponent(id) : ""}`,
  }),
  bonusTracking: "/finance/bonus-tracking",
  scBonusTracker: "/bonus/sc",
  scBonusHistory: "/bonus/sc/history",

  simManagement: {
    simSearch: "/sim-management/sim-search",
    inventory: "/sim-management/inventory",
    allocations: "/sim-management/allocations",
    mapping: "/sim-management/mapping",
    posBundles: "/sim-management/pos-bundles",
  },

  settingsTab: (tab?: string) => ({
    format: "/settings/:tab",
    path: `/settings/${tab || "general"}`,
  }),

  login: "/login",
  logout: "/logout",
  auth: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
} as const;
