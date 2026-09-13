import { Package, ArrowRight, RefreshCw } from "lucide-react";

interface RmNeedMoreStockCardProps {
  onRequestStockAdmin: () => void;
  onRedistributeSims: () => void;
}

export function RmNeedMoreStockCard({
  onRequestStockAdmin,
  onRedistributeSims,
}: RmNeedMoreStockCardProps) {
  return (
    <div className="space-y-4">
      {/* Need More Stock Card */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3 text-xs">
        <div>
          <h3 className="text-sm font-black text-[#0F152A]">Need More Stock?</h3>
          <p className="text-[11px] font-medium text-[#64748B]">
            Request from Super Admin
          </p>
          <p className="text-[10px] text-[#8C909B]">Avg response: 2–4 hours</p>
        </div>

        <button
          type="button"
          onClick={onRequestStockAdmin}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white py-2.5 text-xs font-bold text-[#0F152A] transition hover:bg-slate-50 hover:border-slate-400"
        >
          <Package className="size-4 text-[#2563EB]" />
          <span>Request Stock</span>
        </button>
      </div>

      {/* Quick Actions Card */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3 text-xs">
        <h3 className="text-[11px] font-black uppercase tracking-wider text-[#8C909B]">
          Quick Actions
        </h3>

        <button
          type="button"
          onClick={onRedistributeSims}
          className="group flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-left transition hover:border-blue-400 hover:bg-[#EFF6FF]"
        >
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-xl bg-white text-[#2563EB] shadow-2xs">
              <RefreshCw className="size-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0F152A] group-hover:text-[#2563EB]">
                Redistribute SIMs
              </h4>
              <p className="text-[10px] text-[#64748B]">Move stock between SCs</p>
            </div>
          </div>
          <ArrowRight className="size-3.5 text-slate-400 group-hover:text-[#2563EB] transition" />
        </button>
      </div>
    </div>
  );
}
