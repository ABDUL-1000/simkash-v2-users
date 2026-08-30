import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export function DeviceSimsSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#0F152A]">My Device SIMs</h3>
        <Link
          to="/device-sim"
          className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
        >
          View all <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Card 1: MTN POS SIM */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#FFCC00] px-3 py-0.5 text-xs font-extrabold text-[#0F152A]">
              MTN
            </span>
            <span className="rounded-md border border-[#E2ECF6] bg-[#F8FAFC] px-2 py-0.5 text-[11px] font-semibold text-[#66738C]">
              POS SIM
            </span>
          </div>

          <div className="mt-3">
            <h4 className="text-lg font-bold tracking-tight text-[#0F152A]">
              0702 2222 222
            </h4>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-[#10B981]">
                <span className="size-2 rounded-full bg-[#10B981]" /> Active
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="flex items-center gap-1 text-xs text-[#F59E0B]">
              <Clock className="size-3.5" />
              <span>Renews in 13 days</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
              <div className="h-full w-[65%] rounded-full bg-[#10B981]" />
            </div>
          </div>

          <div className="mt-4 border-t border-[#E2ECF6] pt-3">
            <button
              type="button"
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              Renew Now
            </button>
          </div>
        </div>

        {/* Card 2: Airtel CCTV SIM */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-[#E53333] px-3 py-0.5 text-xs font-extrabold text-white">
              Airtel
            </span>
            <span className="rounded-md border border-[#E2ECF6] bg-[#F8FAFC] px-2 py-0.5 text-[11px] font-semibold text-[#66738C]">
              CCTV SIM
            </span>
          </div>

          <div className="mt-3">
            <h4 className="text-lg font-bold tracking-tight text-[#0F152A]">
              0912 2222 222
            </h4>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-[#10B981]">
                <span className="size-2 rounded-full bg-[#10B981]" /> Active
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-1.5">
            <div className="flex items-center gap-1 text-xs text-[#F59E0B]">
              <Clock className="size-3.5" />
              <span>Renews in 5 days</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
              <div className="h-full w-[85%] rounded-full bg-[#EF4444]" />
            </div>
          </div>

          <div className="mt-4 border-t border-[#E2ECF6] pt-3">
            <button
              type="button"
              className="text-xs font-bold text-[#EF4444] hover:underline"
            >
              Renew Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
