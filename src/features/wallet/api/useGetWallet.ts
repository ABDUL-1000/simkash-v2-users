import { useEffect } from "react";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type { WalletApiResponse, WalletData } from "../types/api";

export const QUERY_KEY_USER_WALLET = ["user-wallet"] as const;

export const getWalletApi = async (): Promise<WalletApiResponse> => {
  const response = await authedHttpClient.get<WalletApiResponse>("/user/wallet");
  return response.data;
};

export const useGetWallet = (
  options?: Omit<UseQueryOptions<WalletApiResponse, Error>, "queryKey" | "queryFn">
) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const updateWallet = useAuthStore((state) => state.updateWallet);

  const query = useQuery({
    queryKey: QUERY_KEY_USER_WALLET,
    queryFn: getWalletApi,
    enabled: Boolean(accessToken),
    staleTime: 1000 * 60 * 3, // 3 minutes
    ...options,
  });

  const walletData: WalletData | undefined = query.data?.data;

  useEffect(() => {
    if (walletData) {
      updateWallet({
        id: walletData.id,
        user_id: walletData.user_id,
        balance: walletData.balance,
        commission_balance: walletData.commission_balance,
        profit_balance: walletData.profit_balance,
      });
    }
  }, [walletData, updateWallet]);

  return {
    ...query,
    wallet: walletData,
  };
};
