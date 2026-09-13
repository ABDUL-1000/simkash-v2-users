import { useState } from "react";
import { WalletHeroCard } from "../components/WalletHeroCard";
import { DeviceSimsSection } from "../components/DeviceSimsSection";
import { QuickServicesSection } from "../components/QuickServicesSection";
import { RecentTransactionsSection } from "../components/RecentTransactionsSection";
import { ZeroLimitSimSection } from "../components/ZeroLimitSimSection";
import { TopUpWalletModal } from "../Modals/TopUpWalletModal";
import { MoreServicesModal } from "../Modals/MoreServicesModal";

export default function DashboardPage() {
  const [topUpModalOpen, setTopUpModalOpen] = useState(false);
  const [moreServicesModalOpen, setMoreServicesModalOpen] = useState(false);

  return (
    <div className="space-y-6  ">
      {/* Wallet Balance & PayLater Hero Card */}
      <WalletHeroCard
        onTopUpClick={() => setTopUpModalOpen(true)}
        onMoreClick={() => setMoreServicesModalOpen(true)}
      />

      {/* My Device SIMs Section */}
      <DeviceSimsSection />

      {/* Quick Services Pills */}
      <QuickServicesSection
        onMoreServicesClick={() => setMoreServicesModalOpen(true)}
      />

      {/* Recent Transactions List */}
      <RecentTransactionsSection />

      {/* ZeroLimit SIM Banner */}
      <ZeroLimitSimSection />

      {/* Modals */}
      <TopUpWalletModal
        open={topUpModalOpen}
        onOpenChange={setTopUpModalOpen}
      />
      <MoreServicesModal
        open={moreServicesModalOpen}
        onOpenChange={setMoreServicesModalOpen}
      />
    </div>
  );
}