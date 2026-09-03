import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Clock, Gem, Plus, Wifi } from "lucide-react";
import { RequestSimModal } from "../Modals/RequestSimModal";
import { RequestSubmittedModal, type SimRequestSummary } from "../Modals/RequestSubmittedModal";
import { TrackRequestModal } from "../Modals/TrackRequestModal";
import { CancelRequestModal } from "../Modals/CancelRequestModal";
import { SimSwapModal } from "../Modals/SimSwapModal";
import { RenewSimModal } from "../Modals/RenewSimModal";

export default function DeviceSimListPage() {
  const navigate = useNavigate();

  // Filters
  const [networkFilter, setNetworkFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal triggers
  const [requestSimOpen, setRequestSimOpen] = useState(false);
  const [requestSubmittedOpen, setRequestSubmittedOpen] = useState(false);
  const [trackRequestOpen, setTrackRequestOpen] = useState(false);
  const [cancelRequestOpen, setCancelRequestOpen] = useState(false);
  const [simSwapOpen, setSimSwapOpen] = useState(false);
  const [renewSimOpen, setRenewSimOpen] = useState(false);
  const [selectedSimNumber, setSelectedSimNumber] = useState<string>("07022222222");

  const [submittedData, setSubmittedData] = useState<SimRequestSummary | null>(null);

  const handleRequestSubmitted = (data: SimRequestSummary) => {
    setSubmittedData(data);
    setRequestSubmittedOpen(true);
  };

  const handleOpenSimSwap = (simNum: string) => {
    setSelectedSimNumber(simNum);
    setSimSwapOpen(true);
  };

  const handleOpenRenew = (simNum: string) => {
    setSelectedSimNumber(simNum);
    setRenewSimOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F152A]">My Device SIMs</h1>
          <p className="mt-1 text-xs text-[#8C909B]">
            Manage all your active and pending SIM cards
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRequestSimOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-[#2563EB] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-blue-700"
        >
          <Plus className="size-4" /> Request SIM
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total SIMs */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#EFF4F8] text-[#2563EB]">
            <Gem className="size-5" />
          </div>
          <h3 className="mt-3 text-3xl font-extrabold text-[#0F152A]">3</h3>
          <p className="text-xs font-bold text-[#0F152A]">Total SIMs</p>
          <p className="text-[11px] text-[#8C909B]">2 Active · 1 Pending</p>
        </div>

        {/* Expiring <= 7 Days */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#F59E0B]">
            <Clock className="size-5" />
          </div>
          <h3 className="mt-3 text-3xl font-extrabold text-[#F59E0B]">1</h3>
          <p className="text-xs font-bold text-[#0F152A]">Expiring ≤7 Days</p>
          <p className="text-[11px] text-[#8C909B]">Action needed · Renew now</p>
        </div>

        {/* Used This Month */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#EBFFF8] text-[#10B981]">
            <Wifi className="size-5" />
          </div>
          <h3 className="mt-3 text-3xl font-extrabold text-[#0F152A]">14GB</h3>
          <p className="text-xs font-bold text-[#0F152A]">Used This Month</p>
          <p className="text-[11px] text-[#8C909B]">Across all active SIMs</p>
        </div>
      </div>

      {/* Filter Rows */}
      <div className="space-y-2">
        {/* Network Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {["All", "MTN", "Airtel", "Glo", "T2"].map((net) => {
            const isSelected = networkFilter === net;
            return (
              <button
                key={net}
                type="button"
                onClick={() => setNetworkFilter(net)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition ${
                  isSelected
                    ? "border border-[#2563EB] bg-[#EFF4F8] text-[#2563EB]"
                    : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                }`}
              >
                {net}
              </button>
            );
          })}
        </div>

        {/* Status Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {["All", "Active", "Pending", "Expiring", "Expired"].map((st) => {
            const isSelected = statusFilter === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`rounded-xl px-4 py-1.5 text-xs font-bold transition ${
                  isSelected
                    ? "bg-[#0F152A] text-white"
                    : "border border-[#E2ECF6] bg-[#F8FAFC] text-[#66738C] hover:bg-slate-100"
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* SIM Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Card 1: MTN POS SIM (Active) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#FFCC00] px-2.5 py-0.5 text-xs font-extrabold text-[#0F152A]">
                MTN
              </span>
              <span className="rounded-md border border-[#E2ECF6] bg-[#F8FAFC] px-2 py-0.5 text-[11px] font-semibold text-[#66738C]">
                POS SIM
              </span>
            </div>
            <span className="rounded-full bg-[#EBFFF8] px-3 py-0.5 text-xs font-bold text-[#10B981]">
              Active
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-bold tracking-tight text-[#0F152A]">
              0702 2222 222
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-y-1 text-xs">
              <div><span className="text-[#8C909B]">Activated:</span> <span className="font-bold text-[#0F152A]">17 Jun 2026</span></div>
              <div><span className="text-[#8C909B]">Plan:</span> <span className="font-bold text-[#0F152A]">30-day POS SIM</span></div>
              <div><span className="text-[#8C909B]">Expires:</span> <span className="font-bold text-[#0F152A]">26 Jun 2026</span></div>
              <div><span className="text-[#8C909B]">Network:</span> <span className="font-bold text-[#0F152A]">MTN</span></div>
            </div>
          </div>

          {/* Data Usage Progress */}
          <div className="mt-4 space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              DATA USAGE
            </label>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
              <div className="h-full w-[78%] rounded-full bg-[#2563EB]" />
            </div>
            <p className="text-[11px] font-medium text-[#66738C]">
              14GB of 18GB used · 4GB remaining
            </p>
          </div>

          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#F59E0B]">
            <Clock className="size-3.5" />
            <span>Renews in 13 days</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center gap-2 border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={() => handleOpenRenew("07022222222")}
              className="flex-1 rounded-xl bg-[#2563EB] py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
            >
              Renew
            </button>
            <button
              type="button"
              onClick={() => handleOpenSimSwap("07022222222")}
              className="flex-1 rounded-xl border border-[#E2ECF6] py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              SIM Swap
            </button>
            <button
              type="button"
              onClick={() => navigate("/device-sim/07022222222")}
              className="flex-1 rounded-xl border border-[#E2ECF6] py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Details
            </button>
          </div>
        </div>

        {/* Card 2: Airtel CCTV SIM (Expiring) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#E53333] px-2.5 py-0.5 text-xs font-extrabold text-white">
                Airtel
              </span>
              <span className="rounded-md border border-[#E2ECF6] bg-[#F8FAFC] px-2 py-0.5 text-[11px] font-semibold text-[#66738C]">
                CCTV SIM
              </span>
            </div>
            <span className="rounded-full bg-[#FFF7F8] px-3 py-0.5 text-xs font-bold text-[#EF4444]">
              Expiring
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-bold tracking-tight text-[#0F152A]">
              0912 2222 222
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-y-1 text-xs">
              <div><span className="text-[#8C909B]">Activated:</span> <span className="font-bold text-[#0F152A]">1 Jun 2026</span></div>
              <div><span className="text-[#8C909B]">Plan:</span> <span className="font-bold text-[#0F152A]">30-day CCTV SIM</span></div>
              <div><span className="text-[#8C909B]">Expires:</span> <span className="font-bold text-[#0F152A]">26 Jun 2026</span></div>
              <div><span className="text-[#8C909B]">Network:</span> <span className="font-bold text-[#0F152A]">Airtel</span></div>
            </div>
          </div>

          {/* Data Usage Progress */}
          <div className="mt-4 space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[#8C909B]">
              DATA USAGE <AlertTriangle className="inline size-3 text-[#EF4444]" />
            </label>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#E2ECF6]">
              <div className="h-full w-[95%] rounded-full bg-[#EF4444]" />
            </div>
            <p className="text-[11px] font-semibold text-[#EF4444]">
              17.5GB of 18GB used - 0.5GB remaining
            </p>
          </div>

          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#F59E0B]">
            <Clock className="size-3.5" />
            <span>Renews in 5 days</span>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center gap-2 border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={() => handleOpenRenew("09122222222")}
              className="flex-1 rounded-xl bg-[#2563EB] py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
            >
              Renew
            </button>
            <button
              type="button"
              onClick={() => handleOpenSimSwap("09122222222")}
              className="flex-1 rounded-xl border border-[#E2ECF6] py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              SIM Swap
            </button>
            <button
              type="button"
              onClick={() => navigate("/device-sim/09122222222")}
              className="flex-1 rounded-xl border border-[#E2ECF6] py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Details
            </button>
          </div>
        </div>

        {/* Card 3: Glo GPS SIM (Pending Activation) */}
        <div className="rounded-2xl border border-[#E2ECF6] bg-white p-5 shadow-xs transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#10B981] px-2.5 py-0.5 text-xs font-extrabold text-white">
                Glo
              </span>
              <span className="rounded-md border border-[#E2ECF6] bg-[#F8FAFC] px-2 py-0.5 text-[11px] font-semibold text-[#66738C]">
                GPS SIM
              </span>
            </div>
            <span className="rounded-full bg-[#FFFBEB] px-3 py-0.5 text-xs font-bold text-[#F59E0B]">
              Pending
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-bold tracking-tight text-[#0F152A]">
              0812 0600 542
            </h3>
            <p className="mt-0.5 text-xs text-[#8C909B]">Awaiting agent activation</p>
          </div>

          {/* Pending Step Progress */}
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#10B981] font-semibold">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#10B981] text-[10px] text-white">✓</span>
              Request submitted
            </div>
            <div className="flex items-center gap-2 text-[#10B981] font-semibold">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#10B981] text-[10px] text-white">✓</span>
              Agent assigned
            </div>
            <div className="flex items-center gap-2 text-[#F59E0B] font-bold">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#FFFBEB] border border-[#F59E0B] text-[10px] text-[#F59E0B]">⏳</span>
              SIM being activated
            </div>
            <div className="flex items-center gap-2 text-[#8C909B]">
              <span className="flex size-4 items-center justify-center rounded-full bg-[#E2ECF6] text-[10px] text-[#8C909B]">○</span>
              Activation complete
            </div>
          </div>

          <p className="mt-3 text-[11px] text-[#8C909B]">Submitted: 20 Jun 2026</p>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center gap-3 border-t border-[#E2ECF6] pt-4">
            <button
              type="button"
              onClick={() => setTrackRequestOpen(true)}
              className="flex-1 rounded-xl border border-[#E2ECF6] py-2 text-xs font-bold text-[#0F152A] hover:bg-slate-50"
            >
              Track Status
            </button>
            <button
              type="button"
              onClick={() => setCancelRequestOpen(true)}
              className="flex-1 rounded-xl border border-[#EF4444] py-2 text-xs font-bold text-[#EF4444] hover:bg-red-50"
            >
              Cancel Request
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RequestSimModal
        open={requestSimOpen}
        onOpenChange={setRequestSimOpen}
        onRequestSubmitted={handleRequestSubmitted}
      />
      <RequestSubmittedModal
        open={requestSubmittedOpen}
        onOpenChange={setRequestSubmittedOpen}
        onTrackRequestClick={() => setTrackRequestOpen(true)}
        summaryData={submittedData}
      />
      <TrackRequestModal
        open={trackRequestOpen}
        onOpenChange={setTrackRequestOpen}
        onCancelRequestClick={() => setCancelRequestOpen(true)}
      />
      <CancelRequestModal
        open={cancelRequestOpen}
        onOpenChange={setCancelRequestOpen}
      />
      <SimSwapModal
        open={simSwapOpen}
        onOpenChange={setSimSwapOpen}
        simNumber={selectedSimNumber}
      />
      <RenewSimModal
        open={renewSimOpen}
        onOpenChange={setRenewSimOpen}
        simNumber={selectedSimNumber}
      />
    </div>
  );
}
