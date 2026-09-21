import React, { useState, useEffect } from "react";
import { ArrowLeft, ShieldCheck, Plus, Minus, Truck } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { appPaths } from "@/app/router/paths";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { colors } from "@/constants/colors";
import { ConfirmSimOrderModal } from "../modals/ConfirmSimOrderModal";

export const OrderMoreSimsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [pos, setPos] = useState(400);
  const [cctv, setCctv] = useState(150);
  const [gps, setGps] = useState(100);
  const [router, setRouter] = useState(50);
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "bank_transfer">("wallet");
  const [pin, setPin] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const qPos = searchParams.get("pos");
    const qCctv = searchParams.get("cctv");
    const qGps = searchParams.get("gps");
    const qRouter = searchParams.get("router");
    if (qPos) setPos(Number(qPos));
    if (qCctv) setCctv(Number(qCctv));
    if (qGps) setGps(Number(qGps));
    if (qRouter) setRouter(Number(qRouter));
  }, [searchParams]);

  const totalSims = pos + cctv + gps + router;
  const subtotal = pos * 2500 + cctv * 6000 + gps * 8000 + router * 5000;
  const discount = totalSims >= 500 ? Math.round(subtotal * 0.05) : 0;
  const grandTotal = subtotal - discount;

  const handleOrderConfirmed = () => {
    setShowConfirmModal(false);
    navigate(appPaths.enterpriseProOrderPlaced);
  };

  return (
    <div className="space-y-6 pb-16">
      <PageHeader
        title="Order Wholesale SIM Stock"
        description="Procure enterprise SIM stock directly from Telecommunications Hub central warehouse at volume discounts."
        actions={[
          {
            key: "back",
            label: "Back to Inventory",
            icon: <ArrowLeft className="w-4 h-4" />,
            variant: "outline",
            onClick: () => navigate(appPaths.enterpriseProSimInventory),
          },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Catalog */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-blue-900 font-semibold">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Orders over 500 units receive an automated 5% volume tier rebate + free dispatch!</span>
            </div>
            {discount > 0 && (
              <span className="font-bold text-emerald-600 bg-white px-2 py-0.5 rounded border border-emerald-200">
                5% Rebate Active
              </span>
            )}
          </div>

          <div className="space-y-3">
            {[
              { id: "pos", name: "POS Terminal SIMs", price: 2500, val: pos, set: setPos, step: 100, presets: [200, 500, 1000] },
              { id: "cctv", name: "Solar CCTV SIMs", price: 6000, val: cctv, set: setCctv, step: 50, presets: [100, 250, 500] },
              { id: "gps", name: "GPS Tracker SIMs", price: 8000, val: gps, set: setGps, step: 25, presets: [50, 100, 200] },
              { id: "router", name: "4G/5G Router SIMs", price: 5000, val: router, set: setRouter, step: 25, presets: [50, 100, 200] },
            ].map((sim) => (
              <div key={sim.id} className="p-4 bg-white rounded-xl border space-y-3" style={{ borderColor: colors.border }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{sim.name}</h4>
                    <span className="text-xs text-slate-500 font-medium">₦{sim.price.toLocaleString()} wholesale price</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    {sim.presets.map((p) => (
                      <button key={p} type="button" onClick={() => sim.set(p)} className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-600 font-medium">
                        +{p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => sim.set(Math.max(0, sim.val - sim.step))} className="p-2 rounded border border-slate-200 hover:bg-slate-50"><Minus className="w-4 h-4" /></button>
                    <input type="number" min={0} value={sim.val} onChange={(e) => sim.set(Number(e.target.value))} className="w-24 text-center font-bold text-sm py-1.5 rounded border border-slate-200" />
                    <button type="button" onClick={() => sim.set(sim.val + sim.step)} className="p-2 rounded border border-slate-200 hover:bg-slate-50"><Plus className="w-4 h-4" /></button>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Category Total</span>
                    <span className="font-bold text-slate-900 text-sm">₦{(sim.val * sim.price).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
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
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Tier Discount (5%):</span>
                <span>-₦{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Delivery & Handling:</span>
              <span className="text-emerald-600 font-semibold">FREE (Enterprise Pro)</span>
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
                Direct Wire
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t" style={{ borderColor: colors.border }}>
            <label className="block text-xs font-semibold text-slate-800 text-center">4-Digit Security PIN</label>
            <div className="flex justify-center">
              <InputOTP maxLength={4} value={pin} onChange={setPin}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <button
            type="button"
            disabled={totalSims <= 0 || pin.length < 4}
            onClick={() => setShowConfirmModal(true)}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition-colors"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Place Purchase Order (₦{grandTotal.toLocaleString()})</span>
          </button>
        </div>
      </div>

      <ConfirmSimOrderModal
        open={showConfirmModal}
        onOpenChange={setShowConfirmModal}
        pos={pos}
        cctv={cctv}
        gps={gps}
        router={router}
        paymentMethod={paymentMethod}
        totalAmount={grandTotal}
        onConfirm={handleOrderConfirmed}
      />
    </div>
  );
};
