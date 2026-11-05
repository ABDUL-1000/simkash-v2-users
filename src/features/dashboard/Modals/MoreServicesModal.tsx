import { AppModal } from "@/components/common/AppModal";
import { MODAL_SERVICES } from "../moreServices";

interface MoreServicesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onServiceSelect: (serviceId: string) => void;
}

export function MoreServicesModal({ open, onOpenChange, onServiceSelect }: MoreServicesModalProps) {
  // The first services are already on the wallet card.
  const services = MODAL_SERVICES;

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
