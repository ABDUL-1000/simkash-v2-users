import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { AirtimeNetworkItem, AirtimeNetworksApiResponse } from "../types/api";

export const QUERY_KEY_AIRTIME_NETWORKS = ["airtime-networks"] as const;

export const getAirtimeNetworksApi = async (): Promise<AirtimeNetworksApiResponse> => {
  const response = await authedHttpClient.get<AirtimeNetworksApiResponse>(
    "/user/billpayment/airtime/network"
  );
  return response.data;
};

export const useGetAirtimeNetworks = (
  options?: Omit<
    UseQueryOptions<AirtimeNetworkItem[], Error>,
    "queryKey" | "queryFn"
  >
) => {
  const query = useQuery({
    queryKey: QUERY_KEY_AIRTIME_NETWORKS,
    queryFn: async () => (await getAirtimeNetworksApi()).data ?? [],
    staleTime: 1000 * 60 * 30,
    ...options,
  });

  const networks: AirtimeNetworkItem[] = query.data ?? [];

  return {
    ...query,
    networks,
  };
};
