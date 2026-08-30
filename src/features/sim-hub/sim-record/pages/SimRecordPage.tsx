import { PageHeader } from "@/components/common/PageHeader";
import { Download } from "lucide-react";
import { DashboardStats } from "../components/DashboardStat";
import { InfoBanner } from "@/components/common/InfoBanner";
import { NetworkFilter } from "../components/NetworkFilter";
import { SimRecordTable } from "../components/SimRecord-table";

export default function SimRecordPage() {
  return (
    <div>
      <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="SIM Records"
          description="Read-only raw SIM stock registry · 267,460 total records across all networks and types"
          actions={[
            {
              key: "export-dashboard",
              label: "Export Report",
              icon: <Download className="size-4" />,
              variant: "outline",
            },
          ]}
        />
        <DashboardStats />
        <InfoBanner>
          SIM Records is a read-only registry of raw SIM stock. Records cannot
          be edited here. To make changes to a SIM's status or assignment, use
          the relevant SIM type screen (POS SIMs, CCTV SIMs, GPS SIMs, Router
          SIMs) or use the Admin SIM Search for full chain management.
        </InfoBanner>
        <NetworkFilter />
        <SimRecordTable />

      </div>
    </div>
  );
}
