import { useState } from "react";
import { Package, Search, CheckCircle2, AlertTriangle, Minus, Plus } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { INITIAL_STATE_COORDINATORS } from "../data/regional-manager.data";
import type { StateCoordinatorItem } from "../types/regional-manager.types";

interface DistributeStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedSc?: StateCoordinatorItem | null;
  onSuccess?: (details: { scName: string; total: number }) => void;
}

export function DistributeStockModal({
  open,
  onOpenChange,
  preselectedSc,
  onSuccess,
}: DistributeStockModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSc, setSelectedSc] = useState<StateCoordinatorItem>(
    preselectedSc || INITIAL_STATE_COORDINATORS[0]
  );

  // Quantities
  const [posQty, setPosQty] = useState(30);
  const [cctvQty, setCctvQty] = useState(20);
  const [gpsQty, setGpsQty] = useState(0);
  const [routerQty, setRouterQty] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalToSend = posQty + cctvQty + gpsQty + routerQty;
  const stockRemaining = 300 - totalToSend;

  const filteredScs = INITIAL_STATE_COORDINATORS.filter(
    (sc) =>
      sc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sc.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sc.phone.includes(searchQuery)
  );

  const handleConfirmDistribute = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      onSuccess?.({
        scName: selectedSc.name,
        total: totalToSend,
      });
    }, 700);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setStep(1);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title={isSuccess ? "Stock Distributed!" : "Distribute SIM Stock"}
      description={
        isSuccess
          ? "SIMs dispatched to State Coordinator"
          : step === 1
          ? "Select a State Coordinator"
          : `Allocate stock for ${selectedSc.name}`
      }
      size="md"
      showCloseButton={true}
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#EBFFF8] text-[#10B981]">
            <CheckCircle2 className="size-8" />
          </div>
          <div>
            <h3 className="text-base font-black text-[#0F152A]">Stock Distributed Successfully!</h3>
            <p className="mt-1 text-xs text-[#66738C]">
              {totalToSend} SIMs have been transferred to <span className="font-bold text-[#0F152A]">{selectedSc.name}</span> ({selectedSc.state}).
            </p>
          </div>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs text-left space-y-1">
            <div className="flex justify-between">
              <span className="text-[#8C909B]">SC New Stock</span>
              <span className="font-bold text-[#10B981]">{selectedSc.stock + totalToSend} SIMs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C909B]">Your Available Balance</span>
              <span className="font-bold text-[#0F152A]">{stockRemaining} SIMs</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#1D4ED8]"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            Done
          </button>
        </div>
      ) : step === 1 ? (
        /* STEP 1: SELECT SC */
        <div className="space-y-4 pt-1 text-xs">
          {/* Stock banner */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
            <div className="flex items-center gap-2 font-bold text-xs text-[#0F152A]">
              <Package className="size-4 text-[#2563EB]" />
              <span>Your stock: 300 SIMs available</span>
            </div>
            <p className="text-[11px] text-[#64748B]">POS 180 · CCTV 72 · GPS 36 · Router 12</p>
          </div>

          {/* Search SC */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              Select State Coordinator
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search SC by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2 pl-9 pr-3 text-xs text-[#0F152A] placeholder:text-[#94A3B8] focus:border-[#2563EB] focus:outline-hidden"
              />
            </div>
          </div>

          {/* SC List */}
          <div className="max-h-52 space-y-1 overflow-y-auto rounded-2xl border border-[#E2ECF6] bg-white p-1 divide-y divide-[#F1F5F9]">
            {filteredScs.map((sc) => {
              const isSelected = selectedSc.id === sc.id;
              const isLow = sc.stock <= 8 && sc.stock > 0;
              const isCritical = sc.stock <= 3;
              return (
                <div
                  key={sc.id}
                  onClick={() => setSelectedSc(sc)}
                  className={`flex cursor-pointer items-center justify-between p-2.5 rounded-xl transition ${
                    isSelected ? "bg-[#EFF6FF]" : "hover:bg-[#F8FAFC]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#1E3A8A] text-[11px] font-bold text-white">
                      {sc.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#0F152A]">{sc.name}</h4>
                      <p className="text-[10px] text-[#64748B]">{sc.state}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                        isCritical
                          ? "bg-[#FFF1F2] text-[#EF4444]"
                          : isLow
                          ? "bg-[#FFFBEB] text-[#D97706]"
                          : "bg-[#F1F5F9] text-[#0F152A]"
                      }`}
                    >
                      {isCritical && <AlertTriangle className="mr-1 inline size-3" />}
                      {sc.stock}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Destination Card */}
          {selectedSc && (
            <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
                  Distributing To:
                </span>
                <p className="text-xs font-bold text-[#0F152A]">
                  {selectedSc.name} · {selectedSc.state}
                </p>
                <p className="text-[11px] text-[#64748B]">Current stock: {selectedSc.stock} SIMs</p>
              </div>

              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                Change
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] hover:bg-[#F1F5F9]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              Continue →
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: ALLOCATE QUANTITIES */
        <div className="space-y-4 pt-1 text-xs">
          {/* Target SC Summary */}
          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-3 flex items-center justify-between text-[#1E40AF]">
            <div>
              <p className="font-bold text-xs">{selectedSc.name} ({selectedSc.state})</p>
              <p className="text-[10px]">Current stock: {selectedSc.stock} SIMs</p>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[11px] font-bold text-[#2563EB] hover:underline"
            >
              Change SC
            </button>
          </div>

          {/* Allocation controls */}
          <div className="space-y-2 rounded-2xl border border-[#E2ECF6] bg-white p-3.5 divide-y divide-[#F1F5F9]">
            {/* POS */}
            <div className="flex items-center justify-between py-1 first:pt-0">
              <div>
                <h4 className="font-bold text-xs text-[#0F152A]">POS SIM</h4>
                <span className="text-[10px] text-[#64748B]">180 available</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPosQty((q) => Math.max(0, q - 10))}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-8 text-center font-bold text-xs text-[#0F152A]">{posQty}</span>
                <button
                  type="button"
                  onClick={() => setPosQty((q) => Math.min(180, q + 10))}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>

            {/* CCTV */}
            <div className="flex items-center justify-between py-1">
              <div>
                <h4 className="font-bold text-xs text-[#0F152A]">CCTV SIM</h4>
                <span className="text-[10px] text-[#64748B]">72 available</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCctvQty((q) => Math.max(0, q - 5))}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-8 text-center font-bold text-xs text-[#0F152A]">{cctvQty}</span>
                <button
                  type="button"
                  onClick={() => setCctvQty((q) => Math.min(72, q + 5))}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>

            {/* GPS */}
            <div className="flex items-center justify-between py-1">
              <div>
                <h4 className="font-bold text-xs text-[#0F152A]">GPS SIM</h4>
                <span className="text-[10px] text-[#64748B]">36 available</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGpsQty((q) => Math.max(0, q - 5))}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-8 text-center font-bold text-xs text-[#0F152A]">{gpsQty}</span>
                <button
                  type="button"
                  onClick={() => setGpsQty((q) => Math.min(36, q + 5))}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>

            {/* Router */}
            <div className="flex items-center justify-between py-1">
              <div>
                <h4 className="font-bold text-xs text-[#0F152A]">Router SIM</h4>
                <span className="text-[10px] text-[#64748B]">12 available</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRouterQty((q) => Math.max(0, q - 2))}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-8 text-center font-bold text-xs text-[#0F152A]">{routerQty}</span>
                <button
                  type="button"
                  onClick={() => setRouterQty((q) => Math.min(12, q + 2))}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                >
                  <Plus className="size-3" />
                </button>
              </div>
            </div>

            {/* Total Row */}
            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-[#0F152A]">Total: {totalToSend} SIMs</span>
              <span className="text-[11px] text-[#64748B]">Your remaining stock: {stockRemaining}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] hover:bg-[#F1F5F9]"
            >
              ← Back
            </button>
            <button
              type="button"
              disabled={isSubmitting || totalToSend === 0}
              onClick={handleConfirmDistribute}
              className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#059669] disabled:opacity-50"
              style={{ backgroundColor: APP_COLORS.greens.green }}
            >
              {isSubmitting ? "Distributing..." : `Distribute ${totalToSend} SIMs`}
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}

export default DistributeStockModal;
