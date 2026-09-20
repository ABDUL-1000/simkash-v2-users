import { useState } from "react";
import { Info, Minus, Plus, AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface ApRequestSimStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scName?: string;
  scPhone?: string;
  scState?: string;
  onSubmitSuccess?: (total: number, urgency: string) => void;
}

export function ApRequestSimStockModal({
  open,
  onOpenChange,
  scName = "Aminat Okafor",
  scPhone = "08065942373",
  scState = "Lagos",
  onSubmitSuccess,
}: ApRequestSimStockModalProps) {
  const [requests, setRequests] = useState({
    pos: 50,
    cctv: 25,
    gps: 0,
    router: 0,
  });

  const [urgency, setUrgency] = useState<"Normal" | "Urgent" | "Critical">("Normal");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (totalRequested <= 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      onSubmitSuccess?.(totalRequested, urgency);
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Request SIM Stock"
      description="Request more SIMs from your State Coordinator"
      size="md"
      showCloseButton={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Current Inventory Box (Matching Image 5) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1">
          <h4 className="font-extrabold text-[#0F152A] text-xs">
            Your current stock: 42 SIMs
          </h4>
          <p className="text-[11px] font-medium text-[#66738C]">
            POS 18 · CCTV 12 · GPS 8 · Router 4
          </p>
        </div>

        {/* Assigned State Coordinator Card (Matching Image 5) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#0F152A] font-extrabold text-white text-xs">
                AO
              </div>
              <div>
                <h4 className="font-extrabold text-[#0F152A] text-xs">{scName}</h4>
                <p className="text-[11px] text-[#66738C] font-medium">
                  Your State Coordinator · {scState}
                </p>
              </div>
            </div>
            <span className="font-mono font-bold text-xs text-[#2563EB]">
              {scPhone}
            </span>
          </div>
          <p className="text-[10px] text-[#8C909B] font-medium flex items-center gap-1">
            <Info className="size-3 text-[#8C909B]" />
            Request goes to Aminat first, then admin approves
          </p>
        </div>

        {/* SIM Type Quantity Counters List (Matching Image 5) */}
        <div className="space-y-3 pt-1">
          {/* POS SIM */}
          <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-3">
            <div>
              <h5 className="font-extrabold text-[#0F152A] text-xs">POS SIM</h5>
              <p className="text-[10px] text-[#8C909B]">18 in stock</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleUpdateQty("pos", -5)}
                className="flex size-8 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-[#0F152A]">
                {requests.pos}
              </span>
              <button
                type="button"
                onClick={() => handleUpdateQty("pos", 5)}
                className="flex size-8 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          {/* CCTV SIM */}
          <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-3">
            <div>
              <h5 className="font-extrabold text-[#0F152A] text-xs">CCTV SIM</h5>
              <p className="text-[10px] text-[#8C909B]">12 in stock</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleUpdateQty("cctv", -5)}
                className="flex size-8 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-[#0F152A]">
                {requests.cctv}
              </span>
              <button
                type="button"
                onClick={() => handleUpdateQty("cctv", 5)}
                className="flex size-8 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          {/* GPS SIM */}
          <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-3">
            <div>
              <h5 className="font-extrabold text-[#0F152A] text-xs">GPS SIM</h5>
              <p className="text-[10px] text-[#8C909B]">8 in stock</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleUpdateQty("gps", -5)}
                className="flex size-8 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-[#0F152A]">
                {requests.gps}
              </span>
              <button
                type="button"
                onClick={() => handleUpdateQty("gps", 5)}
                className="flex size-8 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Router SIM */}
          <div className="flex items-center justify-between pb-1">
            <div>
              <h5 className="font-extrabold text-[#0F152A] text-xs">Router SIM</h5>
              <p className="text-[10px] text-[#8C909B]">4 in stock</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleUpdateQty("router", -5)}
                className="flex size-8 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-[#0F152A]">
                {requests.router}
              </span>
              <button
                type="button"
                onClick={() => handleUpdateQty("router", 5)}
                className="flex size-8 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#0F152A] hover:bg-[#F8FAFC]"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Total Subtotal Display (Matching Image 5) */}
          <div className="text-right pt-1">
            <span className="text-xs font-black text-[#0F152A]">
              Total: {totalRequested} SIMs requested
            </span>
          </div>
        </div>

        {/* Urgency Selector Strip (Matching Image 5) */}
        <div className="space-y-1.5 pt-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            HOW URGENT?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["Normal", "Urgent", "Critical"] as const).map((lvl) => {
              const isSelected = urgency === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setUrgency(lvl)}
                  className={`rounded-xl py-2.5 text-xs font-extrabold transition border ${
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

          {urgency !== "Normal" && (
            <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3 text-xs text-[#EF4444] font-bold flex items-center gap-2">
              <AlertTriangle className="size-4 shrink-0 text-[#EF4444]" />
              <span>Your SC will be notified immediately</span>
            </div>
          )}
        </div>

        {/* Reason Textarea */}
        <div className="space-y-1">
          <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
            REASON FOR REQUEST (OPTIONAL)
          </label>
          <textarea
            rows={2}
            placeholder="e.g. High demand period, running low on POS SIMs..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Blue Info Box (Matching Image 5) */}
        <div className="rounded-2xl border border-[#2563EB]/20 bg-[#EFF4F8] p-3.5 text-xs text-[#2563EB] font-medium flex items-start gap-2.5">
          <Info className="size-4 shrink-0 text-[#2563EB] mt-0.5" />
          <span>
            Stock requests go to your State Coordinator first. Once they distribute to you, your inventory updates automatically.
          </span>
        </div>

        {/* Action Buttons (Matching Image 5) */}
        <div className="pt-3 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl bg-[#F1F5F9] py-3 text-xs font-bold text-[#66738C] hover:bg-[#E2ECF6] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || totalRequested <= 0}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </div>
      </form>
    </AppModal>
  );
}
