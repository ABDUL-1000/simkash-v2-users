import React from "react";
import { Landmark, CreditCard, Plus } from "lucide-react";

interface PaymentMethodsCardProps {
  onAddCard?: () => void;
}

export const PaymentMethodsCard: React.FC<PaymentMethodsCardProps> = ({
  onAddCard,
}) => {
  return (
    <div className="bg-white border border-[#E2ECF6] rounded-2xl p-5 shadow-xs space-y-3.5 text-xs">
      <h4 className="font-bold text-slate-900 text-sm">Payment Methods</h4>

      <div className="space-y-2">
        {/* Bank Transfer */}
        <div className="p-3 rounded-xl border border-slate-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
              <Landmark className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Bank Transfer</span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                Primary
              </span>
            </div>
          </div>
        </div>

        {/* Card Payment */}
        <div className="p-3 rounded-xl border border-slate-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Card Payment</span>
              <span className="text-[11px] text-slate-400">•••• •••• •••• 4092</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onAddCard}
            className="font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5 text-[11px]"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
