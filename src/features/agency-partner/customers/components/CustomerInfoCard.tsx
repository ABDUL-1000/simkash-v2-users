import { Edit } from "lucide-react";
import type { CustomerItem } from "../types/customer.types";

interface CustomerInfoCardProps {
  customer: CustomerItem;
  onEditClick: () => void;
}

export function CustomerInfoCard({ customer, onEditClick }: CustomerInfoCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0F152A]">Customer Details</h3>
        <button
          type="button"
          onClick={onEditClick}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
        >
          <Edit className="size-3.5" />
          <span>Edit</span>
        </button>
      </div>

      <div className="space-y-3 text-xs divide-y divide-[#F1F5F9]">
        <div className="flex justify-between py-1 first:pt-0">
          <span className="text-[#8C909B]">Full Name</span>
          <span className="font-bold text-[#0F152A]">{customer.name}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Phone</span>
          <span className="font-mono font-bold text-[#0F152A]">{customer.phone}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Email</span>
          <span className="font-medium text-[#0F152A]">{customer.email || "chidi@email.com"}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Address</span>
          <span className="font-medium text-[#0F152A] text-right">{customer.address || "23 Marina Street, Lagos"}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Added By</span>
          <span className="font-medium text-[#0F152A]">{customer.addedBy || "Yusuf Adam Baba (you)"}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Added On</span>
          <span className="font-medium text-[#0F152A]">{customer.customerSince || "1 Jun 2026"}</span>
        </div>
      </div>
    </div>
  );
}
