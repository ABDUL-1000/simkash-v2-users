import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function RecentTransactionsSection() {
  const transactions = [
    {
      id: 1,
      title: "Wallet Top Up",
      subtitle: "Via Flutterwave",
      amount: "+₦5,000",
      amountColor: "text-[#10B981]",
      date: "Today 2:34 PM",
      icon: "💰",
      iconBg: "bg-[#EBFFF8]",
    },
    {
      id: 2,
      title: "Airtime Purchase",
      subtitle: "MTN · 08065942373",
      amount: "-₦500",
      amountColor: "text-[#EF4444]",
      date: "Today 11:20 AM",
      icon: "📱",
      iconBg: "bg-[#FFF7F8]",
    },
    {
      id: 3,
      title: "Electricity Bill",
      subtitle: "EKEDC · Meter 1234567",
      amount: "-₦3,000",
      amountColor: "text-[#EF4444]",
      date: "Yesterday",
      icon: "⚡",
      iconBg: "bg-[#FFF7F8]",
    },
    {
      id: 4,
      title: "SIM Renewal",
      subtitle: "07022222222 · 30-day plan",
      amount: "-₦5,000",
      amountColor: "text-[#EF4444]",
      date: "23 Jun 2026",
      icon: "🔄",
      iconBg: "bg-[#EFF4F8]",
    },
    {
      id: 5,
      title: "Marketplace Order",
      subtitle: "ORD-2026-00847",
      amount: "-₦184,999",
      amountColor: "text-[#EF4444]",
      date: "20 Jun 2026",
      icon: "🛍️",
      iconBg: "bg-[#FFF7F8]",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#0F152A]">Recent Transactions</h3>
        <Link
          to="/transactions"
          className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
        >
          View all <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white p-2 shadow-xs">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3.5 transition hover:bg-[#F8FAFC]"
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-lg ${tx.iconBg}`}
              >
                {tx.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F152A]">{tx.title}</h4>
                <p className="text-xs text-[#8C909B]">{tx.subtitle}</p>
              </div>
            </div>

            <div className="text-right">
              <span className={`text-sm font-bold ${tx.amountColor}`}>
                {tx.amount}
              </span>
              <p className="text-xs text-[#8C909B]">{tx.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
