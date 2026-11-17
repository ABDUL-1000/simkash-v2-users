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

/** The list endpoint may return `{ agreements }`, `{ items }` or a bare array; normalise to one shape. */
type RawList = EasyBuyListData | { items: EasyBuyAgreement[]; pagination: EasyBuyListData["pagination"] } | EasyBuyAgreement[];
const normaliseList = (raw: RawList): EasyBuyListData => {
  if (Array.isArray(raw)) return { agreements: raw, pagination: { page: 1, limit: raw.length, total: raw.length, totalPages: 1, hasNextPage: false, hasPrevPage: false } };
  const agreements = "agreements" in raw ? raw.agreements : raw.items;
  return { agreements: agreements ?? [], pagination: raw.pagination };
};

/** A pay/down-payment response is either the agreement itself or `{ agreement, payment }`. */
export const agreementFrom = (result: EasyBuyPayResult): EasyBuyAgreement | undefined =>
  result.agreement ?? (result.id && result.status ? (result as EasyBuyAgreement) : undefined);
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
    queryFn: ({ signal }) => call<EasyBuyAgreement>("get", `${EB}/${encodeURIComponent(String(id))}`, undefined, signal),
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
    mutationFn: (payload: EasyBuyApplyPayload) => call<EasyBuyAgreement>("post", `${EB}/applications`, payload),
    onSuccess: (agreement) => refresh(agreement?.id, agreement),
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
    mutationFn: ({ id, reason }: { id: number | string; reason?: string }) => call<EasyBuyAgreement>("post", `${EB}/${id}/cancel`, reason ? { reason } : {}),
    onSuccess: (agreement, { id }) => refresh(id, agreement?.id ? agreement : undefined),
  });
};
