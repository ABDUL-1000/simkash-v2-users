"use client";

import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { useCaRecallPartnerStock, useCaRecallGeneralStock } from "../api/useCaPartners";
import { openNotification } from "@/utils/notifications";

interface RecallStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  partnerId?: number | string;
  partnerName?: string;
  currentStock?: number;
  onSuccess?: () => void;
}

export function RecallStockModal({
  open,
  onOpenChange,
  partnerId,
  partnerName = "Agency Partner",
  currentStock = 18,
  onSuccess,
}: RecallStockModalProps) {
  const [simType, setSimType] = useState<"pos" | "cctv" | "gps" | "router">("pos");
  const [quantity, setQuantity] = useState<number>(5);
  const [reason, setReason] = useState<string>("Rebalancing stock across regional network");

  const individualMutation = useCaRecallPartnerStock(partnerId ? Number(partnerId) : 1);
  const generalMutation = useCaRecallGeneralStock();

  const isPending = individualMutation.isPending || generalMutation.isPending;

  const handleRecall = () => {
    if (quantity <= 0) {
      openNotification({
        state: "error",
        title: "Validation error",
        description: "Recall quantity must be greater than 0.",
      });
      return;
    }
    if (!reason.trim()) {
      openNotification({
        state: "error",
        title: "Validation error",
        description: "Please provide a reason for recalling stock.",
      });
      return;
    }

    if (partnerId) {
      individualMutation.mutate(
        {
          quantity,
          sim_type: simType,
          reason: reason.trim(),
        },
        {
          onSuccess: () => {
            onSuccess?.();
            onOpenChange(false);
          },
        }
      );
    } else {
      generalMutation.mutate(undefined, {
        onSuccess: () => {
          onSuccess?.();
          onOpenChange(false);
        },
      });
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Recall SIM Stock"
      description={
        partnerId
          ? `Recall stock from ${partnerName} back to your inventory`
          : "Recall unused SIM stock back to your available inventory"
      }
      size="md"
      actions={[
        {
          key: "cancel",
          label: "Cancel",
          variant: "secondary",
          closeOnClick: true,
          disabled: isPending,
        },
        {
          key: "recall",
          label: isPending ? "Recalling..." : "Confirm Stock Recall",
          variant: "primary",
          onClick: handleRecall,
          disabled: isPending,
        },
      ]}
    >
      <div className="space-y-4 pt-1 text-xs">
        {partnerId && (
          <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-xs">
            <div className="flex justify-between font-bold text-[#0F172A]">
              <span>Partner:</span>
              <span>{partnerName}</span>
            </div>
            <div className="flex justify-between text-[#64748B] pt-1">
              <span>Current Stock:</span>
              <span className="font-bold text-[#0F172A]">{currentStock} SIMs</span>
            </div>
          </div>
        )}

        {/* SIM Type */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">SIM Type to Recall</label>
          <select
            value={simType}
            onChange={(e) => setSimType(e.target.value as "pos" | "cctv" | "gps" | "router")}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 font-medium text-[#0F172A] outline-none focus:border-[#2563EB]"
          >
            <option value="pos">POS SIM</option>
            <option value="cctv">CCTV SIM</option>
            <option value="gps">GPS SIM</option>
            <option value="router">Router SIM</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Quantity to Recall</label>
          <input
            type="number"
            min={1}
            max={currentStock || undefined}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white px-3 py-2 font-bold text-[#0F172A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="mb-1 block font-bold text-[#0F172A]">Reason for Recall</label>
          <textarea
            rows={2}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Rebalancing stock across regional network..."
            className="w-full rounded-xl border border-[#E2ECF6] bg-white p-2.5 font-medium text-[#0F172A] outline-none focus:border-[#2563EB]"
          />
        </div>
      </div>
    </AppModal>
  );
}
