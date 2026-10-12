import type { EnterpriseOrderPreviewData, EnterpriseOrderContextData } from '../types/simInventory';
import { AppEmptyState } from '@/components/common/AppEmptyState';
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { AppModal } from "@/components/common/AppModal";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
interface ConfirmSimOrderModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    preview?: EnterpriseOrderPreviewData;
    context?: EnterpriseOrderContextData;
    pending?: boolean;
    onConfirm: () => void;
}
export const ConfirmSimOrderModal: React.FC<ConfirmSimOrderModalProps> = ({ open, onOpenChange, preview, context, pending, onConfirm, }) => {
    const [pin, setPin] = useState("");
    const totalSims = preview?.total_sims ?? 0;
    const totalAmount = preview?.total_cost ?? 0;
    const handleConfirm = () => {
        if (pin.length < 4 || pending || !preview || (preview.payment_source === 'wallet_earnings' && !preview.is_sufficient_balance))
            return;
        onConfirm();
    };
    return (<AppModal open={open} onOpenChange={onOpenChange} size="md" title={<div className="space-y-0.5">
          <h3 className="text-xl font-bold text-slate-900">Confirm SIM Order</h3>
          <p className="text-xs text-slate-500 font-normal">
            {totalSims.toLocaleString()} SIMs · ₦{totalAmount.toLocaleString()}
          </p>
        </div>} footer={null}>
      <div className="space-y-4 pt-1 text-xs">
        {/* Order Summary Card with navy left accent */}
        <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 border-l-4 border-l-[#1E3A5F] space-y-3">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            Order Summary
          </span>

          <div className="space-y-2">
            <div className="grid grid-cols-4 text-[11px] font-semibold text-slate-400 pb-1 border-b border-slate-200">
              <span className="col-span-1">SIM TYPE</span>
              <span className="text-center">QTY</span>
              <span className="text-right">UNIT PRICE</span>
              <span className="text-right">TOTAL</span>
            </div>

            {(preview?.items ?? []).length === 0 ? <AppEmptyState title="No order preview"/> : preview?.items.map(item => <div key={item.sim_type} className="grid grid-cols-4 font-medium text-slate-800 py-1"><span className="font-bold text-slate-900">{item.name}</span><span className="text-center text-slate-700">{item.quantity} SIMs</span><span className="text-right text-slate-700">{item.unit_price_formatted}/SIM</span><span className="text-right font-bold text-slate-900">{item.total_cost_formatted}</span></div>)}
            <div className="grid grid-cols-4 font-bold text-slate-900 pt-2 border-t border-slate-200 text-xs">
              <span className="uppercase">Total</span>
              <span className="text-center">{totalSims} SIMs</span>
              <span />
              <span className="text-right text-[#1E3A5F]">
                ₦{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Paid from / Wallet before / Order cost */}
        <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1.5 text-slate-700 font-medium">
          <div className="flex justify-between">
            <span className="text-slate-500">Paid from:</span>
            <span className="font-bold text-slate-900">{preview?.payment_source === 'wallet_earnings' ? 'Wallet earnings' : 'Fresh capital'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Wallet before:</span>
            <span className="font-bold text-slate-900">{preview?.wallet_balance_formatted ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Order cost:</span>
            <span className="font-bold text-red-600">-₦{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Insufficient balance pill */}
        {preview?.payment_source === 'wallet_earnings' && !preview.is_sufficient_balance && <div className="p-2.5 bg-red-50 border border-red-200/80 rounded-lg flex items-center gap-2 text-red-600 text-[11px] font-medium">
          <div className="w-2 h-2 rounded-full bg-red-500 shrink-0"/>
          <span>Insufficient wallet balance. Shortfall: {preview?.shortfall_formatted}</span>
        </div>}
        {/* Inventory After Order */}
        <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">
            Inventory After Order
          </span>
          <div className="space-y-1.5">
            {preview?.items.map(item => { const before = context?.sim_types.find(sim => sim.sim_type === item.sim_type)?.current_stock; return <div key={item.sim_type} className="flex justify-between text-slate-700 font-medium"><span>{item.name}</span><span className="text-emerald-600 font-semibold">{before ?? '—'} → {before === undefined ? '—' : before + item.quantity} (+{item.quantity})</span></div>; })}
          </div>
        </div>

        {/* Delivery Time & Notification */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 px-1">
          <div className="w-2 h-2 rounded-full bg-slate-400 shrink-0"/>
          <span>{preview?.estimated_delivery}</span>
        </div>

        <div className="p-2.5 bg-blue-50/60 border border-blue-100 rounded-lg text-blue-700 text-xs font-medium flex items-center justify-between">
          <span>Your order will be submitted for fulfillment</span>
          <ChevronDown className="w-3.5 h-3.5 text-blue-600"/>
        </div>

        {/* Enter Transaction PIN */}
        <div className="space-y-2 text-center pt-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Enter Transaction PIN
          </span>
          <div className="flex justify-center">
            <InputOTP pattern="[0-9]*" maxLength={4} value={pin} onChange={setPin}>
              <InputOTPGroup>
                <InputOTPSlot masked index={0}/>
                <InputOTPSlot masked index={1}/>
                <InputOTPSlot masked index={2}/>
                <InputOTPSlot masked index={3}/>
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button type="button" onClick={() => onOpenChange(false)} className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors">
            <ArrowLeft className="w-3.5 h-3.5"/>
            <span>Edit Order</span>
          </button>
          <button type="button" onClick={handleConfirm} disabled={pin.length < 4 || pending || !preview || (preview.payment_source === 'wallet_earnings' && !preview.is_sufficient_balance)} className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-bold text-white bg-[#1E3A5F] hover:bg-[#152943] disabled:opacity-50 rounded-xl shadow-sm transition-colors">
            <span>{pending ? "Placing Order…" : "Place Order"}</span>
            <ArrowRight className="w-3.5 h-3.5"/>
          </button>
        </div>
      </div>
    </AppModal>);
};
