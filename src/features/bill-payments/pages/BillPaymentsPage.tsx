import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { BuyAirtimeModal } from "../Modals/BuyAirtimeModal";
import { BuyDataModal } from "../Modals/BuyDataModal";
import { ElectricityPaymentModal } from "../Modals/ElectricityPaymentModal";
import { CableTvPaymentModal } from "../Modals/CableTvPaymentModal";

export default function BillPaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<"airtime" | "data" | "electricity" | "cable" | null>(null);

  const services = [
    {
      id: "airtime",
      title: "Buy Airtime",
      subtitle: "Instant top up, all networks",
      icon: "📱",
      bg: "bg-[#FFF7F8]",
    },
    {
      id: "data",
      title: "Buy Data",
      subtitle: "Data bundles, all networks",
      icon: "📊",
      bg: "bg-[#EFF4F8]",
    },
    {
      id: "electricity",
      title: "Electricity",
      subtitle: "AEDC, EKEDC, IBEDC, PHED & more",
      icon: "⚡",
      bg: "bg-[#FFF7F8]",
    },
    {
      id: "cable",
      title: "Cable TV",
      subtitle: "DSTV, GOtv, Startimes",
      icon: "📺",
      bg: "bg-[#EFF4F8]",
    },
    {
      id: "airtime-to-cash",
      title: "Airtime to Cash",
      subtitle: "Convert airtime to wallet balance",
      icon: "💱",
      bg: "bg-[#EBFFF8]",
    },
    {
      id: "data-to-cash",
      title: "Data to Cash",
      subtitle: "Convert data to wallet balance",
      icon: "🔄",
      bg: "bg-[#EFF4F8]",
    },
    {
      id: "bulk-airtime",
      title: "Bulk Airtime",
      subtitle: "Send airtime to multiple numbers",
      icon: "👥",
      bg: "bg-[#FFF7F8]",
    },
    {
      id: "bulk-data",
      title: "Bulk Data",
      subtitle: "Send data bundles to multiple numbers",
      icon: "📦",
      bg: "bg-[#FFF7F8]",
    },
    {
      id: "jamb",
      title: "JAMB PIN",
      subtitle: "Registration and mock exam pins",
      icon: "📚",
      bg: "bg-[#FFF7F8]",
    },
    {
      id: "waec",
      title: "WAEC Result Checker",
      subtitle: "Check WAEC/NECO results",
      icon: "🎓",
      bg: "bg-[#EFF4F8]",
    },
  ];

  const recentBills = [
    {
      id: 1,
      title: "Airtime",
      subtitle: "MTN · 08065942373",
      amount: "-₦500",
      amountColor: "text-[#0F152A]",
      date: "Today",
      icon: "📱",
      iconBg: "bg-[#FFF7F8]",
    },
    {
      id: 2,
      title: "Electricity",
      subtitle: "EKEDC · Meter 00123456",
      amount: "-₦3,000",
      amountColor: "text-[#0F152A]",
      date: "Yesterday",
      icon: "⚡",
      iconBg: "bg-[#FFF7F8]",
    },
    {
      id: 3,
      title: "Cable TV",
      subtitle: "DSTV · Compact",
      amount: "-₦7,900",
      amountColor: "text-[#0F152A]",
      date: "20 Jun",
      icon: "📺",
      iconBg: "bg-[#EFF4F8]",
    },
    {
      id: 4,
      title: "Data",
      subtitle: "Airtel · 2GB Bundle",
      amount: "-₦900",
      amountColor: "text-[#0F152A]",
      date: "18 Jun",
      icon: "📊",
      iconBg: "bg-[#EFF4F8]",
    },
    {
      id: 5,
      title: "Airtime to Cash",
      subtitle: "MTN · ₦500 converted",
      amount: "+₦425",
      amountColor: "text-[#10B981]",
      date: "15 Jun",
      icon: "💱",
      iconBg: "bg-[#EBFFF8]",
    },
  ];

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleServiceClick = (id: string) => {
    if (id === "data") {
      setActiveModal("data");
    } else if (id === "electricity") {
      setActiveModal("electricity");
    } else if (id === "cable") {
      setActiveModal("cable");
    } else {
      setActiveModal("airtime");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0F152A]">Bill Payments & Services</h1>
        <p className="mt-1 text-xs text-[#8C909B]">
          Pay bills, buy airtime and data, convert airtime to cash
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-full">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#939393]" />
        <input
          type="search"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 pl-11 pr-4 text-xs text-[#0F152A] placeholder:text-[#939393] outline-none focus:border-[#2563EB]"
        />
      </div>

      {/* Services Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            onClick={() => handleServiceClick(service.id)}
            className="group cursor-pointer rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs transition hover:border-[#2563EB] hover:shadow-md"
          >
            <div
              className={`flex size-12 items-center justify-center rounded-xl text-xl transition group-hover:scale-105 ${service.bg}`}
            >
              {service.icon}
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-bold text-[#0F152A] group-hover:text-[#2563EB]">
                {service.title}
              </h3>
              <p className="mt-1 text-xs text-[#8C909B]">{service.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bills Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0F152A]">Recent Bills</h2>
          <button
            type="button"
            className="flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
          >
            View all <ArrowRight className="size-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#E2ECF6] rounded-2xl border border-[#E2ECF6] bg-white p-2 shadow-xs">
          {recentBills.map((bill) => (
            <div
              key={bill.id}
              className="flex items-center justify-between p-3.5 transition hover:bg-[#F8FAFC]"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-lg ${bill.iconBg}`}
                >
                  {bill.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F152A]">{bill.title}</h4>
                  <p className="text-xs text-[#8C909B]">{bill.subtitle}</p>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-sm font-bold ${bill.amountColor}`}>
                  {bill.amount}
                </span>
                <p className="text-xs text-[#8C909B]">{bill.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Modals */}
      <BuyAirtimeModal
        open={activeModal === "airtime"}
        onOpenChange={(open) => setActiveModal(open ? "airtime" : null)}
      />
      <BuyDataModal
        open={activeModal === "data"}
        onOpenChange={(open) => setActiveModal(open ? "data" : null)}
      />
      <ElectricityPaymentModal
        open={activeModal === "electricity"}
        onOpenChange={(open) => setActiveModal(open ? "electricity" : null)}
      />
      <CableTvPaymentModal
        open={activeModal === "cable"}
        onOpenChange={(open) => setActiveModal(open ? "cable" : null)}
      />
    </div>
  );
}
