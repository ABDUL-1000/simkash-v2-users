import { useState } from "react";
import { useGetPosRequestOptions } from "../api/usePosRequests";
import { PosRequestForm } from "../components/PosRequestForm";
import { MyPosRequests } from "../components/MyPosRequests";
import { PosRequestDetailModal } from "../modals/PosRequestDetailModal";
import type { PosRequestDetail } from "../types/api";

export function PosRequestPage() {
  const options = useGetPosRequestOptions();
  const [openId, setOpenId] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<PosRequestDetail | null>(null);
  const steps = options.data?.steps ?? [];

  return <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-black text-[#1F3A5F]">Request a POS Machine</h1>
      <p className="mt-1 text-xs text-[#8C909B]">Tell us about your business and we'll connect you with a verified POS provider in your area.</p>
    </div>

    {steps.length > 0 && <ol className="grid grid-cols-1 gap-3 rounded-2xl bg-[#0F152A] p-4 sm:grid-cols-[repeat(auto-fit,minmax(0,1fr))] sm:gap-0">
      {steps.map((step, index) => <li key={step.step} className={`flex items-center gap-3 sm:px-4 ${index ? "sm:border-l sm:border-white/10" : ""}`}>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#1F3A5F] text-xs font-bold text-white">{step.step}</span>
        <span className="min-w-0"><span className="block text-xs font-bold text-white">{step.title}</span><span className="block text-[10px] text-white/60">{step.description}</span></span>
      </li>)}
    </ol>}

    <PosRequestForm onSubmitted={setSubmitted} />
    <MyPosRequests onOpen={setOpenId} />

    <PosRequestDetailModal open={Boolean(submitted) || openId !== null} request={submitted} id={openId} onClose={() => { setSubmitted(null); setOpenId(null); }} />
  </div>;
}

export default PosRequestPage;
