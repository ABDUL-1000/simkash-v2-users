import { Check } from "lucide-react";
import type { CustomerItem } from "../types/customer.types";

interface ActiveSimCardProps {
  customer: CustomerItem;
}

export function ActiveSimCard({ customer }: ActiveSimCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <h3 className="text-sm font-bold text-[#0F152A]">Active SIM</h3>

      {/* Status Pill Banner */}
      <div className="flex items-center gap-2 rounded-2xl bg-[#EBFFF8] p-3 text-xs font-bold text-[#10B981] border border-[#A7F3D0]">
        <Check className="size-4 stroke-[3]" />
        <span>Active · Renews in {customer.daysRemaining} days</span>
      </div>

      <div className="space-y-3 text-xs divide-y divide-[#F1F5F9]">
        <div className="flex justify-between py-1 first:pt-0">
          <span className="text-[#8C909B]">SIM Number</span>
          <span className="font-mono font-bold text-[#0F152A]">{customer.simNumber}</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">SIM Type</span>
          <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
            {customer.simType} SIM
          </span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Network</span>
          <div className="flex items-center gap-1.5 font-bold text-[#0F152A]">
            <div className="size-2 rounded-full bg-[#F59E0B]" />
            <span>{customer.network}</span>
          </div>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Plan</span>
          <span className="font-medium text-[#0F152A]">30-day</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Activated</span>
          <span className="font-medium text-[#0F152A]">{customer.activatedDate} 2026</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Expires</span>
          <span className="font-medium text-[#0F152A]">{customer.expiryDate} 2026</span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Auto-Renew</span>
          <span className="font-bold text-[#64748B]">{customer.autoRenew ? "On" : "Off"}</span>
        </div>

        {/* Data usage */}
        <div className="py-2 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-[#8C909B]">Data Usage</span>
            <span className="font-bold text-[#0F152A]">{customer.dataUsed} of {customer.totalData}</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#E2ECF6] overflow-hidden">
            <div className="h-full rounded-full bg-[#2563EB] w-[75%]" />
          </div>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-[#8C909B]">Last Used</span>
          <span className="font-medium text-[#0F152A]">Today · 2:34 PM</span>
        </div>
      </div>
    </div>
  );
}
