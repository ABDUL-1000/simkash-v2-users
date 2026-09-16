import { Calendar, RefreshCw, Bell, Edit, ExternalLink } from "lucide-react";
import { APP_COLORS } from "@/constants/colors";

interface CustomerActionsSidebarProps {
  onRenewSim: () => void;
  onSendReminder: () => void;
  onEditCustomer: () => void;
  onViewSimDetails: () => void;
  expiryDate?: string;
  daysRemaining?: number;
  customerSince?: string;
}

export function CustomerActionsSidebar({
  onRenewSim,
  onSendReminder,
  onEditCustomer,
  onViewSimDetails,
  expiryDate = "26 Jul 2026",
  daysRemaining = 32,
  customerSince = "1 Jun 2026",
}: CustomerActionsSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Actions Box */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#0F152A]">Actions</h3>

        <div className="space-y-2 text-xs font-bold">
          <button
            type="button"
            onClick={onRenewSim}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#10B981] py-2.5 text-white shadow-xs transition hover:bg-[#059669]"
            style={{ backgroundColor: APP_COLORS.greens.green }}
          >
            <RefreshCw className="size-3.5" />
            <span>Renew SIM</span>
          </button>

          <button
            type="button"
            onClick={onSendReminder}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#F59E0B] bg-white py-2.5 text-[#D97706] hover:bg-[#FFFBEB] transition"
          >
            <Bell className="size-3.5 text-[#F59E0B]" />
            <span>Send Reminder</span>
          </button>

          <button
            type="button"
            onClick={onEditCustomer}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white py-2.5 text-[#475569] hover:bg-[#F8FAFC] transition"
          >
            <Edit className="size-3.5" />
            <span>Edit Customer</span>
          </button>

          <button
            type="button"
            onClick={onViewSimDetails}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#CBD5E1] bg-white py-2.5 text-[#475569] hover:bg-[#F8FAFC] transition"
          >
            <ExternalLink className="size-3.5" />
            <span>View SIM Details</span>
          </button>
        </div>
      </div>

      {/* Renews in X days Box */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-[#0F152A]">Renews in {daysRemaining} days</h3>
        <p className="text-xs font-medium text-[#66738C]">{expiryDate}</p>

        <div className="h-2 w-full rounded-full bg-[#E2ECF6] overflow-hidden">
          <div className="h-full rounded-full bg-[#10B981] w-[65%]" />
        </div>

        <button
          type="button"
          onClick={onRenewSim}
          className="w-full rounded-xl border border-[#2563EB] bg-white py-2 text-xs font-bold text-[#2563EB] hover:bg-[#EFF6FF] transition"
        >
          Renew
        </button>
      </div>

      {/* Your Earnings Box */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3 text-xs">
        <h3 className="text-sm font-bold text-[#0F152A]">Your Earnings</h3>

        <div className="space-y-2 divide-y divide-[#F1F5F9]">
          <div className="flex justify-between py-1 first:pt-0">
            <span className="text-[#8C909B]">Activations</span>
            <span className="font-bold text-[#0F152A]">1 SIM</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-[#8C909B]">Commission</span>
            <span className="font-black text-[#10B981]">₦1,000</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-[#8C909B]">Renewals</span>
            <span className="font-bold text-[#0F152A]">0</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-[#8C909B]">Renewal comm</span>
            <span className="font-bold text-[#0F152A]">₦0</span>
          </div>

          <div className="flex justify-between py-2 pt-2 border-t border-[#E2ECF6]">
            <span className="font-bold text-[#0F152A]">Total earned</span>
            <span className="font-black text-[#10B981] text-sm">₦1,000</span>
          </div>
        </div>

        <p className="text-[11px] text-[#8C909B]">Every renewal earns you ₦1,000</p>
      </div>

      {/* Customer Since Box */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2">
        <h3 className="text-sm font-bold text-[#0F152A]">Customer Since</h3>
        <div className="flex items-center gap-2 text-xs text-[#0F152A]">
          <Calendar className="size-4 text-[#2563EB]" />
          <div>
            <p className="font-bold">Customer since {customerSince}</p>
            <p className="text-[11px] text-[#8C909B]">24 days ago</p>
          </div>
        </div>
      </div>
    </div>
  );
}
