import { AppEmptyState } from '@/components/common/AppEmptyState';
import { EpQueryState } from '../../components/EpQueryState';
import React from "react";
import { ArrowLeft, ShieldCheck, Plus, Minus, Truck } from "lucide-react";
import { useInventoryOrder } from "../hooks/useInventoryOrder";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { colors } from "@/constants/colors";
import { ConfirmSimOrderModal } from "../modals/ConfirmSimOrderModal";
export const OrderMoreSimsPage: React.FC = () => {
    const { navigate, context, create, deliveryAddress, setDeliveryAddress, notes, setNotes, previewMutation, currentPreview, previewError, setPreviewError, mutatePreview, payload, payloadKey, setPreview, setPreviewKey, catalog, totalSims, subtotal, discount, grandTotal, paymentMethod, setPaymentMethod, pin, setPin, valid, sufficient, showConfirmModal, setShowConfirmModal, handleOrderConfirmed } = useInventoryOrder();
    return (<div className="space-y-6 pb-16">
      <PageHeader title="Order Wholesale SIM Stock" description="Procure enterprise SIM stock directly from Telecommunications Hub central warehouse at wholesale prices." actions={[
            {
                key: "back",
                label: "Back to Inventory",
                icon: <ArrowLeft className="w-4 h-4"/>,
                variant: "outline",
                onClick: () => navigate(appPaths.enterpriseProSimInventory),
            },
        ]}/>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Catalog */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-blue-900 font-semibold">
              <Truck className="w-4 h-4 text-blue-600"/>
              <span>Minimum {context.data?.minimum_order_per_type ?? "—"} per SIM type · Fulfillment: {context.data?.fulfillment_time ?? "—"}</span>
            </div>
            {discount > 0 && (<span className="font-bold text-emerald-600 bg-white px-2 py-0.5 rounded border border-emerald-200">
                5% Rebate Active
              </span>)}
          </div>

          <div className="space-y-3">
            {!context.isSuccess ? <EpQueryState pending={context.isPending} error={context.error} retry={context.refetch}/> : catalog.length === 0 ? <AppEmptyState title="No SIM types available"/> : null}
            {catalog.map((sim) => (<div key={sim.id} className="p-4 bg-white rounded-xl border space-y-3" style={{ borderColor: colors.border }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{sim.name}</h4>
                    <span className="text-xs text-slate-500 font-medium">{sim.wholesale_formatted} · {sim.current_stock.toLocaleString()} in stock · {sim.stock_status}</span>
                    {sim.alert_message && <p className="text-xs" style={{ color: colors.warning }}>{sim.alert_message}</p>}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    {sim.presets.map((p) => (<button key={p} type="button" onClick={() => sim.set(p)} className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-600 font-medium">
                        +{p}
                      </button>))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => sim.set(Math.max(0, sim.val - sim.step))} className="p-2 rounded border border-slate-200 hover:bg-slate-50"><Minus className="w-4 h-4"/></button>
                    <input type="number" min={0} value={sim.val} onChange={(e) => sim.set(Number(e.target.value))} className="w-24 text-center font-bold text-sm py-1.5 rounded border border-slate-200"/>
                    <button type="button" onClick={() => sim.set(sim.val + sim.step)} className="p-2 rounded border border-slate-200 hover:bg-slate-50"><Plus className="w-4 h-4"/></button>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Category Total</span>
                    <span className="font-bold text-slate-900 text-sm">₦{(sim.val * sim.price).toLocaleString()}</span>
                  </div>
                </div>
              </div>))}
          </div>
        </div>

        {/* Right Col: Order Summary & PIN */}
        <div className="p-5 bg-white rounded-xl border space-y-4 h-fit" style={{ borderColor: colors.border }}>
          <h4 className="text-sm font-bold text-slate-900 border-b pb-3" style={{ borderColor: colors.border }}>
            Procurement Summary
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Total Volume:</span>
              <strong className="text-slate-900">{totalSims.toLocaleString()} SIM Cards</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Wholesale Subtotal:</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (<div className="flex justify-between text-emerald-600 font-semibold">
                <span>Tier Discount (5%):</span>
                <span>-₦{discount.toLocaleString()}</span>
              </div>)}
            <div className="flex justify-between text-slate-600">
              <span>Delivery & Handling:</span>
              <span className="text-emerald-600 font-semibold">Included in preview</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t" style={{ borderColor: colors.border }}>
              <span>Total Payable:</span>
              <span className="text-blue-600">₦{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t" style={{ borderColor: colors.border }}>
            <label className="block text-xs font-semibold text-slate-800">Payment Channel</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button type="button" onClick={() => setPaymentMethod("wallet")} className={`p-2 rounded-lg border text-center font-semibold ${paymentMethod === "wallet" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200"}`}>
                Enterprise Wallet
              </button>
              <button type="button" onClick={() => setPaymentMethod("bank_transfer")} className={`p-2 rounded-lg border text-center font-semibold ${paymentMethod === "bank_transfer" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200"}`}>
                Fresh Capital
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t" style={{ borderColor: colors.border }}>
            <label className="block text-xs font-semibold text-slate-800 text-center">4-Digit Security PIN</label>
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

          <div className="space-y-2"><label className="block text-xs font-semibold text-slate-800">Delivery Address</label><input aria-label="Delivery address" value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"/><label className="block text-xs font-semibold text-slate-800">Order Notes</label><input aria-label="Order notes" value={notes} onChange={e => setNotes(e.target.value)} className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"/></div>
          <p className="text-xs text-slate-500">{context.data?.wallet_balance_formatted}</p>
          {currentPreview && paymentMethod === 'wallet' && !currentPreview.is_sufficient_balance && <p role="alert" className="text-xs" style={{ color: colors.danger }}>Insufficient wallet balance. Shortfall: {currentPreview.shortfall_formatted}</p>}
          {!valid && totalSims > 0 && <p role="alert" className="text-xs" style={{ color: colors.danger }}>Enter whole quantities of at least {context.data?.minimum_order_per_type} per selected SIM type.</p>}
          {previewError && <EpQueryState error={previewError} retry={() => { setPreviewError(null); mutatePreview(payload).then(data => { setPreview(data); setPreviewKey(payloadKey); }).catch(setPreviewError); }}/>}
          <button type="button" disabled={!valid || !/^\d{4}$/.test(pin) || !currentPreview || !sufficient || !deliveryAddress.trim() || create.isPending || previewMutation.isPending} onClick={() => setShowConfirmModal(true)} className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors">
            <ShieldCheck className="w-4 h-4"/>
            <span>Place Purchase Order (₦{grandTotal.toLocaleString()})</span>
          </button>
        </div>
      </div>

      <ConfirmSimOrderModal open={showConfirmModal} onOpenChange={setShowConfirmModal} preview={currentPreview} pending={create.isPending} context={context.data} onConfirm={handleOrderConfirmed}/>
    </div>);
};
