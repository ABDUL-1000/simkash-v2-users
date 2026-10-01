import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type {
  TransactionDetailApiResponse,
  WalletTransactionItem,
} from "../types/api";

export const getTransactionDetailApi = async (
  id: number | string
): Promise<TransactionDetailApiResponse> => {
  const response = await authedHttpClient.get<TransactionDetailApiResponse>(
    `/user/wallet/transactions/${id}`
  );
  return response.data;
};

export const useGetTransactionDetail = (
  id?: number | string | null,
  options?: Omit<
    UseQueryOptions<TransactionDetailApiResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const query = useQuery({
    queryKey: ["wallet-transaction-detail", id] as const,
    queryFn: () => getTransactionDetailApi(id!),
    enabled: Boolean(accessToken && id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });

  const transaction: WalletTransactionItem | undefined = query.data?.data;

  return {
    ...query,
    transaction,
  };
};
