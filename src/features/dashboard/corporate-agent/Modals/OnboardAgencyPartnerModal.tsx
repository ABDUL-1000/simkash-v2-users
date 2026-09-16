import { useState } from "react";
import {
  CheckCircle2,
  Search,
  MapPin,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Smartphone,
  Video,
  Navigation,
  Wifi,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface OnboardAgencyPartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (apDetails: {
    name: string;
    phone: string;
    state: string;
    allocatedStock: number;
  }) => void;
}

const AVAILABLE_STATES = [
  "Lagos",
  "Abuja (FCT)",
  "Kano",
  "Oyo",
  "Rivers",
  "Kaduna",
  "Enugu",
  "Delta",
  "Akwa Ibom",
];

export function OnboardAgencyPartnerModal({
  open,
  onOpenChange,
  onSuccess,
}: OnboardAgencyPartnerModalProps) {
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 State
  const [userMode, setUserMode] = useState<"existing" | "new">("existing");
  const [searchQuery, setSearchQuery] = useState("Francis Udom");
  const [selectedUser, setSelectedUser] = useState({
    name: "Francis Udom",
    phone: "+234 814 567 8901",
    hasApRole: false,
  });
  console.log("selectedUser", setSelectedUser);
  const [selectedState, setSelectedState] = useState("Lagos");

  // Step 2 State (Stock)
  const [posQty, setPosQty] = useState(30);
  const [cctvQty, setCctvQty] = useState(15);
  const [gpsQty, setGpsQty] = useState(5);
  const [routerQty, setRouterQty] = useState(0);
  const [hasCustomTarget, setHasCustomTarget] = useState(false);
  const [customTarget, setCustomTarget] = useState(200);

  const totalAllocated = posQty + cctvQty + gpsQty + routerQty;

  const handleReset = () => {
    setStep(1);
    setPosQty(30);
    setCctvQty(15);
    setGpsQty(5);
    setRouterQty(0);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(handleReset, 200);
  };

  const handleFinalSubmit = () => {
    onOpenChange(false);
    onSuccess?.({
      name: selectedUser.name,
      phone: selectedUser.phone,
      state: selectedState,
      allocatedStock: totalAllocated,
    });
    setTimeout(handleReset, 200);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title="Onboard Agency Partner"
      description="Add an AP to your CA network"
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      <div className="space-y-4 pt-1 text-xs">
        {/* TOP INSTANT ONBOARDING BANNER (Present in both steps) */}
        <div
          className="p-3 rounded-2xl border flex items-start gap-2.5"
          style={{
            backgroundColor: APP_COLORS.greens.light,
            borderColor: APP_COLORS.greens.primary,
          }}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-emerald-900 leading-relaxed">
            CA onboarding of APs is instant — no admin approval needed. The AP account activates immediately.
          </p>
        </div>

        {/* STEP 1: USER DETAILS */}
        {step === 1 && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            {/* TABS: Existing User vs New User */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setUserMode("existing")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  userMode === "existing"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Existing User
              </button>
              <button
                type="button"
                onClick={() => setUserMode("new")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  userMode === "new"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                New User
              </button>
            </div>

            {/* SEARCH INPUT */}
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, phone or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs outline-none focus:border-blue-500"
                style={{
                  borderColor: APP_COLORS.greys.stroke,
                  backgroundColor: APP_COLORS.backgrounds.background,
                }}
              />
            </div>

            {/* SELECTED USER RESULT CARD */}
            <div
              className="p-3 rounded-2xl border flex items-center justify-between"
              style={{
                backgroundColor: "#ECFDF5",
                borderColor: "#A7F3D0",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                  FU
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{selectedUser.name}</h4>
                  <p className="text-xs text-slate-500">{selectedUser.phone}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-600 border border-slate-200">
                No AP role
              </span>
            </div>

            {/* ASSIGNMENT CALLOUT CARD */}
            <div
              className="p-3 rounded-2xl border flex items-center gap-2.5"
              style={{
                backgroundColor: APP_COLORS.backgrounds.surface,
                borderColor: APP_COLORS.greys.stroke,
              }}
            >
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <p className="text-xs text-slate-700">
                Assigning to: <strong>Femi Enterprises</strong> CA network • Lagos
              </p>
            </div>

            {/* STATE SELECTION */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider block text-slate-500">
                State
              </label>
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs appearance-none outline-none focus:border-blue-500 font-medium text-slate-800 bg-white"
                  style={{ borderColor: APP_COLORS.greys.stroke }}
                >
                  {AVAILABLE_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 flex items-center gap-1.5"
                style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: STOCK ALLOCATION & TARGET */}
        {step === 2 && (
          <div className="space-y-3.5 animate-in fade-in duration-150">
            {/* BREADCRUMB STEPPER */}
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-emerald-600 flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px]">
                  ✓
                </span>
                <span>Details</span>
              </span>
              <span className="text-slate-300">→</span>
              <span className="text-blue-600 flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>Stock</span>
              </span>
            </div>

            {/* YOUR STOCK BANNER */}
            <div
              className="p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
              style={{
                backgroundColor: APP_COLORS.blues.surfaceLight,
                borderColor: APP_COLORS.blues.surfaceMid,
              }}
            >
              <span className="font-black text-slate-900">
                Your stock: 847 SIMs
              </span>
              <span className="text-slate-500 font-medium">
                POS 500 • CCTV 200 • GPS 100 • Router 47
              </span>
            </div>

            {/* COUNTER CARDS FOR 4 SIM TYPES */}
            <div className="space-y-2">
              {/* POS SIM */}
              <div
                className="p-2.5 rounded-2xl border flex items-center justify-between"
                style={{
                  backgroundColor: APP_COLORS.backgrounds.background,
                  borderColor: APP_COLORS.greys.stroke,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">POS SIM</h5>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      500 available (500 available)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPosQty(Math.max(0, posQty - 5))}
                    className="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-slate-100 text-slate-600"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-black text-sm text-slate-900">
                    {posQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPosQty(Math.min(500, posQty + 5))}
                    className="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-slate-100 text-slate-600"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* CCTV SIM */}
              <div
                className="p-2.5 rounded-2xl border flex items-center justify-between"
                style={{
                  backgroundColor: APP_COLORS.backgrounds.background,
                  borderColor: APP_COLORS.greys.stroke,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">CCTV SIM</h5>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      200 available (200 available)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCctvQty(Math.max(0, cctvQty - 5))}
                    className="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-slate-100 text-slate-600"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-black text-sm text-slate-900">
                    {cctvQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCctvQty(Math.min(200, cctvQty + 5))}
                    className="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-slate-100 text-slate-600"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* GPS SIM */}
              <div
                className="p-2.5 rounded-2xl border flex items-center justify-between"
                style={{
                  backgroundColor: APP_COLORS.backgrounds.background,
                  borderColor: APP_COLORS.greys.stroke,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">GPS SIM</h5>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      100 available (100 available)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGpsQty(Math.max(0, gpsQty - 5))}
                    className="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-slate-100 text-slate-600"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-black text-sm text-slate-900">
                    {gpsQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGpsQty(Math.min(100, gpsQty + 5))}
                    className="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-slate-100 text-slate-600"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* ROUTER SIM */}
              <div
                className="p-2.5 rounded-2xl border flex items-center justify-between"
                style={{
                  backgroundColor: APP_COLORS.backgrounds.background,
                  borderColor: APP_COLORS.greys.stroke,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Router SIM</h5>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      47 available (47 available)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRouterQty(Math.max(0, routerQty - 1))}
                    className="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-slate-100 text-slate-600"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center font-black text-sm text-slate-900">
                    {routerQty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setRouterQty(Math.min(47, routerQty + 1))}
                    className="w-7 h-7 rounded-lg border flex items-center justify-center hover:bg-slate-100 text-slate-600"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* ALLOCATION TOTAL */}
            <div
              className="p-3 rounded-2xl border flex items-center justify-between font-bold text-xs"
              style={{
                backgroundColor: APP_COLORS.backgrounds.surface,
                borderColor: APP_COLORS.greys.stroke,
              }}
            >
              <span className="text-slate-800">Allocation Total</span>
              <span className="text-sm font-black text-blue-600">{totalAllocated} SIMs</span>
            </div>

            {/* SET CUSTOM TARGET TOGGLE */}
            <div
              className="p-3 rounded-2xl border space-y-2"
              style={{
                backgroundColor: APP_COLORS.backgrounds.surface,
                borderColor: APP_COLORS.greys.stroke,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Set custom target</span>
                  <p className="text-[11px] text-slate-500">
                    Default target: 200 activations/month to earn ₦5,000 bonus.
                  </p>
                </div>

                {/* Switch Toggle */}
                <button
                  type="button"
                  onClick={() => setHasCustomTarget(!hasCustomTarget)}
                  className={`w-10 h-6 rounded-full transition-colors relative p-0.5 ${
                    hasCustomTarget ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      hasCustomTarget ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {hasCustomTarget && (
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">Monthly activations target:</span>
                  <input
                    type="number"
                    value={customTarget}
                    onChange={(e) => setCustomTarget(Number(e.target.value) || 0)}
                    className="w-24 p-1.5 rounded-lg border text-xs font-bold text-right"
                  />
                </div>
              )}
            </div>

            {/* INSTANT ACTIVATION CONFIRMATION */}
            <div className="flex items-center gap-2 text-[11px] text-emerald-800 font-medium px-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Account activates immediately. No admin approval required.</span>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95"
                style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
              >
                Onboard AP Now
              </button>
            </div>
          </div>
        )}
      </div>
    </AppModal>
  );
}
