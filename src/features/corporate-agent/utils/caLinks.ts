import { appPaths } from "@/app/router/paths";

// Deep links so dashboard/partner actions open the page that owns the API (inventory, partners, wallet).
export const caDistributePath = (partnerId?: number | string) =>
  `${appPaths.caSimInventory}?tab=distribute${partnerId ? `&partner=${partnerId}` : ""}`;
export const caRedistributePath = (fromPartnerId?: number | string) =>
  `${appPaths.caSimInventory}?tab=redistribute${fromPartnerId ? `&from=${fromPartnerId}` : ""}`;
export const caRequestStockPath = () => `${appPaths.caSimInventory}?request=1`;
export const caOnboardPath = () => `${appPaths.agencyPartner}?onboard=1`;
export const caPayoutPath = () => `${appPaths.caWallet}?payout=1`;
