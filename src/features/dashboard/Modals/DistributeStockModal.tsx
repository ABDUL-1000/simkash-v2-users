import { useState } from "react";
import { ArrowRight, ChevronRight, Info, Minus, Package, Plus, Search, SlidersHorizontal } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

export interface DistributeSummaryData {
  apName: string;
  apState: string;
  posQty: number;
  cctvQty: number;
  gpsQty: number;
  routerQty: number;
  totalToSend: number;
  yourStockBefore: number;
  yourStockAfter: number;
  apStockBefore: number;
  apStockAfter: number;
  note?: string;
}

interface DistributeStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apName?: string;
  apState?: string;
  currentApStock?: {
    pos: number;
    cctv: number;
    gps: number;
    router: number;
  };
  onPreviewConfirm?: (data: DistributeSummaryData) => void;
  onPreviewDistribution?: (data: DistributeSummaryData) => void;
}

const AP_OPTIONS = [
  { id: "francis-udom", name: "Francis Udom", initials: "FU", location: "Lagos", stock: 3, pos: 3, cctv: 0, gps: 0, router: 0 },
  { id: "rabiu-sani", name: "Rabiu Sani", initials: "RS", location: "Lagos", stock: 18, pos: 12, cctv: 4, gps: 2, router: 0 },
  { id: "chioma-eze", name: "Chioma Eze", initials: "CE", location: "Lagos", stock: 12, pos: 8, cctv: 3, gps: 1, router: 0 },
  { id: "hassan-ibrahim", name: "Hassan Ibrahim", initials: "HI", location: "Lagos", stock: 8, pos: 5, cctv: 2, gps: 1, router: 0 },
];

