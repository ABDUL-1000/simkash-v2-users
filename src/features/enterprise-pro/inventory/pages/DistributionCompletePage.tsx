import React from "react";
import { CheckCircle2, Check, CreditCard, Video, Navigation, Wifi } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";

export const DistributionCompletePage: React.FC = () => {
  const navigate = useNavigate();

  const distributedScs = [
    { initials: "AO", name: "Aminat Okafor", state: "Lagos", breakdown: "POS:200 · CCTV:100 · RT:50", total: "350 SIMs" },
    { initials: "CO", name: "Chidi Okonkwo", state: "Abuja", breakdown: "POS:300", total: "300 SIMs" },
    { initials: "FA", name: "Fatima Abubakar", state: "Kaduna", breakdown: "POS:200 · CCTV:100", total: "300 SIMs" },
    { initials: "KA", name: "Kola Adeyemi", state: "Oyo", breakdown: "POS:150 · CCTV:50 · GPS:50", total: "250 SIMs" },
    { initials: "IB", name: "Ibrahim Musa", state: "Rivers", breakdown: "POS:100 · CCTV:50", total: "150 SIMs" },
    { initials: "EO", name: "Emeka Okafor", state: "Edo", breakdown: "POS:100", total: "100 SIMs" },
    { initials: "AB", name: "Abubakar Sule", state: "Kebbi", breakdown: "POS:100", total: "100 SIMs" },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Green Banner */}
      <div className="p-4 bg-emerald-50/90 border border-emerald-300 rounded-2xl flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <Check className="w-5 h-5 stroke-[2.5]" />
        </div>
        <div>
          <div className="text-sm font-bold text-emerald-950">
            1,550 SIMs successfully distributed to 7 State Coordinators
          </div>
          <div className="text-xs text-emerald-700">
            Distribution ID: EP-DST-2024-0389 · Today, 2:47 PM
          </div>
        </div>
      </div>

      {/* Page Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Distribution Complete</h2>
          <p className="text-xs text-slate-500">1,550 SIMs sent to 7 of 12 State Coordinators</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate(appPaths.enterpriseProSimDistribute)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
          >
            Distribute More SIMs
          </button>
          <button
            type="button"
            onClick={() => navigate(appPaths.enterpriseProInventoryHistory)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
          >
            View History
          </button>
        </div>
      </div>

      {/* Card 1: DISTRIBUTION SUMMARY */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Distribution Summary
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <Check className="w-3 h-3" />
            <span>7 SCs received SIMs</span>
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {distributedScs.map((sc) => (
            <div key={sc.name} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-100 shrink-0">
                  {sc.initials}
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">{sc.name}</div>
                  <div className="text-[11px] text-slate-400">{sc.state}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="text-[11px] font-mono text-slate-500 hidden sm:inline-block">
                  {sc.breakdown}
                </span>
                <span className="font-bold text-xs text-slate-900 min-w-[70px] text-right">
                  {sc.total}
                </span>
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 2: INVENTORY UPDATE */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
            Inventory Update
          </span>
          <span className="text-[11px] text-slate-400">After distribution</span>
        </div>

        <div className="divide-y divide-slate-100">
          <div className="p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900">POS SIM</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 font-mono">5,000</span>
              <span className="text-slate-300">&rarr;</span>
              <span className="font-bold text-slate-900 font-mono">3,850</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full min-w-[55px] text-center">
                -1,150
              </span>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900">CCTV SIM</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 font-mono">1,200</span>
              <span className="text-slate-300">&rarr;</span>
              <span className="font-bold text-slate-900 font-mono">900</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full min-w-[55px] text-center">
                -300
              </span>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Navigation className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900">GPS SIM</span>
                <span className="ml-2 text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded">
                  Critical stock
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 font-mono">450</span>
              <span className="text-slate-300">&rarr;</span>
              <span className="font-bold text-slate-900 font-mono">400</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full min-w-[55px] text-center">
                -50
              </span>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-orange-500 flex items-center justify-center">
                <Wifi className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900">Router SIM</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-400 font-mono">597</span>
              <span className="text-slate-300">&rarr;</span>
              <span className="font-bold text-slate-900 font-mono">547</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full min-w-[55px] text-center">
                -50
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
