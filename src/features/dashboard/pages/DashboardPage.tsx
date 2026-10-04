import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { WalletHeroCard } from "../components/WalletHeroCard";
import { DeviceSimsSection } from "../components/DeviceSimsSection";
import { QuickServicesSection } from "../components/QuickServicesSection";
import { RecentTransactionsSection } from "../components/RecentTransactionsSection";
import { ZeroLimitSimSection } from "../components/ZeroLimitSimSection";
import { TopUpWalletModal } from "../Modals/TopUpWalletModal";
import { MoreServicesModal } from "../Modals/MoreServicesModal";
import { BuyAirtimeModal } from "@/features/bill-payments/Modals/BuyAirtimeModal";
import { BuyDataModal } from "@/features/bill-payments/Modals/BuyDataModal";
import { ElectricityPaymentModal } from "@/features/bill-payments/Modals/ElectricityPaymentModal";
import { CableTvPaymentModal } from "@/features/bill-payments/Modals/CableTvPaymentModal";
import { JambPinModal } from "@/features/bill-payments/Modals/JambPinModal";
import { WaecCheckerModal } from "@/features/bill-payments/Modals/WaecCheckerModal";
import { AirtimeToCashModal } from "@/features/bill-payments/Modals/AirtimeToCashModal";
import { DataToCashModal } from "@/features/bill-payments/Modals/DataToCashModal";
import { BulkAirtimeModal } from "@/features/bill-payments/Modals/BulkAirtimeModal";
import { BulkDataModal } from "@/features/bill-payments/Modals/BulkDataModal";
import { useGetAuthUser } from "@/features/auth/api/useGetAuthUser";
import { DashboardSkeleton } from "@/components/loaders";
import { VirtualAccountCard } from "@/features/wallet/components/VirtualAccountCard";
import { MarketplaceDashboardSection } from "@/features/marketplace/components/MarketplaceDashboardSection";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { isLoading: isAuthLoading } = useGetAuthUser();

  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [moreServicesModalOpen, setMoreServicesModalOpen] = useState(false);
  const [activeBillModal, setActiveBillModal] = useState<string | null>(null);
  const openService = (serviceId: string) => {
    if (["request-sim", "sim-swap", "sim-renew"].includes(serviceId)) {
      navigate(appPaths.deviceSim);
      return;
    }
    setActiveBillModal(serviceId);
  };

  if (isAuthLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Wallet Balance & PayLater Hero Card */}
      <WalletHeroCard
        onTopUpClick={() => setTopUpModalOpen(true)}
        onMoreClick={() => setMoreServicesModalOpen(true)}
        onAirtimeClick={() => setActiveBillModal("airtime")}
        onSendClick={() => navigate("/transactions")}
        onWithdrawClick={() => navigate("/wallet-payouts")}
      />
      <VirtualAccountCard />

      {/* My Device SIMs Section */}
      <DeviceSimsSection />

      {/* Quick Services Pills */}
      <QuickServicesSection
        onMoreServicesClick={() => setMoreServicesModalOpen(true)}
        onServiceClick={openService}
      />

      <MarketplaceDashboardSection />

      {/* Recent Transactions List */}
      <RecentTransactionsSection />

      {/* ZeroLimit SIM Banner */}
      <ZeroLimitSimSection />

      {/* Dashboard Management Modals */}
      <TopUpWalletModal
        open={topUpModalOpen}
        onOpenChange={setTopUpModalOpen}
      />
      <MoreServicesModal
        open={moreServicesModalOpen}
        onOpenChange={setMoreServicesModalOpen}
        onServiceSelect={openService}
      />

      {/* Quick Bill Payment Modals */}
      <BuyAirtimeModal
        open={activeBillModal === "airtime"}
        onOpenChange={(open) => setActiveBillModal(open ? "airtime" : null)}
      />
      <BuyDataModal
        open={activeBillModal === "data"}
        onOpenChange={(open) => setActiveBillModal(open ? "data" : null)}
      />
      <ElectricityPaymentModal
        open={activeBillModal === "electricity"}
        onOpenChange={(open) => setActiveBillModal(open ? "electricity" : null)}
      />
      <CableTvPaymentModal
        open={activeBillModal === "cable"}
        onOpenChange={(open) => setActiveBillModal(open ? "cable" : null)}
      />
      <JambPinModal
        open={activeBillModal === "jamb"}
        onOpenChange={(open) => setActiveBillModal(open ? "jamb" : null)}
      />
      <WaecCheckerModal
        open={activeBillModal === "waec"}
        onOpenChange={(open) => setActiveBillModal(open ? "waec" : null)}
      />
      <AirtimeToCashModal
        open={activeBillModal === "airtime-to-cash"}
        onOpenChange={(open) => setActiveBillModal(open ? "airtime-to-cash" : null)}
      />
      <DataToCashModal
        open={activeBillModal === "data-to-cash"}
        onOpenChange={(open) => setActiveBillModal(open ? "data-to-cash" : null)}
      />
      <BulkAirtimeModal
        open={activeBillModal === "bulk-airtime"}
        onOpenChange={(open) => setActiveBillModal(open ? "bulk-airtime" : null)}
      />
      <BulkDataModal
        open={activeBillModal === "bulk-data"}
        onOpenChange={(open) => setActiveBillModal(open ? "bulk-data" : null)}
      />
    </div>
  );
}
