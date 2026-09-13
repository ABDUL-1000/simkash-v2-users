import { useState, useEffect } from "react";
import { Check, AlertTriangle } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { CustomerItem, CustomerFormData } from "../types/customer.types";
import { APP_COLORS } from "@/constants/colors";

interface EditCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: CustomerItem | null;
  onSaveCustomer: (updatedData: CustomerFormData) => void;
}

export function EditCustomerModal({
  open,
  onOpenChange,
  customer,
  onSaveCustomer,
}: EditCustomerModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showSavedSuccess, setShowSavedSuccess] = useState(false);

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setPhone(customer.phone);
      setEmail(customer.email || "");
      setAddress(customer.address || "");
      setShowSavedSuccess(false);
    }
  }, [customer]);

  if (!customer) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveCustomer({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
    });
    setShowSavedSuccess(true);
    setTimeout(() => {
      onOpenChange(false);
      setShowSavedSuccess(false);
    }, 800);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Customer"
      description={`${customer.name} · ${customer.phone}`}
      size="md"
      showCloseButton={true}
    >
      <form onSubmit={handleSave} className="space-y-4 pt-1 text-xs">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-2.5 text-xs text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Phone Number
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 flex items-center gap-1.5 text-xs font-bold text-[#475569]">
              <span>🇳🇬</span>
              <span>+234</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 pl-18 pr-3 text-xs text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-2.5 text-xs text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
          />
        </div>

        {/* Address */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Address
          </label>
          <textarea
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-2.5 text-xs text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
          />
        </div>

        {/* Warning Banner */}
        <div className="flex items-start gap-2.5 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3 text-xs text-[#854D0E]">
          <AlertTriangle className="size-4 shrink-0 text-[#D97706] mt-0.5" />
          <span>Editing phone number will update all records for this customer.</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-[#E2ECF6]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border border-[#CBD5E1] bg-white px-5 py-2.5 text-xs font-bold text-[#475569] transition hover:bg-[#F1F5F9]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-[#2563EB] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#1D4ED8]"
            style={{ backgroundColor: APP_COLORS.blues.interactiveCta }}
          >
            Save Changes
          </button>
        </div>

        {/* Success confirmation strip */}
        {showSavedSuccess && (
          <div className="flex items-center justify-center gap-1.5 rounded-xl bg-[#EBFFF8] py-2.5 text-xs font-bold text-[#10B981] animate-in fade-in duration-200">
            <Check className="size-4 stroke-[3]" />
            <span>Changes Saved!</span>
          </div>
        )}
      </form>
    </AppModal>
  );
}
