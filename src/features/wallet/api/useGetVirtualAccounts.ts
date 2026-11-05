import { useQuery } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import type { ApiResponse } from "@/features/auth/types/api";
import type { FundingVirtualAccount } from "../types/api";

export const QUERY_KEY_VIRTUAL_ACCOUNTS = ["user-virtual-accounts"] as const;

export const getVirtualAccountsApi = async (signal?: AbortSignal): Promise<FundingVirtualAccount[]> => {
  const { data } = await authedHttpClient.get<ApiResponse<FundingVirtualAccount[]>>("/user/wallet/virtual-account", { signal });
  if (!data.success) throw new Error(data.message || "Unable to load your virtual accounts");
  return Array.isArray(data.data) ? data.data : [];
};

/** GET /user/wallet/virtual-account: the agent's funding accounts. */
export const useGetVirtualAccounts = (enabled = true) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  return useQuery({
    queryKey: QUERY_KEY_VIRTUAL_ACCOUNTS,
    queryFn: ({ signal }) => getVirtualAccountsApi(signal),
    enabled: enabled && Boolean(accessToken),
    staleTime: 1000 * 60 * 10,
  });
};
