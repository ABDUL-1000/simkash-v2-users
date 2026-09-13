import { Phone, MessageSquare } from "lucide-react";

interface StateCoordinatorCardProps {
  name?: string;
  role?: string;
  phone?: string;
}

export function StateCoordinatorCard({
  name = "Aminat Okafor",
  role = "State Coordinator · Lagos",
  phone = "08065942373",
}: StateCoordinatorCardProps) {
  return (
    <div className="rounded-3xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-4">
      <h3 className="text-sm font-bold text-[#0F152A]">State Coordinator</h3>

      {/* Profile Card */}
      <div className="flex items-center gap-3 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#EFF6FF] font-bold text-xs text-[#2563EB]">
          AO
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#0F152A]">{name}</h4>
          <p className="text-[11px] text-[#66738C] font-medium">{role}</p>
          <p className="text-[11px] font-semibold text-[#0F152A]">{phone}</p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <a
          href={`tel:${phone}`}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white py-2.5 font-bold text-[#0F152A] transition hover:bg-[#F1F5F9]"
        >
          <Phone className="size-3.5 text-[#2563EB]" />
          <span>Call</span>
        </a>

        <a
          href={`https://wa.me/234${phone.replace(/^0/, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl border border-[#CBD5E1] bg-white py-2.5 font-bold text-[#0F152A] transition hover:bg-[#F1F5F9]"
        >
          <MessageSquare className="size-3.5 text-[#10B981]" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
