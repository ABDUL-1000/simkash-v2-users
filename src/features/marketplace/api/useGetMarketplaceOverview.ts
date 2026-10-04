import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getMarketplaceOverview } from "./marketplaceApi";
export const useGetMarketplaceOverview = () => {
  const token = useAuthStore((s) => s.accessToken);
  const query = useQuery({ queryKey: ["marketplace-overview"], queryFn: getMarketplaceOverview, enabled: Boolean(token), staleTime: 60_000 });
  return { ...query, overview: query.data?.data };
};
