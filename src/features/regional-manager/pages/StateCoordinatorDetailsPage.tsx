import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Package, AlertTriangle, Phone } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { EntityDetailsHeader } from "@/components/common/EntityDetailsHeader";
import { ScDetailsKpiStrip } from "../components/sc-details/ScDetailsKpiStrip";
import { ScInfoCard } from "../components/sc-details/ScInfoCard";
import { ScSimStockCard } from "../components/sc-details/ScSimStockCard";
import { ScAgencyPartnersCard } from "../components/sc-details/ScAgencyPartnersCard";
import { ScPerformanceCard } from "../components/sc-details/ScPerformanceCard";
import { ScBonusStatusCard } from "../components/sc-details/ScBonusStatusCard";
import { ScStockDistributionsCard } from "../components/sc-details/ScStockDistributionsCard";
import { ScQuickActionsSidebar } from "../components/sc-details/ScQuickActionsSidebar";
import { ScCommissionCard } from "../components/sc-details/ScCommissionCard";
import { ScTimelineCard } from "../components/sc-details/ScTimelineCard";

// Modals
import { DistributeStockModal } from "../Modals/DistributeStockModal";
import { SuspendScModal } from "../Modals/SuspendScModal";
import { ContactScModal } from "../Modals/ContactScModal";
import { SendBonusReminderModal } from "../Modals/SendBonusReminderModal";
import { OnboardApModal } from "@/features/state-coordinator/modals/OnboardApModal";

// Data
import { INITIAL_STATE_COORDINATORS } from "../data/regional-manager.data";
import type { StateCoordinatorItem } from "../types/regional-manager.types";

export function StateCoordinatorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find SC by id or default to Aminat Okafor
  const initialSc =
    INITIAL_STATE_COORDINATORS.find((sc) => sc.id === id) ||
    INITIAL_STATE_COORDINATORS[0];
  const [sc, setSc] = useState<StateCoordinatorItem>(initialSc);

  // Modals state
  const [distributeModalOpen, setDistributeModalOpen] = useState(false);
  const [suspendModalOpen, setSuspendModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [bonusReminderModalOpen, setBonusReminderModalOpen] = useState(false);
  const [onboardApModalOpen, setOnboardApModalOpen] = useState(false);

  const handleDistributeSuccess = (details: { scName: string; total: number }) => {
    setSc((prev) => ({
      ...prev,
      stock: prev.stock + details.total,
      stockStatus: "Normal",
      simStockBreakdown: {
        ...prev.simStockBreakdown,
        pos: prev.simStockBreakdown.pos + details.total,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumbs & Back Link */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate(appPaths.regionalManagerDashboard)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#66738C] hover:text-[#0F152A] transition"
        >
          <ArrowLeft className="size-4" />
          <span>State Coordinators → {sc.name}</span>
        </button>

        <span className="text-xs text-[#8C909B] font-medium">
          Regional Manager View
        </span>
      </div>

      {/* 6-Metric KPI Strip */}
      <ScDetailsKpiStrip
        stock={sc.stock}
        apsCount={sc.apsCount}
        activationsCount={sc.activationsCount}
        bonusStatus={sc.bonusStatus}
        lastActive={sc.lastActive}
        location={`${sc.lga || "Ikeja"}, ${sc.state}`}
      />

      {/* Profile Header using reusable EntityDetailsHeader */}
      <EntityDetailsHeader
        name={sc.name}
        phone={sc.phone}
        location={sc.state}
        avatarInitials={sc.initials}
        avatarBg={sc.avatarBg || "#2563EB"}
        badges={[
          { label: "● Active", variant: "success" },
          { label: "State Coordinator", variant: "info" },
          { label: `${sc.state} Region`, variant: "gray" },
        ]}
        actions={[
          {
            key: "distribute-sims",
            label: "Distribute SIMs",
            icon: <Package className="size-4" />,
            variant: "primary",
            onClick: () => setDistributeModalOpen(true),
          },
          {
            key: "suspend-sc",
            label: "Suspend SC",
            icon: <AlertTriangle className="size-4" />,
            variant: "danger",
            onClick: () => setSuspendModalOpen(true),
          },
          {
            key: "contact-sc",
            label: "Contact SC",
            icon: <Phone className="size-4" />,
            variant: "outline",
            onClick: () => setContactModalOpen(true),
          },
        ]}
      />

      {/* 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Column 1 (4 cols) */}
        <div className="space-y-6 lg:col-span-4">
          <ScInfoCard sc={sc} />

          <ScSimStockCard
            stock={sc.stock}
            breakdown={sc.simStockBreakdown}
            onDistributeMore={() => setDistributeModalOpen(true)}
          />

          <ScAgencyPartnersCard
            partners={sc.agencyPartners}
            totalCount={sc.apsCount}
            onViewAll={() => {}}
          />
        </div>

        {/* Column 2 (4 cols) */}
        <div className="space-y-6 lg:col-span-4">
          <ScPerformanceCard />

          <ScBonusStatusCard
            activations={sc.activationsCount}
            target={500}
            bonusAmount="₦10,000"
          />

          <ScStockDistributionsCard
            distributions={sc.distributions}
            onViewRecord={() => {}}
            onViewHistory={() => {}}
          />
        </div>

        {/* Column 3 (4 cols) */}
        <div className="space-y-6 lg:col-span-4">
          <ScQuickActionsSidebar
            onDistributeSims={() => setDistributeModalOpen(true)}
            onOnboardAp={() => setOnboardApModalOpen(true)}
            onSendReminder={() => setBonusReminderModalOpen(true)}
            onViewAps={() => {}}
            onSuspendSc={() => setSuspendModalOpen(true)}
            onRedistributeSims={() => setDistributeModalOpen(true)}
          />

          <ScCommissionCard
            networkActs={sc.activationsCount}
            poolAmount="₦1,847,000"
            rmShare="₦184,700"
          />

          <ScTimelineCard timeline={sc.timeline} />
        </div>
      </div>

      {/* MODALS */}
      <DistributeStockModal
        open={distributeModalOpen}
        onOpenChange={setDistributeModalOpen}
        preselectedSc={sc}
        onSuccess={handleDistributeSuccess}
      />

      <SuspendScModal
        open={suspendModalOpen}
        onOpenChange={setSuspendModalOpen}
        scName={sc.name}
        onConfirmSuspend={() => {
          setSc((prev) => ({ ...prev, stockStatus: "Out of Stock" }));
        }}
      />

      <ContactScModal
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
        scName={sc.name}
        phone={sc.phone}
      />

      <SendBonusReminderModal
        open={bonusReminderModalOpen}
        onOpenChange={setBonusReminderModalOpen}
        scName={sc.name}
        phone={sc.phone}
        currentActs={sc.activationsCount}
        targetActs={500}
      />

      <OnboardApModal
        open={onboardApModalOpen}
        onOpenChange={setOnboardApModalOpen}
      />
    </div>
  );
}

export default StateCoordinatorDetailsPage;
