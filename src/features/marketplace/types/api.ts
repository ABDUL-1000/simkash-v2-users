import type { ApiResponse } from "@/features/auth/types/api";

export interface ProductCategory { id: number; name: string; description: string; image: string; productCount?: number; createdAt?: string; }
export interface ProductItem { id: number; categoryId: number; categoryName: string; name: string; description: string; price: number; stock: number; inStock: boolean; images: string[]; primaryImage: string; status: "active" | "inactive"; createdAt: string; updatedAt: string; }
export interface UserOrderStats { totalOrders: number; pendingOrders: number; completedOrders: number; totalSpend: number; }
export interface MarketplaceOverviewData { categories: ProductCategory[]; featuredProducts: ProductItem[]; userOrderStats: UserOrderStats; }
export interface OrderItem { id: number; orderId: number; productId: number; productName: string; productImage: string; quantity: number; price: number; totalPrice: number; }
export interface OrderRecord { id: number; orderNumber: string; userId: number; totalAmount: number; status: "pending" | "paid" | "shipped" | "delivered" | "cancelled"; paymentStatus: "pending" | "completed" | "failed"; paymentMethod: "wallet"; shippingAddress: string; items: OrderItem[]; totalItems: number; createdAt: string; updatedAt: string; }
export interface MarketplacePagination { page: number; limit: number; total: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean; }
export interface ProductsListResponseData { products: ProductItem[]; pagination: MarketplacePagination; }
export interface OrdersListResponseData { stats: UserOrderStats; orders: OrderRecord[]; pagination: MarketplacePagination; }
export interface PlaceOrderPayload { items: Array<{ productId: number; quantity: number }>; shippingAddress: string; paymentMethod: "wallet"; pin: string; }
export interface PlaceOrderResponseData { order: OrderRecord; orderNumber?: string; estimatedDelivery?: string; [key: string]: unknown; }
export interface CancelOrderResponseData { orderId: number; orderNumber: string; status: "cancelled"; refundProcessed: boolean; refundAmount: number; }
export type MarketplaceOverviewResponse = ApiResponse<MarketplaceOverviewData>;
export type CategoriesResponse = ApiResponse<ProductCategory[]>;
export type ProductsResponse = ApiResponse<ProductsListResponseData>;
export type FeaturedProductsResponse = ApiResponse<ProductItem[]>;
export type ProductDetailResponse = ApiResponse<ProductItem>;
export type OrdersResponse = ApiResponse<OrdersListResponseData>;
export type OrderDetailResponse = ApiResponse<OrderRecord>;
export type PlaceOrderResponse = ApiResponse<PlaceOrderResponseData>;
export type CancelOrderResponse = ApiResponse<CancelOrderResponseData>;
