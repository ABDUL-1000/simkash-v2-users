import type { TRouteData } from "./route-types";
import { dashboardRoutes } from "@/features/dashboard/dashboard.routes";
import { billPaymentsRoutes } from "@/features/bill-payments/bill-payments.routes";

import { ZeroLimitSimRoutes } from "@/features/zero-limit-sim/zero-limit.routes";
import { payLaterRoutes } from "@/features/paylater/paylater.routes";

import { ReferralRoutes } from "@/features/referrals/referrals.routes";
import { MarketplaceRoutes } from "@/features/marketplace/marketplace.routes";
import { WalletPayoutsRoutes } from "@/features/wallet-payouts/wallet-payouts.routes";
import { SettingsRoutes } from "@/features/settings/settings.routes";
import { SupportRoutes } from "@/features/support/support.routes";

import { transactionsRoutes } from "@/features/transactions/transactions.routes";
import { AgencyPartnerRoutes } from "@/features/corporate-agent/my-partner/agency-partner.routes";
import { enterpriseProRoutes } from "@/features/enterprise-pro/enterprise-pro.routes";

export const appRouteConfig: TRouteData[] = [
  ...enterpriseProRoutes,
  ...dashboardRoutes,
  ...billPaymentsRoutes,
  ...ZeroLimitSimRoutes,
  ...payLaterRoutes,
  ...transactionsRoutes,
  ...AgencyPartnerRoutes,
  ...ReferralRoutes,
  ...MarketplaceRoutes,
  ...WalletPayoutsRoutes,
  ...SettingsRoutes,
  ...SupportRoutes,
];
