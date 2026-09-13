"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type ServicePricingTabProps = {
  onAddPackageClick: () => void;
};

export function ServicePricingTab({ onAddPackageClick }: ServicePricingTabProps) {
  const [posPrice, setPosPrice] = useState("2,500");
  const [cctvPrice, setCctvPrice] = useState("5,000");
  const [gpsPrice, setGpsPrice] = useState("3,500");
  const [routerPrice, setRouterPrice] = useState("4,500");

  return (
    <div className="space-y-6 text-xs sm:text-sm">
      {/* Platform Base Prices */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Platform Base Prices</h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0F172A]">POS SIM</span>
            <input
              type="text"
              value={posPrice}
              onChange={(e) => setPosPrice(e.target.value)}
              className="w-32 rounded-xl border border-[#E2E8F0] bg-white p-2 text-right font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0F172A]">CCTV SIM</span>
            <input
              type="text"
              value={cctvPrice}
              onChange={(e) => setCctvPrice(e.target.value)}
              className="w-32 rounded-xl border border-[#E2E8F0] bg-white p-2 text-right font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0F172A]">GPS SIM</span>
            <input
              type="text"
              value={gpsPrice}
              onChange={(e) => setGpsPrice(e.target.value)}
              className="w-32 rounded-xl border border-[#E2E8F0] bg-white p-2 text-right font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-[#0F172A]">Router SIM</span>
            <input
              type="text"
              value={routerPrice}
              onChange={(e) => setRouterPrice(e.target.value)}
              className="w-32 rounded-xl border border-[#E2E8F0] bg-white p-2 text-right font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="button"
          className="rounded-xl bg-[#2563EB] px-5 py-2.5 font-bold text-white shadow-xs hover:bg-[#1D4ED8]"
        >
          Save Prices
        </button>
      </div>

      {/* ZeroLimit SIM Data Packages Table */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">ZeroLimit SIM Data Packages</h3>
          <button
            type="button"
            onClick={onAddPackageClick}
            className="flex items-center gap-1 font-bold text-[#2563EB] text-xs hover:underline"
          >
            <Plus className="size-4" />
            <span>Add Package</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">Package Name</th>
                <th className="p-3">Data</th>
                <th className="p-3">Price</th>
                <th className="p-3">Cost Price</th>
                <th className="p-3">Margin</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {[
                { name: "Basic", data: "5 GB", price: "₦2,000", cost: "₦1,200", margin: "₦800 · 40%", active: true },
                { name: "Standard", data: "10 GB", price: "₦3,000", cost: "₦1,800", margin: "₦1,400 · 40%", active: true },
                { name: "Standard (Unlimited)", data: "50 GB", price: "₦6,000", cost: "₦3,600", margin: "₦2,400 · 40%", active: true },
                { name: "Pro", data: "30 GB", price: "₦13,000", cost: "₦7,800", margin: "₦5,200 · 40%", active: true },
                { name: "Pro Max", data: "100 GB", price: "₦24,000", cost: "₦14,000", margin: "₦10,000 · 42%", active: true },
                { name: "Unlimited", data: "500 GB", price: "₦35,000", cost: "₦20,000", margin: "₦15,000 · 43%", active: true },
              ].map((pkg, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-bold">{pkg.name}</td>
                  <td className="p-3">{pkg.data}</td>
                  <td className="p-3 font-bold">{pkg.price}</td>
                  <td className="p-3">{pkg.cost}</td>
                  <td className="p-3 font-bold text-[#059669]">{pkg.margin}</td>
                  <td className="p-3">
                    <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">Active</span>
                  </td>
                  <td className="p-3 space-x-2 font-bold">
                    <button type="button" className="text-[#2563EB] hover:underline">Edit</button>
                    <button type="button" className="text-[#DC2626] hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
