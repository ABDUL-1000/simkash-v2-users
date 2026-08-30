"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

type PackageConfig = {
  id: string;
  name: string;
  dataSize: string;
  price: string;
  validity: string;
};

const INITIAL_PACKAGES: PackageConfig[] = [
  { id: "1", name: "5GB Basic", dataSize: "5GB", price: "₦2,000", validity: "30 days" },
  { id: "2", name: "10GB Standard", dataSize: "10GB", price: "₦3,500", validity: "30 days" },
  { id: "3", name: "20GB Premium", dataSize: "20GB", price: "₦6,000", validity: "30 days" },
  { id: "4", name: "50GB Power", dataSize: "50GB", price: "₦13,000", validity: "30 days" },
  { id: "5", name: "100GB Ultra", dataSize: "100GB", price: "₦24,000", validity: "30 days" },
];

type ManagePackagesModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ManagePackagesModal({ open, onOpenChange }: ManagePackagesModalProps) {
  const [packages] = useState<PackageConfig[]>(INITIAL_PACKAGES);

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Manage Data Packages"
      description="Configure active ZeroLimit data packages available on Simkash"
      size="md"
      actions={[
        { key: "close", label: "Done", variant: "primary", closeOnClick: true },
      ]}
    >
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="space-y-2">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex items-center justify-between rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5"
            >
              <div>
                <p className="font-bold text-[#0F172A]">{pkg.name}</p>
                <p className="text-xs text-[#64748B]">
                  {pkg.dataSize} · {pkg.validity}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#0F172A]">{pkg.price}</span>
                <button
                  type="button"
                  className="text-xs font-bold text-[#2563EB] hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppModal>
  );
}
