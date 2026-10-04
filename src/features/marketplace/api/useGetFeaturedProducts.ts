import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getFeaturedProducts } from "./marketplaceApi";
export const useGetFeaturedProducts = (limit = 4) => {
  const token = useAuthStore((s) => s.accessToken);
  const query = useQuery({ queryKey: ["marketplace-featured", limit], queryFn: async () => (await getFeaturedProducts(limit)).data ?? [], enabled: Boolean(token), staleTime: 60_000 });
  return { ...query, products: query.data ?? [] };
};
