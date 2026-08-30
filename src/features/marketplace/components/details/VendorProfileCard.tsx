import { ArrowRight, Star } from "lucide-react";

export function VendorProfileCard() {
  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs">
      <h3 className="text-sm font-bold text-[#0F172A]">Vendor</h3>

      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-[#2563EB] font-bold text-white shadow-xs">
          S
        </div>
        <div>
          <p className="font-bold text-[#0F172A] text-sm">Simkash Direct</p>
          <p className="text-xs text-[#64748B]">Official Simkash Store</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-[#F8FAFC] p-3 text-center divide-x divide-[#E2E8F0]">
        <div>
          <div className="flex items-center justify-center gap-1 font-extrabold text-[#0F172A] text-xs">
            <span>4.9</span>
            <Star className="size-3 fill-[#F59E0B] text-[#F59E0B]" />
          </div>
          <p className="text-[10px] text-[#64748B] mt-0.5">Rating</p>
        </div>
        <div>
          <p className="font-extrabold text-[#0F172A] text-xs">456</p>
          <p className="text-[10px] text-[#64748B] mt-0.5">Products</p>
        </div>
        <div>
          <p className="font-extrabold text-[#0F172A] text-xs">1,204</p>
          <p className="text-[10px] text-[#64748B] mt-0.5">Sales</p>
        </div>
      </div>

      <div>
        <p className="text-xs text-[#64748B]">admin@simkash.ng</p>
        <button
          type="button"
          className="mt-2 flex items-center gap-1 font-bold text-[#2563EB] hover:underline"
        >
          <span>View Vendor Profile</span>
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
