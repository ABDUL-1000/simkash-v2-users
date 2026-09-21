import { AppModal } from "@/components/common/AppModal";
import { colors } from "@/constants/colors";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { ArrowRight } from "lucide-react";

interface MyNetworkOverviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TOP_COORDINATORS = [
  { rank: 1, medal: "🥇", initials: "AO", name: "Aminat Okafor", state: "Lagos", acts: "1,847", earned: "₦3,841K" },
  { rank: 2, medal: "🥈", initials: "FA", name: "Fatima A.", state: "Kaduna", acts: "1,204", earned: "₦2,504K" },
  { rank: 3, medal: "🥉", initials: "KI", name: "Kola Ibrahim", state: "Oyo", acts: "1,123", earned: "₦2,335K" },
  { rank: 4, medal: "4", initials: "CE", name: "Chidi Eze", state: "Abuja", acts: "982", earned: "₦2,042K" },
  { rank: 5, medal: "5", initials: "CH", name: "Chioma Eze", state: "Imo", acts: "723", earned: "₦1,503K" },
];

const NETWORK_ACTIVITIES = [
  { network: "MTN", phone: "07022222222", customer: "Chidi Eze", route: "SC: Aminat → AP: Rabiu Sani", comm: "+₦2,000", time: "2 min ago" },
  { network: "GLO", phone: "08033333333", customer: "Fatima Abdullahi", route: "SC: Chidi Eze → AP: Amira Bello", comm: "+₦2,000", time: "8 min ago" },
  { network: "AIRTEL", phone: "08144444444", customer: "James Okafor", route: "SC: Kola Ibrahim → AP: Yemi Adeyemi", comm: "+₦2,000", time: "15 min ago" },
  { network: "9MOBILE", phone: "09055555555", customer: "Blessing Nwosu", route: "SC: Fatima A. → AP: Sani Abubakar", comm: "+₦2,000", time: "22 min ago" },
  { network: "MTN", phone: "07066666666", customer: "Ahmed Musa", route: "SC: Ibrahim Musa → AP: Chioma Obi", comm: "+₦2,000", time: "35 min ago" },
];

export function MyNetworkOverviewModal({ open, onOpenChange }: MyNetworkOverviewModalProps) {
  const navigate = useNavigate();

  const handleGoToNetwork = () => {
    onOpenChange(false);
    navigate(appPaths.enterpriseProNetwork);
  };

  const getBadgeClass = (net: string) => {
    switch (net) {
      case "MTN": return "bg-amber-500 text-white";
      case "GLO": return "bg-emerald-600 text-white";
      case "AIRTEL": return "bg-red-600 text-white";
      default: return "bg-slate-900 text-white";
    }
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="My Network Overview"
      description="12 SCs · 247 APs · Jun 2026"
      descriptionColor={colors.textSecondary}
      size="md"
      footer={null}
    >
      <div className="space-y-3 pt-1 text-xs">
        {/* 4 Metric Cards */}
        <div className="grid grid-cols-4 gap-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-2.5">
            <p className="text-[9px] uppercase font-bold text-slate-400">STATE COORDS</p>
            <p className="text-lg font-black text-slate-900 mt-0.5">12</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-2.5">
            <p className="text-[9px] uppercase font-bold text-slate-400">AGENCY PTRS</p>
            <p className="text-lg font-black text-slate-900 mt-0.5">247</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-2.5">
            <p className="text-[9px] uppercase font-bold text-slate-400">ACTS TODAY</p>
            <p className="text-lg font-black text-slate-900 mt-0.5">47</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-2.5">
            <p className="text-[9px] uppercase font-bold text-slate-400">COMMISSION</p>
            <p className="text-sm font-black text-slate-900 mt-0.5">₦2.84M/mo</p>
          </div>
        </div>

        {/* Top Performing Coordinators */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            <span>TOP PERFORMING COORDINATORS</span>
            <span>ACTS / EARNINGS</span>
          </div>

          <div className="divide-y divide-slate-100">
            {TOP_COORDINATORS.map((sc) => (
              <div key={sc.name} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-4 text-xs font-bold text-slate-500 text-center">{sc.medal}</span>
                  <div className="flex size-7 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                    {sc.initials}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{sc.name}</p>
                    <p className="text-[10px] text-slate-400">{sc.state}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{sc.acts}</p>
                    <p className="text-[9px] text-slate-400">activations</p>
                  </div>
                  <div>
                    <p className="font-bold text-emerald-600 text-xs">{sc.earned}</p>
                    <p className="text-[9px] text-slate-400">earned</p>
                  </div>
                  <button onClick={handleGoToNetwork} className="text-xs font-bold text-blue-600 hover:text-blue-800">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-100">
            <span>And 7 more State Coordinators...</span>
            <button onClick={handleGoToNetwork} className="font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5">
              View Full Network <ArrowRight className="size-3" />
            </button>
          </div>
        </div>

        {/* Today's Network Activity */}
        <div className="space-y-1.5 pt-1">
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">TODAY&apos;S NETWORK ACTIVITY</p>
          <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-0.5">
            {NETWORK_ACTIVITIES.map((act, i) => (
              <div key={i} className="flex items-center justify-between py-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase ${getBadgeClass(act.network)}`}>
                    {act.network}
                  </span>
                  <div>
                    <p className="font-bold text-slate-800 text-[11px]">
                      {act.phone} <span className="font-normal text-slate-400">· {act.customer}</span>
                    </p>
                    <p className="text-[10px] text-slate-400">{act.route}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600 text-xs">{act.comm}</p>
                  <p className="text-[9px] text-slate-400">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button onClick={() => onOpenChange(false)} className="px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800">
            Close
          </button>
          <button
            onClick={handleGoToNetwork}
            className="rounded-xl px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-xs"
          >
            Go to My Network
          </button>
        </div>
      </div>
    </AppModal>
  );
}
