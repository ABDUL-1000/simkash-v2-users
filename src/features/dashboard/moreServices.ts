/** Dashboard services. The wallet card shows CARD_SERVICE_IDS; the More Services modal shows the rest. */
export const MORE_SERVICES = [
  { id: "request-sim", title: "Request SIM", icon: "📊", bg: "bg-[#EFF4F8]" },
  // { id: "sim-swap", title: "SIM Swap", icon: "🔄", bg: "bg-[#EFF4F8]" },
  { id: "sim-renew", title: "SIM Renewal", icon: "🔄", bg: "bg-[#EBFFF8]" },
  { id: "airtime", title: "Airtime", icon: "📱", bg: "bg-[#FFF7F8]" },
  { id: "data", title: "Data", icon: "📊", bg: "bg-[#EFF4F8]" },
  { id: "electricity", title: "Electricity", icon: "⚡", bg: "bg-[#FFF7F8]" },
  { id: "cable", title: "Cable TV", icon: "📺", bg: "bg-[#EFF4F8]" },
  { id: "airtime-to-cash", title: "Airtime to Cash", icon: "💱", bg: "bg-[#EBFFF8]" },
  { id: "data-to-cash", title: "Data to Cash", icon: "🔄", bg: "bg-[#EFF4F8]" },
  { id: "bulk-airtime", title: "Bulk Airtime", icon: "📡", bg: "bg-[#FFF7F8]" },
  { id: "bulk-data", title: "Bulk Data", icon: "📦", bg: "bg-[#FFF7F8]" },
  { id: "jamb", title: "JAMB", icon: "🎓", bg: "bg-[#EBFFF8]" },
  { id: "waec", title: "WAEC", icon: "📝", bg: "bg-[#FFF7F8]" },
];

/** Shown on the wallet card between Top Up and More. */
const CARD_SERVICE_IDS = ["request-sim", "sim-renew"];
export const CARD_SERVICES = MORE_SERVICES.filter((service) => CARD_SERVICE_IDS.includes(service.id));
export const MODAL_SERVICES = MORE_SERVICES.filter((service) => !CARD_SERVICE_IDS.includes(service.id));