export function DistributeStockModal({
  open,
  onOpenChange,
  apName,
  apState,
  currentApStock,
  onPreviewConfirm,
  onPreviewDistribution,
}: DistributeStockModalProps) {
  // Step state: 1 for AP selection, 2 for quantity selection
  const [step, setStep] = useState<1 | 2>(apName ? 2 : 1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAp, setSelectedAp] = useState(
    AP_OPTIONS.find((a) => a.name === apName) || AP_OPTIONS[0]
  );

  // Your Stock
  const yourStock = {
    pos: 25,
    cctv: 10,
    gps: 5,
    router: 2,
  };

  // Amounts to send
  const [sendAmounts, setSendAmounts] = useState({
    pos: 15,
    cctv: 5,
    gps: 0,
    router: 0,
  });

  const [note, setNote] = useState("");

  const activeApStock = currentApStock || {
    pos: selectedAp.pos,
    cctv: selectedAp.cctv,
    gps: selectedAp.gps,
    router: selectedAp.router,
  };

  const totalYourStock = yourStock.pos + yourStock.cctv + yourStock.gps + yourStock.router;
  const totalApStock = activeApStock.pos + activeApStock.cctv + activeApStock.gps + activeApStock.router;

  const totalToSend = sendAmounts.pos + sendAmounts.cctv + sendAmounts.gps + sendAmounts.router;
  const stockAfter = totalYourStock - totalToSend;

  const handleUpdateQty = (type: "pos" | "cctv" | "gps" | "router", delta: number) => {
    setSendAmounts((prev) => {
      const maxAvailable = yourStock[type];
      const nextVal = Math.max(0, Math.min(maxAvailable, prev[type] + delta));
      return { ...prev, [type]: nextVal };
    });
  };

  const handleSubmitStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    const handlePreview = onPreviewDistribution || onPreviewConfirm;
    handlePreview?.({
      apName: apName || selectedAp.name,
      apState: apState || selectedAp.location,
      posQty: sendAmounts.pos,
      cctvQty: sendAmounts.cctv,
      gpsQty: sendAmounts.gps,
      routerQty: sendAmounts.router,
      totalToSend,
      yourStockBefore: totalYourStock,
      yourStockAfter: stockAfter,
      apStockBefore: totalApStock,
      apStockAfter: totalApStock + totalToSend,
      note,
    });
    onOpenChange(false);
  };

  const filteredAps = AP_OPTIONS.filter((ap) =>
    ap.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Distribute SIM Stock"
      description={step === 1 ? "Select an Agency Partner" : `To: ${apName || selectedAp.name} · ${apState || selectedAp.location}`}
      size="md"
    >
      {step === 1 ? (
        /* STEP 1: Select Agency Partner (Matching Image 2) */
        <div className="space-y-4 pt-1 text-xs">
          {/* Stock Summary Strip */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-[#0F152A]">
              <Package className="size-4 text-[#2563EB]" />
              <span>Your stock: <strong>{totalYourStock} SIMs</strong></span>
            </div>
            <span className="text-[11px] font-bold text-[#66738C]">
              POS {yourStock.pos} · CCTV {yourStock.cctv} · GPS {yourStock.gps} · Router {yourStock.router}
            </span>
          </div>

          {/* AP Search & List */}
          <div className="space-y-2">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              AGENCY PARTNER
            </label>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8C909B]" />
              <input
                type="text"
                placeholder="Search or select an AP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-2.5 pl-10 pr-10 text-xs font-medium text-[#0F152A] outline-none focus:border-[#2563EB]"
              />
              <SlidersHorizontal className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8C909B]" />
            </div>

            {/* List of APs */}
            <div className="space-y-2 pt-1 max-h-48 overflow-y-auto">
              {filteredAps.map((ap) => {
                const isSelected = selectedAp.id === ap.id;
                return (
                  <div
                    key={ap.id}
                    onClick={() => setSelectedAp(ap)}
                    className={`cursor-pointer rounded-2xl p-3 flex items-center justify-between transition border ${
                      isSelected
                        ? "border-[#10B981]/40 bg-[#EBFFF8]"
                        : "border-[#E2ECF6] bg-white hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-xl bg-[#EFF4F8] font-bold text-[#0F152A] text-xs">
                        {ap.initials}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#0F152A] text-xs">
                          {ap.name}
                        </h4>
                        <p className="text-[11px] text-[#66738C]">
                          {ap.location} · Current stock: {ap.stock} SIMs
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 1 Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-2 rounded-xl bg-[#0F152A] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800"
            >
              Continue <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: Configure Quantities (Matching Image 3) */
        <form onSubmit={handleSubmitStep2} className="space-y-3.5 pt-1 text-xs">
          {/* FROM Info Box */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 flex items-center justify-between">
            <span className="font-bold text-[#0F152A]">
              <span className="text-[#8C909B] uppercase font-extrabold mr-1">FROM</span> Your stock: <strong>{totalYourStock} SIMs</strong>
            </span>
            <span className="text-[11px] font-bold text-[#66738C]">
              POS {yourStock.pos} · CCTV {yourStock.cctv} · GPS {yourStock.gps} · Router {yourStock.router}
            </span>
          </div>

          {/* TO Info Box */}
          <div className="rounded-2xl border border-[#10B981]/30 bg-[#EBFFF8] p-3 flex items-center justify-between">
            <span className="font-bold text-[#0F152A]">
              <span className="text-[#10B981] uppercase font-extrabold mr-1">TO</span> {(apName || selectedAp.name).split(" ")[0]} currently has: <strong>{totalApStock} SIMs</strong>
            </span>
            <span className="text-[11px] font-bold text-[#66738C]">
              POS {activeApStock.pos} · CCTV {activeApStock.cctv} · GPS {activeApStock.gps} · Router {activeApStock.router}
            </span>
          </div>

          {/* Counter Allocation Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white divide-y divide-[#E2ECF6]">
            {/* POS SIM */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-[#0F152A]">POS SIM</h4>
                <p className="text-[10px] text-[#8C909B]">{yourStock.pos} available</p>
                {sendAmounts.pos > 0 && (
                  <span className="text-[10px] font-bold text-[#10B981]">
                    {(apName || selectedAp.name).split(" ")[0]}: {activeApStock.pos} → {activeApStock.pos + sendAmounts.pos} SIMs
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQty("pos", -1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center font-black text-sm text-[#0F152A]">
                  {sendAmounts.pos}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQty("pos", 1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            {/* CCTV SIM */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-[#0F152A]">CCTV SIM</h4>
                <p className="text-[10px] text-[#8C909B]">{yourStock.cctv} available</p>
                {sendAmounts.cctv > 0 && (
                  <span className="text-[10px] font-bold text-[#10B981]">
                    {(apName || selectedAp.name).split(" ")[0]}: {activeApStock.cctv} → {activeApStock.cctv + sendAmounts.cctv} SIMs
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQty("cctv", -1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center font-black text-sm text-[#0F152A]">
                  {sendAmounts.cctv}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQty("cctv", 1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            {/* GPS SIM */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-[#F59E0B]">GPS SIM</h4>
                <p className="text-[10px] text-[#8C909B]">{yourStock.gps} available</p>
                {sendAmounts.gps > 0 && (
                  <span className="text-[10px] font-bold text-[#10B981]">
                    {(apName || selectedAp.name).split(" ")[0]}: {activeApStock.gps} → {activeApStock.gps + sendAmounts.gps} SIMs
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQty("gps", -1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center font-black text-sm text-[#0F152A]">
                  {sendAmounts.gps}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQty("gps", 1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Router SIM */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-[#EF4444]">Router SIM</h4>
                <p className="text-[10px] text-[#8C909B]">{yourStock.router} available</p>
                <p className="text-[10px] font-bold text-[#EF4444]">Critical — use sparingly</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQty("router", -1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  <Minus className="size-3.5" />
                </button>
                <span className="w-8 text-center font-black text-sm text-[#0F152A]">
                  {sendAmounts.router}
                </span>
                <button
                  type="button"
                  onClick={() => handleUpdateQty("router", 1)}
                  className="flex size-7 items-center justify-center rounded-lg bg-[#F8FAFC] border border-[#E2ECF6] text-[#0F152A] hover:bg-[#EFF4F8]"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Summary Row */}
            <div className="p-3 bg-[#F8FAFC] flex items-center justify-between text-xs font-bold text-[#66738C]">
              <span>DISTRIBUTING: <strong className="text-[#0F152A]">{totalToSend} SIMs</strong></span>
              <span>Your stock after: <strong className="text-[#0F152A]">{stockAfter} SIMs</strong></span>
            </div>
          </div>

          {/* Yellow Alert Box */}
          <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3 text-xs text-[#D9990D] font-bold flex items-center gap-2">
            <Info className="size-4 shrink-0 text-[#D9990D]" />
            <span>Your stock will be low after this distribution. Request from RM.</span>
          </div>

          {/* Optional Transaction Note */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
              OPTIONAL TRANSACTION NOTE
            </label>
            <textarea
              placeholder="Add an optional note..."
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-2xl border border-[#E2ECF6] p-3 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
            />
          </div>

          {/* Step 2 Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-[#E2ECF6]">
            <button
              type="button"
              onClick={() => (apName ? onOpenChange(false) : setStep(1))}
              className="px-4 py-2.5 text-xs font-bold text-[#66738C] hover:text-[#0F152A]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={totalToSend <= 0}
              className="flex items-center gap-2 rounded-xl bg-[#0F152A] px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 disabled:opacity-50"
            >
              Preview <ChevronRight className="size-4" />
            </button>
          </div>
        </form>
      )}
    </AppModal>
  );
}
