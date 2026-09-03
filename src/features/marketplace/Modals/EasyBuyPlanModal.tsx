import { Check } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";
import { useState } from "react";

interface EasyBuyPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
  productPrice?: number;
}

export function EasyBuyPlanModal({
  open,
  onOpenChange,
  productName = "Hikvision 4MP Camera",
  productPrice = 89999,
}: EasyBuyPlanModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleApply = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onOpenChange(false);
  };

  const successDetails: SuccessDetailItem[] = [
    { label: "Product", value: productName },
    { label: "Initial Deposit", value: "₦30,000" },
    { label: "Monthly Instalment", value: "₦22,000 × 3 months" },
    { label: "Total Cost", value: "₦96,000" },
    { label: "Approval Status", value: "Approved & Pre-authorised" },
  ];

  return (
    <>
      <AppModal
        open={open && !isSuccess}
        onOpenChange={handleClose}
        title="EasyBuy Plan"
        description={`${productName} · ₦${productPrice.toLocaleString()}`}
        size="md"
      >
        <div className="space-y-4 pt-1">
          {/* Plan Breakdown Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-2">
            <h4 className="font-extrabold text-sm text-[#0F152A]">3-Month Plan</h4>
            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="flex justify-between py-1.5 first:pt-0 text-[#66738C]">
                <span>Initial deposit</span>
                <span className="font-extrabold text-[#0F152A]">₦30,000</span>
              </div>
              <div className="flex justify-between py-1.5 text-[#66738C]">
                <span>Monthly payment</span>
                <span className="font-extrabold text-[#0F152A]">₦22,000 × 3</span>
              </div>
              <div className="flex justify-between py-1.5 text-[#66738C]">
                <span>Total cost</span>
                <span className="font-extrabold text-[#0F152A]">₦96,000</span>
              </div>
              <div className="flex justify-between py-1.5 last:pb-0 text-[#66738C]">
                <span>Interest</span>
                <span className="font-bold text-[#0F152A]">₦6,001 (6.7%)</span>
              </div>
            </div>
          </div>

          {/* Eligibility Check List */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              ELIGIBILITY CHECK
            </label>
            <div className="space-y-2 text-xs font-semibold text-[#0F152A]">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-[#10B981] stroke-[3]" />
                <span>Identity verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-[#10B981] stroke-[3]" />
                <span>Address confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-[#10B981] stroke-[3]" />
                <span>Income assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="size-4 text-[#10B981] stroke-[3]" />
                <span>Credit score check</span>
              </div>
            </div>
          </div>

          {/* Terms Box */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3 text-[11px] text-[#66738C] leading-relaxed">
            By proceeding, you agree to EasyBuy Terms & Conditions. Late payments incur a 2% fee.
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
              onClick={handleApply}
              className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Apply for EasyBuy
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Modal */}
      <TransactionSuccessModal
        open={open && isSuccess}
        onOpenChange={handleClose}
        title="EasyBuy Plan Approved!"
        subtitle="Your instalment plan has been activated"
        details={successDetails}
        walletBalanceText="SimKash EasyBuy Finance"
        doneButtonText="Done"
        onDone={handleClose}
      />
    </>
  );
}
