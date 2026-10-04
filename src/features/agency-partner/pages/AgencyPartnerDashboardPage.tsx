import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Smartphone, Users } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { TopUpWalletModal } from "@/features/dashboard/Modals/TopUpWalletModal";
import { appPaths } from "@/app/router/paths";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import { useGetApDashboardSummary } from "../api";
import { ApDashboardKpiCards } from "../components/ApDashboardKpiCards";
import { ApSimStockBreakdownCard } from "../components/ApSimStockBreakdownCard";
import { ApRecentActivationsCard } from "../components/ApRecentActivationsCard";
import { ApRecentCustomersCard } from "../components/ApRecentCustomersCard";
import { ApRecentActivityTimeline } from "../components/ApRecentActivityTimeline";
import { ActivateSimModal } from "../modals/ActivateSimModal";

export function AgencyPartnerDashboardPage() {
  const navigate = useNavigate();
  const { user, profile } = useGetAuthUser();
  const { summary, isLoading } = useGetApDashboardSummary();
  const [activateOpen, setActivateOpen] = useState(false);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const name = profile?.fullname || user?.username;

  return (
    <main className="mx-auto w-full min-w-0 max-w-[1440px] space-y-5 p-4 sm:p-6">
      <PageHeader
        title="Agency Partner Dashboard"
        description={`Welcome back${name ? `, ${name}` : ""}. Track your activations, stock, and earnings.`}
        actions={[
          {
            key: "activate",
            label: "Activate SIM",
            icon: <Smartphone className="size-4" />,
            onClick: () => setActivateOpen(true),
          },
          {
            key: "customers",
            label: "My Customers",
            icon: <Users className="size-4" />,
            variant: "outline",
            onClick: () => navigate(appPaths.apCustomers),
          },
          {
            key: "topup",
            label: "Fund Wallet",
            icon: <Plus className="size-4" />,
            variant: "outline",
            onClick: () => setTopUpOpen(true),
          },
        ]}
      />
      <ApDashboardKpiCards
        summary={summary}
        loading={isLoading}
        onFundWallet={() => setTopUpOpen(true)}
      />
      <div className="grid min-w-0 gap-5 xl:grid-cols-3">
        <div className="min-w-0 space-y-5 xl:col-span-2">
          <ApRecentActivationsCard />
          <ApRecentActivityTimeline />
        </div>
        <div className="min-w-0 space-y-5">
          <ApSimStockBreakdownCard />
          <ApRecentCustomersCard />
        </div>
      </div>
      <ActivateSimModal open={activateOpen} onOpenChange={setActivateOpen} />
      <TopUpWalletModal
        open={topUpOpen}
        onOpenChange={setTopUpOpen}
        currentBalance={summary?.wallet.balance}
      />
    </main>
  );
}
