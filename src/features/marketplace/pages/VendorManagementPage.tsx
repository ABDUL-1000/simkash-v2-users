import { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { Plus } from "lucide-react";

import { VendorTable, type VendorRow } from "../components/VendorTable";
import { ApproveVendorApplicationModal } from "../Modals/ApproveVendorApplicationModal";
import { RejectVendorApplicationModal } from "../Modals/RejectVendorApplicationModal";

export default function VendorManagementPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<VendorRow | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <PageHeader
        title="Vendor Management"
        description="Approve vendors, manage listings and track performance"
        actions={[
          {
            key: "add-vendor",
            label: "Add Vendor",
            icon: <Plus className="size-4" />,
            variant: "default",
            onClick: () => setActiveModal("approve"),
          },
        ]}
      />

      {/* Main Vendor Inventory Table */}
      <VendorTable
        onSelectRow={(r) => setSelectedVendor(r)}
        onApprove={(r) => {
          setSelectedVendor(r);
          setActiveModal("approve");
        }}
        onReject={(r) => {
          setSelectedVendor(r);
          setActiveModal("reject");
        }}
      />

      {/* Modals */}
      <ApproveVendorApplicationModal
        open={activeModal === "approve"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        vendorName={selectedVendor?.name || "Femi Enterprises Ltd"}
        location={selectedVendor?.location || "Lagos"}
        onRejectClick={() => setActiveModal("reject")}
      />

      <RejectVendorApplicationModal
        open={activeModal === "reject"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        vendorName={selectedVendor?.name || "Femi Enterprises Ltd"}
        location={selectedVendor?.location || "Lagos"}
      />
    </div>
  );
}
