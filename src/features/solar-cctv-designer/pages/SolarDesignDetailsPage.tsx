"use client";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { appPaths } from "@/app/router/paths";

import { ApplianceInputTable } from "../components/ApplianceInputTable";
import { SystemParametersCard } from "../components/SystemParametersCard";
import { StandardTierRecommendationCard } from "../components/StandardTierRecommendationCard";
import { SystemArrangementCard } from "../components/SystemArrangementCard";

import { EditComponentPricingModal } from "../Modals/EditComponentPricingModal";

export default function SolarDesignDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
    console.log(id)

  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8 text-xs sm:text-sm">
      {/* Top Metric Cards Bar */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5 rounded-2xl border border-[#E2ECF8] bg-white p-4 shadow-sm text-xs">
        <div>
          <span className="font-bold uppercase tracking-wide text-[#64748B] text-[10px] block">
            DESIGN REF
          </span>
          <strong className="text-sm font-extrabold text-[#0F172A] block mt-0.5 font-mono">
            SOL-2026-00847
          </strong>
        </div>

        <div>
          <span className="font-bold uppercase tracking-wide text-[#64748B] text-[10px] block">
            SYSTEM SIZE
          </span>
          <strong className="text-sm font-extrabold text-[#0F172A] block mt-0.5">
            3.2KVA
          </strong>
        </div>

        <div>
          <span className="font-bold uppercase tracking-wide text-[#64748B] text-[10px] block">
            TOTAL ESTIMATE
          </span>
          <strong className="text-sm font-extrabold text-[#0F172A] block mt-0.5 font-mono">
            N847,000
          </strong>
        </div>

        <div>
          <span className="font-bold uppercase tracking-wide text-[#64748B] text-[10px] block">
            TIER
          </span>
          <strong className="text-sm font-extrabold text-[#2563EB] block mt-0.5">
            Standard
          </strong>
        </div>

        <div>
          <span className="font-bold uppercase tracking-wide text-[#64748B] text-[10px] block">
            CONVERTED
          </span>
          <span className="flex items-center gap-1.5 text-sm font-extrabold text-[#059669] mt-0.5">
            <span className="size-2 rounded-full bg-[#059669]" />
            Yes
          </span>
        </div>
      </div>

      {/* Title & Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => navigate(appPaths.solarCctvDesigner)}
            className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:underline mb-1"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Recent Designs</span>
          </button>
          <h1 className="text-xl font-extrabold text-[#0F172A]">SOL-2026-00847</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Created by Chidi Eze · Normal User | 24 Jun 2026 - 03:47 PM
          </p>
        </div>

        <div className="flex items-center gap-2 font-bold text-xs">
          <button
            type="button"
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Download PDF
          </button>
          <button
            type="button"
            className="rounded-xl border border-[#CBD5E1] bg-white px-4 py-2.5 text-[#0F172A] hover:bg-[#F8FAFC]"
          >
            Duplicate Design
          </button>
          <button
            type="button"
            className="rounded-xl bg-[#2563EB] px-4 py-2.5 text-white shadow-xs hover:bg-[#1D4ED8]"
          >
            Add to Cart (Admin)
          </button>
        </div>
      </div>

      {/* Main 3-Column Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 min-w-0">
          <ApplianceInputTable />
          <SystemParametersCard />
        </div>

        {/* Middle Column */}
        <div className="space-y-6 min-w-0">
          <div onClick={() => setActiveModal("edit_pricing_modal")} className="cursor-pointer">
            <StandardTierRecommendationCard />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 min-w-0 text-xs sm:text-sm">
          {/* Actions */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#0F172A]">Actions</h3>

            <div className="space-y-2">
              <button
                type="button"
                className="w-full rounded-xl bg-[#2563EB] py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
              >
                Download PDF Quote
              </button>

              <button
                type="button"
                className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                Duplicate Design
              </button>

              <button
                type="button"
                className="w-full rounded-xl border border-[#CBD5E1] bg-white py-2.5 font-bold text-[#0F172A] hover:bg-[#F8FAFC]"
              >
                Add All to Cart
              </button>

              <button
                type="button"
                className="w-full rounded-xl border border-[#FECACA] bg-white py-2.5 font-bold text-[#DC2626] hover:bg-[#FFF1F2]"
              >
                Delete Design
              </button>
            </div>
          </div>

          {/* CCTV SIM Connectivity */}
          <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base">📹</span>
              <h3 className="text-sm font-bold text-[#0F172A]">CCTV SIM Connectivity</h3>
            </div>
            <p className="text-xs text-[#0F172A] font-bold">4 CCTV cameras detected</p>
            <p className="text-xs font-bold text-[#059669]">Add 4 × CCTV SIM N5,000/mo</p>
            <button
              type="button"
              className="w-full rounded-xl bg-[#2563EB] py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
            >
              Add SIM to Cart
            </button>
          </div>

          {/* Book Installation */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-base">🔧</span>
              <h3 className="text-sm font-bold text-[#0F172A]">Book Installation</h3>
            </div>
            <p className="text-xs text-[#0F172A] font-bold">N48,000 · Lagos area</p>
            <p className="text-xs text-[#64748B]">Certified Simkash Installer</p>
            <button
              type="button"
              className="w-full rounded-xl bg-[#2563EB] py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
            >
              Book Now
            </button>
          </div>

          {/* Design Info */}
          <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#0F172A]">Design Info</h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Created</span>
                <strong className="font-bold text-[#0F172A]">24 Jun 2026 03:47 PM</strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Last edited</span>
                <strong className="font-bold text-[#0F172A]">24 Jun 2026 04:00 PM</strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Converted</span>
                <strong className="font-bold text-[#059669]">Yes (25 Jun 2026)</strong>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#64748B]">Order ref</span>
                <button type="button" className="font-bold text-[#2563EB] hover:underline font-mono">
                  ORD-2026-00899
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Card: System Arrangement */}
      <SystemArrangementCard />

      {/* Modals */}
      <EditComponentPricingModal
        open={activeModal === "edit_pricing_modal"}
        onOpenChange={(open) => !open && setActiveModal(null)}
      />
    </div>
  );
}
