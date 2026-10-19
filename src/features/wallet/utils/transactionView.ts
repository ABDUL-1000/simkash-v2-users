import type { WalletTransactionItem } from "../types/api";

// Bill purchases store their details in `metadata` in two shapes:
//   single purchase: metadata.info { phone, billersCode, serviceID | network }
//   bulk purchase:   metadata { phone, network, variation_code }
// plus metadata.providerResponse.content.transactions from the biller (VTpass).
type Meta = Record<string, unknown>;
const obj = (value: unknown): Meta => (value && typeof value === "object" ? value as Meta : {});
const str = (value: unknown) => (typeof value === "string" || typeof value === "number") && String(value).trim() ? String(value).trim() : undefined;

function parts(tx: WalletTransactionItem) {
  const meta = obj(tx.metadata);
  const info = obj(meta.info);
  const provider = obj(meta.providerResponse);
  const biller = obj(obj(provider.content).transactions);
  return { meta, info, provider, biller };
}

const NETWORKS: Array<[RegExp, string]> = [[/mtn/i, "MTN"], [/airtel/i, "Airtel"], [/glo/i, "Glo"], [/etisalat|9mobile|t2/i, "9mobile"]];

export const isCreditTransaction = (tx: Pick<WalletTransactionItem, "transaction_type" | "description">) =>
  /credit|inflow|top.?up|deposit|refund|commission|received|cashback|reversal/i.test(`${tx.transaction_type ?? ""} ${tx.description ?? ""}`);

export const isBillTransaction = (tx: WalletTransactionItem) => /airtime|data|electric|cable|tv|bill|waec|jamb/i.test(tx.transaction_type ?? "");

/** Number/meter/smartcard the purchase was for. The biller's unique_element is authoritative — info.phone can be the account holder's own number. */
export function getTransactionRecipient(tx: WalletTransactionItem): string | undefined {
  const { meta, info, biller } = parts(tx);
  return str(biller.unique_element) ?? str(meta.phone) ?? str(info.billersCode) ?? str(meta.billersCode) ?? str(info.phone);
}

/** Network/biller label, e.g. "MTN" from "mtn-data" or "MTN Airtime VTU". */
export function getTransactionNetwork(tx: WalletTransactionItem): string | undefined {
  const { meta, info, biller } = parts(tx);
  const source = [meta.network, info.serviceID, info.network, biller.product_name, info.product_name].map(str).find(Boolean);
  if (!source) return undefined;
  return NETWORKS.find(([pattern]) => pattern.test(source))?.[1] ?? source.toUpperCase();
}

/** Data plan code (e.g. mtn-10mb-100) for data purchases. */
export function getTransactionPlan(tx: WalletTransactionItem): string | undefined {
  const { meta, info } = parts(tx);
  return str(meta.variation_code) ?? str(info.variation_code);
}

export function getTransactionProduct(tx: WalletTransactionItem): string | undefined {
  const { info, biller } = parts(tx);
  return str(biller.product_name) ?? str(info.product_name);
}

/** Biller's message for failed purchases (e.g. "TRANSACTION FAILED"). */
export function getTransactionFailureReason(tx: WalletTransactionItem): string | undefined {
  if (!/fail/i.test(tx.status ?? "")) return undefined;
  const { provider } = parts(tx);
  return str(provider.response_description);
}

const money = (value: number) => `₦${Number(value || 0).toLocaleString()}`;

/** Title for list rows: "Bulk Data Purchase", "Airtime Purchase" (drops the " - MTN" suffix the API appends). */
export const getTransactionTitle = (tx: WalletTransactionItem) => tx.description?.split(" - ")[0]?.trim() || tx.transaction_type || "Transaction";

/** "MTN · 09065866898 · ₦100" for bill purchases; the description otherwise. */
export function getTransactionSubtitle(tx: WalletTransactionItem): string {
  const recipient = getTransactionRecipient(tx);
  const network = getTransactionNetwork(tx);
  if (isBillTransaction(tx) && (recipient || network)) return [network, recipient, money(tx.amount)].filter(Boolean).join(" · ");
  return tx.description || tx.transaction_type || "—";
}

/** Section label for grouped lists: TODAY, YESTERDAY, THIS WEEK, EARLIER THIS MONTH, or "SEPTEMBER 2026". */
export function getTransactionGroup(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "EARLIER";
  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const now = new Date();
  const days = Math.round((startOf(now) - startOf(date)) / 86_400_000);
  if (days <= 0) return "TODAY";
  if (days === 1) return "YESTERDAY";
  if (days < 7) return "THIS WEEK";
  if (date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) return "EARLIER THIS MONTH";
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" }).toUpperCase();
}

/** "Today · 9:35 PM", "Yesterday · 4:47 PM", "23 Jun · 3:22 PM". */
export function getTransactionTimeLabel(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const group = getTransactionGroup(dateStr);
  const day = group === "TODAY" ? "Today" : group === "YESTERDAY" ? "Yesterday" : date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  return `${day} · ${time}`;
}
