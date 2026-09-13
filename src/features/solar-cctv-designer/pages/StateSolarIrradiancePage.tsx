"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { EditSolarDataModal } from "../Modals/EditSolarDataModal";

type StateData = {
  state: string;
  sunHours: string;
  irradiance: string;
  zone: string;
  zoneColor: string;
  lastUpdated: string;
};

const STATES: StateData[] = [
  { state: "Lagos", sunHours: "4.5 hrs", irradiance: "5.2 kWh/m²", zone: "South", zoneColor: "bg-[#ECFDF5] text-[#059669]", lastUpdated: "Auto-populated" },
  { state: "Abuja (FCT)", sunHours: "5.2 hrs", irradiance: "6.1 kWh/m²", zone: "North", zoneColor: "bg-[#FEF3C7] text-[#D97706]", lastUpdated: "Auto-populated" },
  { state: "Rivers", sunHours: "4.2 hrs", irradiance: "4.8 kWh/m²", zone: "South", zoneColor: "bg-[#ECFDF5] text-[#059669]", lastUpdated: "Auto-populated" },
  { state: "Kano", sunHours: "7.1 hrs", irradiance: "7.8 kWh/m²", zone: "North", zoneColor: "bg-[#FEF3C7] text-[#D97706]", lastUpdated: "Auto-populated" },
  { state: "Oyo", sunHours: "5.0 hrs", irradiance: "5.8 kWh/m²", zone: "SW", zoneColor: "bg-[#EFF6FF] text-[#2563EB]", lastUpdated: "Auto-populated" },
  { state: "Kaduna", sunHours: "6.8 hrs", irradiance: "7.4 kWh/m²", zone: "North", zoneColor: "bg-[#FEF3C7] text-[#D97706]", lastUpdated: "Auto-populated" },
  { state: "Anambra", sunHours: "4.6 hrs", irradiance: "5.3 kWh/m²", zone: "SE", zoneColor: "bg-[#CCFBF1] text-[#0D9488]", lastUpdated: "Auto-populated" },
  { state: "Enugu", sunHours: "4.7 hrs", irradiance: "5.5 kWh/m²", zone: "SE", zoneColor: "bg-[#CCFBF1] text-[#0D9488]", lastUpdated: "Auto-populated" },
  { state: "Delta", sunHours: "4.3 hrs", irradiance: "5.0 kWh/m²", zone: "South", zoneColor: "bg-[#ECFDF5] text-[#059669]", lastUpdated: "Auto-populated" },
  { state: "Borno", sunHours: "7.4 hrs", irradiance: "8.1 kWh/m²", zone: "NE", zoneColor: "bg-[#FFE4E6] text-[#E11D48]", lastUpdated: "Auto-populated" },
];

export default function StateSolarIrradiancePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [efficiencyFactor, setEfficiencyFactor] = useState("0.8");
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredStates = STATES.filter((s) =>
    s.state.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm">
      {/* Back Link & Title */}
      <div>
        <button
          type="button"
          onClick={() => navigate(appPaths.solarCctvDesigner)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline mb-1"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Solar CCTV Designer</span>
        </button>
        <h1 className="text-xl font-extrabold text-[#0F172A]">State Solar Irradiance Data</h1>
        <p className="text-xs text-[#64748B] mt-0.5">
          Peak sun hours per state used in panel wattage calculations. Higher sun hours = fewer panels needed.
        </p>
      </div>

      {/* Formula Banner */}
      <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-4 text-xs text-[#2563EB] font-medium leading-relaxed">
        These values are used in the formula: Panel Wattage = (Daily Load ÷ Peak Sun Hours) ÷ Efficiency. Standard Nigerian values are pre-populated but can be edited.
      </div>

      {/* Interactive Map Placeholder Box */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-10 text-center flex flex-col items-center justify-center space-y-2">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-white border border-[#E2E8F0] shadow-xs text-[#94A3B8]">
          <MapPin className="size-6 text-[#64748B]" />
        </div>
        <p className="text-xs font-bold text-[#64748B]">
          Interactive map - click any state to edit its solar data
        </p>
        <span className="text-[11px] text-[#94A3B8]">Nigeria Solar Irradiance Map</span>
      </div>

      {/* State Solar Data Table Card */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#0F172A]">State Solar Data</h3>
            <span className="text-xs text-[#64748B]">All 37 states</span>
          </div>

          <div className="relative min-w-[200px]">
            <Search className="absolute left-3 top-2.5 size-4 text-[#94A3B8]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] pl-9 pr-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">STATE</th>
                <th className="p-3">PEAK SUN HOURS</th>
                <th className="p-3">DAILY IRRADIANCE (KWH/M²)</th>
                <th className="p-3">ZONE</th>
                <th className="p-3">LAST UPDATED</th>
                <th className="p-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {filteredStates.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold">{row.state}</td>
                  <td className="p-3 font-mono">{row.sunHours}</td>
                  <td className="p-3 font-mono">{row.irradiance}</td>
                  <td className="p-3">
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${row.zoneColor}`}>
                      {row.zone}
                    </span>
                  </td>
                  <td className="p-3 text-[#64748B]">{row.lastUpdated}</td>
                  <td className="p-3 font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedState(row);
                        setModalOpen(true);
                      }}
                      className="text-[#2563EB] hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline block mx-auto pt-2">
          Load all 37 states
        </button>
      </div>

      {/* System Efficiency Factor Card */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <span className="font-bold uppercase tracking-wide text-[#64748B] text-[10px] block">
          SYSTEM EFFICIENCY FACTOR
        </span>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <input
              type="text"
              value={efficiencyFactor}
              onChange={(e) => setEfficiencyFactor(e.target.value)}
              className="w-24 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] p-3 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none text-sm"
            />
            <span className="text-[10px] text-[#94A3B8] block">Range: 0.1 - 1.0</span>
          </div>

          <p className="text-xs text-[#64748B] max-w-md">
            Default: 0.8 (accounts for wiring losses, temperature, inverter efficiency). Advanced users may set 0.75–0.85.
          </p>

          <button
            type="button"
            className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8] ml-auto"
          >
            Save Efficiency Factor
          </button>
        </div>
      </div>

      {/* Edit Solar Data Modal */}
      <EditSolarDataModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        stateName={selectedState?.state || "Lagos"}
        zone={selectedState?.zone || "South"}
        initialSunHours={selectedState?.sunHours.replace(" hrs", "") || "4.5"}
        initialIrradiance={selectedState?.irradiance.replace(" kWh/m²", "") || "5.2"}
      />
    </div>
  );
}
