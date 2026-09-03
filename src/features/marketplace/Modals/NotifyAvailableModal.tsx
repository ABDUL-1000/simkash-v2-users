import { useState } from "react";
import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

interface NotifyAvailableModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
  price?: number;
}

export function NotifyAvailableModal({
  open,
  onOpenChange,
  productName = "Hikvision 4MP Camera",
  price = 89999,
}: NotifyAvailableModalProps) {
  const [pref, setPref] = useState<"push" | "email" | "sms">("push");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSetNotification = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onOpenChange(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={handleClose}
      title="Notify When Available"
      description={productName}
      size="md"
    >
      <div className="space-y-4 pt-1">
        {/* Out of Stock Card */}
        <div className="flex items-center gap-3.5 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
          <div className="size-12 rounded-xl bg-white flex items-center justify-center text-xl shrink-0">
            📹
          </div>
          <div>
            <h4 className="font-extrabold text-[#0F152A]">{productName}</h4>
            <p className="text-[#8C909B]">₦{price.toLocaleString()} · <span className="text-[#EF4444] font-bold">Out of Stock</span></p>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
            NOTIFICATION PREFERENCES
          </label>

          <div className="space-y-2">
            {[
              { id: "push", label: "Push notification" },
              { id: "email", label: "Email notification" },
              { id: "sms", label: "SMS notification" },
            ].map((opt) => {
              const isSelected = pref === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setPref(opt.id as any)}
                  className={`cursor-pointer flex items-center gap-3 rounded-2xl border p-3.5 transition ${
                    isSelected
                      ? "border-[#2563EB] bg-[#EFF4F8] ring-1 ring-[#2563EB]"
                      : "border-[#E2ECF6] bg-white hover:border-slate-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="notifyPref"
                    checked={isSelected}
                    onChange={() => setPref(opt.id as any)}
                    className="size-4 accent-[#2563EB]"
                  />
                  <span className="text-xs font-bold text-[#0F152A]">{opt.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Banner */}
        {isSuccess && (
          <div className="rounded-2xl bg-[#EBFFF8] p-3 text-xs text-[#10B981] font-bold flex items-center gap-2">
            <Check className="size-4 shrink-0 stroke-[3]" />
            <span>You'll be notified when this item is back in stock.</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSetNotification}
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Set Notification
          </button>
        </div>
      </div>
    </AppModal>
  );
}
