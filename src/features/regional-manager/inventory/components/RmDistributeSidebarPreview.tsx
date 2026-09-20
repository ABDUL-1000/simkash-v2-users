import {
  CheckCircle2,
  UserCheck,
  AlertTriangle,
  Clock,
} from "lucide-react";
import type { RmScDistributionRow } from "../../types/rm-inventory.types";

interface RmDistributeSidebarPreviewProps {
  selectedSc: RmScDistributionRow;
  allocations: { pos: number; cctv: number; gps: number; router: number };
}

export function RmDistributeSidebarPreview({
  selectedSc,
  allocations,
}: RmDistributeSidebarPreviewProps) {
  const totalAllocated =
    allocations.pos + allocations.cctv + allocations.gps + allocations.router;

  const currentPos = selectedSc.pos ?? 0;
  const currentCctv = selectedSc.cctv ?? 0;
  const currentGps = selectedSc.gps ?? 0;
  const currentRouter = selectedSc.router ?? 0;
  const totalCurrent = currentPos + currentCctv + currentGps + currentRouter;

  return (
    <div className="space-y-4 text-xs">
      {/* 1. Distribution Preview Card */}
      <div className="rounded-3xl border border-emerald-200 bg-white p-5 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-2 font-black text-sm text-[#0F152A]">
            <CheckCircle2 className="size-4 text-[#10B981]" />
            <span>Distribution Preview</span>
          </div>
          <span className="text-[11px] font-bold text-[#64748B]">
            {selectedSc.name}
          </span>
        </div>

        <div className="space-y-2.5 divide-y divide-slate-100">
          {allocations.pos > 0 && (
            <div className="flex items-center justify-between pt-1">
              <div>
                <h5 className="font-bold text-[#0F152A]">POS Terminal</h5>
                <p className="text-[10px] text-[#10B981]">
                  Current stock: {currentPos} → {currentPos + allocations.pos} total
                </p>
              </div>
              <span className="font-bold text-[#0F152A]">
                {allocations.pos} units
              </span>
            </div>
          )}

          {allocations.cctv > 0 && (
            <div className="flex items-center justify-between pt-2">
              <div>
                <h5 className="font-bold text-[#0F152A]">CCTV Device</h5>
                <p className="text-[10px] text-[#10B981]">
                  Current stock: {currentCctv} → {currentCctv + allocations.cctv} total
                </p>
              </div>
              <span className="font-bold text-[#0F152A]">
                {allocations.cctv} units
              </span>
            </div>
          )}

          {allocations.gps > 0 && (
            <div className="flex items-center justify-between pt-2">
              <div>
                <h5 className="font-bold text-[#0F152A]">GPS Tracker</h5>
                <p className="text-[10px] text-[#10B981]">
                  Current stock: {currentGps} → {currentGps + allocations.gps} total
                </p>
              </div>
              <span className="font-bold text-[#0F152A]">
                {allocations.gps} units
              </span>
            </div>
          )}

          {allocations.router > 0 && (
            <div className="flex items-center justify-between pt-2">
              <div>
                <h5 className="font-bold text-[#0F152A]">Router</h5>
                <p className="text-[10px] text-[#10B981]">
                  Current stock: {currentRouter} → {currentRouter + allocations.router} total
                </p>
              </div>
              <span className="font-bold text-[#0F152A]">
                {allocations.router} units
              </span>
            </div>
          )}

          {totalAllocated === 0 && (
            <p className="text-center py-2 text-[11px] text-[#94A3B8] italic">
              No SIMs queued yet. Increase quantities on the left.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
          <span className="font-bold text-[#0F152A]">Total Distribution</span>
          <span className="rounded-full bg-[#EBFFF8] px-3 py-1 text-xs font-black text-[#10B981]">
            {totalAllocated} SIMs
          </span>
        </div>
      </div>

      {/* 2. SC Quick Info Card */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-black text-sm text-[#0F152A]">
            <UserCheck className="size-4 text-[#2563EB]" />
            <span>SC Quick Info</span>
          </div>
          <span className="rounded-full bg-[#EBFFF8] px-2.5 py-0.5 text-[10px] font-bold text-[#10B981]">
            Active
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="flex justify-between py-1.5">
            <span className="text-[#8C909B]">Active Customers</span>
            <span className="font-bold text-[#0F152A]">45</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-[#8C909B]">Current SIM Stock</span>
            <span className="font-bold text-[#0F152A]">{totalCurrent} SIMs</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-[#8C909B]">Last Distribution</span>
            <span className="font-bold text-[#D97706]">14 days ago</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-[#8C909B]">Performance</span>
            <span className="font-bold text-[#10B981]">92% fulfillment</span>
          </div>
        </div>
      </div>

      {/* 3. Stock Safety Check Card */}
      <div className="rounded-2xl border border-amber-200 bg-[#FFFDF5] p-3.5 space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#D97706]">
          <AlertTriangle className="size-4 text-[#F59E0B]" />
          <span>Stock Safety Check</span>
        </div>
        <p className="text-[11px] text-[#78350F] leading-snug">
          GPS Tracker has 36 units available. Recommended minimum reserve is 20 units.
        </p>
      </div>

      {/* 4. Last Distribution History Card */}
      <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2 font-black text-sm text-[#0F152A]">
          <Clock className="size-4 text-[#64748B]" />
          <span>Last Distribution</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="flex justify-between py-1.5">
            <span className="text-[#8C909B]">Date</span>
            <span className="font-bold text-[#0F152A]">Jul 16, 2026</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-[#8C909B]">Coordinator</span>
            <span className="font-bold text-[#0F152A]">{selectedSc.name}</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-[#8C909B]">POS Terminals</span>
            <span className="font-bold text-[#0F152A]">80 units</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-[#8C909B]">CCTV Devices</span>
            <span className="font-bold text-[#0F152A]">30 units</span>
          </div>
          <div className="flex justify-between py-1.5 font-black text-[#10B981]">
            <span>Total SIMs</span>
            <span>110 units</span>
          </div>
        </div>
      </div>
    </div>
  );
}
