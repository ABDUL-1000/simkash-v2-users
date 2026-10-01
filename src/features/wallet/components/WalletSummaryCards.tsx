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

  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(({ label, value, Icon, color, iconBg }) => <article key={label} className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-[#8C909B]">{label}</span><span className={`flex size-9 items-center justify-center rounded-xl ${iconBg} ${color}`}><Icon className="size-4" /></span></div><p className={`mt-3 text-xl font-extrabold ${color}`}>{isLoading ? "—" : value}</p></article>)}</div>;
}
