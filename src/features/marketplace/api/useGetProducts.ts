import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";
import { getProducts } from "./marketplaceApi";
export interface GetProductsParams { page: number; limit: number; categoryId?: number; search?: string; sortBy?: string; }
export const useGetProducts = (params: GetProductsParams) => {
  const token = useAuthStore((s) => s.accessToken);
  return useQuery({ queryKey: ["marketplace-products", params], queryFn: () => getProducts(params), enabled: Boolean(token), staleTime: 60_000 });
};
