"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { appPaths } from "@/app/router/paths";
import { EditComponentPricingModal } from "../Modals/EditComponentPricingModal";

type PricingItem = {
  type: string;
  capacity?: string;
  wattage?: string;
  unit?: string;
  selling: string;
  cost: string;
  margin: string;
  status: "Active" | "Hidden";
};

export default function ComponentPricingPage() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ type: string; category: string; selling: string; cost: string } | null>(null);

  const solarPanels: PricingItem[] = [
    { type: "Mono PERC 200W", wattage: "200W", selling: "45,000", cost: "28,000", margin: "₦17,000 (37.8%)", status: "Active" },
    { type: "Mono PERC 300W", wattage: "300W", selling: "65,000", cost: "40,000", margin: "₦25,000 (38.5%)", status: "Active" },
    { type: "Mono PERC 400W", wattage: "400W", selling: "85,000", cost: "52,000", margin: "₦33,000 (38.8%)", status: "Active" },
    { type: "Poly 150W (budget)", wattage: "150W", selling: "28,000", cost: "18,000", margin: "₦10,000 (35.7%)", status: "Active" },
    { type: "Bifacial 500W (premium)", wattage: "500W", selling: "120,000", cost: "75,000", margin: "₦45,000 (37.5%)", status: "Active" },
  ];

  const batteries: PricingItem[] = [
    { type: "12V 100Ah AGM", capacity: "-", selling: "85,000", cost: "55,000", margin: "₦30,000 (35.3%)", status: "Active" },
    { type: "12V 200Ah AGM", capacity: "-", selling: "160,000", cost: "105,000", margin: "₦55,000 (34.4%)", status: "Active" },
    { type: "12V 100Ah Lithium (LiFePO4)", capacity: "-", selling: "180,000", cost: "120,000", margin: "₦60,000 (33.3%)", status: "Active" },
    { type: "24V 100Ah Lithium", capacity: "-", selling: "340,000", cost: "225,000", margin: "₦115,000 (33.8%)", status: "Active" },
    { type: "12V 200Ah Lithium", capacity: "-", selling: "350,000", cost: "230,000", margin: "₦120,000 (34.3%)", status: "Active" },
    { type: "12V 100Ah Gel", capacity: "-", selling: "90,000", cost: "58,000", margin: "₦32,000 (35.6%)", status: "Active" },
  ];

  const inverters: PricingItem[] = [
    { type: "1KVA Pure Sine Wave", capacity: "-", selling: "85,000", cost: "42,000", margin: "₦23,000 (35.4%)", status: "Active" },
    { type: "2KVA Pure Sine Wave", capacity: "-", selling: "120,000", cost: "78,000", margin: "₦42,000 (35%)", status: "Active" },
    { type: "3.5KVA Pure Sine Wave", capacity: "-", selling: "185,000", cost: "120,000", margin: "₦65,000 (35.1%)", status: "Active" },
    { type: "5KVA Pure Sine Wave", capacity: "-", selling: "280,000", cost: "182,000", margin: "₦98,000 (35%)", status: "Active" },
    { type: "10KVA 3-Phase", capacity: "-", selling: "850,000", cost: "550,000", margin: "₦300,000 (35.3%)", status: "Active" },
  ];

  const controllers: PricingItem[] = [
    { type: "20A MPPT", capacity: "-", selling: "18,000", cost: "11,000", margin: "₦7,000 (38.9%)", status: "Active" },
    { type: "40A MPPT", capacity: "-", selling: "32,000", cost: "20,000", margin: "₦12,000 (37.5%)", status: "Active" },
    { type: "60A MPPT", capacity: "-", selling: "48,000", cost: "30,000", margin: "₦18,000 (37.5%)", status: "Active" },
    { type: "30A PWM (budget)", capacity: "-", selling: "8,500", cost: "5,200", margin: "₦3,300 (38.8%)", status: "Active" },
  ];

  const installation: PricingItem[] = [
    { type: "Installation Labour (per KVA)", unit: "-", selling: "15,000/KVA", cost: "10,000", margin: "₦5,000 (33.3%)", status: "Active" },
    { type: "Wiring & Cable Set", unit: "-", selling: "25,000", cost: "16,000", margin: "₦9,000 (36%)", status: "Active" },
    { type: "Mounting Structure (per panel)", unit: "-", selling: "8,000", cost: "5,000", margin: "₦3,000 (37.5%)", status: "Active" },
  ];

  const openEdit = (item: PricingItem, category: string) => {
    setSelectedItem({
      type: item.type,
      category,
      selling: item.selling,
      cost: item.cost,
    });
    setModalOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm pb-24">
      {/* Title & Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate(appPaths.solarCctvDesigner)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline mb-1"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Solar CCTV Designer</span>
          </button>
          <h1 className="text-xl font-extrabold text-[#0F172A]">Component Pricing</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Set cost and selling prices per component. These feed directly into user cost estimates.
          </p>
        </div>

        <div className="flex items-center gap-2 font-bold text-xs">
          <button
            type="button"
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Reset to Defaults
          </button>
          <button
            type="button"
            className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-white shadow-xs hover:bg-[#1D4ED8]"
          >
            Save All Changes
          </button>
        </div>
      </div>

      {/* Yellow Warning Banner */}
      <div className="rounded-2xl border border-[#FEF3C7] bg-[#FFFBEB] p-4 text-xs text-[#D97706] font-medium leading-relaxed border-l-4 border-l-[#D97706]">
        Cost prices are used for P&L calculations. Selling prices appear in the tool's cost estimate shown to users. Changes apply immediately to new designs.
      </div>

      {/* Section 1: Solar Panels */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#0F172A]">Solar Panels</h3>
            <span className="text-xs text-[#64748B]">5 panel types</span>
          </div>
          <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline">
            Add Panel Type
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">PANEL TYPE</th>
                <th className="p-3">WATTAGE</th>
                <th className="p-3">SELLING PRICE</th>
                <th className="p-3">COST PRICE</th>
                <th className="p-3">MARGIN</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {solarPanels.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold">{row.type}</td>
                  <td className="p-3 text-[#64748B] font-mono">{row.wattage}</td>
                  <td className="p-3 font-mono font-bold">₦{row.selling}</td>
                  <td className="p-3 font-mono text-[#64748B]">₦{row.cost}</td>
                  <td className="p-3 font-mono font-bold text-[#059669]">{row.margin}</td>
                  <td className="p-3 font-bold text-[#059669]">
                    <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px]">
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 font-bold">
                    <button
                      type="button"
                      onClick={() => openEdit(row, "Solar Panels")}
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
      </div>

      {/* Section 2: Batteries */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#0F172A]">Batteries</h3>
            <span className="text-xs text-[#64748B]">6 battery types</span>
          </div>
          <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline">
            Add Battery Type
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">BATTERY TYPE</th>
                <th className="p-3">CAPACITY</th>
                <th className="p-3">SELLING PRICE</th>
                <th className="p-3">COST PRICE</th>
                <th className="p-3">MARGIN</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {batteries.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold">{row.type}</td>
                  <td className="p-3 text-[#64748B]">{row.capacity}</td>
                  <td className="p-3 font-mono font-bold">₦{row.selling}</td>
                  <td className="p-3 font-mono text-[#64748B]">₦{row.cost}</td>
                  <td className="p-3 font-mono font-bold text-[#059669]">{row.margin}</td>
                  <td className="p-3 font-bold text-[#059669]">
                    <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px]">
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 font-bold">
                    <button
                      type="button"
                      onClick={() => openEdit(row, "Batteries")}
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
      </div>

      {/* Section 3: Inverters */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#0F172A]">Inverters</h3>
            <span className="text-xs text-[#64748B]">5 types</span>
          </div>
          <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline">
            Add Inverter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">INVERTER TYPE</th>
                <th className="p-3">CAPACITY</th>
                <th className="p-3">SELLING PRICE</th>
                <th className="p-3">COST PRICE</th>
                <th className="p-3">MARGIN</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {inverters.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold">{row.type}</td>
                  <td className="p-3 text-[#64748B]">{row.capacity}</td>
                  <td className="p-3 font-mono font-bold">₦{row.selling}</td>
                  <td className="p-3 font-mono text-[#64748B]">₦{row.cost}</td>
                  <td className="p-3 font-mono font-bold text-[#059669]">{row.margin}</td>
                  <td className="p-3 font-bold text-[#059669]">
                    <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px]">
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 font-bold">
                    <button
                      type="button"
                      onClick={() => openEdit(row, "Inverters")}
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
      </div>

      {/* Section 4: Charge Controllers */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#0F172A]">Charge Controllers</h3>
            <span className="text-xs text-[#64748B]">4 types</span>
          </div>
          <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline">
            Add Controller
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">CONTROLLER TYPE</th>
                <th className="p-3">CAPACITY</th>
                <th className="p-3">SELLING PRICE</th>
                <th className="p-3">COST PRICE</th>
                <th className="p-3">MARGIN</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {controllers.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold">{row.type}</td>
                  <td className="p-3 text-[#64748B]">{row.capacity}</td>
                  <td className="p-3 font-mono font-bold">₦{row.selling}</td>
                  <td className="p-3 font-mono text-[#64748B]">₦{row.cost}</td>
                  <td className="p-3 font-mono font-bold text-[#059669]">{row.margin}</td>
                  <td className="p-3 font-bold text-[#059669]">
                    <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px]">
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 font-bold">
                    <button
                      type="button"
                      onClick={() => openEdit(row, "Charge Controllers")}
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
      </div>

      {/* Section 5: Installation & Others */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#0F172A]">Installation & Others</h3>
            <span className="text-xs text-[#64748B]">3 items</span>
          </div>
          <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline">
            Add Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">ITEM</th>
                <th className="p-3">UNIT</th>
                <th className="p-3">SELLING PRICE</th>
                <th className="p-3">COST PRICE</th>
                <th className="p-3">MARGIN</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {installation.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold">{row.type}</td>
                  <td className="p-3 text-[#64748B]">{row.unit}</td>
                  <td className="p-3 font-mono font-bold">₦{row.selling}</td>
                  <td className="p-3 font-mono text-[#64748B]">₦{row.cost}</td>
                  <td className="p-3 font-mono font-bold text-[#059669]">{row.margin}</td>
                  <td className="p-3 font-bold text-[#059669]">
                    <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px]">
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 font-bold">
                    <button
                      type="button"
                      onClick={() => openEdit(row, "Installation & Others")}
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
      </div>

      {/* Floating Unsaved Changes Footer Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between gap-6 rounded-2xl border border-[#CBD5E1] bg-white px-6 py-3 shadow-xl text-xs min-w-[320px]">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#D97706]" />
          <span className="font-bold text-[#D97706]">Unsaved changes</span>
        </div>

        <div className="flex items-center gap-2 font-bold">
          <button
            type="button"
            className="rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-1.5 text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Discard
          </button>
          <button
            type="button"
            className="rounded-xl bg-[#2563EB] px-4 py-1.5 text-white shadow-xs hover:bg-[#1D4ED8]"
          >
            Save All
          </button>
        </div>
      </div>

      {/* Edit Component Pricing Modal */}
      <EditComponentPricingModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        componentName={selectedItem?.type || "400W Mono PERC Solar Panel"}
        category={selectedItem?.category || "Solar Panels"}
        initialSelling={selectedItem?.selling || "85,000"}
        initialCost={selectedItem?.cost || "52,000"}
      />
    </div>
  );
}
