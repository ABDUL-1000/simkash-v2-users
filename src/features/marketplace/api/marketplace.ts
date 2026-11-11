import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authedHttpClient } from "@/utils/http/auth";
import { useAuthStore } from "@/store/authStore";
import { openNotification } from "@/utils/notifications";
import type {
  Address, AddressPayload, CartView, CheckoutPayload, CheckoutResult, InstallationSlot, InstallationSlots, MpResponse, NotificationsData,
  OrderConfirmation, OrderDetail, OrderReturnsInfo, OrdersListData, OrdersQuery, PaymentOutcome, ProductCategory, ProductCard,
  ProductDetail, ProductsListData, ProductsQuery, RecentlyViewedItem, ReturnReason, ReturnRequest, ReviewsData, UserOrderStats, WishlistData,
} from "../types/api";

const MP = "/marketplace";
type Method = "get" | "post" | "patch" | "put" | "delete";

/** Calls the API and unwraps `{ success, message, data }`; throws the server message on failure. */
async function call<T>(method: Method, url: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const config = { signal, ...(method === "get" || method === "delete" ? { params: body } : {}) };
  const response = method === "get" || method === "delete"
    ? await authedHttpClient[method]<MpResponse<T>>(url, config)
    : await authedHttpClient[method]<MpResponse<T>>(url, body ?? {}, config);
  if (!response.data?.success) throw new Error(response.data?.message || "Request failed");
  return response.data.data;
}
const clean = (params: object) => Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== "" && value !== false));
const useToken = () => Boolean(useAuthStore((state) => state.accessToken));
const notifyError = (title: string) => (error: Error) => openNotification({ state: "error", title, description: error.message });

// Every marketplace query key starts with "mp" so a change can refresh them together.
export const mpKeys = {
  all: ["mp"] as const,
  categories: ["mp", "categories"] as const,
  featured: (limit: number) => ["mp", "featured", limit] as const,
  products: (query: ProductsQuery) => ["mp", "products", query] as const,
  recentlyViewed: ["mp", "recently-viewed"] as const,
  product: (id?: string | number) => ["mp", "product", String(id)] as const,
  reviews: (id: string | number, sortBy: string, page: number) => ["mp", "reviews", String(id), sortBy, page] as const,
  cart: ["mp", "cart"] as const,
  slots: ["mp", "installation-slots"] as const,
  orders: (query: OrdersQuery) => ["mp", "orders", query] as const,
  order: (id?: string | number) => ["mp", "order", String(id)] as const,
  confirmation: (id?: string | number) => ["mp", "confirmation", String(id)] as const,
  orderReturns: (id?: string | number) => ["mp", "order-returns", String(id)] as const,
  returns: ["mp", "returns"] as const,
  wishlist: (page: number) => ["mp", "wishlist", page] as const,
  addresses: ["user-addresses"] as const,
  notifications: (params: object) => ["user-notifications", params] as const,
};

// ===================== Catalogue =====================
export const useGetCategories = () => {
  const query = useQuery({ queryKey: mpKeys.categories, enabled: useToken(), staleTime: 5 * 60_000, queryFn: ({ signal }) => call<ProductCategory[]>("get", `${MP}/categories`, undefined, signal) });
  return { ...query, categories: query.data ?? [] };
};
export const useGetFeaturedProducts = (limit = 4) => {
  const query = useQuery({ queryKey: mpKeys.featured(limit), enabled: useToken(), staleTime: 60_000, queryFn: ({ signal }) => call<ProductCard[]>("get", `${MP}/featured`, { limit }, signal) });
  return { ...query, products: query.data ?? [] };
};
export const useGetProducts = (query: ProductsQuery) =>
  useQuery({ queryKey: mpKeys.products(query), enabled: useToken(), placeholderData: keepPreviousData, staleTime: 30_000, queryFn: ({ signal }) => call<ProductsListData>("get", `${MP}/products`, clean(query), signal) });
