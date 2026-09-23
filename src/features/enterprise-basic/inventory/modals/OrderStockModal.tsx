import React, { useState } from "react";
import { AppModal } from "@/components/common/AppModal";
import { Check, PackagePlus } from "lucide-react";

interface OrderStockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOrderSuccess: (order: { product: string; units: number; total: number }) => void;
}

export const OrderStockModal: React.FC<OrderStockModalProps> = ({
  open,
  onOpenChange,
  onOrderSuccess,
}) => {
  const [selectedProduct, setSelectedProduct] = useState("pos");
  const [units, setUnits] = useState(100);

  const productCatalog = [
    { id: "pos", name: "POS SIM Cards", unitPrice: 2500 },
    { id: "cctv", name: "CCTV Basic Kits", unitPrice: 6000 },
    { id: "solar", name: "Solar 1kVA Inverters", unitPrice: 45000 },
  ];

  const currentProduct =
    productCatalog.find((p) => p.id === selectedProduct) || productCatalog[0];
  const totalCost = currentProduct.unitPrice * units;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOrderSuccess({
      product: currentProduct.name,
      units,
      total: totalCost,
    });
    onOpenChange(false);
  };

  return (
    <AppModal open={open} onOpenChange={onOpenChange} size="md" footer={null}>
      <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <PackagePlus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Order Wholesale Stock</h3>
            <p className="text-xs text-slate-400">Restock your inventory storage</p>
          </div>
        </div>

        {/* Product selector */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Select Product
          </span>
          <div className="grid grid-cols-3 gap-2">
            {productCatalog.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedProduct(p.id)}
                className={`p-2.5 rounded-xl border text-left transition ${
                  selectedProduct === p.id
                    ? "border-blue-500 bg-blue-50/50"
                    : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="font-bold text-slate-900 text-xs">{p.name}</div>
                <div className="text-[10px] text-slate-500 mt-1">
                  ₦{p.unitPrice.toLocaleString()}/unit
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Units input */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Quantity (Units)
          </span>
          <input
            type="number"
            min={10}
            step={10}
            value={units}
            onChange={(e) => setUnits(Math.max(1, Number(e.target.value)))}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-sm focus:border-blue-500 outline-none"
          />
        </div>

        {/* Total breakdown */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 font-medium">
          <div className="flex justify-between text-slate-600">
            <span>Wholesale unit price</span>
            <span className="font-bold text-slate-900">
              ₦{currentProduct.unitPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Quantity</span>
            <span className="font-bold text-slate-900">{units} units</span>
          </div>
          <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-1.5 border-t border-slate-200">
            <span>Total Order Cost</span>
            <span className="text-blue-600">₦{totalCost.toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-xs inline-flex items-center justify-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Place Order</span>
          </button>
        </div>
      </form>
    </AppModal>
  );
};
