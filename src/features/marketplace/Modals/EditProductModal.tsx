"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";

type EditProductModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
  onUpdateSuccess?: () => void;
};

export function EditProductModal({
  open,
  onOpenChange,
  productName = "Hikvision DS-2CD2143G2",
  onUpdateSuccess,
}: EditProductModalProps) {
  const [name, setName] = useState(productName);
  const [category, setCategory] = useState("CCTV Cameras");
  const [brand, setBrand] = useState("Hikvision");
  const [modelNumber, setModelNumber] = useState("DS-2CD2143G2");
  const [vendor, setVendor] = useState("Simkash Direct");
  const [price, setPrice] = useState("184,999");
  const [comparePrice, setComparePrice] = useState("199,999");
  const [stockQuantity, setStockQuantity] = useState("23");
  const [lowStockThreshold, setLowStockThreshold] = useState("5");
  const [description, setDescription] = useState(
    "4MP AcuSense Fixed Dome Network Camera with ColorVu technology. Supports H.265+/H.265/H.264+ compression. Ideal for indoor and outdoor surveillance with IR range up to 40m."
  );
  const [status, setStatus] = useState<"Active" | "Draft" | "Suspended">("Active");

  const [specs, setSpecs] = useState([
    { key: "Resolution", value: "4MP (2560×1440)" },
    { key: "IR Range", value: "40m" },
    { key: "IP Rating", value: "IP67 & IK10" },
    { key: "Power", value: "PoE (IEEE 802.3af)" },
    { key: "Storage", value: "Micro SD up to 256GB" },
    { key: "Warranty", value: "3 Years" },
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
      title="Edit Product"
      description={name}
      size="lg"
      actions={[
        { key: "cancel", label: "Cancel", variant: "secondary", closeOnClick: true },
        { key: "draft", label: "Save as Draft", variant: "primary", closeOnClick: true },
        {
          key: "update",
          label: "Update Product",
          variant: "primary",
          onClick: () => {
            onUpdateSuccess?.();
          },
          closeOnClick: true,
        },
      ]}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Images Grid */}
        <div className="rounded-2xl border border-[#CBD5E1] bg-[#F8FAFC] p-4 text-center">
          <div className="flex items-center justify-center gap-3">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="flex size-16 items-center justify-center rounded-2xl bg-[#0F1F36] text-white font-bold text-sm shadow-xs"
              >
                {num}
              </div>
            ))}
            <div className="flex size-16 items-center justify-center rounded-2xl border border-[#CBD5E1] bg-white text-[11px] font-bold text-[#94A3B8]">
              + more
            </div>
          </div>
          <p className="mt-2 text-[11px] text-[#64748B]">
            3 images uploaded - Click to rearrange
          </p>
        </div>

        {/* Basic Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              PRODUCT NAME
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              <option value="CCTV Cameras">CCTV Cameras</option>
              <option value="GPS Trackers">GPS Trackers</option>
              <option value="Solar Solutions">Solar Solutions</option>
              <option value="Routers">Routers</option>
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
              className="w-full rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2.5 font-medium text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-bold uppercase tracking-wide text-[#64748B] text-[10px]">
              SKU (Auto-generated)
            </label>
            <input
              type="text"
              value="SKU-HIK-2143G2"
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

        {/* EasyBuy Green Banner */}
        <div className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs text-[#059669] font-medium">
          Instalment payments enabled for this product
        </div>

        {/* CCTV Distribution Green Banner */}
        <div className="rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-3 text-xs text-[#059669] font-medium">
          B2B tier pricing is configured for this product
        </div>

        {/* Status */}
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
