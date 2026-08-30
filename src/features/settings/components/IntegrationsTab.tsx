"use client";

type IntegrationsTabProps = {
  onAddWebhookClick: () => void;
};

export function IntegrationsTab({ onAddWebhookClick }: IntegrationsTabProps) {
  return (
    <div className="space-y-6 text-xs sm:text-sm">
      {/* Active Integrations */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#0F172A]">Active Integrations</h3>

        <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
          {[
            { name: "MTN API", status: "Connected" },
            { name: "Airtel API", status: "Connected" },
            { name: "Glo API", status: "Connected" },
            { name: "T2 API", status: "Connected" },
            { name: "Flutterwave", status: "Connected" },
            { name: "floLIVE CMP", status: "Connected" },
          ].map((item, idx) => (
            <div key={idx} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-bold text-[#0F172A]">
                  🔌
                </div>
                <div>
                  <strong className="font-bold text-[#0F172A] block">{item.name}</strong>
                  <span className="rounded-md bg-[#ECFDF5] px-2 py-0.5 text-[10px] font-bold text-[#059669]">
                    {item.status}
                  </span>
                </div>
              </div>

              <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline">
                Configure
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Webhooks */}
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">Webhooks</h3>
          <button
            type="button"
            onClick={onAddWebhookClick}
            className="font-bold text-[#2563EB] text-xs hover:underline"
          >
            + Add Webhook
          </button>
        </div>

        <div className="space-y-3 divide-y divide-[#F1F5F9] text-xs">
          {[
            { url: "https://api.enterprise.com/hooks/v1/sim-updates", events: "12 events", time: "Last: 2 mins ago" },
            { url: "https://webhooks.logistics-pro.io/receiver/9837", events: "4 events", time: "Last: 1h ago" },
            { url: "https://simkash-sync.herokuapp.endpoint", events: "8 events", time: "Last: 12h ago" },
          ].map((wh, idx) => (
            <div key={idx} className={`flex items-center justify-between ${idx > 0 ? "pt-3" : ""}`}>
              <div>
                <strong className="font-mono font-bold text-[#0F172A] block">{wh.url}</strong>
                <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                  <span className="text-[#64748B]">{wh.events}</span>
                  <span className="rounded-md bg-[#ECFDF5] px-1.5 py-0.5 text-[9px] font-bold text-[#059669]">Active</span>
                  <span className="text-[#94A3B8]">{wh.time}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 font-bold">
                <button type="button" className="text-[#2563EB] hover:underline">Edit</button>
                <button type="button" className="text-[#DC2626] hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
