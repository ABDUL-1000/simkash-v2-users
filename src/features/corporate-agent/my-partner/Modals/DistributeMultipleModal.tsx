"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { useCaDistributeMultiple } from "../api/useCaPartners";
import { openNotification } from "@/utils/notifications";
import type { PartnerItem } from "../types/api";

interface DistributeMultipleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partners?: PartnerItem[];
  onSuccess?: () => void;
}

export function DistributeMultipleModal({
  open,
  onOpenChange,
  partners = [],
  onSuccess,
}: DistributeMultipleModalProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [posQty, setPosQty] = useState<number>(10);
  const [cctvQty, setCctvQty] = useState<number>(0);
  const [gpsQty, setGpsQty] = useState<number>(0);
  const [routerQty, setRouterQty] = useState<number>(0);
  const [notes, setNotes] = useState<string>("Weekly restock allocation");

  const distributeMutation = useCaDistributeMultiple();

  const handleTogglePartner = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedIds.length === partners.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(partners.map((p) => p.partner_id || p.id));
    }
  };

  const totalPerPartner = posQty + cctvQty + gpsQty + routerQty;
  const targetIds = selectedIds.length > 0 ? selectedIds : partners.map((p) => p.partner_id || p.id);
  const totalAllPartners = totalPerPartner * targetIds.length;

  const handleSubmit = () => {
    if (targetIds.length === 0) {
      openNotification({
        state: "error",
        title: "Validation error",
        description: "Please select at least one partner to distribute stock to.",
      });
      return;
    }
    if (totalPerPartner <= 0) {
      openNotification({
        state: "error",
        title: "Validation error",
        description: "Please specify at least 1 SIM quantity to distribute.",
      });
      return;
    }

    const distributions = targetIds.map((partner_id) => ({
      partner_id,
      pos_quantity: posQty,
      cctv_quantity: cctvQty,
      gps_quantity: gpsQty,
      router_quantity: routerQty,
    }));

    distributeMutation.mutate(
      { distributions, notes: notes.trim() },
      {
        onSuccess: () => {
          onSuccess?.();
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Batch Distribute SIMs"
      description={`Distribute stock to multiple Agency Partners (${targetIds.length} partners)`}
      size="md"
      actions={[
        {
          key: "cancel",
          label: "Cancel",
          variant: "secondary",
          closeOnClick: true,
          disabled: distributeMutation.isPending,
        },
        {
          key: "submit",
          label: distributeMutation.isPending
            ? "Distributing..."
            : `Distribute ${totalAllPartners.toLocaleString()} SIMs`,
          variant: "primary",
          onClick: handleSubmit,
          disabled: distributeMutation.isPending,
        },
      ]}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Partner Selection */}
        {partners.length > 0 && (
          <div>
            <div className="flex items-center justify-between pb-1.5">
              <label className="font-bold text-[#0F172A]">Select Partners</label>
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-[11px] font-bold text-[#2563EB] hover:underline"
              >
                {selectedIds.length === partners.length ? "Deselect All" : "Select All"}
              </button>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1 rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2">
              {partners.map((p) => {
                const id = p.partner_id || p.id;
                const isChecked = selectedIds.length === 0 || selectedIds.includes(id);
                return (
                  <label
                    key={id}
                    className="flex items-center justify-between rounded-lg p-1.5 text-xs hover:bg-white cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleTogglePartner(id)}
                        className="accent-[#2563EB]"
                      />
                      <span className="font-bold text-[#0F172A]">{p.name}</span>
                      <span className="text-[10px] text-[#64748B]">({p.location})</span>
                    </div>
                    <span className="text-[10px] font-medium text-[#8C909B]">
                      {p.sim_stock_label || `${p.sim_stock} SIMs`}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantities per partner */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">
            Quantity Allocation Per Partner
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl border border-[#E2ECF6] bg-white p-2">
              <span className="text-[10px] font-bold text-[#64748B]">POS SIM</span>
              <input
                type="number"
                min={0}
                value={posQty}
                onChange={(e) => setPosQty(Math.max(0, parseInt(e.target.value) || 0))}
                className="mt-1 w-full font-bold text-[#0F172A] outline-none"
              />
            </div>
            <div className="rounded-xl border border-[#E2ECF6] bg-white p-2">
              <span className="text-[10px] font-bold text-[#64748B]">CCTV SIM</span>
              <input
                type="number"
                min={0}
                value={cctvQty}
                onChange={(e) => setCctvQty(Math.max(0, parseInt(e.target.value) || 0))}
                className="mt-1 w-full font-bold text-[#0F172A] outline-none"
              />
            </div>
            <div className="rounded-xl border border-[#E2ECF6] bg-white p-2">
              <span className="text-[10px] font-bold text-[#64748B]">GPS SIM</span>
              <input
                type="number"
                min={0}
                value={gpsQty}
                onChange={(e) => setGpsQty(Math.max(0, parseInt(e.target.value) || 0))}
                className="mt-1 w-full font-bold text-[#0F172A] outline-none"
              />
            </div>
            <div className="rounded-xl border border-[#E2ECF6] bg-white p-2">
              <span className="text-[10px] font-bold text-[#64748B]">Router SIM</span>
              <input
                type="number"
                min={0}
                value={routerQty}
                onChange={(e) => setRouterQty(Math.max(0, parseInt(e.target.value) || 0))}
                className="mt-1 w-full font-bold text-[#0F172A] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Notes</label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes for this batch distribution..."
            className="w-full rounded-xl border border-[#E2ECF6] bg-white p-2.5 font-medium text-[#0F172A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Summary box */}
        <div className="rounded-xl border border-[#E2ECF6] bg-[#EFF4F8] p-3 text-xs">
          <div className="flex justify-between font-bold text-[#0F172A]">
            <span>Total to distribute:</span>
            <span>
              {totalAllPartners.toLocaleString()} SIMs ({totalPerPartner} × {targetIds.length} APs)
            </span>
          </div>
        </div>
      </div>
    </AppModal>
  );
}
