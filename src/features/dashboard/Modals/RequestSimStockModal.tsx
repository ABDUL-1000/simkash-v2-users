import { useState } from "react";
import { Info, Minus, Plus, Bell } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface RequestSimStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function RequestSimStockModal({
  open,
  onOpenChange,
  onSuccess,
}: RequestSimStockModalProps) {
  const [requests, setRequests] = useState({
    pos: 50,
    cctv: 25,
    gps: 20,
    router: 10,
  });

  const [urgency, setUrgency] = useState<"Normal" | "Urgent" | "Critical">("Normal");
  const [justification, setJustification] = useState("");

  const totalRequested =
    requests.pos + requests.cctv + requests.gps + requests.router;

  const handleUpdateQty = (
    type: "pos" | "cctv" | "gps" | "router",
    delta: number
  ) => {
    setRequests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess?.();
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Request SIM Stock"
      description="Request from your Regional Manager"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Your Inventory Pill Card */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 flex items-center justify-between">
          <span className="font-bold text-[#0F152A]">
            Your inventory: <strong>42 SIMs</strong>
          </span>
          <span className="text-[11px] font-medium text-[#66738C]">
            POS 25 · CCTV 10 · GPS 5 · Router 2
          </span>
        </div>

        {/* Manager Target Info Card */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] font-black text-[#2563EB]">
              YA
            </div>
            <div>
              <h4 className="font-extrabold text-[#0F152A]">
                Yusuf Adam Baba · RM
              </h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                08065942373 · Lagos Region
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#66738C]">
            Request goes to Yusuf first
          </span>
        </div>

        {/* Info Callout */}
        <div className="rounded-2xl border border-[#2563EB]/20 bg-[#EFF4F8] p-3 text-xs text-[#2563EB] font-medium flex items-center gap-2">
          <Info className="size-4 shrink-0 text-[#2563EB]" />
          <span>
            Your request goes to Yusuf Adam Baba (RM). Once they distribute, your stock will update.
          </span>
        </div>

        {/* Quantity Counters Section */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white divide-y divide-[#E2ECF6]">
          {/* POS SIM */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-[#0F152A]">POS SIM</h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                25 in stock · <span className="text-[#F59E0B]">APs need ~75 more this month</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleUpdateQty("pos", -5)}
                className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-[#0F152A]">
                {requests.pos}
              </span>
              <button
                type="button"
                onClick={() => handleUpdateQty("pos", 5)}
                className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* CCTV SIM */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-[#0F152A]">CCTV SIM</h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                10 in stock
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleUpdateQty("cctv", -5)}
                className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-[#0F152A]">
                {requests.cctv}
              </span>
              <button
                type="button"
                onClick={() => handleUpdateQty("cctv", 5)}
                className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* GPS SIM */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-[#0F152A]">GPS SIM</h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                5 in stock · <span className="text-[#F59E0B] font-bold">⚠️ Low -- request more</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleUpdateQty("gps", -5)}
                className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-[#0F152A]">
                {requests.gps}
              </span>
              <button
                type="button"
                onClick={() => handleUpdateQty("gps", 5)}
                className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>

          {/* Router SIM */}
          <div className="p-3.5 flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-[#0F152A]">Router SIM</h4>
              <p className="text-[11px] text-[#66738C] font-medium">
                2 in stock · <span className="text-[#EF4444] font-bold">🚨 Critical -- request urgently</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleUpdateQty("router", -5)}
                className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
              >
                <Minus className="size-3" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-[#0F152A]">
                {requests.router}
              </span>
              <button
                type="button"
                onClick={() => handleUpdateQty("router", 5)}
                className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Requested Total Pill */}
        <div className="flex justify-end">
          <span className="rounded-xl bg-[#F8FAFC] border border-[#E2ECF6] px-4 py-1.5 text-xs font-black text-[#0F152A]">
            {totalRequested} SIMs requested
          </span>
        </div>

        {/* Urgency Selector */}
        <div className="grid grid-cols-3 gap-2">
          {(["Normal", "Urgent", "Critical"] as const).map((lvl) => {
            const isSelected = urgency === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setUrgency(lvl)}
                className={`rounded-xl py-2.5 text-xs font-bold transition border ${
                  isSelected
                    ? "border-[#0F152A] bg-[#0F152A] text-white shadow-xs"
                    : "border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        {/* Alert Banner for Urgent/Critical */}
        {urgency !== "Normal" && (
          <div className="rounded-2xl border border-[#F59E0B]/30 bg-[#FFFBEB] p-3 text-xs text-[#D9990D] font-bold flex items-center gap-2">
            <Bell className="size-4 shrink-0 text-[#F59E0B]" />
            <span>Yusuf Adam Baba will be alerted immediately about this request.</span>
          </div>
        )}

        {/* Justification Textarea */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#0F152A]">
            Justification
          </label>
          <textarea
            placeholder="e.g. Monthly restock"
            rows={2}
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={totalRequested <= 0}
            className="rounded-xl bg-[#10B981] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-600 transition disabled:opacity-50"
          >
            Submit Request
          </button>
        </div>
      </form>
    </AppModal>
  );
}
