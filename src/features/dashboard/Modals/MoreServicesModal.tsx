import { AppModal } from "@/components/common/AppModal";

interface MoreServicesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onServiceSelect: (serviceId: string) => void;
}

export function MoreServicesModal({ open, onOpenChange, onServiceSelect }: MoreServicesModalProps) {
  const services = [
    { id: "request-sim", title: "Request SIM", icon: "📊", bg: "bg-[#EFF4F8]" },
    { id: "sim-swap", title: "SIM Swap", icon: "🔄", bg: "bg-[#EFF4F8]" },
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

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="More Services"
      description=""
      size="sm"
    >
      <div className="grid grid-cols-3 gap-4 py-2">
        {services.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => { onOpenChange(false); onServiceSelect(item.id); }}
            className="group flex flex-col items-center gap-2 rounded-2xl p-3 text-center transition hover:bg-[#F8FAFC]"
          >
            <div
              className={`flex size-14 items-center justify-center rounded-2xl text-2xl transition group-hover:scale-105 ${item.bg}`}
            >
              {item.icon}
            </div>
            <span className="text-xs font-bold text-[#0F152A] group-hover:text-[#2563EB]">
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </AppModal>
  );
}
