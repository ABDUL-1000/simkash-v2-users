import { useGetEnterpriseOverview } from "../api/useGetEnterpriseOverview";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { colors } from "@/constants/colors";
import { Phone, MessageSquare } from "lucide-react";

interface EpAccountManagerCardProps {
  onContact: () => void;
}

export function EpAccountManagerCard({ onContact }: EpAccountManagerCardProps) {
  const { data } = useGetEnterpriseOverview();
  const manager = data?.account_manager;
  if (!manager) return <AppEmptyState title="No Account Manager" description="An account manager has not been assigned yet." />;
  return (
    <div
      className="rounded-2xl border bg-white p-4 shadow-2xs space-y-3"
      style={{ borderColor: colors.border }}
    >
      <p className="font-bold text-slate-900 text-sm">Your Account Manager</p>

      {/* Dark Manager Card */}
      <div className="rounded-2xl bg-[#0F172A] p-4 text-white space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white ring-2 ring-blue-400/30">
            {manager.name.split(/\s+/).map(part => part[0]).slice(0, 2).join("")}
          </div>
          <div>
            <p className="font-bold text-white text-sm">{manager.name}</p>
            <p className="text-[11px] text-slate-400">{manager.designation}</p>
            <p className="text-[11px] font-semibold text-blue-400 mt-0.5">{manager.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={manager.call_action}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 py-2 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
          >
            <Phone className="size-3.5 text-blue-400" /> Call
          </a>
          <a
            href={manager.whatsapp_action}
            target="_blank"
            rel="noreferrer"
            onClick={() => { if (!manager.whatsapp_action) onContact(); }}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 py-2 text-xs font-bold text-emerald-400 hover:bg-slate-700 transition"
          >
            <MessageSquare className="size-3.5 text-emerald-400" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
