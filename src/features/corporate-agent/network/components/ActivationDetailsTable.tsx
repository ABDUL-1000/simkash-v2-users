import type { CaActivationRecord } from "../types/ca-network.types";

interface ActivationDetailsTableProps {
  record: CaActivationRecord;
}

export function ActivationDetailsTable({ record }: ActivationDetailsTableProps) {
  const target = record.bonusTarget || 3000;
  const after = record.bonusAfter || 2218;
  const percent = Math.min(100, Math.round((after / target) * 100));

  return (
    <div className="space-y-5 rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs">
      <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#8C909B]">
        ACTIVATION DETAILS
      </h3>

      <div className="divide-y divide-[#E2ECF6] text-xs">
        <div className="flex items-center justify-between py-2.5 first:pt-0">
          <span className="font-medium text-[#8C909B]">Ref</span>
          <span className="font-mono font-extrabold text-[#0F152A]">
            {record.reference}
          </span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Source</span>
          <span className="font-extrabold text-[#2563EB]">Your Own Activation</span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Status</span>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#EBFFF8] px-1.5 py-0.5 text-[10px] font-extrabold text-[#10B981]">
              {record.status}
            </span>
            <span className="font-extrabold text-[#10B981]">{record.status}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Date</span>
          <span className="font-bold text-[#0F152A]">{record.date}</span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Time</span>
          <span className="font-bold text-[#0F152A]">{record.time}</span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">SIM Number</span>
          <span className="font-mono font-black text-[#0F152A]">
            {record.simNumber}
          </span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">SIM Type</span>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#EFF4F8] px-1.5 py-0.5 text-[10px] font-extrabold text-[#2563EB]">
              {record.simType}
            </span>
            <span className="font-bold text-[#0F152A]">{record.simType}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Network</span>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#FFFBEB] px-1.5 py-0.5 text-[10px] font-black text-[#854D0E]">
              {record.network}
            </span>
            <span className="font-bold text-[#0F152A]">{record.network}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Plan</span>
          <span className="font-bold text-[#0F152A]">
            {record.plan || "30-day · ₦5,000"}
          </span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Expires</span>
          <span className="font-bold text-[#0F152A]">
            {record.expires || "24 Jul 2026"}
          </span>
        </div>

        {/* CUSTOMER SECTION */}
        <div className="pb-2 pt-4">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            CUSTOMER
          </span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Customer</span>
          <span className="font-extrabold text-[#0F152A]">{record.customerName}</span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Phone</span>
          <span className="font-mono font-bold text-[#0F152A]">
            {record.customerPhone}
          </span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Address</span>
          <span className="font-bold text-[#0F152A]">
            {record.customerAddress || "23 Allen Avenue, Ikeja"}
          </span>
        </div>

        {/* COMMISSION SECTION */}
        <div className="pb-2 pt-4">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            COMMISSION
          </span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Rate</span>
          <span className="font-bold text-[#0F152A]">
            {record.rateText || "₦600/act (CA own rate)"}
          </span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Earned</span>
          <span className="text-sm font-black text-[#10B981]">{record.commission}</span>
        </div>

        <div className="flex items-center justify-between py-2.5">
          <span className="font-medium text-[#8C909B]">Credited</span>
          <span className="font-bold text-[#0F152A]">
            {record.creditedText || "Instantly to wallet"}
          </span>
        </div>

        {/* BONUS CONTRIBUTION SECTION */}
        <div className="pb-2 pt-4">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            BONUS CONTRIBUTION
          </span>
        </div>

        <div className="space-y-2 py-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F152A]">
            <span>🎯</span>
            <span>This activation counted toward your 3,000 combined target</span>
          </div>
          <div className="flex justify-between text-[11px] font-medium text-[#66738C]">
            <span>Before: {record.bonusBefore?.toLocaleString() || "2,217"}</span>
            <span>After: {record.bonusAfter?.toLocaleString() || "2,218"}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[#EFF4F8]">
            <div
              className="h-full rounded-full bg-[#2563EB] transition-all"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
