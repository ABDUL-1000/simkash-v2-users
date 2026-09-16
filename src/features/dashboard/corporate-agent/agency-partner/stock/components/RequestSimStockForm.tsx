import { Minus, Plus, Info, AlertTriangle, Monitor, Camera, MapPin, Radio } from "lucide-react";
import type { StockRequestQuantities, UrgencyLevel } from "../types/stock.types";
import { APP_COLORS } from "@/constants/colors";

interface RequestSimStockFormProps {
  quantities: StockRequestQuantities;
  onQuantityChange: (type: keyof StockRequestQuantities, val: number) => void;
  urgency: UrgencyLevel;
  onUrgencyChange: (urgency: UrgencyLevel) => void;
  reason: string;
  onReasonChange: (reason: string) => void;
  onClearForm: () => void;
  onSubmit: () => void;
  scName?: string;
  scPhone?: string;
}

export function RequestSimStockForm({
  quantities,
  onQuantityChange,
  urgency,
  onUrgencyChange,
  reason,
  onReasonChange,
  onClearForm,
  onSubmit,
  scName = "Aminat Okafor",
  scPhone = "08065942373",
}: RequestSimStockFormProps) {
  const totalRequested =
    quantities.pos + quantities.cctv + quantities.gps + quantities.router;

  const handleStep = (type: keyof StockRequestQuantities, delta: number) => {
    const current = quantities[type];
    onQuantityChange(type, Math.max(0, current + delta));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalRequested > 0) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-[#E2ECF6] bg-white p-5 sm:p-6 shadow-xs space-y-6">
      {/* Title & Assigned SC */}
      <div>
        <h3 className="text-base font-black text-[#0F152A]">Request SIM Stock</h3>
        <p className="mt-0.5 text-xs text-[#66738C] font-medium">
          Your SC: <span className="text-[#0F152A] font-bold">{scName}</span> · {scPhone}
        </p>
      </div>

      {/* Current Stock Quick Badges Row */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5">
          <span className="block text-base font-black text-[#0F152A]">18</span>
          <span className="text-[10px] font-semibold text-[#8C909B]">POS</span>
        </div>
        <div className="rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] p-2.5">
          <span className="block text-base font-black text-[#0F152A]">12</span>
          <span className="text-[10px] font-semibold text-[#8C909B]">CCTV</span>
        </div>
        <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-2.5">
          <span className="block text-base font-black text-[#D97706]">8</span>
          <span className="text-[10px] font-semibold text-[#D97706]">GPS</span>
        </div>
        <div className="rounded-xl border border-[#FECACA] bg-[#FFF1F2] p-2.5">
          <span className="block text-base font-black text-[#EF4444]">4</span>
          <span className="text-[10px] font-semibold text-[#EF4444]">Router</span>
        </div>
      </div>

      {/* 4 SIM Steppers */}
      <div className="space-y-3.5">
        {/* 1. POS SIM */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E2ECF6]">
              <Monitor className="size-4.5 text-[#475569]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0F152A]">POS SIM</h4>
              <p className="text-[11px] font-medium text-[#10B981]">18 in stock</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleStep("pos", -5)}
              className="flex size-8 items-center justify-center rounded-full border border-[#CBD5E1] bg-white text-[#475569] transition hover:bg-[#F1F5F9]"
            >
              <Minus className="size-3.5" />
            </button>
            <input
              type="number"
              min={0}
              value={quantities.pos}
              onChange={(e) => onQuantityChange("pos", Math.max(0, parseInt(e.target.value) || 0))}
              className="w-14 rounded-lg border border-[#CBD5E1] bg-white py-1 text-center text-sm font-bold text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
            />
            <button
              type="button"
              onClick={() => handleStep("pos", 5)}
              className="flex size-8 items-center justify-center rounded-full bg-[#2563EB] text-white transition hover:bg-[#1D4ED8]"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>

        {/* 2. CCTV SIM */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E2ECF6]">
              <Camera className="size-4.5 text-[#475569]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0F152A]">CCTV SIM</h4>
              <p className="text-[11px] font-medium text-[#10B981]">12 in stock</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleStep("cctv", -5)}
              className="flex size-8 items-center justify-center rounded-full border border-[#CBD5E1] bg-white text-[#475569] transition hover:bg-[#F1F5F9]"
            >
              <Minus className="size-3.5" />
            </button>
            <input
              type="number"
              min={0}
              value={quantities.cctv}
              onChange={(e) => onQuantityChange("cctv", Math.max(0, parseInt(e.target.value) || 0))}
              className="w-14 rounded-lg border border-[#CBD5E1] bg-white py-1 text-center text-sm font-bold text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
            />
            <button
              type="button"
              onClick={() => handleStep("cctv", 5)}
              className="flex size-8 items-center justify-center rounded-full bg-[#2563EB] text-white transition hover:bg-[#1D4ED8]"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>

        {/* 3. GPS SIM */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E2ECF6]">
              <MapPin className="size-4.5 text-[#EF4444]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0F152A]">GPS SIM</h4>
              <p className="text-[11px] font-medium text-[#D97706]">8 in stock</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleStep("gps", -5)}
              className="flex size-8 items-center justify-center rounded-full border border-[#CBD5E1] bg-white text-[#475569] transition hover:bg-[#F1F5F9]"
            >
              <Minus className="size-3.5" />
            </button>
            <input
              type="number"
              min={0}
              value={quantities.gps}
              onChange={(e) => onQuantityChange("gps", Math.max(0, parseInt(e.target.value) || 0))}
              className="w-14 rounded-lg border border-[#CBD5E1] bg-white py-1 text-center text-sm font-bold text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
            />
            <button
              type="button"
              onClick={() => handleStep("gps", 5)}
              className="flex size-8 items-center justify-center rounded-full bg-[#2563EB] text-white transition hover:bg-[#1D4ED8]"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>

        {/* 4. Router SIM */}
        <div className="flex items-center justify-between rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E2ECF6]">
              <Radio className="size-4.5 text-[#334155]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-[#0F152A]">Router SIM</h4>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-[#FFF1F2] px-1.5 py-0.2 text-[9px] font-bold text-[#EF4444]">
                  <AlertTriangle className="size-2.5" /> Critical
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#EF4444]">4 in stock</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleStep("router", -5)}
              className="flex size-8 items-center justify-center rounded-full border border-[#CBD5E1] bg-white text-[#475569] transition hover:bg-[#F1F5F9]"
            >
              <Minus className="size-3.5" />
            </button>
            <input
              type="number"
              min={0}
              value={quantities.router}
              onChange={(e) => onQuantityChange("router", Math.max(0, parseInt(e.target.value) || 0))}
              className="w-14 rounded-lg border border-[#CBD5E1] bg-white py-1 text-center text-sm font-bold text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
            />
            <button
              type="button"
              onClick={() => handleStep("router", 5)}
              className="flex size-8 items-center justify-center rounded-full bg-[#2563EB] text-white transition hover:bg-[#1D4ED8]"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Total Requested */}
      <div>
        <h4 className="text-sm font-bold text-[#0F152A]">
          Total: <span className="text-base font-black">{totalRequested} SIMs</span> requested
        </h4>
      </div>

      {/* Urgency Selector */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          How urgent is this request?
        </label>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {/* Normal */}
          <div
            onClick={() => onUrgencyChange("Normal")}
            className={`cursor-pointer rounded-2xl p-3.5 transition border ${
              urgency === "Normal"
                ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <h5 className="text-xs font-bold text-[#0F152A]">Normal</h5>
            <p className="mt-0.5 text-[10px] text-[#66738C] font-medium">Fulfilled within 1–2 days</p>
          </div>

          {/* Urgent */}
          <div
            onClick={() => onUrgencyChange("Urgent")}
            className={`cursor-pointer rounded-2xl p-3.5 transition border ${
              urgency === "Urgent"
                ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <h5 className="text-xs font-bold text-[#0F152A]">Urgent</h5>
            <p className="mt-0.5 text-[10px] text-[#66738C] font-medium">Stock critically low · Notify SC immediately</p>
          </div>

          {/* Critical */}
          <div
            onClick={() => onUrgencyChange("Critical")}
            className={`cursor-pointer rounded-2xl p-3.5 transition border ${
              urgency === "Critical"
                ? "border-2 border-[#2563EB] bg-[#EFF6FF]"
                : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
            }`}
          >
            <h5 className="text-xs font-bold text-[#0F152A]">Critical</h5>
            <p className="mt-0.5 text-[10px] text-[#66738C] font-medium">Out of stock · Immediate attention needed</p>
          </div>
        </div>
      </div>

      {/* Reason Field */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
          Reason for request (optional)
        </label>
        <textarea
          rows={3}
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
          placeholder="e.g. High demand period in Lagos Island area, running..."
          className="w-full rounded-2xl border border-[#CBD5E1] bg-white p-3 text-xs text-[#0F152A] placeholder:text-[#94A3B8] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
        />
      </div>

      {/* Info Notice Banner */}
      <div className="flex items-start gap-3 rounded-2xl bg-[#2563EB] p-4 text-white text-xs leading-relaxed">
        <Info className="size-4 shrink-0 mt-0.5 text-white" />
        <p>
          Your request goes to Aminat Okafor (SC) first. Once she distributes to you, your stock updates automatically. Average fulfilment time: 4–8 hours.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onClearForm}
          className="rounded-xl border border-[#CBD5E1] bg-white px-6 py-3 text-xs font-bold text-[#475569] transition hover:bg-[#F1F5F9]"
        >
          Clear Form
        </button>

        <button
          type="submit"
          disabled={totalRequested === 0}
          className="rounded-xl bg-[#10B981] px-8 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#059669] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: APP_COLORS.greens.green }}
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}
