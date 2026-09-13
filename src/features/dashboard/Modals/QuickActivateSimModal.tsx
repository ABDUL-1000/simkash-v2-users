import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

export interface ActivationFormData {
  iccid: string;
  customerName: string;
  phone: string;
  network: string;
  plan: string;
  cost: string;
}

interface QuickActivateSimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceedToConfirm?: (data: ActivationFormData) => void;
}

export function QuickActivateSimModal({
  open,
  onOpenChange,
  onProceedToConfirm,
}: QuickActivateSimModalProps) {
  const [iccid, setIccid] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [network, setNetwork] = useState("MTN");
  const [plan, setPlan] = useState("Standard 30-Day — ₦2,000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!iccid || !customerName || !phone) return;
    onOpenChange(false);
    onProceedToConfirm?.({
      iccid,
      customerName,
      phone,
      network,
      plan,
      cost: "₦2,000",
    });
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Quick Activate SIM"
      size="md"
      showCloseButton={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* SIM Serial Number (ICCID) */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">
            SIM Serial Number (ICCID)
          </label>
          <input
            type="text"
            placeholder="Enter 20-digit ICCID"
            value={iccid}
            onChange={(e) => setIccid(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs text-[#0F152A] outline-none focus:border-[#2563EB] font-mono"
          />
        </div>

        {/* Customer Name */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">
            Customer Name
          </label>
          <input
            type="text"
            placeholder="Full name as on ID"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="e.g. 08012345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs text-[#0F152A] outline-none focus:border-[#2563EB] font-mono"
          />
        </div>

        {/* Network Selection */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">Network</label>
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs text-[#0F152A] outline-none focus:border-[#2563EB] font-bold"
          >
            <option value="MTN">📶 MTN</option>
            <option value="Airtel">🔴 Airtel</option>
            <option value="Glo">🟢 Glo</option>
            <option value="9mobile">🟢 9mobile</option>
          </select>
        </div>

        {/* Plan Selection */}
        <div className="space-y-1">
          <label className="text-xs font-extrabold text-[#0F152A]">Plan</label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white p-3.5 text-xs text-[#0F152A] outline-none focus:border-[#2563EB] font-bold"
          >
            <option value="Standard 30-Day — ₦2,000">
              Standard 30-Day — ₦2,000
            </option>
            <option value="Premium 60-Day — ₦4,500">
              Premium 60-Day — ₦4,500
            </option>
            <option value="Enterprise Annual — ₦20,000">
              Enterprise Annual — ₦20,000
            </option>
          </select>
        </div>

        {/* Action Buttons (Matching Image 2) */}
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
              disabled={!iccid || !customerName || !phone}
              className="rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition disabled:opacity-50"
            >
              Activate SIM
            </button>
          </div>
        </div>
      </form>
    </AppModal>
  );
}
