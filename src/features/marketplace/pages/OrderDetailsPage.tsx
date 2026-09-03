import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock, MapPin, Truck, Wrench } from "lucide-react";
import { ConfirmDeliveryModal } from "../Modals/ConfirmDeliveryModal";
import { CancelOrderModal } from "../Modals/CancelOrderModal";

export default function OrderDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const orderRef = id || "ORD-2026-00847";

  // Modals state
  const [confirmDeliveryOpen, setConfirmDeliveryOpen] = useState(false);
  const [cancelOrderOpen, setCancelOrderOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Back & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/marketplace/orders")}
            className="rounded-xl border border-[#E2ECF6] bg-white p-2 text-[#0F152A] hover:bg-slate-50"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#0F152A]">Order {orderRef}</h1>
              <span className="rounded-full bg-[#EFF4F8] px-3 py-0.5 text-xs font-bold text-[#2563EB]">
                Dispatched
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#8C909B]">Placed 24 Jun 2026</p>
          </div>
        </div>

        <button
          type="button"
          className="rounded-xl border border-[#E2ECF6] bg-white px-4 py-2 text-xs font-bold text-[#0F152A] shadow-xs hover:bg-slate-50"
        >
          Need Help?
        </button>
      </div>

      {/* Top Metric Summary Banner */}
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-4 text-xs sm:grid-cols-5">
        <div>
          <span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">ORDER REF</span>
          <span className="font-extrabold text-[#0F152A]">{orderRef}</span>
        </div>
        <div>
          <span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">STATUS</span>
          <span className="font-bold text-[#2563EB]">Dispatched</span>
        </div>
        <div>
          <span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">TOTAL</span>
          <span className="font-extrabold text-[#0F152A]">₦349,999</span>
        </div>
        <div>
          <span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">ITEMS</span>
          <span className="font-bold text-[#0F152A]">4 items</span>
        </div>
        <div>
          <span className="text-[10px] text-[#8C909B] font-bold uppercase tracking-wider block">EST. DELIVERY</span>
          <span className="font-bold text-[#10B981]">28–30 Jun 2026</span>
        </div>
      </div>

      {/* Main 3-Column Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column — Items & Address (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Items Ordered Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F152A]">Items Ordered</h3>

            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="py-3 first:pt-0 space-y-1">
                <div className="flex justify-between font-bold text-[#0F152A]">
                  <span>Hikvision DS-2CD214 × 1</span>
                  <span>₦184,999</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="rounded bg-[#EBFFF8] px-1.5 py-0.5 text-[9px] font-bold text-[#10B981]">
                    CCTV SIM: MTN · ₦5,000/mo
                  </span>
                  <span className="rounded bg-[#EFF4F8] px-1.5 py-0.5 text-[9px] font-bold text-[#2563EB]">
                    Installation: Tue 25 Jun
                  </span>
                </div>
              </div>

              <div className="py-3 flex justify-between font-bold text-[#0F152A]">
                <span>GPS Tracker Pro × 2</span>
                <span>₦90,000</span>
              </div>

              <div className="py-3 flex justify-between font-bold text-[#0F152A]">
                <span>GL-iNet Router × 1</span>
                <span>₦35,000</span>
              </div>

              <div className="py-3 flex justify-between font-bold text-[#0F152A]">
                <span>Installation fee × 1</span>
                <span>₦40,000</span>
              </div>
            </div>

            <div className="divide-y divide-[#E2ECF6] border-t border-[#E2ECF6] pt-3 text-xs">
              <div className="flex justify-between py-1 text-[#8C909B]">
                <span>Subtotal</span>
                <span className="font-bold text-[#0F152A]">₦349,999</span>
              </div>
              <div className="flex justify-between py-1 text-[#8C909B]">
                <span>Delivery</span>
                <span className="font-bold text-[#10B981]">Free</span>
              </div>
              <div className="flex justify-between py-1 text-[#8C909B]">
                <span>Promo</span>
                <span className="font-bold text-[#10B981]">-₦10,000</span>
              </div>
              <div className="flex justify-between py-2 pt-2 font-extrabold text-sm text-[#10B981]">
                <span>Total</span>
                <span>₦349,999</span>
              </div>
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-2">
            <h4 className="font-extrabold text-xs text-[#0F152A] flex items-center gap-1.5">
              <MapPin className="size-4 text-[#2563EB]" /> Yusuf Adam Baba
            </h4>
            <p className="text-xs text-[#66738C]">23 Allen Avenue, Ikeja, Lagos</p>
            <p className="text-xs text-[#66738C]">Lagos State · 08065942373</p>
          </div>
        </div>

        {/* Middle Column — Order Status Timeline & Installation (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Order Status Timeline Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#0F152A]">Order Status</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-4 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#0F152A]">Order Placed</h5>
                  <p className="text-[11px] text-[#8C909B]">24 Jun 2026 · 03:47 PM</p>
                  <p className="text-[10px] text-[#10B981] font-semibold">Payment confirmed · ₦349,999</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-4 text-[#10B981] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#0F152A]">Order Confirmed</h5>
                  <p className="text-[11px] text-[#8C909B]">24 Jun 2026 · 04:15 PM</p>
                  <p className="text-[10px] text-[#8C909B]">Stock verified, preparing shipment</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="size-4 text-[#2563EB] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#2563EB]">Dispatched</h5>
                  <p className="text-[11px] text-[#8C909B]">25 Jun 2026 · 09:30 AM</p>
                  <p className="text-[10px] font-mono text-[#2563EB]">Tracking: AGL-2026-00847-LAG</p>
                  <p className="text-[10px] text-[#8C909B]">Shipped via Simkash Logistics</p>
                </div>
              </div>

              <div className="flex items-start gap-3 opacity-60">
                <Clock className="size-4 text-[#8C909B] shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-[#8C909B]">Delivery Pending</h5>
                  <p className="text-[11px] text-[#8C909B]">Est. 28–30 Jun 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Installation Appointment Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#0F152A] flex items-center gap-1.5">
                <Wrench className="size-4 text-[#2563EB]" /> Installation
              </h3>
              <span className="rounded-full bg-[#FFFBEB] px-2.5 py-0.5 text-[10px] font-bold text-[#D9990D]">
                Scheduled
              </span>
            </div>

            <div className="divide-y divide-[#E2ECF6] text-xs">
              <div className="flex justify-between py-1.5 first:pt-0">
                <span className="text-[#8C909B]">Date</span>
                <span className="font-bold text-[#0F152A]">Tue 25 Jun 2026</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#8C909B]">Time</span>
                <span className="font-bold text-[#0F152A]">Morning (9AM–12PM)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#8C909B]">Installer</span>
                <span className="font-bold text-[#0F152A]">TBD (being assigned)</span>
              </div>
              <div className="flex justify-between py-1.5 last:pb-0">
                <span className="text-[#8C909B]">Location</span>
                <span className="font-bold text-[#0F152A]">23 Allen Avenue, Ikeja</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#FCEEC1] bg-[#FFFBEB] p-2.5 text-[11px] text-[#D9990D] font-semibold">
              Installer will call you 1 hour before arrival to confirm.
            </div>

            <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline">
              Reschedule Installation
            </button>
          </div>
        </div>

        {/* Right Column — Actions & Seller Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Actions Panel */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-3">
            <button
              type="button"
              className="w-full rounded-xl bg-[#2563EB] py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700"
            >
              Track Package
            </button>
            <button
              type="button"
              className="w-full rounded-xl border border-[#E2ECF6] py-2.5 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Contact Support
            </button>
            <button
              type="button"
              onClick={() => setConfirmDeliveryOpen(true)}
              className="w-full rounded-xl border border-[#10B981] text-[#10B981] py-2.5 text-xs font-bold hover:bg-emerald-50"
            >
              Confirm Delivery
            </button>
            <button
              type="button"
              onClick={() => setCancelOrderOpen(true)}
              className="w-full rounded-xl border border-[#EF4444] text-[#EF4444] py-2.5 text-xs font-bold hover:bg-red-50"
            >
              Cancel Order
            </button>
          </div>

          {/* Seller Card */}
          <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-2">
            <h4 className="font-extrabold text-sm text-[#0F152A]">Simkash Direct ✓</h4>
            <p className="text-xs text-[#10B981] font-semibold">Verified seller</p>
            <button type="button" className="text-xs font-bold text-[#2563EB] hover:underline pt-1 block">
              Contact Seller
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConfirmDeliveryModal
        open={confirmDeliveryOpen}
        onOpenChange={setConfirmDeliveryOpen}
        orderRef={orderRef}
      />
      <CancelOrderModal
        open={cancelOrderOpen}
        onOpenChange={setCancelOrderOpen}
        orderRef={orderRef}
      />
    </div>
  );
}
