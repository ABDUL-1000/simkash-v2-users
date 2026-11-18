import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type { ApiResponse } from "@/features/auth/types/api";
import type {
  EasyBuyAgreement, EasyBuyApplyPayload, EasyBuyListData, EasyBuyListQuery, EasyBuyPayPayload, EasyBuyPayResult,
} from "../types/api";

const EB = "/marketplace/easybuy";

/** Calls the API and unwraps `{ success, message, data }`; throws the server message (written for customers) on failure. */
async function call<T>(method: "get" | "post", url: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const response = method === "get"
    ? await authedHttpClient.get<ApiResponse<T>>(url, { params: body, signal })
    : await authedHttpClient.post<ApiResponse<T>>(url, body ?? {}, { signal });
  if (!response.data?.success) throw new Error(response.data?.message || "Request failed");
  return response.data.data;
}
const useToken = () => Boolean(useAuthStore((state) => state.accessToken));

export const ebKeys = {
  all: ["easybuy"] as const,
  list: (query: EasyBuyListQuery) => ["easybuy", "list", query] as const,
  detail: (id?: string | number) => ["easybuy", "detail", String(id)] as const,
};

/**
 * Fill in anything the server leaves out, so screens never crash on a missing block.
 * The list and some action responses send a slimmer agreement (e.g. no `actions`, `amounts` or `plan`);
 * when `actions` is missing we derive it from the status the same way the server does.
 */
type RawAgreement = Partial<Omit<EasyBuyAgreement, "actions" | "amounts" | "plan" | "product">> & {
  actions?: Partial<EasyBuyAgreement["actions"]> | null; amounts?: Partial<EasyBuyAgreement["amounts"]> | null;
  plan?: Partial<EasyBuyAgreement["plan"]> | null; product?: Partial<EasyBuyAgreement["product"]> | null;
};
export function normaliseAgreement(raw: RawAgreement): EasyBuyAgreement {
  const status = (raw.status ?? "pending_approval") as EasyBuyAgreement["status"];
  const a = raw.amounts ?? {};
  const num = (v: unknown) => Number(v) || 0;
  return {
    ...raw,
    id: raw.id as number,
    reference: raw.reference ?? "",
    status,
    statusLabel: raw.statusLabel ?? status.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
    product: { id: num(raw.product?.id), name: raw.product?.name ?? "Product", image: raw.product?.image ?? null },
    plan: { name: raw.plan?.name ?? "", frequency: (raw.plan?.frequency ?? "monthly") as EasyBuyAgreement["plan"]["frequency"], installmentCount: num(raw.plan?.installmentCount), duration: raw.plan?.duration ?? "" },
    amounts: {
      total: num(a.total), downPayment: num(a.downPayment), deliveryFee: num(a.deliveryFee), dueNow: num(a.dueNow),
      installmentAmount: num(a.installmentAmount), paid: num(a.paid), outstanding: num(a.outstanding), progressPercent: num(a.progressPercent),
    },
    nextDueDate: raw.nextDueDate ?? null,
    approvalExpiresAt: raw.approvalExpiresAt ?? null,
    rejectionReason: raw.rejectionReason ?? null,
    order: raw.order ?? null,
    schedule: raw.schedule ?? [],
    payments: raw.payments ?? [],
    repayment: raw.repayment ?? null,
    actions: {
      canPayDownPayment: raw.actions?.canPayDownPayment ?? status === "approved",
      canPayInstallment: raw.actions?.canPayInstallment ?? ["active", "overdue", "defaulted"].includes(status),
      canCancel: raw.actions?.canCancel ?? ["pending_approval", "approved"].includes(status),
    },
  };
}

/** The list endpoint may return `{ agreements }`, `{ items }` or a bare array; normalise to one shape. */
type RawList = EasyBuyListData | { items: EasyBuyAgreement[]; pagination: EasyBuyListData["pagination"] } | EasyBuyAgreement[];
const normaliseList = (raw: RawList): EasyBuyListData => {
  if (Array.isArray(raw)) return { agreements: raw.map(normaliseAgreement), pagination: { page: 1, limit: raw.length, total: raw.length, totalPages: 1, hasNextPage: false, hasPrevPage: false } };
  const agreements = "agreements" in raw ? raw.agreements : raw.items;
  const list = agreements ?? [];
  return { agreements: list.map(normaliseAgreement), pagination: raw.pagination ?? { page: 1, limit: list.length, total: list.length, totalPages: 1, hasNextPage: false, hasPrevPage: false } };
};

