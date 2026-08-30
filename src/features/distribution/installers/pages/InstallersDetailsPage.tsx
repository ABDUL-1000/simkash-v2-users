import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { appPaths } from "@/app/router/paths";

import { InstallerDetailsHeader } from "../components/details/InstallerDetailsHeader";
import { InstallerPerformanceOverviewCard } from "../components/details/InstallerPerformanceOverviewCard";
import { InstallerSkillsCertificationsCard } from "../components/details/InstallerSkillsCertificationsCard";
import { InstallerJobHistoryCard } from "../components/details/InstallerJobHistoryCard";
import { InstallerActiveJobCard } from "../components/details/InstallerActiveJobCard";
import { InstallerQuickActionsCard } from "../components/details/InstallerQuickActionsCard";
import { InstallerAccountDetailsCard } from "../components/details/InstallerAccountDetailsCard";
import { InstallerIdentityDocumentsCard } from "../components/details/InstallerIdentityDocumentsCard";

import { AssignInstallationJobModal } from "../Modals/AssignInstallationJobModal";

export default function InstallersDetailsPage() {
  const { partnerId } = useParams();
      console.log(partnerId)

  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.installers)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#64748B] hover:text-[#0F172A] transition-colors"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Installers</span>
        </button>
      </div>

      {/* Top Details Header using EntityDetailsHeader */}
      <InstallerDetailsHeader
        name="Emeka Obi"
        phone="08163083409"
        location="Lagos"
        role="Installer"
        onAssignJob={() => setActiveModal("assign")}
      />

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Column 1: Left */}
        <div className="space-y-6 min-w-0">
          <InstallerPerformanceOverviewCard />
          <InstallerSkillsCertificationsCard />
        </div>

        {/* Column 2: Center */}
        <div className="space-y-6 min-w-0">
          <InstallerJobHistoryCard />
          <InstallerActiveJobCard />
        </div>

        {/* Column 3: Right */}
        <div className="space-y-6 min-w-0">
          <InstallerQuickActionsCard
            onAssignJob={() => setActiveModal("assign")}
            onViewJobPool={() => navigate(appPaths.jobPool)}
          />
          <InstallerAccountDetailsCard />
          <InstallerIdentityDocumentsCard />
        </div>
      </div>

      {/* Action Modals */}
      <AssignInstallationJobModal
        open={activeModal === "assign"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        installerName="Emeka Obi"
      />
    </div>
  );
}
