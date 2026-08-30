import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { Search } from "lucide-react";
import { SimSearchHeroCard } from "../components/SimSearchHeroCard";
import { FeatureCards } from "../components/FeatureCard";
import { RecentSearches } from "../components/RecentSearch";
import { appPaths } from "@/app/router/paths";

export default function SimSearchPage() {
  const navigate = useNavigate();

  function goToSimDetails(query: string) {
    if (!query.trim()) return;
   navigate(appPaths.adminSimSearchDetails(query.trim()).path);
  }

  return (
    <div>
      <div className="mx-auto w-full max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        <PageHeader
          title="Admin SIM Search"
          description="Search any SIM number or serial to view its complete chain — batch origin → Corporate Agent → Agency Partner → Customer"
        />
        <SimSearchHeroCard onSearch={goToSimDetails} />

        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <Search className="text-[#94A3B8]" size={25} />
          <p className="text-[16px] font-semibold text-[#0F152A]">Enter a SIM number above to begin</p>
          <p className="text-[13px] text-[#64748B]">
            Search by SIM number, ICCID, or phone number to see full SIM details and history
          </p>
        </div>

        <FeatureCards />

        <RecentSearches
          onViewAll={() => {
            // navigate to full search history
          }}
          onSelect={(entry) => goToSimDetails(entry.simNumber)}
        />
      </div>
    </div>
  );
}