import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export function AboutHelpTab() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Card 1: About Simkash */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">About Simkash</h3>

        <div className="divide-y divide-[#E2ECF6] text-xs">
          <div className="flex justify-between py-2.5 first:pt-0">
            <span className="text-[#8C909B]">App version</span>
            <span className="font-mono font-bold text-[#0F152A]">2.4.1 (Build 2841)</span>
          </div>
          <div className="flex justify-between py-2.5">
            <span className="text-[#8C909B]">Last updated</span>
            <span className="font-bold text-[#0F152A]">10 Jul 2026</span>
          </div>
          <div className="flex justify-between py-2.5 last:pb-0">
            <span className="text-[#8C909B]">Platform</span>
            <span className="font-bold text-[#0F152A]">iOS & Android</span>
          </div>
        </div>
      </div>

      {/* Card 2: Support & Help */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Support & Help</h3>

        <div className="divide-y divide-[#E2ECF6] text-xs">
          {[
            { title: "Live Chat", desc: "Chat with our support team", action: () => navigate("/support") },
            { title: "FAQs", desc: "Common questions answered", action: () => navigate("/support") },
            { title: "Report a Problem", desc: "Submit a bug or issue", action: () => alert("Report a Problem modal") },
            { title: "Request a Feature", desc: "Tell us what you need", action: () => alert("Request a Feature modal") },
          ].map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={item.action}
              className="flex w-full items-center justify-between py-3 text-left hover:bg-[#F8FAFC] px-2 rounded-xl first:pt-0"
            >
              <div>
                <h4 className="font-bold text-[#0F152A]">{item.title}</h4>
                <p className="text-[11px] text-[#8C909B]">{item.desc}</p>
              </div>
              <ChevronRight className="size-4 text-[#8C909B]" />
            </button>
          ))}
        </div>
      </div>

      {/* Card 3: Legal */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Legal</h3>

        <div className="divide-y divide-[#E2ECF6] text-xs">
          {["Terms of Service", "Privacy Policy", "Data Processing Agreement", "Cookie Policy"].map((title) => (
            <button
              key={title}
              type="button"
              onClick={() => alert(`Opening ${title}`)}
              className="flex w-full items-center justify-between py-3 text-left font-bold text-[#0F152A] hover:bg-[#F8FAFC] px-2 rounded-xl first:pt-0"
            >
              <span>{title}</span>
              <ChevronRight className="size-4 text-[#8C909B]" />
            </button>
          ))}
        </div>
      </div>

      {/* Card 4: Account Actions */}
      <div className="rounded-2xl border border-[#E2ECF6] bg-white p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0F152A]">Account Actions</h3>

        <div className="divide-y divide-[#E2ECF6] text-xs">
          <button
            type="button"
            onClick={() => alert("Deactivate Account requested")}
            className="flex w-full items-center justify-between py-3 text-left hover:bg-red-50 px-2 rounded-xl first:pt-0"
          >
            <div>
              <h4 className="font-bold text-[#EF4444]">Deactivate Account</h4>
              <p className="text-[11px] text-[#8C909B]">Temporarily disable your account</p>
            </div>
            <ChevronRight className="size-4 text-[#EF4444]" />
          </button>

          <button
            type="button"
            onClick={() => alert("Delete Account requested")}
            className="flex w-full items-center justify-between py-3 text-left hover:bg-red-50 px-2 rounded-xl"
          >
            <div>
              <h4 className="font-bold text-[#EF4444]">Delete Account</h4>
              <p className="text-[11px] text-[#8C909B]">Permanently remove all data</p>
            </div>
            <ChevronRight className="size-4 text-[#EF4444]" />
          </button>
        </div>

        <div className="rounded-2xl border border-[#F7D2D7] bg-[#FFF7F8] p-3.5 text-xs text-[#EF4444] font-medium flex items-center gap-2">
          <span>▲</span> Account deletion is irreversible. All data will be permanently removed.
        </div>
      </div>
    </div>
  );
}
