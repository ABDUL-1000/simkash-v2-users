import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { UserPlus, Plus, Minus, Send } from "lucide-react";
import type { OnboardScFormData } from "../../types";

interface OnboardNewScModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (data: OnboardScFormData) => void;
}

export const OnboardNewScModal: React.FC<OnboardNewScModalProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  const [form, setForm] = useState<OnboardScFormData>({
    fullName: "",
    phone: "",
    email: "",
    state: "Lagos",
    lga: "Ikeja",
    commissionRate: 0.08,
    posSims: 50,
    cctvSims: 20,
    gpsSims: 15,
    routerSims: 10,
  });

  const totalSims = form.posSims + form.cctvSims + form.gpsSims + form.routerSims;

  const updateSim = (field: "posSims" | "cctvSims" | "gpsSims" | "routerSims", delta: number) => {
    setForm((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] + delta),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    onSuccess(form);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="lg" footer={null}>
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        {/* Header */}
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Onboard State Coordinator</h3>
            <p className="text-xs text-slate-500">Register and assign territory to a new coordinator</p>
          </div>
        </div>

        {/* Basic Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Babatunde Fashola"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-xs focus:bg-white focus:outline-blue-600"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="08012345678"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-xs focus:bg-white focus:outline-blue-600"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="name@simkash.ng"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-xs focus:bg-white focus:outline-blue-600"
            />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">Assigned State</label>
            <select
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl bg-slate-50 text-xs focus:bg-white focus:outline-blue-600"
            >
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Kano">Kano</option>
              <option value="Rivers">Rivers</option>
              <option value="Oyo">Oyo</option>
              <option value="Kaduna">Kaduna</option>
            </select>
          </div>
        </div>

        {/* Commission Rate */}
        <div>
          <label className="text-[11px] font-semibold text-slate-700 block mb-1.5">
            Coordinator Commission Rate
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[0.05, 0.08, 0.1, 0.12, 0.15].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => setForm({ ...form, commissionRate: rate })}
                className={`py-2 rounded-xl text-xs font-semibold border transition ${
                  form.commissionRate === rate
                    ? "bg-[#1F3A5F] text-white border-[#1F3A5F]"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {(rate * 100).toFixed(0)}%{rate === 0.08 ? " (Default)" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Initial SIM Allocation */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Initial SIM Allocation</span>
            <span className="text-xs font-bold text-blue-700">{totalSims} Total SIMs</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { key: "posSims", label: "POS SIMs", val: form.posSims },
              { key: "cctvSims", label: "CCTV SIMs", val: form.cctvSims },
              { key: "gpsSims", label: "GPS SIMs", val: form.gpsSims },
              { key: "routerSims", label: "Router SIMs", val: form.routerSims },
            ].map((sim) => (
              <div key={sim.key} className="p-2 rounded-lg bg-white border border-slate-200 space-y-1">
                <span className="text-[10px] text-slate-500 font-medium">{sim.label}</span>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => updateSim(sim.key as any, -5)}
                    className="w-5 h-5 rounded flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-slate-900">{sim.val}</span>
                  <button
                    type="button"
                    onClick={() => updateSim(sim.key as any, 5)}
                    className="w-5 h-5 rounded flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1F3A5F] text-white font-bold hover:bg-slate-800"
          >
            <Send className="w-4 h-4" />
            <span>Send Onboarding Invite</span>
          </button>
        </div>
      </form>
    </AppModal>
  );
};
