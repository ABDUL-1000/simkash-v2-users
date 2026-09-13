import {
  Package,
  Smartphone,
  Video,
  MapPin,
  Wifi,
  Minus,
  Plus,
  Eye,
  X,
} from "lucide-react";
import type { RmScDistributionRow } from "../../types/rm-inventory.types";

interface RmDistributeFormProps {
  selectedSc: RmScDistributionRow;
  availableStock: { pos: number; cctv: number; gps: number; router: number };
  allocations: { pos: number; cctv: number; gps: number; router: number };
  onAllocationChange: (
    type: "pos" | "cctv" | "gps" | "router",
    value: number
  ) => void;
  note: string;
  onNoteChange: (note: string) => void;
  onChangeSc: () => void;
  onClear: () => void;
  onPreview: () => void;
}

export function RmDistributeForm({
  selectedSc,
  availableStock,
  allocations,
  onAllocationChange,
  note,
  onNoteChange,
  onChangeSc,
  onClear,
  onPreview,
}: RmDistributeFormProps) {
  const totalAllocated =
    allocations.pos + allocations.cctv + allocations.gps + allocations.router;
  const typesCount = [
    allocations.pos > 0,
    allocations.cctv > 0,
    allocations.gps > 0,
    allocations.router > 0,
  ].filter(Boolean).length;

  const currentStock = {
    pos: selectedSc.pos ?? 0,
    cctv: selectedSc.cctv ?? 0,
    gps: selectedSc.gps ?? 0,
    router: selectedSc.router ?? 0,
  };

  const simTypesConfig = [
    {
      id: "pos" as const,
      name: "POS Terminal",
      icon: Smartphone,
      iconColor: "text-[#2563EB]",
      iconBg: "bg-[#EFF6FF]",
      available: availableStock.pos,
      allocated: allocations.pos,
      current: currentStock.pos,
      after: currentStock.pos + allocations.pos,
    },
    {
      id: "cctv" as const,
      name: "CCTV Device",
      icon: Video,
      iconColor: "text-[#10B981]",
      iconBg: "bg-[#EBFFF8]",
      available: availableStock.cctv,
      allocated: allocations.cctv,
      current: currentStock.cctv,
      after: currentStock.cctv + allocations.cctv,
    },
    {
      id: "gps" as const,
      name: "GPS Tracker",
      icon: MapPin,
      iconColor: "text-[#2563EB]",
      iconBg: "bg-[#EFF6FF]",
      available: availableStock.gps,
      allocated: allocations.gps,
      current: currentStock.gps,
      after: currentStock.gps + allocations.gps,
    },
    {
      id: "router" as const,
      name: "Router",
      icon: Wifi,
      iconColor: "text-[#F59E0B]",
      iconBg: "bg-[#FEFCE8]",
      available: availableStock.router,
      allocated: allocations.router,
      current: currentStock.router,
      after: currentStock.router + allocations.router,
    },
  ];

  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-5 text-xs">
      {/* Header with queued count */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1F5F9] pb-4">
        <h3 className="text-base font-black text-[#0F152A]">
          Distribute SIMs to SC
        </h3>
        <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-bold text-[#2563EB]">
          {selectedSc.name} · {totalAllocated} SIMs queued
        </span>
      </div>

      {/* Available Stock Strip */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#64748B]">
          <Package className="size-4 text-[#2563EB]" />
          <span>Available Stock:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 font-semibold text-[#0F152A]">
          <span>
            POS <strong className="font-black text-blue-600">{availableStock.pos}</strong>
          </span>
          <span className="text-slate-300">•</span>
          <span>
            CCTV <strong className="font-black text-emerald-600">{availableStock.cctv}</strong>
          </span>
          <span className="text-slate-300">•</span>
          <span>
            GPS <strong className="font-black text-amber-600">{availableStock.gps}</strong>
          </span>
          <span className="text-slate-300">•</span>
          <span>
            Router <strong className="font-black text-red-600">{availableStock.router}</strong>
          </span>
        </div>
      </div>

      {/* Selected State Coordinator Card */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase tracking-wider text-[#8C909B]">
          State Coordinator
        </label>
        <div className="flex items-center justify-between rounded-2xl border-2 border-blue-100 bg-[#F8FAFF] p-3.5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-[#2563EB] font-black text-white shadow-xs">
              {selectedSc.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#0F152A]">{selectedSc.name}</h4>
              <p className="text-[11px] text-[#64748B]">
                {selectedSc.state} State • 3 sub-SCs under
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onChangeSc}
            className="rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50 transition shadow-2xs"
          >
            Change
          </button>
        </div>
      </div>

      {/* SIM Types Allocation Steppers */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-wider text-[#8C909B]">
          <span>SIM Type</span>
          <span>Quantity to Distribute</span>
        </div>

        <div className="space-y-2.5">
          {simTypesConfig.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-2xl border border-[#F1F5F9] bg-[#FAFCFF] p-3.5 transition hover:border-[#CBD5E1] sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Left: icon & details */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-10 items-center justify-center rounded-xl ${item.iconBg} ${item.iconColor}`}
                  >
                    <Icon className="size-4.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#0F152A]">{item.name}</h5>
                    <span className="text-[11px] text-[#8C909B]">
                      Available: {item.available}
                    </span>
                  </div>
                </div>

                {/* Right: Subtext & Stepper */}
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  {item.allocated > 0 && (
                    <span className="text-[11px] font-bold text-[#10B981]">
                      After distribution {selectedSc.name.split(" ")[0]}: {item.current} → {item.after}
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onAllocationChange(
                          item.id,
                          Math.max(0, item.allocated - 5)
                        )
                      }
                      disabled={item.allocated <= 0}
                      className="flex size-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0F152A] hover:bg-slate-100 disabled:opacity-30 transition"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-black text-[#0F152A]">
                      {item.allocated}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onAllocationChange(
                          item.id,
                          Math.min(item.available, item.allocated + 5)
                        )
                      }
                      disabled={item.allocated >= item.available}
                      className="flex size-8 items-center justify-center rounded-xl bg-[#2563EB] text-white hover:bg-blue-700 disabled:opacity-30 transition shadow-2xs"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Distribution Total Summary Bar */}
      <div className="flex items-center justify-between rounded-2xl border border-blue-100 bg-[#EFF6FF] p-3.5">
        <span className="font-bold text-xs text-[#1F3A5F]">
          Distribution Total
        </span>
        <span className="text-sm font-black text-[#2563EB]">
          {totalAllocated} SIMs {typesCount > 0 ? `across ${typesCount} types` : ""}
        </span>
      </div>

      {/* Optional Note */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-black uppercase tracking-wider text-[#8C909B]">
          Note (optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="e.g. Monthly stock refresh for Q3 targets"
          rows={2}
          className="w-full rounded-2xl border border-slate-200 bg-[#FAFCFF] p-3 text-xs text-[#0F152A] outline-hidden placeholder:text-slate-400 focus:border-blue-500 focus:bg-white transition"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-[#64748B] hover:bg-slate-50 transition"
        >
          <X className="size-3.5" />
          <span>Clear</span>
        </button>

        <button
          type="button"
          disabled={totalAllocated <= 0}
          onClick={onPreview}
          className="flex items-center gap-2 rounded-xl bg-[#0F152A] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-40 shadow-xs"
        >
          <Eye className="size-4" />
          <span>Preview Distribution</span>
        </button>
      </div>
    </div>
  );
}
