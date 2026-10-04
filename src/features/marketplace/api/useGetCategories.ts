import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getCategories } from "./marketplaceApi";
export const useGetCategories = () => {
  const token = useAuthStore((s) => s.accessToken);
  const query = useQuery({ queryKey: ["marketplace-categories"], queryFn: async () => (await getCategories()).data ?? [], enabled: Boolean(token), staleTime: 5 * 60_000 });
  return { ...query, categories: query.data ?? [] };
};
