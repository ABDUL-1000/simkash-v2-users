import { posSimRoutes } from "@/features/sim-hub/pos-sim/pos-sim.routes";
import type { TRouteData } from "./route-types";
import { dashboardRoutes } from "@/features/dashboard/dashboard.routes";
import { billPaymentsRoutes } from "@/features/bill-payments/bill-payments.routes";
import { SimRecordRoutes } from "@/features/sim-hub/sim-record/sim-record.routes";
import { SimSearchRoutes } from "@/features/sim-hub/sim-search/sim-search.routes";
import { cctvSimRoutes } from "@/features/sim-hub/cctv-sim/cctv-sim.routes";
import { gpsSimRoutes } from "@/features/sim-hub/gps-sim/gps-sim.routes";
import { routerDeviceRoutes } from "@/features/sim-hub/router-device/router-device.routes";
import { renewalMonitoringRoutes } from "@/features/sim-hub/renewal-monitoring/renewal.routes";
import { SimSwapRoutes } from "@/features/sim-swap/sim-swap.routes";
import { DeviceHubRoutes } from "@/features/device-hub/device-hub.routes";
import { ZeroLimitSimRoutes } from "@/features/zero-limit-sim/zero-limit.routes";
import { AgencyPartnerRoutes } from "@/features/distribution/agency-partner/agency-partner.routes";
import { SubPartnerRoutes } from "@/features/distribution/sub-partners/sub-partners.routes";
import { CorporateAgentRoutes } from "@/features/distribution/coperate-agents/corperate-agents.routes";
import { EnterpriseRoutes } from "@/features/distribution/enterprise/enterprise.routes";
import { InstallerRoutes } from "@/features/distribution/installers/installers.routes";
import { SuspensionRoutes } from "@/features/suspensions/suspensions.routes";
import { ReferralRoutes } from "@/features/referrals/referrals.routes";
import { MarketplaceRoutes } from "@/features/marketplace/marketplace.routes";
import { WalletPayoutsRoutes } from "@/features/wallet-payouts/wallet-payouts.routes";
import { SettingsRoutes } from "@/features/settings/settings.routes";
import { SupportRoutes } from "@/features/support/support.routes";
import { GeneralManagerRoutes } from "@/features/distribution/general-managers/general-managers.routes";
import { RegionalManagerRoutes } from "@/features/distribution/regional-managers/regional-managers.routes";
import { OperationalManagerRoutes } from "@/features/distribution/operational-managers/operational-managers.routes";
import { SolarCctvDesignerRoutes } from "@/features/solar-cctv-designer/solar-cctv-designer.routes";

export const appRouteConfig: TRouteData[] = [
  ...dashboardRoutes,
  ...billPaymentsRoutes,
  ...posSimRoutes,
  ...cctvSimRoutes,
  ...SimRecordRoutes,
  ...SimSearchRoutes,
  ...gpsSimRoutes,
  ...routerDeviceRoutes,
  ...renewalMonitoringRoutes,
  ...DeviceHubRoutes,
  ...SimSwapRoutes,
  ...ZeroLimitSimRoutes,
  ...AgencyPartnerRoutes,
  ...SubPartnerRoutes,
  ...CorporateAgentRoutes,
  ...EnterpriseRoutes,
  ...InstallerRoutes,
  ...SuspensionRoutes,
  ...ReferralRoutes,
  ...MarketplaceRoutes,
  ...WalletPayoutsRoutes,
  ...SettingsRoutes,
  ...SupportRoutes,
  ...GeneralManagerRoutes,
  ...RegionalManagerRoutes,
  ...OperationalManagerRoutes,
  ...SolarCctvDesignerRoutes,
];
