import { useState } from "react";
import {
  CreditCard,
  Wifi,
  Video,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Package,
} from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";

interface CaActivateSimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (details: {
    simNumber: string;
    customerName: string;
    carrier: string;
    simType: string;
    plan: string;
    commission: number;
    ref: string;
  }) => void;
}

export function CaActivateSimModal({
  open,
  onOpenChange,
  onSuccess,
}: CaActivateSimModalProps) {
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [simType, setSimType] = useState("Router SIM");
  const [carrier, setCarrier] = useState("MTN");
  const [simNumber, setSimNumber] = useState("07022222222");
  const [customerName, setCustomerName] = useState("Chidi Eze");
  const [phoneNumber, setPhoneNumber] = useState("08120600542");
  const [address, setAddress] = useState("");
  const [plan, setPlan] = useState("30-day");
  const [pin, setPin] = useState(["●", "●", "●", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plans = [
    { id: "30-day", name: "30-day", price: "₦5,000", isBestValue: false },
    { id: "60-day", name: "60-day", price: "₦9,500", isBestValue: false },
    { id: "90-day", name: "90-day", price: "₦13,500", isBestValue: true },
  ];

  const carriers = ["MTN", "Airtel", "Glo", "9mobile / T2"];

  const simTypes = [
    { name: "Router SIM", inStock: 47, icon: <Wifi className="w-4 h-4 text-amber-500" /> },
    { name: "POS SIM", inStock: 500, icon: <CreditCard className="w-4 h-4 text-blue-500" /> },
    { name: "CCTV SIM", inStock: 200, icon: <Video className="w-4 h-4 text-emerald-500" /> },
    { name: "GPS SIM", inStock: 100, icon: <MapPin className="w-4 h-4 text-purple-500" /> },
  ];

  const handlePinInput = (index: number, val: string) => {
    const newPin = [...pin];
    newPin[index] = val ? "●" : "";
    setPin(newPin);

    if (val && index < 3) {
      const next = document.getElementById(`ca-act-pin-box-${index + 1}`);
      next?.focus();
    }
  };

  const handleNextStep = () => {
    if (!simNumber || !customerName || !phoneNumber) return;
    setStep(2);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      setStep(1);
      onSuccess?.({
        simNumber,
        customerName,
        carrier,
        simType,
        plan: plan === "30-day" ? "30-day · ₦5,000" : plan === "60-day" ? "60-day · ₦9,500" : "90-day · ₦13,500",
        commission: 600,
        ref: `SIM-ACT-${Math.floor(100000 + Math.random() * 900000)}`,
      });
    }, 450);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => {
        if (!v) setStep(1);
        onOpenChange(v);
      }}
      title={step === 1 ? "Activate SIM" : "Confirm Activation"}
      description={
        step === 1
          ? "Activate for your own commission"
          : "Verify details before committing stock"
      }
      descriptionColor={APP_COLORS.texts.slate}
      size="md"
      showCloseButton={true}
    >
      {step === 1 ? (
        /* STEP 1: ACTIVATE SIM FORM */
        <div className="space-y-3.5 pt-1 text-xs">
          {/* STOCK SUMMARY BAR */}
          <div
            className="p-3 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 bg-slate-50/70"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-900">Your stock: 847 SIMs</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              POS 500 · CCTV 200 · GPS 100 · Router 47
            </span>
          </div>

          {/* SIM TYPE */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              SIM Type
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {simTypes.map((st) => {
                const isSelected = simType === st.name;
                return (
                  <div
                    key={st.name}
                    onClick={() => setSimType(st.name)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-amber-400 bg-amber-50/40 shadow-xs"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="mb-1">{st.icon}</div>
                    <div className="font-bold text-slate-900 text-xs truncate">
                      {st.name}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-medium">
                      {st.inStock} in stock
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NETWORK SELECTION */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Network
            </span>
            <div className="flex flex-wrap gap-2">
              {carriers.map((c) => {
                const isSelected = carrier === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCarrier(c)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      isSelected
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SIM NUMBER */}
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              SIM Number
            </span>
            <input
              type="text"
              value={simNumber}
              onChange={(e) => setSimNumber(e.target.value)}
              placeholder="e.g. 07022222222"
              className="w-full px-3 py-2 rounded-xl border-2 border-emerald-500 font-bold text-xs text-slate-900 outline-none bg-white"
            />
            <div className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px] pt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Valid SIM format</span>
            </div>
          </div>

          {/* CUSTOMER INFORMATION */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Customer Information
            </span>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-600">
                Full Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Chidi Eze"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-xs text-slate-900 outline-none focus:border-blue-500 bg-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-600">
                Phone Number
              </label>
              <div className="flex rounded-xl border border-slate-200 overflow-hidden bg-white focus-within:border-blue-500">
                <span className="px-3 py-2 bg-slate-50 text-slate-600 border-r border-slate-200 font-bold text-xs flex items-center gap-1">
                  <span>🇳🇬</span>
                  <span>+234</span>
                </span>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="08120600542"
                  className="w-full px-3 py-2 font-medium text-xs text-slate-900 outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-slate-600">
                Address (Optional)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Customer residential address (Optional)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-xs text-slate-900 outline-none focus:border-blue-500 bg-white"
              />
            </div>
          </div>

          {/* CHOOSE PLAN */}
          <div className="space-y-1.5 pt-1 border-t border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Choose Plan
            </span>
            <div className="grid grid-cols-3 gap-2">
              {plans.map((p) => {
                const isSelected = plan === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => setPlan(p.id)}
                    className={`relative p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/60 shadow-xs"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {p.isBestValue && (
                      <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded-full text-[8px] font-black bg-emerald-100 text-emerald-700">
                        BEST VALUE
                      </span>
                    )}
                    <div className="font-bold text-slate-900 text-xs">{p.name}</div>
                    <div className="font-black text-blue-600 text-xs mt-0.5">
                      {p.price}
                    </div>
                  </div>
                );
              })}
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
              onClick={handleNextStep}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95 flex items-center gap-1.5"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: CONFIRM ACTIVATION */
        <div className="space-y-4 pt-1 text-xs">
          {/* VERIFY SUMMARY CARD */}
          <div
            className="p-4 rounded-2xl border bg-slate-50/60 relative pl-5 overflow-hidden"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            {/* Left Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-900" />

            <div className="divide-y divide-slate-200/70 space-y-2">
              <div className="flex items-center justify-between pb-1">
                <span className="text-slate-500 font-medium">SIM Type</span>
                <span className="font-bold text-purple-700">{simType}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-medium">Network</span>
                <span className="font-black text-slate-900">{carrier}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-medium">SIM Number</span>
                <span className="font-black text-slate-900 font-mono">
                  {simNumber}
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-medium">Customer</span>
                <span className="font-bold text-slate-900">{customerName}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-medium">Phone</span>
                <span className="font-bold text-slate-900">{phoneNumber}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-medium">Plan</span>
                <span className="font-black text-slate-900">
                  {plan === "30-day"
                    ? "30-day · ₦5,000"
                    : plan === "60-day"
                    ? "60-day · ₦9,500"
                    : "90-day · ₦13,500"}
                </span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-medium">Commission</span>
                <span className="font-black text-emerald-600 text-sm">+₦600</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 font-medium">Stock after</span>
                <span className="font-black text-slate-900">499 POS SIMs</span>
              </div>
            </div>
          </div>

          {/* WARNING BANNER */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-center gap-2 text-xs text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Once activated this cannot be undone without admin approval.</span>
          </div>

          {/* ENTER PIN */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Enter PIN
            </span>
            <div className="flex items-center justify-center gap-3 py-1">
              {pin.map((p, i) => (
                <input
                  key={i}
                  id={`ca-act-pin-box-${i}`}
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
              onClick={() => setStep(1)}
              className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs transition-all active:scale-[0.98] hover:opacity-95 disabled:opacity-50"
              style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
            >
              {isSubmitting ? "Activating..." : "Activate SIM"}
            </button>
          </div>
        </div>
      )}
    </AppModal>
  );
}
