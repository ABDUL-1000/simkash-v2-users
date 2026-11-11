import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import { useOrderStats } from "../api";
import { MarketplaceStatsCards } from "../components/MarketplaceStatsCards";
import { OrdersHistoryTable } from "../components/OrdersHistoryTable";
import { appPaths } from "@/app/router/paths";

export default function OrdersHistoryPage() {
  const navigate = useNavigate();
  const stats = useOrderStats();
  return <div className="mx-auto w-full max-w-[1400px] min-w-0 space-y-5 p-4 sm:p-6">
    <button type="button" onClick={() => navigate(appPaths.marketplace)} className="flex items-center gap-2 text-sm font-semibold text-[#66738C] transition hover:text-[#2563EB]">
      <ArrowLeft className="size-4" />
      Back to Marketplace
    </button>
    <PageHeader title="My Orders" description="Track your marketplace orders, payments, deliveries and returns" />
    {stats.isLoading ? <CardGridSkeleton count={3} /> : <MarketplaceStatsCards stats={stats.stats} compact variant="orders" />}
    <OrdersHistoryTable />
  </div>;
}
