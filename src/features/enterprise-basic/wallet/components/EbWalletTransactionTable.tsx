import React, { useState } from "react";
import { ArrowDownLeft, ArrowUpRight, ShoppingCart, Smartphone } from "lucide-react";
import type { EbWalletTransaction, WalletFilterKey } from "../types";

interface EbWalletTransactionTableProps {
  transactions: EbWalletTransaction[];
}

export const EbWalletTransactionTable: React.FC<
  EbWalletTransactionTableProps
> = ({ transactions }) => {
  const [filter, setFilter] = useState<WalletFilterKey>("all");

  const filterTabs = [
    { id: "all", label: "All" },
    { id: "margin", label: "Margin Earnings" },
    { id: "payouts", label: "Payouts" },
    { id: "orders", label: "SIM Orders" },
    { id: "bills", label: "Bill Payments" },
  ];

  const filtered = transactions.filter((t) => {
    if (filter === "all") return true;
    if (filter === "margin") return t.type === "margin";
    if (filter === "payouts") return t.type === "payout";
    if (filter === "orders") return t.type === "order";
    if (filter === "bills") return t.type === "bill";
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "margin":
        return <ArrowDownLeft className="w-4 h-4 text-emerald-600" />;
      case "payout":
        return <ArrowUpRight className="w-4 h-4 text-blue-600" />;
      case "order":
        return <ShoppingCart className="w-4 h-4 text-purple-600" />;
      case "bill":
        return <Smartphone className="w-4 h-4 text-amber-600" />;
      default:
        return <ArrowDownLeft className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-4 text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h4 className="font-bold text-slate-900 text-sm">Transaction History</h4>
        <div className="flex flex-wrap items-center gap-1.5">
          {filterTabs.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id as WalletFilterKey)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                filter === f.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-100 font-medium">
        {filtered.map((t) => (
          <div key={t.id} className="py-3 flex items-center justify-between hover:bg-slate-50/50 px-2 rounded-xl transition">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                {getIcon(t.type)}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">{t.title}</div>
                <div className="text-[11px] text-slate-400">{t.subtitle} · {t.date}</div>
              </div>
            </div>

            <div className="text-right">
              <div
                className={`font-bold text-xs ${
                  t.amount > 0 ? "text-emerald-600" : "text-slate-900"
                }`}
              >
                {t.amount > 0 ? `+₦${t.amount.toLocaleString()}` : `-₦${Math.abs(t.amount).toLocaleString()}`}
              </div>
              <span className="text-[10px] text-emerald-600 font-medium capitalize">
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
