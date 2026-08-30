import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Plus, Package } from "lucide-react";

import { ZeroLimitHeaderStats } from "../components/ZeroLimitHeaderStats";
import { ZeroLimitTableFilter, type ZeroLimitTab } from "../components/ZeroLimitTableFilter";
import { ZeroLimitSimsTable, type ZeroLimitRow } from "../components/ZeroLimitSimsTable";

import { ZeroLimitSalesTodayCard } from "../components/ZeroLimitSalesTodayCard";
import { ZeroLimitTopPackagesCard } from "../components/ZeroLimitTopPackagesCard";
import { ZeroLimitAlertCard } from "../components/ZeroLimitAlertCard";
import { ZeroLimitRecentActivityCard } from "../components/ZeroLimitRecentActivityCard";

import { DistributeSimsModal } from "../Modals/DistributeSimsModal";
import { ManagePackagesModal } from "../Modals/ManagePackagesModal";
import { SubscriberDetailModal } from "../Modals/SubscriberDetailModal";
import { RenewPlanOnBehalfModal } from "../Modals/RenewPlanOnBehalfModal";
import { SuspendSubscriberModal } from "../Modals/SuspendSubscriberModal";

export default function ZeroLimitSimPage() {
  const [activeTab, setActiveTab] = useState<ZeroLimitTab>("all");
  const [search, setSearch] = useState("");
  const [network, setNetwork] = useState("all");
  const [pkg, setPackage] = useState("all");
  const [agent, setAgent] = useState("all");

  const [activeModal, setActiveModal] = useState<
    "distribute" | "manage_packages" | "subscriber_detail" | "renew_behalf" | "suspend" | null
  >(null);

  const [selectedSubscriber, setSelectedSubscriber] = useState<ZeroLimitRow | null>(null);

  const handleSelectRow = (row: ZeroLimitRow) => {
    setSelectedSubscriber(row);
    setActiveModal("subscriber_detail");
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Top Page Header */}
      <PageHeader
        title="Wireless ZeroLimit SIMs"
        description="Premium data SIMs distributed through the agent network. Users renew data exclusively on Simkash."
        actions={[
          {
            key: "manage-packages",
            label: "Manage Packages",
            icon: <Package className="size-4" />,
            variant: "outline",
            onClick: () => setActiveModal("manage_packages"),
          },
          {
            key: "distribute-sims",
            label: "Distribute SIMs",
            icon: <Plus className="size-4" />,
            variant: "default",
            onClick: () => setActiveModal("distribute"),
          },
        ]}
      />

      {/* Top Metric Header Stats Section */}
      <ZeroLimitHeaderStats />

      {/* Filter Tabs & Search Bar */}
      <ZeroLimitTableFilter
        activeTab={activeTab}
        onTabChange={setActiveTab}
        search={search}
        onSearchChange={setSearch}
        network={network}
        onNetworkChange={setNetwork}
        pkg={pkg}
        onPackageChange={setPackage}
        agent={agent}
        onAgentChange={setAgent}
      />

      {/* 2-Column Grid Layout: Left Table, Right 4 Sidebar Cards */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px] 2xl:grid-cols-[1fr_380px]">
        {/* Left Column: ZeroLimit SIMs Table */}
        <div className="min-w-0">
          <ZeroLimitSimsTable
            activeTab={activeTab}
            search={search}
            onSelectRow={handleSelectRow}
          />
        </div>

        {/* Right Column: Stacked 4 Sidebar Cards */}
        <div className="space-y-6 min-w-0">
          <ZeroLimitSalesTodayCard />
          <ZeroLimitTopPackagesCard />
          <ZeroLimitAlertCard
            onViewExhausted={() => setActiveTab("exhausted")}
          />
          <ZeroLimitRecentActivityCard />
        </div>
      </div>

      {/* Modals */}
      <DistributeSimsModal
        open={activeModal === "distribute"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <ManagePackagesModal
        open={activeModal === "manage_packages"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <SubscriberDetailModal
        open={activeModal === "subscriber_detail"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        subscriber={{
          name: selectedSubscriber?.distributedTo || "Adaeze Okonkwo",
          phone: selectedSubscriber?.simNumber || "0803 456 7890",
          location: "Lagos, Nigeria",
          email: "adaeze.okonkwo@email.com",
          status: selectedSubscriber?.status?.toUpperCase() || "ACTIVE",
          plan: "Business",
          network: selectedSubscriber?.network || "MTN",
          joinedDate: "Jan 15, 2024",
          accountId: "SK-00483",
          usedGb: selectedSubscriber?.usedGb || 7.8,
          totalGb: selectedSubscriber?.totalGb || 10,
          nextRenewalDate: "Jul 15, 2025",
          nextRenewalDays: "16 days remaining",
          nextRenewalAmount: "₦8,500",
        }}
        onRenewNow={() => setActiveModal("renew_behalf")}
        onChangePlan={() => setActiveModal("suspend")}
      />

      <RenewPlanOnBehalfModal
        open={activeModal === "renew_behalf"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        subscriberName={selectedSubscriber?.distributedTo || "Adaeze Okonkwo"}
        planName="Business Plan"
        network={selectedSubscriber?.network || "MTN"}
        location="Lagos"
        dataSize="10GB data"
        price="₦8,500"
      />

      <SuspendSubscriberModal
        open={activeModal === "suspend"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        subscriberName={selectedSubscriber?.distributedTo || "Adaeze Okonkwo"}
        planName="Business Plan"
        network={selectedSubscriber?.network || "MTN"}
        status={selectedSubscriber?.status?.toUpperCase() || "ACTIVE"}
      />
    </div>
  );
}
