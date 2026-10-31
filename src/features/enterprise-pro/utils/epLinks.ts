import { appPaths } from "@/app/router/paths";

// Deep links so actions open the page that owns the API (inventory, network, wallet).
export const epDistributePath = (scId?: number | string) =>
  `${appPaths.enterpriseProSimDistribute}${scId ? `?scId=${scId}` : ""}`;
export const epRedistributePath = (fromScId?: number | string) =>
  `${appPaths.enterpriseProSimDistribute}?tab=redistribute${fromScId ? `&from=${fromScId}` : ""}`;
export const epRequestStockPath = (type?: string) =>
  `${appPaths.enterpriseProSimInventory}?request=1${type ? `&type=${type.toLowerCase()}` : ""}`;
export const epOnboardPath = () => `${appPaths.enterpriseProNetwork}?onboard=1`;
export const epPayoutPath = () => `${appPaths.enterpriseWallet}?payout=1`;
