import { useState } from "react";
import {
  Package,
  Search,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Minus,
  Plus,
  CreditCard,
  Video,
  MapPin,
  Wifi,
  CheckCircle2,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { CA_AGENCY_PARTNERS_DATA } from "../data/corporate-agent.data";
import type { CaAgencyPartnerItem } from "../types/corporate-agent.types";

interface CaDistributeStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedAp?: CaAgencyPartnerItem | null;
  onSuccess?: (details: {
    recipientName: string;
    totalSims: number;
    distributionRef: string;
    posCount: number;
    cctvCount: number;
  }) => void;
}

export function CaDistributeStockModal({
  open,
  onOpenChange,
  preselectedAp,
  onSuccess,
}: CaDistributeStockModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Agency Partner Selection
  const [selectedAp, setSelectedAp] = useState<CaAgencyPartnerItem>(
    preselectedAp ||
      CA_AGENCY_PARTNERS_DATA.find((ap) => ap.name.includes("Francis")) ||
      CA_AGENCY_PARTNERS_DATA[0]
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Quantities
  const [posQty, setPosQty] = useState(15);
  const [cctvQty, setCctvQty] = useState(5);
  const [gpsQty, setGpsQty] = useState(0);
  const [routerQty, setRouterQty] = useState(0);
  const [note, setNote] = useState("");

  // PIN & submission
  const [pin, setPin] = useState(["●", "●", "●", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalDistributing = posQty + cctvQty + gpsQty + routerQty;
  const myTotalStock = 847;
  const myStockAfter = myTotalStock - totalDistributing;

  const currentApStock = selectedAp.stock || 3;
  const apStockAfter = currentApStock + totalDistributing;

  const handlePinInput = (index: number, val: string) => {
    const newPin = [...pin];
    newPin[index] = val ? "●" : "";
    setPin(newPin);

    if (val && index < 3) {
      const next = document.getElementById(`ca-dist-pin-${index + 1}`);
      next?.focus();
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      setStep(1);
      onSuccess?.({
        recipientName: selectedAp.name,
        totalSims: totalDistributing,
        distributionRef: `DIST-SIM-${Math.floor(100000 + Math.random() * 900000)}`,
        posCount: posQty,
        cctvCount: cctvQty,
      });
    }, 450);
  };

  const filteredAps = CA_AGENCY_PARTNERS_DATA.filter((ap) =>
    ap.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ap.phone.includes(searchQuery)
  );

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => {
        if (!v) setStep(1);
        onOpenChange(v);
      }}
      title={
        step === 3
          ? "Confirm Distribution"
          : "Distribute SIM Stock"
      }
      description={
        step === 1
          ? "Send stock to an Agency Partner"
          : step === 2
          ? `To: ${selectedAp.name} · ${selectedAp.state}`
          : "Please verify details before finalizing"
      }
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      {/* ========================================================================= */}
      {/* STEP 1: SELECT AGENCY PARTNER */}
      {/* ========================================================================= */}
      {step === 1 && (
        <div className="space-y-4 pt-1 text-xs">
          {/* YOUR STOCK BAR */}
          <div
            className="p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 bg-slate-50/70"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-slate-700" />
              <span className="font-bold text-slate-900">
                Your stock: {myTotalStock} SIMs
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              POS 500 · CCTV 200 · GPS 100 · Router 47
            </span>
          </div>

          {/* SELECT AGENCY PARTNER SEARCH & CARD */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Select Agency Partner
            </span>

            {/* Search Input dropdown */}
            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 flex items-center justify-between bg-white cursor-pointer hover:border-slate-300"
              >
                <div className="flex items-center gap-2 text-slate-400">
                  <Search className="w-4 h-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setDropdownOpen(true);
                    }}
                    placeholder="Search AP by name or phone..."
                    className="outline-none text-xs text-slate-800 bg-transparent placeholder:text-slate-400"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>

              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg z-20 divide-y divide-slate-100">
                  {filteredAps.map((ap) => (
                    <div
                      key={ap.id}
                      onClick={() => {
                        setSelectedAp(ap);
                        setDropdownOpen(false);
                      }}
                      className="p-2.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-xs">
                          {ap.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {ap.phone} · {ap.state}
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                        {ap.stock} SIMs
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SELECTED AP CARD */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {selectedAp.avatarInitials || "FU"}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">
                    {selectedAp.name}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    {selectedAp.phone} · {selectedAp.state} · 42 customers
                  </div>
                  <div className="text-[11px] font-bold text-rose-600 mt-0.5">
                    Current stock: {selectedAp.stock} SIMs
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDropdownOpen(true)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Change
              </button>
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95 flex items-center gap-1.5"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: ALLOCATE SIM QUANTITIES */}
      {/* ========================================================================= */}
      {step === 2 && (
        <div className="space-y-3.5 pt-1 text-xs">
          {/* YOUR STOCK BAR */}
          <div
            className="p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 bg-slate-50/70"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">
                Your stock: {myTotalStock} SIMs
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              POS 500 · CCTV 200 · GPS 100 · Router 47
            </span>
          </div>

          {/* RECIPIENT CURRENT STOCK CARD */}
          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="font-bold text-emerald-800">
              {selectedAp.name.split(" ")[0]} currently has: {currentApStock} SIMs
            </span>
            <span className="text-[11px] text-emerald-700 font-medium">
              POS {currentApStock} · CCTV 0 · GPS 0 · Router 0
            </span>
          </div>

          {/* 4 SIM TYPE COUNTERS */}
          <div className="space-y-2">
            {/* POS SIM */}
            <div
              className="p-2.5 rounded-2xl border flex items-center justify-between bg-white"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">POS SIM</div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    500 available
                  </div>
                  <div className="text-[11px] text-emerald-600 font-bold">
                    {selectedAp.name.split(" ")[0]}: {currentApStock} → {currentApStock + posQty} SIMs
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPosQty(Math.max(0, posQty - 5))}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-black text-slate-900 text-sm">
                  {posQty}
                </span>
                <button
                  type="button"
                  onClick={() => setPosQty(posQty + 5)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* CCTV SIM */}
            <div
              className="p-2.5 rounded-2xl border flex items-center justify-between bg-white"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">CCTV SIM</div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    200 available
                  </div>
                  <div className="text-[11px] text-emerald-600 font-bold">
                    {selectedAp.name.split(" ")[0]}: 0 → {cctvQty} SIMs
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCctvQty(Math.max(0, cctvQty - 5))}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-black text-slate-900 text-sm">
                  {cctvQty}
                </span>
                <button
                  type="button"
                  onClick={() => setCctvQty(cctvQty + 5)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* GPS SIM */}
            <div
              className="p-2.5 rounded-2xl border flex items-center justify-between bg-white"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">GPS SIM</div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    100 available
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGpsQty(Math.max(0, gpsQty - 5))}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-black text-slate-900 text-sm">
                  {gpsQty}
                </span>
                <button
                  type="button"
                  onClick={() => setGpsQty(gpsQty + 5)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* ROUTER SIM */}
            <div
              className="p-2.5 rounded-2xl border flex items-center justify-between bg-white"
              style={{ borderColor: APP_COLORS.greys.stroke }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">Router SIM</div>
                  <div className="text-[11px] text-amber-600 font-medium flex items-center gap-1.5">
                    <span>47 available</span>
                    <span className="w-10 h-1.5 rounded-full bg-amber-200 inline-block overflow-hidden">
                      <span className="w-1/3 h-full bg-amber-500 block" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRouterQty(Math.max(0, routerQty - 5))}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-black text-slate-900 text-sm">
                  {routerQty}
                </span>
                <button
                  type="button"
                  onClick={() => setRouterQty(routerQty + 5)}
                  className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* SUMMARY LINE */}
          <div className="flex items-center justify-between pt-1">
            <span className="font-black text-slate-900 text-xs">
              Distributing: {totalDistributing} SIMs
            </span>
            <span className="text-slate-500 text-[11px]">
              Your stock after:{" "}
              <strong className="text-slate-700">{myStockAfter} SIMs</strong>
            </span>
          </div>

          {/* NOTE (OPTIONAL) */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Note (Optional)
            </span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add an optional note to this distribution..."
              rows={2}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 outline-none focus:border-blue-500 bg-white"
            />
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => setStep(3)}
              disabled={totalDistributing <= 0}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95 disabled:opacity-50 flex items-center gap-1.5"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              <span>Preview Distribution</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: CONFIRM DISTRIBUTION */}
      {/* ========================================================================= */}
      {step === 3 && (
        <div className="space-y-4 pt-1 text-xs">
          {/* RECIPIENT CARD */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {selectedAp.avatarInitials || "FU"}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">
                  {selectedAp.name}
                </div>
                <div className="text-[11px] text-slate-600">
                  {selectedAp.state} · 42 customers · {currentApStock} SIMs now
                </div>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-blue-600" />
          </div>

          {/* SENDING SUMMARY BOX WITH ACCENT BAR */}
          <div
            className="p-4 rounded-2xl border bg-slate-50/60 relative pl-5 overflow-hidden"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-900" />

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Sending
              </span>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">POS SIM</span>
                <span className="font-bold text-blue-600">{posQty} units</span>
              </div>

              {cctvQty > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">CCTV SIM</span>
                  <span className="font-bold text-emerald-600">{cctvQty} units</span>
                </div>
              )}

              {gpsQty > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">GPS SIM</span>
                  <span className="font-bold text-purple-600">{gpsQty} units</span>
                </div>
              )}

              {routerQty > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Router SIM</span>
                  <span className="font-bold text-amber-600">{routerQty} units</span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="font-black text-slate-900 text-sm">Total</span>
                <span className="font-black text-slate-900 text-sm">
                  {totalDistributing} SIMs
                </span>
              </div>
            </div>
          </div>

          {/* SIDE-BY-SIDE STOCK TRANSITION CARDS */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* YOUR STOCK */}
            <div className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Your Stock
              </span>
              <div className="text-[11px] text-slate-600 font-medium">
                POS: 500 → {500 - posQty}
              </div>
              <div className="text-xs font-black text-slate-900">
                Total: {myTotalStock} → {myStockAfter}
              </div>
            </div>

            {/* RECIPIENT AFTER */}
            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 block">
                {selectedAp.name.split(" ")[0].toUpperCase()} AFTER
              </span>
              <div className="text-[11px] text-slate-600 font-medium">
                POS: {currentApStock} → {currentApStock + posQty} · CCTV: 0 → {cctvQty}
              </div>
              <div className="text-xs font-black text-emerald-600">
                Total: {currentApStock} → {apStockAfter} SIMs
              </div>
            </div>
          </div>

          {/* HEALTHY STOCK STATUS CHECK */}
          <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>Stock healthy after distribution</span>
          </div>

          {/* ENTER AGENT PIN */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 text-center block">
              Enter Agent PIN
            </span>
            <div className="flex items-center justify-center gap-3 py-1">
              {pin.map((p, i) => (
                <input
                  key={i}
                  id={`ca-dist-pin-${i}`}
                  type="password"
                  maxLength={1}
                  value={p}
                  onChange={(e) => handlePinInput(i, e.target.value)}
                  className="w-12 h-12 rounded-2xl border border-slate-200 text-center text-lg font-black bg-white focus:border-blue-500 outline-none transition-colors"
                />
              ))}
            </div>
          </div>

          {/* FOOTER ACTIONS */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95 disabled:opacity-50"
              style={{ backgroundColor: APP_COLORS.greens.secondary }}
            >
              {isSubmitting
                ? "Distributing..."
                : `Distribute ${totalDistributing} SIMs`}
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}
