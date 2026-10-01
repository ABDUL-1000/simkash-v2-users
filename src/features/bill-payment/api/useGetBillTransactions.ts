import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type {
  BillTransactionsApiResponse,
  PaginatedBillTransactionsResponse,
} from "../types/api";

export interface GetBillTransactionsParams {
  page?: number;
  limit?: number;
}

export const getBillTransactionsApi = async (
  params: GetBillTransactionsParams = {}
): Promise<BillTransactionsApiResponse> => {
  const { page = 1, limit = 10 } = params;
  const searchParams = new URLSearchParams();
  searchParams.append("page", page.toString());
  searchParams.append("limit", limit.toString());

  const response = await authedHttpClient.get<BillTransactionsApiResponse>(
    `/user/billpayment/transactions?${searchParams.toString()}`
  );
  return response.data;
};

export const useGetBillTransactions = (
  params: GetBillTransactionsParams = {},
  options?: Omit<
    UseQueryOptions<BillTransactionsApiResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const { page = 1, limit = 10 } = params;
  const accessToken = useAuthStore((state) => state.accessToken);

  const query = useQuery({
    queryKey: ["bill-transactions", { page, limit }] as const,
    queryFn: () => getBillTransactionsApi({ page, limit }),
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60, // 1 minute
    ...options,
  });

  const paginationData: PaginatedBillTransactionsResponse | undefined =
    query.data?.data;

  return {
    ...query,
    transactions: paginationData?.transactions || [],
    pagination: paginationData?.pagination,
    total: paginationData?.pagination?.total || 0,
  };
};
