import { PageHeader } from "@/components/common/PageHeader";
import { Plus, Repeat, Send } from "lucide-react";
import { UploadSimModal } from "@/features/dashboard/Modals/UploadSimModal";
import { useState } from "react";
import { RedistributeSimsModal } from "../Modals/RedistributeSimsModal";
import { DistributeSimsModal } from "../Modals/DistributeSimModal";
import { GpsSimDashboardStats } from "../components/DashboardStats";
import { GpsSimInventoryPage } from "../components/GpsInventoryTable";
import { GpsSimNetworkSection } from "../components/GpsNetworkSection";

export default function GpsSimPage() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [redistributeOpen, setRedistributeOpen] = useState(false);
  const [distributeOpen, setDistributeOpen] = useState(false);

  return (
    <div>
      <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="GPS SIM Management"
          description="GPS SIM cards for remote monitoring and live streaming"
          actions={[
            {
              key: "redistribute",
              label: "Redistribute",
              icon: <Repeat className="size-4" />,
              variant: "outline",
              onClick: () => setRedistributeOpen(true),
            },
            {
              key: "Distribute",
              label: "Distribute",
              icon: <Send className="size-4" />,
              variant: "outline",
              onClick: () => setDistributeOpen(true),
            },
            {
              key: "upload-sim-stock",
              label: "Upload SIM Stock",
              icon: <Plus size={16} />,
              variant: "default",
              onClick: () => setUploadOpen(true),
            },
          ]}
        />
        <GpsSimDashboardStats />
        <GpsSimNetworkSection />
        <GpsSimInventoryPage />
      </div>
      <UploadSimModal
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onConfirm={() => {
          // send validRows to your upload endpoint
        }}
      />
      <RedistributeSimsModal
        open={redistributeOpen}
        onOpenChange={setRedistributeOpen}
        onConfirm={() => {
          // send validRows to your upload endpoint
        }}
      />
      <DistributeSimsModal
        open={distributeOpen}
        onOpenChange={setDistributeOpen}
        onConfirm={() => {
          // send validRows to your upload endpoint
        }}
      />
    </div>
  );
}
