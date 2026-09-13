import { ArrowUpDown } from "lucide-react";

interface TransferPreviewCardProps {
  fromName: string;
  fromBefore: number;
  fromAfter: number;
  toName: string;
  toBefore: number;
  toAfter: number;
  quantity: number;
  simType: string;
}

export function TransferPreviewCard({
  fromName,
  fromBefore,
  fromAfter,
  toName,
  toBefore,
  toAfter,
  quantity,
  simType,
}: TransferPreviewCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-black uppercase tracking-wider text-[#0F152A]">
          Transfer Preview
        </h4>
        <span className="flex items-center gap-1.5 rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">
          <span className="size-1.5 rounded-full bg-[#10B981] animate-pulse" />
          Live
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {/* FROM */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B] block">
            FROM
          </span>
          <div className="flex items-center justify-between pt-0.5">
            <span className="font-bold text-[#0F152A]">{fromName}</span>
            <div className="text-[11px] text-right">
              <span className="text-[#64748B]">Before: {fromBefore} SIMs </span>
              <span className="font-bold text-[#EF4444]">After: {fromAfter} SIMs</span>
            </div>
          </div>
        </div>

        {/* TO */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B] block">
            TO
          </span>
          <div className="flex items-center justify-between pt-0.5">
            <span className="font-bold text-[#0F152A]">{toName}</span>
            <div className="text-[11px] text-right">
              <span className="text-[#64748B]">Before: {toBefore} SIMs </span>
              <span className="font-bold text-[#10B981]">After: {toAfter} SIMs</span>
            </div>
          </div>
        </div>

        {/* Summary movement */}
        <div className="flex items-center justify-center gap-2 pt-1 text-xs font-bold text-[#64748B]">
          <ArrowUpDown className="size-3.5 text-[#2563EB]" />
          <span>
            {quantity} {simType}s moving
          </span>
        </div>
      </div>
    </div>
  );
}
