import type { BillTransactionItem } from "../types/api";

// The transactions endpoint doesn't document its item fields, so read the common names defensively
// and derive the bill kind from the biller serviceID (mtn, mtn-data, ikeja-electric, dstv, waec, …).
type Raw = BillTransactionItem & Record<string, unknown>;
export type BillKind = "airtime" | "data" | "electricity" | "cable" | "education" | "airtime_cash" | "data_cash" | "other";

export interface BillRowView { id: string | number; kind: BillKind; title: string; subtitle: string; amount: number; credit: boolean; status: "success" | "pending" | "failed"; date?: Date; reference?: string }

const str = (value: unknown) => (typeof value === "string" || typeof value === "number") && String(value).trim() ? String(value).trim() : undefined;
const pick = (raw: Raw, keys: string[]) => keys.map(key => str(raw[key])).find(Boolean);

const TITLES: Record<BillKind, string> = { airtime: "Airtime", data: "Data", electricity: "Electricity", cable: "Cable TV", education: "Exam PIN", airtime_cash: "Airtime to Cash", data_cash: "Data to Cash", other: "Bill Payment" };
const PROVIDERS: Record<string, string> = {
  mtn: "MTN", airtel: "Airtel", glo: "Glo", etisalat: "9mobile", "9mobile": "9mobile", dstv: "DSTV", gotv: "GOtv", startimes: "StarTimes", showmax: "Showmax",
  "ikeja-electric": "IKEDC", "eko-electric": "EKEDC", "abuja-electric": "AEDC", "kano-electric": "KEDCO", "portharcourt-electric": "PHED", "jos-electric": "JED",
  "kaduna-electric": "KAEDCO", "enugu-electric": "EEDC", "ibadan-electric": "IBEDC", "benin-electric": "BEDC", "aba-electric": "ABA", "yola-electric": "YEDC", waec: "WAEC", "waec-registration": "WAEC", jamb: "JAMB",
};

function kindOf(raw: Raw, serviceId: string): BillKind {
  const hint = `${pick(raw, ["type", "service_type", "category", "bill_type", "transaction_type", "service"]) ?? ""} ${serviceId}`.toLowerCase();
  if (/airtime.?(to.?)?cash/.test(hint)) return "airtime_cash";
  if (/data.?(to.?)?cash/.test(hint)) return "data_cash";
  if (/data/.test(hint)) return "data";
  if (/electric|power|meter|disco/.test(hint)) return "electricity";
  if (/cable|tv|dstv|gotv|startimes|showmax/.test(hint)) return "cable";
  if (/waec|jamb|neco|exam|education|result/.test(hint)) return "education";
  if (/airtime|mtn|airtel|glo|etisalat|9mobile|vtu/.test(hint)) return "airtime";
  return "other";
}

const statusOf = (value?: string): BillRowView["status"] => {
  const s = (value ?? "").toLowerCase();
  if (/fail|cancel|revers|refund|declin|error/.test(s)) return "failed";
  if (/pend|process|initiat|queue/.test(s)) return "pending";
  return "success";
};

export function toBillRow(item: BillTransactionItem): BillRowView {
  // Transactions arrive as wallet records ({ transaction_type, metadata: { info | phone/network, providerResponse } });
  // flatten the useful metadata onto the row before reading it. The biller's unique_element is the real recipient.
  const top = item as Raw;
  const meta = (top.metadata && typeof top.metadata === "object" ? top.metadata : {}) as Raw;
  const info = (meta.info && typeof meta.info === "object" ? meta.info : {}) as Raw;
  const biller = ((((meta.providerResponse as Raw | undefined)?.content as Raw | undefined)?.transactions) ?? {}) as Raw;
  const raw = { ...info, ...meta, ...top, type: top.transaction_type ?? top.type, phone: str(biller.unique_element) ?? str(meta.phone) ?? str(info.billersCode) ?? str(info.phone) ?? top.phone,
    reference: top.transaction_reference ?? top.reference, product_name: biller.product_name ?? info.product_name } as unknown as Raw;
  const serviceId = pick(raw, ["serviceID", "service_id", "serviceId", "network", "biller", "provider"]) ?? "";
  const kind = kindOf(raw, serviceId);
  const providerKey = serviceId.toLowerCase().replace(/-data$/, "");
  const provider = PROVIDERS[providerKey] ?? PROVIDERS[serviceId.toLowerCase().split(" ")[0]] ?? pick(raw, ["provider", "biller", "provider_name"]) ?? (serviceId ? serviceId.toUpperCase() : undefined);
  const recipient = pick(raw, ["phone", "recipient", "billersCode", "billers_code", "meter_number", "smartcard_number", "smartcard", "customer_number", "profile_id"]);
  const pkg = pick(raw, ["variation", "variation_name", "package", "plan", "plan_name", "bouquet", "variation_code"]);
  const amount = Number(raw.amount ?? raw.total_amount ?? 0) || 0;
  const credit = kind === "airtime_cash" || kind === "data_cash" || /credit/i.test(pick(raw, ["flow", "direction", "entry_type"]) ?? "");
  const detail = kind === "electricity" && recipient ? `Meter ${recipient}` : kind === "cable" ? pkg ?? recipient : kind === "airtime_cash" ? `₦${amount.toLocaleString()} converted` : recipient ?? pkg;
  const created = pick(raw, ["createdAt", "created_at", "date", "transaction_date"]);
  const date = created ? new Date(created) : undefined;
  return {
    id: raw.id ?? raw.reference, kind, credit, amount,
    title: kind === "other" ? str(raw.title) ?? TITLES.other : TITLES[kind],
    subtitle: [provider, detail].filter(Boolean).join(" · ") || pick(raw, ["description", "narration"]) || raw.reference || `#${raw.id}`,
    status: statusOf(pick(raw, ["status", "transaction_status"])),
    date: date && !Number.isNaN(date.getTime()) ? date : undefined,
    reference: pick(raw, ["reference", "request_id", "transaction_id"]),
  };
}

/** "Today", "Yesterday", "20 Jun" (adds the year when it isn't the current year). */
export function billDateLabel(date?: Date) {
  if (!date) return "";
  const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((startOf(new Date()) - startOf(date)) / 86_400_000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", ...(date.getFullYear() !== new Date().getFullYear() ? { year: "numeric" } : {}) });
}
