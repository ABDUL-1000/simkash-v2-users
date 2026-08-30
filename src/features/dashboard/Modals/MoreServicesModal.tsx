import { AppModal } from "@/components/common/AppModal";

interface MoreServicesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MoreServicesModal({ open, onOpenChange }: MoreServicesModalProps) {
  const services = [
    { title: "Request SIM", icon: "📊", bg: "bg-[#EFF4F8]" },
    { title: "SIM Swap", icon: "🔄", bg: "bg-[#EFF4F8]" },
    { title: "SIM Renewal", icon: "🔄", bg: "bg-[#EBFFF8]" },
    { title: "Electricity", icon: "⚡", bg: "bg-[#FFF7F8]" },
    { title: "Cable TV", icon: "📺", bg: "bg-[#EFF4F8]" },
    { title: "Internet", icon: "🌐", bg: "bg-[#EFF4F8]" },
    { title: "JAMB", icon: "🎓", bg: "bg-[#EBFFF8]" },
    { title: "WAEC", icon: "📝", bg: "bg-[#FFF7F8]" },
    { title: "Bulk Airtime", icon: "📡", bg: "bg-[#EFF4F8]" },
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
        {services.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onOpenChange(false)}
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
