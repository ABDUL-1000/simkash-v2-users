import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Check, UserCheck } from "lucide-react";
import type { AssignSimFormData } from "../types";

interface AssignSimModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssignSubmitted: (data: AssignSimFormData) => void;
}

const simProducts = [
  { id: "pos", name: "POS SIM", retail: 4500, cost: 2500, margin: 2000, stock: 847 },
  { id: "cctv", name: "CCTV SIM", retail: 9500, cost: 6000, margin: 3500, stock: 247 },
  { id: "gps", name: "GPS SIM", retail: 12000, cost: 8000, margin: 4000, stock: 153 },
  { id: "router", name: "Router SIM", retail: 9000, cost: 6000, margin: 3000, stock: 0 },
];

export const AssignSimModal: React.FC<AssignSimModalProps> = ({
  open,
  onOpenChange,
  onAssignSubmitted,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(simProducts[0]);
  const [customerName, setCustomerName] = useState("Chidi Eze");
  const [customerPhone, setCustomerPhone] = useState("08120600542");
  const [simNumber, setSimNumber] = useState("07032222222");
  const [network, setNetwork] = useState("MTN");
  const [planDuration, setPlanDuration] = useState("1 year");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !simNumber) return;
    onAssignSubmitted({
      simType: selectedProduct.name, customerName, customerPhone, simNumber,
      network, planDuration, retailPrice: selectedProduct.retail,
      costPrice: selectedProduct.cost, margin: selectedProduct.margin,
    });
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <form onSubmit={handleSubmit} className="space-y-3 pt-1 text-xs">
        <div>
          <h3 className="text-base font-bold text-slate-900">Sell to Customer</h3>
          <p className="text-xs text-slate-400 mt-0.5">Sell from your EB inventory</p>
        </div>

        {/* Inventory Counter Strip */}
        <div className="flex items-center justify-between p-2 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600">
          <span>POS: <strong className="text-blue-600">847</strong></span>
          <span>·</span>
          <span>CCTV: <strong className="text-blue-600">247</strong></span>
          <span>·</span>
          <span>GPS: <strong className="text-blue-600">153</strong></span>
          <span>·</span>
          <span>Router: <strong className="text-slate-400">0</strong></span>
        </div>

        {/* Product Selector Cards */}
        <div className="grid grid-cols-2 gap-2">
          {simProducts.map((p) => {
            const isSelected = selectedProduct.id === p.id;
            const isOutOfStock = p.stock === 0;
            return (
              <button
                key={p.id}
                type="button"
                disabled={isOutOfStock}
                onClick={() => setSelectedProduct(p)}
                className={`p-2.5 rounded-xl border text-left transition ${
                  isSelected
                    ? "border-blue-500 bg-blue-50/50"
                    : isOutOfStock
                    ? "border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">{p.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div className="text-[11px] font-bold text-emerald-600 mt-0.5">
                  +₦{p.margin.toLocaleString()} margin
                </div>
              </button>
            );
          })}
        </div>

        {/* Customer Information */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            Customer Information
          </label>
          <div className="p-2.5 bg-blue-50/50 border border-blue-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <div>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Customer Name"
                  className="font-bold text-slate-900 bg-transparent outline-none w-full text-xs"
                />
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="Customer Phone"
                  className="text-[11px] text-slate-500 bg-transparent outline-none w-full"
                />
              </div>
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
              Existing ✓
            </span>
          </div>
        </div>

        {/* SIM Number */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            11-Digit SIM Number
          </label>
          <input
            type="text"
            value={simNumber}
            onChange={(e) => setSimNumber(e.target.value)}
            placeholder="e.g. 07032222222"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Network and Plan Duration Pills */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Network</label>
            <div className="flex rounded-xl bg-slate-100 p-0.5 border border-slate-200">
              {["MTN", "Airtel", "Glo", "T2"].map((net) => (
                <button key={net} type="button" onClick={() => setNetwork(net)} className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition ${network === net ? "bg-slate-900 text-white" : "text-slate-600"}`}>
                  {net}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Plan Duration</label>
            <div className="flex rounded-xl bg-slate-100 p-0.5 border border-slate-200">
              {["6 mo", "1 yr", "2 yr"].map((dur) => (
                <button key={dur} type="button" onClick={() => setPlanDuration(dur)} className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition ${planDuration === dur ? "bg-slate-900 text-white" : "text-slate-600"}`}>
                  {dur}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Margin Highlight Box */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
            Your Margin on this Sale
          </span>
          <div className="text-base font-black text-emerald-600 mt-0.5">
            +₦{selectedProduct.margin.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-700 font-medium">
            (₦{selectedProduct.retail.toLocaleString()} retail – ₦{selectedProduct.cost.toLocaleString()} cost)
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-xs"
          >
            Assign SIM
          </button>
        </div>
      </form>
    </AppModal>
  );
};
