import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { Download, Plus, Briefcase } from "lucide-react";
import { appPaths } from "@/app/router/paths";

import { DashboardStats } from "../components/DashboardStat";
import { InstallerTable, type InstallerRow } from "../components/InstallerTable";
import { InstallerRecentActivityCard } from "../components/InstallerRecentActivityCard";
import { JobsByTypeCard } from "../components/JobsByTypeCard";
import { InstallerTopPerformersCard } from "../components/InstallerTopPerformersCard";
import { InstallerPendingApprovalsCard } from "../components/InstallerPendingApprovalsCard";

import { OnboardPartnerModal } from "../Modals/OnboardPartnerModal";
import { InstallerApplicationReviewModal } from "../Modals/InstallerApplicationReviewModal";
import { AssignInstallationJobModal } from "../Modals/AssignInstallationJobModal";

export default function InstallersPage() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedInstaller, setSelectedInstaller] = useState<InstallerRow | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <PageHeader
        title="Installers"
        description="Manage certified CCTV & Solar installers, monitor jobs, and review applications"
        actions={[
          {
            key: "export-dashboard",
            label: "Export Report",
            icon: <Download className="size-4" />,
            variant: "outline",
          },
          {
            key: "job-portal",
            label: "Job Portal",
            icon: <Briefcase className="size-4" />,
            variant: "default",
            onClick: () => navigate(appPaths.jobPool),
          },
          {
            key: "add-installer",
            label: "Add Installer",
            icon: <Plus className="size-4" />,
            variant: "default",
            onClick: () => setActiveModal("onboard"),
          },
        ]}
      />

      {/* Top Metric Dashboard Stats */}
      <DashboardStats />

      {/* Main Installers Table */}
      <InstallerTable
        onSelectRow={(r) => setSelectedInstaller(r)}
        onAssignJob={(r) => {
          setSelectedInstaller(r);
          setActiveModal("assign");
        }}
        onApprove={(r) => {
          setSelectedInstaller(r);
          setActiveModal("review_application");
        }}
      />

      {/* Recent Activity Log Section */}
      <InstallerRecentActivityCard />

      {/* Bottom 3-Card Grid Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <JobsByTypeCard />
        <InstallerTopPerformersCard />
        <InstallerPendingApprovalsCard
          onApprove={() => setActiveModal("review_application")}
          onReject={() => setActiveModal("review_application")}
        />
      </div>

      {/* Modals */}
      <OnboardPartnerModal
        open={activeModal === "onboard"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <InstallerApplicationReviewModal
        open={activeModal === "review_application"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        applicantName={selectedInstaller?.name || "Bukhari Mohammed"}
        phone={selectedInstaller?.phone || "08120600542"}
        location={selectedInstaller?.location || "Kano"}
      />

      <AssignInstallationJobModal
        open={activeModal === "assign"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        installerName={selectedInstaller?.name || "Emeka Obi"}
      />
    </div>
  );
}
