import { ArrowDownLeft, ArrowUpRight, Wallet, Coins } from "lucide-react";
import { useGetWalletSummary } from "../api/useGetWalletSummary";

const naira = (amount?: number) => `₦${Number(amount ?? 0).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function WalletSummaryCards() {
  const { summary, isLoading } = useGetWalletSummary();
  const metrics = [
    { label: "Total Inflow", value: naira(summary?.total_inflow), Icon: ArrowDownLeft, color: "text-[#10B981]", iconBg: "bg-emerald-50" },
    { label: "Total Outflow", value: naira(summary?.total_outflow), Icon: ArrowUpRight, color: "text-[#EF4444]", iconBg: "bg-rose-50" },
    { label: "Available Balance", value: naira(summary?.balance), Icon: Wallet, color: "text-[#0F152A]", iconBg: "bg-blue-50" },
    { label: "Commission Balance", value: naira(summary?.commission_balance), Icon: Coins, color: "text-[#0F152A]", iconBg: "bg-amber-50" },
  ];

  return <div className="grid min-w-0 grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">{metrics.map(({ label, value, Icon, color, iconBg }) => <article key={label} className="min-w-0 rounded-2xl border border-[#E2ECF6] bg-white p-3 shadow-xs sm:p-5"><div className="flex min-w-0 items-center justify-between gap-1"><span className="min-w-0 text-[10px] font-semibold leading-tight text-[#8C909B] sm:text-xs">{label}</span><span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${iconBg} ${color} sm:size-9`}><Icon className="size-4" /></span></div><p className={`mt-3 truncate text-base font-extrabold sm:text-xl ${color}`} title={isLoading ? undefined : value}>{isLoading ? "—" : value}</p></article>)}</div>;
}
