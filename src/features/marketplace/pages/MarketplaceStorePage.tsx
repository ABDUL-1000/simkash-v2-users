import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useGetMarketplaceOverview } from "../api/useGetMarketplaceOverview";
import { useGetCategories } from "../api/useGetCategories";
import { useGetFeaturedProducts } from "../api/useGetFeaturedProducts";
import { useGetProducts } from "../api/useGetProducts";
import { MarketplaceStatsCards } from "../components/MarketplaceStatsCards";
import { CategoryPillsBar } from "../components/CategoryPillsBar";
import { FeaturedProductsSection } from "../components/FeaturedProductsSection";
import { ProductCatalogGrid } from "../components/ProductCatalogGrid";
import { CheckoutModal } from "../Modals/CheckoutModal";
import type { ProductItem } from "../types/api";

export default function MarketplaceStorePage() {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState<number>();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const { page, pageSize, paginationConfig, setPage } = useTablePagination({ initialPageSize: 12 });
  const overview = useGetMarketplaceOverview();
  const categories = useGetCategories();
  const featured = useGetFeaturedProducts(4);
  const productsQuery = useGetProducts({ page, limit: pageSize, categoryId, search: debouncedSearch, sortBy });
  const productsData = productsQuery.data?.data;

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => window.clearTimeout(timer);
  }, [search]);
  useEffect(() => { setPage(1); }, [categoryId, debouncedSearch, sortBy, setPage]);

  const selectCategory = (id?: number) => setCategoryId(id);
  const openOrder = (product: ProductItem) => setSelectedProduct(product);

  return <div className="mx-auto w-full max-w-[1600px] min-w-0 space-y-6 p-4 sm:p-6">
    <PageHeader title="Marketplace" description="Procure POS terminals, accessories, and device hardware" actions={[{ key: "orders", label: "My Orders", variant: "outline", onClick: () => navigate("/marketplace/orders") }]} />
    <MarketplaceStatsCards stats={overview.overview?.userOrderStats} />
    <FeaturedProductsSection products={featured.products} isLoading={featured.isLoading} onOrder={openOrder} />
    <div className="space-y-4">
      <CategoryPillsBar categories={categories.categories} selectedId={categoryId} onSelect={selectCategory} />
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8C909B]" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search products..." className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#2563EB]" /></div>
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-xl border border-[#E2ECF6] bg-white px-3 py-2.5 text-xs font-semibold text-[#0F152A]"><option value="popular">Popular</option><option value="newest">Newest</option><option value="price_low_to_high">Price: Low to High</option><option value="price_high_to_low">Price: High to Low</option></select>
      </div>
      <ProductCatalogGrid products={productsData?.products ?? []} isLoading={productsQuery.isLoading} onOrder={openOrder} />
      {productsData?.pagination && productsData.pagination.totalPages > 1 && <Pagination {...paginationConfig} current={page} pageSize={pageSize} total={productsData.pagination.total} showSizeChanger responsive />}
    </div>
    <CheckoutModal open={Boolean(selectedProduct)} product={selectedProduct} onClose={() => setSelectedProduct(null)} />
  </div>;
}