export const useGetRecentlyViewed = (limit = 12) => {
  const query = useQuery({ queryKey: mpKeys.recentlyViewed, enabled: useToken(), queryFn: ({ signal }) => call<RecentlyViewedItem[] | { items: RecentlyViewedItem[] }>("get", `${MP}/recently-viewed`, { limit }, signal) });
  const data = query.data;
  return { ...query, items: Array.isArray(data) ? data : data?.items ?? [] };
};
export const useClearRecentlyViewed = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: () => call("delete", `${MP}/recently-viewed`), onSuccess: () => client.setQueryData(mpKeys.recentlyViewed, []), onError: notifyError("Couldn't clear") });
};
export const useGetProductDetail = (id?: string | number) => {
  const query = useQuery({ queryKey: mpKeys.product(id), enabled: useToken() && Boolean(id), queryFn: ({ signal }) => call<ProductDetail>("get", `${MP}/products/${encodeURIComponent(String(id))}`, undefined, signal) });
  return { ...query, product: query.data };
};

// Reviews
export const useGetProductReviews = (id: string | number | undefined, sortBy: "newest" | "most_helpful", page: number) =>
  useQuery({ queryKey: mpKeys.reviews(id ?? "", sortBy, page), enabled: useToken() && Boolean(id), placeholderData: keepPreviousData, queryFn: ({ signal }) => call<ReviewsData>("get", `${MP}/products/${id}/reviews`, { sortBy, page }, signal) });
export const useToggleReviewHelpful = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: number) => call<{ isHelpful: boolean; helpfulCount: number }>("post", `${MP}/reviews/${reviewId}/helpful`),
    onSuccess: () => client.invalidateQueries({ queryKey: ["mp", "reviews"] }),
    onError: notifyError("Couldn't record your vote"),
  });
};
export const useAddReview = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, rating, comment }: { productId: number; rating: number; comment?: string }) => call("post", `${MP}/products/${productId}/reviews`, { rating, comment }),
    onSuccess: () => { openNotification({ state: "success", title: "Thanks for your review" }); return client.invalidateQueries({ queryKey: mpKeys.all }); },
    onError: notifyError("Couldn't post your review"),
  });
};

// ===================== Wishlist =====================
export const useGetWishlist = (page = 1) =>
  useQuery({ queryKey: mpKeys.wishlist(page), enabled: useToken(), placeholderData: keepPreviousData, queryFn: ({ signal }) => call<WishlistData>("get", `${MP}/wishlist`, { page }, signal) });
/** POST /wishlist or DELETE /wishlist/:productId; refreshes every card's heart. */
export const useToggleWishlist = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, wishlisted }: { productId: number; wishlisted: boolean }) =>
      wishlisted ? call("delete", `${MP}/wishlist/${productId}`) : call("post", `${MP}/wishlist`, { productId }),
    onSuccess: (_data, { wishlisted }) => { openNotification({ state: "success", title: wishlisted ? "Removed from wishlist" : "Added to wishlist" }); return client.invalidateQueries({ queryKey: mpKeys.all }); },
    onError: notifyError("Wishlist update failed"),
  });
};

// ===================== Cart =====================
export const useGetCart = (enabled = true) => {
  const query = useQuery({ queryKey: mpKeys.cart, enabled: useToken() && enabled, queryFn: ({ signal }) => call<CartView>("get", `${MP}/cart`, undefined, signal) });
  return { ...query, cart: query.data };
};
/** Every cart call returns the full CartView, so it replaces the cached cart. */
function useCartMutation<V>(fn: (vars: V) => Promise<CartView>, errorTitle: string, success?: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: (cart) => { client.setQueryData(mpKeys.cart, cart); if (success) openNotification({ state: "success", title: success }); },
    onError: notifyError(errorTitle),
  });
}
export const useAddToCart = () => useCartMutation(
  (vars: { productId: number; quantity: number; withInstallation?: boolean }) => call<CartView>("post", `${MP}/cart/items`, vars), "Couldn't add to cart", "Added to cart");
export const useUpdateCartItem = () => useCartMutation(
  ({ id, ...body }: { id: number; quantity?: number; withInstallation?: boolean }) => call<CartView>("patch", `${MP}/cart/items/${id}`, body), "Couldn't update item");
export const useRemoveCartItem = () => useCartMutation((id: number) => call<CartView>("delete", `${MP}/cart/items/${id}`), "Couldn't remove item");
export const useUpdateCart = () => useCartMutation(
  (body: { deliveryMethod?: "standard" | "express"; addressId?: number | null }) => call<CartView>("patch", `${MP}/cart`, body), "Couldn't update cart");
export const useApplyPromo = () => useCartMutation((code: string) => call<CartView>("post", `${MP}/cart/promo`, { code }), "Promo code not applied");
export const useRemovePromo = () => useCartMutation(() => call<CartView>("delete", `${MP}/cart/promo`), "Couldn't remove promo");

