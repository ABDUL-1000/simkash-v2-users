import { Server, User } from "lucide-react";

interface ActivationChainCardProps {
  customerName: string;
  isFailed: boolean;
  onRetry: () => void;
  onDownloadReceipt: () => void;
}

export function ActivationChainCard({
  customerName,
  isFailed,
  onRetry,
  onDownloadReceipt,
}: ActivationChainCardProps) {
  return (
    <div className="space-y-6">
      {/* Flowchart Card */}
      <div className="space-y-4 rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#8C909B]">
          Activation Chain
        </h3>

        <div className="space-y-2 text-xs">
          {/* Level 1: Simkash */}
          <div className="flex items-center gap-3 rounded-2xl bg-[#1E293B] p-3 text-white">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
              <Server className="size-4 text-white" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-white">Simkash</h4>
              <p className="text-[10px] text-slate-300">Platform</p>
            </div>
          </div>

          <div className="text-center text-xs text-[#8C909B]">↓</div>

          {/* Level 2: Femi Enterprises (Corporate Agent You) */}
          <div className="flex items-center justify-between rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-3">
            <div className="flex items-center gap-3">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#10B981] text-xs font-bold text-white">
                EO
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-[#0F152A]">
                  Femi Enterprises
                </h4>
                <p className="text-[10px] text-[#66738C]">Corporate Agent (You)</p>
              </div>
            </div>
            <span className="rounded-full border border-[#E2ECF6] bg-white px-2 py-0.5 text-[9px] font-extrabold text-[#0F152A]">
              Self-activated
            </span>
          </div>

          <div className="text-center text-xs text-[#8C909B]">↓</div>

          {/* Level 3: Customer */}
          <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-white p-3">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#EFF4F8] text-[#2563EB]">
              <User className="size-4" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#0F152A]">{customerName}</h4>
              <p className="text-[10px] text-[#8C909B]">Customer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Card */}
      <div className="space-y-3 rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#8C909B]">
          Quick Actions
        </h3>

        <div className="space-y-2 text-xs">
          <button
            type="button"
            onClick={onRetry}
            disabled={!isFailed}
            className="w-full cursor-pointer rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2.5 font-bold text-[#66738C] transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Retry Activation
          </button>

          <button
            type="button"
            onClick={onDownloadReceipt}
            className="w-full cursor-pointer rounded-xl bg-[#2563EB] py-2.5 font-bold text-white shadow-xs transition hover:bg-blue-700"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
