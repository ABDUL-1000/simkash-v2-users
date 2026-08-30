import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Download, Plus } from "lucide-react";
import { DashboardStats } from "../components/DashboardStat";
import { AgencyPartnerTable, type AgencyPartnerRow } from "../components/AgencyPartnerTable";
import { OnboardPartnerModal } from "../Modals/OnboardPartnerModal";

export default function CorporateAgentPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<AgencyPartnerRow | null>(null);
    console.log(selectedPartner)


  const handleSelectRow = (row: AgencyPartnerRow) => {
    setSelectedPartner(row);
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      <PageHeader
        title="Corporate Agents"
        description="Manage Corporate Agents and their Agency Partner networks"
        actions={[
          {
            key: "export-dashboard",
            label: "Export Report",
            icon: <Download className="size-4" />,
            variant: "outline",
          },
          {
            key: "Onboard-Partner",
            label: "Onboard New Partner",
            icon: <Plus className="size-4" />,
            variant: "default",
            onClick: () => setActiveModal("onboard"),
          },
        ]}
      />

      {/* Stats Cards Section */}
      <DashboardStats />

      {/* Main Table: Agency Partners */}
      <AgencyPartnerTable onSelectRow={handleSelectRow} />

      {/* Onboard Partner Modal */}
      <OnboardPartnerModal
        open={activeModal === "onboard"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </div>
  );
}
