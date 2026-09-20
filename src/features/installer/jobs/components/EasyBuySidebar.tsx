import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Clock } from "lucide-react";
import { EASYBUY_FAQS } from "../data/easybuy.data";

export function EasyBuySidebar() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setFaqOpen(faqOpen === idx ? null : idx);
  };

  return (
    <div className="space-y-4">
      {/* 1. When You Get Paid */}
      <div className="space-y-3 rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5 text-xs">
        <h4 className="font-extrabold uppercase tracking-wider text-[#0F152A]">
          When You Get Paid
        </h4>

        {/* Job Fee lifecycle */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#7C3AED]">
            <CheckCircle2 className="size-3.5 text-[#10B981]" />
            <span>Job Fee</span>
          </div>
          <p className="text-[11px] text-[#66738C] leading-relaxed">
            ✓ Complete installation → ✓ Client verifies → ✓ Admin confirms → ₦65,000 paid
          </p>
          <span className="block text-[10px] text-[#8C909B]">Usually within 48–72 hours</span>
        </div>

        {/* EasyBuy Commission lifecycle */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-[#F8FAFC] p-3.5 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-[#2563EB]">
            <Clock className="size-3.5 text-[#D97706]" />
            <span>EasyBuy Commission</span>
          </div>
          <p className="text-[11px] text-[#66738C] leading-relaxed">
            ✓ Complete installation → ⌛ Customer repays (in progress) → ○ Customer completes plan → paid
          </p>
          <span className="block text-[10px] text-[#8C909B]">May take weeks or months</span>
        </div>
      </div>

      {/* 2. Commission Breakdown */}
      <div className="space-y-3 rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5 text-xs">
        <h4 className="font-extrabold uppercase tracking-wider text-[#0F152A]">
          Commission Breakdown
        </h4>

        <div className="space-y-3 border-b border-[#E2ECF6] pb-3">
          <div>
            <div className="font-bold text-[#0F152A]">Basic CCTV · Zenith Bank</div>
            <div className="flex justify-between items-center text-[11px] mt-0.5">
              <span className="font-extrabold text-[#2563EB]">₦22,500</span>
              <span className="text-[#8C909B]">Est. 17 Jul 2026</span>
            </div>
            <span className="text-[10px] text-[#10B981]">Plan 61% complete</span>
          </div>

          <div>
            <div className="font-bold text-[#0F152A]">Standard CCTV · First Bank Ikeja</div>
            <div className="flex justify-between items-center text-[11px] mt-0.5">
              <span className="font-extrabold text-[#D97706]">₦39,000</span>
              <span className="text-[#8C909B]">Est. TBD</span>
            </div>
            <span className="text-[10px] text-[#EF4444]">Plan 45% complete (Delayed)</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-1 text-xs">
          <span className="font-bold text-[#0F152A]">Total Pending</span>
          <span className="font-black text-sm text-[#D97706]">₦61,500</span>
        </div>
      </div>

      {/* 3. Job vs EasyBuy Earnings */}
      <div className="space-y-3 rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5 text-xs">
        <h4 className="font-extrabold uppercase tracking-wider text-[#0F152A]">
          Job vs EasyBuy Earnings
        </h4>

        <div className="rounded-2xl bg-[#F8FAFC] p-3 space-y-1.5 border border-[#E2ECF6]">
          <span className="font-bold text-[#0F152A]">This month (2 EasyBuy):</span>
          <div className="flex justify-between text-[#66738C] text-[11px]">
            <span>Job fees paid</span>
            <span className="font-bold text-[#10B981]">₦110,000</span>
          </div>
          <div className="flex justify-between text-[#66738C] text-[11px]">
            <span>EB commission</span>
            <span className="font-bold text-[#2563EB]">₦61,500</span>
          </div>
          <div className="flex justify-between border-t border-[#E2ECF6] pt-1 font-bold text-[#0F152A]">
            <span>Total Potential</span>
            <span className="font-black text-[#10B981]">₦171,500</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-3 space-y-1.5 border border-[#E2ECF6]">
          <span className="font-semibold text-[#8C909B]">vs regular 2 jobs:</span>
          <div className="flex justify-between text-[#8C909B] text-[11px]">
            <span>Job fees only</span>
            <span>₦110,000</span>
          </div>
          <div className="flex justify-between text-[#8C909B] text-[11px]">
            <span>No extra comm</span>
            <span>₦0</span>
          </div>
          <div className="flex justify-between border-t border-[#E2ECF6] pt-1 font-bold text-[#66738C]">
            <span>Total</span>
            <span>₦110,000</span>
          </div>
        </div>

        <p className="text-[11px] font-bold text-[#2563EB] leading-relaxed">
          EasyBuy adds ₦61,500 in potential additional earnings!
        </p>
      </div>

      {/* 4. Common Questions */}
      <div className="space-y-3 rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs sm:p-5 text-xs">
        <h4 className="font-extrabold uppercase tracking-wider text-[#0F152A]">
          Common Questions
        </h4>

        <div className="divide-y divide-[#E2ECF6]">
          {EASYBUY_FAQS.map((faq, i) => (
            <div key={i} className="py-2.5 first:pt-0">
              <button
                type="button"
                onClick={() => toggleFaq(i)}
                className="flex w-full items-center justify-between text-left font-bold text-[#0F152A] hover:text-[#2563EB]"
              >
                <span>Q: {faq.q}</span>
                {faqOpen === i ? (
                  <ChevronUp className="size-3.5 shrink-0 text-[#8C909B]" />
                ) : (
                  <ChevronDown className="size-3.5 shrink-0 text-[#8C909B]" />
                )}
              </button>
              {faqOpen === i && (
                <p className="mt-1.5 pl-2 text-[11px] text-[#66738C] leading-relaxed">
                  A: {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
