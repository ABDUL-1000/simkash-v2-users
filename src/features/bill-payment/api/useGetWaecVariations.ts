import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { ServiceVariationsApiResponse, ServiceVariationItem } from "../types/api";

export const QUERY_KEY_WAEC_VARIATIONS = ["waec-variations"] as const;

export const getWaecVariationsApi = async (): Promise<ServiceVariationsApiResponse> => {
  const response = await authedHttpClient.get<ServiceVariationsApiResponse>(
    "/user/billpayment/education/waec/variation"
  );
  return response.data;
};

export const useGetWaecVariations = (
  options?: Omit<
    UseQueryOptions<ServiceVariationItem[], Error>,
    "queryKey" | "queryFn"
  >
) => {
  const query = useQuery({
    queryKey: QUERY_KEY_WAEC_VARIATIONS,
    queryFn: async () => {
      const raw = (await getWaecVariationsApi()).data;
      return raw?.variations || raw?.varations || [];
    },
    staleTime: 1000 * 60 * 15, // 15 mins fresh
    ...options,
  });

  const variations: ServiceVariationItem[] = query.data ?? [];

  return {
    ...query,
    variations,
  };
};
