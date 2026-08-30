"use client";

import { useState } from "react";
import { Upload, Plus, X } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type AddProductModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPublishSuccess?: () => void;
};

export function AddProductModal({
  open,
  onOpenChange,
  onPublishSuccess,
}: AddProductModalProps) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [vendor, setVendor] = useState("Simkash Direct");
  const [price, setPrice] = useState("");
  const [comparePrice, setComparePrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("0");
  const [lowStockThreshold, setLowStockThreshold] = useState("5");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Active" | "Draft" | "Suspended">("Active");

  const [specs, setSpecs] = useState([
    { key: "Resolution", value: "4MP" },
    { key: "IR Range", value: "30m" },
  ]);

  const handleAddSpec = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  const handleRemoveSpec = (idx: number) => {
    setSpecs(specs.filter((_, i) => i !== idx));
  };

  return (
    <AppModal
      open={open}
      onOpenChange={onOpenChange}
      title="Add New Product"
      description="Add to the Simkash Marketplace catalogue"
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        { key: "draft", label: "Save as Draft", variant: "primary", closeOnClick: true },
        {
          key: "publish",
          label: "Publish Product",
          variant: "primary",
          onClick: () => {
            onPublishSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Upload product images */}
        <div className="rounded-2xl border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4 text-center">
          <div className="flex flex-col items-center justify-between sm:flex-row gap-3">
            <div className="flex items-center gap-3 text-left">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white text-[#64748B] shadow-xs">
                <Upload className="size-5" />
              </div>
              <div>
                <p className="font-bold text-[#0F172A]">Upload product images</p>
                <p className="text-[11px] text-[#94A3B8]">JPG, PNG, WEBP · Max 5MB each</p>
              </div>
            </div>

            <button
              type="button"
              className="rounded-xl border border-[#BFDBFE] bg-white px-4 py-2 font-bold text-[#2563EB] hover:bg-[#EFF6FF]"
            >
              Browse
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex size-16 items-center justify-center rounded-2xl border border-[#CBD5E1] bg-white text-[#94A3B8]"
              >
                <Plus className="size-4" />
              </div>
            ))}
            <div className="flex size-16 items-center justify-center rounded-2xl border border-[#CBD5E1] bg-white text-[11px] font-bold text-[#94A3B8]">
              + more
            </div>
          </div>
        </div>

        {/* Basic Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              PRODUCT NAME
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Hikvision DS-2CD2143G2"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              CATEGORY
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="">Select category ▾</option>
              <option value="CCTV Cameras">CCTV Cameras</option>
              <option value="GPS Trackers">GPS Trackers</option>
              <option value="Solar Solutions">Solar Solutions</option>
              <option value="Routers">Routers</option>
              <option value="Accessories">Accessories</option>
              <option value="Airtime & Data">Airtime & Data</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              BRAND
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="e.g. Hikvision"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              MODEL NUMBER
            </label>
            <input
              type="text"
              value={modelNumber}
              onChange={(e) => setModelNumber(e.target.value)}
              placeholder="e.g. DS-2CD2143G2"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              SKU (Auto-generated)
            </label>
            <input
              type="text"
              value="SKU-AUTO-001234"
              readOnly
              className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2.5 font-mono text-xs text-[#64748B]"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              VENDOR
            </label>
            <select
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="Simkash Direct">Simkash Direct</option>
              <option value="TechVision Supplies">TechVision Supplies</option>
              <option value="SmartSecurity Hub">SmartSecurity Hub</option>
              <option value="Hikvision Nigeria">Hikvision Nigeria</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              PRICE (₦)
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="₦ 0.00"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              COMPARE AT PRICE
            </label>
            <input
              type="text"
              value={comparePrice}
              onChange={(e) => setComparePrice(e.target.value)}
              placeholder="₦ 0.00"
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-bold text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              STOCK QUANTITY
            </label>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              LOW STOCK THRESHOLD
            </label>
            <input
              type="number"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(e.target.value)}
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            DESCRIPTION
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a detailed product description..."
            className="w-full rounded-xl border border-[#E2E8F0] bg-white p-3 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
          />
        </div>

        {/* Specifications */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              SPECIFICATIONS
            </label>
            <button
              type="button"
              onClick={handleAddSpec}
              className="flex items-center gap-1 text-xs font-bold text-[#2563EB] hover:underline"
            >
              <Plus className="size-3.5" />
              <span>Add Spec</span>
            </button>
          </div>

          <div className="space-y-2">
            {specs.map((sp, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={sp.key}
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[idx].key = e.target.value;
                    setSpecs(newSpecs);
                  }}
                  placeholder="e.g. Resolution"
                  className="flex-1 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-medium text-[#0F172A]"
                />
                <input
                  type="text"
                  value={sp.value}
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[idx].value = e.target.value;
                    setSpecs(newSpecs);
                  }}
                  placeholder="e.g. 4MP"
                  className="flex-1 rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-xs font-medium text-[#0F172A]"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpec(idx)}
                  className="flex size-8 shrink-0 items-center justify-center rounded-xl border border-[#FECACA] bg-[#FFF1F2] text-[#DC2626] hover:bg-[#FEE2E2]"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Product Status */}
        <div>
          <label className="mb-1.5 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
            PRODUCT STATUS
          </label>
          <div className="flex items-center gap-2">
            {(["Active", "Draft", "Suspended"] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatus(st)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  status === st
                    ? "bg-[#0F1F36] text-white shadow-xs"
                    : "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppModal>
  );
}
