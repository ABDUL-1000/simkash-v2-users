import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { UserPlus, Check } from "lucide-react";

interface AddNewCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCustomerAdded: (customer: {
    name: string;
    phone: string;
    stateLocation: string;
    productType: string;
    simNumber: string;
  }) => void;
}

export const AddNewCustomerModal: React.FC<AddNewCustomerModalProps> = ({
  open,
  onOpenChange,
  onCustomerAdded,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [stateLocation, setStateLocation] = useState("Lagos");
  const [productType, setProductType] = useState("POS SIM");
  const [simNumber, setSimNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    onCustomerAdded({ name, phone, stateLocation, productType, simNumber });
    onOpenChange(false);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <form onSubmit={handleSubmit} className="space-y-3.5 pt-1 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <UserPlus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Add New Customer</h3>
            <p className="text-xs text-slate-400">Register and assign a product to an end customer</p>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Chinedu Okafor"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-xs focus:border-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08012345678"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-xs focus:border-blue-500 outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              State Location
            </label>
            <select
              value={stateLocation}
              onChange={(e) => setStateLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium text-xs bg-white focus:border-blue-500 outline-none"
            >
              {["Lagos", "Abuja FCT", "Kano", "Rivers", "Ogun", "Oyo", "Kaduna", "Enugu"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Product Assigned
          </label>
          <div className="grid grid-cols-4 gap-2">
            {["POS SIM", "CCTV SIM", "GPS SIM", "Router SIM"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setProductType(p)}
                className={`py-2 rounded-xl border text-[11px] font-bold transition ${
                  productType === p
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            11-Digit SIM Number (Optional)
          </label>
          <input
            type="text"
            value={simNumber}
            onChange={(e) => setSimNumber(e.target.value)}
            placeholder="07032222222"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:border-blue-500 outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-xs inline-flex items-center justify-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Register Customer</span>
          </button>
        </div>
      </form>
    </AppModal>
  );
};
