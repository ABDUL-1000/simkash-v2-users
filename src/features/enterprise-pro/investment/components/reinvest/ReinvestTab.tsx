import React, { useState } from "react";
import { ReinvestHeaderCards } from "./ReinvestHeaderCards";
import { ReinvestSimSelector } from "./ReinvestSimSelector";
import { ReinvestForm } from "./ReinvestForm";
import { ReinvestEducationalCard } from "./ReinvestEducationalCard";
import { AssignedAccountManager } from "../AssignedAccountManager";
import { reinvestProducts } from "../../data/mockInvestmentData";
import { mockScCommissions } from "../../data/mockCommissionData";
import type { ReinvestSimProduct } from "../../types";

interface ReinvestTabProps {
  onInitiateOrder: (orderData: {
    product: ReinvestSimProduct;
    quantity: number;
    sc: (typeof mockScCommissions)[0];
    totalCost: number;
    note: string;
  }) => void;
}

export const ReinvestTab: React.FC<ReinvestTabProps> = ({
  onInitiateOrder,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<ReinvestSimProduct>(
    reinvestProducts[0]
  );
  const [quantity, setQuantity] = useState<number>(2500);
  const [selectedScId, setSelectedScId] = useState<string>(mockScCommissions[0].id);
  const [note, setNote] = useState<string>("");

  const handlePreviewOrder = () => {
    const targetSc =
      mockScCommissions.find((s) => s.id === selectedScId) || mockScCommissions[0];
    const totalCost = quantity * selectedProduct.wholesalePrice;
    onInitiateOrder({
      product: selectedProduct,
      quantity,
      sc: targetSc,
      totalCost,
      note,
    });
  };

  return (
    <div className="space-y-6">
      {/* 3 KPI Header Cards */}
      <ReinvestHeaderCards />

      {/* Main Form & Educational Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <ReinvestSimSelector
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
          />

          <ReinvestForm
            selectedProduct={selectedProduct}
            quantity={quantity}
            onQuantityChange={setQuantity}
            selectedScId={selectedScId}
            onScChange={setSelectedScId}
            note={note}
            onNoteChange={setNote}
            onSubmit={handlePreviewOrder}
          />
        </div>

        <div className="space-y-6">
          <ReinvestEducationalCard />
          <AssignedAccountManager />
        </div>
      </div>
    </div>
  );
};
