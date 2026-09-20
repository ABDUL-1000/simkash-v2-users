import { useState, useRef } from "react";
import { AppModal } from "@/components/common/AppModal";
import { APP_COLORS } from "@/constants/colors";
import { Send, ChevronUp } from "lucide-react";

interface BulkActivationRecord {
  simLast4: string;
  customer: string;
  network: string;
  plan: string;
  price: string;
}

interface CaBulkActivationConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalCount?: number;
  totalCommission?: number;
  onConfirmSuccess: () => void;
}

export function CaBulkActivationConfirmModal({
  open,
  onOpenChange,
  totalCount = 12,
  totalCommission = 6000,
  onConfirmSuccess,
}: CaBulkActivationConfirmModalProps) {
  const [pin, setPin] = useState(["•", "•", "", ""]);
  const [showAllRows, setShowAllRows] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const pinInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const sampleRows: BulkActivationRecord[] = [
    { simLast4: "2841", customer: "Chidi Okafor", network: "MTN", plan: "1GB 30d", price: "₦500" },
    { simLast4: "3302", customer: "Funmi Adeleke", network: "Glo", plan: "500MB 7d", price: "₦200" },
    { simLast4: "5509", customer: "Emeka Eze", network: "Airtel", plan: "2GB 30d", price: "₦800" },
    { simLast4: "7718", customer: "Bola Adesanya", network: "9mobile", plan: "3GB 30d", price: "₦1,200" },
    { simLast4: "0034", customer: "Ngozi Amaka", network: "MTN", plan: "1GB 30d", price: "₦500" },
    // Expanded rows
    { simLast4: "1129", customer: "Usman Bello", network: "Glo", plan: "1GB 30d", price: "₦500" },
    { simLast4: "9942", customer: "Aisha Mohammed", network: "MTN", plan: "2GB 30d", price: "₦800" },
    { simLast4: "4481", customer: "David Adeleke", network: "Airtel", plan: "3GB 30d", price: "₦1,200" },
    { simLast4: "8831", customer: "Blessing Okon", network: "9mobile", plan: "1GB 30d", price: "₦500" },
    { simLast4: "7210", customer: "Samuel Kalu", network: "MTN", plan: "500MB 7d", price: "₦200" },
    { simLast4: "6632", customer: "Fatima Sani", network: "Glo", plan: "2GB 30d", price: "₦800" },
    { simLast4: "1894", customer: "Tunde Oladipo", network: "MTN", plan: "1GB 30d", price: "₦500" },
  ];

  const visibleRows = showAllRows ? sampleRows : sampleRows.slice(0, 5);

  const handlePinChange = (index: number, value: string) => {
    const updated = [...pin];
    updated[index] = value ? "•" : "";
    setPin(updated);

    if (value && index < 3) {
      pinInputRefs[index + 1].current?.focus();
    }
  };

  const handleConfirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onOpenChange(false);
      onConfirmSuccess();
    }, 800);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      showCloseButton={true}
    >
      <div className="flex flex-col items-center text-center space-y-4 pt-1">
        {/* Paper Airplane Top Icon */}
        <div
          className="size-16 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: APP_COLORS.blues.surfaceLight,
            color: APP_COLORS.blues.primary,
          }}
        >
          <Send className="size-8 stroke-[2.5] -rotate-12 translate-x-0.5" />
        </div>

        {/* Header Text */}
        <div className="space-y-1">
          <h2
            className="text-xl sm:text-2xl font-black tracking-tight"
            style={{ color: APP_COLORS.texts.primary }}
          >
            Confirm Bulk Activation
          </h2>
          <p
            className="text-xs sm:text-sm font-medium"
            style={{ color: APP_COLORS.texts.slate }}
          >
            Review {totalCount} activations before confirming. Total commission: ₦
            {totalCommission.toLocaleString()}.
          </p>
        </div>

        {/* Table of activations */}
        <div
          className="w-full rounded-2xl border overflow-hidden text-xs text-left bg-white"
          style={{ borderColor: APP_COLORS.greys.stroke }}
        >
          <table className="w-full border-collapse">
            <thead>
              <tr
                className="border-b text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-50/70"
                style={{ borderColor: APP_COLORS.greys.stroke }}
              >
                <th className="py-2.5 px-3">SIM</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Network</th>
                <th className="py-2.5 px-3">Plan</th>
                <th className="py-2.5 px-3 text-right">₦</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: APP_COLORS.backgrounds.surface }}>
              {visibleRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                    •••• {row.simLast4}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-800">
                    {row.customer}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-700">
                    {row.network}
                  </td>
                  <td className="py-2.5 px-3 font-medium text-slate-500">
                    {row.plan}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-slate-900 text-right">
                    {row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Toggle + 7 more activations */}
          <button
            type="button"
            onClick={() => setShowAllRows(!showAllRows)}
            className="w-full py-2.5 px-3 bg-slate-50/75 border-t text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center justify-start gap-1 cursor-pointer transition-colors"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            {showAllRows ? (
              <>
                <ChevronUp className="size-3.5" />
                <span>Show less</span>
              </>
            ) : (
              <>
                <span>+ 7 more activations</span>
              </>
            )}
          </button>
        </div>

        {/* 4-Digit PIN Confirmation */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-slate-500 block">
            Enter your 4-digit PIN to confirm
          </label>

          <div className="flex items-center justify-center gap-2.5">
            {[0, 1, 2, 3].map((idx) => {
              const val = pin[idx];
              const isFilled = Boolean(val && val !== "—");

              return (
                <div
                  key={idx}
                  className="size-12 rounded-xl border bg-white flex items-center justify-center font-black text-lg transition-all focus-within:ring-2 focus-within:ring-blue-500/20"
                  style={{
                    borderColor: isFilled
                      ? APP_COLORS.blues.interactiveCta
                      : APP_COLORS.greys.stroke,
                    backgroundColor: isFilled ? "#FFFFFF" : "#F8FAFC",
                  }}
                >
                  <input
                    ref={pinInputRefs[idx]}
                    type="password"
                    maxLength={1}
                    value={val === "•" ? "1" : ""}
                    onChange={(e) => handlePinChange(idx, e.target.value)}
                    className="w-full h-full text-center bg-transparent outline-hidden font-mono text-xl"
                    style={{ color: APP_COLORS.texts.primary }}
                  />
                  {val === "•" && (
                    <span className="pointer-events-none absolute text-xl font-black">
                      •
                    </span>
                  )}
                  {(!val || val === "—") && (
                    <span className="pointer-events-none absolute text-slate-300">
                      —
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="w-full grid grid-cols-2 gap-3 pt-3 border-t" style={{ borderColor: APP_COLORS.greys.stroke }}>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className="w-full py-3 rounded-xl text-xs font-bold text-white shadow-xs transition-opacity hover:opacity-95 disabled:opacity-50 cursor-pointer"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            {submitting ? "Confirming..." : `Confirm All (${totalCount})`}
          </button>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={submitting}
            className="w-full py-3 rounded-xl border text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            style={{ borderColor: APP_COLORS.greys.stroke }}
          >
            Cancel
          </button>
        </div>
      </div>
    </AppModal>
  );
}
