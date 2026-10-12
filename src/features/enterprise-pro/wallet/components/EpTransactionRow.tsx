import type { TransactionItem } from '../types';
import { colors } from '@/constants/colors';
import { Percent, Users, Landmark, Package, TrendingUp, Award, XCircle, FileText } from 'lucide-react';
export function EpTransactionRow({ t, onSelectTransaction }: { t: TransactionItem; onSelectTransaction: (txn: TransactionItem) => void }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "margin":
        return <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Percent className="w-4 h-4" /></div>;
      case "commission":
        return <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"><Users className="w-4 h-4" /></div>;
      case "payout":
        return <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0"><Landmark className="w-4 h-4" /></div>;
      case "sim-order":
        return <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0"><Package className="w-4 h-4" /></div>;
      case "balance-pay":
        return <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><TrendingUp className="w-4 h-4" /></div>;
      case "bonus":
        return <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Award className="w-4 h-4" /></div>;
      case "failed-payout":
        return <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0"><XCircle className="w-4 h-4" /></div>;
      default:
        return <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0"><FileText className="w-4 h-4" /></div>;
    }
  };

              const isFailed = t.type === "failed-payout";
              return (
                <div
                  key={t.id}
                  onClick={() => onSelectTransaction(t)}
                  className={`py-3 px-2.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition hover:bg-slate-50 ${
                    isFailed ? "bg-red-50/40 hover:bg-red-50/60" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {getIcon(t.type)}
                    <div>
                      <span className="font-bold text-xs text-slate-900 block">{t.title}</span>
                      <span className="text-[11px] text-slate-500 block">{t.subtitle}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{t.timeAgo}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-xs font-black block ${
                      isFailed
                        ? "text-red-600"
                        : t.isOutflow
                        ? "text-red-500"
                        : t.amount === 0
                        ? "text-slate-400"
                        : "text-emerald-600"
                    }`}>
                      {t.amountFormatted ?? `${t.isOutflow ? "-" : "+"}₦${Math.abs(t.amount).toLocaleString()}`}
                    </span>
                    <span className="text-[10px] font-semibold" style={{ color: t.status.toLowerCase() === "failed" ? colors.danger : colors.textSecondary }}>{t.status}</span>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{t.ref}</span>
                  </div>
                </div>
              );
}