// ===================== Checkout & payment =====================
export const useGetInstallationSlots = (enabled = true) =>
  useQuery({ queryKey: mpKeys.slots, enabled: useToken() && enabled, queryFn: ({ signal }) => call<InstallationSlots>("get", `${MP}/installation/slots`, undefined, signal) });
export const useCheckout = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (payload: CheckoutPayload) => call<CheckoutResult>("post", `${MP}/checkout`, payload),
    onSuccess: () => Promise.all([client.invalidateQueries({ queryKey: mpKeys.all }), client.invalidateQueries({ queryKey: ["auth-me"] }), client.invalidateQueries({ queryKey: ["user-wallet"] })]),
    // 409/400: totals, stock, slots or promo changed — refetch cart and slots so the page shows the latest.
    onError: () => Promise.all([client.invalidateQueries({ queryKey: mpKeys.cart }), client.invalidateQueries({ queryKey: mpKeys.slots })]),
  });
};
export const useVerifyPayment = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (orderId: number | string) => call<{ outcome: PaymentOutcome; message?: string }>("post", `${MP}/orders/${orderId}/payment/verify`),
    onSuccess: (result, orderId) => { if (result.outcome !== "pending") void client.invalidateQueries({ queryKey: mpKeys.order(orderId) }); },
  });
};
export const useRetryPayment = () =>
  useMutation({
    mutationFn: (orderId: number | string) => call<{ cashierUrl?: string; payment?: { cashierUrl: string } }>("post", `${MP}/orders/${orderId}/payment/retry`),
    onSuccess: (result) => { const url = result.cashierUrl ?? result.payment?.cashierUrl; if (url) window.location.assign(url); },
    onError: notifyError("Couldn't start card payment, please try again"),
  });

// ===================== Orders =====================
export const useGetOrders = (query: OrdersQuery) =>
  useQuery({ queryKey: mpKeys.orders(query), enabled: useToken(), placeholderData: keepPreviousData, queryFn: ({ signal }) => call<OrdersListData>("get", `${MP}/orders`, clean(query), signal) });
/** Order counts for the stats cards, from GET /orders tabCounts. */
export const useOrderStats = () => {
  const query = useGetOrders({ tab: "all", page: 1, limit: 1 });
  const counts = query.data?.tabCounts;
  const stats: UserOrderStats | undefined = counts ? { totalOrders: counts.all, pendingOrders: counts.active + counts.dispatched, completedOrders: counts.delivered } : undefined;
  return { ...query, stats };
};
export const useGetOrderDetail = (id?: string | number) => {
  const query = useQuery({ queryKey: mpKeys.order(id), enabled: useToken() && Boolean(id), queryFn: ({ signal }) => call<OrderDetail>("get", `${MP}/orders/${id}`, undefined, signal) });
  return { ...query, order: query.data };
};
export const useGetOrderConfirmation = (id?: string | number) =>
  useQuery({ queryKey: mpKeys.confirmation(id), enabled: useToken() && Boolean(id), queryFn: ({ signal }) => call<OrderConfirmation>("get", `${MP}/orders/${id}/confirmation`, undefined, signal) });

/** Order actions return the updated order detail. */
function useOrderAction<V extends { orderId: number | string }>(path: (vars: V) => string, body: (vars: V) => unknown, method: Method, success: string, errorTitle: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (vars: V) => call<OrderDetail>(method, path(vars), body(vars)),
    onSuccess: (order, vars) => {
      if (order && typeof order === "object" && "id" in order) client.setQueryData(mpKeys.order(vars.orderId), order);
      openNotification({ state: "success", title: success });
      return Promise.all([client.invalidateQueries({ queryKey: mpKeys.all }), client.invalidateQueries({ queryKey: ["auth-me"] })]);
    },
    onError: notifyError(errorTitle),
  });
}
export const useCancelOrder = () => useOrderAction<{ orderId: number | string }>(({ orderId }) => `${MP}/orders/${orderId}/cancel`, () => ({}), "post", "Order cancelled", "Couldn't cancel order");
export const useConfirmDelivery = () => useOrderAction<{ orderId: number | string }>(({ orderId }) => `${MP}/orders/${orderId}/confirm-delivery`, () => ({}), "post", "Delivery confirmed", "Couldn't confirm delivery");
export const useRescheduleInstallation = () => useOrderAction<{ orderId: number | string; date: string; slot: InstallationSlot }>(
  ({ orderId }) => `${MP}/orders/${orderId}/installation`, ({ date, slot }) => ({ date, slot }), "patch", "Installation rescheduled", "Couldn't reschedule");
