// Offline Nigerian network detection from NCC-allocated number prefixes.
// Prefixes can't see ported numbers (MNP), so always let the user override the detected network.
export type PhoneNetwork = "mtn" | "airtel" | "glo" | "9mobile";

const PREFIXES: Record<PhoneNetwork, string[]> = {
  mtn: ["0703", "0704", "0706", "07025", "07026", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906", "0913", "0916"],
  airtel: ["0701", "0708", "0802", "0808", "0812", "0901", "0902", "0904", "0907", "0911", "0912"],
  glo: ["0705", "0805", "0807", "0811", "0815", "0905", "0915"],
  "9mobile": ["0809", "0817", "0818", "0908", "0909"],
};
// Longest prefix first so 5-digit allocations (07025) win over 4-digit ones.
const LOOKUP = Object.entries(PREFIXES).flatMap(([network, prefixes]) => prefixes.map(prefix => [prefix, network as PhoneNetwork] as const))
  .sort((a, b) => b[0].length - a[0].length);

export const NETWORK_LABELS: Record<PhoneNetwork, string> = { mtn: "MTN", airtel: "Airtel", glo: "Glo", "9mobile": "9mobile" };

/** Converts +234 / 234 / 0-prefixed input to the 11-digit local format (e.g. 08031234567). */
export function normalizeNgPhone(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("234")) return `0${digits.slice(3)}`.slice(0, 11);
  return digits.slice(0, 11);
}

export const isValidNgPhone = (phone: string) => /^0[789][01]\d{8}$/.test(normalizeNgPhone(phone));

/** Network for a (possibly partial) number once its prefix is known, otherwise undefined. */
export function detectNetworkFromPhone(phone: string): PhoneNetwork | undefined {
  const local = normalizeNgPhone(phone);
  return LOOKUP.find(([prefix]) => local.startsWith(prefix))?.[1];
}

/** Finds the biller network whose serviceID/name matches a detected network (9mobile is "etisalat" on some billers). */
export function matchNetworkService<T extends { serviceID: string; name: string }>(network: PhoneNetwork | undefined, services: T[]): T | undefined {
  if (!network) return undefined;
  const aliases = network === "9mobile" ? ["9mobile", "etisalat", "t2"] : [network];
  return services.find(service => aliases.some(alias => service.serviceID.toLowerCase().startsWith(alias) || service.name.toLowerCase().includes(alias)));
}
