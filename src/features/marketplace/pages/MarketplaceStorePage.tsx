import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useClearRecentlyViewed, useGetCart, useGetCategories, useGetFeaturedProducts, useGetProducts, useGetRecentlyViewed, useOrderStats } from "../api";
import { MarketplaceStatsCards } from "../components/MarketplaceStatsCards";
import { CategoryPillsBar } from "../components/CategoryPillsBar";
import { FeaturedProductsSection } from "../components/FeaturedProductsSection";
import { ProductCatalogGrid } from "../components/ProductCatalogGrid";
import type { ProductSort } from "../types/api";

const QUICK_FILTERS = [
  { key: "under50k", label: "Under ₦50k" },
  { key: "easyBuy", label: "EasyBuy" },
  { key: "inStock", label: "In Stock" },
  { key: "installation", label: "Installation" },
] as const;
type QuickFilter = typeof QUICK_FILTERS[number]["key"];

export default function MarketplaceStorePage() {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState<number>();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<ProductSort>("best_match");
  const [filters, setFilters] = useState<QuickFilter[]>([]);
  const { page, pageSize, paginationConfig, setPage } = useTablePagination({ initialPageSize: 20 });
  const stats = useOrderStats();
  const categories = useGetCategories();
  const featured = useGetFeaturedProducts(4);
  const recent = useGetRecentlyViewed(12);
  const clearRecent = useClearRecentlyViewed();
  const cart = useGetCart();
  const has = (key: QuickFilter) => filters.includes(key);
  const productsQuery = useGetProducts({
    page, limit: pageSize, categoryId, search: debouncedSearch || undefined, sortBy,
    maxPrice: has("under50k") ? 50000 : undefined, easyBuy: has("easyBuy") || undefined, inStock: has("inStock") || undefined, installation: has("installation") || undefined,
  });
  const productsData = productsQuery.data;

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);
  useEffect(() => { setPage(1); }, [categoryId, debouncedSearch, sortBy, filters, setPage]);

  const toggleFilter = (key: QuickFilter) => setFilters((prev) => prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]);
  const cartCount = cart.cart?.itemsCount ?? 0;

  return <div className="mx-auto w-full max-w-[1600px] min-w-0 space-y-6 p-4 sm:p-6">
    <PageHeader title="Marketplace" description="Procure POS terminals, accessories, and device hardware" actions={[
      { key: "cart", label: cartCount ? `Cart (${cartCount})` : "Cart", onClick: () => navigate("/marketplace/cart") },
      { key: "wishlist", label: "Wishlist", variant: "outline", onClick: () => navigate("/marketplace/wishlist") },
      { key: "orders", label: "My Orders", variant: "outline", onClick: () => navigate("/marketplace/orders") },
    ]} />
    <MarketplaceStatsCards stats={stats.stats} />
    <FeaturedProductsSection products={featured.products} isLoading={featured.isLoading} />
    <div className="space-y-4">
      <CategoryPillsBar categories={categories.categories} selectedId={categoryId} onSelect={setCategoryId} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8C909B]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#2563EB]" /></div>
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value as ProductSort)} className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2.5 text-xs font-semibold text-[#0F152A]">
          <option value="best_match">Best Match</option><option value="popular">Popular</option><option value="newest">Newest</option><option value="rating">Top Rated</option><option value="price_asc">Price: Low to High</option><option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-2">{QUICK_FILTERS.map(({ key, label }) => <button key={key} type="button" onClick={() => toggleFilter(key)} className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${has(key) ? "bg-[#0F152A] text-white" : "border border-[#E2ECF6] bg-white text-[#66738C]"}`}>{label}</button>)}</div>
      <ProductCatalogGrid products={productsData?.products ?? []} isLoading={productsQuery.isLoading} />
      {productsData?.pagination && productsData.pagination.totalPages > 1 && <Pagination {...paginationConfig} current={page} pageSize={pageSize} total={productsData.pagination.total} showSizeChanger={false} responsive />}
    </div>
    {recent.items.length > 0 && <FeaturedProductsSection title="Recently Viewed" products={recent.items} isLoading={false}
      action={<button type="button" disabled={clearRecent.isPending} onClick={() => clearRecent.mutate()} className="text-xs font-bold text-[#2563EB] hover:underline">Clear all</button>} />}
  </div>;
}
