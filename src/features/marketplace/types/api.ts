import type { ApiResponse } from "@/features/auth/types/api";

// ---------- Shared ----------
export interface MarketplacePagination { page: number; limit: number; total: number; totalPages: number; hasNextPage: boolean; hasPrevPage: boolean; }

// ---------- Catalogue ----------
export interface ProductCategory { id: number; name: string; productCount?: number; }
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";
export interface ProductCard {
  id: number; name: string; brand: string | null; modelNumber: string | null; sku: string;
  category: { id: number; name: string } | null;
  price: number; compareAtPrice: number | null; discountPercent: number | null;
  stock: number; inStock: boolean; stockStatus: StockStatus;
  primaryImage: string | null; images: string[];
  seller: { name: string; verified: boolean };
  rating: { average: number; count: number };
  unitsSold: number;
  badges: { easyBuy: boolean; installation: boolean };
  isFeatured: boolean; isWishlisted: boolean;
}
/** Kept for older components; the API's product card. */
export type ProductItem = ProductCard;
export type ProductSort = "best_match" | "newest" | "price_asc" | "price_desc" | "rating" | "popular";
export interface ProductsQuery {
  page: number; limit: number; search?: string; categoryId?: number; maxPrice?: number;
  easyBuy?: boolean; inStock?: boolean; installation?: boolean; sortBy?: ProductSort;
}
export interface ProductsListData { products: ProductCard[]; sortBy: ProductSort; pagination: MarketplacePagination; }
export interface RecentlyViewedItem extends ProductCard { viewedAt: string; }

export interface ProductDetail extends ProductCard {
  description: string | null;
  specifications: { key: string; value: string }[];
  stockMessage: { status: string; label: string };
  maxPurchaseQuantity: number;
  addOns: { installation: { available: boolean; fee: number | null; label: string; description: string } };
  paymentOptions: {
    wallet: { available: boolean; balance: number | null; sufficient: boolean | null; fullPrice: number };
    card: { available: boolean; label: string; fullPrice: number };
    easyBuy: { eligible: boolean; segments: string[]; note: string | null };
  };
  delivery: { options: DeliveryOption[]; promises: { key: string; label: string }[]; returnDays: number };
  reviewSummary: { averageRating: number; totalReviews: number; distribution: Record<"1" | "2" | "3" | "4" | "5", number> };
  relatedProducts: ProductCard[];
}
export interface DeliveryOption { method: "standard" | "express"; label: string; description: string; fee: number; selected?: boolean; }

export interface ProductReview { id: number; rating: number; comment: string | null; reviewer: string; helpfulCount: number; isHelpful: boolean; isOwn: boolean; createdAt: string; }
export interface ReviewsData { reviews: ProductReview[]; pagination: MarketplacePagination; }

// ---------- Address book ----------
export interface Address {
  id: number; label: string | null; fullName: string; phone: string; addressLine: string;
  city: string | null; state: string; country: string; landmark: string | null; isDefault: boolean; formatted: string;
}
export interface AddressPayload { fullName: string; phone: string; addressLine: string; state: string; city?: string; landmark?: string; label?: string; isDefault?: boolean; }

// ---------- Cart ----------
export type CartIssue = "unavailable" | "out_of_stock" | "insufficient_stock" | "installation_unavailable";
export interface CartLine {
  id: number; productId: number;
  product: { id: number; name: string; brand: string | null; modelNumber: string | null; sku: string; image: string | null; seller: string };
  quantity: number; maxQuantity: number; unitPrice: number; compareAtPrice: number | null;
  priceChanged: { from: number; to: number } | null;
  withInstallation: boolean; installation: { available: boolean; unitFee: number | null };
  lineSubtotal: number; lineInstallation: number; lineTotal: number;
  available: boolean; issues: CartIssue[];
}
export interface CartView {
  id: number; items: CartLine[]; itemsCount: number; lineCount: number; hasInstallation: boolean;
  delivery: { method: "standard" | "express"; fee: number; options: DeliveryOption[] };
  address: Address | null;
  promo: { code: string; description: string | null; valid: boolean; discount: number; message: string } | null;
  summary: { subtotal: number; installationTotal: number; deliveryFee: number; discount: number; total: number; savings: { fromSalePrices: number; fromPromo: number; total: number } };
  payment: { wallet: { balance: number; sufficient: boolean; shortfall: number }; card: { available: boolean; label: string } };
  canCheckout: boolean; checkoutIssues: string[];
}

