import { useState } from "react";
import { Info, Check, ArrowRight } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import type { CustomerItem } from "../types/customer.types";
import { APP_COLORS } from "@/constants/colors";
import { useNavigate } from "react-router-dom";

interface AddCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCustomer: (customer: Partial<CustomerItem>) => void;
  existingCustomers?: CustomerItem[];
}

export function AddCustomerModal({
  open,
  onOpenChange,
  onAddCustomer,
  existingCustomers = [],
}: AddCustomerModalProps) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [nameTouched, setNameTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);

  // Validation
  const isNameValid = name.trim().length >= 2;
  const cleanedPhone = phone.replace(/\D/g, "");
  const isPhoneValid = cleanedPhone.length === 11 || cleanedPhone.length === 10;
  const isPhoneDuplicate = existingCustomers.some((c) => c.phone.includes(cleanedPhone) && cleanedPhone.length >= 10);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNameTouched(true);
    setPhoneTouched(true);

    if (!isNameValid || !isPhoneValid || isPhoneDuplicate) {
      return;
    }

    onAddCustomer({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      simNumber: `070${Math.floor(10000000 + Math.random() * 90000000)}`,
      simType: "POS",
      network: "MTN",
      plan: "30D · Pending",
      status: "Pending",
      activatedDate: "Just now",
      expiryDate: "Pending",
      daysRemaining: 30,
      dataUsed: "0GB",
      totalData: "18GB",
      autoRenew: false,
      commission: 1000,
    });

    onOpenChange(false);
    // Reset
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setNameTouched(false);
    setPhoneTouched(false);
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add Customer"
      description="Add a new customer to your list"
      size="md"
      showCloseButton={true}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Info Box */}
        <div className="flex items-start gap-2.5 rounded-2xl bg-[#EFF6FF] p-3.5 text-xs text-[#1E40AF] leading-relaxed border border-[#BFDBFE]">
          <Info className="size-4 shrink-0 text-[#2563EB] mt-0.5" />
          <p>
            Adding a customer manually lets you track them before or after SIM activation. To earn commission, you must activate a SIM for them.
          </p>
        </div>

        {/* FULL NAME */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Full Name (Required)
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameTouched(true);
              }}
              placeholder="Customer's full name"
              className={`w-full rounded-xl border p-2.5 text-xs text-[#0F152A] focus:outline-hidden focus:ring-1 ${
                nameTouched && !isNameValid
                  ? "border-[#EF4444] focus:ring-[#EF4444]"
                  : nameTouched && isNameValid
                  ? "border-[#10B981] pr-9 focus:ring-[#10B981]"
                  : "border-[#CBD5E1] focus:ring-[#2563EB]"
              }`}
            />
            {nameTouched && isNameValid && (
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#10B981]" />
            )}
          </div>
          {nameTouched && !isNameValid && (
            <p className="text-[10px] font-medium text-[#EF4444]">Please enter customer's full name</p>
          )}
        </div>

        {/* PHONE NUMBER */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Phone Number (Required)
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3 flex items-center gap-1.5 text-xs font-bold text-[#475569]">
              <span>🇳🇬</span>
              <span>+234</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneTouched(true);
              }}
              placeholder="Customer's phone number"
              className={`w-full rounded-xl border py-2.5 pl-18 pr-9 text-xs text-[#0F152A] focus:outline-hidden focus:ring-1 ${
                phoneTouched && (!isPhoneValid || isPhoneDuplicate)
                  ? isPhoneDuplicate
                    ? "border-[#F59E0B] focus:ring-[#F59E0B]"
                    : "border-[#EF4444] focus:ring-[#EF4444]"
                  : phoneTouched && isPhoneValid
                  ? "border-[#10B981] focus:ring-[#10B981]"
                  : "border-[#CBD5E1] focus:ring-[#2563EB]"
              }`}
            />
            {phoneTouched && isPhoneValid && !isPhoneDuplicate && (
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-[#10B981]" />
            )}
          </div>

          {phoneTouched && !isPhoneValid && (
            <p className="text-[10px] font-medium text-[#EF4444]">Enter a valid 11-digit phone number</p>
          )}

          {phoneTouched && isPhoneDuplicate && (
            <div className="flex items-center justify-between rounded-xl bg-[#FFFBEB] p-2 text-[10px] text-[#D97706] border border-[#FDE68A]">
              <span>⚠️ This number is already in your customer list.</span>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="font-bold underline text-[#2563EB]"
              >
                View Customer
              </button>
            </div>
          )}
        </div>

        {/* EMAIL */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Email (Optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="customer@email.com"
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-2.5 text-xs text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
          />
        </div>

        {/* ADDRESS */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-wider text-[#8C909B]">
            Address (Optional)
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Customer's address"
            className="w-full rounded-xl border border-[#CBD5E1] bg-white p-2.5 text-xs text-[#0F152A] focus:outline-hidden focus:ring-1 focus:ring-[#2563EB]"
          />
          <p className="text-[10px] text-[#8C909B]">Useful for delivery and records</p>
        </div>

        {/* Bottom Banner */}
        <div className="flex items-center justify-between rounded-2xl bg-[#F8FAFC] border border-[#E2ECF6] p-3 text-[11px] text-[#475569]">
          <div className="flex items-center gap-2">
            <Info className="size-3.5 text-[#2563EB] shrink-0" />
            <span>Want to activate a SIM now? Use Activate New SIM instead.</span>
          </div>
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              navigate("/sim-activation");
            }}
            className="flex items-center gap-1 font-bold text-[#2563EB] hover:underline shrink-0"
          >
            Activate SIM <ArrowRight className="size-3" />
          </button>
        </div>

        {/* Footer Actions */}
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
            Add Customer
          </button>
        </div>
      </form>
    </AppModal>
  );
}
