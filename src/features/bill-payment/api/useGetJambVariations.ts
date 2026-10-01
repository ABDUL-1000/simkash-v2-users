import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import type { ServiceVariationsApiResponse, ServiceVariationItem } from "../types/api";

export const QUERY_KEY_JAMB_VARIATIONS = ["jamb-variations"] as const;

export const getJambVariationsApi = async (): Promise<ServiceVariationsApiResponse> => {
  const response = await authedHttpClient.get<ServiceVariationsApiResponse>(
    "/user/billpayment/education/jamb/variation"
  );
  return response.data;
};

export const useGetJambVariations = (
  options?: Omit<
    UseQueryOptions<ServiceVariationItem[], Error>,
    "queryKey" | "queryFn"
  >
) => {
  const query = useQuery({
    queryKey: QUERY_KEY_JAMB_VARIATIONS,
    queryFn: async () => {
      const raw = (await getJambVariationsApi()).data;
      return raw?.variations || raw?.varations || [];
    },
    staleTime: 1000 * 60 * 15,
    ...options,
  });

  const variations: ServiceVariationItem[] = query.data ?? [];

  return {
    ...query,
    variations,
  };
};
