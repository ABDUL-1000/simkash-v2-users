import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Package, ShieldAlert, Wifi, ArrowRight } from "lucide-react";
import { mockWalletBalance } from "../../data/mockWalletData";

export type ReinvestType = "sim-stock" | "debt-payoff" | "network-topup";

interface ReinvestSelectTypeModalProps {
  open: boolean;
  onClose: () => void;
  onProceed: (type: ReinvestType, amount: number) => void;
}

export const ReinvestSelectTypeModal: React.FC<ReinvestSelectTypeModalProps> = ({
  open,
  onClose,
  onProceed,
}) => {
  const [selectedType, setSelectedType] = useState<ReinvestType>("sim-stock");
  const [amount, setAmount] = useState<number>(1_000_000);

  const options = [
    {
      id: "sim-stock" as ReinvestType,
      title: "Wholesale SIM Stock Order",
      desc: "Buy high-margin SIM batches at preferential ₦4,700/SIM enterprise pricing.",
      icon: <Package className="w-5 h-5 text-purple-600" />,
      badge: "Popular · 35% Margin",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      id: "debt-payoff" as ReinvestType,
      title: "Pay Down Outstanding Balance",
      desc: "Offset your remaining ₦7.5M initial balance directly without bank transfer fees.",
      icon: <ShieldAlert className="w-5 h-5 text-amber-600" />,
      badge: "Zero Settlement Fees",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      id: "network-topup" as ReinvestType,
      title: "Enterprise Network Top-Up",
      desc: "Provision immediate wholesale data & airtime quota for your agent network.",
      icon: <Wifi className="w-5 h-5 text-blue-600" />,
      badge: "Instant Allocation",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
  ];

  const quickPills = [
    { label: "₦500k", val: 500_000 },
    { label: "₦1.0M", val: 1_000_000 },
    { label: "₦1.5M", val: 1_500_000 },
    { label: "₦2.0M", val: 2_000_000 },
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0 && amount <= mockWalletBalance.totalBalance) {
      onProceed(selectedType, amount);
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      title="Reinvest Enterprise Earnings"
      description="Deploy your accumulated earnings to accelerate growth or clear initial balance."
      size="md"
      footer={null}
    >
      <form onSubmit={handleNext} className="space-y-4 pt-2">
        {/* Balance alert */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
          <div>
            <span className="text-[11px] text-slate-500 block">Available to Reinvest</span>
            <span className="text-base font-black text-slate-900">
              ₦{mockWalletBalance.totalBalance.toLocaleString()}.00
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
            100% Retained Yield
          </span>
        </div>

        {/* Selection Cards */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Choose Reinvestment Channel</label>
          {options.map((opt) => {
            const isSelected = selectedType === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setSelectedType(opt.id)}
                className={`p-3 rounded-xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-500"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-100 shrink-0 mt-0.5">{opt.icon}</div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      {opt.title}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${opt.badgeColor}`}>
                  {opt.badge}
                </span>
              </div>
            );
          })}
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">
            Reinvestment Amount (₦)
          </label>
          <input
            type="number"
            min={50000}
            max={mockWalletBalance.totalBalance}
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-3 py-2 text-base font-bold rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {quickPills.map((pill) => (
              <button
                key={pill.label}
                type="button"
                onClick={() => setAmount(pill.val)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition ${
                  amount === pill.val
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!amount || amount <= 0}
            className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-xl shadow-sm flex items-center gap-1.5 transition"
          >
            Continue
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </AppModal>
  );
};
