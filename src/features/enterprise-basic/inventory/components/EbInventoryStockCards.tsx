import React from "react";
import { Smartphone, Video, Sun, ArrowUpRight } from "lucide-react";
import type { EbInventoryStockItem } from "../types";

interface EbInventoryStockCardsProps {
  items: EbInventoryStockItem[];
  onSellProduct: (item: EbInventoryStockItem) => void;
}

export const EbInventoryStockCards: React.FC<EbInventoryStockCardsProps> = ({
  items,
  onSellProduct,
}) => {
  const getIcon = (cat: string) => {
    switch (cat) {
      case "sim":
        return <Smartphone className="w-5 h-5 text-blue-600" />;
      case "cctv":
        return <Video className="w-5 h-5 text-emerald-600" />;
      case "solar":
        return <Sun className="w-5 h-5 text-amber-600" />;
      default:
        return <Smartphone className="w-5 h-5" />;
    }
  };

  const getBg = (cat: string) => {
    switch (cat) {
      case "sim":
        return "bg-blue-50";
      case "cctv":
        return "bg-emerald-50";
      case "solar":
        return "bg-amber-50";
      default:
        return "bg-slate-50";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-4 text-xs flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-xl ${getBg(item.category)} flex items-center justify-center`}>
              {getIcon(item.category)}
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              In Stock
            </span>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
            <div className="text-3xl font-black text-slate-900 mt-1">
              {item.inStock.toLocaleString()}{" "}
              <span className="text-xs font-semibold text-slate-400">units</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] font-medium text-slate-600">
            <div className="flex justify-between">
              <span>Wholesale Cost</span>
              <span className="font-bold text-slate-800">₦{item.costPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Your Margin</span>
              <span className="font-bold text-emerald-600">+₦{item.margin.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Reserved</span>
              <span>{item.reserved} units</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSellProduct(item)}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition shadow-xs inline-flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Sell to Customer</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