// ---------- Checkout ----------
export type InstallationSlot = "morning" | "afternoon";
export interface InstallationSlots {
  capacityPerSlot: number; leadTime: string;
  dates: { date: string; label: string; slots: { slot: InstallationSlot; label: string; remaining: number; available: boolean }[] }[];
}
export interface CheckoutPayload {
  paymentMethod: "wallet" | "card"; pin?: string;
  installation?: { date: string; slot: InstallationSlot };
  expectedTotal: number; returnUrl?: string;
}
export interface OrderConfirmation {
  orderId: number; orderNumber: string; customerFirstName: string;
  status: string; paymentStatus: string; paymentMethod: string;
  items: { name: string; quantity: number; unitPrice: number; lineTotal: number; installationFee: number }[];
  summary: { subtotal: number; installationTotal: number; deliveryFee: number; discount: number; total: number; totalLabel: string };
  deliveryAddress: { fullName: string; phone: string; addressLine: string; city: string | null; state: string };
  estimatedDelivery: { from: string | null; to: string | null; label: string | null };
  installation: { label: string; slotLabel: string; note: string } | null;
  progress: { key: string; label: string; done: boolean }[];
  walletBalanceAfter: number | null;
}
export interface CheckoutResult extends Partial<OrderConfirmation> {
  orderId: number; orderNumber: string;
  payment: { cashierUrl: string } | null;
}
export type PaymentOutcome = "paid" | "already_paid" | "pending" | "failed" | "amount_mismatch" | "late_refunded";

// ---------- Orders ----------
export type OrdersTab = "all" | "active" | "dispatched" | "delivered" | "cancelled" | "returned";
export interface OrderActions {
  canCancel: boolean; canPay: boolean; canTrack: boolean; canConfirmDelivery: boolean; canReturn: boolean; canReview: boolean;
  canRescheduleInstallation: boolean; canApproveInstallation: boolean; canDisputeInstallation: boolean;
}
export interface OrderCard {
  id: number; orderNumber: string; status: string; statusLabel: string;
  totalAmount: number; itemsCount: number; placedAt: string; summary: string;
  thumbnails: (string | null)[]; moreItems: number;
  estimatedDelivery: { from: string | null; to: string | null; label: string | null };
  deliveredAt: string | null;
  progress: { currentStep: number; cancelled: boolean; steps: { key: string; label: string; done: boolean }[] };
  refundNote: string | null;
  actions: OrderActions;
}
export interface OrdersQuery { tab?: OrdersTab; search?: string; from?: string; to?: string; page: number; limit: number; }
export interface OrdersListData { orders: OrderCard[]; tabCounts: Record<OrdersTab, number>; pagination: MarketplacePagination; }

export interface InstallationVerification {
  stage: "awaiting_you" | "confirmed" | "disputed" | "completed";
  finishedAt: string | null; respondBy: string | null; confirmedAt: string | null;
  rating: { rating: number; comment: string | null; ratedAt: string } | null;
}
export interface OrderDetail extends OrderCard {
  header: { orderRef: string; status: string; total: number; items: number; estimatedDelivery: string | null };
  itemsOrdered: { id: number; productId: number; name: string; image: string | null; quantity: number; unitPrice: number; lineTotal: number; installationFee: number; installationLabel: string | null }[];
  priceSummary: { subtotal: number; installationTotal: number; deliveryFee: number; discount: number; promoCode: string | null; total: number; lines: { label: string; amount: number; display?: string }[]; paymentLine: string };
  timeline: { key: string; title: string; note: string | null; at: string | null; done: boolean }[];
  tracking: { trackingNumber: string; carrier: string; shippedAt: string | null } | null;
  deliveryAddress: { fullName: string; phone: string; addressLine: string; city: string | null; state: string; country: string; landmark: string | null };
  installation: {
    id: number; status: string; dateLabel: string; timeLabel: string; label: string; installerLabel: string;
    installer: { name: string; phone: string } | null; location: string | null; note: string | null;
    verification: InstallationVerification | null;
  } | null;
  seller: { name: string; verified: boolean };
  returnWindowEndsAt: string | null;
}
/** Kept for older components. */
export type OrderRecord = OrderCard;

// ---------- Returns ----------
export type ReturnReason = "damaged" | "defective" | "wrong_item" | "not_as_described" | "changed_mind" | "other";
export interface ReturnRequest {
  id: number; status: string; statusLabel: string; reason: ReturnReason; details: string | null; adminNote: string | null;
  refundAmount: number | null; createdAt: string; orderId?: number; orderNumber?: string;
  items?: { orderItemId: number; name: string; quantity: number }[];
}
export interface OrderReturnsInfo {
  canReturn: boolean; windowEndsAt: string | null;
  reasons: { key: ReturnReason; label: string }[];
  returnableItems: { orderItemId: number; productId: number; name: string; purchased: number; alreadyReturned: number; returnable: number; unitPrice: number }[];
  returns: ReturnRequest[];
}

// ---------- Wishlist / notifications ----------
export interface WishlistData { items: (ProductCard & { addedAt: string })[]; pagination: MarketplacePagination; }
export interface AppNotification { id: number; type: string; title: string; message: string; read: boolean; createdAt: string; }
export interface NotificationsData { notifications: AppNotification[]; unreadCount: number; pagination: MarketplacePagination; }

/** Order counts shown in the stats cards (from GET /orders tabCounts). */
export interface UserOrderStats { totalOrders: number; pendingOrders: number; completedOrders: number; totalSpend?: number; }

export type MpResponse<T> = ApiResponse<T>;
