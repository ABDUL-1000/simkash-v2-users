import { Wallet } from "lucide-react";
import { AgentStatCard } from "@/components/common/AgentStatCard";
import { CardGridSkeleton } from "@/components/loaders/CardGridSkeleton";
import type { ApDashboardSummaryData } from "../types/api";

export function ApDashboardKpiCards({ summary, loading, onFundWallet }: { summary?: ApDashboardSummaryData; loading: boolean; onFundWallet: () => void }) {
  if (loading) return <CardGridSkeleton count={4} />;
  const money = (amount = 0) => `₦${amount.toLocaleString("en-NG")}`;
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <AgentStatCard title="Today's Activations" value={summary?.today.activations ?? 0} subtitle={`${money(summary?.today.commission)} commission`} badgeText={summary?.today.comparison.text || "Compared with yesterday"} />
    <AgentStatCard title="Today's Commission" value={money(summary?.today.commission)} subtitle="Earned today" />
    <AgentStatCard title="This Month's Activations" value={summary?.this_month.activations ?? 0} subtitle={`${money(summary?.this_month.commission)} commission`} />
    <AgentStatCard title="Wallet Balance" value={money(summary?.wallet.balance)} subtitle={summary?.wallet.currency || "Available balance"} action={<button type="button" onClick={onFundWallet} className="inline-flex items-center gap-1 rounded-lg border border-[#E2ECF6] px-2 py-1 text-[10px] font-bold text-[#2563EB]"><Wallet className="size-3" /> Fund Wallet</button>} />
  </div>;
}
