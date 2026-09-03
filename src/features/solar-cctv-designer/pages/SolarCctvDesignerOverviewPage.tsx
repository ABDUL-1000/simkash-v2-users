import { useState } from "react";
import { Check, Download, Info, Lightbulb, Share2, Sun, Wrench, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AddCustomApplianceModal } from "../Modals/AddCustomApplianceModal";
import { DesignSavedModal } from "../Modals/DesignSavedModal";
import { SolarCctvQuoteModal } from "../Modals/SolarCctvQuoteModal";
import { AddSystemToCartModal } from "../Modals/AddSystemToCartModal";

interface ApplianceItem {
  id: string;
  name: string;
  qty: number;
  watts: number;
  hours: number;
}

export default function SolarCctvDesignerOverviewPage() {
  const navigate = useNavigate();

  // Wizard Step: 1 (Appliances), 2 (Capacity), 3 (Recommendation), 4 (Your System)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Appliances List
  const [appliances, setAppliances] = useState<ApplianceItem[]>([
    { id: "1", name: "LED Bulb", qty: 8, watts: 10, hours: 8 },
    { id: "2", name: "Ceiling Fan", qty: 3, watts: 75, hours: 10 },
    { id: "3", name: "32\" TV", qty: 1, watts: 80, hours: 6 },
    { id: "4", name: "CCTV Camera", qty: 4, watts: 15, hours: 24 },
    { id: "5", name: "DVR/NVR", qty: 1, watts: 25, hours: 24 },
    { id: "6", name: "Fridge (200L)", qty: 1, watts: 150, hours: 24 },
  ]);

  // Step 2: Capacity Preferences
  const [backupHours, setBackupHours] = useState(8);
  const [userState, setUserState] = useState("Lagos");
  const [simConnectivity, setSimConnectivity] = useState(true);
  const [inverterType, setInverterType] = useState<"pure" | "modified">("pure");

  // Step 3: Tier Selection
  const [selectedTier, setSelectedTier] = useState<"economy" | "standard" | "premium">("standard");

  // Modals state
  const [customApplianceModalOpen, setCustomApplianceModalOpen] = useState(false);
  const [designSavedModalOpen, setDesignSavedModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [addToCartModalOpen, setAddToCartModalOpen] = useState(false);

  // Calculations
  const totalDailyLoadWh = appliances.reduce(
    (sum, a) => sum + a.qty * a.watts * a.hours,
    0
  );

  const quickAddPresets = [
    { name: "LED Bulb", watts: 10 },
    { name: "Fluorescent", watts: 40 },
    { name: "Floodlight", watts: 100 },
    { name: "Ceiling Fan", watts: 75 },
    { name: "AC (1HP)", watts: 1200 },
    { name: "AC (2HP)", watts: 2400 },
    { name: "Standing Fan", watts: 50 },
    { name: "CCTV Camera", watts: 15 },
    { name: "DVR/NVR", watts: 25 },
    { name: "Security Light", watts: 30 },
    { name: "TV (32\")", watts: 80 },
    { name: "TV (43\")", watts: 120 },
    { name: "Sound System", watts: 100 },
    { name: "Fridge (200L)", watts: 150 },
    { name: "Fridge (400L)", watts: 300 },
    { name: "Kettle", watts: 1500 },
    { name: "Microwave", watts: 1200 },
    { name: "Laptop", watts: 65 },
    { name: "Desktop", watts: 200 },
    { name: "Printer", watts: 150 },
    { name: "Router/Modem", watts: 12 },
  ];

  const handleAddPreset = (preset: { name: string; watts: number }) => {
    const existing = appliances.find((a) => a.name === preset.name);
    if (existing) {
      setAppliances(
        appliances.map((a) =>
          a.name === preset.name ? { ...a, qty: a.qty + 1 } : a
        )
      );
    } else {
      setAppliances([
        ...appliances,
        {
          id: crypto.randomUUID(),
          name: preset.name,
          qty: 1,
          watts: preset.watts,
          hours: 8,
        },
      ]);
    }
  };

  const updateQty = (id: string, delta: number) => {
    setAppliances(
      appliances.map((a) => {
        if (a.id === id) {
          const newQty = Math.max(1, a.qty + delta);
          return { ...a, qty: newQty };
        }
        return a;
      })
    );
  };

  const removeAppliance = (id: string) => {
    setAppliances(appliances.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* 4-Step Header Stepper Bar */}
      <div className="flex items-center justify-between border-b border-[#E2ECF6] pb-4 text-xs">
        <div
          onClick={() => setStep(1)}
          className={`flex cursor-pointer items-center gap-2 font-bold ${
            step === 1 ? "text-[#2563EB]" : "text-[#10B981]"
          }`}
        >
          <span
            className={`flex size-6 items-center justify-center rounded-full text-[10px] text-white ${
              step > 1 ? "bg-[#10B981]" : "bg-[#2563EB]"
            }`}
          >
            {step > 1 ? "✓" : "1"}
          </span>
          <span>Appliances →</span>
        </div>

        <div
          onClick={() => setStep(2)}
          className={`flex cursor-pointer items-center gap-2 font-bold ${
            step === 2 ? "text-[#2563EB]" : step > 2 ? "text-[#10B981]" : "text-[#8C909B]"
          }`}
        >
          <span
            className={`flex size-6 items-center justify-center rounded-full text-[10px] ${
              step === 2
                ? "bg-[#2563EB] text-white"
                : step > 2
                ? "bg-[#10B981] text-white"
                : "bg-[#EFF4F8] text-[#8C909B]"
            }`}
          >
            {step > 2 ? "✓" : "2"}
          </span>
          <span>Capacity →</span>
        </div>

        <div
          onClick={() => setStep(3)}
          className={`flex cursor-pointer items-center gap-2 font-bold ${
            step === 3 ? "text-[#2563EB]" : step > 3 ? "text-[#10B981]" : "text-[#8C909B]"
          }`}
        >
          <span
            className={`flex size-6 items-center justify-center rounded-full text-[10px] ${
              step === 3
                ? "bg-[#2563EB] text-white"
                : step > 3
                ? "bg-[#10B981] text-white"
                : "bg-[#EFF4F8] text-[#8C909B]"
            }`}
          >
            {step > 3 ? "✓" : "3"}
          </span>
          <span>Recommendation →</span>
        </div>

        <div
          onClick={() => setStep(4)}
          className={`flex cursor-pointer items-center gap-2 font-bold ${
            step === 4 ? "text-[#2563EB]" : "text-[#8C909B]"
          }`}
        >
          <span
            className={`flex size-6 items-center justify-center rounded-full text-[10px] ${
              step === 4 ? "bg-[#2563EB] text-white" : "bg-[#EFF4F8] text-[#8C909B]"
            }`}
          >
            4
          </span>
          <span>Your System</span>
        </div>
      </div>

      {/* STEP 1: Appliances Page */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0F152A]">What do you want to power?</h1>
            <p className="mt-0.5 text-xs text-[#8C909B]">
              Add all your appliances to get an accurate system recommendation
            </p>
          </div>

          {/* Quick Add Appliances Chips */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              QUICK ADD APPLIANCES
            </h4>
            <div className="flex flex-wrap gap-2">
              {quickAddPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddPreset(preset)}
                  className="flex items-center gap-1.5 rounded-full border border-[#E2ECF6] bg-[#F8FAFC] px-3.5 py-1.5 text-xs font-bold text-[#0F152A] transition hover:border-[#2563EB] hover:bg-[#EFF4F8]"
                >
                  <Lightbulb className="size-3.5 text-[#F59E0B]" />
                  <span>{preset.name}</span>
                  <span className="text-[10px] font-normal text-[#8C909B]">{preset.watts}W</span>
                </button>
              ))}
            </div>
            <p
              onClick={() => setCustomApplianceModalOpen(true)}
              className="text-[11px] font-bold text-[#2563EB] hover:underline cursor-pointer pt-1"
            >
              + Add custom appliance
            </p>
          </div>

          {/* Your Appliances Table Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0F152A] flex items-center gap-2">
                Your Appliances
                <span className="rounded-full bg-[#2563EB] px-2 py-0.5 text-[10px] font-bold text-white">
                  {appliances.length}
                </span>
              </h3>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-[#E2ECF6]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAFC] font-bold text-[#8C909B] border-b border-[#E2ECF6]">
                  <tr>
                    <th className="py-3 px-4">Appliance</th>
                    <th className="py-3 px-4 text-center">Qty</th>
                    <th className="py-3 px-4 text-center">Watts</th>
                    <th className="py-3 px-4 text-center">Hours/Day</th>
                    <th className="py-3 px-4 text-right">Daily Load</th>
                    <th className="py-3 px-4 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2ECF6]">
                  {appliances.map((item) => {
                    const dailyWh = item.qty * item.watts * item.hours;
                    return (
                      <tr key={item.id} className="hover:bg-[#F8FAFC]">
                        <td className="py-3.5 px-4 font-bold text-[#0F152A]">{item.name}</td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="inline-flex items-center rounded-xl border border-[#E2ECF6] bg-[#F8FAFC]">
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, -1)}
                              className="px-2 py-0.5 text-xs font-bold text-[#0F152A]"
                            >
                              -
                            </button>
                            <span className="px-2 py-0.5 text-xs font-extrabold text-[#0F152A]">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.id, 1)}
                              className="px-2 py-0.5 text-xs font-bold text-[#0F152A]"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center text-[#66738C] font-semibold">
                          {item.watts}W
                        </td>
                        <td className="py-3.5 px-4 text-center text-[#66738C] font-semibold">
                          {item.hours}h
                        </td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-[#10B981]">
                          {dailyWh.toLocaleString()}Wh
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            type="button"
                            onClick={() => removeAppliance(item.id)}
                            className="text-[#EF4444] hover:opacity-80"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-[#F8FAFC] border-t border-[#E2ECF6] font-bold">
                  <tr>
                    <td colSpan={4} className="py-3.5 px-4 text-[#0F152A]">Total Daily Load:</td>
                    <td colSpan={2} className="py-3.5 px-4 text-right font-extrabold text-[#0F152A] text-sm">
                      {totalDailyLoadWh.toLocaleString()}Wh
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <button
              type="button"
              onClick={() => setCustomApplianceModalOpen(true)}
              className="text-xs font-bold text-[#2563EB] hover:underline"
            >
              + Add Appliance
            </button>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={() => setAppliances([])}
              className="rounded-xl border border-[#EF4444] px-6 py-2.5 text-xs font-bold text-[#EF4444] hover:bg-red-50"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Continue to Step 2 →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Capacity Page */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0F152A]">Your power requirements</h1>
            <p className="mt-0.5 text-xs text-[#8C909B]">Tell us more about your setup</p>
          </div>

          {/* From Your Appliances Banner Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              FROM YOUR APPLIANCES
            </span>
            <p className="text-[#66738C]">
              {appliances.map((a) => `${a.name} ×${a.qty}`).join(" + ")}
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="font-extrabold text-[#0F152A] text-sm">
                Total daily load: {totalDailyLoadWh.toLocaleString()}Wh
              </span>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-[#2563EB] hover:underline"
              >
                Edit appliances ←
              </button>
            </div>
          </div>

          {/* Main 2-Column Capacity Grid */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* How Many Hours of Backup? */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
                  HOW MANY HOURS OF BACKUP?
                </label>
                <p className="text-[11px] text-[#8C909B]">Hours the system runs without sunlight</p>

                <div className="grid grid-cols-3 gap-3 pt-1">
                  {[
                    { hours: 4, desc: "~1.5KVA minimum system" },
                    { hours: 6, desc: "~2KVA minimum system" },
                    { hours: 8, desc: "~3.2KVA suggested setup" },
                    { hours: 12, desc: "~5KVA large system" },
                    { hours: 16, desc: "~7.5KVA extended power" },
                    { hours: 24, desc: "~10KVA complete autonomy" },
                  ].map((item) => {
                    const isSelected = backupHours === item.hours;
                    return (
                      <div
                        key={item.hours}
                        onClick={() => setBackupHours(item.hours)}
                        className={`cursor-pointer rounded-2xl border p-4 transition ${
                          isSelected
                            ? "border-[#2563EB] bg-[#EFF4F8] ring-2 ring-[#2563EB]"
                            : "border-[#E2ECF6] bg-white hover:border-slate-300"
                        }`}
                      >
                        <h4 className="text-sm font-extrabold text-[#0F152A]">{item.hours} hours</h4>
                        <p className="text-[10px] text-[#8C909B] mt-0.5">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* State Dropdown */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
                  YOUR STATE
                </label>
                <select
                  value={userState}
                  onChange={(e) => setUserState(e.target.value)}
                  className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-3 px-4 text-xs font-bold text-[#0F152A] outline-none"
                >
                  <option value="Lagos">Lagos State</option>
                  <option value="Abuja">Abuja FCT</option>
                  <option value="Rivers">Rivers State</option>
                  <option value="Kano">Kano State</option>
                </select>
                <span className="inline-block rounded-md bg-[#EFF4F8] px-2.5 py-1 text-[10px] font-bold text-[#2563EB]">
                  Lagos: 4.5 peak sun hours/day
                </span>
              </div>

              {/* CCTV Cameras List Notice */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
                  ARE CCTV CAMERAS IN YOUR LIST?
                </label>
                <div className="flex items-center gap-2 rounded-xl bg-[#EBFFF8] p-2.5 text-xs font-bold text-[#10B981]">
                  <Check className="size-4 stroke-[3]" /> 4 CCTV cameras detected
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#0F152A]">
                  <span>Would you like SIM connectivity added to your recommendation?</span>
                  <input
                    type="checkbox"
                    checked={simConnectivity}
                    onChange={() => setSimConnectivity(!simConnectivity)}
                    className="size-5 accent-[#2563EB]"
                  />
                </div>
              </div>

              {/* Inverter Type Preference */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
                  INVERTER TYPE PREFERENCE
                </label>
                <div className="space-y-2">
                  <div
                    onClick={() => setInverterType("pure")}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      inverterType === "pure"
                        ? "border-[#2563EB] bg-[#EFF4F8] ring-2 ring-[#2563EB]"
                        : "border-[#E2ECF6] bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input type="radio" checked={inverterType === "pure"} readOnly className="size-4 accent-[#2563EB]" />
                      <span className="text-xs font-extrabold text-[#0F152A]">Pure Sine Wave (selected)</span>
                    </div>
                    <p className="text-[11px] text-[#66738C] mt-1 pl-6">
                      Recommended for sensitive electronics, AC units and CCTV · Higher quality · Higher cost
                    </p>
                  </div>

                  <div
                    onClick={() => setInverterType("modified")}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      inverterType === "modified"
                        ? "border-[#2563EB] bg-[#EFF4F8] ring-2 ring-[#2563EB]"
                        : "border-[#E2ECF6] bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input type="radio" checked={inverterType === "modified"} readOnly className="size-4 accent-[#2563EB]" />
                      <span className="text-xs font-extrabold text-[#0F152A]">Modified Sine Wave</span>
                    </div>
                    <p className="text-[11px] text-[#66738C] mt-1 pl-6">
                      Suitable for basic loads only — lights, fans, chargers · Budget friendly
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Summary Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Estimated System Size Card */}
              <div className="rounded-2xl border border-[#D0DFF0] bg-[#EFF4F8] p-6 shadow-xs text-center space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB]">
                  ESTIMATED SYSTEM SIZE
                </span>
                <h2 className="text-4xl font-extrabold text-[#2563EB]">~3.2KVA</h2>
                <p className="text-xs text-[#8C909B]">Based on {totalDailyLoadWh.toLocaleString()}Wh load + {backupHours}hrs backup</p>

                <div className="divide-y divide-[#D0DFF0] text-xs text-left pt-2">
                  <div className="py-2 flex items-center gap-2 font-bold text-[#0F152A]">
                    <Sun className="size-4 text-[#F59E0B]" /> Solar Panels: ~3 × 400W
                  </div>
                  <div className="py-2 flex items-center gap-2 font-bold text-[#0F152A]">
                    <Zap className="size-4 text-[#10B981]" /> Batteries: ~4 × 200Ah
                  </div>
                  <div className="py-2 flex items-center gap-2 font-bold text-[#0F152A]">
                    <Zap className="size-4 text-[#2563EB]" /> Suggested Inverter: 3.5KVA
                  </div>
                </div>

                <p
                  onClick={() => setStep(3)}
                  className="text-[11px] font-bold text-[#2563EB] hover:underline cursor-pointer pt-2"
                >
                  Full recommendation in step 3 →
                </p>
              </div>

              {/* Tips Card */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2 text-xs">
                <h4 className="font-extrabold text-[#0F152A] flex items-center gap-1.5">
                  <Info className="size-4 text-[#2563EB]" /> Tips for better results
                </h4>
                <ul className="space-y-1.5 text-[#66738C] text-[11px] list-disc pl-4">
                  <li>AGM batteries are stable and cost-effective, while Lithium offers longer lifespans.</li>
                  <li>Pure Sine wave is essential to avoid horizontal hum lines in your video feeds.</li>
                  <li>Lagos has high relative cloud density; 8h backup secures continuous operation.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Get Recommendation →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Recommendation Page */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#0F152A]">Your system recommendation</h1>
            <p className="mt-0.5 text-xs text-[#8C909B]">3 options based on your requirements</p>
          </div>

          {/* 3 Tier Selection Tabs */}
          <div className="grid grid-cols-3 gap-4">
            <div
              onClick={() => setSelectedTier("economy")}
              className={`cursor-pointer rounded-2xl border p-5 text-center transition ${
                selectedTier === "economy"
                  ? "border-[#2563EB] bg-[#EFF4F8] ring-2 ring-[#2563EB]"
                  : "border-[#E2ECF6] bg-white hover:border-slate-300"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B] block">ECONOMY</span>
              <span className="text-xl font-extrabold text-[#0F152A] mt-1 block">₦480,000</span>
            </div>

            <div
              onClick={() => setSelectedTier("standard")}
              className={`cursor-pointer rounded-2xl border p-5 text-center transition ${
                selectedTier === "standard"
                  ? "border-[#2563EB] bg-[#EFF4F8] ring-2 ring-[#2563EB]"
                  : "border-[#E2ECF6] bg-white hover:border-slate-300"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2563EB] block">
                STANDARD (SELECTED)
              </span>
              <span className="text-xl font-extrabold text-[#2563EB] mt-1 block">₦1,209,000</span>
            </div>

            <div
              onClick={() => setSelectedTier("premium")}
              className={`cursor-pointer rounded-2xl border p-5 text-center transition ${
                selectedTier === "premium"
                  ? "border-[#2563EB] bg-[#EFF4F8] ring-2 ring-[#2563EB]"
                  : "border-[#E2ECF6] bg-white hover:border-slate-300"
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B] block">PREMIUM</span>
              <span className="text-xl font-extrabold text-[#0F152A] mt-1 block">₦2,847,000</span>
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column — Components & Breakdown (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Standard Tier Components */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-[#0F152A]">Standard Tier — Components</h3>

                <div className="divide-y divide-[#E2ECF6] text-xs">
                  <div className="flex items-center justify-between py-3.5 first:pt-0">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-[#FFFBEB] flex items-center justify-center text-[#F59E0B]">
                        <Sun className="size-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#0F152A]">3 × 400W Mono PERC Panels</h4>
                        <p className="text-[10px] text-[#8C909B]">Total: 1,200W array · 3 panels</p>
                        <span className="text-[10px] font-bold text-[#2563EB] hover:underline cursor-pointer">
                          View product
                        </span>
                      </div>
                    </div>
                    <span className="font-extrabold text-[#0F152A]">₦255,000</span>
                  </div>

                  <div className="flex items-center justify-between py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-[#EBFFF8] flex items-center justify-center text-[#10B981]">
                        <Zap className="size-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#0F152A]">4 × 12V 200Ah AGM Batteries</h4>
                        <p className="text-[10px] text-[#8C909B]">Total: 800Ah capacity at 12V</p>
                        <span className="text-[10px] font-bold text-[#2563EB] hover:underline cursor-pointer">
                          View product
                        </span>
                      </div>
                    </div>
                    <span className="font-extrabold text-[#0F152A]">₦640,000</span>
                  </div>

                  <div className="flex items-center justify-between py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-[#EFF4F8] flex items-center justify-center text-[#2563EB]">
                        <Zap className="size-5" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#0F152A]">1 × 3.5KVA Pure Sine Wave</h4>
                        <p className="text-[10px] text-[#8C909B]">Handles peak load up to 3.5KW</p>
                        <span className="text-[10px] font-bold text-[#2563EB] hover:underline cursor-pointer">
                          View product
                        </span>
                      </div>
                    </div>
                    <span className="font-extrabold text-[#0F152A]">₦185,000</span>
                  </div>

                  <div className="flex items-center justify-between py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center text-[#0F152A]">
                        🔌
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#0F152A]">1 × 40A MPPT Controller</h4>
                        <p className="text-[10px] text-[#8C909B]">Optimises panel charging</p>
                        <span className="text-[10px] font-bold text-[#2563EB] hover:underline cursor-pointer">
                          View product
                        </span>
                      </div>
                    </div>
                    <span className="font-extrabold text-[#0F152A]">₦32,000</span>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown Card */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#8C909B]">
                  COST BREAKDOWN
                </h3>

                <div className="divide-y divide-[#E2ECF6] text-xs">
                  <div className="flex justify-between py-2 first:pt-0 text-[#66738C]">
                    <span>Components</span>
                    <span className="font-extrabold text-[#0F152A]">₦1,112,000</span>
                  </div>
                  <div className="flex justify-between py-2 text-[#66738C]">
                    <span>Installation</span>
                    <span className="font-extrabold text-[#0F152A]">₦48,000</span>
                  </div>
                  <div className="flex justify-between py-2 text-[#66738C]">
                    <span>Wiring & Cable</span>
                    <span className="font-extrabold text-[#0F152A]">₦25,000</span>
                  </div>
                  <div className="flex justify-between py-2 text-[#66738C]">
                    <span>Mounting kits</span>
                    <span className="font-extrabold text-[#0F152A]">₦24,000</span>
                  </div>
                  <div className="flex justify-between py-3 font-extrabold text-base pt-3 text-[#2563EB]">
                    <span>Total Standard System Price</span>
                    <span>₦1,209,000</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#FCEEC1] bg-[#FFFBEB] p-3 text-xs font-bold text-[#D9990D]">
                  ⚠️ ₦209,000 over your budget. Consider Economy tier.
                </div>
              </div>

              {/* Add-on Toggles */}
              <div className="space-y-3">
                {/* CCTV SIM Connectivity */}
                <div className="rounded-2xl border border-[#D0DFF0] bg-[#EBFFF8] p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#0F152A] flex items-center gap-1.5">
                      📶 CCTV SIM Connectivity
                    </span>
                    <input
                      type="checkbox"
                      checked={simConnectivity}
                      onChange={() => setSimConnectivity(!simConnectivity)}
                      className="size-5 accent-[#10B981]"
                    />
                  </div>
                  <p className="text-[11px] text-[#66738C]">
                    Add data SIM to each CCTV camera for remote monitoring
                  </p>
                  <p className="font-bold text-[#10B981]">
                    Add 4 × CCTV SIMs <span className="text-[10px] font-normal text-[#8C909B]">(₦5,000/month per SIM · ₦20,000/mo total)</span>
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] text-[#8C909B]">Network:</span>
                    {["MTN", "Airtel", "Glo", "T2 (Pre-Selected)"].map((net) => (
                      <span
                        key={net}
                        className="rounded-lg bg-white border border-[#E2ECF6] px-2.5 py-0.5 text-[10px] font-bold text-[#0F152A]"
                      >
                        {net}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Professional Installation */}
                <div className="rounded-2xl border border-[#E2ECF6] bg-white p-4 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[#0F152A] flex items-center gap-1.5">
                      <Wrench className="size-4 text-[#2563EB]" /> Professional Installation
                    </span>
                    <input type="checkbox" checked readOnly className="size-5 accent-[#2563EB]" />
                  </div>
                  <p className="text-[11px] text-[#66738C]">By certified Simkash installer</p>
                  <p className="font-extrabold text-[#2563EB]">₦48,000 · Lagos · Within 48 hours</p>
                </div>
              </div>
            </div>

            {/* Right Column — Why Standard & Comparison (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Why Standard Card */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2 text-xs">
                <h4 className="font-extrabold uppercase tracking-wider text-[#8C909B] text-[10px]">
                  WHY STANDARD?
                </h4>
                <ul className="space-y-2 text-[#0F152A] font-semibold text-[11px]">
                  <li className="flex items-center gap-2 text-[#10B981]">
                    <Check className="size-4 stroke-[3]" /> Covers 9,010Wh load safely
                  </li>
                  <li className="flex items-center gap-2 text-[#10B981]">
                    <Check className="size-4 stroke-[3]" /> Guaranteed 8 hours night backup
                  </li>
                  <li className="flex items-center gap-2 text-[#10B981]">
                    <Check className="size-4 stroke-[3]" /> Pure sine wave protects CCTV
                  </li>
                  <li className="flex items-center gap-2 text-[#10B981]">
                    <Check className="size-4 stroke-[3]" /> Optimized for Lagos 4.5 peak sun
                  </li>
                </ul>
              </div>

              {/* Tier Comparison Card */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3 text-xs">
                <h4 className="font-extrabold uppercase tracking-wider text-[#8C909B] text-[10px]">
                  TIER COMPARISON
                </h4>
                <div className="divide-y divide-[#E2ECF6] text-[11px]">
                  <div className="flex justify-between py-1.5 first:pt-0">
                    <span className="text-[#8C909B]">Backup</span>
                    <span className="font-bold text-[#0F152A]">6h / 8h / 12h</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#8C909B]">Panels</span>
                    <span className="font-bold text-[#0F152A]">2×300 / 3×400 / 4×500</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#8C909B]">Batteries</span>
                    <span className="font-bold text-[#0F152A]">2×200 / 4×200 / 6×200</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#8C909B]">Inverter</span>
                    <span className="font-bold text-[#0F152A]">2KVA / 3.5KVA / 5KVA</span>
                  </div>
                  <div className="flex justify-between py-2 pt-2 border-t border-[#E2ECF6] font-bold text-[#2563EB]">
                    <span>Price</span>
                    <span>N480K / N1.2M / N2.8M</span>
                  </div>
                </div>
              </div>

              {/* System Lifespan Card */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2 text-xs">
                <h4 className="font-extrabold uppercase tracking-wider text-[#8C909B] text-[10px]">
                  SYSTEM LIFESPAN
                </h4>
                <div className="space-y-1.5 text-[11px] font-semibold text-[#0F152A]">
                  <p>☀️ Panels: 25+ years</p>
                  <p>🔋 Batteries: 5–7 years (AGM)</p>
                  <p>⚡ Inverter: 10–15 years</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={() => setStep(4)}
              className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-8 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              View Full Design →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Your System / Full Design Page */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#0F152A]">Your Solar CCTV System</h1>
              <p className="mt-0.5 text-xs text-[#8C909B]">Standard Tier · ₦1,209,000 total</p>
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column — Visual System Diagram Flow (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#0F152A]">System Arrangement</h3>
                  <button
                    type="button"
                    onClick={() => setQuoteModalOpen(true)}
                    className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    <Download className="size-3.5" /> Download PDF Quote
                  </button>
                </div>

                {/* Vertical Diagram Flow */}
                <div className="space-y-3 py-2 text-center">
                  {/* Block 1 */}
                  <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-6 text-center">
                    <span className="text-5xl">☀️</span>
                    <h4 className="font-extrabold text-xs text-[#0F152A] mt-2">
                      3 × 400W Panels — 1,200W Array
                    </h4>
                  </div>

                  <span className="block text-[#10B981] font-extrabold text-lg">|</span>

                  {/* Block 2 */}
                  <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-6 text-center">
                    <span className="text-5xl">🔌</span>
                    <h4 className="font-extrabold text-xs text-[#0F152A] mt-2">
                      40A MPPT Controller
                    </h4>
                  </div>

                  <span className="block text-[#10B981] font-extrabold text-lg">|</span>

                  {/* Block 3 */}
                  <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-6 text-center">
                    <span className="text-5xl">🔋</span>
                    <h4 className="font-extrabold text-xs text-[#0F152A] mt-2">
                      Battery Bank — 4 × 200Ah = 800Ah
                    </h4>
                  </div>

                  <span className="block text-[#10B981] font-extrabold text-lg">|</span>

                  {/* Block 4 */}
                  <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-6 text-center">
                    <span className="text-5xl">⚡</span>
                    <h4 className="font-extrabold text-xs text-[#0F152A] mt-2">
                      3.5KVA Inverter
                    </h4>
                  </div>

                  <span className="block text-[#10B981] font-extrabold text-lg">|</span>

                  {/* Block 5 */}
                  <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-6 text-center">
                    <span className="text-5xl">🎛️</span>
                    <h4 className="font-extrabold text-xs text-[#0F152A] mt-2">
                      AC Distribution Board
                    </h4>
                  </div>
                </div>

                {/* Included Standard Tier Components Table */}
                <div className="divide-y divide-[#E2ECF6] border-t border-[#E2ECF6] pt-4 text-xs">
                  <h4 className="font-bold text-[#0F152A] pb-2">Included Standard Tier Components</h4>
                  <div className="flex justify-between py-2 text-[#0F152A]">
                    <span>☀️ 3× 400W Mono Solar Panels</span>
                    <span className="font-extrabold">₦255,000</span>
                  </div>
                  <div className="flex justify-between py-2 text-[#0F152A]">
                    <span>🔋 4× 200Ah Deep Cycle AGM Batteries</span>
                    <span className="font-extrabold">₦640,000</span>
                  </div>
                  <div className="flex justify-between py-2 text-[#0F152A]">
                    <span>⚡ 3.5KVA Pure Sine Wave Inverter</span>
                    <span className="font-extrabold">₦185,000</span>
                  </div>
                  <div className="flex justify-between py-2 text-[#0F152A]">
                    <span>🔌 40A MPPT Charge Controller</span>
                    <span className="font-extrabold">₦32,000</span>
                  </div>
                  <div className="flex justify-between py-3 pt-3 border-t border-[#E2ECF6] font-extrabold text-sm text-[#2563EB]">
                    <span>Hardware Subtotal</span>
                    <span>₦1,112,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column — Save Design & Ready to Order (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Save Your Design Card */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3 text-xs">
                <h4 className="font-extrabold uppercase tracking-wider text-[#8C909B] text-[10px]">
                  SAVE YOUR DESIGN
                </h4>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#8C909B]">Design Name:</label>
                  <input
                    type="text"
                    defaultValue="My Solar CCTV System"
                    className="w-full rounded-xl border border-[#E2ECF6] bg-[#F8FAFC] py-2 px-3 text-xs font-bold text-[#0F152A] outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setDesignSavedModalOpen(true)}
                  className="w-full rounded-xl bg-[#2563EB] py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700"
                >
                  Save Design
                </button>
                <button
                  type="button"
                  onClick={() => setQuoteModalOpen(true)}
                  className="w-full rounded-xl border border-[#E2ECF6] py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
                >
                  Get a PDF Quote
                </button>
                <button
                  type="button"
                  className="w-full rounded-xl border border-[#E2ECF6] py-2 text-xs font-bold text-[#10B981] hover:bg-emerald-50 flex items-center justify-center gap-1.5"
                >
                  <Share2 className="size-3.5" /> Share via WhatsApp
                </button>
              </div>

              {/* Ready to Order? Card */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-3 text-xs">
                <h4 className="font-extrabold text-[#0F152A]">Ready to Order?</h4>

                <div className="divide-y divide-[#E2ECF6] text-[11px]">
                  <div className="flex justify-between py-1.5 first:pt-0">
                    <span className="text-[#8C909B]">Components Hardware</span>
                    <span className="font-bold text-[#0F152A]">₦1,112,000</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#8C909B]">CCTV SIMs (4 × MTN)</span>
                    <span className="font-bold text-[#0F152A]">₦20,000/mo</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#8C909B]">Installation Service</span>
                    <span className="font-bold text-[#0F152A]">₦48,000</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#8C909B]">Heavy Duty Wiring</span>
                    <span className="font-bold text-[#0F152A]">₦25,000</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[#8C909B]">Solar Mounting Kit</span>
                    <span className="font-bold text-[#0F152A]">₦24,000</span>
                  </div>
                  <div className="flex justify-between py-2 pt-2 border-t border-[#E2ECF6] font-extrabold text-sm text-[#2563EB]">
                    <span>Total Price</span>
                    <span>₦1,209,000</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setAddToCartModalOpen(true)}
                  className="w-full rounded-xl bg-[#10B981] py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-600"
                >
                  Add All to Cart
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/marketplace")}
                  className="w-full text-center text-xs font-bold text-[#8C909B] hover:underline"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Speak to an Expert Card */}
              <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs space-y-2 text-xs">
                <h4 className="font-extrabold text-[#0F152A]">Speak to an expert</h4>
                <p className="text-[11px] text-[#66738C]">
                  Our solar team reviews your design before purchase
                </p>
                <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
                  Contact Solar Team →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-xl border border-[#E2ECF6] px-6 py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* Linked Modals */}
      <AddCustomApplianceModal
        open={customApplianceModalOpen}
        onOpenChange={setCustomApplianceModalOpen}
        onAddAppliance={(newItem) => {
          setAppliances([
            ...appliances,
            {
              id: crypto.randomUUID(),
              name: newItem.name,
              qty: 1,
              watts: newItem.watts,
              hours: newItem.hours,
            },
          ]);
        }}
      />
      <DesignSavedModal
        open={designSavedModalOpen}
        onOpenChange={setDesignSavedModalOpen}
        onGetPdfQuoteClick={() => setQuoteModalOpen(true)}
      />
      <SolarCctvQuoteModal
        open={quoteModalOpen}
        onOpenChange={setQuoteModalOpen}
      />
      <AddSystemToCartModal
        open={addToCartModalOpen}
        onOpenChange={setAddToCartModalOpen}
        systemTier="Standard Tier · 3.2KVA"
        hardwarePrice={1112000}
      />
    </div>
  );
}
