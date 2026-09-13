import { useState } from "react";
import { Minus, Plus, RefreshCw } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { RM_SC_DISTRIBUTIONS } from "../../data/rm-inventory.data";

interface RedistributeSimsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (summary: {
    fromSc: string;
    toSc: string;
    simType: string;
    qty: number;
  }) => void;
}

export function RedistributeSimsModal({
  open,
  onOpenChange,
  onSuccess,
}: RedistributeSimsModalProps) {
  const [fromScId, setFromScId] = useState("sc-1"); // Aminat Okafor
  const [toScId, setToScId] = useState("sc-7"); // Ngozi Adeyemi
  const [simType, setSimType] = useState<"pos" | "cctv" | "gps" | "router">("pos");
  const [quantity, setQuantity] = useState(10);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fromSc = RM_SC_DISTRIBUTIONS.find((s) => s.scId === fromScId) || RM_SC_DISTRIBUTIONS[0];
  const toSc = RM_SC_DISTRIBUTIONS.find((s) => s.scId === toScId) || RM_SC_DISTRIBUTIONS[6];

  const availableInFromSc = fromSc[simType] || 0;
  const currentInToSc = toSc[simType] || 0;

  const handleConfirm = () => {
    if (quantity <= 0 || quantity > availableInFromSc) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      onSuccess?.({
        fromSc: fromSc.name,
        toSc: toSc.name,
        simType: simType.toUpperCase() + " SIM",
        qty: quantity,
      });
    }, 600);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Redistribute SIMs Between SCs"
      description="Move allocated stock from an SC with healthy inventory to an SC with critical need."
      size="md"
      showCloseButton={true}
      footer={
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-[#64748B] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting || quantity <= 0 || quantity > availableInFromSc}
            onClick={handleConfirm}
            className="flex-1 rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Processing..." : "Confirm Redistribution"}
          </button>
        </div>
      }
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* Source & Destination SCs Row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Source SC */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              Source SC (Transfer From)
            </label>
            <select
              value={fromScId}
              onChange={(e) => setFromScId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#0F152A] outline-hidden focus:border-blue-500"
            >
              {RM_SC_DISTRIBUTIONS.filter((s) => (s.total || 0) > 10).map((s) => (
                <option key={s.scId} value={s.scId}>
                  {s.name} ({s.state} · {s.total} SIMs)
                </option>
              ))}
            </select>
            <p className="text-[11px] text-[#64748B]">
              Available {simType.toUpperCase()}: <strong className="text-[#0F152A]">{availableInFromSc}</strong>
            </p>
          </div>

          {/* Destination SC */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
              Destination SC (Transfer To)
            </label>
            <select
              value={toScId}
              onChange={(e) => setToScId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-[#0F152A] outline-hidden focus:border-blue-500"
            >
              {RM_SC_DISTRIBUTIONS.filter((s) => s.scId !== fromScId).map((s) => (
                <option key={s.scId} value={s.scId}>
                  {s.name} ({s.state} · {s.total || 0} SIMs)
                </option>
              ))}
            </select>
            <p className="text-[11px] text-[#64748B]">
              Current {simType.toUpperCase()}: <strong className="text-[#0F152A]">{currentInToSc}</strong>
            </p>
          </div>
        </div>

        {/* SIM Type Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F152A]">Select SIM Type</label>
          <div className="grid grid-cols-4 gap-2">
            {(["pos", "cctv", "gps", "router"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSimType(type)}
                className={`rounded-xl border py-2 text-center text-xs font-bold uppercase transition ${
                  simType === type
                    ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                    : "border-slate-200 bg-white text-[#64748B] hover:bg-slate-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Stepper Quantity */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div>
            <h4 className="text-xs font-bold text-[#0F152A]">Transfer Quantity</h4>
            <p className="text-[11px] text-[#8C909B]">
              Max available: {availableInFromSc}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 5))}
              disabled={quantity <= 1}
              className="flex size-8 items-center justify-center rounded-xl bg-white border border-slate-200 text-[#0F152A] hover:bg-slate-100 disabled:opacity-40"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-black text-[#0F152A]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((prev) => Math.min(availableInFromSc, prev + 5))}
              disabled={quantity >= availableInFromSc}
              className="flex size-8 items-center justify-center rounded-xl bg-[#2563EB] text-white hover:bg-blue-700 disabled:opacity-40"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>

        {/* Preview of change */}
        <div className="rounded-2xl border border-blue-100 bg-[#F0F6FF] p-3.5 text-xs text-[#1F3A5F] space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <RefreshCw className="size-3.5 text-[#2563EB]" />
            <span>Stock Reallocation Summary</span>
          </div>
          <p className="text-[11px] text-[#475569]">
            <strong>{fromSc.name}</strong> will decrease from {availableInFromSc} → {availableInFromSc - quantity} {simType.toUpperCase()} SIMs.
          </p>
          <p className="text-[11px] text-[#475569]">
            <strong>{toSc.name}</strong> will increase from {currentInToSc} → {currentInToSc + quantity} {simType.toUpperCase()} SIMs.
          </p>
        </div>

        {/* Reason */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#0F152A]">
            Reason / Notes (Optional)
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Urgent redistribution to prevent Delta state stock-out"
            rows={2}
            className="w-full rounded-xl border border-slate-200 p-3 text-xs text-[#0F152A] placeholder:text-[#94A3B8] outline-hidden focus:border-blue-500"
          />
        </div>
      </div>
    </AppModal>
  );
}
