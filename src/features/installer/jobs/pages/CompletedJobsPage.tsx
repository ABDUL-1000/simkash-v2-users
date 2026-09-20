import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { COMPLETED_JOBS_LIST } from "../data/jobs.data";
import { CompletedJobsTable } from "../components/CompletedJobsTable";
import { CompletedJobsSidebar } from "../components/CompletedJobsSidebar";
import { InstallerReviewsModal } from "../../modals/InstallerReviewsModal";

export default function CompletedJobsPage() {
  const [timeFilter, setTimeFilter] = useState<string>("All Time");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [reviewsModalOpen, setReviewsModalOpen] = useState<boolean>(false);

  const timeTabs = ["This Month", "Last 3 Months", "All Time"];
  const categories = ["All", "Solar CCTV", "CCTV Only", "Solar Only", "Repair"];

  const filteredJobs = useMemo(() => {
    return COMPLETED_JOBS_LIST.filter((job) => {
      if (categoryFilter !== "All" && job.category !== categoryFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          job.reference.toLowerCase().includes(q) ||
          job.title.toLowerCase().includes(q) ||
          job.client.toLowerCase().includes(q) ||
          job.location.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [categoryFilter, search]);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Completed Jobs"
        description="All jobs successfully completed and paid"
        extra={
          <span className="text-xs font-black text-[#10B981] sm:text-sm">
            24 Jobs · ₦960,000 earned
          </span>
        }
      />

      {/* KPI 4-Card Strip */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-[#8C909B]">Total Jobs</span>
          <div className="mt-1 text-2xl font-black text-[#0F152A]">24</div>
        </div>
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-[#8C909B]">Total Paid</span>
          <div className="mt-1 text-2xl font-black text-[#10B981]">₦960,000</div>
        </div>
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-[#8C909B]">Avg Rating</span>
          <div className="mt-1 text-2xl font-black text-[#F59E0B]">4.8★</div>
        </div>
        <div className="rounded-3xl border border-[#E2ECF6] bg-white p-4 shadow-xs">
          <span className="text-[11px] font-semibold text-[#8C909B]">Avg Pay</span>
          <div className="mt-1 text-2xl font-black text-[#66738C]">₦40,000</div>
        </div>
      </div>

      {/* Filters Strip 1: Time and Sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {timeTabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTimeFilter(t)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                timeFilter === t
                  ? "bg-[#0F152A] text-white"
                  : "bg-white border border-[#E2ECF6] text-[#66738C] hover:text-[#0F152A]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 self-start rounded-2xl border border-[#E2ECF6] bg-white px-3 py-1.5 text-xs font-semibold text-[#0F152A] sm:self-auto">
          <span>Newest First</span>
          <ChevronDown className="size-3.5 text-[#8C909B]" />
        </div>
      </div>

      {/* Filters Strip 2: Category and Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategoryFilter(c)}
              className={`rounded-full px-3.5 py-1 text-xs font-bold transition whitespace-nowrap ${
                categoryFilter === c
                  ? "bg-[#0F152A] text-white"
                  : "bg-white border border-[#E2ECF6] text-[#66738C] hover:text-[#0F152A]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px] sm:w-72">
          <Search className="absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-[#8C909B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ref, client, location..."
            className="w-full rounded-2xl border border-[#E2ECF6] bg-white py-2 pl-9 pr-3 text-xs text-[#0F152A] outline-none transition focus:border-[#2563EB]"
          />
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Cards Table */}
        <div className="space-y-4 lg:col-span-2">
          <CompletedJobsTable
            jobs={filteredJobs}
            onViewJob={() => setReviewsModalOpen(true)}
          />

          {/* Pagination bar */}
          <div className="flex flex-col items-center justify-between gap-3 pt-4 sm:flex-row text-xs text-[#8C909B]">
            <span>Showing 10 of 24 completed jobs</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPage(Math.max(1, page - 1))}
                className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPage(num)}
                  className={`flex size-7 items-center justify-center rounded-lg text-xs font-bold ${
                    page === num
                      ? "bg-[#0F152A] text-white"
                      : "border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage(Math.min(3, page + 1))}
                className="flex size-7 items-center justify-center rounded-lg border border-[#E2ECF6] bg-white text-[#66738C] hover:bg-[#F8FAFC]"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Analytics Sidebar */}
        <div className="space-y-4 lg:col-span-1">
          <CompletedJobsSidebar />
        </div>
      </div>

      {/* Modals */}
      <InstallerReviewsModal
        open={reviewsModalOpen}
        onOpenChange={setReviewsModalOpen}
      />
    </div>
  );
}
