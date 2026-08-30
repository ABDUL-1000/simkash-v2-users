import { PageHeader } from "@/components/common/PageHeader";
import { Plus, Repeat, Send } from "lucide-react";
import { DashboardStats } from "../components/DashboardStats";
import {  RouterDeviceNetworkSection } from "../components/RouterNetworkSection";
import { RouterDeviceTable } from "../components/router-device-inventory-table";
import { UploadSimModal } from "@/features/dashboard/Modals/UploadSimModal";
import { useState } from "react";
import { RedistributeSimsModal } from "../Modals/RedistributeSimsModal";
import { DistributeSimsModal } from "../Modals/DistributeSimModal";

export default function RouterDevicePage() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [redistributeOpen, setRedistributeOpen] = useState(false);
  const [distributeOpen, setDistributeOpen] = useState(false);

  return (
    <div>
      <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="Router Device Management"
          description="Router devices for remote monitoring and live streaming"
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
        <DashboardStats />
        <RouterDeviceNetworkSection />
        <RouterDeviceTable />
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
