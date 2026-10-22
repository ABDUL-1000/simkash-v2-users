import { appPaths } from "@/app/router/paths";

/** SIM Inventory → "Distribute to AP" tab, optionally preselecting a partner or the all-low flow. */
export function scDistributePath(partnerId?: number, allLow = false) {
  const params = new URLSearchParams({ tab: "distribute" });
  if (partnerId) params.set("partner", String(partnerId));
  if (allLow) params.set("all_low", "1");
  return `${appPaths.scSimInventory}?${params}`;
}

export const scOnboardPath = `${appPaths.scAgencyPartners}?onboard=1`;
export const scPayoutPath = `${appPaths.scWallet}?payout=1`;

/** SIM Inventory → "Redistribute" tab, optionally preselecting the AP the SIMs are taken from. */
export function scRedistributePath(fromPartnerId?: number) {
  const params = new URLSearchParams({ tab: "redistribute" });
  if (fromPartnerId) params.set("from", String(fromPartnerId));
  return `${appPaths.scSimInventory}?${params}`;
}
