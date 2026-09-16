import { APP_COLORS } from "@/constants/colors";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

interface CaCustomerInfoStepProps {
  customerName: string;
  onCustomerNameChange: (val: string) => void;
  customerPhone: string;
  onCustomerPhoneChange: (val: string) => void;
  address: string;
  onAddressChange: (val: string) => void;
  email: string;
  onEmailChange: (val: string) => void;
  notes: string;
  onNotesChange: (val: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function CaCustomerInfoStep({
  customerName,
  onCustomerNameChange,
  customerPhone,
  onCustomerPhoneChange,
  address,
  onAddressChange,
  email,
  onEmailChange,
  notes,
  onNotesChange,
  onBack,
  onNext,
}: CaCustomerInfoStepProps) {
  const isNameValid = customerName.trim().length >= 3;
  const isPhoneValid = customerPhone.trim().length >= 10;
  const canProceed = isNameValid && isPhoneValid;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3
          className="text-base font-black"
          style={{ color: APP_COLORS.texts.primary }}
        >
          Customer Information
        </h3>
        <p className="text-xs" style={{ color: APP_COLORS.texts.slate }}>
          Enter the subscriber's identification and contact details for network KYC.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-black text-slate-800 flex items-center justify-between">
            <span>
              Full Name <span className="text-red-500">*</span>
            </span>
            {isNameValid && (
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <Check className="size-3.5 stroke-[3]" /> Valid
              </span>
            )}
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              placeholder="e.g. Chidi Eze"
              className="w-full rounded-xl border px-3.5 py-2.5 text-xs font-bold text-slate-900 bg-white shadow-2xs outline-hidden focus:ring-2 focus:ring-blue-500/20"
              style={{
                borderColor: isNameValid
                  ? APP_COLORS.greens.green
                  : APP_COLORS.greys.stroke,
              }}
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="space-y-1">
          <label className="text-xs font-black text-slate-800 flex items-center justify-between">
            <span>
              Phone Number <span className="text-red-500">*</span>
            </span>
            {isPhoneValid && (
              <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <Check className="size-3.5 stroke-[3]" /> Valid
              </span>
            )}
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-sm select-none">🇳🇬</span>
            <input
              type="text"
              required
              value={customerPhone}
              onChange={(e) =>
                onCustomerPhoneChange(e.target.value.replace(/\D/g, "").slice(0, 11))
              }
              placeholder="08120600542"
              className="w-full rounded-xl border pl-9 pr-3.5 py-2.5 font-mono text-xs font-bold text-slate-900 bg-white shadow-2xs outline-hidden focus:ring-2 focus:ring-blue-500/20"
              style={{
                borderColor: isPhoneValid
                  ? APP_COLORS.greens.green
                  : APP_COLORS.greys.stroke,
              }}
            />
          </div>
          <span className="text-[10px] text-slate-400">
            Customer will receive an activation SMS confirmation
          </span>
        </div>

        {/* Delivery Address */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">
            Address <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder="e.g. 14 Adeola Odeku St, Victoria Island, Lagos"
            className="w-full rounded-xl border px-3.5 py-2.5 text-xs font-semibold text-slate-900 bg-white shadow-2xs outline-hidden focus:ring-2 focus:ring-blue-500/20"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">
            Email <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="e.g. customer@example.com"
            className="w-full rounded-xl border px-3.5 py-2.5 text-xs font-semibold text-slate-900 bg-white shadow-2xs outline-hidden focus:ring-2 focus:ring-blue-500/20"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          />
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700">
            Notes <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Add any additional notes for reference..."
            className="w-full rounded-xl border px-3.5 py-2 text-xs font-semibold text-slate-900 bg-white shadow-2xs outline-hidden resize-none focus:ring-2 focus:ring-blue-500/20"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        className="flex items-center justify-between pt-4 border-t"
        style={{ borderColor: APP_COLORS.greys.stroke }}
      >
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <ArrowLeft className="size-4" />
          <span>Back: SIM Details</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="px-6 py-2.5 rounded-xl text-xs font-black text-white shadow-xs transition-all flex items-center gap-2 hover:opacity-95 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
        >
          <span>Next: Confirm</span>
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
