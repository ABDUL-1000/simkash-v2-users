import { useEffect } from "react";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type { WalletBalanceApiResponse, WalletBalanceData } from "../types/api";

export const QUERY_KEY_USER_WALLET_BALANCE = ["user-wallet-balance"] as const;

export const getWalletBalanceApi = async (): Promise<WalletBalanceApiResponse> => {
  const response = await authedHttpClient.get<WalletBalanceApiResponse>(
    "/user/wallet/balance"
  );
  return response.data;
};

export const useGetWalletBalance = (
  options?: Omit<
    UseQueryOptions<WalletBalanceApiResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const updateWallet = useAuthStore((state) => state.updateWallet);

  const query = useQuery({
    queryKey: QUERY_KEY_USER_WALLET_BALANCE,
    queryFn: getWalletBalanceApi,
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60 * 2, // 2 minutes
    ...options,
  });

  const balanceData: WalletBalanceData | undefined = query.data?.data;

  useEffect(() => {
    if (balanceData) {
      updateWallet({
        balance: balanceData.balance,
        commission_balance: balanceData.commission_balance,
        profit_balance: balanceData.profit_balance,
      });
    }
  }, [balanceData, updateWallet]);

  return {
    ...query,
    balanceData,
  };
};
