import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { useGetMarketplaceOverview } from "../api/useGetMarketplaceOverview";
import { MarketplaceStatsCards } from "../components/MarketplaceStatsCards";
import { OrdersHistoryTable } from "../components/OrdersHistoryTable";
import { OrderDetailDrawer } from "../components/OrderDetailDrawer";
import type { OrderRecord } from "../types/api";
import { appPaths } from "@/app/router/paths";

export default function OrdersHistoryPage() {
  const navigate = useNavigate();
  const overview = useGetMarketplaceOverview();
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  return <div className="mx-auto w-full max-w-[1400px] min-w-0 space-y-5 p-4 sm:p-6">
    <button type="button" onClick={() => navigate(appPaths.marketplace)} className="flex items-center gap-2 text-sm font-semibold text-[#66738C] transition hover:text-[#2563EB]">
      <ArrowLeft className="size-4" />
      Back to Marketplace
    </button>
    <PageHeader title="Order History" description="Review your marketplace orders, payment status, and delivery details" />
    {overview.isLoading ? <CardGridSkeleton count={3} /> : <MarketplaceStatsCards stats={overview.overview?.userOrderStats} compact variant="orders" />}
    <OrdersHistoryTable onSelect={setSelectedOrder} />
    <OrderDetailDrawer id={selectedOrder?.id} open={Boolean(selectedOrder)} onClose={() => setSelectedOrder(null)} />
  </div>;
}
