import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import { Pagination } from "antd";
import { PageHeader } from "@/components/common/PageHeader";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { appPaths } from "@/app/router/paths";
import { useGetWishlist } from "../api";
import { ProductCard } from "../components/ProductCard";

/** GET /wishlist — the heart on each card removes it (DELETE /wishlist/:productId). */
export default function WishlistPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const query = useGetWishlist(page);
  const items = query.data?.items ?? [];
  return <div className="mx-auto w-full min-w-0 max-w-[1400px] space-y-5 p-4 sm:p-6">
    <button type="button" onClick={() => navigate(appPaths.marketplace)} className="flex items-center gap-2 text-sm font-semibold text-[#66738C] hover:text-[#2563EB]"><ArrowLeft className="size-4" /> Back to Marketplace</button>
    <PageHeader title="My Wishlist" description="Products you've saved for later" />
    {query.isLoading ? <CardGridSkeleton count={6} /> : query.isError ? <AppEmptyState title="Couldn't load your wishlist" description={query.error.message} actionText="Retry" onAction={() => void query.refetch()} />
      : items.length === 0 ? <AppEmptyState icon={<Heart className="size-5" />} title="Your wishlist is empty" description="Tap the heart on a product to save it here." actionText="Browse products" onAction={() => navigate(appPaths.marketplace)} />
      : <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <ProductCard key={item.id} product={item} />)}</div>}
    {(query.data?.pagination.totalPages ?? 1) > 1 && <Pagination current={page} pageSize={query.data?.pagination.limit} total={query.data?.pagination.total} onChange={setPage} showSizeChanger={false} />}
  </div>;
}
