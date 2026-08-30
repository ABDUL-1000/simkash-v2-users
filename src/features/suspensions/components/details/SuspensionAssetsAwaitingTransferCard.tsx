import { ArrowRight } from "lucide-react";

export function SuspensionAssetsAwaitingTransferCard({
  onTransferNow,
}: {
  onTransferNow?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
        <span className="size-2 rounded-full bg-[#D97706]" />
        <span>Assets Awaiting Transfer</span>
      </div>

      <div className="space-y-3.5 text-xs">
        {/* Item 1: Sub-Agents */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#0F172A] text-sm sm:text-base">
              47 Sub-Agents
            </span>
            <span className="rounded-md bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">
              TRANSFER PENDING
            </span>
          </div>
          <p className="text-xs text-[#64748B]">
            47 Agency Partners currently under Elidan Corp's network
          </p>
          <button
            type="button"
            onClick={onTransferNow}
            className="flex items-center gap-1 font-bold text-[#2563EB] hover:underline pt-1"
          >
            <span>Transfer Now</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* Item 2: Unactivated SIMs */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#0F172A] text-sm sm:text-base">
              832 Unactivated SIMs
            </span>
            <span className="rounded-md bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">
              TRANSFER PENDING
            </span>
          </div>
          <p className="text-xs text-[#64748B]">
            832 unactivated SIMs across POS, CCTV, GPS, Router types
          </p>
          <p className="text-[11px] text-[#94A3B8]">
            MTN 412 · Airtel 201 · Glo 134 · 9mobile 85
          </p>
          <button
            type="button"
            onClick={onTransferNow}
            className="flex items-center gap-1 font-bold text-[#2563EB] hover:underline pt-1"
          >
            <span>Transfer Now</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* Item 3: Wallet Balance */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#0F172A] text-sm sm:text-base">
              ₦2,400,000 Wallet Balance
            </span>
            <span className="rounded-md bg-[#FFF1F2] border border-[#FECACA] px-2 py-0.5 text-[10px] font-bold text-[#DC2626]">
              FROZEN
            </span>
          </div>
          <p className="text-xs text-[#64748B]">Held by Simkash until resolution</p>
          <p className="text-[11px] italic text-[#94A3B8]">NOT transferred to another agent</p>
          <p className="text-[11px] text-[#94A3B8]">
            Released on reinstatement or forfeited on permanent closure per T&C
          </p>
        </div>

        {/* Item 4: Activated SIMs Commission */}
        <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#0F172A] text-sm">
              Activated SIMs Commission
            </span>
            <span className="rounded-md bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 text-[10px] font-bold text-[#D97706]">
              PENDING TRANSFER
            </span>
          </div>
          <p className="text-xs text-[#64748B]">
            Customers unaffected. Future renewal commissions will be reassigned.
          </p>
          <button
            type="button"
            onClick={onTransferNow}
            className="flex items-center gap-1 font-bold text-[#2563EB] hover:underline pt-1"
          >
            <span>Manage</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
