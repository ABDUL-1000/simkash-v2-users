import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { CustomerItem } from "../types/customer.types";
import { APP_COLORS } from "@/constants/colors";

interface CustomerSimDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: CustomerItem | null;
  onRenewClick?: () => void;
}

export function CustomerSimDetailsModal({
  open,
  onOpenChange,
  customer,
  onRenewClick,
}: CustomerSimDetailsModalProps) {
  if (!customer) return null;

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="SIM Details"
      description={`${customer.simNumber} · ${customer.simType} SIM · ${customer.network}`}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Active Status Banner */}
        <div className="flex items-center gap-2 rounded-2xl bg-[#EBFFF8] p-3 text-xs font-bold text-[#10B981] border border-[#A7F3D0]">
          <Check className="size-4 stroke-[3]" />
          <span>Active · Expires: {customer.expiryDate} 2026</span>
        </div>

        {/* Detail Rows */}
        <div className="divide-y divide-[#F1F5F9] text-xs">
          <div className="flex items-center justify-between py-2 first:pt-0">
            <span className="text-[#8C909B]">SIM Number</span>
            <span className="font-mono font-bold text-[#0F152A]">{customer.simNumber}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">SIM Type</span>
            <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
              {customer.simType} SIM
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">Network</span>
            <div className="flex items-center gap-1.5 font-bold text-[#0F152A]">
              <div className="size-2 rounded-full bg-[#F59E0B]" />
              <span>{customer.network}</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">Customer</span>
            <span className="font-bold text-[#0F152A]">{customer.name}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">Plan</span>
            <span className="font-bold text-[#0F152A]">30 Days</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">Activated</span>
            <span className="font-bold text-[#0F152A]">{customer.activatedDate} 2026</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">Expires</span>
            <span className="font-bold text-[#0F152A]">{customer.expiryDate} 2026</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">Days Remaining</span>
            <span className="font-black text-[#10B981]">{customer.daysRemaining} days</span>
          </div>

          {/* Data Used Progress */}
          <div className="py-2.5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[#8C909B]">Data Used</span>
              <span className="font-bold text-[#0F152A]">{customer.dataUsed} of {customer.totalData}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[#E2ECF6] overflow-hidden">
              <div className="h-full rounded-full bg-[#2563EB] w-[75%]" />
            </div>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">Status</span>
            <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">
              {customer.status}
            </span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">Activated By</span>
            <span className="font-bold text-[#0F152A]">{customer.addedBy || "Yusuf Adam Baba (you)"}</span>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-[#8C909B]">Ref</span>
            <span className="font-mono font-bold text-[#0F152A]">ACT-2026-008470</span>
          </div>
        </div>

        {/* Renewal History Mini Table */}
        <div className="space-y-2 pt-1">
          <h5 className="font-bold text-xs text-[#0F152A]">Renewal History</h5>
          <div className="rounded-xl border border-[#E2ECF6] overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-[#F8FAFC] text-[10px] font-bold text-[#8C909B] border-b border-[#E2ECF6]">
                <tr>
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Plan</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                <tr>
                  <td className="py-2 px-3 text-[#8C909B]">1</td>
                  <td className="py-2 px-3 font-medium text-[#0F152A]">1 Jun 2026</td>
                  <td className="py-2 px-3 font-medium text-[#0F152A]">30D</td>
                  <td className="py-2 px-3 font-bold text-[#0F152A]">₦5,000</td>
                  <td className="py-2 px-3 text-right">
                    <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#2563EB]">
                      Current
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              onRenewClick?.();
            }}
            className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#059669]"
            style={{ backgroundColor: APP_COLORS.greens.green }}
          >
            Renew This SIM
          </button>
        </div>
      </div>
    </AppModal>
  );
}
