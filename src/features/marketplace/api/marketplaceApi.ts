import { authedHttpClient } from "@/utils/http/auth";
import type { CategoriesResponse, FeaturedProductsResponse, MarketplaceOverviewResponse, OrderDetailResponse, OrdersResponse, ProductDetailResponse, ProductsResponse } from "../types/api";

export const getMarketplaceOverview = async () => (await authedHttpClient.get<MarketplaceOverviewResponse>("/marketplace/overview")).data;
export const getCategories = async () => (await authedHttpClient.get<CategoriesResponse>("/marketplace/categories")).data;
export const getFeaturedProducts = async (limit = 4) => (await authedHttpClient.get<FeaturedProductsResponse>(`/marketplace/featured?limit=${limit}`)).data;
export const getProducts = async (params: { page: number; limit: number; categoryId?: number; search?: string; sortBy?: string }) => {
  const query = new URLSearchParams({ page: String(params.page), limit: String(params.limit) });
  if (params.categoryId) query.set("categoryId", String(params.categoryId));
  if (params.search) query.set("search", params.search);
  if (params.sortBy) query.set("sortBy", params.sortBy);
  return (await authedHttpClient.get<ProductsResponse>(`/marketplace/products?${query.toString()}`)).data;
};
export const getProductDetail = async (id: number | string) => (await authedHttpClient.get<ProductDetailResponse>(`/marketplace/products/${encodeURIComponent(String(id))}`)).data;
export const getOrders = async (params: { page: number; limit: number; status?: string; paymentStatus?: string }) => {
  const query = new URLSearchParams({ page: String(params.page), limit: String(params.limit) });
  if (params.status) query.set("status", params.status);
  if (params.paymentStatus) query.set("paymentStatus", params.paymentStatus);
  return (await authedHttpClient.get<OrdersResponse>(`/marketplace/orders?${query.toString()}`)).data;
};
export const getOrderDetail = async (id: number | string) => (await authedHttpClient.get<OrderDetailResponse>(`/marketplace/orders/${encodeURIComponent(String(id))}`)).data;