/** A pay/down-payment response is either the agreement itself or `{ agreement, payment }`. */
export const agreementFrom = (result?: EasyBuyPayResult | null): EasyBuyAgreement | undefined => {
  const raw = result?.agreement ?? (result?.id && result.status ? result : undefined);
  return raw ? normaliseAgreement(raw as RawAgreement) : undefined;
};
export const cashierUrlFrom = (result: EasyBuyPayResult) => result.payment?.cashierUrl;

export const easyBuyReturnUrl = (id: number | string) => `${window.location.origin}/easybuy/${id}?payment=card`;

// ===================== Queries =====================
export const useGetEasyBuyList = (query: EasyBuyListQuery) =>
  useQuery({
    queryKey: ebKeys.list(query), enabled: useToken(), placeholderData: keepPreviousData,
    queryFn: async ({ signal }) => normaliseList(await call<RawList>("get", EB, { page: query.page, limit: query.limit, ...(query.status ? { status: query.status } : {}) }, signal)),
  });

export const useGetEasyBuyDetail = (id?: string | number) => {
  const query = useQuery({
    queryKey: ebKeys.detail(id), enabled: useToken() && Boolean(id),
    queryFn: async ({ signal }) => normaliseAgreement(await call<RawAgreement>("get", `${EB}/${encodeURIComponent(String(id))}`, undefined, signal)),
  });
  return { ...query, agreement: query.data };
};

// ===================== Mutations =====================
/** After any money movement, refresh EasyBuy, orders, the wallet and the user. */
function useRefreshAfterPayment() {
  const client = useQueryClient();
  return (id?: number | string, agreement?: EasyBuyAgreement) => {
    if (id && agreement) client.setQueryData(ebKeys.detail(id), agreement);
    return Promise.all([
      client.invalidateQueries({ queryKey: ebKeys.all }),
      client.invalidateQueries({ queryKey: ["mp"] }),
      client.invalidateQueries({ queryKey: ["user-wallet"] }),
      client.invalidateQueries({ queryKey: ["user-wallet-balance"] }),
      client.invalidateQueries({ queryKey: ["auth-me"] }),
    ]);
  };
}

export const useApplyEasyBuy = () => {
  const refresh = useRefreshAfterPayment();
  return useMutation({
    mutationFn: async (payload: EasyBuyApplyPayload) => {
      const result = await call<EasyBuyPayResult | null>("post", `${EB}/applications`, payload);
      return normaliseAgreement((result?.agreement ?? result ?? {}) as RawAgreement);
    },
    onSuccess: (agreement) => refresh(agreement.id, agreement.id ? agreement : undefined),
  });
};

export const usePayEasyBuyDownPayment = () => {
  const refresh = useRefreshAfterPayment();
  return useMutation({
    mutationFn: ({ id, ...body }: EasyBuyPayPayload & { id: number | string }) => call<EasyBuyPayResult>("post", `${EB}/${id}/down-payment`, body),
    onSuccess: (result, { id }) => refresh(id, agreementFrom(result)),
  });
};

export const usePayEasyBuyInstallment = () => {
  const refresh = useRefreshAfterPayment();
  return useMutation({
    mutationFn: ({ id, ...body }: EasyBuyPayPayload & { id: number | string }) => call<EasyBuyPayResult>("post", `${EB}/${id}/pay`, body),
    onSuccess: (result, { id }) => refresh(id, agreementFrom(result)),
  });
};

export const useVerifyEasyBuyPayment = () => {
  const refresh = useRefreshAfterPayment();
  return useMutation({
    mutationFn: (id: number | string) => call<{ outcome?: string; message?: string } & Partial<EasyBuyAgreement>>("post", `${EB}/${id}/payment/verify`),
    onSuccess: (result, id) => { if (result?.outcome !== "pending") void refresh(id); },
  });
};

export const useCancelEasyBuy = () => {
  const refresh = useRefreshAfterPayment();
  return useMutation({
    mutationFn: async ({ id, reason }: { id: number | string; reason?: string }) => agreementFrom(await call<EasyBuyPayResult>("post", `${EB}/${id}/cancel`, reason ? { reason } : {})),
    onSuccess: (agreement, { id }) => refresh(id, agreement),
  });
};
