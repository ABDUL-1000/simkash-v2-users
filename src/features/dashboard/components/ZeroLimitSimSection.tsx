import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function ZeroLimitSimSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#0F152A]">ZeroLimit SIM</h3>
        <Link
          to="/zero-limit-sim"
          className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
        >
          Manage <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-[#0F152A] p-6 text-white shadow-lg">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          {/* Left Details */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold text-white">Simkash Standard</h4>
              <span className="rounded-full bg-[#10B981] px-2.5 py-0.5 text-xs font-bold text-white">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-300">Month 5 of 12</p>
            <p className="text-xs font-medium text-slate-200">14GB used of 18GB</p>
            <div className="h-2 w-full min-w-[16rem] overflow-hidden rounded-full bg-slate-700 sm:w-80">
              <div className="h-full w-[77%] rounded-full bg-white" />
            </div>
          </div>

          {/* Right Action */}
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <span className="rounded-full bg-[#F59E0B] px-3 py-1 text-xs font-bold text-slate-950">
              Renews in 13 days
            </span>
            <button
              type="button"
              className="rounded-xl border border-white/40 px-5 py-2 text-xs font-bold text-white transition hover:bg-white hover:text-[#0F152A]"
            >
              Renew Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