export const useApproveInstallation = () => useOrderAction<{ orderId: number | string; rating: number; comment?: string }>(
  ({ orderId }) => `${MP}/orders/${orderId}/installation/approve`, ({ rating, comment }) => ({ rating, comment }), "post", "Installation confirmed", "Couldn't confirm installation");
export const useDisputeInstallation = () => useOrderAction<{ orderId: number | string; reason: string }>(
  ({ orderId }) => `${MP}/orders/${orderId}/installation/dispute`, ({ reason }) => ({ reason }), "post", "Problem reported", "Couldn't report the problem");

// ===================== Returns =====================
export const useGetOrderReturns = (orderId?: number | string, enabled = true) =>
  useQuery({ queryKey: mpKeys.orderReturns(orderId), enabled: useToken() && Boolean(orderId) && enabled, queryFn: ({ signal }) => call<OrderReturnsInfo>("get", `${MP}/orders/${orderId}/returns`, undefined, signal) });
export const useRequestReturn = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, ...body }: { orderId: number | string; items: { orderItemId: number; quantity: number }[]; reason: ReturnReason; details?: string }) => call<ReturnRequest>("post", `${MP}/orders/${orderId}/returns`, body),
    onSuccess: () => { openNotification({ state: "success", title: "Return requested" }); return client.invalidateQueries({ queryKey: mpKeys.all }); },
    onError: notifyError("Couldn't request return"),
  });
};
export const useCancelReturn = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (returnId: number) => call("post", `${MP}/returns/${returnId}/cancel`),
    onSuccess: () => { openNotification({ state: "success", title: "Return cancelled" }); return client.invalidateQueries({ queryKey: mpKeys.all }); },
    onError: notifyError("Couldn't cancel return"),
  });
};

// ===================== Address book (/user/addresses) =====================
export const useGetAddresses = () => {
  const query = useQuery({ queryKey: mpKeys.addresses, enabled: useToken(), queryFn: ({ signal }) => call<{ addresses: Address[]; maxAddresses: number }>("get", "/user/addresses", undefined, signal) });
  return { ...query, addresses: query.data?.addresses ?? [], maxAddresses: query.data?.maxAddresses ?? 20 };
};
function useAddressMutation<V>(fn: (vars: V) => Promise<unknown>, success: string, errorTitle: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => { openNotification({ state: "success", title: success }); return Promise.all([client.invalidateQueries({ queryKey: mpKeys.addresses }), client.invalidateQueries({ queryKey: mpKeys.cart })]); },
    onError: notifyError(errorTitle),
  });
}
export const useAddAddress = () => useAddressMutation((body: AddressPayload) => call<Address>("post", "/user/addresses", body), "Address saved", "Couldn't save address");
export const useUpdateAddress = () => useAddressMutation(({ id, ...body }: Partial<AddressPayload> & { id: number }) => call<Address>("put", `/user/addresses/${id}`, body), "Address updated", "Couldn't update address");
export const useSetDefaultAddress = () => useAddressMutation((id: number) => call("patch", `/user/addresses/${id}/default`), "Default address updated", "Couldn't set default");
export const useDeleteAddress = () => useAddressMutation((id: number) => call("delete", `/user/addresses/${id}`), "Address removed", "Couldn't remove address");

// ===================== Notifications (/user/notifications) =====================
export const useGetNotifications = (params: { page?: number; limit?: number; unreadOnly?: boolean; type?: string } = {}, poll = false) =>
  useQuery({
    queryKey: mpKeys.notifications(params), enabled: useToken(), refetchInterval: poll ? 60_000 : false, refetchOnWindowFocus: poll,
    queryFn: ({ signal }) => call<NotificationsData>("get", "/user/notifications", clean(params), signal),
  });
export const useMarkNotificationRead = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: (id: number) => call("patch", `/user/notifications/${id}/read`), onSuccess: () => client.invalidateQueries({ queryKey: ["user-notifications"] }) });
};
export const useMarkAllNotificationsRead = () => {
  const client = useQueryClient();
  return useMutation({ mutationFn: () => call("patch", "/user/notifications/read-all"), onSuccess: () => client.invalidateQueries({ queryKey: ["user-notifications"] }), onError: notifyError("Couldn't mark as read") });
};
