import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

interface ApRequestPayoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBalance?: string;
  bankName?: string;
  accountNumber?: string;
  onRequestSuccess?: (amount: string) => void;
}

export function ApRequestPayoutModal({
  open,
  onOpenChange,
  availableBalance = "₦8,200",
  bankName = "Access Bank",
  accountNumber = "****0476",
  onRequestSuccess,
}: ApRequestPayoutModalProps) {
  const [payoutAmount, setPayoutAmount] = useState(availableBalance);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payoutAmount) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      onRequestSuccess?.(payoutAmount);
    }, 400);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Request Payout"
      size="md"
      showCloseButton={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Dark Navy Available for Payout Banner (Matching Image 5) */}
        <div className="rounded-2xl bg-[#0F152A] p-5 text-white space-y-1 shadow-md">
          <span className="text-xs font-semibold text-[#8C909B]">
            Available for Payout
          </span>
          <h2 className="text-3xl font-black tracking-wide text-white font-sans">
            {availableBalance}
          </h2>
        </div>

        {/* Payout Amount Field */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">
            Payout Amount
          </label>
          <input
            type="text"
            value={payoutAmount}
            onChange={(e) => setPayoutAmount(e.target.value)}
            className="w-full rounded-2xl border-2 border-[#2563EB] bg-white p-3.5 text-sm font-extrabold text-[#0F152A] outline-none font-mono"
          />
        </div>

        {/* Bank Account Selection Box */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">
            Bank Account
          </label>
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-[#0F152A] text-xs">{bankName}</h4>
              <p className="text-[11px] text-[#66738C] font-mono">{accountNumber}</p>
            </div>
            <button
              type="button"
              onClick={() => alert("Bank Account change options coming soon!")}
              className="rounded-lg bg-white border border-[#E2ECF6] px-3 py-1.5 text-xs font-extrabold text-[#2563EB] hover:bg-[#EFF4F8]"
            >
              Change
            </button>
          </div>
        </div>

        {/* Note (Optional) */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">
            Note (Optional)
          </label>
          <input
            type="text"
            placeholder="Add a note to this payout..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
          <p className="text-[11px] text-[#8C909B] font-medium pt-0.5">
            Minimum payout amount: ₦1,000
          </p>
        </div>

        {/* Action Buttons (Matching Image 5) */}
        <div className="pt-3 border-t border-[#E2ECF6]">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-xl bg-[#F1F5F9] py-3 text-xs font-bold text-[#66738C] hover:bg-[#E2ECF6] transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !payoutAmount}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Request Payout"}
            </button>
          </div>
        </div>
      </form>
    </AppModal>
  );
}
