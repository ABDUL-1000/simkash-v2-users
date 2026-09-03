import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, Sun, Wrench } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";

interface AddSystemToCartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  systemTier?: string;
  hardwarePrice?: number;
}

export function AddSystemToCartModal({
  open,
  onOpenChange,
  systemTier = "Standard Tier · 3.2KVA",
  hardwarePrice = 1112000,
}: AddSystemToCartModalProps) {
  const navigate = useNavigate();

  const [includeInstallation, setIncludeInstallation] = useState(true);
  const [includeSims, setIncludeSims] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const installationPrice = includeInstallation ? 48000 : 0;
  const wiringPrice = 25000;
  const mountingPrice = 24000;
  const totalPrice = hardwarePrice + installationPrice + wiringPrice + mountingPrice;

  const handleAddToCart = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onOpenChange(false);
  };

  const successDetails: SuccessDetailItem[] = [
    { label: "System Config", value: systemTier },
    { label: "Hardware Subtotal", value: `₦${hardwarePrice.toLocaleString()}` },
    { label: "Installation Included", value: includeInstallation ? "Yes (₦48,000)" : "No" },
    { label: "CCTV SIMs", value: includeSims ? "4 × MTN (₦20,000/mo)" : "None" },
    { label: "Total Added to Cart", value: `₦${totalPrice.toLocaleString()}` },
  ];

  return (
    <>
      <AppModal
        open={open && !isSuccess}
        onOpenChange={handleClose}
        title="Add System to Cart"
        description={systemTier}
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* Top Hero Card */}
          <div className="flex items-center gap-3.5 rounded-2xl border border-[#2563EB] bg-[#EFF4F8] p-4 text-xs">
            <div className="flex size-12 items-center justify-center rounded-xl bg-[#2563EB] text-white shrink-0">
              <Sun className="size-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#0F152A]">{systemTier}</h4>
              <p className="text-[#66738C] text-[11px]">
                Complete solar power & CCTV monitoring bundle
              </p>
            </div>
          </div>

          {/* Configuration Options */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              SYSTEM OPTIONS
            </label>

            {/* Include Professional Installation */}
            <div
              onClick={() => setIncludeInstallation(!includeInstallation)}
              className={`cursor-pointer flex items-center justify-between rounded-2xl border p-3.5 transition ${
                includeInstallation
                  ? "border-[#2563EB] bg-[#EFF4F8]"
                  : "border-[#E2ECF6] bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={includeInstallation}
                  onChange={() => setIncludeInstallation(!includeInstallation)}
                  className="size-4 accent-[#2563EB]"
                />
                <div>
                  <h5 className="text-xs font-bold text-[#0F152A] flex items-center gap-1.5">
                    <Wrench className="size-3.5 text-[#2563EB]" /> Include Professional Installation
                  </h5>
                  <p className="text-[10px] text-[#8C909B]">By certified Simkash installer · Within 48 hours</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#0F152A]">₦48,000</span>
            </div>

            {/* Include CCTV SIMs */}
            <div
              onClick={() => setIncludeSims(!includeSims)}
              className={`cursor-pointer flex items-center justify-between rounded-2xl border p-3.5 transition ${
                includeSims
                  ? "border-[#10B981] bg-[#EBFFF8]"
                  : "border-[#E2ECF6] bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={includeSims}
                  onChange={() => setIncludeSims(!includeSims)}
                  className="size-4 accent-[#10B981]"
                />
                <div>
                  <h5 className="text-xs font-bold text-[#0F152A]">Include 4 × CCTV SIMs</h5>
                  <p className="text-[10px] text-[#8C909B]">MTN remote monitoring data SIMs</p>
                </div>
              </div>
              <span className="text-xs font-extrabold text-[#10B981]">₦20,000/mo</span>
            </div>
          </div>

          {/* Price Summary Breakdown */}
          <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
            <div className="flex justify-between py-1.5 first:pt-0 text-[#66738C]">
              <span>Hardware components</span>
              <span className="font-extrabold text-[#0F152A]">₦{hardwarePrice.toLocaleString()}</span>
            </div>
            {includeInstallation && (
              <div className="flex justify-between py-1.5 text-[#66738C]">
                <span>Installation fee</span>
                <span className="font-extrabold text-[#0F152A]">₦48,000</span>
              </div>
            )}
            <div className="flex justify-between py-1.5 text-[#66738C]">
              <span>Wiring & cable kit</span>
              <span className="font-extrabold text-[#0F152A]">₦25,000</span>
            </div>
            <div className="flex justify-between py-1.5 text-[#66738C]">
              <span>Solar mounting kit</span>
              <span className="font-extrabold text-[#0F152A]">₦24,000</span>
            </div>
            <div className="flex justify-between py-2 pt-2 border-t border-[#E2ECF6] font-extrabold text-sm text-[#10B981]">
              <span>Total Package Price</span>
              <span>₦{totalPrice.toLocaleString()}</span>
            </div>
          </div>

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
              onClick={handleAddToCart}
              className="flex items-center gap-2 rounded-xl bg-[#10B981] px-8 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-emerald-600"
            >
              <ShoppingBag className="size-4" /> Confirm & Add to Cart
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Receipt Modal */}
      <TransactionSuccessModal
        open={open && isSuccess}
        onOpenChange={() => {
          handleClose();
          navigate("/marketplace/cart");
        }}
        title="Added to Cart!"
        subtitle="Your Solar CCTV system package is now in your shopping cart"
        details={successDetails}
        walletBalanceText="SimKash Cart Bureau"
        doneButtonText="View Cart"
        onDone={() => {
          handleClose();
          navigate("/marketplace/cart");
        }}
      />
    </>
  );
}
