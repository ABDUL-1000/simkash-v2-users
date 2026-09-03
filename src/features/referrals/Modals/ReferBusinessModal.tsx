import { useState } from "react";
import { AppModal } from "@/components/common/AppModal";

interface ReferBusinessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReferralAdded?: () => void;
}

export function ReferBusinessModal({
  open,
  onOpenChange,
  onReferralAdded,
}: ReferBusinessModalProps) {
  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("Corporate");
  const [state, setState] = useState("Lagos");
  const [notes, setNotes] = useState("");
  const [shareMethod, setShareMethod] = useState("WhatsApp");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    onReferralAdded?.();
    alert(`Referral for "${businessName || "New Business"}" registered successfully!`);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Refer a Business"
      description="Enter business details to track your referral"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Info Banner */}
        <div className="rounded-2xl border border-[#D0DFF0] bg-[#EFF4F8] p-3 text-xs text-[#2563EB] font-medium">
          Share your referral link with this business. Once they sign up using your link, you'll earn ₦50,000 when their application is approved.
        </div>

        {/* Business Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Business name *</label>
          <input
            type="text"
            required
            placeholder="Business or company name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Contact Person */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Contact person *</label>
          <input
            type="text"
            required
            placeholder="Decision maker's name"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Phone number *</label>
          <input
            type="tel"
            required
            placeholder="Best number to reach them"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Email (optional)</label>
          <input
            type="email"
            placeholder="Business email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* Business Type */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Business type</label>
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          >
            <option value="Corporate">Corporate</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Technology">Technology</option>
            <option value="Distribution">Distribution</option>
            <option value="Logistics">Logistics</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Trading">Trading</option>
          </select>
        </div>

        {/* State */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">State</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          >
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Kano">Kano</option>
            <option value="Rivers">Rivers</option>
            <option value="Kaduna">Kaduna</option>
            <option value="Oyo">Oyo</option>
          </select>
        </div>

        {/* Notes */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-[#0F152A]">Notes (optional)</label>
          <input
            type="text"
            placeholder="How you know them, any context..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-[#E2ECF6] bg-white py-2.5 px-3.5 text-xs font-semibold text-[#0F152A] outline-none focus:border-[#2563EB]"
          />
        </div>

        {/* How will you share your link? */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-bold text-[#0F152A]">How will you share your link?</label>
          <div className="flex flex-wrap gap-2">
            {["WhatsApp", "SMS", "Email", "In person"].map((method) => {
              const isSelected = shareMethod === method;
              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => setShareMethod(method)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                    isSelected
                      ? "border border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]"
                      : "border border-[#E2ECF6] bg-white text-[#8C909B] hover:bg-slate-50"
                  }`}
                >
                  {method}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end border-t border-[#E2ECF6] pt-4 gap-3">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
          >
            Add Referral
          </button>
        </div>
      </form>
    </AppModal>
  );
}
