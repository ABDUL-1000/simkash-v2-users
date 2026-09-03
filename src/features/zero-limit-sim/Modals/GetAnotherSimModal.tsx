import { useState } from "react";
import { Info } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { TransactionSuccessModal, type SuccessDetailItem } from "@/components/common/TransactionSuccessModal";

interface GetAnotherSimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GetAnotherSimModal({ open, onOpenChange }: GetAnotherSimModalProps) {
  const [selectedPkgKey, setSelectedPkgKey] = useState<string>("20GB");
  const [isSuccess, setIsSuccess] = useState(false);

  const packages: Record<string, { size: string; price: number; badge?: string }> = {
    "5GB": { size: "5GB", price: 2000 },
    "10GB": { size: "10GB", price: 3500 },
    "20GB": { size: "20GB", price: 6000, badge: "POPULAR" },
    "50GB": { size: "50GB", price: 13000 },
    "100GB": { size: "100GB", price: 24000, badge: "BEST VALUE" },
    "Unlimited": { size: "Unlimited", price: 35000 },
  };

  const activePkg = packages[selectedPkgKey] || packages["20GB"];
  const simCost = 500;
  const totalPrice = activePkg.price + simCost;

  const handleRequestSim = () => {
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onOpenChange(false);
  };

  const successDetails: SuccessDetailItem[] = [
    { label: "Data Plan", value: activePkg.size },
    { label: "SIM Cost", value: `₦${simCost}` },
    { label: "Total Amount", value: `₦${totalPrice.toLocaleString()}` },
    { label: "Delivery", value: "Physical SIM (2-3 business days)" },
    { label: "Order Ref", value: "#ZLS-2026-9021" },
  ];

  return (
    <>
      <AppModal
        open={open && !isSuccess}
        onOpenChange={handleClose}
        title="Get a ZeroLimit SIM"
        description="MTN Nigeria · 120GB Fixed Plan"
        size="md"
      >
        <div className="space-y-5 pt-1">
          {/* How It Works Container */}
          <div className="rounded-2xl border border-[#D0DFF0] bg-[#EFF4F8] p-4 text-xs text-[#2563EB] space-y-2">
            <h4 className="font-extrabold uppercase tracking-wider flex items-center gap-1.5 text-[11px]">
              <Info className="size-4" /> HOW IT WORKS
            </h4>
            <div className="space-y-1.5 text-[#0F152A]">
              <div className="flex items-center gap-2">
                <span className="flex size-4 items-center justify-center rounded-full bg-[#2563EB] text-[9px] font-bold text-white">1</span>
                <span>Request a ZeroLimit SIM below</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex size-4 items-center justify-center rounded-full bg-[#2563EB] text-[9px] font-bold text-white">2</span>
                <span>SimKash assigns you an MTN SIM with a linked phone number (MSISDN)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex size-4 items-center justify-center rounded-full bg-[#2563EB] text-[9px] font-bold text-white">3</span>
                <span>You can monitor data balance and status on this screen in real time</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex size-4 items-center justify-center rounded-full bg-[#2563EB] text-[9px] font-bold text-white">4</span>
                <span>Top up via SimKash when your data runs low</span>
              </div>
            </div>
          </div>

          {/* Select Data Plan Grid */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8C909B]">
              SELECT DATA PLAN
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              {Object.entries(packages).map(([key, pkg]) => {
                const isSelected = selectedPkgKey === key;
                return (
                  <div
                    key={key}
                    onClick={() => setSelectedPkgKey(key)}
                    className={`cursor-pointer relative flex flex-col justify-between rounded-2xl border p-3.5 transition ${
                      isSelected
                        ? "border-[#2563EB] bg-[#EFF4F8] ring-2 ring-[#2563EB]"
                        : "border-[#E2ECF6] bg-white hover:border-slate-300"
                    }`}
                  >
                    {pkg.badge && (
                      <span className="absolute -top-2 left-2 rounded-md bg-[#F59E0B] px-1.5 py-0.5 text-[8px] font-extrabold text-white">
                        {pkg.badge}
                      </span>
                    )}
                    <div>
                      <h4 className="text-base font-extrabold text-[#0F152A]">{pkg.size}</h4>
                      <p className="text-[10px] text-[#8C909B]">Data Plan</p>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-extrabold text-[#2563EB]">
                        ₦{pkg.price.toLocaleString()}
                      </span>
                      <p className="text-[9px] text-[#8C909B]">Top Up</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-[#8C909B] italic">
              First top-up amount — you can top up more anytime
            </p>
          </div>

          {/* SIM Details Box */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 text-xs space-y-1">
            <h5 className="font-bold text-[#8C909B] text-[10px] uppercase tracking-wider">
              SIM DETAILS
            </h5>
            <p className="text-[#0F152A] font-medium">• Physical SIM: Delivered to you within 2–3 business days</p>
            <p className="text-[#0F152A] font-medium">• eSIM (if supported): Instant activation</p>
          </div>

          {/* Price Calculation Card */}
          <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs">
            <div className="flex justify-between py-1.5 first:pt-0">
              <span className="text-[#8C909B]">Selected plan</span>
              <span className="font-bold text-[#0F152A]">{activePkg.size} · ₦{activePkg.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8C909B]">SIM cost</span>
              <span className="font-bold text-[#0F152A]">₦{simCost}</span>
            </div>
            <div className="flex justify-between py-2 pt-3 font-extrabold text-sm">
              <span className="text-[#0F152A]">Total</span>
              <span className="text-[#2563EB]">₦{totalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleRequestSim}
              className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Request SIM
            </button>
          </div>
        </div>
      </AppModal>

      {/* Success Modal */}
      <TransactionSuccessModal
        open={open && isSuccess}
        onOpenChange={handleClose}
        title="ZeroLimit SIM Requested!"
        subtitle="Your order has been placed successfully"
        details={successDetails}
        walletBalanceText="Wallet: ₦43,500"
        doneButtonText="Done"
        onDone={handleClose}
      />
    </>
  );
}
