import { AppModal } from "@/components/common/AppModal";

interface SolarCctvQuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quoteRef?: string;
  totalPrice?: number;
}

export function SolarCctvQuoteModal({
  open,
  onOpenChange,
  quoteRef = "SOL-2026-00848",
  totalPrice = 1209000,
}: SolarCctvQuoteModalProps) {
  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Your Solar CCTV Quote"
      description="Download or share your design"
      size="md"
    >
      <div className="space-y-4 pt-1">
        {/* Printable Document Box */}
        <div className="rounded-2xl border-2 border-[#0F152A] bg-white p-5 text-xs space-y-4 shadow-sm">
          <h4 className="text-center font-extrabold tracking-wider text-[#0F152A] text-sm uppercase">
            SIMKASH SOLAR CCTV QUOTE
          </h4>

          <div className="divide-y divide-[#E2ECF6] text-xs">
            <div className="flex justify-between py-1.5 first:pt-0">
              <span className="text-[#8C909B]">Ref:</span>
              <span className="font-mono font-bold text-[#0F152A]">{quoteRef}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8C909B]">Date:</span>
              <span className="font-bold text-[#0F152A]">24 Jun 2026</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[#8C909B]">Customer:</span>
              <span className="font-bold text-[#0F152A]">Yusuf Adam Baba</span>
            </div>
            <div className="flex justify-between py-1.5 last:pb-0">
              <span className="text-[#8C909B]">System:</span>
              <span className="font-bold text-[#0F152A]">Standard Tier · 3.2KVA</span>
            </div>
          </div>

          {/* Breakdown Items */}
          <div className="divide-y divide-[#E2ECF6] border-t border-b border-[#E2ECF6] py-2 text-xs">
            <div className="flex justify-between py-1 text-[#0F152A]">
              <span>3× 400W Mono PERC Panel</span>
              <span className="font-extrabold">₦255,000</span>
            </div>
            <div className="flex justify-between py-1 text-[#0F152A]">
              <span>4× 12V 200Ah AGM Battery</span>
              <span className="font-extrabold">₦640,000</span>
            </div>
            <div className="flex justify-between py-1 text-[#0F152A]">
              <span>1× 3.5KVA Inverter</span>
              <span className="font-extrabold">₦185,000</span>
            </div>
            <div className="flex justify-between py-1 text-[#0F152A]">
              <span>1× 40A MPPT Controller</span>
              <span className="font-extrabold">₦32,000</span>
            </div>
            <div className="flex justify-between py-1 text-[#0F152A]">
              <span>CCTV SIM ×4</span>
              <span className="font-extrabold">₦20,000/mo</span>
            </div>
            <div className="flex justify-between py-1 text-[#0F152A]">
              <span>Installation</span>
              <span className="font-extrabold">₦48,000</span>
            </div>
          </div>

          <div className="flex items-center justify-between font-extrabold text-base pt-1">
            <span className="text-[#0F152A]">Total Estimate:</span>
            <span className="text-[#10B981]">₦{totalPrice.toLocaleString()}</span>
          </div>

          <p className="text-[10px] text-[#8C909B] text-center">
            Valid for 30 days · Prices subject to availability
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            className="rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Download PDF
          </button>
          <button
            type="button"
            className="rounded-xl bg-[#EBFFF8] border border-[#10B981] py-2.5 text-xs font-bold text-[#10B981] hover:bg-emerald-100"
          >
            WhatsApp
          </button>
          <button
            type="button"
            className="rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            Email
          </button>
        </div>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-xs font-bold text-[#8C909B] hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </AppModal>
  );
}
