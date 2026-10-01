import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type {
  WalletTransactionsApiResponse,
  PaginatedTransactionsResponse,
} from "../types/api";

export interface GetWalletTransactionsParams {
  page?: number;
  limit?: number;
  type?: string;
}

export const getWalletTransactionsApi = async (
  params: GetWalletTransactionsParams = {}
): Promise<WalletTransactionsApiResponse> => {
  const { page = 1, limit = 10, type } = params;
  const searchParams = new URLSearchParams();
  searchParams.append("page", page.toString());
  searchParams.append("limit", limit.toString());
  if (type) {
    searchParams.append("type", type);
  }

  const response = await authedHttpClient.get<WalletTransactionsApiResponse>(
    `/user/wallet/transactions?${searchParams.toString()}`
  );
  return response.data;
};

export const useGetWalletTransactions = (
  params: GetWalletTransactionsParams = {},
  options?: Omit<
    UseQueryOptions<WalletTransactionsApiResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const { page = 1, limit = 10, type } = params;
  const accessToken = useAuthStore((state) => state.accessToken);

  const query = useQuery({
    queryKey: ["user-wallet-transactions", { page, limit, type }] as const,
    queryFn: () => getWalletTransactionsApi({ page, limit, type }),
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60, // 1 minute
    ...options,
  });

  const paginationData: PaginatedTransactionsResponse | undefined = query.data?.data;

  return {
    ...query,
    transactions: paginationData?.transactions || [],
    pagination: paginationData?.pagination,
    total: paginationData?.pagination?.total || 0,
  };
};
