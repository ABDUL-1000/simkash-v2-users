import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Briefcase } from "lucide-react";
import { JobPoolTable, type JobPoolRow } from "../components/JobPoolTable";

import { CreateNewJobModal } from "../Modals/CreateNewJobModal";
import { SelectInstallerModal } from "../Modals/SelectInstallerModal";
import { AssignInstallationJobModal } from "../Modals/AssignInstallationJobModal";
import { ReassignJobModal } from "../Modals/ReassignJobModal";
import { RaiseResolveDisputeModal } from "../Modals/RaiseResolveDisputeModal";

export default function JobPoolPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobPoolRow | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <PageHeader
        title="Job Pool"
        description="All open installation and maintenance jobs awaiting assignment"
        actions={[
          {
            key: "Auto-Assign",
            label: "Auto-Assign All",
            variant: "outline",
          },
          {
            key: "create",
            label: "Create Job",
            icon: <Briefcase className="size-4" />,
            variant: "default",
            onClick: () => setActiveModal("create_job"),
          },
        ]}
      />

      {/* Main Job Pool Table */}
      <JobPoolTable
        onAssign={(row) => {
          setSelectedJob(row);
          setActiveModal("assign");
        }}
        onReassign={(row) => {
          setSelectedJob(row);
          setActiveModal("reassign");
        }}
        onTrack={(row) => {
          setSelectedJob(row);
          setActiveModal("dispute");
        }}
      />

      {/* Modals */}
      <CreateNewJobModal
        open={activeModal === "create_job"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        onOpenManualSelect={() => setActiveModal("select_installer")}
      />

      <SelectInstallerModal
        open={activeModal === "select_installer"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <AssignInstallationJobModal
        open={activeModal === "assign"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <ReassignJobModal
        open={activeModal === "reassign"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        jobCode={selectedJob?.jobCode}
        currentInstaller={selectedJob?.assignedTo}
      />

      <RaiseResolveDisputeModal
        open={activeModal === "dispute"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        jobCode={selectedJob?.jobCode}
        installerName={selectedJob?.assignedTo}
      />
    </div>
  );
}
