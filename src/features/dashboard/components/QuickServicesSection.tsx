import { ArrowRight, Plus } from "lucide-react";

interface QuickServicesSectionProps {
  onMoreServicesClick: () => void;
  onServiceClick?: (serviceId: string) => void;
}

export function QuickServicesSection({
  onMoreServicesClick,
  onServiceClick,
}: QuickServicesSectionProps) {
  const quickServices = [
    { id: "electricity", label: "Electricity", icon: "⚡" },
    { id: "cable", label: "Cable TV", icon: "📺" },
    { id: "airtime", label: "Buy Airtime", icon: "📱" },
    { id: "data", label: "Buy Data", icon: "📊" },
    { id: "jamb", label: "JAMB", icon: "🎓" },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-base font-bold text-[#0F152A]">Quick Services</h3>
      <div className="flex flex-wrap items-center gap-3">
        {quickServices.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => onServiceClick?.(service.id)}
            className="flex items-center gap-2 rounded-full border border-[#E2ECF6] bg-[#F8FAFC] px-4 py-2 text-xs font-semibold text-[#0F152A] transition hover:border-[#2563EB] hover:bg-[#EFF4F8] hover:text-[#2563EB]"
          >
            <span>{service.icon}</span>
            <span>{service.label}</span>
          </button>
        ))}

        <button
          type="button"
          onClick={onMoreServicesClick}
          className="flex items-center gap-1.5 rounded-full border border-[#E2ECF6] bg-[#F8FAFC] px-4 py-2 text-xs font-semibold text-[#2563EB] transition hover:border-[#2563EB] hover:bg-[#EFF4F8]"
        >
          <Plus className="size-3.5" />
          <span>More Services</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
