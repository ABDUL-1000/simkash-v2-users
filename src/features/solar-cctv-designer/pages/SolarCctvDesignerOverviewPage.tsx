"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { DashboardStats } from "@/features/distribution/agency-partner/components/DashboardStat";
import { appPaths } from "@/app/router/paths";

import { AddApplianceModal } from "../Modals/AddApplianceModal";
import { EditApplianceModal } from "../Modals/EditApplianceModal";
import { DeleteDesignModal } from "../Modals/DeleteDesignModal";

type DesignRow = {
  ref: string;
  user: string;
  role: "SC" | "AP";
  systemSize: string;
  totalEstimate: string;
  tier: "Premium" | "Standard" | "Economy";
  converted: "Yes" | "No" | "Pending" | "-";
  created: string;
  isDeleted?: boolean;
};

const DUMMY_DESIGNS: DesignRow[] = [
  { ref: "SOL-2026-00147", user: "Chidi Eze", role: "SC", systemSize: "3.5KVA", totalEstimate: "₦1,240,000", tier: "Premium", converted: "Yes", created: "Jun 28" },
  { ref: "SOL-2026-00146", user: "Fatima Bello", role: "AP", systemSize: "2.5KVA", totalEstimate: "₦780,000", tier: "Standard", converted: "Yes", created: "Jun 27" },
  { ref: "SOL-2026-00145", user: "Kingsley Ade", role: "AP", systemSize: "5.0KVA", totalEstimate: "₦2,100,000", tier: "Premium", converted: "Yes", created: "Jun 26" },
  { ref: "SOL-2026-00144", user: "Grace Obi", role: "SC", systemSize: "1.5KVA", totalEstimate: "₦420,000", tier: "Economy", converted: "No", created: "Jun 25" },
  { ref: "SOL-2026-00143", user: "Ibrahim Musa", role: "AP", systemSize: "3.2KVA", totalEstimate: "₦950,000", tier: "Standard", converted: "No", created: "Jun 24" },
  { ref: "SOL-2026-00142", user: "Amina Yusuf", role: "AP", systemSize: "2.0KVA", totalEstimate: "₦580,000", tier: "Economy", converted: "Pending", created: "Jun 23" },
  { ref: "SOL-2026-00141", user: "Emeka Nwosu", role: "SC", systemSize: "4.0KVA", totalEstimate: "₦1,680,000", tier: "Standard", converted: "Pending", created: "Jun 22" },
  { ref: "SOL-2026-00140", user: "Joy Effiong", role: "AP", systemSize: "1.0KVA", totalEstimate: "₦310,000", tier: "Economy", converted: "-", created: "Jun 21", isDeleted: true },
];

type ApplianceRow = {
  name: string;
  category: string;
  categoryBadge: string;
  defaultWatts: string;
  cctvRelated?: boolean;
  status: "Active" | "Hidden";
};

const DUMMY_APPLIANCES: ApplianceRow[] = [
  { name: "LED Bulb (10W)", category: "Lighting", categoryBadge: "bg-[#EFF6FF] text-[#2563EB]", defaultWatts: "10W", status: "Active" },
  { name: "Ceiling Fan", category: "Cooling", categoryBadge: "bg-[#ECFDF5] text-[#059669]", defaultWatts: "75W", status: "Active" },
  { name: "Split AC (1HP)", category: "Cooling", categoryBadge: "bg-[#ECFDF5] text-[#059669]", defaultWatts: "750W", status: "Active" },
  { name: "CCTV Camera", category: "Security", categoryBadge: "bg-[#FFE4E6] text-[#E11D48]", defaultWatts: "15W", cctvRelated: true, status: "Active" },
  { name: "DVR/NVR", category: "Security", categoryBadge: "bg-[#FFE4E6] text-[#E11D48]", defaultWatts: "25W", cctvRelated: true, status: "Active" },
  { name: '32" TV', category: "Entertainment", categoryBadge: "bg-[#F3E8FF] text-[#9333EA]", defaultWatts: "80W", status: "Active" },
  { name: "Fridge (200L)", category: "Kitchen", categoryBadge: "bg-[#FEF3C7] text-[#D97706]", defaultWatts: "150W", status: "Active" },
  { name: "Laptop", category: "Office", categoryBadge: "bg-[#F1F5F9] text-[#64748B]", defaultWatts: "65W", status: "Active" },
];

export default function SolarCctvDesignerOverviewPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchDesign, setSearchDesign] = useState("");
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedAppliance, setSelectedAppliance] = useState<ApplianceRow | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<DesignRow | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm">
      {/* Page Header */}
      <PageHeader
        title="Solar CCTV Designer"
        description="Configure the design tool, manage component pricing and track usage"
        actions={[
          {
            key: "preview-tool",
            label: "Preview Tool",
            variant: "outline",
            onClick: () => navigate(appPaths.solarDesignerPreview),
          },
          {
            key: "create-design",
            label: "Create Design",
            variant: "default",
            onClick: () => navigate(appPaths.solarCctvDesignDetails("SOL-2026-00847").path),
          },
        ]}
      />

      {/* Top Metric Cards - Reusing DashboardStats per directive */}
      <DashboardStats />

      {/* Tool Configuration Status Card */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-[#0F172A]">Tool Configuration Status</h3>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#ECFDF5] px-3 py-1 font-bold text-[#059669] text-xs">
              • Tool is live and accessible in Marketplace
            </span>
            <button
              type="button"
              className="rounded-xl border border-[#CBD5E1] bg-white px-3 py-1 font-bold text-[#D97706] hover:bg-[#FFFBEB]"
            >
              Take Offline
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2 text-xs">
          <div
            onClick={() => navigate(appPaths.solarComponentPricing)}
            className="cursor-pointer rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 flex items-center justify-between hover:bg-[#F1F5F9] transition-all"
          >
            <span className="text-[#64748B] font-medium">Component pricing</span>
            <span className="font-bold text-[#059669]">Configured ✓</span>
          </div>

          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 flex items-center justify-between">
            <span className="text-[#64748B] font-medium">Appliance library</span>
            <span className="font-bold text-[#059669]">47 appliances ✓</span>
          </div>

          <div
            onClick={() => navigate(appPaths.solarIrradianceData)}
            className="cursor-pointer rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 flex items-center justify-between hover:bg-[#F1F5F9] transition-all"
          >
            <span className="text-[#64748B] font-medium">State irradiance</span>
            <span className="font-bold text-[#059669]">All 37 states ✓</span>
          </div>
        </div>
      </div>

      {/* Recent Designs Table Card */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">Recent Designs</h3>
          <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline">
            View All
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <input
            type="text"
            value={searchDesign}
            onChange={(e) => setSearchDesign(e.target.value)}
            placeholder="Search..."
            className="flex-1 min-w-[200px] rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3.5 py-2 text-xs focus:border-[#2563EB] focus:outline-none"
          />

          <div className="flex items-center gap-2 text-xs">
            <select className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-xs">
              <option>All Roles ▾</option>
            </select>
            <select className="rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-xs">
              <option>Last 30 days ▾</option>
            </select>
            <span className="rounded-md bg-[#EFF6FF] px-2.5 py-1 font-bold text-[#2563EB] text-xs">
              Converted 5
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">DESIGN REF</th>
                <th className="p-3">USER</th>
                <th className="p-3">SYSTEM SIZE</th>
                <th className="p-3">TOTAL ESTIMATE</th>
                <th className="p-3">TIER</th>
                <th className="p-3">CONVERTED</th>
                <th className="p-3">CREATED</th>
                <th className="p-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {DUMMY_DESIGNS.map((row) => (
                <tr key={row.ref} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-mono font-bold text-[#2563EB]">
                    <button
                      type="button"
                      onClick={() => navigate(appPaths.solarCctvDesignDetails(row.ref).path)}
                      className="hover:underline"
                    >
                      {row.ref}
                    </button>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold">{row.user}</span>
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold ${
                          row.role === "SC" ? "bg-[#F3E8FF] text-[#9333EA]" : "bg-[#EFF6FF] text-[#2563EB]"
                        }`}
                      >
                        {row.role}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 font-bold">{row.systemSize}</td>
                  <td className="p-3 font-mono font-bold">{row.totalEstimate}</td>
                  <td className="p-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                        row.tier === "Premium"
                          ? "bg-[#ECFDF5] text-[#059669]"
                          : row.tier === "Standard"
                          ? "bg-[#EFF6FF] text-[#2563EB]"
                          : "bg-[#FEF3C7] text-[#D97706]"
                      }`}
                    >
                      {row.tier}
                    </span>
                  </td>
                  <td className="p-3 font-bold">
                    <span
                      className={
                        row.converted === "Yes"
                          ? "text-[#059669]"
                          : row.converted === "Pending"
                          ? "text-[#D97706]"
                          : "text-[#64748B]"
                      }
                    >
                      {row.converted}
                    </span>
                  </td>
                  <td className="p-3 text-[#64748B]">{row.created}</td>
                  <td className="p-3 space-x-2 font-bold">
                    {row.isDeleted ? (
                      <span className="italic text-[#94A3B8]">Deleted</span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => navigate(appPaths.solarCctvDesignDetails(row.ref).path)}
                          className="text-[#2563EB] hover:underline"
                        >
                          View
                        </button>
                        <button type="button" className="text-[#2563EB] hover:underline">
                          Duplicate
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedDesign(row);
                            setActiveModal("delete_design_modal");
                          }}
                          className="text-[#DC2626] hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between text-xs text-[#64748B] pt-2">
          <span>Showing 8 of 124 designs</span>
          <div className="flex items-center gap-1">
            <button type="button" className="rounded-lg border border-[#CBD5E1] px-2.5 py-1 text-xs">Prev</button>
            <button type="button" className="rounded-lg bg-[#2563EB] px-2.5 py-1 text-white font-bold">1</button>
            <button type="button" className="rounded-lg border border-[#CBD5E1] px-2.5 py-1 font-bold">2</button>
            <button type="button" className="rounded-lg border border-[#CBD5E1] px-2.5 py-1 text-xs">Next</button>
          </div>
        </div>
      </div>

      {/* Appliance Library Card */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-[#0F172A]">Appliance Library</h3>
            <span className="text-xs text-[#64748B]">47 appliances</span>
          </div>

          <button
            type="button"
            onClick={() => setActiveModal("add_appliance_modal")}
            className="font-bold text-[#2563EB] text-xs hover:underline"
          >
            Add Appliance
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {["All", "Lighting", "Cooling", "Security", "Entertainment", "Kitchen", "Office", "Custom"].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-3.5 py-1.5 font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-xs"
                    : "bg-white text-[#64748B] border border-[#CBD5E1] hover:bg-[#F8FAFC]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">APPLIANCE</th>
                <th className="p-3">CATEGORY</th>
                <th className="p-3">DEFAULT WATTS</th>
                <th className="p-3">CCTV RELATED</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {DUMMY_APPLIANCES.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-bold">{row.name}</td>
                  <td className="p-3">
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${row.categoryBadge}`}>
                      {row.category}
                    </span>
                  </td>
                  <td className="p-3 font-bold">{row.defaultWatts}</td>
                  <td className="p-3">
                    {row.cctvRelated ? <span className="font-bold text-[#059669]">✓</span> : "-"}
                  </td>
                  <td className="p-3 font-bold text-[#059669]">
                    <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2 font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAppliance(row);
                        setActiveModal("edit_appliance_modal");
                      }}
                      className="text-[#2563EB] hover:underline"
                    >
                      Edit
                    </button>
                    <button type="button" className="text-[#2563EB] hover:underline">
                      Hide
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom 4 Analytics Widgets */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Widget 1: Design Funnel */}
        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
          <h3 className="text-sm font-bold text-[#0F172A]">Design Funnel</h3>
          <div className="space-y-2.5">
            {[
              { label: "Started design", val: "1,247", pct: "100%", width: "w-full" },
              { label: "Completed step 1", val: "1,102", pct: "88.4%", width: "w-[88.4%]" },
              { label: "Completed step 2", val: "987", pct: "89.5%", width: "w-[79%]" },
              { label: "Got recommendation", val: "924", pct: "93.6%", width: "w-[74%]" },
              { label: "Added to cart", val: "88", pct: "8.6%", width: "w-[12%]", color: "bg-[#D97706]" },
              { label: "Purchased", val: "67", pct: "75.3%", width: "w-[8%]", color: "bg-[#059669]" },
            ].map((step, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3">
                <span className="w-36 text-[#64748B] font-medium">{step.label}</span>
                <strong className="w-12 font-bold text-[#0F172A]">{step.val}</strong>
                <span className="w-12 text-[#94A3B8]">{step.pct}</span>
                <div className="flex-1 bg-[#F1F5F9] rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full ${step.color || "bg-[#2563EB]"} ${step.width}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Top Appliance Sets */}
        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
          <h3 className="text-sm font-bold text-[#0F172A]">Top Appliance Sets</h3>
          <div className="space-y-3 divide-y divide-[#F1F5F9]">
            {[
              { set: "Fan + Lights + CCTV (4 cams)", count: "312 designs" },
              { set: "AC + Fridge + CCTV (2 cams)", count: "198 designs" },
              { set: "Lights + TV + CCTV (8 cams)", count: "147 designs" },
              { set: "Office setup + CCTV", count: "89 designs" },
              { set: "Full home + CCTV", count: "67 designs" },
            ].map((item, idx) => (
              <div key={idx} className={`flex items-center justify-between ${idx > 0 ? "pt-2.5" : ""}`}>
                <strong className="font-bold text-[#0F172A]">{item.set}</strong>
                <span className="text-[#64748B]">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 3: Tier Distribution */}
        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
          <h3 className="text-sm font-bold text-[#0F172A]">Tier Distribution</h3>
          <div className="space-y-3">
            {[
              { label: "Economy", pct: "42%", width: "w-[42%]", color: "bg-[#2563EB]" },
              { label: "Standard", pct: "38%", width: "w-[38%]", color: "bg-[#9333EA]" },
              { label: "Premium", pct: "20%", width: "w-[20%]", color: "bg-[#059669]" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3">
                <span className="w-20 font-bold text-[#0F172A]">{item.label}</span>
                <span className="w-12 text-[#64748B]">{item.pct}</span>
                <div className="flex-1 bg-[#F1F5F9] rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full ${item.color} ${item.width}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 4: Recent Activity */}
        <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
          <h3 className="text-sm font-bold text-[#0F172A]">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: "New design SOL-2026-00147 created by Chidi Eze", date: "2 hours ago", color: "bg-[#2563EB]" },
              { text: "Design SOL-2026-00146 converted to cart by Fatima Bello", date: "5 hours ago", color: "bg-[#059669]" },
              { text: 'New appliance "Solar Inverter 3KVA" added to library', date: "1 day ago", color: "bg-[#9333EA]" },
              { text: "Component pricing updated for Premium tier", date: "2 days ago", color: "bg-[#D97706]" },
              { text: "Design SOL-2026-00140 deleted by Joy Effiong", date: "3 days ago", color: "bg-[#DC2626]" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <span className={`size-2 rounded-full mt-1.5 shrink-0 ${item.color}`} />
                <div>
                  <p className="font-bold text-[#0F172A] text-xs leading-snug">{item.text}</p>
                  <span className="text-[10px] text-[#94A3B8]">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddApplianceModal
        open={activeModal === "add_appliance_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />

      <EditApplianceModal
        open={activeModal === "edit_appliance_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        initialName={selectedAppliance?.name || "CCTV Camera"}
        initialCategory={selectedAppliance?.category || "Security"}
        initialWattage={selectedAppliance?.defaultWatts.replace("W", "") || "15"}
        initialIsCctv={selectedAppliance?.cctvRelated || false}
      />

      <DeleteDesignModal
        open={activeModal === "delete_design_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
        designRef={selectedDesign?.ref || "SOL-2026-00847"}
        userName={selectedDesign?.user || "Chidi Eze"}
        estimate={selectedDesign?.totalEstimate || "₦1,209,000"}
      />
    </div>
  );
}
