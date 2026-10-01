import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type { WalletSummaryApiResponse, WalletSummaryData } from "../types/api";

export const QUERY_KEY_USER_WALLET_SUMMARY = ["user-wallet-summary"] as const;

export const getWalletSummaryApi = async (): Promise<WalletSummaryApiResponse> => {
  const response = await authedHttpClient.get<WalletSummaryApiResponse>(
    "/user/wallet/summary"
  );
  return response.data;
};

export const useGetWalletSummary = (
  options?: Omit<
    UseQueryOptions<WalletSummaryApiResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const query = useQuery({
    queryKey: QUERY_KEY_USER_WALLET_SUMMARY,
    queryFn: getWalletSummaryApi,
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60 * 3, // 3 minutes
    ...options,
  });

  const summary: WalletSummaryData | undefined = query.data?.data;

  return {
    ...query,
    summary,
  };
};
